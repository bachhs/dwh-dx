import { reactive } from 'vue';
export default {
    setup() {
        const data = reactive({
            indexSourceSelected: 0,
            dataSourceUnit: [
                {
                    name: "Sở Thông Tin \r\n& Truyền Thông",
                    imgUrl: "/custom-img/svg-icon/thong-tin-truyen-thong.svg"
                },
                {
                    name: "Sở Y Tế",
                    imgUrl: "/custom-img/svg-icon/medical.svg"
                },
                {
                    name: "Sở Giao thông\r\nvận tải",
                    imgUrl: "/custom-img/svg-icon/traffic-jam.svg"
                },
                {
                    name: "Sở Xây dựng",
                    imgUrl: "/custom-img/svg-icon/construction.svg"
                },
                {
                    name: "Sở Kế hoạch\r\n& Đầu tư",
                    imgUrl: "/custom-img/svg-icon/plan-investment.svg"
                }
            ]
        });
        return data;
    },
}