const express = require("express");
const hbs = require("hbs");
const path = require("path");
var flash = require("express-flash");
var session = require("express-session");
var methodOverride = require("method-override");
const upload = require("./src/middlewares/upload-file");
require("dotenv").config();

const app = express();
const PORT = 3000;

const {
  renderHome,
  renderLogin,
  renderRegister,
  authRegister,
  renderAddHero,
  renderdetailHero,
  renderAddtypeHero,
  authLogin,
  addtypehero,
  authLogout,
  addhero,
  rendereditHero,
  rendereditTypeHero,
  updateHero,
  renderDetailTypeHero,
  updatetypeHero,
  deletHero,
  delettypehero,
} = require("./src/controller/controller");

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/views"));

app.use(
  session({
    name: "my-session",
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use("/assets", express.static(path.join(__dirname, "./src/assets")));
app.use("/uploads", express.static(path.join(__dirname, "/src/uploads")));
hbs.registerPartials(__dirname + "/src/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a == b;
});

app.post("/login", authLogin);
app.post("/register", authRegister);
app.post("/addtypehero", addtypehero);
app.post("/addhero", upload.single("image"), addhero);
app.get("/Logout", authLogout);
app.get("/", renderHome);
app.get("/login", renderLogin);
app.get("/register", renderRegister);
app.get("/addhero", renderAddHero);
app.get("/addtypehero", renderAddtypeHero);
app.get("/detailtypeHero", renderDetailTypeHero);
app.get("/edithero/:id", rendereditHero);
app.get("/edittypehero/:id", rendereditTypeHero);
app.patch("/updatetypehero/:id", updatetypeHero);
app.patch("/updatehero/:id", upload.single("image"), updateHero);
app.get("/detailhero/:id", renderdetailHero);
app.delete("/deletehero/:id", deletHero);
app.delete("/deletetypehero/:id", delettypehero);

app.listen(PORT, () => {
  console.log(`Server Berjalan di Port : ${PORT}`);
  console.log(process.env.NODE_ENV);
});
