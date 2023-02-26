const mongoModel = require("../../router/lib/mongoModel");


async function mongoMicroservice(req, res, next, receivingUser, fileOwner, shareCode, codeScript, REDIS_ACTION, fileTitle){
    if (REDIS_ACTION.type == "createScriptCode"){

        new mongoModel({
            fileOwner: fileOwner,
            recievingUser: receivingUser,
            shareCode: shareCode,
            codeData: codeScript,
            fileTitle: fileTitle,
            expiration: new Date(Date.now() + (600000))
        }).save(function(err, done) {
            if(err){
                return res.status(400).send("Oops there was an error sending the doc")
            } else {
                return res.status(200).send({ documentId: done.id })
            }
        })

       
    } 
    else if(REDIS_ACTION.type == "getShareCode") {
         mongoModel.find({ recievingUser: receivingUser }, async(err, data) => {
            if(data){
                req.session.currentView = data
                return res.render('viewSharedFiles')
            } else {
                return res.status(400).send("Ooops looks like no data!")
            }
        })
    }
    else if(REDIS_ACTION.type == "getSharedFiles"){
        mongoModel.find({ fileOwner: fileOwner }, async(err, data) => {
            if(data){
                req.session.currentSharedFiles = data
                return res.render("currentSharedFiles")
            } else {
                return res.status(400).send("oops looks like no data!")
            }
        })
    }
}

module.exports = mongoMicroservice