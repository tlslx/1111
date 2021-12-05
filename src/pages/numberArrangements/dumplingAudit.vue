<template>
  <div>
    <el-tabs v-model="activeName" v-loading="loadinga" element-loading-text="拼命加载中" element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="审核企业资质" name="first">
        <el-card>
          <el-form :inline="true" :model="formInline" class="demo-form-inline" size="small">
            <el-form-item label="申请展区">
              <!-- <el-input v-model.trim="formInline.exhibitionAreaName" style="width: 170px;"></el-input> -->
              <el-select v-model="formInline.exhibitionArea" size="small" style="width: 170px;" clearable>
                <el-option v-for="(item, index) in localstora.exhibitionArea" :key="index" :label="item.exhibitionAreaName" :value="item.exhibitionAreaCode"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="广交会编码">
              <el-input v-model.trim="formInline.cantonFairCode" style="width: 170px;" clearable></el-input>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input v-model.trim="formInline.companyName" style="width: 170px;" clearable></el-input>
            </el-form-item>
            <el-form-item label="企业编码">
              <el-input v-model="formInline.companyCode" style="width: 170px;" clearable></el-input>
            </el-form-item>
            <el-form-item label="订金是否收齐" label-width="120">
              <el-select v-model="formInline.isSubscription" style="width: 170px;" clearable>
                <el-option label="请选择" value=""></el-option>
                <el-option label="已缴齐" value="1"></el-option>
                <el-option label="已缴纳" value="2"></el-option>
                <el-option label="未缴纳" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="float: right; margin-right: 190px">
              <el-button type="primary" size="small" @click="onSubmit">查询</el-button>
            </el-form-item>
            <!-- 表格 -->
            <el-table :data="tableData" border style="width: 100%" :header-cell-style="backg">
              <el-table-column align="center" prop="cantonFairCode" label="广交会编码" width="180">
              </el-table-column>
              <el-table-column align="center" prop="companyName" label="企业名称" width="180">
                <template slot-scope="scope">
                  <el-button type="text" @click="handle(scope.row)">{{scope.row.companyName}}</el-button>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="companyCode" label="企业编码">
              </el-table-column>
              <el-table-column align="center" prop="exhibitionAreaName" label="申请展区">
              </el-table-column>
              <el-table-column align="center" prop="affirmBoothNumber" label="申请展位数量">
              </el-table-column>
              <el-table-column align="center" prop="checkResult" label="审核情况">
                <template slot-scope="scope">
                  {{ scope.row.checkResult | cheStatus}}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="isSubscription" label="订金是否收齐">
                <template slot-scope="scope">
                  {{ scope.row.isSubscription === 0 ? '未缴纳' : (scope.row.isSubscription === 1 ? '已缴齐' : '已缴纳')}}
                </template>
              </el-table-column>
              <el-table-column align="center" prop="attachment" label="附件">
                <template slot-scope="scope">
                  <el-button type="text" :disabled="!scope.row.attachment" class="underline" @click="downBtn(scope.row.attachment)">
                    {{ scope.row.attachment | checkStatus }}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <!-- 分页 -->
          <el-form style="float: right; margin-top: 10px" :inline="true">
            <el-form-item>
              <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="paginationData.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="paginationData.pageSizes" :current-page="paginationData.currentPage" :page-size="paginationData.pageSize">
              </el-pagination>
            </el-form-item>
          </el-form>
        </el-card>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      backg: {
        'background-color': '#E4E4E4'
      },
      activeName: "first",
      formInline: {
        exhibitionArea: '',
        isSubscription: '',
        cantonFairCode: '',
        companyName: '',
        companyCode: ''
      },
      loadinga: true,
      companyId: '',
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      pageDate: {
        "pageIndex": 1,
        "pageSize": 10
      },
      localstora: {
        exhibitionArea: [] // 展区
      }, // 数据字典
      tableData: [
        { scheduleBoothNumber: '' }
      ]
    };
  },
  filters: {
    checkStatus(val) {
      if (val) {
        return "已上传";
      }
    },
    cheStatus(val) {
      if (val === "0") {
        return "未审核";
      } else if (val === "1") {
        return "审核通过";
      } else if (val === "2") {
        return "审核不通过";
      } else {
        return "未审核";
      }
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => { });
    let objOne = {
      "customQueryParams": [
        {
          "name": "dealClusterId",
          "findType": "EQ",
          "joinType": "And",
          "dataType":
            "Default",
          "values": [
            this.$store.getters.userInfo.org.deptId
          ],
          "description": ""
        }
      ],
      "pageIndex": 1,
      "pageSize": 10
    };
    this.pageDate["dealClusterId"] = this.$store.getters.userInfo.org.deptId;
    this.handleUserLists(objOne);
  },
  methods: {
    ...mapActions("enquireUnderpaid", [
      "getEnterprisePetails", "getEnterpriseQetails"
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea" // 展区
    ]),
    handle(id) {
      this.$router.push({
        path: '/reviewBusiness',
        query: {
          id
        }
      });
    },
    //分页
    handleCurrentChange(current) {
      let objOne = {
        "customQueryParams": [
          {
            "name": "dealClusterId",
            "findType": "EQ",
            "joinType": "And",
            "dataType":
              "Default",
            "values": [
              this.$store.getters.userInfo.org.deptId
            ],
            "description": ""
          }
        ],
        "pageIndex": current,
        "pageSize": 10
      };
      let key = Object.keys(this.formInline);
      for (let i = 0; i < key.length; i++) {
        if (this.formInline[key[i]] !== "") {
          let listb = {
            "name": key[i],
            "findType": "LIKE",
            "joinType": "And",
            "dataType":
              "Default",
            "values": [
              this.formInline[key[i]]
            ],
            "description": ""
          };
          objOne.customQueryParams.push(listb);
        }
      }
      // let listac = encodeURI(JSON.stringify(objOne));
      this.handleUserLists(objOne);
    },
    //接受后台数据
    handleUserLists(val) {
      let listac = encodeURI(JSON.stringify(val));
      this.getEnterpriseQetails(listac).then(res => {
        this.companyId = res.records.companyId;
        this.tableData = [];
        this.tableData = res.records;
        this.paginationData.currentPage = res.current;
        this.paginationData.pageSize = res.size;
        this.paginationData.total = res.total;
        this.loadinga = false;
      }).catch(e => { });
      this.loadinga = true;
    },
    handleSizeChange(size) {
      let objOne = {
        "customQueryParams": [
          {
            "name": "dealClusterId",
            "findType": "EQ",
            "joinType": "And",
            "dataType":
              "Default",
            "values": [
              this.$store.getters.userInfo.org.deptId
            ],
            "description": ""
          }
        ],
        "pageIndex": current,
        "pageSize": 10
      };
      let key = Object.keys(this.formInline);
      for (let i = 0; i < key.length; i++) {
        if (this.formInline[key[i]] !== "") {
          let listb = {
            "name": key[i],
            "findType": "LIKE",
            "joinType": "And",
            "dataType":
              "Default",
            "values": [
              this.formInline[key[i]]
            ],
            "description": ""
          };
          objOne.customQueryParams.push(listb);
        }
      }
      this.handleUserLists(objOne);
    },
    //查询
    onSubmit() {
      let objOne = {
        "customQueryParams": [
          {
            "name": "dealClusterId",
            "findType": "EQ",
            "joinType": "And",
            "dataType":
              "Default",
            "values": [
              this.$store.getters.userInfo.org.deptId
            ],
            "description": ""
          }
        ],
        "pageIndex": 1,
        "pageSize": 10
      };
      let key = Object.keys(this.formInline);
      for (let i = 0; i < key.length; i++) {
        if (this.formInline[key[i]] !== "") {
          let listb = {
            "name": key[i],
            "findType": "LIKE",
            "joinType": "And",
            "dataType":
              "Default",
            "values": [
              this.formInline[key[i]]
            ],
            "description": ""
          };
          objOne.customQueryParams.push(listb);
        }
      }
      let lista = encodeURI(JSON.stringify(objOne));
      this.getEnterprisePetails(lista).then(res => {
        this.tableData = [];
        this.tableData = res.records;
        this.paginationData.currentPage = res.current;
        this.paginationData.pageSize = res.size;
        this.paginationData.total = res.total;
      }).catch(e => { });
    },
    // 附件 下载
    downBtn(val) {
      if (val) {
        window.open(process.env.API_NA_URL + "/api/backConfirmation/download?fileId=" + val + "&token=" + localStorage.getItem("USER_TOKEN"), "_parent");
      } else {
        this.$message({
          type: "error",
          message: "调整函下载失败！"
        });
      }
    }
  }
};
</script>
<style scoped>
.underline {
  text-decoration: underline;
}
</style>


