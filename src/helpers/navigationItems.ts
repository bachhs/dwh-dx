export const navItems:Array<any> = [
    {
        type: 'navHeader',
        name: 'CÔNG CỤ NỀN',
    },
    {
        type: 'link',
        name: 'Trang chủ',
        icon: 'fas fa-cube',
        url: '/',
    },
    {
        type: 'relative-link',
        name: 'Quản trị - Trợ giúp',
        icon: 'fas fa-cube',
        url: 'http://14.225.11.181:9004/pfpro/ssoportal/',
    },
    {
        type: 'link',
        name: 'Q.lý thông tin danh mục',
        icon: 'fas fa-cube',
        url: '/category/organization',
        childItems: [            
            {
                type: 'link',
                name: 'Cơ quan thực hiện',
                url: '/category/organization',
            },        
            {
                type: 'link',
                name: 'Thông tin lĩnh vực',
                url: '/category/linh-vuc',
            },   
            {
                type: 'link',
                name: 'Thông tin cấp thủ tục',
                url: '/category/procedure-issue',
            },
            {
                type: 'link',
                name: 'Thông tin thủ tục H.chính',
                url: '/category/procedure-type',
            },
            {
                type: 'link',
                name: 'Thông tin dân tộc',
                url: '/category/ethnic',
            },
            {
                type: 'link',
                name: 'Thông tin tôn giáo',
                url: '/category/religion',
            },
            {
                type: 'link',
                name: 'Thông tin xã phường',
                url: '/category/wards',
            },
            {
                type: 'link',
                name: 'Thông tin Huyện/T.Phố',
                url: '/category/district',
            },
            {
                type: 'link',
                name: 'Thông tin Tỉnh/T.Phố',
                url: '/category/province',
            },
            {
                type: 'link',
                name: 'Chức vụ',
                url: '/category/position',
            },
            {
                type: 'link',
                name: 'Loại giấy tờ',
                url: '/category/profile-type',
            },
            {
                type: 'link',
                name: 'Công dân',
                url: '/category/citizen',
            },
            {
                type: 'link',
                name: 'Doanh nghiệp',
                url: '/category/enterprise',
            },
        ]
    },
    {
        type: 'navHeader',
        name: 'THU THẬP DỮ LIỆU',
    },
    {
        type: 'link',
        name: 'Luồng lấy dữ liệu từ File',
        icon: 'fas fa-cube',
        url: '/data-source-file',
        childItems: [            
            {
                type: 'link',
                name: 'Thông tin nguồn dữ liệu',
                url: '/data-source-file/file-server',
            },            
            {
                type: 'link',
                name: 'Phiên bản dữ liệu',
                url: '/data-source-file/version',
            },         
            {
                type: 'link',
                name: 'Cấu hình tiến trình',
                url: '/data-source-file/progress',
            },              
            {
                type: 'link',
                name: 'Làm giàu tự động',
                url: '/data-source-file/enrichment',
            },                           
            {
                type: 'link',
                name: 'Từ tập tin sẵn có',
                url: '/data-source-file/file-upload',
            },                             
            {
                type: 'link',
                name: 'Từ đường dẫn chia sẻ',
                url: '/data-source-file/file-embed-link',
            },     
        ]
    },
    {
        type: 'link',
        name: 'Luồng lấy dữ liệu từ API',
        icon: 'fas fa-cube',
        url: '/data-source-api',
        childItems: [            
            {
                type: 'link',
                name: 'Thông tin nguồn dữ liệu',
                url: '/data-source-api/api-datasource',
            },            
            {
                type: 'link',
                name: 'Phiên bản dữ liệu',
                url: '/data-source-api/version',
            },         
            {
                type: 'link',
                name: 'Cấu hình tiến trình',
                url: '/data-source-api/progress',
            },              
            {
                type: 'link',
                name: 'Làm giàu tự động',
                url: '/data-source-api/enrichment',
            },    
        ]
    },
    {
        type: 'link',
        name: 'Luồng lấy dữ liệu từ CSDL',
        icon: 'fas fa-cube',
        url: '/data-source-db',
        childItems: [            
            {
                type: 'link',
                name: 'Thông tin nguồn dữ liệu',
                url: '/data-source-db/data-source',
            },         
            {
                type: 'link',
                name: 'Cấu hình tiến trình',
                url: '/data-source-db/progress',
            },              
            {
                type: 'link',
                name: 'Làm giàu tự động',
                url: '/data-source-db/enrichment',
            },      
            {
                type: 'link',
                name: 'Từ CSDL cục bộ',
                url: '/data-source-db/local-db',
            },         
            {
                type: 'link',
                name: 'Từ CSDL khác',
                url: '/data-source-db/others-db',
            },              
            {
                type: 'link',
                name: 'Từ CSDL Cloud',
                url: '/data-source-db/cloud-db',
            },              
            {
                type: 'link',
                name: 'Cập nhật CSDL Cloud',
                url: '/data-source-db/cloud-db-update',
            },    
        ]
    },
    {
        type: 'navHeader',
        name: 'KHO TTHC TRƯỚC SỐ HOÁ',
    },
    {
        type: 'link',
        name: 'Tích hợp dữ liệu mới',
        icon: 'fas fa-cube',
        url: '/before-digitalization-store/new-data-integration',
    },
    {
        type: 'link',
        name: 'Kho dữ liệu ',
        icon: 'fas fa-cube',
        url: '/before-digitalization-store/data-store'
    },
    {
        type: 'link',
        name: 'Chuẩn hoá & làm giàu',
        icon: 'fas fa-cube',
        url: '/standardize-enrichment',
        childItems: [            
            {
                type: 'link',
                name: 'Tạo không gian làm việc',
                url: '/standardize-enrichment/workspace',
            },            
            {
                type: 'link',
                name: 'Phân phối dữ liệu',
                url: '/standardize-enrichment/distribution',
            },         
            {
                type: 'link',
                name: 'Chất lượng dữ liệu',
                url: '/standardize-enrichment/quality',
            },              
            {
                type: 'link',
                name: 'Thanh chất lượng DL',
                url: '/standardize-enrichment/make-quality',
            },              
            {
                type: 'link',
                name: 'Chi tiết cột',
                url: '/standardize-enrichment/column-detail',
            },              
            {
                type: 'link',
                name: 'Chi tiết tập dữ liệu',
                url: '/standardize-enrichment/data-set-details',
            },             
            {
                type: 'link',
                name: 'Tìm kiếm dữ liệu',
                url: '/standardize-enrichment/workspace',
            },            
            {
                type: 'link',
                name: 'Xuất dữ liệu vào kho',
                url: '/standardize-enrichment/data-search',
            },            
            {
                type: 'link',
                name: 'Xuất dữ liệu vào kho theo lịch',
                url: '/standardize-enrichment/export-to-store-schedule',
            },  
        ]
    },
    {
        type: 'navHeader',
        name: 'SỐ HOÁ DỮ LIỆU',
    },
    {
        type: 'link',
        name: 'Số hoá dữ liệu',
        icon: 'fas fa-cube',
        url: '/digitization',
        childItems: [
            {
                type: 'link',
                name: 'Đang chờ số hoá',
                url: '/digitization/pending',
            },
            {
                type: 'link',
                name: 'Đang số hoá',
                url: '/digitization/inprogress',
            },
            {
                type: 'link',
                name: 'Chờ xác nhận',
                url: '/digitization/wait-confirm',
            },
            {
                type: 'link',
                name: 'Chờ duyệt',
                url: '/digitization/wait-accept',
            },
            {
                type: 'link',
                name: 'Hoàn thành',
                url: '/digitization/completed',
            },
        ]
    },
    {
        type: 'navHeader',
        name: 'KHO TTHC CHUYÊN NGÀNH',
    },
    {
        type: 'link',
        name: 'Truy vấn kết quả TTHC',
        icon: 'fas fa-cube',
        url: '/query-result/all',
    },
    {
        type: 'link',
        name: 'D.Liệu KQ TTHC Sở/B.ngành',
        icon: 'fas fa-cube',
        url: '/data-result/departments',
    },
    {
        type: 'link',
        name: 'D.Liệu KQ TTHC',
        icon: 'fas fa-cube',
        url: '/data-result/all',
    },
    {
        type: 'navHeader',
        name: 'BÁO CÁO VÀ KHAI THÁC',
    },
    {
        type: 'link',
        name: 'Báo cáo tổng hợp',
        icon: 'fas fa-cube',
        url: '/report',
        childItems: [         
            {
                type: 'link',
                name: 'Thống kê kết nối hệ thống',
                url: '/report/monitor',
            },            
            {
                type: 'link',
                name: 'T.hợp KQ số hóa KQTTHC',
                url: '/report/report-digitization',
            },            
            {
                type: 'link',
                name: 'HS có file KQTTHC theo kỳ',
                url: '/report/profile-has-file-by-cycle',
            },         
            {
                type: 'link',
                name: 'HS không có file KQTTHC theo kỳ',
                url: '/report/profile-no-file-by-cycle',
            },              
            {
                type: 'link',
                name: 'KQ số hóa KQTTHC Sở/B.ngành',
                url: '/report/digitization-by-departments',
            },             
            {
                type: 'link',
                name: 'KQ số hóa KQTTHC TP/Huyện',
                url: '/report/digitization-by-district',
            },           
            {
                type: 'link',
                name: 'KQ số hóa KQTTHC Xã/Phường',
                url: '/report/digitization-by-wards',
            },
        ]
    },
    {
        type: 'link',
        name: 'Chia sẻ dữ liệu KQ TTHC',
        icon: 'fas fa-cube',
        url: '/shared/api-share-data',
    },
];
