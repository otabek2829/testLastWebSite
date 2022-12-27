module.exports = {

  //royhatdan o'tgan 
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    // req.flash('danger', 'Hali Tizimga Kirmagansiz')
    res.redirect('/register/login');
  },

  //royhatdan o'tmagansz 
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.send('axa');
  },

  // Login skaner qilish
  
};