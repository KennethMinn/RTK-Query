import { useState } from "react";
import { PasswordInput, TextInput } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/authApi";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setToken } from "../store/services/auth-reducer";
import { useForm } from "@mantine/form";
import { Loader } from "@mantine/core";

const Login = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) =>
        value.length < 8 ? "password must have at least 8 characters" : null,
    },
  });

  // const logInHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const user = { email, password };
  //     const { data } = await login(user);
  //     if (data?.success) nav("/dashboard");
  //     dispatch(setUser(data.user));
  //     dispatch(setToken(data.token));
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className=" flex justify-center h-[650px] sm:h-screen items-center">
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const { data } = await login(values);
            if (data?.success) nav("/dashboard");
            dispatch(setUser(data.user));
            dispatch(setToken(data.token));
            console.log(data);
          } catch (err) {
            console.error(err);
          }
        })}
        className="w-96 flex flex-col gap-6 shadow-lg p-10"
      >
        <h1 className=" text-2xl font-semibold">Log into your account</h1>
        <TextInput
          placeholder="Enter your email"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          placeholder="Enter your password"
          {...form.getInputProps("password")}
        />
        <div className=" flex gap-2 items-center">
          <p className=" text-sm opacity-70">Don&apos;t have an account?</p>
          <Link to="/register">
            <span className="cursor-pointer opacity-80 text-sm">register</span>
          </Link>
        </div>
        <button
          type="submit"
          disabled={isLoading && true}
          className=" border py-[6px] bg-blue-500 text-white rounded-md"
        >
          {isLoading ? (
            <Loader color="grey" size="sm" className=" mx-auto block" />
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

export default Login;
