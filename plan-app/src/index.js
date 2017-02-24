var Request = require( "request" )
var Express = require( "express" )
var Session = require( "express-session" )
var BodyParser = require( "body-parser" )
var Sqlite = require( "sqlite3" ).verbose()

var IndexPage = require( "./IndexPage" )
var LoginPage = require( "./LoginPage" )

var app = Express()
var db = new Sqlite.Database( "members.db" )

var assignDefaultPlan = function( defaultName ) {
  return function( plan ) {
    return Object.assign( plan
    , { checked: plan.planName === defaultName ? "checked" : "" } )
  }
}


app.set( "views", __dirname + "/views" )

app.use( Session( { secret: "supersecret" } ) )
app.use( BodyParser.urlencoded( { extended: true } ) )

app.get( "/login", function( req, res ) {
  res.end( LoginPage.render() )
} )

app.post( "/logout", function( req, res ) {
  req.session.user = undefined
  res.redirect( "/" )
} )

app.post( "/login", function( req, res ) {
  var sql = "SELECT * FROM members WHERE id = ?"

  db.serialize(function() {
    db.all( sql, [ req.body.id ], function(err, rows) {
      if(rows.length > 0) {
        req.session.user = { id: req.body.id }
        res.redirect( "/" )
      }
      else {
        res.end(`
          <h1>Error</h1>
          <p>I don't know who you are, click <a href="/">here</a> to start again!</p>
        `)
      }
    } )
  } )
} )

app.get( "/", function( req, res ) {
  if ( req.session.user === undefined ) {
    res.redirect( "/login" )
  }
  else {
    Request.get('http://localhost:8000', function(err, planServiceResponse, plans ) {
      var sql = "SELECT * FROM members WHERE id = ?"
      var memberId = req.session.user.id

      db.get( sql, [ memberId ], function(err, row) {
        if(row == undefined ) {
          res.end("<h1>I don't know who you are</h1>")
        }
        else {
          var viewModel = {
            plans: JSON
              .parse( plans )
              .map( assignDefaultPlan( row.default_plan ) )
          }

          res.render( "index.hbs", viewModel )
        }
      } )
    } )
  }
} )

app.post( "/plans", function( req, res ) {
  if ( req.session.user == undefined ) {
    res.redirect( "/login" )
  }
  else {
    var sql = "UPDATE members SET default_plan = ? WHERE id = ?"
    var params = [ req.body.defaultPlan, req.session.user.id ]

    db.run( sql, params, function( err ) {
      res.redirect( "/" )
    } )
  }
} )

app.listen(8001)

db.serialize( function() {
  db.run("DROP TABLE IF EXISTS members" )
  db.run("CREATE TABLE members(id varchar(255), name varchar(255), default_plan varchar(255))")
  db.run("INSERT INTO members(id, name, default_plan) VALUES('1', 'john', '')")
  console.log( "databse was setup!" )
} )
