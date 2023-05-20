import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, selectToken } from "../store/services/auth-selector";
import { useLogoutMutation } from "../store/api/authApi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { removeToken, removeUser } from "../store/services/auth-reducer";

const Navbar = () => {
  // const user = useSelector(selectUser);
  // const token = useSelector(selectToken);
  const user = JSON.parse(Cookies.get("user"));
  const token = Cookies.get("token");
  const [logout] = useLogoutMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const { data } = await logout(token);
      dispatch(removeUser());
      dispatch(removeToken());
      console.log(data);
      nav("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" flex justify-between items-center mt-3 shadow pb-4">
      <h1 className="text-lg sm:text-5xl font-bold">MMS</h1>
      <div className=" flex items-center gap-5">
        <div className=" text-xs sm:text-sm text-center">
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>
        <button
          onClick={logoutHandler}
          className=" bg-red-600 text-white px-3 py-1 rounded cursor-pointer"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
