/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { USER_LOGIN } from "../util/config";

export default function ProtectedRoute() {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const navigate = useNavigate();
  console.log("userLogin", userLogin);
  useEffect(() => {
    if (!localStorage.getItem(USER_LOGIN)) {
      navigate("/login");
    }
  }, []);
  return <Outlet />;
}
