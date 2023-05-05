import axios from "axios";
export const SingleImageUpload = async (name, image) => {
  const newForm = new FormData();
  newForm.set("image", image);
  const config = {
    withCredentials: true,

    headers: { "Content-Type": "multipart/form-data" },
  };
  const url = process.env.REACT_APP_IMAGE_SERVER_TEST
    ? process.env.REACT_APP_IMAGE_SERVER_TEST
    : `${process.env.REACT_APP_IMAGE_SERVER}/api/v1/admin/upload/image`;

  const { data } = await axios.post(url, newForm, config);
  return data.imageUri;
};
export const GalleryImageUpload = async (name, images) => {
  //   const slug = name
  //     .toLowerCase()
  //     .replace(/[^\w ]+/g, "")
  //     .replace(/ +/g, "-");

  const config = {
    withCredentials: true,

    headers: { "Content-Type": "multipart/form-data" },
  };
  console.log(images);
  const url = process.env.REACT_APP_IMAGE_SERVER_TEST
    ? process.env.REACT_APP_IMAGE_SERVER_TEST
    : `${process.env.REACT_APP_IMAGE_SERVER}/api/v1/admin/upload/image`;

  const galleryArr = [];
  for (const i of images) {
    const newForm = new FormData();
    newForm.set("image", i);
    const { data } = await axios.post(url, newForm, config);
    galleryArr.push(data.imageUri);
  }
  return galleryArr;
};
