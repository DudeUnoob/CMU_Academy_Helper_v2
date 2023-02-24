
const express = require("express")
const isLoggedIn = require("../../functions/isLoggedIn")
const bodyParser = require("body-parser")


const router = express.Router()

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: true }))
router.get("/", (req, res) => {
    res.status(200).json({ message: "test endpoint" })
})

router.get('/auth/user', (req, res) => {
    res.send({
        auth_token: req.session.auth_token,
        id: req.session.id,
        role: req.session.role,
        cmuId: req.session.cmuId,
        username: req.session.username
    })
})



module.exports = router