const http = require('http');
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();
require('./dbMongo/mongoose');
const router = require('./router');
const controller = require('./socketInit');
const errorHandler = require('./errorHandler');
const errorsLogger = require('./utils/errorsLogger');
const logSchedule = require('./utils/logSchedule');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/public', express.static('public'));
app.use(router);
app.use(errorsLogger);
app.use(errorHandler);

cron.schedule('0 3 * * *', () => {
  logSchedule();
});

const server = http.createServer(app);
server.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
controller.createConnection(server);
