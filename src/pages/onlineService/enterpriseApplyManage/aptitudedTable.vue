<style scoped>
.ssocia-recom-btn-container {
  display: table;
  padding: 10px 20px;
  width: 100%;
}
.pagination-footer {
  margin-top: 20px;
}
.add_aptituded {
  float: left;
  /* background-color: #ff0033;
    color: #fff;
    outline: none;
    border: 0; */
}
.back_aptituded {
  float: left;
  /* background-color: #ccc;
    color: #000;
    outline: none;
    border: 0; */
}
.page-bar {
  display: table-cell;
  vertical-align: middle;
}
</style>
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="企业资质" name="first">
      <search-param-link :searchParamsForm="searchParamsForm.data" @select-change="aptitudeKindChange" :variate="searchParamsForm.variate" :dictionary="{aptitudeKind: aptitudeKindOption, aptitudeSource: osDictionaryData['aptitudeSource']}" @select-params="selectParams"></search-param-link>
      <div v-loading="loading">
        <!-- {{tableData.data}} -->
        <cust-table :index="tableIndex" :cols="tableTrData" :data="tableData" :loading="loading" @deal-with-diff-event="dealWithDiffEvent"></cust-table>
        <div class="associa-recom-btn-container">
          <el-button class="add_aptituded" type="primary" @click="addDialogForm">增加</el-button>
          <el-button class="back_aptituded" type="info" @click="backDialogForm">返回</el-button>
          <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
        </div>
        <aptitudedInfo v-if="aptitudedData.dialogFormVisible" :aptitudedData="aptitudedData" :detailInfo="detailInfo" :btnShow="btnShow" :title="title" @change-dialog-show="changeShow" @cancel_dialog-show="cancelShow">
        </aptitudedInfo>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/onlineService/common/custTable.vue";
