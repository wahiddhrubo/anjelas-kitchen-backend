import Pricing from "./pricing.js";
import Gallery from "./gallery.js";
import CustomFileInput from "./customFileInput.js";
import { useState, useEffect } from "react";
import Select from "react-select";
import { Navigate, useNavigate } from "react-router-dom";
import { checkEmptyField } from "../../utils/checkEmptyField.js";
import { categoriesOpt, tagsOpt } from "../../lib/constants.js";
import { createItem } from "../../redux/slice/items.js";
import { triggerAlert } from "../../redux/slice/alert.js";
import { useSelector, useDispatch } from "react-redux";

export default function AddItems({}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const styles = {
    wrapper: " lg:w-[800px] mx-auto ",
    title:
      "text-heading-lg font-bold text-black mx-auto capitalize  text-center my-[62px] ",
    inputDivHalfLeft: "relative h-[50px] mr-[5%] inline-block w-[45%] ",
    inputDivHalfRight: "relative h-[50px] ml-[5%] inline-block w-[45%] ",
    input:
      "lg:placeholder:text-body-md placeholder:capitalize placeholder:text-black placeholder:font-bold border-b-2 border-black w-full  focus-visible:outline-0 ",
    textarea:
      "lg:placeholder:text-body-md my-[62px] placeholder:capitalize p-5 placeholder:text-black placeholder:font-bold border-2 border-black w-full  focus-visible:outline-0 ",
    selectDiv: "capitalize text-black font-bold bo text-body-md ",
    subHeading: "text-body-lg w-fit mb-[32px] capitalize text-black font-bold ",
    addPriceBtn:
      " w-[35px] h-[35px] text-center place-items-center cursor-pointer  ml-5  rounded-full bg-primary text-white font-bold text-body-lg inline ",
    select:
      " text-black !border-0 outline-0  font-bold !border-b-2 !border-black w-full  focus-visible:outline-0 ",
    indicator: "bg-none",
    option: "text-body-md capitalize font-medium text-black",
    btn: "px-[35px] my-[32px] py-[8px] rounded-full bg-primary text-white font-bold text-body-md cursor-pointer w-fit ml-auto ",
  };
  const { success, error } = useSelector((state) => state.items);

  const [name, setName] = useState();
  const [stock, setStock] = useState();
  const [description, setDescription] = useState();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [featuredImage, setFeaturedImage] = useState();
  const [skus, setSkus] = useState([]);
  const [skuId, setSkuId] = useState([]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState();
  const [alertMessage, setAlertMessage] = useState();

  const fields = {
    Name: name,
    Stock: stock,
    Description: description,
    Tags: tags,
    Categories: categories,
    Gallery: gallery,
    "Featured Image": featuredImage,
    Skus: skus,
  };

  useEffect(() => {
    if (success) {
      dispatch(
        triggerAlert({
          message: "Item Created Successfully",
          type: "success",
        })
      );
      navigate("/products");
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

  const handleSelect = (values, setArr) => {
    setArr(values.map((v) => v.value));
  };

  const submitHandler = () => {
    const empty = checkEmptyField(fields);
    // const empty = 0;
    if (!empty) {
      dispatch(
        createItem({
          name,
          description,
          stock,
          gallery,
          featuredImage,
          categories,
          tags,
          skus,
        })
      );
    } else {
      dispatch(
        triggerAlert({
          message: `Please input ${empty.join(", ")}`,
          type: "error",
        })
      );
    }
  };
  const addSkuId = () => {
    const skuLength = skuId.length + 1;
    setSkuId((prev) => [...prev, { id: skuLength }]);
    setSkus((prev) => [...prev, { sku: skuLength }]);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>Add New Item </div>
      <div className={styles.inputDivHalfLeft}>
        <input
          type="text"
          name="name"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
      </div>
      <div className={styles.inputDivHalfRight}>
        <input
          type="text"
          name="stock"
          placeholder="stock"
          onChange={(e) => setStock(e.target.value)}
          className={styles.input}
        />
      </div>
      <CustomFileInput image={featuredImage} setImage={setFeaturedImage} />
      <div className={styles.inputDiv}>
        <textarea
          rows="5"
          type="text"
          name="description"
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          className={styles.textarea}
        />
      </div>
      <div className="flex">
        <div className={styles.subHeading}>Add Pricing</div>
        <div className={styles.addPriceBtn} onClick={addSkuId}>
          {" "}
          +{" "}
        </div>
      </div>
      <div className="flex flex-wrap gap-[15%] ">
        {skuId.map((s, index) => (
          <Pricing skus={skus} key={index} sku={s.id} setSkus={setSkus} />
        ))}
      </div>
      <div className="my-[64px]">
        <div className={styles.inputDivHalfLeft}>
          <Select
            isMulti
            name="categories"
            placeholder="Categories"
            options={categoriesOpt}
            classNames={{
              control: (state) => styles.select,
              placeholder: (state) => "!text-black ",
              option: (state) => styles.option,
            }}
            closeMenuOnSelect={false}
            onChange={(cats) => handleSelect(cats, setCategories)}
            classNamePrefix="select"
          />
        </div>
        <div className={styles.inputDivHalfRight}>
          <Select
            isMulti
            name="tags"
            placeholder="Tags"
            options={tagsOpt}
            classNames={{
              control: (state) => styles.select,
              placeholder: (state) => "!text-black ",
              option: (state) => styles.option,
            }}
            onChange={(tgs) => handleSelect(tgs, setTags)}
            closeMenuOnSelect={false}
            classNamePrefix="select"
          />
        </div>
      </div>
      <Gallery gallery={gallery} setGallery={setGallery} />
      <div className={styles.btn} onClick={submitHandler}>
        Create New Item
      </div>
    </div>
  );
}
