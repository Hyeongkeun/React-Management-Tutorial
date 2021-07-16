const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
var db = require('./lib/db');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req,res) => {
    db.query(`SELECT * FROM CUSTOMER`, (err, rows, fields) =>{
        if(err){
            throw err;
        }
        res.send(rows);

    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));