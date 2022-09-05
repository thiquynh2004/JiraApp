/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyNguoiDungService extends baseService {
    constructor(){
        super();
    }
    dangNhap = (thongTinDangNhap) => {
        return this.post(`api/Users/signin`, thongTinDangNhap);

    }
    signup = (thongTinDangKy) => {
        return this.post(`api/Users/signup`, thongTinDangKy);
    }
}
export const quanLyNguoiDungService = new QuanLyNguoiDungService();