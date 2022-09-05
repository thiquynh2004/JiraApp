/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Space, Table, Tag } from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { getAllProjectAction } from "../../redux/actions/QuanLyDuAnAction";
import EditProject from "./EditProject";
import { NavLink } from "react-router-dom";

const { confirm } = Modal;

export default function ProjectManagement(props) {
  const [filteredInfo, setFilteredInfo] = useState({});
  const { projectList } = useSelector((state) => state.QuanLyDuAnReducer);
  console.log("projectList", projectList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllProjectAction());
  }, []);
  const [sortedInfo, setSortedInfo] = useState({});
  const data = projectList;
  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const clearFilters = () => {
    setFilteredInfo({});
  };

  const clearAll = () => {
    setFilteredInfo({});
    setSortedInfo({});
  };

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",

      sorter: (a, b) => a.id - b.id,
      sortOrder: sortedInfo.columnKey === "id" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",

      filteredValue: filteredInfo.projectName || null,
      onFilter: (value, record) => record.projectName.includes(value),
      sorter: (a, b) => a.projectName.length - b.projectName.length,
      sortOrder:
        sortedInfo.columnKey === "projectName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record, index) => {
        return (
          <div key={index} dangerouslySetInnerHTML={{ __html: text }}></div>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "categoryName",
      key: "categoryName",
      render: (text, record, index) => {
        return (
          <div key={index} dangerouslySetInnerHTML={{ __html: text }}></div>
        );
      },
      filters: [
        {
          text: projectList[0]?.categoryName,
          value: projectList[0]?.categoryName,
        },
      ],
      filteredValue: filteredInfo.categoryName || null,
      onFilter: (value, record) => record.categoryName.includes(value),
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortOrder:
        sortedInfo.columnKey === "categoryName" ? sortedInfo.order : null,
      ellipsis: true,
    },
    {
      title: "Creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="green">{record.creator?.name}</Tag>;
      },
      filters: [
        {
          text: projectList[0]?.creator.name,
          value: projectList[0]?.creator.id,
        },
      ],
      filteredValue: filteredInfo.categoryName || null,
      onFilter: (value, record) => record.categoryName.includes(value),
      sorter: (a, b) => a.categoryName.length - b.categoryName.length,
      sortOrder:
        sortedInfo.columnKey === "categoryName" ? sortedInfo.order : null,
      ellipsis: true,
    },

    {
      title: "",
      dataIndex: "id",
      render: (text, projectList) => {
        return (
          <Fragment>
            <NavLink
              to={`/project-management/edit/${projectList.id}`}
              className="edit-project"
              style={{ fontSize: "20px" }}
            >
              <EditOutlined />
            </NavLink>
            {/* <EditProject /> */}
            {/* <EditOutlined /> */}

            <span
              onClick={() => {
                confirm({
                  title: "Bạn có chắc muốn xóa tài khoản không?",
                  icon: <DeleteOutlined />,
                  content: (
                    <div>
                      <h1>Thi quynh nee</h1>
                      "Dữ liệu liên quan đến tài khoản này sẽ bị mất",
                    </div>
                  ),

                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",

                  onOk() {
                    // dispatch(xoaNguoiDung(users.taiKhoan));
                    // message.success("Xóa người dùng thành công");
                    // console.log("OK");
                  },

                  onCancel() {
                    console.log("Cancel");
                  },
                });
              }}
              className="delete-films"
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
  return (
    <>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        dataSource={data}
        onChange={handleChange}
        rowKey={"id"}
      />
    </>
  );
}
