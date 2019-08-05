'use strict';

(function () {
  var MAX_HASHTAG_COUNT = 5;

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

  function isHashtagUniqe(hashtags) {
    var buffer = [];
    hashtags.forEach(function (hashtag) {
      if (!buffer.includes(hashtag)) {
        buffer.push(hashtag);
      } else {
        return false;
      }
    });

    return true;
  }

  function isHashtagCountCorrect(hashtags) {
    return (hashtags.length > MAX_HASHTAG_COUNT) ? false : true;
  }

  function hashtagsValidate() {
    var hashtags = hashtagsInput.value.toLowerCase().split(' ');
    var msg = '';
    if (isHashtagCountCorrect(hashtags)) {
      msg = 'Должно быть до 5 хэш-тэгов';
    }
    for (var i = 0; i < hashtags.length; i++) {
      var rgx = /^#[а-яА-ЯёЁA-Za-z0-9_]{1,19}$/;
      var myArray = hashtags[i].match(rgx);
      if (myArray[0].length === null || myArray[0].length > 20) {
        msg = 'Хэш-тэг должен содержать от 2 до 20 символов';
      }
      if (isHashtagUniqe(hashtags)) {
        msg = 'Хэш-тэги не должны повторяться';
      }
      if (hashtags[i][0] !== '#') {
        msg = 'Хэш-тэг должен начинаться с символа #';
      }
    }
    return msg;
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
    if (form.checkValidity()) {
      evt.preventDefault();
      window.backend.upload(new FormData(form), onSuccess, onError);
    }
  });

  hashtagsInput.addEventListener('input', function () {
    var message = hashtagsValidate();
    hashtagsInput.setCustomValidity(message);
  });

})();
