<script lang="ts" src="@/scripts/datasourcePipeline"></script>
<template>
	<el-card class="box-card w-100 d-flex flex-fill flex-column" :body-style="{ padding: '0.8rem 1rem' }">
		<div class="flex-fill d-flex flex-column w-100">
			<div class="d-flex align-items-center">
				<div class="flex-fill d-none d-md-block">
					<h4>
						<i class="fas fa-database text-navy"></i>
						<strong>Tiến trình thu thập dữ liệu</strong>
					</h4>
				</div>
				<div class="d-flex align-items-center justify-content-end">
					<div class="ml-1">
						<el-button size="large" type="primary">
							<el-icon :size="20" style="vertical-align: middle">
								<Plus />
							</el-icon>
						</el-button>

						<el-button size="large" type="primary" @click="">
							<el-icon :size="20" style="vertical-align: middle">
								<Refresh />
							</el-icon>
						</el-button>
					</div>
				</div>
			</div>
			<div class="flex-fill d-flex flex-column w-100 pt-3 pb-0">
				<el-scrollbar class="w-100 flex-fill">
					<div class="mt-2 mr-3">
						<div class="row">
							<div class="col-12 col-sm-6 col-md-4 mb-3" v-for="pl in pipelines" :key="pl.id">
								<el-card :body-style="{ padding: '0.5rem 0.8rem' }">
									<div class="d-flex align-items-center">
										<div>
											<img src="/custom-img/postgre.png" style="width: 5rem" />
										</div>
										<div class="ml-2">
											<div>
												<strong class="text-navy">{{ pl.name }}</strong>
											</div>
											<div>Loại: {{ pl.dialect }}</div>
											<div class="text-muted" style="font-size: 85%">
												<span>Chưa có mô tả</span>
											</div>
											<div class="text-muted" style="font-size: 85%">
												Nguồn: {{ pl.organization }}
											</div>
										</div>
									</div>
								</el-card>
							</div>
						</div>
					</div>
				</el-scrollbar>
				<div class="mt-3 d-flex align-items-center pr-2 p-1">
					<div class="flex-fill pl-2 d-flex align-items-center">
						<el-icon class="text-primary mt-1 mr-1">
							<Clock />
						</el-icon>
						<span><strong>Last update:</strong> 2 seconds ago</span>
					</div>
					<div>
						<el-pagination class="" background layout="total, sizes, prev, pager, next, jumper"
							:total="1000" />
					</div>
				</div>
			</div>
		</div>
	</el-card>
</template>
