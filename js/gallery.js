'use strict';

(function () {
  var publicationTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var publicationFragment = document.createDocumentFragment();

  window.gallery = {
    renderPublications: function () {
      window.load(successHandler, errorHandler);
    }
  };

  function renderPublications(fragment) {
    document.querySelector('.pictures').appendChild(fragment);
  }

  function successHandler(publications) {
    for (var i = 0; i < publications.length; i++) {
      var publication = publicationTemplate.cloneNode(true);
      publication.querySelector('.picture__likes').textContent = publications[i].likes;
      publication.querySelector('.picture__comments').textContent = publications[i].comments.length.toString();
      publication.querySelector('.picture__img').setAttribute('src', publications[i].url);
      publicationFragment.appendChild(publication);
    }
    renderPublications(publicationFragment);
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
})();
