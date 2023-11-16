console.log("Running content.js");

document.addEventListener('keydown', function (event) {
    console.log("Keydown recieved");
    if (event.key === "a") {
        console.log("Sending chrome api message");
        feedKeyup();
        chrome.runtime.sendMessage({ action: "switchTabs" });
    } else if (event.key === "q") {
        pressKey(69);
    }
});

function feedKeyup(){
    console.log("Sending keyup");
    document.dispatchEvent(new KeyboardEvent('keyup', { which: 69 }));
}

function pressKey(keycode) {
    document.dispatchEvent(new KeyboardEvent('keydown', { which: keycode }));
    document.dispatchEvent(new KeyboardEvent('keyup', { which: keycode }));
}