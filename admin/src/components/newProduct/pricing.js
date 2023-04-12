import { useState } from "react";
import { BiPencil } from "react-icons/bi";

export default function Pricing({ skus, sku, setSkus }) {
	const styles = {
		pricingForm: "",
		pricingInputDivHalfLeft:
			"relative h-[50px]  mr-[5%] inline-block w-[45%] ",
		pricingInputDivHalfRight:
			"relative h-[50px]  ml-[5%] inline-block w-[45%] ",
		input: "lg:placeholder:text-body-md placeholder:capitalize placeholder:text-black placeholder:font-bold border-b-2 border-black w-full  focus-visible:outline-0 ",
		priceBtn:
			"px-[35px] my-[32px] py-[8px] rounded-full bg-black text-white font-bold text-body-md cursor-pointer w-fit ml-auto ",
		priceBox: "w-[200px] shadow-2xl p-5 rounded-[10px] ",
		priceEditIcon: "text-primary cursor-pointer ml-auto w-[20px] h-[20px] ",
		priceBoxHeader: "flex font-bold text-body-md",
		priceTitle: "",
		priceServing: "",
		price: "text-primary ml-auto",
	};

	const [isOpen, setIsOpen] = useState(true);
	const [price, setPrice] = useState();
	const [name, setName] = useState();
	const [serving, setServing] = useState();
	const submitHandler = () => {
		if (name && serving && price) {
			const newSku = skus.map((s) =>
				s.sku === sku ? { ...s, price, name, serving, sku } : s
			);
			setSkus(newSku);
			setIsOpen(false);
		} else {
			alert("Fill All ");
		}
	};
	return (
		<div>
			<div
				style={{ display: isOpen ? "block" : "none" }}
				className={styles.pricingForm}
			>
				<div className={styles.pricingInputDivHalfLeft}>
					<input
						type="text"
						name="name"
						onChange={(e) => setName(e.target.value)}
						placeholder="name"
						className={styles.input}
					/>
				</div>
				<div className={styles.pricingInputDivHalfRight}>
					<input
						type="number"
						name="price"
						onChange={(e) => setPrice(parseInt(e.target.value))}
						placeholder="price"
						className={styles.input}
					/>
				</div>
				<div className={styles.pricingInputDivHalfLeft}>
					<input
						type="number"
						name="serving"
						onChange={(e) => setServing(parseInt(e.target.value))}
						placeholder="Serving"
						className={styles.input}
					/>
				</div>
				<div className={styles.priceBtn} onClick={submitHandler}>
					Add Price
				</div>
			</div>

			<div
				style={{ display: isOpen ? "none" : "block" }}
				className={styles.priceBox}
			>
				<BiPencil
					onClick={() => setIsOpen(true)}
					className={styles.priceEditIcon}
				/>
				<div className={styles.priceBoxHeader}>
					<div className={styles.priceTitle}>{name}</div>
					<div className={styles.price}>৳{price}</div>
				</div>
				<div className={styles.priceServing}>For {serving} Person</div>
			</div>
		</div>
	);
}
