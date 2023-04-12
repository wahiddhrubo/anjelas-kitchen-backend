import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { createItem } from "../../redux/slice/items.js";
import { getAllItems } from "../../redux/slice/getItems.js";

import { triggerAlert } from "../../redux/slice/alert.js";
import Pagination from "../layoutComponents/pagination.js";

import DropDown from "./dropDown.js";

export default function Products({ history }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [keyword, setKeyword] = useState("");
	const [page, setPage] = useState(1);
	const [limit, setLimit] = useState(10);
	const [searchParams, setSearchParams] = useSearchParams();

	const { loading, error, items, numOfItems, itemPerPage, totalPages } =
		useSelector((state) => state.getItems);

	const { isDeleted } = useSelector((state) => state.items);

	const searchHandler = () => {
		searchParams.set("keyword", keyword);
		setSearchParams(searchParams);
	};
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
		dispatch(getAllItems({ keyword, page, limit }));
		if (isDeleted) {
			dispatch(
				triggerAlert({
					message: `Item Removed Successfully`,
					type: "success",
				})
			);
		}
	}, [keyword, page, limit, isDeleted]);

	return (
		<div>
			<div className={styles.searchDiv}>
				<input
					type="text"
					name="Search"
					className={styles.input}
					placeholder="Search..."
					onChange={(e) => setKeyword(e.target.value)}
					id="Search"
				/>
				<button onClick={searchHandler} className={styles.search}>
					Search
				</button>
			</div>
			<div className={styles.wrapper}>
				<h3 className="font-semibold text-body-lg text-center py-3 text-white">
					Availiable Items
				</h3>

				<div className="block w-full overflow-x-auto text-center">
					<table className={styles.table}>
						<thead>
							<tr className="my-2">
								<th className={styles.tableHeader}>Name</th>
								<th className={styles.tableHeader}>Price</th>
								<th className={styles.tableHeader}>Stock</th>
								<th className={styles.tableHeader}>
									Categories
								</th>
								<th className={styles.tableHeader}>Tags</th>
								<th className={styles.tableHeader}>
									Created At
								</th>
								<th className={styles.tableHeader}>
									Created By
								</th>
								<th className={styles.tableHeader}></th>
							</tr>
						</thead>
						<tbody>
							{items?.map((i) => (
								<tr key={i._id}>
									<th className={styles.productTitle}>
										<img
											// src={i.featuredImage.url}
											className={styles.thumb}
											alt={i.name}
										></img>
										<span className="ml-3 font-bold text-white">
											{i.name}
										</span>
									</th>
									<td className={styles.tableData}>
										{i.price.min === i.price.max
											? i.price.min
											: `${i.price.min} - ${i.price.max}`}
									</td>
									<td className={styles.tableData}>
										{i.stocks}
									</td>
									<td className={styles.tableData}>
										{i.category?.join(", ")}
									</td>
									<td className={styles.tableData}>
										{i.tags?.join(", ")}
									</td>
									<td className={styles.tableData}>
										{i.createdAt.split("T")[0]}
									</td>
									<td className={styles.tableData}>
										{i.user.username}
									</td>
									<td
										className={
											styles.tableData + " text-right "
										}
									>
										<DropDown id={i._id} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
			<Pagination
				totalPages={totalPages}
				currentPage={page}
				setPage={setPage}
			/>
		</div>
	);
}
