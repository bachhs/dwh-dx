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
        url: '/ss',
        childItems: [            
            {
                type: 'link',
                name: 'Cơ quan thực hiện',
                url: '/ss',
            },        
            {
                type: 'link',
                name: 'Thông tin lĩnh vực',
                url: '/ss',
            },   
            {
                type: 'link',
                name: 'Thông tin cấp thủ tục',
                url: '/ss',
            },
            {
                type: 'link',
                name: 'Thông tin thủ tục H.chính',
                url: '/ss',
            },
            {
                type: 'link',
                name: 'Thông tin dân tộc',
                url: '/ss',
            },
            {
                type: 'link',
                name: 'Thông tin tôn giáo',
                url: '/ss',
            },
            {
                type: 'link',
                name: 'Thông tin xã phường',
                url: '/ss',
            },
            {
                type: 'link',
                name: 'Thông tin Huyện/T.Phố',
                url: '/ss',
            },
            {
                type: 'link',
                name: 'Thông tin Tỉnh/T.Phố',
                url: '/ss',
            },
            {
                type: 'link',
                name: 'Chức vụ',
                url: '/ss',
            },
            {
                type: 'link',
                name: 'Loại giấy tờ',
                url: '/ss',
            },
            {
                type: 'link',
                name: 'Công dân',
                url: '/ss',
            },
            {
                type: 'link',
                name: 'Doanh nghiệp',
                url: '/ss',
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
        url: '/ss',
        childItems: [            
            {
                type: 'link',
                name: 'Thông tin nguồn dữ liệu',
                url: '/ss',
            },            
            {
                type: 'link',
                name: 'Phiên bản dữ liệu',
                url: '/ss',
            },         
            {
                type: 'link',
                name: 'Cấu hình tiến trình',
                url: '/ss',
            },              
            {
                type: 'link',
                name: 'Làm giàu tự động',
                url: '/ss',
            },    
                       
            {
                type: 'link',
                name: 'Từ tập tin sẵn có',
                url: '/file-upload',
            },        
        ]
    },
    {
        type: 'link',
        name: 'Luồng lấy dữ liệu từ API',
        icon: 'fas fa-cube',
        url: '/ss',
        childItems: [            
            {
                type: 'link',
                name: 'Thông tin nguồn dữ liệu',
                url: '/api-datasource',
            },            
            {
                type: 'link',
                name: 'Phiên bản dữ liệu',
                url: '/ss',
            },         
            {
                type: 'link',
                name: 'Cấu hình tiến trình',
                url: '/ss',
            },              
            {
                type: 'link',
                name: 'Làm giàu tự động',
                url: '/ss',
            },    
        ]
    },
    {
        type: 'link',
        name: 'Luồng lấy dữ liệu từ CSDL',
        icon: 'fas fa-cube',
        url: '/ss',
        childItems: [            
            {
                type: 'link',
                name: 'Thông tin nguồn dữ liệu',
                url: '/data-source',
            },            
            {
                type: 'link',
                name: 'Phiên bản dữ liệu',
                url: '/ss',
            },         
            {
                type: 'link',
                name: 'Cấu hình tiến trình',
                url: '/ss',
            },              
            {
                type: 'link',
                name: 'Làm giàu tự động',
                url: '/ss',
            },      
            {
                type: 'link',
                name: 'Từ CSDL cục bộ',
                url: '/ss',
            },         
            {
                type: 'link',
                name: 'Từ CSDL khác',
                url: '/ss',
            },              
            {
                type: 'link',
                name: 'Từ CSDL Cloud',
                url: '/data-source',
            },              
            {
                type: 'link',
                name: 'Cập nhật CSDL Cloud',
                url: '/ss',
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
        url: '/ss',
        childItems: [ 
        ]
    },
    {
        type: 'link',
        name: 'Kho dữ liệu ',
        icon: 'fas fa-cube',
        url: '/file-upload'
    },
    {
        type: 'link',
        name: 'Chuẩn hoá & làm giàu',
        icon: 'fas fa-cube',
        url: '/ss',
        childItems: [            
            {
                type: 'link',
                name: 'Tạo không gian làm việc',
                url: '/ss',
            },            
            {
                type: 'link',
                name: 'Phân phối dữ liệu',
                url: '/ss',
            },         
            {
                type: 'link',
                name: 'Chất lượng dữ liệu',
                url: '/ss',
            },              
            {
                type: 'link',
                name: 'Thanh chất lượng DL',
                url: '/ss',
            },              
            {
                type: 'link',
                name: 'Chi tiết cột',
                url: '/ss',
            },              
            {
                type: 'link',
                name: 'Chi tiết tập dữ liệu',
                url: '/ss',
            },             
            {
                type: 'link',
                name: 'Tìm kiếm dữ liệu',
                url: '/ss',
            },            
            {
                type: 'link',
                name: 'Xuất dữ liệu vào kho',
                url: '/ss',
            },            
            {
                type: 'link',
                name: 'Xuất dữ liệu vào kho theo lịch',
                url: '/ss',
            },  
        ]
    },
    {
        type: 'navHeader',
        name: 'SỐ HOÁ DỮ LIỆU',
    },
    {
        type: 'link',
        name: 'Đang chờ số hoá',
        icon: 'fas fa-cube',
        url: '/ss',
    },
    {
        type: 'link',
        name: 'Đang số hoá',
        icon: 'fas fa-cube',
        url: '/ss',
    },
    {
        type: 'link',
        name: 'Dữ liệu đã số hoá',
        icon: 'fas fa-cube',
        url: '/ss',
    },
    {
        type: 'navHeader',
        name: 'KHO TTHC CHUYÊN NGÀNH',
    },
    {
        type: 'link',
        name: 'Truy vấn kết quả TTHC',
        icon: 'fas fa-cube',
        url: '/ss',
    },
    {
        type: 'link',
        name: 'D.Liệu KQ TTHC Sở/B.ngành',
        icon: 'fas fa-cube',
        url: '/ss',
    },
    {
        type: 'link',
        name: 'D.Liệu KQ TTHC',
        icon: 'fas fa-cube',
        url: '/ss',
    },
    {
        type: 'navHeader',
        name: 'BÁO CÁO VÀ KHAI THÁC',
    },
    {
        type: 'link',
        name: 'Báo cáo tổng hợp',
        icon: 'fas fa-cube',
        url: '/ss',
        childItems: [         
            {
                type: 'link',
                name: 'Thống kê kết nối hệ thống',
                url: '/monitor',
            },            
            {
                type: 'link',
                name: 'T.hợp KQ số hóa KQTTHC',
                url: '/ss',
            },            
            {
                type: 'link',
                name: 'HS có file KQTTHC theo kỳ',
                url: '/ss',
            },         
            {
                type: 'link',
                name: 'HS không có file KQTTHC theo kỳ',
                url: '/ss',
            },              
            {
                type: 'link',
                name: 'KQ số hóa KQTTHC cấp Sở/Ban, Ngành',
                url: '/ss',
            },             
            {
                type: 'link',
                name: 'KQ số hóa KQTTHC cấp TP/Huyện',
                url: '/ss',
            },           
            {
                type: 'link',
                name: 'KQ số hóa KQTTHC cấp Xã/Phường',
                url: '/ss',
            },
        ]
    },
    {
        type: 'link',
        name: 'Chia sẻ dữ liệu KQ TTHC',
        icon: 'fas fa-cube',
        url: '/api-datasource',
    },
];
