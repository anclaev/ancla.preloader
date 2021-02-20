var phrases = [];
preloaderStatus = false;
preloader = $(".preloader");
phraseBox = $(".preloader-title__text");

const loadData = (dataType, targetStorage, callback) => {
  $.getJSON("js/preloader.json", (data) => {
    let targetData = data[dataType];

    $.each(targetData, (id) => {
      targetStorage.push(targetData[id]);
    });

    callback(data["fadeSpeed"]);
  });
};

const setPhrase = (fadeSpeed) => {
  let phraseIndex = 0;

  if (phrases.length != 0) phraseIndex = getRandomInt(0, phrases.length);

  currentPhrase = phraseBox.text();
  nextPhrase = phrases[phraseIndex] + "...";

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

  if (currentPhrase == nextPhrase) {
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

const showPreloader = (timeout) => {
  preloader.toggleClass("preloader--active");

  if (typeof timeout != "undefined") {
    setTimeout(() => {
      closePreloader();
    }, timeout);
  }

  preloaderStatus = true;

  loadData("phrases", phrases, (fadeSpeed) => setPhrase(fadeSpeed));
};

const closePreloader = () => (preloaderStatus = false);

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;
