const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	featuredImage: {
		public_id: {
			type: String,
			required: true,
		},
		url: {
			type: String,
			required: true,
		},
		created_at: {
			type: Date,
		},
	},

	gallery: [
		{
			public_id: {
				type: String,
				required: true,
			},
			url: {
				type: String,
				required: true,
			},
			created_at: {
				type: Date,
			},
		},
	],
	categories: {
		type: [String],
		required: true,
	},
	tags: {
		type: [String],
	},
	skus: [
		{
			name: {
				type: String,
				required: true,
			},
			price: {
				type: Number,
				required: true,
				min: 100,
			},
			serving: {
				type: Number,
				required: true,
				min: 1,
				max: 20,
			},
			sku: {
				type: Number,
				required: true,
			},
		},
	],
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},

	reviews: [
		{
			name: {
				type: String,
				required: true,
			},
			comment: {
				type: String,
				required: true,
			},
			rating: {
				type: Number,
				required: true,
				min: 1,
				max: 5,
			},
		},
	],
	created_at: {
		type: Date,
		default: Date.now,
	},
});

module.exports = mongoose.model("Item", itemSchema);
