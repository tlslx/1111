<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="标准展位价格设置" name="first">
      <el-form :model="queryForm" :inline="true" label-width="80">
        <el-form-item label="届数">
          <el-select v-model="queryForm.exhibitionSession" clearable>
            <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="queryForm.exhibitionAreaCode" @change="handleProductAreaQuery" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专区">
          <el-select v-model="queryForm.productType" clearable>
            <el-option v-for="(item, index) in productTypeOpts" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位类型">
          <el-select v-model="queryForm.boothType" clearable>
            <el-option v-for="(item, index) in boothTypeOpts" :key="index" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展位位置">
          <el-select v-model="queryForm.delegationId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptId" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div class="queryBtn">
        <el-button type="primary" @click="handleQuery">筛选</el-button>
        <el-button type="primary" >获取组展价格设置</el-button>
        <el-button type="primary" >复制往届展位价格</el-button>
        <el-button type="primary" @click="isSet = true; diaTitle = '新增'">新增</el-button>
      </div>
      <el-table border v-loading="loading">
        <el-table-column label="期数" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展柜区域" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展区" align="center" prop="exhibitionAreaName"></el-table-column>
        <el-table-column label="专区" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="室内展厅展位费单价" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="户外展场展位费单价" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="中央通道展位费单价" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="统一布展费标摊" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="统一布展费特装" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展位搭建费" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展架费" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展柜费" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="地柜费" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="网片费" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="不锈钢衣架费" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="挂架费" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="安装插座费" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="包期通讯费" align="center" prop="exhibitionSession"></el-table-column>
        <el-table-column label="展具配置费小计" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="安装射灯费" align="center" prop="companyName"></el-table-column>
        <el-table-column label="展位配置费合计-标摊" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="展位配置费合计-特装" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="备注" align="center" prop="delegationName"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <div>
              <el-button type="text">编辑</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-row type="flex" justify="center" class="pagination-footer">
        <el-pagination 
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageInfo.currentPage"
          :page-size="pageInfo.pageSize"
          :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="0">
        </el-pagination>
      </el-row>
      <!-- 新增编辑弹框 -->
      <el-dialog :title="diaTitle" :visible.sync="isSet" v-if="isSet">
        <el-form class="setForm" :model="addEditData" ref="setForm" :rules="setRule" label-width="160px">
          <div class="form-box">
            <el-form-item label="期数：" prop="priority">
              <el-select v-model="addEditData.priority" clearable>
                <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展区：" prop="exhibitionArea">
              <el-select v-model="addEditData.exhibitionArea" @change="handleExhibitionAreaChange" clearable>
                <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="专区：" prop="productArea">
              <el-select v-model="addEditData.productArea" clearable>
                <el-option v-for="(item, index) in productAreaOpts" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="室内展厅展位费单价：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="户外展场展位费单价：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="中央通道展位费单价：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="统一布展费材料：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="统一布展费特装：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="包期通讯费：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
          </div>
          <div class="form-box">
            <el-form-item label="展位搭建费：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="展架费：" prop="exportLowerLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportLowerLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="地柜费：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="展柜费：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="网片费：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="衣架费：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="挂架费：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="安装插座费：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
            <el-form-item label="安装射灯费：" prop="exportUpperLimit">
              <el-input placeholder="请输入" v-model.trim.number="addEditData.exportUpperLimit" clearable></el-input>
            </el-form-item>
          </div>
        </el-form>
        <div class="dialog-footer">
          <el-button type="primary" size="medium" >确认</el-button>
          <el-button size="medium" @click="isSet = false;">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      activeName: 'first',
      loading: '',
      // 弹框
      diaTitle: '',
      isSet: false,
      addEditData: {
        settlementType: ''
      },
      settlementTypeOpts: [],
      labelTitle: '',
      setRule: {

      },
      // 查询条件
      exhibitionSessionOpts: [],
      delegationOpts: [],
      exhibitionAreaOpts: [],
      productTypeOpts: [],
      boothTypeOpts: [{ value: '1', label: '品牌展位' }, { value: '2', label: '一般性展位' }],
      queryForm: {
        exhibitionSession: '',
        delegationId: '',
        exhibitionAreaCode: '',
        boothType: '',
        companyName: ''
      },
      pageInfo: { current: 1, size: 10 }
    };
  },
  filters: {
    boothTypeFilter: value => {
      let val = value + '';
      switch (val) {
        case '1':
          return '品牌展位';
        case '2':
          return '一般性展位';
        default:
          return;    
      }
    }
  },
  computed: {
    ...mapGetters("baseAccounting", [
      "delegationApply"
    ]),
    formQuery() {
      return {
        exhibitionSession: this.queryForm.exhibitionSession,
        delegationId: this.queryForm.delegationId,
        exhibitionAreaCode: this.queryForm.exhibitionAreaCode,
        boothType: this.queryForm.boothType,
        companyName: this.queryForm.companyName,
        current: this.queryForm.current,
        size: this.queryForm.size
      };
    }
  },
  created() {
    // 获取届数
    this.getsysExhibitions().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.exhibitionSessionOpts.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.exhibitionSessionOpts = this.exhibitionSessionOpts.sort(rul);
    });
    // 获取展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.createdQuery();
  },
  methods: {
    ...mapActions("exhibitionSettlement", [
      "getOrdinaryAdjustCompany"
    ]),
    ...mapActions("nainformation", [
      "getsysExhibitions", //获取展届信息
      "getexhibitionInfoByCode", // 获取专区
      "getexhibitionArea" // 获取展区
    ]),
    // 根据展区查询专区
    handleExhibitionAreaChange(val) {
      this.queryForm.productType = '';
      this.productTypeOpts = [];
      if (val) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.getexhibitionInfoByCode({ exhibitionAreaCode: val }).then(res => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
          this.productTypeOpts = JSON.parse(JSON.stringify(res));
        }).catch(e => {
          this.$nextTick(() => { 
            fullScreenloading.close();
          });
        });
      }
    },
    // 查询
    handleQuery() {
      this.pageInfo.current = 1;
    },
    // 操作页面
    handleSizeChange(val) {
      this.pageInfo.current = val;
    },
    handleCurrentChange(val) {
      this.pageInfo.size = val;
    },
    // 查询封装
    createdQuery() {
      
    }
  }
};
</script>
<style scoped>
.pagination-container{
  float: right;
}
.queryBtn{
  margin-bottom: 20px;
}
.setForm{
  display: flex;
}
.add_btn{
  margin-left: 30px;
}
.pagination-footer{
  margin-top: 20px;
}    
.form-box{
  width: 50%;
  padding: 0 10px;
  box-sizing: border-box;
}
.dialog-footer{
  text-align: center;
  padding-bottom: 20px;
}
</style>