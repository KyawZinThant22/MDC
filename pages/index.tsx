import AppHead from "@/components/AppHead";
import Header from "@/components/Header";
import Cookies from "js-cookie";
import type { NextPage } from "next";
import { useEffect } from "react";
import { validateAuth } from "../redux/features/auth";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import AdminApi from "../api/Adminapi";
import { userData } from "../redux/features/auth/user";

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const authData = useAppSelector((state) => state.auth.value);
  console.log("authData", authData);

  useEffect(() => {
    const token = Cookies.get("_access_token_react");
    dispatch(validateAuth(token));
  }, []);

  const validate = async () => {
    if (authData.isSuccess || authData.user) {
      try {
        const res = await AdminApi.getMe(authData.user);
        dispatch(userData(res));
      } catch (err: any) {
        console.log(err.message);
      }
    }
  };

  validate();

  return (
    <>
      <AppHead title="Myanmar Developer Community" />
      <div className="container mx-auto"></div>
    </>
  );
};

export default Home;
