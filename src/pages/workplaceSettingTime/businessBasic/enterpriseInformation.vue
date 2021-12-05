<style lang="less" scoped>
.recognitionBooths {
  .box-card {
    margin-bottom: 24px;
  }
  .btnClass {
    text-align: center;
    margin: 20px 0;
    /deep/.el-dialog__header {
      text-align: left;
    }
  }
  .newbtn {
    padding: 10px 0;
    border: 1px solid #ebeef5;
    border-top: 0;
    font-size: 12px;
    background-color: #F5F7FA;
  }
  .newfathbtn {
    border: 1px solid #ebeef5;
    border-top: 0; display: flex;
    justify-content: space-around;
    line-height: 34px;
    .newonebtn {
      border-right: 1px solid #ebeef5;
      flex:1;
      text-align: center;
    }
    .newtwobtn {
      display: inline;
    }
  }
  .fathbtn {
    border: 1px solid #ebeef5;
    border-top: 0;
    display: flex;
    justify-content: space-around;
    line-height: 34px;
    .onebtn {
      width: 50%;
      box-sizing: border-box;
      text-align: center;
    }
  }
  .rightbtn {
    text-align: right;
    border: 1px solid #ebeef5;
    padding: 20px;
  }
  .context p{
    text-align: justify;
    text-justify: inter-ideograph;
    text-indent: 2em;
  }
}
.total-footer{
  text-align: center;
  padding: 20px 0;
}
  /*table start*/
  table.default-table{
    /* -moz-border-radius: 5px;
    -webkit-border-radius:5px;
    border-radius:5px; */
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
 "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
    width: 100%;
    border:solid #EBEEF5;
    border-width:1px 0px 0px 1px;
    border-collapse: collapse;
    border-spacing: 0;
    color: #909399;
    font-size: 12px;
  }
  table.default-table tr{
    height: 23px;
    color: #909399;
    line-height: 23px;
  }
  table.default-table tr.odd{
    background-color: #fff;
  }
  table.default-table tr.even{
    background-color: #F5F5F5;
  }
  table.default-table tr:hover{
    background-color: #eee;
  }
  table.default-table tr th,table.default-table tr td{
    width: 25%;
    padding:6px 20px;
    text-align: left;
    /* border: 1px solid #ddd; */
    border:solid #EBEEF5;
    border-width:0px 1px 1px 0px;
  }
  table.default-table tr th{
    font-weight: bold;
    text-align: center;
  }
  table.default-table tr td.tac{
    color: #606266;
    text-align: left;
  }
  table.default-table tr td.tbc{
    color: #606266;
    text-align: right;
  }
  table.default-table tr td a:hover{
    color:#0080c0;
  }
// 表格结束 ↑
// 弹框 ↓
  .cont {
    text-align: center;
    margin-top: 20px;
    padding-bottom: 20px;
  }
  .formStyle {
    padding: 8px 30px;
  }
