// const Portfolio = require("../model/portfolio");


// Bu yerda Malumotlarni databazadan olib o'zgaruvchilarga solib index.js ga yuborilvotti
// const nashiCliet = [];
// const webPortfolio = [];
// const logoBanner = [];
// const Smm = [];
// const CommandUsers = [];

// USLUGi PRICE PAGE | 4ta pagedan iborat
// const dbWebsite = [];
// const dbSmm = [];
// const dbLogoBanner = [];
// const dbTechnicalSupport = [];


// 2ta joydan kevotkan malumotni bitta rootga yuborish
// nashiCliet page
// Portfolio.ImageSchema.find((err, data) => {
//   try {
//     data = data.map((e) => e.toJSON());
//     nashiCliet.push(data);
//   } catch (err) {
//     console.log(err);
//   }
// });
// webPortfolio page
// Portfolio.webPortfolio.find((err, data) => {
//   try {
//     data = data.map((e) => e.toJSON());
//     webPortfolio.push(data);
//   } catch (err) {
//     console.log(err);
//   }
// });
// logoBanner page
// Portfolio.logoBanner.find((err, data) => {
//   try {
//     data = data.map((e) => e.toJSON());
//     logoBanner.push(data);
//   } catch (err) {
//     console.log(err);
//   }
// });
// Smm page
// Portfolio.smm.find((err, data) => {
//   try {
//     data = data.map((e) => e.toJSON());
//     Smm.push(data);
//   } catch (err) {
//     console.log(err);
//   }
// });
// CommandUsers page
// Portfolio.CommandUser.find((err, data) => {
//   try {
//     data = data.map((e) => e.toJSON());
//     CommandUsers.push(data);
//   } catch (err) {
//     console.log(err);
//   }
// });

// Umumiy malumot priceUslugi orqali kevotti | Ularni 4ta bolimga bolib filterlab yuboramiz

// - WEBSITE
// - SMM
// - LOGOTIP, BANNER
// - TECHNICHAL SUPPORT | Техническая поддержка

// - uni filter orqali shu yerdan yuborishimiz kere

//   PriceUslugi page
//  WEBSITE PAGE
// const promise = Portfolio.priceUslugi.find({ category: "Разработка сайтов" });
// promise
//   .then((data) => {
//     data = data.map((e) => e.toJSON());
//     dbWebsite.push(data);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// WEBSITE PAGE STARTING | PRICE > WEBSITE PAGE UCHUN MALUMOT FILTERLASH
// Portfolio.priceUslugi.find({category : "Разработка сайтов" }, (error, data) => {
//   try {
//     data = data.map((e) => e.toJSON())
//     dbWebsite.push(data)
//   } catch (error) {
//     console.log(error);
//   }
// }
// )
//  SMM PAGE STARTING | PRICE > SMM PAGE UCHUN MALUMOT FILTERLASH
//   Portfolio.priceUslugi.find({category : "SMM" }, (error, data) => {
//     try {
//       data = data.map((e) => e.toJSON())
//       dbSmm.push(data)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//  )
//  LOGO BANNER PAGE STARTING | PRICE > LOGO BANNER PAGE UCHUN MALUMOT FILTERLASH
//   Portfolio.priceUslugi.find({category : "Логотипы, баннера" }, (error, data) => {
//     try {
//       data = data.map((e) => e.toJSON())
//       dbLogoBanner.push(data)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//  )
//  TECHNICAL SUPPORT PAGE STARTING | PRICE > TECHNICAL SUPPORT PAGE UCHUN MALUMOT FILTERLASH
//   Portfolio.priceUslugi.find({category : "Техническая поддержка" }, (error, data) => {
//     try {
//       data = data.map((e) => e.toJSON())
//       dbTechnicalSupport.push(data)
//     } catch (error) {
//       console.log(error);
//     }
//   }
//  )


// module.exports = {
//   nashiCliet,
//   webPortfolio,
//   logoBanner,
//   Smm,
//   CommandUsers,
//   dbWebsite,
//   dbSmm,
//   dbLogoBanner,
//   dbTechnicalSupport
// };
