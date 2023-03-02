<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { RouterLink, RouterView, useRoute } from 'vue-router';
import { navItems } from '@/helpers/navigationItems';
import { useDataCategoryStore } from '@/stores/dataCategory';
const route = useRoute();
const dataCategoryStore = useDataCategoryStore();
dataCategoryStore.getOrganization();
dataCategoryStore.getAppParams();
const linkTime = ref(new Date().getTime());
const toggleMenu = (navItem:any) => {
    if(navItem.hasOwnProperty('toggleSubMenu')){
        navItem.toggleSubMenu = !navItem.toggleSubMenu;
    }
    else{
        navItem.toggleSubMenu = true;
    } 
}; 
const navItemsRef = ref(navItems);
watch(() => route.path, (newValRoutePath) => { 
    var foundedNavs = navItemsRef.value.find(xNav => { 
        return xNav.toggleSubMenu && xNav.url && !newValRoutePath.startsWith(xNav.url);
    });
    if(foundedNavs && foundedNavs !== null){
        foundedNavs.toggleSubMenu = false;
    }
})
onMounted(() => {
    var foundedNav = navItemsRef.value.find(xNav => { 
        return xNav.url && route.path.startsWith(xNav.url);
    });
    if(foundedNav && foundedNav !== null){
        foundedNav.toggleSubMenu = true;
    }
    setInterval(() => {
        linkTime.value = new Date().getTime();
    }, 1000);
});
</script>
<template>
    <div class="wrapper w-100">
        <!-- ./wrapper -->
        <!-- Navbar -->
        <nav
            class="main-header navbar navbar-expand bg-header-color d-flex align-items-center">
            <!-- Left navbar links -->
            <ul class="navbar-nav d-flex align-items-center">
                <li class="nav-item d-inline-block">
                    <a
                        class="nav-link text-white nav-bars-btn pl-1 pr-1"
                        data-widget="pushmenu"
                        href="#"
                        role="button"
                        ><i class="fas fa-bars text-white fa-2x"></i
                    ></a>
                </li>
                <li>
                    <div class="d-flex align-item-center ml-3 ml-md-2">
                        <div>
                            <img
                                src="/custom-img/quochuy.png"
                                alt="KHO DỮ LIỆU DÙNG CHUNG - TỈNH TUYÊN QUANG"
                                style="width: 2.8rem" />
                        </div>
                        <div
                            class="ml-1 ml-md-2 text-left d-flex flex-column align-item-center justify-content-center"
                            style="line-height: 1.4rem">
                            <div>
                                <strong class="text-white">NỀN TẢNG SỐ HOÁ KẾT QUẢ </strong>
                                <strong class="text-white d-none d-md-inline">THỦ TỤC HÀNH CHÍNH</strong>
                                <strong class="text-white d-inline d-md-none">TTHC</strong>
                            </div>
                            <div class="d-none d-md-block text-warning">
                                TỈNH TUYÊN QUANG
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <li class="pt-1 mr-2 d-none d-md-block">
                    <a class="btn btn-primary" href="https://wiki-dx.dtcsolution.vn"
                        target="_blank" style="height: auto;">
                        WIKI
                    </a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link pt-2 pb-2" data-toggle="dropdown" href="#" style="height: auto;">
                        <el-tooltip content="Danh sách ứng dụng">
                            <i class="far fa-th-large text-white fa-2x"></i> 
                        </el-tooltip>
                    </a>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right p-3">
                        <a href="http://14.225.11.181:9004/pfpro/ssoportal/" target="_blank" class="dropdown-item">
                            <div class="w-100 d-flex">
                                <div style="width: 2em;"><i class="fas fa-key text-primary mr-2"></i></div>
                                <div>Quản trị - Trợ giúp</div>
                            </div>
                        </a> 
                        <a href="#" class="dropdown-item">
                            <div class="w-100 d-flex">
                                <div style="width: 2em;"><i class="fas fa-list text-primary mr-2"></i></div>
                                <div>Quản lý thông tin danh mục</div>
                            </div>
                        </a> 
                    </div>
                </li>
                <!-- Notifications Dropdown Menu -->
                <li class="nav-item dropdown d-none d-md-block">
                    <a class="nav-link" data-toggle="dropdown" href="#" style="height: auto;">
                        <i class="far fa-bell text-white fa-2x"></i>
                        <span class="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div
                        class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span class="dropdown-item dropdown-header"
                            >15 Notifications</span
                        >
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-envelope mr-2"></i> 4 new messages
                            <span class="float-right text-muted text-sm"
                                >3 mins</span
                            >
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-users mr-2"></i> 8 friend requests
                            <span class="float-right text-muted text-sm"
                                >12 hours</span
                            >
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="#" class="dropdown-item">
                            <i class="fas fa-file mr-2"></i> 3 new reports
                            <span class="float-right text-muted text-sm"
                                >2 days</span
                            >
                        </a>
                        <div class="dropdown-divider"></div>
                        <a href="https://keycloak.dtcsolution.vn/realms/tuyen-quang/protocol/openid-connect/logout" class="dropdown-item dropdown-footer"
                            >See All Notifications</a
                        >
                    </div>
                </li>
                <li class="nav-item ml-3">
                    <!-- Sidebar user (optional) -->
                    <el-dropdown trigger="click">
                        <div class="el-dropdown-link">
                            <div class="image">
                                <img
                                    src="/img/user2-160x160.jpg"
                                    style="width: 2.8rem"
                                    class="img-circle elevation-2"
                                    alt="User Image" />
                            </div>
                        </div>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="a">
                                    <el-icon color="#409eff">
                                        <User />
                                    </el-icon>
                                    <span>Hồ sơ của bạn</span>
                                </el-dropdown-item>
                                <el-dropdown-item command="b">
                                    <el-icon color="#409eff">
                                        <Setting />
                                    </el-icon>
                                    <span>Thiết lập tài khoản</span>
                                </el-dropdown-item>
                                <el-dropdown-item command="e" divided>
                                    <el-icon color="#f00">
                                        <SwitchButton />
                                    </el-icon>
                                    <span>Đăng xuất</span>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </li>
            </ul>
        </nav>
        <!-- /.navbar -->
        <!-- Main Sidebar Container -->
        <aside class="main-sidebar main-sidebar-custom sidebar-dark-primary">
            <!-- Sidebar -->
            <div class="sidebar" style="height: calc(100% + 1px)">
                <!-- Sidebar Menu -->
                <nav class="mt-0">
                    <ul
                        class="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu">
                        <!-- data-accordion="false" -->
                        <!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library -->

                        <li
                            v-bind:class="{
                                'nav-item': ['link', 'relative-link'].includes(navItem.type),
                                'nav-header': navItem.type === 'navHeader',                                
                                'menu-is-opening':  navItem.toggleSubMenu,
                                'menu-open':navItem.toggleSubMenu,
                                'navItem-actived': navItem.toggleSubMenu && (navItem.childItems)
                            }"
                            v-for="(navItem, navItemIndex) in navItemsRef"
                            :key="navItemIndex">
                            <router-link
                                v-if="navItem.type === 'link' && !(navItem.childItems)"
                                :to="`${navItem.url}`"
                                class="nav-link pl-1"
                                active-class="active">
                                <i :class="`nav-icon ${navItem.icon}`"></i>
                                <p>{{ navItem.name }}</p>
                            </router-link>
                            <a class="nav-link pl-1" :href="navItem.url" 
                                v-if="navItem.type === 'relative-link' && !(navItem.childItems)" 
                                target="_blank">
                                <i :class="`nav-icon ${navItem.icon}`"></i>
                                <p>{{ navItem.name }}</p>
                            </a>
                            <span class="text-orange" v-if="navItem.type === 'navHeader' && !(navItem.childItems)">
                                {{ navItem.name }}
                            </span> 
                            <a href="javascript:void(0);" class="nav-link nav-link-has-sub-items pl-1"
                                @click="toggleMenu(navItem)"
                                v-bind:class="{ 
                                    'active' : navItem.childItems && navItem.childItems.map((xNavItem:any) => xNavItem.url).includes($route.path),
                                }"
                                v-if="navItem.type === 'link' && (navItem.childItems && navItem.childItems.length > 0)">
                                <i :class="`nav-icon  ${navItem.icon ? navItem.icon : 'fas fa-copy'}`"></i>
                                <p>
                                    {{ navItem.name }}
                                    <i class="fas fa-angle-left right"></i>
                                    <!-- <span class="badge badge-info right">6</span> -->
                                </p>
                            </a>
                            <ul class="nav nav-treeview" :style="`display: ${navItem.toggleSubMenu ? 'block' : 'none'}; `"
                                v-if="navItem.type === 'link' && (navItem.childItems && navItem.childItems.length > 0)">
                                <li class="nav-item" v-for="subItem in navItem.childItems" :key="subItem.name">
                                    <router-link :to="subItem.url"  class="nav-link pl-3"
                                        active-class="active">
                                        <p>• {{ subItem.name }}</p>
                                    </router-link>
                                </li>
                            </ul>
                        </li> 
                    </ul>
                </nav>
                <!-- /.sidebar-menu -->
            </div>
            <!-- /.sidebar -->
        </aside>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- Main content -->
            <section class="content">
                <div
                    class="container-fluid p-0 pt-2 pb-2 d-flex flex-column w-100"
                    style="height: calc(100vh - 4.0rem)">
                    <RouterView />
                </div>
            </section>
            <!-- /.content -->
        </div>
        <!-- /.content-wrapper -->

        <!-- <footer class="main-footer">
			<div class="float-right d-none d-sm-block">
				<b>Version</b> 3.2.0
			</div>
			<strong>Copyright &copy; 2014-2021 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights
			reserved.
		</footer> -->

        <!-- Control Sidebar -->
        <aside class="control-sidebar control-sidebar-dark">
            <!-- Control sidebar content goes here -->
        </aside>
        <!-- /.control-sidebar -->
    </div>
</template>
 