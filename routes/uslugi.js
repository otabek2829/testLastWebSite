const express = require("express");
const router = express.Router();
const {ImageSchema , webPortfolio, smm  } = require('../model/portfolio')

// НАШЕ ПОРТФОЛИО | WEB PORTFOLIO 
var dbWebPortfolio;
const getWebPortfolio = async  () => {
  dbWebPortfolio = await webPortfolio.find()
  dbWebPortfolio = await dbWebPortfolio.map(e => e.toJSON())
}


/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("index");
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ WEB Promo-page ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// Promo page
router.get("/websites/promo-page", function (req, res, next) {
  getWebPortfolio()
  res.render("partials/Uslugi/websites/promo-page",{
    title : "РАЗРАБОТКА PROMO PAGE",
    dbWebPortfolio
  });
});
// WEB site-visit page
router.get("/websites/site-visit", function (req, res, next) {
  // НАШЕ ПОРТФОЛИО | WEB Portfolio Get Data
  getWebPortfolio()
  res.render("partials/Uslugi/websites/site-visit",{
    title : "САЙТ-ВИЗИТКА",
    dbWebPortfolio
  });
});
// WEB landing page
router.get("/websites/landing-page", function (req, res, next) {
  // НАШЕ ПОРТФОЛИО | WEB Portfolio Get Data
  getWebPortfolio()
  res.render("partials/Uslugi/websites/landing-page",{
    title : "РАЗРАБОТКА LANDING PAGE",
    dbWebPortfolio
  });
});
// WEB corporativ-site page
router.get("/websites/corporativ-site", function (req, res, next) {
  // НАШЕ ПОРТФОЛИО | WEB Portfolio Get Data
  getWebPortfolio()
  res.render("partials/Uslugi/websites/corporativ-site", {
    title : "КОРПОРАТИВНЫЙ САЙТ",
    dbWebPortfolio
  });
});
// WEB site-catalog page
router.get("/websites/site-catalog", function (req, res, next) {
  // НАШЕ ПОРТФОЛИО | WEB Portfolio Get Data
  getWebPortfolio()
  res.render("partials/Uslugi/websites/site-catalog",{
    title : "САЙТ-КАТАЛОГ",
    dbWebPortfolio
  });
});
// WEB internet-magazin page
router.get("/websites/internet-magazin", function (req, res, next) {
  // НАШЕ ПОРТФОЛИО | WEB Portfolio Get Data
  getWebPortfolio()
  res.render("partials/Uslugi/websites/internet-magazin",{
    title : "РАЗРАБОТКА ИНТЕРНЕТ-МАГАЗИНА",
    dbWebPortfolio
  });
});




//  ++++++++++++++++++++++++++++++++++++++++++++++++ Reklama Page ++++++++++++++++++++++++++++++++++++++++++++++++

// НАШЕ ПОРТФОЛИО | РЕКЛАМА В СОЦИАЛЬНЫХ СЕТЯХ PORTFOLIO 
var dbSmmPortfolio;
const getSmmPortfolio = async () => {
  dbSmmPortfolio = await smm.find()
  dbSmmPortfolio = await dbSmmPortfolio.map(e => e.toJSON())
}
// Smm page
router.get("/reklama/smm", (req, res) => {

  // SMM НАШЕ ПОРТФОЛИО GET DATA
  getSmmPortfolio()
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/reklama/smm", {
      title: "SMM ПРОДВИЖЕНИЕ В ТАШКЕНТЕ",
      data: data.map((e) => e.toJSON()),
      dbSmmPortfolio
    });
  });
});

// Target Page
router.get("/reklama/target", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/reklama/target", {
      title: "ТАРГЕТИРОВАННАЯ РЕКЛАМА",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// Target Page
router.get("/reklama/tgChannel", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/reklama/tgChannel", {
      title: "РЕКЛАМА В TELEGRAM-КАНАЛАХ",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// Reklama FACEBOOK Page
router.get("/reklama/reklamaFacebook", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/reklama/reklamaFacebook", {
      title: "РЕКЛАМА В FACEBOOK",
      data: data.map((e) => e.toJSON()),
    });
  });
});
// Reklama Instagram Page
router.get("/reklama/reklamaInstagram", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/reklama/reklamaInstagram", {
      title: "РЕКЛАМА В INSTAGRAM",
      data: data.map((e) => e.toJSON()),
    });
  });
});
// Reklama odnoklassniki Page
router.get("/reklama/reklamaOdnoklassniki", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/reklama/reklamaOdnoklassniki", {
      title: "РЕКЛАМА В Odnoklassniki",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Biznes Page ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Logo page
router.get("/dlyaBiznesa/logotip", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/dlyaBiznesa/logotip", {
      title: "РАЗРАБОТКА ЛОГОТИПА",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// telegram-bot page
router.get("/dlyaBiznesa/telegram-bot", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/dlyaBiznesa/telegram-bot", {
      title: "РАЗРАБОТКА ТЕЛЕГРАМ БОТА",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// telegram-bot page
router.get("/dlyaBiznesa/telegram-bot", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/dlyaBiznesa/telegram-bot", {
      title: "РАЗРАБОТКА ТЕЛЕГРАМ БОТА",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// googleAds page
router.get("/dlyaBiznesa/googleAds", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/dlyaBiznesa/googleAds", {
      title: "РАЗРАБОТКА ТЕЛЕГРАМ БОТА",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// yandex page
router.get("/dlyaBiznesa/yandex", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/dlyaBiznesa/yandex", {
      title: "НАСТРОЙКА ЯНДЕКС.ДИРЕКТ",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// consalting page
router.get("/dlyaBiznesa/consalting", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/dlyaBiznesa/consalting", {
      title: "ИНТЕРНЕТ-КОНСАЛТИНГ",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// spravochnikah page
router.get("/dlyaBiznesa/spravochnikah", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/dlyaBiznesa/spravochnikah", {
      title: "ПРОДВИЖЕНИЕ В СПРАВОЧНИКАХ",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// html-banner page
router.get("/dlyaBiznesa/html-banner", (req, res) => {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/Uslugi/dlyaBiznesa/html-banner", {
      title: "HTML5 БАННЕРЫ",
      data: data.map((e) => e.toJSON()),
    });
  });
});
module.exports = router;
