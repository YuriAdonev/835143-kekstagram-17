'use strict';

(function () {
  var MIN_POSITION_IN_PERCENT = 0;
  var MAX_POSITION_IN_PERCENT = 100;

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
    depthValueInput.setAttribute('value', '100');
    pin.style.left = '100%';
    depthValueElement.style.width = '100%';
  }

  function getPositionInPercent(start, evt) {
    var newPercent;
    var width = document.querySelector('.effect-level__line').clientWidth;
    var currentPercent = depthValueInput.getAttribute('value');
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
    pin.style.left = percent + '%';
    depthValueElement.style.width = percent + '%';

    window.effects.changeIntensity(percent);
  }

  pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoordsX = evt.clientX;
    var newPercent;

    function onMouseMove(moveEvt) {
      applyChanges(getPositionInPercent(startCoordsX, moveEvt));
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();

      depthValueInput.setAttribute('value', newPercent);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();
