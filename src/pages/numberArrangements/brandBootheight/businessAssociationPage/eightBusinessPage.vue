<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="品牌展位调整安排方案公布" name="first">
      <el-card style="padding-bottom: 24px">
        <div>
          <!-- 表单 -->
          <el-form :inline="true" size="small" :model="formData">
            <!-- <el-form-item label="商会">
              <el-select v-model="formData.coceralId" class="widtwo" clearable>
                <el-option
                  v-for="(item, index) in localstora.businessAssociation"
                  :key="index"
                  :label="item.deptName"
                  :value="item.deptId"
                ></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="展区">
              <el-select v-model="formData.exhibitionArea" class="widtwo" clearable>
                <el-option
                  v-for="(item, index) in localstora.exhibitionArea"
                  :key="index"
                  :label="item.exhibitionAreaName"
                  :value="item.exhibitionAreaCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="交易团">
              <el-select v-model="formData.dealClusterId" class="widtwo" clearable>
                <el-option
                  v-for="(item, index) in localstora.delegation"
                  :key="index"
                  :label="item.deptName"
                  :value="item.deptId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广交会编码">
              <el-input v-model="formData.cantonFairCode" clearable class="widtwo"></el-input>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input v-model="formData.companyName" clearable class="widtwo"></el-input>
            </el-form-item>
            <el-form-item class="floatRight">
              <el-button class="formStyle floatlaf" type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 表格 -->
          <simpleness-table
            :loading="loading"
            :tableTrData="data"
            :tableData="tableData"
          ></simpleness-table>
          <!-- 下载/公布 按钮 -->
          <div class="paginationTop floatLeft">
            <el-button type="primary" class="formStyle" size="small" @click="handDownload">下载</el-button>
            <el-button type="primary" class="formStyle" size="small" @click="addExhibition">公布</el-button>
          </div>
          <!-- 分页 -->
          <div style="padding-top: 10px;float: right;">
            <pagination :pageInfo="paginationData" @handle-size-change="handleSizeChange" @handle-current-change="handleCurrentChange"></pagination>
          </div>
          <!-- 公布/公布 -->
          <el-dialog title="公布" :visible.sync="isExhibit" :close-on-click-modal="false" v-if="isExhibit" width="400px">
            <el-form :model="publishedForm" ref="publishedForm" :rules="publishRules" size="small" label-width="150px">
              <el-form-item label="发布至：" prop="publishWay">
                <el-checkbox-group v-model="publishedForm.publishWay">
                  <div v-for="(item, index) in publishedGoOpts" :key="index">
                    <el-checkbox :label="item" @change="handleChange"></el-checkbox><br>
                  </div>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="附件：">
                <el-button type="primary" size="medium">选取文件</el-button>
              </el-form-item>
            </el-form>
            <div class="closCenter">
              <el-button type="primary" size="medium" @click="submitPublish('publishedForm')">确认</el-button>
              <el-button type="info" size="medium" @click="isExhibit = false;">取消</el-button>
            </div>
          </el-dialog>
        </div>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import SimplenessTable from "@/components/project/common1/simplenessTable";
