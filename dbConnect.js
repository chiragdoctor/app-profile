const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/profile', (err) => {
	if (err) {
		throw err;
	} else {
		console.log('Mongo DB Connected');
	}
});
