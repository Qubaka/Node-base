//to wszystko jest od sprawdzania poprawności hasła i pochodne tego
const LocalStrategy = require('passport-local').Strategy
const { Sequelize, DataTypes }  = require('sequelize');
const { Op } = require("sequelize");
const bcrypt = require('bcrypt')
const sequelize = new Sequelize('bookweb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});
function initialize(passport, getUserByEmail, getUserById) {
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
        
        result =  await User.findAll({
            where: {
                [Op.or]: [
                    {email: form_email},
                    {name: form_email},
                ]
            }
        });
        
        /*
        console.log('REsult'+result);

        if (result == null) {
            return done(null, false, { message: 'There is no user with that name or email' })
        }
        */
        try {
            //Tutaj musiałem zrobić krótką funkcję żeby móc użyćasync bo inaczej hasło nie miało czasu się hashować przed jego sprawdzeniem
            async function HashAndCheck(){

                let hashedPassword = await bcrypt.hash(form_password, 10)

                if ( bcrypt.compare(hashedPassword, User.password) ) {
                    return done(null, form_email)
                } else {
                return done(null, false, { message: 'Password incorrect' })
                }
            }
            HashAndCheck();


        } catch (err) {
            return done(err)
        }
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