import { Avatar, Card, Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { BookOutlined, UpSquareOutlined } from "@ant-design/icons";
import ModalDetail from "./ModalDetail/ModalDetail";
import { useDispatch } from "react-redux";
import { getTaskDetailAction } from "../../../redux/actions/QuanLyDuAnAction";

export default function ContentDetail(props) {
  const { projectDetail } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const renderCardProjectDetail = () => {
    return projectDetail.lstTask?.map((taskDetail, index) => {
      return (
        <Col key={index} span={6} style={{ width: "100%" }}>
          <Card title={taskDetail.statusName} bordered={false}>
            <div className="card-content">
              {taskDetail.lstTaskDeTail?.map((task, index) => {
                return (
                  <div
                    className="card-detail"
                    onClick={() => setOpen(true)}
                    style={{
                      backgroundColor: "#f0f8ff",
                      margin: "12px 0",
                    }}
                    key={index}
                  >
                    <div
                      onClick={() => {
                        dispatch(getTaskDetailAction(task.taskId));
                      }}
                    >
                      <p>{task.taskName}</p>
                      <div
                        className="block"
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div className="block-left">
                          <BookOutlined
                            style={{
                              fontSize: "20px",
                              color: "#52c41a",
                            }}
                          />
                          <UpSquareOutlined
                            style={{
                              fontSize: "20px",
                              color: "purple",
                            }}
                          />
                        </div>
                        <div className="block-right">
                          <div
                            className="avatar-group"
                            style={{ display: "flex" }}
                          >
                            {task.assigness?.map((assignee, index) => {
                              return (
                                <div className="avatar" key={index}>
                                  <Avatar
                                    src={assignee.avatar}
                                    alt={assignee.name}
                                  ></Avatar>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Modal
              title="Task Detail"
              centered
              open={open}
              onOk={() => setOpen(false)}
              onCancel={() => setOpen(false)}
              width={1000}
            >
              <ModalDetail />
            </Modal>
          </Card>
        </Col>
      );
    });
  };
  return (
    <div className="content-detail">
      <div className="site-card-wrapper">
        <Row gutter={16}>{renderCardProjectDetail()}</Row>
      </div>
    </div>
  );
}
