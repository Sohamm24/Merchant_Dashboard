const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
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
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));

// Session middleware (Ensure it's before passport initialization)
app.use(session({
    secret: 'secret',  // Secret key to encrypt session data
    resave: false,      // Forces session to be saved back to the session store
    saveUninitialized: false,  // Save session even if not modified
    store: MongoStore.create({
        mongoUrl:process.env.MONGO_URI, // Replace with your MongoDB connection string
        collectionName: 'sessions' // Optional: specify a custom collection name for session storage
      }),
    cookie: { 
        secure: false,
        maxAge:24 * 60 * 60 * 1000 
     } 
}));

// Passport initialization (use after session)
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    if (req.session) {
        console.log(`Session ID: ${req.sessionID}`);
        if (!req.session.isActive) {
            req.session.isActive = true;
            console.log('Session created:', req.sessionID);
        } else {
            console.log('Session accessed:', req.sessionID);
        }
    }
    next();
});

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
