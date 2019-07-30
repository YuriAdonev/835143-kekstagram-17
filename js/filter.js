'use strict';

(function () {
  var publications = [];

  var filterNav = document.querySelector('.img-filters');
  var filterButtons = filterNav.querySelectorAll('button');

  function successHandler(data) {
    publications = data;

    filterNav.classList.remove('img-filters--inactive');
    filterPublications();
  }

  function errorHandler(errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  }

  function clearButtons() {
    for (var i = 0; i < filterButtons.length; i++) {
      filterButtons[i].classList.remove('img-filters__button--active');
    }
  }

  function getNewPublication() {
    var newPublications = [];
    var numbersPublications = [];

    while (numbersPublications.length < 10) {
      var newNumber = Math.floor(Math.random() * publications.length);

      if (numbersPublications.indexOf(newNumber) === -1) {
        numbersPublications.push(newNumber);
      }
    }

    for (var i = 0; i < numbersPublications.length; i++) {
      newPublications.push(publications[numbersPublications[i]]);
    }

    return newPublications;
  }

  function getPublicationsByDiscussed() {
    var newPublications = [];

    for (var i = 0; i < publications.length; i++) {
      newPublications[i] = publications[i];
    }

    newPublications.sort(function (a, b) {
      if (a.comments.length < b.comments.length) {
        return 1;
      }
      if (a.comments.length > b.comments.length) {
        return -1;
      }
      return 0;
    });

    return newPublications;
  }

  function filterPublications(newFilter) {
    var filteredPublications = [];

    switch (newFilter) {
      case 'filter-popular':
        filteredPublications = publications;
        break;
      case 'filter-new':
        filteredPublications = getNewPublication();
        break;
      case 'filter-discussed':
        filteredPublications = getPublicationsByDiscussed();
        break;
      default:
        filteredPublications = publications;
        break;
    }

    window.gallery.clearPublications();

    setTimeout(function () {
      window.gallery.renderPublications(filteredPublications);
    }, 500);
  }

  window.backend.download(successHandler, errorHandler);

  for (var i = 0; i < filterButtons.length; i++) {
    (function (filterButton) {
      filterButton.addEventListener('click', function (evt) {
        clearButtons();
        filterButton.classList.add('img-filters__button--active');
        filterPublications(evt.target.id);
      });
    })(filterButtons[i]);
  }

})();
