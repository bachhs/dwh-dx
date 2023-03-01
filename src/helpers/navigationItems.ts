export const navItems:Array<any> = [
    {
        type: 'navHeader',
        name: 'CÔNG CỤ NỀN',
    },
    {
        type: 'link',
        name: 'Trang chủ',
        icon: "fas fa-home",
        url: '/',
    },
    {
        type: 'relative-link',
        name: 'Quản trị - Trợ giúp',
        icon: 'fas fa-key',
        url: 'https://security.dtcsolution.vn',
    },
    {
        type: 'link',
        name: 'Q.lý thông tin danh mục',
        icon: 'fas fa-list',
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
        type: 'relative-link',
        name: 'IOC Y tế',
        icon: 'fas fa-briefcase-medical',
        url: 'https://covid-tq.dtcsolution.vn/login',
    },
    {
        type: 'navHeader',
        name: 'LUỒNG DỮ LIỆU',
    },
    {
        type: 'link',
        name: 'Lấy dữ liệu từ MSSQL',
        icon: 'fas fa-database',
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
            // {
            //     type: 'link',
            //     name: 'Từ tập tin sẵn có',
            //     url: '/data-source-file/file-upload',
            // },                             
            {
                type: 'link',
                name: 'Link tải lên không đăng nhập',
                url: '/data-source-file/file-embed-link',
            },     
        ]
    },
    {
        type: 'link',
        name: 'Lấy dữ liệu từ PostgreSQL',
        icon: 'fas fa-database',
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
        name: 'Lấy dữ liệu từ MySQL',
        icon: 'fas fa-database',
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
        name: 'Lấy dữ liệu từ Oracle',
        icon: 'fas fa-database',
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
        name: 'Lấy dữ liệu từ File',
        icon: 'fas fa-folder-open',
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
        name: 'Lấy dữ liệu từ API',
        icon: 'fas fa-bezier-curve',
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
        type: 'navHeader',
        name: 'KHO DỮ LIỆU TRUNG TÂM',
    },
    {
        type: 'link',
        name: 'Tích hợp dữ liệu mới',
        icon: 'fas fa-asterisk',
        url: '/before-digitalization-store/new-data-integration',        
        // childItems: [            
        //     {
        //         type: 'link',
        //         name: 'Từ các tập tin sẵn có',
        //         url: '/data-source-api/api-datasource',
        //     },            
        //     {
        //         type: 'link',
        //         name: 'Từ các CSDL cục bộ',
        //         url: '/data-source-api/version',
        //     },         
        //     {
        //         type: 'link',
        //         name: 'Từ các CSDL ngoài',
        //         url: '/data-source-api/progress',
        //     },              
        //     {
        //         type: 'link',
        //         name: 'Từ các CSDL đám mây',
        //         url: '/data-source-api/enrichment',
        //     },              
        //     {
        //         type: 'link',
        //         name: 'Cập nhật CSDL đám mây',
        //         url: '/data-source-api/enrichment',
        //     },              
        //     {
        //         type: 'link',
        //         name: 'Tích hợp bằng FTP',
        //         url: '/data-source-api/enrichment',
        //     },            
        //     {
        //         type: 'link',
        //         name: 'Cập nhật kết nối FTP',
        //         url: '/data-source-api/enrichment',
        //     },          
        //     {
        //         type: 'link',
        //         name: 'Tích hợp URL không phân trang',
        //         url: '/data-source-api/enrichment',
        //     },       
        //     {
        //         type: 'link',
        //         name: 'Tích hợp URL có phân trang',
        //         url: '/data-source-api/enrichment',
        //     },         
        //     {
        //         type: 'link',
        //         name: 'Cập nhật kết nối URL',
        //         url: '/data-source-api/enrichment',
        //     },         
        //     {
        //         type: 'link',
        //         name: 'Nhập từ DV lưu trữ cloud',
        //         url: '/data-source-api/enrichment',
        //     },          
        // ]
    },
    {
        type: 'link',
        name: 'Chuẩn hoá & làm giàu',
        icon: 'fas fa-check-square',
        url: '/standardize-enrichment',
        // childItems: [            
        //     {
        //         type: 'link',
        //         name: 'Không gian làm việc',
        //         url: '/standardize-enrichment/workspace',
        //     },            
        //     {
        //         type: 'link',
        //         name: 'Phân phối dữ liệu',
        //         url: '/standardize-enrichment/distribution',
        //     },         
        //     {
        //         type: 'link',
        //         name: 'Chất lượng dữ liệu',
        //         url: '/standardize-enrichment/quality',
        //     },              
        //     {
        //         type: 'link',
        //         name: 'Thanh chất lượng DL',
        //         url: '/standardize-enrichment/make-quality',
        //     },              
        //     {
        //         type: 'link',
        //         name: 'Chi tiết cột',
        //         url: '/standardize-enrichment/column-detail',
        //     },              
        //     {
        //         type: 'link',
        //         name: 'Chi tiết tập dữ liệu',
        //         url: '/standardize-enrichment/data-set-details',
        //     },             
        //     {
        //         type: 'link',
        //         name: 'Tìm kiếm bộ dữ liệu',
        //         url: '/standardize-enrichment/data-search',
        //     },         
        //     {
        //         type: 'link',
        //         name: 'Lọc dữ liệu',
        //         url: '/standardize-enrichment/data-search',
        //     },                
        //     {
        //         type: 'link',
        //         name: 'Công cụ thao tác nhanh',
        //         url: '/standardize-enrichment/export-to-store',
        //     },            
        //     {
        //         type: 'link',
        //         name: 'Biến đổi dữ liệu',
        //         url: '/standardize-enrichment/export-to-store-schedule',
        //     },  
        // ]
    },
    {
        type: 'navHeader',
        name: 'KHO DỮ LIỆU',
    },
    {
        type: 'link',
        name: 'Truy vấn Dữ liệu',
        icon: 'fas fa-search',
        url: '/before-digitalization-store/data-store'
    },
    {
        type: 'link',
        name: 'Duyệt các Phân vùng',
        icon: 'fas fa-cube',
        url: '/before-digitalization-store/data-store2'
    },
    {
        type: 'link',
        name: 'Dashboards',
        icon: 'fas fa-tachometer-alt',
        url: '/before-digitalization-store/data-store4'
    },
    {
        type: 'link',
        name: 'Lập lịch truy vấn Dữ liệu',
        icon: 'fas fa-calendar',
        url: '/before-digitalization-store/data-store3'
    },
    {
        type: 'link',
        name: 'Tải Dữ liệu từ Files',
        icon: 'fas fa-folder-open',
        url: '/before-digitalization-store/data-store5'
    },
    {
        type: 'link',
        name: 'Tải Dữ liệu từ Cloud Storage',
        icon: 'fas fa-cloud',
        url: '/before-digitalization-store/data-store6'
    },
    {
        type: 'link',
        name: 'Quản lý truy vấn Dữ liệu',
        icon: 'fas fa-tasks',
        url: '/before-digitalization-store/data-store7'
    },
    {
        type: 'navHeader',
        name: 'PHÂN TÍCH DỮ LIỆU',
    },    
    {
        type: 'link',
        name: 'Phân tích Dữ liệu',
        icon: 'fas fa-chart-area',
        url: '/before-digitalization-store/data-store7',
        childItems: [
            {
                type: 'link',
                name: 'Dân số',
                icon: 'fas fa-cube',
                url: '/digitization', 
            }, 
            {
                type: 'link',
                name: 'Y tế',
                icon: 'fas fa-cube',
                url: '/digitization', 
            }, 
            {
                type: 'link',
                name: 'Giáo dục & Đào tạo',
                icon: 'fas fa-cube',
                url: '/digitization', 
            }, 
            {
                type: 'link',
                name: 'Tư pháp',
                icon: 'fas fa-cube',
                url: '/digitization', 
            }, 
            {
                type: 'link',
                name: 'Bảo hiểm xã hội',
                icon: 'fas fa-cube',
                url: '/digitization', 
            }, 
            {
                type: 'link',
                name: 'Kế hoạch - Đầu tư',
                icon: 'fas fa-cube',
                url: '/digitization', 
            }, 
            {
                type: 'link',
                name: 'Giao thông - Vận tải',
                icon: 'fas fa-cube',
                url: '/digitization', 
            }, 
            {
                type: 'link',
                name: 'Văn hoá - Thể thao',
                icon: 'fas fa-cube',
                url: '/digitization', 
            }, 
            {
                type: 'link',
                name: 'Tài chính - Kho bạc',
                icon: 'fas fa-cube',
                url: '/digitization', 
            }, 
            {
                type: 'link',
                name: 'Xây dựng',
                icon: 'fas fa-cube',
                url: '/digitization', 
            },
            {
                type: 'link',
                name: 'Lao động',
                icon: 'fas fa-cube',
                url: '/digitization', 
            },
            {
                type: 'link',
                name: 'Thông tin & truyền thông',
                icon: 'fas fa-cube',
                url: '/digitization', 
            },
            {
                type: 'link',
                name: 'Nội vụ',
                icon: 'fas fa-cube',
                url: '/digitization', 
            },
        ]
    },
    
    {
        type: 'navHeader',
        name: 'SEARCH ENGINE',
    },
    {
        type: 'link',
        name: 'Quản lý & cấu hình tìm kiếm',
        icon: 'fas fa-search',
        url: '/digitization', 
    },
    {
        type: 'navHeader',
        name: 'KHAI THÁC DỮ LIỆU',
    }, 
    {
        type: 'link',
        name: 'Công cụ Wiki',
        icon: 'fas fa-search',
        url: '/digitization', 
    },  
    {
        type: 'link',
        name: 'Biểu diễn trực quan',
        icon: 'fas fa-search',
        url: '/digitization', 
    }, 
    {
        type: 'link',
        name: 'Chia sẻ dữ liệu',
        icon: 'fas fa-search',
        url: '/digitization', 
    },
];
