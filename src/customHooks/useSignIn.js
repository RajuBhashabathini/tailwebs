import { useState } from "react";
import { useNavigate } from "react-router-dom";

import teachersMockData from "../mockData/teachersMockData";
const useSignIn = () => {
  const navigate = useNavigate();

  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validation = (userNameProps, passwordProps) => {
    userNameProps ? setUserNameError(false) : setUserNameError(true);

    passwordProps ? setPasswordError(false) : setPasswordError(true);

    if (userNameProps && passwordProps) {
      const isDataFound = teachersMockData.filter(
        (ele, index) =>
          ele.userName === userNameProps && ele.password === passwordProps
      )[0];
      if (isDataFound) {
        sessionStorage.setItem("user", userNameProps);
        sessionStorage.setItem("isUserLoggedIn", true);
        alert("Login Successful");
        navigate("/dashboard");
      } else {
        alert("Invalid User details. Please Try again");
      }
    }
  };

  return { userNameError, passwordError, validation };
};

export default useSignIn;
