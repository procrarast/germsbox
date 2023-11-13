chrome.commands.onCommand.addListener(function (command) {
	if(command === "switchTabs") {
		
});


function getGermsTabIndexes() {
	chrome.tabs.query({url: "https://germs.io/*"}, function (tabs) {
		if (tabs.length >= 2) {
			chrome.tabs.query({active: true, currentWindow: true}, function(currentTab) {
				const currentTabId = currentTab[0].id;
				const nextTabId =
					/* If first tab in gotten array is equal to the currently active
					 * tab, we want to switch to the second tab.
					 * If it's not equal, switch to the first tab.
					 */
					tabs[0].id === currentTabId ? tabs[1].id : tabs[0].id;
				chrome.tabs.update(tabId, {active: true});
			});
		}
	});
}
