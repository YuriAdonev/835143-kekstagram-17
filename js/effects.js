'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectsRadioButtons = document.querySelectorAll('.effects__radio');
  var effectIcons = document.querySelectorAll('.effects__preview');
  var currentEffect = '';

  window.effects = {
    reset: reset,
    changeIntensity: changeIntensity,
    updateIcons: updateIcons
  };

  for (var i = 0; i < effectsRadioButtons.length; i++) {
    (function (effectButton) {
      effectButton.addEventListener('input', function (evt) {
        changeEffect(evt.target.getAttribute('value'));
      });
      effectButton.addEventListener('keydown', window.utils.disableEnterKey);
    })(effectsRadioButtons[i]);
  }

  function reset() {
    document.querySelector('#effect-none').checked = true;
    changeEffect('none');
  }

  function changeIntensity(percentEffect) {
    var effectStyle;

    switch (currentEffect) {
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
    for (var j = 0; j < effectIcons.length; j++) {
      effectIcons[j].setAttribute('style', 'background-image: url("' + image + '");');
    }
  }

  function changeEffect(newEffect) {
    if (newEffect === 'none') {
      window.slider.hide();
    } else {
      window.slider.show();
    }

    imagePreview.className = 'effects__preview--' + newEffect;
    currentEffect = newEffect;

    window.slider.reset();
    imagePreview.setAttribute('style', '');
  }

})();
