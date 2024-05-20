//? Importing Libraries
import { DownCircleOutlined } from "@ant-design/icons";
import { Modal, Popover, Table, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

//? Importing the User Defined Files
import EditStudentDetails from "../components/EditStudentDetails";
import NavbarComponent from "../components/NavbarComponent";
import dataSource from "../mockData/dataSource";
import CalenderEvents from "./CalenderEvents";
import useDashBoard from "../customHooks/useDashBoard";

import { useDispatch } from "react-redux";

//? De-structuring Libraries
const { Text } = Typography;

const DashBoard = () => {
  const navigate = useNavigate();
  const {
    isEditModalOpen,
    actionType,
    columns,
    isDeleteModalOpen,
    tableData,
    editOrDeleteId,
    showEditModal,
    handleEditCancel,
    editStudentDetailsFunc,
    addUserToTable,
    handleDeleteOk,
    handleDeleteCancel,
  } = useDashBoard();
  const [openCalender, setOpenCalender] = useState(false);

  const userDetails = sessionStorage.getItem("user");
  const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn");

  return (
    <>
      {isUserLoggedIn ? (
        <div className="h-full w-full">
          <NavbarComponent userDetails={userDetails} />
          <div className="p-10 bg-gray-100 flex flex-col gap-3">
            <button
              className="border w-[15%] bg-black text-white borer-black p-1 "
              onClick={() => {
                navigate("/calender");
              }}
            >
              {openCalender ? "Close Calender" : "Open Calender"}
            </button>
            {openCalender && <CalenderEvents />}
            <Table
              className=""
              dataSource={tableData}
              columns={columns}
              pagination={false}
            />
            <button
              onClick={() => {
                showEditModal("add");
              }}
              className="mt-4 w-[15%] items-center justify-center  flex  text-white bg-black p-3"
            >
              Add
            </button>
          </div>
          <div>
            <Modal
              title={
                actionType === "edit" ? "Edit User Details" : "Add user Details"
              }
              open={isEditModalOpen}
              onCancel={handleEditCancel}
              footer={null}
            >
              <EditStudentDetails
                userDetailsProps={
                  tableData.filter((ele) => ele.key === editOrDeleteId)[0]
                }
                action={actionType}
                onEditApply={editStudentDetailsFunc}
                onAddApply={addUserToTable}
                keyPropsForNewUser={
                  tableData && tableData.length > 0
                    ? +tableData[tableData.length - 1]["key"] + 1
                    : 1
                }
              />
            </Modal>
          </div>
          <div>
            <Modal
              title="Delete User"
              open={isDeleteModalOpen}
              onOk={handleDeleteOk}
              onCancel={handleDeleteCancel}
            >
              <h1>Are you Sure You want to Delete the User Details ?</h1>
            </Modal>
          </div>
        </div>
      ) : (
        <h1>Please Login to Viw the Student Details</h1>
      )}
    </>
  );
};

export default DashBoard;
