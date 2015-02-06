window.AK47 = {
	init: function(callback) {
		var img = document.createElement('img');
		AK47.img = img;
		img.style.position = 'absolute';
		img.style.left = '100px';
		img.style.zIndex = 5000;
		img.style.display = 'none';
		img.onload = function() {
			AK47.img.style.top = '500px';
			callback();
		};
		img.src = 'obj/AK-47_Gold_CoD4.png';
		document.body.appendChild(img);
	},
	show: function() {
		AK47.img.style.display = '';
	}
}