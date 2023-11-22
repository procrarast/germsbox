console.log("Loading background.js");

// Listen for messages
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("Message recieved");
	if (request.action === "switchWindows") {
        switchWindows();
    }
});

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
        }
        // if 3+ windows, do nothing; not supported
    });
}

/* Returns an array of windows containing a Germs.io tab */
function getGermsWindows(callback) {
    chrome.windows.getAll({ populate: true }, function (windows) { 
        let germsWindows = windows.filter(win => 
            win.tabs.some(tab => tab.url && tab.url.includes('https://germs.io')));
        callback(germsWindows);
    });
}

/* Open a window of a specific URL */
function openWindow(url) {
	console.log("Opening new window");
	chrome.windows.create({ url: url });
}

/* Get the id of the currently active tab */
function getActiveWindowId(callback) {
    chrome.windows.getCurrent({}, function(currentWindow) {
        callback(currentWindow.id);
    });
}

/* Get the window to be switched to */
function getNextWindowId(windows, currentWindowId) {
    return windows[0].id === currentWindowId ? windows[1].id : windows[0].id;
}

/* Set focus to next window */
function setFocusedWindow(nextWindowId) {
    chrome.windows.update(nextWindowId, {focused: true});
}
