const express = require('express');
const app = express();
var router = express.Router();
// import customTransactionData from "./mock-data/customTransactions.json";

// // token_endpoint = 'http://localhost:8080/open-banking/v3/token';
// // access_consent_endpoint = 'http://localhost:8080/open-banking/v3.1/aisp/account-access-consents';
// // authorise_consent_uri_endpoint = 'http://localhost:8080/open-banking/v3.1/aisp/authorization.oauth2?request=';

var jsonFIle = require("../mock-data/customTransactions.json"); // path of your json file

app.get('/api/v1/getCustomTransactions', (req,res) => {
    res.status(200).json(jsonFIle);
});

module.exports = app;


// router.get("/api/v1/getCustomTransactions", function(req, res, next) {
//   res.json(jsonFIle);
// });

// module.exports = router;