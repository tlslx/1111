<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="工作部设置展位安排方案" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" @change="handleProductAreaQuery" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展品专区">
          <el-select v-model="queryForm.productArea" clearable>
            <el-option v-for="(item, index) in productAreaOpts" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业类型">
          <el-select v-model="queryForm.companyType" clearable>
            <el-option v-for="item in companyTypeOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="boothArrangePlanData.records" ref="multipleTable"
        @select="handleSelectionChange"
        @select-all="handleSelectionChange"
        @selection-change="handleCheckedChange"
        :row-key="getRowKey" v-loading="loading" height="550" border>
        <el-table-column type="selection" width="40px"></el-table-column>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="展品专区" prop="productAreaName" align="center"></el-table-column>
        <el-table-column label="优先级选项" prop="priority" align="center"></el-table-column>
        <el-table-column label="企业类型" prop="companyType" align="center">
          <template slot-scope="scope">
            {{ scope.row.companyType | companyTypeFilterSp }}
          </template>
        </el-table-column>
        <el-table-column label="交易团、商协会推荐情况" prop="recommendStatus" align="center">
          <template slot-scope="scope">
            {{ scope.row.recommendStatus | chooseFilter }}
          </template>
        </el-table-column>
        <!--
        <el-table-column label="商协会是否推荐" prop="commerceRecommend" align="center">
          <template slot-scope="scope">
            {{ scope.row.commerceRecommend | chooseFilter }}
          </template>
        </el-table-column>
        -->
        <el-table-column label="出口额参数上限" prop="exportUpperLimit" align="center"></el-table-column>
        <el-table-column label="出口额参数下限" prop="exportLowerLimit" align="center"></el-table-column>
        <el-table-column label="HS编码42010000下出口额参数" prop="peetCodeExportVolume" align="center"></el-table-column>
        <el-table-column label="国内销售额上限" prop="saleUpperLimit" align="center"></el-table-column>
        <el-table-column label="国内销售额下限" prop="saleLowerLimit" align="center"></el-table-column>
        <el-table-column label="展位数量上限" prop="numberUpperLimit" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleAddEdit('edit', scope.row)">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row.planConfigId)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="danger" size="medium" @click="handleAddEdit('add')">新增</el-button>
          <el-button type="primary" size="medium" @click="handleAddRule">按规则生成数量安排方案</el-button>
          <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
        </span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="boothArrangePlanData.total">
        </el-pagination>
      </el-row>
      <!-- 新增编辑弹框 -->
      <el-dialog :title="dialogTitle" :visible.sync="addDialog" v-if="addDialog" width="70%">
        <el-form :model="addEditData" class="add-form" ref="addEditForm" label-width="140px" :rules="rules">
          <div class="form-box">
            <el-form-item label="展区：" prop="exhibitionArea">
              <el-select v-model="addEditData.exhibitionArea" @change="handleExhibitionAreaChange" clearable>
                <el-option v-for="(item, index) in exhibitionAreaOptsw" :key="index" :value="item.value" :label="item.text"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展品专区：" prop="productArea">
              <el-select v-model="addEditData.productArea" @change="handleProductChange" clearable>
                <el-option v-for="(item, index) in productAreaOptsw" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="优先级选项：" prop="priority">
              <el-select v-model="addEditData.priority" clearable>
                <el-option v-for="(item, index) in priorityOpts" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业类型：" prop="companyType">
              <el-select v-model="addEditData.companyType" clearable>
                <el-option v-for="(item, index) in companyTypeOpts" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易团、商协会推荐情况：" prop="recommendStatus" label-width="200px">
              <el-select v-model="addEditData.recommendStatus" clearable>
                <el-option v-for="(item, index) in chooseList" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <!--
            <el-form-item label="商协会是否推荐：" prop="commerceRecommend">
              <el-select v-model="addEditData.commerceRecommend" clearable>
                <el-option v-for="(item, index) in chooseList" :key="index" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            -->
          </div>
          <div class="form-box">
            <el-form-item label="出口额参数上限：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim="addEditData.exportUpperLimit" maxlength="15" clearable></el-input>
            </el-form-item>
            <el-form-item label="出口额参数下限：" prop="exportLowerLimit">
              <el-input placeholder="请输入" v-model.trim="addEditData.exportLowerLimit" maxlength="15" clearable></el-input>
            </el-form-item>
            <p style="margin-left: 25%;">或</p>
            <el-form-item label="国内销售额上限：" prop="saleUpperLimit">
              <el-input placeholder="请输入" v-model.trim="addEditData.saleUpperLimit" maxlength="15" clearable></el-input>
            </el-form-item>
            <el-form-item label="国内销售额下限：" prop="saleLowerLimit">
              <el-input placeholder="请输入" v-model.trim="addEditData.saleLowerLimit" maxlength="15" clearable></el-input>
            </el-form-item>
            <el-form-item label="展位数量上限：" prop="numberUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.numberUpperLimit" maxlength="2" clearable></el-input>
            </el-form-item>
            <el-form-item label="HS编码（42010000）下出口额参数：" prop="peetCodeExportVolume" label-width="260px" v-if="addEditData.exhibitionArea === 'CG06' && addEditData.productArea === 'CG06_1'">
              <el-input placeholder="请输入" v-model.trim="addEditData.peetCodeExportVolume" maxlength="8" clearable></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="total-footer">
          <el-button type="primary" size="medium" @click="handleSave('addEditForm')">保存</el-button>
          <el-button size="medium" @click="addDialog = false;">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
