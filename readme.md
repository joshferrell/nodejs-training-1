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
