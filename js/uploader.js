'use strict';

(function () {
  var fileInput = document.querySelector('#upload-file');
  var cancelButton = document.querySelector('#upload-cancel');
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

  fileInput.addEventListener('input', function (evt) {
    loadImage(evt.target);
    window.editor.open();
  });

  cancelButton.addEventListener('click', function () {
    window.editor.close();
  });

})();
