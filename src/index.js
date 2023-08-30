const express = require('express');
const responseTime = require('response-time');
const router = require('./routes');

const app = express();
app.use(responseTime());
app.use(router);

app.listen(3000, () => {
  console.log('Server is running in http://localhost:3000');
});
