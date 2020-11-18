const db = require("../services/database");

class WatcherServices {
  constructor(db) {
    this.db = db;
  }

  //check if initial data exists
  isUserDetailsExists(email) {
    return new Promise(function (resolve, reject) {
      let sql = "SELECT email FROM personal_details WHERE email=?";
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

  //add personal details
  addPersonalDetails({
    email,
    gender,
    startDate,
    initialWeight,
    initialHeight,
    initialBMI,
  }) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO personal_details(
            email, gender, start_date, initial_weight, initial_height, initial_bmi)
            VALUES(?,?,?,?,?,?)`;
      db.run(
        sql,
        [email, gender, startDate, initialWeight, initialHeight, initialBMI],
        (err) => {
          if (err !== null) {
            reject(Error(err.message));
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  //update personal details
  updatePersonalDetails({
    email,
    gender,
    startDate,
    initialWeight,
    initialHeight,
    initailBMI,
  }) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE personal_details
            SET gender = ?,
                start_date = ?, 
                initial_weight = ?, 
                initial_height = ?,
                initial_bmi = ?
            WHERE email = ?`;
      db.run(
        sql,
        [gender, startDate, initialWeight, initialHeight, initailBMI, email],
        (err) => {
          if (err) {
            console.log(err.message);
            reject(Error(err.message));
          } else {
            resolve(true);
          }
        }
      );
    });
  }

  //delete user details
  deleteUserDetails(email) {
    return new Promise(function (resolve, reject) {
      let sql = `DELETE FROM personal_details WHERE email = ?`;
      db.run(sql, [email], (err) => {
        if (err !== null) {
          reject(Error(err.message));
        } else {
          resolve(true);
        }
      });
    });
  }

  //get personal details
  getUserDetails(email) {
    return new Promise(function (resolve, reject) {
      let sql = `SELECT 
                    email, gender, start_date, initial_weight, initial_height, initial_bmi 
                    FROM personal_details 
                    WHERE email=?`;
      db.all(sql, [email], (err, rows) => {
        if (err) {
          reject(Error("Error:" + err.message));
        }
        if (rows.length > 0) {
          resolve({
            email: rows[0].email,
            gender: rows[0].gender,
            startDate: rows[0].start_date,
            initialWeight: rows[0].initial_weight,
            initialHeight: rows[0].initial_height,
            initialBMI: rows[0].initial_bmi,
          });
        } else {
          reject(Error("Error: No details available."));
        }
      });
    });
  }

  //add weight log
  addWeightLog({ email, date, weight, height, bmi }) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO weight_log(
            email, date, weight, height, bmi)
            VALUES(?,?,?,?,?)`;
      db.run(sql, [email, date, weight, height, bmi], (err) => {
        if (err !== null) {
          reject(Error(err.message));
        } else {
          console.log("Weight Logged.");
          resolve(true);
        }
      });
    });
  }

  //get weight log
  getWeightLogs(email) {
    return new Promise(function (resolve, reject) {
      let weightLogs = [];
      let sql = `SELECT 
                    email, date, weight, height, bmi 
                    FROM weight_log 
                    WHERE email=?
                    ORDER BY rowid DESC`;
      db.all(sql, [email], (err, rows) => {
        if (err) {
          reject(Error("Error:" + err.message));
        }
        rows.forEach((row) => {
          weightLogs.push({
            email: row.email,
            date: row.date,
            weight: row.weight,
            height: row.height,
            bmi: row.bmi,
          });
        });
        resolve(weightLogs);
      });
    });
  }

  //delete weight logs
  //delete user details
  deleteWeightLogs(email) {
    return new Promise(function (resolve, reject) {
      let sql = `DELETE FROM weight_log WHERE email = ?`;
      db.run(sql, [email], (err) => {
        if (err !== null) {
          reject(Error(err.message));
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = WatcherServices;
