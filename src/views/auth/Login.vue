<template>
    <div class="bg-white flex-fill text-navy d-flex align-items-center justify-content-center"
        style="background-image: url('/custom-img/login-background.jpg'); background-size: cover; height: 100vh;">
        <div style="widthL 100%; max-width: 32rem;"
            class="p-3">            
            <el-card v-loading="data.isLoading" 
                style="background-color: rgba(255,255,255, 0.85);"
                element-loading-text="Đang chuyển tới đang nhập...">
                <div class="mb-2 text-center">
                    <div class="mb-3">
                        <img src="/custom-img/login-logo.png" style="width: 40%; max-width: 10rem;" />
                    </div>
                    <h4 class="text-center d-none d-md-block"
                        style="line-height: 2rem;">
                        <strong>NỀN TẢNG SỐ HOÁ KẾT QUẢ THỦ TỤC HÀNH CHÍNH</strong>
                    </h4>
                    <h5 class="text-center d-block d-md-none"
                        style="line-height: 1.8rem;">
                        <strong>NỀN TẢNG SỐ HOÁ KẾT QUẢ THỦ TỤC HÀNH CHÍNH</strong>
                    </h5>
                    <h4><strong class="text-orange">TỈNH TUYÊN QUANG</strong></h4>
                </div>
                <div v-if="currentView.viewName === 'LOGIN'">
                    <div class="w-100">
                        <img src="/custom-img/login-vector.svg" />
                    </div>
                    <div class="mb-3">
                        <el-button type="primary" size="large" 
                            style="height: auto;"
                            class="w-100 pt-2 pb-2"
                            @click="loginPerform">
                            <div class="d-flex align-items-center">
                                <i class="fa-solid fa-lock fa-2x"></i>
                                <strong class="ml-3 mt-1" style="font-size: 110%;">ĐĂNG NHẬP HỆ THỐNG</strong>
                            </div>
                        </el-button>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';
    import SecurityHelper from '@/helpers/securityHelper';
    const securityHelper = new SecurityHelper();
    const data = reactive({
        isLoading: false,
    });
    const currentView = reactive({
        viewName: "LOGIN"
    });    
    const loginPerform = () => {
        data.isLoading = true;
        securityHelper.signinRedirect();
    };
    securityHelper.isLoggedIn().then(isLogined => {
            data.isLoading = true;
            setTimeout(() =>{
                if(isLogined !== null && isLogined === true) {
                    securityHelper.goToHomePage();
                }      
                else{                    
                    data.isLoading = false;
                }  
            }, 1000);
    }).catch(error => { 
        data.isLoading = false;
        console.error(error)
    });
    
</script>