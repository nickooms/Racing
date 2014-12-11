var car = null;
var tire = [];
var tireMesh = []
function addCar() {
	car = new THREE.Object3D();
	tire.push(new THREE.CircleGeometry(40, 10));
	tire.push(new THREE.CircleGeometry(40, 10));
	tire.push(new THREE.CircleGeometry(40, 10));
	tire.push(new THREE.CircleGeometry(40, 10));
	for (var i = 0; i < tire.length; i++) {
		tireMesh.push(new THREE.Mesh(tire[0], tireMaterial));
		tireMesh[i].position.y = 40;
		tireMesh[i].rotation.y = rot(-90);
	}
	tireMesh[0].position.x = -100;
	tireMesh[0].position.z = -100;
	tireMesh[1].position.x = 100;
	tireMesh[1].position.z = -100;
	tireMesh[2].position.x = -100;
	tireMesh[2].position.z = 100;
	tireMesh[3].position.x = 100;
	tireMesh[3].position.z = 100;
	for (var i = 0; i < tireMesh.length; i++) {
		tireMesh[i].matrixAutoUpdate = false;
		tireMesh[i].updateMatrix();
		car.add(tireMesh[i]);
	}
}
