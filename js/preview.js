'use strict';

(function () {
  var preview = document.querySelector('.big-picture');
  var closeButton = document.querySelector('#picture-cancel');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsFragment = document.createDocumentFragment();
  var commentsBlock = document.querySelector('.social__comments');
  var image = document.querySelector('.big-picture__img img');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var commentsLoader = document.querySelector('.comments-loader');
  var description = document.querySelector('.social__caption');

  window.preview = {
    show: show,
    hide: hide
  };

  function renderComments(comments) {
    for (var i = 0; i < comments.length; i++) {
      var comment = commentTemplate.cloneNode(true);

      comment.querySelector('.social__text').textContent = comments[i].message;
      comment.querySelector('.social__picture').setAttribute('src', comments[i].avatar);
      comment.querySelector('.social__picture').setAttribute('alt', comments[i].name);
      commentsFragment.appendChild(comment);
    }
    commentsBlock.appendChild(commentsFragment);
  }

  function clearComments() {
    var comments = commentsBlock.querySelectorAll('.social__comment');
    for (var i = 0; i < comments.length; i++) {
      comments[i].remove();
    }
  }

  function show(publication) {
    preview.classList.remove('hidden');
    image.setAttribute('src', publication.url);
    likesCount.textContent = publication.likes;
    commentsCount.textContent = publication.comments.length;
    description.textContent = publication.description;

    // commentsCount.classList.add('visually-hidden');
    commentsLoader.classList.add('visually-hidden');

    clearComments();
    renderComments(publication.comments);
  }

  function hide() {
    preview.classList.add('hidden');
  }

  document.addEventListener('keydown', function (evt) {
    window.utils.executeOnEscPressed(evt.keyCode, window.preview.hide);
  });

  closeButton.addEventListener('click', function () {
    hide();
  });


})();
