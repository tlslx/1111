/**
 * @file 组展进度设置---修改组展单位标签
 */

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="修改组展单位标签" name="first">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
        <el-form-item label="组展单位标签：" prop="unitTag">
          <el-input v-model="ruleForm.unitTag" maxlength="10" clearable></el-input>
        </el-form-item>
        <el-form-item label="选择组展单位："></el-form-item>
        <el-form-item label="交易团：" prop="delegation">
          <el-select v-model="codeForm.delegation" placeholder="请选择交易团" clearable multiple>
            <el-option v-for="item in delegationOption" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商协会：" prop="coceral">
          <el-select v-model="codeForm.coceral" placeholder="请选择商协会" multiple clearable>
            <el-option v-for="item in coceralOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="企业：" prop="firm">
          <el-checkbox v-model="codeForm.firmAll" @change="firmAllChange">所有企业</el-checkbox>
          <div v-for="item in checkedCompany" :key="item.value" :label="item.text" :value="item.value">
            <span>企业名称：{{item.text}}</span>
            <span><i class="el-icon-error" @click="deleteComp(index)"></i></span>
          </div>
          <el-button @click="addCompany" :disabled="disabled">+选择企业</el-button>
        </el-form-item> -->
        <el-form-item label="外贸中心：" prop="tradeCenter">
          <el-select v-model="codeForm.tradeCenter" multiple clearable>
            <el-option v-for="item in tradeCenterOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <!-- <el-checkbox v-model="codeForm.tradeCenter"></el-checkbox> -->
        </el-form-item>
        <el-form-item label="外贸司：" prop="tradeDevision">
          <!-- <el-checkbox v-model="codeForm.tradeDevision"></el-checkbox> -->
          <el-select v-model="codeForm.tradeDevision" multiple clearable>
            <el-option v-for="item in tradeComOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业：" prop="companyIds">
          <div class="bm">
            <el-select v-model="codeForm.companyIds" multiple clearable collapse-tags>
              <el-option v-for="item in companyArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-button type="primary" @click="innerCompanyDialog = true" style="margin-left:10px">查询</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
          <el-button @click="toBack">取消</el-button>
        </el-form-item>
      </el-form>
      <el-dialog title="添加企业" :visible.sync="dialogVisible">
        <el-input class="input-margin" v-model="search" placeholder="请根据企业名称" clearable></el-input>
        <el-table ref="tables" :data="tables" style="width: 100%" @select-all="handleSelectionChange" @selection-change="handleSelectionChange" border>
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="企业名称">
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-html="format(scope.row.text)"></span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="广交会编码">
            <template slot-scope="scope">
              <span style="margin-left: 10px" v-html="format(scope.row.value)"></span>
            </template>
          </el-table-column> -->
        </el-table>
        <el-pagination @current-change="handleCurrentChange" :current-page.sync="pageInfo.currentPage" :page-size="5" layout="total, prev, pager, next" :total="pageInfo.total">
        </el-pagination>
        <div class="dialog-btn">
          <el-button type="danger" @click="addParams">确 定</el-button>
          <el-button @click="dialogVisible = false">取 消</el-button>
        </div>
      </el-dialog>
      <!-- 企业的选择框 -->
      <el-dialog title="企业选择" :visible.sync="innerCompanyDialog" width="70%" :show-close="false">
        <components-checkCompanyList :unitTag="unitTagFlag" :orgIds="orgIds"  :showAble="innerCompanyDialog" @affirm-company="affirmCompany"
         :checkArray="codeForm.companyIds" @closeInnerCompany="closeInnerCompany"></components-checkCompanyList>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
