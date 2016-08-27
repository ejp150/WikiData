var data = require("sdk/self").data;
var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");
var tabs = require("sdk/tabs");
var currURL;
var content = ("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=revisions&titles=" + currURL);

var button = ToggleButton({
  id: "my-button",
  label: "WikiData",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: content,
  //contentURL: self.data.url("text-entry.html"),
  //contentScriptFile: self.data.url("get-text.js"),
  onHide: handleHide
});
function handleHide() {
  button.state('window', {checked: false});
}

function handleChange(state) {
  if (state.checked) {
    panel.show({
      position: button
    });
    var fullURL = tabs.activeTab.url;
    currURL = fullURL.split("/wiki/").pop();
    content = ("https://en.wikipedia.org/w/api.php?action=query&format=json&prop=info&inprop=watchers&titles=" + currURL);
    panel.contentURL = content;
}
}

 
panel.on("show", function () {
	panel.port.emit("show");
})

panel.on("getTab", function(tab) {
    panel.emit("returnTab", tab);
});
/*
var data = require("sdk/self").data;
// Construct a panel, loading its content from the "text-entry.html"
// file in the "data" directory, and loading the "get-text.js" script
// into it.
var text_entry = require("sdk/panel").Panel({
  contentURL: data.url("text-entry.html"),
  contentScriptFile: data.url("get-text.js")
  onHide: handleHide
});

// Create a button
var { ToggleButton } = require('sdk/ui/button/toggle');
var button = ToggleButton({
  id: "show-panel",
  label: "Show Panel",
  icon: {
    "16": "./icon-16.png",
    "32": "./icon-32.png",
    "64": "./icon-64.png"
  },
  onClick: handleClick
});

// Show the panel when the user clicks the button.
function handleClick(state) {
  text_entry.show({
  	position: button
  });
}

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
text_entry.on("show", function() {
  text_entry.port.emit("show");
});

// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user
// entered.
// In this implementation we'll just log the text to the console.
text_entry.port.on("text-entered", function (text) {
  console.log(text);
  text_entry.hide();
});

function handleHide() {
	button.state('window', {checked: false});
}
*/