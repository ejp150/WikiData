self.port.on("show", function onShow() {
	var tab = "";
	self.port.emit("getTab", tab);
	self.port.on("returnTab", function(tab) {
		document.getElementById("main").innerHTML = tab;
	});
});