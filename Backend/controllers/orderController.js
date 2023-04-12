const Order = require("../models/orderModel.js");
const ErrorHandler = require("../utils/errorHandler.js");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const Location = require("../models/locationModel");
const Item = require("../models/itemsModel.js");
const catchAsyncError = require("../utils/catchAsyncError.js");

//CREATE ORDERS
exports.createOrder = catchAsyncError(async (req, res, next) => {
	const {
		location,
		deliveryCharge,
		paymentType,
		taxRate,
		paymentMethod,
		transactionId,
		deliveryDate,
		deliveryTime,
	} = req.body;

	const user = await User.findById(req.user.id);
	const cart = await Cart.findById(user.cart);
	const subTotal = cart.items.reduce(
		(total, i) => total + i.quantity * i.pricePerUnit,
		0
	);
	const tax = taxRate * 0.01 * subTotal;
	const total = subTotal + tax + deliveryCharge;

	const order = await Order.create({
		location,
		subTotal,
		deliveryCharge,
		tax,
		total,
		paymentType,
		paymentMethod,
		transactionId,
		deliveryDate,
		deliveryTime,
		items: cart.items,
		user: user._id,
	});
	user.orders.push(order._id);
	user.save();
	cart.items = [];
	cart.save();

	res.status(201).json({
		success: true,
		order,
	});
});

//GET ALL ORDERS --USER
exports.getAllUserOrders = catchAsyncError(async (req, res, next) => {
	const populateQuery = [
		{
			path: "user",
			model: User,
			select: { username: 1, _id: 1 },
		},
		{
			path: "location",
			model: Location,
			select: { phone: 1, area: 1, streetAddress: 1, _id: 1 },
		},
		{
			path: "items.item",
			model: Item,
			select: { name: 1, _id: 0 },
		},
	];

	const user = req.user.id;
	const orders = await Order.find({ user }).populate(populateQuery).lean();
	res.status(201).json({
		success: true,
		orders,
	});
});

//GET SINGLE ORDER --USER
exports.getSingleUserOrders = catchAsyncError(async (req, res, next) => {
	const user = req.user.id;
	const { id } = req.params;
	console.log("hello");

	const orders = await Order.findOne({ user, id });
	res.status(201).json({
		success: true,
		orders,
		id,
		user,
	});
});

//GET ALL ORDERS BY STATUS --USER
exports.getAllUserOrdersByStatus = catchAsyncError(async (req, res, next) => {
	const populateQuery = {
		path: "user",
		model: User,
		select: { username: 1, _id: 1 },
	};

	const user = req.user.id;
	const { status } = req.params;
	const orders = await Order.find({ user, status })
		.populate(populateQuery)
		.lean();
	res.status(201).json({
		success: true,
		orders,
	});
});

//GET ALL ORDERS --ADMIN
exports.getAllOrders = catchAsyncError(async (req, res, next) => {
	const populateQuery = [
		{
			path: "user",
			model: User,
			select: { username: 1, _id: 1 },
		},
		{
			path: "location",
			model: Location,
			select: { phone: 1, area: 1, streetAddress: 1, _id: 1 },
		},
		{
			path: "items.item",
			model: Item,
			select: { name: 1, _id: 0 },
		},
	];

	const orders = await Order.find({}).populate(populateQuery).lean();
	res.status(201).json({
		success: true,
		orders,
	});
});

//GET SINGLE ORDER --ADMIN
exports.getSingleOrders = catchAsyncError(async (req, res, next) => {
	const { id } = req.params;
	const orders = await Order.findById(id);
	res.status(201).json({
		success: true,
		orders,
	});
});

//GET ALL ORDERS BY STATUS --ADMIN
exports.getAllOrdersByStatus = catchAsyncError(async (req, res, next) => {
	const { status } = req.params;
	const orders = await Order.find({ status });
	res.status(201).json({
		success: true,
		orders,
	});
});

//UPDATE ORDER  STATUS --ADMIN
exports.updateOrderStatus = catchAsyncError(async (req, res, next) => {
	const { status } = req.body;
	const { id } = req.params;
	const orders = await Order.findByIdAndUpdate(id, { status });
	res.status(201).json({
		success: true,
		orders,
	});
});
