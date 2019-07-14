'use strict';

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var NUMBER_OF_PUBLICATIONS = 25;
var LIKES_MAX = 200;
var LIKES_MIN = 15;
var COMMENTS_MAX = 20;

var publications = [];
var imageScale = 100;

var publicationTemplate = document.querySelector('#picture').content.querySelector('.picture');
var publicationFragment = document.createDocumentFragment();

var uploadFileInput = document.querySelector('#upload-file');
var uploadCancelButton = document.querySelector('#upload-cancel');
var imagePreview = document.querySelector('.img-upload__preview');
var scaleIncreaseButton = document.querySelector('.scale__control--bigger');
var scaleDecreaseButton = document.querySelector('.scale__control--smaller');
var textHashtagsInput = document.querySelector('.text__hashtags');
var textDescriptionInput = document.querySelector('.text__description');
var effectLevelSlider = document.querySelector('.effect-level');

var effectsRadioButtons = document.querySelectorAll('.effects__radio');

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
  var likes = Math.floor(Math.random() * (LIKES_MAX - LIKES_MIN)) + LIKES_MIN;
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
      comments: generateComments(Math.floor(Math.random() * COMMENTS_MAX))
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
  uploadFileInput.value = '';
  document.removeEventListener('keydown', onEditWindowEscPress);
}

function onChangeFilter(newFilter) {
  if (newFilter === 'none') {
    effectLevelSlider.classList.add('hidden');
  } else {
    effectLevelSlider.classList.remove('hidden');
  }
  imagePreview.className = 'effects__preview--' + newFilter;
}

function showImageScale() {
  document.querySelector('.scale__control--value').value = imageScale + '%';
}

function changeImageScale() {
  imagePreview.style.transform = 'scale(' + (imageScale / 100) + ')';
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

generatePublications(NUMBER_OF_PUBLICATIONS);
createPublicationFragment();
renderPublications(publicationFragment);

uploadFileInput.addEventListener('input', openEditWindow);
uploadCancelButton.addEventListener('click', closeEditWindow);

scaleIncreaseButton.addEventListener('click', function () {
  imageZoomIn();
});
scaleDecreaseButton.addEventListener('click', function () {
  imageZoomOut();
});

for (var i = 0; i < effectsRadioButtons.length; i++) {
  effectsRadioButtons[i].addEventListener('input', function (evt) {
    onChangeFilter(evt.target.getAttribute('value'));
  });
  effectsRadioButtons[i].addEventListener('keydown', disableEnterKey);
}

textHashtagsInput.addEventListener('focus', function () {
  document.addEventListener('keydown', disableEnterKey);
});
textHashtagsInput.addEventListener('blur', function () {
  document.removeEventListener('keydown', disableEnterKey);
});
textDescriptionInput.addEventListener('focus', function () {
  document.removeEventListener('keydown', onEditWindowEscPress);
});
textDescriptionInput.addEventListener('blur', function () {
  document.addEventListener('keydown', onEditWindowEscPress);
});
