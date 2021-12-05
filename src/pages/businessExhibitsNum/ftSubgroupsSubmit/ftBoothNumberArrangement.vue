<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="分团填写一般性展位数量安排" name="first">
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
          <!--
          <el-form-item label="是否商会会员">
            <el-select v-model="formData.isCoceralVip" class="widtwo" clearable>
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="0"></el-option>
            </el-select>
          </el-form-item>
          -->
          <!-- <el-form-item label="分团">
            <el-select v-model="formData.delegationSubId" clearable>
              <el-option v-for="(item, index) in optionsub" :key="index" :label="item.subgropName" :value="item.subgropCode"></el-option>
            </el-select>
          </el-form-item> -->
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
            <el-button class="formStyle floatlaf" type="primary" @click="isUp = true; fileForm.chooseFileName = ''">导入</el-button>
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
        <!-- 进度条 -->
        <el-dialog title="请稍等" :visible.sync="progressVisible" v-if="progressVisible" :close-on-click-modal="false" :close-on-press-escape="false" :show-close="false">
          <div class="total-footer">
            <el-progress :text-inside="true" :stroke-width="14" :percentage="percent" :color="colorArray"></el-progress>
          </div>
        </el-dialog>
        <!-- 表格 -->
        <el-table :data="tableData" size="small" style="width: 100%" v-loading="loading" border>
          <!--<el-table-column type="selection" width="55" :selectable="isSelectable"></el-table-column>-->
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
          <!--
          <el-table-column align="center" label="上届是否绿色特装" min-width="120" prop="lastIsGreenSpecial">
            <template slot-scope="scope">
              {{scope.row.lastIsGreenSpecial | ynStatus}}
            </template>
          </el-table-column>
          -->
          <el-table-column align="center" label="上届安排特装数" min-width="120" prop="lastSpecialNumber"></el-table-column>
          <el-table-column align="center" label="特装推荐数" min-width="120" prop="recommendSpecial">
            <template slot-scope="scope">
              <div v-if="Number(scope.row.recommendSpecial) !== 0 || scope.row.tzShow">
                <div v-if="scope.row.tzShow">
                  <el-form :model="editform" :rules="editrule" ref="recommendSpecial" label-width="0px">
                    <el-form-item prop="recommendSpecial">
                      <el-input v-model.trim.number="editform.recommendSpecial" maxlength="11"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <span v-else>{{scope.row.recommendSpecial}}</span>
              </div>
              <div v-if="!Number(scope.row.recommendSpecial)"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="标摊推荐数" min-width="120" prop="recommendStandard">
            <template slot-scope="scope">
              <div v-if="Number(scope.row.recommendStandard) !== 0 || scope.row.btShow">
                <div v-if="scope.row.btShow">
                  <el-form :model="editform" :rules="editrule" ref="recommendStandard" label-width="0px">
                    <el-form-item prop="recommendStandard">
                      <el-input v-model.trim.number="editform.recommendStandard" maxlength="11"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <span v-else>{{scope.row.recommendStandard}}</span>
              </div>
              <div v-if="!Number(scope.row.recommendStandard)"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="统一布展推荐数" min-width="120" prop="recommendUnified">
            <template slot-scope="scope">
              <div v-if="Number(scope.row.recommendUnified) !== 0 || scope.row.tyShow">
                <div v-if="scope.row.tyShow">
                  <el-form :model="editform" :rules="editrule" ref="recommendUnified" label-width="0px">
                    <el-form-item prop="recommendUnified">
                      <el-input v-model.trim.number="editform.recommendUnified" maxlength="11"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <span v-else>{{scope.row.recommendUnified}}</span>
              </div>
              <div v-if="!Number(scope.row.recommendUnified)"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="一般性展位安排总数" min-width="120" prop="recommendSumNumber">
            <template slot-scope="scope">
              <div v-if="Number(scope.row.recommendSumNumber) !== 0 || scope.row.tyShow">
                <div v-if="scope.row.tyShow">
                  <el-form :model="editform" disabled :rules="editrule" ref="editref" label-width="0px">
                      <el-form-item prop="recommendSumNumber">
                        <el-input v-model.trim="editform.recommendSumNumber"></el-input>
                      </el-form-item>
                  </el-form>
                </div>
                <span v-else>{{scope.row.recommendSumNumber}}</span>
              </div>
              <div v-if="!Number(scope.row.recommendSumNumber)"></div>
            </template>
          </el-table-column>
          <!--<el-table-column align="center" label="企业申请粘连展位数" min-width="120" prop="applyAdjoinNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.numaDisa">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="applyAdjoinNumber">
                    <el-input v-model.trim.number="editform.applyAdjoinNumber"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.applyAdjoinNumber}}</span>
            </template>
          </el-table-column>-->
          <el-table-column align="center" label="中央通道推荐数" min-width="120" prop="recommendCentralchannel">
            <template slot-scope="scope">
              <div v-if="Number(scope.row.recommendCentralchannel) !== 0 || scope.row.edit">
                <div v-if="scope.row.edit">
                  <el-form :model="editform" :rules="editrule" ref="recommendCentralchannel" label-width="0px">
                    <el-form-item prop="recommendCentralchannel">
                      <el-input v-model.trim.number="editform.recommendCentralchannel" maxlength="11"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <span v-if="!scope.row.edit">{{scope.row.recommendCentralchannel}}</span>
              </div>
              <div v-if="!Number(scope.row.recommendCentralchannel)"></div>
            </template>
          </el-table-column>
          <el-table-column align="center" label="交易团推荐粘连数" min-width="120" prop="applyAdjoinNumber">
            <template slot-scope="scope">
              <div v-if="Number(scope.row.applyAdjoinNumber) !== 0 || scope.row.numaDisa">
                <div v-if="scope.row.numaDisa">
                  <el-form :model="editform" :rules="editrule" ref="applyAdjoinNumber" label-width="0px">
                    <el-form-item prop="applyAdjoinNumber">
                      <el-input v-model.trim="editform.applyAdjoinNumber"></el-input>
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
          <!--
          <el-table-column align="center" label="是否商会会员" min-width="120" prop="isCoceralVip">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
                  <el-form-item prop="isCoceralVip">
                    <el-select v-model="editform.isCoceralVip" @change="handleChange" clearable>
                      <el-option label="是" value="1"></el-option>
                      <el-option label="否" value="0"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>
                {{scope.row.isCoceralVip | ynStatus}}
              </span>
            </template>
          </el-table-column>
          -->
          <el-table-column align="center" label="商会意见" min-width="120" prop="coceralOpinion">
            <template slot-scope="scope">
              {{ scope.row.coceralOpinion | coceralStatus }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="城市" min-width="120" prop="city"></el-table-column>
          <el-table-column align="center" label="安排情况" min-width="120" prop="schedulePlan">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="editform" disabled label-width="0px">
                  <el-form-item prop="schedulePlan">
                    <el-select v-model="editform.schedulePlan" clearable>
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
          <el-table-column align="center" min-width="120" label="交易团审核情况" prop="examineStatus">
            <template slot-scope="scope">
              {{scope.row.examineStatus | coceralStatus}}
            </template>
          </el-table-column>
          <el-table-column v-if="delsub" key="delsub" align="center" label="操作" fixed="right" width="160">
            <template slot-scope="scope">
              <el-button
                type="text"
                v-if="!scope.row.edit"
                :disabled="scope.row.examineStatus === '1' || scope.row.examineStatus === '3'"
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
      //   return callback(new Error("该字段为必填项"));
      // } else
      if (!Number.isInteger(value - 0)) {
        return callback(new Error("请输入合法字符"));
      } else if (value < 0) {
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
        delegationId: "010",
        subGroupId: '',
        deptType: ''
      },
      // url: process.env.API_NA_URL,
      objcompany: {
        delegationId: "010" // 北京
      },
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
      isUp: false,
      loading: false,
      fileForm: {
        chooseFileName: ""
      },
      list: [], //获取城市
      dictionary: {
        city: []
      },
      // 需要校验的项
      rulesList: ['applyAdjoinNumber', 'recommendSpecial', 'recommendStandard', 'recommendUnified', 'recommendCentralchannel'],
      productType: "", // 布展类型
      formData: {
        companyName: "",
        coceralId: "",
        exhibitionArea: "",
        // isCoceralVip: "",
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
        // examineAdjoinNumber: "",
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
        // examineAdjoinNumber: "",
        recommendSpecial: "",
        recommendStandard: "",
        recommendUnified: "",
        recommendCentralchannel: "",
        isCoceralVip: "",
        schedulePlan: ""
      },
      fileRule: {
        chooseFileName: [{ required: true, message: "请上传文件", trigger: "change" }]
      },
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
        // examineAdjoinNumber: [{ validator: tynum, required: true, trigger: "blur" }],
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
        businessAssociation: [] // 商协会
      },
      optionsub: [], // 分团数据
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      paramd: {},
      delsub: true, // 是否授权
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
    coceralStatus(value) {
      let val = Number(value);
      if (val === 1) {
        return "审核通过";
      } else if (val === 0) {
        return "未审核";
      } else if (val === 2) {
        return "审核不通过";
      } else if (val === 3) {
        return "已修改";
      }
    }
  },
  created() {
    if (this.$store.getters.userInfo.org.parentId) {
      this.obj.delegationId = this.$store.getters.userInfo.org.parentId;
      this.obj.subGroupId = this.$store.getters.userInfo.org.deptId;
      this.obj.deptType = this.$store.getters.userInfo.org.deptType;
      this.objcompany.delegationId = this.$store.getters.userInfo.org.parentId;
      this.obj.delegationCode = this.$store.getters.userInfo.org.parentCode;
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
    // 获取交易团下分团的数据
    // this.getsubCluster({
    //   delegationId: this.$store.getters.userInfo.org.deptId
    // }).then(res => {
    //   this.optionsub = JSON.parse(JSON.stringify(res));
    // }).catch(e => {});
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
    this.getlistPageAuthorizeLog({
      delegationSubId: this.$store.getters.userInfo.org.deptId
    }).then(res => {
      if (res.records && res.records.length > 0 && res.records[0].authorizeStatus === "0") {
        this.delsub = false;  // 不可以编辑和删除
      } else {
        this.delsub = true;  // 可以编辑和删除
      }
    });
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
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
      "getlistPageAuthorizeLog", // 查询交易团授权信息
      "updateRecommendBranch", // 分团编辑设置的一般性展位安排 19/5/18
      "addrecommendBranch", // 分团填写一般性展位安排 19/5/18
      "getlistRecommendCompany", // 查询分团提交的一般性展位安排   +++++
      "getlistAllCompany", // 交易团根据企业名和展区查询企业一般性展位申请数据
      "getlistLastNumber", // 交易团新增获取上届数据
      // "getrecommendCompany", // 交易团提交一般性展位数量安排时，获取分团提交的安排
      "addrecommendCompany", // 交易团新增设置的一般性展位安排
      "updaterecommendCompany", // 交易团编辑设置的一般性展位安排
      "getadjoinRecommendCompany", // 交易团/分团设置粘连性
      "getpoorRecommendCompany", // 交易团/分团设置贫困地区
      "deletebyIdBranch", // 分团删除设置的一般性展位安排   +++++
      "getlistAllExhibitionArea", // 一般性展位安排展区名查询 0
      "getlistAllCompanyDemand", // 一般性展位安排企业名查询 0
      "uploadordinaryRecommendCompany", // 上传
      "getlistAllProduct", // 产品类别
      "getsysDepartment" // 分团 固定 deptType = 3;
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
    // 获取页面数据
    getListPage(Url) {
      this.loading = true;
      this.getlistRecommendCompany(Url)
        .then(res => {
          this.fullLoading = false;
          this.loading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          for (let i = 0; i < getTable.length; i++) {
            // if (getTable[i]["recommendSpecial"] === '0') {
            //   getTable[i]["recommendSpecial"] = "";
            // } else if (getTable[i]["recommendStandard"] === '0') {
            //   getTable[i]["recommendStandard"] = "";
            // } else if (getTable[i]["recommendCentralchannel"] === '0') {
            //   getTable[i]["recommendCentralchannel"] = "";
            // } else if (getTable[i]["recommendUnified"] === '0') {
            //   getTable[i]["recommendUnified"] = "";
            // } else if (getTable[i]["adhesionNumberResult"] === '0') {
            //   getTable[i]["adhesionNumberResult"] = "";
            // } else if (getTable[i]["recommendSumNumber"] === '0') {
            //   getTable[i]["recommendSumNumber"] = "";
            // } else if (getTable[i]["applyAdjoinNumber"] === '0') {
            //   getTable[i]["applyAdjoinNumber"] = "";
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
    // 查询
    onSearch() {
      this.loading = true;
      this.obj = {
        current: "1",
        size: "10",
        delegationId: "010"
      };
      if (this.$store.getters.userInfo.org.parentId) {
        this.obj.delegationId = this.$store.getters.userInfo.org.parentId;
        this.obj.subGroupId = this.$store.getters.userInfo.org.deptId;
        this.obj.deptType = this.$store.getters.userInfo.org.deptType;
        this.objcompany.delegationId = this.$store.getters.userInfo.org.parentId;
        this.obj.delegationCode = this.$store.getters.userInfo.org.parentCode;
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
      this.getListPage(this.obj);
    },
    // 下载
    hanDownload() {
      if (this.$store.getters.userInfo.org.parentId) {
        this.obj.delegationId = this.$store.getters.userInfo.org.parentId;
        this.obj.subGroupId = this.$store.getters.userInfo.org.deptId;
        this.obj.deptType = this.$store.getters.userInfo.org.deptType;
        this.objcompany.delegationId = this.$store.getters.userInfo.org.parentId;
        this.obj.delegationCode = this.$store.getters.userInfo.org.parentCode;
      }
      let url = this.paginationData.currentPage + "&size=" + this.paginationData.total + "&cecfCode=" + this.formData.cecfCode + "&delegationId=" + this.obj.delegationId + "&exhibitionArea=" + this.formData.exhibitionArea + "&companyName=" + this.formData.companyName + "&coceralId=" + this.formData.coceralId + "&exhibitionType=" + this.formData.exhibitionType + "&isBrandCompany=" + this.formData.isBrandCompany + "&schedulePlan=" + this.formData.schedulePlan + "&subGroupId=" + this.obj.subGroupId + "&deptType=" + this.obj.deptType + "&token=" + localStorage.getItem("USER_TOKEN");
      url = url.replace(/undefined/g, '');
      window.open(process.env.API_NA_URL + "/api/ordinaryRecommendBranch/download?current=" + url, "_parent");
    },
    //选择提交
    // handleSelectionChange(val) {
    //   val.forEach(el => {
    //     this.multipleSelection.push(el.recommendId);
    //   });
    // },
    //判断是否可选
    // isSelectable(row, index) { //1是已提交不可选,0是未提交可选
    //   //if (row.isSubmit === '1') {
    //   //  return false;
    //   //} else {
    //   return false;
    //   //}
    // },
    // 提交
    handSubmit() {
      // if (this.multipleSelection.length > 0) {
      this.fullLoading = true;
      this.loading = true;
      this.$http.postJson(`${process.env.API_NA_URL}/api/ordinaryRecommendBranch/submit`, `${this.$store.getters.userInfo.org.deptId}`).then(res => {
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
    // // 导入（上传）
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
    //导入上传
    handleUploadFile(param) {
      this.percent = 0;
      let fullScreenloading = this.$loading({ fullscreen: true });
      let formData = new FormData();
      formData.append('file', param.file);
      //formData.append('dept', this.$store.getters.userInfo.org);
      //console.log(this.$store.getters.userInfo.org);
      // formData.append('subGroupId', this.obj.subGroupId);
      // formData.append('delegationId', this.obj.delegationId);
      // formData.append('delegationCode', this.obj.delegationCode);
      // this.uploadordinaryRecommendCompany(formData).then(() => {
      //   this.$message.success('导入成功');
      //   this.getListPage(this.obj);
      //   this.isUp = false;
      // }).catch(e => {});
      formData.append('deptCode', this.$store.getters.userInfo.org.deptCode);
      formData.append('deptId', this.$store.getters.userInfo.org.deptId);
      formData.append('deptName', this.$store.getters.userInfo.org.deptName);
      formData.append('deptType', this.$store.getters.userInfo.org.deptType);
      formData.append('parentCode', this.$store.getters.userInfo.org.parentCode);
      formData.append('parentId', this.$store.getters.userInfo.org.parentId);
      formData.append('parentName', this.$store.getters.userInfo.org.parentName);
      // jcrao 2019.7.3 添加进度条
      const http = axios.create({
        baseURL: process.env.API_NA_URL
      });
      let timer = null;
      let timers = null;
      let t = 1;
      new Promise((resolve, reject) => {
        http({
          method: 'POST',
          url: `${process.env.API_NA_URL}/api/ordinaryRecommendBranch/upload?token=${localStorage.getItem('USER_TOKEN')}`,
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
                _this.$message.success('导入成功');
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
      // this.$http.postJson(`${process.env.API_NA_URL}/api/ordinaryRecommendBranch/upload`, formData).then(() => {
      //   this.$nextTick(() => {
      //     fullScreenloading.close();
      //   });
      //   this.$message.success('导入成功');
      //   this.fileForm.chooseFileName = '';
      //   this.getListPage(this.obj);
      //   this.isUp = false;
      // }).catch(e => {
      //   //this.$message.error('导入数据有问题');
      //   this.$nextTick(() => {
      //     fullScreenloading.close();
      //   });
      //   this.fileForm.chooseFileName = '';
      //   this.$refs.upload.clearFiles();
      // });
    },
    // on-change
    handleChange(file, filist) {
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
      let url = this.paginationData.currentPage + "&size=" + this.paginationData.total + "&cecfCode=" + this.formData.cecfCode + "&delegationId=" + this.obj.delegationId + "&exhibitionArea=" + this.formData.exhibitionArea + "&companyName=" + this.formData.companyName + "&coceralId=" + this.formData.coceralId + "&exhibitionType=" + this.formData.exhibitionType + "&isBrandCompany=" + this.formData.isBrandCompany + "&schedulePlan=" + this.formData.schedulePlan + "&subGroupId=" + this.obj.subGroupId + "&deptType=" + this.obj.deptType + "&token=" + localStorage.getItem("USER_TOKEN");
      url = url.replace(/undefined/g, "");
      window.open(`${process.env.API_NA_URL}/api/ordinaryRecommendBranch/download?current=` + url, '_blank');
    },
    // 编辑
    onEdit(val, valId) {
      // let datan = {
      //   delegationId: val.delegationId,
      //   companyId: val.companyId,
      //   exhibitionAreaCode: val.exhibitionArea
      // };
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
          // this.getrecommendCompany(datan).then(resa => {
          //   if (resa === "0") {
          //     this.$message({
          //       type: "error",
          //       message: "该企业该展区交易团分团已经提交了推荐方案，需进行审核"
          //     });
          //   } else {
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
            this.editform.isCoceralVip = val.isCoceralVip;
            this.editform.schedulePlan = val.schedulePlan;
            this.editform["branchId"] = val.branchId;
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
                // this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                // this.editrule.examineAdjoinNumber[0].required = true;
                this.editrule.applyAdjoinNumber[0].required = true;
                // this.numaDisa = true;
                this.tableData[valId]["numaDisa"] = true;
                this.isBrandc = "1";
              } else {
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
              delegationId: this.$store.getters.userInfo.org.parentId,
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
                this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                this.editform.recommendSpecial = val.recommendSpecial;
                this.editform.recommendStandard = val.recommendStandard;
                this.editform.recommendUnified = val.recommendUnified;
                this.editform.recommendCentralchannel = val.recommendCentralchannel;
                this.editform.isCoceralVip = val.isCoceralVip;
                this.editform.schedulePlan = val.schedulePlan;
                this.editform["branchId"] = val.branchId;
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
                    // this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                    this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                    // this.editrule.examineAdjoinNumber[0].required = true;
                    this.editrule.applyAdjoinNumber[0].required = true;
                    // this.numaDisa = true;
                    this.tableData[valId]["numaDisa"] = true;
                    this.isBrandc = "1";
                  } else {
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
                  delegationId: this.$store.getters.userInfo.org.parentId,
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
                  this.tableData[valId]["edit"] = false;
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
          //   }
          // }).catch(e => {});
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
              // this.getrecommendCompany(datan).then(resa => {
              //   if (resa === "0") {
              //     this.$message({
              //       type: "error",
              //       message: "该企业该展区交易团分团已经提交了推荐方案，需进行审核"
              //     });
              //   } else {
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
                this.editform.isCoceralVip = val.isCoceralVip;
                this.editform.schedulePlan = val.schedulePlan;
                this.editform["branchId"] = val.branchId;
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
                    // this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                    this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                    // this.editrule.examineAdjoinNumber[0].required = true;
                    this.editrule.applyAdjoinNumber[0].required = true;
                    // this.numaDisa = true;
                    this.tableData[valId]["numaDisa"] = true;
                    this.isBrandc = "1";
                  } else {
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
                  delegationId: this.$store.getters.userInfo.org.parentId,
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
                  this.tableData[valId]["edit"] = false;
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
                    this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                    this.editform.recommendSpecial = val.recommendSpecial;
                    this.editform.recommendStandard = val.recommendStandard;
                    this.editform.recommendUnified = val.recommendUnified;
                    this.editform.recommendCentralchannel = val.recommendCentralchannel;
                    this.editform.isCoceralVip = val.isCoceralVip;
                    this.editform.schedulePlan = val.schedulePlan;
                    this.editform["branchId"] = val.branchId;
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
                        // this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                        this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                        // this.editrule.examineAdjoinNumber[0].required = true;
                        this.editrule.applyAdjoinNumber[0].required = true;
                        // this.numaDisa = true;
                        this.tableData[valId]["numaDisa"] = true;
                        this.isBrandc = "1";
                      } else {
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
                      delegationId: this.$store.getters.userInfo.org.parentId,
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
                      this.tableData[valId]["edit"] = false;
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
              //   }
              // }).catch(e => {});
            } else if (ynParr.indexOf(resc.punishInfos[i].eventCode) !== -1) {
              this.isPass = false;
              if (resc.punishInfos[i].eventCode === "109") {
                a = 1;
              } else if (resc.punishInfos[i].eventCode === "110") {
                b = 2;
              }
              this.numShot = a + b;
              // 交易团提交一般性展位数量安排时，获取分团提交的安排
              // this.getrecommendCompany(datan).then(resa => {
              //   if (resa === "0") {
              //     this.$message({
              //       type: "error",
              //       message: "该企业该展区交易团分团已经提交了推荐方案，需进行审核"
              //     });
              //   } else {
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
                this.editform.isCoceralVip = val.isCoceralVip;
                this.editform.schedulePlan = val.schedulePlan;
                this.editform["branchId"] = val.branchId;
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
                    // this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                    this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                    // this.editrule.examineAdjoinNumber[0].required = true;
                    this.editrule.applyAdjoinNumber[0].required = true;
                    // this.numaDisa = true;
                    this.tableData[valId]["numaDisa"] = true;
                    this.isBrandc = "1";
                  } else {
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
                  delegationId: this.$store.getters.userInfo.org.parentId,
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
                  this.tableData[valId]["edit"] = false;
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
                    this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                    this.editform.recommendSpecial = val.recommendSpecial;
                    this.editform.recommendStandard = val.recommendStandard;
                    this.editform.recommendUnified = val.recommendUnified;
                    this.editform.recommendCentralchannel = val.recommendCentralchannel;
                    this.editform.isCoceralVip = val.isCoceralVip;
                    this.editform.schedulePlan = val.schedulePlan;
                    this.editform["branchId"] = val.branchId;
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
                        // this.editform.examineAdjoinNumber = val.examineAdjoinNumber;
                        this.editform.applyAdjoinNumber = val.applyAdjoinNumber;
                        // this.editrule.examineAdjoinNumber[0].required = true;
                        this.editrule.applyAdjoinNumber[0].required = true;
                        // this.numaDisa = true;
                        this.tableData[valId]["numaDisa"] = true;
                        this.isBrandc = "1";
                      } else {
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
                      delegationId: this.$store.getters.userInfo.org.parentId,
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
                      this.tableData[valId]["edit"] = false;
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
              //   }
              // }).catch(e => {});
            }
          }
        }
      });

    },
    // 编辑 保存
    onServe(val, valId, datae) {
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
      sumNum = (this.editform.recommendSpecial - 0) + (this.editform.recommendStandard - 0) + (this.editform.recommendCentralchannel - 0) + (this.editform.recommendUnified - 0);
      this.lastIndexPage = "";
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
        if (val.branchId != null) {
          if (this.isPass) {
            if ((Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
              this.updateRecommendBranch(this.editform)
                .then(res => {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
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
                  this.lastIndexPage = valId;
                });
            // } else if (this.tableData[valId]["numaDisa"]) {
            //   this.$message({
            //     message: "填写的粘连数量应小于等于特装推荐数且大于零",
            //     type: "warning"
            //   });
            } else {
              this.updateRecommendBranch(this.editform)
                .then(res => {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
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
                  this.lastIndexPage = valId;
                });
            }
          } else
          if ((Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
            if ((sumNum <= (val.lastRecommendSumNumber - this.numShot)) && val.lastRecommendSumNumber !== "0") {
              this.updateRecommendBranch(this.editform)
                .then(res => {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
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
                  this.lastIndexPage = valId;
                });
            } else {
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
            this.updateRecommendBranch(this.editform)
              .then(res => {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
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
                this.lastIndexPage = valId;
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
            // examineAdjoinNumber: this.editform.examineAdjoinNumber,
            isCoceralVip: this.editform.isCoceralVip,
            isBrandCompany: this.isBrandc, // 是否品牌
            recommendStandard: this.editform.recommendStandard,
            recommendUnified: this.editform.recommendUnified,
            recommendSpecial: this.editform.recommendSpecial,
            recommendCentralchannel: this.editform.recommendCentralchannel,
            productType: this.editform.productType,
            poorArea: this.editform.poorArea,
            schedulePlan: this.editform.schedulePlan,
            delegationId: this.$store.getters.userInfo.org.parentId,
            delegationCode: this.$store.getters.userInfo.org.parentCode,
            delegationName: this.$store.getters.userInfo.org.parentName,
            delegationSubId: this.$store.getters.userInfo.org.deptId,
            delegationSubCode: this.$store.getters.userInfo.org.deptCode,
            delegationSubName: this.$store.getters.userInfo.org.deptName
          };
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
            if ((Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
              this.addrecommendBranch(this.addForm)
                .then(resa => {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
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
                  this.lastIndexPage = valId;
                });
            // } else if (this.tableData[valId]["numaDisa"]) {
            //   this.$message({
            //     message: "填写的粘连数量应小于等于特装推荐数且大于零",
            //     type: "warning"
            //   });
            } else {
              this.addrecommendBranch(this.addForm)
                .then(resa => {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
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
                  this.lastIndexPage = valId;
                });
            }
          } else
          if ((Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial)) && (Number(this.editform.applyAdjoinNumber) > 0 && Number(this.editform.applyAdjoinNumber) <= Number(this.editform.recommendSpecial))) {
            if ((sumNum <= (val.lastRecommendSumNumber - this.numShot)) && val.lastRecommendSumNumber !== "0") {
              this.addrecommendBranch(this.addForm)
                .then(resa => {
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
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
                  this.lastIndexPage = valId;
                });
            } else {
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
            this.addrecommendBranch(this.addForm)
              .then(resa => {
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
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
                this.lastIndexPage = valId;
              });
          }
        }
      } else {
        return false;
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
          if (val.branchId == null) {
            delId = {
              branchId: ""
            };
          } else {
            delId = {
              branchId: val.branchId
            };
          }
          this.deletebyIdBranch(delId)
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
