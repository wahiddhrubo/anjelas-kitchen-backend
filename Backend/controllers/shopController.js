const Item = require("../models/itemsModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../utils/catchAsyncError.js");
const ApiOptions = require("../utils/apiOptions");
const User = require("../models/userModel");

exports.createItem = catchAsyncError(async (req, res, next) => {
	const user = await User.findById(req.user.id);
	const item = await Item.create({ ...req.body, user: req.user.id });
	res.status(201).json({
		success: true,
		item,
	});
});

//GET ALL PRODUCTS WITH CATEGORIES AND PAGINATION -- USERS
exports.getAllItems = catchAsyncError(async (req, res) => {
	const limit = parseInt(req.query.itemPerPage) || 10;
	const page = parseInt(req.query.page) || 1;

	const filteredItemsApi = new ApiOptions(req.query).searchAndFilterOptions(
		page,
		limit
	);

	const { matchOptions, groupOptions, facet } = filteredItemsApi;

	let items = await Item.aggregate([
		{ $match: matchOptions },
		{
			$unwind: "$reviews",
		},
		{ $group: groupOptions },

		{ $facet: facet },
	]);

	items = await Item.populate(items, {
		path: "data.user",
		select: "username",
		model: User,
	});

	res.status(201).json({
		success: true,
		items,
	});
});

exports.updateItem = catchAsyncError(async (req, res, next) => {
	let item = await Item.findById(req.params.id);
	if (!item) {
		return next(new ErrorHandler("Item not found", 404));
	}
	item = await Item.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
		runValidator: true,
		useFindAndModify: false,
	});
	res.status(201).json({
		success: true,
		item,
	});
});

exports.deleteItem = catchAsyncError(async (req, res, next) => {
	let item = await Item.findById(req.params.id);
	if (!item) {
		return next(new ErrorHandler("Item not found", 404));
	}
	await item.remove();

	res.status(201).json({
		success: true,
		message: "Item removed successfully",
	});
});

exports.getSingleItem = catchAsyncError(async (req, res, next) => {
	let item = await Item.findById(req.params.id);
	if (!item) {
		return next(new ErrorHandler("Item not found", 404));
	}

	res.status(201).json({
		success: true,
		item,
	});
});
