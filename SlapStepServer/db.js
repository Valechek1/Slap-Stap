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

const getUserByToken = (token) => {
  return new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM Token where token = ?`,
      [token],
      (err, data) => {
        if (err) {
          return reject(err);
        }
        if (data.length === 0) {
          return reject(new Error("Unauthorized"));
        }
        connection.query(
          "SELECT * FROM Users WHERE id = ?",
          [data[0].id_user],
          (err, users) => {
            if (err) {
              return reject(err);
            }
            if (users.length === 0) {
              return reject(new Error("Unauthorized"));
            }
            resolve(users[0]);
          }
        );
      }
    );
  });
};
const storeStepsForUser = (userId, steps, timestamp) => {
  return new Promise((resolve, reject) => {
    connection.query(
      "SELECT * FROM Steps WHERE id_user = ? AND date_stamp = ?",
      [userId, timestamp],
      (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        if (data.length === 0) {
          // записей для данного юзера в данный день не было
          connection.query(
            `INSERT INTO Steps (id_user, steps, date_stamp) VALUES (?, ?, ?);`,
            [userId, steps, timestamp],
            (err) => {
              if (err) {
                reject(err);
                return;
              }
              return resolve();
            }
          );
        } else {
          // записей для данного юзера в данный день были и надо обновит
          connection.query(
            "UPDATE Steps SET steps = ? WHERE id = ?;",
            [steps, data[0].id],
            (err) => {
              if (err) {
                reject(err);
                return;
              }
              return resolve();
            }
          );
        }
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

const getTopSteps = (amount) =>{
  return new Promise ((resolve,reject)=>{
    connection.query(`
      SELECT * from Steps
      WHERE date_stamp = CURRENT_DATE()
      ORDER BY steps DESC
      LIMIT ?
    `, [amount],(err,data) => {
      if(err){
        reject (err);
        return
      }
      resolve(data)
    });
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
  getUserByToken,
  getTopSteps,
  storeStepsForUser,
};
