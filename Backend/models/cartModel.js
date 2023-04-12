const mongoose = require("mongoose");

const locSchema = mongoose.Schema({
	items: [
		{
			item: {
				type: mongoose.Schema.ObjectId,
				ref: "Item",
				required: true,
			},
			pricePerUnit: {
				type: Number,
				required: true,
			},
			quantity: {
				type: Number,
				required: true,
				max: 100,
			},
		},
	],

	updated_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Cart", locSchema);
