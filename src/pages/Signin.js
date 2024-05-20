//? Importing Libraries
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Divider, Input, Typography } from "antd";
import React, { useState } from "react";

//? Importing User Defined Components or Hooks
import useSignIn from "../customHooks/useSignIn";

//? Destructuring Libraries
const { Text } = Typography;

const SignIn = () => {
  const { userNameError, passwordError, validation } = useSignIn();

  const [showPassword, setShowPassword] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });

  const changePasswordVisibility = (type) => {
    setShowPassword(type);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let userDetailsCopy = { ...userDetails };
    userDetailsCopy[name] = value;
    setUserDetails(userDetailsCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validation(userDetails.username, userDetails.password);
  };

  return (
    <div className="bg-gray-300 h-full ">
      <div className="  flex  justify-center items-center">
        <div className="size-[50%] p-20 flex flex-col gap-4 ">
          <form name="myForm" onSubmit={handleSubmit}>
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
                <Text className="text-red-400">
                  Please Enter a Valid Username
                </Text>
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
                <Text className="text-red-400">
                  Please Enter a Valid Password
                </Text>
              )}

              <Text className="text-blue-300 mb-4 cursor-pointer flex self-end">
                Forgot Password ?
              </Text>
              <button
                type="submit"
                className={` ${
                  !userDetails.username || !userDetails.password ? "" : ""
                }  w-[70%]  items-center justify-center  flex self-center text-white bg-black p-1`}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
