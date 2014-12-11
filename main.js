/*jslint browser:true, devel:true, white:true, vars:true, eqeq:true */
/*global THREE:false, requestAnimationFrame:false*/

/*
 * Based on http://threejs.org/examples/canvas_geometry_cube.html
 */
var onDeviceReady = function () {                          // called when Cordova is ready
    if (window.Cordova && navigator.splashscreen) {     // Cordova API detected
        navigator.splashscreen.hide();                 // hide splash screen
    }
};
document.addEventListener("deviceready", onDeviceReady, false);
document.addEventListener('DOMContentLoaded', function () {
    var camera, scene, renderer;

    var cube, plane;

    var targetRotation = 0;
    var targetRotationOnMouseDown = 0;

    var mouseX = 0;
    var mouseXOnMouseDown = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var auto_timer = 0;

    init();
    animate();

    function init() {
        renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            devicePixelRatio: 1
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        camera = new THREE.PerspectiveCamera(
            70, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.y = 150;
        camera.position.z = 500;

        scene = new THREE.Scene();

        // Cube
        var geometry_cube = new THREE.CubeGeometry(200, 200, 200);

        var texture = THREE.ImageUtils.loadTexture('textures/crosswalk.png'); //Works on mobile Android NOT in Browser or XDK
        texture.anisotropy = renderer.getMaxAnisotropy();

        var material_cube = new THREE.MeshBasicMaterial({
            map: texture
        });

        cube = new THREE.Mesh(geometry_cube, material_cube);
        cube.position.y = 150;
        scene.add(cube);

        // Plane
        var geometry_plane = new THREE.PlaneGeometry(180, 180);
        geometry_plane.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

        var material_plane = new THREE.MeshBasicMaterial({
            color: 0xde613e
        });

        plane = new THREE.Mesh(geometry_plane, material_plane);
        scene.add(plane);

        document.addEventListener('mousedown', onDocumentMouseDown, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);

        // Generic setup

        window.addEventListener('resize', onWindowResize, false);
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    function stopAutoRotate() {
        if (auto_timer)
            window.clearTimeout(auto_timer);
        auto_timer = window.setTimeout(startAutoRotate, 1000);
    }

    function startAutoRotate() {
        auto_timer = 0;
    }

    function animate() {
        requestAnimationFrame(animate);
        plane.rotation.y = cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05;
        if (auto_timer === 0) {
            targetRotation += 0.025;
        }
        renderer.render(scene, camera);
    }

    function onDocumentMouseDown(e) {
        e.preventDefault();
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('mouseup', onDocumentMouseUp, false);
        document.addEventListener('mouseout', onDocumentMouseOut, false);
        mouseXOnMouseDown = e.clientX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;
        stopAutoRotate();
    }

    function onDocumentMouseMove(e) {
        mouseX = e.clientX - windowHalfX;
        targetRotation = targetRotationOnMouseDown +
            (mouseX - mouseXOnMouseDown) * 0.02;
        stopAutoRotate();
    }

    function onDocumentMouseUp(e) {
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
        document.removeEventListener('mouseout', onDocumentMouseOut, false);
        stopAutoRotate();
    }

    function onDocumentMouseOut(e) {
        document.removeEventListener('mousemove', onDocumentMouseMove, false);
        document.removeEventListener('mouseup', onDocumentMouseUp, false);
        document.removeEventListener('mouseout', onDocumentMouseOut, false);
        stopAutoRotate();
    }

    function onDocumentTouchStart(e) {
        if (e.touches.length === 1) {
            e.preventDefault();
            mouseXOnMouseDown = e.touches[0].pageX - windowHalfX;
            targetRotationOnMouseDown = targetRotation;
            stopAutoRotate();
        }
    }

    function onDocumentTouchMove(e) {
        if (e.touches.length === 1) {
            e.preventDefault();
            mouseX = e.touches[0].pageX - windowHalfX;
            targetRotation = targetRotationOnMouseDown +
                (mouseX - mouseXOnMouseDown) * 0.05;
            stopAutoRotate();
        }
    }
});