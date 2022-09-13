/* eslint-disable react-hooks/exhaustive-deps */
import { Editor } from "@tinymce/tinymce-react";
import { Button, Col, Form, Input, Row, Select, Slider } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createTaskAction,
  getAllProjectAction,
} from "../../redux/actions/QuanLyDuAnAction";
import { getAllPriorityAction } from "../../redux/actions/QuanLyPriorityAction";
import { getAllTaskAction } from "../../redux/actions/QuanLyTaskAction";
import {
  getUserByProjectAction,
  getUsersAction,
} from "../../redux/actions/types/QuanLyNguoiDungAction";
import { useFormik } from "formik";
import { getAllStatusAction } from "../../redux/actions/QuanLyStatusAction";
const { Option } = Select;

export default function CreateTask() {
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();

  const { projectList } = useSelector((state) => state.QuanLyDuAnReducer);
  const { taskList } = useSelector((state) => state.QuanLyTaskReducer);
  const { priorityList } = useSelector((state) => state.QuanLyPriorityReducer);
  const { arrUsers } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { arrStatus } = useSelector((state) => state.QuanLyStatusReducer);
  const { arrUserByProjects } = useSelector(
    (state) => state.QuanLyNguoiDungReducer
  );

  console.log("arrUserByProjects", arrUserByProjects);
  console.log("projectList", projectList);
  console.log("task", taskList);
  console.log("priorityList", priorityList);
  console.log("arrUsers", arrUsers);
  console.log("arrStatus", arrStatus);

  useEffect(() => {
    dispatch(getAllProjectAction());
  }, []);
  useEffect(() => {
    dispatch(getAllTaskAction());
  }, []);
  useEffect(() => {
    dispatch(getAllPriorityAction());
  }, []);
  useEffect((value) => {
    dispatch(getUsersAction((value = "")));
  }, []);
  useEffect((idProject) => {
    dispatch(getAllStatusAction(idProject));
  }, []);

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

  const editorRef = useRef(null);

  const userOption = arrUserByProjects.map((user, index) => {
    return { value: user.userId, label: user.name };
  });

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "",
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: "",
      typeId: "",
      priorityId: "",
    },
    onSubmit: (values) => {
      console.log("values", values);
      dispatch(createTaskAction(values));
     
    },
    
  });

  const handleChangeSelectProject = (idProject) => {
    dispatch(getUserByProjectAction(idProject));
    formik.setFieldValue("projectId", idProject);
  };
  const handleChangeSelectPriority = (value) => {
    console.log("priorityId", value);
    formik.setFieldValue("priorityId", value);
  };
  const handleChangeSelectTask = (value) => {
    console.log("typeId", value);
    formik.setFieldValue("typeId", value);
  };
  const handleEditorChange = (content, editor) => {
    formik.setFieldValue("description", content);
  };
  const handleChangeAssignees = (value) => {
    formik.setFieldValue("listUserAsign", value);
  };
  const handleChangeSelectStatus = (value) => {
    formik.setFieldValue("statusId", value);
  };

  // }
  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      onSubmitCapture={formik.handleSubmit}
    >
      <Form.Item label="Task name">
        <Input name="taskName" onChange={formik.handleChange} />
      </Form.Item>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Project">
            <Select
              name="projectId"
              options={projectList?.map((project, index) => ({
                label: project.projectName,
                value: project.id,
              }))}
              onChange={handleChangeSelectProject}
            ></Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Priority">
            <Select
              name="priorityId"
              options={priorityList?.map((priority, index) => ({
                label: priority.priority,
                value: priority.priorityId,
              }))}
              onChange={handleChangeSelectPriority}
            ></Select>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Task type">
            <Select
              name="typeId"
              options={taskList?.map((task, index) => ({
                label: task.taskType,
                value: task.id,
              }))}
              onChange={handleChangeSelectTask}
            ></Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item label="Status">
        <Select
          name="statusId"
          options={arrStatus?.map((status, index) => ({
            label: status.statusName,
            value: status.statusId,
          }))}
          onChange={handleChangeSelectStatus}
        ></Select>
      </Form.Item>
      <Form.Item label="Description">
        <Editor
          name="description"
          tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
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
          onEditorChange={handleEditorChange}
        />
      </Form.Item>
      <Row gutter={16} style={{ margin: "0 72px" }}>
        <Col span={10}>
          <div
            className="item"
            style={{ marginBottom: "20px ", paddingRight: "40px" }}
          >
            <p style={{ marginRight: "12px" }}>Assignees:</p>
        
            <Select
              // defaultValue={userOption}
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              options={userOption}
              optionFilterProp="label"
              placeholder="Please select"
              onChange={handleChangeAssignees}
              onSelect={(value) => {
                console.log("value", value);
              }}
            >
              {children}
            </Select>
          </div>
          <div className="item">
            <p>Original Estimate: </p>
            <Form.Item>
              <Input name="originalEstimate" onChange={formik.handleChange} />
            </Form.Item>
          </div>
        </Col>

        <Col span={14} style={{ paddingRight: "160px" }}>
          <div className="item">
            <p>Time Tracking</p>
            {/* <Form.Item label="Time tracking"> */}
            <Slider
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              defaultValue={30}
              tooltip={{
                open: true,
              }}
            />
            <div
              className="text-item"
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <h5>{timeTracking.timeTrackingSpent}h logged</h5>
              <h5>{timeTracking.timeTrackingRemaining}h remaining</h5>
            </div>
          </div>
          <div>
            <p>Time Spent</p>

            <Input
              name="timeTrackingSpent"
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingSpent: e.target.value,
                });
                formik.setFieldValue("timeTrackingSpent", e.target.value);
              }}
            />

            <p>Time remaining</p>
            <Input
              name="timeTrackingRemaining"
              onChange={(e) => {
                setTimeTracking({
                  ...timeTracking,
                  timeTrackingRemaining: e.target.value,
                });
                formik.setFieldValue("timeTrackingRemaining", e.target.value);
              }}
            />
          </div>
        </Col>
      </Row>
      <Form.Item style={{display: 'flex', justifyContent:'flex-end'}}>
        <Button type="primary" htmlType="submit"  style={{marginRight: '0'}}>
          Create Task
        </Button>
      </Form.Item>
    </Form>
  );
}


