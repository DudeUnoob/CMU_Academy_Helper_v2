const axios = require("axios")
const { BASE_URL } = require("../config/config.json")

async function loadSandBoxFiles(req, res, next, apiPath, authToken){
    const userAuthHeader = {
        Authorization: `Token ${req.session.auth_token}`,
        "Content-Type": "application/json"
    }

    try {
        const { data } = await axios.post(`${BASE_URL}${apiPath}/`, {
            userDirectoryOwner: req.session.username
        }, {
            headers: userAuthHeader
        })

        req.session.files = data
        return next()

    } catch(e) {
        req.session.destroy()
        return res.redirect('/')
    }

}

module.exports = loadSandBoxFiles