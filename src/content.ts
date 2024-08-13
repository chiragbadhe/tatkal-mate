import Tesseract from "tesseract.js";

interface UserData {
  payment_details: any;
  irctc_credentials: {
    user_name: string;
    password: string;
  };
  journey_details: {
    from: {
      english_label: string;
      station_code: string;
    };
    destination: {
      english_label: string;
      station_code: string;
    };
    date: string;
    class: {
      label: string;
      value: string;
    };
    quota: {
      label: string;
    };
    train_no: string;
  };
  passenger_details: {
    berth_preference: string;
    name: string;
    age: number;
    gender: string;
    berth: string;
  }[];
  infant_details: {
    name: string;
    age: string;
    gender: string;
  }[];
  contact_details: {
    mobile_number: string;
    email: string;
    mobileNumber: string;
  };
  other_preferences: {
    autoUpgradation: boolean;
    confirmberths: boolean;
    coachId: string;
    reservationChoice: string;
  };
  travel_preferences: {
    travelInsuranceOpted: string;
  };
  payment_preferences: {
    paymentType: string;
  };
  gst_details: {
    "gstin-number": string;
    "gstin-name": string;
    "gstin-flat": string;
    "gstin-street": string;
    "gstin-area": string;
    "gstin-PIN": string;
    "gstin-City": string;
  };
  extension_data: {
    book_at_tatkal_time: boolean;
  };
}

let user_data: UserData = {
  irctc_credentials: {
    user_name: "",
    password: "",
  },
  journey_details: {
    from: {
      english_label: "",
      station_code: "",
    },
    destination: {
      english_label: "",
      station_code: "",
    },
    date: "",
    class: {
      label: "",
      value: "",
    },
    quota: {
      label: "",
    },
    train_no: "",
  },
  passenger_details: [],
  infant_details: [],
  contact_details: {
    mobileNumber: "",
    mobile_number: "",
    email: "",
  },
  other_preferences: {
    autoUpgradation: false,
    confirmberths: false,
    coachId: "",
    reservationChoice: "",
  },
  travel_preferences: {
    travelInsuranceOpted: "no",
  },
  payment_preferences: {
    paymentType: "",
  },
  gst_details: {
    "gstin-number": "",
    "gstin-name": "",
    "gstin-flat": "",
    "gstin-street": "",
    "gstin-area": "",
    "gstin-PIN": "",
    "gstin-City": "",
  },
  extension_data: {
    book_at_tatkal_time: false,
  },
  payment_details: undefined,
};

function getMsg(msg_type: string, msg_body: object) {
  return {
    msg: {
      type: msg_type,
      data: msg_body,
    },
    sender: "content_script",
    id: "irctc",
  };
}

function statusUpdate(status: string) {
  chrome.runtime.sendMessage(
    getMsg("status_update", { status, time: Date.now() })
  );
}

function addDelay(milliseconds: number) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

chrome.runtime.onMessage.addListener(
  (
    message: any,
    sender: chrome.runtime.MessageSender,
    sendResponse: Function
  ) => {
    console.log(message, sender, "content_script");
    if (message.id !== "irctc") {
      sendResponse("Invalid Id");
      return;
    }
    const type = message.msg.type;
    if (type === "selectJourney") {
      addDelay(200);
      selectJourney();
    } else if (type === "fillPassengerDetails") {
      addDelay(200);
      fillPassengerDetails();
    }
    sendResponse("Something went wrong");
  }
);

function loadLoginDetails() {
  statusUpdate("login_started");
  const loginModal = document.querySelector(
    "#divMain > app-login"
  ) as HTMLElement;

  const userNameInput = loginModal.querySelector(
    "input[type='text'][formcontrolname='userid']"
  ) as HTMLInputElement;
  const passwordInput = loginModal.querySelector(
    "input[type='password'][formcontrolname='password']"
  ) as HTMLInputElement;

  const captchaInput = loginModal.querySelector(
    "input[type='text'][formcontrolname='captcha']"
  ) as HTMLInputElement;

  captchaInput.addEventListener("mouseenter", function () {
    const captcha = (document.querySelector(".captcha-img") as HTMLImageElement)
      ?.src;
    if (captcha == null) {
      alert("Please Wait...");
    } else {
      Tesseract.recognize(captcha).then(async function (result: any) {
        captchaInput.value = result.text;
      });
    }
  });

  userNameInput.value = user_data.irctc_credentials.user_name ?? "";
  userNameInput.dispatchEvent(new Event("input"));
  userNameInput.dispatchEvent(new Event("change"));

  passwordInput.value = user_data.irctc_credentials.password ?? "";
  passwordInput.dispatchEvent(new Event("input"));
  passwordInput.dispatchEvent(new Event("change"));
  statusUpdate("login_pending");
}

