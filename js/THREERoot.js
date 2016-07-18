var THREERoot = (function () {
  'use strict';


  function THREERoot(params) {
    params = utils.extend({
      fov: 60,
      zNear: 10,
      zFar: 100000,

      createCameraControls: true
    }, params);

    this.renderer = new THREE.WebGLRenderer({
      antialias: params.antialias,
      alpha: true
    });
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    document.getElementById('three-container').appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      params.fov,
      window.innerWidth / window.innerHeight,
      params.zNear,
      params.zfar
    );

    this.scene = new THREE.Scene();

    if (params.createCameraControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
    }

    this.resize = this.resize.bind(this);
    this.tick = this.tick.bind(this);

    this.resize();
    this.tick();

    window.addEventListener('resize', this.resize, false);
  }
  THREERoot.prototype = {
    tick: function () {
      this.update();
      this.render();
      requestAnimationFrame(this.tick);
    },
    update: function () {
      this.controls && this.controls.update();
    },
    render: function () {
      this.renderer.render(this.scene, this.camera);
    },
    resize: function () {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  };


  var utils = {
    extend: function (dst, src) {
      for (var key in src) {
        dst[key] = src[key];
      }

      return dst;
    },
    randSign: function () {
      return Math.random() > 0.5 ? 1 : -1;
    },
    ease: function (ease, t, b, c, d) {
      return b + ease.getRatio(t / d) * c;
    },
    fibSpherePoint: (function () {
      var vec = {
        x: 0,
        y: 0,
        z: 0
      };
      var G = Math.PI * (3 - Math.sqrt(5));

      return function (i, n, radius) {
        var step = 2.0 / n;
        var r, phi;

        vec.y = i * step - 1 + (step * 0.5);
        r = Math.sqrt(1 - vec.y * vec.y);
        phi = i * G;
        vec.x = Math.cos(phi) * r;
        vec.z = Math.sin(phi) * r;

        radius = radius || 1;

        vec.x *= radius;
        vec.y *= radius;
        vec.z *= radius;

        return vec;
      }
    })(),
    spherePoint: (function () {
      return function (u, v) {
        u === undefined && (u = Math.random());
        v === undefined && (v = Math.random());

        var theta = 2 * Math.PI * u;
        var phi = Math.acos(2 * v - 1);

        var vec = {};
        vec.x = (Math.sin(phi) * Math.cos(theta));
        vec.y = (Math.sin(phi) * Math.sin(theta));
        vec.z = (Math.cos(phi));

        return vec;
      }
    })()
  };

  function createTweenScrubber(tween, seekSpeed) {
    seekSpeed = seekSpeed || 0.001;

    function stop() {
      TweenMax.to(tween, 1, {
        timeScale: 0
      });
    }

    function resume() {
      TweenMax.to(tween, 1, {
        timeScale: 1
      });
    }

    function seek(dx) {
      var progress = tween.progress();
      var p = THREE.Math.clamp((progress + (dx * seekSpeed)), 0, 1);

      tween.progress(p);
    }

    var _cx = 0;

    // desktop
    var mouseDown = false;
    document.body.style.cursor = 'pointer';

    window.addEventListener('mousedown', function (e) {
      mouseDown = true;
      document.body.style.cursor = 'ew-resize';
      _cx = e.clientX;
      stop();
    });
    window.addEventListener('mouseup', function (e) {
      mouseDown = false;
      document.body.style.cursor = 'pointer';
      resume();
    });
    window.addEventListener('mousemove', function (e) {
      if (mouseDown === true) {
        var cx = e.clientX;
        var dx = cx - _cx;
        _cx = cx;

        seek(dx);
      }
    });
    // mobile
    window.addEventListener('touchstart', function (e) {
      _cx = e.touches[0].clientX;
      stop();
      e.preventDefault();
    });
    window.addEventListener('touchend', function (e) {
      resume();
      e.preventDefault();
    });
    window.addEventListener('touchmove', function (e) {
      var cx = e.touches[0].clientX;
      var dx = cx - _cx;
      _cx = cx;

      seek(dx);
      e.preventDefault();
    });
  }
  return THREERoot;
})();
