exports.render  = function( plans ) {
  return `<!doctype html>

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
  `
}
