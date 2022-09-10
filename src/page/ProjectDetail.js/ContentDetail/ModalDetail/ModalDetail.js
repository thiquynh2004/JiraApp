/* eslint-disable react-hooks/exhaustive-deps */
import {
  Col,
  Row,
  Avatar,
  Button,
  Comment,
  Form,
  Input,
  List,
  Select,
  Slider,
} from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOutlined,
  BugOutlined,
  SnippetsOutlined,
  UnorderedListOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { Link } from "react-router-dom";
import { getAllStatusAction } from "../../../../redux/actions/QuanLyStatusAction";
import {
  getProjectDetailAction,
  getTaskDetailAction,
  updatePriorityAction,
  updateStatusAction,
} from "../../../../redux/actions/QuanLyDuAnAction";
import { getAllPriorityAction } from "../../../../redux/actions/QuanLyPriorityAction";
import { getAllTaskAction } from "../../../../redux/actions/QuanLyTaskAction";
import { CHANGE_VALUE_MODAL } from "../../../../redux/actions/types/QuanLyDuAnType";

const { TextArea } = Input;

const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
    itemLayout="horizontal"
    renderItem={(props) => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default function ModalDetail() {
  const { taskDetail } = useSelector((state) => state.QuanLyDuAnReducer);
  const { arrStatus } = useSelector((state) => state.QuanLyStatusReducer);
  const { projectDetail } = useSelector((state) => state.QuanLyDuAnReducer);
  const { priorityList } = useSelector((state) => state.QuanLyPriorityReducer);
  const { taskList } = useSelector((state) => state.QuanLyTaskReducer);
  const dispatch = useDispatch();
  console.log("taskDetail", taskDetail);
  // console.log("arrStatus", arrStatus);
  // console.log("projectDetail", projectDetail);
  // console.log("priorityList", priorityList);
  const [comments, setComments] = useState([]);
  // const [selected, setSelected] = useState({
  //   arrStatus,
  //   priorityList,
  // });
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: "Han Solo",
          avatar: "https://joeschmoe.io/api/v1/random",
          content: <p>{value}</p>,
          datetime: moment().fromNow(),
        },
      ]);
    }, 1000);
  };

  const handleChange = (e) => {};

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
    console.log("model", e);
    dispatch(updatePriorityAction(model));
    dispatch(getProjectDetailAction(projectDetail.id));
  };
  const handleChangeSelectTask = (e) => {};

  useEffect((idProject) => {
    dispatch(getAllStatusAction(idProject));
    dispatch(getProjectDetailAction(projectDetail.id));
  }, []);
  useEffect(() => {
    dispatch(getAllPriorityAction());
    dispatch(getAllTaskAction());
  }, []);

  // useEffect(() => {
  //   dispatch(getAllPriorityAction());
  // }, []);
  return (
    <div className="modal-detail">
      <Row>
        <Col span={16} style={{ padding: "0 10px" }}>
          <p>
            <BookOutlined />{taskDetail.taskName}
          </p>
          <Select 
          style={{width: "40%"}}
            value={taskDetail.typeId}
            name="typeId"
            options={taskList?.map((task, index) => ({
              label: task.taskType,
              value: task.id,
            }))}
            onChange={handleChangeSelectTask}
          ></Select>
          <h4>This is an Issues of Type : Task</h4>
          <p>Description:</p>
          <div
            dangerouslySetInnerHTML={{
              __html: `<p>${taskDetail.description}</p>`,
            }}
          ></div>
          <p>Jirs Software</p>
          <div className="list-task">
            <h4>
              BUG <BugOutlined />
            </h4>
            <p>Lorem ipsum dolor sit</p>
          </div>
          <div className="list-task">
            <h4>
              STORY <SnippetsOutlined />
            </h4>
            <p>Lorem ipsum dolor sit</p>
          </div>
          <div className="list-task">
            <h4>
              TASK <UnorderedListOutlined />
            </h4>
            <p>Lorem ipsum dolor sit</p>
          </div>
          <div className="comment">
            {comments.length > 0 && <CommentList comments={comments} />}
            <Comment
              avatar={
                <Avatar
                  src="https://joeschmoe.io/api/v1/random"
                  alt="Han Solo"
                />
              }
              content={
                <Editor
                  onChange={handleChange}
                  onSubmit={handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </div>
        </Col>
        <Col span={8}>
          <Link to="#">Give feedback</Link>
          <Link to="#">Copy Link</Link>
          <div className="item">
            <h4>STATUS </h4>
            <Form.Item>
              <Select
                // defaultValue={taskDetail?.statusId}
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
          <div className="item">
            <h4>ASSIGNEES</h4>
            <div style={{ display: "flex" }}>
              <Row gutter={16} style={{ width: "100%" }}>
                <Col span={20}>
                  {taskDetail?.assigness?.map((assignee, index) => {
                    return (
                      <div
                        className="item"
                        key={index}
                        style={{
                          display: "flex",
                          backgroundColor: "cyan",
                          margin: "4px 0",
                        }}
                      >
                        <div className="avatar">
                          <Avatar src={assignee.avatar} alt={assignee.avatar} />
                        </div>
                        <p style={{ display: "flex", paddingTop: "6px" }}>
                          {assignee.name}
                          <CloseOutlined />
                        </p>
                      </div>
                    );
                  })}
                </Col>
                <Col span={4}>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PlusOutlined />
                    <span>Add more</span>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
          <div className="item">
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
          <div className="item">
            <h4>ORIGINAL ESTIMATE (HOURS)</h4>
            <Input value={taskDetail.originalEstimate} />
          </div>
          <div className="item">
            <h4>
              <ClockCircleOutlined /> Time Tracking
            </h4>

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
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h5>{Number(taskDetail.timeTrackingSpent)}h logged</h5>
              <h5>{Number(taskDetail.timeTrackingRemaining)}h remaining</h5>
            </div>
          </div>
          <div>
            <p>Lorem 17 is</p>
            <p>Lorem 17 is</p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
