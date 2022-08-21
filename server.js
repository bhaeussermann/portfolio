'use strict';

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const currentFolderPath = path.dirname(fileURLToPath(import.meta.url));
app.use('/', express.static(path.join(currentFolderPath, 'dist')));
app.get('/', (_req, res) => res.sendFile(path.join(currentFolderPath, 'dist/index.html')));

const port = process.env.PORT || 8090;
app.listen(port);
console.log('Portfolio web server started on port ' + port);
