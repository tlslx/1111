<template>
  <div>
    <el-tabs v-model="activeName" v-loading="loading" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="基数不重核一般性展位数量安排" name="first"></el-tab-pane>
      <!-- <> -->
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="交易团">
          <el-select size="small" class="inpu" v-model="formInline.delegationName" clearable>
            <el-option v-for="(item, index) in this.delegation" :label="item.deptName" :value="item.deptName" :key="index">
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
        </el-form-item>
      </el-form>
      <el-table :data="getRech.records" border style="width: 100%">
        <el-table-column prop="delegationName" align="center" label="交易团">
        </el-table-column>
        <el-table-column prop="exhibitionAreaName" align="center" label="展区">
        </el-table-column>
        <el-table-column prop="exhibitionPeriod" align="center" label="展期">
        </el-table-column>
        <el-table-column prop="boothNumberBefore" align="center" label="上届展位数量">
        </el-table-column>
        <el-table-column prop="newExhibitionNumber" align="center" label="新增展位数量">
        </el-table-column>
        <el-table-column prop="recoveryNumber" align="center" label="回收展位数量">
        </el-table-column>
        <el-table-column prop="boothNumberFinal" align="center" label="安排展位数量">
        </el-table-column>
        <el-table-column prop="address" align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handelRedact(scope.row)">编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog class="classapop" title="编辑" @close="maskLayer" :visible.sync="dialogFormVisible"
        v-if="dialogFormVisible" width="30%">
        <el-form :model="form" :rules="rules" ref="ruleForm">
          <el-form-item label="安排展位数量：" prop="initialNumber" :label-width="formLabelWidth">
            <el-input v-model="form.initialNumber" maxlength="8" class="inpu"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="handelCancel('form')">取消</el-button>
          <el-button type="primary" @click="handelSure">确定</el-button>
        </div>
      </el-dialog>
      <el-form :inline="true" style="float: right;">
        <el-form-item>
          <el-pagination style="margin-top: 20px;" background layout="total, prev, pager, next, jumper"
            :total="getRech.total" @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page="getRech.current" :page-size="getRech.size">
          </el-pagination>
        </el-form-item>
      </el-form>
    </el-tabs>
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex';
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
        rules: {
          initialNumber: [{ validator: checkAge, trigger: "blur" }]
        },
        pagaData: {
          current: 1,
          size: 10,
          total: 0
        },
        activeName: 'first',
        formInline: {},
        localstora: {},
        loading: true,
        quantityId: '',
        tableData: [],
        delegation: [],
        exhibitionAreaOpts: [],
        dialogFormVisible: false,
        formLabelWidth: '30',
        form: {
          initialNumber: ''
        }
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
      this.postNumberArrangementPost();
      this.createdQuery();
      // this.loading = true;
      // this.getRecheckGeneral(this.pagaData).then(() => {
      //   this.loading = false;
      // }).catch(e => {
      //   this.loading = false;
      // });
    },
    computed: {
      ...mapGetters("numberGeneralBooths", ["getRech"]),
      formQuery() {
        return {
          delegationCode: this.formInline.delegationName,
          exhibitionAreaCode: this.formInline.exhibitionAreaCode,
          exhibitionAreaName: this.formInline.exhibitionAreaName,
          current: this.pagaData.current,
          size: this.pagaData.size
        };
      }
    },
    methods: {
      ...mapActions("numberGeneralBooths", ["getRecheckGeneral", "postNumberArrangementPost", "postNumberArrangementEdit"]),
      ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment']),
      // 处初始化封装
      createdQuery() {
        this.loading = true;
        this.getRecheckGeneral(this.formQuery).then(() => {
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
      handleSizeChange() { },
      // 接收回台数据
      // handelBackData() {
      //   this.getRecheckGeneral(this.formQuery).then(res => {
      //     // console.log(res);
      //   }).catch(e => { });
      // },
      // 查询
      onSubmit() { },
      // 编辑
      handelRedact(row) {
        // console.log(row);
        this.form.initialNumber = row.boothNumberFinal;
        this.quantityId = row.quantityId;
        this.dialogFormVisible = true;
      },
      // 取消
      handelCancel() {
        this.dialogFormVisible = false;
        this.form.initialNumber = "";
      },
      // 确定
      handelSure() {
        if (this.form.initialNumber > 0) {
          let dataLayout = {
            initialNumber: this.form.initialNumber,
            quantityId: this.quantityId
          };
          this.postNumberArrangementEdit(dataLayout).then(res => {
            this.createdQuery();
            this.dialogFormVisible = false;
            this.form.initialNumber = "";
          }).catch(e => {
          });
        } else {
          this.$message("请真确填写");
        }
      },
      // 遮罩层
      maskLayer() {
        this.dialogFormVisible = false;
        this.form.initialNumber = "";
      }
    }
  };
</script>
<style scoped>
  .inpu {
    width: 150px;
  }

  /* .widths {
    width: 120
  } */
  .topjuli {
    margin-top: 10px;
  }

  .btut {
    padding: 8px 20px !important;
  }

  .but {
    float: right;
    /* margin-right: 190px; */
  }

  .classapop>>>.el-form-item__error {
    position: absolute;
    top: 100%;
    left: 140px !important;
  }

  .classapop>>>.el-dialog__body {
    padding: 12px 12px 8px;
  }
</style>