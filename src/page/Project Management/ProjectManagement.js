/* eslint-disable no-unreachable */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  AutoComplete,
  Avatar,
  Button,
  List,
  message,
  Modal,
  Popover,
  Space,
  Table,
  Tag,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  assignUserProjectAction,
  deleteProjectAction,
  getAllProjectAction,
  removeUserFromProjectAction,
} from "../../redux/actions/QuanLyDuAnAction";
import { NavLink } from "react-router-dom";
import { getUsersAction } from "../../redux/actions/types/QuanLyNguoiDungAction";
import { displayLoadingAction } from "../../redux/actions/LoadingAction";

const { confirm } = Modal;
const { Option } = AutoComplete;
export default function ProjectManagement(props) {
  const [valueAutocomplete, setValueAutocomplete] = useState("");
  const [filteredInfo, setFilteredInfo] = useState({});
  const { projectList } = useSelector((state) => state.QuanLyDuAnReducer);
  const { arrUsers } = useSelector((state) => state.QuanLyNguoiDungReducer);
  console.log("arrUsers", arrUsers);
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
      render: (text, record, index) => {
        return <NavLink to={`/project-detail/${record.id}`}>{text}</NavLink>;
      },
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
      title: "Member",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title="Members in project"
                  content={() => {
                    return (
                      <List itemLayout="horizontal" style={{ width: "200px" }}>
                        {record.members?.map((item, index) => {
                          return (
                            <List.Item
                              key={index}
                              actions={[
                                <Button
                                  onClick={() => {
                                    const userProject = {
                                      projectId: record.id,
                                      userId: item.userId,
                                    };
                                    dispatch(
                                      removeUserFromProjectAction(userProject)
                                    );
                                  }}
                                  type="danger"
                                  key="list-loadmore-edit"
                                >
                                  <DeleteOutlined />
                                </Button>,
                              ]}
                            >
                              <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={item.name}
                              />
                            </List.Item>
                          );
                        })}
                      </List>
                    );
                  }}
                >
                  <Avatar src={member?.avatar} alt={member?.name} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

            <Popover
              placement="topLeft"
              title={"add user"}
              content={() => {
                return (
                  <AutoComplete
                    style={{
                      width: "100%",
                    }}
                    value={valueAutocomplete}
                    onSelect={(value, option) => {
                      const useProject = {
                        projectId: record.id,
                        userId: option.value,
                      };
                      setValueAutocomplete(option.children);
                      dispatch(assignUserProjectAction(useProject));
                    }}
                    onSearch={handleSearch}
                    onChange={handleChangeAutocomplete}
                    placeholder="input here"
                    key={index}
                  >
                    {arrUsers?.map((user) => (
                      <Option
                        key={user?.userId}
                        value={user?.userId.toString()}
                      >
                        {user?.name}
                      </Option>
                    ))}
                  </AutoComplete>
                );
              }}
              trigger="click"
            >
              <Button>+</Button>
            </Popover>
          </div>
        );
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

            <span
              onClick={() => {
                confirm({
                  title: "Do you delete project? ",
                  icon: <DeleteOutlined />,
                  content: (
                    <div>"Data related to this project will be lost?",</div>
                  ),

                  okText: "Yes",
                  okType: "danger",
                  cancelText: "No",

                  onOk() {
                    dispatch(deleteProjectAction(projectList.id));
                    message.success("Deleted successfully!!");
                    console.log("OK");
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

  const handleSearch = (value) => {
    dispatch(getUsersAction(value));
    console.log("value", value);
  };

  const handleChangeAutocomplete = (text) => {
    setValueAutocomplete(text);
  };

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
