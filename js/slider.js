'use strict';

(function () {
  var MIN_POSITION_IN_PERCENT = 0;
  var MAX_POSITION_IN_PERCENT = 100;

  var percent;
  var level = document.querySelector('.effect-level');
  var levelValue = level.querySelector('.effect-level__value');
  var levelLine = level.querySelector('.effect-level__line');
  var levelDepth = levelLine.querySelector('.effect-level__depth');
  var levelPin = levelLine.querySelector('.effect-level__pin');

  window.slider = {
    show: show,
    hide: hide,
    reset: reset
  };

  function show() {
    level.classList.remove('hidden');
  }

  function hide() {
    level.classList.add('hidden');
  }

  function reset() {
    levelValue.value = 100;
    levelPin.style.left = '100%';
    levelDepth.style.width = '100%';
  }

  function getPositionInPercent(start, evt) {
    var newPercent;
    var width = levelLine.clientWidth;
    var currentPercent = levelValue.value;
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
    levelPin.style.left = percentChange + '%';
    levelDepth.style.width = percentChange + '%';

    window.effects.changeIntensity(percentChange);
  }

  levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;


    function onMouseMove(moveEvt) {
      percent = getPositionInPercent(startCoordsX, moveEvt);
      applyChanges(percent);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      levelValue.value = percent;

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
