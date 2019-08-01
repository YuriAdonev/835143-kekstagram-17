'use strict';

(function () {


  var filterNav = document.querySelector('.img-filters');
  var filterButtons = filterNav.querySelectorAll('button');

  window.filters = {
    show: show
  };

  function show() {
    filterNav.classList.remove('img-filters--inactive');
  }

  function resetButtons() {
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
  }

  for (var i = 0; i < filterButtons.length; i++) {
    (function (filterButton) {
      filterButton.addEventListener('click', function (evt) {
        resetButtons();
        filterButton.classList.add('img-filters__button--active');
        window.gallery.filterPublications(evt.target.id);
      });
    })(filterButtons[i]);
  }

})();
