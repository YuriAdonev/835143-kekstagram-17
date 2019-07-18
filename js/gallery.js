'use strict';

(function () {
  var publicationTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var publicationFragment = document.createDocumentFragment();

  function createPublicationFragment() {
    for (var i = 0; i < window.publications.length; i++) {
      var publication = publicationTemplate.cloneNode(true);
      publication.querySelector('.picture__likes').textContent = window.publications[i].likes;
      publication.querySelector('.picture__comments').textContent = window.publications[i].comments.length.toString();
      publication.querySelector('.picture__img').setAttribute('src', window.publications[i].url);
      publicationFragment.appendChild(publication);
    }
  }

  function renderPublications(fragment) {
    document.querySelector('.pictures').appendChild(fragment);

  }
  createPublicationFragment();
  renderPublications(publicationFragment);
})()
