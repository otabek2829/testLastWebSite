const express = require("express");
const router = express.Router();
const filterImg = require("../middleware/uploadImg");
const Portfolio = require("../model/portfolio");
const cardModels = require("../model/cardModel");
const aboutCompany = require("../model/aboutCompany");
const {
  webPortfolio,
  logoBanner,
  smm,
  CommandUser,
  ImageSchema,
  priceUslugi,
} = require("../model/portfolio");
const { dbLogoBanner } = require("../middleware/dataBase");
const resumeMessage = require("../model/sendResume");
const dbRegister = require("../model/login");
const path = require("path");
const fs = require("fs");
const { dirname } = require("path");

/* ADMIN BOSH SAHIFASI GET ZAPROS */
router.get("/", function (req, res, next) {
  res.render("partials/major/admin-login", {
    title: "MAJOR-MEDIA",
  });
});

router.post("/", (req, res, next) => {
  const promise = dbRegister.find();
  promise.then((data) => {
    data.filter((e) => {
      var email = e.email;
      var pass = e.password;
      if (email === req.body.email && pass === req.body.password) {
        res.redirect("/admin/messageResume");
      } else {
        res.render("partials/major/admin-login", {
          title: "неправильный пароль или адрес электронной почты",
          status: "неправильный пароль или адрес электронной почты",
        });
      }
    });
  });
});

// Cообщение page
router.get("/messageResume", (req, res) => {
  const promise = resumeMessage.find();
  promise.then((data) => {
    let sms = data.length;
    res.render("partials/major/messageResume", {
      title: "Полученное  Сообщение",
      data: data.map((e) => e.toJSON()),
      sms,
    });
  });
});
router.get("/messageResume/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await resumeMessage.findByIdAndDelete(id);
    res.redirect("/admin/messageResume");
  } catch (error) {
    console.log(error);
  }
});

// НАШИ ПРЕИМУЩЕСТВА |  ABOUT COMPANT STATISTICA | POST METHOD
router.get("/aboutCompany", (req, res) => {
  const promise = aboutCompany.find();
  promise.then((data) => {
    res.render("partials/major/aboutCompany", {
      title: "НАШИ ПРЕИМУЩЕСТВА",
      data: data.map((e) => e.toJSON()),
    });
  });
});
// НАШИ ПРЕИМУЩЕСТВА  | Malumotni Qoshish Page |  POST Page
router.post("/aboutCompany", filterImg.single("img"), (req, res) => {
  const db = new aboutCompany({
    img: req.file.filename,
    client: req.body.client,
    bodyText: req.body.bodyText,
    category: req.body.category,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/aboutCompany");
    })
    .catch((err) => {
      console.log(err);
    });
});
// НАШИ ПРЕИМУЩЕСТВА | Malumotni O'zgartirish | Update Page | Get Method
router.get("/aboutCompany/update/:id", (req, res) => {
  aboutCompany.findById(req.params.id, (err, data) => {
    const img = data.img;
    const client = data.client;
    const bodyText = data.bodyText;
    const category = data.category;
    try {
      res.render("partials/major/aboutCompany", {
        title: "Изменить продукт",
        button: "Изменить",
        img,
        client,
        bodyText,
        category,
      });
    } catch (err) {
      console.log(err);
    }
  });
});
//  НАШИ ПРЕИМУЩЕСТВА | Malumot Ozgartirib Uni Post Method Orqali Yuborish Page | Post Method
router.post(
  "/aboutCompany/update/:id",
  filterImg.single("img"),
  async (req, res) => {
    const db = {
      img: req.file.filename,
      client: req.body.client,
      bodyText: req.body.bodyText,
      category: req.body.category,
    };
    try {
      const ids = { _id: req.params.id };
      await aboutCompany.findByIdAndUpdate(ids, db);
      res.redirect("/admin/aboutCompany");
    } catch (error) {
      console.log(error);
    }
  }
);
// CARDS MODEL | Malumotni o'chirib yuborish Page |  Delete Page
router.get("/aboutCompany/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await aboutCompany.findByIdAndDelete(id);
    res.redirect("/admin/aboutCompany");
  } catch (error) {
    console.log(error);
  }
});

