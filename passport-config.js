//to wszystko jest od sprawdzania poprawności hasła i pochodne tego
const LocalStrategy = require('passport-local').Strategy
const { Sequelize, DataTypes }  = require('sequelize');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt')
const sequelize = new Sequelize('bookweb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
function initialize(passport/* ,getUserByEmail, getUserById*/) {
    const authenticateUser = async (form_email, form_password, done) => {
        //Pważnie nie mam pojęcia do czego jest getUserByEmail i getUserById też
        /*
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
            */
        //Tutaj tworzę model seqelize żeby widział co jest w bazie danych
        const User = sequelize.define("user", {
        id:{
            type: DataTypes.INTEGER(11),
            primaryKey:true,
            autoIncrement:true,
            unique:true,
        },
        name:{
            type: DataTypes.STRING(50),
        },
        email:{
            type: DataTypes.STRING(50),
            unique: true,
        },
        password:{
            type: DataTypes.STRING(255),
        }, 
        }, {
            timestamps: false,
            tableName: 'users',
        });
        //tutaj jest SELECT ale w sequelize
        const user =  await User.findOne({
            where: {
                email: form_email,
            }
        });
        
        //Dalej jest porównywanie hasła 
        if (user == null) {
            return done(null, false, { message: 'There is no user with that email' })
        }
        
        try {
            //Tutaj musiałem zrobić krótką funkcję żeby móc użyćasync bo inaczej hasło nie miało czasu się hashować przed jego sprawdzeniem
            async function HashAndCheck(){

                
                // Bcrypt jest jakiś zwalony bo zawsze zwraca prawdę nie ważne co
                if ( bcrypt.compare(form_password, user.password) ) {
                    return done(null, user)
                } else {
                return done(null, false, { message: 'Password incorrect' })
                }
            }
            HashAndCheck();


        } catch (err) {
            return done(err)
        }
    }
    //Temu się trzeba poważnie przypatrzeć bo ni mom pojęcia co tu się odpitala
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    /*passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })*/
    passport.serializeUser(function(user, done) {
        return done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        return done(null, user);
  });
}
module.exports = initialize