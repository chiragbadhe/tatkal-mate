let scriptActivated = false;
let tabDetails: chrome.tabs.Tab | undefined;

let status_updates: Record<
  string,
  { sender: chrome.runtime.MessageSender; data: any }[]
> = {};

interface Message {
  id: string;
  msg: {
    type: string;
    data: any;
  };
  sender: string;
}

function getMsgBg(msg_type: string, msg_body: object): Message {
  return {
    msg: {
      type: msg_type,
      data: msg_body,
    },
    sender: "popup",
    id: "irctc",
  };
}

chrome.runtime.onMessage.addListener(
  (
    message: Message,
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void
  ) => {
    console.log(message, sender, "background_script received a msg");
    if (message.id !== "irctc") {
      sendResponse("Invalid Id");
      return;
    }
    const type = message.msg.type;
    const data = message.msg.data;
    if (type === "activate_script") {
      if (!scriptActivated) {
        chrome.tabs.create(
          {
            url: "https://www.irctc.co.in/nget/train-search",
          },
          (tab: chrome.tabs.Tab) => {
            tabDetails = tab;
            chrome.scripting
              .executeScript({
                target: { tabId: tab.id as number },
                files: ["./content_script.js"],
              })
              .catch((error) => {
                console.error("Script execution failed:", error);
                sendResponse("Script activation failed");
              });
          }
        );
        scriptActivated = true;
        sendResponse("Script activated");
      } else {
        sendResponse("Script already activated");
      }
    } else if (type === "status_update") {
      if (sender.id) {
        if (!status_updates[sender.id]) status_updates[sender.id] = [];
        status_updates[sender.id].push({
          sender: sender,
          data,
        });
        sendResponse("Status updated");
      } else {
        sendResponse("Sender ID is undefined");
      }
    } else {
      sendResponse("Unknown message type");
    }
  }
);

chrome.tabs.onUpdated.addListener(
  (
    tabId: number,
    changeInfo: chrome.tabs.TabChangeInfo,
    tab: chrome.tabs.Tab
  ) => {
    console.log(tabId, changeInfo, tab);
    if (
      tabDetails &&
      tabDetails.id !== undefined &&
      tabId === tabDetails.id &&
      changeInfo.status === "complete"
    ) {
      if (tab.url && tab.url.includes("booking/train-list")) {
        chrome.tabs.sendMessage(tabDetails.id, getMsgBg("selectJourney", {}));
      }
      if (tab.url && tab.url.includes("booking/psgninput")) {
        chrome.tabs.sendMessage(
          tabDetails.id,
          getMsgBg("fillPassengerDetails", {})
        );
      }
    }
  }
);

// On installing the extension
chrome.runtime.onInstalled.addListener(
  (details: chrome.runtime.InstalledDetails) => {
    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {
      chrome.tabs.create({
        url: "onboarding.html",
      });
    }
  }
);