// CARDS MODEL | GET ZAPROS
router.get("/cardModels", (req, res) => {
  const promise = cardModels.find();
  promise.then((data) => {
    res.render("partials/major/cardModels", {
      title: "CARDS",
      data: data.map((e) => e.toJSON()),
    });
  });
});
// CARDS MODEL | Malumotni o'chirib yuborish Page |  Delete Page
router.get("/cardModels/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await cardModels.findByIdAndDelete(id);
    res.redirect("/admin/cardModels");
  } catch (error) {
    console.log(error);
  }
});
// CARDS MODEL | Malumotni Qoshish Page |  POST Page
router.post("/cardModels", (req, res) => {
  const db = new cardModels({
    title: req.body.title,
    bodyText: req.body.bodyText,
    price: req.body.price,
    timeData: req.body.timeData,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/cardModels");
    })
    .catch((err) => {
      console.log(err);
    });
});
// CARDS MODEL| Malumotni O'zgartirish | Update Page | Get Method
router.get("/cardModels/update/:id", (req, res) => {
  cardModels.findById(req.params.id, (err, data) => {
    const title = data.title;
    const bodyText = data.bodyText;
    const price = data.price;
    const timeData = data.timeData;
    try {
      res.render("partials/major/cardModels", {
        title: "Изменить продукт",
        button: "Изменить",
        title,
        bodyText,
        price,
        timeData,
      });
    } catch (err) {
      console.log(err);
    }
  });
});
//  CARDS MODEL| Malumot Ozgartirib Uni Post Method Orqali Yuborish Page | Post Method
router.post("/cardModels/update/:id", async (req, res) => {
  const db = {
    title: req.body.title,
    bodyText: req.body.bodyText,
    price: req.body.price,
    timeData: req.body.timeData,
  };
  try {
    const ids = { _id: req.params.id };
    await cardModels.findByIdAndUpdate(ids, db);
    res.redirect("/admin/cardModels");
  } catch (error) {
    console.log(error);
  }
});

// ADMIN LOGIN SAHIFASI GET ZAPROS
router.get("/admin-login", (req, res) => {
  res.render("partials/major/admin-login");
});

/*НАШИ КЛИЕНТЫ PAGE STARTING*/
/*НАШИ КЛИЕНТЫ | KOMPANIYA LOGO RASMLAR GET ZAPROS */
router.get("/nashi-klienti", function (req, res, next) {
  const promise = ImageSchema.find();
  promise.then((data) => {
    res.render("partials/major/nashi-clienti", {
      title: "НАШИ КЛИЕНТЫ",
      data: data.map((e) => e.toJSON()),
    });
  });
});
/*НАШИ КЛИЕНТЫ | KOMPANIYA LOGO RASMLAR POST ZAPROS */
router.post("/nashi-klienti", filterImg.single("img"), (req, res, next) => {
  const db = new ImageSchema({
    img: req.file.filename,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/nashi-klienti");
    })
    .catch((err) => {
      console.log(err);
    });
});
/*НАШИ КЛИЕНТЫ | KOMPANIYA LOGO RASMLAR DELETE ZAPROS */

router.get("/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await ImageSchema.findByIdAndDelete(id);
    res.redirect("/admin/nashi-klienti");
  } catch (error) {
    console.log(error);
  }
});

