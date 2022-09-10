import { Spin } from "antd";
import React, { Fragment } from "react";
import {useSelector } from "react-redux";
import styles from "./loading.module.scss";
export default function Loading(props) {

  const { isLoading } = useSelector((state) => state.LoadingReducer);
  return (
    <Fragment>
      {isLoading ? (
        <div className={styles.loading}>
          <Spin className={styles.spin} size="large" tip="Loading..."></Spin>
        </div>
      ) : (
        ""
      )}
    </Fragment>
  );
}
