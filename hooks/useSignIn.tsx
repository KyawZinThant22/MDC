import { useState } from "react";
// import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading]: any = useState(null);

  const signup = async (data: any) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch("http://localhost:8000/api/v1/user/signup/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const json = await response.json();
    setIsLoading(false);
    return json;
  };

  return { signup, isLoading, error };
};
