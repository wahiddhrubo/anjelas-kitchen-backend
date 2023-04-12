import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	message: "",
	type: "",
	show: false,
};

const alertSlice = createSlice({
	name: "alert",
	initialState,
	reducers: {
		closeAlert: (state, action) => {
			state.message = "";
			state.type = "";
			state.show = false;
		},
		triggerAlert: (state, action) => {
			state.message = action.payload.message;
			state.type = action.payload.type;
			state.show = true;
		},
	},
});

export const { closeAlert, triggerAlert } = alertSlice.actions;

export default alertSlice.reducer;
