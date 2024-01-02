const express = require('express');
const app = express();
const port = 3000;

const expressLayouts = require("express-ejs-layouts");
const route = require('./routers/routers');
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");

const knex = require("knex")(require("./knexfile").development);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "Event-s",
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("layout", "./layout/master");
app.use(express.static(path.join(__dirname, "public")));

app.use(route);

// Mulai server pada port yang ditentukan
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});