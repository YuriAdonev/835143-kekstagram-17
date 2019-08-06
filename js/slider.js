'use strict';

(function () {
  var MIN_POSITION_IN_PERCENT = 0;
  var MAX_POSITION_IN_PERCENT = 100;

  var levelDepth = document.querySelector('.effect-level__depth');
  var levelPin = document.querySelector('.effect-level__pin');
  var levelValue = document.querySelector('.effect-level__value');
  var level = document.querySelector('.effect-level');

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
    levelValue.setAttribute('value', '100');
    levelPin.style.left = '100%';
    levelDepth.style.width = '100%';
  }

  function getPositionInPercent(start, evt) {
    var newPercent;
    var width = document.querySelector('.effect-level__line').clientWidth;
    var currentPercent = levelValue.getAttribute('value');
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

  function applyChanges(percent) {
    levelPin.style.left = percent + '%';
    levelDepth.style.width = percent + '%';

    window.effects.changeIntensity(percent);
  }

  levelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;
    var newPercent;

    function onMouseMove(moveEvt) {
      applyChanges(getPositionInPercent(startCoordsX, moveEvt));
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      levelValue.setAttribute('value', newPercent);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
