import { Badge, Calendar, Modal } from "antd";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import NavbarComponent from "../components/NavbarComponent";

const CalenderEvents = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentDetails, setStudentDetails] = useState([]);
  const studentDetailsFromRedux = useSelector(
    (state) => state.studentsDataSlice.value
  );
  const [modalHeaderDate, setModalHeaderDate] = useState("");

  useEffect(() => {
    setStudentDetails(studentDetailsFromRedux);
  }, [studentDetailsFromRedux]);

  const [userData, setUserData] = useState([]);

  const getListData = (value) => {
    const formattedDate = format(new Date(value), "dd-MM-yyyy");

    let listData = studentDetails.filter(
      (ele, index) => ele.date === formattedDate
    );

    return listData || [];
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const getMonthData = (value) => {
    if (value.month() === 8) {
      return 1394;
    }
  };

  const filterUserData = (date) => {
    let listData = studentDetails.filter((ele, index) => ele.date === date);
    setUserData(listData);
  };

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };

  const dateCellRender = (value) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.key}>
            <Badge
              status={
                item.mark <= 35
                  ? "error"
                  : item.maks <= 55
                  ? "warning"
                  : "success"
              }
              text={item.name}
            />
          </li>
        ))}
      </ul>
    );
  };
  const cellRender = (current, info) => {
    if (info.type === "date") return dateCellRender(current);
    if (info.type === "month") return monthCellRender(current);
    return info.originNode;
  };
  return (
    <div className="p-10">
      {/* <NavbarComponent /> */}
      <Calendar
        className="border border-black p-3"
        fullscreen={true}
        cellRender={cellRender}
        onSelect={(date, { source }) => {
          if (source === "date") {
            setModalHeaderDate(format(new Date(date), "dd-MM-yyyy"));
            filterUserData(format(new Date(date), "dd-MM-yyyy"));
            showModal();
          }
        }}
      />
      <Modal
        title={`Student Details on : ${modalHeaderDate} `}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={false}
      >
        {userData && userData.length > 0 ? (
          userData.map((ele, index) => {
            return (
              <div key={ele.key} className="flex flex-col gap-1 p-3 my-2 ">
                <span>
                  Name :<label className="font-bold mx-2">{ele.name}</label>
                </span>
                <span>
                  Subject :
                  <label className="font-bold mx-2">{ele.subject}</label>
                </span>
                <span>
                  Marks: <label className="font-bold mx-2">{ele.mark}</label>
                </span>
              </div>
            );
          })
        ) : (
          <>No Data Available</>
        )}
      </Modal>
    </div>
  );
};
export default CalenderEvents;
