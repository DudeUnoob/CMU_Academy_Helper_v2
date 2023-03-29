const axios = require("axios")
const { BASE_URL } = require("../config/config.json")

async function deleteCmuFile(req, res, next, authToken, username, fileTitle, codeScript){

        axios.post(`${BASE_URL}files/delete/`, {
            path: fileTitle,
            fileOwner: username,
            contentType: "text/python",
          }, {
            headers:{
                authorization: `Token ${authToken}`,
                "Content-Type":"application/json"
            }
          }).then((response) => {
            return res.json({ success: "Successfully deleted file" })
          })
          .catch(error => {
            return res.json(error)
          })
      
    
}


module.exports = deleteCmuFile