// EDIT THESE VARIABLES TO WORK WITH YOUR SERVER CONFIGURATION
// ======================================

const PORT = process.env.PORT || 3000;
const BANNED_WORDS = ['a', 'c', 'cunt', 'fuck'];

const MVC = true;

const AUTH = false;

// add or delete users, only in affect when AUTH is true
const USERS = [{
	name: 'admin',
	password: 'admin'
},

]

// ======================================


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static(`public`));
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
	extended: false,
	useNewUrlParser: true
}));
app.use(bodyParser.json())

app.set("bannedWords", BANNED_WORDS);
app.set("MVC", MVC);

if (AUTH) {
	app.use((req, res, next) => {
		checkAuthState(req) ? next() : res.status(401).send({ error: 'You are not authorized to access this content. Please send your username and password as headers.' })
	})
}

function checkAuthState(req) {
	let authState = false;
	USERS.forEach(user => {
		if (req.headers.name === user.name && req.headers.password === user.password) {
			authState = true;
		}
	})
	return authState;
}

const adminRouter = require('./src/routes/admin.router');
const checkRouter = require('./src/routes/check.router');
const indexRouter = require('./src/routes/index.router');

app.use('/a', adminRouter);
app.use('/c', checkRouter);
app.use('/', indexRouter);
app.use('*', (req, res, next) => {
	res.redirect('/');
});


mongoose.connect(`mongodb+srv://${process.env.DBusername}:${process.env.DBpassword}@cluster0-b5ytq.mongodb.net/test?retryWrites=true&w=majority`, {
	useNewUrlParser: true
}).then(_ => {
	app.listen(PORT, () => console.log(`App is running on ${PORT}`));

}).catch(err => console.log('Cant connect to the DB'))