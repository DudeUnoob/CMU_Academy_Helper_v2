const express = require("express")
const app = express()
const http = require("http")
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const session = require("express-session")
const cors = require("cors")
const bodyParser = require("body-parser")
const apiRouter = require("./router/api/api")
const loginCmuUser = require("./functions/callCmuApi")
const isLoggedIn = require("./functions/isLoggedIn")
const loadSandBoxFiles = require("./functions/loadSandboxFiles")
const loadFile = require("./functions/loadFile")
const mongoModel = require("./router/lib/mongoModel")
const mongoMicroservice = require("./functions/microservices/databaseService")



app.use(bodyParser.json())
app.use(express.json())
app.use(session({
    secret:"cmu_academy",
    saveUninitialized: true,
    resave: false
}))

app.use(cors())
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/api/v1", apiRouter)

app.get("/", (req, res) => {
    res.render("index")
})

app.get("/login",  (req, res) => {
    if(req.session.auth_token){
        return res.redirect('/files/user')
    }
    res.render("login")
})

app.get('/files/user', isLoggedIn, (req, res,next) => {
    loadSandBoxFiles(req, res, next, "files/list-files", req.session.auth_token)
    
}, (req, res) => {
    res.render('files', { files: req.session.files })
})


app.post('/login/user', (req, res, next) => {
    loginCmuUser(req, res, next, "users/auth-token", req.body.username, req.body.password);
  }, (req,res) => { 
      // regular route 
      res.send("hello")
  });

  app.get('/files/:id', isLoggedIn, (req, res, next) => {
    loadFile(req, res, next, req.session.auth_token, req.params.id)
    
  }, (req, res) => {
    res.render('fileData', { file: req.session.currentFile })
  })


  

io.on("connection", (socket) => {
    
    
})

app.get('/user/files/:documentId', isLoggedIn, (req, res, next) => {

    const { documentId } = req.params

    mongoModel.findById(documentId, async (err, data) => {
        if(data.recievingUser == req.session.username || data.fileOwner == req.session.username){
            return res.render('importFile', { file: data.codeData })
        } else{
            return res.status(400).send("You are not authorized to view this file or this is not a valid file")
        }
    })
})
const REDIS_GET_SHARED_FILES_ACTION = { type:"getSharedFiles"}

app.get('/user/files-shared', isLoggedIn, (req, res, next) => {
    mongoMicroservice(req, res, next, null, req.session.username, null, null,REDIS_GET_SHARED_FILES_ACTION, null)
}, (req, res, next) => {
    res.redirect('/files/user')
})


server.listen(3000, () => {
    console.log("server is up")
})