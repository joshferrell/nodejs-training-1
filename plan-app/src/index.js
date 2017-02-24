var Express = require( "express" )
var Session = require( "express-session" )
var BodyParser = require( "body-parser" )

// initializing express application
var app = Express()

// setting up express middleware
app.use( Session( { secret: "supersecret", resave: true, saveUninitialized: true } ) )
app.use( BodyParser.urlencoded( { extended: true } ) )

// setting up root router
app.get( "/", function( req, res ) {
  if ( req.session.user === undefined ) {
    res.redirect( "/login" )
  }
  else {
    res.send( `<h1>Welcome ${ req.session.user.name }</h1>` )
  }
} )

// setting up login page router
app.get( "/login", function( req, res ) {
  res.send( `
    <!doctype html>

    <head>
      <title>Plan App</title>
    </head>

    <body>
      <h1>Login</h1>
      <p>Please enter your id to login</p>
      <form action="/login" method="POST">
        Id: <input type="text" name="id"><button>Submit</button>
      </form>
    </body>
  ` )
} )

// setup route for logging in
app.post( "/login", function( req, res ) {
  var memberId = req.body.id

  if( memberId && memberId == "1" ) {
    req.session.user = { id: "1", name: "john" }
    res.redirect( "/" )
  }
  else {
    res.send(`
      <h1>Error</h1>
      <p>I don't know who you are, click <a href="/">here</a> to start again!</p>
    `)
  }
} )

// starting express application
app.listen(8001)
