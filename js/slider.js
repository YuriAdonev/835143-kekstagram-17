'use strict';

(function () {
  var MIN_POSITION_IN_PERCENT = 0;
  var MAX_POSITION_IN_PERCENT = 100;

  var percent;
  var depthValueElement = document.querySelector('.effect-level__depth');
  var pin = document.querySelector('.effect-level__pin');
  var depthValueInput = document.querySelector('.effect-level__value');
  var scale = document.querySelector('.effect-level');

  window.slider = {
    show: show,
    hide: hide,
    reset: reset
  };

  function show() {
    scale.classList.remove('hidden');
  }

  function hide() {
    scale.classList.add('hidden');
  }

  function reset() {
    depthValueInput.value = 100;
    pin.style.left = '100%';
    depthValueElement.style.width = '100%';
  }

  function getPositionInPercent(start, evt) {
    var newPercent;
    var width = document.querySelector('.effect-level__line').clientWidth;
    var currentPercent = depthValueInput.value;
    var shiftX = evt.clientX - start;

    newPercent = +currentPercent + ((shiftX / width) * 100);

    if (newPercent < MIN_POSITION_IN_PERCENT) {
      newPercent = MIN_POSITION_IN_PERCENT;
    }
    if (newPercent > MAX_POSITION_IN_PERCENT) {
      newPercent = MAX_POSITION_IN_PERCENT;
    }

    return newPercent;
  }

  function applyChanges(percentChange) {
    pin.style.left = percentChange + '%';
    depthValueElement.style.width = percentChange + '%';

    window.effects.changeIntensity(percentChange);
  }

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;


    function onMouseMove(moveEvt) {
      percent = getPositionInPercent(startCoordsX, moveEvt);
      applyChanges(percent);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      depthValueInput.value = percent;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
