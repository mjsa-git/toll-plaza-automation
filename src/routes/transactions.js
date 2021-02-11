var express = require('express');
const { transactionEstimate, getTransactions, addTransaction } = require('../services/transaction.service');
var router = express.Router();

router.get('/estimate/:vehicleNo', async function (req, res, next) {
    
    res.send(await transactionEstimate(req.params.vehicleNo).catch(e => next(e)));
});

router.post('/collect', async function (req, res, next) {
    res.send(await addTransaction(req.body).catch(e => next(e)));
});

router.get('/recents', async function (req, res, next) {
    res.send(await getTransactions())
    
});

module.exports = router;
