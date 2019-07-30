'use strict';

(function () {
  var uploadFileInput = document.querySelector('#upload-file');
  var uploadCancelButton = document.querySelector('#upload-cancel');
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectPreview = document.querySelectorAll('.effects__preview');

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

  uploadFileInput.addEventListener('input', function (evt) {
    changePreviewImage(evt.target);
    window.editor.open();
  });

  uploadCancelButton.addEventListener('click', function () {
    window.editor.close();
  });

})();
