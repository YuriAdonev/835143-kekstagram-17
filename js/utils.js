'use strict';

(function () {
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  window.utils = {
    executeOnEnterPressed: executeOnEnterPressed,
    executeOnEscPressed: executeOnEscPressed,
    debounce: debounce
  };

  function executeOnEnterPressed(keyCode, action) {
    if (keyCode === KeyCode.ENTER) {
      action();
    }
  }

  function executeOnEscPressed(keyCode, action) {
    if (keyCode === KeyCode.ESC) {
      action();
    }
  }

  function debounce(cb, timeout) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, timeout);
    };
  };

})();
