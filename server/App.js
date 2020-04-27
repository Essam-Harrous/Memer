const express = require('express');
const mongoose = require('mongoose');
const graphqlHTTP = require('express-graphql');
const jwt = require('express-jwt');

const schema = require('./schema/schema');
const test = require('./models/test');
const SECRET_TOKEN = require('./config');

const app = express();
app.use(express.json());

mongoose
  .connect(
    'mongodb+srv://essam:1234@test1-jvuqg.mongodb.net/test?retryWrites=true&w=majority',
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .catch((err) => console.log(err));
mongoose.connection.once('open', () => console.log('database is connected'));

app.use(
  jwt({ secret: SECRET_TOKEN, credentialsRequired: false }),
  (err, req, res, next) => {
    if (err.code) return next();
    return next(err);
  }
);

app.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    graphiql: true,
    context: {
      user: req.user,
    },
  }))
);
test();
app.listen(8080, () => console.log('server is listening on port 8080'));
