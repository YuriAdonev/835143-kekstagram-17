'use strict';

(function () {
  window.utils = {
    KeyCode: {
      ENTER: 13,
      ESC: 27
    },
    disableEnterKey: function (evt) {
      if (evt.keyCode === window.utils.KeyCode.ENTER) {
        evt.stopPropagation();
      }
    },
    disableEscKey: function (evt) {
      if (evt.keyCode === window.utils.KeyCode.ESC) {
        evt.stopPropagation();
      }
    }
  };
})();
