var Sqlite = require("sqlite3").verbose()

var db = new Sqlite.Database("members.db")

db.serialize(function() {
    db.run("DROP TABLE IF EXISTS members")
    db.run("CREATE TABLE members(id varchar(255), name varchar(255), default_plan varchar(255))")
    db.run("INSERT INTO members(id, name, default_plan) VALUES('1', 'john', '')")

    console.log("databse was setup!")

    var sql1 = "SELECT * FROM members WHERE id = ?"

    db.get(sql1, ["1"], function(err, member) {
        console.log(member)
    })

    // db.all( somesql, [], function(err, rows) {} )

})
