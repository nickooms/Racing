var ground, gt, gg, gm;
function addGround() {
	//gt = THREE.ImageUtils.loadTexture('textures/grasslight-big.jpg');
	gg = new THREE.PlaneGeometry(1000, 1000);
	gm = new THREE.MeshBasicMaterial({
		//map: gt
		//color: 0x777777
		color: 'yellow'
	});
	gg.computeBoundingSphere();
	ground = new THREE.Mesh(gg, gm);
	ground.position.x = 152579.01;
	ground.position.z = -221865.83;
	ground.position.y = -0.1;
	
	ground.rotation.x = rot(-90);
	//ground.material.map.repeat.set(30, 30);
	//ground.material.map.wrapS = ground.material.map.wrapT = THREE.RepeatWrapping;
	ground.receiveShadow = true;
	scene.add(ground);
}
var GroundTest = [], GroundTestGeometry = [], GroundTestMaterial = [];
//var groundTest, groundTestGeometry, groundTestMaterial;
function addGround2(points, type, name, color) {
	var groundTest, groundTestGeometry, groundTestMaterial;
	groundTestGeometry = new THREE.PlaneGeometry(10, 10);
	groundTestGeometry.name = type + ' ' + GroundTestGeometry.length + ' ' + name;
	GroundTestGeometry.push(groundTestGeometry);
	groundTestMaterial = new THREE.MeshBasicMaterial({
		color: color
	});
	GroundTestMaterial.push(groundTestMaterial);
	groundTestGeometry.computeBoundingSphere();
	groundTest = new THREE.Mesh(groundTestGeometry, groundTestMaterial);
	groundTest.getWorldObject = function() {
		var objectName = this.geometry.name.split(' ', 3);
		return GroundTest[parseInt(objectName[1])];
	}
	groundTest.getCorners = function() {
		return points;
	}
	var item = {
		name: groundTestGeometry.name,
		points: points,
		type: type,
		finish: groundTestGeometry,
		finishMesh: groundTest
	};
	switch (type) {
		case 'Baan':
			Baan.items.push(item);
			break;
		case 'Voetpad':
			Voetpad.items.push(item);
			break;
		case 'Parking':
			Parking.items.push(item);
			break;
	}
	GroundTest.push(groundTest);
	var x0 = points[0][0];
	var z0 = -points[0][1];
	var x1 = points[1][0];
	var z1 = -points[1][1];
	var x2 = points[2][0];
	var z2 = -points[2][1];
	var x3 = points[3][0];
	var z3 = -points[3][1];
	groundTest.position.x = x3;
	groundTest.position.z = z3;
	groundTest.position.y = 0.05;
	groundTest.rotation.x = rot(-90);
	scene.add(groundTest);
	groundTest.geometry.vertices[0].x = x1 - x3;
	groundTest.geometry.vertices[0].y = z3 - z1;
	groundTest.geometry.vertices[1].x = x2 - x3;
	groundTest.geometry.vertices[1].y = z3 - z2;
	groundTest.geometry.vertices[2].x = x0 - x3;
	groundTest.geometry.vertices[2].y = z3 - z0;
	groundTest.geometry.vertices[3].x = 0;
	groundTest.geometry.vertices[3].y = 0;
	groundTest.geometry.verticesNeedUpdate = true;
}