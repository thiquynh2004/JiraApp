import {
  Avatar,
  Button,
  Comment,
  Form,
  Input,
  Popconfirm,
  Tooltip,
} from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { Editor } from "@tinymce/tinymce-react";
import {
  deleteCommentAction,
  getAllCommentAction,
  insertCommentAction,
  updateCommentAction,
} from "../../../../redux/actions/QuanLyCommentAction";
import { getTaskDetailAction } from "../../../../redux/actions/QuanLyDuAnAction";
// import { getTaskDetailAction } from "../../../../redux/actions/QuanLyDuAnAction";
import styles from "./comment.module.scss";

const { TextArea } = Input;
export default function CommentModal(props) {
  const { taskDetail, listComment } = props;
  // console.log("taskDetail", taskDetail);
  // console.log("listComment", listComment);
  const dispatch = useDispatch();
  // const editorRef = useRef(null);
  const [comments, setComments] = useState({
    contentComment: "",
  });
  const [commentContent, setCommentContent] = useState(
    listComment.contentComment
  );
  const [visibleEditor, setVisibleEditor] = useState(false);
  // const [valueComment, setValueComment] = useState([""]);
  const handleSubmit = () => {
    if (!comments.contentComment) return;
    setTimeout(() => {
      const model = {
        taskId: taskDetail.taskId,
        contentComment: comments.contentComment,
      };
      console.log("model Comment", model);
      dispatch(insertCommentAction(model));
      dispatch();
    }, 1000);
  };

  const handleChange = (e) => {
    setComments({
      ...comments,
      contentComment: e.target.value,
    });
    console.log("commentChange", e.target.value);
    // setValueComment("contentComment", e.target.value);
  };

  return (
    <div className={styles.comment}>
      {/* render ra comment */}
      <div className={styles.listComment}>
        {taskDetail?.lstComment?.map((comment, index) => {
          return (
            <div key={index} className={styles.contentComment}>
              <div>
                <Comment
                  author={comment.name}
                  avatar={<Avatar src={comment.avatar} alt={comment.name} />}
                  content={comment.commentContent}
                  datetime={
                    <Tooltip title="2016-11-22 11:22:33">
                      <span>8 hours ago</span>
                    </Tooltip>
                  }
                />
              </div>
              <div className={styles.action}>
                <span
                  onClick={() => {
                    setVisibleEditor(!visibleEditor);
                  }}
                >
                  Edit
                </span>

                <Popconfirm
                  placement="rightTop"
                  title="Are you sure you want to delete this comment"
                  // onConfirm={deleteComment}
                  onConfirm={() => {
                    dispatch(deleteCommentAction(comment.id));
                    dispatch(getAllCommentAction(taskDetail.taskId));
                    dispatch(getTaskDetailAction(taskDetail.taskId));
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <span>Delete</span>
                </Popconfirm>

                {/* <span onClick={() =>{
                   dispatch(deleteCommentAction(comment.id));
                }}>Delete</span> */}
              </div>

              <div>
                {visibleEditor ? (
                  <div>
                    {/* <Editor
   
                    initialValue={comment.commentContent}
                    name="commentContent"
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
                      setCommentContent(content);
                      
                      console.log("content", content);
                    }}
                  /> */}
                    <TextArea
                      name="commentContent"
                      onChange={(e) => {
                        setCommentContent(e.target.value);
                        // commentContent = e.target.value;
                        // console.log("commentContent", commentContent)
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
                        const data = {
                          id: comment.id,
                          contentComment: commentContent,
                        };
                        console.log("Comment Update", data);
                        dispatch(
                          updateCommentAction(comment.id, commentContent)
                        );
                        dispatch(getTaskDetailAction(taskDetail.taskId));
                        dispatch(getAllCommentAction(taskDetail.taskId));

                        setVisibleEditor(!visibleEditor);
                      }}
                    >
                      Save
                    </Button>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Form
        onSubmitCapture={handleSubmit}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <TextArea
          placeholder="Add a comment"
          name="contentComment"
          showCount
          onChange={handleChange}
          style={{ width: "100%", height: "100px" }}
        />
        <Form.Item style={{ margin: "12px 0" }}>
          <Button type="primary" htmlType="submit">
            Add comment
          </Button>
          <Button htmlType="button">Cancel</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
