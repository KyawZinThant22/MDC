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
    const response = await fetch(`${URL}user/singup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    if (!json.ok) {
      console.log("err");
      //   setIsLoading(false)
      //   setError(json.error)
    }
    if (json.ok) {
      console.log("success");

      // update the auth context

      // update loading state
      //   setIsLoading(false)
    }
    return json;
  },
};

export default apiSetting;
