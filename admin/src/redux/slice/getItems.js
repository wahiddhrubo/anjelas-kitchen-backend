import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const getAllItems = createAsyncThunk(
	"getItems/getAllItems",
	async (options) => {
		const {
			keyword,
			categories,
			tags,
			maxRating,
			minRating,
			minStock,
			maxStock,
			minPrice,
			maxPrice,
			limit,
		} = options;
		const itemPerPage = limit || 10;
		const url = new URL(
			`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/items`
		);
		const params = new URLSearchParams(url.search);

		params.set("keyword", keyword || "");
		params.set("categories", categories || "");
		params.set("tags", tags || "");
		params.set("maxRating", maxRating || "");
		params.set("minRating", minRating || "");
		params.set("minStock", minStock || "");
		params.set("maxStock", maxStock || "");
		params.set("minPrice", minPrice || "");
		params.set("maxPrice", maxPrice || "");
		params.set("itemPerPage", itemPerPage);

		const { data } = await axios.get(`${url}?${params}`);

		const { metadata, data: items } = data.items[0];
		const { total: numOfItems } = metadata[0];

		const totalPages = Math.ceil(numOfItems / itemPerPage);
		const result = { items, numOfItems, itemPerPage, totalPages };
		return result;
	}
);

const getItemsSlice = createSlice({
	name: "getAllItems",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getAllItems.pending, (state, action) => {
				return {
					...state,
					loading: true,
					items: [],
				};
			})
			.addCase(getAllItems.fulfilled, (state, action) => {
				return {
					...state,
					...action.payload,
					loading: false,
				};
			})
			.addCase(getAllItems.rejected, (state, action) => {
				return {
					...state,
					loading: false,
					error: action.error.message,
				};
			});
	},
});

export default getItemsSlice.reducer;
