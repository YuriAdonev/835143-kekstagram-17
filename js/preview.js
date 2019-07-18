'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var imageScale = 100;
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadCancelButton = document.querySelector('#upload-cancel');
  var imagePreviewBlock = document.querySelector('.img-upload__preview');
  var scaleIncreaseButton = document.querySelector('.scale__control--bigger');
  var scaleDecreaseButton = document.querySelector('.scale__control--smaller');

  window.preview = {
    showImageScale: function () {
      document.querySelector('.scale__control--value').value = imageScale + '%';
    },
    onEditWindowEscPress: function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        closeEditWindow();
      }
    },
    disableEnterKey: function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        evt.preventDefault();
      }
    }
  };
  function changeImageScale() {
    imagePreviewBlock.style.transform = 'scale(' + (imageScale / 100) + ')';
  }

  function imageZoomIn() {
    if (imageScale < 100) {
      imageScale = imageScale + 25;
      changeImageScale();
      window.preview.showImageScale();
    }
  }

  function imageZoomOut() {
    if (imageScale > 25) {
      imageScale = imageScale - 25;
      changeImageScale();
      window.preview.showImageScale();
    }
  }

  function openEditWindow() {
    document.querySelector('.img-upload__overlay').classList.remove('hidden');
    document.addEventListener('keydown', window.preview.onEditWindowEscPress);
    window.preview.showImageScale();
  }

  function closeEditWindow() {
    document.querySelector('.img-upload__overlay').classList.add('hidden');
    uploadFileInput.value = '';
    document.removeEventListener('keydown', window.preview.onEditWindowEscPress);
    document.querySelector('#effect-none').checked = true;
    window.form.onChangeFilter('none');
    window.form.resetEffectFilter();
  }

  scaleIncreaseButton.addEventListener('click', function () {
    imageZoomIn();
  });
  scaleDecreaseButton.addEventListener('click', function () {
    imageZoomOut();
  });

  uploadFileInput.addEventListener('input', openEditWindow);
  uploadCancelButton.addEventListener('click', closeEditWindow);

})();
