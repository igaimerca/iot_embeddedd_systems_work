const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
var fs = require('fs');

mongoose
.connect("mongodb+srv://aime:aime@cluster0.y3d8b.mongodb.net/embedded_systems?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(() => {
        const app = express();
        app.use(express.json());
        app.use(cors())
        

        app.get("/", (req, res) => {
            res.send("Welcome to my web app API!");
        })
        app.post("/upload", (req, res) => {
            console.log(req.body);
            fs.writeFile('uploaded_transaction.txt', JSON.stringify(req.body), function (err) {
                if (err) throw err;
                console.log('Data uploaded');
              });
        })

        const port = 5000;
        app.listen(port, () => {
            console.log(`Server is running on port ${process.env.PORT || port} && DB Connected`);
        });
    });