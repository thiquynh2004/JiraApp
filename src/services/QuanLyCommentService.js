/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyCommentService extends baseService {
    constructor(){
        super();
    }
    getAllComment = (taskId) => {
        return this.get(`api/Comment/getAll?taskId=${taskId}`);
    }
    insertComment = (model) => {
        return this.post(`api/Comment/insertComment`, model)
    }
    deleteComment = (idComment) => {
        return this.delete(`api/Comment/deleteComment?idComment=${idComment}`);
    }
    updateComment = (id,contentComment ) => {
        return this.put(`api/Comment/updateComment?id=${id}&contentComment=${contentComment}`)
    }
}

export const quanLyCommentService = new QuanLyCommentService();