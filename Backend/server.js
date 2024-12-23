const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
require('./models/db');
require('./middleware/passport');
const cors = require('cors');
const Authroute = require('./router/Authroute');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Use cookie parser for handling cookies
app.use(cookieParser());

// Body parser and JSON parsing
app.use(bodyParser.json());
app.use(express.json());

// CORS setup for frontend communication
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Session middleware (Ensure it's before passport initialization)
app.use(session({
    secret: 'secret',  // Secret key to encrypt session data
    resave: true,      // Forces session to be saved back to the session store
    saveUninitialized: true,  // Save session even if not modified
    cookie: { secure: false }  // Set to true in production with HTTPS
}));

// Passport initialization (use after session)
app.use(passport.initialize());
app.use(passport.session());

// Routes for authentication
app.use('/auth', Authroute);

// Default route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Log the registered strategies to ensure Passport is correctly set up
console.log('Registered strategies:', passport._strategies);
