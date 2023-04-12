export default function Gallery({ image, setImage }) {
	return (
		<div className="my-[62px] flex content-center">
			<label
				className="text-body-md w-fit h-fit my-auto block rounded-[10px]  text-white px-[45px] py-[10px]  font-semibold cursor-pointer bg-slate-800 "
				htmlFor="image"
			>
				Featured Image
				<input
					onChange={(e) => setImage(e.target.files[0])}
					type="file"
					hidden
					name="image"
					id="image"
				/>
			</label>

			{image && (
				<div className="relative ml-auto my-[16px] w-[185px] pr-[16px] ">
					<img
						src={URL.createObjectURL(image)}
						width={150}
						height={150}
						alt="Thumb"
						className="w-[150px] h-[150px] object-cover rounded-[10px]"
					/>
					<span
						onClick={() => setImage(null)}
						className="absolute top-[0] right-[35px] w-[25px] h-[25px] grid place-items-center	text-white bg-slate-800	 rounded-[0px_10px_0px_10px] cursor-pointer"
					>
						x
					</span>
				</div>
			)}
		</div>
	);
}
