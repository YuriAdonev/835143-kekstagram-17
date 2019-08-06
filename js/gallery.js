'use strict';

(function () {
  var RANDOM_PUBLICATIONS_COUNT = 10;

  var publications = [];
  var publicationTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var publicationFragment = document.createDocumentFragment();
  var filterNav = document.querySelector('.img-filters');
  var filters = filterNav.querySelectorAll('button');

  window.gallery = {
    loadData: loadData
  };

  function loadData() {
    window.backend.download(onSuccess, onError);
  }

  function renderPublications(newPublications) {
    for (var i = 0; i < newPublications.length; i++) {
      var publication = publicationTemplate.cloneNode(true);

      publication.querySelector('.picture__likes').textContent = newPublications[i].likes;
      publication.querySelector('.picture__comments').textContent = newPublications[i].comments.length.toString();
      publication.querySelector('.picture__img').src = newPublications[i].url;
      publicationFragment.appendChild(publication);
    }
    document.querySelector('.pictures').appendChild(publicationFragment);
    addEventListenersToPictures(newPublications);
    showFilter();
  }

  function clearPublications() {
    var oldPublications = document.querySelectorAll('.picture');

    for (var i = 0; i < oldPublications.length; i++) {
      oldPublications[i].remove();
    }
  }

  function getNewPublication() {
    var maxStartIndex = publications.length - RANDOM_PUBLICATIONS_COUNT - 1;
    var startIndex = Math.floor(Math.random() * maxStartIndex);
    var endIndex = startIndex + RANDOM_PUBLICATIONS_COUNT;

    return publications.slice(startIndex, endIndex);
  }

  function getDiscussedPublications() {
    return publications.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
  }

  function filterPublications(newFilter) {
    var filteredPublications = [];

    switch (newFilter + '') {
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

    clearPublications();

    setTimeout(function () {
      renderPublications(filteredPublications);
    }, 500);
  }

  function showPreview(arr) {
    var publicationLinks = document.querySelectorAll('.picture');

    for (var i = 0; i < publicationLinks.length; i++) {
      var link = publicationLinks[i];
      if (link.classList.contains('selected')) {
        window.preview.show(arr[i]);
        link.classList.remove('selected');
        break;
      }
    }
  }

  function addEventListenersToPictures(arr) {
    var publicationLinks = document.querySelectorAll('.picture');

    for (var i = 0; i < publicationLinks.length; i++) {
      (function (publicationLink) {
        publicationLink.addEventListener('click', function (evt) {
          evt.preventDefault();
          publicationLink.classList.add('selected');
          showPreview(arr);
        });
      })(publicationLinks[i]);
    }
  }

  function showFilter() {
    filterNav.classList.remove('img-filters--inactive');
  }

  function highlightSelectedFilter(selectedFilter) {
    filters.forEach(function (filter) {
      filter.classList.remove('img-filters__button--active');
    });
    selectedFilter.classList.add('img-filters__button--active');
  }

  function onSuccess(data) {
    publications = data;
    filterPublications();
  }

  function onError(errorMessage) {
    var node = document.createElement('div');

    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;

    document.body.insertAdjacentElement('afterbegin', node);
  }

  for (var i = 0; i < filters.length; i++) {
    (function (filterButton) {
      filterButton.addEventListener('click', function (evt) {
        highlightSelectedFilter(evt.target);
        filterPublications(evt.target.id);
      });
    })(filters[i]);
  }

})();
