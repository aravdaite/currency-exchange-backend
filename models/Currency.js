const mongoose = require('mongoose');

const CurrencySchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true],
		unique: true,
	},
	lt: {
		type: String,
		required: [true],
		unique: false,
	},
	en: {
		type: String,
		required: [true],
		unique: false,
	},
});

module.exports = mongoose.model('Currency', CurrencySchema);
