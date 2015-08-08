if (!Array.prototype.find) {
  Array.prototype.find = function(predicate) {
    if (this == null) {
      throw new TypeError('Array.prototype.find called on null or undefined');
    }
    if (typeof predicate !== 'function') {
      throw new TypeError('predicate must be a function');
    }
    var list = Object(this);
    var length = list.length >>> 0;
    var thisArg = arguments[1];
    var value;
    for (var i = 0; i < length; i++) {
      value = list[i];
      if (predicate.call(thisArg, value, i, list)) {
        return value;
      }
    }
    return undefined;
  };
}
chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', {
		frame: 'chrome',
		bounds: {
			width: 800,
			height: 500
		}
	}, function(w) {
		/*chrome.system.display.getInfo(function(displaysInfo) {
			var getPrimary = true;//displaysInfo.length === 1;
			var bounds = displaysInfo.find(function(displayInfo) {
				return displayInfo.isPrimary === getPrimary;
			}).workArea;
			w.setBounds(bounds);
			w.maximize();
		});*/
	});
});