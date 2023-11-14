chrome.commands.onCommand.addListener(function (command) {
	if(command === "switchTabs") {
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