'use strict';

(function () {
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadCancelButton = document.querySelector('#upload-cancel');
  var imagePreview = document.querySelector('.img-upload__preview img');

  function loadImage(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (evt) {
        imagePreview.setAttribute('src', evt.target.result);
        window.effects.updateIcons(evt.target.result);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  uploadFileInput.addEventListener('input', function (evt) {
    loadImage(evt.target);
    window.editor.open();
  });

  uploadCancelButton.addEventListener('click', function () {
    window.editor.close();
  });

})();
