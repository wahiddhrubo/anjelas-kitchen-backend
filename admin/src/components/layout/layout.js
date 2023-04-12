import Sidebar from "./sidebar.js";
import { Navigate, useNavigate } from "react-router-dom";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewProduct from "../newProduct/index.js";
import NewUser from "../newUser/index.js";
import Products from "../products/index.js";
import Users from "../users/index.js";
import Orders from "../orders/index.js";
import NotFound from "../notFound.js";

export default function Layout() {
	const links = [
		{ name: "dashboard", link: "/" },
		{ name: "orders", link: "/orders" },
		{ name: "products", link: "/products" },
		{ name: "users", link: "/users" },
	];
	const adds = [
		{ name: "Add user", link: "/users/new" },
		{ name: "New Item", link: "/products/new" },
	];
	return (
		<div>
			<Sidebar links={links} addLinks={adds} />
			<div className="md:ml-64">
				<Routes>
					<Route path="/" element={<NewProduct />} />
					<Route path="/products" element={<Products />} />
					<Route path="/products/:id" element={<Products />} />
					<Route path="/products/new" element={<NewProduct />} />
					<Route path="/orders" element={<Orders />} />
					<Route path="/users" element={<Users />} />
					<Route path="/users/new" element={<NewUser />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</div>
	);
}
