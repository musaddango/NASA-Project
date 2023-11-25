const path = require('node:path');
const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const api = require('./routes/api');

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    optionalSuccessStatus: 201,
}));
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));

app.use('/v1',api);

app.get('/*', (req, res)=>{
    res.sendFile(path.join(path.join(__dirname, "..", "build", "index.html")))
})



module.exports = {
    app,
}