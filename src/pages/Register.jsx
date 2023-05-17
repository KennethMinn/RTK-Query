import { PasswordInput, TextInput } from "@mantine/core";
import { Link, NavLink, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useRegisterMutation } from "../store/api/authApi";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [register] = useRegisterMutation();
  const nav = useNavigate();

  const registerHandler = async (e) => {
    e.preventDefault();
    try {
      const user = { name, email, password, password_confirmation };
      const { data } = await register(user);
      console.log(data);
      console.log(user);
      if (data?.success) nav("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" flex justify-center h-[650px] sm:h-screen items-center">
      <form
        onSubmit={registerHandler}
        className="sm:w-96 w-full flex flex-col gap-6 shadow-lg p-10"
      >
        <h1 className=" text-2xl font-semibold">Register</h1>
        <TextInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <TextInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <PasswordInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <PasswordInput
          value={password_confirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder="confirm password"
        />
        <div className=" flex gap-2 items-center">
          <p className=" text-sm opacity-70">Already have an account?</p>
          <Link to="/login">
            <span className="cursor-pointer opacity-80 text-sm">Log in</span>
          </Link>
        </div>
        <button
          type="submit"
          className=" border py-[6px] bg-blue-500 text-white rounded-md"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
