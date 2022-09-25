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
});

const CreateNewUser = () => {
  const [login, setLogin] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("emal", data.email);
    formData.append("password", data.password);

    console.log(formData.get("userName"));
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
            placeholder="UserName"
            required={true}
            errors={errors.userName?.message}
            label="Username"
            type="text"
          />

          <SimpleForm
            register={register("email")}
            placeholder="Email"
            required={true}
            errors={errors.email?.message}
            label="email"
            type="email"
          />
          <SimpleForm
            register={register("email")}
            placeholder="Email"
            required={true}
            errors={errors.email?.message}
            label="Email"
            type="text"
          />
          <SimpleForm
            register={register("password")}
            placeholder="Password"
            required={true}
            errors={errors.password?.message}
            label="Password"
            type="password"
          />
          <div className="w-full flex space-x-1 md:w-62 mt-4">
            <Button
              disable={false}
              arialLabel="cancelling of creating new user"
              type={"button"}
              variant={"secondary"}
              label={"Cancel"}
              action={() => router.replace("/")}
            />
            <Button
              disable={false}
              arialLabel="Create New User"
              type={"submit"}
              variant={"primary"}
              label={"Sign Up"}
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
