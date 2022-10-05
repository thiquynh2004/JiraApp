// /* eslint-disable react-hooks/exhaustive-deps */
// import React, { useEffect } from "react";
// import { PlusOutlined } from "@ant-design/icons";
// import { Form, Input, Button, Upload } from "antd";
// import { useParams } from "react-router-dom";
// import { useDispatch, useSelector} from "react-redux";
// import { getUsersAction } from "../../../redux/actions/QuanLyNguoiDungAction";
// import { useFormik } from "formik";

// export default function EditUser() {
//   const {userDetail} = useSelector((state) => state.QuanLyNguoiDungReducer);
//   console.log("userDetail", userDetail);
//   const {id} = useParams();
//   const dispatch = useDispatch();
//   useEffect(() => {
//     dispatch(getUsersAction(id))
//   },[])

//   const formik = useFormik({
//     initialValues:{
//       id: userDetail[0]?.userId,
//       passWord: null,
//       email: userDetail[0]?.email,
//       name: userDetail[0]?.name,
//   phoneNumber: userDetail[0]?.phoneNumber
//     },
//     onSubmit: (values) => {
//       console.log("values", values);
//     }
//   })
//   return (
//     <div className="edit-user">
//       <h3>Edit user</h3>
//       <Form
//         labelCol={{
//           span: 4,
//         }}
//         wrapperCol={{
//           span: 14,
//         }}
//         layout="horizontal"
//         onSubmitCapture={formik.handleSubmit}
//       >
//         <Form.Item label="Name">
//           <Input named="name" onChange={formik.handleChange} value={formik.values.name} />
//         </Form.Item>
//         <Form.Item label="Email">
//           <Input name="email" onChange={formik.handleChange}/>
//         </Form.Item>
//         <Form.Item label="Phone Number">
//           <Input name="phoneNumber" onChange={formik.handleChange}/>
//         </Form.Item>
//         {/* <Form.Item label="Upload" valuePropName="fileList">
//           <Upload action="/upload.do" listType="picture-card">
//             <div>
//               <PlusOutlined />
//               <div
//                 style={{
//                   marginTop: 8,
//                 }}
//               >
//                 Upload
//               </div>
//             </div>
//           </Upload>
//         </Form.Item> */}
//         <Form.Item label="Button">
//           <Button type="default" htmlType="submit">Edit</Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// }
import React from 'react'

export default function EditUser() {
  return (
    <div>EditUser</div>
  )
}
