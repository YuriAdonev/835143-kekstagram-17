'use strict';

(function () {
  window.utils = {
    isEnterKeyCode: 13,
    isEscKeyCode: 27,
    getRandomNum: function (min, max) {
      return Math.floor(Math.random() * max) + min;
    },
    disableEnterKey: function (evt) {
      if (evt.keyCode === window.utils.isEnterKeyCode) {
        evt.preventDefault();
      }
    },
    disableEscKey: function (evt) {
      if (evt.keyCode === window.utils.isEscKeyCode) {
        evt.stopPropagation();
      }
    }
  };
})();
