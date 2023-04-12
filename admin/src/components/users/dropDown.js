import { useState, useRef } from "react";

import { BsThreeDotsVertical } from "react-icons/bs";
import { AiOutlineDelete, AiOutlineEdit, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";

import { deleteUsers } from "../../redux/slice/users.js";
import { resetDelete } from "../../redux/slice/users.js";

export default function NotificationDropdown({ id }) {
  const styles = {
    iconDiv: "py-4 px-2 text-white cursor-pointer",
    icons: "w-5 h-5 my-auto mr-2 ",

    container:
      "bg-white z-10 p-2 !pr-10 right-0 text-left rounded w-fit absolute float-left ",
    links:
      "cursor-pointer flex font-semibold text-body-md px-4 py-2 block w-fit text-black",

    warning: " text-red-700",
  };
  const dispatch = useDispatch();
  const removeHandler = () => {
    dispatch(deleteUsers(id));
    dispatch(resetDelete());
  };

  const [dropdownPopoverShow, setDropdownPopoverShow] = useState(false);
  const btnDropdownRef = useRef();
  const popoverDropdownRef = useRef();
  const openDropdownPopover = () => {
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  return (
    <div className="relative">
      <a
        className={styles.iconDiv}
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
        <BsThreeDotsVertical className={styles.icons} />
      </a>
      <div
        ref={popoverDropdownRef}
        className={styles.container}
        style={{ display: dropdownPopoverShow ? "block" : "none" }}
      >
        <a
          className={styles.links + " "}
          href={`${process.env.REACT_APP_FRONTEND_SERVER_PRODUCT}/${id}`}
          target="_blank"
          onClick={(e) => e.preventDefault()}
        >
          <AiOutlineEye className={styles.icons} />
          Preview
        </a>
        <a className={styles.links + " text-primary "} onClick={null}>
          <AiOutlineEdit className={styles.icons} />
          Update Item
        </a>
        <a className={styles.links + styles.warning} onClick={removeHandler}>
          <AiOutlineDelete className={styles.icons} />
          Delete
        </a>
      </div>
    </div>
  );
}
