import { configureStore } from "@reduxjs/toolkit";
import {QuanLyNguoiDungReducer} from "../reducers/QuanLyNguoiDungReducer"
import {QuanLyDuAnReducer} from "../reducers/QuanLyDuAnReducer"
import {QuanLyTaskReducer} from "../reducers/QuanLyTaskReducer"
import {QuanLyPriorityReducer} from "../reducers/QuanLyPriorityReducer"
import {QuanLyStatusReducer} from "../reducers/QuanLyStatusReducer"
const store = configureStore({ 
    reducer:{
        QuanLyNguoiDungReducer,
        QuanLyDuAnReducer,
        QuanLyTaskReducer,
        QuanLyPriorityReducer,
        QuanLyStatusReducer,
    }
});
export default store;