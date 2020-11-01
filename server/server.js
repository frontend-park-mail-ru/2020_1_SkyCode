'use strict';

const express = require('express');
const path = require('path');

const app = express();

const root = path.resolve(__dirname, '..');
const port = 80;

app.use(express.static(path.resolve(__dirname, '../', 'public')));
app.use(express.static(path.resolve(__dirname, '../../backend/images/')));

app.get('/',  (req, res) => {
    res.sendFile(path.resolve(root), 'public/index.html');
});

app.listen(port, () => {
    console.log(`Server listen at port ${port}`);
});
