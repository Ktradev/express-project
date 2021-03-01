const express = require('express');
const app = express();
const port = 3000;

const timeline = require('./routes/timeline');
const library = require('./routes/library');
const contact = require('./routes/contact');

const ApiError = require('./ApiError');

app.get('/', (req, res) => {
	res.send('Hello World!')
})

app.use('/timeline', timeline);
app.use('/library', library);
app.use('/contact', contact);


//Error handler
app.use((err, req, res, next) => {
	if(err instanceof ApiError){
		res.status(err.code).json(err.message);
		return;
	}

	res.status(500).json(err.message);
})

app.listen(port, () => {
	console.log(`Listening at ${port}`)
})