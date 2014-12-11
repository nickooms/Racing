var lastSelected = null;
var clickedPoints = [];
var currentAction = null;
var sMenu = '<select id="ddSplit" style="display:none;"><option>1x1</option><option selected="true">2x1</option><option>1x2</option></select>' +
	'<button id="btnSplit" style="display:none;">Split</button>' +
	'<button id="btnMove">Move</button><br/>' +
	'<select id="ddStraten"></select><br/>' +
	'<button id="btnViews">Views</button><br/>' +
	'<button id="btnTiles">Tiles</button><br/>' +
	'<button id="btnNextView">Next View</button><br/>' +
	'<button id="btnTopView">Top View</button><br/>' +
	'<button id="btnStartStop">Start</button><br/>' +
	'<button id="btnBaan">Baan</button><br/>' +
	'<button id="btnVoetpad">Voetpad</button><br/>' +
	'<button id="btnParking">Parking</button><br/>' +
	'<button id="btnWalls">Muren</button><br/>' +
	'<button id="btnRoofs">Plat Dak</button><br/>' +
	'<button id="btnFloors">Vloeren</button><br/>' +
	'<button id="btnWindows">Ramen</button><br/>' +
	'<button id="btnStippel">Stippel</button><br/>' +
	'<button id="btnZebra">Zebra</button><br/>' +
	'<button id="btnCorners">Bochtjes</button><br/>' +
	'<button id="btnDals">Dals</button>';
