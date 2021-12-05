<template>
  <div >
    <el-tabs v-model="activeName" v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="导入中央通道安排数量" name="first"></el-tab-pane>
      <!-- <> -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="交易团">
          <el-select size="small" class="inpu" v-model="formInline.delegationName" clearable>
            <el-option v-for="(item, index) in this.delegation" :label="item.deptName" :value="item.deptId" :key="index">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select size="small" class="inpu" v-model="formInline.exhibitionAreaCode" clearable>
            <el-option v-for="(list, index) in this.exhibitionAreaOpts" :label="list.exhibitionAreaName" :value="list.exhibitionAreaCode"
              :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="but">
          <el-button type="primary" class="btut" @click="handleQuery">查询</el-button>
          <el-button type="primary" class="btut" @click="handelChannel">导入</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="getChanne.records" border style="width: 100%" ref="multipleTable" @select="handleSelectionChange"
        @select-all="handleSelectionDhange" @selection-change="handleCheckedChange" :row-key="getRowKey">
        <el-table-column type="selection" fixed width="55">
        </el-table-column>
        <el-table-column prop="delegationName" align="center" label="交易团">
        </el-table-column>
        <el-table-column prop="exhibitionAreaName" align="center" label="展区">
        </el-table-column>
        <el-table-column prop="exhibitionPeriod" align="center" label="展期">
        </el-table-column>
        <el-table-column prop="boothNumberBefore" align="center" label="上届展位数量">
        </el-table-column>
        <el-table-column prop="boothNumberFinal" align="center" label="一般性展位数量核定数">
        </el-table-column>
        <el-table-column prop="centerChannelNumber" align="center" label="卡车通道展位数量">
        </el-table-column>
        <el-table-column prop="address" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handelRedact(scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog class="classapop" title="编辑" @close="maskLayer" :visible.sync="dialogFormVisible"
        v-if="dialogFormVisible" width="35%">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="一般性展位数量：" prop="ordinaryNumber" :label-width="formLabelWidth">
            <el-input v-model="form.ordinaryNumber" maxlength="8" class="inpu"></el-input>
          </el-form-item>
          <el-form-item label="卡车通道展位数量：" prop="centerChannelNumber" :label-width="formLabelWidth">
            <el-input v-model="form.centerChannelNumber" :disabled="disabled" maxlength="8"
              class="inpu  topjuli marleft"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handelSure" class="btut">确定</el-button>
          <el-button @click="handelCancel('form')" class="btut">取消</el-button>
        </div>
      </el-dialog>
      <el-button type="danger" class="btut" @click="handelPublish">公布</el-button>
      <el-dialog class="classapop" title="公布" @close="maskPublish" :visible.sync="dialogFormVi" v-if="dialogFormVi"
        width="30%">
        <el-form>
          <el-form-item label="发布至：" prop="booth" :label-width="formLabelWidth">
            内部管理系统
          </el-form-item>
          <el-form-item label="附件: " :label-width="formLabelWidth">
            <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview" :on-success="success" :file-list="fileList" :on-remove="handleRemove"
              :before-remove="beforeRemove" multiple :limit="3" :on-exceed="handleExceed">
              <el-button size="small" type="primary">点击上传</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
            </el-upload>
            <!-- <el-button @click="upload" style="margin-left: 50px; padding: 8px 20px" type="primary">上传</el-button> -->
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handelEnsure" class="btut">确定</el-button>
          <el-button @click="handelAbolish" class="btut">取消</el-button>
        </div>
      </el-dialog>
      <el-form :inline="true" style="float: right;">
        <el-form-item>
          <el-pagination style="margin-top: 20px;" background layout="total, prev, pager, next, jumper"
            :total="getChanne.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="getChanne.current" :page-size="getChanne.size">
          </el-pagination>
        </el-form-item>
      </el-form>
    </el-tabs>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from "vuex";
  import listPageBase from "@/components/framework/mixins/listPageBase";
  export default {
    mixins: [listPageBase],
    data() {
      let checkAge = (rule, value, callback) => {
        let regRule = /[^\d\$]/g;
        if (!value) {
          return callback(new Error("输入不能为空"));
        } else if (regRule.test(value)) {
          return callback(new Error("请输入正整数"));
        }
        callback();
      };
      return {
        activeName: 'first',
        rules: {
          ordinaryNumber: [{ validator: checkAge, trigger: "blur" }],
          centerChannelNumber: [{ validator: checkAge, trigger: "blur" }]
        },
        dialogFormVisible: false,
        dialogFormVi: false,
        pagaData: {
          current: 1,
          size: 10,
          total: 0
        },
        lastCheckData: [], // 上次保存的值
        selectData: [], // 选中的数据索引
        checkList: [], // 临时选中的值
        fileList: [],
        delegation: [],
        form: {
          ordinaryNumber: "",
          centerChannelNumber: ""
        },
        formLabelWidth: '30',
        formInline: {},
        disabled: false,
        getList: [],
        loading: true,
        tableData: [],
        delegationName: '',
        exhibitionAreaName: '',
        localstora: [],
        exhibitionAreaOpts: []
      };
    },
    async created() {
      // this.exhibitionAreaOpts = await kindo.dictionary.get('exhibitionArea'); // 展区
      // 展区
      this.getexhibitionArea().then(res => {
        this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
      // 交易团
      this.getdelegationDepartment().then(res => {
        this.delegation = JSON.parse(JSON.stringify(res));
      }).catch(e => {});
      // this.delegation = await kindo.dictionary.get('delegation'); // 交易团
    },
    mounted() {
      this.localstora = JSON.parse(localStorage.getItem("dictData"));
      this.createdQuery();
    },
    computed: {
      ...mapGetters("numberGeneralBooths", ["getChanne"]),
      formQuery() {
        return {
          delegationCode: this.formInline.delegationName,
          exhibitionAreaCode: this.formInline.exhibitionAreaCode,
          exhibitionAreaName: this.formInline.exhibitionAreaName,
          current: this.pagaData.current,
          size: this.pagaData.size
        };
      },
      getRowKey(row) {
        // 获取row的key值
        return row.exhibitionAreaName; // 这里举例获取姓名
      }
    },
    methods: {
      ...mapActions("numberGeneralBooths", [
        "getChanneArrangements", 
        "postChanneCopyreader",  // 编辑
        "postChanneGuideInto"   // 导入
      ]),
      ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment']),
      // 编辑
      handelRedact(val) {
        this.form.ordinaryNumber = val.ordinaryNumber;
        this.form.centerChannelNumber = val.centerChannelNumber;
        this.delegationName = val.delegationCode;
        this.exhibitionAreaName = val.exhibitionAreaCode;
        if (val.centerChannelNumber != null) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
        this.dialogFormVisible = true;
      },
      handleSelectionDhange() { },
      // 选中的数据索引获取
      handleSelectionChange(selection, row) {
        // console.log(selection, row, "888");
        this.selectData[this.pagaData.current - 1] = []; // 初始化
        this.tableData.forEach((item, index) => {
          for (let i = 0; i < selection.length; i++) {
            // 遍历已选的数据重新填充数组
            if (item.brandApplyId === selection[i].brandApplyId) {
              // 补充：注意这里的判断必须要保证判断的值是唯一的（不一定要拿获取的值进行比较，比如ID值），不然遍历的时候会都添加进去
              this.selectData[this.pagaData.current - 1].push(index);
            }
          }
        });
      },
      // 判断是否选中
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 选中的数据获取
      handleCheckedChange(rows) {
        this.checkList = []; // 初始化，防止重复添加
        // this.publicityStatus = [];
        this.brandApplyId = [];
        if (rows) {
          rows.forEach(row => {
            // 遍历已选择的数据
            if (row) {
              this.checkList.push(row.publicityStatus);
            }
          });
        }
      },
      // 复选框禁用 :selectable="checkBox"
      // checkBox(row, index) {
      //   // console.log(row, index);
      //   let val = row.publicityStatus - 0;
      //   if (val === 0) {
      //     return 1;
      //   } else {
      //     return 0;
      //   }
      // },
      // 处初始化封装
      createdQuery() {
        this.loading = true;
        this.getChanneArrangements(this.formQuery).then(() => {
          let arr = [];
          if (this.selectData[this.pagaData.current - 1]) {
            this.selectData[
              this.pagaData.current - 1
            ].forEach((item, index) => {
              arr.push(this.tableData[item]);
            });
          }
          setTimeout(() => {
            this.toggleSelection(arr);
          }, 0);
          this.loading = false;
        }).catch(e => {
          this.loading = false;
        });
      },
      // 查询
      handleQuery() {
        for (let key in this.exhibitionAreaOpts) {
          if (this.formInline.exhibitionAreaCode !== '') {
            if (this.exhibitionAreaOpts[key].value === this.formInline.exhibitionAreaCode) {
              this.formInline.exhibitionAreaName = this.exhibitionAreaOpts[key].label;
            }
          } else {
            this.formInline.exhibitionAreaName = '';
          }
        }
        this.pagaData.current = 1;
        this.createdQuery();
      },
      // 分页
      handleCurrentChange(current) {
        this.pagaData.current = current;
        this.createdQuery();
      },
      // 导入
      handelChannel() { },
      // 公布
      handelPublish() {
        // this.dialogFormVi = true;
        this.lastCheckData[this.pagaData.current - 1] = this.checkList; // 保存当前页获取的值
        //降维 --- 二维数组降至一维数组
        this.getList = Array.prototype.concat.apply([], this.lastCheckData);
        if (this.getList.length === 0) {
          this.$message("请勾选");
        } else {
          this.dialogFormVi = true;
        }
      },
      handleSizeChange() { },
      // 公布取消
      handelAbolish() {
        this.dialogFormVi = false;
      },
      // 公布确定
      handelEnsure() {
        this.dialogFormVi = false;
      },
      // 编辑取消
      handelCancel() {
        this.dialogFormVisible = false;
        for (let key in this.form) {
          this.form[key] = "";
        }
      },
      // 编辑确定
      handelSure() {
        if (this.form.ordinaryNumber === '') {
          this.$message("请正确输入");
        } else {
          let listEditor = {
            exhibitionAreaCode: this.exhibitionAreaName,
            delegationCode: this.delegationName,
            ordinaryNumber: this.form.ordinaryNumber,
            centerChannelNumber: this.form.centerChannelNumber
          };
          this.postChanneCopyreader(listEditor).then(res => {
            this.createdQuery();
            this.dialogFormVisible = false;
            for (let key in this.form) {
              this.form[key] = "";
            }
          }).catch(e => { });
        }
        
      },
      // 编辑遮罩层
      maskLayer() {
        this.dialogFormVisible = false;
        for (let key in this.form) {
          this.form[key] = "";
        }
      },
      // 公布遮罩层
      maskPublish() {
        this.dialogFormVi = false;
      },
      success(val) {
        this.fileId = val.fileId;
        this.form.filename = val.data.fileName;
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除？`);
      }
    }
  };
</script>
<style scoped>
  .btut {
    padding: 8px 20px !important;
  }

  .but {
    float: right;
    /* margin-right: 190px; */
  }

  .topjuli {
    margin-top: 10px;
  }

  .inpu {
    width: 150px;
  }

  .classapop>>>.el-form-item__content .el-form-item__error {
    position: absolute;
    top: 100%;
    left: 160px;
  }

  .classapop>>>.el-dialog__body {
    padding: 12px 12px 8px;
  }

  .marleft {
    margin-left: -10px;
  }
</style>