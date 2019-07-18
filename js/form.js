'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectLevelSlider = document.querySelector('.effect-level');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelInput = document.querySelector('.effect-level__value');
  var effectsRadioButtons = document.querySelectorAll('.effects__radio');
  var textHashtagsInput = document.querySelector('.text__hashtags');
  var textDescriptionInput = document.querySelector('.text__description');
  var currentFilter;

  window.form = {
    onChangeFilter: function (newFilter) {
      if (newFilter === 'none') {
        effectLevelSlider.classList.add('hidden');
      } else {
        effectLevelSlider.classList.remove('hidden');
      }
      imagePreview.className = 'effects__preview--' + newFilter;
      currentFilter = newFilter;
      window.form.resetEffectFilter();
    },
    resetEffectFilter: function () {
      effectLevelInput.setAttribute('value', '100');
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      imagePreview.setAttribute('style', '');
    }
  };

  function onChangeEffectValue(percentEffect) {
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

  for (var i = 0; i < effectsRadioButtons.length; i++) {
    (function (effectButton) {
      effectButton.addEventListener('input', function (evt) {
        window.form.onChangeFilter(evt.target.getAttribute('value'));
      });
      effectButton.addEventListener('keydown', window.preview.disableEnterKey);
    })(effectsRadioButtons[i]);
  }

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;
    var newEffectPercent;

    function onMouseMove(moveEvt) {
      var effectLineWidth = document.querySelector('.effect-level__line').clientWidth;
      var currentEffectPercent = effectLevelInput.getAttribute('value');
      var shiftX = moveEvt.clientX - startCoordsX;
      newEffectPercent = +currentEffectPercent + ((shiftX / effectLineWidth) * 100);
      if (newEffectPercent < 0) {
        newEffectPercent = 0;
      }
      if (newEffectPercent > 100) {
        newEffectPercent = 100;
      }
      effectLevelPin.style.left = newEffectPercent + '%';
      effectLevelDepth.style.width = newEffectPercent + '%';

      onChangeEffectValue(newEffectPercent);
    }
    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      effectLevelInput.setAttribute('value', newEffectPercent);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  textHashtagsInput.addEventListener('focus', function () {
    document.addEventListener('keydown', window.preview.disableEnterKey);
  });
  textHashtagsInput.addEventListener('blur', function () {
    document.removeEventListener('keydown', window.preview.disableEnterKey);
  });
  textDescriptionInput.addEventListener('focus', function () {
    document.removeEventListener('keydown', window.preview.onEditWindowEscPress);
  });
  textDescriptionInput.addEventListener('blur', function () {
    document.addEventListener('keydown', window.preview.onEditWindowEscPress);
  });

})();
