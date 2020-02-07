const RESERVED_WORD = '5c7df95bcd19ac2d58fb4aa0';

const shortid = require('shortid');
const request = require('request');
const ShortURLModel = require('../models/shortURL.model');

exports.checkID = (req, res, next) => {
	const URL = req.body.url;
	if (!URL) return res.status(500).send({
		message: 'Missing a url. Please send it in the body with the key value of url'
	})

	let requestingURL = URL.trim();
	const splitURL = requestingURL.split("");

	// check to see if they added http
	const addedItems = splitURL[0] + splitURL[1] + splitURL[2] + splitURL[3];
	if (addedItems != 'http') {
		requestingURL = 'https://' + requestingURL;
	}

	let id = req.params.id;
	if (id === RESERVED_WORD || id === null || id === undefined) {
		id = shortid.generate();
	}
	id = encodeURIComponent(id);

	const reservedWordArray = req.app.get('bannedWords');

	let reservedWord = false;
	reservedWordArray.forEach(word => {
		if (id.includes(word)) {
			reservedWord = true;
		}
	})
	if (reservedWord) {
		return res.status(400).send({
			message: "Your message included a reserved word, please try again with a different key"
		})
	}

	ShortURLModel.findOne({ shortId: id }).then(resp => {
		if (resp) return res.send({ avail: false, websiteResp: false });

		request(requestingURL, (error, response) => {
			let message = null;
			let websiteResp = true;
			if (error != null) {
				message = "The website did not return a response. We still created your link but you may want to check";
				websiteResp = false;
			}
			const newURL = new ShortURLModel({
				shortId: id,
				url: requestingURL
			})
			newURL.save().then(resp => res.send({
				avail: true,
				websiteResp: websiteResp,
				resp: resp,
				message: message
			})).catch(err => res.status(500).send({ message: "There was a problem saving your item in the database" }))

		});
	}).catch(err => res.status(500).send({
		message: "We encountered an error. Please examine your data and retry"
	}));

}