<style lang="less" scoped>
.addNumrange {
  height: 100%;
  /deep/.el-form-item {
    margin-bottom: 22px;
  }
}
</style>
<template>
  <el-tabs v-model="activeName" class="businessReview">
    <el-tab-pane label="设置交易团申请展区范围" name="first"></el-tab-pane>
    <el-card class="box-card">
      <search-param-link
        :searchParamsForm="searchParamsForm.data"
        :variate="searchParamsForm.variate"
        :dictionary="searchParamsForm.dictionary"
        @select-params="selectParams"
      ></search-param-link>
      <el-table :data="applyRange.records" border v-loading="loading">
        <el-table-column label="届数" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="名称" align="center" prop="demandName"></el-table-column>
        <el-table-column label="展区" align="center" prop="exhibitionAreaName"></el-table-column>
        <el-table-column label="交易团" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="是否启用" align="center" prop="openStatus">
          <template slot-scope="scope">
            {{ scope.row.openStatus | openStatusFilter }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text" @click="handleAddEdit('edit', scope.row)">编辑</el-button>
              <el-button type="text" @click="delData(scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="line-height: 68px; display: flex; justify-content: space-between;">
        <el-button style="height: 32px; margin-top: 20px;" type="primary" @click="handleAddEdit('add')">新增</el-button>
        <pagination
          class="pages"
          :pageInfo="pageInfo"
          @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange"
        ></pagination>
        <el-dialog :title="dialogTitle" :visible.sync="btnDialogVisible" v-if="btnDialogVisible" width="30%;" style="float: left;">
          <div class="addNumrange">
            <el-form ref="form" :model="form" :rules="formRules" label-width="100px" class="demo-ruleForm">
              <el-form-item label="是否启用" prop="openStatus">
                <el-select v-model="form.openStatus">
                  <el-option v-for="item in isshow" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="届数" prop="exhibitionSession">
                <el-select v-model="form.exhibitionSession">
                  <el-option v-for="item in exhibitionSession" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="名称" prop="demandName">
                <el-input placeholder="请输入" v-model="form.demandName" maxlength="3"></el-input>
              </el-form-item>
              <el-form-item label="交易团" prop="delegationName">
                <div style="display: flex; justify-content: space-between;">
                  <el-input placeholder="请选择" v-model="form.delegationName" readonly></el-input>
                  <el-button style="margin-left: 10px;" type="primary" @click="delegationVisible = true">选择交易团</el-button>
                </div>
              </el-form-item>
              <el-form-item label="展区" prop="exhibitionAreaName">
                <div style="display: flex; justify-content: space-between;">
                  <el-input placeholder="请选择" v-model="form.exhibitionAreaName" readonly></el-input>
                  <el-button style="margin-left: 10px;" type="primary" @click="exhibitionVisible = true">选择展区</el-button>
                </div>
              </el-form-item>
              <el-dialog title="选择交易团" append-to-body :visible.sync="delegationVisible" style="float: left;">
                <el-checkbox-group v-model="delegationList" style="padding: 20px;">
                  <el-checkbox v-for="(val, index) in delegation" :key="index"  :label="val.label" @change="handleChooseDelegation(val.value)" style="width: 30%;"></el-checkbox>
                </el-checkbox-group>
                <div style="text-align: center; padding-bottom: 20px;">
                  <el-button type="primary" @click="oneSubmit">保存</el-button>
                  <el-button @click="oneClear">取消</el-button>
                </div>
              </el-dialog>
              <el-dialog title="选择展区" append-to-body :visible.sync="exhibitionVisible" style="float: left;">
                <el-checkbox-group v-model="checkList" style="padding: 20px;">
                  <el-checkbox v-for="(val, index) in exhibitionArea" :key="index"  :label="val.label" @change="handleChooseExhibitionArea(val.value)" style="width: 30%;"></el-checkbox>
                </el-checkbox-group>
                <div style="text-align: center; padding-bottom: 20px;">
                  <el-button type="primary" @click="twoSubmit">保存</el-button>
                  <el-button @click="twoClear">取消</el-button>
                </div>
              </el-dialog>
              <el-form-item style="text-algin: center;">
                <el-button type="primary" @click="onSubmit('form')">保存</el-button>
                <el-button @click="btnDialogVisible = false">取消</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-dialog>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import pagination from "@/components/project/common/pagination.vue";
import searchParamLinkage from "@/components/project/common/searchParamLinkage.vue";
import { mapActions, mapGetters } from "vuex";
// import { $date } from "@/scripts/project/utils";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    "search-param-link": searchParamLinkage,
    pagination
  },
  data() {
    return {
      activeName: "first",
      btnDialogVisible: false,
      loading: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: right;"
      },
      // 搜索框联动设置
      searchParamsForm: {
        variate: "exhibitionArea",
        data: [
          {
            prop: "exhibitionSession",
            label: "届数",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "delegationId",
            label: "交易团",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "exhibitionArea",
            label: "展区",
            value: "",
            width: "100px",
            type: "select"
          },
          {
            prop: "demandName",
            label: "名称",
            value: "",
            width: "80px",
            type: "input"
          }
        ],
        dictionary: {
          exhibitionSession: [],
          exhibitionArea: [],
          delegation: []
        }
      },
      dictionaryData: {
        exhibitionArea: []
      },
      searchDate: [],
      haveDate: false,
      // 新增编辑弹框
      dialogTitle: '',
      exhibitionArea: [],
      delegation: [],
      exhibitionSession: [],
      checkList: [],
      delegationList: [],
      exhibitionVisible: false,
      delegationVisible: false,
      form: {
        openStatus: '',
        exhibitionSession: "",
        delegationName: '',
        demandName: '',
        exhibitionAreaName: ''
      },
      submitList: {
        delegationIdList: [],
        delegationNameList: [],
        exhibitionAreaList: [],
        exhibitionAreaNameList: []
      },
      formRules: {
        exhibitionSession: [
          { required: true, message: "请选择届数", trigger: "change" }
        ],
        openStatus: [
          { required: true, message: "请选择是否启用", trigger: "change" }
        ],
        demandName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        delegationName: [
          { required: true, message: "请选择交易团", trigger: "change" }
        ],
        exhibitionAreaName: [
          { required: true, message: "请选择展区", trigger: "change" }
        ]
      },
      isshow: [
        {
          value: '0',
          label: '否'
        },
        {
          value: '1',
          label: '是'
        }
      ]
    };
  },
  filters: {
    openStatusFilter: value => {
      switch (value) {
        case '0':
          return '否';
        case '1':
          return '是';
        default:
          return;    
      }
    }
  },
  watch: {
    checkList(val) {
      if (val) {
        this.form.exhibitionAreaName = val.join(",");
      }
    },
    delegationList(val) {
      if (val) {
        this.form.delegationName = val.join(",");
      }
    }
  },
  async created() {
    let dictData = await kindo.dictionary.get('exhibitionArea'); 
    let Mapdata = dictData.map(item => {
      return { value: item.value, text: item.label };
    });
    this.dictionaryData.exhibitionArea = Mapdata;
    // 获取展届
    this.getsysExhibitions().then(res => {
      let resData = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < resData.data.length; i++) {
        this.searchParamsForm.dictionary.exhibitionSession.push(resData.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.searchParamsForm.dictionary.exhibitionSession = this.searchParamsForm.dictionary.exhibitionSession.sort(rul).map(item => {
        return { value: item, label: item };
      });
      this.exhibitionSession = this.searchParamsForm.dictionary.exhibitionSession;
    });
    // 获取交易团
    this.getdelegationDepartment().then(res => {
      this.searchParamsForm.dictionary.delegation = JSON.parse(JSON.stringify(res)).map(item => {
        return { value: item.deptCode, label: item.deptName };
      });
      this.delegation = this.searchParamsForm.dictionary.delegation;
    }).catch(e => {});
    // 获取展区
    this.getexhibitionArea().then(res => {
      this.searchParamsForm.dictionary.exhibitionArea = JSON.parse(JSON.stringify(res)).map(item => {
        return { value: item.exhibitionAreaCode, label: item.exhibitionAreaName };
      });
      this.exhibitionArea = this.searchParamsForm.dictionary.exhibitionArea;
    }).catch(e => {});
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapGetters("baseAccounting", [
      "applyRange" // 查询
    ]),
    // 传参
    searchParams() {
      return {
        exhibitionArea: this.searchParamsForm.data[2].value,
        exhibitionSession: this.searchParamsForm.data[0].value,
        delegationId: this.searchParamsForm.data[1].value,
        demandName: this.searchParamsForm.data[3].value,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  methods: {
    ...mapActions("baseAccounting", [
      "getDelegationApplyRange", // 查询
      "postDelegationApplyRangeAdd", // 新增
      "postDelegationApplyRangeDelete", // 删除
      "postDelegationApplyRangeEdit" // 编辑
    ]),
    ...mapActions("nainformation", [
      "getsysExhibitions", // 获取所有展届信息
      "getdelegationDepartment", // 获取所有交易团
      "getexhibitionArea" // 获取展区
    ]),
    // 初始化调用接口
    getData() {
      this.loading = true;
      this.getDelegationApplyRange(this.searchParams)
        .then(response => {
          let resData = JSON.parse(JSON.stringify(response));
          if (resData.total > 0) {
            this.pageInfo.currentPage = resData.current;
            this.pageInfo.total = resData.total;
            // 查询下拉框塞入数据
            // let arryDate = [];
            // response.records.forEach((val, index) => {
            //   let newDate = {};
            //   if (val.exhibitionArea && val.exhibitionAreaCode) {
            //     newDate.label = val.exhibitionArea;
            //     newDate.value = val.exhibitionAreaCode;
            //   }
            //   arryDate.push(newDate);
            // });
            // 去重
            // let obj = {};
            // this.searchParamsForm.dictionary.exhibitionArea = arryDate.reduce(
            //   (cur, next) => {
            //     obj[next.value]
            //       ? ""
            //       : (obj[next.value] = true && cur.push(next));
            //     return cur;
            //   },
            //   []
            // );
            // this.haveDate = true;
          } else if (resData.total === 0) {
            this.pageInfo.currentPage = 1;
            this.pageInfo.total = 0;
          }
          this.loading = false;
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 移除数据
    delData(row) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.postDelegationApplyRangeDelete({ demandId: row.demandId }).then(() => {
          this.$message.success('删除成功');
          this.getData();
        }).catch(e => {});
      }).catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
    },
    // 查询
    selectParams() {
      this.pageInfo.currentPage = 1;
      this.getData();
    },
    // 修改页数
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getData();
    },
    // 修改当前页信息
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getData();
    },
    //交易团选中值
    oneSubmit() {
      this.submitList.delegationNameList = this.delegationList;
      this.delegationVisible = false;
    },
    // 交易团选择项
    handleChooseDelegation(val) {
      let index = this.submitList.delegationIdList.indexOf(val);
      if (!this.submitList.delegationIdList.includes(val)) {
        this.submitList.delegationIdList.push(val);
      } else {
        this.submitList.delegationIdList.slice(index, 1);
      }
    },
    //交易团弹框清空值
    oneClear() {
      this.delegationList = [];
      this.delegationVisible = false;
    },
    //展区选中值
    twoSubmit() {
      this.submitList.exhibitionAreaNameList = this.checkList;
      this.exhibitionVisible = false;
    },
    //展区弹框清空值
    twoClear() {
      this.checkList = [];
      this.exhibitionVisible = false;
    },
    // 展区选择项
    handleChooseExhibitionArea(val) {
      let index = this.submitList.exhibitionAreaList.indexOf(val);
      if (!this.submitList.exhibitionAreaList.includes(val)) {
        this.submitList.exhibitionAreaList.push(val);
      } else {
        this.submitList.exhibitionAreaList.slice(index, 1);
      }
    },
    // 打开新增编辑弹框
    handleAddEdit(type, row) {
      if (type === 'add') {
        this.form = {
          openStatus: '',
          exhibitionSession: "",
          delegationName: '',
          demandName: '',
          exhibitionAreaName: ''
        };
        this.delegationList = [];
        this.checkList = [];
        this.dialogTitle = '新增';
      } else {
        this.form = {
          demandId: row.demandId,
          openStatus: row.openStatus,
          exhibitionSession: row.exhibitionSession,
          delegationName: row.delegationName,
          demandName: row.demandName,
          exhibitionAreaName: row.exhibitionAreaName
        };
        this.delegationList = [];
        this.checkList = [];
        this.dialogTitle = '编辑';
      }
      this.btnDialogVisible = true;
    },
    // 保存
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.dialogTitle === '新增') {
            let submitData = {
              openStatus: this.form.openStatus,
              exhibitionSession: this.form.exhibitionSession,
              delegationIdList: this.submitList.delegationIdList,
              delegationNameList: this.submitList.delegationNameList,
              demandName: this.form.demandName,
              exhibitionAreaList: this.submitList.exhibitionAreaList,
              exhibitionAreaNameList: this.submitList.exhibitionAreaNameList
            };
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.postDelegationApplyRangeAdd(submitData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('操作成功');
              this.btnDialogVisible = false;
              this.getData();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          } else {
            let submitData = {
              demandId: this.form.demandId,
              openStatus: this.form.openStatus,
              exhibitionSession: this.form.exhibitionSession,
              delegationIdList: this.submitList.delegationIdList,
              delegationNameList: this.submitList.delegationNameList,
              demandName: this.form.demandName,
              exhibitionAreaList: this.submitList.exhibitionAreaList,
              exhibitionAreaNameList: this.submitList.exhibitionAreaNameList
            };
            let fullScreenloading = this.$loading({ fullscreen: true });
            this.postDelegationApplyRangeEdit(submitData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('操作成功');
              this.btnDialogVisible = false;
              this.getData();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          }
        }
      });
    }
  }
};
</script>
