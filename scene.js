var scene;
function addScene(){
	scene = new THREE.Scene();
	//scene.fog = new THREE.Fog(0xffffff, 1000, 10000);
	scene.fog = new THREE.Fog(0x6666ff, 1000, 10000);
	scene.add(new THREE.AmbientLight(0xFFFFFF));
	//scene.add(new THREE.AmbientLight(0x0000FF));
}