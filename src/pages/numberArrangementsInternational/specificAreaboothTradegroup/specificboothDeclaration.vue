<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团特定展位需求申报" name="first" v-loading.fullscreen="fullLoading">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <el-form-item label="届数">
            <el-select v-model="formData.exhibitionSession" clearable>
              <el-option
                v-for="(item, index) in optionDelegation"
                :key="index"
                :label="item"
                :value="item"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期数">
            <el-select v-model="formData.exhibitionPeriod" clearable>
              <el-option
                v-for="(item, index) in optionExhibition"
                :key="index"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionAreaCode" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="模板类型">
            <el-select v-model="formData.demandType" clearable>
              <el-option label="通用" value="ORDINARY"></el-option>
              <el-option label="铁石水疗" value="IRONSPA"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="申报项目">
            <!-- <el-input v-model.trim="formData.demandName" style="width: 215px" clearable></el-input> -->
            <!-- <el-select v-model="formData.demandName" clearable>
              <el-option label="申报" value="1"></el-option>
            </el-select> -->
            <el-select clearable v-model="formData.demandName" placeholder="请选择">
              <el-option v-for="(item, index) in demandNameOpts" :key="index" :label="item.demandName" :value="item.demandName"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-table :data="tableData" style="width: 100%" size="small" border>
          <!-- <el-table-column align="center" type="selection" width="55"></el-table-column> -->
          <el-table-column align="center" min-width="120" label="申报项目" prop="demandName"></el-table-column>
          <el-table-column align="center" min-width="120" label="届数" prop="exhibitionSession"></el-table-column>
          <el-table-column align="center" min-width="120" label="期数" prop="exhibitionPeriod">
            <template slot-scope="scope">{{scope.row.exhibitionPeriod | nper}}</template>
          </el-table-column>
          <el-table-column align="center" min-width="120" label="展区" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" min-width="120" label="专区" prop="specialAreaName">
            <!-- <template slot-scope="scope">
              {{scope.row.boothTypeName}}
            </template> -->
          </el-table-column>
          <el-table-column align="center" min-width="120" label="申报展位数" prop="boothNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="editTableData" ref="refedit" label-width="0px" :rules="editRule">
                  <el-form-item prop="boothNumber">
                    <el-input v-model.trim.number="editTableData.boothNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.boothNumber}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column align="center" min-width="120" label="模板类型" prop="demandType">
            <template slot-scope="scope">{{scope.row.demandType | checktus}}</template>
          </el-table-column> -->
          <el-table-column align="center" min-width="120" label="广交会编码" prop="companyCecfCode"></el-table-column>
          <el-table-column align="center" min-width="120" label="企业名称" prop="companyCn"></el-table-column>
          <el-table-column align="center" min-width="160" label="操作">
            <template slot-scope="scope">
              <el-button type="text" v-if="!scope.row.edit" @click="onEdit(scope.row, scope.$index)">编辑</el-button>
              <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'refedit')">保存</el-button>
              <el-button type="text" @click="onDele(scope.row)">删除</el-button>
              <el-button type="text" @click="handlePrint(scope.row, scope.$index)">打印</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="danger" size="small" class="formStyle" @click="newAdd">新增</el-button>
          <!-- <el-button type="primary" size="small" @click="handPrint" class="formStyle">打印</el-button> -->
        </div>
        <!-- 分页 -->
        <div class="floatRight paginationTop">
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="paginationData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="paginationData.pageSizes"
            :current-page="paginationData.currentPage"
            :pager-count="paginationData.pagerCount"
            :page-size="paginationData.pageSize"
          ></el-pagination>
        </div>
        <!-- 新增-通用 铁石水疗 水疗模板 -->
        <el-dialog title="新增" :visible.sync="dialogVisible" v-if="dialogVisible" :show-close="false" :close-on-press-escape="false" :close-on-click-modal="false" width="800px">
          <el-form :model="addForm" :rules="rules" ref="ruleForm" size="small" label-width="250px">
            <!-- 通用 -->
            <div v-show="currency">
              <el-form-item label="申报项目" prop="demandName" class="demandname">
                <!-- <el-input v-model.trim="addForm.demandName" class="wid" clearable></el-input> -->
                <!-- <el-select v-model="addForm.demandName" clearable>
                  <el-option v-for="(item, index) in demandNameOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select> -->
                <el-select
                class="wid"
                clearable
                v-model="addForm.demandName"
                placeholder="请选择"
                @change="handleSelectDem"
              >
                <el-option
                  v-for="(item, index) in demandNameOpts"
                  :key="index"
                  :label="item.demandName"
                  :value="item.demandId"
                ></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="期数" prop="exhibitionPeriodName" class="addstyle">
                <!-- <el-select v-model="addForm.exhibitionPeriod" class="wid" clearable>
                  <el-option label="第一期" value="1"></el-option>
                  <el-option label="第二期" value="2"></el-option>
                  <el-option label="第三期" value="3"></el-option>
                </el-select> -->
                  <el-input disabled v-model="addForm.exhibitionPeriodName" class="wid"></el-input>
              </el-form-item>
              <!-- <el-form-item label="模板类型" prop="demandType" class="addstyle"> -->
              <!-- :rules="[{required: true, message: '该字段为必填项'}]" -->
                <!-- <el-select v-model="addForm.demandType" class="wid" @change="afbootype" clearable>
                  <el-option label="通用" value="ORDINARY"></el-option>
                  <el-option label="铁石水疗" value="IRONSPA"></el-option>
                </el-select> -->
                <!-- <el-input disabled v-model="addForm.demandTypeName" class="wid"></el-input>
              </el-form-item> -->
              <!-- <el-form-item label="申报名称" prop="demandName" class="addstyle">
                <el-input v-model.trim="formData.demandName" class="wid" clearable></el-input>
              </el-form-item> -->
              <el-form-item label="展区" prop="exhibitionAreaName" class="addstyle">
                <!-- <el-select v-model="addForm.exhibitionAreaCode" class="wid" clearable @change="addexha"> -->
                  <!-- <el-option
                    v-for="(item, index) in localstora.exhibitionArea"
                    :key="index"
                    :label="item.exhibitionAreaName"
                    :value="item.exhibitionAreaCode"
                  ></el-option>
                </el-select> -->
                <el-input disabled v-model="addForm.exhibitionAreaName" class="wid"></el-input>
              </el-form-item>
              <el-form-item label="专区" class="addstyle" prop="specialAreaName">
                <!-- <el-select v-model="addForm.boothType" clearable>
                  <el-option label="户外水疗设施" value="户外水疗设施"></el-option>
                  <el-option label="铁石装饰品" value="铁石装饰品"></el-option>
                </el-select>-->
                <!-- <el-select v-model="addForm.specialAreaCode" class="wid" clearable>
                  <el-option
                    v-for="(item, index) in optspe"
                    :key="index"
                    :label="item.specialAreaName"
                    :value="item.specialAreaCode"
                  ></el-option>
                </el-select> -->
                <el-input disabled v-model="addForm.specialAreaName" class="wid"></el-input>
              </el-form-item>
              <!-- <el-form-item label="展位类别" prop="exhibitionAreaName" class="addstyle"> -->
                <!-- <el-select v-model="addForm.exhibitionAreaCode" class="wid">
                   <el-option label="通用" value="1"></el-option>
                  <el-option label="铁石水疗" value="HD06"></el-option>
                </el-select> -->
                <!-- <el-input disabled v-model="addForm.exhibitionAreaName" class="wid"></el-input>
              </el-form-item> -->
              <el-form-item label="申报展位数" class="boothnumber" prop="addstyle">
                <el-input
                  v-model.trim.Number="addForm.boothNumber"
                  maxlength="2"
                  class="wid"
                ></el-input>
              </el-form-item>
              <div class="divp">
                <div class="flotle">
                  <el-checkbox
                    v-model="addForm.checkeda"
                  >是否以地区特色产业集群名义申报</el-checkbox>
                </div>
                <el-upload
                  class="impfloat flotle"
                  action=""
                  :limit="1"
                  :http-request="uploadFileMethod">
                  <el-button class="formStyle" type="primary">上传</el-button>
                </el-upload>
              </div>
            </div>
            <!-- 铁石水疗 -->
            <div v-if="false">
              <el-form-item label="展位类别" prop="exhibitionAreaName" class="addstyle">
                <!-- <el-select v-model="addForm.exhibitionAreaCode" class="wid">
                   <el-option label="通用" value="1"></el-option>
                  <el-option label="铁石水疗" value="HD06"></el-option>
                </el-select> -->
                <el-input disabled v-model="addForm.exhibitionAreaName" class="wid"></el-input>
              </el-form-item>
              <el-form-item label="专区" class="addstyle" prop="specialAreaNameSpa">
                <!-- <el-select v-model="addForm.boothType" class="wid" @change="tssl">
                  <el-option label="户外水疗设施" value="1"></el-option>
                  <el-option label="铁石装饰品" value="2"></el-option>
                </el-select> -->
                <el-input disabled v-model="addForm.specialAreaNameSpa" class="wid"></el-input>
              </el-form-item>
              <!-- <el-form-item label="广交会编码" prop="companyCecfCode" class="companycecfcode"> -->
                <!-- <el-input v-model.trim="addForm.companyCecfCode" class="wid" maxlength="8"></el-input> -->
                <!-- <el-select v-model="addForm.companyCecfCode" class="wid" @change="compcfc">
                  <el-option
                    v-for="(item, index) in comccc"
                    :key="index"
                    :label="item.text"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item> -->
              <el-form-item label="企业名称" class="addstyle">
                <el-input v-model.trim="addForm.companyCn" class="wid" disabled></el-input>
              </el-form-item>
              <el-form-item :label="'已申报基数内' + ironspa + '展位数'" class="addstyle">
                <el-input v-model="addForm.initialNumber" class="wid" disabled></el-input>
              </el-form-item>
              <el-form-item :label="`申报基数外${ironspa}展位数`" prop="boothNumberSpa" class="boothnumberspa">
                <el-input
                  v-model="addForm.boothNumberSpa"
                  maxlength="2"
                  class="wid"
                ></el-input>
              </el-form-item>
              <el-form-item :label="`${ironspa}合计展位数`" class="addstyle">
                <el-input v-model="addnum" disabled class="wid"></el-input>
              </el-form-item>
              <div class="divp">
                <el-checkbox
                  v-model="addForm.checked"
                >本团该展区基数内展位{{getinitDem.initialNumber}}个，加上本轮基数外申报展位{{addForm.boothNumberSpa}}个。申报通过后，本团该展区展位共{{addnum}}个</el-checkbox>
              </div>
            </div>
            <div v-show="!currency">
              <el-table :data="tableFormData" style="width: 100%" size="small" border>
                <el-table-column align="center" min-width="120" label="期数" prop="exhibitionPeriod">
                  <template slot-scope="scope">{{scope.row.exhibitionPeriod | nper}}</template>
                </el-table-column>
                <el-table-column align="center" min-width="120" label="展品专区" prop="specialAreaCode">
                  <template slot-scope="scope">{{scope.row.specialAreaCode | speCode}}</template>
                </el-table-column>
                <el-table-column align="center" min-width="120" label="广交会编码" prop="companyCecfCode"></el-table-column>
                <el-table-column align="center" min-width="120" label="企业名称" prop="companyCn"></el-table-column>
                <el-table-column align="center" min-width="120" label="申报展位数" prop="boothNumber"></el-table-column>
                <el-table-column align="center" min-width="160" label="操作">
                  <template slot-scope="scope">
                    <el-button type="text" @click="handleDelIronspa(scope.row, scope.$index)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div style="width: 100%; box-sizing: border-box; display: flex; flex-direction: column; border-left: 1px solid #EBEEF5; border-right: 1px solid #EBEEF5; border-bottom: 1px solid #EBEEF5">
                <div style="display: flex; flex-direction: row; height: 40px; border-bottom: 1px solid #EBEEF5">
                  <div style="flex: 1 0 auto; display: flex; align-items: center; justify-content: flex-end;">申请基数外展位小计&nbsp;</div>
                  <div style="flex: 0 0 96px; border-left: 1px solid #EBEEF5; display: flex; align-items: center; justify-content: center; padding-left: 15px; padding-right: 10px">{{num}}</div>
                  <div style="flex: 0 0 162px; border-left: 1px solid #EBEEF5;"></div>
                </div>
                <div style="display: flex; flex-direction: row; height: 40px; border-bottom: 1px solid #EBEEF5">
                  <div style="flex: 1 0 auto; display: flex; align-items: center; justify-content: flex-end">当前本团可用基数内铁石装饰品类别展位数&nbsp;</div>
                  <div style="flex: 0 0 96px; border-left: 1px solid #EBEEF5; display: flex; align-items: center; justify-content: center; padding-left: 15px; padding-right: 10px">{{(getinitDem.initialNumber) || 0}}</div>
                  <div style="flex: 0 0 162px; border-left: 1px solid #EBEEF5;"></div>
                </div>
                <div style="display: flex; flex-direction: row; height: 40px;">
                  <div style="flex: 1 0 auto; display: flex; align-items: center; justify-content: flex-end">合计&nbsp;</div>
                  <div style="flex: 0 0 96px; border-left: 1px solid #EBEEF5; display: flex; align-items: center; justify-content: center; padding-left: 15px; padding-right: 10px">{{(num + Number(getinitDem.initialNumber)) || 0}}</div>
                  <div style="flex: 0 0 162px; border-left: 1px solid #EBEEF5;"></div>
                </div>
              </div>
              <div style="display: flex; width: 100%; flex-direction: column; margin-top: 20px">
                <div style="display: flex; width: 100%; background: #F5F7FA; border: 1px solid #EBEEF5;">
                  <p style="margin-left: 10px; color: red">增加申报记录:</p>
                </div>
                <div style="display: flex; width: 100%; text-align: center; border: 1px solid #EBEEF5;">
                  <div style="flex: 1; margin: -5px 10px 10px 10px;">
                    <p>展品专区</p>
                    <el-select v-model="editFormTable.specialAreaCode" @change="handleSpeName">
                      <el-option label="铁石装饰品展位" value="HD06_2"></el-option>
                      <el-option label="户外水疗设施展位" value="HD06_1"></el-option>
                    </el-select>
                  </div>
                  <div style="flex: 1; margin: -5px 10px 10px 10px;">
                    <p>广交会编码</p>
                    <el-select v-model="editFormTable.companyCecfCode" @change="compcfc">
                      <el-option
                        v-for="(item, index) in comData"
                        :key="index"
                        :label="item.text"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                    <!-- <el-input v-model="editFormTable.companyCecfCode" maxlength="2"></el-input> -->
                  </div>
                  <div style="flex: 1; margin: -5px 10px 10px 10px;">
                    <p>企业名称</p>
                    <el-input v-model="editFormTable.companyCn" disabled></el-input>
                  </div>
                  <div style="flex: 1; margin: -5px 10px 10px 10px;">
                    <p>申报展位数</p>
                    <el-input v-model="editFormTable.boothNumber" maxlength="2"></el-input>
                  </div>
                </div>
              </div>
              <div style="display: flex; justify-content: center; margin: 10px 0;">
                <el-button type="primary" @click="handleAddIronspa" size="small">新增</el-button>
                <el-button type="primary" @click="handlePushIronspa" size="small">提交</el-button>
                <el-button type="primary" @click="handlePrintTable"  size="small">打印</el-button>
              </div>
            </div>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <!-- <el-button size="small" @click="dialogVisible = false, currency = true">取 消</el-button> -->
            <el-button size="small" @click="handleCancel">关 闭</el-button>
            <el-button v-if="currency" size="small" type="primary" @click="handSeave('ruleForm')">提 交</el-button>
          </span>
        </el-dialog>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    let tynum = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error("该字段为必填项"));
      } else if (!Number.isInteger(value - 0)) {
        return callback(new Error("请输入合法字符"));
      } else if (Number(value) <= 0) {
        return callback(new Error("必须大于0"));
      } else {
        return callback();
      }
    };
    return {
      obj: {
        current: 1,
        size: 10,
        delegationId: "456A4"
      },
      ogod: {
        delegationId: "010",
        exhibitionAreaCode: "HD06"
        //exhibitionPeriod: "3"
      },
      gcibd: {
        delegationId: "140"
      },
      editForm: {},
      editTableData: { boothNumber: "" },
      lastIndexPage: "",
      demandNameOpts: [],
      demandNameObj: {},
      dictionary: {
        demandName: []
      },
      tableFormData: [],
      editFormTable: {
        boothNumber: ''
      },
      num: 0,
      checkInputRule: false, //用于判断输入的展位数是否被限制
      checkSpeData: false, //用于判断新增的水疗申报是否有重复
      checkDemandStatus: false, //用于判断模板是否被使用过
      currency: true, // 通用
      // demandType: "ORDINARY", // 模板类型
      ironspa: "铁石装饰品/水疗",
      optspe: [],
      comccc: [], // 广交会编码
      comData: [], //筛选的广交会编码
      dialogVisible: false,
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      // 表单绑定数据
      formData: {
        demandName: "", // 申报名称
        exhibitionSession: "", // 届数
        exhibitionPeriod: "", // 期数
        exhibitionAreaCode: "", // 展区
        demandType: ""
      },
      // 表单规则
      rules: {
        //demandName: [
        //  { required: true, message: "该字段为必填项", trigger: "change" }
        //],
        // exhibitionPeriod: [
        //   { required: true, message: "该字段为必填项", trigger: "change" }
        // ],
        // exhibitionArea: [
        //   { required: true, message: "该字段为必填项", trigger: "change" }
        // ],
        // exhibitionAreaCode: [
        //   { required: true, message: "该字段为必填项", trigger: "change" }
        // ],
        //boothNumber: [{ validator: tynum, required: true, trigger: "change" }],
        //boothNumber: [{ validator: tynum, required: true, trigger: "change" }],
        //boothNumberSpa: [{ validator: tynum, required: true, trigger: "change" }]
        // companyCecfCode: [
        //   { required: true, message: "该字段为必填项", trigger: "change" }
        // ],
        // companyCn: [
        //   { required: true, message: "该字段为必填项", trigger: "change" }
        // ],
        // initialNumber: [
        //   { required: true, message: "该字段为必填项", trigger: "change" }
        // ],
        // specialArea: [
        //   { required: true, message: "该字段为必填项", trigger: "change" }
        // ],
        // specialAreaCode: [
        //   { required: true, message: "该字段为必填项", trigger: "change" }
        // ]
      },
      // 编辑表单规则
      editRule: {
        boothNumber: [{ validator: tynum, required: true, trigger: "change" }]
      },
      // 新增时的表单数据
      addForm: {
      //   demandName: '',
      //   exhibitionPeriod: '',
      //   demandType: '',
      //   exhibitionAreaCode: '',
      //   boothType: '',
      // //this.addForm.boothNumber = val.boothNumber;
      //   //demandType: "ORDINARY",
        boothNumber: "",
        boothNumberSpa: ""
        //
      },
      // 届数
      optionDelegation: [],
      // 期数
      optionExhibition: [
        { label: "第一期", value: "1" },
        { label: "第二期", value: "2" },
        { label: "第三期", value: "3" }
      ],
      // 表格数据
      tableData: [],
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      fullLoading: false,
      activeName: "first"
    };
  },
  filters: {
    checktus(val) {
      switch (val) {
        case "IRONSPA":
          return "铁石水疗";
        case "ORDINARY":
          return "通用";
        default:
          return "其他";
      }
    },
    nper(data) {
      if (data === "1") {
        return "第一期";
      } else if (data === "2") {
        return "第二期";
      } else if (data === "3") {
        return "第三期";
      }
    },
    speCode(data) {
      if (data === "HD06_2") {
        return "铁石装饰品";
      } else if (data === "HD06_1") {
        return "户外水疗设施";
      }
    }
  },
  created() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
      this.ogod.delegationId = this.$store.getters.userInfo.org.deptId;
      this.gcibd.delegationId = this.$store.getters.userInfo.org.deptId;
      // this.obj.delegationCode = "456A4";
      // this.ogod.delegationId = "456A4";
      // this.gcibd.delegationId = "456A4";
    }
    // this.usInfo = this.$store.getters.userInfo;
    // console.log(this.usInfo.org.deptId, "userinfo");
  },
  mounted() {
    this.getsysExhibitions().then(res => {
      // this.optionDelegation = JSON.parse(JSON.stringify(res.data));
      for (let i = 0; i < res.data.length; i++) {
        this.optionDelegation.push(Number(res.data[i].exhibitionNum));
      }
      let rul = (a, b) => a - b;
      this.optionDelegation = this.optionDelegation.sort(rul);
    });
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    // this.getinitialOrdinaryDemand(this.ogod);
    //this.getcompanyInfoByDeleId(this.gcibd)
    this.$http.get(`${process.env.API_NA_URL}/api/ordinaryDemandRecord/companyInfoByDeleId/get`, this.gcibd)
      .then(res => {
        this.comccc = [];
        for (let i = 0; i < res.length; i++) {
          if (res[i].cecfCode) {
            let gjhbm = {
              text: res[i].cecfCode,
              value: res[i].cecfCode,
              productType: res[i].productType,
              companyName: res[i].companyName
            };
            this.comccc.push(gjhbm);
          }
        }
        this.comData = this.comccc;
      })
      .catch(e => {});
      // 展区
    this.getexhibitionArea({ exhibitionSession: this.getCes }).then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    //获取申报名称
    this.getlistOrdinaryDemand({ current: 0, size: 10, delegationId: this.$store.getters.userInfo.org.deptId, delegationName: this.$store.getters.userInfo.org.deptName, openStatus: "1" }).then(res => {
      let demData = JSON.parse(JSON.stringify(res));
      //let demOpts = [];
      // demData.records.forEach(element => {
      //   let data = {
      //     label: element.demandName,
      //     value: element.demandId
      //   };
      //   demOpts.push(data);
      // });
      this.demandNameOpts = demData.records;
    });
  },
  computed: {
    ...mapGetters("specificAreaboothTradegroup", [
      "getinitDem", // 2.1获取各交易团各展区已申报基数内展位数
      "getCibd" // 根据交易团Id查询交易团下属企业id，名称，广交会编码
    ]),
    ...mapGetters("dictData", ["dictionaryData"]),
    addnum() {
      return (
        Number(this.getinitDem.initialNumber) + Number(this.addForm.boothNumberSpa)
      );
    }
  },
  methods: {
    ...mapActions("specificAreaboothTradegroup", [
      "getlistOrdinaryDemand",
      "getinitialOrdinaryDemand", // 2.1获取各交易团各展区已申报基数内展位数
      "addordinaryDemandRecord", // 2.2交易团特定展位申报
      "getlistOrdinaryDemandRecord", // 2.3获取交易团申报特定展位列表
      "editordinaryDemandRecord", // 2.4编辑交易团申报特定展位信息
      "deleordinaryDemandRecord", // 2.5删除交易团申报的特定展位信息
      "getcompanyInfoByDeleId", // 根据交易团Id查询交易团下属企业id，名称，广交会编码
      "getoneTemplate", // 2根据交易团Id查询模板
      "uploadfile" // 上传
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getsysExhibitions" // 获取所有展届信息
    ]),
    // 获取页面数据 ok
    getListPage(Url) {
      this.getlistOrdinaryDemandRecord(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
          }
          this.tableData = getTable;
        })
        .catch(e => {});
    },
    // 通用模板打印
    handlePrint(row, index) {
      this.demandNameOpts.forEach(el => {
        if (el.demandId === row.demandId) {
          row['remark'] = el.remark;
        }
      });
      let paramData = JSON.parse(JSON.stringify(row));
      window.open(window.location.origin + '/#/specificboothDeclarationOrdinaryPrint?data=' + encodeURI(JSON.stringify(paramData)));
    },
    //联想
    newonchangeDate(val) {
      //console.log(val); 中文输入法输入英文会出现val为undefined
      if (val !== '' && val !== undefined) {
        setTimeout(() => {
          //console.log(this.demandNameOpts);
          this.dictionary.demandName = this.demandNameOpts.filter(item => {
            return item.demandName.toLowerCase().indexOf(val.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.dictionary.demandName = [];
      }
    },
    // 查询
    onSearch() {
      this.obj = {
        current: 1,
        size: 10,
        delegationId: "140"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
      }
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
      }
      this.getListPage(this.obj);
    },
    // change事件addform 通用
    afbootype() {
      if (this.addForm.demandType === "IRONSPA") {
        this.currency = false;
        this.addForm.exhibitionAreaCode = "HD06";
        this.addForm.boothNumber = "";
        this.addForm.initialNumber = this.getinitDem.initialNumber;
      } else if (this.addForm.demandType === "ORDINARY") {
        this.currency = true;
        this.addForm.exhibitionAreaCode = "";
        this.addForm.boothType = "";
      }
    },
    // 新增展区事件change
    addexha() {
      this.optspe = [];
      // 专区
      if (this.addForm.exhibitionAreaCode) {
        this.getexhibitionInfoByCode({ exhibitionAreaCode: this.addForm.exhibitionAreaCode }).then(res => {
          this.optspe = JSON.parse(JSON.stringify(res));
        }).catch(e => {});
      }
    },
    // change事件addForm 铁石水疗
    tssl() {
      if (this.addForm.boothType === "铁石装饰品") {
        this.ironspa = "铁石装饰品";
      } else if (this.addForm.boothType === "户外水疗设施") {
        this.ironspa = "水疗";
      }
    },
    // 广交会编码的change事件
    compcfc() {
      //console.log(this.getCibd, 'getCibd');
      //console.log(this.addForm.companyCecfCode, 'companyCecfCode');
      for (let i = 0; i < this.comccc.length; i++) {
        if (this.editFormTable.companyCecfCode === this.comccc[i].value) {
          this.editFormTable.companyCn = this.comccc[i].companyName;
        }
      }
      // for (let key in this.comccc) {
      //   if (this.editFormTable.companyCecfCode === this.getCibd[key].cecfCode) {
      //     this.editFormTable.companyCn = this.getCibd[key].companyName;
      //   }
      // }
    },
    //展位类别选择
    handleSpeName() {
      this.comData = [];
      for (let key in this.comccc) {
        if (this.editFormTable.specialAreaCode === this.comccc[key].productType) {
          let objComData = {
            text: this.comccc[key].text,
            value: this.comccc[key].value
          };
          this.comData.push(objComData);
        }
      }
    },
    handleAddIronspa() { //新增铁石水疗
      if (!this.editFormTable.specialAreaCode) {
        this.$message.warning('请选择展位类别');
      } else if (!this.editFormTable.companyCecfCode) {
        this.$message.warning('请选择广交会编码');
      } else if (!this.editFormTable.boothNumber && this.editFormTable.boothNumber !== 0) {
        this.$message({
          type: "warning",
          message: "请填写申报展位数"
        });
      } else if (!Number.isInteger(this.editFormTable.boothNumber - 0)) {
        this.$message({
          type: "warning",
          message: "申报展位数需是合法字符"
        });
      } else if (Number(this.editFormTable.boothNumber) <= 0) {
        this.$message({
          type: "warning",
          message: "申报展位数必须大于0"
        });
      } else if (Number(this.demandNameObj.inputRule) < Number(this.editFormTable.boothNumber) && this.checkInputRule) {
        this.$message({
          type: "warning",
          message: "申报展位数不能大于" + this.demandNameObj.inputRule
        });
      } else {
        this.num = 0;
        this.checkSpeData = false;
        if (this.tableFormData.length > 0) {
          for (let i = 0; i < this.tableFormData.length; i++) {
            if (this.tableFormData[i].specialAreaCode === this.editFormTable.specialAreaCode && this.tableFormData[i].companyCecfCode === this.editFormTable.companyCecfCode) {
              this.checkSpeData = true;
              break;
            }
          }
        }
        if (this.checkSpeData) {
          this.$message({
            type: "warning",
            message: "增加申报记录有重复"
          });
        } else {
          this.editFormTable['exhibitionPeriod'] = this.demandNameObj.exhibitionPeriod;
          let obj = JSON.parse(JSON.stringify(this.editFormTable));
          this.tableFormData.push(obj);
          this.tableFormData.forEach(item => {
            this.num = this.num + Number(item.boothNumber);
          });
          let keys = Object.keys(this.editFormTable);
          for (let i = 0; i < keys.length; i++) {
            this.editFormTable[keys[i]] = '';
          }
        }
      }
    },
    handlePushIronspa() { //提交铁石水疗新增数据
      if (this.tableFormData.length < 1) {
        this.$message({
          type: "warning",
          message: "请增加申报记录"
        });
      } else if ((Number(this.num) > Number(this.demandNameObj.inputRule)) && this.checkInputRule) {
        this.$message({
          type: "warning",
          message: "申请基数外展位小计不能大于" + this.demandNameObj.inputRule
        });
      } else {
        this.demandNameObj['exhibitionAreaCode'] = this.demandNameObj.exhibitionArea;
        let addIronspaCn = [];
        for (let i = 0; i < this.tableFormData.length; i++) {
          if (this.tableFormData[i].specialAreaCode === 'HD06_2') {
            this.tableFormData[i]['specialAreaName'] = '铁石装饰品';
          } else if (this.tableFormData[i].specialAreaCode === 'HD06_1') {
            this.tableFormData[i]['specialAreaName'] = '户外水疗设施';
          }
          let obj = JSON.parse(JSON.stringify(this.demandNameObj));
          let objTabData = JSON.parse(JSON.stringify(this.tableFormData[i]));
          Object.assign(obj, objTabData);
          addIronspaCn.push(obj);
        }
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.$http.postJson(`${process.env.API_NA_URL}/api/ordinaryDemandRecord/specialBooth/addIronSpa`, addIronspaCn).then(res => {
          this.$message({
            type: "success",
            message: "提交成功"
          });
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }
    },
    handleDelIronspa(row, index) { //删除铁石水疗
      this.num = 0;
      this.tableFormData.splice(index, 1);
      this.tableFormData.forEach(item => {
        this.num = this.num + Number(item.boothNumber);
      });
    },
    handlePrintTable() { //打印铁石水疗列表
      //this.$print(this.$refs.printTable);
      let paramData = JSON.parse(JSON.stringify(this.tableFormData));
      let num = this.num;
      let initialNumber = this.getinitDem.initialNumber;
      //window.open(window.location.origin + '/#/specificboothDeclarationIronspaPrint?data=' + encodeURI(JSON.stringify(paramData)));
      window.open(window.location.origin + '/#/specificboothDeclarationIronspaPrint?data=' + encodeURI(JSON.stringify(paramData)) + '&num=' + num + '&initialNumber=' + initialNumber);
    },
    handleSelectDem(val) {
      this.demandNameObj = {};
      for (let index = 0; index < this.demandNameOpts.length; index++) {
        if (this.demandNameOpts[index].demandId === val) {
          this.demandNameObj = this.demandNameOpts[index];
        }
      }
      if (this.demandNameObj.inputRule) {
        this.checkInputRule = true;
      } else {
        this.checkInputRule = false;
      }
      this.checkDemandStatus = false;
      //判断模板是否被使用过
      this.getlistOrdinaryDemandRecord({ current: 0, size: 10, delegationId: this.$store.getters.userInfo.org.deptId, demandId: this.demandNameObj.demandId }).then(res => {
        if (res.records.length > 0) {
          //当前模板被使用过
          this.checkDemandStatus = true;
          this.$message({
            type: "error",
            message: "该申报项目已提交,请勿重复操作.如需修改,请点击列表右侧'编辑'按钮"
          });
        } else {
          this.checkDemandStatus = false;
          this.num = 0;
          this.demandNameObj['delegationCode'] = this.$store.getters.userInfo.org.deptCode;
          this.demandNameObj['delegationId'] = this.$store.getters.userInfo.org.deptId;
          this.addForm.demandName = this.demandNameObj.demandName;
          this.addForm.boothNumber = "";
          this.addForm.boothNumberSpa = "";
          //console.log(val);
          //this.addForm.demandName = val.demandName;
          if (this.demandNameObj.exhibitionPeriod === '1') {
            this.addForm.exhibitionPeriodName = '第一期'; //用于显示展区的汉字名称
          } else if (this.demandNameObj.exhibitionPeriod === '2') {
            this.addForm.exhibitionPeriodName = '第二期';
          } else if (this.demandNameObj.exhibitionPeriod === '3') {
            this.addForm.exhibitionPeriodName = '第三期';
          }
          this.addForm.demandType = this.demandNameObj.demandType;
          this.addForm.exhibitionAreaName = this.demandNameObj.exhibitionAreaName;
          if (this.demandNameObj.specialAreaName) {
            this.addForm.specialAreaName = this.demandNameObj.specialAreaName;
          } else {
            this.addForm.specialAreaName = "无需选择专区";
          }
          this.addForm.specialAreaNameSpa = this.demandNameObj.specialAreaName;
          if (this.addForm.specialAreaNameSpa === "铁石装饰品") {
            this.ironspa = "铁石装饰品";
          } else if (this.addForm.specialAreaNameSpa === "户外水疗设施") {
            this.ironspa = "水疗";
          }
          //this.addForm.exhibitionPeriod = val.exhibitionPeriod;
          if (this.demandNameObj.demandType === 'ORDINARY') {
            this.addForm.demandTypeName = '通用';
            this.currency = true;
          } else if (this.demandNameObj.demandType === 'IRONSPA') {
            this.addForm.demandTypeName = '铁石水疗';
            this.addForm.initialNumber = this.getinitDem.initialNumber;
            //console.log(this.getinitDem);
            this.currency = false;
          }
      //console.log(this.addForm);
      //this.addForm.boothNumber = val.boothNumber;
        }
      });
    },
    // 编辑
    onEdit(val, valId) {
      this.editTableData.boothNumber = val.boothNumber;
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.editForm = val;
        this.tableData[valId]["edit"] = true;
        this.lastIndexPage = valId;
      } else {
        this.$confirm("是否放弃本次修改")
          .then(() => {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i]["edit"] = false;
            }
            this.tableData[valId]["edit"] = true;
            this.lastIndexPage = valId;
          })
          .catch(() => {
            this.$message.info("已取消本次操作");
          });
      }
    },
    // 保存
    onServe(val, valId, datae) {
      this.lastIndexPage = "";
      this.editForm["delegationName"] = val.delegationName;
      this.editForm["demandId"] = val.demandId;
      for (let key in this.localstora.delegation) {
        if (
          this.localstora.delegation[key].deptName === val.delegationName
        ) {
          this.editForm["delegationId"] = this.localstora.delegation[key].deptId;
          this.editForm["delegationCode"] = this.localstora.delegation[key].deptCode;
        }
      }
      this.editForm.boothNumber = this.editTableData.boothNumber;
      this.$refs[datae].validate((vald) => {
        if (vald) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.editordinaryDemandRecord(this.editForm)
            .then(res => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.tableData[valId]["edit"] = false;
              this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
              this.lastIndexPage = valId;
            });
        } else {
          return false;
        }
      });
    },
    // 上传
    uploadFileMethod(param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      this.uploadfile(formData).then(res => {
        this.addForm["attachment"] = res.fileId;
        this.$message({
          type: "success",
          message: "上传成功"
        });
      }).catch(e => {});
    },
    // 删除
    onDele(val) {
      // let intId = {
      //   demandId: val.demandId,
      //   delegationRangeId: val.delegationRangeId,
      //   areaRangeId: val.areaRangeId
      // };
      //console.log(val);
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleordinaryDemandRecord(val)
            .then(res => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getListPage(this.obj);
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 点击新增
    newAdd() {
      this.comData = this.comccc;
      this.dialogVisible = true;
      this.getinitialOrdinaryDemand(this.ogod);
      for (let key in this.addForm) {
        this.addForm[key] = "";
      }
      this.tableFormData = [];
      for (let key in this.editFormTable) {
        this.editFormTable[key] = "";
      }
      //this.addForm = {
        //demandType: "ORDINARY",
        //boothNumber: ""
      //};
    },
    // 取消
    handleCancel() {
      this.dialogVisible = false;
      this.currency = true;
      this.getListPage(this.obj);
    },
    // 新增弹框的保存
    handSeave(fname) {
      //this.$refs[fname].validate(valid => {
        //if (valid) {
          // 展区/交易团
      if (this.checkDemandStatus) {
        this.$message({
          type: "error",
          message: "该申报项目已提交,请勿重复操作.如需修改,请点击列表右侧'编辑'按钮"
        });
      } else if (!this.addForm.demandName) {
        this.$message({
          type: "error",
          message: "请选择申报项目"
        });
      } else if (this.addForm.demandName) {
        if (this.addForm.demandType === "ORDINARY") {
          //console.log(this.addForm.boothNumber);
          if (!this.addForm.boothNumber && this.addForm.boothNumber !== 0) {
            this.$message({
              type: "error",
              message: "请填写申报展位数"
            });
          } else if (!Number.isInteger(this.addForm.boothNumber - 0)) {
            this.$message({
              type: "error",
              message: "申报展位数需是合法字符"
            });
          } else if (Number(this.addForm.boothNumber <= 0)) {
            this.$message({
              type: "error",
              message: "申报展位数必须大于0"
            });
          } else if (Number(this.demandNameObj.inputRule) < Number(this.addForm.boothNumber) && this.checkInputRule) {
            this.$message({
              type: "warning",
              message: "申报展位数不能大于" + this.demandNameObj.inputRule
            });
          } else {
            /*
            for (let key in this.localstora.exhibitionArea) {
              if (
                this.localstora.exhibitionArea[key].exhibitionAreaCode === this.addForm.exhibitionAreaCode
              ) {
                this.addForm[
                  "exhibitionAreaName"
                ] = this.localstora.exhibitionArea[key].exhibitionAreaName;
              }
            }
            */
            //this.addForm["delegationId"] = this.obj.delegationId;
            /*
            for (let key in this.localstora.delegation) {
              if (
                this.localstora.delegation[key].deptId === this.obj.delegationId
              ) {
                this.addForm["delegationName"] = this.localstora.delegation[key].deptName;
                this.addForm["delegationCode"] = this.localstora.delegation[key].deptCode;
              }
            }
            */
            // 专区
            /*
            for (const key in this.optspe) {
              if (this.addForm.specialAreaCode === this.optspe[key].specialAreaCode) {
                this.addForm["specialAreaName"] = this.optspe[key].specialAreaName;
              }
            }
            */
            this.addForm["delegationId"] = this.obj.delegationId;
            // let x = {
            //   demandType: this.addForm.demandType,
            //   delegationId: this.obj.delegationId,
            //   exhibitionPeriod: this.addForm.exhibitionPeriod,
            //   exhibitionArea: this.addForm.exhibitionAreaCode,
            //   specialArea: this.addForm.specialAreaCode
            // };
            //console.log(x, 'x');
            // this.getoneTemplate(x)
            //   .then(res => {
                //console.log(res);
                //this.addForm["demandId"] = res.demandId;
                //this.addForm["boothType"] = res.boothType;
            //this.addForm.demandId = this.addForm.demandName.value;
            //this.addForm.demandName = this.addForm.demandName.label;
            if (this.addForm.checkeda === true) {
              if (this.addForm.attachment === "" || this.addForm.attachment == null) {
                this.$message.error("请上传附件");
              } else {
                this.demandNameObj['attachment'] = this.addForm.attachment;
                this.demandNameObj['boothNumber'] = this.addForm.boothNumber;
                this.demandNameObj['exhibitionAreaCode'] = this.demandNameObj.exhibitionArea;
                this.demandNameObj['specialAreaCode'] = this.demandNameObj.specialArea;
                let fullScreenloading = this.$loading({ fullscreen: true });
                this.addordinaryDemandRecord(this.demandNameObj)
                  .then(resa => {
                    this.dialogVisible = false;
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.$nextTick(() => {
                      fullScreenloading.close();
                    });
                    for (let key in this.addForm) {
                      this.addForm[key] = "";
                    }
                    this.getListPage(this.obj); // 调用初始加载页面方法
                  })
                  .catch(e => {
                    this.$nextTick(() => {
                      fullScreenloading.close();
                    });
                  });
              }
            } else if (this.addForm.checkeda === false || this.addForm.checkeda == null || this.addForm.checkeda === "") {
              if (!this.addForm.attachment) {
                //console.log(this.addForm.attachment);
                this.demandNameObj['boothNumber'] = this.addForm.boothNumber;
                this.demandNameObj['exhibitionAreaCode'] = this.demandNameObj.exhibitionArea;
                this.demandNameObj['specialAreaCode'] = this.demandNameObj.specialArea;
                let fullScreenloading = this.$loading({ fullscreen: true });
                this.addordinaryDemandRecord(this.demandNameObj)
                  .then(resa => {
                    this.dialogVisible = false;
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.$nextTick(() => {
                      fullScreenloading.close();
                    });
                    for (let key in this.addForm) {
                      this.addForm[key] = "";
                    }
                    this.getListPage(this.obj); // 调用初始加载页面方法
                  })
                  .catch(e => {
                    this.$nextTick(() => {
                      fullScreenloading.close();
                    });
                  });
              } else {
                this.$message.error("请勾选后上传附件");
              }
            }
          }
            // })
            // .catch(e => {
            // });
        } else if (this.addForm.demandType === "IRONSPA") {
          if (!this.addForm.companyCecfCode) {
            this.$message({
              type: "error",
              message: "请选择广交会编码"
            });
          } else if (!this.addForm.boothNumberSpa && this.addForm.boothNumberSpa !== 0) {
            this.$message({
              type: "error",
              message: "请填写申报" + this.ironspa + "展位数"
            });
          } else if (!Number.isInteger(this.addForm.boothNumberSpa - 0)) {
            this.$message({
              type: "error",
              message: "申报" + this.ironspa + "展位数需是合法字符"
            });
          } else if (this.addForm.boothNumberSpa < 0 || this.addForm.boothNumberSpa === "00") {
            this.$message({
              type: "error",
              message: "申报" + this.ironspa + "展位数必须大于0"
            });
          } else {
            //delete this.addForm.specialAreaName;
            //delete this.addForm.specialAreaCode;
            // for (let key in this.localstora.exhibitionArea) {
            //   if (
            //     this.localstora.exhibitionArea[key].value === this.addForm.exhibitionAreaCode
            //   ) {
            //     this.addForm[
            //       "exhibitionAreaName"
            //     ] = this.localstora.exhibitionArea[key].text;
            //   }
            // }
            this.addForm["delegationId"] = this.obj.delegationId;
            /*
            for (let key in this.localstora.delegation) {
              if (
                this.localstora.delegation[key].deptName === val.delegationName
              ) {
                this.addForm["delegationName"] = this.localstora.delegation[key].deptName;
                this.addForm["delegationCode"] = this.localstora.delegation[key].deptCode;
              }
            }
            */
            // let x = {
            //   demandType: this.addForm.demandType,
            //   delegationId: this.obj.delegationId,
            //   exhibitionPeriod: this.addForm.exhibitionPeriod,
            //   exhibitionArea: this.addForm.exhibitionAreaCode,
            //   specialArea: this.addForm.specialAreaCode
            // };
            //this.addForm["exhibitionAreaName"] = "铁石水疗";
            // this.getoneTemplate(x)
            //   .then(res => {
                //this.addForm["demandId"] = res.demandId;
                //this.addForm["boothType"] = res.boothType;
            if (this.addForm.checkeda === true) {
              if (this.addForm.attachment === "" || this.addForm.attachment == null) {
                this.$message.error("请上传附件");
              } else {
                this.demandNameObj['attachment'] = this.addForm.attachment;
                this.demandNameObj['boothNumber'] = this.addForm.boothNumberSpa;
                this.demandNameObj['exhibitionAreaCode'] = this.demandNameObj.exhibitionArea;
                this.demandNameObj['specialAreaCode'] = this.demandNameObj.specialArea;
                this.demandNameObj['companyCn'] = this.addForm.companyCn;
                this.demandNameObj['companyCecfCode'] = this.addForm.companyCecfCode;
                let fullScreenloading = this.$loading({ fullscreen: true });
                this.addordinaryDemandRecord(this.demandNameObj)
                  .then(resa => {
                    this.dialogVisible = false;
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.$nextTick(() => {
                      fullScreenloading.close();
                    });
                    for (let key in this.addForm) {
                      this.addForm[key] = "";
                    }
                    this.getListPage(this.obj); // 调用初始加载页面方法
                  })
                  .catch(e => {
                    this.$nextTick(() => {
                      fullScreenloading.close();
                    });
                  });
              }
            } else if (this.addForm.checkeda === false || this.addForm.checkeda == null || this.addForm.checkeda === "") {
              if (!this.addForm.attachment) {
                this.demandNameObj['boothNumber'] = this.addForm.boothNumberSpa;
                this.demandNameObj['exhibitionAreaCode'] = this.demandNameObj.exhibitionArea;
                this.demandNameObj['specialAreaCode'] = this.demandNameObj.specialArea;
                this.demandNameObj['companyCn'] = this.addForm.companyCn;
                this.demandNameObj['companyCecfCode'] = this.addForm.companyCecfCode;
                let fullScreenloading = this.$loading({ fullscreen: true });
                this.addordinaryDemandRecord(this.demandNameObj)
                  .then(resa => {
                    this.dialogVisible = false;
                    this.$message({
                      message: "保存成功",
                      type: "success"
                    });
                    this.$nextTick(() => {
                      fullScreenloading.close();
                    });
                    for (let key in this.addForm) {
                      this.addForm[key] = "";
                    }
                    this.getListPage(this.obj); // 调用初始加载页面方法
                  })
                  .catch(e => {
                    this.$nextTick(() => {
                      fullScreenloading.close();
                    });
                  });
              } else {
                this.$message.error("请勾选后上传附件");
              }
            }
              // })
              // .catch(e => {});
            // this.addordinaryDemandRecord(this.addForm)
            //   .then(res => {
            //     this.dialogVisible = false;
            //     this.$message({
            //       message: "保存成功",
            //       type: "success"
            //     });
            //     this.getListPage(this.obj); // 调用初始加载页面方法
            //   })
            //   .catch(e => {});
          }
        }
      }
        //} else {
         // return false;
        //}
      //});
    },
    // 撤回
    revocation() {},
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
<style>
.demandname label.el-form-item__label::before{
  content: '*';
  color: red;
}
.boothnumber label.el-form-item__label::before{
  content: '*';
  color: red;
}
.companycecfcode label.el-form-item__label::before{
  content: '*';
  color: red;
}
.boothnumberspa label.el-form-item__label::before{
  content: '*';
  color: red;
}
</style>

<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
table, td {
  border-bottom: 1px solid #EBEEF5;
  border-right: 1px solid #EBEEF5;
  border-spacing: 0;
}
td {
  height: 40px;
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
.addstyle {
  margin: 20px 0;
}
.wid {
  width: 406px;
}
.divp {
  margin: 20px 50px;
  text-align: center;
}
.formStyle {
  padding: 8px 30px;
}
.impfloat {
  margin-left: 10px;
  display: inline-block;
}
</style>
