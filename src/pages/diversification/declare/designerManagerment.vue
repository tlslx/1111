/**
* @file 设计师信息管理
* @author:wanglifeng
* @date:2019/1/14
*/
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="设计师信息" name="first">
      <template>
        <!--<el-button class="btn1" @click="handleAdd">新增设计师</el-button>-->
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="designerNameCn"
            label="设计师名称"
            align="center">
            <template slot-scope="scope">
              <span class="click-name" @click="handleEdit(scope.row, scope.index)">{{scope.row.designerNameCn}}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="designerNameEn"
            label="设计师名称（英文）"
            align="center">
          </el-table-column>
          <el-table-column
            prop="positionCn"
            label="职务"
            align="center">
          </el-table-column>
          <el-table-column
            prop="positionEn"
            label="职务（英文）"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row, scope.index)" type="text" size="small">修改</el-button>
              <el-button @click="handleDelete(scope.row, scope.index)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="handleAdd">新增设计师</el-button>
        <!--分页-->
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="pageInfo.currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageInfo.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pageInfo.total"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
export default {
  name: "designerManagerment",
  data() {
    return {
      activeName: "first",
      tableData: [],
      //分页
      pageInfo: {
        "currentPage": 1, // 第几页
        "pageSize": 10, // 每页信息条数
        "total": 0, // 总数
        "style": "padding: 10px 0;text-align: right;"
      },
      // baseApi: 'http://192.168.1.116:9014/'
      baseApi: process.env.API_CF_URL
    };
  },
  methods: {
    getData() {
      // 获取设计师分页列表
      this.$http.get(this.baseApi + '/api/customservice/cf/listDesigner', {
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      }).then(data => {
        this.tableData = data.records;
        this.pageInfo.total = data.total;
      }).catch(error => {
      });
    },
    handleEdit(row, index) {
      this.$router.push({
        path: '/designerInformation',
        query: {
          designerId: row.designerId
        }
      });
    },
    handleDelete(row, index) {
      this.$confirm('是否确定删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.get(this.baseApi + '/api/customservice/cf/deleteDesigner', {
          designerId: row.designerId
        }).then(data => {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getData();
        }).catch(error => {
        });
      }).catch(() => {
      });
    },
    handleAdd() {
      this.$router.push({
        path: '/designerInformation'
      });
    },
    //分页事件
    handleSizeChange(val) {
      this.pageInfo.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.getData();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style scoped>
.btn1 {
  margin: 15px;
  background-color: red;
  width: 100px;
  height: 35px;
  color: white;
}
.click-name {
  text-decoration: underline;
  color: #1e6abc;
}
.paging{
  float: right;
}
</style>
