console.log("Running content.js");

document.addEventListener('keydown', function () {
    console.log("Keydown recieved");
    if (event.key === "0") {
        console.log("Setting animation delay to zero");
        chrome.runtime.sendMessage({action: "setDelay"});
    }
    if (event.key === "a") {
        console.log("Sending chrome api message");
        chrome.runtime.sendMessage({action: "switchTabs"});
    }
});