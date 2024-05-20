import { BookOutlined, ReadOutlined, UserOutlined } from "@ant-design/icons";
import { DatePicker, Divider, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

const { Text } = Typography;

const EditStudentDetails = ({
  action,
  userDetailsProps,
  onEditApply,
  onAddApply,
  keyPropsForNewUser,
  isEditModalOpen,
}) => {
  const initialUserDetails = {
    key: String(keyPropsForNewUser),
    name: "",
    subject: "",
    mark: "",
    date: "",
  };
  const [userDetails, setUserDetails] = useState(initialUserDetails);

  const [userNameError, setUserNameError] = useState(false);
  const [subjectNameError, setSubjectNameErrorError] = useState(false);
  const [markSheetError, setMarkSheetError] = useState(false);
  const [dateError, setDateError] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let userDetailsCopy = { ...userDetails };
    userDetailsCopy[name] = value;
    setUserDetails(userDetailsCopy);
  };

  const editValidation = () => {
    setUserNameError(!userDetails.name);
    setSubjectNameErrorError(!userDetails.subject);
    setMarkSheetError(!userDetails.mark);
    setDateError(!userDetails.date);

    if (
      userDetails.name &&
      userDetails.subject &&
      userDetails.mark &&
      userDetails.date
    ) {
      action === "edit" ? onEditApply(userDetails) : onAddApply(userDetails);
    }
  };

  const onDateChange = (date, dateString) => {
    let userDetailsCopy = { ...userDetails };
    userDetailsCopy["date"] = dateString;
    setUserDetails(userDetailsCopy);
  };

  useEffect(() => {
    if (isEditModalOpen) {
      if (action === "edit" && userDetailsProps) {
        setUserDetails(userDetailsProps);
      } else if (action === "add") {
        setUserDetails(initialUserDetails);
      }
    }
  }, [action, userDetailsProps, keyPropsForNewUser, isEditModalOpen]);



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
        {markSheetError && (
          <Text className="text-red-400">Please Enter Valid Marks</Text>
        )}
        <label>Date</label>
        <DatePicker
          name="date"
          format={"DD-MM-YYYY"}
          value={
            userDetails && userDetails.date
              ? dayjs(userDetails.date, "DD-MM-YYYY")
              : ""
          }
          onChange={onDateChange}
        />
        {dateError && (
          <Text className="text-red-400">Please Enter Valid Date</Text>
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
