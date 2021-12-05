<template>
  <div>
    <el-tabs v-model="activeName" v-loading="loadinga"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="公示意见汇总" name="first"></el-tab-pane>
    
    <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small" >
      <el-form-item label="商协会">
        <el-input v-model.trim="formInline.coceralName" size="small" style="width: 160px"></el-input>
      </el-form-item>
      <el-form-item label="交易团">
        <el-input v-model.trim="formInline.dealClusterName" size="small" style="width: 160px"></el-input>
      </el-form-item>
      <el-form-item label="展区">
        <el-input v-model.trim="formInline.exhibitionAreaName" size="small" style="width: 160px"></el-input>
      </el-form-item>
      <el-form-item label="评审企业">
        <el-input v-model.trim="formInline.companyName" size="small" style="width: 160px"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="padding: 8px 23px;margin-left: 40px" type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border :header-cell-style="backg"
      style="width: 100%">
      <el-table-column align="center"
        prop="companyName"
        label="评审企业">
      </el-table-column>
      <el-table-column align="center"
        prop="dealClusterName"
        label="所属交易团">
      </el-table-column>
      <el-table-column align="center"
        prop="exhibitionAreaName"
        label="展区">
      </el-table-column>
      <el-table-column align="center"
        prop="coceralName"
        label="商协会">
      </el-table-column>
      <el-table-column align="center"
        prop="beforeNumber"
        label="原安排展位数">
      </el-table-column>
      <el-table-column align="center"
        prop="objectionContent"
        label="异议内容"
        width="280">
      </el-table-column>
      <el-table-column align="center"
        label="处理意见"
        width="200" prop="disposeOpinion">     
      </el-table-column>
      <el-table-column align="center"
        label="操作" width="180">
        <template slot-scope="scope">
            <el-button type="text" size="mini" :disabled="scope.row.isDispose === '1'"  @click="handelDispose(scope.row.publicityId)">处理
            </el-button>
            <el-button size="mini" type="text"  @click="handelAdit(scope.row.publicityId)" :disabled="scope.row.isDispose === '1' "> 返回方案</el-button>
        </template>
      </el-table-column>
    </el-table>
     <el-dialog title="处理" :visible.sync="dialogVisi" width="40%" @close="handelCure" center>
        <el-form :model="form">
          <el-form-item label="处理意见: " :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.isSubscrip">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button style="padding:8px 15px" @click="handelBure">取 消</el-button>
          <el-button type="danger" style="padding:8px 15px;margin-left:20px"  @click="handleDuer" >确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog title="处理" :visible.sync="dialogVisible" width="40%" @close="handelAure" center>
        <el-form :model="form">
          <el-form-item label="处理意见: " :label-width="formLabelWidth">
            <el-input type="textarea" :rows="5" placeholder="请输入内容" v-model="form.isSubscription">
            </el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button style="padding:8px 15px" @click="handelFure">取 消</el-button>
          <el-button type="danger" style="padding:8px 15px;margin-left:20px" @click="handelSure" >确 定</el-button>
        </span>
    </el-dialog>
    <el-button style="margin-top: 20px;" type="primary">下载</el-button>
    <el-form :inline="true" style="float: right;">
      <el-form-item>
        <el-pagination
          style="margin-top: 20px;"
          background
          layout="total, prev, pager, next, jumper"
          :total="paginationData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="paginationData.currentPage"
          :page-size="paginationData.pageSize">
        </el-pagination>
      </el-form-item>
    </el-form>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      paginationData: {
        currentPage: 0,
        pageSize: 10,
        total: 0
      },
      formLabelWidth: "120px",
      dialogFormVisible: false,
      dialogVisible: false,
      dialogVisi: false,
      backg: {
        "background-color": "#E4E4E4"
      },
      pageDate: {
        current: 1,
        size: 10
      },
      loadinga: true,
      form: {
        isSubscription: "",
        isSubscrip: ""
        // publicity: ''

      },
      tableData: [],
      activeName: "first",
      formInline: {
        companyName: "",
        dealClusterName: "",
        exhibitionAreaName: "",
        coceralName: "",
        beforeNumber: ""
      }
    };
  },
  created() {
    // 调用请求方法
    this.handleDemand(this.pageDate);
  },
  methods: {
    ...mapActions("department", [
      "getSepartment",
      "postAepartment",
      "postDepartmentAcity"
    ]),
    // 接受后台数据
    handleDemand(val) {
      this.getSepartment(val)
        .then(res => {
          this.tableData = res.records;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          this.paginationData.total = res.total;
          this.loadinga = false;
        })
        .catch(e => {
          this.loadinga = true;
        });
    },
    // 查询
    onSubmit() {
      // 查询时后台需要的格式数据
      let objOne = {
        companyName: this.formInline.companyName,
        coceralName: this.formInline.coceralName,
        dealClusterName: this.formInline.dealClusterName,
        exhibitionAreaName: this.formInline.exhibitionAreaName,
        current: 1,
        size: 10
      };
      this.handleDemand(objOne);  
     
    },
    handleSizeChange() {},
    // 分页
    handleCurrentChange(current) {
      let objOne = {
        companyName: this.formInline.companyName,
        coceralName: this.formInline.coceralName,
        dealClusterName: this.formInline.dealClusterName,
        exhibitionAreaName: this.formInline.exhibitionAreaName,
        current: current,
        size: 10
      };
      this.handleDemand(objOne);
    },
    // 弹出框取消按钮
    handelBure() {
      this.dialogVisi = false;
      this.form.isSubscrip = "";
    },
    // 弹出框取消按钮
    handelFure() {
      this.dialogVisible = false;
      this.form.isSubscription = "";
    },
    // 处理弹出确定
    handelSure() {
      this.dialogVisible = false;
      let objw = {
        disposeOpinion: this.form.isSubscription,
        publicityId: this.form.publicity
      };
      this.postDepartmentAcity(objw)
        .then(res => {
          // console.log(res);
          // this.form.isSubscription = "";
          this.handleDemand();
        })
        .catch(e => {});
    },
    // 返回弹出确定
    handleDuer() {
      this.dialogVisi = false;
      let obj = {
        schemePublicity: {
          publicityId: this.form.publicity
        },
        schemePublicityLog: {
          disposeOpinion: this.form.isSubscrip,
          publicityId: this.form.publicity
        }
      };
      this.postAepartment(obj)
        .then(res => {
          // console.log(res);
          // this.form.isSubscription = "";
          this.handleDemand();
        })
        .catch(e => {});
    },
    // 返回方案按钮
    handelAdit(publicity) {
      this.dialogVisi = true;
      this.form["publicity"] = publicity;
    },
    // 调用处理按钮
    handelDispose(publicity) {
      this.dialogVisible = true;
      this.form["publicity"] = publicity;
    },
    // 弹出框关闭
    handelCure() {
      this.form.isSubscrip = "";
    },
    handelAure() {
      this.form.isSubscription = "";
    }
  }
};
</script>
<style>

</style>
