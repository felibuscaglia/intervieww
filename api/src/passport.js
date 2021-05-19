const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const BearerStrategy = require("passport-http-bearer").Strategy;
const { User, Topic, Question } = require("./db");
const jwt = require("jsonwebtoken");
const { PASSPORT_SECRET } = process.env;

passport.use(
  new LocalStrategy (
    { usernameField: "email", password: "password", session: false },
    async (email, password, done) => {
      const user = await User.findOne({ 
        where: { email },
        include: { model: Topic }
      });
      if (!user) return done(null, false);
      if (!user.compare(password)) return done(null, false);
      return done(null, { name: user.name, email: user.email, id: user.id, topics: user.topics });
    }
  )
);

passport.use(
  new BearerStrategy ((token, done) => {
    jwt.verify(token, PASSPORT_SECRET, function (err, user) {
      if (err) return done(err);
      return done(null, user ? user : false);
    });
  })
);

module.exports = passport;