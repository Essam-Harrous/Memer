const express = require('express');
const serverless = require('serverless-http');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const jwt = require('express-jwt');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();
const cors = require('cors');

const schema = require('./schema/schema');
// const test = require('./models/test');
console.log(process.env.TOKEN_SECRET_VALUE);
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .catch((err) => console.log(err));
mongoose.connection.once('open', () => console.log('database is connected'));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

app.use(
  jwt({ secret: process.env.TOKEN_SECRET_VALUE, credentialsRequired: false }),
  (err, req, res, next) => {
    if (err.code) return next();
    return next(err);
  }
);

const route = express.Router();
app.use('/.netlify/functions/api', route);

route.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: {
      user: req.user,
    },
  }))
);

route.get('/auth', (req, res) => {
  if (req.user) {
    console.log(req.user);
    res.json(req.user);
  } else res.json({ err: 'you need to logIn or signUp' });
});

module.exports.handler = serverless(app);
