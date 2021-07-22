const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const db = require('./lib/db');
const multer = require('multer'); // 중복없이 파일을 저장하기 위함

const upload = multer({dest: './upload'}); //파일이 들어와서 업로드가 되는 폴더로 지정

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req,res) => {
    db.query(`SELECT * FROM CUSTOMER WHERE isDeleted = 0`, (err, rows, fields) =>{
        if(err){
            throw err;
        }
        res.send(rows);

    });
});

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = `INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)`;
    console.log(req.file);
    let image = '/image/' + req.file.filename; //multer 라이브러리가 자동으로 이름을 겹치지 않게 한다.
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    
    db.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        });
});

app.delete('/api/customers/:id', (req, res) => {
    let sql = `UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?`;
    let params = [req.params.id];

    db.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        })

});

app.listen(port, () => console.log(`Listening on port ${port}`));