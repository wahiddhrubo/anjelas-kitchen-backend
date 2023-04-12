import axios from "axios";
export const SingleImageUpload = async (name, image) => {
	const slug = name
		.toLowerCase()
		.replace(/[^\w ]+/g, "")
		.replace(/ +/g, "-");

	const newForm = new FormData();
	newForm.set("image", image);
	const config = {
		headers: { "Content-Type": "multipart/form-data" },
	};
	const url = process.env.REACT_APP_IMAGE_SERVER_TEST
		? process.env.REACT_APP_IMAGE_SERVER_TEST
		: `${process.env.REACT_APP_IMAGE_SERVER}/${slug}`;

	const { data } = await axios.post(url, newForm, config);
	return data.imageUri;
};
export const GalleryImageUpload = async (name, images) => {
	const slug = name
		.toLowerCase()
		.replace(/[^\w ]+/g, "")
		.replace(/ +/g, "-");

	const config = {
		headers: { "Content-Type": "multipart/form-data" },
	};
	const url = process.env.REACT_APP_IMAGE_SERVER_TEST
		? process.env.REACT_APP_IMAGE_SERVER_TEST
		: `${process.env.REACT_APP_IMAGE_SERVER}/${slug}`;

	const galleryArr = [];
	for (const i of images) {
		const newForm = new FormData();
		newForm.set("image", i);

		const { data } = await axios.post(url, newForm, config);
		galleryArr.push(data.imageUri);
	}
	return galleryArr;
};
