/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Col,
  Row,
  Button,
  Form,
  Input,
  Select,
  Slider,
  Modal,
  Avatar,
  InputNumber,
  Popconfirm,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  DeleteOutlined,
  SendOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getAllStatusAction } from "../../../../redux/actions/QuanLyStatusAction";
import {
  getProjectDetailAction,
  removeTaskAction,
  removeUserFromTaskAction,
  updateAssignUserTaskAction,
  updateDescriptionAction,
  updateEstimateAction,
  updatePriorityAction,
  updateStatusAction,
  updateTimeTrackingAction,
} from "../../../../redux/actions/QuanLyDuAnAction";
import { getAllPriorityAction } from "../../../../redux/actions/QuanLyPriorityAction";
import { getAllTaskAction } from "../../../../redux/actions/QuanLyTaskAction";
import { Editor } from "@tinymce/tinymce-react";
import CommentModal from "./CommentModal";
import { getAllCommentAction } from "../../../../redux/actions/QuanLyCommentAction";
import styles from "./modalDetail.module.scss";
const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function ModalDetail(props) {
  const { setOpen } = props;
  const { taskDetail } = useSelector((state) => state.QuanLyDuAnReducer);
  const { arrStatus } = useSelector((state) => state.QuanLyStatusReducer);
  const { projectDetail } = useSelector((state) => state.QuanLyDuAnReducer);
  const { priorityList } = useSelector((state) => state.QuanLyPriorityReducer);
  const { taskList } = useSelector((state) => state.QuanLyTaskReducer);
  const { listComment } = useSelector((state) => state.QuanLyCommentReducer);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const dispatch = useDispatch();
  // console.log("taskDetail", taskDetail);
  // console.log("listComment", listComment);
  console.log("props", props);
  const userListOption = projectDetail.members
    ?.filter((member) => {
      let index = taskDetail.assigness?.findIndex(
        (user) => user.id === member.userId
      );
      if (index !== -1) {
        return false;
      }
      return true;
    })
    .map((member, index) => {
      return { value: member.userId, label: member.name };
    });

  const editorRef = useRef(null);
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });
  const [setValueTime] = useState("");
  const [contentDescription, setContentsDescription] = useState(
    taskDetail.description
  );
  const [estimate, setEstimate] = useState({
    originalEstimate: taskDetail.originalEstimate,
  });
  const handleChangeSelectStatus = (e) => {
    const contentStatus = {
      taskId: taskDetail.taskId,
      statusId: e,
    };
    dispatch(updateStatusAction(contentStatus));
    dispatch(getProjectDetailAction(projectDetail.id));
  };

  const handleChangeSelectPriority = (e) => {
    const model = {
      taskId: taskDetail.taskId,
      priorityId: e,
    };
    dispatch(updatePriorityAction(model));
    dispatch(getProjectDetailAction(projectDetail.id));
  };
  const handleChangeSelectTask = (e) => {};

  useEffect((idProject) => {
    dispatch(getProjectDetailAction(projectDetail.id));
    dispatch(getAllStatusAction(idProject));
  }, []);
  useEffect(() => {
    dispatch(getAllTaskAction());
    dispatch(getAllPriorityAction());
    dispatch(getAllCommentAction(taskDetail.taskId));
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleChangeTime = (e) => {
    const model = {
      taskId: taskDetail.taskId,
      timeTrackingSpent: timeTracking.timeTrackingSpent,
      timeTrackingRemaining: timeTracking.timeTrackingRemaining,
    };
    // console.log("MODEL DATA", model);
    dispatch(updateTimeTrackingAction(model));
    setIsModalOpen(false);
  };
  // const handleChangeEstimate = (e) => {
  //   console.log('estimate', e)
  // }
  const renderDescription = () => {
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              initialValue={taskDetail.description}
              name="description"
              tinymceScriptSrc={
                process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
              }
              onInit={(evt, editor) => (editorRef.current = editor)}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist",
                  "autolink",
                  "lists",
                  "link",
                  "image",
                  "charmap",
                  "anchor",
                  "searchreplace",
                  "visualblocks",
                  "code",
                  "fullscreen",
                  "insertdatetime",
                  "media",
                  "table",
                  "preview",
                  "help",
                  "wordcount",
                ],
                toolbar:
                  "undo redo | blocks | " +
                  "bold italic forecolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              onEditorChange={(content, editor) => {
                setContentsDescription(content);
                // console.log("content", content);
              }}
            />
            <Button
              type="default"
              onClick={() => {
                setVisibleEditor(!visibleEditor);
              }}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              onClick={() => {
                const model = {
                  taskId: taskDetail.taskId,
                  description: contentDescription,
                };
                // console.log("description Update", model);
                dispatch(updateDescriptionAction(model));
                setVisibleEditor(!visibleEditor);
              }}
            >
              Save
            </Button>
          </div>
        ) : (
          <div
            style={{ cursor: "pointer" }}
            dangerouslySetInnerHTML={{
              __html: `<p>${taskDetail.description}</p>`,
            }}
          ></div>
        )}
      </div>
    );
  };
  return (
    <div className="modal-detail">
      <Row>
        <Col span={16} style={{ padding: "0 10px" }}>
          <div className="task-type">
            <p>
              <BookOutlined />
              {taskDetail.taskName}
            </p>
            <Select
              style={{ width: "40%" }}
              value={taskDetail.typeId}
              name="typeId"
              options={taskList?.map((task, index) => ({
                label: task.taskType,
                value: task.id,
              }))}
              onChange={handleChangeSelectTask}
            ></Select>
            <h4>This is an Issues of Type : Task</h4>
          </div>

          <div
            className="description"
            style={{ cursor: "pointer" }}
            onClick={() => {
              setVisibleEditor(!visibleEditor);
            }}
          >
            <p>Description:</p>
            {renderDescription()}
          </div>

          <div className="comment" style={{ margin: "20px 0" }}>
            <CommentModal taskDetail={taskDetail} listComment={listComment} />
          </div>
        </Col>
        <Col span={8}>
          <div className={styles.action}>
            <span>
              <Link to="#" className={styles.link}>
                <SendOutlined />
                Give feedback
              </Link>
            </span>
            <span>
              <Link to="#" className={styles.link}>
                <CopyOutlined />
                Copy Link
              </Link>
            </span>
            <Popconfirm
              placement="topLeft"
              title="Are you sure to delete this task?"
              onConfirm={() => {
                dispatch(removeTaskAction(taskDetail.taskId));
                dispatch(getProjectDetailAction(projectDetail.id));
                setTimeout(() => {
                  setOpen(false);
                }, 1000);
              }}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined className={styles.icon} />
            </Popconfirm>
          </div>

          <div className="status">
            <h4>STATUS </h4>
            <Form.Item>
              <Select
                value={taskDetail.statusId}
                name="statusId"
                options={arrStatus?.map((status, index) => ({
                  label: status.statusName,
                  value: status.statusId,
                }))}
                onChange={handleChangeSelectStatus}
              ></Select>
            </Form.Item>
          </div>
          <div className="assignees" style={{ margin: " 30px 0" }}>
            <h4>ASSIGNEES</h4>
            <div style={{ display: "flex" }}>
              <Row gutter={16} style={{ width: "100%" }}>
                <Col span={24}>
                  <Select
                    name="assignee"
                    mode="multiple"
                    allowClear
                    style={{
                      width: "100%",
                    }}
                    options={userListOption}
                    optionFilterProp="label"
                    placeholder="Add user"
                    onSelect={(value) => {
                      console.log("value", value);
                      const userSelected = projectDetail.members.find(
                        (member) => member.userId == value
                      );
                      const model = {
                        taskId: taskDetail.taskId,
                        userId: userSelected.userId,
                      };
                      dispatch(updateAssignUserTaskAction(model));
                    }}
                  >
                    {children}
                  </Select>
                  <Col>
                    {taskDetail?.assigness?.map((assignee, index) => {
                      return (
                        <div
                          className="item"
                          key={index}
                          style={{
                            display: "flex",
                            border: "1px solid cyan",
                            // backgroundColor: "cyan",
                            margin: "4px 0",
                          }}
                        >
                          <div className="avatar">
                            <Avatar
                              src={assignee.avatar}
                              alt={assignee.avatar}
                            />
                          </div>
                          <p
                            onClick={() => {
                              const data = {
                                taskId: taskDetail.taskId,
                                userId: assignee.id,
                              };
                              dispatch(removeUserFromTaskAction(data));
                              console.log("deleteUser", data);
                            }}
                            style={{
                              display: "flex",
                              paddingTop: "6px",
                              cursor: "pointer",
                            }}
                          >
                            {assignee.name}
                            <CloseOutlined style={{ margin: "3px" }} />
                          </p>
                        </div>
                      );
                    })}
                  </Col>
                </Col>
              </Row>
            </div>
          </div>
          <div className="priority">
            <h4>PRIORITY</h4>
            <Select
              style={{ width: "100%" }}
              name="priorityId"
              value={taskDetail?.priorityTask?.priorityId}
              defaultValue={taskDetail?.priorityTask?.priorityId}
              options={priorityList?.map((priority, index) => ({
                label: priority.priority,
                value: priority.priorityId,
              }))}
              onChange={handleChangeSelectPriority}
            ></Select>
          </div>
          <div className="estimate">
            <h4>ORIGINAL ESTIMATE (HOURS)</h4>
            <InputNumber
              name="originalEstimate"
              value={taskDetail.originalEstimate}
              onChange={(e) => {
                setEstimate({
                  ...estimate,
                  originalEstimate: e,
                });
                if (!e || e === taskDetail.originalEstimate) {
                  return;
                } else {
                  const data = {
                    taskId: taskDetail.taskId,
                    originalEstimate: e,
                  };
                  console.log("estimate", data);
                  dispatch(updateEstimateAction(data));
                }
              }}
            />
          </div>
          <div className="time-tracking">
            <h4>
              <ClockCircleOutlined /> Time Tracking
            </h4>
            <div onClick={showModal}>
              <Slider
                defaultValue={Number(taskDetail.timeTrackingSpent)}
                value={Number(taskDetail.timeTrackingSpent)}
                max={
                  Number(taskDetail.timeTrackingSpent) +
                  Number(taskDetail.timeTrackingRemaining)
                }
                tooltip={{
                  open: true,
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h5>{Number(taskDetail.timeTrackingSpent)}h logged</h5>
              <h5>{Number(taskDetail.timeTrackingRemaining)}h remaining</h5>

              <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleChangeTime}
                onCancel={handleCancel}
              >
                <Row gutter={16}>
                  <Col span={12}>
                    <p>Time Spent</p>
                    <Input
                      name="timeTrackingSpent"
                      type="number"
                      onChange={(e) => {
                        setTimeTracking({
                          ...timeTracking,
                          timeTrackingSpent: e.target.value,
                        });
                        setValueTime("timeTrackingSpent", e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={12}>
                    <p>Time remaining</p>
                    <Input
                      name="timeTrackingRemaining"
                      type="number"
                      onChange={(e) => {
                        // console.log("e", e.target.value);
                        setTimeTracking({
                          ...timeTracking,
                          timeTrackingRemaining: e.target.value,
                        });
                        setValueTime("timeTrackingRemaining", e.target.value);
                      }}
                    />
                  </Col>
                </Row>
              </Modal>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