//НАША КОМАНДА PAGE STARTING
/*НАША КОМАНДА | KOMPANIYA USER RASMLAR GET ZAPROS */
router.get("/nashaComanda", (req, res) => {
  const promise = CommandUser.find();
  promise.then((data) => {
    res.render("partials/major/CommandUser", {
      title: "НАША КОМАНДА",
      data: data.map((e) => e.toJSON()),
    });
  });
});
/*НАША КОМАНДА | KOMPANIYA USER RASMLAR POST ZAPROS */
router.post("/CommandUser", filterImg.single("img"), (req, res) => {
  console.log(req.body);
  const db = new CommandUser({
    img: req.file.filename,
    name: req.body.userName,
    expert: req.body.userExpert,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/nashaComanda");
    })
    .catch((err) => {
      console.log(err);
    });
});
/*НАША КОМАНДА | KOMPANIYA USER RASMLAR DELETE ZAPROS */
router.get("/nashaComanda/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await CommandUser.findByIdAndDelete(id);
    res.redirect("/admin/nashaComanda");
  } catch (error) {
    console.log(error);
  }
});

//НАШЕ ПОРТФОЛИО PAGE STARTING
//НАШЕ ПОРТФОЛИО | GET ZAPROS
router.get("/portfolio", (req, res) => {
  const promise = webPortfolio.find();

  promise.then((data) => {
    res.render("partials/major/portfolio", {
      title: "НАШЕ ПОРТФОЛИО",
      portfolio: data.map((e) => e.toJSON()),
    });
  });
});

// WEBPORTFOLIO PAGE STARtING
// WEBPORTFOLIO GET ZAPROS
router.get("/portfolio/webPortfolio", (req, res) => {
  const promise = webPortfolio.find();
  promise.then((data) => {
    res.render("partials/major/webPortfolio", {
      title: "Разработка сайтов",
      portfolio: data.map((e) => e.toJSON()),
    });
  });
});
// WEBPORTFOLIO POST ZAPROS
router.post("/portfolio/webPortfolio", filterImg.single("img"), (req, res) => {
  const db = new webPortfolio({
    img: req.file.filename,
    webAdress: req.body.webAdress,
    aboutText: req.body.aboutText,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/portfolio/webPortfolio");
    })
    .catch((err) => {
      console.log(err);
    });
});
// WEBPORTFOLIO :DELETE ZAPROS
router.get("/portfolio/webPortfolio/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await webPortfolio.findByIdAndDelete(id);
    res.redirect("/admin/portfolio/webPortfolio");
  } catch (error) {
    console.log(error);
  }
});

// LOGO PAGE STARTING
// LOGO BANNER GET ZAPROS
router.get("/portfolio/logoBanner", (req, res) => {
  const promise = logoBanner.find();
  promise.then((data) => {
    res.render("partials/major/logoBanner", {
      title: "Логотипы, баннера",
      data: data.map((e) => e.toJSON()),
    });
  });
});
// LOGO BANNER POST ZAPROS
router.post("/portfolio/logoBanner", filterImg.single("img"), (req, res) => {
  const db = new logoBanner({
    img: req.file.filename,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/portfolio/logoBanner");
    })
    .catch((err) => {
      console.log(err);
    });
});
// LOGOBANNER :DELETE ZAPROS
router.get("/portfolio/logoBanner/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await logoBanner.findByIdAndDelete(id);
    res.redirect("/admin/portfolio/logoBanner");
  } catch (error) {
    console.log(error);
  }
});

// SMM PAGE STARTING
// SMM GET ZAPROS
router.get("/portfolio/smm", (req, res) => {
  const promise = smm.find();
  promise.then((data) => {
    res.render("partials/major/smm", {
      title: "SMM-продвижение",
      data: data.map((e) => e.toJSON()),
    });
  });
});
// SMM POST ZAPROS
router.post("/portfolio/smm", filterImg.single("img"), (req, res) => {
  const db = new smm({
    img: req.file.filename,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/portfolio/smm");
    })
    .catch((err) => {
      console.log(err);
    });
});
// SMM :DELETE ZAPROS
router.get("/portfolio/smm/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await smm.findByIdAndDelete(id);
    res.redirect("/admin/portfolio/smm");
  } catch (error) {
    console.log(error);
  }
});

