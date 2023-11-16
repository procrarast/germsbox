console.log("Loading background.js");

function switchWindows() {
    console.log("Switching windows");

    getGermsWindows(function (windows) {
        if (windows.length === 2) {
            // Switch between two windows
            getActiveWindowId(function (currentWindowId) {
                const nextWindowId = getNextWindowId(windows, currentWindowId);
                setFocusedWindow(nextWindowId);
            });
        } else if (windows.length === 1) {
            // Open same URL to add to same party
            console.log("No other window found.");
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                openWindow(tabs[0].url);
            });
        } else {
            console.log("3+ windows are not supported.");
        }
    });
}

/* Get array of two germs tabs. Return false otherwise. */
function getGermsWindows(callback) {
    chrome.windows.getAll({ populate: true }, function (windows) {
        // Filter for germs.io tabs
        let germsWindows = windows.filter(win => 
            win.tabs.some(tab => tab.url && tab.url.includes('https://germs.io')));
        callback(germsWindows);
    });
}

function openWindow(url) {
	//TODO: Make it open a window of the same party URL
	console.log("Opening new window");
	chrome.windows.create({ url: url });
}

/* Get the name of the currently active tab */
function getActiveWindowId(callback) {
    chrome.windows.getCurrent({}, function(currentWindow) {
        callback(currentWindow.id);
    });
}

/* Get the window to be switched to */
function getNextWindowId(windows, currentWindowId) {
    return windows[0].id === currentWindowId ? windows[1].id : windows[0].id;
}

function setFocusedWindow(nextWindowId) {
    chrome.windows.update(nextWindowId, {focused: true});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("Message recieved");
	if (request.action === "switchTabs") {
        switchWindows();
    }
});