/**
* @file 联营企业管理---维护参展联营企业列表
*/
<style scoped>
  .sort-btns{
  width:100%;
}
.detail-name{
  color: rgb(26, 168, 235);
  cursor: pointer;
  text-decoration: underline;
}
.enter-table{
  width: 100%;
  margin-top: 20px;
}
</style>
<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="维护联营企业列表" name="first">
        <div v-if="!containExhibitionPeriod" style="padding: 15px 0;font-size: 17px;font-weight: bold;color: #d80c18;">当前时间不在联营企业添加时间范围内，不可新增，编辑和删除联营企业</div>
        <div class="sort-btns">
          联营企业名称
          <el-input v-model="searchContent" style="width:200px;" @change="getSearch" clearable placeholder="请输入联营企业名称"></el-input>
          <!-- 审核状态
          <el-select @change='selectStatue' style="width:200px;" clearable v-model="approveStatus" placeholder="请选择审核状态">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select> -->
          <!--<el-button @click="getSearchData" type="primary">查询</el-button>-->
          <el-button @click="getData" type="primary">查询</el-button>
          <el-button v-if="containExhibitionPeriod" type="primary" @click="toAdd" style="float:right;">添加联营企业</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" border class="enter-table" @selection-change="handleSelectionChange"
          :header-cell-style="tableHeaderColor" v-loading="loading">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column prop="nameCh" label="联营企业名称">
            <!-- <template slot-scope="scope">
              <a class="detail-name" >{{ scope.row.nameCh }}</a>
            </template> -->
          </el-table-column>
          <el-table-column prop="addressCh" label="联营企业地址"></el-table-column>
          <el-table-column prop="legalPerson" label="法人代表"></el-table-column>
          <el-table-column prop="telephone" label="联系电话（手机）"></el-table-column>
          <!-- <el-table-column prop="approveStatus" label="审核状态">
            <template slot-scope="scope">
              <span>{{scope.row.approveStatus==0?'审核中':scope.row.approveStatus==1?'审核通过':scope.row.approveStatus==2?'不通过':'待审核'}}</span>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" width="300">
            <template slot-scope="scope">
              <el-button v-if="scope.row.approveStatus !== '1' && containExhibitionPeriod" size="mini" type="text" @click="handleEdit(scope.row)" style="text-decoration: underline;">编辑</el-button>
              <el-button v-if="scope.row.approveStatus !== '1' && containExhibitionPeriod" size="mini" type="text" style="color: red;text-decoration: underline;" @click="handleDelete(scope.row)">删除</el-button>
              <el-button size="mini" type="text" style="text-decoration: underline;" @click="toDetail(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div style="width:94%;padding:1% 3%;">
          <el-button type="primary" @click="toDelete" style="float:left;" :disabled="disabled">删除</el-button>
          <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange"
            @handle-current-change="handleCurrentChange"></pagination>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import pagination from "@/components/project/onlineService/common/pagination.vue";
  import {
    mapGetters,
    mapActions
  } from "vuex";
  import {
    $helper
  } from "@/scripts/project/utils";
  export default {
    //引入分页组件
    components: {
      'pagination': pagination
    },
    data() {
      return {
        options: [{
          value: '0',
          label: '审核中'
        }, {
          value: '1',
          label: '审核通过'
        }, {
          value: '2',
          label: '不通过'
        }, {
          value: 'null',
          label: '待审核'
        }],
        activeName: "first", // tab标题
        containExhibitionPeriod: true, // 判断是否在参展期内
        tableData: [], // 表格数据
        searchContent: "", // 模糊查询变量
        approveStatus: '', // 模糊查询变量
        multipleSelection: [], // 多选暂存数据
        selectDelete: [], // 多选需要删除的数据
        //设置table的loading变量
        loading: false,
        //批量删除按钮初始禁用
        disabled: true,
        // 分页
        pageInfo: {
          "currentPage": 0,
          "pageSize": 10,
          "total": 0,
          "style": "padding: 10px 0;text-align: right;"
        },
        // 传参
        searchParams: {
          "orderModelField": [{
            "orderByField": "modifyDate",
            "desc": true
          }],
          "customQueryParams": [
            {
              "name": 'companyId',
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.$store.state.userInfo.companyId]
            }
          ],
          "pageIndex": 0,
          "pageSize": 10
        }
      };
    },
    created() {
      // 获取届数
      this.getSessionInfo().then(res => {
        if (res.session) {
          // 获取参展时间段
          let progressParam = {
            exhibitionNum: res.session,
            subKey: 'TIM_COMMONLY_EXHIBITION_POSITION_APPLY_2'
          };
          this.getProgressTimeInfo(progressParam).then(progressRes => {
            // 当前时间在参展时间段内可确认参展和编辑
            if (progressRes && progressRes.startTime && progressRes.endTime) {
              let startTime = new Date(progressRes.startTime).getTime();
              let endTime = new Date(progressRes.endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
              let nowTime = new Date().getTime();
              if (nowTime >= startTime && nowTime <= endTime) {
                this.containExhibitionPeriod = true;
              } else {
                // 获取参展时间段
                let ruleParam = {
                  exhibitionNum: res.session,
                  subKey: 'TIM_COMMONLY_EXHIBITION_POSITION_APPLY_2',
                  orgId: this.$store.state.userInfo.companyId
                };
                this.getRuleInfos(ruleParam).then(resp => {
                  // 当前时间在参展时间段内可新增，编辑和删除展位
                  if (resp && resp[0] && resp[0].startTime && resp[0].endTime) {
                    let ruleStartTime = new Date(resp[0].startTime).getTime();
                    let ruleEndTime = new Date(resp[0].endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
                    let ruleNowTime = new Date().getTime();
                    if (ruleNowTime >= ruleStartTime && nowTime <= ruleEndTime) {
                      this.containExhibitionPeriod = true;
                    } else {
                      this.containExhibitionPeriod = false;
                    }
                  } else {
                    // 未拿到参展时间段也暂时可以新增，编辑和删除展位
                    this.containExhibitionPeriod = false;
                  }
                }).catch(e => {
                  // 未拿到参展时间段也暂时可以新增，编辑和删除展位
                  this.containExhibitionPeriod = true;
                });
              }
            } else {
              // 未拿到参展时间段也暂时可以新增，编辑和删除展位
              this.containExhibitionPeriod = true;
            }
          }).catch(e => {
            // 未拿到参展时间段也暂时可以新增，编辑和删除展位
            this.containExhibitionPeriod = true;
          });
        } else {
          // 未拿到届数暂时可以新增，编辑和删除展位
          this.containExhibitionPeriod = true;
        }
      }).catch(e => {
        // 未拿到届数暂时可以新增，编辑和删除展位
        this.containExhibitionPeriod = true;
      });
      // 初始列表
      this.getAssociateEnterprisesInfo(this.searchParams).then(res => {
        this.tableData = res.records;
        this.pageInfo.currentPage = res.current;
        this.pageInfo.pageSize = 10;
        this.pageInfo.total = res.total;
      });
    },
    computed: {
      ...mapGetters('JointVentureManagement', ['getInfo'])
    },
    methods: {
      ...mapActions('common', ['getSessionInfo', 'getRuleInfos', 'getProgressTimeInfo']),
      ...mapActions('JointVentureManagement', ['getAssociateEnterprisesInfo', 'deleteAssociateEnterprisesInfo']),
      ...mapActions('corpDataManagement', ['getBasicInfo']), // 获取企业基本信息
      // 重置查询分页参数
      initSearchParamsPageInfo() {
        this.searchParams.pageIndex = 0;
        this.searchParams.pageSize = 10;
      },
      // 查询方法
      getData() {
        if (this.approveStatus === '' && this.searchContent === '') {
          this.searchParams.customQueryParams = [{
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId]
          }];
          this.searchParams.pageIndex = "1";
        } else if (this.approveStatus === '') {
          this.searchParams.customQueryParams = [{
            "name": "nameCh",
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.searchContent],
            "description": ""
          },
          {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId]
          }];
          this.searchParams.pageIndex = "1";
        } else {
          this.searchParams.customQueryParams = [{
            "name": "nameCh",
            "findType": "LIKE",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.searchContent],
            "description": ""
          }, {
            "name": "approveStatus",
            "findType": this.approveStatus === "null" ? "IS_NULL" : "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.approveStatus],
            "description": ""
          }, {
            "name": "companyId",
            "findType": "EQ",
            "joinType": "And",
            "dataType": "Default",
            "values": [this.$store.state.userInfo.companyId]
          }];
        }
        this.getAssociateEnterprisesInfo(this.searchParams).then(res => {
          this.tableData = res.records;
          this.pageInfo.currentPage = 1;
          this.pageInfo.pageSize = 10;
          this.pageInfo.total = res.total;
        });
      },
      // 下拉框选择审核状态value
      selectStatue(value) {
        this.approveStatus = value;
      },
      // 多选数据处理
      handleSelectionChange(val) {
        this.multipleSelection = val;
        //批量删除时，若未选择数据，删除按钮禁用
        if (val.length >= 1) {
          this.disabled = false;
        } else {
          this.disabled = true;
        }
        // 返回多选需要删除的数据
        this.selectDelete = this.multipleSelection.map(el => {
          if (el.approveStatus !== "1" || el.approveStatus !== "0") {
            return {
              "associateId": el.associateId
            };
          }
        });
      },
      // 分页事件
      handleSizeChange(val) {
        //设置table的loading变量
        this.loading = true;
        this.pageInfo.pageSize = val;
        this.searchParams.pageSize = val;
        this.getAssociateEnterprisesInfo(this.searchParams).then(res => {
          this.tableData = res.records;
          //设置table的loading变量
          this.loading = false;
        });
      },
      handleCurrentChange(val) {
        //设置table的loading变量
        this.loading = true;
        this.pageInfo.currentPage = val;
        this.searchParams.pageIndex = val;
        this.getAssociateEnterprisesInfo(this.searchParams).then(res => {
          this.tableData = res.records;
          //设置table的loading变量
          this.loading = false;
        });
      },
      // 进入编辑页面
      handleEdit(row) {
        this.$router.push({
          path: "/registJointInfo",
          query: {
            associateId: row.associateId,
            isOp: "1"
          }
        });
      },
      // 删除数据
      handleDelete(row) {
        this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (row.approveStatus === "1" || row.approveStatus === "0") {
            this.$message({
              type: 'info',
              message: '审核中或已通过的企业不可删除'
            });
          } else {
            let param = {
              "associateIds": [{
                "associateId": row.associateId
              }]
            };
            this.deleteAssociateEnterprisesInfo(param).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              // 删除数据后刷新列表页
              this.getAssociateEnterprisesInfo(this.searchParams).then(reso => {
                this.tableData = reso.records;
                this.pageInfo.total = reso.total;
              });
            });
          }
        });
      },
      // 进入查看页面
      toDetail(row) {
        this.$router.push({
          path: "/registJointInfo",
          query: {
            associateId: row.associateId,
            isOp: "0"
          }
        });
      },
      // 进入新增
      toAdd() {
        this.getBasicInfo(this.$store.state.userInfo.companyId).then(response => {
          if (response) {
            if (response.enterprisesType === "2" || response.enterprisesType === "3" || response.enterprisesType == null) {
              this.$router.push({
                path: "/registJointInfo",
                query: {
                  isOp: "2"
                }
              });
            } else {
              this.$message({
                type: 'warning',
                message: '贵公司的企业类型为外贸企业或工贸企业时才可联营'
              });
            }
          }
        });
      },
      // 获取模糊查询的输入值
      getSearch(val) {
        this.searchContent = $helper.trim(val);
      },
      // 模糊查询
      getSearchData() {
        if (this.searchContent !== "" || this.approveStatus !== '') {
          if (this.approveStatus === 'null') {
            this.searchParams.customQueryParams = [{
              "name": "nameCh",
              "findType": "LIKE",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.searchContent],
              "description": ""
            }, {
              "name": "approveStatus",
              "findType": "IS_NULL",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.approveStatus],
              "description": ""
            }, {
              "name": "companyId",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.$store.state.userInfo.companyId]
            }];
            this.searchParams.pageIndex = "1";
            this.getData(); // 刷新页面
          } else {
            this.searchParams.customQueryParams = [{
              "name": "nameCh",
              "findType": "LIKE",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.searchContent],
              "description": ""
            }, {
              "name": "approveStatus",
              "findType": "LIKE",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.approveStatus],
              "description": ""
            }, {
              "name": "companyId",
              "findType": "EQ",
              "joinType": "And",
              "dataType": "Default",
              "values": [this.$store.state.userInfo.companyId]
            }];
            this.searchParams.pageIndex = "1";
            this.getData(); // 刷新页面
          }
        } else {
          this.initSearchParamsPageInfo();
          this.searchParams.customQueryParams = [];
          this.getData();
        }
      },
      // 批量删除数据
      toDelete() {
        if (this.selectDelete < 1) {
          // this.$message({
          //   type: 'info',
          //   message: '请选择至少一个企业'
          // });
        } else {
          this.getLabel();
        }
      },
      // 不可不选则数据点击批量删除事件等判断
      getLabel() {
        if (this.selectDelete.includes(undefined)) {
          this.$message({
            type: 'warning',
            message: '请选择符合删除的企业信息'
          });
        } else {
          let param = {
            "associateIds": this.selectDelete
          };
          this.$confirm('此操作将永久删除信息, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.deleteAssociateEnterprisesInfo(param).then(res => {
              this.$message({
                type: 'success',
                message: '删除成功'
              });
              this.getData();
            });
          }).catch(() => {});

        }
      },
      //添加表头样式
      tableHeaderColor({
        row,
        column,
        rowIndex,
        columnIndex
      }) {
        if (rowIndex === 0) {
          return "background-color: #f5f5f5;";
        }
      }
    }
  };

</script>
