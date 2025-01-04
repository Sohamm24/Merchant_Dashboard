const express = require('express');
const passport = require('passport');
const router = express.Router();
const { login,signin } = require('../controllers/AuthController')
const { loginValidation,signinValidation } = require('../middleware/AuthValidatation')
const { add } =require('../controllers/AddProducts')
const { getRecommendations, getProductDetails } = require('../controllers/RecommendationController');

router.post('/signin',signinValidation,signin)
router.post('/add',add)
router.get('/recommendations', getRecommendations);
router.get('/product/:id', getProductDetails);

router.get('/google-login', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google-login/callback/google', passport.authenticate('google', {
  failureRedirect: '/login',  
  session: true               
}), (req, res) => {
  res.redirect('http://localhost:5173/dashboard');
});


router.post('/local-login', (req, res, next) => {
  console.log('Request body:', req.body);
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Authentication error', success: false });
    }
    if (!user) {
      return res.status(401).json({ message: info.message, success: false });
    }
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Login error', success: false });
      }
      res.status(200).json({ message: 'Logged in successfully', success: true, user });
    });
  })(req, res, next);
});


router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout error', success: false });
    res.status(200).json({ message: 'Logged out successfully', success: true });
  });
});

module.exports = router;