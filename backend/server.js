const bodyParser = require("body-parser");
const express = require("express");
const hbs = require("nodemailer-express-handlebars");
var exphbs = require("express-handlebars");

const path = require("path");

const config = require("./config");
const Routes = require("./api/Route");

const { transporter } = require("./helpers/sendEmail");

const { db } = require("./db");

const PORT = config.PORT || 3000;
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.set("db", db);

app.use(express.static("uploads"));
app.use("/images", express.static("uploads"));
app.set("views", path.join(__dirname, "views"));
app.engine(
  "hbs",
  exphbs({
    defaultLayout: "main.hbs",
  })
);
app.set("view engine", "hbs");

const options = {
  viewEngine: {
    partialsDir: __dirname + "/views/partials",
    layoutsDir: __dirname + "/views/layouts",
    extname: ".hbs",
  },
  extName: ".hbs",
  viewPath: "views",
};
transporter.use("compile", hbs(options));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

Routes.init(app);

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`));
