<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="交易团审核企业资料资质" name="first">
      <el-tabs v-model="activeTab" type="card" @tab-click="handleTabChange">
        <el-tab-pane label="企业审核" name="1">
          <h2 v-if="timeData.currentTime < timeData.startTime || timeData.currentTime > timeData.endTime" style="color: #d80c18;">当前时间不在审核推荐时间范围内</h2>
          <el-form :model="queryForm" :inline="true">
            <el-form-item label="展区">
              <el-select v-model="queryForm.exhibitionArea" @change="handleProductAreaQuery" clearable>
                <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展品专区">
              <el-select v-model="queryForm.productType" clearable>
                <el-option v-for="(item, index) in productTypeOpts" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input placeholder="请输入" v-model.trim="queryForm.companyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="广交会编码">
              <el-input placeholder="请输入" v-model.trim="queryForm.cecfCode" clearable></el-input>
            </el-form-item>
            <el-form-item label="上届是否参展">
              <el-select v-model="queryForm.ifLastJoin" clearable>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否推荐">
              <el-select v-model="queryForm.recommendStatus" clearable>
                <el-option v-for="item in isRecommendOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核情况">
              <el-select v-model="queryForm.clusterCheckStatus" clearable>
                <el-option v-for="item in clusterCheckStatusOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="queryBtn">
              <el-button type="primary" @click="handleQuery">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table class="trade-table" :data="tradeCenterApplyTable.records" height="550" v-loading="loading" border>
            <el-table-column label="广交会编码" fixed min-width="120px" prop="cecfCode" align="center"></el-table-column>
            <el-table-column label="企业名称" fixed min-width="120px" prop="companyName" align="center"></el-table-column>
            <el-table-column label="审核情况" min-width="120px" prop="clusterCheckStatus" align="center">
              <template slot-scope="scope">
                {{ scope.row.clusterCheckStatus | statusFilter }}
              </template>
            </el-table-column>
            <el-table-column label="出口额或国内销售额符合最低参展标准" prop="ifMeetStandard" align="center" min-width="120px">
              <template slot-scope="scope">
                <div><el-radio v-model="scope.row.ifMeetStandard" @change="handleRadioChange(scope.row, '1')" label="1" :disabled="handleDisTime()">符合</el-radio></div>
                <div><el-radio v-model="scope.row.ifMeetStandard" @change="handleRadioChange(scope.row, '2')" label="2" :disabled="handleDisTime()">不符合</el-radio></div>
              </template>
            </el-table-column>
            <el-table-column label="企业类型" min-width="120px" prop="companyType" align="center" width="150px">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-form :model="scope.row" ref="companyTypeCheck" :rules="checkRules">
                    <el-form-item class="item-Num" prop="companyType">
                      <el-select v-model="scope.row.companyType">
                        <el-option v-for="(item, index) in companyTypeCheckOpts" :key="index" :label="item.label" :value="item.value"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <div v-if="!scope.row.edit">{{ scope.row.companyType | companyTypeilter }}</div>
              </template>
            </el-table-column>
            <el-table-column label="展区" min-width="120px" prop="exhibitionAreaName" align="center"></el-table-column>
            <el-table-column label="展品专区" min-width="120px" prop="productTypeName" align="center"></el-table-column>
            <el-table-column label="企业海关编码" min-width="120px" prop="customsCodeList" align="center" width="200px">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.customsCodeList">
                  <div v-if="item.relationship === 'ENTERPRISE'">{{ item.relationship | relationshipFilter }}{{ `:${item.customsCode}(${scope.row.companyName})` }}</div>
                  <div v-if="item.relationship !== 'ENTERPRISE'">{{ item.relationship | relationshipFilter }}{{ `:${item.customsCode}(${item.relationshipName})` }}</div>
                  <div>{{ item.clusterCheckCustomsStatus === '1' ? '通过' : (item.clusterCheckCustomsStatus === '2' ? '不通过' : '') }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="布展类型" min-width="120px" prop="exhibitionType" align="center">
              <template slot-scope="scope">
                {{ scope.row.exhibitionType | typeFilter }}
              </template>
            </el-table-column>
            <el-table-column label="申请数量" min-width="120px" prop="boothNumber" align="center"></el-table-column>
            <el-table-column label="主要展示产品" min-width="120px" align="center">
              <template slot-scope="scope">
                <div v-for="item in scope.row.mainProductCodeList">{{ item.productName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="上届是否参展" min-width="120px" prop="ifLastJoin" align="center">
              <template slot-scope="scope">
                {{ scope.row.ifLastJoin === '0' ? '否' : (scope.row.ifLastJoin === '1' ? '是' : '') }}
              </template>
            </el-table-column>
            <el-table-column label="交易团审核展位需求" min-width="180px" prop="boothNumberDemand" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-form :model="scope.row" ref="boothNumberDemandCheck" :rules="checkRules">
                    <el-form-item class="item-Num" prop="boothNumberDemandCheck">
                      <el-input placeholder="请输入" v-model.trim.number="scope.row.boothNumberDemandCheck" maxlength="2" ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div v-else>{{ scope.row.boothNumberDemandCheck }}</div>
              </template>
            </el-table-column>
            <el-table-column label="交易团审核布展类型" min-width="180px" prop="boothTypeDemand" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <el-form :model="scope.row" ref="boothTypeDemandCheck" :rules="checkRules">
                    <el-form-item class="item-Num" prop="boothTypeDemandCheck">
                      <el-select v-model="scope.row.boothTypeDemandCheck">
                        <el-option value="SPECIAL_BOOTH" label="绿色特装" :disabled="handleTypeDisabled(scope.row.boothNumberDemandCheck, 'TZ')"></el-option>
                        <el-option value="STANDARD_BOOTH" label="标摊" :disabled="handleTypeDisabled(scope.row.boothNumberDemandCheck, 'BT')"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
                <div v-else>{{ scope.row.boothTypeDemandCheck | typeFilter }}</div>
              </template>
            </el-table-column>
            <el-table-column label="审核不通过原因" min-width="130px" prop="clusterCheckOpinion" align="center"></el-table-column>
            <el-table-column label="是否推荐" min-width="120px" prop="isRecommend" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.recommendDelegation">{{ scope.row.recommendDelegation.isRecommend | chooseFilter }}</div>
                <div v-else></div>
              </template>
            </el-table-column>
            <el-table-column label="推荐理由" prop="recommendReason" align="center" width="200px">
              <template slot-scope="scope">
                <div v-if="scope.row.recommendDelegation">{{ scope.row.recommendDelegation.recommendReason }}</div>
                <div v-else></div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" align="center">
              <template slot-scope="scope">
                <!-- 修改人 李康 时间 5/27 根据5/26新宠交易团审核推荐问题反馈 修改 -->
                <!-- <div><el-button type="text" @click="goCheck(scope.row.demandRecordId, scope.row)" :disabled="handleIsCheck(scope.row.clusterCheckStatus)">审核</el-button></div> -->
                <div><el-button type="text" @click="goCheck(scope.row.demandRecordId, scope.row)" :disabled="handleDisTime()">审核</el-button></div>
                <div><el-button type="text" @click="toEdit(scope.$index, scope.row)" :disabled="handleDisTime()">编辑</el-button></div>
                <div><el-button type="text" @click="toSave(scope.$index, scope.row)" :disabled="!scope.row.edit">保存</el-button></div>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="space-between" class="pagination-footer">
            <span class="add_btn">
              <el-button type="primary" size="medium" @click="handleIfMeet('1')" :disabled="handleDisTime()">批量符合</el-button>
              <el-button type="primary" size="medium" @click="handleIfMeet('2')" :disabled="handleDisTime()">批量不符合</el-button>
              <el-button type="primary" size="medium" @click="handleDownload">下载</el-button>
            </span>
            <el-pagination
              @size-change="val => handleSizeChange(val)"
              @current-change="val => handleCurrentChange(val)"
              :current-page="pageInfo.currentPage"
              :page-size="pageInfo.pageSize"
              :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tradeCenterApplyTable.total">
            </el-pagination>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="企业推荐" name="2">
          <h2 v-if="timeData.currentTime < timeData.startTime || timeData.currentTime > timeData.endTime" style="color: #d80c18;">当前时间不在审核推荐时间范围内</h2>
          <el-form :model="queryFormRo" :inline="true">
            <el-form-item label="展区">
              <el-select v-model="queryFormRo.exhibitionArea" @change="handleProductAreaQuery" clearable>
                <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展品专区">
              <el-select v-model="queryFormRo.productType" clearable>
                <el-option v-for="(item, index) in productTypeOpts" :key="index" :value="item.specialAreaCode" :label="item.specialAreaName"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="企业名称">
              <el-input placeholder="请输入" v-model.trim="queryFormRo.companyName" clearable></el-input>
            </el-form-item>
            <el-form-item label="广交会编码">
              <el-input placeholder="请输入" v-model.trim="queryFormRo.cecfCode" clearable></el-input>
            </el-form-item>
            <!-- <el-form-item label="布展类型">
              <el-select v-model="queryFormRo.exhibitionType" clearable>
                <el-option v-for="item in exhibitionTypeOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item> -->
            <el-form-item label="上届是否参展">
              <el-select v-model="queryFormRo.ifLastJoin" clearable>
                <el-option label="是" value="1"></el-option>
                <el-option label="否" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否推荐">
              <el-select v-model="queryFormRo.recommendStatus" clearable>
                <el-option v-for="item in isRecommendOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="审核情况">
              <el-select v-model="queryFormRo.clusterCheckStatus" clearable>
                <el-option label="未审核" value="0"></el-option>
                <el-option label="通过" value="1"></el-option>
                <el-option label="不通过" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="queryBtn">
              <el-button type="primary" @click="handleQuery('Ro')">查询</el-button>
            </el-form-item>
          </el-form>
          <el-table class="recommend_table" :data="recommendDelegData.records" ref="multipleTable" height="550" :row-style="rowClass" v-loading="loading" border>
            <el-table-column fixed label="是否推荐" prop="recommendStatus" min-width="60px" align="center">
              <template slot-scope="scope">
                <el-checkbox v-model="scope.row.checked" @change="val => handleCheckedChange(val, scope.row, scope.$index)"></el-checkbox>
              </template>
            </el-table-column>
            <!--
            <el-table-column label="推荐情况" prop="recommendStatus" min-width="120px" align="center">
              <template slot-scope="scope">
                {{ scope.row.recommendStatus === '0' ? '未推荐' : (scope.row.recommendStatus === '1' ? '已推荐' : '') }}
              </template>
            </el-table-column>
            -->
            <el-table-column fixed label="广交会编码" prop="cecfCode" min-width="120px" align="center"></el-table-column>
            <el-table-column fixed label="企业名称" prop="companyName" min-width="120px" align="center"></el-table-column>
            <!-- <el-table-column label="海关编码" prop="customsCodeList" align="center" width="120px">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.customsCodeList">{{ `${item.customsCode}` }}</div>
              </template>
            </el-table-column> -->
            <el-table-column label="海关编码" prop="customsCodeList" min-width="200px" align="center">
              <template slot-scope="scope">
                <div v-for="(item, index) in scope.row.customsCodeList">
                  <div v-if="item.relationship === 'ENTERPRISE'">{{ item.relationship | relationshipFilter }}{{ `:${item.customsCode}(${scope.row.companyName})` }}</div>
                  <div v-if="item.relationship !== 'ENTERPRISE'">{{ item.relationship | relationshipFilter }}{{ `:${item.customsCode}(${item.relationshipName})` }}</div>
                  <div>{{ item.clusterCheckCustomsStatus === '1' ? '通过' : (item.clusterCheckCustomsStatus === '2' ? '不通过' : '') }}</div>
                  <!-- <el-select v-model="item.clusterCheckCustomsStatus" :disabled="handleDisabled(scope.row.recommendStatus)">
                    <el-option label="通过" value="1"></el-option>
                    <el-option label="不通过" value="2"></el-option>
                  </el-select> -->
                </div>
              </template>
            </el-table-column>
            <el-table-column label="经交易团审核国内销售额（万元）" prop="salesVolume" min-width="180px" align="center"></el-table-column>
            <el-table-column label="企业类型" prop="companyType" min-width="120px" align="center">
              <template slot-scope="scope">
                {{scope.row.companyType | companyTypeilter}}
                <!-- <div>
                  <el-form :model="scope.row" ref="companyType" :rules="rules">
                    <el-form-item class="item-Num" prop="companyType">
                      <el-select v-model="scope.row.companyType" :disabled="handleDisabled(scope.row.recommendStatus)">
                        <el-option v-for="item in companyTypeOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div> -->
              </template>
            </el-table-column>
            <el-table-column label="展区" prop="exhibitionAreaName" min-width="120px" align="center"></el-table-column>
            <el-table-column label="展品专区" prop="productTypeName" min-width="120px" align="center"></el-table-column>
            <el-table-column label="申请数量" prop="boothNumber" min-width="120px" align="center"></el-table-column>
            <el-table-column label="申请布展类型" prop="exhibitionType" min-width="120px" align="center">
              <template slot-scope="scope">
                {{ scope.row.exhibitionType | typeFilter }}
              </template>
            </el-table-column>
            <el-table-column label="审核情况" prop="clusterCheckStatus" min-width="120px" align="center">
              <template slot-scope="scope">
                {{ scope.row.clusterCheckStatus | statusFilter }}
              </template>
            </el-table-column>
            <el-table-column label="主要展示产品" min-width="120px" align="center">
              <template slot-scope="scope">
                <div v-for="item in scope.row.mainProductCodeList">{{ item.productName }}</div>
              </template>
            </el-table-column>
            <el-table-column label="上届是否参展" prop="ifLastJoin" min-width="120px" align="center">
              <template slot-scope="scope">
                {{ scope.row.ifLastJoin === '0' ? '否' : (scope.row.ifLastJoin === '1' ? '是' : '') }}
              </template>
            </el-table-column>
            <el-table-column label="交易团审核展位需求" min-width="180px" prop="boothNumberDemand" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.clusterCheckStatus === '1'">
                  <div v-if="scope.row.boothNumberDemand">{{ scope.row.boothNumberDemand }}</div>
                  <div v-if="!scope.row.boothNumberDemand">{{ scope.row.boothNumber }}</div>
                </div>
                <!-- <div>
                  <el-form :model="scope.row" ref="boothNumberDemand" :rules="rules">
                    <el-form-item class="item-Num" prop="boothNumberDemand">
                      <el-input placeholder="请输入" type="number" v-model.number="scope.row.boothNumberDemand" oninput="if(value.length>2)value=value.slice(0,2)" :disabled="handleDisabled(scope.row.recommendStatus)"></el-input>
                    </el-form-item>
                  </el-form>
                </div> -->
              </template>
            </el-table-column>
            <el-table-column label="交易团审核布展类型" min-width="180px" prop="boothTypeDemand" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.clusterCheckStatus === '1'">
                  <div v-if="scope.row.boothTypeDemand">{{ scope.row.boothTypeDemand | typeFilter }}</div>
                  <div v-if="!scope.row.boothTypeDemand">{{ scope.row.exhibitionType | typeFilter }}</div>
                </div>
                <!-- <div>
                  <el-form :model="scope.row" ref="boothTypeDemand" :rules="rules">
                    <el-form-item class="item-Num" prop="boothTypeDemand">
                      <el-select v-model="scope.row.boothTypeDemand" :disabled="handleDisabled(scope.row.recommendStatus)">
                        <el-option value="SPECIAL_BOOTH" label="绿色特装" :disabled="handleTypeDisabled(scope.row.boothNumberDemand, 'TZ')"></el-option>
                        <el-option value="STANDARD_BOOTH" label="标摊" :disabled="handleTypeDisabled(scope.row.boothNumberDemand, 'BT')"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div> -->
              </template>
            </el-table-column>
            <!--
            <el-table-column label="是否推荐" prop="isRecommend" min-width="120px" align="center">
              <template slot-scope="scope">
                <div>
                  <el-form :model="scope.row" ref="isRecommend" :rules="rules">
                    <el-form-item class="item-Num" prop="isRecommend">
                      <el-select v-model="scope.row.isRecommend" :disabled="handleDisabled(scope.row.recommendStatus)">
                        <el-option v-for="item in isRecommendOpts" :key="item.value" :value="item.value" :label="item.label"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-form>
                </div>
              </template>
            </el-table-column>
            -->
            <el-table-column label="推荐理由" prop="recommendReason" align="center" width="800px">
              <template slot-scope="scope">
                <div class="reason_column">
                  <span class="reason_check">
                    <el-checkbox-group v-model="scope.row.reasonArray">
                      <el-checkbox :label="'1'">
                        相关产品出口额较大
                        <!--<span v-if="handleIsShow('1', scope.row)">_____</span>
                        <el-input v-if="!handleIsShow('1', scope.row)" type="number" v-model.number="scope.row.reasonOne" :disabled="handleDisabled(scope.row.recommendStatus)" size="small" oninput="if(value>10)value=value.slice(0,10)" placeholder="请输入" style="width: 70px;"></el-input>
                        （万美元）-->
                      </el-checkbox>
                      <el-checkbox :label="'2'">
                        相关产品国内销售额较大
                        <span v-if="handleIsShow('2', scope.row)">_____</span>
                        <el-input v-if="!handleIsShow('2', scope.row)" type="number" v-model.number="scope.row.reasonTwo" size="small" oninput="if(value>10)value=value.slice(0,10)" placeholder="请输入" style="width: 70px;"></el-input>
                        （万元人民币）
                      </el-checkbox>
                      <el-checkbox :label="'3'">有参加对应类别知名专业展的经验</el-checkbox>
                    </el-checkbox-group>
                  </span>
                  <span class="reason_check">
                    <el-checkbox-group v-model="scope.row.reasonArray">
                      <el-checkbox :label="'4'">拥有自主知识产权</el-checkbox>
                      <el-checkbox :label="'5'">拥有境外注册商标</el-checkbox>
                      <el-checkbox :label="'6'">通过国际行业认证</el-checkbox>
                      <el-checkbox :label="'7'">近两年参加过商务部组织对外经济合作和援助项目</el-checkbox>
                      <el-checkbox :label="'8'">
                        其他
                        <span v-if="handleIsShow('8', scope.row)">________________</span>
                        <el-input v-if="!handleIsShow('8', scope.row)" v-model="scope.row.reasonEight" size="small" maxlength="120" placeholder="请输入" style="width: 150px;"></el-input>
                      </el-checkbox>
                    </el-checkbox-group>
                  </span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="space-between" class="pagination-footer">
            <span class="add_btn">
              <el-button type="primary" size="medium" @click="handleRecommendSubmit" :disabled="handleDisTime()">提交</el-button>
              <!--<el-button type="primary" size="medium" @click="handlePrint">打印</el-button>-->
              <el-button type="primary" size="medium" @click="handleRecommendDownload">下载</el-button>
            </span>
            <el-pagination
              @size-change="val => handleSizeChange(val, 'Ro')"
              @current-change="val => handleCurrentChange(val, 'Ro')"
              :current-page="pageInfoRo.currentPage"
              :page-size="pageInfoRo.pageSize"
              :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
              layout="total, sizes, prev, pager, next, jumper"
              :total="recommendDelegData.total">
            </el-pagination>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
import store from '../../scripts/framework/store';
export default {
  mixins: [listPageBase],
  data() {
    var needInt = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (value === '') {
        return callback(new Error('请输入>=0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else {
        return callback();
      }
    };
    return {
      activeName: 'first',
      activeTab: "1",
      loading: '',
      store,
      lastTradeCenterApplyTable: {},
      tradeCenterApplyTable: {},
      lastIndex: '', // 上次编辑索引
      // 开放期间时间
      timeData: {
        startTime: '',
        endTime: '',
        currentTime: ''
      },
      selectRow: [],
      multipleSelection: [],
      checkRules: {
        companyType: [{ required: true, message: '请选择', trigger: 'change' }],
        boothNumberDemandCheck: [{ required: true, validator: needInt, trigger: 'blur' }],
        boothTypeDemandCheck: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      rulesList: ['companyTypeCheck', 'boothNumberDemandCheck', 'boothTypeDemandCheck'],
      exhibitionAreaOpts: [],
      productTypeOpts: [],
      companyOpts: [],
      companyTypeCheckOpts: [],
      recommendStatusOpts: [],
      exhibitionTypeCheckOpts: [{ value: 'SPECIAL_BOOTH', label: '绿色特装' }, { value: 'STANDARD_BOOTH', label: '标摊' }],
      exhibitionTypeOpts: [{ value: 'SPECIAL_BOOTH', label: '绿色特装' }, { value: 'STANDARD_BOOTH', label: '标摊' },
      { value: 'CENTER_CHANNEL_BOOTH', label: '中央通道' }, { value: 'UNIFICATION_BOOTH', label: '统一布展' }],
      clusterCheckStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '通过' }, { value: '2', label: '不通过' }],
      // 企业审核
      queryForm: {
        exhibitionArea: '',
        productType: '',
        delegationId: this.$store.getters.userInfo.org.deptId,
        companyName: '',
        ifLastJoin: '',
        recommendStatus: '',
        cecfCode: '',
        clusterCheckStatus: ''
      },
      // 企业推荐
      isRecommendOpts: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      // isRecommendOptsw: [{ value: '0', label: '未推荐' }, { value: '1', label: '已推荐' }],
      recommendDelegData: [],
      companyTypeOpts: [],
      checkList: [], // 临时选中的值
      queryFormRo: {
        exhibitionArea: '',
        productType: '',
        delegationId: this.$store.getters.userInfo.org.deptId,
        companyName: '',
        cecfCode: '',
        recommendStatus: '',
        clusterCheckStatus: '', // 审核情况
        ifLastJoin: '' // 是否上届参展
      },
      rules: {
        companyType: [{ required: true, message: '请选择', trigger: 'change' }],
        boothNumberDemand: [{ required: true, message: '请输入', trigger: 'blur' }],
        boothTypeDemand: [{ required: true, message: '请选择', trigger: 'change' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 },
      pageInfoRo: { currentPage: 1, pageSize: 10 }
    };
  },
  filters: {
    statusFilter: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '未审核';
        case '1':
          return '通过';
        case '2':
          return '不通过';
        default:
          return;
      }
    },
    typeFilter: value => {
      switch (value) {
        case 'SPECIAL_BOOTH':
          return '绿色特装';
        case 'STANDARD_BOOTH':
          return '标摊';
        case 'CENTER_CHANNEL_BOOTH':
          return '中央通道';
        case 'UNIFICATION_BOOTH':
          return '统一布展';
        default:
          return;
      }
    },
    // 是否
    chooseFilter: value => {
      let val = value + '';
      switch (val) {
        case '0':
          return '否';
        case '1':
          return '是';
        default:
          return;
      }
    },
    // 公司关系
    relationshipFilter: value => {
      switch (value) {
        case 'ENTERPRISE':
          return '本企业';
        case 'SUBSIDARYCOMPANY':
          return '全资子公司';
        case 'HOLDCOMPANY':
          return '控股子公司';
        default:
          return;
      }
    },
    // 企业类型
    companyTypeilter: value => {
      let companyTypeOptsw = kindo.dictionary.get('companyType');
      for (let i = 0; i < companyTypeOptsw.length; i++) {
        if (value === companyTypeOptsw[i].value) {
          return companyTypeOptsw[i].label;
        }
      }
    }
  },
  watch: {
    multipleSelection(data) {  //存储选中的row
      this.selectRow = [];
      for (let i = 0, l = data.length; i < l; i++) {
        if ((data[i].recommendStatus === '1' && data[i].reasonArray.length === 0 || data[i].recommendStatus !== '1' && data[i].reasonArray.length > 0)) {
          this.selectRow.push(data[i].demandRecordId);
        } else if (data[i].recommendStatus === '1' && data[i].reasonArray.length > 0) {
          let flag = this.handleSelectTable(data[i]);
          if (!flag) {
            this.selectRow.push(data[i].demandRecordId);
          }
        }
      }
    }
  },
  computed: {
    ...mapGetters('newThemeCheckRecommendCompany', ['tradeCenterApplyData', 'recommendByDelegationData']),
    formQueryRo() {
      return {
        exhibitionArea: this.queryFormRo.exhibitionArea,
        productType: this.queryFormRo.productType,
        delegationId: this.queryFormRo.delegationId,
        companyName: this.queryFormRo.companyName,
        cecfCode: this.queryFormRo.cecfCode,
        recommendStatus: this.queryFormRo.recommendStatus,
        clusterCheckStatus: this.queryFormRo.clusterCheckStatus,
        ifLastJoin: this.queryFormRo.ifLastJoin,
        current: this.pageInfoRo.currentPage,
        size: this.pageInfoRo.pageSize
      };
    },
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        productType: this.queryForm.productType,
        delegationId: this.queryForm.delegationId,
        companyName: this.queryForm.companyName,
        recommendStatus: this.queryForm.recommendStatus,
        ifLastJoin: this.queryForm.ifLastJoin,
        cecfCode: this.queryForm.cecfCode,
        clusterCheckStatus: this.queryForm.clusterCheckStatus,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  async created() {
    // 展区
    //this.getexhibitionArea().then(res => {
    //  this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    //}).catch(e => {});

    // 获取新能源页面展区
    this.getexhibitionArea().then(resa => {
      this.exhibitionArea = JSON.parse(JSON.stringify(resa));
      // this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
      // 新题材展区
      this.getexhibitionAreaDTOList().then(res => {
        this.exhibitionAreaOpts = [];
        this.arr = JSON.parse(JSON.stringify(res.records));
        this.arr.forEach((item, index, ar) => {
          if (item.isNewThemeArea) { // 是新题材
            for (let i = 0; i < this.exhibitionArea.length; i++) {
              if (item.exhibitionAreaCode === this.exhibitionArea[i].exhibitionAreaCode) {
                let exare = {
                  exhibitionAreaCode: this.exhibitionArea[i].exhibitionAreaCode,
                  exhibitionAreaName: this.exhibitionArea[i].exhibitionAreaName
                };
                this.exhibitionAreaOpts.push(exare);
              }
            }
          }
        });
      });
    }).catch(e => {});
    if (this.$route.query.form) {
      this.queryForm = this.$route.query.form;
      this.pageInfo = this.$route.query.page;
    }
    this.companyTypeOpts = await kindo.dictionary.get('companyType');
    this.createdQuery();
  },
  mounted() {
    this.$nextTick(() => {
      this.$http.get(`${process.env.API_NA_URL}/api/speciaAreaExternal/time/get`, { subKey: 'ENTERPRISE_QUALIFICATION_NEW', orald: this.$store.getters.userInfo.org.deptId }).then(res => {
        this.timeData.startTime = new Date(res.startTime).getTime();
        this.timeData.endTime = new Date(res.endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
        this.timeData.currentTime = new Date().getTime();
      }).catch(e => {});
      for (let i = 0, l = this.companyTypeOpts.length; i < l; i++) {
        if (this.companyTypeOpts[i].label === '生产企业' || this.companyTypeOpts[i].label === '外贸企业' || this.companyTypeOpts[i].label === '工贸企业') {
          this.companyTypeCheckOpts.push(this.companyTypeOpts[i]);
        }
      }
    });
  },
  methods: {
    ...mapActions('newThemeCheckRecommendCompany', ['getCheckByDelegation', 'getRecommendByDelegation', 'postCheckIfMeet',
      'postRecommendChangeCompanyType', 'postRecommendByDelegation', 'postSaveCompanyInfo', 'postSaveCompany']),
    ...mapActions('nainformation', ['getexhibitionArea', 'getexhibitionInfoByCode', 'getexhibitionAreaDTOList']),
    // 时间限制
    handleDisTime() {
      if (this.timeData.startTime && this.timeData.endTime) {
        if (this.timeData.currentTime < this.timeData.startTime || this.timeData.currentTime > this.timeData.endTime) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // 根据展区查询专区
    handleProductAreaQuery(val) {
      this.queryForm.productType = '';
      this.queryFormRo.productType = '';
      this.productTypeOpts = [];
      if (val) {
        let fullScreenloading = this.$loading({ fullscreen: true });
        this.getexhibitionInfoByCode({ exhibitionAreaCode: val }).then(res => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
          this.productTypeOpts = JSON.parse(JSON.stringify(res));
        }).catch(e => {
          this.$nextTick(() => {
            fullScreenloading.close();
          });
        });
      }
    },
    // 标签页切换
    handleTabChange(tab) {
      this.productTypeOpts = [];
      this.exhibitionAreaOpts = [];
      // 展区
      this.getexhibitionArea().then(res => {
        this.getexhibitionAreaDTOList().then(resa => {
          this.exhibitionAreaOpts = []; // 李康 增加此行 5/27
          this.arr = JSON.parse(JSON.stringify(resa.records));
          this.arr.forEach((item, index, ar) => {
            if (item.isNewThemeArea) { // 是新题材
              for (let i = 0; i < this.exhibitionArea.length; i++) {
                if (item.exhibitionAreaCode === this.exhibitionArea[i].exhibitionAreaCode) {
                  let exare = {
                    exhibitionAreaCode: this.exhibitionArea[i].exhibitionAreaCode,
                    exhibitionAreaName: this.exhibitionArea[i].exhibitionAreaName
                  };
                  this.exhibitionAreaOpts.push(exare);
                }
              }
            }
          });
        });
      }).catch(e => {});
      this.loading = true;
      if (tab.name === '1') {
        this.createdQuery();
      } else {
        this.createdQuery('Ro');
      }
    },
    // 能否审核
    handleIsCheck(status) {
      if (status === '1' || status === '2') {
        return true;
      } else {
        return false;
      }
    },
    // 前往企业审核页
    goCheck(id, row) {
      this.$router.push({ path: '/checkCompanyDetails', query: { id: id, row: row, form: this.queryForm, page: this.pageInfo }});
    },
    // 编辑
    toEdit(index, row) { 
      if (this.lastIndex === '' || index === this.lastIndex) {
        this.lastTradeCenterApplyTable = JSON.parse(JSON.stringify(this.tradeCenterApplyTable));
        this.tradeCenterApplyTable.records[index]['edit'] = true;
        this.lastIndex = index;
      } else if (index !== this.lastIndex) {
        this.$confirm('是否放弃本次编辑？', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tradeCenterApplyTable = JSON.parse(JSON.stringify(this.lastTradeCenterApplyTable));
          for (let i = 0, l = this.tradeCenterApplyTable.records.length; i < l; i++) {
            this.tradeCenterApplyTable.records[i]['edit'] = false;
          }
          this.tradeCenterApplyTable.records[index]['edit'] = true;
          this.lastIndex = index;
        }).catch(() => {
          this.$message.info('已取消此操作!');
        });
      }
    },
    // 保存
    toSave(index, row) { 
      let validArr = [];
      let flag = [];
      for (let i = 0; i < this.rulesList.length; i++) {
        this.$refs[this.rulesList[i]].validate(valid => {
          validArr.push(valid);
        });
      }
      for (let f = 0; f < validArr.length; f++) {
        if (validArr[f]) {
          flag.push(true);
        } else {
          flag.push(false);
        }
      }
      if (!flag.includes(false)) {
        let saveCompanyData = {
          companyId: row.companyId,
          enterprisesType: row.companyType
        };
        let saveData = {
          demandRecordId: row.demandRecordId,
          boothNumberDemand: row.boothNumberDemandCheck,
          boothTypeDemand: row.boothTypeDemandCheck
        };
        if (saveData.boothNumberDemand === 1 && saveData.boothTypeDemand === 'SPECIAL_BOOTH') {
          this.$message.warning('1个展位仅可标摊布展');
        } else {
          this.loading = true;
          // 编辑保存
          this.postSaveCompanyInfo(saveCompanyData).then(() => {
            this.postSaveCompany(saveData).then(() => {
              this.loading = false;
              this.tradeCenterApplyTable.records[index]['edit'] = false; 
              this.lastIndex = '';
              this.createdQuery();
            }).catch(e => {
              this.loading = false;
            });
          }).catch(e => {
            this.loading = false;
          });
        }
      } else {
        this.$message.error('请确认填写框填写正确');
      }
    },
    // 符合状态改变
    handleRadioChange(row, status) {
      let submitObj = {
        demandRecordId: row.demandRecordId,
        ifMeetStandard: status
      };
      let submitList = [];
      submitList.push(submitObj);
      this.loading = true;
      this.postCheckIfMeet(submitList).then(() => {
        this.loading = false;
        this.$message.success('操作成功');
        this.createdQuery();
      }).catch(e => {
        this.loading = false;
      });
    },
    // 批量符合不符合
    handleIfMeet(type) {
      let recordData = JSON.parse(JSON.stringify(this.tradeCenterApplyTable.records));
      let submitList = [];
      for (let i = 0, l = recordData.length; i < l; i++) {
        let obj = {
          demandRecordId: recordData[i].demandRecordId,
          ifMeetStandard: type
        };
        submitList.push(obj);
      }
      this.loading = true;
      this.postCheckIfMeet(submitList).then(() => {
        this.loading = false;
        this.$message.success('操作成功');
        this.createdQuery();
      }).catch(e => {
        this.loading = false;
      });
    },
    // 交易团审核下载
    handleDownload() {
      let url = `delegationName=${this.$store.getters.userInfo.org.deptName}&exhibitionArea=${this.queryForm.exhibitionArea}&productType=${this.queryForm.productType}&delegationId=${this.queryForm.delegationId}&companyName=${this.queryForm.companyName}&exhibitionType=${this.queryForm.exhibitionType}&cecfCode=${this.queryForm.cecfCode}&clusterCheckStatus=${this.queryForm.clusterCheckStatus}`;
      url = url.replace(/undefined/g, '');
      window.open(`${process.env.API_NA_URL}/api/newthemeCompanyCheck/checkByDelegation/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 交易团推荐下载
    handleRecommendDownload() {
      let url = `delegationName=${this.$store.getters.userInfo.org.deptName}&exhibitionArea=${this.queryFormRo.exhibitionArea}&productType=${this.queryFormRo.productType}&ifLastJoin=${this.queryFormRo.ifLastJoin}&clusterCheckStatus=${this.queryFormRo.clusterCheckStatus}&delegationId=${this.queryFormRo.delegationId}&companyName=${this.queryFormRo.companyName}&exhibitionType=${this.queryFormRo.exhibitionType}&cecfCode=${this.queryFormRo.cecfCode}&recommendStatus=${this.queryFormRo.recommendStatus}`;
      url = url.replace(/undefined/g, '');
      window.open(`${process.env.API_NA_URL}/api/newthemeCompanyCheck/checkByDelegation/download?${url}&token=${localStorage.getItem('USER_TOKEN')}`, '_blank');
    },
    // 打印
    handlePrint() {
      let paramData = JSON.parse(JSON.stringify(this.recommendByDelegationData));
      window.open(window.location.origin + '/#/checkCompanyTablePrint?data=' + encodeURI(JSON.stringify(paramData)));
    },
    // 布展类型选择
    handleTypeDisabled(num, type) {
      let nums;
      if (num) {
        nums = num;
      } else {
        nums = 0;
      }
      if (type === 'TZ') {
        if (nums < 2) {
          return true;
        } else {
          return false;
        }
      } else if (type === 'BT') {
        if (nums > 0) {
          return false;
        } else {
          return true;
        }
      }
    },
    // 是否已推荐
    handleDisabled(status) {
      if (status === '0') {
        return false;
      } else {
        return true;
      }
    },
    // 推荐理由选择
    handleIsShow(id, row) {
      if (row.reasonArray) {
        let index = row.reasonArray.indexOf(id);
        if (index === -1) {
          this.handleClear(id, row);
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    },
    // 推荐理由清空
    handleClear(id, row) {
      switch (id) {
        case '2':
          row.reasonTwo = '';
          break;
        case '8':
          row.reasonEight = '';
          break;
        default:
          break;
      }
    },
    // 信息是否填写而进行推荐
    handleSelectTable(row) {
      if (row.reasonArray.length > 0) {
        // let indexOne = row.reasonArray.indexOf('1');
        let indexTwo = row.reasonArray.indexOf('2');
        let indexEight = row.reasonArray.indexOf('8');
        if (indexTwo === -1 && indexEight === -1) { // 需填写项都不存在
          return true;
        } else if ((indexTwo !== -1 && indexEight === -1) || (indexTwo === -1 && indexEight !== -1)) { // 存在一项需填写项
          if (row.reasonTwo !== '' || row.reasonEight !== '') {
            return true;
          } else {
            return false;
          }
        } else if (row.reasonTwo !== '' && row.reasonEight !== '') { // 存在两项需填写项
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    // 高亮样式
    rowClass({ row, rowIndex }) {
      if (this.selectRow.includes(row.demandRecordId)) {
        return { "background-color": "rgba(185, 221, 249, 0.75)" };
      }
    },
    handleCheckedChange(val, row, index) { // 选中的数据获取
      // this.checkList = []; // 初始化，防止重复添加
      // let obj = {
      //   companyCustomsCodeList: row.customsCodeList,
      //   newthemeRecommendDelegation: row
      // };
      // if (val) {
      //   obj.newthemeRecommendDelegation.recommendStatus = '1';
      // } else {
      //   obj.newthemeRecommendDelegation.recommendStatus = '0';
      // }
      // this.checkList.push(obj);
      // this.handleRecommend();
      // 记录勾选状态
      if (val) {
        this.recommendDelegData.records[index].recommendStatus = '1';
      } else {
        this.recommendDelegData.records[index].recommendStatus = '0';
      }
    },
    // 提交
    handleRecommendSubmit() {
      let flag = true;
      this.multipleSelection = [];
      for (let i = 0, l = this.recommendDelegData.records.length; i < l; i++) {
        if ((this.recommendDelegData.records[i].recommendStatus === '1' && this.recommendDelegData.records[i].reasonArray.length === 0) || (this.recommendDelegData.records[i].recommendStatus !== '1' && this.recommendDelegData.records[i].reasonArray.length > 0)) {
          flag = false;
          break;
        } else if (this.recommendDelegData.records[i].recommendStatus === '1' && this.recommendDelegData.records[i].reasonArray.length > 0) {
          flag = this.handleSelectTable(this.recommendDelegData.records[i]);
          if (!flag) {
            break;
          }
        }
      }
      if (flag) {
        for (let i = 0, l = this.recommendDelegData.records.length; i < l; i++) {
          this.checkList.push({
            companyCustomsCodeList: this.recommendDelegData.records[i].customsCodeList,
            newthemeRecommendDelegation: this.recommendDelegData.records[i]
          });
        }
        this.handleRecommend();
      } else {
        this.multipleSelection = this.recommendDelegData.records;
        this.$message.warning('需同时填写推荐意见和推荐理由时方可提交推荐方案。');
      }
      
    },
    // 进行推荐
    handleRecommend() {
      // this.lastCheckData[this.pageInfoRo.currentPage - 1] = this.checkList; // 保存当前页获取的值
      //降维 --- 二维数组降至一维数组
      // let getList = Array.prototype.concat.apply([], this.lastCheckData);
      // if (getList.length > 0) {
      // 推荐理由整理
      this.loading = true;
      let reasonContentArr = ['相关产品出口额较大', '相关产品国内销售额较大', '有参加对应类别知名专业展的经验', '拥有自主知识产权', '拥有境外注册商标',
        '通过国际行业认证', '近两年参加过商务部组织对外经济合作和援助项目', '其他'];
      let index;
      let recommendData = [];
      for (let i = 0; i < this.checkList.length; i++) {
        let record = this.checkList[i].newthemeRecommendDelegation;
        let arr = [];
        if (record.reasonArray) {
          for (let t = 0; t < reasonContentArr.length; t++) {
            index = record.reasonArray.indexOf(t + 1 + '');
            if (t === 1 && index !== -1) { // 第二项理由存在
              arr.push(`${reasonContentArr[t]}${record.reasonTwo}（万元人民币）`);
            } else if (t === 7 && index !== -1) { // 第八项理由存在
              arr.push(`${reasonContentArr[t]}${record.reasonEight}`);
            } else if (index !== -1) {
              arr.push(`${reasonContentArr[t]}`);
            }
          }
          record.recommendReason = arr.join(',');
        }
        // 临时存储的传参
        let obj = {
          companyCustomsCodeList: [],
          newthemeRecommendDelegation: {}
        };
        obj.companyCustomsCodeList = this.checkList[i].companyCustomsCodeList;
        let data = JSON.parse(JSON.stringify(this.checkList[i].newthemeRecommendDelegation));
        obj.newthemeRecommendDelegation = {
          boothNumberDemand: data.boothNumberDemand,
          boothTypeDemand: data.boothTypeDemand,
          boothType: data.productType,
          boothTypeName: data.productTypeName,
          coceralId: data.coceralId,
          coceralCode: data.coceralCode,
          coceralName: data.coceralName,
          companyCecfCode: data.cecfCode,
          companyId: data.companyId,
          companyName: data.companyName,
          delegationId: data.delegationId,
          delegationCode: data.delegationCode,
          delegationName: data.delegationName,
          demandRecordId: data.demandRecordId,
          exhibitionAreaCode: data.exhibitionArea,
          exhibitionAreaName: data.exhibitionAreaName,
          exhibitionSession: data.exhibitionSession,
          isRecommend: data.recommendStatus,
          recommendReason: data.recommendReason,
          reasonArray: data.reasonArray.length > 1 ? data.reasonArray.join(',') : data.reasonArray[0],
          reasonOne: '',
          reasonTwo: data.reasonTwo,
          reasonEight: data.reasonEight
        };
        recommendData.push(obj);
        // recommendData[i].newthemeRecommendDelegation.recommendStatus = '1';
      }
        // this.$confirm('确定将选择的所有企业进行推荐吗', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'wargning'
        // }).then(() => {       
      this.postRecommendByDelegation(recommendData).then(() => {
        this.$message.success('操作成功');
        this.createdQuery('Ro');
      }).catch(e => {
        this.loading = false;
      });
        // }).catch(() => {
        //   this.$message.info('已取消本次操作');
        // });
      // } else {
      //   this.$message.warning('请至少选择一项');
      // }
    },
    // 查询
    handleQuery(type) {
      if (type !== 'Ro') {
        this.pageInfo.currentPage = 1;
      } else {
        this.pageInfoRo.currentPage = 1;
      }
      this.createdQuery(type);
    },
    // 操作页面
    handleCurrentChange(val, type) {
      if (type !== 'Ro') {
        this.pageInfo.currentPage = val;
        this.createdQuery(type);
      } else {
        this.pageInfoRo.currentPage = val;
        this.createdQuery(type);
      }
    },
    handleSizeChange(val, type) {
      if (type !== 'Ro') {
        this.pageInfo.pageSize = val;
        this.createdQuery(type);
      } else {
        this.pageInfoRo.pageSize = val;
        this.createdQuery(type);
      }
    },
    // 查询封装
    createdQuery(type) {
      this.loading = true;
      if (type !== 'Ro') {
        this.getCheckByDelegation(this.formQuery).then(data => {
          this.loading = false;
          let resData = JSON.parse(JSON.stringify(this.tradeCenterApplyData));
          for (let i = 0; i < resData.records.length; i++) {
            resData.records[i].edit = false;
            resData.records[i].boothNumberDemandCheck = resData.records[i].boothNumberDemand ? resData.records[i].boothNumberDemand : resData.records[i].boothNumber;
            resData.records[i].boothTypeDemandCheck = resData.records[i].boothTypeDemand ? resData.records[i].boothTypeDemand : resData.records[i].exhibitionType;
          }
          this.lastIndex = '';
          this.tradeCenterApplyTable = JSON.parse(JSON.stringify(resData));
        }).catch(e => {
          this.loading = false;
        });
      } else {
        this.getRecommendByDelegation(this.formQueryRo).then(data => {
          this.loading = false;
          let directiveData = JSON.parse(JSON.stringify(this.recommendByDelegationData));
          for (let i = 0; i < directiveData.records.length; i++) {
            if (data.records[i].recommendStatus === '0') {
              directiveData.records[i].checked = false;
            } else {
              directiveData.records[i].checked = true;
            }
            if (directiveData.records[i].recommendDelegation == null) {
              directiveData.records[i].reasonArray = [];
              directiveData.records[i].reasonOne = '';
              directiveData.records[i].reasonTwo = '';
              directiveData.records[i].reasonEight = '';
              directiveData.records[i].recommendReason = '';
              // directiveData.records[i].boothTypeDemand = '';
              // directiveData.records[i].isRecommend = '';
            } else {
              // directiveData.records[i].companyType = data.records[i].recommendDelegation.companyType;
              // directiveData.records[i].boothNumberDemand = data.records[i].recommendDelegation.boothNumberDemand;
              // directiveData.records[i].boothTypeDemand = data.records[i].recommendDelegation.boothTypeDemand;
              // directiveData.records[i].isRecommend = data.records[i].recommendDelegation.isRecommend;
              if (data.records[i].recommendDelegation.reasonArray !== '' && data.records[i].recommendDelegation.reasonArray != null) {
                if (data.records[i].recommendDelegation.reasonArray.indexOf(',') === -1) {
                  let list = [];
                  list[0] = data.records[i].recommendDelegation.reasonArray;
                  directiveData.records[i].reasonArray = list;
                } else {
                  directiveData.records[i].reasonArray = data.records[i].recommendDelegation.reasonArray.split(',');
                }
              } else {
                directiveData.records[i].reasonArray = [];
              }
              directiveData.records[i].reasonOne = '';
              directiveData.records[i].reasonTwo = data.records[i].recommendDelegation.reasonTwo;
              directiveData.records[i].reasonEight = data.records[i].recommendDelegation.reasonEight;
              directiveData.records[i].recommendReason = data.records[i].recommendDelegation.recommendReason;
            }
          }
          this.checkList = [];
          this.recommendDelegData = directiveData;
        }).catch(e => {
          this.loading = false;
        });
      }
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.add_btn{
  margin-left: 30px;
}
.item-Num  >>> .el-form-item__content{
  margin-left: 0 !important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
.item-Num >>> input::-webkit-outer-spin-button,
.reason_check >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button,
.reason_check >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none!important;
}
.item-Num >>> input[type="number"],
.reason_check >>> input[type="number"] {
  -moz-appearance: textfield!important;
}
.recommend_table >>> .cell .reason_column {
  display: flex;
  justify-content: center;
  text-align: left;
}
.cell .reason_check{
  border-right: 1px solid #ebeef5;
  width: 50%;
  display:inline-block;
  margin: 0 10px;
}
.cell .reason_check:last-child{
  border: none;
}
.pagination-footer{
  margin-top: 20px;
}
.total-footer{
  text-align: center;
  padding: 20px 0;
}
</style>
