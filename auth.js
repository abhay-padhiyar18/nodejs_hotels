const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./models/Person"); // Import the Person model

passport.use(
  new localStrategy(async (username, password, done) => {
    //authentication logic

    try {
      //   console.log("Received credentials:", { USERNAME, PASSWORD });
      const user = await Person.findOne({ username });
    if (!user)
            return done(null, false, { message: 'Incorrect username.' });
        
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch)
            return done(null, user);
        else
            return done(null, false, { message: 'Incorrect password.' })
    } catch (error) {
        return done(error);
    }
}));

module.exports = passport;
