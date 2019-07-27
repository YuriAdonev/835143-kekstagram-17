'use strict';

(function () {
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelInput = document.querySelector('.effect-level__value');
  var effectLevelSlider = document.querySelector('.effect-level');

  window.slider = {
    show: show,
    hide: hide,
    reset: reset
  };

  function show() {
    effectLevelSlider.classList.remove('hidden');
  }

  function hide() {
    effectLevelSlider.classList.add('hidden');
  }

  function reset() {
    effectLevelInput.setAttribute('value', '100');
    effectLevelPin.style.left = '100%';
    effectLevelDepth.style.width = '100%';
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

      window.filter.changeIntensity(newEffectPercent);
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
