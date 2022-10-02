import axios from "axios";

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
    const response = await axios(`${URL}user/singup`, data);

    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },
};

export default apiSetting;
