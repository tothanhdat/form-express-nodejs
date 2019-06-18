const express = require('express');
const app = express();
const bodyParser = require('body-parser'); 
const CALCU = require('./utils/Calcu');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(express.static('./public/'));
app.use(bodyParser.urlencoded()); // MIDDLEWARE GET BODY

const users = [
    { username: 'abc', password: 'abc' },
    { username: 'cde', password: 'cde' },
    { username: 'fgh', password: 'fgh' },
];

app.get('/', (req, res) => {
    let users = ['mern', 'stack', '0106'];
    res.render('home', { users })
});

app.get('/login', (req, res) => {
    res.render('login')
});

app.post('/login', (req, res) => {
    // const name = req.body.name;
    // const password = req.body.password;
    const { email, password } = req.body;
    console.log({ email, password })
    res.render('info-login', { email, password })
});

app.get('/calcu', (req, res) => {
    res.render('calcu');
});

app.post('/calcu-demo', (req, res) => {
    const { numberA, numberB, calcu } = req.body;
    let calcu1 = new CALCU(calcu.toUpperCase(), numberA, numberB);
    res.render('result-calcu', { result: calcu1._getResultCal() })
});

/**
 * Bài Tập
 */
app.get('/users', (req, res) => {
    res.render('users', { users, error: false });
})

app.post('/add-user', (req, res) => {
    const { username, password } = req.body;
    let isExist = users.findIndex(user => Object.is(username.toString(), user.username.toString()));
    if (isExist !== -1) 
        return res.render('users', { error: true, message: 'user_exist' })
    users.push({ username, password });
    return res.render('users', { error: false, users })
})

app.listen(3000, () => console.log(`SERVER STARTED AT PORT 3000`));