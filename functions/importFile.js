const axios = require("axios")
const { BASE_URL } = require("../config/config.json")

async function importFile(req, res, next, authToken, username, fileTitle, codeScript){
    const payloadObj = {
        path: fileTitle,
        fileOwner: username,
        content: codeScript,
        contentType: "text/python",
        csvStatus: null,
        overwrite: false
      }

      const userAuthHeader = {
        Authorization: `Token ${req.session.auth_token}`,
        "Content-Type": "application/json"
    }

      
        axios.post(`${BASE_URL}files/upload/`, {
            path: fileTitle,
            fileOwner: username,
            content: codeScript,
            contentType: "text/python",
            csvStatus: null,
            overwrite: false
          }, {
            headers:{
                authorization: `Token ${authToken}`,
                "Content-Type":"application/json"
            }
          }).then((response) => {
            return res.json({ success: "Successfully uploaded and imported file" })
          })
          .catch(error => {
            return res.json(error)
          })
      
    
}


module.exports = importFile


