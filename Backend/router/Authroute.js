const express = require('express');
const passport = require('passport');
const router = express.Router();
const { login,signin } = require('../controllers/AuthController')
const { loginValidation,signinValidation } = require('../middleware/AuthValidatation')
const { add } =require('../controllers/AddProducts');
const User = require('../models/user');
const Seller= require('../models/sellers');
const merchandise=require('../models/merchandise');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { getRecommendations,getProductDetails}=require('../controllers/RecommendationController')
const secretOrKey=process.env.JWT_SECRET

router.post('/signin',signinValidation,signin)
router.post('/add',add)
router.get('/recommendations', getRecommendations);
router.get('/product/:id', getProductDetails);

router.get('/google-login', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google-login/callback/google', passport.authenticate('google', {
  failureRedirect: '/login',  
  session: true               
}),async (req, res) => {
   const user = req.user;
   const dbUser = await User.findOne({ email: user.email });
   const role1= dbUser.role
   console.log(role1)
  if (role1 === 'Merchants') {
    res.redirect('http://localhost:5173/Merchant');
  } else if (role1 === 'customer') {
    res.redirect('http://localhost:5173/Home');
  } else {
    res.redirect('http://localhost:5173/Management');
  }
});


router.post('/local-login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.log(err)
      return res.status(500).json({ message: 'Authentication error', success: false });
    }
    if (!user) {
      return res.status(401).json({ message: info.message || 'Invalid credentials', success: false });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, username: user.username }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: '1h' } // Token expiration
    );

    res.status(200).json({
      message: 'Logged in successfully',
      success: true,
      token: token, 
      user: { id: user._id, username: user.username ,role: user.role }, 
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: 'Logout error', success: false });
    res.status(200).json({ message: 'Logged out successfully', success: true });
  });
});


router.get('/dashboard', passport.authenticate('jwt', { session: false }),(req, res) => {
    console.log('Profile route accessed, user:', req.user.id);

    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'Token missing', success: false });
    }

    jwt.verify(token, secretOrKey, (err, decoded) => {
      if (err) {
        console.error('Token verification error:', err);
        return res
          .status(403)
          .json({ message: 'Invalid or expired token', success: false });
      }

      const userId = decoded.id;
      console.log('User ID from token:', userId);

      
      Promise.all([Seller.findOne({userId}).populate("Merchandise"), User.findById(userId)])
        .then(([seller, user]) => {
          if (!seller) {
            return res
              .status(404)
              .json({ message: 'Seller not found', success: false });
          }

          // Handle User data
          if (!user) {
            return res
              .status(404)
              .json({ message: 'User not found', success: false });
          }
          console.log('User Name:', user.name);

          // Send response with combined data
          return res.status(200).json({
            message: 'Profile data sent',
            success: true,
            userId: user._id,
            userName: user.name,
            merchandise: seller.Merchandise,
          });
        })
        .catch((err) => {
          console.error('Database query error:', err);
          return res
            .status(500)
            .json({ message: 'Error fetching profile data', success: false });
        });
    });
  }
);


module.exports = router;
