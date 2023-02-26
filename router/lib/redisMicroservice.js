const redis = require("redis")
const { v4: uuidv4 } = require("uuid")

const url = process.env.REDIS_URL || "redis://default:CYqS1vs6p6lnJ6w4m5Fj9OVvoAWNjquD@redis-17223.c93.us-east-1-3.ec2.cloud.redislabs.com:17223"

const client = redis.createClient({
    url: url
})

client.connect()
client.on('error', err => console.log("Redis client error", err))
client.on("connect", () => {
    console.log("main redis microservice connected to redis client")

})


function redisMicroservice(req, res, next, receivingUser, fileOwner, shareCode, codeScript, REDIS_ACTION) {
    console.log(REDIS_ACTION.type)
    if (REDIS_ACTION.type == "createScriptCode") {
        const customString = uuidv4()

        console.log("this first fasdkjfklj function was triggered")

        client.json.set(`${receivingUser}-${customString}`, ".", {
            fileOwner: fileOwner,
            receivingUser: receivingUser,
            shareCode: shareCode,
            codeScript: codeScript,
        })

        return res.status(200).send({ customId: customString })
    } else {

         
    } 
    


}


module.exports = redisMicroservice

