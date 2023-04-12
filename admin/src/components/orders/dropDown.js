import { useState, useRef } from "react";
import { Link } from "react-router-dom";

import { BsThreeDotsVertical, BsBoxArrowUpRight } from "react-icons/bs";
import { useDispatch } from "react-redux";

import { updateOrderStatus, resetStatus } from "../../redux/slice/orders.js";

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
  const completeOrder = () => {
    dispatch(updateOrderStatus({ id: id, status: "delivered" }));
    dispatch(resetStatus());
  };
  const cancelOrder = () => {
    dispatch(updateOrderStatus({ id: id, status: "cancelled" }));
    dispatch(resetStatus());
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
        <Link className={styles.links + " text-primary"} to={`/orders/${id}`}>
          <BsBoxArrowUpRight className={styles.icons} />
          Preview Order
        </Link>
        <a className={styles.links + " text-green-500"} onClick={completeOrder}>
          ✓ Complete Order
        </a>
        <a className={styles.links + " text-red-700 "} onClick={cancelOrder}>
          ✕ Cancel Order
        </a>
      </div>
    </div>
  );
}
