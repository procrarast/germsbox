console.log("Loading background.js");

function switchWindows() {
    console.log("Switching windows");

    getGermsWindows(function (windows) {
        if (windows) {
            getActiveWindowId(function (currentWindowId) {
                const nextWindowId = getNextWindowId(windows, currentWindowId);
                setActiveWindow(nextWindowId);
            });
        } else {
            console.log("No other window found.");
			openGermsWindow();
        }
    });
}

/* Get array of tabs with a certain URL if there are two of them. Return false otherwise. */
function getGermsWindows(callback) {
    chrome.windows.getAll({populate: true}, function (windows) {
        let germsWindows = windows.filter(win => 
            win.tabs.some(tab => tab.url && tab.url.includes('https://germs.io')));

        if (germsWindows.length === 2) {
            callback(germsWindows);
        } else {
            callback(false);
        }
    });
}

function openGermsWindow() {
	//TODO: Make it open a window of the same party URL
	console.log("Opening new window");
	chrome.windows.create({url: "https://germs.io/"});
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

function setActiveWindow(nextWindowId) {
    chrome.windows.update(nextWindowId, {focused: true});
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	console.log("Message recieved");
	if (request.action === "switchTabs") {
        switchWindows();
    }
});