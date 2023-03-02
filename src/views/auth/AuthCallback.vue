<template>
    <div class="bg-white flex-fill text-navy d-flex align-items-center justify-content-center"
        style="background-color: #fff; height: 100vh;background-image: url('/custom-img/login-background.jpg'); background-size: cover;">
        <el-card>
            <div class="text-center">
                <div class="mt-3">
                    <img src="/custom-img/login-vector.svg" style="width: 100%; max-width: 30rem; min-width: 400px;" />
                </div>
                <div class="mt-3 d-flex align-items-center justify-content-center">
                    <div>
                        <div class="lds-loading"><div></div><div></div><div></div></div>
                    </div>
                    <h4 class="text-left ml-3">
                        Please wait a moment, <br/>we are processing your request...
                    </h4>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
    import SecurityHelper from '@/helpers/securityHelper';
    const securityHelper = new SecurityHelper();
    const accessToken = localStorage.getItem(securityHelper.getAccessTokenStoreName());
    securityHelper.signinRedirectCallback()
        .then((user:any) => {
            localStorage.setItem(securityHelper.getAccessTokenStoreName(), user.access_token);
            securityHelper.goToHomePage();        
        }).catch((e:any) => {
            console.error(e);
            securityHelper.goToLoginPage(); 
        });
</script>