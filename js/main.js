'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

var publications = [];
var numberOfPublications = 25;
var likesMax = 200;
var likesMin = 15;
var commentsMax = 20;
var publicationTemplate = document.querySelector('#picture').content.querySelector('.picture');
var publicationFragment = document.createDocumentFragment();
var imageScale = 100;

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

function onEditWindowEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeEditWindow();
  }
}

function openEditWindow() {
  document.querySelector('.img-upload__overlay').classList.remove('hidden');
  document.addEventListener('keydown', onEditWindowEscPress);
  showImageScale();
}

function closeEditWindow() {
  document.querySelector('.img-upload__overlay').classList.add('hidden');
  document.querySelector('.img-upload__preview img').className = '';
  document.removeEventListener('keydown', onEditWindowEscPress);
}

function changeFilter(newFilter) {
  if (newFilter === 'none') {
    document.querySelector('.effect-level').classList.add('hidden');
    document.querySelector('.img-upload__preview img').className = '';
  } else {
    document.querySelector('.effect-level').classList.remove('hidden');
    document.querySelector('.img-upload__preview img').className = 'effects__preview--' + newFilter;
  }
}

function showImageScale() {
  document.querySelector('.scale__control--value').value = imageScale + '%';
}

function changeImageScale() {
  document.querySelector('.img-upload__preview img').style.transform = 'scale(' + (imageScale / 100) + ')';
}

function imageZoomIn() {
  if (imageScale < 100) {
    imageScale = imageScale + 25;
    changeImageScale();
    showImageScale();
  }
}

function imageZoomOut() {
  if (imageScale > 25) {
    imageScale = imageScale - 25;
    changeImageScale();
    showImageScale();
  }
}

function disableEnterKey(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    evt.preventDefault();
  }
}

generatePublications(numberOfPublications);
createPublicationFragment();
renderPublications(publicationFragment);

document.querySelector('#upload-file').addEventListener('input', openEditWindow);
document.querySelector('#upload-cancel').addEventListener('click', closeEditWindow);

document.querySelector('.scale__control--smaller').addEventListener('click', imageZoomOut);
document.querySelector('.scale__control--bigger').addEventListener('click', imageZoomIn);

document.querySelector('#effect-none').addEventListener('input', function () {
  changeFilter(document.querySelector('#effect-none').value);
});
document.querySelector('#effect-chrome').addEventListener('input', function () {
  changeFilter(document.querySelector('#effect-chrome').value);
});
document.querySelector('#effect-sepia').addEventListener('input', function () {
  changeFilter(document.querySelector('#effect-sepia').value);
});
document.querySelector('#effect-marvin').addEventListener('input', function () {
  changeFilter(document.querySelector('#effect-marvin').value);
});
document.querySelector('#effect-phobos').addEventListener('input', function () {
  changeFilter(document.querySelector('#effect-phobos').value);
});
document.querySelector('#effect-heat').addEventListener('input', function () {
  changeFilter(document.querySelector('#effect-heat').value);
});
document.querySelector('.text__hashtags').addEventListener('focus', function () {
  document.addEventListener('keydown', disableEnterKey);
});
document.querySelector('.text__hashtags').addEventListener('blur', function () {
  document.removeEventListener('keydown', disableEnterKey);
});
