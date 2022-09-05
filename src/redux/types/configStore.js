import { configureStore } from "@reduxjs/toolkit";
import {QuanLyNguoiDungReducer} from "../reducers/QuanLyNguoiDungReducer"
import {QuanLyDuAnReducer} from "../reducers/QuanLyDuAnReducer"
const store = configureStore({ 
    reducer:{
        QuanLyNguoiDungReducer,
        QuanLyDuAnReducer,
    }
});
export default store;