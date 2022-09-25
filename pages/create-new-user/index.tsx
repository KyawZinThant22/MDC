import AppHead from "@/components/AppHead";
import SimpleForm from "@/components/form/SimpleForm";
import React, { useState } from "react";
import { useRouter } from "next/router";

//third party library
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Button from "@/components/form/Button";

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

  return (
    <>
      <AppHead title="Welcome to Myanmar Dev Comminity 👩&zwj;💻👨&zwj;💻" />
      <div className="w-[45rem] mx-auto bg-white newUserShadow rounded-md p-12 mt-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold">
          Welcome to Myanmar Dev Comminity 👩&zwj;💻👨&zwj;💻
        </h1>
        <p className="text-md text-gray-500">
          Myanmar Dev Community is community of amzaing developers
        </p>
        <form
          className="grid grid-cols-2 mt-12 gap-4"
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
          <div className="w-full flex space-x-1 md:w-72 mt-4">
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
      </div>
    </>
  );
};

export default CreateNewUser;
