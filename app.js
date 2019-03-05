// EDIT THESE VARIABLES TO WORK WITH YOUR SERVER CONFIGURATION
// ======================================

const PORT = 3000;
const DB_NAME = 'nodejsLinkShortner';
const BANNED_WORDS = ['cunt', 'fuck'];

// This is reserved for creating items
const RESERVED_WORD = '5c7df95bcd19ac2d58fb4aa0';

// ======================================


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({
	extended: false,
	useNewUrlParser: true
}));

const adminRouter = require('./src/routes/admin.router');
const checkRouter = require('./src/routes/check.router');
const indexRouter = require('./src/routes/index.router');

app.use('/a', adminRouter);
app.use('/c', checkRouter);
app.use('/', indexRouter);
app.use('*', (req, res, next) => {
	res.redirect('/');
})


mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`, {
	useNewUrlParser: true
}).then(_ => {
	app.listen(PORT, () => console.log(`App is running on ${PORT}`));

}).catch(err => console.log('Cant connect to the DB'))