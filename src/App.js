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
// import Modall from "./components/Modal/Modall";
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
function App() {
  return (
    <Routes history={history}>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomeTemplate />}>
          <Route path="/" element={<ProjectManagement />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/project-management" element={<ProjectManagement />} />
          <Route
            path="/project-management/edit/:projectId"
            element={<EditProject />}
          />
          <Route path="/project-detail/:id" element={<ProjectDetail />} />
          <Route path="/create-task" element={<CreateTask />} />
        </Route>
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
