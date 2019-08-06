'use strict';

(function () {
  var counterComments;
  var commentsToLoad;
  var commentsIndex = 0;
  var publicationComments;
  var preview = document.querySelector('.big-picture');
  var closeButton = document.querySelector('#picture-cancel');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsBlock = document.querySelector('.social__comments');
  var image = document.querySelector('.big-picture__img img');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var commentsShow = document.querySelector('.comment-show');
  var commentsLoader = document.querySelector('.comments-loader');
  var description = document.querySelector('.social__caption');

  window.preview = {
    show: show,
    hide: hide
  };

  function addComments() {
    if (counterComments + 5 > publicationComments.length) {
      commentsToLoad = publicationComments.length - counterComments;
    } else {
      commentsToLoad = 5;
    }
    counterComments = counterComments + commentsToLoad;
    if (counterComments === publicationComments.length) {
      commentsLoader.classList.add('visually-hidden');
    }
    commentsShow.textContent = counterComments;
    renderComments(publicationComments);
  }

  function renderComments(comments) {
    var i = 0;

    while (i < commentsToLoad) {
      var comment = commentTemplate.cloneNode(true);

      comment.querySelector('.social__text').textContent = comments[commentsIndex].message;
      comment.querySelector('.social__picture').src = comments[commentsIndex].avatar;
      comment.querySelector('.social__picture').alt = comments[commentsIndex].name;
      commentsBlock.appendChild(comment);
      commentsIndex++;
      i++;
    }
  }

  function clearComments() {
    var comments = commentsBlock.querySelectorAll('.social__comment');
    for (var i = 0; i < comments.length; i++) {
      comments[i].remove();
    }
    counterComments = 0;
    commentsToLoad = 0;
    commentsIndex = 0;
  }

  function show(publication) {
    publicationComments = publication.comments;
    preview.classList.remove('hidden');
    image.src = publication.url;
    likesCount.textContent = publication.likes;
    commentsCount.textContent = publication.comments.length;
    description.textContent = publication.description;
    commentsLoader.classList.remove('visually-hidden');

    clearComments();
    addComments(publication.comments);
    commentsLoader.addEventListener('click', addComments);
  }

  function hide() {
    preview.classList.add('hidden');
    commentsLoader.removeEventListener('click', addComments);

  }

  document.addEventListener('keydown', function (evt) {
    window.utils.executeOnEscPressed(evt.keyCode, window.preview.hide);
  });

  closeButton.addEventListener('click', function () {
    hide();
  });


})();
