// Load settings when the popup is opened
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['switcherEnabled', 'switcherKeycode'], function(items) {
        document.getElementById('enabledCheckbox').checked = items.switcherEnabled;
        document.getElementById('keycodeTester').value = items.switcherKeycode || '';
    });
    buttonInit();
});

function buttonInit() {
    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener('click', saveSettings);
}

function saveSettings() {
    console.log("Saving settings");
    const switcherEnabled = document.getElementById('enabledCheckbox').checked;
    const switcherKeycode = document.getElementById('keycodeTester').value;
    
    console.log("switcherEnabled: ", switcherEnabled);
    console.log("switcherKeycode: ", switcherKeycode);
    
    chrome.storage.local.set({ "switcherEnabled": switcherEnabled, "switcherKeycode": switcherKeycode }, function() {
        console.log('Settings saved');
        updateSettings();
    });
}

/* Send the updateKeycode message to each germs tab in each window */
function updateSettings() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs.length > 0 && tabs[0].id != null) {
            console.log("Sending updateSettings message");
            chrome.tabs.sendMessage(tabs[0].id, { action: "updateSettings" });
        } else {
            console.log("No active tab found or tab ID is undefined.");
        }
    });
}

function getGermsWindows(callback) {
    chrome.windows.getAll({ populate: true }, function (windows) { 
        let germsWindows = windows.filter(win => 
            win.tabs.some(tab => tab.url && tab.url.includes('https://germs.io')));
        callback(germsWindows);
    });
}