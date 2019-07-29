'use strict';

(function () {
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var SCALE_STEP = 25;

  var imageScale = 100;
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadCancelButton = document.querySelector('#upload-cancel');
  var imagePreviewBlock = document.querySelector('.img-upload__preview');
  var scaleIncreaseButton = document.querySelector('.scale__control--bigger');
  var scaleDecreaseButton = document.querySelector('.scale__control--smaller');

  window.editor = {
    closeEditWindow: closeEditWindow,
    showImageScale: function () {
      document.querySelector('.scale__control--value').value = imageScale + '%';
    },
  };

  function onEditWindowEscPress(evt) {
    if (evt.keyCode === window.utils.KeyCode.ESC) {
      closeEditWindow();
    }
  }

  function changeImageScale() {
    imagePreviewBlock.style.transform = 'scale(' + (imageScale / 100) + ')';
  }

  function imageZoomIn() {
    if (imageScale < SCALE_MAX) {
      imageScale = imageScale + SCALE_STEP;
      changeImageScale();
      window.editor.showImageScale();
    }
  }

  function imageZoomOut() {
    if (imageScale > SCALE_MIN) {
      imageScale = imageScale - SCALE_STEP;
      changeImageScale();
      window.editor.showImageScale();
    }
  }

  function openEditWindow() {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.addEventListener('keydown', onEditWindowEscPress);
    window.editor.showImageScale();
  }

  function closeEditWindow() {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    uploadFileInput.value = '';
    document.removeEventListener('keydown', onEditWindowEscPress);
    document.querySelector('#effect-none').checked = true;
    window.filter.changeFilter('none');
    window.slider.reset();
    window.filter.reset();
  }

  scaleIncreaseButton.addEventListener('click', function () {
    imageZoomIn();
  });
  scaleDecreaseButton.addEventListener('click', function () {
    imageZoomOut();
  });

  uploadFileInput.addEventListener('input', function () {
    openEditWindow();
  });
  uploadCancelButton.addEventListener('click', function () {
    closeEditWindow();
  });

})();
