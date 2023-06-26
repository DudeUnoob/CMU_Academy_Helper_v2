const mongoose = require("mongoose")
require("dotenv").config()
const { databaseConnectionString } = require("../../config/config.json")

mongoose.connect(process.env.MONGO_DB_URI).then(() => {
    console.log("connected to database")
})

const Schema = new mongoose.Schema({
    fileOwner: String,
    recievingUser: String,
    codeData: String,
    shareCode: String,
    fileTitle: String,
    expiration: { type: Date, required: true }
    
})

Schema.index({ expiration: 1}, { expireAfterSeconds: 0 })

module.exports = mongoose.model("CMU_Scripts", Schema)