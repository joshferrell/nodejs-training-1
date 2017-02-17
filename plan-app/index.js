var Express = require( "express" )
var Request = require( "request" )
var Session = require( "express-session" )
var BodyParser = require( "body-parser" )
var Sqlite = require( "sqlite3" ).verbose()

var PlanPage = require( "./PlanPage" )
var LoginPage = require( "./LoginPage" )

var app = Express()

app.use(
  Session( { secret: "supersecret", saveUninitialized: true, resave: true } ) )

app.use( BodyParser.urlencoded( { extended: true } ) )

app.get( "/login", function( req, res ) {
  res.end( LoginPage.render() )
} )

app.post( "/login", function( req, res ) {
  var db = new Sqlite.Database( "./tmp/members.db" )
  var sql = "SELECT * FROM members WHERE id = ?"

  db.serialize(function() {
    db.all( sql, [ req.body.id ], function(err, rows) {
      if(rows.length > 0) {
        req.session.user = { id: "1" }
        res.redirect( "/" )
      }
      else {
        res.end("<h1>I don't know who you are</h1>")
      }
    } )
  } )

  db.close()
} )

app.get( "/", function( req, res ) {
  if ( req.session.user === undefined ) {
    res.redirect( "/login" )
  }
  else {
    Request.get('http://localhost:8000', function(err, planServiceResponse, body) {
      var db = new Sqlite.Database( "./tmp/members.db" )
      var sql = "SELECT * FROM members WHERE id = ?"
      var memberId = req.session.user.id

      db.get( sql, [ memberId ], function(err, row) {
        if(row == undefined ) {
          res.end("<h1>I don't know who you are</h1>")
        }
        else {
          var mergedPlans = JSON.parse( body ).map( function( plan ) {
            console.log( plan, row )
            return Object.assign( plan, { isDefault: plan.planName === row.default_plan } )
          } )
          res.end(PlanPage.render( mergedPlans ) )
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
    var db = new Sqlite.Database( "./tmp/members.db" )

    var sql = "UPDATE members SET default_plan = ? WHERE id = ?"
    var params = [ req.body.defaultPlan, req.session.user.id ]

    db.run( sql, params, function( err ) {
      res.redirect( "/" )
    } )
    db.close()
  }
} )

app.listen(8001)

var db = new Sqlite.Database( "./tmp/members.db" )

db.serialize( function() {
  db.exec("DROP TABLE IF EXISTS member", function( err ) {
    db.exec("CREATE TABLE members(id varchar(255), name varchar(255), default_plan varchar(255))", function( err ) {
      db.exec("INSERT INTO members(id, name, default_plan) VALUES('1', 'john', '')", function( err ) {
        console.log( "created database and inserted data" )
      } )
    } )
  } )
} )

db.close()
