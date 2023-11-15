console.log("Running content.js");

document.addEventListener('keydown', function (event) {
    console.log("Keydown recieved");
    if (event.key === "a") {
        console.log("Sending chrome api message");
        let response = await (chrome.runtime.sendMessage({ action: "switchTabs" }));
        if (response) {
            console.log(response);
        } else {
            console.log("There was a problem switching tabs.");
        }
    }
});
