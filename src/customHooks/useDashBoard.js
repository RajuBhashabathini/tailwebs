import { DownCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useState } from "react";
import dataSource from "../mockData/dataSource";

const useDashBoard = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tableData, setTableData] = useState(dataSource);
  const [editOrDeleteId, setEditOrDeleteId] = useState("");

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
      title: "Date",
      dataIndex: "date",
      key: "date",
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
                    showEditModal(record.key, "edit");
                  }}
                >
                  Edit{" "}
                </button>
                <button
                  onClick={() => {
                    showDeleteModal(record.key);
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

  const showEditModal = (keyProps, actionProps) => {
    console.log("keyProps, actionProps :", keyProps, actionProps);
    setActionType(actionProps);
    setIsEditModalOpen(true);
    setIsDeleteModalOpen(false);
    setEditOrDeleteId(keyProps);
  };

  const showDeleteModal = (keyProps) => {
    setIsDeleteModalOpen(true);
    setIsEditModalOpen(false);
    setEditOrDeleteId(keyProps);
  };
  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditOrDeleteId("");
  };

  const addUserToTable = (e) => {
    console.log("e from the data", e);
    let tableDataCopy = [...tableData];
    let checkUser = tableDataCopy.filter(
      (ele, index) => ele.name === e.name && ele.subject === e.subject
    );
    let existingId = checkUser && checkUser.length > 0 && checkUser[0].key;

    if (existingId) {
      let copyData = tableData.map((ele, id) =>
        ele.key === existingId ? { ...ele, mark: e.mark } : ele
      );
      setTableData(copyData);
    } else {
      tableDataCopy.push(e);
      setTableData(tableDataCopy);
    }

    setIsEditModalOpen(false);
    setEditOrDeleteId("");
  };

  const handleDeleteOk = () => {
    let tableDataCopy = tableData.filter(
      (ele) => Number(ele.key) !== Number(editOrDeleteId)
    );
    setTableData(tableDataCopy);
    useDispatch(addU);
    setIsDeleteModalOpen(false);
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

  return {
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
  };
};

export default useDashBoard;
