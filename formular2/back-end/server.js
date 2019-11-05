const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");

//Initializing server
const app = express();
app.use(bodyParser.json());
const port = 8080;
app.listen(port, () => {
    console.log("Server online on: " + port);
});

app.use('/' , express.static('../front-end'))

const connection = mysql.createConnection({
    host: "192.168.64.2",
    user: "octavia",
    password: "octavia",
    database: "siscit_abonament"
});

connection.connect(function (err) {

    console.log("Connected to database!");
    const sql = "CREATE TABLE IF NOT EXISTS abonament(nume VARCHAR(40),prenume VARCHAR(40),telefon VARCHAR(15),email VARCHAR(50),facebook VARCHAR(60),tipAbonament VARCHAR(20),nrCard VARCHAR(40),cvv INTEGER, varsta VARCHAR(3), cnp VARCHAR(20), sex VARCHAR(1))";
    connection.query(sql, function (err, result) {
        if (err) {
            throw err};
    });
});

app.post("/abonament", (req, res) => {
    let nume = req.body.nume;
    let prenume = req.body.prenume;
    let telefon = req.body.telefon;
    let email = req.body.email;
    let facebook = req.body.facebook;
    let tipAbonament = req.body.tipAbonament;
    let nrCard = req.body.nrCard;
    let cvv = req.body.cvv;
    let varsta = req.body.varsta;
    let cnp = req.body.cnp;
    let sex = req.body.sex;
    let error = []

    if (error.length === 0) {
        const sql =
            "INSERT INTO abonament (nume,prenume,telefon,email,facebook,tipAbonament,nrCard,cvv,varsta,cnp,sex) VALUES('" +nume +"','" +prenume +"','" +telefon +"','" +email +"','" +facebook +"','" + tipAbonament +"','" + nrCard +"','" +cvv+"','" +varsta+"','" +cnp+"','" + sex+"')";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Abonament achizitionat!");
        });

        res.status(200).send({
            message: "Abonament achizitionat!"
        });
        console.log(sql);
    } else {
        res.status(500).send(error)
        console.log("Eroare la inserarea in baza de date!");
    }
});