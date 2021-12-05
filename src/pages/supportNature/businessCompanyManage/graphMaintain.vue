/**
 * @file 企业分团关系表维护
 * @author: weiwei
 * @date:2019/4/12
 */
<template>
  <el-container>
    <el-header>
      <span>企业分团关系表维护</span>
    </el-header>
    <el-main>
      <el-row style="padding-bottom: 10px;">
        <el-form :model="savedFormData">
          <el-form-item label="保存的届数" prop="savedExhibitionNum">
            <el-select v-model="savedFormData.savedExhibitionNum" style="width: 300px;">
              <el-option v-for="item in this.saveCompanyExhibitonNumList" :key="item.value" :label="item.lable"
              :value="item.value" @click.native="handleQueryList"></el-option>
            </el-select>
            <span v-show="beforeExhibitDisable">  查看往届</span>
          </el-form-item>
        </el-form>
      </el-row>
      <el-row style="padding-bottom: 10px;">
        <el-button type="primary" @click="showAddSubRelateDialog" :disabled="beforeExhibitDisable">添加企业分团关系</el-button>
        <el-button style="float: right; margin-right: 10px;" type="text" @click="downloadTableList">下载XLS</el-button>
      </el-row>

      <el-dialog title="新增分团关系" :visible.sync="addSubRelateDialog" @close="cancelAddSubRelate('addSubRelateForm')">
        <el-form :model="addSubRelateParams" :rules="subRelateRules" ref="addSubRelateForm">
          <el-form-item label="企业名称" prop="companyName">
            <el-row>
              <el-col :span="18">
                <el-input style="width: 96%" v-model="addSubRelateParams.companyName" disabled></el-input>
              </el-col>
              <el-col :span="4">
                <el-button size="small" type="primary" icon="el-icon-search" @click="showInnerCompanyDialog"></el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="所属区域" prop="areaId">
            <el-select v-model="addSubRelateParams.areaId" @change="addAreaChange">
              <el-option v-for="item in this.addSubRelateData.areaArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属交易团" prop="delegationId">
            <el-select v-model="addSubRelateParams.delegationId" @change="addDelegationChange" :disabled="!addSubRelateParams.areaId">
              <el-option v-for="item in this.addSubRelateData.delegationArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属分团" prop="subGropId">
            <el-select v-model="addSubRelateParams.subGropId" :disabled="!addSubRelateParams.areaId || !addSubRelateParams.delegationId">
              <el-option v-for="item in this.addSubRelateData.subgropArr" :key="item.value" :value="item.value" :label="item.label"
              @click.native="addSubgropChange(item.value, item.label)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态" prop="state">
            <el-select v-model="addSubRelateParams.state" placeholder="请选择">
              <el-option v-for="item in [{label: '启用', value: 1}, {label: '禁用', value: 0}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelAddSubRelate('addSubRelateForm')">取 消</el-button>
          <el-button type="primary" @click="submitAddSubRelate('addSubRelateForm')">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="新增分团关系-选择企业" :visible.sync="innerCompanyDialog" width="70%" append-to-body @close="closeInnerCompany">
        <el-form :model="innerSearchData" :inline="true">
          <el-form-item label="企业名称" prop="companyName">
            <el-input v-model="innerSearchData.companyName" clearable></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="searchInnerCompany">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="companyTableData.records" border>
          <!-- <el-table-column type="selection"></el-table-column> -->
          <el-table-column width="35px">
            <template slot-scope="scope">
              <div style="width: 16px;overflow-x: hidden;">
                <el-radio :label="scope.$index" v-model="radio" @change.native="handleFillCompany(scope.row)"></el-radio>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cantonCode" label="广交会编码"></el-table-column>
          <el-table-column prop="companyId" label="企业ID"></el-table-column>
          <el-table-column prop="companyName" label="企业名称"></el-table-column>
          <el-table-column prop="companyNameEn" label="企业英文名称"></el-table-column>
        </el-table>
        <el-row type="flex" justify="end">
          <el-pagination
            @size-change="innerSizeChange"
            @current-change="innerCurrentChange"
            :current-page="pageInfoInnerData.pageStart"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoInnerData.pageSize"
            layout="prev, pager, next, jumper"
            :total="companyTableData.total">
          </el-pagination>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeInnerCompany">关 闭</el-button>
          <!-- <el-button type="primary" @click="submitInnerCompany">确 定</el-button> -->
        </span>
      </el-dialog>

      <el-table :data="subGroupCompanyListData.records" border id="subGroupCompanyList">
        <el-table-column label="企业名称" prop="companyName"></el-table-column>
        <el-table-column label="所属分团" prop="subgropName"></el-table-column>
        <el-table-column label="所属交易团" prop="getDelegationName"></el-table-column>
        <el-table-column label="所属区域" prop="areaName"></el-table-column>
        <el-table-column prop="operate" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="showEditSubRelate(scope.row)" :disabled="beforeExhibitDisable">修改</el-button>
          </template>
        </el-table-column>
        <el-table-column label="状态" prop="state">
          <template slot-scope="scope">
            <span>{{scope.row.state == 0 ? '禁用' : (scope.row.state == 1 ? '启用' : '')}}</span>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="修改分团关系" :visible.sync="editSubRelateDialog" @close="cancelEditSubRelate">
        <el-form :model="editSubRelateParams" :rules="subRelateRules" ref="editSubRelateForm">
          <el-form-item label="企业名称" prop="companyName">
            <el-input v-model="editSubRelateParams.companyName" disabled></el-input>
          </el-form-item>
          <el-form-item label="所属区域" prop="areaId">
            <el-select v-model="editSubRelateParams.areaId" @change="areaChange">
              <el-option v-for="item in this.editSubRelateData.areaArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属交易团" prop="delegationId">
            <el-select v-model="editSubRelateParams.delegationId" @change="delegationChange" :disabled="!editSubRelateParams.areaId">
              <el-option v-for="item in this.editSubRelateData.delegationArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属分团" prop="subGropId">
            <el-select v-model="editSubRelateParams.subGropId" :disabled="!editSubRelateParams.areaId || !editSubRelateParams.delegationId">
              <el-option v-for="item in this.editSubRelateData.subgropArr" :key="item.value" :value="item.value" :label="item.label"
              @click.native="subgropChange(item.value, item.label)"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="启用状态" prop="state">
            <el-select v-model="editSubRelateParams.state" placeholder="请选择" :disabled="this.editSubRelateParams.subgroupState == 0">
              <el-option v-for="item in [{label: '启用', value: 1}, {label: '禁用', value: 0}]" :key="item.value" :label
                ="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelEditSubRelate">取 消</el-button>
          <el-button type="primary" @click="submitEditSubRelate('editSubRelateForm')">确 定</el-button>
        </span>
      </el-dialog>

      <el-row type="flex" justify="end">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfoData.currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageInfoData.pageSize"
          layout="prev, pager, next, jumper"
          :total="subGroupCompanyListData.total">
        </el-pagination>
      </el-row>

      <el-row type="flex" justify="end">
        <el-button type="primary" @click="saveCondition" :disabled="beforeExhibitDisable || subGroupCompanyListData.records === []">保存历史记录</el-button>
      </el-row>

      <el-dialog title="选择展届" :visible.sync="selectExhibitionNumDialog">
        <el-form :model="saveConditionParams" ref="saveConditionForm" :rules="saveConditionRules">
          <el-form-item label="以往展届" prop="exhibitionNum">
            <el-select v-model="saveConditionParams.exhibitionNum">
              <el-option v-for="item in this.exhibitonNumList" :key="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelSaveCondition">取 消</el-button>
          <el-button type="primary" @click="submitSaveCondition('saveConditionForm')">确 定</el-button>
        </span>
      </el-dialog>
    </el-main>
  </el-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
