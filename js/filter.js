'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectLevelSlider = document.querySelector('.effect-level');
  var effectsRadioButtons = document.querySelectorAll('.effects__radio');

  window.filter = {
    onChangeFilter: function (newFilter) {
      if (newFilter === 'none') {
        effectLevelSlider.classList.add('hidden');
      } else {
        effectLevelSlider.classList.remove('hidden');
      }
      imagePreview.className = 'effects__preview--' + newFilter;
      window.slider.currentFilter = newFilter;
      window.slider.resetEffectFilter();
    }
  };

  for (var i = 0; i < effectsRadioButtons.length; i++) {
    (function (effectButton) {
      effectButton.addEventListener('input', function (evt) {
        window.filter.onChangeFilter(evt.target.getAttribute('value'));
      });
      effectButton.addEventListener('keydown', window.utils.disableEnterKey);
    })(effectsRadioButtons[i]);
  }

})();
