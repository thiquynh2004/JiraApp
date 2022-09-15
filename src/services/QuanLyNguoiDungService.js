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
    getUsers =  (keyword) => {
        return this.get(`api/Users/getUser?keyword=${keyword}`)
    }
    getUserByProjectId = (idProject) => {
        return this.get(`api/Users/getUserByProjectId?idProject=${idProject}`)
    }
    editUser = (formData) => {
        return this.put(`/api/Users/editUser`, formData)
    }
}
export const quanLyNguoiDungService = new QuanLyNguoiDungService();