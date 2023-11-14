console.log("Loading background.js");

function setDelay() {
	window.changeSetting('animationDelay', 4);
}

function switchTabs() {
	console.log("Switching tabs");
	
	getGermsTabs(function (tabs) {
		if (tabs) {
			getActiveTabId(function (currentTabId) {
				const nextTabId = getNextTabId(tabs, currentTabId);
				setActiveTab(nextTabId);
			});
		} else {
			// TODO: Perhaps open up a new tab or set a config to do so
			console.log("Not enough tabs found.");
		}
	});

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === "setDelay") {
		setDelay();
	}
	
	if (request.action === "switchTabs") {
        switchTabs();
    }
});

/* Get array of tabs with a certain URL if there are two of them. Return false otherwise. */
function getGermsTabs(callback) {
	chrome.tabs.query({url: "https://germs.io/*"}, function (tabs) {	
		if (tabs.length === 2) {
			callback(tabs);
		} else {
			callback(false);
		}
	});
}

/* Get the name of the currently active tab */
function getActiveTabId(callback) {
	chrome.tabs.query({active:true, currentWindow: true}, function(currentTab) {
		callback(currentTab[0].id);
	})
}

/* Get the tab to be switched to */
function getNextTabId(tabs, currentTabId) {
	return tabs[0].id === currentTabId ? tabs[1].id : tabs[0].id;
}

function setActiveTab(nextTabId) {
	chrome.tabs.update(nextTabId, {active: true});
}

