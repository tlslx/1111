<style lang="less">
  @import "../../../../theme/project/css/flex.less";
  #company-reservation {
    //修改表格的每项单元格的宽度
    .el-table__body, .el-table__footer, .el-table__header {
      table-layout: auto;
      // min-width: 3500px;
    }
  }
</style>

<template>
  <div id="company-reservation">
    <el-tabs v-model="activeName">
      <el-tab-pane label="审核企业申请" name="index">
        <!-- 搜索条件 -->
        <el-form :inline="true" :model="ruleForm" class="demo-ruleForm" :rules="searchRules" label-width="110px">
          <el-form-item label="届数" size="mini" >
            <el-select clearable v-model="ruleForm.exhibitionNum" placeholder="请选择" @change="exhibitionNumChange">
              <el-option v-for="(item, index) in exhibitionNum" :key="index"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期数" size="mini" @change="periodCodeChange">
            <el-select clearable v-model="ruleForm.exhibitionSession" placeholder="请选择">
              <el-option v-for="(item, index) in exhibitionSessionArray" :key="index"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="复审情况" size="mini" >
            <el-select clearable v-model="ruleForm.reApprove" placeholder="请选择">
              <el-option v-for="item in reApproveArray" :key="item.value"
              :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="代理名称" size="mini" >
            <el-select clearable v-model="ruleForm.agentId"  placeholder="请选择">
              <el-option v-for="item in specialAreaArray" :key="item.label"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分配状态" size="mini" >
            <el-select clearable v-model="ruleForm.arrangeStatus" placeholder="请选择">
              <!-- <el-option v-for="item in specialAreaArray" :key="item.label" @change="applyExhibitionRegion"
                :label="item.label" :value="item.value"></el-option> -->
              <el-option label="未分配" value="0"></el-option>
              <!-- <el-option label="预分配" value="1"></el-option> -->
              <el-option label="已分配" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="初审状态" size="mini" >
            <el-select clearable v-model="ruleForm.firstApprove" placeholder="请选择">
              <el-option v-for="item in reApproveArray" :key="item.label"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否为老企业" size="mini" >
            <el-select clearable v-model="ruleForm.isOldCompany" placeholder="请选择">
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
              <!-- <el-option label="" value=""></el-option> -->
              <!-- <el-option v-for="item in specialAreaArray" :key="item.label"
                :label="item.label" :value="item.value"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="企业名称:" size="mini" prop="enNames">
            <el-input v-model="ruleForm.companyNameEn" clearable></el-input>
          </el-form-item>
        </el-form>
        <div class="bm bm-pe">
          <el-button type="primary" @click="getTableList(ruleForm)">查询</el-button>
        </div>
        <!-- 表格 -->
        <div class="bm bm-pc bm-ver">
          <el-table
            :data="tableData">
            <el-table-column
              type="selection"
              width="55"
              align="center">
            </el-table-column>
            <!-- <el-table-column v-for="item in tableHead" :key="item.prop"
              :formatter="formatterRow"
              :label="item.label"
              :prop="item.prop"
              align="center"
              width="150">
            </el-table-column> -->
            <el-table-column label="届数" prop="exhibitionNum" align="center">
            </el-table-column>
            <el-table-column label="期数" prop="exhibitionSession" align="center">
            </el-table-column>
            <el-table-column label="企业英文名称" width="150" prop="ifoCompany.companyNameEn" align="center">
            </el-table-column>
            <el-table-column label="广交会编码" width="150" prop="ifoCompany.cantonCode" align="center">
              
            </el-table-column>
            <el-table-column label="招展代理" prop="agentCh" align="center">
            </el-table-column>
            <el-table-column label="是否VIP展位" prop="isVipCompany" align="center">
              <template slot-scope="scope">
                {{ scope.row.isVipCompany | firstApprove }}
              </template>
            </el-table-column>
            <el-table-column label="国家/地区" prop="ifoCompany.ifoCountryRegion.crChName" align="center">
            </el-table-column>
            <el-table-column label="申请展区" width="150" prop="exhibitionAreaCode" align="center">
                <!-- <template slot-scope="scope">
                  {{ scope.row.exhibitionAreaCode | cantonCode }}
                </template> -->
            </el-table-column>
            <el-table-column label="专区" prop="ifoExhibitionRegion.reCh" align="center">
            </el-table-column>
            <el-table-column label="展位类型" prop="layout" align="center">
              <template slot-scope="scope">
                {{ scope.row.layout | boothType }}
              </template>
            </el-table-column>
            <el-table-column label="申请个数" prop="boothNum" align="center">
            </el-table-column>
            <el-table-column label="参展记录" prop="ifoCompany.preExhibitionNums" align="center">
            </el-table-column>
            <el-table-column label="已分配展位号" prop="ifoCompany.preExhibitionArrangeNums" align="center">
            </el-table-column>
            <el-table-column label="分配状态" prop="arrangeStatus" align="center">
              <template slot-scope="scope">
                {{ scope.row.arrangeStatus | arrangeStatus }}
              </template>
            </el-table-column>
            
            <el-table-column label="初审状态" prop="firstApprove" align="center">
              <template slot-scope="scope">
                {{ scope.row.firstApprove | statusFilter }}
              </template>
            </el-table-column>
            <el-table-column label="复审状态" prop="reApprove" align="center">
              <template slot-scope="scope">
                {{ scope.row.reApprove | statusFilter }}
              </template>
            </el-table-column>
            <el-table-column label="原因" prop="reason" align="center">
            </el-table-column>
            <el-table-column label="是否财富五百强企业或子公司" width="200" prop="reFivehundredApprove" align="center">
              <template slot-scope="scope">
                {{ scope.row.reFivehundredApprove | firstApprove }}
              </template>
            </el-table-column>
            <el-table-column label="是否参加其他国际展会" width="200" prop="reOtherExhibitorApprove" align="center">
              <template slot-scope="scope">
                {{ scope.row.reOtherExhibitorApprove | firstApprove }}
              </template>
            </el-table-column>
            <el-table-column
              fixed="right"
              label="操作"
              align="center"
              width="240">
              <template slot-scope="scope">
                <div class="bm bm-pc">
                  <!-- @click="chcekThis(scope.row.gjhId)" -->
                  <el-button @click="checkThis(scope.row)" type="text" size="small">查看</el-button>
                  <!-- <el-button  type="text" size="small" @click="check(scope.row)">审核</el-button> -->
                  <el-button  type="text" size="small" @click="assignAanton(scope.row)">分配广交会编码</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog title="分配广交会编码" :visible.sync="dialogFormVisible">
            <el-form :model="cantonCode" :label-width="formLabelWidth" :label-position="labelPosition" :rules="rulesDate" ref="cantonCode">
              <el-form-item label="分配广交会编码：" >
                <el-input v-model="cantonCode.assigne" ></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="disappear('cantonCode')">取 消</el-button>
              <el-button type="primary" @click="authentic('cantonCode')">确 定</el-button>
            </div>
          </el-dialog>
          <div class="bm bm-pj" style="margin-top: 10px">
            <el-button type="primary" size="small">批量审核</el-button>
            <div class="block bm bm-ac" style="float:right; margin-top:10px;" >
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="ruleList.current"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="ruleList.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="ruleList.total">
              </el-pagination>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    // 校验函数
    let checkLength = (rule, value, callback) => {
      let errors = [];
      if (value.length > rule.length) {
        errors.push(new Error("长度超过限制" + rule.length));
      }
      callback(errors);
    };
    return {
      specialAreaArray: [],
      dialogFormVisible: false,
      formLabelWidth: '130px',
      labelPosition: 'right',
      arrSpecialAreas: [], //专区
      activeName: "index",
      reApproveArray: [],
      rulesDate: {},
      cantonCode: {
        assigne: ''
      },
      exhibitionSessionArray: [
        {
          label: "1",
          value: 1
        },
        {
          label: "3",
          value: 3
        }
      ],
      ruleForm: {
        companyNameEn: "",
        reApprove: "",
        isOldCompany: "",
        exhibitionNum: "",
        exhibitionSession: 1,
        current: 1,
        size: 10,
        firstApprove: "",
        arrangeStatus: "",
        agentId: ""
      },
      // 验证信息验证
      searchRules: {
        enNames: [
          { message: "企业英文名称不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z0-9]*[a-zA-Z0-9]+$/;
              if (!regRule.test(value) && value !== "") {
                errors.push(new Error("请输入字母、数字、括号、字符间支持一个空格"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
          { length: "50", validator: checkLength }
        ]
      },
      exhibit: [],
      ruleList: {
        size: 10,
        current: 1,
        total: 1
      },
      compId: '',
      // 表头
      //企业表格数据
      tableData: []
    };
  },
  filters: {
    statusFilter: value => {
      switch (value) {
        case '0':
          return '未审核';
        case '1':
          return '审核不通过';
        case '2':
          return '审核通过';
        default:
          return;
      }
    }, 
    arrangeStatus: value => {
      switch (value) {
        case '0':
          return '未分配';
        case '1':
          return '预分配';
        case '2':
          return '已分配';
        default:
          return;
      }
    },
    firstApprove: value => {
      switch (value) {
        case '0':
          return '否';
        case '1':
          return '是';
        default:
          return;
      }
    },
    boothType (value) {
      switch (value) {
        case 0:
          return '光地';
        case 1:
          return '标摊';
        case 2:
          return '豪摊';
        default:
          return;
      }
    },
    cantonCode (value) {
      // this.exhibit.forEach(el => {
      //   if (value === el.value) {
      //     return el.label;
      //   }
      // });
      // this.applyExhibitionRegion(value);
    }
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition", "layoutArray"])
  },
  methods: {
    ...mapActions("numberBooth", ["getCheckCompanyBoothList"]), // 用户列表查询
    ...mapActions("commonStore", ["getExhibitionNum", "getExhibitionPlace", "getBoothApplyType"]),
    ...mapActions("agents", [
      "getReserveCompanyList",     // 审核企业列表
      "postAdministratorReviews",  // 管理员审核展位申请
      "postCantonCodesEnterprises" // 为企业分配广交会编码
    ]),
    //列表请求
    getTableList(param) {
      this.getReserveCompanyList(param).then(res => {
        this.ruleList.size = res.size;
        this.ruleList.current = res.current;
        this.ruleList.total = res.total;
        if (res && res.records && res.records.length > 0) {
          this.tableData.splice(0, this.tableData.length);
          this.total = res.total;
          this.tableData = JSON.parse(JSON.stringify(res.records));
          let arreds = [];
          let assigned = [];
          this.tableData.forEach((el, index) => {
            arreds.push(el.ifoCompany.preExhibitionArrangeNums);
            assigned.push(el.ifoCompany.preExhibitionNums);
            this.exhibit.forEach(ele => {
              if (ele.value === el.exhibitionAreaCode) {
                this.tableData[index].exhibitionAreaCode = ele.label;
              }
            });
          });
          arreds.forEach((el, index) => {
            this.tableData[index].ifoCompany.preExhibitionArrangeNums = el.join(' ');
          });
          assigned.forEach((el, index) => {
            this.tableData[index].ifoCompany.preExhibitionNums = el.join(' ');
          });
        }
      });
    },
    //届数变化，请求展区
    exhibitionNumChange(param) {
      let obj = {
        exhibitionNum: param,
        periodCode: this.ruleForm.exhibitionSession,
        exhibitionAreaCode: ""
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionAreaNameCh,
              value: item.exhibitionAreaArrangeId,
              code: item.exhibitionAreaCode
            });
          }
          if (this.specialAreaArray.length > 0) {
            this.specialAreaArray.splice(0, this.specialAreaArray.length);
          }
          this.specialAreaArray = array;
        }
      });
    },
    //期数变化,请求展区
    periodCodeChange(param) {
      let obj = {
        exhibitionNum: this.ruleForm.exhibitionNum,
        periodCode: param,
        exhibitionAreaCode: ""
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          if (res) {
            let array = [];
            for (let item of res) {
              array.push({
                label: item.exhibitionAreaNameCh,
                value: item.exhibitionAreaArrangeId
              });
            }
            if (this.specialAreaArray.length > 0) {
              this.specialAreaArray.splice(0, this.specialAreaArray.length);
            }
            this.specialAreaArray = array;
          }
        }
      });
    },
    //专区请求
    applyExhibitionRegion(param) {
      let obj = {
        exhibitionNum: this.ruleForm.exhibitionNum,
        periodCode: this.ruleForm.exhibitionSession,
        exhibitionAreaCode: param
      };
      this.getExhibitionPlace(obj).then(res => {
        if (res) {
          let array = [];
          for (let item of res[0].exhibitionRegions) {
            array.push({
              label: item.reCh,
              value: item.exhibitionRegionId
            });
          }
          if (this.arrSpecialAreas.length > 0) {
            this.arrSpecialAreas.splice(0, this.arrSpecialAreas.length);
          }
          for (let item of array) {
            this.arrSpecialAreas.push(item);
          }
        }
      });
    },
    // 查看
    checkThis(param) {
      this.$router.push({
        path: "/viewDetails",
        query: {
          row: JSON.stringify(param)
        }
      });
    },
    // 分配广交会编码
    assignAanton(data) {
      this.dialogFormVisible = true;
      this.compId = data.companyId;
    },
    // 取消
    disappear(formName) {
      this.dialogFormVisible = false;
      this.$refs[formName].resetFields();
    },
    // 确定
    authentic(formName) {
      let obj = {
        companyId: this.compId,
        cantonCode: this.cantonCode.assigne
      };
      this.postCantonCodesEnterprises(obj).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.dialogFormVisible = false;
        this.$refs[formName].resetFields();
        this.getTableList(this.ruleForm);
      });
    },
    chcekThis(param) {
      console.log("shanchu", param);
    },
    // 分页 页面显示数据量切换
    handleSizeChange(param) {
      // console.log("页面显示", param);
      this.ruleForm.size = param;
      
    },
    handleCurrentChange(param) {
      // console.log("页面显示2", param);
      this.ruleForm.current = param;
    }
  },
  async created() {
    if (!this.layoutArray) {
      this.getBoothApplyType().then(res => {
        if (res) {
          let array = [];
          for (let item of res.records) {
            array.push({
              label: item.itemText,
              value: item.itemCode
            });
          }
          this.$store.commit('commonStore/LAYOUT_TYPE', array);
        }
      });
    }
    if (!this.exhibitionNum) {
      await this.getExhibitionNum().then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionNum,
              value: item.exhibitionNum,
              current: item.current
            });
          }
          this.$store.commit('commonStore/EXHIBITION_NUM', array);
          for (let item of this.exhibitionNum) {
            if (item.current) {
              this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
              this.ruleForm.exhibitionNum = this.currentExhibition;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.ruleForm.exhibitionNum = this.currentExhibition;
          break;
        }
      }
    } else {
      this.ruleForm.exhibitionNum = this.currentExhibition;
    }
    // 展区
    this.exhibit = await kindo.dictionary.get('ifoExhibitionArea');
    // 复审状态
    this.reApproveArray = await kindo.dictionary.get('ifoCommonApproveStatus');
    // 代理名称
    this.exhibitionNumChange(this.ruleForm.exhibitionNum);
    // this.getCheckCompanyBoothList(this.ruleForm);
    // this.applyExhibitionRegion(this.ruleForm);
    // 请求列表
    this.getTableList(this.ruleForm);
  }
};
</script>
