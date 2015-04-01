var camera;
var fov = 45;
var views = [];
views.push({ x: 152567.01, y: 1.707642565081503, z: -221845.83, ry: 139.99999999999994, name: 'Markt 19' });
views.push({ x: 154249.01, y: 436.24606709702897, z: -222755.83, ry: 0.005729577816116215, top: true, name: 'Kapellen' });
views.push({ x: 192395.03, y: 50.00, z: -185784.00, ry: 0.005729577816116215, top: true, name: 'ScherpenHeuvel' });
views.push({ x: 153755.30, y: 50, z: -216239.96, ry: 0.005729577816116215, top: true, name: 'Luchtbal' });
views.push({ x: 152559.01, y: 9.173863567262195, z: -221860.83, ry: 15.000000000000027, name: 't uveltje' });
views.push({ x: 152399.01, y: 13.493289711401214, z: -222385.83, ry: 70.0057295778161, name: 'Fred' });
views.push({ x: 152569.01, y: 2.657341500000001, z: -221940.83, ry: 109.99999999999997, name: 'Traiteur' });
views.push({ x: 152220.73, y: 182.45201830476057, z: -212308.24, ry: 0.005729577816116215, top: true, name: 'Grote Markt' });
views.push({ x: 154214.01, y: 201.70835284322297, z: -222940.83, ry: 0.005729577816116215, top: true, name: 'Engelselei' });
views.push({ x: 152554.01, y: 10.091249923988416, z: -221840.83, ry: 164.99999999999991, name: 'Markt 19' });
views.push({ x: 152549.01, y: 14.774599013711443, z: -221825.83, ry: 179.9999999999999, name: 'Markt 19 Lucht' });
views.push({ x: 152569.01, y: 1.5, z: -221855.83, ry: 45, name: 'Markt 19' });
views.push({ x: 152559.01, y: 2.415765000000001, z: -221845.83, ry: 139.99999999999994, name: 'Home' });
views.push({ x: 152569.01, y: 2.6573415000000007, z: -221860.83, ry: -94.99999999999993, name: 'doktor' });
views.push({ x: 152544.01, y: 2.657341500000001, z: -221925.83, ry: 114.99999999999997, name: 'DVV' });
views.push({ x: 152554.01, y: 8.339875970238358, z: -221860.83, ry: 179.9999999999999, name: 'Binnen Markt 19' });
views.push({ x: 152569.01, y: 1.5, z: -221940.83, ry: 74.99999999999999, name: 'Witvenstraat' });
views.push({ x: 152519.01, y: 21.5, z: -221920.83, ry: 0.005729577816116215, name: 'Witvenstraat Kronkel' });
views.push({ x: 152494.01, y: 2.657341500000001, z: -221900.83, ry: 139.99999999999994, name: 'Fortis' });
views.push({ x: 152609.01, y: 1.5, z: -221900.83, ry: 89.99999999999996, name: 'Hooghuisstraat' });
views.push({ x: 152587.20670012513, y: 3.8906136901500026, z: -221922.5601263244, ry: 140, name: 'Hooghuisstraat' });
views.push({ x: 152524.01, y: 1.5, z: -221920.83, ry: 74.99999999999999, name: 'Witvenstraat 75' });
views.push({ x: 152564.01, y: 1.5, z: -221850.83, ry: 60.000000000000036, name: 'Zebra Markt 19' });
views.push({ x: 152564.01, y: 2.657341500000001, z: -221850.83, ry: 80.00000000000001, name: 'Zebra Markt 19' });
views.push({ x: 152569.01, y: 1.5, z: -221940.83, ry: 74.99999999999999, name: 'Witvenstraat' });
views.push({ x: 152569.01, y: 1.5, z: -221855.83, ry: 29.999999999999996, name: 't Jupke' });
views.push({ x: 152479.5686510631, y: 7.581705427489416, z: -221896.74577058226, ry: 65.6158567492116, name: 'KBC' });
views.push({ x: 152579.01, y: 1.5, z: -221865.83, ry: 45, name: '0' });
views.push({ x: 152574.01, y: 1.5, z: -221860.83, ry: 45, name: '1' });
views.push({ x: 152564.01, y: 1.5, z: -221850.83, ry: 85, name: '3' });
views.push({ x: 152564.01, y: 2.415765000000001, z: -221850.83, ry: 124.99999999999996, name: '4' });
views.push({ x: 152564.01, y: 8.339875970238358, z: -221830.83, ry: 179.9999999999999, name: '9' });
views.push({ x: 152554.01, y: 14.774599013711443, z: -221830.83, ry: 179.9999999999999, name: '10' });
views.push({ x: 152644.01, y: 14.03123089912559, z: -222205.83, ry: 65.00572929136587, name: '11' });
views.push({ x: 152599.01, y: 1.5, z: -221875.83, ry: 45, name: '12' });
views.push({ x: 152609.01, y: 1.5, z: -221900.83, ry: 89.99999999999996, name: '17' });
views.push({ x: 152569.01, y: 1.5, z: -221855.83, ry: -20.000000000000007, name: '21' });
views.push({ x: 152574.01, y: 1.5, z: -221855.83, ry: 20, name: '22' });
views.push({ x: 152569.01, y: 11.5, z: -221940.83, ry: 0.005729291365875756, name: '25' });
//views.push({ x: 152564.01, y: 2.415765000000001, z: -221850.83, ry: 124.99999999999996 });
//views.push({ x: 152554.01, y: 31.5, z: -221845.83, ry: 0.005729291365875756 });
views.push({ x: 152456.32269096922, y: 31.5, z: -221890.6516870323, ry: 0.005729291365875756, name: '26' });
views.push({ x: 152584.01, y: 28.465254766623474, z: -221945.83, ry: 15.005729291365874, name: '27' });
views.push({ x: 152619.01, y: 15.434353989038149, z: -222190.83, ry: 0.005729291365875756, name: '28' });
views.push({ x: 152664.01, y: 35.43435398903815, z: -222115.83, ry: 0.005729291365875756, name: '29' });
views.push({ x: 152594.01, y: 31.03227511033272, z: -222065.83, ry: 0.005729291365875756, name: '30' });
views.push({ x: 152649.01, y: 33.92213465777702, z: -221990.83, ry: 0.005729291365875756, name: '31' });
views.push({ x: 152574.01, y: 28.825289649718453, z: -221945.83, ry: 0.005729291365875756, name: '32' });
var viewIndex = 0;
function toggleViews() {
	var size = 10;
	var canvas = $('canvas');
	if ($('div#views').length == 0) {
  	var index = 0;
  	var div = $('<div id="views"/>');
  	var w = canvas.width();
  	var h = canvas.height();
  	//debugger;
			//alert(canvas[0].toDataURL().length);
			canvas[0].setAttribute('width', size);
			canvas[0].setAttribute('height', size);
			//alert(canvas[0].toDataURL());
			//window.open(canvas[0].toDataURL());
			var ul = $('<ul>' +
			views.map(function(v){
				setCamera(views[index]);
				var src = canvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream');
				var li = '<li onclick="viewIndex = ' + index + '; $(\'div#views\').toggle(); setCamera(views[viewIndex]);"><img src="' + src + '"/><span>' + v.name + '</span></li>';
				index++;
				return li;
			}).join('\n') +
			'</ul>').appendTo(div);
			canvas[0].setAttribute('width', w);
			canvas[0].setAttribute('height', h);
			div.css({
				position: 'absolute',
				width: window.innerWidth / 1.5,
				height: window.innerHeight / 1.5,
				left: window.innerWidth / 6,
				top: window.innerHeight / 6,
				backgroundColor: 'gray',
				overflowY: 'scroll',
                zIndex: 1000
			});
			setCamera(views[viewIndex]);
			div.appendTo(document.body);
		} else {
			$('div#views').toggle();
		}
}
var tileIndex = null;
function toggleTiles() {
	var size = 10;
	var canvas = $('canvas');
	if ($('div#tiles').length == 0) {
  	var index = 0;
  	var div = $('<div id="tiles"/>');
  	//var w = canvas.width();
  	//var h = canvas.height();
  	//debugger;
			//alert(canvas[0].toDataURL().length);
			//canvas[0].setAttribute('width', size);
			//canvas[0].setAttribute('height', size);
			//alert(canvas[0].toDataURL());
			//window.open(canvas[0].toDataURL());
			var ul = $('<ul>' +
			tileGroups.map(function(v){
				//setCamera(views[index]);
				///var src = canvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream');
				var li = '<li tileIndex="' + index + '" class="tileAreaList"><span>' + v[4] + '</span></li>';
				index++;
				return li;
			}).join('\n') +
			'</ul>').appendTo(div);
			//canvas[0].setAttribute('width', w);
			//canvas[0].setAttribute('height', h);
			div.css({
				position: 'absolute',
				width: window.innerWidth / 1.5,
				height: window.innerHeight / 1.5,
				left: window.innerWidth / 6,
				top: window.innerHeight / 6,
				backgroundColor: 'gray',
				overflowY: 'scroll',
                zIndex: 1000
			});
			//setCamera(views[viewIndex]);
			div.appendTo(document.body);
			$('li.tileAreaList').click(function() {
				var tileIndex = this.getAttribute('tileIndex');
				$('div#tiles').toggle();
				addTiles(tileGroups[tileIndex]);
			});
		} else {
			$('div#tiles').toggle();
		}
}
function addCamera() {
	camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, 1, 10000);
}
function setCamera(view) {
	camera.position.x = view.x;
	camera.position.y = view.y;
	camera.position.z = view.z;
	camera.lookAt({
		x: 0,
		y: 0,
		z: 0
	});
	camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 10000);
	camera.rotation.y = rot(view.ry);
	if (view.top) {
		topView();
	}
}
function initCamera() {
	fov = fov * 1.40;
	/*camera.position.x = 152579.01;
	camera.position.y = 1.5;
	camera.position.z = -221865.83;*/
	setCamera(views[viewIndex]);
}
