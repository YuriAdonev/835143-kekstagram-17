'use strict';

(function () {
  var NUMBER_OF_PUBLICATIONS = 25;
  var LIKES_MAX = 200;
  var LIKES_MIN = 15;
  var COMMENTS_MAX = 20;

  var commentsList = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  var namesList = [
    'Иван',
    'Хуан Себастьян',
    'Мария',
    'Кристоф',
    'Виктор',
    'Юлия',
    'Люпита',
    'Вашингтон'
  ];

  window.data = {
    publications: [],
    generate: function () {
      for (var i = 0; i < NUMBER_OF_PUBLICATIONS; i++) {
        var publication = {
          url: generatePhotoUrl(i + 1),
          likes: generateLikes(),
          comments: generateComments(window.utils.getRandomNum(0, COMMENTS_MAX))
        };
        window.data.publications.push(publication);
      }
    }
  };

  function generatePhotoUrl(index) {
    return 'photos/' + index + '.jpg';
  }

  function generateLikes() {
    var likes = window.utils.getRandomNum(LIKES_MIN, LIKES_MAX - LIKES_MIN);
    return likes;
  }

  function generateRandomValue(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function generateComments(num) {
    var comments = [];
    for (var i = 0; i < num; i++) {
      var message = generateRandomValue(commentsList);
      if (Math.random() >= 0.5) {
        message = message + ' ' + generateRandomValue(commentsList);
      }
      var comment = {
        avatar: 'img/avatar-' + window.utils.getRandomNum(1, 6) + '.svg',
        message: message,
        name: generateRandomValue(namesList)
      };
      comments.push(comment);
    }
    return comments;
  }

})();
