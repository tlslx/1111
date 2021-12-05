<template>
  <el-tabs v-model="activeName">
  <!--  <el-tab-pane label="交易团设置一般性展位数量安排" name="first"> -->
    <el-tab-pane label="交易团提交一般性展位数量安排" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" size="small" :model="formData">
          <el-form-item label="企业中文名称">
            <el-input v-model="formData.companyName" clearable class="widtwo"></el-input>
          </el-form-item>
          <el-form-item label="商会">
            <el-select v-model="formData.coceralId" class="widtwo" clearable>
              <el-option
                v-for="(item, index) in localstora.businessAssociation"
                :key="index"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
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
          <el-form-item label="广交会编码">
            <el-input v-model="formData.cecfCode" clearable class="widtwo"></el-input>
            <!-- <el-select v-model="formData.cecfCode" class="widtwo" clearable>
              <el-option v-for="(item, index) in optioncode" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select> -->
          </el-form-item>
          <el-form-item label="布展类型">
            <el-select v-model="formData.exhibitionTypes" clearable>
              <el-option label="绿色特装" value="SPECIAL_BOOTH"></el-option>
              <el-option label="标摊" value="STANDARD_BOOTH"></el-option>
              <el-option label="统一布展" value="UNIFICATION_BOOTH"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分团">
            <el-select v-model="formData.delegationSubId" clearable>
              <el-option v-for="(item, index) in optionsub" :key="index" :label="item.deptName" :value="item.deptId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否品牌企业">
            <el-select v-model="formData.isBrandCompany" class="widtwo" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="安排情况">
            <el-select v-model="formData.schedulePlan" class="widtwo" clearable>
              <el-option label="已安排" value="1"></el-option>
              <el-option label="未安排" value="0"></el-option>
            </el-select>
          </el-form-item>
          <!--
          <el-form-item label="提交状态">
            <el-select v-model="formData.isSubmit" class="widtwo" clearable>
              <el-option label="已提交" value="1"></el-option>
              <el-option label="未提交" value="0"></el-option>
            </el-select>
          </el-form-item>
          -->
          <!-- <el-form-item label="城市" prop="city">
            <el-autocomplete class="widtwo" placeholder="请输入" v-model.trim="formData.city" :fetch-suggestions="querySearch" @select="handleSelectCity" clearable></el-autocomplete>
          </el-form-item> -->
          <el-form-item label="城市" prop="city">
            <el-select
              size="small"
              filterable
              clearable
              v-model="formData.city"
              placeholder="请输入"
              remote
              :remote-method="newonchangeDate"
            >
              <el-option
                v-for="selectItem in dictionary['city']"
                :key="selectItem.code"
                :label="selectItem.label"
                :value="selectItem.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle floatlaf" type="primary" @click="onSearch">查询</el-button>
            <el-button class="formStyle floatlaf" type="primary" @click="isUp = true; fileForm.chooseFileName = '';">导入</el-button>
            <!-- <el-upload
              class="impfloat flotle"
              action=""
              :limit="1"
              :http-request="uploadFileMethod">
              <el-button class="formStyle" type="primary">导入</el-button>
            </el-upload> -->
          </el-form-item>
        </el-form>
        <!-- 下载模板 -->
        <el-dialog title="上传" :visible.sync="isUp" v-if="isUp" width="650px">
          <el-form :model="fileForm" ref="fileForm" :rules="fileRule" size="small">
            <el-form-item label="文件选择：" prop="chooseFileName">
              <el-upload ref="upload" action="" accept=".xls, .xlsx" :http-request="handleUploadFile" :on-change="handleChange" :auto-upload="false" :show-file-list="false">
                <el-input placeholder="请选择文件" v-model="fileForm.chooseFileName" readonly></el-input>
                <div slot="tip" class="el-upload__tip">只能上传 xls / xlsx 文件，且不超过10M</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="模板下载：">
              <span @click="handleDownloadFile" class="clic">模板文件点击下载</span>
            </el-form-item>
          </el-form>
          <div class="total-footer">
            <el-button type="primary" size="medium" @click="toUpload('fileForm')">上传</el-button>
            <el-button size="medium" @click="isUp = false;">取消</el-button>
          </div>
        </el-dialog>
        <el-dialog title="请稍等" :visible.sync="progressVisible" v-if="progressVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <div class="total-footer">
            <el-progress :text-inside="true" :stroke-width="14" :percentage="percent" :color="colorArray"></el-progress>
          </div>
        </el-dialog>
        <!-- 表格 -->
        <el-table :data="tableData" size="small" style="width: 100%" border v-loading="loading">
          <!--<el-table-column type="selection" width="55"  :selectable="isSelectable"></el-table-column>-->
          <el-table-column align="center" label="广交会编码" min-width="120" prop="cecfCode"></el-table-column>
          <el-table-column align="center" label="企业中文名称" min-width="120" prop="companyName"></el-table-column>
          <el-table-column align="center" label="期数" min-width="120" prop="exhibitionPeriod">
            <template slot-scope="scope">
              {{scope.row.exhibitionPeriod | exhiPer}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="展区" min-width="120" prop="exhibitionAreaName"></el-table-column>
          <el-table-column align="center" label="申请数量" min-width="120" prop="boothNumber"></el-table-column>
          <el-table-column align="center" label="申请布展类型" min-width="120" prop="exhibitionType">
            <template slot-scope="scope">
              {{scope.row.exhibitionType | status}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="是否统一布展" min-width="120" prop="isUnified">
            <template slot-scope="scope">
              {{scope.row.exhibitionType === "UNIFICATION_BOOTH" ? "是" : "否"}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="产品类别" min-width="120" prop="productType">
            <template slot-scope="scope">
              <div v-if="scope.row.pooraDisab">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="productType">
                    <el-select v-model="editform.productType" clearable>
                      <el-option v-for="item in optionPoor" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.productType}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="所属贫困县" min-width="120" prop="poorArea">
            <template slot-scope="scope">
              <div v-if="scope.row.pooraDisab">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="poorArea">
                    <el-select v-model="editform.poorArea" clearable>
                      <el-option label="西岐" value="西岐"></el-option>
                      <el-option label="朝歌" value="朝歌"></el-option>
                      <el-option label="斟鄩" value="斟鄩"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.poorArea}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="上届安排特装数" min-width="120" prop="lastSpecialNumber"></el-table-column>
          <el-table-column align="center" label="特装推荐数" min-width="120" prop="recommendSpecial">
            <template slot-scope="scope">
              <div v-if="scope.row.tzShow">
                <el-form :model="editform" :rules="editrule" ref="recommendSpecial" label-width="0px">
                  <el-form-item prop="recommendSpecial">
                    <el-input v-model.trim="editform.recommendSpecial"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.recommendSpecial}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="标摊推荐数" min-width="120" prop="recommendStandard">
            <template slot-scope="scope">
              <div v-if="scope.row.btShow">
                <el-form :model="editform" :rules="editrule" ref="recommendStandard" label-width="0px">
                  <el-form-item prop="recommendStandard">
                    <el-input v-model.trim="editform.recommendStandard"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.recommendStandard}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="统一布展推荐数" min-width="120" prop="recommendUnified">
            <template slot-scope="scope">
              <div v-if="scope.row.tyShow">
                <el-form :model="editform" :rules="editrule" ref="recommendUnified" label-width="0px">
                  <el-form-item prop="recommendUnified">
                    <el-input v-model.trim="editform.recommendUnified"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.recommendUnified}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="一般性展位安排总数" min-width="120" prop="recommendSumNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.tyShow">
                <el-form :model="editform" disabled :rules="editrule" ref="editref" label-width="0px">
                    <el-form-item prop="recommendSumNumber">
                      <el-input v-model.trim="editform.recommendSumNumber"></el-input>
                    </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.recommendSumNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="中央通道推荐数" min-width="120" prop="recommendCentralchannel">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="editform" :rules="editrule" ref="recommendCentralchannel" label-width="0px">
                  <el-form-item prop="recommendCentralchannel">
                    <el-input v-model.trim="editform.recommendCentralchannel"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.recommendCentralchannel}}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易团推荐粘连数" min-width="120" prop="applyAdjoinNumber">
            <template slot-scope="scope">
              <div v-if="Number(scope.row.applyAdjoinNumber) !== 0 || scope.row.numaDisa">
                <div v-if="scope.row.numaDisa">
                  <el-form :model="editform" :rules="editrule" ref="applyAdjoinNumber" label-width="0px">
                    <el-form-item prop="applyAdjoinNumber">
                      <el-input v-model.trim="editform.applyAdjoinNumber" :disabled="scope.row.brandAdhesionResult === '1' || scope.row.brandAdhesionResult === '2' || ((timeData.currentTime < timeData.startTime || timeData.currentTime > timeData.endTime) && (timeData.startTime !== 0 && timeData.endTime !== 0)) || !(timeData.startTime === 0 && timeData.endTime === 0 && scope.row.brandAdhesionResult === '0')"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <span v-if="!scope.row.numaDisa">{{scope.row.applyAdjoinNumber}}</span>
              </div>
              <div v-if="!Number(scope.row.applyAdjoinNumber)"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商会审核粘连结果" min-width="120" prop="brandAdhesionResult">
            <template slot-scope="scope">
              {{scope.row.brandAdhesionResult | coceralStatus}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="商会审核通过粘连数" min-width="120" prop="adhesionNumberResult">
            <template slot-scope="scope">
              <div v-if="Number(scope.row.adhesionNumberResult)">
                {{ scope.row.adhesionNumberResult }}
              </div>
              <div v-if="!Number(scope.row.adhesionNumberResult)"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="商会意见" min-width="120" prop="coceralOpinion">
            <template slot-scope="scope">
              {{ scope.row.coceralOpinion | coceralStatus }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="城市" min-width="120" prop="city"></el-table-column>
          <el-table-column align="center" label="安排情况" min-width="120" prop="schedulePlan">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="schedulePlan">
                    <el-select disabled v-model="editform.schedulePlan" clearable>
                      <el-option label="已安排" value="1"></el-option>
                      <el-option label="未安排" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>
                {{scope.row.schedulePlan | planStatus}}
              </span>
            </template>
          </el-table-column>
          <!--
          <el-table-column align="center" label="提交状态" min-width="120" prop="isSubmit">
            <template slot-scope="scope">
              {{ scope.row.isSubmit | submitFilter }}
            </template>
          </el-table-column>
          -->
          <el-table-column align="center" label="操作" fixed="right" width="160">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="!scope.row.edit"
                @click="onEdit(scope.row, scope.$index)"
              >编辑</el-button>
              <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'editref')">保存</el-button>
              <!-- <el-button type="text" @click="onDele(scope.row)">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" size="small" class="formStyle" @click="hanDownload">下载</el-button>
          <el-button type="primary" size="small" class="formStyle" @click="handSubmit">提交</el-button>
          <span style="color: red; margin-left: 20px; font-size: 16px;">请注意：&nbsp;"导入"&nbsp;或&nbsp;"编辑"&nbsp;操作完成后，须点击&nbsp;"提交"&nbsp;按钮，安排方案才生效。</span>
          <!-- <el-button type="primary" size="small" class="formStyle" @click="isExhibit = true">新增</el-button> -->
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
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import axios from 'axios';
// const url = process.env.API_NA_URL;
export default {
  data() {
    let tynum = (rule, value, callback) => {
     // if (!value && value !== 0) {
        //return callback(new Error("该字段为必填项"));
      //} else
      if (!Number.isInteger(value - 0)) {
        return callback(new Error("请输入合法字符"));
      } else if (Number(value) < 0) {
        return callback(new Error("必须大于等于0"));
      } else {
        this.editform.recommendSumNumber = Number(this.editform.recommendSpecial) + Number(this.editform.recommendStandard) + Number(this.editform.recommendUnified);
        return callback();
      }
    };
    return {
      obj: {
        current: 1,
        size: 10,
        delegationId: "010"
      },
      list: [], //获取城市
      dictionary: {
        city: []
      },
      // 需要校验的项
      rulesList: ['applyAdjoinNumber', 'recommendSpecial', 'recommendStandard', 'recommendUnified', 'recommendCentralchannel'],
      // 导入进度条
      progressVisible: false,
      percent: 0,
      colorArray: [
        { color: '#f56c6c', percentage: 20 },
        { color: '#e6a23c', percentage: 40 },
        { color: '#5cb87a', percentage: 60 },
        { color: '#1989fa', percentage: 80 },
        { color: '#6f7ad3', percentage: 100 }
      ],
      loading: false,
      isUp: false,
      // 开放期间时间
      timeData: {
        startTime: '',
        endTime: '',
        currentTime: ''
      },
      fileForm: {
        chooseFileName: ""
      },
      fileRule: {
        chooseFileName: [{ required: true, message: "请选择文件", trigger: "change" }]
      },
      // url: process.env.API_NA_URL,
      objcompany: {
        delegationId: "010" // 北京
      },
      restaurant: [],
      productType: "", // 布展类型
      formData: {
        // isSubmit: '',
        companyName: "",
        coceralId: "",
        exhibitionArea: "",
        isCoceralVip: "",
        cecfCode: "",
        exhibitionTypes: "", // 布展类型
        delegationSubId: "",
        isBrandCompany: "",
        schedulePlan: "",
        city: ""
      },
      optioncode: [],
      tableData: [],
      isExhibit: false,
      dxjxdisable: false,
      pooraDisab: false, // 编辑时是否出现下拉框（贫困地区）
      numaDisa: false, // 编辑时是否出现输入框（粘连数量）
      tyShow: false, // 统一布展推荐数的判断
      btShow: false, // 标摊推荐数的判断
      tzShow: false, // 特装推荐数的判断
      optionPoor: [], // 产品类别
      numShot: 0, // 黑名单参展减少量
      isBrandc: "0", // 是否品牌企业
      isPass: false, // 是否是黑名单企业
      addForm: {
        applyAdjoinNumber: "",
        // adhesionNumberResult: "",
        brandAdhesionResult: "",
        companyName: "",
        companyId: "",
        companyCecfCode: "",
        coceralOpinion: "",
        exhibitionAreaName: "",
        exhibitionAreaCode: "",
        //examineAdjoinNumber: "",
        isCoceralVip: "",
        recommendStandard: "",
        recommendSpecial: "",
        recommendCentralchannel: "",
        productType: "",
        poorArea: "",
        schedulePlan: ""
      },
      // 通用数据
      addtForm: {
        recommendSpecial: "",
        recommendStandard: "",
        recommendUnified: "",
        recommendCentralchannel: ""
      },
      editform: {
        productType: "",
        poorArea: "",
        applyAdjoinNumber: "",
        //examineAdjoinNumber: "",
        recommendSpecial: "",
        recommendStandard: "",
        recommendUnified: "",
        recommendCentralchannel: "",
        recommendSumNumber: "",
        exhibitionAreaCode: ""
      },
     // recommendSumNumber: Number(editform.recommendSpecial) + Number(editform.recommendStandard) + Number(editform.recommendUnified),
      zlform: { applyAdjoinNumber: "" },
      zlrule: {
        applyAdjoinNumber: [{ validator: tynum, required: true, trigger: "blur" }]
      },
      poorform: {
        productType: "",
        poorArea: ""
      },
      poorule: {
        productType: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        poorArea: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      companyData: [], // 公司字典
      exhibitData: [], // 展区字典
      // 编辑规则
      editrule: {
        productType: [{ required: true, message: "该字段为必填项", trigger: "change" }],
        poorArea: [{ required: true, message: "该字段为必填项", trigger: "change" }],
        applyAdjoinNumber: [{ validator: tynum, required: true, trigger: "blur" }],
        //examineAdjoinNumber: [{ validator: tynum, required: true, trigger: "blur" }],
        recommendSpecial: [{ validator: tynum, required: true, trigger: "blur" }],
        recommendStandard: [{ validator: tynum, required: true, trigger: "blur" }],
        recommendUnified: [{ validator: tynum, required: true, trigger: "blur" }],
        recommendCentralchannel: [{ validator: tynum, required: true, trigger: "blur" }]
      },
      zldisabl: true,
      pkdisabl: true,
      cancelAdd: false,
      tybzdisable: false,
      chnace: {},
      lastIndexPage: "",
      lastSetedit: "",
      lastPooedit: "",
      localstora: {
        exhibitionArea: [],
        businessAssociation: [], // 商协会
        citys: [] //城市
      },
      optionsub: [], // 分团数据
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      submitStatus: '', // 提交状态
      paramd: {},
      activeName: "first",
      multipleSelection: [] //选框数据
    };
  },
  filters: {
    status(val) {
      if (val === "SPECIAL_BOOTH") {
        return "绿色特装";
      } else if (val === "UNIFICATION_BOOTH") {
        return "统一布展";
      } else if (val === "STANDARD_BOOTH") {
        return "标摊";
      } else if (val === "CENTER_CHANNEL_BOOTH") {
        return "中央通道";
      }
    },
    exhiPer(val) {
      let value = val - 0;
      if (value === 1) {
        return "第一期";
      } else if (value === 2) {
        return "第二期";
      } else if (value === 3) {
        return "第三期";
      }
    },
    ynStatus(val) {
      if (val === "1") {
        return "是";
      } else if (val === "0") {
        return "否";
      }
    },
    planStatus(value) {
      let val = Number(value);
      if (val === 1) {
        return "已安排";
      } else if (val === 0) {
        return "未安排";
      }
    },
    submitFilter(value) {
      let val = Number(value);
      if (val === 1) {
        return "已提交";
      } else if (val === 0) {
        return "未提交";
      }
    },
    coceralStatus(value) {
      let val = Number(value);
      if (val === 1) {
        return "审核通过";
      } else if (val === 0) {
        return "未审核";
      } else if (val === 2) {
        return "审核不通过";
      }
    }
  },
  created() {
    if (this.$store.getters.userInfo.org.deptId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
      this.objcompany.delegationId = this.$store.getters.userInfo.org.deptId;
    }
    this.getlistAllCompanyDemand(this.objcompany).then(res => {
      this.companyData = res;
    }).catch(e => {});
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 商协会
    this.getassociationDepartment().then(res => {
      this.localstora.businessAssociation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    //获取交易团下分团的数据
    this.getsysDepartment({
      deptType: "30",
      parentId: this.$store.getters.userInfo.org.deptId
    }).then(res => {
      this.optionsub = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.getProvinceDate().then((res) => {
      this.restaurant = [];
     // let newDate = JSON.parse(JSON.stringify(res));
      let options = JSON.parse(JSON.stringify(res));
      //console.log(options, 'options');
      for (let key in options) {
        let data = {};
        data.value = options[key];
        data.label = key;
        this.restaurant.push(data);
      }
      //console.log(this.restaurant, 'restaurant');
    });
    // 城市
    this.getProvinceDate().then((res) => {
      let newDate = JSON.parse(JSON.stringify(res));
      let tempDate = [];
      for (let key in newDate) {
        let temp = {};
        temp.label = newDate[key];
        temp.value = key;
        tempDate.push(temp);
      }
      this.list = tempDate;
    });
  },
  mounted() {
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    // 是否粘连功能开放期间
    this.getTime();
    this.getListPage(this.obj);
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"]),
    // ...mapGetters("subpanelGeneralArrangement", ["getRec"]),
    num() {
      let add = Number(this.addForm.recommendSpecial) + Number(this.addForm.recommendStandard) + Number(this.addForm.recommendUnified) + Number(this.addForm.recommendCentralchannel);
      return add;
    },
    addnum() {
      let add = Number(this.addtForm.recommendSpecial) + Number(this.addtForm.recommendStandard) + Number(this.addtForm.recommendUnified) + Number(this.addtForm.recommendCentralchannel);
      return add;
    }
  },
  methods: {
    ...mapActions("subpanelGeneralArrangement", [
      "getlistRecommendCompanyjyt", // 查询交易团设置的一般性展位安排
      "getlistAllCompany", // 交易团根据企业名和展区查询企业一般性展位申请数据
      "getlistLastNumber", // 交易团新增获取上届数据
      "getrecommendCompany", // 交易团提交一般性展位数量安排时，获取分团提交的安排
      "addrecommendCompany", // 交易团新增设置的一般性展位安排
      "updaterecommendCompany", // 交易团编辑设置的一般性展位安排
      "getadjoinRecommendCompany", // 交易团/分团设置粘连性
      "getpoorRecommendCompany", // 交易团/分团设置贫困地区
      "deletebyIdRecommendCompany", // 交易团删除设置的一般性展位安排
      "getlistAllExhibitionArea", // 一般性展位安排展区名查询 0
      "getlistAllCompanyDemand", // 一般性展位安排企业名查询 0
      "uploadordinaryRecommendCompany", // 上传
      "getlistAllProduct", // 产品类别
      "getsysDepartment" // 分团 固定 deptType = 30;
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment", // 交易团
      "getassociationDepartment", // 商协会
      "getsubCluster", // 获取交易团下分团的数据
      "getblackInfo" // 获取企业黑名单信息
    ]),
    ...mapActions("quantitativeArrangement", [
      'getProvinceDate' //展区城市信息
    ]),
    // 提交按钮是否禁用
    handleDisabled() {
      if (this.submitStatus === '1') {
        return true;
      } else if (this.submitStatus === '0') {
        return false;
      }
    },
    // 获取时间
    getTime() {
      this.$http.get(`${process.env.API_NA_URL}/api/speciaAreaExternal/time/get`, { subKey: 'ADHESION_BOOTH_APPLICATION', orald: this.$store.getters.userInfo.org.deptId }).then(res => {
        let startTime = res.startTime === '0000/00/00' ? 0 : new Date(res.startTime).getTime();
        this.timeData.startTime = startTime;
        let endTime = res.endTime === '0000/00/00' ? 0 : new Date(res.endTime).getTime();
        this.timeData.endTime = endTime === 0 ? endTime : (endTime + 24 * 60 * 60 * 1000 - 1);
        this.timeData.currentTime = new Date().getTime();
      }).catch(e => {});
    },
    // 获取页面数据
    getListPage(Url) {
      this.loading = true;
      this.getlistRecommendCompanyjyt(Url)
        .then(res => {
          this.loading = false;
          // this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          for (let i = 0; i < getTable.length; i++) {
            if (getTable[i]["recommendSpecial"] === '0') {
              getTable[i]["recommendSpecial"] = "";
            }
            if (getTable[i]["recommendStandard"] === '0') {
              getTable[i]["recommendStandard"] = "";
            }
            if (getTable[i]["recommendUnified"] === '0') {
              getTable[i]["recommendUnified"] = "";
            }
            if (getTable[i]["recommendSumNumber"] === 0) {
              getTable[i]["recommendSumNumber"] = "";
            }
            if (getTable[i]["recommendCentralchannel"] === '0') {
              getTable[i]["recommendCentralchannel"] = "";
            }
           // if (getTable[i]["examineAdjoinNumber"] === 0) {
           //   getTable[i]["examineAdjoinNumber"] = "";
           // }
            getTable[i]["edit"] = false;
            getTable[i]["pooraDisab"] = false;
            getTable[i]["numaDisa"] = false;
            getTable[i]["tyShow"] = false;
            getTable[i]["btShow"] = false;
            getTable[i]["tzShow"] = false;
            let aopt = {
              label: getTable[i].cecfCode,
              value: getTable[i].cecfCode
            };
            this.optioncode.push(aopt);
          }
          let hash = {};
          this.optioncode = this.optioncode.reduce(function(item, next) {
            hash[next.value] ? '' : hash[next.value] = true && item.push(next);
            return item;
          }, []);
          for (let i = 0; i < this.optioncode.length; i++) {
            if (this.optioncode[i].value === "") {
              this.optioncode.splice(i, 1);
            }
          }
          this.tableData = getTable;

          // 提交状态
          this.$http.get(`${process.env.API_NA_URL}/api/ordinaryRecommendCompany/getSubmit`, { delegationId: this.$store.getters.userInfo.org.deptId, operationType: 'IS_SUBMITTED' }).then(resp => {
            this.submitStatus = resp;
          }).catch(e => {});
          // console.log(this.tableData, 'tableData');
        })
        .catch(e => {
          this.loading = false;
        });
    },
    //联想城市
    newonchangeDate(val) {
      if (val !== '') {
        setTimeout(() => {
          this.dictionary.city = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(val.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.dictionary.city = [];
      }
    },
    // 企业可选建议搜索
    /*
    querySearch(queryString, cb) {
      let restaurant = this.restaurant;
      let results = queryString ? restaurant.filter(this.createFilte(queryString)) : restaurant;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    // 企业调用的方法
    createFilte(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) > -1);//实现模糊查询
      };
    },
    */
   /*
    //选中城市选项
    handleSelectCity(item) {
      this.formData.city = item.label;
    },
    */
    // 查询
    onSearch() {
      this.loading = true;
      this.obj = {
        current: "1",
        size: "10",
        delegationId: "010"
      };
      if (this.$store.getters.userInfo.org.deptId) {
        this.obj.delegationId = this.$store.getters.userInfo.org.deptId;
      }
      // if (this.productType !== "") {
      //   this.formData.exhibitionTypes = this.productType.split(",");
      // } else {
      //   this.formData.exhibitionTypes = "";
      // }
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
      }
      this.dictionary.city = [];
      this.getTime();
      this.getListPage(this.obj);
    },
    // 下载
    hanDownload() {
      let url = this.paginationData.currentPage + "&size=" + this.paginationData.total + "&cecfCode=" + this.formData.cecfCode + "&delegationId=" + this.obj.delegationId + "&exhibitionArea=" + this.formData.exhibitionArea + "&companyName=" + this.formData.companyName + "&coceralId=" + this.formData.coceralId + "&isCoceralVip=" + this.formData.isCoceralVip + "&exhibitionType=" + this.formData.exhibitionType + "&delegationSubId=" + this.formData.delegationSubId + "&isBrandCompany=" + this.formData.isBrandCompany + "&schedulePlan=" + this.formData.schedulePlan + "&token=" + localStorage.getItem("USER_TOKEN");
      url = url.replace(/undefined/g, "");
      window.open(process.env.API_NA_URL + "/api/ordinaryRecommendCompany/module/download?current=" + url, "_parent");
      // window.open(process.env.API_NA_URL + "/api/ordinaryRecommendCompany/delegation/download?current=" + url, "_parent");
    },
    // 导入（上传）
    // uploadFileMethod(param) {
    //   let fileObject = param.file;
    //   let formData = new FormData();
    //   formData.append("file", fileObject);
    //   this.uploadordinaryRecommendCompany(formData).then(res => {
    //     this.$message({
    //       type: "success",
    //       message: "导入成功"
    //     });
    //   }).catch(e => {});
    // },
    // http
    handleUploadFile(param) {
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.percent = 0;
      let timer = null;
      let timers = null;
      let formData = new FormData();
      formData.append('file', param.file);
      formData.append('delegationId', this.$store.getters.userInfo.org.deptId);
      formData.append('delegationCode', this.$store.getters.userInfo.org.deptCode);
      let inTime = '';
      if ((this.timeData.currentTime > this.timeData.startTime && this.timeData.currentTime < this.timeData.endTime) || (this.timeData.startTime === 0 && this.timeData.endTime === 0)) {
        inTime = '1';
      } else {
        inTime = '0';
      }
      formData.append('inTime', inTime);
      // jcrao 2019.7.3 添加进度条
      const http = axios.create({
        baseURL: process.env.API_NA_URL
      });
      let t = 1;
      new Promise((resolve, reject) => {
        http({
          method: 'POST',
          url: `${process.env.API_NA_URL}/api/ordinaryRecommendCompany/upload?token=${localStorage.getItem('USER_TOKEN')}`,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data"
          },
          onUploadProgress: val => {
            let complete = (val.loaded / val.total) * 100 - 80 || 0;
            this.percent = complete;
            clearTimeout(timer);
            let _this = this;
            timer = setTimeout(function go() {
              t++;
              _this.percent += Math.floor(Math.random() * 10 + 1);
              if (_this.percent > 90) {
                _this.percent = 90;
                clearTimeout(timer);
              } else {
                timer = setTimeout(go, t * 500);
              }
            }, t * 500);
            // for (let i = complete, t = 1; i < 100; i += Math.floor(Math.random() * 10 + 1)) {
            //   setOut = setTimeout(() => {
            //     this.percent = i;
            //   }, t * 500);
            //   t++;
            // }
          }
        }).then(res => {
          clearTimeout(timer);
          let data = res.data === undefined ? res : res.data;
          if (data.flag === '1') {
            let _this = this;
            clearTimeout(timers);
            timers = setTimeout(function gos() {
              t++;
              _this.percent += Math.floor(Math.random() * 10 + 1);
              if (_this.percent > 100) {
                _this.percent = 100;
                clearTimeout(timers);
                _this.$nextTick(() => {
                  fullScreenloading.close();
                });
                if (data.data === 'YES') {
                  _this.$confirm('操作成功，您的安排方案已更新。', '提示', {
                    confirmButtonText: '确定',
                    showCancelButton: false,
                    type: 'success'
                  });
                } else if (data.data === 'NO') {
                  _this.$confirm('操作成功，请点击左下方“提交”按钮，提交方案。', '提示', {
                    confirmButtonText: '继续',
                    showCancelButton: false,
                    type: 'success'
                  });
                }
                _this.progressVisible = false;
                _this.isUp = false;
                _this.percent = 0;
                _this.getListPage(_this.obj);
              } else {
                timers = setTimeout(gos, t * 100);
              }
            }, t * 100);
          } else {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.$message.error(data.message);
            this.progressVisible = false;
            this.fileForm.chooseFileName = '';
            this.percent = 0;
            this.$refs.upload.clearFiles();
          }
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          clearTimeout(timer);
          this.$message.error(e.message);
          this.progressVisible = false;
          this.fileForm.chooseFileName = '';
          this.percent = 0;
          this.$refs.upload.clearFiles();
        });
      });
      // this.uploadordinaryRecommendCompany(formData).then(res => {
      //   // this.$nextTick(() => {
      //   //   fullScreenloading.close();
      //   // });
      //   if (res === 'YES') {
      //     this.$confirm('操作成功，您的安排方案已更新。', '提示', {
      //       confirmButtonText: '确定',
      //       showCancelButton: false,
      //       type: 'success'
      //     });
      //   } else if (res === 'NO') {
      //     this.$confirm('操作成功，请点击左下方“提交”按钮，提交方案。', '提示', {
      //       confirmButtonText: '继续',
      //       showCancelButton: false,
      //       type: 'success'
      //     });
      //   }
      //   this.getListPage(this.obj);
      //   this.isUp = false;
      // }).catch(e => {
      //   // this.$nextTick(() => {
      //   //   fullScreenloading.close();
      //   // });
      //   this.fileForm.chooseFileName = '';
      //   this.$refs.upload.clearFiles();
      // });
    },
    // 文件改变
    handleChange(file, fileList) {
      this.fileForm.chooseFileName = file.name;
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = testmsg === 'xls';
      const extension2 = testmsg === 'xlsx';
      const isLt2M = file.size / 1024 / 1024 < 10;    //这里做文件大小限制
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
        this.fileForm.chooseFileName = '';
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
        this.fileForm.chooseFileName = '';
      }
    },
    // 上传
    toUpload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.progressVisible = true;
          this.$refs.upload.submit();
        }
      });
    },
    // 模板下载
    handleDownloadFile() {
      let url = this.paginationData.currentPage + "&size=" + this.paginationData.total + "&cecfCode=" + this.formData.cecfCode + "&delegationId=" + this.obj.delegationId + "&exhibitionArea=" + this.formData.exhibitionArea + "&companyName=" + this.formData.companyName + "&coceralId=" + this.formData.coceralId + "&isCoceralVip=" + this.formData.isCoceralVip + "&exhibitionType=" + this.formData.exhibitionType + "&delegationSubId=" + this.formData.delegationSubId + "&isBrandCompany=" + this.formData.isBrandCompany + "&schedulePlan=" + this.formData.schedulePlan + "&token=" + localStorage.getItem("USER_TOKEN");
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/ordinaryRecommendCompany/module/download?current=` + url, '_blank');
    },
    //选择提交
    // handleSelectionChange(val) {
    //   val.forEach(el => {
    //     //let data = {
    //     //  'recommendId': el.recommendId
    //     //};
    //     this.multipleSelection.push(el.recommendId);
    //   });
    //   // console.log(this.multipleSelection);
    // },
    //判断是否可选
    // isSelectable(row, index) { //1是已提交不可选,0是未提交可选
    //   //if (row.isSubmit === '1') {
    //   //  return false;
    //   //} else {
    //   return true;
    //   //}
    // },
    // 提交
    handSubmit() {
      // if (this.multipleSelection.length > 0) {
      this.fullLoading = true;
      this.loading = true;
      this.$http.postJson(`${process.env.API_NA_URL}/api/ordinaryRecommendCompany/submit`, `${this.$store.getters.userInfo.org.deptId}`).then(res => {
        this.fullLoading = false;
        // this.multipleSelection = [];
        this.$message.success('提交成功');
        this.getListPage(this.obj);
      }).catch(e => {
        fullScreenloading.close();
        this.loading = false;
      });
      // } else {
      //   this.$message.warning('请至少勾选一项');
      // }
    },
    // 编辑
    onEdit(val, valId) {
      let datan = {
        delegationId: val.delegationId,
        companyId: val.companyId,
        exhibitionAreaCode: val.exhibitionArea
      };
      // 企业黑名单信息
      let blackInfo = {
        companyId: val.companyId,
        exhibitionAreaCode: val.exhibitionArea
      };
      let noParr = ["106", "111", "112", "116", "120", "121", "122", "123"];
      let ynParr = ["109", "110", "117", "118", "119"];
      let a = 0;
      let b = 0;
      this.getblackInfo(blackInfo).then(resc => {
        if (resc.isBlack === "0") {
          this.isPass = true;
          // 交易团提交一般性展位数量安排时，获取分团提交的安排
          this.getrecommendCompany(datan).then(resa => {
            if (resa === "0") {
              this.$message({
                type: "error",
                message: "该企业该展区分团已经提交了推荐方案，需进行审核"
              });
              this.$router.push({ path: '/ftjytAuditSubgroup' });
            } else {
              this.editrule.productType[0].required = false;
              this.editrule.poorArea[0].required = false;
             // this.editrule.examineAdjoinNumber[0].required = false;
              this.editrule.applyAdjoinNumber[0].required = false;
              if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
                this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                this.editform.recommendSpecial = val.recommendSpecial;
                this.editform.recommendStandard = val.recommendStandard;
                this.editform.recommendUnified = val.recommendUnified;
                this.editform.recommendCentralchannel = val.recommendCentralchannel;
                this.editform.recommendSumNumber = val.recommendSumNumber;
                this.editform.isCoceralVip = val.isCoceralVip;
                this.editform.schedulePlan = val.schedulePlan;
                this.editform["recommendId"] = val.recommendId;
                if (val.exhibitionArea === "LD01") {
                  // this.pooraDisab = true;
                  this.tableData[valId]["pooraDisab"] = true;
                  this.editform.productType = val.productType;
                  this.editform.poorArea = val.poorArea;
                  this.editrule.productType[0].required = true;
                  this.editrule.poorArea[0].required = true;
                } else {
                  // this.pooraDisab = false;
                  this.tableData[valId]["pooraDisab"] = false;
                  this.editrule.productType[0].required = false;
                  this.editrule.poorArea[0].required = false;
                }
                let parmc = {
                  companyId: val.companyId,
                  exhibitionAreaCode: val.exhibitionArea
                };
                // 交易团/分团设置粘连性
                this.getadjoinRecommendCompany(parmc).then(res => {
                  if (res === "exist") {
                    //this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                    this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                    //this.editrule.examineAdjoinNumber[0].required = true;
                    this.editrule.applyAdjoinNumber[0].required = true;
                    // this.numaDisa = true;
                    this.tableData[valId]["numaDisa"] = true;
                    this.isBrandc = "1";
                  } else {
                    //delete this.editform.examineAdjoinNumber;
                    //delete this.editform.applyAdjoinNumber;
                    // this.numaDisa = false;
                    this.tableData[valId]["numaDisa"] = false;
                    this.isBrandc = "0";
                   // this.editrule.examineAdjoinNumber[0].required = false;
                    this.editrule.applyAdjoinNumber[0].required = false;
                  }
                }).catch(e => {});
                // 产品类别
                let typecp = {
                  companyId: val.companyId,
                  delegationId: this.$store.getters.userInfo.org.deptId,
                  exhibitionAreaCode: val.exhibitionArea
                };
                this.getlistAllProduct(typecp).then(res => {
                  this.optionPoor = JSON.parse(JSON.stringify(res));
                });
                // 统一布展展区
                if (val.exhibitionArea === "MA02") {
                  // this.tyShow = true;
                  // this.btShow = false;
                  // this.tzShow = false;
                  this.tableData[valId]["tyShow"] = true;
                  this.tableData[valId]["btShow"] = false;
                  this.tableData[valId]["tzShow"] = false;
                  this.tableData[valId]["edit"] = true;
                  this.editrule.recommendUnified[0].required = true;
                  this.editrule.recommendSpecial[0].required = false;
                  this.editrule.recommendStandard[0].required = false;
                  this.editrule.recommendCentralchannel[0].required = false;
                } else if (val.exhibitionArea === "MA07" || val.exhibitionArea === "MA08" || val.exhibitionArea === "VS04" || val.exhibitionArea === "HD06") {
                  // this.tyShow = true;
                  // this.btShow = false;
                  // this.tzShow = true;
                  this.tableData[valId]["tyShow"] = true;
                  this.tableData[valId]["btShow"] = false;
                  this.tableData[valId]["tzShow"] = true;
                  this.tableData[valId]["edit"] = true;
                  this.editrule.recommendUnified[0].required = true;
                  this.editrule.recommendSpecial[0].required = true;
                  this.editrule.recommendStandard[0].required = false;
                  this.editrule.recommendCentralchannel[0].required = true;
                } else {
                  // this.tyShow = true;
                  // this.btShow = true;
                  // this.tzShow = true;
                  this.tableData[valId]["tyShow"] = false;
                  this.tableData[valId]["btShow"] = true;
                  this.tableData[valId]["tzShow"] = true;
                  this.tableData[valId]["edit"] = true;
                  this.editrule.recommendUnified[0].required = true;
                  this.editrule.recommendSpecial[0].required = true;
                  this.editrule.recommendStandard[0].required = true;
                  this.editrule.recommendCentralchannel[0].required = true;
                }
                // this.tableData[valId]["edit"] = true;
                this.lastIndexPage = valId;
              } else {
                this.$confirm("是否放弃本次修改")
                  .then(() => {
                    for (let i = 0; i < this.tableData.length; i++) {
                      this.tableData[i]["edit"] = false;
                      this.tableData[i]["pooraDisab"] = false;
                      this.tableData[i]["numaDisa"] = false;
                      this.tableData[i]["tyShow"] = false;
                      this.tableData[i]["btShow"] = false;
                      this.tableData[i]["tzShow"] = false;
                    }
                    this.editform.recommendSpecial = val.recommendSpecial;
                    this.editform.recommendStandard = val.recommendStandard;
                    this.editform.recommendUnified = val.recommendUnified;
                    this.editform.recommendCentralchannel = val.recommendCentralchannel;
                    this.editform.recommendSumNumber = val.recommendSumNumber;
                    this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                    this.editform.isCoceralVip = val.isCoceralVip;
                    this.editform.schedulePlan = val.schedulePlan;
                    this.editform["recommendId"] = val.recommendId;
                    if (val.exhibitionArea === "LD01") {
                      // this.pooraDisab = true;
                      this.tableData[valId]["pooraDisab"] = true;
                      this.editform.productType = val.productType;
                      this.editform.poorArea = val.poorArea;
                      this.editrule.productType[0].required = true;
                      this.editrule.poorArea[0].required = true;
                    } else {
                      // this.pooraDisab = false;
                      this.tableData[valId]["pooraDisab"] = false;
                      this.editrule.productType[0].required = false;
                      this.editrule.poorArea[0].required = false;
                    }
                    let parmc = {
                      companyId: val.companyId,
                      exhibitionAreaCode: val.exhibitionArea
                    };
                    // 交易团/分团设置粘连性
                    this.getadjoinRecommendCompany(parmc).then(res => {
                      if (res === "exist") {
                        //this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                        this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                       // this.editrule.examineAdjoinNumber[0].required = true;
                        this.editrule.applyAdjoinNumber[0].required = true;
                        // this.numaDisa = true;
                        this.tableData[valId]["numaDisa"] = true;
                        this.isBrandc = "1";
                      } else {
                      //  delete this.editform.examineAdjoinNumber;
                       // delete this.editform.applyAdjoinNumber;
                        // this.numaDisa = false;
                        this.tableData[valId]["numaDisa"] = false;
                        this.isBrandc = "0";
                      //  this.editrule.examineAdjoinNumber[0].required = false;
                        this.editrule.applyAdjoinNumber[0].required = false;
                      }
                    }).catch(e => {});
                    // 产品类别
                    let typecp = {
                      companyId: val.companyId,
                      delegationId: this.$store.getters.userInfo.org.deptId,
                      exhibitionAreaCode: val.exhibitionArea
                    };
                    this.getlistAllProduct(typecp).then(res => {
                      this.optionPoor = JSON.parse(JSON.stringify(res));
                    });
                    // 统一布展展区
                    if (val.exhibitionArea === "MA02") {
                      // this.tyShow = true;
                      // this.btShow = false;
                      // this.tzShow = false;
                      this.tableData[valId]["tyShow"] = true;
                      this.tableData[valId]["btShow"] = false;
                      this.tableData[valId]["tzShow"] = false;
                      this.tableData[valId]["edit"] = true;
                      this.editrule.recommendUnified[0].required = true;
                      this.editrule.recommendSpecial[0].required = false;
                      this.editrule.recommendStandard[0].required = false;
                      this.editrule.recommendCentralchannel[0].required = false;
                    } else if (val.exhibitionArea === "MA07" || val.exhibitionArea === "MA08" || val.exhibitionArea === "VS04" || val.exhibitionArea === "HD06") {
                      // this.tyShow = true;
                      // this.btShow = false;
                      // this.tzShow = true;
                      this.tableData[valId]["tyShow"] = true;
                      this.tableData[valId]["btShow"] = false;
                      this.tableData[valId]["tzShow"] = true;
                      this.tableData[valId]["edit"] = true;
                      this.editrule.recommendUnified[0].required = true;
                      this.editrule.recommendSpecial[0].required = true;
                      this.editrule.recommendStandard[0].required = false;
                      this.editrule.recommendCentralchannel[0].required = true;
                    } else {
                      // this.tyShow = true;
                      // this.btShow = true;
                      // this.tzShow = true;
                      this.tableData[valId]["tyShow"] = false;
                      this.tableData[valId]["btShow"] = true;
                      this.tableData[valId]["tzShow"] = true;
                      this.tableData[valId]["edit"] = true;
                      this.editrule.recommendUnified[0].required = true;
                      this.editrule.recommendSpecial[0].required = true;
                      this.editrule.recommendStandard[0].required = true;
                      this.editrule.recommendCentralchannel[0].required = true;
                    }
                    // this.tableData[valId]["edit"] = true;
                    this.lastIndexPage = valId;
                  })
                  .catch(() => {
                    this.$message.info("已取消本次操作");
                  });
              }
            }
          }).catch(e => {});
        } else if (resc.isBlack === "1") {
          for (let i = 0; i < resc.punishInfos.length; i++) {
            if (noParr.indexOf(resc.punishInfos[i].eventCode) !== -1) {
              this.$message({
                message: "该企业为禁止参会企业",
                type: "warning"
              });
            } else if (resc.punishInfos[i].eventCode === "125") {
              this.isPass = true;
              // 交易团提交一般性展位数量安排时，获取分团提交的安排
              this.getrecommendCompany(datan).then(resa => {
                if (resa === "0") {
                  this.$message({
                    type: "error",
                    message: "该企业该展区分团已经提交了推荐方案，需进行审核"
                  });
                  this.$router.push({ path: '/ftjytAuditSubgroup' });
                } else {
                  this.editrule.productType[0].required = false;
                  this.editrule.poorArea[0].required = false;
                 // this.editrule.examineAdjoinNumber[0].required = false;
                  this.editrule.applyAdjoinNumber[0].required = false;
                  if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
                    this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                    this.editform.recommendSpecial = val.recommendSpecial;
                    this.editform.recommendStandard = val.recommendStandard;
                    this.editform.recommendUnified = val.recommendUnified;
                    this.editform.recommendCentralchannel = val.recommendCentralchannel;
                    this.editform.recommendSumNumber = val.recommendSumNumber;
                    this.editform.isCoceralVip = val.isCoceralVip;
                    this.editform.schedulePlan = val.schedulePlan;
                    this.editform["recommendId"] = val.recommendId;
                    if (val.exhibitionArea === "LD01") {
                      // this.pooraDisab = true;
                      this.tableData[valId]["pooraDisab"] = true;
                      this.editform.productType = val.productType;
                      this.editform.poorArea = val.poorArea;
                      this.editrule.productType[0].required = true;
                      this.editrule.poorArea[0].required = true;
                    } else {
                      // this.pooraDisab = false;
                      this.tableData[valId]["pooraDisab"] = false;
                      this.editrule.productType[0].required = false;
                      this.editrule.poorArea[0].required = false;
                    }
                    let parmc = {
                      companyId: val.companyId,
                      exhibitionAreaCode: val.exhibitionArea
                    };
                    // 交易团/分团设置粘连性
                    this.getadjoinRecommendCompany(parmc).then(res => {
                      if (res === "exist") {
                      //  this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                        this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                      //  this.editrule.examineAdjoinNumber[0].required = true;
                        this.editrule.applyAdjoinNumber[0].required = true;
                        // this.numaDisa = true;
                        this.tableData[valId]["numaDisa"] = true;
                        this.isBrandc = "1";
                      } else {
                        // this.numaDisa = false;
                       // delete this.editform.examineAdjoinNumber;
                       // delete this.editform.applyAdjoinNumber;
                        this.tableData[valId]["numaDisa"] = false;
                        this.isBrandc = "0";
                      //  this.editrule.examineAdjoinNumber[0].required = false;
                        this.editrule.applyAdjoinNumber[0].required = false;
                      }
                    }).catch(e => {});
                    // 产品类别
                    let typecp = {
                      companyId: val.companyId,
                      delegationId: this.$store.getters.userInfo.org.deptId,
                      exhibitionAreaCode: val.exhibitionArea
                    };
                    this.getlistAllProduct(typecp).then(res => {
                      this.optionPoor = JSON.parse(JSON.stringify(res));
                    });
                    // 统一布展展区
                    if (val.exhibitionArea === "MA02") {
                      // this.tyShow = true;
                      // this.btShow = false;
                      // this.tzShow = false;
                      this.tableData[valId]["tyShow"] = true;
                      this.tableData[valId]["btShow"] = false;
                      this.tableData[valId]["tzShow"] = false;
                      this.tableData[valId]["edit"] = true;
                      this.editrule.recommendUnified[0].required = true;
                      this.editrule.recommendSpecial[0].required = false;
                      this.editrule.recommendStandard[0].required = false;
                      this.editrule.recommendCentralchannel[0].required = false;
                    } else if (val.exhibitionArea === "MA07" || val.exhibitionArea === "MA08" || val.exhibitionArea === "VS04" || val.exhibitionArea === "HD06") {
                      // this.tyShow = true;
                      // this.btShow = false;
                      // this.tzShow = false;
                      this.tableData[valId]["tyShow"] = true;
                      this.tableData[valId]["btShow"] = false;
                      this.tableData[valId]["tzShow"] = false;
                      this.tableData[valId]["edit"] = true;
                      this.editrule.recommendUnified[0].required = true;
                      this.editrule.recommendSpecial[0].required = true;
                      this.editrule.recommendStandard[0].required = false;
                      this.editrule.recommendCentralchannel[0].required = true;
                    } else {
                      // this.tyShow = true;
                      // this.btShow = true;
                      // this.tzShow = false;
                      this.tableData[valId]["tyShow"] = false;
                      this.tableData[valId]["btShow"] = true;
                      this.tableData[valId]["tzShow"] = false;
                      this.tableData[valId]["edit"] = true;
                      this.editrule.recommendUnified[0].required = true;
                      this.editrule.recommendSpecial[0].required = true;
                      this.editrule.recommendStandard[0].required = true;
                      this.editrule.recommendCentralchannel[0].required = true;
                    }
                    // this.tableData[valId]["edit"] = true;
                    this.lastIndexPage = valId;
                  } else {
                    this.$confirm("是否放弃本次修改")
                      .then(() => {
                        for (let k = 0; k < this.tableData.length; k++) {
                          this.tableData[k]["edit"] = false;
                          this.tableData[k]["pooraDisab"] = false;
                          this.tableData[k]["numaDisa"] = false;
                          this.tableData[k]["tyShow"] = false;
                          this.tableData[k]["btShow"] = false;
                          this.tableData[k]["tzShow"] = false;
                        }
                        this.editform.recommendSpecial = val.recommendSpecial;
                        this.editform.recommendStandard = val.recommendStandard;
                        this.editform.recommendUnified = val.recommendUnified;
                        this.editform.recommendCentralchannel = val.recommendCentralchannel;
                        this.editform.recommendSumNumber = val.recommendSumNumber;
                        this.editform.isCoceralVip = val.isCoceralVip;
                        this.editform.schedulePlan = val.schedulePlan;
                        this.editform["recommendId"] = val.recommendId;
                        if (val.exhibitionArea === "LD01") {
                          // this.pooraDisab = true;
                          this.tableData[valId]["pooraDisab"] = true;
                          this.editform.productType = val.productType;
                          this.editform.poorArea = val.poorArea;
                          this.editrule.productType[0].required = true;
                          this.editrule.poorArea[0].required = true;
                        } else {
                          // this.pooraDisab = false;
                          this.tableData[valId]["pooraDisab"] = false;
                          this.editrule.productType[0].required = false;
                          this.editrule.poorArea[0].required = false;
                        }
                        let parmc = {
                          companyId: val.companyId,
                          exhibitionAreaCode: val.exhibitionArea
                        };
                        // 交易团/分团设置粘连性
                        this.getadjoinRecommendCompany(parmc).then(res => {
                          if (res === "exist") {
                          //  this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                            this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                          //  this.editrule.examineAdjoinNumber[0].required = true;
                            this.editrule.applyAdjoinNumber[0].required = true;
                            // this.numaDisa = true;
                            this.tableData[valId]["numaDisa"] = true;
                            this.isBrandc = "1";
                          } else {
                          //  delete this.editform.examineAdjoinNumber;
                          //  delete this.editform.applyAdjoinNumber;
                            // this.numaDisa = false;
                            this.tableData[valId]["numaDisa"] = false;
                            this.isBrandc = "0";
                          //  this.editrule.examineAdjoinNumber[0].required = false;
                            this.editrule.applyAdjoinNumber[0].required = false;
                          }
                        }).catch(e => {});
                        // 产品类别
                        let typecp = {
                          companyId: val.companyId,
                          delegationId: this.$store.getters.userInfo.org.deptId,
                          exhibitionAreaCode: val.exhibitionArea
                        };
                        this.getlistAllProduct(typecp).then(res => {
                          this.optionPoor = JSON.parse(JSON.stringify(res));
                        });
                        // 统一布展展区
                        if (val.exhibitionArea === "MA02") {
                          // this.tyShow = true;
                          // this.btShow = false;
                          // this.tzShow = false;
                          this.tableData[valId]["tyShow"] = true;
                          this.tableData[valId]["btShow"] = false;
                          this.tableData[valId]["tzShow"] = false;
                          this.tableData[valId]["edit"] = true;
                          this.editrule.recommendUnified[0].required = true;
                          this.editrule.recommendSpecial[0].required = false;
                          this.editrule.recommendStandard[0].required = false;
                          this.editrule.recommendCentralchannel[0].required = false;
                        } else if (val.exhibitionArea === "MA07" || val.exhibitionArea === "MA08" || val.exhibitionArea === "VS04" || val.exhibitionArea === "HD06") {
                          // this.tyShow = true;
                          // this.btShow = false;
                          // this.tzShow = true;
                          this.tableData[valId]["tyShow"] = true;
                          this.tableData[valId]["btShow"] = false;
                          this.tableData[valId]["tzShow"] = true;
                          this.tableData[valId]["edit"] = true;
                          this.editrule.recommendUnified[0].required = true;
                          this.editrule.recommendSpecial[0].required = true;
                          this.editrule.recommendStandard[0].required = false;
                          this.editrule.recommendCentralchannel[0].required = true;
                        } else {
                          // this.tyShow = true;
                          // this.btShow = true;
                          // this.tzShow = true;
                          this.tableData[valId]["tyShow"] = false;
                          this.tableData[valId]["btShow"] = true;
                          this.tableData[valId]["tzShow"] = true;
                          this.tableData[valId]["edit"] = true;
                          this.editrule.recommendUnified[0].required = true;
                          this.editrule.recommendSpecial[0].required = true;
                          this.editrule.recommendStandard[0].required = true;
                          this.editrule.recommendCentralchannel[0].required = true;
                        }
                        // this.tableData[valId]["edit"] = true;
                        this.lastIndexPage = valId;
                      })
                      .catch(() => {
                        this.$message.info("已取消本次操作");
                      });
                  }
                }
              }).catch(e => {});
            } else if (ynParr.indexOf(resc.punishInfos[i].eventCode) !== -1) {
              this.isPass = false;
              if (resc.punishInfos[i].eventCode === "109") {
                a = 1;
              } else if (resc.punishInfos[i].eventCode === "110") {
                b = 2;
              }
              this.numShot = a + b;
              // 交易团提交一般性展位数量安排时，获取分团提交的安排
              this.getrecommendCompany(datan).then(resa => {
                if (resa === "0") {
                  this.$message({
                    type: "error",
                    message: "该企业该展区分团已经提交了推荐方案，需进行审核"
                  });
                  this.$router.push({ path: '/ftjytAuditSubgroup' });
                } else {
                  this.editrule.productType[0].required = false;
                  this.editrule.poorArea[0].required = false;
                //  this.editrule.examineAdjoinNumber[0].required = false;
                  this.editrule.applyAdjoinNumber[0].required = false;
                  if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
                    this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                    this.editform.recommendSpecial = val.recommendSpecial;
                    this.editform.recommendStandard = val.recommendStandard;
                    this.editform.recommendUnified = val.recommendUnified;
                    this.editform.recommendCentralchannel = val.recommendCentralchannel;
                    this.editform.recommendSumNumber = val.recommendSumNumber;
                    this.editform.isCoceralVip = val.isCoceralVip;
                    this.editform.schedulePlan = val.schedulePlan;
                    this.editform["recommendId"] = val.recommendId;
                    if (val.exhibitionArea === "LD01") {
                      // this.pooraDisab = true;
                      this.tableData[valId]["pooraDisab"] = true;
                      this.editform.productType = val.productType;
                      this.editform.poorArea = val.poorArea;
                      this.editrule.productType[0].required = true;
                      this.editrule.poorArea[0].required = true;
                    } else {
                      // this.pooraDisab = false;
                      this.tableData[valId]["pooraDisab"] = false;
                      this.editrule.productType[0].required = false;
                      this.editrule.poorArea[0].required = false;
                    }
                    let parmc = {
                      companyId: val.companyId,
                      exhibitionAreaCode: val.exhibitionArea
                    };
                    // 交易团/分团设置粘连性
                    this.getadjoinRecommendCompany(parmc).then(res => {
                      if (res === "exist") {
                      //  this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                        this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                      //  this.editrule.examineAdjoinNumber[0].required = true;
                        this.editrule.applyAdjoinNumber[0].required = true;
                        // this.numaDisa = true;
                        this.tableData[valId]["numaDisa"] = true;
                        this.isBrandc = "1";
                      } else {
                      //  delete this.editform.examineAdjoinNumber;
                      //  delete this.editform.applyAdjoinNumber;
                        // this.numaDisa = false;
                        this.tableData[valId]["numaDisa"] = false;
                        this.isBrandc = "0";
                      //  this.editrule.examineAdjoinNumber[0].required = false;
                        this.editrule.applyAdjoinNumber[0].required = false;
                      }
                    }).catch(e => {});
                    // 产品类别
                    let typecp = {
                      companyId: val.companyId,
                      delegationId: this.$store.getters.userInfo.org.deptId,
                      exhibitionAreaCode: val.exhibitionArea
                    };
                    this.getlistAllProduct(typecp).then(res => {
                      this.optionPoor = JSON.parse(JSON.stringify(res));
                    });
                    // 统一布展展区
                    if (val.exhibitionArea === "MA02") {
                      // this.tyShow = true;
                      // this.btShow = false;
                      // this.tzShow = false;
                      this.tableData[valId]["tyShow"] = true;
                      this.tableData[valId]["btShow"] = false;
                      this.tableData[valId]["tzShow"] = false;
                      this.tableData[valId]["edit"] = true;
                      this.editrule.recommendUnified[0].required = true;
                      this.editrule.recommendSpecial[0].required = false;
                      this.editrule.recommendStandard[0].required = false;
                      this.editrule.recommendCentralchannel[0].required = false;
                    } else if (val.exhibitionArea === "MA07" || val.exhibitionArea === "MA08" || val.exhibitionArea === "VS04" || val.exhibitionArea === "HD06") {
                      // this.tyShow = true;
                      // this.btShow = false;
                      // this.tzShow = true;
                      this.tableData[valId]["tyShow"] = true;
                      this.tableData[valId]["btShow"] = false;
                      this.tableData[valId]["tzShow"] = true;
                      this.tableData[valId]["edit"] = true;
                      this.editrule.recommendUnified[0].required = true;
                      this.editrule.recommendSpecial[0].required = true;
                      this.editrule.recommendStandard[0].required = false;
                      this.editrule.recommendCentralchannel[0].required = true;
                    } else {
                      // this.tyShow = true;
                      // this.btShow = true;
                      // this.tzShow = true;
                      this.tableData[valId]["tyShow"] = false;
                      this.tableData[valId]["btShow"] = true;
                      this.tableData[valId]["tzShow"] = true;
                      this.tableData[valId]["edit"] = true;
                      this.editrule.recommendUnified[0].required = true;
                      this.editrule.recommendSpecial[0].required = true;
                      this.editrule.recommendStandard[0].required = true;
                      this.editrule.recommendCentralchannel[0].required = true;
                    }
                    // this.tableData[valId]["edit"] = true;
                    this.lastIndexPage = valId;
                  } else {
                    this.$confirm("是否放弃本次修改")
                      .then(() => {
                        for (let j = 0; j < this.tableData.length; j++) {
                          this.tableData[j]["edit"] = false;
                          this.tableData[j]["pooraDisab"] = false;
                          this.tableData[j]["numaDisa"] = false;
                          this.tableData[j]["tyShow"] = false;
                          this.tableData[j]["btShow"] = false;
                          this.tableData[j]["tzShow"] = false;
                        }
                        this.editform.recommendSpecial = val.recommendSpecial;
                        this.editform.recommendStandard = val.recommendStandard;
                        this.editform.recommendUnified = val.recommendUnified;
                        this.editform.recommendCentralchannel = val.recommendCentralchannel;
                        this.editform.recommendSumNumber = val.recommendSumNumber;
                        this.editform.isCoceralVip = val.isCoceralVip;
                        this.editform.schedulePlan = val.schedulePlan;
                        this.editform["recommendId"] = val.recommendId;
                        if (val.exhibitionArea === "LD01") {
                          // this.pooraDisab = true;
                          this.tableData[valId]["pooraDisab"] = true;
                          this.editform.productType = val.productType;
                          this.editform.poorArea = val.poorArea;
                          this.editrule.productType[0].required = true;
                          this.editrule.poorArea[0].required = true;
                        } else {
                          // this.pooraDisab = false;
                          this.tableData[valId]["pooraDisab"] = false;
                          this.editrule.productType[0].required = false;
                          this.editrule.poorArea[0].required = false;
                        }
                        let parmc = {
                          companyId: val.companyId,
                          exhibitionAreaCode: val.exhibitionArea
                        };
                        // 交易团/分团设置粘连性
                        this.getadjoinRecommendCompany(parmc).then(res => {
                          if (res === "exist") {
                          //  this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                            this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                          //  this.editrule.examineAdjoinNumber[0].required = true;
                            this.editrule.applyAdjoinNumber[0].required = true;
                            // this.numaDisa = true;
                            this.tableData[valId]["numaDisa"] = true;
                            this.isBrandc = "1";
                          } else {
                          //  delete this.editform.examineAdjoinNumber;
                          //  delete this.editform.applyAdjoinNumber;
                            // this.numaDisa = false;
                            this.tableData[valId]["numaDisa"] = false;
                            this.isBrandc = "0";
                          //  this.editrule.examineAdjoinNumber[0].required = false;
                            this.editrule.applyAdjoinNumber[0].required = false;
                          }
                        }).catch(e => {});
                        // 产品类别
                        let typecp = {
                          companyId: val.companyId,
                          delegationId: this.$store.getters.userInfo.org.deptId,
                          exhibitionAreaCode: val.exhibitionArea
                        };
                        this.getlistAllProduct(typecp).then(res => {
                          this.optionPoor = JSON.parse(JSON.stringify(res));
                        });
                        // 统一布展展区
                        if (val.exhibitionArea === "MA02") {
                          // this.tyShow = true;
                          // this.btShow = false;
                          // this.tzShow = false;
                          this.tableData[valId]["tyShow"] = true;
                          this.tableData[valId]["btShow"] = false;
                          this.tableData[valId]["tzShow"] = false;
                          this.tableData[valId]["edit"] = true;
                          this.editrule.recommendUnified[0].required = true;
                          this.editrule.recommendSpecial[0].required = false;
                          this.editrule.recommendStandard[0].required = false;
                          this.editrule.recommendCentralchannel[0].required = false;
                        } else if (val.exhibitionArea === "MA07" || val.exhibitionArea === "MA08" || val.exhibitionArea === "VS04" || val.exhibitionArea === "HD06") {
                          // this.tyShow = true;
                          // this.btShow = false;
                          // this.tzShow = true;
                          this.tableData[valId]["tyShow"] = true;
                          this.tableData[valId]["btShow"] = false;
                          this.tableData[valId]["tzShow"] = true;
                          this.tableData[valId]["edit"] = true;
                          this.editrule.recommendUnified[0].required = true;
                          this.editrule.recommendSpecial[0].required = true;
                          this.editrule.recommendStandard[0].required = false;
                          this.editrule.recommendCentralchannel[0].required = true;
                        } else {
                          // this.tyShow = true;
                          // this.btShow = true;
                          // this.tzShow = true;
                          this.tableData[valId]["tyShow"] = false;
                          this.tableData[valId]["btShow"] = true;
                          this.tableData[valId]["tzShow"] = true;
                          this.tableData[valId]["edit"] = true;
                          this.editrule.recommendUnified[0].required = true;
                          this.editrule.recommendSpecial[0].required = true;
                          this.editrule.recommendStandard[0].required = true;
                          this.editrule.recommendCentralchannel[0].required = true;
                        }
                        // this.tableData[valId]["edit"] = true;
                        this.lastIndexPage = valId;
                      })
                      .catch(() => {
                        this.$message.info("已取消本次操作");
                      });
                  }
                }
              }).catch(e => {});
            }
          }
        }
      });

    },
    // 编辑 保存
    onServe(val, valId, datae) {
      this.loading = true;
      let sumNum = 0;
      if (this.editform.recommendSpecial === '') {
        this.editform.recommendSpecial = 0;
      }
      if (this.editform.recommendStandard === '') {
        this.editform.recommendStandard = 0;
      }
      if (this.editform.recommendUnified === '') {
        this.editform.recommendUnified = 0;
      }
      if (this.editform.recommendCentralchannel === '') {
        this.editform.recommendCentralchannel = 0;
      }
      this.editform.exhibitionAreaCode = val.exhibitionArea,
      sumNum = (this.editform.recommendSpecial - 0) + (this.editform.recommendStandard - 0) + (this.editform.recommendCentralchannel - 0) + (this.editform.recommendUnified - 0);
    //this.$refs[datae].validate((vald) => {
      let validArr = [];
      let formNameList = this.rulesList;
      let flag = '';
      for (let i = 0; i < formNameList.length; i++) {
        if (this.$refs[formNameList[i]]) {
          this.$refs[formNameList[i]].validate(valid => {
            validArr.push(valid);
          });
        } else {
          continue;
        }
      }
      for (let f = 0; f < validArr.length; f++) {
        if (validArr[f]) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag) {
        if (val.recommendId != null) {
          if (this.isPass) {
          //  if ((Number(this.editform.examineAdjoinNumber) > 0 && Number(this.editform.examineAdjoinNumber) <= Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
            if ((Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
              this.updaterecommendCompany(this.editform)
                .then(res => {
                  this.loading = false;
                  // if (val.isSubmit === '0') {
                  //   this.$confirm('操作成功，请点击左下方“提交”按钮，提交方案。', '提示', {
                  //     confirmButtonText: '继续',
                  //     showCancelButton: false,
                  //     type: 'success'
                  //   });
                  // }
                  this.$message.success('保存成功');
                  this.lastIndexPage = "";
                  this.tableData[valId]["pooraDisab"] = false;
                  this.tableData[valId]["numaDisa"] = false;
                  this.tableData[valId]["tyShow"] = false;
                  this.tableData[valId]["btShow"] = false;
                  this.tableData[valId]["tzShow"] = false;
                  this.tableData[valId]["edit"] = false;
                  this.getListPage(this.obj); // 调用初始加载页面方法
                })
                .catch(e => {
                  this.loading = false;
                });
            // } else if (this.tableData[valId]["numaDisa"]) {
            //   this.$message({
            //     message: "填写的粘连数量应小于等于特装推荐数且大于零",
            //     type: "warning"
            //   });
            } else {
              this.updaterecommendCompany(this.editform)
                .then(res => {
                  this.loading = false;
                  // if (val.isSubmit === '0') {
                  //   this.$confirm('操作成功，请点击左下方“提交”按钮，提交方案。', '提示', {
                  //     confirmButtonText: '继续',
                  //     showCancelButton: false,
                  //     type: 'success'
                  //   });
                  // }
                  this.$message.success('保存成功');
                  this.lastIndexPage = "";
                  this.tableData[valId]["pooraDisab"] = false;
                  this.tableData[valId]["numaDisa"] = false;
                  this.tableData[valId]["tyShow"] = false;
                  this.tableData[valId]["btShow"] = false;
                  this.tableData[valId]["tzShow"] = false;
                  this.tableData[valId]["edit"] = false;
                  this.getListPage(this.obj); // 调用初始加载页面方法
                })
                .catch(e => {
                  this.loading = false;
                });
            }
          } else
          //if ((Number(this.editform.examineAdjoinNumber) > 0 && Number(this.editform.examineAdjoinNumber) <= Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
          if ((Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
            if ((sumNum <= (val.lastRecommendSumNumber - this.numShot)) && val.lastRecommendSumNumber !== "0") {
              this.updaterecommendCompany(this.editform)
                .then(res => {
                  this.loading = false;
                  // if (val.isSubmit === '0') {
                  //   this.$confirm('操作成功，请点击左下方“提交”按钮，提交方案。', '提示', {
                  //     confirmButtonText: '继续',
                  //     showCancelButton: false,
                  //     type: 'success'
                  //   });
                  // }
                  this.$message.success('保存成功');
                  this.lastIndexPage = "";
                  this.tableData[valId]["pooraDisab"] = false;
                  this.tableData[valId]["numaDisa"] = false;
                  this.tableData[valId]["tyShow"] = false;
                  this.tableData[valId]["btShow"] = false;
                  this.tableData[valId]["tzShow"] = false;
                  this.tableData[valId]["edit"] = false;
                  this.getListPage(this.obj); // 调用初始加载页面方法
                })
                .catch(e => {
                  this.loading = false;
                });
            } else {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
              this.$message({
                message: "推荐数总和不能超过被处罚的展位上限值",
                type: "warning"
              });
            }
          // } else if (this.tableData[valId]["numaDisa"]) {
          //   this.$message({
          //     message: "填写的粘连数量应小于等于特装推荐数且大于零",
          //     type: "warning"
          //   });
          } else {
            this.updaterecommendCompany(this.editform)
              .then(res => {
                this.loading = false;
                // if (val.isSubmit === '0') {
                //   this.$confirm('操作成功，请点击左下方“提交”按钮，提交方案。', '提示', {
                //     confirmButtonText: '继续',
                //     showCancelButton: false,
                //     type: 'success'
                //   });
                // }
                this.$message.success('保存成功');
                this.lastIndexPage = "";
                this.tableData[valId]["pooraDisab"] = false;
                this.tableData[valId]["numaDisa"] = false;
                this.tableData[valId]["tyShow"] = false;
                this.tableData[valId]["btShow"] = false;
                this.tableData[valId]["tzShow"] = false;
                this.tableData[valId]["edit"] = false;
                this.getListPage(this.obj); // 调用初始加载页面方法
              })
              .catch(e => {
                this.loading = false;
              });
          }
        } else {
          this.addForm = {
            applyAdjoinNumber: this.editform.applyAdjoinNumber,
            // adhesionNumberResult: val.adhesionNumberResult,
            brandAdhesionResult: val.brandAdhesionResult,
            companyName: val.companyName,
            companyId: val.companyId,
            companyCecfCode: val.cecfCode,
            coceralOpinion: val.coceralOpinion,
            exhibitionAreaName: val.exhibitionAreaName,
            exhibitionAreaCode: val.exhibitionArea,
            //examineAdjoinNumber: this.editform.examineAdjoinNumber,
            isCoceralVip: this.editform.isCoceralVip,
            isBrandCompany: this.isBrandc, // 是否品牌
            recommendStandard: this.editform.recommendStandard,
            recommendUnified: this.editform.recommendUnified,
            recommendSpecial: this.editform.recommendSpecial,
            recommendCentralchannel: this.editform.recommendCentralchannel,
            productType: this.editform.productType,
            poorArea: this.editform.poorArea,
            schedulePlan: this.editform.schedulePlan,
            delegationId: this.$store.getters.userInfo.org.deptId,
            delegationCode: this.$store.getters.userInfo.org.deptCode,
            delegationName: this.$store.getters.userInfo.org.deptName
          };
          if (!this.tableData[valId]["numaDisa"]) {
            //delete this.addForm.examineAdjoinNumber;
            delete this.addForm.applyAdjoinNumber;
          }
          // if (this.addForm.recommendSpecial < this.addForm.applyAdjoinNumber || this.addForm.applyAdjoinNumber === "0") {
          //   this.$message("填写的粘连数量应小于等于特装推荐数且大于零");
          // } else
          if ((Number(this.addForm.recommendSpecial) <= Number(val.lastIsSpecialNumber)) && val.lastIsSpecialNumber != null) {
            this.$message({
              message: "特装展位数量与上届相比减少",
              type: "warning"
            });
          }
          if (this.isPass) {
            //if ((Number(this.editform.examineAdjoinNumber) > 0 && Number(this.editform.examineAdjoinNumber) <= Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
            if ((Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
              this.addrecommendCompany(this.addForm)
                .then(resa => {
                  this.loading = false;
                  // if (val.isSubmit === '0') {
                  //   this.$confirm('操作成功，请点击左下方“提交”按钮，提交方案。', '提示', {
                  //     confirmButtonText: '继续',
                  //     showCancelButton: false,
                  //     type: 'success'
                  //   });
                  // }
                  this.$message.success('保存成功');
                  this.lastIndexPage = "";
                  this.tableData[valId]["pooraDisab"] = false;
                  this.tableData[valId]["numaDisa"] = false;
                  this.tableData[valId]["tyShow"] = false;
                  this.tableData[valId]["btShow"] = false;
                  this.tableData[valId]["tzShow"] = false;
                  this.tableData[valId]["edit"] = false;
                  this.getListPage(this.obj); // 调用初始加载页面方法
                })
                .catch(e => {
                  this.loading = false;
                });
            // } else if (this.tableData[valId]["numaDisa"]) {
            //   this.$message({
            //     message: "填写的粘连数量应小于等于特装推荐数且大于零",
            //     type: "warning"
            //   });
            } else {
              this.addrecommendCompany(this.addForm)
                .then(resa => {
                  this.loading = false;
                  // if (val.isSubmit === '0') {
                  //   this.$confirm('操作成功，请点击左下方“提交”按钮，提交方案。', '提示', {
                  //     confirmButtonText: '继续',
                  //     showCancelButton: false,
                  //     type: 'success'
                  //   });
                  // }
                  this.$message.success('保存成功');
                  this.lastIndexPage = "";
                  this.tableData[valId]["pooraDisab"] = false;
                  this.tableData[valId]["numaDisa"] = false;
                  this.tableData[valId]["tyShow"] = false;
                  this.tableData[valId]["btShow"] = false;
                  this.tableData[valId]["tzShow"] = false;
                  this.tableData[valId]["edit"] = false;
                  this.getListPage(this.obj); // 调用初始加载页面方法
                })
                .catch(e => {
                  this.loading = false;
                });
            }
          } else
          //if ((Number(this.editform.examineAdjoinNumber) > 0 && Number(this.editform.examineAdjoinNumber) <= Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
          if ((Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
            if ((sumNum <= (val.lastRecommendSumNumber - this.numShot)) && val.lastRecommendSumNumber !== "0") {
              this.addrecommendCompany(this.addForm)
                .then(resa => {
                  this.loading = false;
                  // if (val.isSubmit === '0') {
                  //   this.$confirm('操作成功，请点击左下方“提交”按钮，提交方案。', '提示', {
                  //     confirmButtonText: '继续',
                  //     showCancelButton: false,
                  //     type: 'success'
                  //   });
                  // }
                  this.$message.success('保存成功');
                  this.lastIndexPage = "";
                  this.tableData[valId]["pooraDisab"] = false;
                  this.tableData[valId]["numaDisa"] = false;
                  this.tableData[valId]["tyShow"] = false;
                  this.tableData[valId]["btShow"] = false;
                  this.tableData[valId]["tzShow"] = false;
                  this.tableData[valId]["edit"] = false;
                  this.getListPage(this.obj); // 调用初始加载页面方法
                })
                .catch(e => {
                  this.loading = false;
                });
            } else {
              this.$nextTick(() => {
                fullScreenloading.close();
              });
              this.$message({
                message: "推荐数总和不能超过被处罚的展位上限值",
                type: "warning"
              });
            }
          // } else if (this.tableData[valId]["numaDisa"]) {
          //   this.$message({
          //     message: "填写的粘连数量应小于等于特装推荐数且大于零",
          //     type: "warning"
          //   });
          } else {
            this.addrecommendCompany(this.addForm)
              .then(resa => {
                this.loading = false;
                // if (val.isSubmit === '0') {
                //   this.$confirm('操作成功，请点击左下方“提交”按钮，提交方案。', '提示', {
                //     confirmButtonText: '继续',
                //     showCancelButton: false,
                //     type: 'success'
                //   });
                // }
                this.$message.success('保存成功');
                this.lastIndexPage = "";
                this.tableData[valId]["pooraDisab"] = false;
                this.tableData[valId]["numaDisa"] = false;
                this.tableData[valId]["tyShow"] = false;
                this.tableData[valId]["btShow"] = false;
                this.tableData[valId]["tzShow"] = false;
                this.tableData[valId]["edit"] = false;
                this.getListPage(this.obj); // 调用初始加载页面方法
              })
              .catch(e => {
                this.loading = false;
              });
          }
        }
      } else {
        this.loading = false;
      }
    //});
    },
    // 删除
    onDele(val) {
      this.$confirm("确认删除？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let delId = {};
          if (val.recommendId == null) {
            delId = {
              recommendId: ""
            };
          } else {
            delId = {
              recommendId: val.recommendId
            };
          }
          this.deletebyIdRecommendCompany(delId)
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
    // 设置粘连性
    setedit(val, valId) {
      this.paramd = {
        companyId: val.companyId,
        exhibitionAreaCode: val.exhibitionAreaCode
      };
      this.getadjoinRecommendCompany(this.paramd).then(res => {
        if (res === "exist") {
          if (this.lastSetedit === "" || this.lastSetedit === valId) {
            this.zlform["recommendId"] = val.recommendId;
            this.zlform.applyAdjoinNumber = val.applyAdjoinNumber;
            this.tableData[valId]["editzl"] = true;
            this.lastSetedit = valId;
          } else {
            this.$confirm("是否放弃本次修改")
              .then(() => {
                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i]["editzl"] = false;
                }
                this.tableData[valId]["editzl"] = true;
                this.lastSetedit = valId;
              })
              .catch(() => {
                this.$message.info("已取消本次操作");
              });
          }
        } else {
          this.$message({
            type: "error",
            message: res
          });
        }
      }).catch(e => {});
    },
    // 保存粘连性
    setSeave(val, valId, datae) {
      this.lastSetedit = "";
      this.$refs[datae].validate((vald) => {
        if (vald) {
          this.updaterecommendCompany(this.zlform)
            .then(res => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.tableData[valId]["editzl"] = false;
              this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 贫困地区
    pooedit(val, valId) {
      this.paramd = {
        companyId: val.companyId,
        exhibitionArea: val.exhibitionAreaCode
      };
      this.getpoorRecommendCompany(this.paramd).then(res => {
        if (res === "success") {
          if (this.lastPooedit === "" || this.lastPooedit === valId) {
            this.poorform["recommendId"] = val.recommendId;
            this.poorform.productType = val.productType;
            this.poorform.poorArea = val.poorArea;
            this.tableData[valId]["editpk"] = true;
            this.lastPooedit = valId;
          } else {
            this.$confirm("是否放弃本次修改")
              .then(() => {
                for (let i = 0; i < this.tableData.length; i++) {
                  this.tableData[i]["editpk"] = false;
                }
                this.tableData[valId]["editpk"] = true;
                this.lastPooedit = valId;
              })
              .catch(() => {
                this.$message.info("已取消本次操作");
              });
          }
        } else {
          this.$message({
            type: "error",
            message: res
          });
        }
      }).catch(e => {});
    },
    // 保存贫困地区
    pooSeave(val, valId, datae) {
      this.lastPooedit = "";
      this.$refs[datae].validate((vald) => {
        if (vald) {
          this.updaterecommendCompany(this.poorform)
            .then(res => {
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.tableData[valId]["editzl"] = false;
              this.getListPage(this.obj); // 调用初始加载页面方法
            })
            .catch(e => {});
        } else {
          return false;
        }
      });
    },
    // 新增 保存
    handSeave(fname) {
      let tynum = (rule, value, callback) => {
        if (!value && value !== 0) {
          return callback(new Error("该字段为必填项"));
        } else if (!Number.isInteger(value - 0)) {
          return callback(new Error("请输入合法字符"));
        } else if (value < 0) {
          return callback(new Error("必须大于等于0"));
        } else {
          return callback();
        }
      };
      this.addForm["delegationId"] = this.$store.getters.userInfo.org.deptId;
      this.addForm["delegationCode"] = this.$store.getters.userInfo.org.deptCode;
      this.addForm["delegationName"] = this.$store.getters.userInfo.org.deptName;
      for (let i in this.exhibitData) {
        if (this.addForm.exhibitionAreaCode === this.exhibitData[i].exhibitionArea) {
          this.addForm["exhibitionAreaName"] = this.exhibitData[i].exhibitionAreaName;
        }
      }
      for (let j in this.companyData) {
        if (this.addForm.companyId === this.companyData[j].companyId) {
          this.addForm["companyCecfCode"] = this.companyData[j].cecfCode;
          this.addForm["companyName"] = this.companyData[j].companyName;
        }
      }
      if ((Number(this.addForm.recommendSpecial) <= Number(this.addForm.lastIsSpecialNumber)) && this.addForm.lastIsSpecialNumber != null) {
        this.$message("特装展位数量与上届相比减少");
      }
      // if (this.addForm.exhibitionAreaCode === "MA02" || this.addForm.exhibitionAreaCode === "MA07" || this.addForm.exhibitionAreaCode === "MA08" || this.addForm.exhibitionAreaCode === "VS04" || this.addForm.exhibitionAreaCode === "HD06") {
      //   this.tybzdisable = true;
      //   this.rules.recommendStandard = [];
      // } else {
      //   this.rules.recommendStandard = [{ validator: tynum, required: true, trigger: "blur" }];
      //   this.tybzdisable = false;
      // }
      if (this.addForm.exhibitionAreaCode === "MA02") {
        this.dxjxdisable = true;
        this.rules.recommendCentralchannel = [];
        this.rules.recommendSpecial = [];
      } else {
        this.dxjxdisable = false;
        this.rules.recommendCentralchannel = [{ validator: tynum, required: true, trigger: "blur" }];
        this.rules.recommendSpecial = [{ validator: tynum, required: true, trigger: "blur" }];
      }
      if (this.addForm.recommendSpecial < this.addForm.applyAdjoinNumber || this.addForm.applyAdjoinNumber === "0") {
        this.$message("填写的粘连数量应小于等于特装推荐数且大于零");
      } else
      if (this.addForm.recommendSpecial === "") {
        this.addForm.recommendSpecial = this.addForm.applyAdjoinNumber;
      } else {
        this.$refs[fname].validate((valid) => {
          if (valid) {
            this.addrecommendCompany(this.addForm).then(res => {
              this.isExhibit = false;
              this.tybzdisable = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              for (let key in this.addForm) {
                this.addForm[key] = "";
              }
              for (let key in this.addtForm) {
                this.addtForm[key] = "";
              }
              this.getListPage(this.obj); // 调用初始加载页面方法
            }).catch(e => {});
          } else {
            return false;
          }
        });
      }
    },
    // 新增 取消
    handCancel() {
      this.isExhibit = false;
      for (let key in this.addForm) {
        this.addForm[key] = "";
      }
      for (let key in this.addtForm) {
        this.addtForm[key] = "";
      }
    },
    // 分条/页
    handleSizeChange(val) {
      this.obj.size = val;
      this.getTime();
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getTime();
      this.getListPage(this.obj);
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
  display: flex;
  align-items: flex-end;
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
.impfloat {
  margin-left: 10px;
  display: inline-block;
}
.floatlaf {
  float: left;
}
.total-footer {
  text-align: center;
  padding: 20px 0;
}
.clic {
  cursor: pointer;
  color: #00f;
  text-decoration: underline;
}
</style>
