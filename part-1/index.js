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
        let a = JSON.parse(req.body.a),
            b = JSON.parse(req.body.b);
        var result = [];

        for (var i = 0; i < Math.max(a.length, b.length); i++) {
            if (a[i] !== undefined) result.push(a[i]);
            if (b[i] !== undefined) result.push(b[i]);
        }
        res.status(200).send(result);
    } catch (e) {
        res.status(400).send({error:'Both keys in request body must be of type Array.'});
    }
});


app.listen('3000', () => {
    console.log('API currently running on port 3000');
})
