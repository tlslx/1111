<style lang='less' scoped>

</style>
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="不通过原因管理" name="first">
        <el-button @click="handleClick" type="primary" >添加</el-button>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="reviewFailedReason" label="不通过原因" align="center">
          </el-table-column>
          <!-- <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small">添加</el-button>
              <el-button type="text" size="small" @click="handleRevamp(scope.row)">修改</el-button> 
            </template>
          </el-table-column> -->
        </el-table>
        <el-dialog title="不通过原因" :visible.sync="dialogFormVisible">
          <el-input maxlength='120' minlength="5" v-model="Reviewfailedreason" type="textarea" :rows="3" placeholder="请输入不通过原因"></el-input>
          <div slot="footer" class="dialog-footer">
            <el-button @click="fetch">取 消</el-button>
            <el-button type="primary" @click="reliable">确 定</el-button>
          </div>
        </el-dialog>
        <!-- <el-button type="primary" @click="submit">提交</el-button> -->
        
     </el-tab-pane>
     <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfoData.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfoData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfoData.total">
      </el-pagination>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      dialogFormVisible: false,
      activeName: 'first',
      Reviewfailedreason: '',
      tableData: [
      ],
      pageInfoData: {
        currentPage: 1,
        pageSize: 10,
        total: 1
      },
      obj: {
        size: 10,
        current: 1
      }
    };
  },
  created() {
    // this.handelAuditApproved();
    this.handelReasonsApproved(this.obj);
  },
  methods: {
    ...mapActions("managemen", [
      "postAuditApproved",  // 新增审核不通过原因
      "getReasonsApproved"  // 获取审核不通过原因列表
    ]),
    handelAuditApproved(obj) {
      this.postAuditApproved(obj).then(res => {
        this.handelReasonsApproved(this.obj);
      });
    },
    // 初始化数据
    handelReasonsApproved(obj) {
      this.getReasonsApproved(obj).then(res => {
        this.tableData = res.records;
        this.pageInfoData.pageSize = res.size;
        this.pageInfoData.currentPage = res.current;
        this.pageInfoData.total = res.total;
        // res.forEach(el => {
        //   let objed = {
        //     Reviewfailedreason: el.reviewFailedReason
        //   };
        //   this.tableData.push(objed);
        // });
      });
    },
    // 添加
    handleClick() {
      this.dialogFormVisible = true;
    },
    // 页面数据
    handleSizeChange(val) {
      this.obj.size = val;
      this.handelReasonsApproved(this.obj);
    },
    // 按钮改变
    handleCurrentChange(val) {
      this.obj.current = val;
      this.handelReasonsApproved(this.obj);
    },
    // 取消
    fetch() {
      this.dialogFormVisible = false;
      this.Reviewfailedreason = '';
    },
    // 确定
    reliable() {
      let obj = {
        reviewFailedReason: this.Reviewfailedreason
      };
      this.postAuditApproved(obj).then(res => {
        this.handelReasonsApproved(this.obj);
        this.dialogFormVisible = false;
        this.Reviewfailedreason = '';
      });
    }
  }
};
</script>

