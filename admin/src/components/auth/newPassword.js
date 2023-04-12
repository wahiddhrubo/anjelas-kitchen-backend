import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { triggerAlert } from "../../redux/slice/alert.js";
import { resetPassword } from "../../redux/slice/authentication.js";

import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { checkEmptyField } from "../../utils/checkEmptyField.js";

export default function Login({ history }) {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { id } = useParams();

	const styles = {
		input: "w-full border-2 my-[16px] rounded-[5px] px-5 placeholder:capitalize border-black py-[10px] placeholder:text-black placeholder:font-semibold placeholder:text-body-md ",
		icon: "w-8 h-8 absolute inset-y-0 my-auto right-5 cursor-pointer",
	};

	const { isAuthenticated, loading, user, error, success } = useSelector(
		(state) => state.auth
	);

	const [password, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [showPassword, setShowPassword] = useState(false);

	const fields = {
		Password: password,
		"Confirm Password": confirmPassword,
	};

	useEffect(() => {
		if (success) {
			dispatch(
				triggerAlert({
					message: "Password Changed Successfully",
					type: "success",
				})
			);
			navigate("/");
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
			dispatch(resetPassword({ confirmPassword, password, id }));
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
			{!isAuthenticated ? (
				<div className="w-[450px] text-right mx-auto h-screen flex flex-wrap content-center justify-center ">
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
					<div className="w-full h-fit relative">
						<input
							type={showPassword ? "text" : "password"}
							placeholder="Confirm Password"
							className={styles.input}
							onChange={(e) => {
								setConfirmPassword(e.target.value);
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
						submit
					</button>
				</div>
			) : (
				<Navigate to="/" replace={true} />
			)}
		</div>
	);
}
