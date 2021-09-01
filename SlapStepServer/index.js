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
  const formattedPhone = utils.reformatPhone(phone);

  // console.log(phone);
  const code = utils.generateRandomCode(formattedPhone);
  db.savePhoneCodeToDB(formattedPhone, code)
    .then(() => {
      utils.sendSMS(formattedPhone, code);
      res.json();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.get("/steps/top", (req, res) => {
  getAuthorizedUser(req)
    .then((user) => {
      const amount = parseInt(req.query.amount || 10);
      db.getTopSteps(amount)
        .then((data) => {
          res.json(data);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json(err);
        });
    })
    .catch((err) => res.status(401).json(err));
});

app.post("/endAuth", (req, res) => {
  const { phone, code } = req.body;
  const formattedPhone = utils.reformatPhone(phone);

  console.log("Это телефон=", formattedPhone);
  console.log("Это код=", code);
  db.getAuthPair(formattedPhone, code)
    .then(() => {
      const token = utils.generateToken();
      db.createOrGetUser(formattedPhone, token).then((user) => {
        res.json({
          user,
          token,
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(401).json(err);
    });
});

const getAuthorizedUser = async (req) => {
  const token = req.get("Authorization");

  if (!token) {
    res.status(401).json();
    throw new Error("Unauthorized");
  }

  const user = await db.getUserByToken(token);
  return user;
};

app.post("/steps", (req, res) => {
  const { steps, timestamp } = req.body;

  getAuthorizedUser(req)
    .then((user) => {
      return db.storeStepsForUser(user.id, steps, timestamp);
    })
    .then(() => {
      res.json();
    })
    .catch((err) => res.status(401).json(err));
});

app.listen(4000, () => {
  console.log("Сервер запущен на 4000");
});
