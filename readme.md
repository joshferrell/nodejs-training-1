# Nodejs script

* synchronously read a file

# Event Loop Sample 1

    console.log( "begin" )

    $.on("button", "click", function clicker() {
        console.log( "click handler started" )

        setTimeout(function timeout() {
            console.log("finish long process!")
        }, 1000)

        console.log( "click handler finished" )
    })

    console.log( "end" )

# Links

## Problem 1

Read a CSV file and convert it to a list of JavaScript Objects

1. Place index.js (https://git.io/vD9oF) and plans.csv in a directory
2. run the application using the following command:
    node index.js
3. Ensure that the given assertion does not fail

## Problem 2

Convert the synchronous code to an asynchronous

http://latentflip.com/loupe/?code=Y29uc29sZS5sb2coICJiZWdpbiIgKQoKJC5vbigiYnV0dG9uIiwgImNsaWNrIiwgZnVuY3Rpb24gY2xpY2tlcigpIHsKICAgIGNvbnNvbGUubG9nKCAiY2xpY2sgaGFuZGxlciBzdGFydGVkIiApCiAgICAKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZW91dCgpIHsKICAgICAgICBjb25zb2xlLmxvZygiZmluaXNoIGxvbmcgcHJvY2VzcyEiKQogICAgfSwgMTAwMCkKICAgIAogICAgY29uc29sZS5sb2coICJjbGljayBoYW5kbGVyIGZpbmlzaGVkIiApCn0pCgpjb25zb2xlLmxvZyggImVuZCIgKQ%3D%3D!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D

## Solutions

    var readPlans = function( callback ) {
      FS.readFile( "plans.csv", "utf8", function(err, data) {
        if (err) {
          return callback(err)
        }

        var plans = data
          .split("\n")
          .map(l => l.split(","))
          .filter(l => l[0] != "" )
          .map(l => ({ planName: l[0], planBenefits: l[1], group: l[2], memberId: l[3] }) )

        callback( plans )
      })
    }

    var eventLooping = function() {
      console.log( "begin" )

      $.on("button", "click", function clicker() {
          console.log( "click handler started" )

          setTimeout(function timeout() {
              console.log("finish long process!")
          }, 1000)

          console.log( "click handler finished" )
      })

      console.log( "end" )
    }
