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
    window.backend.upload(new FormData(form), function () {
      window.editor.close();
      window.filter.changeFilter('none');
      window.slider.reset();
      window.filter.reset();
      form.reset();
    });
    evt.preventDefault();
  });

})();
