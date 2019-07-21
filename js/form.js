'use strict';

(function () {
  var textHashtagsInput = document.querySelector('.text__hashtags');
  var textDescriptionInput = document.querySelector('.text__description');

  textHashtagsInput.addEventListener('focus', function () {
    textHashtagsInput.addEventListener('keydown', window.utils.disableEnterKey);
    textHashtagsInput.addEventListener('keydown', window.utils.disableEscKey);
  });

  textDescriptionInput.addEventListener('focus', function () {
    textDescriptionInput.addEventListener('keydown', window.utils.disableEscKey);
  });

})();
