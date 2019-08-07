'use strict';

(function () {
  var RANDOM_PUBLICATIONS_COUNT = 10;
  var FILTER_APPLY_TIMEOUT_MS = 500;
  var RMOVE_ERROR_POPUP_TIMEOUT_MS = 3000;

  var publications = [];
  var picturesContainer = document.querySelector('.pictures');
  var publicationTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var filterNav = document.querySelector('.img-filters');
  var filterButtons = filterNav.querySelectorAll('button');
  var currentFilter = document.querySelector('.img-filters__button--active');
  var applyFilter = window.utils.debounce(function (filteredPublications) {
    clearPublications();
    renderPublications(filteredPublications);
  }, FILTER_APPLY_TIMEOUT_MS);
  var removeErrorPopup = window.utils.debounce(function (popup) {
    document.body.removeChild(popup);
  }, RMOVE_ERROR_POPUP_TIMEOUT_MS);

  window.gallery = {
    loadData: loadData
  };

  function loadData() {
    window.backend.download(onSuccess, onError);
  }

  function renderPublications(newPublications) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < newPublications.length; i++) {
      var publication = publicationTemplate.cloneNode(true);

      publication.querySelector('.picture__likes').textContent = newPublications[i].likes;
      publication.querySelector('.picture__comments').textContent = newPublications[i].comments.length.toString();
      publication.querySelector('.picture__img').src = newPublications[i].url;

      (function (publicationInfo) {
        publication.addEventListener('click', function (evt) {
          evt.preventDefault();
          window.preview.show(publicationInfo);
        });
      })(newPublications[i]);

      fragment.appendChild(publication);
    }
    picturesContainer.appendChild(fragment);
    showFilter();
  }

  function clearPublications() {
    var oldPublications = document.querySelectorAll('.picture');

    for (var i = 0; i < oldPublications.length; i++) {
      picturesContainer.removeChild(oldPublications[i]);
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

    applyFilter(filteredPublications);
  }

  function showFilter() {
    filterNav.classList.remove('img-filters--inactive');
  }

  function createErrorPopup(errorMessage) {
    var popup = document.createElement('div');

    popup.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    popup.style.position = 'absolute';
    popup.style.left = 0;
    popup.style.right = 0;
    popup.style.fontSize = '30px';
    popup.textContent = errorMessage;

    return popup;
  }

  function onSuccess(data) {
    publications = data;
    filterPublications();
  }

  function onError(errorMessage) {
    var errorPopup = createErrorPopup(errorMessage);

    document.body.insertAdjacentElement('afterbegin', errorPopup);

    removeErrorPopup(errorPopup);
  }

  function switchFilter(index) {
    currentFilter.classList.remove('img-filters__button--active');
    currentFilter = filterButtons[index];
    currentFilter.classList.add('img-filters__button--active');

    filterPublications(currentFilter.id);
  }

  function addFilterButtonEventHandlers(filterButton, index) {
    filterButton.addEventListener('click', function () {
      switchFilter(index);
    });
  }

  for (var i = 0; i < filterButtons.length; i++) {
    addFilterButtonEventHandlers(filterButtons[i], i);
  }

})();