function loadJourneyDetails() {
  statusUpdate("filling_journey_details");
  const form = document.querySelector("app-jp-input form") as HTMLFormElement;
  const fromInputField = form.querySelector(
    "#origin > span > input"
  ) as HTMLInputElement;
  fromInputField.value = user_data.journey_details.from
    ? `${user_data.journey_details.from.english_label} - ${user_data.journey_details.from.station_code}`
    : "";
  fromInputField.dispatchEvent(new Event("keydown"));
  fromInputField.dispatchEvent(new Event("input"));

  const destinationInputField = form.querySelector(
    "#destination > span > input"
  ) as HTMLInputElement;
  destinationInputField.value = user_data.journey_details.destination
    ? `${user_data.journey_details.destination.english_label} - ${user_data.journey_details.destination.station_code}`
    : "";
  destinationInputField.dispatchEvent(new Event("keydown"));
  destinationInputField.dispatchEvent(new Event("input"));

  const dateInputField = form.querySelector(
    "#jDate > span > input"
  ) as HTMLInputElement;
  dateInputField.value = user_data.journey_details.date
    ? `${user_data.journey_details.date.split("-").reverse().join("/")}`
    : "";
  dateInputField.dispatchEvent(new Event("keydown"));
  dateInputField.dispatchEvent(new Event("input"));

  const jClassField = form.querySelector("#journeyClass") as HTMLElement;
  const jClassArrowBtn = jClassField.querySelector(
    "div > div[role='button']"
  ) as HTMLElement;
  jClassArrowBtn.click();
  addDelay(300);

  const jClassFieldItems = [
    ...jClassField.querySelectorAll("ul li"),
  ] as HTMLElement[];
  const selectedClass = jClassFieldItems.find(
    (e) =>
      (e as HTMLElement).innerText === user_data.journey_details.class.label
  );
  selectedClass?.click();
  addDelay(300);

  const quotaField = form.querySelector("#journeyQuota") as HTMLElement;
  const quotaArrowBtn = quotaField.querySelector(
    "div > div[role='button']"
  ) as HTMLElement;
  quotaArrowBtn.click();

  const quotaFieldItems = [
    ...quotaField.querySelectorAll("ul li"),
  ] as HTMLElement[];
  const selectedQuota = quotaFieldItems.find(
    (e) =>
      (e as HTMLElement).innerText === user_data.journey_details.quota.label
  );
  selectedQuota?.click();

  const searchBtn = form.querySelector(
    "button.search_btn.train_Search[type='submit']"
  ) as HTMLButtonElement;
  addDelay(500);
  statusUpdate("filled_journey_details");

  if (
    user_data.journey_details.quota.label === "TATKAL" ||
    (user_data.journey_details.quota.label === "PREMIUM TATKAL" &&
      user_data.extension_data.book_at_tatkal_time === true)
  ) {
    const jclass = user_data.journey_details.class.value;
    let currentDate = new Date();
    let requiredDate = new Date();
    const validClasses = ["1A", "2A", "3A", "CC", "EC", "3E"];
    const isValidClass = validClasses.indexOf(jclass.toUpperCase()) !== -1;

    isValidClass
      ? requiredDate.setHours(10, 0, 0, 0)
      : requiredDate.setHours(11, 0, 0, 0);

    if (requiredDate > currentDate) {
      console.log("asdas");
      setTimeout(() => {
        searchBtn.click();
      }, 10);
    } else {
      searchBtn.click();
    }
  } else {
    searchBtn.click();
  }
}

