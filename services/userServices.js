const db = require("../services/database");

class UserServices {
  constructor(db) {
    this.db = db;
  }
  //check if user already registered
  isUserExists(email) {
    return new Promise(function (resolve, reject) {
      let sql = "SELECT email FROM users WHERE email=?";
      db.all(sql, [email], (err, rows) => {
        if (err) {
          reject(Error("Error:" + err.message));
        }
        if (rows.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }
  //authenticate user
  authenticateUser({ email, password }) {
    return new Promise(function (resolve, reject) {
      let sql = "SELECT email FROM users WHERE email=? AND password=?";
      db.all(sql, [email, password], (err, rows) => {
        if (err) {
          reject(Error("Error:" + err.message));
        }
        if (rows.length > 0) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  //create user
  createUser({ email, password }) {
    return new Promise(function (resolve, reject) {
      let sql = "INSERT INTO users(email, password) VALUES(?,?)";
      db.run(sql, [email, password], (err) => {
        if (err !== null) {
          reject(Error(err.message));
        } else {
          resolve(true);
        }
      });
    });
  }

  //validate email
  validateEmail(email) {
    if (email == null || email == "") {
      return false;
    } else {
      var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      return emailRegex.test(email);
    }
  }
  //validate password
  validatePassword(password) {
    if (password == null || password == "") {
      return false;
    } else {
      return password.length >= 4;
    }
  }
}

module.exports = UserServices;
