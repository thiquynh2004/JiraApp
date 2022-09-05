import { quanLyNguoiDungService } from "../../../services/QuanLyNguoiDungService"
import { DANG_NHAP_ACTION } from "./QuanLyNguoiDungType";

export const dangNhapAction =(thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);
            if(result.data.statusCode === 200){
                dispatch({
                    type: DANG_NHAP_ACTION,
                    thongTinDangNhap: result.data.content
                })
            }
            console.log(result);
        } catch (error) {
            console.error("error", error.response?.data)
        }
    }
}

export const signUpAction = (thongTinDangKy) => {
    return async (dispatch) => {
        try {
            let result =  await quanLyNguoiDungService.signup(thongTinDangKy)
            console.log(result)
        } catch (error) {
            console.error("error", error.response?.data)
        }
    }
}