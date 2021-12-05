<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
.widtwo {
  width: 215px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
</style>

<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展位预收费函详情" name="first">
      <el-form :inline="true" style="height: 40px;" label-width="83px">
        <el-form-item label="展览代码："></el-form-item>
        <el-form-item label="展览名称："></el-form-item>
        <el-form-item label="届数："></el-form-item>
        <el-form-item label="打印：">
          <el-select v-model="queryForm.exhibitionSession" clearable style="width: 200px;">
            <el-option value="1" label="企业"></el-option>
            <el-option value="2" label="交易团"></el-option>
          </el-select>
          <el-input placeholder="企业名称" style="width: 200px;"></el-input>
        </el-form-item>
      </el-form>
      <div style="margin-bottom: 20px;">
        <span>打印内容：</span>
        <el-checkbox-group v-model="checkList" style="display: inline-block;">
          <el-checkbox label="封面（展位费）"></el-checkbox>
          <el-checkbox label="封面（配置费）"></el-checkbox>
          <el-checkbox label="交易团"></el-checkbox>
          <el-checkbox label="期数"></el-checkbox>
          <el-checkbox label="展位费清单"></el-checkbox>
          <el-checkbox label="配置费清单"></el-checkbox>
          <el-checkbox label="配置费清单6.0展区"></el-checkbox>
        </el-checkbox-group>
      </div>
      <!-- 横线 -->
      <el-divider></el-divider>
      <el-tabs v-model="activeNameTwo" type="card" @tab-click="handleClick">
        <el-tab-pane label="封面（展位费）" name="one">
          <h4 style="taxt-align: center;">第___届广交会展位定金缴款通知</h4>
          <div></div>
          <div style="width: 150px; height: 60px; flat: right;">
            <p>中国对外贸易中心</p>
            <p>2018-12-12</p>
          </div>
        </el-tab-pane>
        <el-tab-pane label="封面（配置费）" name="two">
          <!-- table 表格 -->
          <simpleness-table
            :loading="loadingTwo"
            :tableData="tableDataTwo"
            :tableTrData="dataTwo"
            @edit="tableEdit"
          ></simpleness-table>
          <!-- 分页 -->
          <div style="padding-top: 10px;float: right;">
            <pagination
              :pageInfo="paginationData"
              @handle-size-change="handleSizeChange"
              @handle-current-change="handleCurrentChange"
            ></pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="展位费清单" name="three">
          <el-form :model="formData" :inline="true" size="small">
            <el-form-item label="期数：">
              <el-select v-model="queryForm.exhibitionSession" clearable>
                <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易团：">
              <el-select v-model="queryForm.exhibitionSession" clearable>
                <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSearch">筛选</el-button>
            </el-form-item>
          </el-form>
          <!-- table 表格 -->
          <simpleness-table
            :loading="loadingThree"
            :isSelectable="true"
            :tableData="tableDataThree"
            :tableTrData="dataThree"
            @edit="tableEdit"
          ></simpleness-table>
          <div class="paginationTop floatLeft">
            <el-button type="primary" class="formStyle" size="small">通过</el-button>
            <el-button type="primary" class="formStyle" size="small" @click="isnoDia = true">不通过</el-button>
          </div>
          <!-- 不通过弹框 -->
          <el-dialog title="审核" :visible.sync="isnoDia" v-if="isnoDia" :close-on-click-modal="false" width="500px" center>
            <el-form :model="pastb" :rules="rulesnp" :inline="true" ref="npruleForm" size="small" label-width="140px">
              <el-form-item label="不通过原因" prop="examineOpinion">
                <el-input type="textarea" v-model.trim="pastb.examineOpinion" :rows="5" class="widtwo"></el-input>
              </el-form-item>
              <div class="divp">
                <el-button type="primary" @click="handnoSeave('npruleForm')">保存</el-button>
                <el-button @click="handnoCancel">取消</el-button>
              </div>
            </el-form>
          </el-dialog>
          <!-- 分页 -->
          <div style="padding-top: 10px;float: right;">
            <pagination
              :pageInfo="paginationData"
              @handle-size-change="handleSizeChange"
              @handle-current-change="handleCurrentChange"
            ></pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置费清单" name="four">
          <el-form :model="formData" :inline="true" size="small">
            <el-form-item label="期数：">
              <el-select v-model="queryForm.exhibitionSession" clearable>
                <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易团：">
              <el-select v-model="queryForm.exhibitionSession" clearable>
                <el-option v-for="(item, index) in exhibitionSessionOpts" :key="index" :value="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSearch">筛选</el-button>
            </el-form-item>
          </el-form>
          <!-- table 表格 -->
          <simpleness-table
            :loading="loadingFour"
            :isSelectable="true"
            :tableData="tableDataFour"
            :tableTrData="dataFour"
            @edit="tableEdit"
          ></simpleness-table>
          <div class="paginationTop floatLeft">
            <el-button type="primary" class="formStyle" size="small">通过</el-button>
            <el-button type="primary" class="formStyle" size="small" @click="isnoDia = true">不通过</el-button>
          </div>
          <!-- 不通过弹框 -->
          <el-dialog title="审核" :visible.sync="isnoDia" v-if="isnoDia" :close-on-click-modal="false" width="500px" center>
            <el-form :model="pastb" :rules="rulesnp" :inline="true" ref="npruleForm" size="small" label-width="140px">
              <el-form-item label="不通过原因" prop="examineOpinion">
                <el-input type="textarea" v-model.trim="pastb.examineOpinion" :rows="5" class="widtwo"></el-input>
              </el-form-item>
              <div class="divp">
                <el-button type="primary" @click="handnoSeave('npruleForm')">保存</el-button>
                <el-button @click="handnoCancel">取消</el-button>
              </div>
            </el-form>
          </el-dialog>
          <!-- 分页 -->
          <div style="padding-top: 10px;float: right;">
            <pagination
              :pageInfo="paginationData"
              @handle-size-change="handleSizeChange"
              @handle-current-change="handleCurrentChange"
            ></pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="配置费清单6.0展区" name="five">
          <h4 style="taxt-align: center;">第___届广交会展位定金缴款通知</h4>
          <div></div>
          <div style="width: 150px; height: 60px; flat: right;">
            <p>中国对外贸易中心</p>
            <p>2018-12-12</p>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" size="small">打印</el-button>
        <el-button type="primary" class="formStyle" size="small">保存</el-button>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import SimplenessTable from "@/components/project/common1/simplenessTable";
import pagination from "@/components/project/common1/pagination";
import { mapActions } from "vuex";
export default {
  components: {
    "simpleness-table": SimplenessTable,
    pagination
  },
  data() {
    return {
      loadingTwo: false,
      isnoDia: false,
      tableDataTwo: [],
      checkList: [],
      isSelection: true,
      dataTwo: [
        {
          prop: "",
          label: "展区",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "一般性展位数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "品牌展位数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "展位总数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "标准展位费",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "计数百分比（%）",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "预订款金额",
          type: "string",
          width: "90"
        }
      ],
      dataThree: [
        {
          prop: "",
          label: "届数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "期数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "交易团",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "交易团编码",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "区域",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "一般性展位标摊数量",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "一般性展位特装数量",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "品牌展位品牌数量",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "展位数合计",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "展位费单价",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "展位费合计",
          type: "string",
          width: "90"
        }
      ],
      dataFour: [
        {
          prop: "",
          label: "届数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "期数",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "交易团",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "交易团编码",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "区域",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "一般性展位标摊数量",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "一般性展位配置费单价",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "一般性展位展具配置费",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "统一布展展位标摊数量",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "统一布展展位特装数量",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "统一布展展位品牌数量",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "统一布展展位布展费单价标摊特装",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "统一布展展位统一布展费",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "电话包期数量",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "电话包期包期通讯费",
          type: "string",
          width: "90"
        },
        {
          prop: "",
          label: "合计",
          type: "string",
          width: "90"
        }
      ],
      pastb: {
        examineOpinion: ""
      },
      rulesnp: {
        examineOpinion: [{ required: true, message: '请输入...', trigger: 'blur' }]
      },
      paginationData: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      exhibitionSessionOpts: [],
      delegationOpts: [],
      exhibitionAreaOpts: [],
      queryForm: {
        exhibitionSession: '',
        delegationId: '',
        exhibitionAreaCode: '',
        boothType: '',
        companyName: ''
      },
      activeName: "first",
      activeNameTwo: "one"
    };
  },
  created() {
    // 接受数据
    // console.log(this.$route.query.data, "jies");
    // 获取届数
    this.getsysExhibitions().then(res => {
      for (let i = 0; i < res.data.length; i++) {
        this.exhibitionSessionOpts.push(res.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.exhibitionSessionOpts = this.exhibitionSessionOpts.sort(rul);
    });
    // 获取交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 获取展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  methods: {
    ...mapActions("exhibitionSettlement", [
      "getOrdinaryAdjustCompany"
    ]),
    ...mapActions("nainformation", [
      "getsysExhibitions", //获取展届信息
      "getdelegationDepartment", // 获取所有交易团
      "getexhibitionArea" // 获取展区
    ]),
    // 获取页面初始数据
    getListPage(url) {

    },
    // 组件打钩项
    handSele() {},
    // 组件打钩事件
    seChange(val) {
    },
    // 筛选
    onSearch() {

    },
    // 编辑
    edit(a) {
    },
    // 不通过 确定
    handnoSeave() {
      // this.pastb.examineStatus = "2";
      // this.$refs[fnamen].validate((valid) => {
      //   if (valid) {
      //     this.updatecoceralCheck(this.pastb).then(res => {
      //       this.isnoDia = false;
      //       this.$message({
      //         message: "不通过成功",
      //         type: "success"
      //       });
      //       this.pastb = {
      //         recommendId: "",
      //         examineStatus: "",
      //         examineOpinion: ""
      //       };
      //       this.getListPage(this.obj); // 调用初始加载页面方法
      //     }).catch(e => {});
      //   } else {
      //     return false;
      //   }
      // });
    },
    // 不通过 取消
    handnoCancel() {},
    // 分条/页
    handleSizeChange(val) {
      this.obj.size = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getListPage(this.obj);
    }
  }
};
</script>

