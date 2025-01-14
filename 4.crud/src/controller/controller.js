const { Sequelize, QueryTypes, Model, where } = require("sequelize");
const config = require("../../config/config.json");
const bcrypt = require("bcrypt");
const { Heroes, typeHero, User } = require("../../models");
const users = require("../../models/user");
const { request } = require("http");
var fs = require("fs");
const path = require("path");

const saltRounds = 10;

async function renderHome(req, res) {
  const { users } = req.session;

  const herolist = await Heroes.findAll({
    include: {
      model: User,
      as: "user",
    },
    include: {
      model: typeHero,
      as: "typehero",
    },
    order: [["createdAt", "DESC"]],
  });

  res.render("index", { herolist: herolist, users });
}

async function authRegister(req, res) {
  const { username, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  if (!username) {
    req.flash("error", "Username Tidak Boleh Kosong");
    return res.redirect("/register");
  }
  if (!email) {
    req.flash("error", "Email Tidak Boleh Kosong");
    return res.redirect("/register");
  }

  if (!password) {
    req.flash("error", "Password Tidak Boleh Kosong");
    return res.redirect("/register");
  }
  if (password.length < 6 || password.length > 12) {
    req.flash(
      "error",
      "Password Harus Memiliki Minimal 6 Character dan Maksimal 12 Character"
    );
    return res.redirect("/register");
  }

  const mail = await User.findOne({
    where: {
      email,
    },
  });

  if (mail) {
    req.flash("error", "Email Sudah Terdaftar Silakan Masukan Email Yang Baru");
    return res.redirect("/register");
  }

  await User.create({
    username,
    email,
    password: hashedPassword,
  });

  req.flash("success", "Register Success");
  res.redirect("/login");
}

async function authLogin(req, res) {
  const { email, password } = req.body;

  if (!email) {
    req.flash("error", "Email Tidak Boleh Kosong");
    return res.redirect("/login");
  }
  if (!password) {
    req.flash("error", "Password Tidak Boleh Kosong");
    return res.redirect("/login");
  }

  const users = await User.findOne({
    where: {
      email: email,
    },
  });

  if (!users) {
    req.flash("error", "Email Yang Anda Masukkan Tidak Terdaftar");
    return res.redirect("/login");
  }

  const isValidate = await bcrypt.compare(password, users.password);

  if (!isValidate) {
    req.flash("error", "Password Yang Anda Masukkan Salah, Coba lagi");
    return res.redirect("/login");
  }

  let loginSession = users.toJSON();

  delete loginSession.password;

  req.session.users = loginSession;

  req.flash("success", `Login Success, Hai ${loginSession.username}`);
  res.redirect("/");
}

function renderLogin(req, res) {
  const users = req.session.users;

  if (users) {
    res.redirect("/");
  } else {
    res.render("auth-Login");
  }
}

function renderRegister(req, res) {
  res.render("auth-Register");
}

async function renderAddHero(req, res) {
  const { users } = req.session;

  const hero = await typeHero.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (!users) {
    req.flash("error", "Bukan Hak Anda");
    return res.redirect("/");
  }

  res.render("addHero", { users, hero: hero });
}

async function addtypehero(req, res) {
  const { typeHer } = req.body;

  await typeHero.create({
    typehero: typeHer,
  });

  req.flash("success", "success add Type Hero");
  res.redirect("/");
}

async function addhero(req, res) {
  const { users } = req.session;
  const { title, description, typeHer } = req.body;

  const image = "http://localhost:3000/uploads/" + req.file.filename;

  const id_User = users.id;

  await Heroes.create({
    title: title,
    description: description,
    image: image,
    user_id: id_User,
    type_id: typeHer,
  });

  req.flash("success", "Success add Hero");
  res.redirect("/");
}

function renderAddtypeHero(req, res) {
  const { users } = req.session;

  if (!users) {
    req.flash("error", "Bukan Hak Anda");
    return res.redirect("/");
  }

  res.render("addTypeHero", { users });
}

async function renderdetailHero(req, res) {
  const { users } = req.session;
  const { id } = req.params;

  const data = await Heroes.findAll({
    include: {
      model: typeHero,
      as: "typehero",
    },
    where: {
      id: id,
    },
  });

  const hero = await typeHero.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (!data[0]) {
    req.flash("error", "TypeHero Tidak ada");
    return res.redirect("/");
  }

  res.render("detailHero", { data: data[0], users, hero });
}

async function renderDetailTypeHero(req, res) {
  const { users } = req.session;

  const hero = await typeHero.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (!users) {
    req.flash("error", "Bukan Hak Anda");
    return res.redirect("/");
  }

  res.render("detailtypeHero", { users, hero });
}

async function rendereditTypeHero(req, res) {
  const { users } = req.session;
  const { id } = req.params;

  const data = await typeHero.findOne({
    where: {
      id: id,
    },
  });

  if (!users) {
    req.flash("error", "Bukan Hak Anda");
    return res.redirect("/");
  }

  res.render("editTypeHero", { data: data, users });
}

async function updatetypeHero(req, res) {
  const { id } = req.params;
  const { typeHer } = req.body;

  const typeup = await typeHero.update(
    {
      typehero: typeHer,
    },
    {
      where: {
        id: id,
      },
    }
  );

  console.log(typeup);

  req.flash("success", "Success Edit Type");
  res.redirect("/");
}

async function rendereditHero(req, res) {
  const { users } = req.session;
  const { id } = req.params;

  const data = await Heroes.findAll({
    include: {
      model: typeHero,
      as: "typehero",
    },
    where: {
      id: id,
    },
  });

  const hero = await typeHero.findAll({
    order: [["createdAt", "DESC"]],
  });

  if (!data[0]) {
    req.flash("error", "TypeHero Tidak ada");
    return res.redirect("/");
  }

  if (!users) {
    req.flash("error", "Bukan Hak Anda");
    return res.redirect("/");
  }

  res.render("editHero", { data: data[0], users, hero });
}

async function updateHero(req, res) {
  const { id } = req.params;
  const { title, description, typeHer } = req.body;

  const imageuplode = await Heroes.findOne({
    where: {
      id: id,
    },
  });

  let imageGet = imageuplode.image;
  let imageRep = imageGet.replace("http://localhost:3000/uploads/", "");

  let upImage;

  if (req.file) {
    upImage = "http://localhost:3000/uploads/" + req.file.filename;
    const fullPath = path.join(__dirname, "../uploads/", imageRep);
    fs.unlink(fullPath, (err) => {});
  } else {
    upImage = imageGet;
  }

  await Heroes.update(
    {
      title: title,
      description: description,
      image: upImage,
      type_id: typeHer,
    },
    {
      where: {
        id: id,
      },
    }
  );
  req.flash("success", "Success Edit Hero");
  res.redirect("/");
}

async function deletHero(req, res) {
  const { id } = req.params;

  await Heroes.destroy({
    where: {
      id: id,
    },
  });

  res.redirect("/");
}

async function delettypehero(req, res) {
  const { id } = req.params;

  await typeHero.destroy({
    where: {
      id: id,
    },
  });
  res.redirect("/detailtypeHero");
}

function authLogout(req, res) {
  req.session.users = null;

  res.redirect("/login");
}

module.exports = {
  renderHome,
  authRegister,
  authLogin,
  renderLogin,
  renderRegister,
  addhero,
  renderAddHero,
  renderAddtypeHero,
  addtypehero,
  renderdetailHero,
  authLogout,
  rendereditHero,
  updateHero,
  updatetypeHero,
  rendereditTypeHero,
  renderDetailTypeHero,
  deletHero,
  delettypehero,
};
