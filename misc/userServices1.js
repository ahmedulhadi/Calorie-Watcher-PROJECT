const bcrypt = require("bcrypt");
const db = require("./database");

const userServices = {};

// userServices.isUserExist = function(email){
//     return new Promise(function(success, fail){
//         let sql = 'SELECT email FROM users WHERE email=?';
//         db.all(sql, [email], (err, rows) => {
//             if (err !== null) {
//                 fail(Error("Error:" + err.message));
//             }else{
//                 if(rows.length > 0){
//                     fail(Error("User already registered!"));
//                 } else {
//                     success(true);
//                 }
//             }
//         });
//     });
// };

userServices.isUserExist = function (email) {
  let sql = "SELECT email FROM users WHERE email=?";
  result = null;
  db.all(sql, [email], (err, rows) => {
    if (err !== null) {
      console.log(err);
    } else {
      if (rows.length > 0) {
        console.log("user exists.");
        result = true;
        return true;
      } else {
        console.log("User doesn't exists.");
        result = false;
        return false;
      }
    }
  });
};

userServices.checkUser = function (email) {
  return new Promise(function (success, fail) {
    let sql = "SELECT email FROM users WHERE email=?";
    db.all(sql, [email], (err, rows) => {
      if (err !== null) {
        fail(Error("Error:" + err.message));
      } else {
        if (rows.length > 0) {
          fail(Error("User already registered!"));
        } else {
          success(true);
        }
      }
    });
  });
};

userServices.createUser = ({ email, password }) => {
  return new Promise((success, fail) => {
    db.run(
      `INSERT INTO users(email, password) VALUES(?,?)`,
      [email, password],
      function (err) {
        if (err) {
          // console.log(err.message);
          fail(Error(err.message));
        } else {
          // console.log(`A row has been inserted with rowid ${this.lastID}`);
          success(`signed up successfully!`);
        }
      }
    );
  });
};

// userServices.createUser = ({email, password}) => {
//     db.run(`INSERT INTO user(email, password) VALUES(?,?)`, [email, password], function (err) {
//         if (err) {
//             console.log("Error: " + err.message);
//         }
//             // get the last insert id
//             console.log(`A row has been inserted with rowid ${this.lastID}`);
//             //return true;
//     });
// };

userServices.authenticateUser = ({ email, password }) => {
  return false;
};

userServices.validateEmail = (email) => {
  if (email == null || email == "") {
    return false;
  } else {
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return emailRegex.test(email);
  }
};

// userServices.validateEmail = (email) => {
//     return new Promise((success, fail) => {
//         if(email == null || email == ""){
//             fail(`Email can not be empty!`);
//         } else {
//             var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
//             success(emailRegex.test(email));
//         }
//     });
// };

userServices.validatePassword = (password) => {
  if (password == null || password == "") {
    return false;
  } else {
    return password.length >= 4;
  }
};

module.exports = userServices;
