const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req,res) => {
    res.send([{
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '이형근',
            'birthday': '960710',
            'gender': '남자',
            'job': '대학생'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '김예지',
            'birthday': '950805',
            'gender': '여자',
            'job': '뇌과학자'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '이순신',
            'birthday': '280703',
            'gender': '남자',
            'job': '디자이너'
        }
      ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`));