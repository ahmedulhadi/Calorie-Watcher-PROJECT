const express = require('express')
const bodyParser = require('body-parser');
const session = require('express-session');

//custom modules
const userServices = require('./services/userServices');
const db = require('./services/database');
const { authenticateUser } = require('./services/userServices')

const app = express();
const port = process.env.PORT || 80;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//session
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//set static contents
app.use(express.static('static'));

//set up views and pug
app.set('views', './views');
app.set('view engine', 'pug');

//routing
app.get('/', (req, res) => {
    if(req.session.loggedin) {
        res.render('index');
    }else {
        res.render('login'); 
//=======
// function bmi(weight, het) {
//     bmiResult = "";
//     document.getElementById("bmi").innerHTML = "";
//     weight = document.getElementById("weight").value;
//     height =  document.getElementById("height").value;
//     console.log(weight, height)
//     let bmi = 703*(weight / (height*height));
//     console.log("Your BMI is"+ bmi)
//     if(bmi < 18.5){
//         bmiResult= "Luckly, You are Underweight";
//     }else if (bmi < 25){
//         bmiResult = "Congrats, Your weight is Normal Now";
//     }else if (bmi < 30){
//         bmiResult = "Oops, You are already Overweight";
//     }else{
//         bmiResult = "Health Alert. It looks like you are already overweight. It is ok, We can fix that :)";
// >>>>>>> 34a15ef4f841a9c08d847fe5f8d53f6b1e7ba218
     }
});

app.get('/login', (req,res) => {
    res.render('login');
});

app.get('/signup', (req,res) => {
    res.render('signup');
});


app.post('/signup',(req, res) => {
    //response message
    let msg = "";
    const {email, psw, psw_repeat} = req.body;
    if(userServices.validateEmail(email)){
        if(userServices.validatePassword(psw)){
            if(psw != psw_repeat){
                msg = "Error: Passwords do not match!";
            }
        } else {
            msg = "Error: Password length must be greater than 4 characters!"
        }            
    } else {
        msg = "Enter Correct email!";
    }
    if(msg == ""){
        db.run('INSERT INTO users(email, password) VALUES(?,?)', [email, psw], function (er) {
            if (er) {
                console.log("Error :" + er.message);
                msg = "Error :" + er.message;
                res.render('signup', {msg});
            }
                // get the last insert id
                console.log(`A row has been inserted with rowid ${this.lastID}`);
                // msg = "Signed Up successfully! Login here";
                res.redirect('/login');
        });
    } else {
        res.render('signup', {msg});
    }
});

app.post('/authenticate', (req,res) => {
    const {email, password} = req.body;
    let sql = 'SELECT email FROM users WHERE email=? AND password=?';
    db.all(sql, [email, password], (err, rows) => {
        if (err) {
            throw err;
        }
        if(rows.length > 0){
            req.session.isLoggedIn = true;
            req.session.userID = rows[0].id;
            res.render('index');
        } else {
            let msg = "Invalid Login credentials!";
            res.render('login', {msg});
        }
    });
});

app.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    let msg = "Logged out successfully!";
    res.render('login', {msg});
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`)
});