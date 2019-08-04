'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var hashtagsInput = document.querySelector('.text__hashtags');
  var descriptionInput = document.querySelector('.text__description');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  window.form = {
    reset: reset
  };

  function reset() {
    form.reset();
  }

  function showSuccess() {
    document.querySelector('main').appendChild(successTemplate.cloneNode(true));

    var successWindow = document.querySelector('.success');

    successWindow.addEventListener('click', function () {
      successWindow.remove();
    });
    document.querySelector('.success__inner').addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
    document.querySelector('.success__button').addEventListener('click', function () {
      successWindow.remove();
    });
    document.addEventListener('keydown', function (evt) {
      window.utils.executeOnEscPressed(evt.keyCode, function () {
        successWindow.remove();
      });
    });
  }

  function showError() {
    document.querySelector('main').appendChild(errorTemplate.cloneNode(true));

    var errorWindow = document.querySelector('.error');
    var buttons = document.querySelectorAll('.error__button');

    errorWindow.addEventListener('click', function () {
      errorWindow.remove();
    });
    document.querySelector('.success__inner').addEventListener('click', function (evt) {
      evt.stopPropagation();
    });
    document.addEventListener('keydown', function (evt) {
      window.utils.executeOnEscPressed(evt.keyCode, function () {
        errorWindow.remove();
      });
    });

    for (var i = 0; i < buttons.length; i++) {
      (function (button) {
        button.addEventListener('click', function () {
          errorWindow.remove();
        });
      })(buttons[i]);
    }
  }

  function onSuccess() {
    showSuccess();

    window.editor.close();
    window.slider.reset();
    window.effects.reset();
    form.reset();
  }

  function onError() {
    showError();

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
    evt.preventDefault();
    window.backend.upload(new FormData(form), onSuccess, onError);
  });

})();
