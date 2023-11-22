console.log("Running content.js");

var switcherKeycode;
var switcherEnabled;
var keyupBeforeSwitch;

updateSettings();

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

/* Listen for messages from popup */
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("Message recieved");
	if (request.action === "updateSettings") {
        console.log("Updating settings");
        updateSettings();
    }
});

function keyup(event) {

}

function keydown(event) {
    console.log(switcherKeycode, event.keyCode);
    console.log("Key recieved");
    if (event.keyCode === 0) {
        console.log("Sending spacebar");
        //sendKey(32); //space
    }

    else if (event.keyCode == switcherKeycode && switcherEnabled) {
        console.log("Sending chrome api message");
        //sendKeyUp(69);
        chrome.runtime.sendMessage({ action: "switchWindows" });
    }
}

function updateSettings() {
    chrome.storage.local.get(["switcherKeycode", "switcherEnabled", "keyupBeforeSwitch"], function(items) {
        switcherKeycode = items.switcherKeycode;
        switcherEnabled = items.switcherEnabled;
        keyupBeforeSwitch = items.keyupBeforeSwitch;
        console.log("Set beforeswitch to", keyupBeforeSwitch);
        console.log("Set keycode to", switcherKeycode);
        console.log("Set enabled to", switcherEnabled);
    });
}

/* None of these functions work. Have to write a script injector */
/*
function sendKey(keycode) {
    $("body").trigger($.Event("keydown", { keyCode: keycode}));
    $("body").trigger($.Event("keyup", { keyCode: keycode}));
}

function sendKeyUp(keycode) {
    $("body").trigger($.Event("keyup", { keyCode: keycode}));
}

function sendKeyDown(keycode) {
    $("body").trigger($.Event("keydown", { keyCode: keycode}));
}
*/