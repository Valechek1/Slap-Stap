const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "root",
  database: "SlapStep",
});

connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log("Подключено....");
});

const savePhoneCodeToDB = (phone, code) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `INSERT INTO Authorization (phone, code) VALUES (?, ?);`,
      [phone, code],
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(data);
      }
    );
  });
};

const getAuthPair = (phone, code) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Authorization WHERE phone = ? AND code = ?`,
      [phone, code],
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        if (data.length > 0) {
          resolve();
        } else {
          reject(new Error("Wrong code"));
        }
      }
    );
  });
};

const createUserTokenPair = (userId, token) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `
      DELETE FROM Token WHERE id_user = ?
    `,
      [userId],
      (err) => {
        if (err) {
          return reject(err);
        }
        connection.query(
          `INSERT INTO Token (id_user, token) VALUES (?, ?)`,
          [userId, token],
          (err) => {
            if (err) {
              return reject(err);
            }

            return resolve();
          }
        );
      }
    );
  });
};

const createOrGetUser = (phone, token) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Users WHERE phone = ?",
      [phone],
      (err, data) => {
        if (err) {
          return reject(err);
        }

        if (data.length > 0) {
          createUserTokenPair(data[0].id, token)
            .then(() => {
              resolve(data[0]);
            })
            .catch((err) => {
              reject(err);
            });
          return;
        }

        connection.query(
          `INSERT INTO Users (phone) VALUES (?);`,
          [phone],
          (err, data) => {
            if (err) {
              reject(err);
              return;
            }

            connection.query(
              "SELECT * FROM Users WHERE id = ?",
              [data.insertId],
              (err, users) => {
                if (err) {
                  return reject(err);
                }

                createUserTokenPair(users[0].id, token)
                  .then(() => {
                    resolve(users[0]);
                  })
                  .catch((err) => {
                    reject(err);
                  });
              }
            );
          }
        );
      }
    );
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    connection.query("SELECT * FROM Users", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(data);
    });
  });
};

module.exports = {
  savePhoneCodeToDB,
  createOrGetUser,
  getUsers,
  getAuthPair,
};