</style>
<template>
  <el-tabs v-model="activeName" class="recognitionBooths">
    <el-tab-pane label="审核企业清单" name="first"></el-tab-pane>
    <!-- 企业基本资料 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>企业基本资料:</span>
      </div>
      <div>
        <table class="default-table">
          <tr>
            <th>项目</th>
            <th>内容</th>
            <th>项目</th>
            <th>内容</th>
          </tr>
          <tr>
            <td class="tbc">企业中文名称</td>
            <td class="tac">{{enterpriseList.companyName}}</td>
            <td class="tbc">企业英文名称</td>
            <td class="tac">{{enterpriseList.companyNameEn}}</td>
          </tr>
          <tr>
            <td class="tbc">企业简称</td>
            <td class="tac">{{enterpriseList.enterpriseAbbreviation}}</td>
            <td class="tbc">广交会编码</td>
            <td class="tac">{{enterpriseList.cantonCode}}</td>
          </tr>
          <tr>
            <td class="tbc">企业中文地址</td>
            <td class="tac">{{enterpriseList.adressCh}}</td>
            <td class="tbc">企业英文地址</td>
            <td class="tac">{{enterpriseList.adressEn}}</td>
          </tr>
          <tr>
            <td class="tbc">邮政编码</td>
            <td class="tac">{{enterpriseList.postalCode}}</td>
            <td class="tbc">法定代表人</td>
            <td class="tac">{{enterpriseList.legalPerson}}</td>
          </tr>
          <tr>
            <td class="tbc">企业统一社会信用代码（营业执照号）</td>
            <td class="tac">{{enterpriseList.businessLicenceNo}}</td>
            <td class="tbc">企业类型</td>
            <td class="tac">{{enterpriseList.enterprisesType | companyTypeFilter}}</td>
          </tr>
          <tr>
            <td class="tbc">企业属性</td>
            <td class="tac">{{enterpriseList.enterpriseAttribute | companyProp}}</td>
            <td class="tbc">上年度出口额（万美元）（企业填报）</td>
            <td class="tac">{{enterpriseList.exportVolumeLast}}</td>
          </tr>
          <tr>
            <td class="tbc">企业成立年份</td>
            <td class="tac">{{enterpriseList.incorporationYear}}</td>
            <td class="tbc">注册资本（万人民币）</td>
            <td class="tac">{{enterpriseList.registeredCapital}}</td>
          </tr>
          <tr>
            <td class="tbc">参展联系人</td>
            <td class="tac">{{enterpriseList.businessContactsCh}}</td>
            <td class="tbc">联系电话</td>
            <td class="tac">{{enterpriseList.telephone}}</td>
          </tr>
          <tr>
            <td class="tbc">电子邮箱</td>
            <td class="tac">{{enterpriseList.dedicatedEmail}}</td>
            <td class="tbc">联系手机</td>
            <td class="tac">{{enterpriseList.phone}}</td>
          </tr>
          <tr>
            <td class="tbc">企业传真</td>
            <td class="tac">{{enterpriseList.fax}}</td>
            <td class="tbc">企业网址</td>
            <td class="tac">{{enterpriseList.website}}</td>
          </tr>
        </table>
      </div>
      <!-- <cust-table :loading='loadingone' :cols="cols" :data="tableData" @deal-with-diff-event="dealWithDiffEvent"></cust-table> -->
      <!-- <div class="newfathbtn">
        <div class="newonebtn">审核</div>
        <div class="newonebtn">
          <el-button style="padding: 3px 0" type="text" @click="btnshow('通过')">通过</el-button>
          <el-button style="padding: 3px 0" type="text" @click="btnshow('不通过')">不通过</el-button>
        </div>
      </div> -->
      <div class="newfathbtn" style="margin-top: 30px; border-top: 1px solid #ebeef5; font-weight: 900;">
        <div class="newonebtn" style="background: #ebeef5;">是否大会禁止参展企业:</div>
        <div class="newonebtn" style="color: red;">
          <div v-if="!enterpriseList.forbidJoin">该企业属大会规定禁止参展的企业</div>
          <!-- <div v-else><el-button type="primary">{{enterpriseList.forbidJoin}}</el-button></div> -->
        </div>
      </div>
      <div class="newbtn context">
        <p> 企业不属于下列任一情况：</p>
        <p>（一）商务部向社会公告的违规违法企业，在公告期内禁止参展。</p>
        <p>（二）国家工商、海关、税务、质检、外汇、环保、药监等部门通报的违规违法企业, 在处罚期限内禁止参展；无处罚期限的，从处罚之日起连续六届禁止参展。</p>
        <p>（三）因违规转让或转租（卖）广交会展位、涉嫌展品质量与贸易纠纷投诉、知识产权侵权等行为违反大会相关规定，并处于被取消参展资格处罚期限内的企业。</p>
        <p>（四）因拒不服从大会管理、破坏展览秩序等其他行为，被大会认为对广交会声誉或正常运营造成较大不良影响，被取消参展资格的企业。</p>
      </div>
      <div class="newfathbtn">
        <div class="newonebtn">交易团审核：{{enterpriseList.clusterCheckStatus | checkStatus}}</div>
        <div class="newonebtn" v-if="enterpriseList.clusterCheckStatus === '1'">交易团审核不通过原因：无</div>
        <div class="newonebtn" v-else-if="enterpriseList.clusterCheckStatus === '2'">交易团审核不通过原因：{{enterpriseList.clusterCheckOpinion}}</div>
        <div class="newonebtn" v-else>交易团审核不通过原因：{{enterpriseList.clusterCheckOpinion}}</div>
        <div class="newonebtn">分团审核：{{enterpriseList.subClusterCheckStatus | checkStatus}}</div>
        <div class="newonebtn" v-if="enterpriseList.subClusterCheckStatus === '1'">分团审核不通过原因：无</div>
        <div class="newonebtn" v-else-if="enterpriseList.subClusterCheckStatus === '2'">分团审核不通过原因：{{enterpriseList.subClusterCheckOpinion}}</div>
        <div class="newonebtn" v-else>分团审核不通过原因：{{enterpriseList.subClusterCheckOpinion}}</div>
        <div class="newtwobtn">
          <!-- 修改人 李康 时间 19/5/22 将style="padding: 3px 0" 删除 -->
          <el-button type="primary" :disabled="enterpriseList.auditability === '0' || disFlag === '0'" @click="btnshow('通过')">通过</el-button>
          <el-button type="primary" :disabled="enterpriseList.auditability === '0' || disFlag === '0'" @click="btnshow('不通过')">不通过</el-button>
        </div>
      </div>
      <!-- 第一个 通过 不通过 弹框 李康 新增于 5/22 18.30 -->
      <el-dialog title="审核" :visible.sync="isShow" v-if="isShow" :close-on-click-modal="false" width="500px">
        <el-form :model="auditForm" ref="auditRef" size="small" :rules="auditRules" label-width="120px">
          <el-form-item label="不通过原因 ：" prop="examineOpinion">
            <el-input type="textarea" v-model="auditForm.examineOpinion" row="5"></el-input>
          </el-form-item>
          <div class="cont">
            <el-button class="formStyle" @click="npSeave('auditRef')">保存</el-button>
            <el-button class="formStyle" @click="isShow = false">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
      <el-dialog title="设置公布批次时间" :visible.sync="btnDialogVisible" width="30%;">
        <btndialog @closeModal="customsModal" :subDisab="subDisab" :onebtnData="onebtnData"></btndialog>
      </el-dialog>
    </el-card>
    <!-- 企业进出口经营权 -->
    <el-card class="box-card" >
      <div slot="header" class="clearfix">
        <span>企业进出口经营权:</span>
      </div>
      <div>
        <el-table
          :data="exportDate"
          :loading='loadingExport'
          border
          style="width: 100%">
          <el-table-column
            align="center"
            prop="codeType"
            label="编码类型">
          </el-table-column>
          <el-table-column
            align="center"
            prop="code"
            label="编码">
          </el-table-column>
          <el-table-column
            align="center"
            prop="subClusterCheckStatus"
            label="分团审核情况">
          </el-table-column>
          <el-table-column
            align="center"
            prop="subClusterCheckOpinion"
            label="分团审核不通过原因">
          </el-table-column>
          <el-table-column
            align="center"
            prop="clusterCheckStatus"
            label="交易团审核情况">
          </el-table-column>
          <el-table-column
            align="center"
            prop="clusterCheckOpinion"
            label="交易团审核不通过原因">
          </el-table-column>
          <el-table-column
            align="center"
            prop=""
            label="操作">
            <template slot-scope="scope">
              <el-button style="text-decoration: underline;" :disabled="enterpriseList.auditability === '0' || disFlag === '0'" @click="twobtn('通过')" type="text" size="medium">通过</el-button>
              <el-button style="text-decoration: underline;" :disabled="enterpriseList.auditability === '0' || disFlag === '0'" type="text" size="medium" @click="twobtn('不通过')">不通过</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--
      <canbeedit-table
        :height='exporHeight'
        :loading='loadingExport'
        :tableTrData="tableTrData"
        :tableData="exportDate"
        @deal-with-change-status-event="dealWithChangeStatusEvent"
        @deal-with-operate="twobtn"
      ></canbeedit-table>
      <div class="fathbtn">
        <div class="onebtn" style="border-right: 1px solid #ebeef5;">审核</div>
        <div class="onebtn">
          <el-button style="cursor: pointer;text-decoration: underline;color: #f00; margin-right: 10px;" type="text" @click="twobtn('通过')">通过</el-button>
          <el-button style="cursor: pointer;text-decoration: underline;color: #f00; margin-right: 10px;" type="text" @click="twobtn('不通过')">不通过</el-button>
        </div>
      </div>
      -->
    </el-card>
    <!-- 不通过弹框 -->
    <el-dialog title="审核" :visible.sync="isPass" v-if="isPass">
      <el-form :model="checkTable" ref="checkTable" :rules="checkTableRules">
        <el-form-item label="不通过原因：" prop="examineOpinion" label-width="120px">
          <el-input type="textarea" v-model="checkTable.examineOpinion" :rows="4" maxlength="120"></el-input>
        </el-form-item>
      </el-form>
      <div class="total-footer">
        <el-button type="primary" size="medium" @click="handleSave('checkTable')">保存</el-button>
        <el-button size="medium" @click="isPass = false;">取消</el-button>
      </div>
    </el-dialog>
    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>出口额:</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <canBeEdit-table
        :tableTrData="exportTrDate"
        :tableData="exportData"
        @deal-with-change-status-event="dealWithChangeStatusEvent"
      ></canBeEdit-table>
    </el-card>-->
    <!-- 海关编码 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>企业海关编码/出口额:</span>
        <!-- <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="openaddCustoms"
        >新增</el-button> -->
      </div>
      <canbeedit-table
        :height='customsHeight'
        :loading="customsloading"
        :tableTrData="customsTrDate"
        :tableData="customstData"
        @deal-with-operate="customsEvent"
      ></canbeedit-table>
      <div class="fathbtn">
        <div class="onebtn" style="border-right: 1px solid #ebeef5;">企业广交会统计口径下上年度出口额是否达到最低参展标准</div>
        <div class="onebtn">
          <!-- {{amountsult.examineStatus}} -->
          <el-radio-group v-model="amountsult.examineStatus" @change="radioChange">
            <el-radio label="是">是</el-radio>
            <el-radio label="否">否</el-radio>
          </el-radio-group>
        </div>
        <!-- 修改人 李康 时间 19/5/22 将下面的通过 不通过 按钮禁用 -->
        <!-- <div class="onebtn">
          <el-button style="padding: 3px 0" type="primary" @click="getamountcheck('通过')">通过</el-button>
          <el-button style="padding: 3px 0" type="primary" @click="getamountcheck('不通过')">不通过</el-button>
        </div> -->
      </div>
      <!-- 新增海关编码弹框 -->
      <el-dialog title="新增" :visible.sync="dealWithaddCustoms" width="50%">
        <addcustomsCode @closeModal="addcustomsModal" :companyIdDate="companyIdDate"></addcustomsCode>
      </el-dialog>
    </el-card>
    <!-- 修改人 李康 将通过 不通过 修改为 含禁止参展产品和 不含禁止参展产品 19/5/19
        将 style="padding: 30px 0; color:red;" 改为 size="mini"  19/5/22
        将下面的el-card class="box-card" 注释了  时间 5/22 10.34分
    -->
    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>企业展品信息:</span>
      </div>
      <canbeedit-table
        :height='exhibitsHeight'
        :loading="loadtwo"
        :tableTrData="exhibitsTrDate"
        :tableData="ExhibitsDate"
        :selection ='selection'
        :isSelectable ='isSelectable'
        @change-multiple-selection ='selectAll'
        @deal-with-operate="exhibitsEvent"
      ></canbeedit-table>
      <pagination
        class="pages"
        :pageInfo="pageInfo"
        @handle-size-change="handleSizeChange"
        @handle-current-change="handleCurrentChange"
      ></pagination>
      <div class="rightbtn">
        <el-button type="primary" size="mini" @click="allpass">批量通过</el-button>
      </div>
      <div  class="fathbtn">
        <div class="onebtn" style="font-size: 12px;border-right: 1px solid #ebeef5; flex: 5;text-align: left;padding: 20px;">
          <p v-for="item in cityDate" :key="item.value">{{item.label}}</p>
        </div>
        <div class="onebtn" style="font-size: 12px;border-right: 1px solid #ebeef5; flex: 1;text-align: left;padding: 20px;">
          <p>交易团审核结果</p>
          <p>{{companyResult.clusterCheckStatus}}</p>
        </div>
        <div class="onebtn" style="font-size: 12px;border-right: 1px solid #ebeef5; flex: 1;text-align: left;padding: 20px;">
           <p>交易团分团审核结果</p>
          <p>{{companyResult.subClusterCheckStatus}}</p>
        </div>
        <div class="onebtn" style="border-right: 1px solid #ebeef5; flex: 2;">
          <div style="margin-top: 50%;">
            <el-button style="padding: 30px 0; color:red;" type="text" @click="producttextBtn('通过')">不含禁止参展产品</el-button>
            <el-button style="padding: 30px 0; color:red;" type="text" @click="producttextBtn('不通过')">含禁止参展产品</el-button>
          </div>
        </div>
      </div>
    </el-card> -->
    <!--交易团审核展位申请  -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 修改人李康 将 交易团审核展位申请 改为 展位申请信息 -->
        <!-- <span>交易团审核展位申请:</span> -->
        <span>展位申请信息:</span>
          <!-- 修改人 李康 时间 19/5/22 将style="float: right; padding: 3px 0" 改为 style="float: right;" 将追加申请 下移至广交会编码旁边 -->
        <!-- <el-button style="float: right;" type="primary" @click="threebtn">追加申请</el-button> -->
      </div>
      <canbeedit-table
        :height='applyHeight'
        :loading="loading"
        :tableTrData="applyTrDate"
        :tableData="keyDate"
        @deal-with-operate="enterpriseApplicationEvent"
      ></canbeedit-table>
      <div class="fathbtn">
        <div class="onebtn" style="margin-top: 20px;">
          <!-- 修改人 李康 时间 19/5/22 将style="padding: 3px 0" 删除 -->
        <el-button type="primary" @click="threebtn">追加申请</el-button>
        <el-button type="primary" @click="cafeDate">设置广交会编码</el-button>
        </div>
      </div>
      <el-dialog title="追加申请" :visible.sync="applyDialogVisible" width="50%">
        <addapply @closeModal="supplementaryBtn" :enterpriseDate="enterpriseDate"></addapply>
      </el-dialog>
       <el-dialog title="设置广交会编码" :visible.sync="centerDialogVisible" width="50%">
        <addcustoms @closeModal="closeCafeDate" :companyId='companyId' :newcafe='newcafe'></addcustoms>
      </el-dialog>
    </el-card>
    <!-- 审核联营企业 -->
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>联营企业信息:</span>
      </div>
      <canbeedit-table
        :height='jointventureHeight'
        :loading="loadthree"
        :tableTrData="examinetrDate"
        :tableData="jointDate"
        @deal-with-operate="jointEvent"
      ></canbeedit-table>
    </el-card>
    <el-card style="text-align: center;">
      <div style="width: 500px; display: inline-block;">
        <!-- <el-button type="primary" @click="handleSetTime">设置公布批次时间</el-button> -->
        <el-form ref="form" :model="form" :rules="rules" label-width="150px">
          <el-form-item label="审核结果公布时间" prop="publishId">
            <el-select v-model="form.publishId" placeholder="请选择时间" style="width: 300px;">
              <el-option v-for="item in batchTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <!-- jcrao 不需要不通过原因  5/23
          <el-form-item label="不通过原因" prop="examineOpinion" v-if="isshow">
            <el-input v-model.trim="form.examineOpinion" maxlength="200" placeholder="请输入内容"></el-input>
          </el-form-item>
          -->
        </el-form>
      </div>
      <div class="btnClass">
        <el-button type="primary" @click="onSubmit(form)">提交</el-button>
        <el-button @click="enterpriseback">返回</el-button>
      </div>
    </el-card>
  </el-tabs>
