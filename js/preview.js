'use strict';

(function () {
  var DEFAULT_COMMENTS_COUNT_TO_LOAD = 5;

  var comments;
  var shownComments;
  var totalComments;

  var preview = document.querySelector('.big-picture');
  var closeButton = document.querySelector('#picture-cancel');
  var commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
  var commentsBlock = document.querySelector('.social__comments');
  var image = document.querySelector('.big-picture__img img');
  var likesCount = document.querySelector('.likes-count');
  var commentsCount = document.querySelector('.comments-count');
  var commentsShow = document.querySelector('.comment-show');
  var commentsLoader = document.querySelector('.comments-loader');
  var commentsStatistics = document.querySelector('.social__comment-count');
  var description = document.querySelector('.social__caption');

  window.preview = {
    show: show,
    hide: hide
  };

  function showCommentsLoader() {
    commentsLoader.classList.remove('visually-hidden');
  }

  function hideCommentsLoader() {
    commentsLoader.classList.add('visually-hidden');
  }

  function showCommentsStatistics() {
    commentsStatistics.classList.remove('hidden');
  }

  function hideCommentsStatistics() {
    commentsStatistics.classList.add('hidden');
  }

  function loadMoreComments() {
    var restComments = totalComments - shownComments;
    var commentsToShow = 0;

    if (totalComments === 0) {
      hideCommentsStatistics();
    }

    if (restComments <= DEFAULT_COMMENTS_COUNT_TO_LOAD) {
      hideCommentsLoader();
      commentsToShow = restComments;
    } else {
      commentsToShow = DEFAULT_COMMENTS_COUNT_TO_LOAD;
    }

    renderComments(commentsToShow);
    commentsShow.textContent = shownComments;
  }

  function renderComments(commentsToShow) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < commentsToShow; i++) {
      var comment = commentTemplate.cloneNode(true);

      comment.querySelector('.social__text').textContent = comments[shownComments].message;
      comment.querySelector('.social__picture').src = comments[shownComments].avatar;
      comment.querySelector('.social__picture').alt = comments[shownComments].name;
      shownComments++;

      fragment.appendChild(comment);
    }

    commentsBlock.appendChild(fragment);
  }

  function clearComments() {
    while (commentsBlock.firstChild) {
      commentsBlock.removeChild(commentsBlock.firstChild);
    }
  }

  function show(publication) {
    comments = publication.comments;

    image.src = publication.url;
    likesCount.textContent = publication.likes;
    commentsCount.textContent = publication.comments.length;
    description.textContent = publication.description;

    shownComments = 0;
    totalComments = comments.length;

    clearComments();
    showCommentsStatistics();
    showCommentsLoader();
    loadMoreComments();

    preview.classList.remove('hidden');
  }


  function hide() {
    preview.classList.add('hidden');
  }

  commentsLoader.addEventListener('click', function () {
    loadMoreComments();
  });

  document.addEventListener('keydown', function (evt) {
    window.utils.executeOnEscPressed(evt.keyCode, window.preview.hide);
  });

  closeButton.addEventListener('click', function () {
    hide();
  });


})();
