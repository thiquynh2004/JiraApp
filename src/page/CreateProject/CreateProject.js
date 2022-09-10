/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Form, Input, message, Radio, Select } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import { createProjectAction, getProjectCategoryAction } from "../../redux/actions/QuanLyDuAnAction";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const navigate = useNavigate();
  const editorRef = useRef(null);
  const { arrProjectCategory } = useSelector(
    (state) => state.QuanLyDuAnReducer
  );
  console.log(arrProjectCategory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjectCategoryAction());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      projectName: "",
      description: "",
      categoryId: arrProjectCategory[0]?.id,
    },
    onSubmit: async (values) => {
      console.log("values", values);
      dispatch(createProjectAction(values));
      message.success({
        content: "Bạn đã tạo thành công rồi nhé",
        className: "message",
        style:{
          marginTop: '10vh',
        }
      })
      setTimeout(() => {
        navigate("/project-management")
     }, 3000)
    },
  });
  const handleChangeSelect = (value) => {
    formik.setFieldValue("categoryId", value);
  };
  const handleEditorChange = (content, editor) => {
    formik.setFieldValue("description", content);
  };
  return (
    <>
      <h1>Create Project</h1>
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
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Name">
          <Input name="projectName" onChange={formik.handleChange} />
        </Form.Item>
        {/* <Form.Item label="URL">
          <Input />
        </Form.Item> */}
        <Form.Item label="Description">
          <Editor
            name="description"
            tinymceScriptSrc={
              process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"
            }
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 500,
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

        <Form.Item label="Project Category">
          <Select
            name="categoryId"
            options={arrProjectCategory?.map((pjCategory, index) => ({
              label: pjCategory.projectCategoryName,
              value: pjCategory.id,
            }))}
            onChange={handleChangeSelect}
          ></Select>
        </Form.Item>
        <Form.Item label="...">
          <Button type="primary" htmlType="submit">
            Create Project
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
