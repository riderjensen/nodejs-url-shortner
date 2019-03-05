const ShortURLModel = require('../models/shortURL.model');

exports.getAll = (req, res, next) => {
	ShortURLModel.find().then(resp => res.status(200).send(resp));
}

exports.getOne = (req, res, next) => {
	ShortURLModel.findOne({ shortId: req.params.id }).then(resp => {
		if (!resp) return res.status(500).send({ error: 'We could not find this item in the database' })
		res.status(200).send(resp);
	});
}