/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/background.ts":
/*!***************************!*\
  !*** ./src/background.ts ***!
  \***************************/
/***/ (() => {

eval("\nlet scriptActivated = false;\nlet tabDetails;\nlet status_updates = {};\nfunction getMsgBg(msg_type, msg_body) {\n    return {\n        msg: {\n            type: msg_type,\n            data: msg_body,\n        },\n        sender: \"popup\",\n        id: \"irctc\",\n    };\n}\nchrome.runtime.onMessage.addListener((message, sender, sendResponse) => {\n    console.log(message, sender, \"background_script received a msg\");\n    if (message.id !== \"irctc\") {\n        sendResponse(\"Invalid Id\");\n        return;\n    }\n    const type = message.msg.type;\n    const data = message.msg.data;\n    if (type === \"activate_script\") {\n        if (!scriptActivated) {\n            chrome.tabs.create({\n                url: \"https://www.irctc.co.in/nget/train-search\",\n            }, (tab) => {\n                tabDetails = tab;\n                chrome.scripting\n                    .executeScript({\n                    target: { tabId: tab.id },\n                    files: [\"./content_script.js\"],\n                })\n                    .catch((error) => {\n                    console.error(\"Script execution failed:\", error);\n                    sendResponse(\"Script activation failed\");\n                });\n            });\n            scriptActivated = true;\n            sendResponse(\"Script activated\");\n        }\n        else {\n            sendResponse(\"Script already activated\");\n        }\n    }\n    else if (type === \"status_update\") {\n        if (sender.id) {\n            if (!status_updates[sender.id])\n                status_updates[sender.id] = [];\n            status_updates[sender.id].push({\n                sender: sender,\n                data,\n            });\n            sendResponse(\"Status updated\");\n        }\n        else {\n            sendResponse(\"Sender ID is undefined\");\n        }\n    }\n    else {\n        sendResponse(\"Unknown message type\");\n    }\n});\nchrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {\n    console.log(tabId, changeInfo, tab);\n    if (tabDetails &&\n        tabDetails.id !== undefined &&\n        tabId === tabDetails.id &&\n        changeInfo.status === \"complete\") {\n        if (tab.url && tab.url.includes(\"booking/train-list\")) {\n            chrome.tabs.sendMessage(tabDetails.id, getMsgBg(\"selectJourney\", {}));\n        }\n        if (tab.url && tab.url.includes(\"booking/psgninput\")) {\n            chrome.tabs.sendMessage(tabDetails.id, getMsgBg(\"fillPassengerDetails\", {}));\n        }\n    }\n});\n// On installing the extension\nchrome.runtime.onInstalled.addListener((details) => {\n    if (details.reason === chrome.runtime.OnInstalledReason.INSTALL) {\n        chrome.tabs.create({\n            url: \"onboarding.html\",\n        });\n    }\n});\n\n\n//# sourceURL=webpack:///./src/background.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/background.ts"]();
/******/ 	
/******/ })()
;