// import FileSaver from 'file-saver'; // 下载用
// import XLSX from 'xlsx';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  mixins: [listPageBase],
  data() {
    return {
      pageInfoData: { pageSize: 10, currentPage: 1 },
      editSubRelateDialog: false,
      editSubRelateParams: { // 更新企业分团关系
        companyId: "",
        companyName: "",
        areaId: '',
        delegationId: '',
        subGropId: "",
        subgropName: "",
        companyCode: '', // 广交会编码
        state: '',
        showEditSubRelate: ''
      },
      editSubRelateData: { // 三级联动用
        areaArr: [],
        delegationArr: [],
        subgropArr: []
      },
      subRelateRules: { // 校验
        companyName: [{ required: true, message: '请输入', trigger: 'change' }],
        subGropId: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      addSubRelateDialog: false, // 新增企业分团关系
      innerCompanyDialog: false, // 内层公司弹框
      innerSearchData: { companyName: '', cantonCode: '' }, // 内层弹框 企业名称 , cantonCode: ''
      pageInfoInnerData: { pageSize: 10, pageStart: 1 }, // 内层弹框分页
      radio: '', // 单选
      addSubRelateParams: { // 新增企业分团关系
        companyId: "",
        companyName: "",
        areaId: '',
        delegationId: '',
        subGropId: "",
        subgropName: "",
        companyCode: '', // 广交会编码
        state: ''
      },
      addSubRelateData: { // 三级联动用
        areaArr: [],
        delegationArr: [],
        subgropArr: []
      },
      // 历史展届
      selectExhibitionNumDialog: false, // 选择展览届数弹框
      saveConditionParams: { // 保存查询条件
        exhibitionNum: ''
      },
      saveConditionRules: { // 验证选择展届
        exhibitionNum: [{ required: true, message: '请选择', trigger: 'blur' }]
      },
      savedFormData: {
        savedExhibitionNum: null // 已保存之后的列表
      },
      beforeExhibitDisable: false // 之前展览不操作
    };
  },
  computed: {
    ...mapGetters("subEnterpriseManage", ['areaDelegationSubLinkData', 'companyTableData', 'delegationMenuListLeftData',
      'subGroupCompanyListData', 'exhibitonNumList', 'saveCompanyExhibitonNumList']),
    subGroupCompanyListParams() {
      return {
        current: this.pageInfoData.currentPage,
        size: this.pageInfoData.pageSize
        // exhibitionNum: this.savedFormData.savedExhibitionNum // null为本届
      };
    },
    editSubRelateParamsObj() {
      return {
        companyId: this.editSubRelateParams.companyId,
        companyName: this.editSubRelateParams.companyName,
        subgropId: this.editSubRelateParams.subGropId,
        subgropName: this.editSubRelateParams.subgropName,
        companyCode: this.editSubRelateParams.companyCode,
        state: this.editSubRelateParams.state
      };
    },
    addSubRelateParamsObj() {
      return {
        companyId: this.addSubRelateParams.companyId,
        companyName: this.addSubRelateParams.companyName,
        subgropId: this.addSubRelateParams.subGropId,
        subgropName: this.addSubRelateParams.subgropName,
        companyCode: this.addSubRelateParams.companyCode,
        state: this.addSubRelateParams.state
      };
    },
    innerSearchParams() { // 内弹框查询 传参
      return {
        companyName: this.innerSearchData.companyName,
        cantonCode: this.innerSearchData.cantonCode,
        pageSize: this.pageInfoInnerData.pageSize,
        pageStart: this.pageInfoInnerData.pageStart
      };
    },
    savedExhibitionNum() { // 以前展届
      return this.savedFormData.savedExhibitionNum;
    }
  },
  watch: {
    savedExhibitionNum(val) {
      if (val == null) {
        this.beforeExhibitDisable = false;
      } else {
        this.beforeExhibitDisable = true;
      }
    }
  },
  methods: {
    // 'postDeleteCompanySubGroup', 删除不用
    ...mapActions('subEnterpriseManage', ['getAreaDelegationSubLink', 'getCompanyInfoOuterTwo', 'getSubGroupCompanyList',
      'postUpdateCompanySubGroup', 'postAddCompanySubGroup', 'getExhibitionNumList',
      'getSaveCompanyResult', 'getSavedCompanyExhibitionNumList', 'getSaveCompanyExcel']),
    handleQueryList() { // 查询表单
      if (this.savedFormData.savedExhibitionNum) {
        this.subGroupCompanyListParams.exhibitionNum = this.savedFormData.savedExhibitionNum;
      }
      this.getSubGroupCompanyList(this.subGroupCompanyListParams).then(() => { // 清空以前展届
        delete this.subGroupCompanyListParams.exhibitionNum;
      }).catch(() => {
        delete this.subGroupCompanyListParams.exhibitionNum;
      });
    },
    // 判断将要保存的届数, 是否之前已经保存了
    judgeExhibitNumHasBeenSaved(exhibitNum) {
      if (this.saveCompanyExhibitonNumList.length > 0) {
        let tempIndex = this.saveCompanyExhibitonNumList.findIndex(ele => {
          return ele.value === exhibitNum;
        });
        if (tempIndex === -1) {
          return false;
        } else {
          return true;
        }
      } else {
        return false;
      }
    },
    saveCondition() { // 保存历史记录-弹出选择框
      this.getExhibitionNumList(); // 获取下拉框
      this.selectExhibitionNumDialog = true; // 展示选择展届弹框
    },
    submitSaveCondition(formName) { // 保存查询条件
      this.$refs[formName].validate(valid => {
        if (valid) { // 保存展届

          let ifSaved = this.judgeExhibitNumHasBeenSaved(this.saveConditionParams.exhibitionNum);
          if (ifSaved) {
            this.$confirm('该展届数已保存过, 是否覆盖数据?', '提示', {
              confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
            }).then(() => {
              this.getSaveCompanyResult(this.saveConditionParams.exhibitionNum).then(() => {
                this.saveConditionParams.exhibitionNum = '';
                this.selectExhibitionNumDialog = false;
                this.$message.success('保存历史记录成功');
                this.getSavedCompanyExhibitionNumList(); // 拿到历史记录列表
              });
            }).catch(() => {
              this.$message.info('已取消保存');
            });
          } else {
            this.getSaveCompanyResult(this.saveConditionParams.exhibitionNum).then(() => {
              this.saveConditionParams.exhibitionNum = '';
              this.selectExhibitionNumDialog = false;
              this.$message.success('保存历史记录成功');
              this.getSavedCompanyExhibitionNumList(); // 拿到历史记录列表
            });
          }

        } else {
          this.$message.error('请选择展届');
        }
      });
    },
    cancelSaveCondition() { // 取消保存
      this.saveConditionParams.exhibitionNum = '';
      this.selectExhibitionNumDialog = false;
    },
// 页面页码
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      // this.getSubGroupCompanyList(this.subGroupCompanyListParams); // 刷新列表
      this.handleQueryList();
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      // this.getSubGroupCompanyList(this.subGroupCompanyListParams); // 刷新列表
      this.handleQueryList();
    },
// 选择企业弹框内页码
    innerSizeChange(val) {
      this.radio = '';
      this.pageInfoInnerData.pageSize = val;
      this.getCompanyInfoOuterTwo({ param: JSON.stringify(this.innerSearchParams) });// 获取企业列表
    },
    innerCurrentChange(val) {
      this.radio = '';
      this.pageInfoInnerData.pageStart = val;
      this.getCompanyInfoOuterTwo({ param: JSON.stringify(this.innerSearchParams) });// 获取企业列表
    },

// 编辑 下拉框事件
    areaChange(val) {
      this.editSubRelateData.delegationArr = [];
      this.editSubRelateParams.delegationId = '';
      this.editSubRelateData.subgropArr = [];
      this.editSubRelateParams.subGropId = '';
      this.sureLinkSelectOption(val, '', '');
    },
    delegationChange(val) {
      this.editSubRelateData.subgropArr = [];
      this.editSubRelateParams.subGropId = '';
      this.editSubRelateParams.delegationId = val;
      this.sureLinkSelectOption(this.editSubRelateParams.areaId, val, '');
    },
    subgropChange(val, lab) {
      this.editSubRelateParams.subGropId = val;
      this.editSubRelateParams.subgropName = lab;
    },
// 新增 下拉框选项事件
    addAreaChange(val) {
      this.addSubRelateData.delegationArr = [];
      this.addSubRelateParams.delegationId = '';
      this.addSubRelateData.subgropArr = [];
      this.addSubRelateParams.subGropId = '';
      this.sureAddLinkSelectOption(val);
    },
    addDelegationChange(val) {
      this.addSubRelateData.subgropArr = [];
      this.addSubRelateParams.subGropId = '';
      this.addSubRelateParams.delegationId = val;
      this.sureAddLinkSelectOption(this.addSubRelateParams.areaId, val);
    },
    addSubgropChange(val, lab) {
      this.addSubRelateParams.subGropId = val;
      this.addSubRelateParams.subgropName = lab;
    },

// 编辑 选项方法
    sureLinkSelectOption(areaId, delegationId, subGropId) { // 确认展示什么option

      let areaArr = [];
      if (this.areaDelegationSubLinkData.length > 0) {
        this.areaDelegationSubLinkData.forEach(ele => {
          let areaItem = { label: ele.areaName, value: ele.areaId };
          areaArr.push(areaItem);
          this.editSubRelateData.areaArr = areaArr;

          let delegationArr = [];
          if (ele.areaId === areaId && ele.areaDelegationList.length > 0) {
            let areaDelegationList = ele.areaDelegationList;
            areaDelegationList.forEach(el => {
              let delegationItem = { label: el.delegationName, value: el.delegationId };
              delegationArr.push(delegationItem);
              this.editSubRelateData.delegationArr = delegationArr;

              let subgropArr = [];
              if (el.delegationId === delegationId && el.delegationSubGroup.length > 0) {
                let delegationSubGroup = el.delegationSubGroup;
                delegationSubGroup.forEach(e => {
                  let subgropItem = { label: e.subGroupName, value: e.subGroupId };
                  subgropArr.push(subgropItem);
                  this.editSubRelateData.subgropArr = subgropArr;
                });
              }

            });

          }
        });

      }

    },
// 新增 选项方法
    sureAddLinkSelectOption(areaId, delegationId, subGropId) { // 确认展示什么option
      // this.getAreaDelegationSubLink().then(res => { // 获得三级联动总数组

      let areaArr = [];
      if (this.areaDelegationSubLinkData.length > 0) {
        this.areaDelegationSubLinkData.forEach(ele => {
          let areaItem = { label: ele.areaName, value: ele.areaId };
          areaArr.push(areaItem);
          this.addSubRelateData.areaArr = areaArr;

          let delegationArr = [];
          if (ele.areaId === areaId && ele.areaDelegationList.length > 0) {
            let areaDelegationList = ele.areaDelegationList;
            areaDelegationList.forEach(el => {
              let delegationItem = { label: el.delegationName, value: el.delegationId };
              delegationArr.push(delegationItem);
              this.addSubRelateData.delegationArr = delegationArr;

              let subgropArr = [];
              if (el.delegationId === delegationId && el.delegationSubGroup.length > 0) {
                let delegationSubGroup = el.delegationSubGroup;
                delegationSubGroup.forEach(e => {
                  let subgropItem = { label: e.subGroupName, value: e.subGroupId };
                  subgropArr.push(subgropItem);
                  this.addSubRelateData.subgropArr = subgropArr;
                });
              }

            });

          }
        });

      }

      // });
    },

// 编辑弹框事件
    showEditSubRelate(row) {
      this.editSubRelateParams.companyId = row.companyId;
      this.editSubRelateParams.companyName = row.companyName;
      this.editSubRelateParams.companyCode = row.companyCode; // 广交会编码
      this.editSubRelateParams.areaId = row.areaId; // 区域
      this.editSubRelateParams.delegationId = row.delegationId; // 交易团
      this.editSubRelateParams.subGropId = row.subgropId; // 分团
      this.editSubRelateParams.subgropName = row.subgropName;
      this.editSubRelateParams.state = row.state;
      this.editSubRelateParams.subgroupState = row.subgroupState;
      this.sureLinkSelectOption(row.areaId, row.delegationId, row.subgropId);
      this.editSubRelateDialog = true;
    },
    submitEditSubRelate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postUpdateCompanySubGroup(this.editSubRelateParamsObj).then(() => {
            this.editSubRelateDialog = false;
            // this.getSubGroupCompanyList(this.subGroupCompanyListParams); // 刷新列表
            this.handleQueryList();
            for (let key in this.editSubRelateParams) { // 清空
              this.editSubRelateParams[key] = '';
            }
            this.$message.success('编辑成功');
          });
        } else {
          this.$message.error('请将表单填写完整');
        }
      });
    },
    cancelEditSubRelate() {
      for (let key in this.editSubRelateParams) { // 清空
        this.editSubRelateParams[key] = '';
      }
      this.editSubRelateDialog = false;
    },

