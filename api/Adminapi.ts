import axios from "axios";
import Cookies from "js-cookie";

//constans
export const URL = process.env.NEXT_PUBLIC_URL;

const requestHeaders = {
  "Content-Type":
    "multipart/form-data; boundary=<calculated when request is sent>; application/json; charset=UTF-8",
  Accept: "application/json",
};

//API
const apiSetting = {
  registerUser: async (data: any) => {
    const response = await fetch("http://localhost:8000/api/v1/user/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    return json;
  },

  LogIn: async (data: any) => {
    const response = await fetch(`${URL}user/login/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    console.log(json);
    return json;
  },

  getMe: async (token: any) => {
    console.log(token);
    const response = await fetch(`${URL}user/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const json = await response.json();
    return json;
  },
};

export default apiSetting;
