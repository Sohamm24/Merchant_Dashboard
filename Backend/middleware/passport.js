const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');  
const bcrypt = require('bcrypt');

// Local Strategy for username/password authentication
passport.use('local', new LocalStrategy({
  usernameField: 'email',  // Field name for email in the login form
  passwordField: 'password'  // Field name for password
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });  // Look for user by email
    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });  // User not found
    }

    const isMatch = await bcrypt.compare(password, user.password);  // Compare password
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });  // Password doesn't match
    }

    return done(null, user);  // User authenticated successfully
  } catch (error) {
    return done(error);  // Error handling
  }
}));

// Google Strategy for OAuth login
console.log("Google strategy called")
passport.use('google', new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,  // Google Client ID
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,  // Google Client Secret
  callbackURL: "http://localhost:5000/auth/google-login/callback/google"  // Google OAuth callback URL
}, async (accessToken, refreshToken, profile, done) => {
  console.log("Google strategy called")
  try {
    // Check if the user already exists based on Google ID
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      // If not, create a new user
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value  // Extract email from profile
      });
      await user.save();  // Save new user to the database
    }

    return done(null, user);  // Successfully authenticated user
  } catch (error) {
    return done(error);  // Error handling
  }
}));

// Serialize and Deserialize user for session management
passport.serializeUser((user, done) => {
  done(null, user.id);  // Store user ID in the session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);  // Find user by ID
    done(null, user);  // Pass user object to the next middleware
  } catch (error) {
    done(error, false);  // Error handling if user not found
  }
});

// Export passport configuration
module.exports = passport;
