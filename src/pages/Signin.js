import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Input, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const Signin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const changePasswordVisibility = (type) => {
    console.log("type :", type);
    setShowPassword(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let userDetailsCopy = { ...userDetails };
    userDetailsCopy[name] = value;
    setUserDetails(userDetailsCopy);
  };

  const validation = () => {
    userDetails.username == "" ||
    userDetails.username == undefined ||
    userDetails.username == null
      ? setUserNameError(true)
      : setUserNameError(false);

    userDetails.password == "" ||
    userDetails.password == undefined ||
    userDetails.password == null
      ? setPasswordError(true)
      : setPasswordError(false);

    if (userDetails.username !== "" && userDetails.password !== "") {
      sessionStorage.setItem("user", userDetails.username);
      sessionStorage.setItem("isUserLoggedIn", true);
      navigate("/dashboard");
    }
  };

  return (
    <div className=" bg-gray-300 m-5 h-screen  flex flex-row justify-center items-center">
      <div className="w-[50%] p-20 flex flex-col gap-4 ">
        <Text className="text-red-500 text-[20px] flex self-center">
          tailwebs.
        </Text>
        <div className="bg-white p-10 flex flex-col gap-2">
          <label>Username</label>
          <Input
            type="text"
            name="username"
            value={userDetails.name}
            onChange={(e) => {
              handleInputChange(e);
            }}
            placeholder="Please Enter the Username"
            prefix={
              <>
                <UserOutlined />
                <Divider type="vertical" />
              </>
            }
          />
          {userNameError && (
            <Text className="text-red-400">Please Enter a Valid Username</Text>
          )}
          <label>Password</label>

          <Input
            name="password"
            value={userDetails.password}
            onChange={(e) => {
              handleInputChange(e);
            }}
            type={showPassword ? "text" : "password"}
            placeholder="Please Enter the Password"
            prefix={
              <>
                <LockOutlined />
                <Divider type="vertical" />
              </>
            }
            suffix={
              <>
                {!showPassword ? (
                  <EyeOutlined
                    onClick={() => {
                      changePasswordVisibility(true);
                    }}
                  />
                ) : (
                  <EyeInvisibleOutlined
                    onClick={() => {
                      changePasswordVisibility(false);
                    }}
                  />
                )}
              </>
            }
          />
          {passwordError && (
            <Text className="text-red-400">Please Enter a Valid Password</Text>
          )}

          <Text className="text-blue-300 mb-4 cursor-pointer flex self-end">
            Forgot Password ?
          </Text>
          <button
            onClick={() => {
              validation();
            }}
            className="w-[70%]  items-center justify-center  flex self-center text-white bg-black p-1"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
