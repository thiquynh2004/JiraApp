/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyPriorityService extends baseService {
    constructor(){
        super();
    }
    getAllPriority = () => {
        return this.get(`api/Priority/getAll`);
    }
}

export const quanLyPriorityService = new QuanLyPriorityService();