export default function Gallery({ gallery, setGallery }) {
	const onSelectGallery = (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			return;
		}
		setGallery((prev) => [...prev, ...e.target.files]);
	};

	const onDropHandler = (e) => {
		e.preventDefault();
		if (!e.dataTransfer.files || e.dataTransfer.files.length === 0) {
			return;
		}
		setGallery((prev) => [...prev, ...e.dataTransfer.files]);
	};

	const removeHandler = (i, setArr) => {
		setArr((prev) => prev.filter((j) => j !== i));
	};

	return (
		<div className="">
			<label
				className="w-full text-body-lg block text-center py-20 border-orange-800 bg-grey-100 border-dashed  border-2  text-primary cursor-pointer "
				htmlFor="gallery"
				onDragOver={(e) => {
					e.stopPropagation();
					e.preventDefault();
				}}
				onDrop={onDropHandler}
			>
				Gallery
				<input
					onChange={onSelectGallery}
					type="file"
					hidden
					multiple
					name="gallery"
					id="gallery"
				/>
			</label>
			<div className="flex flex-wrap">
				{gallery.map((i, index) => (
					<div
						key={index}
						className="relative my-[16px] w-[185px] pr-[16px] "
					>
						<img
							src={URL.createObjectURL(i)}
							width={150}
							height={150}
							alt="Thumb"
							className="w-[150px] h-[150px] object-cover rounded-[10px]"
						/>
						<span
							onClick={() => removeHandler(i, setGallery)}
							className="absolute top-[0] right-[35px] w-[25px] h-[25px] grid place-items-center	text-white bg-slate-800	 rounded-[0px_10px_0px_10px] cursor-pointer"
						>
							x
						</span>
					</div>
				))}
			</div>
		</div>
	);
}