</template>
<script>
import custTable from "@/components/project/common/custTable.vue";
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import addcustoms from "./component/addCustoms";
import addcustomsCode from "./component/addcustomsCode";
import addapply from "./component/addApply";
import btndialog from "./component/btnDialog";
import pagination from "@/components/project/common/pagination.vue";
import { mapActions, mapGetters } from "vuex";
export default {
  components: {
    "cust-table": custTable,
    "canbeedit-table": canBeEditTable,
    "addcustoms": addcustoms,
    "addapply": addapply,
    "btndialog": btndialog,
    addcustomsCode,
    pagination
  },
  data() {
    return {
      auditForm: {
        examineOpinion: ""
      },
      isPass: false,
      subDisab: false,
      disFlag: '1', // 根据展品信息数据中，交易团与分团的审核情况判定，两者任一项只要有通过的则为'0'
      newFlag: '1', //判断第四项按钮是否可选,只有一二项审核通过才能选
      anotherFlag: '1', //判断第四项按钮是否可选(非通用)只单独判断不通过按钮是否可选
      checkTable: {
        ownId: '',
        examineUserId: '',
        examineUserCn: '',
        examineOrg: '',
        examineOrgCn: '',
        examineOpinion: ''
      },
      noPassType: '',
      checkTableRules: {
        examineOpinion: [{ required: true, message: "请输入", trigger: "blur" }]
      },
      auditRules: {
        examineOpinion: [{ required: true, message: "必填项", trigger: "blur" }]
      },
      isShow: false, // 第一个 是否通过的弹框
      checkedCities: [],
      cityDate: [
        {
          label: '企业参展展品不属于以下任一情况：',
          value: 0
        },
        {
          label: '（一）《中国进出口商品交易会参展展品范围（出口展）》规定之外的展品。',
          value: 1
        },
        {
          label: '（二）不符合《中华人民共和国产品质量法》、《中华人民共和国进出口商品检验法》及其他有关出口产品质量法律法规规定的展品。',
          value: 2
        },
        {
          label: '（三）涉及商标、专利、版权，但未取得合法权利证书或使用许可合同的展品。',
          value: 3
        },
        {
          label: '（四）在商务、出入境检验检疫机构、药品等质量监督管理部门有不良记录且未经复检合格的展品。',
          value: 4
        },
        {
          label: '（五）被司法机关、仲裁机关或知识产权行政管理机关认定侵权的展品',
          value: 5
        }
      ],
      companyId: '',
      newcafe: '',
      companyIdDate: '',
      applyHeight: "300",
      exhibitsHeight: "300",
      jointventureHeight: "300",
      exporHeight: "300",
      customsHeight: "300",
      enterpriseDate: {},
      customsult: '',
      loadingone: false,
      loading: false,
      loadtwo: false,
      loadthree: false,
      customsloading: false,
      dealWithaddCustoms: false,
      selection: true,
      isNew: false,
      roleJsonStr: [],
      exportDate: [],
      keyDate: [],
      newKeyDate: [], //第四项添加按钮是否可选判断
      ExhibitsDate: [],
      jointDate: [],
      NoticeDate: [],
      activeName: "first",
      onebtnData: {
        'examineOpinion': '',
        'newdata': ''
      },
      centerDialogVisible: false,
      applyDialogVisible: false,
      btnDialogVisible: false,
      loadingExport: false,
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        style: "padding: 20px 0;text-align: right;"
      },
      tableData: {
        data: []
      },
      // 表头数据
      cols: [
        {
          prop: "name",
          label: "名称",
          type: "string"
        },
        {
          prop: "type",
          label: "内容",
          type: "imgfile"
        },
        {
          prop: "nametwo",
          label: "名称",
          type: "string"
        },
        {
          prop: "typetwo",
          label: "内容",
          type: "imgfile"
        }
      ],
      data: [],
      // 第二个表头数据
      tableTrData: [
        {
          prop: "codeType",
          label: "编码类型",
          type: "input",
          userDefined: true
        },
        {
          prop: "code",
          label: "编码",
          type: "input",
          userDefined: true
        },
        // {
        //   prop: "code",
        //   label: "证书编号",
        //   type: "input",
        //   userDefined: true
        // },
        // {
        //   prop: "imgfile",
        //   label: "上传证明(营业执照/外贸经营者登记证明)",
        //   type: "images",
        //   style: 'width: 100%; height:100%',
        //   userDefined: true
        // },
        {
          prop: "subClusterCheckStatus",
          label: "分团审核情况",
          type: "input",
          userDefined: true
        },
        {
          prop: "subClusterCheckOpinion",
          label: "分团审核不通过原因",
          type: "input",
          userDefined: true
        },
        {
          prop: "clusterCheckStatus",
          label: "交易团审核情况",
          type: "input",
          userDefined: true
        },
        {
          prop: "clusterCheckOpinion",
          label: "交易团审核不通过原因",
          type: "input",
          userDefined: true
        },
        {
          type: "btn",
          label: "操作",
          show: true,
          unChangeStatus: true,
          width: "120",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "pass",
                label: "通过",
                style:
                  "text-decoration: underline;color: #f00; margin-right: 10px"
              },
              {
                prop: "nopass",
                label: "不通过",
                style:
                  "text-decoration: underline;color: #f00;"
              }
            ]
          }
        }
      ],
      // 第三个表头数据
      exportTrDate: [
        {
          prop: "applyCode",
          label: "企业名称",
          type: "input",
          userDefined: true
        },
        {
          prop: "apply",
          label: "出口额",
          type: "input",
          userDefined: true
        },
        {
          prop: "Code",
          label: "年度",
          type: "string"
        },
        {
          prop: "enclosure",
          label: "附件",
          type: "string"
        },
        {
          type: "btn",
          label: "操作",
          show: true,
          changeStatus: true,
          operations: [
            {
              prop: "edit",
              label: "编辑",
              type: "text",
              class: "primary"
            },
            {
              prop: "remove",
              label: "移除",
              type: "text",
              class: "warning"
            },
            {
              prop: "confirm",
              type: "icon",
              iconName: "el-icon-check",
              class: "confirm"
            }
          ]
        }
      ],
      exportData: [
        {
          applyCode: "1111",
          apply: "境外",
          operateType: "text",
          Code: "lalal",
          enclosure: "wwww"
        }
      ],
      // 第四个表头数据
      customsTrDate: [
        {
          prop: "customsCode",
          label: "海关编码",
          type: "input",
          userDefined: true
        },
        {
          prop: "companyName",
          label: "企业名称",
          type: "input",
          userDefined: true
        },
        // {
        //   prop: "exhibitionAreaName",
        //   label: "编码使用展区",
        //   type: "string"
        // },
        {
          prop: "relationshipName", // 李康 修改于 19/5/18 将 relationship 修改为 relationshipName
          label: "资质来源",
          type: "string"
        },
        // {
        //   prop: "imgfile",
        //   label: "注册登记证书",
        //   type: "images",
        //   style: 'width: 100%; height:100%',
        //   userDefined: true
        // },
        {
          prop: "subClusterCheckStatus",
          label: "分团审核情况",
          type: "string"
        },
        {
          prop: "subClusterCheckCustomsOpinion",
          label: "分团审核不通过原因",
          type: "string"
        },
        {
          prop: "clusterCheckStatus",
          label: "交易团审核情况",
          type: "string"
        },
        {
          prop: "clusterCheckCustomsOpinion",
          label: "交易团审核不通过原因",
          type: "string"
        },
        {
          type: "btn",
          label: "操作",
          show: true,
          unChangeStatus: true,
          width: "160",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "pass",
                label: "通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #f00; margin-right: 10px;"
              },
              {
                prop: "nopass",
                label: "不通过",
                style:
                  "cursor: pointer;text-decoration: underline;margin-right: 10px; color: #f00;"
              }
              // {
              //   prop: "remove",
              //   label: "删除",
              //   style:
              //     "cursor: pointer;text-decoration: underline;color: red;"
              // }
            ]
          }
        }
      ],
      customstData: [
      ],
      // 第五个表头数据
      exhibitsTrDate: [
        {
          prop: "exhibitNameCh",
          label: "产品名称",
          type: "input",
          userDefined: true
        },
        {
          prop: "imgfile",
          label: "图片",
          type: "images",
          style: 'width: 100%; height:100%',
          userDefined: true
        },
        {
          prop: "exhibitModelCh",
          label: "型号",
          type: "string"
        },
        {
          prop: "productType",
          label: "类别",
          type: "string"
        },
        {
          prop: "forbid",
          label: "是否大会禁止参展产品",
          type: "string"
        },
        {
          prop: "subClusterCheckStatus",
          label: "分团审核情况",
          type: "string"
        },
        {
          prop: "clusterCheckStatus",
          label: "交易团审核情况",
          type: "string"
        },
        {
          type: "btn",
          label: "操作",
          show: true,
          unChangeStatus: true,
          width: "120",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "pass",
                label: "通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #f00; margin-right: 10px;"
              },
              {
                prop: "nopass",
                label: "不通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #f00;"
              }
            ]
          }
        }
      ],
      exhibitsData: [
        {
          applyCode: "1111",
          apply: "境外",
          operateType: "text",
          Code: "lalal",
          enclosure: "wwww",
          register: "sss"
        }
      ],
      // 第六个表头数据
      applyTrDate: [
        {
          prop: "companyName",
          label: "企业名称",
          type: "input",
          userDefined: true
        },
        {
          prop: "exhibitionAreaName",
          label: "申请展区",
          type: "input",
          userDefined: true
        },
        {
          prop: "boothNumber",
          label: "申请数量",
          type: "string",
          width: "60"
        },
        {
          prop: "boothAcreage",
          label: "申请面积",
          type: "string",
          width: "60"
        },
        {
          prop: "boothNumberLast",
          label: "上届展位数量",
          type: "string",
          width: "80"
        },
        {
          prop: "boothAcreageLast",
          label: "上届面积",
          type: "string",
          width: "60"
        },
        {
          prop: "exhibitionType",
          label: "布展类型",
          type: "string"
        },
        {
          prop: "isContacted",
          label: "是否愿意接洽国内买家",
          type: "string",
          width: "100"
        },
        {
          prop: "hscode",
          label: "HS编码",
          type: "string",
          width: "80"
        },
        {
          prop: "hsAreaName",
          label: "HS编码对应展区",
          type: "string"
        },
        {
          prop: "matching",
          label: "是否匹配展区",
          type: "string",
          width: "80"
        },
        {
          prop: "subClusterCheckStatus",
          label: "分团审核情况",
          type: "string",
          width: "80"
        },
        {
          prop: "subClusterCheckOpinion",
          label: "分团审核不通过原因",
          type: "string"
        },
        {
          prop: "clusterCheckStatus",
          label: "交易团审核情况",
          type: "string",
          width: "80"
        },
        {
          prop: "clusterCheckOpinion",
          label: "交易团审核不通过原因",
          type: "string"
        },
        {
          type: "btn",
          label: "操作",
          show: true,
          twoChangeStatus: true,
          width: "120",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "pass",
                label: "通过",
                style:
                  "text-decoration: underline;color: #f00; margin-right: 10px; float: left;"
              },
              {
                prop: "nopass",
                label: "不通过",
                style:
                  "text-decoration: underline;color: #f00; float: right"
              }
            ]
          }
        }
      ],
      applyData: [
        {
          applyCode: "1111",
          apply: "境外",
          operateType: "text",
          Code: "lalal",
          enclosure: "wwww",
          register: "sss"
        }
      ],
      // 第七个表头数据
      examinetrDate: [
        {
          prop: "rowNum",
          label: "序号",
          type: "string",
          userDefined: true
        },
        {
          prop: "companyName",
          label: "企业名称",
          type: "input",
          userDefined: true
        },
        {
          prop: "unionName",
          label: "联营企业名称",
          type: "input",
          userDefined: true
        },
        {
          prop: "addressCh",
          label: "企业地址",
          type: "string"
        },
        {
          prop: "businessContactsCh",
          label: "企业联系人",
          type: "string"
        },
        {
          prop: "exhibitionAreaName",
          label: "联营展区",
          type: "string"
        },
        {
          prop: "subClusterCheckStatus",
          label: "分团审核情况",
          type: "string"
        },
        {
          prop: "subClusterCheckOpinion",
          label: "分团审核不通过原因",
          type: "string"
        },
        {
          prop: "clusterCheckStatus",
          label: "交易团审核情况",
          type: "string"
        },
        {
          prop: "clusterCheckOpinion",
          label: "交易团审核不通过原因",
          type: "string"
        },
        {
          type: "btn",
          label: "操作",
          show: true,
          unChangeStatus: true,
          width: "120",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "pass",
                label: "通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #f00; margin-right: 10px;"
              },
              {
                prop: "nopass",
                label: "不通过",
                style:
                  "cursor: pointer;text-decoration: underline;color: #f00;"
              }
            ]
          }
        }
      ],
      examineData: [
        {
          order: "1",
          name: "境外",
          register: "广东佛山",
          Code: "lalal",
          enclosure: "wwww",
          operateType: "text"
        }
      ],
      listingPlace: [],
      post: [],
      mainMarket: [],
      mainType: [],
      developNum: [],
      participationGoal: [],
      tradeForm: [],
      staff: [],
      // 传参
      searchParams: {
        // exhibitionArea: "",
        // exhibitionSession: "",
        current: 1,
        size: 10,
        // companyId: 1916800303
        companyId: this.$route.query.id
      },
      options: [],
      batchTime: [],
      form: {
        publishId: '',
        source: 0,
        examineOpinion: '',
        roleJsonStr: []
      },
      isshow: false,
      fileList2: [],
      timeAll: [
        { time: 'ENTERPRISE_INITIAL_EXAMINATION_4' },
        { time: 'ENTERPRISE_INITIAL_EXAMINATION_1' },
        { time: 'ENTERPRISE_INITIAL_EXAMINATION_2' },
        { time: 'ENTERPRISE_INITIAL_EXAMINATION_3' }
      ],
      rules: {
        source: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        examineOpinion: [
          {
            required: true,
            message: "请填入不通过原因",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("quantitativeArrangement", [
      "enterpriseList",
      "exportList", //企业进出口经营权
      "auditList", //企业进出口经营权审核
      "enterpriseApplication",
      "auditenterList",
      "exhibitsList", //企业产品信息列表
      "productcheckList", //审核企业产品信息
      "jointventureList",
      'auditjointList',  //审核联营企业
      'photoUrl',  //获取图片地址
      'customCodeList',  //海关编码列表
      'amountsult',  //出口额是否达标审核结果
      'companyproductExplain',  //展品文字审核
      'companyResult', //展品文字审核结果
      "batchList", // //获取审核结果的公布批次时间
      "quaList"
    ]),
    ...mapGetters("nainformation", ["getCes"])
  },
  filters: {
    // 企业类型
    companyTypeFilter: value => {
      let companyTypeOptsw = kindo.dictionary.get('companyType');
      for (let i = 0; i < companyTypeOptsw.length; i++) {
        if (value === companyTypeOptsw[i].value) {
          return companyTypeOptsw[i].label;
        }
      }
    },
    // 企业属性
    companyProp: value => {
      let companyAttribute = kindo.dictionary.get('companyAttribute');
      for (let i = 0; i < companyAttribute.length; i++) {
        if (value === companyAttribute[i].value) {
          return companyAttribute[i].label;
        }
      }
    },
    // 审核情况 通过 不通过
    checkStatus(val) {
      if (val === "0") {
        return "未审核";
      } else if (val === "1") {
        return "通过";
      } else if (val === "2") {
        return "不通过";
      }
    }
  },
  async beforeCreate() {
    this.listingPlace = await kindo.dictionary.get('listingPlace');    //上市地点
    this.post = await kindo.dictionary.get('post');    //职位
    this.mainMarket = await kindo.dictionary.get('mainMarket');    //目标市场
    this.mainType = await kindo.dictionary.get('mainType');    //目标客户类型
    this.developNum = await kindo.dictionary.get('developNum');    //研发部门人数
    this.participationGoal = await kindo.dictionary.get('participationGoal');    //参展目的
    this.tradeForm = await kindo.dictionary.get('tradeForm');    //贸易形式
    this.staff = await kindo.dictionary.get('staff');    //员工数量
  },
  created() {
    let newArry = [];
    for (let key in this.$store.getters.userInfo.role) {
      let newobj = {};
      newobj.roleId = this.$store.getters.userInfo.role[key].roleId;
      newobj.roleName = this.$store.getters.userInfo.role[key].roleName;
      newArry.push(newobj);
    }
    this.form.roleJsonStr = JSON.stringify(newArry);
    for (let i = 0; i < this.timeAll.length; i++) {
      let temp = {};
      temp.subKey = this.timeAll[i].time;
      this.getBatchtime(temp).then(res => {
        if (i === 0) {
          this.batchTime.push({ label: '即时发布', value: 0 });
        } else {
        //  this.batchTime.push({ label: "第" + i + '批次' + res.startTime + '-' + res.endTime, value: i });
          this.batchTime.push({ label: "第" + i + '批次' + res.startTime, value: i });
          this.batchTime.sort((a, b) => {
            return a.value - b.value;
          });
        }
      });
    }
  },
  mounted() {
    // 当前展届 展届的接口 调用 修改人 李康 日期 19/5/22
    this.getcurrentExhibitionSession();
    this.searchParams["exhibitionSession"] = this.getCes;
    // console.log(this.$store.getters.userInfo.org, 'kkkkk');
    this.getPhotourl().then((res) => {
      this.city = res;
    });
    let newArry = [];
    for (let key in this.$store.getters.userInfo.role) {
      let newobj = {};
      newobj.roleId = this.$store.getters.userInfo.role[key].roleId;
      newobj.roleName = this.$store.getters.userInfo.role[key].roleName;
      newArry.push(newobj);
    }
    this.roleJsonStr = JSON.stringify(newArry);
    if (this.$route.query.id) {
      // this.getExhibits(this.searchParams);
      //this.$nextTick(() => {
      //  this.getExport();
      //});
      this.getjoint();
      this.getcompanyInfo();
      this.getcustomDate();
      this.getCustomSult();
      this.getCompanyresult({
        companyId: this.$route.query.id,
        exhibitionSession: this.getCes
      }).then((res) => {
      });
    }
  },
  watch: {
    //判断企业基本信息中的企业统一社会信用代码(营业执照号)是否在企业进出口经营权中出现,,若出现显示为空
    'tableData.data': {
      handler(val) {
        if (val && val.length > 0) {
          for (let key in val) {
            if (val[key].nametwo === "纳税人识别号/统一社会信用代码:") {
              for (let i in this.exportDate) {
                if (this.exportDate[i].code === val[key].typetwo) {
                  val[key].nametwo = '';
                  val[key].typetwo = '';
                }
              }
            }
          }
        }
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions("quantitativeArrangement", [
      "getEnterpriseinformation",
      "getExportOperating", //企业进出口经营权
      "getBusinessaudit", //企业进出口经营权审核
      "getEnterpriseapplication", // 展位申请信息
      "getAuditenterpriseBooth",
      "getExhibitsinformation", //企业产品信息列表
      "getProductcheck", //审核企业产品信息通过按钮
      "getJointventure", //审核联营企业列表
      'getAuditjoint',  //审核联营企业通过按钮
      'getPhotourl', //获取图片地址
      'getCustomCode',  //海关编码列表
      'getCustomcheck',   //海关编码审核
      'getCustomRemove',  //海关编码删除
      'getAmountcheck',  //出口额是否达标审核
      'getAmountasult',   //出口额是否达标审核结果
      'getAllproduct',  //批量审核企业展品
      'getCompanyProductExplain', //展品文字审核
      'getCompanyresult',  //展品文字审核结果
      "getQualificationaudit", // 审核 第一个审核
      'checkcompanyInfoForbidJoin', // 审核接口   李康  添加于 5/20
      "getBatchtime", //获取审核结果的公布批次时间
      "getQualificationaudit",
      // "gettime", // 公布批次时间的接口 与 getBatchtime 是同一接口 无用功 19/5/22日
      "publishtimeCheckCompany" // 设置企业资料公布批次时间
    ]),
    ...mapActions("nainformation", [
      "getcurrentExhibitionSession" // 展届
    ]),
    onSubmit(val) {
      //交易团 this.$store.getters.userInfo.org.deptType 7
      //交易团分团 this.$store.getters.userInfo.org.deptType 30
      if (this.$store.getters.userInfo.org.deptType === '7') {
        this.onebtnData.row = this.$route.query.row;
        let oneStatus = true;
        let twoStatus = true;
        for (let i = 0; i < this.keyDate.length; i++) {
          if (this.keyDate[i].clusterCheckStatus === "未审核") {
            oneStatus = false;
          }
        }
        for (let i = 0; i < this.jointDate.length; i++) {
          if (this.jointDate[i].clusterCheckStatus === "未审核") {
            twoStatus = false;
          }
        }
        if ((this.enterpriseList.clusterCheckStatus === "1" || this.enterpriseList.clusterCheckStatus === "2") && (this.exportDate[0].clusterCheckStatus === "不通过" || this.exportDate[0].clusterCheckStatus === "通过") && (this.customstData[0].clusterCheckStatus === "通过" || this.customstData[0].clusterCheckStatus === "不通过") && oneStatus && twoStatus) {
          this.subDisab = false;
        } else {
          this.subDisab = true;
        }
        if (this.subDisab) {
          this.$message.warning("有未审核项,请您继续审核");
        }
      } else {
        this.onebtnData.row = this.$route.query.row;
        let oneStatus = true;
        let twoStatus = true;
        for (let i = 0; i < this.keyDate.length; i++) {
          if (this.keyDate[i].subClusterCheckStatus === "未审核") {
            oneStatus = false;
          }
        }
        for (let i = 0; i < this.jointDate.length; i++) {
          if (this.jointDate[i].subClusterCheckStatus === "未审核") {
            twoStatus = false;
          }
        }
        if ((this.enterpriseList.subClusterCheckStatus === "1" || this.enterpriseList.subClusterCheckStatus === "2") && (this.exportDate[0].subClusterCheckStatus === "不通过" || this.exportDate[0].subClusterCheckStatus === "通过") && (this.customstData[0].subClusterCheckStatus === "通过" || this.customstData[0].subClusterCheckStatus === "不通过") && oneStatus && twoStatus) {
          this.subDisab = false;
        } else {
          this.subDisab = true;
        }
        if (this.subDisab) {
          this.$message.warning("有未审核项,请您继续审核");
        }
      }
      if (!this.subDisab) {
        this.onebtnData.row = this.$route.query.row;
        this.$refs.form.validate((valid) => {
          if (valid) {
            let newArry = {};
            let newDate = [];
            for (let key in this.batchTime) {
              if (val.publishId === this.batchTime[key].publishBatch) {
                newArry.publishTime = this.batchTime[key].value;
              }
            }
            if (this.onebtnData.examineOpinion === "通过") {
              newArry.examineStatus = 1;
              newArry.examineOpinion = '通过';
            } else {
              newArry.examineStatus = 2;
              newArry.examineOpinion = val.examineOpinion;
            }
            for (let key in this.batchTime) {
              if (this.batchTime[key].value === val.publishId) {
                let newLabel = this.batchTime[key].label;
                newDate = newLabel.split('-');
              }
            }
            if (val.publishId === 0) {
              newArry.publishId = "0";
            } else if (val.publishId === 1) {
              newArry.publishId = "1";
            } else if (val.publishId === 2) {
              newArry.publishId = "2";
            } else if (val.publishId === 3) {
              newArry.publishId = "3";
            }
            newArry.roleJsonStr = this.form.roleJsonStr;
            newArry.ownId = this.onebtnData.row.companyId;
            newArry.examineUserId = this.$store.getters.userInfo.userId;
            newArry.examineUserCn = this.$store.getters.userInfo.userName;
            newArry.examineOrg = this.onebtnData.row.delegationId;
            newArry.examineOrgCn = this.onebtnData.row.delegationName;
            newArry.delegationType = this.onebtnData.row.delegationType;
            //newArry.publishTime
            if (newArry.publishId === "0") {
              let date = new Date();
              let month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
              let strDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
              newArry.publishTime = `${date.getFullYear()}/${month}/${strDate}`;
            } else {
              newArry.publishTime = newDate[0].slice(4);
            }
            newArry["exhibitionSession"] = this.getCes;
            // 修改人 李康 修改时间 19/5/22
            // this.getQualificationaudit(newArry).then(res => {
            //   this.$message({
            //     type: "success",
            //     message: "保存成功!"
            //   });
            //   this.closeModel();
            // });
            this.publishtimeCheckCompany(newArry).then(res => {
              this.$message({
                type: "success",
                message: "保存成功!"
              });
              //this.closeModel();
            }).then(ress => {
              this.$router.push({
                path: "/businessAuditInformation",
                query: {
                  currentPage: this.$route.query.currentPage
                }
              });
            });
          }
        });
      }
    },
    // 设置时间
    handleSetTime() {
      this.onebtnData.row = this.$route.query.row;
      let oneStatus = true;
      let twoStatus = true;
      for (let i = 0; i < this.keyDate.length; i++) {
        if (this.keyDate[i].clusterCheckStatus === "未审核") {
          oneStatus = false;
        }
      }
      for (let i = 0; i < this.jointDate.length; i++) {
        if (this.jointDate[i].clusterCheckStatus === "未审核") {
          twoStatus = false;
        }
      }
      if ((this.enterpriseList.clusterCheckStatus === "1" || this.enterpriseList.clusterCheckStatus === "2") && (this.exportDate[0].clusterCheckStatus === "不通过" || this.exportDate[0].clusterCheckStatus === "通过") && (this.customstData[0].clusterCheckStatus === "通过" || this.customstData[0].clusterCheckStatus === "不通过") && oneStatus && twoStatus) {
        this.subDisab = false;
      } else {
        this.subDisab = true;
      }
      this.btnDialogVisible = true;
    },
    //企业基本信息 第一张表格
    getcompanyInfo() {
      this.loadingone = true;
      // let url = {
      //   companyId: this.$route.query.id,
      //   exhibitionSession: this.getCes
      // };
      // this.getEnterpriseinformation(this.$route.query.id).then(res => {
      // this.getEnterpriseinformation(url).then(res => {
      //显示当前页面的批次
      this.$http.get(`${process.env.API_NA_URL}/api/ordinaryCompany/companyInfo/get?companyId=${this.$route.query.id}&exhibitionSession=${this.getCes}`).then(res => {
        this.form.publishId = Number(res.publishId);
      });
      this.getEnterpriseinformation({
        companyId: this.$route.query.id,
        exhibitionSession: this.getCes
      }).then(res => {
        this.tableData.data = JSON.parse(JSON.stringify(res));
        for (let key in this.tableData.data) {
          if (this.tableData.data[key].name === '广交会编码：') {
            this.newcafe = this.tableData.data[key].type;
          }
        }
        for (let key in this.tableData.data) {
          if (this.tableData.data[key].nametwo === '省份/城市:') {
            let pro = '';
            let twopro = '';
            let str = '';
            let twostr = '';
            if (this.tableData.data[key].iscity) {
              twostr = this.tableData.data[key].typetwo;
              str = '';
            } else {
              str = this.tableData.data[key].typetwo.substring(0, 2);
              twostr = this.tableData.data[key].typetwo.substring(3, this.tableData.data[key].typetwo.length);
            }
            for (let i in this.city) {
              if (str === i) {
                pro = this.city[i];
              }
              if (twostr === i) {
                twopro = this.city[i];
              }

            }
            this.tableData.data[key].typetwo = pro + twopro;
            // console.log(twostr, 'kkktwostr');
            // this.getPhotourl(str).then((newres) => {
            //   if (newres.province) {
            //     pro = newres.province;
            //   }
            //   for (let newc in newres.city) {
            //     if (newres.city[newc].provinceCityId === twostr) {
            //       twopro = newres.city[newc].provinceCityName;
            //     }
            //   }
            //
            // });
          }
        }
        for (let key in this.listingPlace) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].nametwo === '上市地点：') {
              if (this.tableData.data[i].typetwo === this.listingPlace[key].value) {
                this.tableData.data[i].typetwo = this.listingPlace[key].label;
              }
            }
          }
        }
        for (let key in this.post) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].nametwo === '职位: ') {
              if (this.tableData.data[i].typetwo === this.post[key].value) {
                this.tableData.data[i].typetwo = this.post[key].label;
              }
            }
          }
        }
        for (let key in this.mainMarket) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].nametwo === '主要目标市场（多选）：') {
              if (this.tableData.data[i].typeonet) {
                let newtype = this.tableData.data[i].typeonet.split(',');
                for (let newkey in newtype) {
                  if (newtype[newkey] === this.mainMarket[key].value) {
                    this.tableData.data[i].typetwo += (this.mainMarket[key].label + ',');
                  }
                }
              }
            }
          }
        }
        for (let key in this.mainType) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].name === '主要目标客户类型（多选）：') {
              if (this.tableData.data[i].typeone) {
                let newtype = this.tableData.data[i].typeone.split(',');
                for (let newkey in newtype) {
                  if (newtype[newkey] === this.mainMarket[key].value) {
                    this.tableData.data[i].type += (this.mainMarket[key].label + ',');
                  }
                }
              }
            }
          }
        }
        for (let key in this.participationGoal) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].name === '参展目的（多选）: ') {
              if (this.tableData.data[i].typeonef) {
                let newtype = this.tableData.data[i].typeonef.split(',');
                for (let newkey in newtype) {
                  if (newtype[newkey] === this.participationGoal[key].value) {
                    this.tableData.data[i].type += (this.participationGoal[key].label + ',');
                  }
                }
              }
            }
          }
        }
        for (let key in this.tradeForm) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].name === '贸易形式:') {
              if (this.tableData.data[i].typeones) {
                let newtype = this.tableData.data[i].typeones.split(',');
                for (let newkey in newtype) {
                  if (newtype[newkey] === this.tradeForm[key].value) {
                    this.tableData.data[i].type += (this.tradeForm[key].label + ',');
                  }
                }
              }
            }
          }
        }
        for (let key in this.developNum) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].nametwo === '研发部门人数:') {
              if (this.tableData.data[i].typetwo === this.developNum[key].value) {
                this.tableData.data[i].typetwo = this.developNum[key].label;
              }
            }
          }
        }
        for (let key in this.staff) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].nametwo === '员工数量:') {
              if (this.tableData.data[i].typetwo === this.staff[key].value) {
                this.tableData.data[i].typetwo = this.staff[key].label;
              }
            }
          }
        }
        for (let key in this.staff) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].name === '生产部门人数:') {
              if (this.tableData.data[i].type === this.staff[key].value) {
                this.tableData.data[i].type = this.staff[key].label;
              }
            }
          }
        }
        for (let key in this.developNum) {
          for (let i in this.tableData.data) {
            if (this.tableData.data[i].name === '质检部门人数:') {
              if (this.tableData.data[i].type === this.developNum[key].value) {
                this.tableData.data[i].type = this.developNum[key].label;
              }
            }
          }
        }
        this.onebtnData.newdata = JSON.parse(JSON.stringify(this.enterpriseList));
        this.loadingone = false;
        this.getExport();
      })
      .catch(e => {
        this.loadingone = false;
      });
    },
    // 禁止参展企业 李康 修改于 5/20
    companyBan() {
      this.checkcompanyInfoForbidJoin({
        ownId: this.$route.query.id,
        examineOrg: this.$route.query.row.delegationId,
        examineOrgCn: this.$route.query.row.delegationName,
        examineUserId: this.$store.getters.userInfo.userId,
        examineUserCn: this.$store.getters.userInfo.userName,
        examineStatus: "2",
        roleJsonStr: this.roleJsonStr,
        exhibitionSession: this.getCes
      }).then(res => {
        this.getcompanyInfo();
      });
    },
    // 非禁止参展企业 李康 修改于 5/20
    companyonBan() {
      this.checkcompanyInfoForbidJoin({
        ownId: this.$route.query.id,
        examineOrg: this.$route.query.row.delegationId,
        examineOrgCn: this.$route.query.row.delegationName,
        examineUserId: this.$store.getters.userInfo.userId,
        examineUserCn: this.$store.getters.userInfo.userName,
        examineStatus: "1",
        roleJsonStr: this.roleJsonStr,
        exhibitionSession: this.getCes
      }).then(res => {
        this.getcompanyInfo();
      });
    },
    //产品进出口经营权 第二张表
    getExport() {
      this.loadingExport = true;
      // this.getExportOperating(this.$route.query.id).then(res => {
      this.getExportOperating({
        companyId: this.$route.query.id,
        exhibitionSession: this.getCes
      }).then(res => {
        let datat = [];
        if (this.$route.query.row.subClusterCheckStatus === '-') {
          datat = JSON.parse(JSON.stringify(res));
          for (let key in datat) {
            datat[key].subClusterCheckStatus = '-';
          }
        } else {
          datat = JSON.parse(JSON.stringify(res));
        }
        // 李康 修改于 5/21
        this.exportDate = [];
        for (let i = 0; i < datat.length; i++) {
          if (datat[i].codeType === "进出口代码") {
            datat[i].operating = true;
            if (this.disFlag === '0') {
              datat[i].disFlag = '0';
            } else {
              datat[i].disFlag = '1';
            }
            this.exportDate.push(datat[i]);
          }
        }
        // if (this.$route.query.row.subClusterCheckStatus === '-') {
        //   this.exportDate = JSON.parse(JSON.stringify(res));
        //   for (let key in this.exportDate) {
        //     this.exportDate[key].subClusterCheckStatus = '-';
        //   }
        // } else {
        //   this.exportDate = JSON.parse(JSON.stringify(res));
        // }
        if (this.$store.getters.userInfo.org.deptType === '7') {
          if (this.enterpriseList.clusterCheckStatus === '1' && this.exportDate[0].clusterCheckStatus === "通过") {
            this.newFlag = '1';
          } else {
            this.newFlag = '0';
          }
          if (this.enterpriseList.clusterCheckStatus === '0' || this.exportDate[0].clusterCheckStatus === "未审核") {
            this.anotherFlag = '0';
          } else {
            this.anotherFlag = '1';
          }
        } else if (this.$store.getters.userInfo.org.deptType === '30') {
          if (this.enterpriseList.subClusterCheckStatus === '1' && this.exportDate[0].subClusterCheckStatus === "通过") {
            this.newFlag = '1';
          } else {
            this.newFlag = '0';
          }
          if (this.enterpriseList.subClusterCheckStatus === '0' || this.exportDate[0].subClusterCheckStatus === "未审核") {
            this.anotherFlag = '0';
          } else {
            this.anotherFlag = '1';
          }
        }
      //  this.getcompanyInfo();
        this.getDate();
        this.loadingExport = false;
      })
      .catch(e => {
        this.loadingExport = false;
      });
    },
    //海关编码
    getcustomDate () {
      this.customsloading = true;
      // this.getCustomCode(this.$route.query.id).then(res => {
      this.getCustomCode({
        companyId: this.$route.query.id,
        exhibitionSession: this.getCes
      }).then(res => {
        if (this.$route.query.row.subClusterCheckStatus === '-') {
          this.customstData = res.customCodeList;
          for (let key in this.customstData) {
            this.customstData[key].subClusterCheckStatus = '-';
          }
        } else {
          this.customstData = res.customCodeList;
        }
        this.customsloading = false;
      })
      .catch(e => {
        this.customsloading = false;
      });
    },
    //海关编码审核结果
    getCustomSult () {
      // this.getAmountasult(this.$route.query.id).then((res) => {
      this.getAmountasult({
        companyId: this.$route.query.id,
        exhibitionSession: this.getCes
      }).then((res) => {
      });
    },
    // 交易团审核企业展位 第四张表格
    getDate() {
      this.loading = true;
      // this.getEnterpriseapplication(this.$route.query.id).then(res => {
      this.getEnterpriseapplication({
        companyId: this.$route.query.id,
        exhibitionSession: this.getCes
      }).then(res => {
        if (this.$route.query.row.subClusterCheckStatus === '-') {
          this.keyDate = JSON.parse(JSON.stringify(res));
          for (let key in this.keyDate) {
            this.keyDate[key].subClusterCheckStatus = '-';
          }
        } else {
          this.keyDate = JSON.parse(JSON.stringify(res));
        }
        for (let i = 0, l = this.keyDate.length; i < l; i++) {
          if (this.$store.getters.userInfo.org.deptType === '7') {
            if (this.keyDate[i].clusterCheckStatus === '通过') {
              this.disFlag = '0';
              break;
            }
          } else if ((this.$store.getters.userInfo.org.deptType === '30')) {
            if (this.keyDate[i].subClusterCheckStatus === '通过') {
              this.disFlag = '0';
              break;
            }
          }
          this.disFlag = '1';
        }
        this.newKeyDate = [];
        for (let i = 0; i < this.keyDate.length; i++) {
          if (this.newFlag === '0') {
            this.keyDate[i].newFlag = '0';
          } else {
            this.keyDate[i].newFlag = '1';
          }
          if (this.anotherFlag === '0') {
            this.keyDate[i].anotherFlag = '0';
          } else {
            this.keyDate[i].anotherFlag = '1';
          }
          this.newKeyDate.push(this.keyDate[i]);
        }
        this.loading = false;
      })
      .catch(e => {
        this.loading = false;
      });
    },
    // 企业展品信息
    getExhibits(searchParams) {
      this.loadtwo = true;
      this.getExhibitsinformation(searchParams).then(res => {
        this.ExhibitsDate = JSON.parse(JSON.stringify(res.records));
        if (res.total > 0) {
          if (this.$route.query.row.subClusterCheckStatus === '-') {
            for (let key in this.ExhibitsDate) {
              this.ExhibitsDate[key].subClusterCheckStatus = '-';
            }
          }
          this.pageInfo.currentPage = res.current;
          this.pageInfo.total = res.total;
        } else if (res.total === 0) {
          this.pageInfo.currentPage = 1;
          this.pageInfo.total = 0;
        }
        this.loadtwo = false;
      })
      .catch(e => {
        this.loadtwo = false;
      });
    },
    //查询企业联营企业列表
    getjoint() {
      this.loadthree = true;
      // this.getJointventure(this.$route.query.id).then(res => {
      this.getJointventure({
        companyId: this.$route.query.id,
        exhibitionSession: this.getCes
      }).then(res => {
        if (this.$route.query.row.subClusterCheckStatus === '-') {
          this.jointDate = JSON.parse(JSON.stringify(res));
          for (let key in this.jointDate) {
            this.jointDate[key].subClusterCheckStatus = '-';
          }
        } else {
          this.jointDate = JSON.parse(JSON.stringify(res));
        }
        this.loadthree = false;
      })
      .catch(e => {
        this.loadthree = false;
      });
    },
    dealWithDiffEvent() {},
    // 行内编辑
    dealWithChangeStatusEvent(scope, operateItem) {
      if (operateItem.prop === "edit") {
        scope.row.isEdit = true;
        scope.row.operateType = "icon";
      } else if (operateItem.prop === "confirm") {
        this.editData(scope);
        scope.row.isEdit = false;
        scope.row.operateType = "text";
      } else {
        this.delData(scope);
      }
    },
    // 编辑按钮
    editData(scope) {
      // console.log(scope, "kkkk");
    },
    // 删除按钮
    delData(scope) {
      // console.log(scope, "jjjj");
    },
    // 关闭企业基本信息审核
    customsModal(val) {
      this.btnDialogVisible = val;
      this.getcompanyInfo();
    },
    //关闭海关编码
    addcustomsModal(val) {
      this.dealWithaddCustoms = val;
      this.getcustomDate();

    },
    // 关闭第一个审核弹框
    btnshow(val) {
      if (this.$route.query.row) {
        this.onebtnData.examineOpinion = val;
        this.onebtnData.row = this.$route.query.row;
        // this.btnDialogVisible = true;   // 修改人 李康 将此行注释 增加了下面内容 5/22
        let temp = {};
        temp.ownId = this.$route.query.id;
        temp.examineOrg = this.$route.query.row.delegationId;
        temp.examineOrgCn = this.$route.query.row.delegationName;
        temp.examineUserId = this.$store.getters.userInfo.userId;
        temp.examineUserCn = this.$store.getters.userInfo.userName;
        temp.roleJsonStr = this.roleJsonStr;
        temp["exhibitionSession"] = this.getCes;
        if (val === "通过") {
          temp.examineStatus = 1;
         // temp.examineOpinion = '通过';
          // 修改人 jcrao 删除重复审核通过确认弹框 5/23
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.getQualificationaudit(temp).then(res => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.$message({
              type: "success",
              message: "保存成功!"
            });
            this.getcompanyInfo();
          });
        } else {
          this.getExport();
          this.isShow = true;
        }
      }
    },
    // 第一个 审核不通过 弹框
    npSeave(datae) {
      let temp = {};
      temp.ownId = this.$route.query.id;
      temp.examineOrg = this.$route.query.row.delegationId;
      temp.examineOrgCn = this.$route.query.row.delegationName;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.roleJsonStr = this.roleJsonStr;
      temp["exhibitionSession"] = this.getCes;
      temp.examineStatus = 2;
      temp.examineOpinion = this.auditForm.examineOpinion;
      this.$refs[datae].validate(vald => {
        if (vald) {
          let fullScreenloading = this.$loading({ fullscreen: true });
          this.getQualificationaudit(temp).then(res => {
            this.$nextTick(() => {
              fullScreenloading.close();
            });
            this.isShow = false;
            this.$message({
              message: "审核不通过",
              type: "success"
            });
            this.auditForm.examineOpinion = '';
            this.getcompanyInfo();
          }).catch(e => {});
        }
      });
    },
    //关闭设置广交会编码
    closeCafeDate(val) {
      this.centerDialogVisible = val;
      this.getcompanyInfo();
    },
    //打开新增海关编码
    openaddCustoms() {
      this.companyIdDate = this.$route.query.id;
      this.dealWithaddCustoms = true;

    },
    // 第二个审核按钮
    twobtn(form) {
      let _this = this;
      let temp = {};
      temp.ownId = this.$route.query.id;
      temp.examineOrg = this.$route.query.row.delegationId;
      temp.examineOrgCn = this.$route.query.row.delegationName;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.roleJsonStr = this.roleJsonStr;
      temp["exhibitionSession"] = this.getCes;
      if (form === "通过") {
        temp.examineStatus = "1";
       // temp.examineOpinion = "通过";
        // this.$confirm("此操作企业进出口经营权将审核" + temp.examineOpinion + ", 是否继续?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        let fullScreenloading = this.$loading({ fullscreen: true });
        _this.getBusinessaudit(temp).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          _this.$message({
            type: "success",
            message: "操作成功!"
          });
          _this.getDate();
          _this.getExport();
        });
          // })
          // .catch(() => {
          //   this.$message({
          //     type: "info",
          //     message: "已取消审核"
          //   });
          // });
      } else if (form === "不通过") {
        this.checkTable = {
          ownId: this.$route.query.id,
          examineUserId: this.$store.getters.userInfo.userId,
          examineUserCn: this.$store.getters.userInfo.userName,
          examineOrg: this.$route.query.row.delegationId,
          examineOrgCn: this.$route.query.row.delegationName,
          examineOpinion: ''
        };
        this.noPassType = 'Businessaudit';
        this.isPass = true;
      }
    },
    // 不通过保存
    handleSave(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let temp = {};
          temp.ownId = this.checkTable.ownId;
          temp.examineOrg = this.checkTable.examineOrg;
          temp.examineOrgCn = this.checkTable.examineOrgCn;
          temp.examineUserId = this.checkTable.examineUserId;
          temp.examineUserCn = this.checkTable.examineUserCn;
          temp.roleJsonStr = this.roleJsonStr;
          temp["exhibitionSession"] = this.getCes;
          temp.examineStatus = "2";
          temp.examineOpinion = this.checkTable.examineOpinion;
          let fullScreenloading = this.$loading({ fullscreen: true });
          switch (this.noPassType) {
            case 'Businessaudit':
              this.getBusinessaudit(temp).then(res => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.checkTable.examineOpinion = '';
                this.isPass = false;
                this.getExport();
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'Customcheck':
              this.getCustomcheck(temp).then(res => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.isPass = false;
                this.getcustomDate();
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'AuditenterpriseBooth':
              this.getAuditenterpriseBooth(temp).then(res => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.isPass = false;
                this.getDate();
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            case 'Jointcheck':
              this.getAuditjoint(temp).then(res => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
                this.$message({
                  type: "success",
                  message: "操作成功!"
                });
                this.isPass = false;
                this.getjoint();
              }).catch(e => {
                this.$nextTick(() => {
                  fullScreenloading.close();
                });
              });
              break;
            default:
              break;
          }

        }
      });
    },
    // 第三个追加申请
    threebtn() {
      if (this.$route.query.row) {
        this.enterpriseDate.id = this.$route.query.id;
        this.enterpriseDate.name = this.$route.query.row.companyName;
        this.applyDialogVisible = true;
      }
    },
    // 追加申请按钮返回参数
    supplementaryBtn(val) {
      this.applyDialogVisible = val;
      this.getDate();
    },
    //设置广交会编码
    cafeDate() {
      if (this.enterpriseList.cantonCode !== '' && this.enterpriseList.cantonCode != null) {
        this.$message.error("企业已获得广交会编码，交易团不能重新设置");
      } else {
        this.companyId = this.$route.query.id;
        this.centerDialogVisible = true;
      }
    },
    // 第三个表格通过按钮
    enterpriseApplicationEvent(scope, prop, iconItem) {
      let temp = {};
      let _this = this;
      temp.ownId = scope.row.demandRecordId;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.examineOrg = scope.row.delegationId;
      temp.examineOrgCn = scope.row.delegationName;
      temp.roleJsonStr = this.roleJsonStr;
      temp["exhibitionSession"] = this.getCes;
      if (iconItem.prop === "pass") {
        //if (this.enterpriseList.clusterCheckStatus === "2" || this.exportDate[0].clusterCheckStatus === "不通过") {
        //  this.$message.error("展位申请信息不能审核为通过");
        //} else {
        temp.examineStatus = "1";
        //  temp.examineOpinion = "通过";
          // this.$confirm("此操作企业展位申请将审核" + temp.examineOpinion + ", 是否继续?", "提示", {
          //   confirmButtonText: "确定",
          //   cancelButtonText: "取消",
          //   type: "warning"
          // })
          //   .then(() => {
        let fullScreenloading = this.$loading({ fullscreen: true });
        _this.getAuditenterpriseBooth(temp).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          _this.$message({
            type: "success",
            message: "操作成功!"
          });
          _this.getDate();
          _this.getExport();
        //  _this.getcompanyInfo();
        });
            // })
            // .catch(() => {
            //   this.$message({
            //     type: "info",
            //     message: "已取消审核"
            //   });
            // });
        //}
      } else if (iconItem.prop === "nopass") {
        this.checkTable = {
          ownId: scope.row.demandRecordId,
          examineUserId: this.$store.getters.userInfo.userId,
          examineUserCn: this.$store.getters.userInfo.userName,
          examineOrg: scope.row.delegationId,
          examineOrgCn: scope.row.delegationName,
          examineOpinion: ''
        };
        this.noPassType = 'AuditenterpriseBooth';
        this.isPass = true;
        _this.getDate();
        _this.getExport();
      }
    },
    //海关编码审核通过按钮
    customsEvent(scope, prop, iconItem) {
      let temp = {};
      let _this = this;
      temp.ownId = this.$route.query.id;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      // temp.examineOrg = this.$store.getters.userInfo.dept.code;
      temp.examineOrg = this.$store.getters.userInfo.dept.id;
      temp.examineOrgCn = this.$store.getters.userInfo.dept.name;
      temp.roleJsonStr = this.roleJsonStr;
      temp["exhibitionSession"] = this.getCes;
      if (iconItem.prop === "pass") {
        temp.examineStatus = "1";
       // temp.examineOpinion = "通过";
        // this.$confirm("此操作海关编码将审核" + temp.examineOpinion + ", 是否继续?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        let fullScreenloading = this.$loading({ fullscreen: true });
        _this.getCustomcheck(temp).then(res => {
          _this.getcustomDate();
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
          // })
          // .catch(() => {
          //   this.$message({
          //     type: "info",
          //     message: "已取消审核"
          //   });
          // });
      } else if (iconItem.prop === "nopass") {
        this.checkTable = {
          ownId: this.$route.query.id,
          examineUserId: this.$store.getters.userInfo.userId,
          examineUserCn: this.$store.getters.userInfo.userName,
          examineOrg: this.$store.getters.userInfo.dept.id,
          examineOrgCn: this.$store.getters.userInfo.dept.name,
          examineOpinion: ''
        };
        this.noPassType = 'Customcheck';
        this.isPass = true;
      } else if (iconItem.prop === "remove") {
        // this.getCustomRemove(scope.row.customsCodeId).then((res) => {
        this.getCustomRemove({
          customsCodeId: scope.row.customsCodeId,
          exhibitionSession: this.getCes
        }).then((res) => {
          _this.getcustomDate();
        });
      }
    },
    // 企业展品信息通过按钮
    exhibitsEvent(scope, prop, iconItem) {
      let temp = {};
      let _this = this;
      temp.ownId = scope.row.exhibitId;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.examineOrg = scope.row.delegationId;
      temp.examineOrgCn = scope.row.delegationName;
      temp.roleJsonStr = this.roleJsonStr;
      temp["exhibitionSession"] = this.getCes;
      if (iconItem.prop === "pass") {
        temp.examineStatus = "1";
       // temp.examineOpinion = "通过";
        // this.$confirm("此操作企业产品信息将审核" + temp.examineOpinion + ", 是否继续?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        let fullScreenloading = this.$loading({ fullscreen: true });
        _this.getProductcheck(temp).then(res => {
          _this.getExhibits(_this.searchParams);
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
          // })
          // .catch(() => {
          //   this.$message({
          //     type: "info",
          //     message: "已取消审核"
          //   });
          // });
      } else if (iconItem.prop === "nopass") {
        temp.examineStatus = "2";
        this.$prompt(
          "此操作将审核不通过并填入不通过理由, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^(?!(\s+$)).{1,200}$/,
            inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
          }
        )
          .then(value => {
            temp.examineOpinion = value.value;
            _this.getProductcheck(temp).then(res => {
              _this.getExhibits(_this.searchParams);
            });
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      }
    },
    // 企业展品修改页数
    handleSizeChange(val) {
      this.loading = true;
      this.pageInfo.pageSize = val;
      this.searchParams.size = val;
      // this.searchParams.companyId = this.$route.query.id;
      // this.searchParams.companyId = 1916800303;
      this.getExhibits(this.searchParams);
    },
    // 企业展品修改当前页信息
    handleCurrentChange(val) {
      this.loading = true;
      this.pageInfo.currentPage = val;
      this.searchParams.current = val;
      // this.searchParams.companyId = this.$route.query.id;
      // this.searchParams.companyId = 1916800303;
      this.getExhibits(this.searchParams);
    },
    //审核联营企业
    jointEvent(scope, prop, iconItem) {
      let temp = {};
      let _this = this;
      temp.ownId = scope.row.demandRecordId + '-' + scope.row.unionId;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.examineOrg = scope.row.delegationId;
      temp.examineOrgCn = scope.row.delegationName;
      temp.roleJsonStr = this.roleJsonStr;
      temp["exhibitionSession"] = this.getCes;
      if (iconItem.prop === "pass") {
        temp.examineStatus = "1";
       // temp.examineOpinion = "通过";
        // this.$confirm("此操作联营企业将审核" + temp.examineOpinion + ", 是否继续?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        let fullScreenloading = this.$loading({ fullscreen: true });
        _this.getAuditjoint(temp).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          _this.$message({
            type: "success",
            message: "操作成功!"
          });
          _this.getjoint();
        });
          // })
          // .catch(() => {
          //   this.$message({
          //     type: "info",
          //     message: "已取消审核"
          //   });
          // });
      } else if (iconItem.prop === "nopass") {
        temp.examineStatus = "2";
        this.checkTable = {
          ownId: scope.row.demandRecordId + '-' + scope.row.unionId,
          examineUserId: this.$store.getters.userInfo.userId,
          examineUserCn: this.$store.getters.userInfo.userName,
          examineOrg: this.$store.getters.userInfo.dept.id,
          examineOrgCn: this.$store.getters.userInfo.dept.name,
          examineOpinion: '',
          roleJsonStr: this.roleJsonStr,
          examineStatus: "2"
        };
        this.noPassType = 'Jointcheck';
        this.isPass = true;
        // this.$prompt(
        //   "此操作联营企业将审核不通过并填入不通过理由, 是否继续?",
        //   "提示",
        //   {
        //     confirmButtonText: "确定",
        //     cancelButtonText: "取消",
        //     inputPattern: /^(?!(\s+$)).{1,200}$/,
        //     inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
        //   }
        // )
        //   .then(value => {
        //     temp.examineOpinion = value.value;
        //     _this.getAuditjoint(temp).then(res => {
        //       _this.$message({
        //         type: "success",
        //         message: "操作成功!"
        //       });
        //       _this.getjoint();
        //     });
        //   })
        //   .catch(() => {
        //     this.$message({
        //       type: "info",
        //       message: "已取消审核"
        //     });
        //   });
      }
    },
    // 单选框组的change事件
    radioChange(val) {
      if (val === "是") {
        this.getamountcheck("通过");
      } else if (val === "否") {
        this.getamountcheck("不通过");
      }
    },
    //出口额是否达标审核
    getamountcheck(val) {
      let _this = this;
      let temp = {};
      temp.ownId = this.$route.query.id;
      temp.examineOrg = this.$route.query.row.delegationId;
      temp.examineOrgCn = this.$route.query.row.delegationName;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.roleJsonStr = this.roleJsonStr;
      temp["exhibitionSession"] = this.getCes;
      if (val === "通过") {
        temp.examineStatus = "1";
        temp.examineOpinion = "通过";
        // this.$confirm("此操作广交会最低出口额门槛标准将审核为是" + ", 是否继续?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        _this.getAmountcheck(temp).then(res => {
          _this.$message({
            type: "success",
            message: "操作成功!"
          });
          _this.getCustomSult();
        });
          // })
          // .catch(() => {
          //   this.$message({
          //     type: "info",
          //     message: "已取消审核"
          //   });
          //   _this.getCustomSult();
          // });
      } else if (val === "不通过") {
        temp.examineStatus = "2";
        temp.examineOpinion = "不通过";
        this.$confirm(
          "此操作广交会最低出口额门槛标准将审核为否" + ", 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消"
            // inputPattern: /^(?!(\s+$)).{1,200}$/,
            // inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
          }
        )
          .then(value => {
            // temp.examineOpinion = value.value;
            _this.getAmountcheck(temp).then(res => {
              _this.$message({
                type: "success",
                message: "操作成功!"
              });
              _this.getCustomSult();
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
            _this.getCustomSult();
          });
      }
    },
    //企业展品批量通过
    selectAll(val) {
      this.NoticeDate = val;
    },
    // 企业展品全选按钮
    isSelectable(row, index) {
      return true;
      // if (this.$store.getters.userInfo.org.deptType === '7') {
      //   // 交易团
      //   if (row.clusterCheckStatus === '未审核') {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // } else if (this.$store.getters.userInfo.org.deptType === '30') {
      //   //交易团分团
      //   if (row.subClusterCheckStatus === '未审核') {
      //     return true;
      //   } else {
      //     return false;
      //   }
      // }
    },
    //企业展品批量通过
    allpass() {
      if (this.NoticeDate && this.NoticeDate.length > 0) {
        let tempArry = [];
        for (let key in this.NoticeDate) {
          let temp = {};
          temp.ownId = this.NoticeDate[key].exhibitId;
          temp.examineStatus = '1';
          temp.examineOpinion = '通过';
          temp.examineUserId = this.$store.getters.userInfo.userId;
          temp.examineUserCn = this.$store.getters.userInfo.userName;
          temp.roleJsonStr = this.roleJsonStr;
          temp["exhibitionSession"] = this.getCes;
          tempArry.push(temp);
        }
        this.getAllproduct(tempArry).then((res) => {
          this.getExhibits(this.searchParams);
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
      } else {
        this.$message.error('请选择要审核的企业产品!');
      }
    },
    //多选框
    handleCheckedCitiesChange() {
    },
    //展品文字审核
    producttextBtn(val) {
      let temp = {};
      let _this = this;
      temp.ownId = this.$route.query.id;
      temp.examineUserId = this.$store.getters.userInfo.userId;
      temp.examineUserCn = this.$store.getters.userInfo.userName;
      temp.examineOrg = this.$store.getters.userInfo.dept.id;
      // temp.examineOrg = this.$store.getters.userInfo.dept.code;
      temp.examineOrgCn = this.$store.getters.userInfo.dept.name;
      temp.roleJsonStr = this.roleJsonStr;
      temp["exhibitionSession"] = this.getCes;
      if (val === "通过") {
        temp.examineStatus = "1";
        temp.examineOpinion = "通过";
        // this.$confirm("此操作展品文字将审核" + val + ", 是否继续?", "提示", {
        //   confirmButtonText: "确定",
        //   cancelButtonText: "取消",
        //   type: "warning"
        // })
        //   .then(() => {
        _this.getCompanyProductExplain(temp).then(res => {
          // _this.getcustomDate();
          _this.getCompanyresult({
            companyId: this.$route.query.id,
            exhibitionSession: this.getCes
          });
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        });
          // })
          // .catch(() => {
          //   this.$message({
          //     type: "info",
          //     message: "已取消审核"
          //   });
          // });
      } else if (val === "不通过") {
        temp.examineStatus = "2";
        this.$prompt(
          "此操作展品文字将审核不通过并填入不通过理由, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            inputPattern: /^(?!(\s+$)).{1,200}$/,
            inputErrorMessage: "请填入不通过理由,长度为200字符,请不要输入全空格"
          }
        )
          .then(value => {
            temp.examineOpinion = value.value;
            _this.getCompanyProductExplain(temp).then(res => {
              // _this.getcustomDate();
              _this.getCompanyresult({
                companyId: this.$route.query.id,
                exhibitionSession: this.getCes
              });
            });
            this.$message({
              type: "success",
              message: "操作成功!"
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消审核"
            });
          });
      }
    },
    //返回按钮
    enterpriseback() {
      this.$router.push({
        path: "/businessAuditInformation", query: { currentPage: this.$route.query.currentPage }});
    }
  }
};
</script>
