// Load settings when the popup is opened
document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['enabled', 'switchKey'], function(items) {
        document.getElementById('enabled').checked = items.enabled;
        document.getElementById('switchKey').value = items.switchKey || '';
    });
    buttonInit();
});

function buttonInit() {
    const saveButton = document.getElementById("saveButton");
    saveButton.addEventListener('click', saveSettings);
}


function saveSettings() {
    console.log("Saving settings");
    var isEnabled = document.getElementById('enabled').checked;
    var switchKey = document.getElementById('switchKey').value;
    console.log("isEnabled: ", isEnabled);
    console.log("switchKey: ", switchKey);

    chrome.storage.local.set({ "enabled": isEnabled, "switchKey": switchKey }, function() {
        console.log('Settings saved');
    });
}