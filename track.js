var percent = 0;
var moving = false;
var TRACK_POSITIONS = 10;
/*var track = [
	[152578.28, 0, -221863.48],
	[152606.94, 0, -221883.08],
	[152579.49, 0, -221946.19],
	[152632.95, 0, -221976.00],
	[152637.75, 0, -222002.57],
	[152601.37, 0, -222055.65],
	[152606.91, 0, -222077.59],
	[152646.83, 0, -222105.05],
	[152534.41, 0, -222300.11],
	[152509.83, 0, -222306.05],
	[152466.18, 0, -222275.54],
	[152475.93, 0, -222234.86],
	[152636.96, 0, -222000.09],
	[152631.03, 0, -221974.24],
	[152461.52, 0, -221887.79],
	[152463.21, 0, -221874.65],
	[152506.86, 0, -221814.06]
];*/
track.push(track[0]);
var trackSpline = new THREE.Spline();
trackSpline.initFromArray(track.map(function(trackP) {
	return trackP.slice(1);
}));
var newTrack = [];
newTrack.push(track[0]);
for (var i = 1; i < track.length; i++) {
	
	var prev = track[i - 1];
	var point = track[i];
	//if (prev[4] === 0xff0000 && point[4] === 0xff0000) {
		//console.log('x : ' + prev[1] + ', y : ' + prev[3] + ' from');
		var width = Math.abs(prev[1] - point[1]);
		var height = Math.abs(prev[3] - point[3]);
		var rate = width / height;
		var dist = Math.sqrt(width * width + height * height) / 2;
		var x = Math.sqrt((dist * dist) * rate);
		var y = Math.sqrt((dist * dist) / rate);

		/*console.log('#' + prev[4].toString(16) + ' -> #' + point[4].toString(16));
		console.log([width, height].join('x'));
		console.log(dist.toFixed(2) + 'm');
		console.log([x.toFixed(2), y.toFixed(2)].join(','));*/
		x += Math.min(prev[1], point[1]);
		y += Math.min(prev[3], point[3]);
		//console.log([x.toFixed(2), y.toFixed(2)].join(','));
		var newPoint = new THREE.Mesh(new THREE.SphereGeometry(0.5, 10, 10), new THREE.MeshBasicMaterial({
			//color: 0xFF0000,
			color: 0x0000ff,
			wireframe: false,
			//opacity: 1,
			side: THREE.DoubleSide//,
			//transparent: true
		}));
		newPoint.name = 'RED';
		//newPoint.position.set(x, 0.3, y);
		x = (3 * prev[1] + point[1]) / 4;
		y = (3 * prev[3] + point[3]) / 4;
		newTrack.push([0, x, 0, y, 0xffffff]);
		x = (prev[1] + point[1]) / 2;
		y = (prev[3] + point[3]) / 2;
		newTrack.push([0, x, 0, y, 0xffffff]);
		x = (prev[1] + point[1] * 3) / 4;
		y = (prev[3] + point[3] * 3) / 4;
		newTrack.push([0, x, 0, y, 0xffffff]);
		//newPoint.position.set(x, 0.3, y);
		//newTrack.push([0, prev[1], 0, prev[3], 0xcccccc]);
		
		//setTimeout(function() {
			//scene.add(newPoint);
		//}, 1000);
		
		/*newTrack.push([0, prev[1], 0, prev[3], 0x0000ff]);
		newTrack.push([0, point[1], 0, point[3], 0x0000ff]);
		*/
	//}
	var nr = 1;
	for (var j = 0; j < nr; j++) {
		var to = (j + 0.5) / nr;
		var from = (-0.5 + nr - j) / nr;
		//console.log([from, to].join(','));
		var x = (prev[1] * from) + (point[1] * to);
		var y = (prev[3] * from) + (point[3] * to);
		if (prev[4] === 0xff0000 && point[4] === 0xff0000) {
			//console.log('x : ' + x.toFixed(1) + ', y : ' + y.toFixed(1));
		}
		//newTrack.push([0,x,0,y,0xffffff]);
	}
	if (prev[4] === 0xff0000 && point[4] === 0xff0000) {
		//console.log('x : ' + point[1] + ', y : ' + point[3] + ' to');
	}
	newTrack.push(track[i]);
}
track = newTrack;
trackSpline = new THREE.Spline();
trackSpline.initFromArray(track.map(function(trackP) {
	return trackP.slice(1);
}));
//debugger;
//alert(trackSpline.getLength().chunks.length);
//console.log(trackSpline.points.length * 100);
trackSpline.reparametrizeByArcLength(trackSpline.points.length * 5);
//alert(trackSpline.getLength().chunks.length);
var trackMaterial, trackGeometry = new THREE.Geometry(),
	trackColors = [],
	n_sub = 1;
