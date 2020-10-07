const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 3000;
const tpCtrl = require('./transformedPayload.ctrl');

app.use(bodyParser.json());

app.post('/transformData', (req, res, next) => {
    try {
        let response = tpCtrl.transformJsonData(req.body);
        res.send({ status: true, message: 'Request Processed Succesfully', data: response })
    } catch (err) {
        res.status(500).send({
            status: false,
            message: 'Server side error'
        })
    }
});


app.listen(port, (err) => {
    if (err) console.log('Error in server starting ', err);
    else console.log(`Server running on the port: ${port}`);
})