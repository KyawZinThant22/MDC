import Link from "next/link";
import React from "react";
import Button from "./Button";
import SimpleForm from "./SimpleForm";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/router";
import AdminApi from "../../api/Adminapi";

//icons
import { BsFillPersonFill } from "react-icons/bs";
import { HiOutlineMail } from "react-icons/hi";

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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append("emal", data.email);
    formData.append("password", data.password);

    // const res = await AdminApi.createNewUser(formData);
    // console.log(res);
    // if (res.status === 201 && res.data.meta.success === true) {
    //   router.push("/");
    //   // dispatch(
    //   //   openAlert({
    //   //     title: "Success",
    //   //     type: "success",
    //   //     desc: res.data.meta.message,
    //   //   })
    //   // );
    //   reset();
    // } else {
    //   // dispatch(
    //   //   openAlert({
    //   //     title: "Error",
    //   //     type: "error",
    //   //     desc: res.data.meta.message,
    //   //   })
    //   // );
    //   console.log("err");
    // }
  };

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
