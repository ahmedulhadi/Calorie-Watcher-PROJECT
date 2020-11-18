const sqlite3 = require("sqlite3").verbose();

const dbName = "./calorie_watcher.db";

let db = new sqlite3.Database(
  dbName,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Connected to DB`);
    }
  }
);

db.serialize(() => {
  // db.run("DROP TABLE users", [], (err) => {
  //   if (err) {
  //     console.error(err.message);
  //   } else {
  //     console.log("Table droped");
  //   }
  // });

  //Create users table if it doesn't already exist
  db.run(
    `CREATE TABLE IF NOT EXISTS users(
      email TEXT NOT NULL PRIMARY KEY, 
      password TEXT)`,
    [],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("users table created.");
      }
    }
  );

  //Create personal_details table if it doesn't already exist
  db.run(
    `CREATE TABLE IF NOT EXISTS personal_details(
    email TEXT NOT NULL PRIMARY KEY, 
    gender TEXT,
    start_date TEXT,
    initial_weight REAL,
    initial_height REAL,
    initial_bmi REAL
    )`,
    [],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("personal_details table created.");
      }
    }
  );

  //create weight_log table if it doesn't already exist
  db.run(
    `CREATE TABLE IF NOT EXISTS weight_log(
    email TEXT,
    date TEXT,
    weight REAL,
    height REAL,
    bmi REAL)`,
    [],
    (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log("weight_log table created.");
      }
    }
  );
});

module.exports = db;
