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
  createNewUser: async (data: any) => {
    const resWithAxios = await axios({
      url: `${URL}/user/signup`,
      method: "POST",
      headers: { ...requestHeaders },
      data,
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
    return resWithAxios;
  },
};

export default apiSetting;
