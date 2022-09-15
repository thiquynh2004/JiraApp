import { Avatar, Card, Col, Modal, Row } from "antd";
import React, { useState } from "react";
import { BookOutlined, UpSquareOutlined } from "@ant-design/icons";
import ModalDetail from "./ModalDetail/ModalDetail";
import { useDispatch } from "react-redux";
import {
  getProjectDetailAction,
  getTaskDetailAction,
  updateStatusAction,
} from "../../../redux/actions/QuanLyDuAnAction";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function ContentDetail(props) {
  const { projectDetail } = props;
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleDragEnd = (result) => {
    let { source, destination } = result;
    let { projectId, taskId } = JSON.parse(result.draggableId);
    console.log("projectId", projectId);
    console.log("taskId", taskId);
    console.log("result", result);
    //Soure:  nơi đến
    if (
      !source.index === destination.index &&
      source.droppableId === destination.droppableId
    ) {
      return;
    }
    const data = {
      taskId: taskId,
      statusId: destination.droppableId,
    };
    console.log("data", data);
    dispatch(updateStatusAction(data));
    dispatch(getProjectDetailAction(projectId));
  };
  const renderCardProjectDetail = () => {
    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        {projectDetail.lstTask?.map((taskDetail, index) => {
          return (
            <Droppable droppableId={taskDetail.statusId} key={index}>
              {(provided) => {
                return (
                  <Col span={6} style={{ width: "100%" }}>
                    <Card
                      title={taskDetail.statusName}
                      bordered={false}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      key={index}
                    >
                      <div className="card-content">
                        {taskDetail.lstTaskDeTail?.map((task, index) => {
                          return (
                            <Draggable
                              key={task.taskId.toString()}
                              index={index}
                              // draggableId={task.taskId.toString()}
                              draggableId={JSON.stringify({
                                projectId: task.projectId,
                                taskId: task.taskId,
                              })}
                            >
                              {(provided) => {
                                return (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="card-detail"
                                    onClick={() => setOpen(true)}
                                    key={index}
                                  >
                                    <hr />
                                    <div
                                      onClick={() => {
                                        dispatch(
                                          getTaskDetailAction(task.taskId)
                                        );
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
                                            {task.assigness?.map(
                                              (assignee, index) => {
                                                return (
                                                  <div
                                                    className="avatar"
                                                    key={index}
                                                  >
                                                    <Avatar
                                                      src={assignee.avatar}
                                                      alt={assignee.name}
                                                    ></Avatar>
                                                  </div>
                                                );
                                              }
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      <hr style={{ margin: "4px 0px" }} />
                                    </div>
                                  </div>
                                );
                              }}
                            </Draggable>
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
                    {provided.placeholder}
                  </Col>
                );
              }}
            </Droppable>
          );
        })}
      </DragDropContext>
    );
  };
  return (
    <div className="content-detail">
      <div className="site-card-wrapper">
        <Row gutter={16}>{renderCardProjectDetail()}</Row>
      </div>
    </div>
  );
}
