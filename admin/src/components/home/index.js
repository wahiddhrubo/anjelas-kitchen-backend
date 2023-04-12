import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { login } from "../../redux/slice/authentication.js";
import { createItem } from "../../redux/slice/items.js";

export default function Form({ history }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isAdmin, isAuthenticated, user } = useSelector(
		(state) => state.auth
	);
	const styles = {
		wrapper: " w-3/4 mx-auto ",
		title: "text-heading-lg font-bold text-black mx-auto capitalize  text-center my-[62px] ",
		inputDivHalfLeft: "relative h-[50px] mr-[5%] inline-block w-[45%] ",
		inputDivHalfRight: "relative h-[50px] ml-[5%] inline-block w-[45%] ",
		input: "lg:placeholder:text-body-md placeholder:capitalize placeholder:text-black placeholder:font-bold border-b-2 border-black w-full  focus-visible:outline-0 ",
		textarea:
			"lg:placeholder:text-body-md my-[62px] placeholder:capitalize p-5 placeholder:text-black placeholder:font-bold border-2 border-black w-full  focus-visible:outline-0 ",
		selectDiv: "capitalize text-black font-bold bo text-body-md ",
		subHeading:
			"text-body-lg w-fit mb-[32px] capitalize text-black font-bold ",
		addPriceBtn:
			"w-fit w-[35px] cursor-pointer justify-center ml-5 h-[35px] text-center flex flex-wrap content-center rounded-full bg-primary text-white font-bold text-body-lg inline ",
		select: " text-black !border-0 outline-0  font-bold !border-b-2 !border-black w-full  focus-visible:outline-0 ",
		indicator: "bg-none",
		option: "text-body-md capitalize font-medium text-black",
		btn: "px-[35px] my-[32px] py-[8px] rounded-full bg-primary text-white font-bold text-body-md cursor-pointer w-fit ml-auto ",
	};

	const [name, setName] = useState();
	const [stock, setStock] = useState();
	const [description, setDescription] = useState();
	const [tags, setTags] = useState([]);
	const [categories, setCategories] = useState([]);
	const [skus, setSkus] = useState([]);
	const [skuId, setSkuId] = useState([]);

	const submitHandler = () => {
		console.log({});
	};
	const addSkuId = () => {
		const skuLength = skuId.length + 1;
		setSkuId((prev) => [...prev, { id: skuLength }]);
		setSkus((prev) => [...prev, { sku: skuLength }]);
	};

	const categoriesOpt = [
		{ value: "Bengali", label: "Bengali" },
		{ value: "Thai", label: "Thai" },
		{ value: "Chinese", label: "Chinese" },
		{ value: "Indian", label: "Indian" },
	];
	const tagsOpt = [
		{ value: "Bengali", label: "Bengali" },
		{ value: "Thai", label: "Thai" },
		{ value: "Chinese", label: "Chinese" },
		{ value: "Indian", label: "Indian" },
	];
	const handleLogin = () => {
		dispatch(
			login({ email: "wahiddhrubo01@gmail.com", password: "01963322783" })
		);
	};
	const submitHandler = () => {
		dispatch(
			createItem({
				name,
				stock,
				description,
				tags,
				categories,
				skus,
				images: [
					{
						public_id: "test",
						url: "test url",
					},
				],
			})
		);
	};

	return (
		<div></div>
		// <div className={styles.wrapper}>
		// 	<div className={styles.title}>Add New Item </div>
		// 	<div className={styles.inputDivHalfLeft}>
		// 		<input
		// 			type="text"
		// 			name="name"
		// 			placeholder="name"
		// 			className={styles.input}
		// 		/>
		// 	</div>
		// 	<div className={styles.inputDivHalfRight}>
		// 		<input
		// 			type="text"
		// 			name="stock"
		// 			placeholder="stock"
		// 			className={styles.input}
		// 		/>
		// 	</div>
		// 	<div className={styles.inputDiv}>
		// 		<textarea
		// 			rows="5"
		// 			type="text"
		// 			name="description"
		// 			placeholder="description"
		// 			className={styles.textarea}
		// 		/>
		// 	</div>
		// 	<div className="flex">
		// 		<div className={styles.subHeading}>Add Pricing</div>
		// 		<div className={styles.addPriceBtn} onClick={addSkuId}>
		// 			{" "}
		// 			+{" "}
		// 		</div>
		// 	</div>
		// 	<div className="flex flex-wrap gap-[15%] ">
		// 		{skuId.map((s, index) => (
		// 			<Pricing
		// 				skus={skus}
		// 				key={index}
		// 				sku={s.id}
		// 				setSkus={setSkus}
		// 			/>
		// 		))}
		// 	</div>
		// 	<div className="my-[64px]">
		// 		<div className={styles.inputDivHalfLeft}>
		// 			<Select
		// 				isMulti
		// 				name="tags"
		// 				placeholder="Categories"
		// 				options={categoriesOpt}
		// 				classNames={{
		// 					control: (state) => styles.select,
		// 					placeholder: (state) => "!text-black ",
		// 					option: (state) => styles.option,
		// 				}}
		// 				closeMenuOnSelect={false}
		// 				classNamePrefix="select"
		// 			/>
		// 		</div>
		// 		<div className={styles.inputDivHalfRight}>
		// 			<Select
		// 				isMulti
		// 				name="tags"
		// 				placeholder="Tags"
		// 				options={tagsOpt}
		// 				classNames={{
		// 					control: (state) => styles.select,
		// 					placeholder: (state) => "!text-black ",
		// 					option: (state) => styles.option,
		// 				}}
		// 				closeMenuOnSelect={false}
		// 				classNamePrefix="select"
		// 			/>
		// 		</div>
		// 	</div>
		// 	<div className={styles.btn} onClick={submitHandler}>
		// 		Create New Item
		// 	</div>
		// </div>
	);
}
