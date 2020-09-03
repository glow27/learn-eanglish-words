const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const hbs = require('hbs');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/db');

dotenv.config({ path: './config/config.env' });
require('./config/passport')(passport);

connectDB();

const app = express();

app.use(morgan('dev'));

app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, '/views/partials'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: 'whatever you want',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/search', require('./routes/search'));
app.use('/sound', require('./routes/sound'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`port ${PORT}`));
