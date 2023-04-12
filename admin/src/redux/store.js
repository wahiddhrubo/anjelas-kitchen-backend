import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./slice/items.js";
import usersSlice from "./slice/users.js";
import authSlice from "./slice/authentication.js";
import getItemsSlice from "./slice/getItems.js";
import alertSlice from "./slice/alert.js";
import ordersSlice from "./slice/orders.js";

const store = configureStore({
   reducer: {
      items: itemsSlice,
      getItems: getItemsSlice,
      auth: authSlice,
      users: usersSlice,
      orders: ordersSlice,
      alert: alertSlice,
   },
});

export default store;
