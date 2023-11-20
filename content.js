console.log("Running content.js");

window.addEventListener('keydown', keydown);
window.addEventListener('keyup', keyup);

function keyup(event) {
    
}

function keydown(event) {
    if (event.key === "q"){
        console.log("Sending spacebar");
        $("body").trigger($.Event("keydown", { keyCode: 32})); 
        $("body").trigger($.Event("keyup", { keyCode: 32}));
        /*sendKey(32); // space*/
    }
    else if (event.key === "a") {
        console.log("Sending chrome api message");
        sendKeyUp(69);
        chrome.runtime.sendMessage({ action: "switchTabs" });
    }
}

function sendKey(keycode) {
    $("body").trigger($.Event("keydown", { keyCode: keycode}));
    $("body").trigger($.Event("keyup", { keyCode: keycode}));
}

function sendKeyUp(keycode) {
    $("body").trigger($.Event("keyup", { keyCode: keycode}));
}

function sendKeyDown(keycode) {
    $("body").trigger($.Event("keydown", { keyCode: keycode}));
}