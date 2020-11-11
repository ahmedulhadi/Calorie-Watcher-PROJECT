const bcrypt = require('bcrypt');
const db = require('./database');

const userServices = {};

userServices.isUserExist = function (email) {
    // let sql = 'SELECT email FROM users WHERE email=?';
    // console.log("sql:" + sql);
    // let num = 0;
    // db.all(sql, [email], (err, rows) => {
    //     if (err) {
    //         throw err;
    //     }
    //     rows.forEach((row) => {
    //         console.log(">>>" + row.email);
    //     });
    //     num = rows.length;
    //     console.log("NUM1>>>>>>>>>>>" + num);
    //     return rows.length > 0;
    // });
    // console.log("NUM>>>>>>>>>>>" + num);
};

userServices.createUser = ({email, password}) => {
    db.run(`INSERT INTO user(email, password) VALUES(?,?)`, [email, password], function (err) {
        if (err) {
            console.log("Error: " + err.message);
        }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
            //return true;
    });
};

userServices.authenticateUser = ({email, password}) => {
    return false;
};

userServices.validateEmail = (email) => {
    if(email == null || email == ""){
        return false;
    } else {
        var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegex.test(email);
    }
};

userServices.validatePassword = (password) => {
    if(password == null || password == ""){
        return false;
    } else {
        return password.length >= 4;
    }
};

module.exports = userServices;