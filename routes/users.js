const passport = require("passport");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");

const {
  SignUpValidation,
  LogInValidation
} = require("../helpers/authValidation");

module.exports = router => {
  //@route POST /api/signup
  //@desc Signs up the user
  //@access Public
  router.post(
    "/api/signup",
    SignUpValidation,
    async (req, res, next) => {
      // Error from validation
      let errors = {};
      req._validationErrors.forEach(error => {
        errors[error.param] = error.msg;
      });
      if (Object.keys(errors).length !== 0) {
        return res.status(400).send(errors);
      }
      const { email } = req.body;
      try {
        const user = await User.findOne({ email });
        console.log("Route just below Login In validation is called");
        if (user) {
          return res.status(400).send({ email: "Email already exist" });
        }
        next();
      } catch (err) {
        console.log(err);
        res.status(401).send(err);
      }
    },
    passport.authenticate("local.signup"),
    (req, res) => {
      console.log("Sign up portion is finished");
      res.status(200).send();
    }
  );

  //@route POST /api/login
  //@desc Logs in the user
  //@access Public
  router.post(
    "/api/login",
    LogInValidation,
    async (req, res, next) => {
      // Error from validation
      let errors = {};
      req._validationErrors.forEach(error => {
        errors[error.param] = error.msg;
      });
      if (Object.keys(errors).length !== 0) {
        return res.status(400).send(errors);
      }

      const { email, password } = req.body;

      try {
        const user = await User.findOne({ email });
        console.log("Route just below Login In validation is called");
        if (!user) {
          return res
            .status(400)
            .send({ email: "The user with provided email does not exist" });
        }
        if (!user.comparePassword(password)) {
          return res.status(400).send({ password: "Invalid password" });
        }
        if (user && user.comparePassword(password)) {
          next();
        }
      } catch (err) {
        res.status(401).send(err);
      }
    },
    passport.authenticate("local.login"),
    (req, res) => {
      res.status(200).send({ msg: "login successful" });
    }
  );

  //@route GET api/auth/facebook
  //@desc Facebook O Auth
  //@access Public
  router.get(
    "/api/auth/facebook",
    passport.authenticate("facebook", {
      prompt: "select_account",
      scope: "email"
    })
  );
  //@route GET api/auth/facebook/callback
  //@desc Facebook O Auth
  //@access Public
  router.get(
    "/api/auth/facebook/callback",
    passport.authenticate("facebook", { session: true }),
    (req, res) => {
      console.log("Facebook callback route is called");
      res.redirect("/home");
    }
  );

  router.get(
    "/api/auth/google",
    passport.authenticate("google", {
      prompt: "select_account",
      scope: [
        "https://www.googleapis.com/auth/plus.login",
        "https://www.googleapis.com/auth/plus.profile.emails.read"
      ]
    })
  );

  router.get(
    "/api/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log("Google callback route is called");
      res.redirect("/home");
    }
  );

  router.get("/api/get-user", async (req, res) => {
    if (req.user) {
      try {
        const user = await User.findOne({
          username: req.user.username
        })
          .populate("requests.userId")
          .populate("friendsList.friendId");
        return res.status(200).send(user);
      } catch (err) {
        console.log(err);
        return res.status(400).send({ message: "Some error occured" });
      }
    }
    return res.status(401).send({ message: "The user does not exist" });
  });

  router.get("/api/logout", (req, res) => {
    req.logOut();
    console.log("Log out is caleld");
    res.status(200).send({ msg: "Successfully logout" });
  });

  router.get("/api/keys", (req, res) => {
    res.status(200).send(keys);
  });
};
