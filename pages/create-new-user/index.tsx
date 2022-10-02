import AppHead from "@/components/AppHead";
import SimpleForm from "@/components/form/SimpleForm";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

//third party library
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/form/Button";
import LoginForm from "@/components/form/LoginForm";
import { useSignup } from "../../hooks/useSignIn";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { useAppDispatch } from "../../redux/hooks";

//icons
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";
import { HiLockClosed } from "react-icons/hi";

//schema
const schema = yup.object().shape({
  userName: yup.string().required("UserName is required"),
  email: yup
    .string()
    .email("Email must be a valid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(32, "Password is too long - should be 32 chars maximum."),
  passwordConfirm: yup
    .string()
    .required("Password confrimation is required")
    .oneOf([yup.ref("password"), null], "Password must match"),
});

const CreateNewUser = () => {
  const [login, setLogin] = useState(false);
  const router = useRouter();
  const { signup, isLoading } = useSignup();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: any) => {
    const { userName, email, password } = data;
    let datas = { userName, email, password };
    const res = await signup(datas);

    if (res.status === "success") {
      toast.success("Successfully Created Your Account", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const token = res.token;
      Cookies.set("_access_token_react", token as any);
      const { email, userName, _id: id } = res.data;
      const payload = { token, email, userName, id };
      // dispatch(loginAuth(payload));
      reset();
      router.push("/");
    } else if (res.status === "fail") {
      alert(res.message);
    }
  };

  useEffect(() => {
    if (router.pathname === "/login") {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, [router.pathname]);

  return (
    <>
      <AppHead title="Welcome to Myanmar Dev Comminity 👩&zwj;💻👨&zwj;💻" />
      <div className="w-[45rem] mx-auto bg-white newUserShadow rounded-md p-12 mt-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold">
          Welcome to Myanmar Dev Comminity 👩&zwj;💻👨&zwj;💻
        </h1>
        <p className="text-md text-gray-500">
          Myanmar Dev Community 👩&zwj;💻👨&zwj;💻 is community of amzaing
          developers
        </p>
        <form
          className="w-full grid grid-cols-2 gap-6 mt-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <SimpleForm
            register={register("userName")}
            placeholder="username"
            required={true}
            errors={errors.userName?.message}
            label="Username"
            type="text"
            icon={
              <BsFillPersonFill
                size={20}
                className="w-4 h-4  absolute top-3 left-2"
              />
            }
          />

          <SimpleForm
            register={register("email")}
            placeholder="email"
            required={true}
            errors={errors.email?.message}
            label="email"
            type="email"
            icon={
              <HiOutlineMail
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
            label="new-passsword"
            type="password"
            icon={
              <HiLockClosed
                size={20}
                className="w-4 h-4  absolute top-3 left-2"
              />
            }
          />
          <SimpleForm
            register={register("passwordConfirm")}
            placeholder="confirm password"
            required={true}
            errors={errors.passwordConfirm?.message}
            label="Confirm Password"
            type="password"
            icon={
              <HiLockClosed
                size={20}
                className="w-4 h-4  absolute top-3 left-2"
              />
            }
          />
          <div className="w-full flex space-x-1 md:w-62 ">
            <Button
              disable={false}
              arialLabel="cancelling of creating new user"
              type={"button"}
              variant={"secondary"}
              label={"Cancel"}
              action={() => reset()}
            />
            <Button
              disable={false}
              arialLabel="Create New User"
              type={"submit"}
              isLoading={isLoading}
              variant={"primary"}
              label={"Create Account"}
            />
          </div>
        </form>

        <div className="mt-10 flex w-full justify-between items-center">
          {!login && (
            <>
              <div className="border-t-2 border-x-0 border-b-0 w-[180px] border  "></div>
              <span className="text-gray-600">
                Already have an account?{" "}
                <Link href="/login">
                  <a className="text-blue-400 cursor-pointer">Log in</a>
                </Link>
                .
              </span>
              <div className="border-t-2 border-x-0 border-b-0 w-[180px] border "></div>
            </>
          )}
          {login && login && (
            <>
              <div className="border-t-2 border-x-0 border-b-0 w-[110px] border  "></div>
              <span className="text-gray-600">
                Have a password? Continue with your email address
              </span>
              <div className="border-t-2 border-x-0 border-b-0 w-[110px] border "></div>
            </>
          )}
        </div>

        {login && <LoginForm />}
      </div>
    </>
  );
};

export default CreateNewUser;
