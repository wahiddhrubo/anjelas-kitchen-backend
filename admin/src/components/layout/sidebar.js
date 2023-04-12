import { Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { logout } from "../../redux/slice/authentication.js";
import { Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Sidebar({ links, addLinks }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [collapseShow, setCollapseShow] = useState("hidden");
  const path = location.pathname;
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };

  const styles = {
    wrapper:
      "md:left-0 font-semibold md:block text-white md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-slate-800 flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6",
    mobileNav:
      "md:flex-col  md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto",
    dropDown:
      "md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded ",
    mobileNavBar:
      "md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200",
    mobileIcon:
      "cursor-pointer text-black opacity-90 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent",
    logo: "md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0",
    linkHeading:
      "md:min-w-full mt-8 text-blueGray-500 text-xs uppercase font-bold block pt-1 pb-4 no-underline",
    linkList: "md:flex-col md:min-w-full flex flex-col list-none",
    link: "text-[12px] uppercase  my-2 rounded-[5px] px-3 hover:bg-primary py-3 font-bold block ",
    logout:
      "text-[16px] md:w-full text-center cursor-pointer capitalize my-2 w-fit md:mx-0 text-black px-10 mx-auto rounded-[5px] px-3 bg-white hover:bg-black hover:text-white transition-all py-3 font-bold block ",
    search:
      "border-0 px-8  py-2 h-12 bg-[#00000050] border-[2px] rounded-[50px]   border-[#ffffff90] placeholder-blueGray-300 text-blueGray-600   text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal",
  };

  return (
    <>
      <nav className={styles.wrapper}>
        <div className={styles.mobileNav}>
          {/* Toggler */}
          <button
            className={styles.mobileIcon}
            type="button"
            onClick={() => setCollapseShow("bg-slate-800 m-2 py-3 px-6")}
          >
            <HiMenuAlt1 className="w-8 h-8 text-white " />
          </button>
          {/* Brand */}
          <Link className={styles.logo} to="/">
            Anjela's Kitchen
          </Link>

          {/* Collapse */}
          <div className={styles.dropDown + collapseShow}>
            <div className={styles.mobileNavBar}>
              <div className="flex flex-wrap">
                <div className="w-6/12">
                  <Link className={styles.logo} to="/">
                    Anjela's Kitchen
                  </Link>
                </div>
                <div className="w-6/12 flex justify-end">
                  <button
                    type="button"
                    className={styles.mobileIcon}
                    onClick={() => setCollapseShow("hidden")}
                  >
                    <AiOutlineClose className="w-5 h-5 text-white " />
                  </button>
                </div>
              </div>
            </div>
            {/* Form */}
            <form className="mt-6 mb-4 ">
              <div className="mb-3 pt-0">
                <input
                  type="text"
                  placeholder="Search"
                  className={styles.search}
                />
              </div>
            </form>
            <ul className={styles.linkList}>
              {links?.map((l, index) => (
                <li key={index} className="items-center">
                  <Link
                    className={
                      styles.link + `${path === l.link ? " bg-primary" : ""}`
                    }
                    to={l.link}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h6 className={styles.linkHeading}>Add New</h6>
            <ul className={styles.linkList}>
              {addLinks?.map((l, index) => (
                <li key={index} className="items-center">
                  <Link
                    className={
                      styles.link + `${path === l.link ? " bg-primary" : ""}`
                    }
                    to={l.link}
                  >
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h6 className={styles.logout}>Logout</h6>
          </div>
        </div>
      </nav>
    </>
  );
}
