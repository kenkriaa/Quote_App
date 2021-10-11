const express = require('express');
const app = express();
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const Router = require('./Router');
const CustomerApi = require('./Customer');

app.use(express.static(path.join(__dirname, 'build')));
app.use(express.json());

//create DB connection
const db = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database: 'hermann_quoteApp'
});

db.connect(function (error) {
    if (error) {
        console.log('DB Error!');
        throw error;
    }
});

const sessionStore = new MySQLStore({
    expiration: (1825 * 86400 * 1000),
    endConnectionOnClose: false
}, db);

app.use(session({
    key: '8347fdshfslkfnafns7lkj',
    secret: 'lglsdkdsigjsd7gt6sg6iji',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: (1825 * 86400 * 1000),
        httpOnly: false
    }
}));

new Router(app, db);
new CustomerApi(app, db);

app.get('/', function (req, res) {
    res.sendFile(path.join('__dirname', 'build', 'index.html'));
});

app.listen(3080, () => console.log('Server starting on port 3080!'));