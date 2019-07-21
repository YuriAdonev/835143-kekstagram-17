'use strict';

(function () {
  var imagePreview = document.querySelector('.img-upload__preview img');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelInput = document.querySelector('.effect-level__value');

  window.slider = {
    currentFilter: '',
    resetEffectFilter: function () {
      effectLevelInput.setAttribute('value', '100');
      effectLevelPin.style.left = '100%';
      effectLevelDepth.style.width = '100%';
      imagePreview.setAttribute('style', '');
    }
  };

  function onChangeEffectValue(percentEffect) {
    var effectStyle;
    switch (window.slider.currentFilter) {
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

})();
