console.log("Running content.js");

document.addEventListener('keydown', function (event) {
    console.log("Keydown recieved");
    if (event.key === "a") {
        console.log("Sending chrome api message");
        chrome.runtime.sendMessage({ action: "switchTabs" });
    }
});
