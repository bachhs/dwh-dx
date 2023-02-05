
import type { Calendar } from '@element-plus/icons-vue';

import router from '../../router/index';
<script lang="ts" src="@/scripts/fileEmbedLink/upload.ts"></script>
<template>
    <el-card class="box-card w-100 d-flex flex-fill flex-column"
        v-loading="isChangeViewLoading"
		:body-style="{ padding: '0.5rem 0.8rem' }">
        <div class="flex-fill d-flex flex-column w-100" v-loading="isLoading">
            <div class="d-flex align-items-center">
                <div class="flex-fill">
                    <h4 class="mb-0 d-none d-md-block">
                        <i class="fas fa-file text-lightblue mr-2"></i>
                        <strong>Embed Link Upload</strong>
                    </h4>
                </div>
            </div>
            <el-scrollbar class="d-flex flex-fill mt-0 mt-md-3 pr-0">
                <div class="flex-fill d-flex flex-column w-100 pb-0 pt-2 mr-4"
                    v-if="currentEmbedLinkInfo">         
                    <el-form
                        v-if="itemModel"
                        ref="ruleFormValidationRef" :model="itemModel" :rules="rules" 
                        label-width="0" class="ruleForm">           
                        <div class="mb-3" v-if="currentEmbedLinkInfo">
                            <el-card>
                                <div>
                                    <div>
                                        <h5><el-icon class="text-primary"><OfficeBuilding /></el-icon> Tổ chức: <strong class="ml-2">{{ currentEmbedLinkInfo.organization.name }}</strong></h5>
                                    </div>
                                    <div>
                                        <h5><el-icon class="text-primary"><Link /></el-icon> Embed link: <strong class="ml-2">{{ currentEmbedLinkInfo.embedded_id }}</strong></h5>
                                    </div>
                                    <div>
                                        <h5>
                                            <el-icon class="text-primary"><Calendar /></el-icon> Thời gian hợp lệ: <strong class="ml-2">
                                            {{ $filters.prettyDate(currentEmbedLinkInfo.valid_from) }}</strong> đến <strong>{{ $filters.prettyDate(currentEmbedLinkInfo.valid_to) }}</strong>
                                        </h5>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                        <div class="mb-3">
                            <div>
                                <strong>Mô tả</strong><span class="ml-1 text-danger">*</span>
                            </div>
                            <div class="mt-2">
                                <el-form-item label="" prop="description" class="w-100">                    
                                    <el-input type="textarea" v-model="itemModel.description" placeholder="Nhập mô tả..."></el-input>
                                </el-form-item>
                            </div>
                        </div>
                    </el-form>
                    <div class="mt-1" v-if="currentEmbedLinkInfo">
                        <div>
                            <strong>Tải lên file cho embed link này</strong>
                        </div>
                        <div class="mt-2">
                            <file-selector v-model="files" ref="fileSelectorRef" 
                                :allowMultiple="false">
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
                                                    Bạn đã chọn file <strong class="text-navy">{{
                                                            file.name
                                                    }}</strong>.
                                                    <div>Kích thước file: {{ humanFileSize(file.size) }}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="text-center">
                                                <div class="mb-2" v-if="!files || files.length === 0">
                                                    <h6>Kéo file vào đây hoặc <em>Nhấn nút chọn file bên
                                                            dưới</em> để tải lên file của bạn</h6>
                                                    <!-- <div class="text-muted">Dung lượng tối đa 20MB. File
                                                        csv, xls, xlsx.</div> -->
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
                        <div v-if="isUploadProgress">
                            <el-progress :text-inside="true" :stroke-width="26" :percentage="uploadProgress" />
                        </div>
                    </div> 
                    <div v-if="currentEmbedLinkInfo"
                        class="text-center mt-3 pt-3 pb-3"
                        style="background-color: #f5f7fa">
                        <el-button
                            size="large"
                            type="primary"
                            class="mr-1 ml-1"
                            @click="addItemSubmit">
                            <el-icon><Check /></el-icon>
                            <span>Submit</span>
                        </el-button>
                    </div>
                </div>
                <div v-else class="w-100 align-items-center justify-content-center">
                    <div class="mt-4">
                        <no-data title="Không tìm thấy dữ liệu"
                            :subTitle="`Chúng tôi không tìm thấy Embed Link này. vui lòng kiểm tra lại.`"/>
                    </div>
                </div>
            </el-scrollbar>
        </div>
    </el-card>
</template>

<style scoped lang="scss">
.upload-dropzone-wrap {
    --border-opacity: 1;
    border-color: #cbd5e0;
    border-color: rgba(203, 213, 224, var(--border-opacity));
    border-radius: 0.5rem;
    border-style: dashed;
    border-width: 4px;
}
.radio-selection {
    visibility: hidden;
    display: none;
}

.organization-item {
    label {
        cursor: pointer;
    }

    .radio-selection {
        &:checked + .el-card {
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
</style>
