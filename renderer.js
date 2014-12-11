var renderer;
function initRenderer(){
	//renderer = new THREE.WebGLRenderer();
	if (renderer != null) 
		document.body.removeChild(renderer.domElement);
	try {
		renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
			preserveDrawingBuffer: true
		});
	} catch (e) {
		try {
			renderer = new THREE.WebGLRenderer({
				antialias: true,
				alpha: true,
				devicePixelRatio: 1,
				preserveDrawingBuffer: true
			});
		} catch (e2) {
			renderer = new THREE.CanvasRenderer({});
		}
	}
	renderer.setClearColor(scene.fog.color, 1);
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.sortObjects = true;
	document.body.appendChild(renderer.domElement);
	/*renderer.gammaInput = true;
	 renderer.gammaOutput = true;
	 renderer.physicallyBasedShading = true;*/
}