import pagination from "@/components/project/common1/pagination";
export default {
  components: {
    "simpleness-table": SimplenessTable,
    pagination
  },
  data() {
    return {
      activeName: "first",
      loading: false,
      isExhibit: false, // 公布弹框的显示隐藏
      tableData: [],
      publishedForm: {
        publishWay: []
      },
      publishedGoOpts: ['广交会官网', '内部管理系统', '易捷通系统'],
      publishRules: {
        publishWay: [{ required: true, message: '请选择至少一项发布渠道', trigger: 'change' }]
      },
      data: [
        {
          prop: "",
          type: "index",
          width: "80",
          label: "编号"
        },
        {
          prop: "coceralName",
          type: "string",
          width: "80",
          label: "商会"
        },
        {
          prop: "exhibitionAreaName",
          type: "string",
          width: "80",
          label: "展区"
        },
        {
          prop: "dealClusterName",
          type: "string",
          width: "80",
          label: "交易团"
        },
        {
          prop: "cantonFairCode",
          type: "string",
          width: "120",
          label: "广交会编码"
        },
        {
          prop: "companyName",
          type: "string",
          width: "120",
          label: "企业名称"
        },
        {
          prop: "affirmBoothNumber",
          type: "string",
          width: "160",
          label: "调整前品牌展位数"
        },
        {
          prop: "scheduleBoothNumber",
          type: "string",
          width: "160",
          label: "品牌展位变化量"
        },
        {
          prop: "brandBoothNumber",
          type: "string",
          width: "160",
          label: "调整后品牌展位数"
        },
        {
          prop: "scheduleBooth",
          type: "string",
          width: "160",
          label: "新增品牌展位位置"
        }
      ],
      formData: {
        coceralId: "",
        exhibitionArea: "",
        dealClusterId: "",
        cantonFairCode: "",
        companyName: ""
      },
      localstora: {
        exhibitionArea: [],
        businessAssociation: [], // 商协会
        delegation: []
      },
      paginationData: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    };
  },
  computed: {
    ...mapGetters("brandBooth", ["getPrd"]),
    formQuery() {
      return {
        coceralId: this.$store.getters.userInfo.org.deptId,
        exhibitionArea: this.formData.exhibitionArea,
        dealClusterId: this.formData.dealClusterId,
        cantonFairCode: this.formData.cantonFairCode,
        companyName: this.formData.companyName,
        current: this.paginationData.currentPage,
        size: this.paginationData.pageSize
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    // this.getassociationDepartment().then(res => {
    //   this.localstora.businessAssociation = JSON.parse(JSON.stringify(res));
    // }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  mounted() {
    this.getPage();
  },
  methods: {
    ...mapActions('brandBooth', [
      "getListpagePublish", // 品牌展位调整安排方案公布
      "publishschemePublicity" // 外贸司公布调整安排方案
    ]),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment', 'getassociationDepartment']),
    // 初始化页面数据
    getPage() {
      this.getListpagePublish(this.formQuery).then(res => {
        this.tableData = JSON.parse(JSON.stringify(res.records));
        this.paginationData.total = res.total;
        this.loading = false;
      });
    },
    // 查询
    onSearch() {
      this.paginationData.currentPage = 1;
      this.getPage();
    },
    // 下载
    handDownload() {
      let url = `${this.paginationData.currentPage}&size=${this.paginationData.total}&exhibitionArea=${this.formData.exhibitionArea}&dealClusterId=${this.formQuery.dealClusterId}&cantonFairCode=${this.formData.cantonFairCode}&coceralId=${this.formData.coceralId}&companyName=${this.formData.companyName}&token=${localStorage.getItem("USER_TOKEN")}`;
      window.open(process.env.API_NA_URL + "/api/SchemePublicity/publish/download?current=" + url, "_parent");
    },
    // 公布 change 事件
    handleChange() {
      // console.log(this.publishedForm, "publishedForm");
    },
    // 公布 确认
    submitPublish(fname) {
      this.$refs[fname].validate((valid) => {
        if (valid) {
          let publishparm = {
            current: 1,
            size: this.paginationData.total
          };
          this.getListpagePublish(publishparm)
          .then(res => {
            let parmdat = [];
            for (let i = 0; i < res.records.length; i++) {
              parmdat.push(res.records[i]);
            }
            this.publishschemePublicity(parmdat).then(resa => {
              this.isExhibit = false;
              this.$message({
                message: "公布成功",
                type: "success"
              });
              this.getPage(); // 调用初始加载页面方法
            }).catch(e => {
              this.$message({
                message: "已全部公布",
                type: "error"
              });
            });
          })
          .catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 公布 按钮
    addExhibition() {
      this.isExhibit = true;
    },
    // size
    handleSizeChange(val) {
      this.paginationData.pageSize = val;
      this.getPage();
    },
    // 分页
    handleCurrentChange(val) {
      this.paginationData.currentPage = val;
      this.getPage();
    }
  }
};
</script>


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
.cont {
  text-align: center;
  margin-top: 20px;
}
.wid {
  width: 300px;
}
.widtwo {
  width: 215px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
.floatlaf {
  float: left;
}
.closCenter {
  text-align: center;
  line-height: 50px;
  margin-bottom: 20px;
}
</style>
