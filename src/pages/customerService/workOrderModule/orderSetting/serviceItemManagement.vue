/**
 * @file 工单服务项目管理
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="工单服务项目管理" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="项目类型">
          <el-select v-model="queryForm.projectName" clearable>
            <el-option label="展具租赁" value="1"></el-option>
            <el-option label="展具装搭" value="2"></el-option>
            <el-option label="展览设备" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="负责人">
          <el-select v-model="queryForm.chargeName" clearable>
            <el-option label="王姐" value="1"></el-option>
            <el-option label="赵千" value="2"></el-option>
            <el-option label="李四" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区域">
          <el-select v-model="queryForm.area" clearable>
            <el-option label="A区" value="1"></el-option>
            <el-option label="B区" value="2"></el-option>
            <el-option label="C区" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="handleAdd">新增</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="byArea" v-loading="loading">
        <el-table-column label="项目类型" prop="project.projectName" align="center"></el-table-column>
        <el-table-column label="项目细项" prop="project.projectDetails" align="center"></el-table-column>
        <el-table-column label="负责部门" prop="workAcceptorHall.deptName" align="center"></el-table-column>
        <el-table-column label="负责科室/班组" prop="workAcceptorHall.groupName" align="center"></el-table-column>
        <el-table-column label="区域" prop="project.area" align="center"></el-table-column>
        <el-table-column label="负责人" prop="workAcceptorHall.chargeName" align="center"></el-table-column>
        <!-- <el-table-column label="是否需要自动派工" prop="place" align="center"></el-table-column> -->
        <el-table-column label="内容模板" prop="project.contentTemplate" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
            <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange" :current-page="pageInfo.currentPage" :page-size="pageInfo.pageSize" layout="total, prev, pager, next, jumper" :total="byArea.total">
      </el-pagination>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: 'first',
      projectNames: [], // 项目类型字典
      chargeNames: [], // 负责人字典
      areas: [], // 区域字典
      queryForm: {
        projectName: '', // 项目类型
        chargeName: '', // 负责人
        area: '' // 区域
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.selectByArea(this.serviceByArea).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('orderSetting', ['byArea']),
    ...mapGetters('dictionary', ['dictionaryData']),
    serviceByArea() {
      return {
        projectName: this.queryForm.projectName,
        chargeName: this.queryForm.chargeName,
        area: this.queryForm.area,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  // async beforeCreate() {
  //   this.projectNames = await kindo.dictionary.get('projectNames');
  //   this.chargeNames = await kindo.dictionary.get('chargeNames');
  //   this.areas = await kindo.dictionary.get('areas');
  // },
  methods: {
    ...mapActions('orderSetting', ['selectByArea', 'deleteAcceptorHallInfo']),
    modifyUser(row) {
      console.log(row.project.projectId, "222");
      this.$router.push({
        path: '/modifyOrderServiceItems',
        query: {
          id: row.project.projectId 
        }
      });
    },
    deleteUser(row) {
      let projectId = row.project.projectId;
      console.log(row.project.projectId, "222");
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let _this = this;
        this.loading = true;
        this.deleteAcceptorHallInfo(projectId).then(response => {
          console.log("2222");
          _this.selectByArea(this.serviceByArea).then(response2 => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(e => {
          });
          _this.loading = false;
        }).catch(e => {
          _this.loading = false;
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    handleAdd() {
      this.$router.push("/addOrderServiceItems");
    },
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    createdQuery() {
      this.loading = true;
      this.selectByArea(this.serviceByArea).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.pagination-footer {
  margin-top: 20px;
}
</style>












