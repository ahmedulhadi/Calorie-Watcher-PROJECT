const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database("./calorie_watcher.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Connected to db");
        }
    }
);

// db.run('DROP TABLE users', [],
// (err) => {
//     if (err) {
//         console.error(err.message);
//     } else {
//         console.log("Table droped");
//     }
// });

// Create table if it doesn't already exist
db.run(
    'CREATE TABLE IF NOT EXISTS Users(email type UNIQUE, password)',
    [],
    (err) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log("Table created");
        }
    }
);

module.exports = db;