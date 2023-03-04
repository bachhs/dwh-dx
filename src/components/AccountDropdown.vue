<script setup lang="ts">
    import router from "@/router";
    import { Setting } from '@element-plus/icons-vue';
	import SecurityHelper from '@/helpers/securityHelper';
    const securityHelper = new SecurityHelper();
    const props = defineProps({
        isHideText: { type: Boolean, required: false, default: false },
        currentUser: { type: Object, required: false, default: {} }
    });
    const handleCommand = (command: any) => {
        if(command && command.cmdName) {
            switch(command.cmdName) {
                case 'logout':
                    securityHelper.signOut();
                    break;
                case 'openLinkInside':                    
                    router.push({ path: command.path });
                    break;
                case 'openLinkOutside': 
                    window.open(command.path);           
                    break;
            }
        }
    }
</script>
<template>
    <el-dropdown trigger="click" @command="handleCommand">
        <div class="el-dropdown-link">							
            <div class="d-flex align-items-center"
                style="line-height: 1.2rem;">
                <div>
                    <img src="/img/user2-160x160.jpg" 
                        onerror="this.src='/img/user2-160x160.jpg'"
                        style="width: 2.8rem; height: 2.8rem;" class="img-circle elevation-2"
                        alt="User Image">
                </div>
                <div class="ml-2" style="color: #b7b7b7;" v-if="!isHideText">
                    <div>
                        <strong>
                            {{currentUser.preferred_username ? currentUser.preferred_username : "Loading.."}}
                        </strong>
                    </div>
                    <div>
                        <span >
                            {{currentUser.email ? currentUser.email : "Loading.."}}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item :command="{ cmdName: 'openLinkOutside', path: currentUser.profileUrl }">
                    <div class="d-flex align-items-center"
                        style="line-height: 1.2rem;">
                        <div>
                            <img src="/img/user2-160x160.jpg" 
                                onerror="this.src='/img/user2-160x160.jpg'" 
                                style="width: 2.8rem; height: 2.8rem;" class="img-circle elevation-2"
                                alt="User Image">
                        </div>
                        <div class="ml-3">
                            <div>
                                <strong>
                                    {{currentUser.preferred_username ? currentUser.preferred_username : "Loading.."}}
                                </strong>
                            </div>
                            <div>
                                <span class="text-muted">
                                    {{currentUser.email ? currentUser.email : "Loading.."}}
                                </span>
                            </div>
                        </div>
                    </div>
                </el-dropdown-item>
                <el-dropdown-item :command="{ cmdName: 'openLinkOutside', path: currentUser.profileUrl }" divided>
                    <el-icon color="#409eff"><Setting /></el-icon>
                    <span>Thiết lập tài khoản</span>
                </el-dropdown-item>
                <el-dropdown-item :command="{ cmdName: 'logout' }" divided>
                    <el-icon color="#f00"><SwitchButton /></el-icon>
                    <span>Đăng xuất</span>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
