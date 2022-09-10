/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyStatusService extends baseService {
    constructor(){
        super();
    }
    getAllStatus = () => {
        return this.get(`api/Status/getAll`);
    }
}

export const quanLyStatusService = new QuanLyStatusService();