import Link from "next/link";
import React from "react";
import Button from "./Button";
import SimpleForm from "./SimpleForm";
import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import AdminApi from "../../api/Adminapi";

import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Login, resetData } from "../../redux/features/auth";

//icons
import { BsFillPersonFill } from "react-icons/bs";
import Cookies from "js-cookie";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(32, "Password is too long - should be 32 chars maximum."),
});

const LoginForm = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth.value);
  const { user, isLoading, isError, isSuccess, message } = authData;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const { email, password } = data;
    let datas = { email, password };
    dispatch(Login(datas));
  };

  useEffect(() => {
    if (router.pathname === "/login") {
      console.log("hi");
      if (isError) {
        toast.error(message);
      }

      if (isSuccess || user) {
        console.log("render");
        Cookies.set("_access_token_react", user.token as any);
        toast.success("Successfully Login", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/");
      }

      dispatch(resetData());
    }
  }, [user, isError, isSuccess, message, router, dispatch]);

  return (
    <form
      className="mt-4 w-full gap-6 grid grid-cols-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SimpleForm
        register={register("email")}
        placeholder="email"
        required={true}
        errors={errors.email?.message}
        label="email"
        type="email"
        icon={
          <BsFillPersonFill
            size={20}
            className="w-4 h-4  absolute top-3 left-2"
          />
        }
      />
      <SimpleForm
        register={register("password")}
        placeholder="password"
        required={true}
        errors={errors.password?.message}
        label="Password"
        type="password"
        icon={
          <BsFillPersonFill
            size={20}
            className="w-4 h-4  absolute top-3 left-2"
          />
        }
      />
      <div className="w-full flex space-x-1 md:w-62 mt-4">
        <Button
          disable={false}
          arialLabel="Logging in"
          type={"submit"}
          isLoading={isLoading}
          variant={"primary"}
          label={"Login"}
        />
      </div>
      <Link href="/create-new-user">
        <p className="text-blue-600 text-center cursor-pointer">
          I Forgot my password
        </p>
      </Link>
    </form>
  );
};

export default LoginForm;
