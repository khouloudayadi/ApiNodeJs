const PORT= 3000
var express = require('express')//pour d�finir les routes
var app = express()
var mysql = require('mysql')
var myConnection = require('express-myconnection')
var bodyParser = require('body-parser')//fournit un middleware de connexion pour analyser le corps des requ�tes HTTP.

var config = require('./db')
var dbOptions = {
    host: config.host,
    user: config.database.user,
    password: config.database.password,
    port: config.database.port,
    database: config.database.db
}

var routes = require('./routes/index')
var publicDir = (__dirname + '/public/'); //set static dir for display image

//app.use():charge une fonction � utiliser en tant que middleware
app.use(express.static(publicDir))
app.use(myConnection(mysql, dbOptions, 'pool'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", routes)
app.listen(PORT, () => {
    console.log('BACKEND running on port  ' + PORT)
})
