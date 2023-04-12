import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { triggerAlert } from "../../redux/slice/alert.js";
import { createAdminUser } from "../../redux/slice/users.js";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { checkEmptyField } from "../../utils/checkEmptyField.js";

export default function NewUser({ history }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const styles = {
		input: "w-full border-2 my-[16px] rounded-[5px] px-5 placeholder:capitalize border-black py-[10px] placeholder:text-black placeholder:font-semibold placeholder:text-body-md ",
		icon: "w-8 h-8 absolute inset-y-0 my-auto right-5 cursor-pointer",
	};

	const { loading, error, success } = useSelector((state) => state.users);

	const [name, setName] = useState();
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [showPassword, setShowPassword] = useState(false);

	const fields = {
		Name: name,
		Email: email,
		Password: password,
	};

	useEffect(() => {
		if (success) {
			dispatch(
				triggerAlert({
					message: "User Created Successfully",
					type: "success",
				})
			);
			navigate("/users");
		}
		if (error) {
			dispatch(
				triggerAlert({
					message: error,
					type: "error",
				})
			);
		}
	}, [success, error]);

	const handleSubmit = () => {
		const empty = checkEmptyField(fields);
		if (!empty) {
			dispatch(createAdminUser({ email, password, name }));
		} else {
			dispatch(
				triggerAlert({
					message: `Please input ${empty.join(", ")}`,
					type: "error",
				})
			);
		}
	};

	return (
		<div>
			<div className="w-[450px] text-right mx-auto h-screen flex flex-wrap content-center justify-center ">
				<input
					type="text"
					placeholder="name"
					className={styles.input}
					onChange={(e) => {
						setName(e.target.value);
					}}
				/>
				<input
					type="text"
					placeholder="email"
					className={styles.input}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
				/>
				<div className="w-full h-fit relative">
					<input
						type={showPassword ? "text" : "password"}
						placeholder="password"
						className={styles.input}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
					/>
					{showPassword ? (
						<AiOutlineEye
							className={styles.icon}
							onClick={() => setShowPassword(!showPassword)}
						/>
					) : (
						<AiOutlineEyeInvisible
							className={styles.icon}
							onClick={() => setShowPassword(!showPassword)}
						/>
					)}
				</div>
				<button
					className="py-[10px] hover:bg-primary transition-all rounded-[5px] ml-auto text-white  capitalize px-[45px] bg-slate-800 w-fit font-semibold text-body-md "
					onClick={handleSubmit}
				>
					Add New User
				</button>
			</div>
		</div>
	);
}