// УСЛУГЫ ЦЕНЫ PAGE STARTING
// УСЛУГЫ ЦЕНЫ  | priceUSlugi GET ZAPROS
router.get("/priceUslugi", (req, res) => {
  const promise = Portfolio.priceUslugi.find();
  promise.then((data) => {
    res.render("partials/major/priceUslugi", {
      title: "УСЛУГЫ ЦЕНЫ",
      data: data.map((e) => e.toJSON()),
    });
  });
});

// Разработка сайтов Page Starting
// WEBSITE GET ZAPROS
router.get("/priceUslugi/webSite", (req, res) => {
  const promise = priceUslugi.find({ category: "Разработка сайтов" });
  promise.then((data) => {
    res.render("partials/major/priceUslugi/webSite", {
      title: "Разработка сайтов",
      data: data.map((e) => e.toJSON()),
    });
  });
});
// WEBSITE  POST ZAPROS | Xizmat Listini yaratish page
router.post("/priceUslugi/webSite", (req, res) => {
  const db = new priceUslugi({
    uslugiTitle: req.body.uslugiTitle,
    uslugiPrice: req.body.uslugiPrice,
    category: req.body.category,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/priceUslugi/webSite");
    })
    .catch((err) => {
      console.log(err);
    });
});
// WEBSITE | Malumotni O'zgartirish | Update Page | Get Method
router.get("/priceUslugi/webSite/update/:id", (req, res) => {
  priceUslugi.findById(req.params.id, (err, data) => {
    const uslugiTitle = data.uslugiTitle;
    const uslugiPrice = data.uslugiPrice;
    const category = data.category;
    try {
      res.render("partials/major/priceUslugi/webSite", {
        title: "Изменить продукт",
        button: "Изменить",
        uslugiTitle,
        uslugiPrice,
        category,
      });
    } catch (err) {
      console.log(err);
    }
  });
});
//  WEBSITE | Malumot Ozgartirib Uni Post Method Orqali Yuborish Page | Post Method
router.post("/priceUslugi/webSite/update/:id", async (req, res) => {
  const db = {
    uslugiTitle: req.body.uslugiTitle,
    uslugiPrice: req.body.uslugiPrice,
    category: req.body.category,
  };
  try {
    const ids = { _id: req.params.id };
    await priceUslugi.findByIdAndUpdate(ids, db);
    res.redirect("/admin/priceUslugi/webSite");
  } catch (error) {
    console.log(error);
  }
});
// WEBSITE | Malumotni o'chirib yuborish Page |  Delete Page
router.get("/priceUslugi/webSite/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await priceUslugi.findByIdAndDelete(id);
    res.redirect("/admin/priceUslugi/webSite");
  } catch (error) {
    console.log(error);
  }
});

// SMM Page Starting
// SMM Page GET ZAPROS
router.get("/priceUslugi/smm", (req, res) => {
  const promise = priceUslugi.find({ category: "SMM" });
  promise.then((data) => {
    res.render("partials/major/priceUslugi/smm", {
      title: "SMM",
      data: data.map((e) => e.toJSON()),
    });
  });
});
// SMM | priceUslugi POST ZAPROS | Xizmat Listini yaratish page
router.post("/priceUslugi/smm", (req, res) => {
  const db = new priceUslugi({
    uslugiTitle: req.body.uslugiTitle,
    uslugiPrice: req.body.uslugiPrice,
    category: req.body.category,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/priceUslugi/smm");
    })
    .catch((err) => {
      console.log(err);
    });
});
// SMM | Malumotni O'zgartirish | Update Page | Get Method
router.get("/priceUslugi/smm/update/:id", (req, res) => {
  priceUslugi.findById(req.params.id, (err, data) => {
    const uslugiTitle = data.uslugiTitle;
    const uslugiPrice = data.uslugiPrice;
    const category = data.category;
    try {
      res.render("partials/major/priceUslugi/smm", {
        title: "Изменить продукт",
        button: "Изменить",
        uslugiTitle,
        uslugiPrice,
        category,
      });
    } catch (err) {
      console.log(err);
    }
  });
});
// SMM | Malumot Ozgartirib Uni Post Method Orqali Yuborish Page | Post Method
router.post("/priceUslugi/smm/update/:id", async (req, res) => {
  const db = {
    uslugiTitle: req.body.uslugiTitle,
    uslugiPrice: req.body.uslugiPrice,
    category: req.body.category,
  };
  try {
    const ids = { _id: req.params.id };
    await priceUslugi.findByIdAndUpdate(ids, db);
    res.redirect("/admin/priceUslugi/smm");
  } catch (error) {
    console.log(error);
  }
});
// SMM | Malumorni o'chirib yuborish Page |  Delete Page
router.get("/priceUslugi/smm/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await priceUslugi.findByIdAndDelete(id);
    res.redirect("/admin/priceUslugi/smm");
  } catch (error) {
    console.log(error);
  }
});

