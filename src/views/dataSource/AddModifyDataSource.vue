<script lang="ts" src="@/scripts/dataSource/addModifyDataSource.ts"></script>
<template>
    <div class="flex-fill d-flex flex-column w-100"
        v-loading="isLoading">
        <div class="d-flex align-items-center">
            <div class="flex-fill d-none d-md-block">
                <h4 class="mb-0">
                    <i class="fas fa-database text-lightblue mr-2"></i>
                    <strong>{{viewSettings.title}}</strong>
                </h4>
            </div>
            <div class="d-flex align-items-center">                
                <div class="ml-1 mr-4">                    
                    <!-- <el-button size="large" type="primary">
                        <el-icon><CircleCheck /></el-icon>
                        <span>Lưu dữ liệu</span>
                    </el-button> -->

                    <el-button size="default" type="danger"
                        @click="$emit('onChangeView', { viewName: 'ListData', data: null })">
                        <div>
                            Thoát
                        </div>
                    </el-button>
                </div>
            </div>
        </div>
        <div class="mt-3 pr-4">
            <el-steps :active="stepWizard" class="w-100" simple 
                finish-status="success">
                <el-step title="Thông tin định danh"/>
                <el-step title="Loại dữ liệu"/>
                <el-step title="Cấu hình kết nối"/>
                <el-step title="Xem lại và lưu"/>
            </el-steps>
        </div>
        <el-scrollbar class="d-flex flex-fill mt-3 pr-0">
            <div class="flex-fill d-flex flex-column w-100 pb-0 pt-2 mr-4">
                <div>
                    <el-card class="flex-fill d-flex flex-column w-100"
                    style="height: 500px">
                        <div  v-if="stepWizard === 1">
                            <el-form ref="ruleFormStep1Ref" :model="itemModel" :rules="rules.step1"
                                label-width="0" class="ruleForm" status-icon>                             
                                <div class="mb-3">
                                    <div><strong>Tên nguồn dữ liệu</strong><span class="ml-1 text-danger">*</span></div>
                                    <div class="mt-2">                                        
                                        <el-form-item label="" prop="nameOfDS">                                    
                                            <el-input v-model="itemModel.nameOfDS" size="large" placeholder="Tên nguồn dữ liệu" clearable />
                                        </el-form-item>   
                                    </div>
                                    <div class="mt-4"><strong>Mô tả nguồn dữ liệu</strong><span class="ml-1 text-danger">*</span></div>
                                    <div class="mt-2">
                                        <el-form-item label="" prop="descOfDS">                                            
                                            <el-input v-model="itemModel.descOfDS" size="large" 
                                                :autosize="{ minRows: 2, maxRows: 4 }"
                                                type="textarea"
                                                placeholder="Mô tả nguồn dữ liệu" clearable />
                                        </el-form-item>
                                    </div>
                                </div>
                                <div class="mt-4">
                                    <div><strong>Đơn vị cung cấp</strong><span class="ml-1 text-danger">*</span></div>
                                    <div class="row mt-2">
                                        <div class="col-12 col-md-3 organization-item"
                                            v-for="item in organization" :key="item.id">
                                            <label  class="d-block">
                                                <input type="radio" class="radio-selection" 
                                                    :value="item.id" v-model="itemModel.organizationSelected"/>
                                                <el-card :body-style="{ padding: '1rem 0.8rem' }"
                                                        style="height: auto; overflow: hidden;"
                                                        class="mb-3">
                                                    <div class="position-relative d-flex align-items-center">
                                                        <div class="flex-fill item--name text-nowrap" style="overflow-x: hidden;">
                                                            {{item.name}}
                                                        </div>
                                                        <div class="ml-1 organization-item--icon-selected d-none">                                        
                                                            <el-icon :size="20" color="white"><Check /></el-icon>
                                                        </div>
                                                    </div>
                                                    
                                                </el-card>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </el-form>
                        </div>
                        <div v-if="stepWizard === 2">
                            <div><strong>Nguồn dữ liệu</strong><span class="ml-1 text-danger">*</span></div>
                            <div class="mt-2">
                                <el-radio-group v-model="itemModel.typeOfDataIn">
                                    <el-radio-button :label="`database`">Database</el-radio-button>
                                    <el-radio-button :label="`file`">File</el-radio-button>
                                    <el-radio-button :label="`api`">API</el-radio-button>
                                </el-radio-group>
                            </div>
                            <div v-if="itemModel.typeOfDataIn === 'database'">                                
                                <div class="row mt-2 w-100">
                                    <div class="col-12 col-md-2 type-datasource-item" 
                                        v-for="item in databaseEngineOptions" :key="item.id">
                                        <label class="d-block">
                                            <input type="radio" class="radio-selection" 
                                            :value="item.id" v-model="itemModel.databaseEngineSelected"/>
                                            <el-card :body-style="{ padding: '0.5rem 0.8rem' }"
                                                style="height: auto; overflow: hidden;"
                                                class="mb-3">
                                                <div class="position-relative">
                                                    <div class="mt-1 mb-1">
                                                        <img :src="`/icons/databases/${item.iconName}`" style="height: 2.5rem;" />
                                                    </div>
                                                    <div class="text-nowrap mt-2">
                                                        <span class="item--name">{{ item.name }}</span>
                                                    </div>
                                                    <div class="position-absolute type-datasource-item--icon-selected d-none"
                                                        style="right: 0.5rem; top: 0.5rem;">
                                                        <el-icon :size="40" color="white"><Check /></el-icon>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div v-if="itemModel.typeOfDataIn === 'file'">                                
                                <div class="row mt-2 w-100">
                                    <div class="col-12 col-md-2 type-datasource-item" 
                                        v-for="item in fileTypeDataSourceOptions" :key="item.key">
                                        <label class="d-block">
                                            <input type="radio" class="radio-selection" 
                                                :value="item.key" v-model="itemModel.fileTypeSelected"/>
                                            <el-card :body-style="{ padding: '0.5rem 0.8rem' }"
                                                style="height: auto; overflow: hidden;"
                                                class="mb-3">
                                                <div class="position-relative">
                                                    <div class="mt-1 mb-1">
                                                        <h3 class="text-uppercase user-select-none">{{item.key}}</h3>
                                                    </div>
                                                    <div class="text-nowrap mt-2">
                                                        <span class="item--name">{{ item.name }}</span>
                                                    </div>
                                                    <div class="position-absolute type-datasource-item--icon-selected d-none"
                                                        style="right: 0.5rem; top: 0.5rem;">
                                                        <el-icon :size="30" color="white"><Check /></el-icon>
                                                    </div>
                                                </div>
                                            </el-card>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div v-if="itemModel.typeOfDataIn === 'api'">
                                <p>Vui lòng nhập endpoint API ở bước tiếp theo</p>
                            </div>
                        </div>
                        <div class="mb-1" v-if="stepWizard === 3">
                            <div v-if="itemModel.typeOfDataIn === 'database'">
                                <div><strong>Cấu hình kết nối</strong><span class="ml-1 text-danger">*</span></div>
                                <div class="mt-2">
                                    <div class="row">
                                        <div class="col-12 col-sm-6 col-md-4 mb-2">
                                            <div><span style="font-size: 90%">IP address/ Host name</span></div>
                                            <div class="mt-1">
                                                <el-input v-model="itemModel.host" size="large" placeholder="IP address/ Host name" clearable />
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6 col-md-4 mb-2">
                                            <div><span style="font-size: 90%">Port</span></div>
                                            <div class="mt-1">
                                                <el-input v-model="itemModel.port" size="large" placeholder="Port" clearable />
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6 col-md-4 mb-2">
                                            <div><span style="font-size: 90%">Username</span></div>
                                            <div class="mt-1">
                                                <el-input v-model="itemModel.Username" size="large" placeholder="Username" clearable />
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6 col-md-4 mb-2">
                                            <div><span style="font-size: 90%">Password</span></div>
                                            <div class="mt-1">
                                                <el-input v-model="itemModel.Password" type="password" size="large" placeholder="Password" clearable show-password/>
                                            </div>
                                        </div>
                                        <div class="col-12 col-sm-6 col-md-4 mb-2">
                                            <div><span style="font-size: 90%">DB name</span></div>
                                            <div class="mt-1">
                                                <el-input v-model="itemModel.DBName" size="large" placeholder="DB name" clearable/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            <div v-if="itemModel.typeOfDataIn === 'file'">                            
                                <div><strong>Chọn file tải lên hoặc URL</strong><span class="ml-1 text-danger">*</span></div>
                                <div class="mt-2">
                                    <el-input v-model="itemModel.fileUrl" 
                                        size="large"
                                        placeholder="Dán URL file dữ liệu nguồn vào đây..">
                                        <template #prepend>URL</template>
                                    </el-input>
                                </div>
                                <div class="mt-3">
                                    <file-selector v-model="files" ref="fileSelectorRef" 
                                        :accept="[fileTypeAccept]" :allowMultiple="false">
                                        <dropzone v-slot="{ hovered }">
                                            <div class="w-100 upload-dropzone-wrap p-2 pl-4 pr-4 text-center d-flex align-items-center justify-content-center mb-4"
                                                style="min-height: 10rem;"
                                                :class="{ 'border-blue-200': hovered }">
                                                <div>
                                                    <div class="mb-3 mt-2">
                                                        <svg v-if="!files || files.length === 0"
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                                            version="1.1" id="Layer_1" x="0px" y="0px"
                                                            viewBox="0 0 512 512"
                                                            style="enable-background:new 0 0 512 512; width: 4rem;"
                                                            xml:space="preserve">
                                                            <path style="fill:#A9A8AE;"
                                                                d="M488.727,279.273H256H23.273C10.42,279.273,0,289.693,0,302.545v186.182  C0,501.58,10.42,512,23.273,512H256h232.727C501.58,512,512,501.58,512,488.727V302.545C512,289.693,501.58,279.273,488.727,279.273  z" />
                                                            <path style="fill:#64C37D;"
                                                                d="M272.466,6.82c-0.545-0.543-1.116-1.058-1.711-1.547c-0.267-0.219-0.552-0.413-0.828-0.621  c-0.332-0.248-0.658-0.506-0.999-0.734c-0.332-0.222-0.683-0.419-1.027-0.624c-0.307-0.183-0.61-0.377-0.923-0.546  c-0.352-0.188-0.717-0.349-1.077-0.518c-0.329-0.155-0.653-0.32-0.987-0.458c-0.349-0.144-0.711-0.262-1.067-0.391  c-0.36-0.129-0.718-0.268-1.081-0.379c-0.357-0.109-0.723-0.188-1.085-0.279c-0.375-0.093-0.746-0.199-1.125-0.275  c-0.417-0.082-0.844-0.133-1.268-0.194c-0.329-0.047-0.655-0.11-0.984-0.143C257.548,0.042,256.782,0,256.006,0  s-1.542,0.042-2.298,0.116c-0.329,0.033-0.656,0.095-0.984,0.141c-0.424,0.061-0.852,0.112-1.269,0.194  c-0.375,0.074-0.748,0.18-1.122,0.275c-0.363,0.092-0.731,0.171-1.086,0.279c-0.361,0.11-0.718,0.248-1.077,0.377  c-0.358,0.127-0.723,0.247-1.074,0.393c-0.329,0.137-0.647,0.299-0.971,0.451c-0.366,0.172-0.737,0.337-1.092,0.526  c-0.304,0.163-0.596,0.352-0.894,0.528c-0.355,0.211-0.717,0.414-1.06,0.644c-0.318,0.214-0.624,0.455-0.934,0.686  c-0.299,0.222-0.608,0.433-0.895,0.669c-0.507,0.419-0.999,0.869-1.479,1.336c-0.071,0.07-0.15,0.129-0.222,0.2l-77.579,77.573  c-9.087,9.087-9.089,23.824-0.002,32.912c9.089,9.089,23.825,9.089,32.914,0.002l37.851-37.846v129.998  c0,12.853,10.42,23.273,23.273,23.273c12.853,0,23.273-10.42,23.273-23.273V79.458l37.845,37.845  c4.544,4.544,10.501,6.817,16.457,6.817s11.913-2.273,16.455-6.817c9.089-9.089,9.089-23.824,0-32.912L272.466,6.82z" />
                                                            <g>
                                                                <path style="fill:#57575C;"
                                                                    d="M302.55,372.357c-6.128,0-12.133,2.482-16.462,6.827c-4.329,4.329-6.811,10.318-6.811,16.446   s2.482,12.133,6.811,16.462c4.329,4.329,10.333,6.811,16.462,6.811c6.111,0,12.117-2.482,16.446-6.811   c4.344-4.329,6.827-10.333,6.827-16.462c0-6.113-2.484-12.117-6.827-16.446C314.667,374.84,308.662,372.357,302.55,372.357z" />
                                                                <path style="fill:#57575C;"
                                                                    d="M395.641,372.357c-6.128,0-12.133,2.482-16.462,6.827c-4.329,4.329-6.811,10.333-6.811,16.446   c0,6.129,2.482,12.133,6.811,16.462c4.329,4.329,10.333,6.811,16.462,6.811c6.127,0,12.117-2.482,16.446-6.811   c4.329-4.329,6.827-10.333,6.827-16.462c0-6.113-2.498-12.117-6.827-16.446C407.758,374.84,401.768,372.357,395.641,372.357z" />
                                                            </g>
                                                            <path style="fill:#77757F;"
                                                                d="M23.273,279.273C10.42,279.273,0,289.693,0,302.545v186.182C0,501.58,10.42,512,23.273,512H256  V279.273H23.273z" />
                                                        </svg>

                                                        <svg v-else xmlns="http://www.w3.org/2000/svg"
                                                            xmlns:xlink="http://www.w3.org/1999/xlink"
                                                            version="1.1" id="Layer_1" x="0px" y="0px"
                                                            viewBox="0 0 309.267 309.267"
                                                            style="enable-background:new 0 0 309.267 309.267; width: 4rem;"
                                                            xml:space="preserve">
                                                            <g>
                                                                <path style="fill:#3DB39E;"
                                                                    d="M38.658,0h164.23l87.049,86.711v203.227c0,10.679-8.659,19.329-19.329,19.329H38.658   c-10.67,0-19.329-8.65-19.329-19.329V19.329C19.329,8.65,27.989,0,38.658,0z" />
                                                                <path style="fill:#2F8A78;"
                                                                    d="M289.658,86.981h-67.372c-10.67,0-19.329-8.659-19.329-19.329V0.193L289.658,86.981z" />
                                                                <path style="fill:#8BD1C5;"
                                                                    d="M77.317,125.64v125.64H231.95V125.64H77.317z M193.292,135.304v19.329h-19.329v-19.329H193.292z    M135.304,183.627h-19.329v-19.32h19.329V183.627z M144.969,164.308h19.329v19.32h-19.329V164.308z M135.304,193.302v19.32h-19.329   v-19.32H135.304z M144.969,193.302h19.329v19.32h-19.329V193.302z M173.963,193.302h19.329v19.32h-19.329V193.302z    M173.963,183.627v-19.32h19.329v19.32L173.963,183.627L173.963,183.627z M164.298,135.304v19.329h-19.329v-19.329H164.298z    M135.304,135.304v19.329h-19.329v-19.329H135.304z M86.981,135.304h19.329v19.329H86.981V135.304z M86.981,164.308h19.329v19.32   H86.981V164.308z M86.981,193.302h19.329v19.32H86.981V193.302z M86.981,241.625v-19.339h19.329v19.339H86.981z M115.975,241.625   v-19.339h19.329v19.339H115.975z M144.969,241.625v-19.339h19.329v19.339H144.969z M173.963,241.625v-19.339h19.329v19.339H173.963   z M222.286,241.625h-19.329v-19.339h19.329V241.625z M222.286,212.621h-19.329v-19.32h19.329V212.621z M222.286,183.627h-19.329   v-19.32h19.329V183.627z M222.286,154.634h-19.329v-19.329h19.329V154.634z" />
                                                            </g>
                                                        </svg>
                                                    </div>
                                                    <div class="text-center">
                                                        <div v-for="file in files" :key="file.name"
                                                            class="mb-2">
                                                            Bạn đã chọn file <strong class="text-navy">{{ file.name }}</strong>.
                                                            <div>Kích thước file: {{ humanFileSize(file.size) }} </div>
                                                        </div>
                                                    </div>
                                                    <div class="text-center">
                                                        <div class="mb-2" v-if="!files || files.length === 0">
                                                            <h6>Kéo file vào đây hoặc <em>Nhấn nút chọn file bên
                                                                    dưới</em> để tải lên file của bạn</h6>
                                                            <div class="text-muted">File csv, xls, xlsx.</div>
                                                        </div>
                                                        <dialog-button v-if="!files || files.length === 0"
                                                            class="el-button mb-3">
                                                            Chọn file tải lên
                                                        </dialog-button>
                                                        <div v-else>
                                                            <div>
                                                                <el-button link class="mb-3 text-danger"
                                                                    @click="removeFile()">
                                                                    <el-icon>
                                                                        <Delete />
                                                                    </el-icon>
                                                                    <span>Remove file</span>
                                                                </el-button>
                                                            </div>
                                                            <!-- <div>
                                                                <dialog-button class="el-button is-link mb-3 text-primary">
                                                                    Chọn lại file
                                                                </dialog-button>
                                                            </div> -->
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </dropzone>
                                    </file-selector>
                                </div>
                            </div>  
                            <div v-if="itemModel.typeOfDataIn === 'api'">
                                <div><strong>API method</strong><span class="ml-1 text-danger">*</span></div>
                                <div class="mt-2">
                                    <el-radio-group v-model="itemModel.apiMethod">
                                        <el-radio-button :label="`GET`">GET</el-radio-button>
                                        <el-radio-button :label="`POST`">POST</el-radio-button>
                                        <el-radio-button :label="`PUT`">PUT</el-radio-button>
                                        <el-radio-button :label="`DELETE`">DELETE</el-radio-button>
                                    </el-radio-group>
                                </div>
                                <div class="mt-2"><strong>API URL</strong><span class="ml-1 text-danger">*</span></div>
                                <div class="mt-2">
                                    <el-input v-model="itemModel.apiUrl" 
                                        size="large"
                                        placeholder="Dán URL API dữ liệu nguồn vào đây..">
                                        <template #prepend>URL</template>
                                    </el-input>
                                </div>
                            </div>                        
                        </div>
                        <div class="mt-0" v-if="stepWizard === 4">                
                            <div>                    
                                <div class="text-center w-100"><h5><strong>Xem lại các thông tin</strong></h5></div>
                                <div class="mt-3">
                                    <table class="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th style="width: 1%;">Tên thông tin</th>
                                                <th>Giá trị</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tên nguồn dữ liệu</td>
                                                <td>{{itemModel.nameOfDS}}</td>
                                            </tr>
                                            <tr>
                                                <td>Mô tả nguồn dữ liệu</td>
                                                <td>{{itemModel.descOfDS}}</td>
                                            </tr>
                                            <tr>
                                                <td>Dữ liệu thuộc đơn vị</td>
                                                <td>Bộ thông tin và truyền thông</td>
                                            </tr>
                                            <tr>
                                                <td>Loại dữ liệu</td>
                                                <td>Database</td>
                                            </tr>
                                            <tr>
                                                <td>Database Engine</td>
                                                <td>PostgreSQL</td>
                                            </tr>
                                            <tr>
                                                <td>IP address/ Host name</td>
                                                <td>{{itemModel.host}}</td>
                                            </tr>
                                            <tr>
                                                <td>Cổng kết nối</td>
                                                <td>{{itemModel.port}}</td>
                                            </tr>
                                            <tr>
                                                <td>Username</td>
                                                <td>{{itemModel.Username}}</td>
                                            </tr>
                                            <tr>
                                                <td>Password</td>
                                                <td>{{itemModel.Password}}</td>
                                            </tr>
                                            <tr>
                                                <td>DB name</td>
                                                <td>{{itemModel.DBName}}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>                
                    </el-card>
                </div>
                <div class="text-center mt-3 pt-2 pb-2" 
                    style="background-color: #f5f7fa;">
                    <el-button size="large" type="primary"
                        v-if="stepWizard > 1"
                        class="mr-1 ml-1"
                        @click="stepWizard = stepWizard - 1">
                        <el-icon class="mr-2"><DArrowLeft /></el-icon>
                        <span>Quay lại</span>
                    </el-button>

                    <el-button size="large" type="primary"
                        v-if="stepWizard < totalStepWizard"
                        class="mr-1 ml-1"
                        @click="submitStep(stepWizard)">
                        <span>Bước tiếp theo</span>
                        <el-icon class="ml-2"><DArrowRight /></el-icon>
                    </el-button>

                    <el-button size="large" type="primary"
                        v-if="stepWizard === totalStepWizard"
                        class="mr-1 ml-1">
                        <el-icon><CircleCheck /></el-icon>
                        <span>Lưu dữ liệu</span>
                    </el-button>
                </div>
            </div>
        </el-scrollbar>
    </div>
</template>
 
<style scoped lang="scss">
.radio-selection {
    visibility: hidden;
    display: none;
}

.type-datasource-item {
    label {
        cursor: pointer;
    }

    .radio-selection {
        &:checked+.el-card {
            background-color: #5ca6e5;
            color: #fff;

            .item--name {
                font-weight: 600;
            }

            .type-datasource-item--icon-selected {
                display: block !important;
            }
        }
    }
}

.organization-item {
    label {
        cursor: pointer;
    }

    .radio-selection {
        &:checked+.el-card {
            background-color: #5ca6e5;
            color: #fff;

            .item--name {
                font-weight: 600;
            }

            .organization-item--icon-selected {
                display: block !important;
            }
        }
    }
}

.upload-dropzone-wrap {
    --border-opacity: 1;
    border-color: #cbd5e0;
    border-color: rgba(203,213,224,var(--border-opacity));
    border-radius: 0.5rem;
    border-style: dashed;
    border-width: 4px;
}
</style>