if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
//To są pakiety potrzebne do działania strony"
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const mysql = require('mysql')


const initializePassport = require('./passport-config')
initializePassport(
    passport
    //To działa na podstawie tablicy z js(do zmiany)!!!
    //email => users.find(user => user.email === email),
    //id => users.find(user => user.id === id)
)
//!!!
//To jest wstępna "baza danych", ale to tylko tablica z js
//Przez to że to tylko tablica, to nie zapamiętuje rzeczy jeśli wyłączysz i włączysz srewer, dlatego potrzeba jest baza danych
const users = []


//To jest potrzebne, dlaczego? nie wiem
app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))



// To przesyła stuff pomiędzy stronami, (nie wiem jak to dokońca działa) (app.get/app.post itd.)
app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', { name: req.user.name })
})
  
app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        let hashedPassword = await bcrypt.hash(req.body.password, 10)
  
        // To bierze rzeczy z form'a i wstawia je do tablicy (to nie może tak być musi być baza danych)!!!
        //users.push({
            //id: Date.now().toString(),
            //name: req.body.name,
            //email: req.body.email,
            //password: hashedPassword
        //})
  
        // połączenie z bazą danych
        let con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: "bookweb"
        })
        //połączenie z mysql(?)
        con.connect(err =>{
            if(err){
                throw err
            }
            console.log('mysql connected')
            //sql via node
            //To jest przykład jak przesyła się sql'a nodem
        let sql = 'INSERT INTO users ( name, email, password ) VALUES ( ? , ? , ? )'
        // Pytajniki w zapytaniu oznaczają puste miejsca gdzie można wstawic wartości pobrane z formsów node'em
        //To co chesz wstawić za pytajniki jest tu \|/ w [] 
        con.query(sql, [req.body.name, req.body.email, hashedPassword], function (err, result) {
            if (err) throw err;
            console.log(result);
  
        })
        });
  
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

//Podobno bez method-override nie działa to...
app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
  
res.redirect('/login')
}
  
function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}
  
// to robi że url strony to "localhost:3000" 
app.listen(3000)