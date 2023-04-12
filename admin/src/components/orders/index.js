import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { getAllOrders } from "../../redux/slice/orders.js";

import { triggerAlert } from "../../redux/slice/alert.js";
import Pagination from "../layoutComponents/pagination.js";

import DropDown from "./dropDown.js";

export default function Orders({ history }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchParams, setSearchParams] = useSearchParams();

	const { orders, isUpdated, error, loading } = useSelector(
		(state) => state.orders
	);

	const styles = {
		wrapper:
			"relative w-[85%] my-10 mx-auto flex flex-col min-w-0 break-words  mb-6 shadow-lg rounded bg-slate-800 text-white",
		table: "items-center w-full bg-transparent border-collapse",
		tableHeader:
			"px-6 align-middle border border-solid py-3 text-center text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700",
		productTitle:
			"px-6 h-full my-auto align-middle text-left flex items-center py-[25px] text-xs uppercase   whitespace-nowrap font-semibold text-left bg-lightBlue-800 text-lightBlue-300 border-lightBlue-700",
		tableData:
			"border-t-0 px-6 capitalize align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4",
		thumb: "h-12 w-12  rounded-full border",
		searchDiv: "w-[85%] my-8 text-right ",
		input: "placeholder:font-semibold rounded-l-full py-[4px] px-4 placeholder:text-black border-2 border-slate-800 ",
		search: "px-8 py-[5.5px]  font-semibold bg-slate-800 rounded-r-full text-white ",
	};
	const convertDate = (dt) => {
		const newDateOptions = {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		};
		return Date(dt).toLocaleString("en-US", newDateOptions);
	};

	useEffect(() => {
		dispatch(getAllOrders({}));
		if (isUpdated) {
			dispatch(
				triggerAlert({
					message: `Order Updated Successfully`,
					type: "success",
				})
			);
		}
	}, [isUpdated]);

	return (
		<div>
			<div className={styles.wrapper}>
				<h3 className="font-semibold text-body-lg text-center py-3 text-white">
					Availiable Items
				</h3>

				<div className="block w-full overflow-x-auto text-center">
					<table className={styles.table}>
						<thead>
							<tr className="my-2">
								<th className={styles.tableHeader}>Id</th>
								<th className={styles.tableHeader}>User</th>
								<th className={styles.tableHeader}>Phone</th>
								<th className={styles.tableHeader}>Location</th>
								<th className={styles.tableHeader}>Status</th>
								<th className={styles.tableHeader}>Order At</th>
								<th className={styles.tableHeader}>
									Delivery Date
								</th>
								<th className={styles.tableHeader}>
									Delivery Time
								</th>
								<th className={styles.tableHeader}>Total</th>
								<th className={styles.tableHeader}></th>
							</tr>
						</thead>
						<tbody>
							{orders?.map((o) => (
								<tr key={o._id}>
									<td className={styles.tableData}>
										{o._id}
									</td>
									<td className={styles.tableData}>
										{o.user?.username}
									</td>
									<td className={styles.tableData}>
										{o.location.phone}
									</td>
									<td className={styles.tableData}>
										{`${o.location.streetAddress},${o.location.area}`}
									</td>
									<td className={styles.tableData}>
										<span
											className={
												o.status === "processing"
													? "text-yellow-500"
													: o.status === "cancelled"
													? "text-red-500"
													: o.status === "delivered"
													? "text-green-500"
													: ""
											}
										>
											{o.status}
										</span>{" "}
									</td>
									<td className={styles.tableData}>
										{o.created_at.split("T")[0]}
									</td>
									<td className={styles.tableData}>
										{o.deliveryDate.split("T")[0]}
									</td>
									<td className={styles.tableData}>
										{o.deliveryTime}
									</td>
									<td className={styles.tableData}>
										{o.total}
									</td>
									<td
										className={
											styles.tableData + " text-right "
										}
									>
										<DropDown id={o._id} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
}
