(function() {
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

    var level1 = [
      [true, true, true, true, true],
      [false, true, true, true, true],
      [false, false, true, true, true],
      [false, false, false, true, true],
      [false, false, false, false, true],
    ];

    var board = new Board(level1, root);

    var raycaster = new THREE.Raycaster();
  }

}());
