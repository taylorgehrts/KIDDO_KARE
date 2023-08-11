const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection'); // Import sequelize connection
const session = require("express-session")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');
const helpers = require('./utils/helpers');
//initialize express
const app = express();
const PORT = process.env.PORT || 3001;
//seed all data
const seedAll = require('./seeds/seeds.js');
//middlewares for decoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//serve static public files
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// set up sessions
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

//use sessions
app.use(session(sess));
//create helpers
const hbs = exphbs.create({ helpers });
// set the rendering engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');


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