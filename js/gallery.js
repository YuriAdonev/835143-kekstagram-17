'use strict';

(function () {
  var publicationTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var publicationFragment = document.createDocumentFragment();
  window.gallery = {
    renderPublications: function () {
      createPublicationFragment();
      renderPublications(publicationFragment);
    }
  };

  function createPublicationFragment() {
    var publications = window.data.publications;
    for (var i = 0; i < publications.length; i++) {
      var publication = publicationTemplate.cloneNode(true);
      publication.querySelector('.picture__likes').textContent = publications[i].likes;
      publication.querySelector('.picture__comments').textContent = publications[i].comments.length.toString();
      publication.querySelector('.picture__img').setAttribute('src', publications[i].url);
      publicationFragment.appendChild(publication);
    }
  }

  function renderPublications(fragment) {
    document.querySelector('.pictures').appendChild(fragment);
  }
})();
