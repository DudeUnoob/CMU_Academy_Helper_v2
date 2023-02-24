const { Client, Entity, Schema, Repository } = require("redis-om")

const client = new Client();

async function connect(){
    if(!client.isOpen()){
        await client.open(process.env.REDIS_URL)
        console.log("connected to client")
    }
}

class NotifSystem extends Entity {}

let schema = new Schema (
    NotifSystem,
    {
        shareCode: { type: "string" },
        user: { type:"string" },
        receivingUser: { type:"string"} ,
        codeScript: { type: "string" }
    },
    {
        dataStructure: "JSON"
    }

)

 async function createShareCode(shareCode, user, receivingUser, codeScript){
    await connect();

    const repository = new Repository(schema, client);

    const notif = repository.createEntity()

    notif.shareCode = shareCode
    notif.user = user
    notif.receivingUser = receivingUser
    notif.codeScript = codeScript

    const id = await repository.save(notif)
}

module.exports = createShareCode