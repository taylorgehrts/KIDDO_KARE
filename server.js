const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection'); // Import sequelize connection
const session = require("express-session")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const app = express();
const PORT = process.env.PORT || 3001;

const seedAll = require('./seeds/seeds.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);


const sess = {
    secret: process.env.secret,
    cookie: {
      maxAge: 86400000
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    })
};
app.use(session(sess));
// Sync sequelize models to the database, then turn on the server 
//TURN OFF force true for deployment
sequelize.sync({ force: true }).then(() => {
  // Seed data
  seedAll();
  // The `force: false` option ensures that existing data in the tables won't be dropped.
  // Set `force: true` to drop existing data and re-create the tables.
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});