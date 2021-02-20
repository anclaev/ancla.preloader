var storage = {
  preloader: {
    phrases: [],
    fadeSpeed: 0,
  },
};

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

  loadData("preloader", () => setPhrase());
};

const loadData = (target, callback) => {
  $.getJSON("js/" + target + ".json", (data) => {
    storage[target] = data;
    callback();
  });
};

const setPhrase = () => {
  let phrases = storage["preloader"]["phrases"];
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
      }, 1500);

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
  }, storage["preloader"]["fadeSpeed"]);

  setTimeout(() => {
    phraseBox.toggleClass("fadeOut");
    setPhrase();
  }, storage["preloader"]["fadeSpeed"] * 3);
};

const closePreloader = () => (preloaderStatus = false);

const getRandomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;
