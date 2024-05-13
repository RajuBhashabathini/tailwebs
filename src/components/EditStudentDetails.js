import { BookOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { Divider, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";

const { Text } = Typography;

const EditStudentDetails = ({
  action,
  userDetailsProps,
  onEditApply,
  onAddApply,
  keyPropsForNewUser,
}) => {
  const [userDetails, setUserDetails] = useState("");

  const [userNameError, setUserNameError] = useState(false);
  const [subjectNameError, setSubjectNameErrorError] = useState(false);
  const [marksheetError, setMarksheetError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let userDetailsCopy = { ...userDetails };
    userDetailsCopy[name] = value;
    setUserDetails(userDetailsCopy);
  };

  const editValidation = () => {
    userDetails.name === "" ||
    userDetails.name === undefined ||
    userDetails.name === "null"
      ? setUserNameError(true)
      : setUserNameError(false);

    userDetails.subject === "" ||
    userDetails.subject === undefined ||
    userDetails.subject === "null"
      ? setSubjectNameErrorError(true)
      : setSubjectNameErrorError(false);

    userDetails.mark === "" ||
    userDetails.mark === undefined ||
    userDetails.mark === "null"
      ? setMarksheetError(true)
      : setMarksheetError(false);

    if (
      userDetails.name !== "" &&
      userDetails.subject !== "" &&
      userDetails.mark !== ""
    ) {
      action === "edit" ? onEditApply(userDetails) : onAddApply(userDetails);
    }
  };

  useEffect(() => {
    action === "edit"
      ? setUserDetails(userDetailsProps)
      : setUserDetails({
          key: String(keyPropsForNewUser),
          name: "",
          subject: "",
          mark: "",
        });
  }, [userDetailsProps]);

  return (
    <div>
      <div className="bg-white p-10 flex flex-col gap-2">
        <label>Name</label>
        <Input
          type="text"
          name="name"
          value={userDetails?.name}
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
        <label>Subject</label>

        <Input
          name="subject"
          value={userDetails?.subject}
          onChange={(e) => {
            handleInputChange(e);
          }}
          type="text"
          placeholder="Please Enter the Subject"
          prefix={
            <>
              <ReadOutlined />
              <Divider type="vertical" />
            </>
          }
        />
        {subjectNameError && (
          <Text className="text-red-400">Please Enter Valid Subject Name</Text>
        )}
        <label>Mark</label>

        <Input
          name="mark"
          value={userDetails?.mark}
          onChange={(e) => {
            handleInputChange(e);
          }}
          type="number"
          placeholder="Please Enter the Marks"
          prefix={
            <>
              <BookOutlined />
              <Divider type="vertical" />
            </>
          }
        />
        {marksheetError && (
          <Text className="text-red-400">Please Enter Valid Marks</Text>
        )}

        <button
          onClick={() => {
            editValidation();
          }}
          className="w-[70%] my-3 items-center justify-center  flex self-center text-white bg-black p-1"
        >
          {action === "edit" ? "Edit" : "Add"}
        </button>
      </div>
    </div>
  );
};

export default EditStudentDetails;
