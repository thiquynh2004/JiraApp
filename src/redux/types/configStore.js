import { configureStore } from "@reduxjs/toolkit";
import {QuanLyNguoiDungReducer} from "../reducers/QuanLyNguoiDungReducer"
import {QuanLyDuAnReducer} from "../reducers/QuanLyDuAnReducer"
import {QuanLyTaskReducer} from "../reducers/QuanLyTaskReducer"
import {QuanLyPriorityReducer} from "../reducers/QuanLyPriorityReducer"
import {QuanLyStatusReducer} from "../reducers/QuanLyStatusReducer"
import {LoadingReducer} from "../reducers/LoadingReducer"
import {QuanLyCommentReducer} from "../reducers/QuanLyCommentReducer"
// import {QuanLyCommentReducer} from "../reducers/QuanLyCommentReducer"
const store = configureStore({ 
    reducer:{
        QuanLyNguoiDungReducer,
        QuanLyDuAnReducer,
        QuanLyTaskReducer,
        QuanLyPriorityReducer,
        QuanLyStatusReducer,
        LoadingReducer,
        QuanLyCommentReducer,
        // QuanLyCommentReducer,
    }
});
export default store;