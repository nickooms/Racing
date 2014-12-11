var golf, golfMesh, golfMaterial;
function addGolf() {
	golf = new THREE.Geometry();
	golf.vertices.push(new THREE.Vector3(0, 0, 0));
	golf.vertices.push(new THREE.Vector3(0, 2, 0));
	golf.vertices.push(new THREE.Vector3(1, 0, 0));
	golf.vertices.push(new THREE.Vector3(1, 2, 0));
	golf.faces.push(new THREE.Face3(2, 1, 0));
	golf.faceVertexUvs[0][0] = [new THREE.Vector2(0, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)];
	golf.faces.push(new THREE.Face3(1,3, 2));
	golf.faceVertexUvs[0][1] = [new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];
	golf.vertices.push(new THREE.Vector3(0, 0, 1));
	golf.vertices.push(new THREE.Vector3(0, 2, 1));
	golf.vertices.push(new THREE.Vector3(1, 0, 1));
	golf.vertices.push(new THREE.Vector3(1, 2, 1));
	golf.faces.push(new THREE.Face3(6, 5, 4));
	golf.faceVertexUvs[0][2] = [new THREE.Vector2(0, 1), new THREE.Vector2(1, 0), new THREE.Vector2(0, 0)];
	golf.faces.push(new THREE.Face3(5,7, 6));
	golf.faceVertexUvs[0][3] = [new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];
	golf.computeBoundingSphere();
	
	golfMesh = new THREE.Mesh(golf, golfMaterial);
	golfMesh.rotation.z = rot(90);
	golfMesh.rotation.y = rot(45);
	golfMesh.position.y = 0;
	scene.add(golfMesh);
}
function setGolf() {
	golfMesh.position.x = trackSpline.points[percent + 10 >= trackSpline.points.length -1 ? percent : percent + 10].x;
	golfMesh.position.z = trackSpline.points[percent + 10 >= trackSpline.points.length -1 ? percent : percent + 10].z;
	golfMesh.position.y = 0;
}
