const db = require("../services/database");
const UserServices = require("../services/UserServices");

const userServices = new UserServices(db);

let lstTable = `SELECT 
name
FROM 
sqlite_master 
WHERE 
type ='table' AND 
name NOT LIKE 'sqlite_%'`;

console.log(">>>>>>>> Database:  calorie_watcher.db <<<<<<<<<");
db.serialize(() => {
  db.all(lstTable, [], (err, rows) => {
    console.log(">>>>>>>> List of Tables <<<<<<<<<");
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(row.name);
    });
  });

  let sql = "SELECT email, password FROM users";
  db.all(sql, [], (err, rows) => {
    console.log(">>>>>>>> calorie_watcher.db >>>>>> users >>>>>>>>>>>");
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log("Email: " + row.email + " >>> Password: " + row.password);
    });
  });

  let pdsql = `SELECT 
                    email, gender, start_date, initial_weight, initial_height, initial_bmi 
                    FROM personal_details`;
  db.all(pdsql, [], (err, rows) => {
    console.log(
      ">>>>>>>> calorie_watcher.db >>>>>> personal_details >>>>>>>>>>>"
    );
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(
        `${row.email} >> ${row.gender} >> ${row.start_date} >> ${row.initial_weight} >> ${row.initial_height} >> ${row.initial_bmi}`
      );
    });
  });

  let wlsql = `SELECT email, date, weight, height, bmi 
  FROM weight_log`;
  db.all(wlsql, [], (err, rows) => {
    console.log(">>>>>>>> calorie_watcher.db >>>>>> weight_log >>>>>>>>>>>");
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      console.log(
        `${row.email} >> ${row.date} >> ${row.weight} >> ${row.height} >> ${row.bmi}`
      );
    });
  });
});