// LOGO BANNER Page Starting
// LOGO BANNER Page GET ZAPROS
router.get("/priceUslugi/logoBanner", (req, res) => {
  const promise = priceUslugi.find({ category: "Логотипы, баннера" });
  promise.then((data) => {
    res.render("partials/major/priceUslugi/logoBanner", {
      title: "Логотипы, баннера",
      data: data.map((e) => e.toJSON()),
    });
  });
});
// LOGO BANNER | priceUslugi POST ZAPROS | Xizmat Listini yaratish page
router.post("/priceUslugi/logoBanner", (req, res) => {
  const db = new priceUslugi({
    uslugiTitle: req.body.uslugiTitle,
    uslugiPrice: req.body.uslugiPrice,
    category: req.body.category,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/priceUslugi/logoBanner");
    })
    .catch((err) => {
      console.log(err);
    });
});
// LOGO BANNER | Malumotni O'zgartirish | Update Page | Get Method
router.get("/priceUslugi/logoBanner/update/:id", (req, res) => {
  priceUslugi.findById(req.params.id, (err, data) => {
    const uslugiTitle = data.uslugiTitle;
    const uslugiPrice = data.uslugiPrice;
    const category = data.category;
    try {
      res.render("partials/major/priceUslugi/logoBanner", {
        title: "Изменить продукт",
        button: "Изменить",
        uslugiTitle,
        uslugiPrice,
        category,
      });
    } catch (err) {
      console.log(err);
    }
  });
});
// LOGO BANNER | Malumot Ozgartirib Uni Post Method Orqali Yuborish Page | POst Method
router.post("/priceUslugi/logoBanner/update/:id", async (req, res) => {
  const db = {
    uslugiTitle: req.body.uslugiTitle,
    uslugiPrice: req.body.uslugiPrice,
    category: req.body.category,
  };
  try {
    const ids = { _id: req.params.id };
    await priceUslugi.findByIdAndUpdate(ids, db);
    res.redirect("/admin/priceUslugi/logoBanner");
  } catch (error) {
    console.log(error);
  }
});
// LOGO BANNER | Malumorni o'chirib yuborish Page |  Delete Page
router.get("/priceUslugi/logoBanner/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await priceUslugi.findByIdAndDelete(id);
    res.redirect("/admin/priceUslugi/logoBanner");
  } catch (error) {
    console.log(error);
  }
});

