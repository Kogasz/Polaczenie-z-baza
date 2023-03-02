const cors = require("cors")
const express = require("express")
const mysql = require("mysql")
const app = express()
const port = 3000
app.use(cors())

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "!pro"
})

con.connect(function(err){
    if(err) {
    console.log(err)
}
console.log("Połączono")
})

app.get("/",function(req, res){
    res.send("ok")
})
app.get("/select", function(req, res){
    const sql = "SELECT * FROM pierwsza"
    con.query(sql, function(err, result, fields){
        if(err){
            console.log(err)
        }
        res.send(result)
    })
})

app.get("/add/:imie/:nazwisko/:klasa", function(req, res){
    const imie = req.params.imie
    const nazwisko = req.params.nazwisko
    const klasa = req.params.klasa

    const sql = `INSERT INTO pierwsza (imie,nazwisko,klasa) VALUES ('${imie}', '${nazwisko}', '${klasa}')`
    con.query(sql, function(err, result, fields){
        if(err){
            console.log(err)
            res.send("nieudało się dodać")
        }
        else{
            res.send("dodano")
        }
        
    })
})



app.listen(port)