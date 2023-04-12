import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
	SingleImageUpload,
	GalleryImageUpload,
} from "../../axios/imageUpload.js";

const initialState = { isDeleted: false };

export const deleteItem = createAsyncThunk("product/deleteItem", async (id) => {
	const { data } = await axios.delete(
		`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/items/${id}`,
		{ withCredentials: true }
	);
});
export const createItem = createAsyncThunk(
	"items/createItems",
	async (options) => {
		const {
			name,
			description,
			stock,
			gallery: galleryImageFiles,
			featuredImage: featuredImageFile,
			categories,
			tags,
			skus,
		} = options;
		const gallery = await GalleryImageUpload(galleryImageFiles);
		const featuredImage = await GalleryImageUpload(featuredImageFile);
		console.log(gallery, featuredImage);

		const config = {
			withCredentials: true,
			headers: { "Content-Type": "application/json" },
		};

		const { data } = await axios.post(
			`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/admin/items/new`,
			{
				name,
				description,
				stock,

				gallery,
				featuredImage,
				categories,
				tags,
				skus,
			},
			config
		);
		console.log(data);
		return data;
	}
);

const itemsSlice = createSlice({
	name: "items",
	initialState,
	reducers: {
		resetDelete: (state, action) => {
			state.isDeleted = false;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(createItem.pending, (state, action) => {
				return {
					...state,
					loading: true,
					items: [],
				};
			})
			.addCase(createItem.fulfilled, (state, action) => {
				return {
					...state,
					...action.payload,
					success: true,
					loading: false,
				};
			})
			.addCase(createItem.rejected, (state, action) => {
				return {
					...state,
					loading: false,
					error: action.error.message,
				};
			})
			.addCase(deleteItem.fulfilled, (state, action) => {
				return {
					...state,
					isDeleted: true,
				};
			})
			.addCase(deleteItem.rejected, (state, action) => {
				return {
					...state,
					error: action.error.message,
				};
			});
	},
});
export const { resetDelete } = itemsSlice.actions;

export default itemsSlice.reducer;
