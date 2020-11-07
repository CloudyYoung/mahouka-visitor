'use strict';

$('body').append(`<canvas class="bg_canvas animated fadeIn delay-4" id="bg_canvas"></canvas>`);

function _defineProperty(obj, x, value) {
  if (x in obj) {
    Object.defineProperty(obj, x, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[x] = value;
  }
  return obj;
}

(function () {
  function _updateManual() {
    self.update();
    view.update();
  }

  var lastScreenWidth = window.innerWidth;
  var element = $("#bg_canvas");
  var value = element.width();
  var index = element.height();
  element.attr("width", value);
  element.attr("height", index);
  var SET_A = 150;
  var startScaleVariance = 0.1;
  var view = null;
  var self = null;
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.indexOf("msie") != -1 || ua.indexOf("trident") != -1) {

  } else {
    if (lastScreenWidth > 750) {
      var _SET_BY_CODE;
      if (lastScreenWidth > 1400) {
        startScaleVariance = 0.3;
      }
      view = new createjs.Stage("bg_canvas");
      self = new particlejs.ParticleSystem;
      view.addChild(self.container);
      self.importFromJson((_SET_BY_CODE = {
        "bgColor": "#000000",
        "width": value,
        "height": index * 2,
        "emitFrequency": 300,
        "startX": 260,
        "startXVariance": 800,
        "startY": index * 2 + 20,
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
      },
        _defineProperty(_SET_BY_CODE, "emitFrequency", SET_A),
        _defineProperty(_SET_BY_CODE, "startYVariance", 0),
        _defineProperty(_SET_BY_CODE, "startXVariance", value),
        _defineProperty(_SET_BY_CODE, "width", value),
        _defineProperty(_SET_BY_CODE, "height", index),
        _defineProperty(_SET_BY_CODE, "startX", value / 2),
        _defineProperty(_SET_BY_CODE, "startY", index + 10),
        _SET_BY_CODE));

      createjs.Ticker.framerate = 60;
      createjs.Ticker.on("tick", _updateManual);
    }
  }

  var gotoNewOfflinePage = function draw() {
    lastScreenWidth = window.innerWidth;
    if (self) {
      var width = element.width();
      var height = element.height();
      element.attr("width", width);
      element.attr("height", height);
      self.height = height;
      self.width = width;
      self.startY = height + 10;
      self.startX = width / 2;
      self.startYVariance = 0;
      self.startXVariance = width;
    }
  };
  $(window).on("resize", function () {
    gotoNewOfflinePage();
  });

})();
