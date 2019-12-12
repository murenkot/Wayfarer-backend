const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

const routes = require('./routes');

// --------------------------------- Middleware --------------------------------- //

// CORS - Cross Origi Resource Sharing
const corsOptions = {
  origin: [`http://localhost:3000`],
  credentials: true, // allows the session cookie to be sent back and forth from server to client
  optionsSuccessStatus: 200 // some legacy browsers choke on satus 204
};

app.use(cors(corsOptions));

// BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Express Session - Authentication

app.use(session({
  // Store session in DB
  store: new MongoStore({ url: process.env.MONGO_URI }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false, // Only create session if a propery has been added to session,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2,  // Expire at 2 weeks
  }
}));

// ----------------------------------- Routes ----------------------------------- //

app.get('/', (req, res) => {
  res.send('<h1>Wayfarer</h1>');
});

app.use('/api/v1/auth', routes.auth);
app.use('/api/v1/users', routes.users);
app.use('/api/v1/posts', routes.posts);
app.use('/api/v1/cities', routes.cities);
app.use('/api/v1/comments', routes.comments);

app.listen(PORT, () => console.log(`Server connected at http://localhost:${PORT}`));