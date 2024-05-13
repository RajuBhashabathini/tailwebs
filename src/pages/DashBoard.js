import { DownCircleOutlined } from "@ant-design/icons";
import { Modal, Popover, Table, Typography } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditStudentDetails from "../components/EditStudentDetails";
import dataSource from "../mockData/dataSource";

const { Text } = Typography;

const DashBoard = () => {
  const navigate = useNavigate();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tableData, setTableData] = useState(dataSource);
  const [editOrDeleteId, setEditOrDeleteId] = useState("");
  const [actionType, setActionType] = useState("");

  const userDetails = sessionStorage.getItem("user");
  const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn");

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Mark",
      dataIndex: "mark",
      key: "mark",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex justify-around">
          <Popover
            content={
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => {
                    setActionType("edit");
                    showEditModal(true);
                    setEditOrDeleteId(record.key);
                  }}
                >
                  Edit{" "}
                </button>
                <button
                  onClick={() => {
                    showDeleteModal(true);
                    setEditOrDeleteId(record.key);
                  }}
                >
                  Delete
                </button>
              </div>
            }
            trigger="click"
          >
            <DownCircleOutlined />
          </Popover>
        </div>
      ),
    },
  ];

  const showEditModal = () => {
    setIsEditModalOpen(true);
    setIsDeleteModalOpen(false);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditOrDeleteId("");
  };

  const showDeleteModal = () => {
    setIsDeleteModalOpen(true);
    setIsEditModalOpen(false);
  };

  const handleDeleteOk = () => {
    setIsDeleteModalOpen(false);
    let tableDataCopy = tableData.filter(
      (ele) => Number(ele.key) !== Number(editOrDeleteId)
    );
    setTableData(tableDataCopy);
    setEditOrDeleteId("");
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setEditOrDeleteId("");
  };

  const editStudentDetailsFunc = (e) => {
    let tableDataCopy = tableData.map((ele, index) =>
      ele.key === e.key ? e : ele
    );
    setTableData(tableDataCopy);
    setIsEditModalOpen(false);
    setEditOrDeleteId("");
  };

  const addUserToTable = (e) => {
    let tableDataCopy = [...tableData];
    tableDataCopy.push(e);
    setTableData(tableDataCopy);
    setIsEditModalOpen(false);
    setEditOrDeleteId("");
  };


  return (
    <>
      {isUserLoggedIn ? (
        <div className="h-full w-full">
          <div className="flex justify-between p-3 items-center mx-4">
            <Text className="text-red-500 font-bold text-[22px]">
              tailwebs.
            </Text>
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
          <div className="p-10 bg-gray-100 ">
            <Table
              className=""
              dataSource={tableData}
              columns={columns}
              pagination={false}
            />
            <button
              onClick={() => {
                setIsEditModalOpen(true);
                setActionType("add");
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
