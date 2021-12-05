<style scoped>
@media print {
  .demandDeclarationBtn{
    display: none;
  }
}
</style>
<template>
  <el-tabs v-model="activeName" class="businessReview">
    <el-tab-pane label="各团各期各展区展位需求申报" name="first"></el-tab-pane>
    <el-card class="box-card">
      <div>
        <el-form>
          <el-table :data="boothApplyData" :span-method="objectSpanMethod" border stripe v-loading="loading" style="width: 100%">
            <el-table-column prop="exhibitionPeriod" label="期数">
              <template slot-scope="scope">
                {{ scope.row.exhibitionPeriod | exhibitionPeriodFilter }}
              </template>
            </el-table-column>
            <el-table-column prop="exhibitionAreaName" label="展区">
            </el-table-column>
            <el-table-column prop="boothNumber" label="需求展位数">
              <template slot-scope="scope">
                <el-form 
                  :model="scope.row"
                  :ref="`boothNumber${scope.$index}`"
                  :rules="rule"
                  v-if="scope.row.isEdit"
                >
                  <el-form-item
                    prop="boothNumber"
                    label-width="0"
                  >
                    <el-input
                      v-model.trim.number="scope.row.boothNumber"
                      maxlength="6"
                      clearable
                    ></el-input>
                  </el-form-item>
                </el-form>
                <span v-if="!scope.row.isEdit">{{ scope.row.boothNumber }}</span>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
      <div class="demandDeclarationBtn" style="margin-top: 20px; text-align: center;">
        <el-button type="primary" @click="onSubmit()">提交</el-button>
        <el-button @click="createdQuery">取消</el-button>
        <el-button type="danger" @click="onDownload()">下载</el-button>
        <el-button type="primary" @click="onPrint()">打印</el-button>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    var needInt = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (value === '') {
        return callback(new Error('请输入>=0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else {
        return callback();
      }
    };
    return {
      activeName: "first",
      queryForm: {
        delegationId: this.$store.getters.userInfo.org.deptId
      },
      boothApplyList: [], // 二维数组存储
      boothApplyData: [],
      rule: {
        boothNumber: [{ required: true, validator: needInt, trigger: 'blur' }]
      }
    };
  },
  filters: {
    exhibitionPeriodFilter: value => {
      let val = value - 0;
      switch (val) {
        case 1:
          return '第一期';
        case 2: 
          return '第二期';
        case 3:    
          return '第三期';
        default:
          return;
      }
    }
  },
  computed: {
    ...mapGetters("baseAccounting", [
      "boothApply"
    ])
  },
  created() {
    this.createdQuery();
  },
  methods: {
    ...mapActions("baseAccounting", [
      "getEveryBoothNeedApply",
      "postEveryBoothNeedApplySubmit"
    ]),
    //合并行
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (row.exhibitionPeriod === 1 && rowIndex === 0) {
          return {
            rowspan: this.boothApplyList[0].length,
            colspan: 1
          };
        } else if (row.exhibitionPeriod === 2 && rowIndex === this.boothApplyList[0].length) {
          return {
            rowspan: this.boothApplyList[1].length,
            colspan: 1
          };
        } else if (row.exhibitionPeriod === 3 && rowIndex === (this.boothApplyList[0].length + this.boothApplyList[1].length)) {
          return {
            rowspan: this.boothApplyList[2].length,
            colspan: 1
          };
        } else {
          return {
            rowspan: 0,
            colspan: 0
          };
        }
      }
      
    },
    // 提交
    onSubmit() {
      let flagList = [];
      for (let k in this.$refs) {
        this.$refs[k].validate(valid => {
          if (valid) {
            flagList.push('true');
          } else {
            flagList.push('false');
          }
        });
      }
      if (!flagList.includes('false')) { // 判断是否填写
        // 判断输入的值是否与合计相等
        let sumOne = 0; 
        let sumTwo = 0; 
        let sumThree = 0;
        for (let i = 0, l = this.boothApplyData.length; i < l; i++) {
          if (this.boothApplyData[i].exhibitionPeriod === 1) {
            sumOne = sumOne + this.boothApplyData[i].boothNumber;
          } else if (this.boothApplyData[i].exhibitionPeriod === 2) {
            sumTwo = sumTwo + this.boothApplyData[i].boothNumber;
          } else if (this.boothApplyData[i].exhibitionPeriod === 3) {
            sumThree = sumThree + this.boothApplyData[i].boothNumber;
          }
        }
        let resultOne = sumOne - 2 * this.boothApplyList[0][0].boothNumber;
        let resultTwo = sumTwo - 2 * this.boothApplyList[1][0].boothNumber;
        let resultThree = sumThree - 2 * this.boothApplyList[2][0].boothNumber;
        if (resultOne === this.boothApplyList[0][0].boothNumber && resultTwo === this.boothApplyList[1][0].boothNumber && resultThree === this.boothApplyList[2][0].boothNumber) {
          let submitList = [];
          for (let i = 0, l = this.boothApplyData.length; i < l; i++) {
            if (this.boothApplyData[i].isEdit) {
              let obj = {
                demandId: this.boothApplyData[i].demandId,
                delegationId: this.$store.getters.userInfo.org.deptId,
                delegationCode: this.$store.getters.userInfo.org.deptCode,
                delegationName: this.$store.getters.userInfo.org.deptName,
                coceralId: this.boothApplyData[i].coceralId,
                boothType: this.boothApplyData[i].boothType,
                exhibitionAreaCode: this.boothApplyData[i].exhibitionArea,
                exhibitionAreaName: this.boothApplyData[i].exhibitionAreaName,
                boothNumber: this.boothApplyData[i].boothNumber,
                exhibitionSession: this.boothApplyData[i].exhibitionSession,
                exhibitionPeriod: this.boothApplyData[i].exhibitionPeriod,
                creatorId: this.$store.getters.userInfo.org.creatorId,
                creatorName: this.$store.getters.userInfo.org.creatorName,
                createDate: this.$store.getters.userInfo.org.createDate,
                modifierId: this.$store.getters.userInfo.org.modifierId,
                modifierName: this.$store.getters.userInfo.org.modifierName,
                modifyDate: this.$store.getters.userInfo.org.modifyDate
              };
              submitList.push(obj);
            }
          }
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.postEveryBoothNeedApplySubmit(submitList).then(() => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
            this.$message.success('操作成功');
            this.createdQuery();
          }).catch(e => {
            this.$nextTick(() => { 
              fullScreenloading.close();
            });
          });
        } else if (resultOne !== this.boothApplyList[0][0].boothNumber) {
          this.$message.warning('第一期的需求展位数与合计不等');
        } else if (resultTwo !== this.boothApplyList[1][0].boothNumber) {
          this.$message.warning('第二期的需求展位数与合计不等');
        } else if (resultThree !== this.boothApplyList[2][0].boothNumber) {
          this.$message.warning('第三期的需求展位数与合计不等');
        }
        
      } else {
        this.$message.warning('请正确填写需求展位数');
      }
    },
    // 下载
    onDownload() {
      window.open(`${process.env.API_NA_URL}/api/ordinaryBase/getNumberInfo/download?delegationId=${this.queryForm.delegationId}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 打印
    onPrint() {
      window.print();
    },
    // 查询封装
    createdQuery() {
      this.boothApplyList = [];
      this.boothApplyData = [];
      this.loading = true;
      this.getEveryBoothNeedApply(this.queryForm).then(res => {
        let perList = JSON.parse(JSON.stringify(res)).perOrdinaryNumberList;
        let ordinaryList = JSON.parse(JSON.stringify(res)).ordinaryTemplateListNumberList;
        let list = [];
        for (let i = 0, l = perList.length; i < l; i++) {
          if (i === 0) {
            list.push([{ exhibitionPeriod: perList[i].exhibitionPeriod, exhibitionAreaName: '第一期总展位数', boothNumber: perList[i].baseTotal, isEdit: false }]);
          } else if (i === 1) {
            list.push([{ exhibitionPeriod: perList[i].exhibitionPeriod, exhibitionAreaName: '第二期总展位数', boothNumber: perList[i].baseTotal, isEdit: false }]);
          } else if (i === 2) {
            list.push([{ exhibitionPeriod: perList[i].exhibitionPeriod, exhibitionAreaName: '第三期总展位数', boothNumber: perList[i].baseTotal, isEdit: false }]);
          }
          for (let t = 0, len = ordinaryList.length; t < len; t++) {
            if (ordinaryList[t].exhibitionPeriod === perList[i].exhibitionPeriod) {
              ordinaryList[t].isEdit = true;
              ordinaryList[t].boothNumber = ordinaryList[t].boothNumber ? ordinaryList[t].boothNumber : 0;
              list[i].push(ordinaryList[t]);
            }
          }
          list[i].push({ exhibitionPeriod: perList[i].exhibitionPeriod, exhibitionAreaName: '合计', boothNumber: perList[i].baseTotal, isEdit: false });
        }
        this.boothApplyList = JSON.parse(JSON.stringify(list));
        this.boothApplyData = JSON.parse(JSON.stringify(list)).flat();
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>

