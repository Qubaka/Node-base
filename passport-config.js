//to wszystko jest od sprawdzania poprawności hasła i pochodne tego
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const mysql = require('mysql')

function initialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (form_email, form_password, done) => {
        //Pważnie nie mam pojęcia do czego jest getUserByEmail i getUserById też

        let con = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: "bookweb"
        })

        con.connect(err =>{
            if(err){
                throw err
            }
            console.log('mysql connected')
            //sql via node
            //To jest przykład jak przesyła się sql'a nodem
        let sql = 'SELECT * FROM `users` where email= ? '
        con.query(sql, [form_email], function (err, result) {
            if (err) throw err;
            console.log(result);
  


        if (result == null) {
            return done(null, false, { message: 'No user with that email' })
        }

        try {


            //Tutaj musiałem zrobić krótką funkcję żeby móc użyćasync bo inaczej hasło nie miało czasu się hashować przed jego sprawdzeniem
            //Wszystko w teorii POWINO działać ale bcrypt za każdym razem zwraca innego hasha?
            async function HashAndCheck(){
                //console.log(form_password)
                //console.log(result[0].password)
                let hashedPassword = await bcrypt.hash(form_password, 10)
                //console.log(hashedPassword);
                //console.log(result[0].password);
                if ( bcrypt.compare(hashedPassword, result[0].password) ) {
                    return done(null, form_email)
                } else {
                return done(null, false, { message: 'Password incorrect' })
                }
            }
            //Tutaj szybkie jej wywołanie
            HashAndCheck();


        } catch (err) {
            return done(err)
        }


        })
        })
    }
    
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    /*passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })*/
    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });
}

module.exports = initialize