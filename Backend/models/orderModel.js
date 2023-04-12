const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
	location: {
		type: mongoose.Schema.ObjectId,
		ref: "Location",
		required: true,
	},
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
	deliveryDate: {
		type: Date,
		required: true,
	},
	deliveryTime: {
		type: String,
		required: true,
	},
	subTotal: {
		type: Number,
		required: true,
	},
	tax: {
		type: Number,
		required: true,
	},
	deliveryCharge: {
		type: Number,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	paymentType: {
		type: String,
		required: true,
	},
	paymentMethod: {
		type: String,
		required: true,
	},
	transactionId: {
		type: String,
		required: true,
	},
	status: {
		type: String,
		default: "processing",
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Order", orderSchema);
