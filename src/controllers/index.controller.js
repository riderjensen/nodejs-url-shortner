const ShortURLModel = require('../models/shortURL.model');

exports.getIndex = (req, res, next) => {
	res.send('Homepage');
}

exports.forwardRequest = (req, res, next) => {
	const id = req.params.id;
	ShortURLModel.findOne({ shortId: id }).then(resp => {
		if (resp === null) return res.status(500).send({
			error: 'We could not find any URL with this short id'
		});
		resp.visits = resp.visits + 1;
		resp.occurance.push(Date.now());
		resp.save().then(_ => {
			res.status(200).send({
				url: resp.url
			});
		})
	})
}

