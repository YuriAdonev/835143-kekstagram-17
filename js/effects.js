'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview img');
  var buttons = document.querySelectorAll('.effects__radio');
  var icons = document.querySelectorAll('.effects__preview');
  var current = '';
  var effectNone = document.querySelector('#effect-none');

  window.effects = {
    reset: reset,
    changeIntensity: changeIntensity,
    updateIcons: updateIcons
  };

  function reset() {
    effectNone.checked = true;
    changeType('none');
  }

  function changeIntensity(percentEffect) {
    var effectStyle;

    switch (current) {
      case 'chrome':
        effectStyle = 'grayscale(' + (+percentEffect / 100) + ')';
        break;
      case 'sepia':
        effectStyle = 'sepia(' + (+percentEffect / 100) + ')';
        break;
      case 'marvin':
        effectStyle = 'invert(' + percentEffect + '%)';
        break;
      case 'phobos':
        effectStyle = 'blur(' + ((+percentEffect / 100) * 3) + 'px)';
        break;
      case 'heat':
        effectStyle = 'brightness(' + (((+percentEffect / 100) * 2) + 1) + ')';
        break;
      default:
        effectStyle = '';
        break;
    }

    imagePreview.style.filter = effectStyle;
  }

  function updateIcons(image) {
    icons.forEach(function (icon) {
      icon.style.backgroundImage = 'url("' + image + '")';
    });
  }

  function changeType(newEffect) {
    if (newEffect === 'none') {
      window.slider.hide();
    } else {
      window.slider.show();
    }

    imagePreview.className = 'effects__preview--' + newEffect;
    current = newEffect;

    window.slider.reset();
    imagePreview.style.filter = '';
  }

  for (var i = 0; i < buttons.length; i++) {
    (function (button) {
      button.addEventListener('input', function (evt) {
        changeType(evt.target.value);
      });
      button.addEventListener('keydown', function (evt) {
        window.utils.executeOnEnterPressed(evt.keyCode, evt.stopPropagation);
      });
    })(buttons[i]);
  }

})();
