const User = require("../models/userModel");
const Location = require("../models/locationModel");
const ErrorHandler = require("../utils/errorHandler.js");
const catchAsyncError = require("../utils/catchAsyncError.js");
const ApiOptions = require("../utils/apiOptions");

//HOME LOCATION
exports.createHomeLoc = catchAsyncError(async (req, res, next) => {
	const { floorNo, apartmentNo, streetAddress, latlong, area, phone } =
		req.body;
	const userId = req.user.id;

	const homeloc = await Location.create({
		floorNo,
		apartmentNo,
		streetAddress,
		latlong,
		area,
		phone,
		user: userId,
	});

	const user = await User.findById(userId);
	user.homeLoc = homeloc._id;
	user.save();
	res.status(201).json({
		success: true,
		homeloc,
	});
});

//WORK LOCATION
exports.createWorkLoc = catchAsyncError(async (req, res, next) => {
	const { floorNo, apartmentNo, streetAddress, latlong, area, phone } =
		req.body;
	const userId = req.user.id;

	const workloc = await Location.create({
		floorNo,
		apartmentNo,
		streetAddress,
		latlong,
		area,
		phone,
		user: userId,
	});

	const user = await User.findById(userId);
	user.workLoc = workloc._id;
	user.save();
	res.status(201).json({
		success: true,
		workloc,
	});
});

//LOCATION
exports.createLoc = catchAsyncError(async (req, res, next) => {
	const { floorNo, apartmentNo, streetAddress, latlong, area, phone } =
		req.body;
	const userId = req.user.id;

	const loc = await Location.create({
		floorNo,
		apartmentNo,
		streetAddress,
		latlong,
		area,
		phone,
		user: userId,
	});

	const user = await User.findById(userId);
	user.locations.push(loc._id);
	user.save();
	res.status(201).json({
		success: true,
		loc,
	});
});
