const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.get('/api/shout/:word', (req, res) => {
    let word = req.params.word.toUpperCase() + '!!!';
    res.status(200).send(word);
})

app.post('/api/array/merge', (req, res) => {
    try {
        const vals = Object.keys(req.body).map(key => JSON.parse(req.body[key]));
        let ret = vals.reduce(function(a, b) {
            a = a.concat(b);
            return a;
        }, []);
        res.status(200).send(ret);
    } catch (e) {
        res.status(400).send('"error": "Input data should be of type Array."');
    }
})


app.listen('3000', () => {
    console.log('API currently running on port 3000');
})