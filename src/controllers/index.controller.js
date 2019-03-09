const ShortURLModel = require('../models/shortURL.model');

exports.getIndex = (req, res, next) => {
	const MVC = req.app.get('MVC');
	MVC ? res.render('index') : res.status(200).send({ message: 'Please consult our api documents located at https://github.com/riderjensen/nodejs-url-shortner' });
}

exports.forwardRequest = (req, res, next) => {
	const id = req.params.id;
	ShortURLModel.findOne({ shortId: id }).then(resp => {
		if (resp === null) return res.status(500).send({
			message: 'We could not find any URL with this short id'
		});
		resp.visits = resp.visits + 1;
		resp.occurance.push(Date.now());
		resp.save().then(_ => {
			const MVC = req.app.get('MVC');
			MVC ? res.send(`<script>location.href = "${resp.url}"</script>`) : res.status(200).send({ url: resp.url });
		})
	})
}

