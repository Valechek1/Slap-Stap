const express = require("express");
const cors = require("cors");
const db = require("./db");
const utils = require("./utils");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/authorisation", (req, res) => {
  const { phone } = req.body;
  // console.log(phone);
  const code = utils.generateRandomCode(phone);
  db.savePhoneCodeToDB(phone, code)
    .then(() => {
      utils.sendSMS(phone, code);
      res.json();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// app.get("/Users", (req, res) => {
//   db.getUsers().then((data) => {
//     console.log(data);
//   });
//   res.json();
// });

app.post("/endAuth", (req, res) => {
  const { phone, code } = req.body;
  console.log("Это телефон=", phone);
  console.log("Это код=", code);
  db.getAuthPair(phone, code)
    .then(() => {
      const token = utils.generateToken();
      db.createOrGetUser(phone, token).then((user) => {
        res.json({
          user,
          token,
        });
      });
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

app.listen(4000, () => {
  console.log("Сервер запущен на 4000");
});
