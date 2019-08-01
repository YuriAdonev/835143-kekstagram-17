'use strict';

(function () {
  var publications = [];

  var publicationTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var publicationFragment = document.createDocumentFragment();

  window.gallery = {
    renderPublications: renderPublications,
    clearPublications: clearPublications,
    filterPublications: filterPublications
  };

  function renderPublications() {
    for (var i = 0; i < publications.length; i++) {
      var publication = publicationTemplate.cloneNode(true);

      publication.querySelector('.picture__likes').textContent = publications[i].likes;
      publication.querySelector('.picture__comments').textContent = publications[i].comments.length.toString();
      publication.querySelector('.picture__img').setAttribute('src', publications[i].url);
      publicationFragment.appendChild(publication);
    }
    document.querySelector('.pictures').appendChild(publicationFragment);
  }

  function clearPublications() {
    var oldPublications = document.querySelectorAll('.picture');

    for (var i = 0; i < oldPublications.length; i++) {
      oldPublications[i].remove();
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

  function getDiscussedPublications() {
    return publications.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
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
        filteredPublications = getDiscussedPublications();
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

  function successHandler(data) {
    publications = data;
    window.filters.show();

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

  window.backend.download(successHandler, errorHandler);

})();
