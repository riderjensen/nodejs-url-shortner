const ShortURLModel = require('../models/shortURL.model');

exports.getAll = (req, res, next) => {
	ShortURLModel.find().then(resp => {
		const MVC = req.app.get('MVC');
		MVC ? res.render('admin', {
			resp: resp
		}) : res.status(200).send(resp);
	});
}

exports.getOne = (req, res, next) => {
	ShortURLModel.findOne({ shortId: req.params.id }).then(resp => {
		if (!resp) return res.status(500).send({ message: 'We could not find this item in the database' });
		const MVC = req.app.get('MVC');
		MVC ? res.render('adminOne', {
			resp: resp
		}) : res.status(200).send(resp);
	});
}