const api = require('./api')

const dbPool = require('./db');
const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', async (req, res) => {
    api.getLandingPads().then(pads => {
        res.status(200);
        res.send({
            result: pads
        });
    }).catch(err => {
        res.status(400)
        res.send({
            result: err
        })
    })
    
});

app.get('/:id', async (req, res) => {
    api.getLandingPad(req.params.id).then(pad => {
        res.status(200);
        res.send({
            result: pad
        });
    }).catch(err => {
        res.status(400)
        res.send({
            result: err
        })
    })
});

app.listen('4000');
console.log(`Listening on port: 4000, wait for the development server to be up...`);