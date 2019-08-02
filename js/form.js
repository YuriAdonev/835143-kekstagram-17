'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var descriptionInput = document.querySelector('.text__description');

  window.form = {
    reset: reset
  };

  function reset() {
    form.reset();
  }

  hashtagsInput.addEventListener('keydown', function (evt) {
    window.utils.executeOnEscPressed(evt.keyCode, function () {
      evt.stopPropagation();
    });
  });

  descriptionInput.addEventListener('keydown', function (evt) {
    window.utils.executeOnEscPressed(evt.keyCode, function () {
      evt.stopPropagation();
    });
  });

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
      window.editor.close();
      window.slider.reset();
      window.effects.reset();
      form.reset();
    });
    evt.preventDefault();
  });

})();
