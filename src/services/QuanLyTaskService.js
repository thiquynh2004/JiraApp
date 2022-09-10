/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyTaskService extends baseService {
    constructor(){
        super();
    }
    getAllTasks = () => {
        return this.get(`api/TaskType/getAll`);
    }
}

export const quanLyTaskService = new QuanLyTaskService();