import store from '../../scripts/framework/store';
export default {
  mixins: [listPageBase],
  data() {
    var needInt = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (!value) {
        return callback(new Error('请输入>0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入>0的整数'));
      } else {
        return callback();
      }
    };
    var needIntss = (rule, value, callback) => {
      const reg = /^\d{1,10}(\.\d{1,4})?$/;
      if (!reg.test(value) && value !== '') {
        return callback(new Error('请输入>0且小数点前后分别为最多10位和最多4位的数字'));
      } else {
        return callback();
      }
    };
    var needInts = (rule, value, callback) => {
      const reg = /^\d{1,10}(\.\d{1,4})?$/;
      if (!reg.test(value) && value !== '') {
        return callback(new Error('请输入>0且小数点前后分别为最多10位和最多4位的数字'));
      } else {
        return callback();
      }
    };
    var needIntsEll = (rule, value, callback) => {
      const reg = /^\d{1,10}(\.\d{1,4})?$/;
      if (!reg.test(value) && value !== '') {
        return callback(new Error('请输入>0且小数点前后分别为最多10位和最多4位的数字'));
      } else if (Number(value) > Number(this.addEditData.exportUpperLimit) && this.addEditData.exportUpperLimit !== '') {
        return callback(new Error('请输入数值并且不能大于出口额参数上限'));
      } else {
        return callback();
      }
    };
    var needIntsSll = (rule, value, callback) => {
      const reg = /^\d{1,10}(\.\d{1,4})?$/;
      if (!reg.test(value) && value !== '') {
        return callback(new Error('请输入>0且小数点前后分别为最多10位和最多4位的数字'));
      } else if (Number(value) > Number(this.addEditData.saleUpperLimit) && this.addEditData.saleUpperLimit !== '') {
        return callback(new Error('请输入数值并且不能大于国内销售额上限'));
      } else {
        return callback();
      }
    };
    return {
      activeName: 'first',
      loading: '',
      store,
      addDialog: false,
      dialogTitle: '',
      exhibitionAreaOpts: [],
      productAreaOpts: [],
      queryForm: {
        exhibitionArea: '',
        productArea: '',
        companyType: ''
      },
      // 新增
      exhibitionAreaOptsw: [{ value: 'NE01', text: '新能源' }, { value: 'CG06', text: '宠物用品' }],
      productAreaOptsw: [],
      priorityOpts: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
      // companyTypeOptsw: [],
      companyTypeOpts: [{ value: '1', label: '生产企业' }, { value: '2', label: '非生产企业' }, { value: '0', label: '所有企业' }],
      chooseList: [{ value: '1', label: '共同推荐' }, { value: '2', label: '至少一方推荐' }],
      lastCheckData: [], // 上次保存的值
      selectData: [], // 选中的数据索引
      checkList: [], // 临时选中的值
      addEditData: {
        // commerceRecommend: '',
        recommendStatus: '',
        companyType: '',
        // delegationRecommend: '',
        exhibitionArea: '',
        exhibitionAreaName: '',
        exportLowerLimit: '',
        exportUpperLimit: '',
        isGenerateCase: '',
        numberUpperLimit: '',
        priority: '',
        productArea: '',
        productAreaName: '',
        saleLowerLimit: '',
        saleUpperLimit: '',
        peetCodeExportVolume: ''
      },
      rules: {
        // commerceRecommend: [{ required: true, message: '请选择', trigger: 'change' }],
        companyType: [{ required: true, message: '请选择', trigger: 'change' }],
        recommendStatus: [{ required: true, message: '请选择', trigger: 'change' }],
        exhibitionArea: [{ required: true, message: '请选择', trigger: 'change' }],
        numberUpperLimit: [{ required: true, validator: needInt, trigger: 'blur' }],
        priority: [{ required: true, message: '请选择', trigger: 'change' }],
        exportLowerLimit: [{ validator: needIntsEll, trigger: 'blur' }],
        exportUpperLimit: [{ validator: needInts, trigger: 'blur' }],
        saleLowerLimit: [{ validator: needIntsSll, trigger: 'blur' }],
        saleUpperLimit: [{ validator: needInts, trigger: 'blur' }],
        peetCodeExportVolume: [{ validator: needIntss, trigger: 'blur' }],
        productArea: [{ required: true, message: '请先选择展区', trigger: 'change' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    // 企业类型
    // companyTypeFilter: value => {
    //   let companyTypeOptsw = kindo.dictionary.get('companyType');
    //   for (let i = 0; i < companyTypeOptsw.length; i++) {
    //     if (value === companyTypeOptsw[i].value) {
    //       return companyTypeOptsw[i].label;
    //     }
    //   }
    // },
    // 企业类型2
    companyTypeFilterSp: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '所有企业';
        case '1':
          return '生产企业';
        case '2':
          return '非生产企业';
        default:
          return;
      }
    },

    // 是否
    chooseFilter: value => {
      switch (value) {
        case '1':
          return '共同推荐';
        case '2':
          return '至少一方推荐';
        default:
          return;
      }
    }
  },
  computed: {
    ...mapGetters('thenewThemel', ['boothArrangePlanData', 'exhibitionInfoData', 'exhibitionAreaGet']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        productArea: this.queryForm.productArea,
        companyType: this.queryForm.companyType,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    getRowKey (row) { // 获取row的key值
      return row.planConfigId;
    }
  },
  created() {
    // this.exhibitionAreaOptsw = JSON.parse(localStorage.getItem('dictData')).exhibitionArea;
    // this.companyTypeOptsw = await kindo.dictionary.get('companyType');
    this.originQuery();
  },
  methods: {
    ...mapActions('thenewThemel', ['getBoothArrangePlanList', 'postBoothArrangePlanListAdd', 'getExhibitionInfoByCode',
      'postBoothArrangePlanListUpdate', 'postBoothArrangePlanListDelete', 'postAddByRuleArrangementPlan', 'getExhibitionArea']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getexhibitionInfoByCode', 'getexhibitionAreaDTOList']),
    // 根据展区查询专区
    handleProductAreaQuery(val) {
      if (val) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.getexhibitionInfoByCode({ exhibitionAreaCode: val }).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.productAreaOpts = JSON.parse(JSON.stringify(res));
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      } else {
        this.queryForm.productArea = '';
        this.productAreaOpts = [];
      }
    },
    // 下载
    handleDownload() {
      let url = `exhibitionArea=${this.queryForm.exhibitionArea}&productArea=${this.queryForm.productArea}&companyType=${this.queryForm.companyType}`;
      url = url.replace(/undefined/g, '');
      window.open(`${process.env.API_NA_URL}/api/newthemeRoleConfig/boothArrange/downloadPlan?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 打开新增编辑
    handleAddEdit(type, row) {
      if (type === 'add') {
        this.dialogTitle = '新增';
        this.addEditData = {
          // commerceRecommend: '',
          companyType: '',
          recommendStatus: '',
          // delegationRecommend: '',
          exhibitionArea: '',
          exhibitionAreaName: '',
          exportLowerLimit: '',
          exportUpperLimit: '',
          isGenerateCase: '',
          numberUpperLimit: '',
          priority: '',
          productArea: '',
          productAreaName: '',
          saleLowerLimit: '',
          saleUpperLimit: '',
          peetCodeExportVolume: ''
        };
      } else if (type === 'edit') {
        this.dialogTitle = '编辑';
        this.addEditData = {
          // commerceRecommend: row.commerceRecommend,
          planConfigId: row.planConfigId,
          companyType: row.companyType,
          recommendStatus: row.recommendStatus,
          // delegationRecommend: row.delegationRecommend,
          exhibitionArea: row.exhibitionArea,
          exhibitionAreaName: row.exhibitionAreaName,
          exportLowerLimit: row.exportLowerLimit,
          exportUpperLimit: row.exportUpperLimit,
          isGenerateCase: '0',
          numberUpperLimit: row.numberUpperLimit,
          priority: row.priority,
          productArea: row.productArea,
          productAreaName: row.productAreaName,
          saleLowerLimit: row.saleLowerLimit,
          saleUpperLimit: row.saleUpperLimit,
          peetCodeExportVolume: row.peetCodeExportVolume
        };
        // 获取展品专区
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.getExhibitionInfoByCode({ exhibitionAreaCode: row.exhibitionArea }).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.productAreaOptsw = JSON.parse(JSON.stringify(res));
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }
      this.addDialog = true;
    },
    // 展区改变查展品专区
    handleExhibitionAreaChange(val) {
      // 获取展区名称
      for (let i = 0; i < this.exhibitionAreaOptsw.length; i++) {
        if (val === this.exhibitionAreaOptsw[i].value) {
          this.addEditData.exhibitionAreaName = this.exhibitionAreaOptsw[i].text;
          break;
        }
      }
      this.addEditData.productArea = '';
      this.addEditData.productAreaName = '';
      if (val) {
        // 获取展品专区
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.getExhibitionInfoByCode({ exhibitionAreaCode: val }).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.productAreaOptsw = JSON.parse(JSON.stringify(res));
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }
    },
    // 展品专区改变
    handleProductChange(val) {
      // 获取展品专区名称
      for (let i = 0; i < this.productAreaOptsw.length; i++) {
        if (val === this.productAreaOptsw[i].specialAreaCode) {
          this.addEditData.productAreaName = this.productAreaOptsw[i].specialAreaName;
          break;
        }
      }
    },
    // 保存
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          if (this.dialogTitle === '新增') {
            this.postBoothArrangePlanListAdd(this.addEditData).then(() => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
              this.$message.success('新增成功');
              this.addDialog = false;
              this.originQuery();
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
          } else if (this.dialogTitle === '编辑') {
            this.postBoothArrangePlanListUpdate(this.addEditData).then(() => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
              this.$message.success('编辑成功');
              this.addDialog = false;
              this.originQuery();
            }).catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
            });
          }
          this.addDialog = false;
        }
      });
    },
    // 删除
    handleDelete(id) {
      this.$confirm('确定删除此数据吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postBoothArrangePlanListDelete({ planConfigId: id }).then(() => {
          this.$message.success('删除成功');
          this.originQuery();
        }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消本次操作');
      });
    },
    handleCheckedChange(rows) { // 选中的数据获取
      this.checkList = []; // 初始化，防止重复添加
      if (rows) {
        rows.forEach(row => { // 遍历已选择的数据
          if (row) {
            this.checkList.push(row);
          }
        });
      }
    },
    // 按规则生成数量安排方案
    handleAddRule() {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      //降维 --- 二维数组降至一维数组
      let getList = Array.prototype.concat.apply([], this.lastCheckData);
      let listData = JSON.parse(JSON.stringify(getList));
      let flag = true;
      if (listData.length > 0) {
        for (let t = 0; t < listData.length; t++) {
          if (listData[t].isGenerateCase === '1') {
            flag = false;
            break;
          }
        }
        if (flag) {
          for (let i = 0; i < listData.length; i++) {
            listData[i].isGenerateCase = '1';
          }
          this.$confirm('确定将已勾选的数据进行按规则生成数量安排方案吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.postAddByRuleArrangementPlan(listData).then(() => {
              this.$message.success('操作成功');
              this.createdQuery();
            }).catch(e => {});
          }).catch(() => {
            this.$message.info('已取消本次操作');
          });
        } else {
          this.$message.warning('请确认已勾选的数据中是否存在已按规则生成过的数量安排方案');
        }
      } else {
        this.$message.warning('请至少选择一项');
      }
    },
    // 选中的数据索引获取
    handleSelectionChange(selection, row) {
      this.selectData[this.pageInfo.currentPage - 1] = []; // 初始化
      this.boothArrangePlanData.records.forEach((item, index) => {
        for (let i = 0; i < selection.length; i++) { // 遍历已选的数据重新填充数组
          if (item.planConfigId === selection[i].planConfigId) {
            this.selectData[this.pageInfo.currentPage - 1].push(index);
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
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.lastCheckData[this.pageInfo.currentPage - 1] = this.checkList;
      this.pageInfo.currentPage = val;
      this.loading = true;
      this.getBoothArrangePlanList(this.formQuery).then(data => {
        this.loading = false;
        // 勾选上次已勾选的数据
        let arr = [];
        if (this.selectData[this.pageInfo.currentPage - 1]) {
          this.selectData[this.pageInfo.currentPage - 1].forEach((item, index) => {
            arr.push(this.boothArrangePlanData.records[item]);
          });
        }
        let setTime = new Promise((resolve, reject) => {
          resolve(arr);
        });
        Promise.all([setTime]).then((results) => {
          this.toggleSelection(arr);
        });
      }).catch(e => {
        this.loading = false;
      });
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    // 初始查询封装
    originQuery() {
      // 展区
      this.getexhibitionArea().then(resa => {
        this.exhibitionArea = JSON.parse(JSON.stringify(resa));
        // this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
        // 新题材展区
        this.getexhibitionAreaDTOList().then(res => {
          this.arr = JSON.parse(JSON.stringify(res.records));
          this.arr.forEach((item, index, ar) => {
            if (item.isNewThemeArea) { // 是新题材
              for (let i = 0; i < this.exhibitionArea.length; i++) {
                if (item.exhibitionAreaCode === this.exhibitionArea[i].exhibitionAreaCode) {
                  let exare = {
                    exhibitionAreaCode: this.exhibitionArea[i].exhibitionAreaCode,
                    exhibitionAreaName: this.exhibitionArea[i].exhibitionAreaName
                  };
                  this.exhibitionAreaOpts.push(exare);
                }
              }
            }
          });
        });
      }).catch(e => {});
      // 数组去重
      let hash = {};
      this.exhibitionAreaOpts = this.exhibitionAreaOpts.reduce(function(item, next) {
        hash[next.exhibitionAreaCode] ? '' : hash[next.exhibitionAreaCode] = true && item.push(next);
        return item;
      }, []);
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getBoothArrangePlanList(this.formQuery).then(data => {
        this.loading = false;
        this.checkList = [];
        this.selectData = [];
        this.lastCheckData = [];
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.add_btn{
  margin-left: 30px;
}
.form-box >>> input::-webkit-outer-spin-button,
.form-box >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.form-box >>> input[type="number"]{
  -moz-appearance: textfield!important;
}
.pagination-footer{
  margin-top: 20px;
}
.add-form{
  display: flex;
}
.form-box{
  width: 50%;
  padding: 0 10px;
  box-sizing: border-box;
}
.total-footer{
  text-align: center;
  padding: 20px 0;
}
</style>