// 新增弹框事件
    showAddSubRelateDialog() { // 打开新增关系弹框
      this.addSubRelateDialog = true;
      this.sureAddLinkSelectOption(this.addSubRelateParams.areaId,
        this.addSubRelateParams.delegationId, this.addSubRelateParams.subGropId);
    },
    showInnerCompanyDialog() { // 打开内部弹框
      this.innerCompanyDialog = true;
      this.getCompanyInfoOuterTwo({ param: JSON.stringify(this.innerSearchParams) }); // 查询企业
    },
    searchInnerCompany() { // 内部弹框-查询企业
      this.pageInfoInnerData.pageStart = 1;
      this.getCompanyInfoOuterTwo({ param: JSON.stringify(this.innerSearchParams) }); // 查询企业
    },
    handleFillCompany(row) { // 选中单行 赋值
      this.addSubRelateParams.companyId = row.companyId;
      this.addSubRelateParams.companyName = row.companyName;
      this.addSubRelateParams.companyCode = row.cantonCode; // 广交会编码
    },
    closeInnerCompany() { // 取消内部弹框
      this.innerSearchData.companyName = ''; // 清空
      this.innerCompanyDialog = false; // 关闭
    },
    submitAddSubRelate(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.postAddCompanySubGroup(this.addSubRelateParamsObj).then(() => {
            this.addSubRelateDialog = false;
            // this.getSubGroupCompanyList(this.subGroupCompanyListParams); // 刷新列表
            this.handleQueryList();
            for (let key in this.addSubRelateParams) { // 清空
              this.addSubRelateParams[key] = '';
            }
            this.$message.success('新增成功');
            this.$refs[formName].resetFields(); // 清空验证
          });
        } else {
          this.$message.error('请将表单填写完整');
        }
      });
    },
    cancelAddSubRelate(formName) {
      for (let key in this.addSubRelateParams) {
        this.addSubRelateParams[key] = '';
      }
      this.addSubRelateDialog = false;
      this.radio = ''; // 清空单选
      this.$refs[formName].resetFields(); // 清空验证
    },
    downloadTableList() { // 下载
      /* generate workbook object from table */
      // var wb = XLSX.utils.table_to_book(document.querySelector('#subGroupCompanyList'));
      // /* get binary string as output */
      // var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
      // try {
      //   FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '企业分团关系表.xls');
      // } catch (e) {
      //   // if (typeof console !== 'undefined') console.log(e, wbout)
      //   this.$message.error('下载失败');
      // }
      // return wbout;
      let params = {};
      if (this.savedFormData.savedExhibitionNum) {
        params.exhibitionNum = this.savedFormData.savedExhibitionNum;
      }
      this.getSaveCompanyExcel(params); // 下载
    }
  },
  created() {
    this.getAreaDelegationSubLink(); // 三级联动

    // this.getSubGroupCompanyList(this.subGroupCompanyListParams); // 列表
    this.handleQueryList();

    this.getSavedCompanyExhibitionNumList(); // 获取企业展届
  }
};
</script>
<style lang='less' scoped>
.el-header {
  border-bottom: 1px solid #ddd;
  span {
    font-size: 16px;
    font-weight: 700;
    color: #333;
    height: 58px;
    line-height: 58px;
    display: block;
    float: left;
    border-bottom: 2px solid #2b579a;
  }
}
</style>
