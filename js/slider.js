'use strict';

(function () {
  var MIN_POSITION_IN_PERCENT = 0;
  var MAX_POSITION_IN_PERCENT = 100;
  var sliderDepth = document.querySelector('.effect-level__depth');
  var sliderPin = document.querySelector('.effect-level__pin');
  var sliderInput = document.querySelector('.effect-level__value');
  var sliderLevel = document.querySelector('.effect-level');

  window.slider = {
    show: show,
    hide: hide,
    reset: reset
  };

  function show() {
    sliderLevel.classList.remove('hidden');
  }

  function hide() {
    sliderLevel.classList.add('hidden');
  }

  function reset() {
    sliderInput.setAttribute('value', '100');
    sliderPin.style.left = '100%';
    sliderDepth.style.width = '100%';
  }

  function getPositionInPercent(start, evt) {
    var newEffectPercent;
    var effectLineWidth = document.querySelector('.effect-level__line').clientWidth;
    var currentEffectPercent = sliderInput.getAttribute('value');
    var shiftX = evt.clientX - start;
    newEffectPercent = +currentEffectPercent + ((shiftX / effectLineWidth) * 100);
    if (newEffectPercent < MIN_POSITION_IN_PERCENT) {
      newEffectPercent = MIN_POSITION_IN_PERCENT;
    }
    if (newEffectPercent > MAX_POSITION_IN_PERCENT) {
      newEffectPercent = MAX_POSITION_IN_PERCENT;
    }
    return newEffectPercent;
  }

  function applyChanges(percent) {
    sliderPin.style.left = percent + '%';
    sliderDepth.style.width = percent + '%';

    window.effects.changeIntensity(percent);
  }

  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;
    var newPercent;

    function onMouseMove(moveEvt) {
      applyChanges(getPositionInPercent(startCoordsX, moveEvt));
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      sliderInput.setAttribute('value', newPercent);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