import searchParamLinkage from "@/components/project/onlineService/common/searchParamLinkage.vue";
import pagination from "@/components/project/onlineService/common/pagination.vue";
import { mapGetters, mapActions } from "vuex";
import aptitudedDialog from "./aptitudedDialog";
// import { $helper } from "@/scripts/project/utils";
export default {
  name: "aptitude",
  components: {
    "cust-table": custTable,
    "search-param-link": searchParamLinkage,
    pagination: pagination,
    aptitudedInfo: aptitudedDialog
  },
  data() {
    return {
      // x: false,
      title: '',
      aptitudedData: {
        title: {
          addTitle: "新增",
          editTitle: "修改",
          detailTitle: "详情"
        },
        dialogFormVisible: false,
        formData: []
      },
      aptitudeKindOption: [],
      companyRelationshipOption: [],
      patentTypeOption: [],
      internationalPassCertificationTypeOption: [],
      detailInfo: [],
      btnShow: '',
      returnPage: "",
      activeName: 'first',
      loading: true,
      // 搜索框联动设置
      searchParamsForm: {
        variate: "aptitudeQuery",
        data: [
          {
            prop: "aptitudeKind",
            label: "资质类型",
            value: "01",
            type: "unClearSelect"
          },
          {
            prop: "aptitudeSource",
            label: "资质来源",
            value: "",
            type: "select"
          }
        ]
      },
      initQueryParams: {
        size: "10",
        current: "1",
        companyId: this.$store.state.userInfo.companyId,
        aptitudeKind: "01",
        aptitudeSource: "",
        createSession: "125"
      },
      // 表头数据
      tableTrData: [],
      // 表格数据
      tableData: {
        data: []
      },
      pageInfo: {
        "currentPage": 1,
        "pageSize": 10,
        "total": 0,
        "style": "text-align: right;"
      }
    };
  },
  computed: {
    ...mapGetters('dictionary', ['osDictionaryData']),
    ...mapGetters('aptitudedInfo', ['aptitudedInfoList',
      'addCustomData',
      'deleteCustomData',
      'updateCustomData',
      'addBrandOutsideData',
      'deleteBrandOutsideData',
      'updateBrandOutsideDate',
      'addTerritoryData',
      'deleteTerritoryData',
      'updateTerritoryDate',
      'addBuildContentData',
      'deleteBuildContentData',
      'updateBuildContentData',
      'addInternationalData',
      'deleteInternationalData',
      'updateInternationalData',
      'addIntellectualData',
      'deleteIntellectualData',
      'updateIntellectualData',
      'addUtonomyData',
      'deleteUtonomyData',
      'updateUtonomyData',
      'addAptitudesData',
      'deleteAptitudesData',
      'updateAptitudesData',
      'addStandardData',
      'deleteStandardData',
      'updateStandardData']),
    // 海关编码表头数据
    customsCodeTableTrData() {
      return [
        {
          prop: "customCode",
          label: "海关编码",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 50, message: '请输入长度小于（50）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "correlationCompanyName",
          label: "资质对应企业名称",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 200, message: '请输入长度小于（200）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          // prop: "customsCodeCertificate",
          prop: "aptitudesCustomsId",
          label: "海关编码证书",
          type: "operator",
          dialogType: "file",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: 'approveStatus',
          label: '审核状态',
          type: 'string'
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 境外注册商标 (02)
    overseasTableTrData() {
      return [
        {
          prop: "brandName",
          label: "商标名称",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "possessor",
          label: "持有人",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 50, message: '请输入长度小于（50）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "certificateCode",
          label: "证书编号",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' }
          ]
        },
        {
          prop: "registerPlace",
          label: "注册国别",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 50, message: '请输入长度小于（50）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "indate",
          label: "商标有效期",
          type: "date",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' }
          ]
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          prop: "correlationCompanyName",
          label: "资质来源企业名称",
          type: "string",
          rules: [
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "proofRelationship",
          label: "关系证明",
          dialogType: "file",
          filename: "fileNameRelationship",
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "brandRegisteredCertificate",
          label: "商标注册证书",
          dialogType: "file",
          type: "operator",
          filename: "fileNameCertificate",
          rules: [
            { required: true, message: '请上传材料', trigger: 'change' }
          ],
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 登记境内注册商标
    domesticTableTrData() {
      return [
        {
          prop: "brandName",
          label: "商标名称",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "registrant",
          label: "注册人",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 50, message: '请输入长度小于（50）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "certificateCode",
          label: "证书编号",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 50, message: '请输入长度小于（50）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "indate",
          label: "商标有效期",
          type: "date",
          rules: [
            { required: true, message: '请选择参与时间', trigger: 'blur' }
          ]
        },
        {
          prop: "correlationCompanyName",
          label: "资质对应企业名称",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 200, message: '请输入长度小于（200）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          prop: "brandRegisteredCertificate",
          label: "商标注册证书",
          dialogType: "file",
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            }, {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 品牌建设内容
    brandTableTrData() {
      return [
        {
          prop: "certificateCode",
          label: "证书编码",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 50, message: '请输入长度小于（50）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "possessor",
          label: "证书持有人",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "indate",
          label: "有效期",
          type: "date"
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          prop: "certificate",
          label: "证书扫描件",
          dialogType: "file",
          filename: 'fileNameCertificate',
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "correlationCompanyName",
          label: "资质对应企业名称",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 200, message: '请输入长度小于（200）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "contentDescribe",
          label: "内容描述",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 500, message: '请输入长度小于（500）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "contentFile",
          label: "品牌建设内容文件",
          dialogType: "file",
          type: "operator",
          rules: [
            { required: true, message: '请上传材料', trigger: 'change' }
          ],
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            }, {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 国际通行认证
    cognitionTableTrData() {
      return [
        {
          prop: "authenticationCategory",
          label: "认证类型",
          type: "select",
          rules: [
            { required: true, message: '请选择认证类型', trigger: 'blur' }
          ]
        },
        {
          prop: "authenticationProject",
          label: "认证名称",
          type: "string",
          rules: [
            { required: true, message: '请选择认证类型', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "possessor",
          label: "持有人",
          type: "string",
          rules: [
            { required: true, message: '请选择认证类型', trigger: 'blur' },
            { max: 50, message: '请输入长度小于（50）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "indate",
          label: "有效期",
          type: "date"
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          prop: "correlationCompanyName",
          label: "资质来源企业名称",
          type: "string"
        },
        {
          prop: "proofRelationship",
          label: "关系证明",
          dialogType: "file",
          filename: "fileNameRelationship",
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "certificateCode",
          label: "证书",
          dialogType: "file",
          filename: "fileNameCertificate",
          type: "operator",
          rules: [
            { required: true, message: '请上传材料', trigger: 'change' }
          ],
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 登记研发创新和自主知识产权
    innovationTableTrData() {
      return [
        {
          prop: "patentName",
          label: "证书类型",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "possessor",
          label: "持有人",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "indate",
          label: "有效期",
          type: "date"
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          prop: "correlationCompanyName",
          label: "资质对应企业名称",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 200, message: '请输入长度小于（200）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "proofRelationship",
          label: "关系证明",
          dialogType: "file",
          filename: "fileNameRelationship",
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "certificate",
          label: "证书",
          dialogType: "file",
          filename: "fileNameCertificate",
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 行业自律登记
    industryTableTrData() {
      return [
        {
          prop: "certificateCode",
          label: "证书编码",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 50, message: '请输入长度小于（50）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "possessor",
          label: "证书所有人",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "indate",
          label: "有效期",
          type: "date"
        },
        {
          prop: "certificate",
          label: "证书扫描件",
          dialogType: "file",
          filename: "fileNameCertificate",
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 广交会参展表现登记内容
    exhibitionTableTrData() {
      return [
        {
          prop: "certificateCode",
          label: "证书编码",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 50, message: '请输入长度小于（50）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "possessor",
          label: "证书所有人",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "indate",
          label: "有效期",
          type: "date"
        },
        {
          prop: "certificate",
          label: "证书扫描件",
          dialogType: "file",
          filename: "fileNameCertificate",
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 国家或行业标准 （09）
    nationalTableTrData() {
      return [
        {
          prop: "brandName",
          label: "证书名称",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "registrant",
          label: "持有人",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 50, message: '请输入长度小于（50）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "indate",
          label: "证书有效期",
          type: "date"
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          prop: "correlationCompanyName",
          label: "资质对应企业名称",
          type: "string"
        },
        {
          prop: "remark", //"proofRelationship",FIX 后端缺少字段填充，先使用remark代替
          label: "关系证明",
          dialogType: "file",
          filename: "fileNameRelationship",
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "certificateCode",
          label: "证书",
          dialogType: "file",
          filename: "fileNameCertificate",
          type: "operator",
          rules: [
            { required: true, message: '请上传材料', trigger: 'change' }
          ],
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 参与商务部组织对外经济合作、援助项目
    recetentTwoYear() {
      return [
        {
          prop: "projectName",
          label: "项目名称",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 255, message: '请输入长度小于（255）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "actorDate",
          label: "参与时间",
          type: "indate",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' }
          ]
        },
        {
          prop: "fileId",
          label: "证明材料",
          dialogType: "file",
          filename: "fileNameRelationship",
          type: "operator",
          rules: [
            { required: true, message: '请上传材料', trigger: 'change' }
          ],
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 近两年参加国际专业展
    joinEvents() {
      return [
        {
          prop: "exhibitName",
          label: "展会名称",
          type: "string",
          rules: [
            { required: true, message: '请输入项目名称', trigger: 'blur' },
            { max: 200, message: '请输入长度小于（200）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "actorDate",
          label: "参与时间",
          type: "indate",
          rules: [
            { required: true, message: '请选择参与时间', trigger: 'blur' }
          ]
        },
        {
          prop: "fileId",
          label: "证明材料",
          type: "operator",
          dialogType: "file",
          filename: "fileNameRelationship",
          rules: [
            { required: true, message: '请上传证明材料', trigger: 'change' }
          ],
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 国家高新技术（12）
    naturalNewTech() {
      return [
        {
          prop: "patentName",
          label: "证书名称",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "possessor",
          label: "持有人",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "indate",
          label: "有效期",
          type: "date"
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          prop: "correlationCompanyName",
          label: "资质对应企业名称",
          type: "string"
        },
        {
          prop: "proofRelationship",
          label: "关系证明",
          dialogType: "file",
          filename: "fileNameRelationship",
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "certificate",
          label: "证书",
          dialogType: "file",
          filename: "fileNameCertificate",
          type: "operator",
          rules: [
            { required: true, message: '请上传证书材料', trigger: 'change' }
          ],
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    // 专利证明（13）
    patentProof() {
      return [
        {
          prop: "patentName",
          label: "专利类型",
          type: "select",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' }
          ]
        },
        {
          prop: "possessor",
          label: "持有人",
          type: "string",
          rules: [
            { required: true, message: '该字段为必填项', trigger: 'blur' },
            { max: 100, message: '请输入长度小于（100）位的字符', trigger: 'blur' }
          ]
        },
        {
          prop: "indate",
          label: "有效期",
          type: "date"
        },
        {
          prop: "aptitudeSource",
          label: "与本企业的关系",
          type: "select"
        },
        {
          prop: "correlationCompanyName",
          label: "资质对应企业名称",
          type: "string"
        },
        {
          prop: "proofRelationship",
          label: "关系证明",
          dialogType: "file",
          filename: "fileNameRelationship",
          type: "operator",
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "certificate",
          label: "证书",
          dialogType: "file",
          filename: "fileNameCertificate",
          type: "operator",
          rules: [
            { required: true, message: '请上传证明材料', trigger: 'change' }
          ],
          changeByCondition: true,
          btns: [
            {
              type: "download",
              label: "下载"
            }
          ]
        },
        {
          prop: "approveStatus",
          label: "审核状态",
          type: "string"
        },
        {
          prop: "operation",
          type: "operator",
          label: "操作",
          changeByCondition: true,
          btns: [
            {
              type: "edit",
              label: "修改"
            },
            {
              type: "delete",
              label: "删除"
            }
          ]
        }
      ];
    },
    tableIndex: function () {
      return (this.pageInfo.currentPage - 1) * this.pageInfo.pageSize + 1;
    }
  },
  async created() {
    this.aptitudeKindOption = await this.kindo.dictionary.get('aptitudeKind');
    this.companyRelationshipOption = await this.kindo.dictionary.get('companyRelationship');
    this.patentTypeOption = await this.kindo.dictionary.get('patentType');
    this.internationalPassCertificationTypeOption = await this.kindo.dictionary.get('internationalPassCertificationType');
  },
  mounted() {
    if (this.$route.query.data) {
      this.initQueryParams.aptitudeKind = this.$route.query.data.item;
      this.returnPage = this.$route.query.data.returnPage;
      this.searchParamsForm.data[0].value = this.$route.query.data.item;
    }
    this.tableTrData = this.customsCodeTableTrData;
    this.searchAgain(this.initQueryParams);
  },
  methods: {
    ...mapActions('aptitudedInfo', ['getAptitudedInfo',
      'addCustomInfo',
      'deleteCustomInfo',
      'updateCustomInfo',
      'addBrandOutsideInfo',
      'deleteBrandOutsideInfo',
      'updateBrandOutsideInfo',
      'addTerritoryInfo',
      'deleteTerritoryInfo',
      'updateTerritoryInfo',
      'addBuildContentInfo',
      'deleteBuildContentInfo',
      'updateBuildContentInfo',
      'addInternationalInfo',
      'deleteInternationalInfo',
      'updateInternationalInfo',
      'addIntellectualInfo',
      'deleteIntellectualInfo',
      'updateIntellectualInfo',
      'addUtonomyInfo',
      'deleteUtonomyInfo',
      'updateUtonomyInfo',
      'addAptitudesInfo',
      'deleteAptitudesInfo',
      'updateAptitudesInfo',
      'addStandardInfo',
      'deleteStandardInfo',
      'updateStandardInfo',
      'addActorProjectInfos',
      'deleteActorProjectInfos',
      'updateActorProjectInfos',
      'addExhibitHistoryInfos',
      'deleteExhibitHistoryInfos',
      'updateExhibitHistoryInfos'
    ]),
    // 根据条件查询不同数据
    selectParams() {
      this.initQueryParams.current = 1;
      this.initQueryParams.size = 10;
      let temp = this.initQueryParams;
      this.loading = true;
      // 判断查询条件
      this.searchParamsForm.data.forEach((formVal, formIndex, formArray) => {
        if (formVal.prop === 'aptitudeKind') {
          this.initQueryParams.aptitudeKind = formVal.value;
        }
        if (formVal.prop === 'aptitudeSource') {
          this.initQueryParams.aptitudeSource = formVal.value;
        }
      });
      this.searchAgain(temp);
    },
    aptitudeKindChange(value) {
      this.selectParams();
    },
    // 增删改完成后 刷新页面
    searchAgain(param) {
      this.aptitudedInfoFacade(param).then(response => {
        this.pageInfo.currentPage = response.current;
        this.pageInfo.total = response.total;
        this.pageInfo.pageSize = response.size;
        this.tableData.data = response.records;
        this.loading = false;
      }).catch(err => {
        this.loading = false;
      });
    },
    // 下载文件
    downLoadFile(url) {
      window.open(url);
    },
    // 处理按钮数据
    dealWithDiffEvent(eventType, scope, prop) {
      if (eventType === 'edit') {
        this.editData(scope, eventType);
      } else if (eventType === 'delete') {
        this.deleteData(scope);
      } else if (eventType === 'detail') {
        this.detailData(scope, eventType);
      } else if (eventType === 'download') {
        this.downLoadFile(scope.row[prop]);
      }
    },
    // 新增表单
    addDialogForm() {
      // this.recetentTwoYear.actorDate = undefined;
      this.btnShow = true;
      this.aptitudedData.dialogFormVisible = true;
      this.title = this.aptitudedData.title.addTitle;
      this.tableTrData.forEach((value, index, array) => {
        if (value.prop !== 'operation' && value.prop !== 'sequenceNum' && value.prop !== 'approveStatus') {
          let temp = {
            label: value.label,
            rules: value.rules,
            value: undefined,
            prop: value.prop,
            type: value.type,
            dialogType: value.dialogType,
            isContain: value.isContain,
            btnType: value.btnType,
            isBntShow: true,
            isAdd: false,
            isAddT: false
          };
          if (value.prop === "indate") {
            temp.value = ["", ""];
          }
          this.aptitudedData.formData.splice((index + 1), 0, temp);
        }
      });
    },
    // 保存数据
    changeShow(data) {
      this.aptitudedData.dialogFormVisible = data.show;
      // 新增传参
      let param = {
        "companyId": this.$store.state.userInfo.companyId
      };
      // 深拷贝data
      for (let key in data.paramObject) {
        if (key === 'indate') {
          if (Array.isArray(data.paramObject[key])) {
            param[key] = data.paramObject[key].join('') ? data.paramObject[key].join(',') : '';
          } else {
            param[key] = '';
          }
        } else {
          param[key] = data.paramObject[key];
        }
      }
      // 处理时间格式问题
      if (param.actorDate) {
        param.actorDate = new Date(param.actorDate).getTime();
      }
      let btnType = '';
      if (this.aptitudedData.formData.length > 0) {
        this.aptitudedData.formData.forEach((value, index) => {
          if (value.prop !== 'operation' && value.prop !== 'sequenceNum' && value.prop !== 'approveStatus') {
            //   for (let key in data.paramObject) {
            //     param[key] = data.paramObject[key];
            //   }
            //   // param[value.prop] = value.value;
            //   // param.recordDate = data.newdate;
            //   // param.actorDate = Date.format(data.newdate, "yyyy-MM-dd");
            //   // if (param.actorDate) {
            //   //   param.actorDate = new Date(data.newdate.replace(/-/g, "/"));
            //   // }
            //   param.indate = data.newIndate;
            //   param.brandPattern = data.fileId;
            //   param.certificate = data.fileId;
            //   param.customsCodeCertificate = data.fileId;
            //   param.contentFile = data.fileId;
            //   param.fileId = data.fileId;
            //   param.brandRegisteredCertificate = data.fileIdS;
            if (value.aptitudesCustomsId && value.aptitudesCustomsId !== '') {
              param.aptitudesCustomsId = value.aptitudesCustomsId;
            }
            if (value.brandOutsideId && value.brandOutsideId !== '') {
              param.brandOutsideId = value.brandOutsideId;
            }
            if (value.territoryId && value.territoryId !== '') {
              param.territoryId = value.territoryId;
            }
            if (value.buildContentId && value.buildContentId !== '') {
              param.buildContentId = value.buildContentId;
            }
            if (value.internationalId && value.internationalId !== '') {
              param.internationalId = value.internationalId;
            }
            if (value.intellectualId && value.intellectualId !== '') {
              param.intellectualId = value.intellectualId;
            }
            if (value.autonomyId && value.autonomyId !== '') {
              param.autonomyId = value.autonomyId;
            }
            if (value.aptitudesId && value.aptitudesId !== '') {
              param.aptitudesId = value.aptitudesId;
            }
            if (value.standardId && value.standardId !== '') {
              param.standardId = value.standardId;
            }
            if (value.actorProjectId && value.actorProjectId !== '') {
              param.actorProjectId = value.actorProjectId;
            }
            if (value.actorExhibitId && value.actorExhibitId !== '') {
              param.actorExhibitId = value.actorExhibitId;
            }
            // param.aptitudesCustomsId = value.aptitudesCustomsId;
            // param.brandOutsideId = value.brandOutsideId;
            // param.territoryId = value.territoryId;
            // param.buildContentId = value.buildContentId;
            // param.internationalId = value.internationalId;
            // param.intellectualId = value.intellectualId;
            // param.autonomyId = value.autonomyId;
            // param.aptitudesId = value.aptitudesId;
            // param.standardId = value.standardId;
            // param.actorProjectId = value.actorProjectId;
            // param.actorExhibitId = value.actorExhibitId;
          }
          btnType = value.btnType;
        });
      }

      let _this = this;
      if (btnType === 'edit') {
        if (this.initQueryParams.aptitudeKind === '01') {
          this.updateCustomInfo(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '02') {
          this.updateBrandOutsideInfo(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '03') {
          this.updateTerritoryInfo(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '04') {
          this.updateBuildContentInfo(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '05') {
          this.updateInternationalInfo(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '06' || this.initQueryParams.aptitudeKind === '12' || this.initQueryParams.aptitudeKind === '13') {

          this.updateIntellectualInfo(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '07') {
          this.updateUtonomyInfo(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '08') {
          this.updateAptitudesInfo(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '09') {
          this.updateStandardInfo(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '10') {
          this.updateActorProjectInfos(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '11') {
          this.updateExhibitHistoryInfos(param).then(res => {
            this.$message({
              message: '修改成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        }
      } else if (btnType !== 'edit') {
        if (this.initQueryParams.aptitudeKind === '01') {
          this.addCustomInfo(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '02') {
          this.addBrandOutsideInfo(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '03') {
          this.addTerritoryInfo(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '04') {
          this.addBuildContentInfo(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '05') {
          this.addInternationalInfo(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '06' || this.initQueryParams.aptitudeKind === '12' || this.initQueryParams.aptitudeKind === '13') {
          if (this.initQueryParams.aptitudeKind === '12') {
            Object.assign(param, {
              'category': '03', 'propertyType': '06'
            });
          } else if (this.initQueryParams.aptitudeKind === '13') {
            Object.assign(param, {
              'category': '01'
            });
          }
          this.addIntellectualInfo(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '07') {
          this.addUtonomyInfo(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '08') {
          this.addAptitudesInfo(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '09') {
          this.addStandardInfo(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '10') {
          this.addActorProjectInfos(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            _this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '11') {
          this.addExhibitHistoryInfos(param).then(res => {
            this.$message({
              message: '添加成功',
              type: 'success'
            });
            _this.searchAgain(this.initQueryParams);
          });
        }
      }
    },
    backDialogForm() {
      let exhibitionArea = this.$route.query.data.exhibitionArea;
      this.$router.push({
        path: this.returnPage,
        query: {
          exhibitionArea: exhibitionArea,
          temp: true
        }
      });
    },
    // 关闭弹层
    cancelShow(data) {
      this.aptitudedData.dialogFormVisible = data.show;
    },
    // 编辑数据
    editData(scope, val) {
      this.btnShow = true;
      this.title = this.aptitudedData.title.editTitle;
      this.aptitudedData.dialogFormVisible = true;
      this.detailInfo = scope.row;
      for (let i in this.tableTrData) {
        if (this.tableTrData[i].prop !== 'operation' && this.tableTrData[i].prop !== 'sequenceNum' && this.tableTrData[i].prop !== 'approveStatus') {
          let temp = {
            rules: this.tableTrData[i].rules,
            label: this.tableTrData[i].label,
            prop: this.tableTrData[i].prop,
            type: this.tableTrData[i].type,
            dialogType: this.tableTrData[i].dialogType ? this.tableTrData[i].dialogType : '',
            btnType: val,
            isBntShow: true,
            isContain: this.tableTrData[i].isContain,
            isAdd: true,
            isAddT: true
          };
          for (let key in this.detailInfo) {
            if (key === 'indate') {
              temp[key] = !this.detailInfo[key] ? ['', ''] : this.detailInfo[key].split('至');
            } else if (key === 'img') {
              const value = this.detailInfo[key];
              if (!value.startsWith('http')) {
                temp[key] = `${process.env.API_OS_URL}/efOS/file/getImg?fileId=${this.detailInfo[key]}`;
              }
            } else {
              temp[key] = this.detailInfo[key];
            }
          }
          this.aptitudedData.formData.splice((i + 1), 0, temp);
        }
      }
    },
    // 删除数据
    deleteData(scope) {
      let _this = this;
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.initQueryParams.aptitudeKind === '01') {
          let param = scope.row.aptitudesCustomsId;
          this.deleteCustomInfo(param).then(res => {
            this.$message.success("删除成功");
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '02') {
          let param = scope.row.brandOutsideId;
          this.deleteBrandOutsideInfo(param).then(res => {
            this.$message.success("删除成功");
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '03') {
          let param = scope.row.territoryId;
          this.deleteTerritoryInfo(param).then(res => {
            this.$message.success("删除成功");
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '04') {
          let param = scope.row.buildContentId;
          this.deleteBuildContentInfo(param).then(res => {
            this.$message.success("删除成功");
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '05') {
          let param = scope.row.internationalId;
          this.deleteInternationalInfo(param).then(res => {
            this.$message.success("删除成功");
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '06' || this.initQueryParams.aptitudeKind === '12' || this.initQueryParams.aptitudeKind === '13') {
          let param = scope.row.intellectualId;
          this.deleteIntellectualInfo(param).then(res => {
            this.$message.success("删除成功");
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '07') {
          let param = scope.row.autonomyId;
          this.deleteUtonomyInfo(param).then(res => {
            this.$message.success("删除成功");
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '08') {
          let param = scope.row.aptitudesId;
          this.deleteAptitudesInfo(param).then(res => {
            this.$message.success("删除成功");
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '09') {
          let param = scope.row.standardId;
          this.deleteStandardInfo(param).then(res => {
            this.$message.success("删除成功");
            this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '10') {
          let param = scope.row.actorProjectId;
          this.deleteActorProjectInfos(param).then(res => {
            this.$message.success("删除成功");
            _this.searchAgain(this.initQueryParams);
          });
        } else if (this.initQueryParams.aptitudeKind === '11') {
          let param = scope.row.actorExhibitId;
          this.deleteExhibitHistoryInfos(param).then(res => {
            this.$message.success("删除成功");
            _this.searchAgain(this.initQueryParams);
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // 查看详情数据
    detailData(scope) {
      this.btnShow = false;
      this.aptitudedData.dialogFormVisible = true;
      this.title = this.aptitudedData.title.detailTitle;
      this.detailInfo = scope.row;
      for (let i in this.tableTrData) {
        if (this.tableTrData[i].prop !== 'operation' && this.tableTrData[i].prop !== 'sequenceNum' && this.tableTrData[i].prop !== 'approveStatus') {
          let temp = {
            label: this.tableTrData[i].label,
            value: this.detailInfo[this.tableTrData[i].prop],
            prop: this.tableTrData[i].prop,
            type: this.tableTrData[i].type,
            dialogType: this.tableTrData[i].type ? this.tableTrData[i].type : '',
            isshow: true,
            isBntShow: false,
            isAdd: true,
            isAddT: true
          };
          this.aptitudedData.formData.splice((i + 1), 0, temp);
        }
      }
    },
    // 修改页面展示条数
    handleSizeChange(val) {
      this.loading = true;
      this.initQueryParams.size = val;
      this.searchAgain(this.initQueryParams);
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.initQueryParams.current = val;
      this.searchAgain(this.initQueryParams);
    },
    handleClick() {

    },
    //修改返回值
    aptitudedInfoFacade(param) {
      if (param.aptitudeKind === '12') {
        /*eslint-disable no-param-reassign*/
        param = Object.assign({}, { "category": "03", "propertyType": "06" }, param);
      } else if (param.aptitudeKind === '13') {
        /*eslint-disable no-param-reassign*/
        param = Object.assign({}, { "category": "01" }, param);
      }
      return this.getAptitudedInfo(param).then(res => {
        res.records.forEach(item => {
          if (item.aptitudeSource) {
            item.aptitudeSource = this.getLabel(this.companyRelationshipOption, item.aptitudeSource) || item.aptitudeSource;
          }
          if (item.patentName) {
            item.patentName = this.getLabel(this.patentTypeOption, item.patentName) || item.patentName;
          }
          if (item.authenticationCategory) {
            item.authenticationCategory = this.getLabel(this.internationalPassCertificationTypeOption, item.authenticationCategory) || item.authenticationCategory;
          }
          item.detail = true;
          item.delete = true;
          item.edit = true;
          item.download = true;
          item.class = 'underline-red';
        });
        return res;
      });
    },
    getLabel(src, value) {
      for (let i = 0; i < src.length; i++) {
        if (src[i].value === value) {
          return src[i].label;
        }
      }
      return null;
    }
  },
  watch: {
    'initQueryParams.aptitudeKind'(val) {
      if (val === '01') {
        this.tableTrData = this.customsCodeTableTrData;
      } else if (val === '02') {
        this.tableTrData = this.overseasTableTrData;
      } else if (val === '03') {
        this.tableTrData = this.domesticTableTrData;
      } else if (val === '04') {
        this.tableTrData = this.brandTableTrData;
      } else if (val === '05') {
        this.tableTrData = this.cognitionTableTrData;
      } else if (val === '06') {
        this.tableTrData = this.innovationTableTrData;
      } else if (val === '07') {
        this.tableTrData = this.industryTableTrData;
      } else if (val === '08') {
        this.tableTrData = this.exhibitionTableTrData;
      } else if (val === '09') {
        this.tableTrData = this.nationalTableTrData;
      } else if (val === '10') {
        this.tableTrData = this.recetentTwoYear;
      } else if (val === '11') {
        this.tableTrData = this.joinEvents;
      } else if (val === '12') {
        this.tableTrData = this.naturalNewTech;
      } else if (val === '13') {
        this.tableTrData = this.patentProof;
      }
    },
    'aptitudedData.dialogFormVisible'(val) {
      if (val === false) {
        this.aptitudedData.formData = [];
      }
    }
  }
};
</script>

