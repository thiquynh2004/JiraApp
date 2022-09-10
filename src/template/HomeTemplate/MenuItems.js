import {NavLink} from 'react-router-dom'
import { SettingOutlined } from '@ant-design/icons';


export const menuItems = [
  {
    label: (
      <NavLink to="/jira">Jira Board</NavLink>
    ),
    key: '1',
    icon: <SettingOutlined />,
  },
  {
    label: (
      <NavLink to="/create-project">Create Project</NavLink>
    ),
    key: '2',
    icon: <SettingOutlined />,
  },
  {
    label: (
      <NavLink to="/project-management">Project Management</NavLink>
    ),
    key: '3',
    icon: <SettingOutlined />,
  },
  {
    label: (
      <NavLink to="/jira">Jira Board</NavLink>
    ),
    key: '4',
    icon: <SettingOutlined />,
  },
  {
    label: (
      <NavLink to="/#">Jira Board</NavLink>
    ),
    key: '5',
    icon: <SettingOutlined />,
  }
]