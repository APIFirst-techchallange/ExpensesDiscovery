
const express = require('express');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;
const cors = require('cors');

var customTransactionService = require("./services/customTransactionService");

const users = [];

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());

app.use(customTransactionService);

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});