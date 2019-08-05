'use strict';

(function () {
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var SCALE_STEP = 25;

  var imageScale = 100;
  var container = document.querySelector('.img-upload__overlay');
  var imagePreview = document.querySelector('.img-upload__preview');
  var scaleControl = document.querySelector('.scale__control--value');
  var scaleIncreaseButton = document.querySelector('.scale__control--bigger');
  var scaleDecreaseButton = document.querySelector('.scale__control--smaller');

  window.editor = {
    open: open,
    close: close
  };

  function showImageScale() {
    scaleControl.value = imageScale + '%';
  }

  function changeImageScale() {
    imagePreview.style.transform = 'scale(' + (imageScale / 100) + ')';
  }

  function applyChanges() {
    changeImageScale();
    showImageScale();
  }

  function imageZoomIn() {
    if (imageScale < SCALE_MAX) {
      imageScale = imageScale + SCALE_STEP;
      applyChanges();
    }
  }

  function imageZoomOut() {
    if (imageScale > SCALE_MIN) {
      imageScale = imageScale - SCALE_STEP;
      applyChanges();
    }
  }

  function open() {
    container.classList.remove('hidden');
    showImageScale();
  }

  function close() {
    container.classList.add('hidden');
    window.slider.reset();
    window.effects.reset();
    window.form.reset();
    imageScale = 100;
    changeImageScale();
  }

  document.addEventListener('keydown', function (evt) {
    window.utils.executeOnEscPressed(evt.keyCode, window.editor.close);
  });

  scaleIncreaseButton.addEventListener('click', function () {
    imageZoomIn();
  });

  scaleDecreaseButton.addEventListener('click', function () {
    imageZoomOut();
  });


})();
