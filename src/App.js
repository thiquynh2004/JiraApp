import { Route, Routes } from "react-router-dom";
import "./App.scss";
// import Home from "./page/Home";
// import Home from "./page/Home";
import HomeTemplate from "./template/HomeTemplate/HomeTemplate";
import "antd/dist/antd.min.css";
import Login from "./page/Login/Login";
import CreateProject from "./page/CreateProject/CreateProject";
import ProjectManagement from "./page/Project Management/ProjectManagement";
import ProtectedRoute from "./Routes/ProtectedRoute";
import SignUp from "./page/SignUp/SignUp";
import PageNotFound from "./page/PageNotFound/PageNotFound";
import EditProject from "./page/Project Management/EditProject";
import ProjectDetail from "./page/ProjectDetail.js/ProjectDetail";
import CreateTask from "./page/CreateTask/CreateTask";
import Profile from "./page/Profile/Profile";

import Loading from "./components/Loading/Loading";
import UserManagement from "./page/UserManagement/UserManagement";
import EditUser from "./page/UserManagement/EditUser/EditUser";
function App() {
  return (
    <>
      <Loading />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomeTemplate />}>
            <Route path="/" element={<ProjectDetail />} />
            <Route path="/jira" element={<ProjectDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-project" element={<CreateProject />}></Route>
            <Route path="/project-management" element={<ProjectManagement />} />
            <Route
              path="/project-management/edit/:projectId"
              element={<EditProject />}
            ></Route>
            <Route path="/project-detail/:id" element={<ProjectDetail />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/admin/quanLyNguoiDung" element={<UserManagement />}/>
            <Route path="/admin/quanLyNguoiDung/:id" element={<EditUser />} />

          </Route>
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
