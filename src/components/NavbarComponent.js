import { Typography } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const { Text } = Typography;

const NavbarComponent = ({ userDetails }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between p-3 items-center mx-4">
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
        className="text-red-500 font-bold text-[22px]"
      >
        tailwebs.
      </button>
      <div className="flex gap-2 items-center">
        <Text className="font-bold">Home</Text>
        <Text className="font-bold">{userDetails}</Text>
        <button
          onClick={() => {
            sessionStorage.removeItem("user");
            sessionStorage.removeItem("isUserLoggedIn");
            navigate("/");
          }}
        >
          <Text className="font-bold">Logout</Text>
        </button>
      </div>
    </div>
  );
};

export default NavbarComponent;
