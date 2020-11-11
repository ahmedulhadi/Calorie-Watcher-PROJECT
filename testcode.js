const db = require('./services/database');
let sql = 'SELECT email FROM users';
db.all(sql, [], (err, rows) => {
    if (err) {
        throw err;
    }
    rows.forEach((row) => {
        console.log(">>>" + row.email);
    });
});