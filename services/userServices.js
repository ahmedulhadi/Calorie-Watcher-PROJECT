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
  createUser({ fname, lname, email, password }) {
    return new Promise(function (resolve, reject) {
      let sql =
        "INSERT INTO users(fname, lname, email, password) VALUES(?,?,?,?)";
      db.run(sql, [fname, lname, email, password], (err) => {
        if (err !== null) {
          reject(Error(err.message));
        } else {
          resolve(true);
        }
      });
    });
  }

  //get username by email
  getUserNameByEmail(email) {
    return new Promise(function (resolve, reject) {
      let sql = "SELECT fname, lname FROM users WHERE email=?";
      db.all(sql, [email], (err, rows) => {
        if (err) {
          reject(Error("Error:" + err.message));
        }
        resolve({ fname: rows[0].fname, lname: rows[0].lname });
      });
    });
  }

  //validate email
  validateEmail(email) {
    if (email == null || email == "") {
      return false;
    } else {
      var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return emailRegex.test(String(email).toLowerCase());
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
