
const express = require("express")
const isLoggedIn = require("../../functions/isLoggedIn")
const bodyParser = require("body-parser")

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
   // redisMicroservice(req, res, next, receivingUser, fileOwner, shareCode, codeScript, REDIS_CREATE_ACTION)

})


router.get('/user/get-shared-files',isLoggedIn, (req, res, next) => {
   // redisMicroservice(req, res, next, req.session.username, null, null, null, REDIS_GET_ACTION)
},(req, res) => {
    res.send({ message: 'ur good' })
}

)



module.exports = router