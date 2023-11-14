console.log("Running content.js");

document.addEventListener('load', function () {
    console.log("Page loaded");
    if (typeof window.changeSetting === 'function') {
        window.changeSetting('animationDelay', 8);
        console.log("Animation Delay set to 8");
    } else {
        console.error("changeSetting function not found");
    }
});

document.addEventListener('keydown', function () {
    console.log("Keydown recieved");
    if (event.key === "a") {
        console.log("Sending chrome api message");
        chrome.runtime.sendMessage({action: "switchTabs"});
    }

});