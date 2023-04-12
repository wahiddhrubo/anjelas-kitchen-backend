import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { isDeleted: false, loading: false };

export const getAllUsers = createAsyncThunk(
	"getUsers/getAllUsers",
	async (options) => {
		const { keyword } = options;
		const { data } = await axios.get(
			`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/admin/users?keyword=${keyword}`,
			{ withCredentials: true }
		);
		const { users } = data;
		return { users };
	}
);

export const createAdminUser = createAsyncThunk(
	"users/createAdminUser",
	async (options, { rejectWithValue }) => {
		const config = {
			headers: { "Content-Type": "application/json" },
			withCredentials: true,
		};
		const { email, password, name } = options;
		console.log({ email, password, username: name });
		try {
			const { data } = await axios.post(
				`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/admin/users`,
				{ email, password, username: name },
				config
			);
		} catch (err) {
			return rejectWithValue(err.response.data);
		}
	}
);

export const deleteUsers = createAsyncThunk(
	"getUsers/deleteUsers",
	async (id) => {
		const { data } = await axios.delete(
			`${process.env.REACT_APP_BACKEND_SERVER}/api/v1/admin/users/${id}`,
			{ withCredentials: true }
		);
	}
);

const usersSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		resetDelete: (state, action) => {
			state.isDeleted = false;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAllUsers.pending, (state, action) => {
				return {
					...state,
					loading: true,
					users: [],
				};
			})
			.addCase(getAllUsers.fulfilled, (state, action) => {
				return {
					...state,
					...action.payload,
					loading: false,
				};
			})
			.addCase(getAllUsers.rejected, (state, action) => {
				return {
					...state,
					loading: false,
					error: action.error.message,
				};
			})
			.addCase(createAdminUser.fulfilled, (state, action) => {
				console.log(action);
				return {
					...state,
					...action.payload,

					success: true,
				};
			})
			.addCase(createAdminUser.rejected, (state, action) => {
				console.log(action);
				return {
					...state,
					loading: false,
					error: action.payload.message,
				};
			})
			.addCase(deleteUsers.fulfilled, (state, action) => {
				return {
					...state,
					isDeleted: true,
				};
			})
			.addCase(deleteUsers.rejected, (state, action) => {
				return {
					...state,
					loading: false,
					error: action.error.message,
				};
			});
	},
});
export const { resetDelete } = usersSlice.actions;

export default usersSlice.reducer;
