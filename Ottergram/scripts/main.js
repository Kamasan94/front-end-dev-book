var DETAIL_IMAGE_SELECTOR  = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var ESC_KEY = 27;
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var TINY_EFFECT_CLASS = 'is-tiny'

var firstThumbnail = document.querySelector(THUMBNAIL_LINK_SELECTOR);
firstThumbnail.addEventListener('click', function() {
  event.preventDefault();
  setDetailsFromThumb(firstThumbnail);
  console.log(event);
})

function addThumbClickHandler(thumb) {
  'use strict';
  thumb.addEventListener('click', function (event) {
    event.preventDefault();
    setDetailsFromThumb(thumb);
    showDetails();
  });
}

function setDetails(imageUrl, titleText) {
  'use strict';
   var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
   detailImage.setAttribute('src', imageUrl);

   var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
   detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-url');
}

function titleFormThumb(thumbnail) {
  'use strict';
  return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
  'use strict';
  setDetails(imageFromThumb(thumbnail), titleFormThumb(thumbnail));
}

function getThumbnailsArray() {
  'use strict';
  var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var thumbnailArray = [].slice.call(thumbnails);
  return thumbnailArray;
}

function randomizeThumbnails() {
  var triggers = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var triggersArray = [].slice.call(triggers);

  var arraydimension = triggersArray.length;

  var randomIndex = Math.floor(Math.random() * arraydimension);
  console.log(randomIndex);
  triggers[randomIndex].setAttribute('data-image-url', 'https://brand.tacocat.co/tacocat-coin-logo.png');
}

function resetThumbnails(thumbnail) {
  var trueSource = thumbnail.getAttribute('href');
  thumbnail.setAttribute('data-image-url',trueSource);
}

/*
function resetAndRandomize() {
  var triggers = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
  var triggersArray = [].slice.call(triggers);
  triggers.forEach(resetThumbnails);
  randomizeThumbnails();
}
*/

function hideDetails() {
  'use strict';
  document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
  'use strict';
  document.body.addEventListener('keyup', function(event) {
    event.preventDefault();
    console.log(event.keyCode);
    if (event.keyCode === ESC_KEY){
      hideDetails();
    }
  });
}

function showDetails() {
  'use strict';
  var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
  document.body.classList.remove(HIDDEN_DETAIL_CLASS);
  frame.classList.add(TINY_EFFECT_CLASS);
  setTimeout(function () {
    frame.classList.remove(TINY_EFFECT_CLASS);
  }, 50);
}

function initializeEvents() {
  'use strict';
  var thumbnails = getThumbnailsArray();
  thumbnails.forEach(addThumbClickHandler);
  addKeyPressHandler();
}

initializeEvents();
