'use strict'

const express = require('express');
const path = require('path');

const app = express()

const root = path.resolve(__dirname, '..');
const port = 3000;

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.static(path.resolve(__dirname, '../../backend/images/')));

app.get("/",  function (req, res) {
    res.sendFile(path.resolve(root), 'public/index.html');
})

app.listen(port, function () {
    console.log(`Server listen at port ${port}`);
})