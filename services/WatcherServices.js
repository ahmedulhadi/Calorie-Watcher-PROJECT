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
  addUserDetails({
    email,
    gender,
    startDate,
    initialWeight,
    initialHeight,
    initialBMI,
    bmiClass,
  }) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO personal_details(
            email, gender, start_date, initial_weight, initial_height, initial_bmi, bmi_class)
            VALUES(?,?,?,?,?,?,?)`;
      db.run(
        sql,
        [
          email,
          gender,
          startDate,
          initialWeight,
          initialHeight,
          initialBMI,
          bmiClass,
        ],
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
  updateUserDetails({
    email,
    gender,
    startDate,
    initialWeight,
    initialHeight,
    initailBMI,
    bmiClass,
  }) {
    return new Promise((resolve, reject) => {
      let sql = `UPDATE personal_details
            SET gender = ?,
                start_date = ?, 
                initial_weight = ?, 
                initial_height = ?,
                initial_bmi = ?,
                bmi_class = ?
            WHERE email = ?`;
      db.run(
        sql,
        [
          gender,
          startDate,
          initialWeight,
          initialHeight,
          initailBMI,
          bmiClass,
          email,
        ],
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
                    email, gender, start_date, initial_weight, initial_height, initial_bmi, bmi_class 
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
            bmiClass: rows[0].bmi_class,
          });
        } else {
          reject(Error("Error: No details available."));
        }
      });
    });
  }

  //add weight log
  addWeightLog({ email, date, weight, height, bmi, bmiClass }) {
    return new Promise((resolve, reject) => {
      let sql = `INSERT INTO weight_log(
            email, date, weight, height, bmi, bmi_class)
            VALUES(?,?,?,?,?,?)`;
      db.run(sql, [email, date, weight, height, bmi, bmiClass], (err) => {
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
                    email, date, weight, height, bmi, bmi_class 
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
            bmiClass: row.bmi_class,
          });
        });
        resolve(weightLogs);
      });
    });
  }

  //get last weight log
  getLastWeightLogs(email) {
    return new Promise(function (resolve, reject) {
      let sql = `SELECT 
                    email, date, weight, height, bmi, bmi_class 
                    FROM weight_log 
                    WHERE email=?
                    ORDER BY rowid DESC`;
      db.all(sql, [email], (err, rows) => {
        if (err) {
          reject(Error("Error:" + err.message));
        }
        resolve({
          email: rows[0].email,
          date: rows[0].date,
          weight: rows[0].weight,
          height: rows[0].height,
          bmi: rows[0].bmi,
          bmiClass: rows[0].bmi_class,
        });
      });
    });
  }

  getMaxWeightByEmail(email) {
    return new Promise(function (resolve, reject) {
      let sql = `SELECT MAX(weight) max_wt FROM weight_log WHERE email=?`;
      db.all(sql, [email], (err, rows) => {
        if (err) {
          reject(Error("Error:" + err.message));
        }
        resolve(rows[0].max_wt);
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

  deleteLastWeightLog(email) {
    return new Promise(function (resolve, reject) {
      let sql = `DELETE FROM weight_log WHERE email=? AND rowid=(SELECT MAX(rowid) FROM weight_log WHERE email=?)`;
      db.run(sql, [email, email], (err) => {
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
