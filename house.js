var houses = [];
var house = [], houseMaterial, houseMesh = [];
var roof = [], roofMaterial, roofMesh = [];
var floor = [], floorMaterial, floorMesh = [];
var ruiten = ruitenMaterial = [], ruitenMesh = [];
var innerWalls = [], innerWallsMaterial, innerWallsMesh = [];
var housesVisible = true;
var roofsVisible = true;
var floorsVisible = true;
function toggleHouses(button) {
	housesVisible = !housesVisible;
	button.style.backgroundColor = housesVisible ? 'black' : 'gray';
	button.style.backgroundColor = housesVisible ? 'lightgray' : 'white';
	for (var i = 0; i < houseMesh.length; i++) {
		houseMesh[i].visible = housesVisible;
		//houseMesh[i].material.opacity = housesVisible ? 1 : 0.1;
		//houseMesh[i].material.transparent = true;
	}
}
function toggleRoofs() {
	roofsVisible = !roofsVisible;
	for (var i = 0; i < roofMesh.length; i++) {
		roofMesh[i].visible = roofsVisible;
	}
}
function toggleFloors() {
	floorsVisible = !floorsVisible;
	for (var i = 0; i < floorMesh.length; i++) {
		floorMesh[i].visible = floorsVisible;
	}
}
function addHouse(name, points, height, color, floors) {
	if (floors == null) {
		floors = [{}];
	}
	var index = house.length;
	house.push(new THREE.Geometry());
	house[index].name = 'houses ' + finishes.length + ' ' + name;
	var vertices = house[index].vertices;
	var faces = house[index].faces;
	var faceVertexUv = house[index].faceVertexUvs[0];
	var frontLeftBottom = [new THREE.Vector3(points[0][0], 0, -points[0][1])];
	var frontRightBottom = [new THREE.Vector3(points[1][0], 0, -points[1][1])];
	var frontLeftTop = [new THREE.Vector3(points[0][0], height, -points[0][1])];
	var frontRightTop = [new THREE.Vector3(points[1][0], height, -points[1][1])];
	vertices.push(frontLeftBottom[0]);	// 0
	vertices.push(frontRightBottom[0]);	// 1
	vertices.push(new THREE.Vector3(points[2][0], 0, -points[2][1]));
	vertices.push(new THREE.Vector3(points[3][0], 0, -points[3][1]));
	vertices.push(frontLeftTop[0]);		// 4
	vertices.push(frontRightTop[0]);	// 5
	vertices.push(new THREE.Vector3(points[2][0], height, -points[2][1]));
	vertices.push(new THREE.Vector3(points[3][0], height, -points[3][1]));
	faces.push(new THREE.Face3(5, 1, 2));
	faceVertexUv.push([new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]);
	faces.push(new THREE.Face3(2, 6, 5));
	faceVertexUv.push([new THREE.Vector2(1, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)]);
	faces.push(new THREE.Face3(6, 2, 3));
	faceVertexUv.push([new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]);
	faces.push(new THREE.Face3(3, 7, 6));
	faceVertexUv.push([new THREE.Vector2(1, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)]);
	faces.push(new THREE.Face3(7, 3, 0));
	faceVertexUv.push([new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]);
	faces.push(new THREE.Face3(0, 4, 7));
	faceVertexUv.push([new THREE.Vector2(1, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)]);
	/*faces.push(new THREE.Face3(4, 0, 1));//Voorgevel links boven, links onder, rechts onder
	faceVertexUv.push([new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]);
	faces.push(new THREE.Face3(1, 5, 4));//Voorgevel rechts onder, rechts boven, links boven
	faceVertexUv.push([new THREE.Vector2(1, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)]);*/
	if (typeof color == 'string') {
		var t = addTexture('textures/' + color.split('|')[0]);
		var houseMaterial = new THREE.MeshPhongMaterial({
			map: t,
			//bumpMap: t,
			//bumpScale: 1,
			//specularMap: t,
			shininess: 50,
			shading: THREE.SmoothShading,
			opacity: 1,
			transparent: true
		});
	} else {
		var houseMaterial = new THREE.MeshPhongMaterial({
			map: imgTexture,
			//bumpMap: imgTexture,
			//bumpScale: 1,
			//specularMap: imgTexture,
			color: 0xff0000,
			ambient: color == null ? (Math.random() * 256 * 256 * 256) : color,
			specular: 0x666666,
			shininess: 50,
			shading: THREE.SmoothShading,
			opacity: 1,
			transparent: false
		});
	}
	for (var i = 0; i < floors.length; i++) {
		var floorBottom = height / floors.length * i;
		var floorTop = height / floors.length * (i + 1);
		//addFloor(name, points, floorBottom, floors[i].color);
		var holes = floors[i].holes;
		if (holes != null) {
			for (var j = 0; j < holes.length + 1; j++) {
				/*vertices.push(new THREE.Vector3(points[1][0], floorBottom, -points[1][1]));//rechts voor onder
				vertices.push(new THREE.Vector3(points[1][0], floorTop, -points[1][1]));//rechts voor boven
				vertices.push(new THREE.Vector3(points[2][0], floorTop, -points[2][1]));//rechts achter boven
				vertices.push(new THREE.Vector3(points[2][0], floorBottom, -points[2][1]));//rechts achter onder*/
				faces.push(new THREE.Face3(4, 0, 1));//Voorgevel links boven, links onder, rechts onder
				faceVertexUv.push([new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]);
				faces.push(new THREE.Face3(1, 5, 4));//Voorgevel rechts onder, rechts boven, links boven
				faceVertexUv.push([new THREE.Vector2(1, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)]);
				house[index].computeBoundingSphere();
				houseMesh.push(new THREE.Mesh(house[index], houseMaterial));
				scene.add(houseMesh[index]);
			}
		} else {
			faces.push(new THREE.Face3(4, 0, 1));//Voorgevel links boven, links onder, rechts onder
			faceVertexUv.push([new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)]);
			faces.push(new THREE.Face3(1, 5, 4));//Voorgevel rechts onder, rechts boven, links boven
			faceVertexUv.push([new THREE.Vector2(1, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)]);
			house[index].computeBoundingSphere();
			houseMesh.push(new THREE.Mesh(house[index], houseMaterial));
			scene.add(houseMesh[index]);
		}
	}
	if (typeof color == 'string' && color.indexOf('|') != -1) {
		var tRuiten = addTexture('textures/' + color.split('|')[1]);
		var houseMaterialRuiten = new THREE.MeshPhongMaterial({
			map: tRuiten,
			shininess: 50,
			shading: THREE.SmoothShading,
			opacity: 0.4,
			transparent: true
		});
		var ruitenIndex = ruiten.length;
		ruiten.push(house[index].clone()/*new THREE.Geometry()*/);
		ruiten[ruitenIndex].computeBoundingSphere();
		ruitenMesh.push(new THREE.Mesh(ruiten[ruitenIndex], houseMaterialRuiten));
		scene.add(ruitenMesh[ruitenIndex]);
		var item = {
			name: ruiten[ruitenIndex].name,
			points: points,
			type: 'Ramen',
			finish: ruiten[ruitenIndex],
			finishMesh: ruitenMesh[ruitenIndex]
		};
		Ramen.items.push(item);
	}
	clickObjects.push(houseMesh[index]);
	houses.push({ name: name, points: points, height: height, color: color });
	houseMesh[index].getWorldObject = function() {
		var objectName = this.geometry.name.split(' ', 3);
		return eval(objectName[0])[parseInt(objectName[1])];
	}
	houseMesh[index].getCorners = function() {
		return points;
	}
	clickObjects.push(houseMesh[index]);
	addFlatRoof(name, points, height, typeof color == 'string' ? 0x000000 : color);
	for (var i = 0; i < floors.length; i++) {
		var floorBottom = height / floors.length * i;
		var floorTop = height / floors.length * (i + 1);
		addFloor(name, points, floorBottom, floors[i].color);
		var walls = floors[i].walls;
		if (walls != null) {
			var index = innerWalls.length;
			innerWalls.push(new THREE.Geometry());
			var innerWall = innerWalls[index];
			innerWall.vertices.push(new THREE.Vector3(points[1][0], floorBottom, -points[1][1]));//rechts voor onder
			innerWall.vertices.push(new THREE.Vector3(points[1][0], floorTop, -points[1][1]));//rechts voor boven
			innerWall.vertices.push(new THREE.Vector3(points[2][0], floorTop, -points[2][1]));//rechts achter boven
			innerWall.vertices.push(new THREE.Vector3(points[2][0], floorBottom, -points[2][1]));//rechts achter onder
			innerWall.faces.push(new THREE.Face3(0, 1, 2));//rechts voor onder, rechts voor boven, rechts achter boven
			innerWall.faces.push(new THREE.Face3(0, 2, 3));//rechts voor onder, rechts achter boven, rechtzs achter onder
			innerWall.computeBoundingSphere();
			innerWallsMesh.push(new THREE.Mesh(innerWall, new THREE.MeshBasicMaterial({
				color: walls.right,
				opacity: 1,
				side: THREE.FrontSide,
				transparent: true
			})));
			scene.add(innerWallsMesh[index]);
			index = innerWalls.length;
			innerWalls.push(new THREE.Geometry());
			innerWall = innerWalls[index];
			innerWall.vertices.push(new THREE.Vector3(points[2][0], floorTop, -points[2][1]));//rechts achter boven
			innerWall.vertices.push(new THREE.Vector3(points[2][0], floorBottom, -points[2][1]));//rechts achter onder
			innerWall.vertices.push(new THREE.Vector3(points[3][0], floorTop, -points[3][1]));//links achter boven
			innerWall.vertices.push(new THREE.Vector3(points[3][0], floorBottom, -points[3][1]));//links achter onder
			innerWall.faces.push(new THREE.Face3(1, 0, 2));//rechts achter onder, rechts achter boven, links achter boven
			innerWall.faces.push(new THREE.Face3(3, 1, 2));//links achter boven, rechts achter onder, links achter onder
			innerWall.computeBoundingSphere();
			innerWallsMesh.push(new THREE.Mesh(innerWall, new THREE.MeshBasicMaterial({
				color: walls.back,
				opacity: 1,
				side: THREE.FrontSide,
				transparent: true
			})));
			scene.add(innerWallsMesh[index]);
			index = innerWalls.length;
			innerWalls.push(new THREE.Geometry());
			innerWall = innerWalls[index];
			innerWall.vertices.push(new THREE.Vector3(points[3][0], floorTop, -points[3][1]));//links achter boven
			innerWall.vertices.push(new THREE.Vector3(points[3][0], floorBottom, -points[3][1]));//links achter onder
			innerWall.vertices.push(new THREE.Vector3(points[0][0], floorTop, -points[0][1]));//links voor boven
			innerWall.vertices.push(new THREE.Vector3(points[0][0], floorBottom, -points[0][1]));//links voor onder
			innerWall.faces.push(new THREE.Face3(1, 0, 2));//links achter onder, links achter boven, links voor boven
			innerWall.faces.push(new THREE.Face3(3, 1, 2));//links voor boven, links achter onder, links voor onder
			innerWall.computeBoundingSphere();
			innerWallsMesh.push(new THREE.Mesh(innerWall, new THREE.MeshBasicMaterial({
				color: walls.left,
				opacity: 1,
				side: THREE.FrontSide,
				transparent: true
			})));
			scene.add(innerWallsMesh[index]);
			index = innerWalls.length;
			innerWalls.push(new THREE.Geometry());
			innerWall = innerWalls[index];
			innerWall.vertices.push(new THREE.Vector3(points[0][0], floorTop, -points[0][1]));//links voor boven
			innerWall.vertices.push(new THREE.Vector3(points[0][0], floorBottom, -points[0][1]));//links voor onder
			innerWall.vertices.push(new THREE.Vector3(points[1][0], floorTop, -points[1][1]));//rechts voor boven
			innerWall.vertices.push(new THREE.Vector3(points[1][0], floorBottom, -points[1][1]));//rechts voor onder
			innerWall.faces.push(new THREE.Face3(1, 0, 2));//links voor onder, links voor boven, rechts voor boven
			innerWall.faces.push(new THREE.Face3(3, 1, 2));//links voor boven, links voor onder, rechts voor onder
			innerWall.computeBoundingSphere();
			innerWallsMesh.push(new THREE.Mesh(innerWall, new THREE.MeshBasicMaterial({
				color: walls.front,
				opacity: 1,
				side: THREE.FrontSide,
				transparent: true
			})));
			scene.add(innerWallsMesh[index]);
		}
	}
}
function addFlatRoof(name, points, height, color) {
	var index = roof.length;
	roof.push(new THREE.Geometry());
	roof[index].vertices.push(new THREE.Vector3(points[0][0], height, -points[0][1]));
	roof[index].vertices.push(new THREE.Vector3(points[1][0], height, -points[1][1]));
	roof[index].vertices.push(new THREE.Vector3(points[2][0], height, -points[2][1]));
	roof[index].vertices.push(new THREE.Vector3(points[3][0], height, -points[3][1]));
	roof[index].faces.push(new THREE.Face3(0, 1, 2));
	roof[index].faces.push(new THREE.Face3(0, 2, 3));
	roof[index].computeBoundingSphere();
	roofMesh.push(new THREE.Mesh(roof[index], color == 0x000000 ? blackRoofMaterial : roofMaterial));
	scene.add(roofMesh[index]);
}
function addFloor(name, points, height, color) {
	if (color == null) {
		color = 0x000000;
	}
	var index = floor.length;
	floor.push(new THREE.Geometry());
	floor[index].vertices.push(new THREE.Vector3(points[0][0], height, -points[0][1]));
	floor[index].vertices.push(new THREE.Vector3(points[1][0], height, -points[1][1]));
	floor[index].vertices.push(new THREE.Vector3(points[2][0], height, -points[2][1]));
	floor[index].vertices.push(new THREE.Vector3(points[3][0], height, -points[3][1]));
	floor[index].faces.push(new THREE.Face3(0, 1, 2));
	floor[index].faces.push(new THREE.Face3(0, 2, 3));
	floor[index].computeBoundingSphere();
	floorMesh.push(new THREE.Mesh(floor[index], new THREE.MeshBasicMaterial({
		color: color,
		opacity: 1,
		side: THREE.DoubleSide,
		transparent: true
	})));
	scene.add(floorMesh[index]);
}