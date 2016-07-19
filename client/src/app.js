var App = (function() {

	return {
		init: function() {
			let wateringModule = require("./watering.js");
			wateringModule().init();
		}
	}
})();

//init the global module after DOM is loaded
document.onload = App.init();
