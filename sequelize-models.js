
//Models to copy for use
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
