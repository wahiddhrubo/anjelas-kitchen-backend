import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NewProduct from "./components/newProduct/index.js";
import NotFound from "./components/notFound.js";

import Login from "./components/auth/login.js";
import ResetPassword from "./components/auth/newPassword.js";
import Layout from "./components/layout/layout.js";
import { useSelector, useDispatch } from "react-redux";
import { login, logout, loadUser } from "./redux/slice/authentication.js";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const { loading: itemsLoading } = useSelector((state) => state.items);
  const { loading: getItemsLoading } = useSelector((state) => state.getItems);
  const { loading: authLoading } = useSelector((state) => state.auth);
  const { loading: usersLoading } = useSelector((state) => state.users);
  const { loading: ordersLoading } = useSelector((state) => state.orders);

  const loading =
    itemsLoading ||
    getItemsLoading ||
    authLoading ||
    usersLoading ||
    ordersLoading;

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Routes>
          {isAdmin ? (
            <Route path="*" element={<Layout />} />
          ) : isAuthenticated ? (
            <Route path="*" element={<NotFound />} />
          ) : (
            <>
              <Route path="/" element={<Login />} />
              <Route path="/password/:id" element={<ResetPassword />} />
              <Route path="*" element={<NotFound />} />
            </>
          )}
        </Routes>
      </Router>
    </>
  );
}
export default App;
