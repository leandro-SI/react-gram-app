const mongoose = require("mongoose")
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dataBase = process.env.DATA_BASE;

const conn = async () => {
    try {
        const dbConn = await mongoose.connect(`mongodb://localhost:27017/${dataBase}`)

        console.log("Conectou ao banco!");
        return dbConn   
    } catch (error) {
        console.log(error)
    }
}

conn()

module.exports = conn;