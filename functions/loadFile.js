const axios = require("axios")
const { BASE_URL }  = require("../config/config.json")

async function loadFile(req, res, next, authToken, fileId){
    const authHeader = {
        "Content-Type":"application/json",
        Authorization: `Token ${authToken}`
    }

    try {
        const { data } = await axios.post(`${BASE_URL}files/download/`, { fileId: fileId }, {
            headers: authHeader
        })

        req.session.currentFile = data

        next()
    }
    catch(e) {
        return res.send(e)
    }
    
}

module.exports = loadFile