// vuex
import { getFTC, getJYT, getSXH, getWMS, getCCl } from "./dict_request";
import { mapGetters, mapActions } from "vuex";
import companyListCheck from "./components/companyListNature";
export default {
  components: {
    "components-checkCompanyList": companyListCheck
  },
  data() {
    return {
      unitTag: "",
      orgIds: [],
      unitTagFlag: false,
      innerCompanyDialog: false,
      companyArray: [],
      // tab
      activeName: 'first',
      // 添加企业按钮禁用变量
      disabled: false,
      // 企业弹出层显示变量
      dialogVisible: false,
      // 企业字典数组
      list: [],
      // 交易团数组
      delegationOption: [],
      // 商协会数组
      coceralOption: [],
      // 外贸司
      tradeComOption: [],
      // 一选择的企业数组
      checkedCompany: [],
      // 需要整合的对象
      //外贸中心
      tradeCenterOption: [],
      codeForm: {
        // 交易团
        delegation: [],
        // 商协会
        coceral: [],
        // 企业
        firm: [],
        //选择的企业
        companyIds: [],
        // 所有企业
        firmAll: false,
        // 外贸中心
        tradeCenter: [],
        // 外贸司
        tradeDevision: []
      },
      // 多选数组
      multipleSelection: [],
      selectData: [],
      arrChecked: [],
      // 企业弹出层表格数据
      tables: [],
      page: 1, // 页码
      // 分页信息
      pageInfo: {
        currentPage: 1,
        total: 0
      },
      // 搜索值
      search: '',
      // 表单对象
      ruleForm: {
        // 组展单位标签
        unitTag: '',
        // 整合id数组
        orgIds: []
      },
      // 校验
      rules: {
        unitTag: [
          { required: true, message: '请输入', trigger: 'blur' }
        ]
      },
      baseApi: process.env.API_SN_URL
    };
  },

  computed: {
    ...mapGetters('organizationProgress', [])
  },
  created() {
    // 获取字典
    let dicData = JSON.parse(localStorage.getItem('dictData'));
    // 企业数组赋值
    this.list = dicData.companyData;
    // 交易团数组赋值
    // this.delegationOption = dicData.delegation;
    // 商协会数组赋值
    // this.coceralOption = dicData.coceral;
    // 标签名称赋值
    this.ruleForm.unitTag = this.$route.query.row.unitTag;
    // 旧标签名称赋值
    this.ruleForm.originalUnitTag = this.$route.query.row.unitTag;
    let orgIds = this.$route.query.row.orgIds;
    console.log(orgIds);
    
    let objCompany = {
      param: {
        "companyId": orgIds.join(),
        "pageSize": 1000,
        "pageStart": 1
      }
    };

    Promise.all([getFTC(), getJYT(), getSXH(), getWMS(), getCCl(objCompany)]).then(([ftc, jyt, sxh, wms, ccl]) => {
      console.log(ccl);
      if (ccl.records && ccl.records.length > 0) {
        this.companyArray.splice(0, this.companyArray.length);
        for (let item of ccl.records) {
          this.companyArray.push({
            label: item.companyName,
            value: item.companyId
          });
        }
      }

      for (let i in ftc) {
        this.tradeCenterOption.push({
          value: i,
          label: ftc[i]
        });
      }

      for (let i in jyt) {
        this.delegationOption.push({
          value: i,
          label: jyt[i]
        });
      }

      for (let i in sxh) {
        this.coceralOption.push({
          value: i,
          label: sxh[i]
        });
      }

      for (let i in wms) {
        this.tradeComOption.push({
          value: i,
          label: wms[i]
        });
      }

      // 回填操作
      orgIds.forEach(id => {
        if (ftc.hasOwnProperty(id)) {
          this.codeForm.tradeCenter.push(id);
        } else if (jyt.hasOwnProperty(id)) {
          this.codeForm.delegation.push(id);
        } else if (sxh.hasOwnProperty(id)) {
          this.codeForm.coceral.push(id);
        } else if (wms.hasOwnProperty(id)) {
          this.codeForm.tradeDevision.push(id);
        } else {
          for (let item of ccl.records) {
            if (id === item.companyId) {
              this.codeForm.companyIds.push(id);
            }
          }
        }
      });

    });
    // 判断已选择企业是否为全选
    if (this.list.length === this.codeForm.firm.length) {
      // 全选时，所有企业打勾
      this.codeForm.firmAll = true;
      this.checkedCompany = [];
      this.disabled = true;
    } else {
      // 非全选时，显示已选择企业
      this.codeForm.firmAll = false;
      // 已选择企业赋值
      this.list.forEach((newVal) => {
        this.codeForm.firm.forEach((val) => {
          if (val === newVal.value) {
            this.checkedCompany.push({
              value: newVal.value,
              text: newVal.text
            });
          }
        });
      });
    }
  },
  watch: {
    // 监听搜索
    search(newVal) {
      if (!newVal) {
        this.page = 1;
      }
      this.searchData(newVal, this.page);
    }
  },
  // mounted () {
  //   // 初始搜索
  //   this.searchData();
  // },
  methods: {
    ...mapActions('organizationProgress', ['modifyUnitTagInfo']),
    // value 搜索值
    // page 页码
    // 搜索方法
    searchData(value = '', page = 1) {
      if (!value) {
        this.tables = this.list.slice((page - 1) * 5, page * 5);
        this.pageInfo.total = this.list.length;
      } else {
        let tables = this.list.filter((dataNews) => {
          return Object.keys(dataNews).some(key => {
            return String(dataNews[key]).indexOf(value) > -1;
          });
        });
        this.pageInfo.total = tables.length;
        this.tables = tables.slice((page - 1) * 5, page * 5);
      }
      this.$nextTick(() => {
        if (JSON.parse(localStorage.getItem('selection'))) {
          let arrs = JSON.parse(localStorage.getItem('selection'));
          let checkedIndex = [];
          arrs.forEach(val => {
            if (val.currentpage === this.pageInfo.currentPage) {
              checkedIndex.push(val.index);
            }
          });
          this.arrChecked = arrs;
          let rows = [];
          checkedIndex.forEach(val => {
            rows.push(this.tables[val]);
          });
          rows.forEach(row => {
            this.$refs.tables.toggleRowSelection(row);
          });
        }
      });
      this.pageInfo.currentPage = page;
    },
    //删除企业
    deleteComp(index) {
      this.checkedCompany.splice(index, 1);
      this.codeForm.firm.splice(index, 1);
    },
    // 弹出层分页方法
    handleCurrentChange(val) {
      this.page = val;
      this.pageInfo.currentPage = val;
      // 如果搜索框有值得情况下
      this.searchData(this.search, val);
    },
    // 多选方法
    handleSelectionChange(selection, row) {
      this.selectData = selection;
      this.tables.map((el, dex) => {
        selection.map(ele => {
          if (el.value === ele.value) {
            ele.index = dex;
            ele.currentpage = this.pageInfo.currentPage;
            this.multipleSelection.push(ele);
          }
        });
      });
      let obj = {};
      this.multipleSelection = this.multipleSelection.reduce((item, next) => {
        obj[next.value] ? '' : obj[next.value] = true && item.push(next);
        return item;
      }, []);
      localStorage.setItem('selection', JSON.stringify(this.multipleSelection));
    },
    // 搜索计算
    format(val) {
      if (val.indexOf(this.search) !== -1 && this.search !== '') {
        return val.replace(this.search, '<font color="red">' + this.search + '</font>');
      } else {
        return val;
      }
    },
    // 弹出层确认
    addParams() {
      try {
        let arr = [];
        arr = this.arrChecked.concat(this.selectData);
        // this.searchData();
        let obj = {};
        arr = arr.reduce((item, next) => {
          obj[next.value] ? '' : obj[next.value] = true && item.push(next);
          return item;
        }, []);
        // 企业数组去重整合
        this.codeForm.firm = arr.map(el => {
          return el.value;
        });
        //
        this.checkedCompany = arr;
        // 弹出层隐藏
        this.dialogVisible = false;
        localStorage.removeItem('selection');
      } catch (error) {
        // console.log(error, "error");
      }
    },
    // 添加企业点击事件
    addCompany() {
      this.dialogVisible = true;
      this.multipleSelection = [];
      this.$nextTick(() => {
        this.searchData();
      });
    },
    firmAllChange(val) {
      // 选择所有企业时，给企业字段赋值
      if (val === true) {
        this.disabled = true;
        this.codeForm.firm = this.list.map(el => {
          return el.value;
        });
        this.checkedCompany = [];
      } else {
        this.disabled = false;
        this.codeForm.firm = [];
      }
    },
    // 表单提交
    submitForm(formName) {
      let _this = this;
      // 外贸中心值转换----------暂存，后期调接口改变value值
      if (_this.codeForm.tradeCenter === true) {
        // _this.codeForm.tradeCenter = ['TC1'];
      } else {
        // _this.codeForm.tradeCenter = [];
      }
      // 外贸司值转换----------暂存，后期调接口改变value值
      if (_this.codeForm.tradeDevision === true) {
        // _this.codeForm.tradeDevision = ['TD1'];
      } else {
        // _this.codeForm.tradeDevision = [];
      }
      // if (_this.codeForm.delegation === '') {
      //   _this.ruleForm.orgIds = _this.codeForm.coceral.concat(_this.codeForm.tradeCenter, _this.codeForm.tradeDevision, _this.codeForm.firm);
      // } else {
      // 整合id数组整合所有数组
      _this.ruleForm.orgIds = _this.codeForm.coceral.concat(_this.codeForm.tradeCenter, _this.codeForm.tradeDevision, _this.codeForm.delegation, _this.codeForm.firm, _this.codeForm.companyIds);
      // }
      // 校验
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          if (_this.ruleForm.orgIds.length < 1) {
            _this.$message({
              type: 'error',
              message: '请至少选择一个组展单位'
            });
          } else {
            // 修改
            _this.modifyUnitTagInfo(_this.ruleForm).then(res => {
              _this.$message({
                type: 'success',
                message: '修改成功'
              });
              _this.$router.push('/organizeLabelManagement');
            });
          }
        } else {
          _this.$message({
            type: 'error',
            message: '修改失败'
          });
          return false;
        }
      });
    },
    // 取消返回
    toBack() {
      this.$router.back();
    }
  }
};
</script>
<style scoped lang="less">
@import "../../theme/project/css/flex.less";
.el-form-item {
  width: 50%;
  padding: 10px;
}
.dialog-btn {
  padding: 22px 0;
}
.input-margin {
  margin-bottom: 20px;
}
</style>
