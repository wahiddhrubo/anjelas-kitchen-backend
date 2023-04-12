import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { isUpdated: false };

const config = {
	headers: { "Content-Type": "application/json" },
	withCredentials: true,
};

export const getAllOrders = createAsyncThunk(
	"orders/getAllOrders",
	async (options) => {
		const { status, id } = options;

		const url = new URL(
			`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/admin/orders`
		);
		const params = new URLSearchParams(url.search);

		params.set("id", id || "");
		params.set("status", status || "");

		const { data } = await axios.get(`${url}?${params}`, {
			withCredentials: true,
		});

		const { orders } = data;
		return { orders };
	}
);

export const updateOrderStatus = createAsyncThunk(
	"orders/updateOrderStatus",
	async (options) => {
		const { status, id } = options;

		const { data } = await axios.post(
			`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/admin/orders/${id}`,
			{ status },
			config
		);
	}
);

const ordersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetStatus: (state, action) => {
			state.isUpdated = false;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAllOrders.pending, (state, action) => {
				return {
					...state,
					loading: true,
					orders: [],
				};
			})
			.addCase(getAllOrders.fulfilled, (state, action) => {
				console.log(action);
				return {
					...state,
					...action.payload,
					loading: false,
				};
			})
			.addCase(getAllOrders.rejected, (state, action) => {
				console.log(action);
				return {
					...state,
					loading: false,
					error: action.error.message,
				};
			})
			.addCase(updateOrderStatus.fulfilled, (state, action) => {
				return {
					...state,
					isUpdated: true,
				};
			})
			.addCase(updateOrderStatus.rejected, (state, action) => {
				console.log(action);
				return {
					...state,
					loading: false,
					error: action.error.message,
				};
			});
	},
});
export const { resetStatus } = ordersSlice.actions;

export default ordersSlice.reducer;
