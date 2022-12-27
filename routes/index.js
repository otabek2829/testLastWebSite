const express = require("express");
const router = express.Router();
const Portfolio = require("../model/portfolio");
const cardModels = require("../model/cardModel");
const e = require("express");
const { signedCookie } = require("cookie-parser");
const aboutCompany = require("../model/aboutCompany");
const sendResume = require('../model/sendResume')


// DATA BAZADAN MALUMOT OLISH UCHUN FUNKSIYA YARATILIB UNING ICHIDAGI MALUMOTLARNI BITTA O'ZGARUVCHIGA SOLIB YUBORILVOTTI
// НАШИ КЛИЕНТЫ PAGE
var nashiClient;
const getNashiClient = async () => {
  nashiClient = await Portfolio.ImageSchema.find();
  nashiClient = await nashiClient.map((e) => e.toJSON());
};

// НАШИ ПРЕИМУЩЕСТВА | Get Info
var dbAboutCompany;
const getAboutCompany = async () => {
  dbAboutCompany = await aboutCompany.find()
  dbAboutCompany = await dbAboutCompany.map(e => e.toJSON())
}

// СТОИМОСТЬ НАШИХ УСЛУГ | PRICE PAGE STARTING | Xizmat narxlarini databazadan olish jarayoni web,smm, logo banner, texnicheskiy poderjka 4 bolimdan iborat
// Разработка сайтов
var dataWebsite;
const getWebUslugi = async () => {
  dataWebsite = await Portfolio.priceUslugi.find({
    category: "Разработка сайтов",
  });
  dataWebsite = await dataWebsite.map((e) => e.toJSON());
};
// SMM
var dataSmm;
const getSmmUslugi = async () => {
  dataSmm = await Portfolio.priceUslugi.find({ category: "SMM" });
  dataSmm = await dataSmm.map((e) => e.toJSON());
};
// Логотипы, баннера
var dataLogoBanner;
const getLogoBannerUslugi = async () => {
  dataLogoBanner = await Portfolio.priceUslugi.find({
    category: "Логотипы, баннера",
  });
  dataLogoBanner = await dataLogoBanner.map((e) => e.toJSON());
};
// Техническая поддержка
var dataTechSupport;
const getTechSupportUslugi = async () => {
  dataTechSupport = await Portfolio.priceUslugi.find({
    category: "Техническая поддержка",
  });
  dataTechSupport = await dataTechSupport.map((e) => e.toJSON());
};

/* GET Home page. */
router.get("/", (req, res, next) => {

  // НАШИ КЛИЕНТЫ PAGE
  getNashiClient();

  // НАШИ ПРЕИМУЩЕСТВА
  getAboutCompany()
  
  // Разработка сайтов
  getWebUslugi()
  
  // SMM
  getSmmUslugi()
  
  // Логотипы, баннера
  getLogoBannerUslugi()


  const promise = cardModels.find();
  promise.then((data) => {
    res.render("index", {
      title: "MAJOR_MEDIA",
      datas: data.map((e) => e.toJSON()),
      data: nashiClient,
      dbAboutCompany,
      dataWebsite,
      dataSmm,
      dataLogoBanner
    });
  });
});



/* GET Price page. */
router.get("/price", (req, res, next) => {
  // Разработка сайтов
  getWebUslugi();
  // SMM
  getSmmUslugi();
  // Логотипы, баннера
  getLogoBannerUslugi();
  // Техническая поддержка
  getTechSupportUslugi();
  // НАШИ КЛИЕНТЫ
  getNashiClient();

  res.render("partials/price", {
    title: "СТОИМОСТЬ НАШИХ УСЛУГ",
    data: nashiClient,
    dataWebsite,
    dataSmm,
    dataLogoBanner,
    dataTechSupport,
  });
});

/* GET Portfolio page. */
// НАШЕ ПОРТФОЛИО | Portfolioni databazadan olish jarayoni
// WEB SITE PORTFOLIO
var webPortfolio;
const getWebPortfolio = async () => {
  webPortfolio = await Portfolio.webPortfolio.find()
  webPortfolio = await webPortfolio.map((e) => e.toJSON())
}
// LOGO BANNER PORTFOLIO
var logoBannerPortfolio;
const getLogoBannerPortfolio = async () => {
  logoBannerPortfolio = await Portfolio.logoBanner.find()
  logoBannerPortfolio = await logoBannerPortfolio.map((e) => e.toJSON())
}
// SMM PORTFOLIO
var smmPortfolio;
const getSmmPortfolio = async () => {
  smmPortfolio = await Portfolio.smm.find()
  smmPortfolio = await smmPortfolio.map((e) => e.toJSON())
  console.log(getSmmPortfolio);
}

router.get("/portfolio", (req, res, next) => {

  // WEB SITE PORTFOLIO
  getWebPortfolio()
  // LOGO BANNER PORTFOLIO
  getLogoBannerPortfolio()
  // SMM PORTFOLIO
  getSmmPortfolio()
  // НАШИ КЛИЕНТЫ
  getNashiClient();

  res.render("partials/portfolio", {
    title: "НАШЕ ПОРТФОЛИО",
    data: nashiClient,
    webPortfolio,
    logoBannerPortfolio,
    smmPortfolio,
  });
});


// НАША КОМАНДА | USER MALUMOTLARI OLINVOTTI
var dataCommandUser;
const getCommandUser = async ()  => {
  dataCommandUser = await Portfolio.CommandUser.find()
  dataCommandUser = await dataCommandUser.map((e) => e.toJSON())
}

/* GET Company page. */
router.get("/o-company", (req, res, next) => {
  
  // НАШИ КЛИЕНТЫ
  getNashiClient();
  //НАША КОМАНДА 
  getCommandUser()

  res.render("partials/company", {
    title: "О КОМПАНИИ",
    data: nashiClient,
    CommandUser : dataCommandUser,
  });
});

/* GET Reviews page. */
router.get("/otziv", (req, res, next) => {
    // НАШИ КЛИЕНТЫ
    getNashiClient()
 
  res.render("partials/otziv", {
    title: "ОТЗЫВЫ КЛИЕНТОВ",
    data: nashiClient,
  });
});

/* GET Contact page. */
router.get("/contact", (req, res, next) => {
  res.render("partials/contact", {
    title: " НАШИХ КОНТАКТ",
  });
});

// CONTACT POST METHOD
router.post("/contact",  (req, res) => {
  const db =  new sendResume({
    name: req.body.userName,
    category: req.body.category,
    phoneNumber: req.body.phoneNumber,
    adressResume: req.body.adressResume,
  });
  db.save()
    .then(() => {
      setTimeout(() => {
        res.redirect("/contact");
      },8000)
    })
    .catch((err) => {
      console.log(err);
    });
});

/* GET Vakansii page. */
router.get("/vakansii", (req, res, next) => {
  res.render("partials/vakansii", { title: " ВАКАНСИИ" });
});

module.exports = router;
