'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectsRadioButtons = document.querySelectorAll('.effects__radio');
  var currentFilter = '';

  window.filter = {
    reset: reset,
    changeIntensity: changeIntensity,
    changeFilter: changeFilter
  };

  for (var i = 0; i < effectsRadioButtons.length; i++) {
    (function (effectButton) {
      effectButton.addEventListener('input', function (evt) {
        window.filter.changeFilter(evt.target.getAttribute('value'));
      });
      effectButton.addEventListener('keydown', window.utils.disableEnterKey);
    })(effectsRadioButtons[i]);
  }

  function reset() {
    imagePreview.setAttribute('style', '');
  }

  function changeIntensity(percentEffect) {
    var effectStyle;
    switch (currentFilter) {
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

  function changeFilter(newFilter) {
    if (newFilter === 'none') {
      window.slider.hide();
    } else {
      window.slider.show();
    }
    imagePreview.className = 'effects__preview--' + newFilter;
    currentFilter = newFilter;
    window.slider.reset();
    window.filter.reset();
  }

})();
