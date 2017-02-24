var Express = require("express")
var Session = require("express-session")
var BodyParser = require("body-parser")
var Sqlite = require("sqlite3").verbose()
const request = require("request")

var db = new Sqlite.Database("members.db")

// initializing express application
var app = Express()
app.set("views", __dirname + "/views")
app.set("view engine", "pug")

// setting up express middleware
app.use(Session({secret: "supersecret", resave: true, saveUninitialized: true}))
app.use(BodyParser.urlencoded({extended: true}))

// setting up root router
app.get("/", function(req, res) {
    if (req.session.user === undefined) {
        res.redirect("/login")
    } else {
        request.get("http://localhost:8000", function(err, response, body) {
            const planNames = JSON.parse(body).map(function(plan) {
                return plan.planName
            })

            res.render("plans", { plans: planNames, name: req.session.user.name })
        })
    }
})

// setting up login page router
app.get("/login", function(req, res) {
    res.render("login.pug")
})

app.get("/logout", function(req, res) {
    req.session.user = undefined
    res.redirect("/login")
})

// setup route for logging in
app.post("/login", function(req, res) {
    db.get("SELECT * FROM members WHERE id = ?", [req.body.id], function(err, member) {
        if(member) {
            req.session.user = {
                id: member.id,
                name: member.name
            }
            res.redirect("/")
        } else {
            res.send(`
              <h1>Error</h1>
              <p>I don't know who you are, click <a href="/">here</a> to start again!</p>
            `)
        }
    })
})

// starting express application
app.listen(8001)
