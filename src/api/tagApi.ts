import type {
    AddTagCategoryRequest,
    AddTagRequest,
    ListTagResponse,
    TagCategory,
} from '@/types/tag';
import axios from 'axios';
import { omAxios } from '@/config/apiClients';

export const tagApi = {
    tagCategoryTypeList() {
        return axios.get<Array<string>>(`/meta/tag/category-types`);
    },
    tagList() {
        return omAxios.get<ListTagResponse>('/tags');
    },
    createTagCategory(request: AddTagCategoryRequest) {
        return omAxios.post('/tags', request);
    },
    updateTagCategory(tabCategoryName: string, request: AddTagCategoryRequest) {
        return omAxios.put(`/tags/${tabCategoryName}`, request);
    },
    deleteTagCategory(tagCategoryId: string) {
        return omAxios.delete(`/tags/${tagCategoryId}`);
    },
    getTagCategoryInfo(tagCategoryName: string) {
        return omAxios.get<TagCategory>(`/tags/${tagCategoryName}`, {
            params: {
                fields: 'usageCount',
            },
        });
    },
    createTag(tagCategoryName: string, request: AddTagRequest) {
        return omAxios.post(`/tags/${tagCategoryName}`, request);
    },
    updateTag(
        tagCategoryName: string,
        tagName: string,
        request: AddTagRequest
    ) {
        return omAxios.put(`/tags/${tagCategoryName}/${tagName}`, request);
    },
    deleteTag(tagCategoryName: string, tagId: string) {
        return omAxios.delete(`/tags/${tagCategoryName}/${tagId}`);
    },
};
