const axios = require("axios")
const { BASE_URL } = require("../config/config.json")
const { userAuthObj } = require("../config/config")

async function loginCmuUser(req, res, next, apiPath, username, password) {

    const userAuthObj = {
        username: username,
        password: password,
        cleverToken: null,
        emailVerificationCode: "",
        lng: "en"
    }
    try {
        const { data } = await axios.post(`${BASE_URL}${apiPath}/`, userAuthObj, {
            headers:{
                "Content-Type":"application/json"
            }
        })

        req.session.auth_token = data.token 
        req.session.role = data.role
        req.session.cmuId = data.id
        req.session.username = username

        return res.redirect('/')
    } catch(e) {
        return res.send(e.code)
    }
    

    
}

module.exports = loginCmuUser