// Техническая поддержка Page Starting
// TECHNICAL SUPPORT Page GET ZAPROS
router.get("/priceUslugi/technicalSupport", (req, res) => {
  const promise = priceUslugi.find({ category: "Техническая поддержка" });
  promise.then((data) => {
    res.render("partials/major/priceUslugi/technicalSupport", {
      title: "Техническая поддержка",
      data: data.map((e) => e.toJSON()),
    });
  });
});
// TECHNICAL SUPPORT | priceUslugi POST ZAPROS | Xizmat Listini yaratish page
router.post("/priceUslugi/technicalSupport", (req, res) => {
  const db = new priceUslugi({
    uslugiTitle: req.body.uslugiTitle,
    uslugiPrice: req.body.uslugiPrice,
    category: req.body.category,
  });
  db.save()
    .then(() => {
      res.redirect("/admin/priceUslugi/technicalSupport");
    })
    .catch((err) => {
      console.log(err);
    });
});
// TECHNICAL SUPPORT | Malumotni O'zgartirish | Update Page | Get Method
router.get("/priceUslugi/technicalSupport/update/:id", (req, res) => {
  priceUslugi.findById(req.params.id, (err, data) => {
    const uslugiTitle = data.uslugiTitle;
    const uslugiPrice = data.uslugiPrice;
    const category = data.category;
    try {
      res.render("partials/major/priceUslugi/technicalSupport", {
        title: "Изменить продукт",
        button: "Изменить",
        uslugiTitle,
        uslugiPrice,
        category,
      });
    } catch (err) {
      console.log(err);
    }
  });
});
// TECHNICAL SUPPORT | Malumot Ozgartirib Uni Post Method Orqali Yuborish Page | POst Method
router.post("/priceUslugi/technicalSupport/update/:id", async (req, res) => {
  const db = {
    uslugiTitle: req.body.uslugiTitle,
    uslugiPrice: req.body.uslugiPrice,
    category: req.body.category,
  };
  try {
    const ids = { _id: req.params.id };
    await priceUslugi.findByIdAndUpdate(ids, db);
    res.redirect("/admin/priceUslugi/technicalSupport");
  } catch (error) {
    console.log(error);
  }
});
// TECHNICAL SUPPORT | Malumorni o'chirib yuborish Page |  Delete Page
router.get("/priceUslugi/technicalSupport/delete/:id", async (req, res) => {
  try {
    const id = { _id: req.params.id };
    await priceUslugi.findByIdAndDelete(id);
    res.redirect("/admin/priceUslugi/technicalSupport");
  } catch (error) {
    console.log(error);
  }
});

//ВАКАНСИИ page
// CARDS MODEL | GET ZAPROS
router.get("/vakansiya", (req, res) => {
  // const promise = cardModels.find()
  // promise.then(data => {
  res.render("partials/major/vakansiya", {
    title: "ВАКАНСИИ",
    // data : data.map(e => e.toJSON())
    // })
  });
});
// // CARDS MODEL | Malumotni o'chirib yuborish Page |  Delete Page
// router.get('/cardModels/delete/:id', async (req, res) => {
//   try{
//     const id = {_id : req.params.id}
//     await cardModels.findByIdAndDelete(id)
//     res.redirect('/admin/cardModels')
//   }
//   catch(error){
//     console.log(error);
//   }
// })
// // CARDS MODEL | Malumotni Qoshish Page |  POST Page
// router.post('/cardModels', (req, res) => {
//   const db = new cardModels({
//     title : req.body.title,
//     bodyText : req.body.bodyText,
//     price : req.body.price,
//     timeData : req.body.timeData
//   });
//   db.save()
//     .then(() => {
//       res.redirect("/admin/cardModels");
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })
// // CARDS MODEL| Malumotni O'zgartirish | Update Page | Get Method
// router.get("/cardModels/update/:id", (req, res) => {
//   cardModels.findById(req.params.id, (err, data) => {
//     const title = data.title;
//     const bodyText = data.bodyText;
//     const price = data.price;
//     const timeData = data.timeData;
//     try {
//       res.render("partials/major/cardModels", {
//         title: "Изменить продукт",
//         button: "Изменить",
//         title,
//         bodyText,
//         price,
//         timeData,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   });
// });
// //  CARDS MODEL| Malumot Ozgartirib Uni Post Method Orqali Yuborish Page | Post Method
// router.post("/cardModels/update/:id", async (req, res) => {
//   const db = {
//     title: req.body.title,
//     bodyText: req.body.bodyText,
//     price: req.body.price,
//     timeData: req.body.timeData
//   };
//   try {
//     const ids = { _id: req.params.id };
//     await cardModels.findByIdAndUpdate(ids, db);
//     res.redirect("/admin/cardModels");
//   } catch (error) {
//     console.log(error);
//   }
// });
module.exports = router;
