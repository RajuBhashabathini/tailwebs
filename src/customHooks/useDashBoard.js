import { DownCircleOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { studentData } from "../utils/Redux/slices/studentsDataSlice";

const useDashBoard = () => {
  const tableDataFromRedux = useSelector(
    (state) => state.studentsDataSlice.value
  );
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [tableData, setTableData] = useState(tableDataFromRedux);
  const [editOrDeleteId, setEditOrDeleteId] = useState("");

  const dispatch = useDispatch();

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

  useEffect(() => {
    setTableData(tableDataFromRedux);
  }, [tableDataFromRedux]);

  const showEditModal = (keyProps, actionProps) => {
    setActionType(actionProps);
    setIsEditModalOpen(true);
    setIsDeleteModalOpen(false);
    setEditOrDeleteId(keyProps ? keyProps : "");
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditOrDeleteId("");
  };

  const showDeleteModal = (keyProps) => {
    setIsDeleteModalOpen(true);
    setIsEditModalOpen(false);
    setEditOrDeleteId(keyProps);
  };

  const handleDeleteOk = () => {
    let tableDataCopy = tableData.filter(
      (ele) => Number(ele.key) !== Number(editOrDeleteId)
    );
    setTableData(tableDataCopy);
    dispatch(studentData(tableDataCopy));
    setIsDeleteModalOpen(false);
    setEditOrDeleteId("");
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setEditOrDeleteId("");
  };

  const addUserToTable = (e) => {
    let tableDataCopy = [...tableData];
    let checkUser = tableDataCopy.filter(
      (ele, index) => ele.name === e.name && ele.subject === e.subject
    );
    let existingId = checkUser && checkUser.length > 0 && checkUser[0].key;

    if (existingId) {
      let copyData = tableData.map((ele, id) =>
        ele.key === existingId ? { ...ele, date: e.date, mark: e.mark } : ele
      );
      setTableData(copyData);
      dispatch(studentData(copyData));
    } else {
      tableDataCopy.push(e);
      setTableData(tableDataCopy);
      dispatch(studentData(tableDataCopy));
    }
    setIsEditModalOpen(false);
    setEditOrDeleteId("");
  };

  const editStudentDetailsFunc = (e) => {
    let tableDataCopy = tableData.map((ele, index) =>
      ele.key === e.key ? e : ele
    );
    setTableData(tableDataCopy);
    dispatch(studentData(tableDataCopy));
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
