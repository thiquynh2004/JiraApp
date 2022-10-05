import axios from "axios"
import { DOMAIN,TokenCybersoft,TOKEN } from "../util/config"
// import { DOMAIN, TOKEN, TokenCybersoft } from "../util/setting/config"
export class baseService {
    get = (url) => {
        return axios({
            url:`${DOMAIN}/${url}`,
            method:'GET',
            headers:{TokenCybersoft,
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }
    post = (url,data) => {
        return axios({
            url:`${DOMAIN}/${url}`,
            data:data,
            method:'POST',
            headers:{
                TokenCybersoft,
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }
    put = (url,data) => {
        return axios({
            url:`${DOMAIN}/${url}`,
            data:data,
            method:'PUT',
            headers:{
                TokenCybersoft,
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`,
            }
        })
    }
    delete = (url) => {
        return axios({
            url:`${DOMAIN}/${url}`,
            method:'DELETE',
            headers:{
                TokenCybersoft,
                'Authorization': `Bearer ${localStorage.getItem(TOKEN)}`
            }
        })
    }


}