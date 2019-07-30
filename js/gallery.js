'use strict';

(function () {
  var publicationTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var publicationFragment = document.createDocumentFragment();

  window.gallery = {
    renderPublications: renderPublications,
    clearPublications: clearPublications
  };

  function renderPublications(publications) {
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

})();
