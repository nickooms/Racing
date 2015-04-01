var bochten = [];
var bochtMeshes = [];
var bochtenVisible = true;
function toggleBochten() {
	bochtenVisible = !bochtenVisible;
	for (var i = 0; i < bochtMeshes.length; i++) {
		bochtMeshes[i].visible = bochtenVisible;
	}
}
function addBocht(name, points) {
	var bocht = new THREE.Geometry();
	bocht.name = 'bochten ' + bochten.length + ' ' + name;
	var middle = new THREE.Vector3(points[0][0], 0, -points[0][1]);
	var spline = new THREE.Spline();
	spline.initFromArray([[points[1][0], 0, -points[1][1]],[points[2][0], 0, -points[2][1]],[points[3][0], 0, -points[3][1]]]);
//	spline.reparametrizeByArcLength(10);
	bocht.vertices.push(middle);
	for (var i = 0; i < spline.points.length; i++) {
		bocht.vertices.push(new THREE.Vector3(spline.points[i].x, 0, spline.points[i].z));
		if (i < spline.points.length - 1) {
			bocht.faces.push(new THREE.Face3(0, i + 1, i + 2));
		}
	}
	bocht.computeBoundingSphere();
	bochten.push({ name: name, points: points });
	var material = bochtMaterial.clone(new THREE.MeshBasicMaterial());
	var bochtMesh = new THREE.Mesh(bocht, material);
	bochtMesh.getWorldObject = function() {
		var objectName = this.geometry.name.split(' ', 3);
		return eval(objectName[0])[parseInt(objectName[1])];
	}
	bochtMesh.getCorners = function() {
		return [points[0],points[1],points[points.length - 1]];
	}
	bochtMeshes.push(bochtMesh);
	scene.add(bochtMesh);
	clickObjects.push(bochtMesh);
}
function addBochten() {
	addBocht('Witvenstraat', [[152463.24, 221884.96],[152466.98, 221879.49],[152466.44, 221884.96],[152468.71, 221887.76]]);
	addBocht('Markt', [[152606.81, 221886.56],[152605.88, 221887.62],[152606.14, 221886.82],[152605.61, 221885.49]]);
	addBocht('Markt', [[152568.55, 221851.36],[152566.55, 221850.03],[152568.29, 221850.03],[152570.02, 221848.70]]);
	addBocht('Markt', [[152573.88, 221852.56],[152574.82, 221850.70],[152574.82, 221851.76],[152575.22, 221853.50]]);
	addBocht('Markt', [[152530.03, 221835.77],[152528.16, 221838.57],[152530.56, 221836.70],[152532.96, 221837.63]]);
	addBocht('Markt', [[152610.94, 221891.09],[152609.74, 221893.09],[152611.34, 221892.29],[152613.47, 221892.69]]);
	addBocht('Markt', [[152504.83, 221866.83],[152501.90, 221865.63],[152504.30, 221865.63],[152506.30, 221863.89]]);
	addBocht('Markt', [[152524.70, 221832.97],[152521.50, 221831.90],[152523.23, 221833.50],[152523.10, 221835.77]]);
	addBocht('Markt', [[152511.50, 221828.44],[152522.83, 221832.57],[152510.83, 221830.84],[152498.70, 221834.44]]);
	addBocht('Markt', [[152489.37, 221835.77],[152498.57, 221834.57],[152491.90, 221839.63],[152485.10, 221849.37]]);
	addBocht('Markt', [[152456.98, 221882.16],[152459.78, 221875.76],[152456.05, 221879.76],[152450.98, 221879.62]]);
	addBocht('Witvenstraat Hogeweg', [[152460.58, 221891.48],[152458.04, 221895.15],[152461.84, 221892.82],[152465.31, 221893.28]]);
	addBocht('Witvenstraat Hogeweg', [[152452.18, 221887.28],[152446.18, 221884.55],[152448.65, 221889.15],[152447.45, 221892.95]]);
	addBocht('Platanenlaan Palmenlaan', [[152616.17, 222188.06],[152613.51, 222192.20],[152617.24, 222190.06],[152621.77, 222190.73]]);
	addBocht('Platanenlaan Palmenlaan', [[152620.84, 222181.26],[152625.77, 222184.20],[152624.17, 222180.47],[152624.84, 222175.67]]);
	addBocht('Platanenlaan Wilgenlaan', [[152656.00, 222115.77],[152651.60, 222113.01],[152653.75, 222116.64],[152653.24, 222120.44]]);
	addBocht('Platanenlaan Wilgenlaan', [[152662.50, 222119.69],[152659.49, 222124.69],[152663.61, 222122.42],[152668.61, 222123.25]]);
	addBocht('Berkenlaan Wilgenlaan', [[152591.82, 222071.49],[152587.95, 222077.24],[152592.52, 222074.56],[152598.13, 222075.67]]);
	addBocht('Berkenlaan Wilgenlaan', [[152597.75, 222066.88],[152602.18, 222069.71],[152600.02, 222065.94],[152600.96, 222061.68]]);
	addBocht('Berkenlaan Witvenstraat', [[152644.79, 221987.40],[152636.85, 221982.29],[152640.99, 221988.83],[152639.47, 221996.22]]);
	addBocht('Berkenlaan Witvenstraat', [[152649.43, 221990.78],[152643.73, 221999.39],[152649.68, 221995.42],[152657.70, 221996.52]]);
}
