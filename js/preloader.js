var storage = {
  preloader: {
    phrases: [],
    fadeSpeed: 0,
  },
};

var preloaderCode =
  "<div class='preloader'><div class='preloader-car'><div class='car'><div class='strike'></div><div class='strike strike2'></div><div class='strike strike3'></div><div class='strike strike4'></div><div class='strike strike5'></div><div class='car-detail spoiler'></div><div class='car-detail back'></div><div class='car-detail center'></div><div class='car-detail center1'></div><div class='car-detail front'></div><div class='car-detail wheel'></div><div class='car-detail wheel wheel2'></div></div><!-- /.car --></div><!-- /.preloader-car --><div class='preloader-title'><span class='preloader-title__text'></span></div><!-- /.preloader-title --></div>";

preloaderStatus = false;

const showPreloader = (timeout) => {
  $("body").append(preloaderCode);

  preloader = $(".preloader");
  phraseBox = $(".preloader-title__text");

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
      $("body").css("overflow-y", "");

      setTimeout(() => {
        preloader.remove();

        let id = window.setTimeout(() => {}, 0);
        while (id--) {
          window.clearTimeout(id);
        }
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
