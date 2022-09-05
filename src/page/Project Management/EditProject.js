/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Input, message, Row, Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import {
  getProjectCategoryAction,
  getProjectDetailAction,
  updateProjectAction,
} from "../../redux/actions/QuanLyDuAnAction";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";


export default function EditProject(props) {
  const editorRef = useRef(null);
  const navigate = useNavigate();
  const { projectDetail, arrProjectCategory } = useSelector(
    (state) => state.QuanLyDuAnReducer
  );

  console.log("projectDetail", projectDetail);
  console.log("arrProjectCategory", arrProjectCategory);
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProjectDetailAction(id));
  }, []);
  useEffect(() => {
    dispatch(getProjectCategoryAction());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      id: projectDetail?.id,
      projectName: projectDetail.projectName,
      description: projectDetail.description,
      categoryId: projectDetail.projectCategory?.id,
    },
    onSubmit: async(values) =>{
      console.log("values", values);
      dispatch(updateProjectAction(values));
      message.success(
        {
          content: "Project is updated successfully",
          className: "message",
          style: {
            marginTop: "10vh",
            fontSize: "20px",
          },
        },
        setTimeout(() => {
          navigate("/project-management")

          // history is available by design in this.props when using react-router
        }, 3000)
      );
    }

  })
  const handleChangeSelect = (value) => {
    formik.setFieldValue("categoryId", value);
    console.log("categoryId", value);
  };
  const handleEditorChange = (value) => {
    formik.setFieldValue("description");
  };
  return (
    <div className="edit-project">
      <h1>Edit {projectDetail.projectName}</h1>
      <Form layout="vertical" hideRequiredMark
       onSubmitCapture={formik.handleSubmit}>
        
        <Row gutter={16}>
        
          <Col span={8}>
            <Form.Item label="Project Name">
              <Input name="projectName" onChange={formik.handleChange} value={formik.values.projectName}/>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item label="Project Category">
              <Select
                value={projectDetail?.projectCategory?.id}
                name="categoryId"
                options={arrProjectCategory?.map((pjCategory, index) => ({
                  // key={index},
                  label: pjCategory.projectCategoryName,
                  value: pjCategory.id,
                }))}
                onChange={handleChangeSelect}
              ></Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Description">
              <Editor
                name="description"
                tinymceScriptSrc={
                  process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
                }
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue={formik.values.description}
                value={formik.values.description}
                init={{
                  minHeight: "40vh",
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
            <Form.Item label="">
              <Button type="primary" htmlType="submit">
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
