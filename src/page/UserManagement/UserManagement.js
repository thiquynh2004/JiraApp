/* eslint-disable react-hooks/exhaustive-deps */
import { Input, Modal, Space, Table } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  EditOutlined,
  DeleteOutlined,

} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, getUsersAction } from "../../redux/actions/QuanLyNguoiDungAction";
const { confirm } = Modal;
const { Search } = Input;

export default function UserManagement() {
  const { arrUsers } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("arrUsers", arrUsers);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsersAction());
  }, []);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const data = arrUsers;
  const columns = [
    {
      title: "Id",
      dataIndex: "userId",
      key: "userId",
      sorter: (a, b) => a.userId - b.userId,
      sortOrder: sortedInfo.columnKey === "userId" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      filteredValue: filteredInfo.name || null,
      sorter: (a, b) => a.name.length - b.name.length,
      sortOrder: sortedInfo.columnKey === "name" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      filteredValue: filteredInfo.email || null,
      sorter: (a, b) => a.email.length - b.email.length,
      sortOrder: sortedInfo.columnKey === "email" ? sortedInfo.order : null,
      ellipsis: true,
    },
    
    {
        title: "Phone Number",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
      },
    {
      title: "Action",
      dataIndex: "maPhim",
      render: (text, user) => {
        return (
          <Fragment>
            <NavLink
              to={`/admin/quanLyNguoiDung/${user.userId}`}
              className="edit-user"
              style={{ fontSize: "20px" }}
            >
              <EditOutlined />
            </NavLink>
            <span
              onClick={() => {
                confirm({
                  title: "Are you sure to delete user?",
                  icon: <DeleteOutlined />,
                  content:
                    " ",
                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",

                  onOk() {
                      dispatch(deleteUserAction(user.userId));
                    console.log("OK");
                  },

                  onCancel() {
                    console.log("Cancel");
                  },
                });
              }}
              className="delete-user"
              style={{
                fontSize: "20px",
                margin: "0 8px",
                color: "red",
                cursor: "pointer",
              }}
            >
              <DeleteOutlined />
            </span>

          </Fragment>
        );
      },
    },
  ];
  const onSearch = (value) => {
    console.log(value);
    dispatch(getUsersAction(value));
  };
  return (
    <div className="user-management">
      <Search
        placeholder="Tìm kiếm nguời dùng"
        enterButton="Search"
        size="large"
        onSearch={onSearch}
        style={{
            marginBottom: '16px',
          }}
      />
      <Space
       
      ></Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        rowKey={"userId"}
      />
    </div>
  );
}
