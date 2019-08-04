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
    window.editor.close();
    window.slider.reset();
    window.effects.reset();
    form.reset();
    showSuccess();
  }

  function onError() {
    showError();

  }

  function errorHashtags(message) {
    hashtagsInput.style.borderColor = 'red';
    hashtagsInput.setCustomValidity(message);
    hashtagsInput.reset();
  }

  function hashtagsValidate() {
    var hashtags = hashtagsInput.value.toLowerCase().split(' ');
    console.log(hashtags);
    if (hashtags.length > 5) {
      errorHashtags('Должно быть до 5 хэш-тэгов');
      return false;
    }
    for (var i = 0; i < hashtags.length; i++) {
      var counter = hashtags.filter(function (hashtag) {
        return hashtag === hashtags[i];
      });

      if (counter.length > 1) {
        errorHashtags('Хэш-тэги не должны повторяться');
        return false;
      }
      if (hashtags[i][0] !== '#') {
        errorHashtags('Хэш-тэг должен начинаться с символа #');
        return false;
      }
      if (hashtags[i].length < 2 || hashtags[i].length > 20) {
        errorHashtags('Хэш-тэг должен содержать от 2 до 20 символов');
        return false;
      }
    }
    return true;
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
    if (hashtagsValidate()) {
      window.backend.upload(new FormData(form), onSuccess, onError);
    }
  });

})();
