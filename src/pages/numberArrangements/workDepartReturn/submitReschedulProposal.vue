<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="商协会提出品牌展位数量重新安排方案" name="first">
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="item in exhibitionAreaOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="item in dealClusterOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyId" clearable>
            <el-option v-for="item in companyOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table :data="rescheduleInfoData.records" v-loading="loading" border>
        <el-table-column label="展区" prop="exhibitionAreaName" align="center"></el-table-column>
        <el-table-column label="拟安排企业名称" prop="companyName" align="center"></el-table-column>
        <el-table-column label="所属交易团" prop="dealClusterName" align="center"></el-table-column>
        <el-table-column label="拟新增安排展位数" prop="scheduleBoothNumber" align="center"></el-table-column>
        <el-table-column label="拟新增安排展位号" prop="scheduleBooth" align="center"></el-table-column>
        <el-table-column label="是否设计岛型展位" prop="isIsland" align="center">
          <template slot-scope="scope">
            {{ scope.row.isIsland === 0 ? '否' : (scope.row.isIsland === 1 ? '是' : '')}}
          </template>
        </el-table-column>
        <el-table-column label="安排理由" prop="scheduleReason" align="center"></el-table-column>
        <el-table-column label="审核情况" prop="reviewResult" align="center">
          <template slot-scope="scope">
            {{ scope.row.reviewResult | reviewResult }}
          </template>
        </el-table-column>
        <el-table-column label="审核意见" prop="reviewOpinion" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEdit(scope.row)" :disabled="scope.row.reviewResult === '1' || scope.row.reviewResult === '2'">编辑</el-button>
            <el-button type="text" @click="handleDelete(scope.row.scheduleId)" :disabled="scope.row.reviewResult === '1' || scope.row.reviewResult === '2'">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="space-between" class="pagination-footer">
        <span class="add_btn">
          <el-button type="danger" size="medium" @click="handleAdd">新增</el-button>
          <el-button type="danger" size="medium" @click="handleSubmit">提交</el-button>
          <el-button type="primary" size="medium">下载</el-button>
        </span>
        <el-pagination 
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="rescheduleInfoData.total">
        </el-pagination>
      </el-row>
      <!-- 新增弹窗 -->
      <el-dialog :title="dialogTitle" :visible.sync="isEdit" v-if="isEdit">
        <el-form class="writeForm" :model="writeForm" ref="writeForm" :rules="writeFormRules" label-width="150px">
          <el-form-item label="展区：" prop="exhibitionArea">
            <el-select v-model="writeForm.exhibitionArea" @change="handleExChange" class="sub-select">
              <el-option v-for="item in exhibitionAreaOptsw" :key="item.value" :value="item.value" :label="item.text"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拟安排企业名称：" prop="companyId">
            <el-select v-model="writeForm.companyId" @change="handleComChange" class="sub-select">
              <el-option v-for="item in companyOptsw" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属交易团：" prop="dealClusterName">
            <el-input v-model="writeForm.dealClusterName" class="sub-select" disabled></el-input>
          </el-form-item>
          <el-form-item label="拟新增安排展位号：" prop="scheduleBooth">
            <el-select v-model="writeForm.scheduleBooth" multiple @change="handleSBoothChange" class="sub-select">
              <el-option v-for="(item, key) in scheduleBoothOpts" :key="key" :value="item" :label="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否设计岛型展位：" prop="isIsland">
            <el-select v-model="writeForm.isIsland" class="sub-select">
              <el-option v-for="item in isIslandOptsw" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="安排理由：" prop="scheduleType">
            <el-checkbox-group v-model="writeForm.scheduleType">
              <el-checkbox :label="'1'">
                该展区现有品牌企业，安排理由
                <span v-if="!handleCheckboxSelect('1', 'scheduleTextOne')">______</span>
                (请说明)
              </el-checkbox>
              <el-input type="textarea" v-model="scheduleText.scheduleTextOne" :rows="2" v-if="handleCheckboxSelect('1', 'scheduleTextOne')" placeholder="请输入安排理由" clearable></el-input>
              <el-checkbox :label="'2'">
                该展区有需求的合格候补企业中排名第
                  <span v-if="!handleCheckboxSelect('2', 'scheduleTextTwo')">______</span>
                  <el-input v-if="handleCheckboxSelect('2', 'scheduleTextTwo')" v-model="scheduleText.scheduleTextTwo" size="small" maxlength="4" placeholder="请输入" style="width: 70px;"></el-input>
                (请严格按分数高低安排)
              </el-checkbox>
              <el-checkbox :label="'3'">其他理由：(可另文说明)</el-checkbox>
              <el-input v-if="handleCheckboxSelect('3', 'scheduleTextThree')" v-model="scheduleText.scheduleTextThree" class="sub-select" :rows="4" type="textarea" placeholder="请输入其他理由" clearable></el-input>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" size="medium" @click="submitAdd('writeForm', dialogBtn)">{{ dialogBtn }}</el-button>
          <el-button type="info" size="medium" @click="isEdit = false;">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      activeName: 'first',
      loading: '',
      dialogTitle: '', // 弹框标题
      isEdit: false,
      dialogBtn: '',
      esType: '', // 新增编辑类型
      resData: '',
      scheduleText: {
        scheduleTextOne: '',
        scheduleTextTwo: '',
        scheduleTextThree: ''
      },
      exhibitionAreaOpts: [],
      exhibitionAreaOptsw: [],
      dealClusterOpts: [],
      companyOpts: [],
      companyOptsw: [],
      scheduleBoothOpts: [],
      isIslandOptsw: [{ value: 0, label: '否' }, { value: 1, label: '是' }],
      scheduleReasonOptsw: [{ value: '1', label: '该展区现有品牌企业，安排理由______(请说明)' }, { value: '2', label: '该展区有需求的合格候补企业中排名第______(请严格按分数高低安排)' }, { value: '3', label: '其他理由：(可另文说明)' }],
      queryForm: {
        exhibitionArea: '',
        dealClusterId: '',
        companyId: ''
      },
      writeForm: {
        scheduleId: '',
        exhibitionArea: '',
        exhibitionAreaName: '',
        companyId: '',
        companyName: '',
        companyCode: '',
        cantonFairCode: '',
        dealClusterId: '',
        dealClusterName: '',
        scheduleBoothNumber: '',
        scheduleBooth: [],
        isIsland: '',
        scheduleType: [],
        scheduleReason: '',
        isNewEnterprises: '',
        coceralId: '2',
        coceralName: '食品土畜商会'
      },
      reasonArr: [],
      writeFormRules: {
        exhibitionArea: [{ required: true, message: '请选择展区', trigger: 'change' }],
        companyId: [{ required: true, message: '请选择展区后再选择企业', trigger: 'change' }],
        scheduleBooth: [{ required: true, message: '请选择展区后再选择展位号', trigger: 'change' }],
        isIsland: [{ required: true, message: '请选择是或否', trigger: 'change' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    reviewResult(value) {
      switch (value) {
        case '0':
          return '未提交';
        case '1':
          return '未审定';
        case '2':
          return '通过';
        case '3':
          return '不通过';
        default:
          return '';
      }
    }
  },
  computed: {
    ...mapGetters('workDepartReturn', ['rescheduleInfoData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        dealClusterId: this.queryForm.dealClusterId,
        companyId: this.queryForm.companyId,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    // 查询拟定企业
    companyQuery() {
      return {
        exhibitionArea: this.writeForm.exhibitionArea,
        coceralId: '2'
      };
    },
    // 新增添加
    addData() {
      return {
        scheduleId: this.writeForm.scheduleId,
        exhibitionArea: this.writeForm.exhibitionArea,
        exhibitionAreaName: this.writeForm.exhibitionAreaName,
        companyId: this.writeForm.companyId,
        companyName: this.writeForm.companyName,
        companyCode: this.writeForm.companyCode,
        cantonFairCode: this.writeForm.cantonFairCode,
        scheduleBoothNumber: this.writeForm.scheduleBoothNumber,
        scheduleBooth: '',
        isIsland: this.writeForm.isIsland,
        scheduleType: '',
        scheduleReason: this.writeForm.scheduleReason,
        isNewEnterprises: this.writeForm.isNewEnterprises,
        dealClusterId: this.writeForm.dealClusterId,
        dealClusterName: this.writeForm.dealClusterName,
        coceralId: this.writeForm.coceralId,
        coceralName: this.writeForm.coceralName,
        creatorId: this.$store.getters.userInfo.userId,
        creatorName: this.$store.getters.userInfo.userName,
        reviewResult: '0'
      };
    },
    // 删除
    delData() {
      return {
        scheduleId: ''
      };
    }
  },
  created() {
    this.loading = true;
    this.exhibitionAreaOptsw = JSON.parse(localStorage.getItem("dictData")).exhibitionArea;
    this.getRescheduleInfo({ current: 0, size: 0 }).then(res => {
      this.exhibitionAreaOpts = res.exhibitionAreaOpts;
      this.dealClusterOpts = res.dealClusterOpts;
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('workDepartReturn', ['getRescheduleInfo', 'getCompanyInfo', 'getArrangableBooth', 'postAddRescheduleInfo', 'postUpdateRescheduleInfo', 'getDelRescheduleInfo', 'postSubmitRescheduleInfo']),
    // 新增
    handleAdd() {
      this.dialogTitle = '新增';
      this.dialogBtn = '提交';
      this.writeForm = {
        scheduleId: '',
        exhibitionArea: '',
        exhibitionAreaName: '',
        companyId: '',
        companyName: '',
        companyCode: '',
        cantonFairCode: '',
        dealClusterId: '',
        dealClusterName: '',
        scheduleBoothNumber: '',
        scheduleBooth: [],
        isIsland: '',
        scheduleType: [],
        scheduleReason: '',
        isNewEnterprises: '',
        coceralId: '2',
        coceralName: '食品土畜商会'
      };
      this.scheduleText = {
        scheduleTextOne: '',
        scheduleTextTwo: '',
        scheduleTextThree: ''
      };
      this.isEdit = true;
    },
    // 编辑
    handleEdit(row) {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.dialogTitle = '编辑';
      this.dialogBtn = '保存';
      this.writeForm = {
        scheduleId: row.scheduleId,
        exhibitionArea: row.exhibitionArea,
        exhibitionAreaName: row.exhibitionAreaName,
        companyId: row.companyId,
        companyName: row.companyName,
        companyCode: row.companyCode,
        cantonFairCode: row.cantonFairCode,
        dealClusterId: row.dealClusterId,
        dealClusterName: row.dealClusterName,
        scheduleBoothNumber: row.scheduleBoothNumber,
        scheduleBooth: [],
        isIsland: row.isIsland,
        scheduleType: [],
        scheduleReason: '',
        isNewEnterprises: row.isNewEnterprises,
        coceralId: row.coceralId,
        coceralName: row.coceralName
      };
      this.reasonArr = [];
      // 取出展位号
      let boothIndex = row.scheduleBooth ? row.scheduleBooth.indexOf(',') : '';
      if (boothIndex === -1) { // 只有一项
        this.writeForm.scheduleBooth.push(row.scheduleBooth);
      } else if (boothIndex > -1) { // 不止一项
        this.writeForm.scheduleBooth = row.scheduleBooth.split(',');
      }
      // 取出安排理由选项
      let scheduleIndex = row.scheduleType ? row.scheduleType.indexOf(',') : '';
      if (scheduleIndex === -1) { // 只有一项
        this.writeForm.scheduleType.push(row.scheduleType);
        this.reasonArr.push(row.scheduleReason);
      } else if (scheduleIndex > -1) { // 不止一项
        this.writeForm.scheduleType = row.scheduleType.split(',');
        this.reasonArr = row.scheduleReason.split(',');
      }
      // 填充安排理由内容
      for (let i = 0; i < this.writeForm.scheduleType.length; i++) {
        let filterArr = ['1', '2', '3'];
        if (scheduleIndex === -1) { // 只有一项
          this.switchFilter(this.writeForm.scheduleType[0], this.reasonArr[0], filterArr);
        } else if (scheduleIndex > -1) {
          this.switchFilter(this.writeForm.scheduleType[i], this.reasonArr[i], filterArr);
        }
      }
      this.getCompanyInfo(this.companyQuery).then(res => {
        this.companyOptsw = res.companyOpts;
        this.getArrangableBooth({ exhibitionArea: this.writeForm.exhibitionArea }).then(data => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
          this.scheduleBoothOpts = data;
          this.isEdit = true;
          this.isSave = !this.isSave;
        }).catch(e => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
        });
      }).catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    },
    // 理由内容过滤
    switchFilter(conditions, result, filterArr) {
      switch (conditions) {
        case filterArr[0]:
          this.scheduleText.scheduleTextOne = result.substring(14, result.length);
          break;
        case filterArr[1]:
          this.scheduleText.scheduleTextTwo = result.substring(17, result.length);
          break;
        case filterArr[2]:
          this.scheduleText.scheduleTextThree = result.substring(5, result.length);
          break; 
        default: 
          break;   
      }
    },
    // 展区更换
    handleExChange(val) {
      for (let i = 0; i < this.exhibitionAreaOptsw.length; i++) {
        if (this.exhibitionAreaOptsw[i].value === val) {
          this.writeForm.exhibitionAreaName = this.exhibitionAreaOptsw[i].text;
          break;
        }
      }
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.getCompanyInfo(this.companyQuery).then(res => {
        this.companyOptsw = res.companyOpts;
        this.writeForm.dealClusterName = res.length > 0 ? res[0].dealClusterName : '';
        this.resData = JSON.parse(JSON.stringify(res));
        this.getArrangableBooth({ exhibitionArea: this.writeForm.exhibitionArea }).then(data => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.scheduleBoothOpts = data;
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }).catch(e => {
        this.$nextTick(() => {
          fullScreenloading.close();
        });
      });
    },
    // 拟企业选择
    handleComChange() {
      this.companyOptsw.forEach((item, index) => {
        if (this.writeForm.companyId === item.value) {
          this.writeForm.companyName = item.label;
          this.writeForm.companyCode = this.resData[index].companyCode;
          this.writeForm.cantonFairCode = this.resData[index].cantonFairCode;
          this.writeForm.isNewEnterprises = this.resData[index].isNewEnterprises;
          this.writeForm.dealClusterId = this.resData[index].dealClusterId;
        }
      });
    },
    // 拟展位号选择
    handleSBoothChange() {
      this.writeForm.scheduleBoothNumber = this.writeForm.scheduleBooth.length;
    },
    // 安排理由选择
    handleCheckboxSelect(num, checkName) {
      let index = this.writeForm.scheduleType.indexOf(num);
      if (index === -1) {
        this.handleClearReason(checkName);
        return false;
      } else {
        return true;
      }
    },
    // 安排理由清空
    handleClearReason(checkName) {
      let filterArr = ['scheduleTextOne', 'scheduleTextTwo', 'scheduleTextThree'];
      switch (checkName) {
        case filterArr[0]:
          this.scheduleText.scheduleTextOne = '';
          break;
        case filterArr[1]:
          this.scheduleText.scheduleTextTwo = '';
          break;
        case filterArr[2]:
          this.scheduleText.scheduleTextThree = '';
          break; 
        default: 
          break;   
      }
    },
    // 新增添加与保存按钮
    submitAdd(formName, type) {
      if (this.scheduleText.scheduleTextOne) {
        this.writeForm.scheduleReason = `该展区现有品牌企业，安排理由${this.scheduleText.scheduleTextOne}`;
      } else {
        this.writeForm.scheduleReason = '';
      }
      if (this.scheduleText.scheduleTextTwo) {
        this.writeForm.scheduleReason = this.writeForm.scheduleReason + `,该展区有需求的合格候补企业中排名第${this.scheduleText.scheduleTextTwo}`;
      }
      if (this.scheduleText.scheduleTextThree) {
        this.writeForm.scheduleReason = this.writeForm.scheduleReason + `,其他理由：${this.scheduleText.scheduleTextThree}`;
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.addData.scheduleBooth = this.writeForm.scheduleBooth.join(',');
          this.addData.scheduleType = this.writeForm.scheduleType.join(',');
          if (type === '提交') {
            this.postAddRescheduleInfo(this.addData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('添加成功');
              this.isEdit = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          } else if (type === '保存') {
            this.postUpdateRescheduleInfo(this.addData).then(() => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
              this.$message.success('保存成功');
              this.isEdit = false;
              this.createdQuery();
            }).catch(e => {
              this.$nextTick(() => { 
                fullScreenloading.close();
              });
            });
          }
        }
      });
    },
    // 删除
    handleDelete(id) {
      this.$confirm('确定删除此方案吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delData.scheduleId = id;
        this.getDelRescheduleInfo(this.delData).then(() => {
          this.$message.success('删除成功');
          this.createdQuery();
        }).catch(e => {});
      }).catch(() => {
        this.$message.info('已取消此操作');
      });
    },
    // 提交
    handleSubmit() {
      this.loading = true;
      this.postSubmitRescheduleInfo().then(() => {
        this.$message.success('提交成功');
        this.handleQuery();
      }).catch(e => {
        this.loading = false;
      });
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    // 查询封装
    createdQuery() {
      this.loading = true;
      this.getRescheduleInfo(this.formQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}  
.writeForm{
  width: 70%;
  margin: 0 auto;
}
.writeForm >>> .el-form-item{
  margin-bottom: 22px;
}
.sub-select{
  width: 100%;
  max-width: 300px;
}
.el-checkbox-group >>> .el-checkbox{
  margin-left: 0!important;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>
