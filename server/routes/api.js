const express = require("express");
const router = express.Router();

const auth = require("./auth");
const protected = require("./protected");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.use("/auth", auth);
router.use("/protected", protected);


// ****************************************

const mysql = require('mysql');
var app = express();
const bodyparser = require('body-parser');
const cors = require("cors");

app.use(bodyparser.json());
app.use(cors());
app.use(express.json()); //req.body


var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'test',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});

app.listen(8000, () => console.log('Express server is runnig at port no : 8000'));


app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


app.get('/users', (req, res) => {
    mysqlConnection.query('SELECT * FROM user', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});





module.exports = router;
