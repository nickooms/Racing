var geometry;
var mesh;
function addGeometry() {
	geometry = new THREE.Geometry();
	/*geometry.vertices.push(new THREE.Vector3(152558.09, 0, -221854.09));
	geometry.vertices.push(new THREE.Vector3(152562.75, 0, -221856.96));
	geometry.vertices.push(new THREE.Vector3(152566.55, 0, -221850.09));
	geometry.vertices.push(new THREE.Vector3(152561.69, 0, -221846.49));
	
	geometry.vertices.push(new THREE.Vector3(152602.21, 0, -221882.88));
	geometry.vertices.push(new THREE.Vector3(152605.41, 0, -221877.62));
	
	geometry.vertices.push(new THREE.Vector3(152569.75, 0, -221848.96));
	geometry.vertices.push(new THREE.Vector3(152574.88, 0, -221851.03));
	geometry.vertices.push(new THREE.Vector3(152579.82, 0, -221842.89));
	geometry.vertices.push(new THREE.Vector3(152575.22, 0, -221840.16));
	
	geometry.vertices.push(new THREE.Vector3(152578.55, 0, -221930.54));
	geometry.vertices.push(new THREE.Vector3(152583.75, 0, -221933.47));
	geometry.vertices.push(new THREE.Vector3(152604.54, 0, -221901.08));
	geometry.vertices.push(new THREE.Vector3(152599.54, 0, -221897.55));
	
	geometry.vertices.push(new THREE.Vector3(152561.35, 0, -221939.27));
	geometry.vertices.push(new THREE.Vector3(152563.22, 0, -221935.94));
	geometry.vertices.push(new THREE.Vector3(152515.30, 0, -221912.21));
	geometry.vertices.push(new THREE.Vector3(152516.23, 0, -221916.94));*/
	
	//geometry.vertices.push(new THREE.Vector3(152514.30, 0, -221917.61));
	//geometry.vertices.push(new THREE.Vector3(152514.50, 0, -221912.48));
	
	//geometry.vertices.push(new THREE.Vector3(152512.90, 0, -221911.61));
	//geometry.vertices.push(new THREE.Vector3(152510.30, 0, -221915.61));
	
	//geometry.vertices.push(new THREE.Vector3(152512.30, 0, -221909.61));
	//geometry.vertices.push(new THREE.Vector3(152508.10, 0, -221916.21));
	
	//geometry.vertices.push(new THREE.Vector3(152473.97, 0, -221899.41));
	//geometry.vertices.push(new THREE.Vector3(152477.84, 0, -221892.62));
	
	/*geometry.faces.push(new THREE.Face3(0, 1, 2));
	geometry.faceVertexUvs[0][0] = [new THREE.Vector2(0, 0), new THREE.Vector2(0, 1), new THREE.Vector2(1, 1)];
	geometry.faces.push(new THREE.Face3(0, 3, 2));
	geometry.faceVertexUvs[0][1] = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)];
	
	geometry.faces.push(new THREE.Face3(1, 2, 4));
	geometry.faceVertexUvs[0][2] = [new THREE.Vector2(1, 0), new THREE.Vector2(0, 0), new THREE.Vector2(1, 1)];
	geometry.faces.push(new THREE.Face3(2, 4, 5));
	geometry.faceVertexUvs[0][3] = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];
	
	geometry.faces.push(new THREE.Face3(6, 7, 8));
	geometry.faceVertexUvs[0][4] = [new THREE.Vector2(1, 1), new THREE.Vector2(0, 1), new THREE.Vector2(0, 0)];
	geometry.faces.push(new THREE.Face3(6, 8, 9));
	geometry.faceVertexUvs[0][5] = [new THREE.Vector2(1, 1), new THREE.Vector2(0, 0), new THREE.Vector2(1, 0)];
	
	geometry.faces.push(new THREE.Face3(10, 11, 12));
	geometry.faceVertexUvs[0][6] = [new THREE.Vector2(1, 1), new THREE.Vector2(0, 1), new THREE.Vector2(0, 0)];
	geometry.faces.push(new THREE.Face3(10, 12, 13));
	geometry.faceVertexUvs[0][7] = [new THREE.Vector2(1, 1), new THREE.Vector2(0, 0), new THREE.Vector2(1, 0)];*/
	
	//witvenstraat
	/*geometry.faces.push(new THREE.Face3(14, 15, 16));
	geometry.faceVertexUvs[0][8] = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)];
	geometry.faces.push(new THREE.Face3(14, 16, 17));
	geometry.faceVertexUvs[0][9] = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];*/
	
	/*geometry.faces.push(new THREE.Face3(16, 17, 18));
	geometry.faceVertexUvs[0][10] = [new THREE.Vector2(1, 1), new THREE.Vector2(0, 1), new THREE.Vector2(0, 0)];
	geometry.faces.push(new THREE.Face3(16, 18, 19));
	geometry.faceVertexUvs[0][11] = [new THREE.Vector2(1, 1), new THREE.Vector2(0, 0), new THREE.Vector2(1, 0)];*/

	/*geometry.faces.push(new THREE.Face3(18, 19, 20));
	geometry.faceVertexUvs[0][12] = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)];
	geometry.faces.push(new THREE.Face3(18, 20, 21));
	geometry.faceVertexUvs[0][13] = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];*/
	
	/*geometry.faces.push(new THREE.Face3(20, 21, 22));
	geometry.faceVertexUvs[0][14] = [new THREE.Vector2(0, 1), new THREE.Vector2(1, 1), new THREE.Vector2(0, 0)];
	geometry.faces.push(new THREE.Face3(21, 22, 23));
	geometry.faceVertexUvs[0][15] = [new THREE.Vector2(1, 1), new THREE.Vector2(0, 0), new THREE.Vector2(1, 0)];*/
	
	/*geometry.faces.push(new THREE.Face3(22, 23, 24));
	geometry.faceVertexUvs[0][16] = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 1)];
	geometry.faces.push(new THREE.Face3(22, 24, 25));
	geometry.faceVertexUvs[0][17] = [new THREE.Vector2(0, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)];*/
						
	geometry.computeBoundingSphere();
	mesh = new THREE.Mesh(geometry, material5);
	scene.add(mesh);
}
