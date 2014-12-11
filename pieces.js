var MAX = 500;
function getPoints(height, object){
	var points = [];
	for (var i = 0; i < object.length; i++) {
		var point = object[i];
		points.push(new THREE.Vector3(point[1] * SIZE * 2.1 / MAX, 0, point[0] * SIZE * 2 * height / MAX));
	}
	return points;
}
var piece = PIECES[0];
piece.points = getPoints(piece.height, [[0, 0], [3, 4], [101, 66], [144, 62], [145, 62], [179, 33], [285, 50], [325, 93], [336, 128], [337, 128], [371, 128], [396, 113], [399, 107], [420, 114], [421, 114], [500, 138], [500, 0]])
var piece = PIECES[1];
piece.points = getPoints(piece.height, [[0, 0], [0, 70], [30, 70], [30, 93], [56, 93], [57, 91], [65, 92], [85, 94], [131, 67], [132, 67], [231, 70], [352, 121], [353, 121], [404, 106], [405, 106], [500, 138], [500, 0]])
var piece = PIECES[2];
piece.points = getPoints(piece.height, [[0, 0], [3, 4], [85, 66], [124, 70], [124, 70], [149, 57], [150, 57], [196, 81], [222, 76], [222, 46], [347, 61], [391, 121], [435, 114], [436, 114], [480, 133], [481, 133], [500, 122], [500, 0]])