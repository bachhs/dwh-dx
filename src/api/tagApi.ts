import type {
    AddTagCategoryRequest,
    AddTagRequest,
    ListTagResponse,
} from '@/types/tag';
import axios from 'axios';

export const tagApi = {
    tagList() {
        return axios.get<ListTagResponse>(`/meta/tag`);
    },
    createTagCategory(request: AddTagCategoryRequest) {
        return axios.post(`/meta/tag`, request);
    },
    updateTagCategory(tabCategoryName: string, request: AddTagCategoryRequest) {
        return axios.put(`/meta/tag/${tabCategoryName}`, request);
    },
    deleteTagCategory(tagCategoryName: string) {
        return axios.delete(`/meta/tag/${tagCategoryName}`);
    },
    createTag(tagCategoryName: string, request: AddTagRequest) {
        return axios.post(`/meta/tag/${tagCategoryName}`, request);
    },
    updateTag(
        tagCategoryName: string,
        tagName: string,
        request: AddTagRequest
    ) {
        return axios.put(`/meta/tag/${tagCategoryName}/${tagName}`, request);
    },
    deleteTag(tagCategoryName: string, tagName: string) {
        return axios.delete(`/meta/tag/${tagCategoryName}/${tagName}`);
    },
};