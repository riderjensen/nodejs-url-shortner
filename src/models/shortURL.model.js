const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShortURLModel = new Schema({
	shortId: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	visits: {
		type: Number,
		required: true,
		default: 0,
	},
	occurance: {
		type: Array,
		required: false,
		default: []
	}
}, { timestamps: true });

module.exports = mongoose.model('ShortURL', ShortURLModel);