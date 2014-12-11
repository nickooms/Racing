var percent = 0;
var moving = false;
var TRACK_POSITIONS = 150;
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
//debugger;
//alert(trackSpline.getLength().chunks.length);
trackSpline.reparametrizeByArcLength(trackSpline.getLength() * 10);
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
for (i = 0; i < trackLength; i++) {
	if (i == trackLength) {
		trackIndex = 0;
	} else {
		trackIndex = i / (trackLength - 1);
	}
	//console.log(trackIndex);
	trackPosition = trackSpline.getPoint(trackIndex);
	trackGeometry.vertices[i] = new THREE.Vector3(trackPosition.x, trackPosition.y + 0.3, trackPosition.z);
	trackColors[i] = new THREE.Color(0xFF0000);
	trackPoint = new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 10), new THREE.MeshBasicMaterial({
		color: 0xFF0000,
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
	trackPoint.position.set(trackPosition.x, trackPosition.y + 0.3, trackPosition.z);
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
		line = new THREE.Line(p[3], p[0]);
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
	trackSpline.reparametrizeByArcLength(TRACK_POSITIONS);
	//alert(5);
}