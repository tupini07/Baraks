(function () {
  'use strict';

  window.onload = init;

  function init() {
    var root = new THREERoot({
      createCameraControls: !true,
      antialias: (window.devicePixelRatio === 1),
      fov: 80
    });

    root.renderer.setClearColor(0x000000, 0);
    root.renderer.setPixelRatio(window.devicePixelRatio || 1);
    root.camera.position.set(0, 0, 120);

    var s = new Square(root, true, 10, 20);

    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

    function onMouseMove(event) {

      // calculate mouse position in normalized device coordinates
      // (-1 to +1) for both components

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      console.log(root.scene.children);
    }



    window.addEventListener('mousedown', onMouseMove, false);

    window.requestAnimationFrame(root.render);

  }

}());
