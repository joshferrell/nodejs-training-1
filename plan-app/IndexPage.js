var renderPlan = function( plan ) {
  return `<li>${ plan.planName }</li>`
}

exports.render  = function( plans ) {
  return `<!doctype html>

    <head>
      <title>Plan App</title>
    </head>

    <body>
      <h1>Hello, World</h1>
      <ul>${ plans.map( renderPlan ).join("") }</ul>
    </body>
  `
}
