'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview img');
  var buttons = document.querySelectorAll('.effects__radio');
  var icons = document.querySelectorAll('.effects__preview');
  var current = '';

  window.effects = {
    reset: reset,
    changeIntensity: changeIntensity,
    updateIcons: updateIcons
  };

  function reset() {
    document.querySelector('#effect-none').checked = true;
    changeType('none');
  }

  function changeIntensity(percentEffect) {
    var effectStyle;

    switch (current) {
      case 'chrome':
        effectStyle = 'filter: grayscale(' + (+percentEffect / 100) + ');';
        break;
      case 'sepia':
        effectStyle = 'filter: sepia(' + (+percentEffect / 100) + ');';
        break;
      case 'marvin':
        effectStyle = 'filter: invert(' + percentEffect + '%);';
        break;
      case 'phobos':
        effectStyle = 'filter: blur(' + ((+percentEffect / 100) * 3) + 'px);';
        break;
      case 'heat':
        effectStyle = 'filter: brightness(' + (((+percentEffect / 100) * 2) + 1) + ');';
        break;
      default:
        effectStyle = '';
        break;
    }

    imagePreview.setAttribute('style', effectStyle);
  }

  function updateIcons(image) {
    icons.forEach(function (icon) {
      icon.setAttribute('style', 'background-image: url("' + image + '");');
    });
  }

  function changeType(newEffect) {
    if (newEffect === 'none') {
      window.slider.hide();
    } else {
      window.slider.show();
    }

    imagePreview.setAttribute('class', 'effects__preview--' + newEffect);
    current = newEffect;

    window.slider.reset();
    imagePreview.setAttribute('style', '');
  }

  for (var i = 0; i < buttons.length; i++) {
    (function (button) {
      button.addEventListener('input', function (evt) {
        changeType(evt.target.getAttribute('value'));
      });
      button.addEventListener('keydown', function (evt) {
        window.utils.executeOnEnterPressed(evt.keyCode, evt.stopPropagation);
      });
    })(buttons[i]);
  }

})();