var line, p, scale = 1, d = 0;
var trackPoint;
var trackPoints = [];
var trackPosition, trackIndex;
var parameters = [
	[trackMaterial, 1, [0, 0, 0], trackGeometry]
];
var trackLength = track.length * 1;
//console.log(trackSpline);
for (i = 0; i < trackLength; i++) {
	var color = (i * 256 / track.length) << 16 | 0 << 8 | (255 - (i * 256 / track.length));
	if (i == trackLength) {
		trackIndex = 0;
	} else {
		trackIndex = i;// / (trackLength - 1);
	}
	//console.log(trackIndex);
	if (track[i].length == 5) {
		color = track[i][4] == 0xffffff ? 0xffffff : 0xff0000;//track[i][4];
	}
	//console.log(track[i]);
	//trackPosition = trackSpline.getPoint(trackIndex);
	//console.log('POINT = ' + trackIndex);
	//console.log('LENGTH = ' + trackSpline.points.length);
	//console.log(trackLength);
	//trackPosition = trackSpline.points[trackIndex];
	var x = track[trackIndex][1];//trackPosition.x;
	var y = track[trackIndex][3];//trackPosition.z;
	//console.log([x, y].join(','));
	//console.log(trackPosition);
	
	trackGeometry.vertices[i] = new THREE.Vector3(x, 0.3, y);
	trackColors[i] = new THREE.Color(0xFF0000);
	trackPoint = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 10), new THREE.MeshBasicMaterial({
		//color: 0xFF0000,
		color: color,
		wireframe: false,
		//opacity: 1,
		side: THREE.DoubleSide//,
		//transparent: true
	}));
	try {
		trackPoint.name = track[i][0];
	} catch (e) {
		debugger;
	}
	trackPoint.position.set(x, 0.3, y);
	trackPoints.push(trackPoint);
	clickObjects.push(trackPoint);
	//trackColors[i].setHSL(0.6, 1.0, Math.max(0, -trackPosition.x / 200) + 0.5);
}
trackGeometry.colors = trackColors;
trackMaterial = new THREE.LineBasicMaterial({
	color: 0xFF0000,
	opacity: 1,
	linewidth: 1000,
	vertexColors: THREE.VertexColors
});
function addTrack() {
	for (i = 0; i < parameters.length; ++i) {
		p = parameters[i];
		//console.log(p);
		line = new THREE.Line(p[3], /*p[0]*/new THREE.LineBasicMaterial({
			color: 0x00ff00,
			opacity: 1,
			linewidth: 1000
			//vertexColors: THREE.VertexColors
		}));
		//line.color = 0x00ff00;

		line.scale.x = line.scale.y = line.scale.z = p[1];
		/*console.log('x: ' + p[2][0]);
		console.log('y: ' + p[2][1]);
		console.log('z: ' + p[2][2]);*/
		line.position.x = p[2][0];
		line.position.y = p[2][1];
		line.position.z = p[2][2];
		scene.add(line);
	}
	for (var i = 0; i < trackPoints.length; i++) {
		scene.add(trackPoints[i]);
	}
	//trackSpline.reparametrizeByArcLength(TRACK_POSITIONS);
	//alert(5);
}