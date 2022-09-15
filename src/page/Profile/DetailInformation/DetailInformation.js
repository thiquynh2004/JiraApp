import { Divider, Image, List } from "antd";
import React from "react";

import styles from "./detailInfomation.module.scss";

export default function DetailInformation(props) {
  const { userLogin } = props;
  console.log(userLogin);
  return (
    <div className={styles.detailInformation}>
      <Divider orientation="left">Thông tin cá nhân</Divider>
      
      <List
        size="large"
        header={
          <div>
            <Image width={200} src={userLogin.avatar} />
          </div>
        }
        bordered
      >
        <List.Item>
          <List.Item.Meta title="Họ tên" description={userLogin.name} />
        </List.Item>
        <List.Item>
          <List.Item.Meta title="Email" description={userLogin.email} />
        </List.Item>
        <List.Item>
          <List.Item.Meta
            title="Phone Number"
            description={userLogin.phoneNumber}
          />
        </List.Item>
      </List>
    </div>
  );
}
