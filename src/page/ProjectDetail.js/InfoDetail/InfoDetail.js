import { Avatar, Input } from "antd";
import React from "react";
import styles from "./info.module.scss";

const { Search } = Input;
export default function InfoDetail(props) {
  console.log("info", props);
  const { projectDetail } = props;
  const renderAvatar = () => {
    return projectDetail.members?.map((user, index) => {
      return (
        <div key={index}>
          <Avatar src={user.avatar} alt={user.avatar} style={{cursor: "pointer"}} onClick={()=>{
            
          }}/>
        </div>
      );
    });
  };
  return (
    <>
      <h1>{projectDetail.projectName}</h1>
      <div className={styles.info}>
        <div className={styles.search}>
          <Search
            placeholder="input search text"
            //   onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <div className={styles.avatarMember}>
          {renderAvatar()}
        </div>
        <div className={styles.text}>Only my Issues</div>
        <div className={styles.text}>Recently Updated</div>
      </div>
    </>
  );
}
