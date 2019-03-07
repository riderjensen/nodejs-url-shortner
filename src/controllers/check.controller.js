const RESERVED_WORD = '5c7df95bcd19ac2d58fb4aa0';


const shortid = require('shortid');
const request = require('request');
const ShortURLModel = require('../models/shortURL.model');

exports.checkID = (req, res, next) => {
	const URL = req.body.url;
	if (!URL) return res.status(500).send({
		error: 'Missing a url. Please send it in the body with the key value of url'
	})

	let requestingURL = URL.trim();
	const splitURL = requestingURL.split("");

	// check to see if they added http
	const addedItems = splitURL[0] + splitURL[1] + splitURL[2] + splitURL[3];
	if (addedItems != 'http') {
		requestingURL = 'http://' + requestingURL;
	}

	let id = req.params.id;
	if (id === RESERVED_WORD) {
		id = shortid.generate();
	}
	ShortURLModel.findOne({ shortId: id }).then(resp => {
		if (resp) return res.send({ avail: false, websiteResp: false });

		request(requestingURL, (error, response) => {
			if (error != null) {
				console.log(error)
				return res.send({
					avail: true,
					websiteResp: false
				});
			} else {
				const newURL = new ShortURLModel({
					shortId: id,
					url: requestingURL
				})
				newURL.save().then(resp => res.send({
					avail: true,
					websiteResp: true,
					resp: resp
				}));
			}
		});
	}).catch(err => res.status(500).send({
		error: "We encountered an error. Please examine your data and retry"
	}));

}