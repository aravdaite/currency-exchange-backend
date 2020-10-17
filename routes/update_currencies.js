const express = require('express');
const { getRate, getAvailableCurrencies, logActivity } = require('../controllers/api_methods');

const router = express.Router();

router.get('/rate/:currency', getRate);
router.get('/get/currencies', getAvailableCurrencies);
router.post('/activity', logActivity);

module.exports = router;