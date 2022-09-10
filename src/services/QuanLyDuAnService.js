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
   updateProject = (projectId, formData) => {
    return this.put(`api/Project/updateProject?projectId=${projectId}`, formData)
   }
   deleteProject = (projectId) => {
    return this.delete(`api/Project/deleteProject?projectId=${projectId}`)
   }
   assignUserProject = (userProject) =>{
    return this.post(`api/Project/assignUserProject`, userProject)
   }
   removeUserFromProject = (userProject) =>{
    return this.post(`api/Project/removeUserFromProject`, userProject)
   }
   createTask=(formData) => {
    return this.post(`api/Project/createTask`, formData)
   }
   getTaskDetail(taskId) {
    return this.get(`api/Project/getTaskDetail?taskId=${taskId}`)
   }
   updateStatus = (contentStatus) => {
    return this.put(`api/Project/updateStatus`,contentStatus)
   }
   updatePriority = (model) => {
    return this.put(`api/Project/updatePriority`,model)
   }
}
export const quanLyDuAnService = new QuanLyDuAnService();