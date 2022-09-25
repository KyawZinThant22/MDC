import Link from "next/link";
import React from "react";
import Button from "./Button";
import SimpleForm from "./SimpleForm";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    const formData = new FormData();
    formData.append("emal", data.email);
    formData.append("password", data.password);

    // console.log(formData.get("userName"));
  };

  return (
    <form
      className="mt-4 w-full gap-6 grid grid-cols-1"
      onSubmit={handleSubmit(onSubmit)}
    >
      <SimpleForm
        register={register("email")}
        placeholder="Email"
        required={true}
        errors={errors.email?.message}
        label="email"
        type="email"
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
          arialLabel="Logging in"
          type={"submit"}
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
