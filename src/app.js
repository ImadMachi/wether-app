const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./../utils/geocode");
const forecast = require("./../utils/forecast");

const app = express();

const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "..", "public");
const viewsPath = path.join(__dirname, "..", "templates", "views");
const partialsPath = path.join(__dirname, "..", "templates", "partials");

// Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(path.join(publicDirectoryPath)));

app.get("", (req, res) => {
  res.render("index", {
    title: "WEATHER",
    name: "Imad Machi",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "ABOUT",
    name: "Imad Machi",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    name: "Imad Machi",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.json({ error: "You must provide an address" });
  }
  geocode(
    req.query.address,
    (error, { longitude, latitude, location } = {}) => {
      if (error) {
        return res.json({ error });
      }
      forecast(longitude, latitude, (error, forecastData) => {
        if (error) {
          return res.json({ error });
        }
        res.json({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errormsg: "HELP ARTICLE NOT FOUND",
    name: "Imad Machi",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errormsg: "PAGE NOT FOUND",
    name: "Imad Machi",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
