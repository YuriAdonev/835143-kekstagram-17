'use strict';

(function () {
  window.utils = {
    keyCode: {
      ENTER: 13,
      ESC: 27
    },
    disableEnterKey: function (evt) {
      if (evt.keyCode === window.utils.keyCode.ENTER) {
        evt.stopPropagation();
      }
    },
    disableEscKey: function (evt) {
      if (evt.keyCode === window.utils.keyCode.ESC) {
        evt.stopPropagation();
      }
    }
  };
})();
