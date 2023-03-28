
const express = require("express")
const isLoggedIn = require("../../functions/isLoggedIn")
const bodyParser = require("body-parser")
const mongoModel = require("../../router/lib/mongoModel");
const mongoMicroservice = require("../../functions/microservices/databaseService");
const importFile = require("../../functions/importFile");
const uploadFileCopyPaste = require("../../functions/uploadFileCopyPaste")

const router = express.Router()




router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.get("/", (req, res) => {
    res.status(200).json({ message: "test endpoint" })
})

// router.post('/user/sendFile',(req, res, next) => {
//     isLoggedIn(req, res, next)    
// },
// async(req, res, next) => {
    
//     await createShareCode(receivingUser, fileOwner, shareCode, codeScript)
    
//     res.send({ message: "successfully created code" })

// }
// )
const REDIS_CREATE_ACTION = { type: "createScriptCode" }
const REDIS_GET_ACTION = { type: "getShareCode" }


router.post('/user/sendFile', (req, res, next) => {
    isLoggedIn(req, res, next)
}, (req, res, next) => {
    const receivingUser = req.body.recievedUser
    const fileOwner = req.body.fileOwner
    const shareCode = req.body.shareCode
    const codeScript = req.body.codeScript
    const fileTitle = req.body.fileTitle

    if(receivingUser == req.session.username) {
        return res.status(400).send({ message: "Oops you can't share a file with yourself!" })
    } else {
        mongoMicroservice(req, res, next, receivingUser,fileOwner, shareCode, codeScript, REDIS_CREATE_ACTION, fileTitle)

    }
   // redisMicroservice(req, res, next, receivingUser, fileOwner, shareCode, codeScript, REDIS_CREATE_ACTION)

})


router.get('/user/get-shared-files',isLoggedIn, (req, res, next) => {
   // redisMicroservice(req, res, next, req.session.username, null, null, null, REDIS_GET_ACTION)
   mongoMicroservice(req, res, next, req.session.username, null, null, null, REDIS_GET_ACTION, null)

   

}, (req, res) => {
    res.send({ message: 'hello channel'})
})

router.get('/user/current-viewed-file', (req, res, next) => {
    res.json(req.session.currentView)
})

router.get('/user/current-shared-file', (req, res, next) => {
    res.json(req.session.currentSharedFiles)
})

router.post('/import/file',isLoggedIn,(req, res, next) => {
    importFile(req, res,next, req.session.auth_token, req.session.username, req.body.fileTitle, req.body.codeScript)
}, (req, res) => {
    res.redirect('/files/user')
})

router.get('/current/import-view-file', (req, res) => {
    res.send(req.session.currentFileData)
})

router.post('/copy-paste', (req, res, next) => {
    const { path, content } = req.body 
    uploadFileCopyPaste(req, res, next, req.session.auth_token, req.session.username, path, content)
}, (req, res) => {
    res.send("hmmm")
})

module.exports = router