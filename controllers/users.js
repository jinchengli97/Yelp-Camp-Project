const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
  res.render("users/register.ejs");
};

module.exports.register = async (req, res, next) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registerdUser = await User.register(user, password);
    // req.login is from passport
    req.login(registerdUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to yelp camp");
      res.redirect("./campgrounds");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("/register");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login");
};

module.exports.login = (req, res) => {
  req.flash("success", "welcome back");
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  // using code 307 will use temporary redirect, which
  // preserve the current method -- post
  // otherwise, it will redirect as a get method
  // res.redirect(307, redirectUrl)
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  // with passport, simply req.logout()
  req.logout();
  req.flash("success", "You have successfully logged out");
  res.redirect("/campgrounds");
};