function selectJourney() {
  if (!user_data.journey_details.train_no) return;

  statusUpdate("journey_selection_started");
  const train_list_parent = document.querySelector(
    "#divMain > div > app-train-list"
  ) as HTMLElement;
  const train_list = [
    ...train_list_parent.querySelectorAll(".tbis-div app-train-avl-enq"),
  ] as HTMLElement[];

  const myTrain = train_list.find(
    (train: { querySelector: (arg0: string) => HTMLElement }) =>
      (train.querySelector("div.train-heading") as HTMLElement)?.innerText
        .trim()
        .includes(user_data.journey_details.train_no)
  );

  if (!myTrain) {
    statusUpdate("journey_selection_stopped.no_train");
    return;
  }

  const jClass = user_data.journey_details.class.label;
  const classElements = [
    ...myTrain.querySelectorAll(".avlAndFare div"),
  ] as HTMLElement[];

  const classElement = classElements.find((element) =>
    (element as HTMLElement).innerText.includes(jClass)
  );

  if (!classElement) {
    statusUpdate("journey_selection_stopped.no_class");
    return;
  }

  classElement.click();
  addDelay(300);

  const bookNowBtn = myTrain.querySelector(
    "button.book_btn"
  ) as HTMLButtonElement;
  if (bookNowBtn) {
    bookNowBtn.click();
    statusUpdate("journey_selection_successful");
  } else {
    statusUpdate("journey_selection_failed");
  }
}

function fillPassengerDetails() {
  statusUpdate("filling_passenger_details_started");

  const passengers = user_data.passenger_details;

  passengers.forEach((passenger, index) => {
    const passengerIndex = index + 1;

    const nameInput = document.getElementById(
      `psgn-name-${passengerIndex}`
    ) as HTMLInputElement;
    const ageInput = document.getElementById(
      `psgn-age-${passengerIndex}`
    ) as HTMLInputElement;
    const genderSelect = document.getElementById(
      `psgn-gender-${passengerIndex}`
    ) as HTMLSelectElement;
    const berthSelect = document.getElementById(
      `psgn-berth-choice-${passengerIndex}`
    ) as HTMLSelectElement;

    if (nameInput) nameInput.value = passenger.name;
    if (ageInput) ageInput.value = passenger.age.toString();
    if (genderSelect) genderSelect.value = passenger.gender;
    if (berthSelect) berthSelect.value = passenger.berth_preference;

    addDelay(200); // Adding delay to simulate realistic typing
  });

  statusUpdate("filling_passenger_details_completed");
}

function fillContactDetails() {
  statusUpdate("filling_contact_details_started");

  const mobileInput = document.getElementById(
    "mobileNumber"
  ) as HTMLInputElement;
  const emailInput = document.getElementById("email") as HTMLInputElement;

  if (mobileInput) mobileInput.value = user_data.contact_details.mobile_number;
  if (emailInput) emailInput.value = user_data.contact_details.email;

  statusUpdate("filling_contact_details_completed");
}

function selectPaymentMethod() {
  statusUpdate("payment_method_selection_started");

  const paymentMethods = document.querySelectorAll(
    "input[name='paymentOption']"
  ) as NodeListOf<HTMLInputElement>;

  const selectedMethod = Array.from(paymentMethods).find(
    (method) => method.value === user_data.payment_details.method
  );

  if (selectedMethod) {
    selectedMethod.click();
    statusUpdate("payment_method_selected");
  } else {
    statusUpdate("payment_method_selection_failed");
  }
}

function finalizeBooking() {
  statusUpdate("booking_finalization_started");

  const captchaInput = document.getElementById("captcha") as HTMLInputElement;
  if (captchaInput) {
    // You may need to implement or integrate a captcha solving solution here
    captchaInput.focus();
    statusUpdate("captcha_required");
  }

  const makePaymentBtn = document.querySelector(
    "button.paymentbtn"
  ) as HTMLButtonElement;

  if (makePaymentBtn) {
    makePaymentBtn.click();
    statusUpdate("booking_finalization_successful");
  } else {
    statusUpdate("booking_finalization_failed");
  }
}

function startBookingProcess() {
  statusUpdate("booking_process_started");
  selectJourney();
  fillPassengerDetails();
  fillContactDetails();
  selectPaymentMethod();
  finalizeBooking();
  statusUpdate("booking_process_completed");
}
