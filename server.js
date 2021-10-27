'use strict';

const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, 'build')));
app.get('/', (_req, res) => res.sendFile(path.join(__dirname, 'build/index.html')));

const port = process.env.PORT || 8080;
app.listen(port);
console.log('Portfolio web server started on port ' + port);
