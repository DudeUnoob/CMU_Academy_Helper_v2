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

app.use(bodyParser.json())
app.use(express.json())
app.use(session({
    secret:"cmu_academy",
    saveUninitialized: true,
    resave: false
}))

app.use(cors())
app.use("/api/v1", apiRouter)
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({ extended: true }))

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

  app.get('/files/:id', isLoggedIn, (req, res) => {

    
  })

server.listen(3000, () => {
    console.log("server is up")
})