import axios from "axios";
export const tagApi = {
    tagList(){
        return axios.get(
            `/meta/tag`,
            { params: { page: 1, limit: 100 } }
        );
    },
    getTag(tagCategoryId:string){
        return axios.get(
            `/meta/tag/${tagCategoryId}`
        );
    },
    addTag(tagCategoryName :string, data:any){
        return axios.post(
            `/meta/tag/${tagCategoryName}`, 
            data
        );
    },
    updateTag(tagCategoryName:string, data:any){
        return axios.put(
            `/meta/tag/${tagCategoryName}`, 
            data
        );
    },
    updateTagByName(tagCategoryName:string, tagName:string, data:any){
        return axios.put(
            `/meta/tag/${tagCategoryName}/${tagName}`, 
            data
        );
    },
    deleteTag(tagCategoryId :string){
        return axios.delete(
            `/meta/tag/${tagCategoryId}`
        );
    },
}