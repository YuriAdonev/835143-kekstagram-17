'use strict';

(function () {
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var SCALE_STEP = 25;

  var imageScale = 100;
  var editorWindow = document.querySelector('.img-upload__overlay');
  var form = document.querySelector('.img-upload__form');
  var imagePreviewBlock = document.querySelector('.img-upload__preview');
  var scaleControl = document.querySelector('.scale__control--value');
  var scaleIncreaseButton = document.querySelector('.scale__control--bigger');
  var scaleDecreaseButton = document.querySelector('.scale__control--smaller');

  window.editor = {
    open: open,
    close: close
  };

  function onEditWindowEscPress(evt) {
    if (evt.keyCode === window.utils.KeyCode.ESC) {
      close();
    }
  }

  function showImageScale() {
    scaleControl.value = imageScale + '%';
  }

  function changeImageScale() {
    imagePreviewBlock.style.transform = 'scale(' + (imageScale / 100) + ')';
  }

  function imageZoomIn() {
    if (imageScale < SCALE_MAX) {
      imageScale = imageScale + SCALE_STEP;
      changeImageScale();
      showImageScale();
    }
  }

  function imageZoomOut() {
    if (imageScale > SCALE_MIN) {
      imageScale = imageScale - SCALE_STEP;
      changeImageScale();
      showImageScale();
    }
  }

  function open() {
    editorWindow.classList.remove('hidden');
    document.addEventListener('keydown', onEditWindowEscPress);
    showImageScale();
  }

  function close() {
    editorWindow.classList.add('hidden');
    document.removeEventListener('keydown', onEditWindowEscPress);
    window.slider.reset();
    window.effects.reset();
    form.reset();
  }

  scaleIncreaseButton.addEventListener('click', function () {
    imageZoomIn();
  });

  scaleDecreaseButton.addEventListener('click', function () {
    imageZoomOut();
  });


})();
