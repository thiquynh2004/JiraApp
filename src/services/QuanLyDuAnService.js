/* eslint-disable no-useless-constructor */
import { baseService } from "./baseService";

export class QuanLyDuAnService extends baseService {
    constructor(){
        super();
    }
   getProjectCategory = () => {
    return this.get(`api/ProjectCategory`);
   }
   createProject = (formData) => {
    return this.post(`api/Project/createProjectAuthorize`,formData)
   }
   getAllProject = () => {
    return this.get(`api/Project/getAllProject`)
   }
   getProductDetail = (id) => {
    return this.get(`api/Project/getProjectDetail?id=${id}`)
   }
   updateProject = (projectId,formData) => {
    return this.put(`api/Project/updateProject?projectId=${projectId}`, formData)
   }
}
export const quanLyDuAnService = new QuanLyDuAnService();