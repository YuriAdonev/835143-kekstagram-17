'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var textHashtagsInput = document.querySelector('.text__hashtags');
  var textDescriptionInput = document.querySelector('.text__description');

  textHashtagsInput.addEventListener('focus', function () {
    textHashtagsInput.addEventListener('keydown', window.utils.disableEnterKey);
    textHashtagsInput.addEventListener('keydown', window.utils.disableEscKey);
  });

  textDescriptionInput.addEventListener('focus', function () {
    textDescriptionInput.addEventListener('keydown', window.utils.disableEscKey);
  });

  form.addEventListener('submit', function (evt) {
    window.upload(new FormData(form), function (response) {
      window.editor.closeEditWindow();
      window.filter.changeFilter('none');
      window.slider.reset();
      window.filter.reset();
      form.reset();
    });
    evt.preventDefault();
  });

})();
