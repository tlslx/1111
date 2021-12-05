/**
* @file 申报参会机构/演讲嘉宾信息
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div>
    <p style="border-bottom: 1px solid #a2a2a2"><span class="title">申报参会机构/演讲嘉宾信息</span></p>
    <el-form :inline="true" :model="ruleForm" class="demo-ruleForm">
      <el-form-item label="年份" size="mini">
        <el-select v-model="ruleForm.metting" placeholder="请选择">
          <el-option label="2017" value="01"></el-option>
          <el-option label="2018" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="届数" size="mini">
        <el-select v-model="ruleForm.metting" placeholder="请选择">
          <el-option label="第一期" value="01"></el-option>
          <el-option label="第二期" value="02"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item size="mini" style="margin-left: 50px">
        <el-button type="primary" class="btn" @click="">查询</el-button>
        <el-button type="primary" class="btn" @click="">重置</el-button>
      </el-form-item>
    </el-form>
    <template>
      <el-table
        class="table"
        ref="multipleTable"
        :data="listDatas"
        border
        style="width: 100%;">
        <el-table-column
          prop="companyNameCn"
          label="年份"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="companyNameCn"
          label="届数"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productNameCn"
          label="申请办会机构名称"
          width="150"
          align="center">
        </el-table-column>
        <el-table-column
          prop="productNo"
          label="演讲嘉宾姓名"
          align="center"
          width="150">
        </el-table-column>
        <el-table-column
          prop="auditContent"
          label="职衔"
          align="center"
          fixed="right">
        </el-table-column>
        <el-table-column
          prop="auditContent"
          label="手机"
          align="center"
          fixed="right">
        </el-table-column>
        <el-table-column
          prop="auditContent"
          label="邮箱"
          align="center"
          fixed="right">
        </el-table-column>
        <el-table-column
          prop="auditContent"
          label="联系人助手"
          align="center"
          fixed="right">
        </el-table-column>
        <el-table-column
          prop="auditContent"
          label="助手手机"
          align="center"
          fixed="right">
        </el-table-column>
        <el-table-column
          prop="auditContent"
          label="助手邮箱"
          align="center"
          fixed="right">
        </el-table-column>
        <el-table-column
          prop="auditContent"
          label="资审情况"
          align="center"
          fixed="right">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="dialogpagination"
        @size-change="handleListSizeChange"
        @current-change="handleListCurrentChange"
        :current-page.sync="ruleForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="ruleForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </template>
  </div>
</template>

<script>
  export default {
    name: "participatingAgenciesInformation",
    data() {
      return {
        listDatas: [],
        listTotal: 0,
        ruleForm: {
          metting: '',
          current: 1,
          size: 10
        }
      };
    },
    methods: {
      handleListSizeChange(pageSize) {
        this.ruleForm.size = pageSize;
      },
      handleListCurrentChange(currentPage) {
        this.ruleForm.current = currentPage;
      }
    }
  };
</script>

<style scoped>
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
    border-bottom: 2px solid #8a8a8a;
  }

  .btn-row{
    margin-left: 40px;
  }
  .table{
    margin-left: 50px;
  }
  .btn {
    text-align: center;
    height: 30px;
    padding: 0 30px;
  }
  .dialog-footer {
    text-align: center;
    margin: 20px 0;
    padding-bottom: 10px;
  }
  .dialogpagination{
    text-align: right;
    margin: 10px;
  }
</style>
