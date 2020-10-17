const asyncHandler = require('../middleware/async');
const CurrencyRate = require('../models/CurrencyRate');
const Currency = require('../models/Currency');
const UserActivity = require('../models/UserActivity');
const { updateCurrencyList, updateCurrencyRates } = require('../controllers/updateDatabase');

exports.getRate = asyncHandler(async (req, res) => {
    await updateCurrencyList();
    await updateCurrencyRates();
    const { currency } = req.params;
    const dataFromDb = await CurrencyRate.findOne({ currency });
    const factor = dataFromDb.factor;
    res
        .status(200)
        .json({
            response: factor
        });
})

exports.getAvailableCurrencies = asyncHandler(async (req, res) => {
    await updateCurrencyList();
    await updateCurrencyRates();
    const availableCurrencies = await CurrencyRate.find({});
    const allCurrencies = await Currency.find({});
    const listCurrencies = [];
    availableCurrencies.map(elem1 => {
        allCurrencies.map(elem2 => {
            if (elem1.currency === elem2.name) {
                const listItem = {};
                listItem.id = elem2.name;
                listItem.lt = elem2.lt;
                listItem.en = elem2.en;
                listCurrencies.push(listItem);
            }
        })
    })
    res
        .status(200)
        .json({
            response: listCurrencies
        });
})
exports.logActivity = asyncHandler(async (req, res) => {
    const { currencies, amount, rate } = req.body;
    const date = new Date();
    const userActivity = await UserActivity.create({
        date,
        currencies,
        amount,
        rate
    });
    res
        .status(204)
})