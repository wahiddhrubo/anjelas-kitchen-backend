const mongoose = require("mongoose");

const connectToDb = () => {
	mongoose
		.connect(process.env.MONGODB_URL, {})
		.then((data) => {
			console.log("MongoDb Running!!! ");
		})
		.catch((err) => {
			console.log({ error: err });
		});
};

module.exports = connectToDb;
