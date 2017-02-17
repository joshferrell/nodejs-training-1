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
