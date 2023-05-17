import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUser, selectToken } from "../store/services/auth-selector";
import { useLogoutMutation } from "../store/api/authApi";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const [logout] = useLogoutMutation();
  const nav = useNavigate();

  const logoutHandler = async () => {
    try {
      const { data } = await logout(token);
      nav("/login");
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" flex justify-between items-center mt-3">
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
