<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useDataCategoryStore } from '@/stores/dataCategory';
const dataCategoryStore = useDataCategoryStore();
dataCategoryStore.getOrganization();
dataCategoryStore.getAppParams();
const linkTime = ref(new Date().getTime());
onMounted(() => {
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
                                alt="KHO DỮ LIỆU DÙNG CHUNG - SỞ THÔNG TIN VÀ TRUYỀN THÔNG TỈNH TUYÊN QUANG"
                                style="width: 2.8rem" />
                        </div>
                        <div
                            class="ml-1 ml-md-2 text-left d-flex flex-column align-item-center justify-content-center"
                            style="line-height: 1.4rem">
                            <div>
                                <strong class="text-white"
                                    >SỞ THÔNG TIN VÀ TRUYỀN THÔNG TỈNH TUYÊN
                                    QUANG</strong
                                >
                            </div>
                            <div class="d-none d-md-block text-warning">
                                KHO DỮ LIỆU DÙNG CHUNG
                            </div>
                        </div>
                    </div>
                </li>
            </ul>

            <!-- Right navbar links -->
            <ul class="navbar-nav ml-auto">
                <!-- Notifications Dropdown Menu -->
                <li class="nav-item dropdown">
                    <a class="nav-link" data-toggle="dropdown" href="#">
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
                        <a href="#" class="dropdown-item dropdown-footer"
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
            <div class="sidebar">
                <!-- Sidebar Menu -->
                <nav class="mt-4">
                    <ul
                        class="nav nav-pills nav-sidebar flex-column"
                        data-widget="treeview"
                        role="menu"
                        data-accordion="false">
                        <!-- Add icons to the links using the .nav-icon class with font-awesome or any other icon font library -->

                        <li class="nav-item">
                            <router-link
                                to="/"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-home"></i>
                                <p>Trang chủ</p>
                            </router-link>
                        </li>
                        <!-- <li class="nav-item">
							<router-link to="/notification" class="nav-link" active-class="active">
								<i class="nav-icon fas fa-bell"></i>
								<p>Thông báo</p>
							</router-link>
						</li>
						<li class="nav-item">
							<router-link to="/search" class="nav-link" active-class="active">
								<i class="nav-icon fas fa-search"></i>
								<p>Tìm kiếm</p>
							</router-link>
						</li> -->
                        <!-- demo -->
                        <li class="nav-header">Bảo mật</li>
                        <li class="nav-item">
                            <router-link
                                :to="'/security'"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Cấu hình bảo mật</p>
                            </router-link>
                        </li>
                        <li class="nav-header">Luồng dữ liệu</li>
                        <li class="nav-item">
                            <router-link
                                :to="'/data-flow'"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Cấu hình luồng dữ liệu</p>
                            </router-link>
                        </li>
                        <li class="nav-header">Datalake</li>
                        <li class="nav-item">
                            <router-link
                                :to="'/'"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Cấu hình datalake</p>
                            </router-link>
                        </li>
                        <li class="nav-header">Kho dữ liệu</li>
                        <li class="nav-item">
                            <router-link
                                :to="'/'"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Cấu hình kho dữ liệu</p>
                            </router-link>
                        </li>
                        <li class="nav-header">Phân tích dữ liệu</li>
                        <li class="nav-item">
                            <router-link
                                :to="'/'"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Cấu hình phân tích dữ liệu</p>
                            </router-link>
                        </li>
                        <li class="nav-header">Công cụ tìm kiếm</li>
                        <li class="nav-item">
                            <router-link
                                :to="'/'"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Cấu hình công cụ tìm kiếm</p>
                            </router-link>
                        </li>
                        <li class="nav-header">Trực quan dữ liệu</li>
                        <li class="nav-item">
                            <router-link
                                :to="'/'"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Cấu hình trực quan dữ liệu</p>
                            </router-link>
                        </li>
                        <li class="nav-header">Quản trị dữ liệu</li>
                        <li class="nav-item">
                            <router-link
                                :to="'/'"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Cấu hình quản trị dữ liệu</p>
                            </router-link>
                        </li>
                        <li class="nav-header">Quản trị và vận hành</li>
                        <li class="nav-item">
                            <router-link
                                :to="'/'"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Quản trị hệ thống</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                :to="'/'"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Tình trạng vận hành</p>
                            </router-link>
                        </li>
                        <!-- End of demo -->
                        <li class="nav-header">DỮ LIỆU</li>
                        <li class="nav-item">
                            <router-link
                                :to="`/data-source?t=${linkTime}`"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-database"></i>
                                <p>Nguồn dữ liệu</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                to="/datasource-pipeline"
                                class="nav-link"
                                active-class="active">
                                <i class="fas fa-sync-alt nav-icon"></i>
                                <p>Thu thập dữ liệu</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                to="/datasource-processing"
                                class="nav-link"
                                active-class="active">
                                <i class="fas fa-fire-alt nav-icon"></i>
                                <p>Xử lý dữ liệu</p>
                            </router-link>
                        </li>
                        <!-- <li class="nav-item">
							<a href="#" class="nav-link">
								<i class="nav-icon far fa-binoculars"></i>
								<p>
									Giám sát dữ liệu
									<i class="fas fa-angle-left right"></i>
								</p>
							</a>
							<ul class="nav nav-treeview">
								<li class="nav-item">
									<router-link to="/data-synthesis" class="nav-link" active-class="active">
										<i class="fas fa-sync-alt nav-icon"></i>
										<p>Tổng hợp dữ liệu</p>
									</router-link>
								</li>
								<li class="nav-item">
									<router-link to="/data-processing" class="nav-link" active-class="active">
										<i class="fas fa-fire-alt nav-icon"></i>
										<p>Xử lý dữ liệu</p>
									</router-link>
								</li>
							</ul>
						</li> -->
                        <li class="nav-item">
                            <router-link
                                to="/data-visualization"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-chart-line"></i>
                                <p>Trực quan dữ liệu</p>
                            </router-link>
                        </li>
                        <li class="nav-header">QUẢN TRỊ HỆ THỐNG</li>
                        <li class="nav-item">
                            <router-link
                                to="/report"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon far fa-file-alt"></i>
                                <p>Báo cáo</p>
                            </router-link>
                        </li>
                        <li class="nav-item">
                            <router-link
                                to="/administration"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon fas fa-toolbox"></i>
                                <p>Quản trị</p>
                            </router-link>
                        </li>
                        <li class="nav-header">KHÁC</li>
                        <li class="nav-item">
                            <router-link
                                to="/support"
                                class="nav-link"
                                active-class="active">
                                <i class="nav-icon far fa-question-circle"></i>
                                <p>Hỗ trợ</p>
                            </router-link>
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
                    class="container-fluid p-0 pt-2 d-flex flex-column w-100"
                    style="height: calc(100vh - 4.6rem)">
                    <RouterView :key="$route.fullPath" />
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
