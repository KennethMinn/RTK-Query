import { useState } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../store/api/authApi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();

  const logInHandler = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const data = await login(user);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" flex justify-center h-[650px] sm:h-screen items-center">
      <form
        onSubmit={logInHandler}
        className="w-96 flex flex-col gap-6 shadow-lg p-10"
      >
        <h1 className=" text-2xl font-semibold">Log into your account</h1>
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
        {/* <div className=" flex gap-2 items-center">
          <p className=" text-sm opacity-70">Already have an account?</p>
          <Link to="/login">
            <span className="cursor-pointer opacity-80 text-sm">Log in</span>
          </Link>
        </div> */}
        <button
          type="submit"
          className=" border py-[6px] bg-blue-500 text-white rounded-md"
        >
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;
