var phrases = [];
fadeSpeed = "";
preloaderStatus = false;
preloader = $(".preloader");
phraseBox = $(".preloader-title__text");

const showPreloader = (timeout) => {
  preloader.toggleClass("preloader--active");

  if (typeof timeout != "undefined") {
    setTimeout(() => {
      closePreloader();
    }, timeout);
  }

  preloaderStatus = true;

  loadData("phrases", phrases, () => setPhrase());
};

const loadData = (dataType, targetStorage, callback) => {
  $.getJSON("js/preloader.json", (data) => {
    let targetData = data[dataType];

    $.each(targetData, (id) => {
      targetStorage.push(targetData[id]);
    });
    fadeSpeed = data["fadeSpeed"];
    callback();
  });
};

const setPhrase = () => {
  let phraseIndex = 0;

  if (phrases.length != 0) phraseIndex = getRandomInt(0, phrases.length);

  currentPhrase = phraseBox.text();
  nextPhrase = phrases[phraseIndex] + "...";

  //Деактивация прелоадера
  setInterval(() => {
    if (!preloaderStatus) {
      preloader.addClass("fadeOut");
      $("body").css("overflow-y", "visible");

      setTimeout(() => {
        preloader.remove();
      }, 2000);

      return true;
    }
  }, 1000);
  //.

  if (currentPhrase == nextPhrase && phrases.length > 1) {
    setPhrase();
    return true;
  }

  phraseBox.text(nextPhrase);
  phraseBox.toggleClass("fadeIn");

  setTimeout(() => {
    phraseBox.toggleClass("fadeIn");
    phraseBox.toggleClass("fadeOut");
  }, fadeSpeed);

  setTimeout(() => {
    phraseBox.toggleClass("fadeOut");
    setPhrase();
  }, fadeSpeed * 3);
};

const closePreloader = () => (preloaderStatus = false);

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;
