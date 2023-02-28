const express = require('express')
const publicRouter = express.Router()
const path = require("path")

const cssFileDir = { root: path.join(__dirname, '../../views/public/css')}

publicRouter.get('/currentSharedFiles.css', (req, res) => {
    res.sendFile('currentSharedFiles.css', cssFileDir)
})

publicRouter.get('/fileData.css', (req, res) => {
    res.sendFile('fileData.css', cssFileDir)
})

publicRouter.get('/files.css', (req, res) => {
    res.sendFile('files.css', cssFileDir)
})

publicRouter.get('/importFile.css', (req, res) => {
    res.sendFile('importFile.css', cssFileDir)
})

publicRouter.get('/index.css', (req, res) => {
    res.sendFile('index.css', cssFileDir)
})

publicRouter.get('/login.css', (req, res) => {
    res.sendFile('login.css', cssFileDir)
})

publicRouter.get('/viewSharedFiles.css', (req, res) => {
    res.sendFile('viewSharedFiles.css', cssFileDir)
})
module.exports = publicRouter