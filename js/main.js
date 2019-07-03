'use strict';

var publications = [];
var numberOfPublications = 25;
var likesMax = 200;
var likesMin = 15;
var commentsMax = 20;
var publicationTemplate = document.querySelector('#picture').content.querySelector('.picture');
var publicationFragment = document.createDocumentFragment();

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

function generatePhotoUrl(index) {
  return 'photos/' + index + '.jpg';
}

function generateLikes() {
  var likes = Math.floor(Math.random() * (likesMax - likesMin)) + likesMin;
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
      avatar: 'img/avatar-' + (Math.floor(Math.random() * 6) + 1) + '.svg',
      message: message,
      name: generateRandomValue(namesList)
    };
    comments.push(comment);
  }
  return comments;
}

function generatePublications(num) {
  for (var i = 0; i < num; i++) {
    var publication = {
      url: generatePhotoUrl(i + 1),
      likes: generateLikes(),
      comments: generateComments(Math.floor(Math.random() * commentsMax))
    };
    publications.push(publication);
  }
}

function createPublicationFragment() {
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

generatePublications(numberOfPublications);
createPublicationFragment();
renderPublications(publicationFragment);
