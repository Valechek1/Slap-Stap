const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const generateRandomCode = () => {
  return 12345;
};

const generateToken = () => {
  return uuid.v4();
};
const sendSMS = (phone, code) => {
  console.log(phone, code);
};

app.post("/authorisation", (req, res) => {
  const { phone } = req.body;
  const code = generateRandomCode();
  db.savePhoneCodeToDB(phone, code)
    .then(() => {
      sendSMS(phone, code);
      res.json();
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

app.post("/endAuth", (req, res) => {
  const { phone, code } = req.body;
  console.log("Это телефон=", phone);
  console.log("Это код=", code);
  db.getAuthPair(phone, code)
    .then(() => {
      const token = generateToken();
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

const getAuthorizedUser = async (req) => {
  const token = req.get('Authorization');

  if (!token) {
    res.status(401).json()
    return
  };

  const user = await db.getUserByToken(token);
  return user;
};

app.post("/steps", (req,res)=>{
  const { steps, timestamp } = req.body;

  getAuthorizedUser(req).then((user) => {
    return db.storeStepsForUser(user.id, steps,timestamp)
  }).then(()=>{
    res.json();
  }).catch((err) => res.status(401).json(err));
});

app.listen(4000, () => {
  console.log("Сервер запущен на 4000");
});
