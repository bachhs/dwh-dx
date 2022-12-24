import type { ListTagResponse } from '@/types/tag';
import axios from 'axios';
export const tagApi = {
    tagList() {
        return axios.get<ListTagResponse>(`/meta/tag`);
    },
};
