const mongoose = require("mongoose")
const { databaseConnectionString } = require("../../config/config.json")

mongoose.connect(databaseConnectionString).then(() => {
    console.log("connected to database")
})

const Schema = new mongoose.Schema({
    fileOwner: String,
    recievingUser: String,
    codeData: String,
    shareCode: String,
    createdAt: { type: Date, default: Date.now, expires: 600 }
    
})

module.exports = mongoose.model("CMU_Scripts", Schema)