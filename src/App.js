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

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<} */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomeTemplate />}>
          <Route path="/jira" />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/project-management" element={<ProjectManagement />} />
          <Route path="/project-management/edit/:id" element={<EditProject />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
