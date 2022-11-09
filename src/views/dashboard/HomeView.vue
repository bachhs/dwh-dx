<script lang="ts" src="@/scripts/dashboard/dashboard.ts">

</script>

<template>
	<el-card class="box-card w-100 flex-fill"
		:body-style="{ padding: '0.5rem 0.8rem' }">
		<el-scrollbar>
			<div class="d-flex mt-1 mb-2 diagrams">
				<div class="d-flex flex-column m-1 ml-0 p-0 c-rounded diagrams-block"
						style="flex-basis: 20% !important;">
					<div class="text-center mb-3 mt-0 bg-navy p-2 dig-header">
						<strong class="text-white">DỮ LIỆU NGUỒN</strong>
					</div>
					<el-scrollbar class="text-center flex-fill d-flex flex-column pl-3 pr-3  mb-2 justify-content-center">
						<label class="d-block w-100 p-2 mb-2 mr-2 " v-for="(unitItem, indexUnit) in dataSourceUnit" :key="indexUnit">
							<input class="dataSourceUnit-radio d-none" type="radio" name="dataSourceUnitSelection"
								:value="indexUnit" v-model="indexSourceSelected"/>
							<div class="d-flex align-items-center justify-content-center pt-2 pb-2 c-rounded diagrams-item">
								<div class="d-flex align-items-center pl-2 pr-2 w-100">
									<div class="dig-icon p-2">
										<img :src="unitItem.imgUrl" style="width: 4rem;" />
									</div>
									<div class="ml-2 flex-fill text-white"
										v-html="unitItem.name.replace(`\r\n`, `<br/>`)">									
									</div>
								</div>
							</div>
						</label>
					</el-scrollbar>
				</div>
				<div class="d-flex justify-content-around">
					<div class="d-flex flex-column align-items-center">
						<div class="flex-fill d-flex align-items-center">
							<el-icon :size="30"><Right/></el-icon>
						</div>
						<div class="flex-fill d-flex align-items-center">
							<el-icon :size="30"><Right/></el-icon>
						</div>
					</div>
				</div>
				<div class="flex-fill d-flex flex-column m-1 mr-0 p-0 c-rounded diagrams-block"
						style="flex-basis: 20% !important;">
					<div class="text-center mb-3 mt-0 bg-navy p-2 dig-header">
						<strong class="text-white">TỔNG HỢP DỮ LIỆU</strong>
					</div>
					<el-scrollbar class="flex-fill d-flex flex-column pl-2 pr-3 mb-2">
						<el-card :body-style="{ padding: '0.5rem 0.5rem' }"
								class="mb-2"
								v-for="item in 20" :key="item">
							<div class="d-flex align-items-center">
								<div>
									<img :src="`/custom-img/svg-icon/${(item % 2 === 0 ? 'database-icon' : 'ms-excel')}.svg`"
											style="width: 3.5rem;" />
								</div>
								<div class="ml-2 flex-fill" style="line-height: 1.2rem;">
									<div><strong class="text-navy">Database 1</strong></div>
									<div class="text-muted" style="font-size: 85%;">DataLake - Partition/Db1</div>
									<div class="text-muted" style="font-size: 85%;">Sở Thông Tin & Truyền Thông</div>
								</div>
								<div class="ml-2 text-left align-self-end">
									<div class="text-muted d-flex align-items-center" style="font-size: 80%;">
										<el-icon class="text-primary"><Clock /></el-icon>
										<span class="ml-1">Hàng ngày</span>
									</div>
									<div class="text-muted d-flex align-items-center" style="font-size: 80%;">
										<el-icon class="text-primary"><Loading /></el-icon>
										<span class="ml-1">Đang xử lý..</span>
									</div>
								</div>
							</div>
						</el-card>
					</el-scrollbar>
				</div>
				<div class="d-flex justify-content-around">
					<div class="d-flex flex-column align-items-center">
						<div class="flex-fill d-flex align-items-center">
							<el-icon :size="30"><Right/></el-icon>
						</div>
						<div class="flex-fill d-flex align-items-center">
							<el-icon :size="30"><Right/></el-icon>
						</div>
					</div>
				</div>
				<div class="flex-fill d-flex flex-column m-1 mr-0 p-0 c-rounded diagrams-block"
						style="flex-basis: 17% !important;">
					<div class="text-center mb-3 mt-0 bg-navy p-2 dig-header">
						<strong class="text-white">LƯU TRỮ DỮ LIỆU</strong>
					</div>
					<div class="flex-fill d-flex pl-4 pr-4">
						<div class="d-flex flex-column align-items-center justify-content-center">
							<div class="mb-5">
								<el-card>
									<div class="text-center">
										<img :src="`/custom-img/svg-icon/database-icon.svg`"
												style="width: 3.5rem;" />
									</div>
									<div class="text-center mt-2" style="line-height: 1.2rem;">
										<strong>Data warehouse<br/>Database</strong>
									</div>
								</el-card>
							</div>						
							<div>
								<el-card>
									<div class="text-center">
										<img :src="`/custom-img/svg-icon/database-icon.svg`"
												style="width: 3.5rem;" />
									</div>
									<div class="text-center mt-2" style="line-height: 1.2rem;">
										<strong>Operational Data<br/>Store(OOS)</strong>
									</div>
								</el-card>
							</div>
						</div>
						<div class="ml-4 d-flex flex-column align-items-center justify-content-center">
							<div v-for="item in 6" :key="item" class="mb-3 mt-3">
								<el-card>
									<div class="text-center pl-1 pr-1 text-nowrap" 
										style="line-height: 1.2rem;">
										Data Mart
									</div>
								</el-card>
							</div>
						</div>
					</div>
				</div>
				<div class="d-flex justify-content-around">
					<div class="d-flex flex-column align-items-center">
						<div class="flex-fill d-flex align-items-center">
							<el-icon :size="30"><Right/></el-icon>
						</div>
						<div class="flex-fill d-flex align-items-center">
							<el-icon :size="30"><Right/></el-icon>
						</div>
					</div>
				</div>
				<div class="flex-fill d-flex flex-column m-1 mr-0 p-0 c-rounded diagrams-block"
						style="flex-basis: 20% !important;">
					<div class="text-center mb-3 mt-0 bg-navy p-2 dig-header">
						<strong class="text-white">ỨNG DỤNG</strong>
					</div>
					<el-scrollbar class="text-center flex-fill d-flex mb-2">
						<div class="container-fluid">
							<div class="row justify-content-center">
								<div class="col-6" 
										v-for="item in ['Tài chính','Giao thông','CNTT','Truyền thông','Wiki','Internet','Hạ tầng']" :key="item">
									<el-card style="height: auto;" class="m-2">
										<div class="pl-3 pr-3 w-100">
											<div class="dig-icon p-2">
												<img src="/custom-img/svg-icon/finance-icon.svg" style="width: 4rem;" />
											</div>
											<div class="text-navy">
												<strong>{{item}}</strong>
											</div>
										</div>
									</el-card>
								</div>
							</div>
						</div>
					</el-scrollbar>
				</div>
			</div>
		</el-scrollbar>
	</el-card>
</template>