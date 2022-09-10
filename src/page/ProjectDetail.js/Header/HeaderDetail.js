import { Breadcrumb } from "antd";
import React from "react";
// import { Link } from "react-router-dom";

export default function HeaderDetail(props) {
  console.log("props", props);
  const { projectDetail } = props;
  return (
    <div className="header-detail">
      <Breadcrumb>
        <Breadcrumb.Item>Project</Breadcrumb.Item>
        <Breadcrumb.Item>Project Learn</Breadcrumb.Item>
        <Breadcrumb.Item>Project Management</Breadcrumb.Item>
        <Breadcrumb.Item>{projectDetail.projectName}</Breadcrumb.Item>
        {/* <Breadcrumb.Item>An Application</Breadcrumb.Item> */}
      </Breadcrumb>
    </div>
  );
}
