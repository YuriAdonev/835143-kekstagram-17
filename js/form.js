'use strict';

(function () {
  var MAX_HASHTAG_COUNT = 5;
  var HASHTAG_PATTERN = /^#[а-яА-ЯёЁA-Za-z0-9_.]{1,19}$/;

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
    for (var i = 0; i < hashtags.length; i++) {
      if (!buffer.includes(hashtags[i])) {
        buffer.push(hashtags[i]);
      } else {
        return false;
      }
    }

    return true;
  }

  function isTooManySpacesBetween(hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i] === '') {
        return true;
      }
    }
    return false;
  }

  function isHashtagCountCorrect(hashtags) {
    return (hashtags.length <= MAX_HASHTAG_COUNT);
  }

  function isHashtagMatchPattern(hashtags) {
    for (var i = 0; i < hashtags.length; i++) {
      if (!HASHTAG_PATTERN.test(hashtags[i])) {
        return false;
      }
    }
    return true;
  }

  function validateHashtags() {
    var hashtags = hashtagsInput.value.toLowerCase().split(' ');

    if ((hashtags.length === 1) && (hashtags[0] === '')) {
      return '';
    }

    if (isTooManySpacesBetween(hashtags)) {
      return 'Хэш-теги должны быть разделены одним пробелом';
    }

    if (!isHashtagCountCorrect(hashtags)) {
      return 'Должно быть до 5 хэш-тэгов';
    }

    if (!isHashtagUniqe(hashtags)) {
      return 'Хэш-тэги не должны повторяться';
    }

    if (!isHashtagMatchPattern(hashtags)) {
      return 'Хэш-тэг должен начинаться с символа #.' +
        'Допустимая длина хэш-тега от 2 до 20 ' +
        'символов, включая символ #.';
    }

    return '';
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
    var message = validateHashtags();
    hashtagsInput.setCustomValidity(message);
  });

})();
