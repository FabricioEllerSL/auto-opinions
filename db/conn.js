const { Sequelize } = require('sequelize')

const sequelize = new Sequelize(
    process.env.DB, 
    process.env.DB_USER, 
    process.env.DB_PASSWORD, 
    {
        host: process.env.DB_HOST,
        dialect: "mysql"
    }
)

try{
    sequelize.authenticate()
    console.log("DB connected successfully...")
} catch (err){
    console.log(err)
}

module.exports = sequelize