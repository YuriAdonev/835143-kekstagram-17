'use strict';

(function () {
  var KeyCode = {
    ENTER: 13,
    ESC: 27
  };

  window.utils = {
    executeOnEnterPressed: executeOnEnterPressed,
    executeOnEscPressed: executeOnEscPressed,
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
})();