function toggleMoving() {
	moving = !moving;
	$('#btnStartStop').text(moving ? 'Stop' : 'Start');
}
function nextView() {
	viewIndex++;
	if (viewIndex >= views.length) {
		viewIndex = 0;
	}
	setCamera(views[viewIndex]);
}
function topView() {
	if (typeof event != 'undefined' && event.shiftKey) {
			camera.position.y -= 20;
		} else {
			camera.position.y += 20;
		}
		camera.lookAt(new THREE.Vector3(camera.position.x, 0, camera.position.z));
}
function addControls() {
	divProperties = document.getElementById('Properties');
	divProperties.innerHTML = sMenu;
	$('#ddSplit').change(showSplit);
	$('#btnSplit').click(split);
	$('#btnMove').click(move);
	$('#btnStartStop').click(toggleMoving);
	$('#btnViews').click(toggleViews);
	$('#btnTiles').click(toggleTiles);
	$('#btnNextView').click(nextView);
	$('#btnTopView').click(topView);
	$('#btnWalls').click(function() {
		toggleHouses(this);
	});
	$('#btnRoofs').click(function() {
		toggleRoofs();
	});
	$('#btnFloors').click(function() {
		toggleFloors();
	});
	$('#btnStippel').click(function() {
		Stippel.toggle();
	});
	$('#btnZebra').click(function() {
		Zebra.toggle();
	});
	$('#btnCorners').click(function() {
		toggleBochten();
	});
	$('#btnDals').click(function() {
		Dals.toggle();
	});
	$('#btnWindows').click(function() {
		Ramen.toggle();
	});
	$('#btnBaan').click(function() {
		Baan.toggle();
	});
	$('#btnVoetpad').click(function() {
		Voetpad.toggle();
	});
	$('#btnParking').click(function() {
		Parking.toggle();
	});
	window.addEventListener('resize', onWindowResize, false);
	document.addEventListener('mousedown', onMouseDown, false);
	document.addEventListener('mousewheel', onDocumentMouseWheel, false);
	document.addEventListener('keydown', onKeyDown);
}
function formatCoordinate(coordinate) {
	var x = coordinate.x + '';
	if (x.indexOf('.') < 0) {
		x += '.';
	}
	while (x.length < 9) {
		x += '0';
	}
	var z = coordinate.z + '';
	if (z.indexOf('.') < 0) {
		z += '.';
	}
	while (z.length < 9) {
		z += '0';
	}
	return x.substr(0, 9) + ', ' + z.substr(0, 9);
}
function move() {
	currentAction = {
		action: 'move',
		object: lastSelected
	}
	//console.log(lastSelected.position);
}
function split() {
	var vertices = object.geometry.vertices;
	showSplit();
}
function showSplit() {
	var value = document.getElementById('ddSplit').value.split('x');
	for (var i = 0; i < parseInt(value[0]); i++) {
		var geom = object.geometry.clone(new THREE.Geometry());
		for (var iv = 0; iv < object.geometry.vertices.length; iv++) {
			geom.vertices[iv].x = object.geometry.vertices[iv].x - 1;
			geom.vertices[iv].y = 0.5;
			geom.vertices[iv].x = object.geometry.vertices[iv].z - 1;
		}
		var newObject = new THREE.Mesh(geom, object.material.clone(new THREE.MeshBasicMaterial()));
		object.material.wireframe = true;
		newObject.geometry.verticesNeedUpdate = true;
		newObject.matrixAutoUpdate = false;
		newObject.updateMatrix();
		//newObject.scale.x = newObject.scale.x * 1.2;
		for (var j = 0; i < parseInt(value[j]); j++) {
		
		}
		//scene.__objectsAdded.push(newObject);
		scene.add(newObject);
	}
	//initRenderer();
	//renderer.render(scene, camera);
}
var object;
var divProperties;
var clickedPoint;
var clickedObject;
function addProperties(object, deep){
	var s = '<table cellspacing="0" cellpadding="0">';
	for (var property in object) {
		var propertyName = property;
		if (property != 'setHex' && property != 'uuid' && property.substr(0, 1) != '_') {
			var type = typeof object[property];
			var value = object[property]
			if (type == 'function') {
				propertyName += '()';
				value = '';
			}
			if (type == 'object') {
				value = '<div onclick="this.nextSibling.style.display = this.nextSibling.style.display == \'\' ? \'none\' : \'\';">+</div>' +
					'<div style="display:none">' + (deep ? addProperties(value) : '') + '</div>';
			}
			if (property == 'position') {
				//debugger;
			}
			if (property == 'vertexShader' || property == 'fragmentShader') {
				value = '';
			}
			s += '<tr><td valign="top">' + /*type*/ '</td><td valign="top" nowrap="">' + propertyName + ' :</td><td valign="top">' + value + '</td></tr>';
		}
	}
	s += '</table>';
	return s;
}
var finishType = 'Baan';
var finishName = 'Markt';
function onMouseDown(event) {
	var controlClicked = false;
	if (divProperties.contains(event.target)) {
		return;
	}
	$('div#Menu, div#tiles').each(function(index, div) {
		if (div.contains(event.target)) {
			controlClicked = true;
		}
	});
	if (controlClicked) {
		return;
	}
	event.preventDefault();
	var projector = new THREE.Projector();
	var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1, 1);
	projector.unprojectVector(vector, camera);
	var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
	var intersects = raycaster.intersectObjects(GroundTest);
	var dist = 0.5;
	//alert(intersects.length);
	if (intersects.length > 0) {
		clickedPoint = raycaster.intersectObjects([ground])[0].point;
		if (currentAction != null) {
			switch (currentAction.action) {
				case 'move':
					$.post('moveTrack.html', JSON.stringify({
						id: currentAction.object.name,
						x: clickedPoint.x,
						z: clickedPoint.z
					}), function() {
						currentAction.object.position.set(clickedPoint.x, 0.3, clickedPoint.z);
						currentAction = null;
					});
					break;
			}
		} else {
			object = intersects[0].object;
			var material = object.material;
			//s += '<input type="text" value="' + point.x + ',' + point.z + '"/>';
			//var s = sMenu + addProperties(object, true);
			//s += '<tr><td colspan="2"></td><td>' + object.geometry.name + '</td></tr>';
			
			material.opacity = 0.8;
			//material.wireframe = true;
			//material.wireframeLinewidth = 10;
			//material.vertexColors = false; 
			//material.color.setHex(0xFF0000);
			if (material.ambient != null) {
			//material.ambient.setHex(0xFF0000);
			} else {
			//material.color.setHex(0xFF0000);
			}
			/*object.material = new THREE.LineBasicMaterial({
	 color: 0xFF0000,
	 linewidth: 1
	 });*/
			//divProperties.innerHTML = s;
			
			if (lastSelected != null) {
				var cornersFound = 0;
				var oldPoints = [];
				var points = [];
				var worldObject = object.getWorldObject();
				var data = object.getCorners();
				var coordinates = [];
				data.forEach(function(coord){
					coordinates.push({
						x: coord[0],
						y: 0,
						z: coord[1]
					});
				});
				for (var i = 0; i < coordinates.length; i++) {
					var objectX = coordinates[i].x;
					var objectY = coordinates[i].y;
					var objectZ = coordinates[i].z;
					oldPoints.push(formatCoordinate(coordinates[i]));
					var lastWorldObject = lastSelected.getWorldObject();
					var lastCoordinates = [];
					lastSelected.getCorners().forEach(function(coord){
						lastCoordinates.push({
							x: coord[0],
							y: 0,
							z: coord[1]
						});
					});
					for (var j = 0; j < lastCoordinates.length; j++) {
						var lastSelectedX = lastCoordinates[j].x;
						var lastSelectedY = lastCoordinates[j].y;
						var lastSelectedZ = lastCoordinates[j].z;
						var xOK = Math.abs(objectX - lastSelectedX) < dist;
						var yOK = Math.abs(objectY - lastSelectedY) < dist;
						var zOK = Math.abs(objectZ - lastSelectedZ) < dist;
						if (xOK && yOK && zOK) {
							console.log(formatCoordinate(coordinates[i]) + ' ' + object.geometry.name.split(' ')[0])
							console.log(formatCoordinate(lastCoordinates[j]) + ' ' + lastSelected.geometry.name.split(' ')[0]);
							cornersFound++;
							coordinates[i].x = lastSelectedX;
							coordinates[i].y = lastSelectedY;
							coordinates[i].z = lastSelectedZ;
						}
					}
					points.push(formatCoordinate(coordinates[i]));
				}
				if (cornersFound > 0) {
					prompt(object.geometry.name, oldPoints.join('],['));
					prompt(object.geometry.name, points.join('],['));
				}
			}
			lastSelected = object;
		}
	} else {
		var intersectObjects = raycaster.intersectObjects([ground]);
		if (intersectObjects.length > 0) {
			var point = intersectObjects[0].point;
			var value = '[' + (point.x + '').substr(0, 9) + ', ' + (-point.z + '').substr(0, 9) + ']';
			clickedPoints.push(value);
			if (clickedPoints.length == 4) {
				var clicked4Points = clickedPoints;
				//finishType = prompt('Type', finishType);
				//finishName = prompt('Name', finishName);
				var createFinish = 'addFinish([' + clicked4Points.join(',') + "], '" + finishType + "', '" + finishName + "');";
				switch (finishType) {
					case 'Baan':
						storage.getJSON('straat:' + finishName, function(straat) {
							var clicked4PointsBaan = clicked4Points;
							var coordinates = [];
							for (var i = 0; i < clicked4PointsBaan.length; i++) {
								coordinates.push(JSON.parse(clicked4PointsBaan[i]));
							}
							straat.coordinates.push(coordinates);
							storage.setJSON('straat:' + finishName, straat, function() {
								addFinish(coordinates, finishType, finishName);
								//eval(createFinish);
							});
						});
						break;
					default:
						if (prompt(finishType, createFinish) != null) {
							eval(createFinish);
						}
				}
				clickedPoints = [];
			}
		}
	} 
}
function onWindowResize(){
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseDown(event){
	event.preventDefault();
	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;
	onPointerDownLon = lon;
	onPointerDownLat = lat;
	document.addEventListener('mousemove', onDocumentMouseMove, false);
	document.addEventListener('mouseup', onDocumentMouseUp, false);
}

function onDocumentMouseMove(event){
	lon = (event.clientX - onPointerDownPointerX) * 0.1 + onPointerDownLon;
	lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
}

function onDocumentMouseUp(event){
	document.removeEventListener('mousemove', onDocumentMouseMove, false);
	document.removeEventListener('mouseup', onDocumentMouseUp, false);
}

function onDocumentMouseWheel(event){
	if (event.wheelDeltaY) {
		fov -= event.wheelDeltaY * 0.05;
	} else if (event.wheelDelta) {
		fov -= event.wheelDelta * 0.05;
	} else if (event.detail) {
		fov += event.detail * 1.0;
	}
	camera.projectionMatrix.makePerspective(fov, window.innerWidth / window.innerHeight, 1, 10000);
}

function onKeyDown(event){
	switch (event.keyCode) {
		case 'T'.charCodeAt(0):
			topView();
			//camera.rotation.x += rot(90);
			//camera.rotation.z = rot(-90);
			//camera.rotation.y = rot(90);
			/*var pos = camera.position.y;
			camera.lookAt({
				x: camera.position.x,
				y: pos,
				z: camera.position.z
			});*/
			break;
		case 'D'.charCodeAt(0):
			var div = document.getElementById('Properties');
			div.style.display = div.style.display == '' ? 'none' : '';
			break;
		case 'C'.charCodeAt(0):
			//prompt('', 'views.push({ x: ' + camera.position.x + ', y: ' + camera.position.y + ', z: ' + camera.position.z + ', ry: ' + (camera.rotation.y / (Math.PI / 180)) + ' });');
			console.log('views.push({ x: ' + camera.position.x + ', y: ' + camera.position.y + ', z: ' + camera.position.z + ', ry: ' + (camera.rotation.y / (Math.PI / 180)) + ' });');
			break;
		case 'V'.charCodeAt(0):
			nextView();
			break;
		case 32:
			toggleMoving();
			break;
		case 38:
			if (event.ctrlKey) {
				camera.position.y = camera.position.y * 1.1;
			} else {
				camera.position.z -= 5;
			}
			break;
		case 40:
			if (event.ctrlKey) {
				camera.position.y = camera.position.y / 1.1;
			} else {
				camera.position.z += 5;
			}
			break;
		case 37:
			if (event.ctrlKey) {
				camera.rotation.y -= rot(5);
			} else {
				camera.position.x += 5;
			}
			break;
		case 39:
			if (event.ctrlKey) {
				camera.rotation.y += rot(5);
			} else {
				camera.position.x -= 5;
			}
			break;
	}
}