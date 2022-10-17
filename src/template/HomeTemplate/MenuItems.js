import { NavLink } from "react-router-dom";
import {
  BankOutlined,
  CopyOutlined,
  UsergroupAddOutlined,
  ThunderboltOutlined,
  SettingOutlined,
  HighlightOutlined,
  CarOutlined,
  SwapOutlined,
} from "@ant-design/icons";

export const menuItems = [
  {
    label: <NavLink to="/jira">Jira Board</NavLink>,
    key: "1",
    icon: <BankOutlined />,
  },
  {
    label: <NavLink to="/create-project">Create Project</NavLink>,
    key: "2",
    icon: <HighlightOutlined />,
  },
  {
    label: <NavLink to="/project-management">Project Management</NavLink>,
    key: "3",
    icon: <SettingOutlined />,
  },
  {
    label: <NavLink to="/admin/quanLyNguoiDung">User management</NavLink>,
    key: "4",
    icon: <UsergroupAddOutlined />,
  },

  {
    label: <NavLink to="/issues">Issues and Filter</NavLink>,
    key: "5",
    icon: <SwapOutlined />,
  },
  {
    label: <NavLink to="/pages">Pages</NavLink>,
    key: "6",
    icon: <CopyOutlined />,
  },
  {
    label: <NavLink to="/reports">Reports</NavLink>,
    key: "7",
    icon: <ThunderboltOutlined />,
  },
  {
    label: <NavLink to="/Releases">Releases</NavLink>,
    key: "8",
    icon: <CarOutlined />,
  },
];
