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
    hashtagsInput.focus();
    hashtagsInput.style.borderColor = 'red';
    hashtagsInput.setCustomValidity(message);
    if (message === '') {
      hashtagsInput.style.borderColor = 'gray';
    }
  }

  function hashtagsValidate() {
    var hashtags = hashtagsInput.value.toLowerCase().split(' ');
    var msg = '';
    if (hashtags.length > 4) {
      msg = 'Должно быть до 5 хэш-тэгов';
    }
    for (var i = 0; i < hashtags.length; i++) {
      var counter = hashtags.reduce(function (accumulator, item) {
        if (item === hashtags[i]) {
          return accumulator + 1;
        } else {
          return accumulator;
        }
      }, 0);
      var rgx = /#([a-zA-Zа-яА-Я0-9]|([\u00a9|\u00ae|[\u2000-\u3300]|\\ud83c[\\ud000-\\udfff]|\\ud83d[\\ud000-\\udfff]|\\ud83e[\\ud000-\\udfff])){1,19}/;
      var myArray = hashtags[i].match(rgx);
      console.log(myArray);
      if (myArray[0].length === null || myArray[0].length > 20) {
        msg = 'Хэш-тэг должен содержать от 2 до 20 символов';
      }
      if (counter > 1) {
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
    evt.preventDefault();
    if (hashtagsValidate() === '') {
      window.backend.upload(new FormData(form), onSuccess, onError);
    }
  });

  hashtagsInput.addEventListener('input', function () {
    var msg = hashtagsValidate();
    errorHashtags(msg);
  });

})();
