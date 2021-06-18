'use strict';

$('body').append(`<canvas class="bg_canvas transparent" id="bg_canvas"></canvas>`);

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(function () {

  $(".c-nav__link--top").addClass("is-current");

  var windowWidth = window.innerWidth;

  var $canvas = $("#bg_canvas");
  var canvasWidth = $canvas.width();
  var canvasHeight = $canvas.height();
  $canvas.attr("width", canvasWidth);
  $canvas.attr("height", canvasHeight);

  // PCのみパーティクルアニメーション(IEは動作させない)
  var emitFrequency = 150;
  var startScaleVariance = 0.1;
  var stage = null;
  var particleSystem = null;
  var _particleSystem$impor;

  if (windowWidth > 1400) {
    startScaleVariance = 0.5;
  }
  stage = new createjs.Stage('bg_canvas');
  // パーティクルシステム作成します。
  particleSystem = new particlejs.ParticleSystem();
  // パーティクルシステムの描画コンテナーを表示リストに登録します。
  stage.addChild(particleSystem.container);
  particleSystem.importFromJson((_particleSystem$impor = {
    "bgColor": "#000000",
    "width": 513,
    "height": 829,
    "emitFrequency": 300,
    "startX": 260,
    "startXVariance": 500,
    "startY": 847,
    "startYVariance": 0,
    "initialDirection": 270,
    "initialDirectionVariance": 45.5,
    "initialSpeed": 0.9,
    "initialSpeedVariance": 5.3,
    "friction": 0,
    "accelerationSpeed": 0,
    "accelerationDirection": 271.4,
    "startScale": 0.1,
    "startScaleVariance": startScaleVariance,
    "finishScale": "0",
    "finishScaleVariance": "0",
    "lifeSpan": 427,
    "lifeSpanVariance": "500",
    "startAlpha": "0.51",
    "startAlphaVariance": "1",
    "finishAlpha": "0",
    "finishAlphaVariance": "0",
    "shapeIdList": ["blur_circle"],
    "startColor": {
      "hue": 196,
      "hueVariance": "0",
      "saturation": 70,
      "saturationVariance": 0,
      "luminance": 77,
      "luminanceVariance": 0
    },
    "blendMode": true,
    "alphaCurveType": "0",
    "VERSION": "1.0.0"

  }, _defineProperty(_particleSystem$impor, "emitFrequency", emitFrequency), _defineProperty(_particleSystem$impor, "startYVariance", 0), _defineProperty(_particleSystem$impor, "startXVariance", canvasWidth), _defineProperty(_particleSystem$impor, "width", canvasWidth), _defineProperty(_particleSystem$impor, "height", canvasHeight), _defineProperty(_particleSystem$impor, "startX", canvasWidth / 2), _defineProperty(_particleSystem$impor, "startY", canvasHeight + 10), _particleSystem$impor));
  createjs.Ticker.framerate = 30;
  createjs.Ticker.on('tick', handleTick);

  function handleTick() {
    // パーティクルの発生・更新
    particleSystem.update();

    // 描画を更新する
    stage.update();
  }

})();
