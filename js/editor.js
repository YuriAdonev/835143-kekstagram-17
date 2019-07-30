'use strict';

(function () {
  var SCALE_MAX = 100;
  var SCALE_MIN = 25;
  var SCALE_STEP = 25;

  var imageScale = 100;
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadCancelButton = document.querySelector('#upload-cancel');
  var editorWindow = document.querySelector('.img-upload__overlay');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var imagePreviewBlock = document.querySelector('.img-upload__preview');
  var effectPreview = document.querySelectorAll('.effects__preview');
  var scaleControl = document.querySelector('.scale__control--value');
  var scaleIncreaseButton = document.querySelector('.scale__control--bigger');
  var scaleDecreaseButton = document.querySelector('.scale__control--smaller');

  window.editor = {
    open: open,
    close: close,
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
    uploadFileInput.value = '';
    document.removeEventListener('keydown', onEditWindowEscPress);
    document.querySelector('#effect-none').checked = true;
    window.filter.changeFilter('none');
    window.slider.reset();
    window.filter.reset();
  }

  function changePreviewImage(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (evt) {
        imagePreview.setAttribute('src', evt.target.result);
        for (var i = 0; i < effectPreview.length; i++) {
          effectPreview[i].setAttribute('style', 'background-image: url("' + evt.target.result + '");');
        }
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  scaleIncreaseButton.addEventListener('click', function () {
    imageZoomIn();
  });

  scaleDecreaseButton.addEventListener('click', function () {
    imageZoomOut();
  });

  uploadFileInput.addEventListener('input', function (evt) {
    changePreviewImage(evt.target);
    open();
  });

  uploadCancelButton.addEventListener('click', function () {
    close();
  });

})();
