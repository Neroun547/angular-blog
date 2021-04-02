const express = require('express');
const app = express();
//Middleware
const angularHeaders = require('./middleware/headers-angular');
//Actions middleware
const actionsMiddleware = require('./middleware/actions');

app.use(angularHeaders);
app.use(actionsMiddleware);
app.listen(9000);