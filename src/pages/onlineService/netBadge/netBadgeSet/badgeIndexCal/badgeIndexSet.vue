<template>
  <div class="badgeIndexSetBox" v-loading="loading">
    <kindo-box title="证件指标设置">
      <kindo-box title="参展商证">
        <el-form :model="badgeSetForm.exhibitorBadge" label-width="80px" size="small" label-position="right" inline :rules="exhibitorBadgeRules" ref="exhibitorBadge">
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>标准展位:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="standardBoothNum">
                <el-input v-model="badgeSetForm.exhibitorBadge.standardBoothNum" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="standardBoothBadgeNum">
                <el-input v-model="badgeSetForm.exhibitorBadge.standardBoothBadgeNum" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个证件</template>
                </el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="3" class="inputTips">
              <div></div>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>工程农机展区(室内):</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="engineeringIndoorArea">
                <el-input v-model="badgeSetForm.exhibitorBadge.engineeringIndoorArea" placeholder="" class="inputWidth" type="text">
                  <template slot="append">㎡</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="engineeringIndoorBadgeNum">
                <el-input v-model="badgeSetForm.exhibitorBadge.engineeringIndoorBadgeNum" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个证件</template>
                </el-input>
                <span>*小数部分四舍五入计</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="3" class="inputTips">
              <div>*小数部分四舍五入计</div>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>工程农机展区(室外):</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="engineeringOutdoorArea">
                <el-input v-model="badgeSetForm.exhibitorBadge.engineeringOutdoorArea" placeholder="" class="inputWidth" type="text">
                  <template slot="append">㎡</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="engineeringOutdoorBadgeNum">
                <el-input v-model="badgeSetForm.exhibitorBadge.engineeringOutdoorBadgeNum" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个证件</template>
                </el-input>
                <span>*小数部分四舍五入计</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="3" class="inputTips">
              <div>*小数部分四舍五入计</div>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="2">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="4" class="inputLabel">
              <div>铁石装饰品及户外水疗设施展区:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="decorationExhibitionArea">
                <el-input v-model="badgeSetForm.exhibitorBadge.decorationExhibitionArea" placeholder="" class="inputWidth" type="text">
                  <template slot="append">㎡</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="decorationExhibitionBadgeNum">
                <el-input v-model="badgeSetForm.exhibitorBadge.decorationExhibitionBadgeNum" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个证件</template>
                </el-input>
                <span>*小数部分四舍五入计</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="3" class="inputTips">
              <div>*小数部分四舍五入计</div>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>化工产品展区:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="chemicalExhibitionArea">
                <el-input v-model="badgeSetForm.exhibitorBadge.chemicalExhibitionArea" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个/2M*2M</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="chemicalExhibitionBadgeNum">
                <el-input v-model="badgeSetForm.exhibitorBadge.chemicalExhibitionBadgeNum" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个证件</template>
                </el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="3" class="inputTips">
              <div></div>
            </el-col> -->
          </el-row>
        </el-form>
      </kindo-box>
      <kindo-box title="参展代表证（出口展区）">
        <el-form :model="badgeSetForm.exhibitorDelegateBadge" inline label-width="80px" size="small" label-position="right" :rules="exhibitorDelegateBadgeRules" ref="exhibitorDelegateBadge">
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>央企分团:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="centralBranchGroupDay">
                <el-input v-model="badgeSetForm.exhibitorDelegateBadge.centralBranchGroupDay" placeholder="" class="inputWidth" type="text">
                  <template slot="append">天/人/标准展位</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="centralBranchGroupPercentage">
                <el-input v-model="badgeSetForm.exhibitorDelegateBadge.centralBranchGroupPercentage" placeholder="" class="inputWidth" type="text">
                  <template slot="append">%计算</template>
                </el-input>
                <span>*小数部分四舍五入计</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>其他团:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="otherGroupPercentage">
                <el-input v-model="badgeSetForm.exhibitorDelegateBadge.otherGroupPercentage" placeholder="" class="inputWidth2" type="text">
                  <template slot="prepend">*按第102届各团实际办证天数</template>
                  <template slot="append">%计算所得</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </kindo-box>
      <kindo-box title="交易团工作证">
        <el-form :model="badgeSetForm.tradeGroupWorkBadge" inline label-width="80px" size="small" label-position="right" :rules="tradeGroupWorkBadgeRules" ref="tradeGroupWorkBadge">
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>央企总团:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="centralGroupBadgeNum">
                <el-input v-model="badgeSetForm.tradeGroupWorkBadge.centralGroupBadgeNum" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个证件</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>其他团:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="otherGroupBadgeNum">
                <el-input v-model="badgeSetForm.tradeGroupWorkBadge.otherGroupBadgeNum" placeholder="" class="inputWidth" type="text">
                  <template slot="prepend">按展位总数的</template>
                  <template slot="append">%计算</template>
                </el-input>
                <span>*不够8名时按8名计</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </kindo-box>
      <kindo-box title="交易团筹/撤展证">
        <el-form :model="badgeSetForm.tradeGroupBadge" inline label-width="110px" size="small" label-position="right" :rules="tradeGroupBadgeRules" ref="tradeGroupBadge">
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>交易团筹展证:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="prepareExhibitionBadgePercentage">
                <el-input v-model="badgeSetForm.tradeGroupBadge.prepareExhibitionBadgePercentage" placeholder="" class="inputWidth" type="text">
                  <template slot="prepend">参展商证指标的</template>
                  <template slot="append">%个证件</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>交易团撤展证:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="cancelExhibitionBadgePercentage">
                <el-input v-model="badgeSetForm.tradeGroupBadge.cancelExhibitionBadgePercentage" placeholder="" class="inputWidth" type="text">
                  <template slot="prepend">参展商证指标的</template>
                  <template slot="append">%个证件</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </kindo-box>
      <kindo-box title="商会工作证">
        <el-row>
          <ElCol :span="6">
            <div class="placeholderDiv"></div>
          </ElCol>
          <ElCol :span="12">
            <kindo-table ref="commerceWorkBadges" :pagination="false" :pageIndex='false' :height="'442px'">
              <el-table-column label="商会名称" prop="orgName" min-width="80" align='center' show-overflow-tooltip></el-table-column>
              <el-table-column label="指标数" prop="ruleValue" min-width="80" align='center' show-overflow-tooltip>
                <template slot-scope="scope">
                  <span v-if="scope.row.action==='save'">{{scope.row.ruleValue}}</span>
                  <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" size="mini" v-else v-model="scope.row.ruleValue"></el-input>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center" min-width="80">
                <template slot-scope="scope">
                  <el-button type="text" v-if="scope.row.action==='edit'" @click="editTable(scope,'save','commerceWorkBadges')" class="btnUnderline">保存</el-button>
                  <el-button type="text" v-else @click="editTable(scope,'edit','commerceWorkBadges')" class="btnUnderline">编辑</el-button>
                </template>
              </el-table-column>
            </kindo-table>
          </ElCol>
          <el-col :span="6">
            <div class="placeholderDiv"></div>
          </el-col>
        </el-row>
      </kindo-box>
      <kindo-box title="施工单位筹/撤展证">
        <el-form :model="badgeSetForm.constructionBadge" inline label-width="110px" size="small" label-position="right" :rules="constructionBadgeRules" ref="constructionBadge">
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>筹展证:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="prepareExhibitionBadgeArea">
                <el-input v-model="badgeSetForm.constructionBadge.prepareExhibitionBadgeArea" placeholder="" class="inputWidth" type="text">
                  <template slot="append">㎡</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="prepareExhibitionBadgeNum">
                <el-input v-model="badgeSetForm.constructionBadge.prepareExhibitionBadgeNum" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个证件</template>
                </el-input>
                <span>*小数部分四舍五入计</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>留展人证(付费):</div>
            </el-col>
            <el-col :span="18">
              <el-form-item>
                <div>指标数由证件中心特批</div>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>撤展证:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="cancelExhibitionBadgeArea">
                <el-input v-model="badgeSetForm.constructionBadge.cancelExhibitionBadgeArea" placeholder="" class="inputWidth" type="text">
                  <template slot="append">㎡</template>
                </el-input>
              </el-form-item>
              <el-form-item prop="cancelExhibitionBadgeNum">
                <el-input v-model="badgeSetForm.constructionBadge.cancelExhibitionBadgeNum" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个证件</template>
                </el-input>
                <span>*小数部分四舍五入计</span>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>留展负责人证:</div>
            </el-col>
            <el-col :span="18">
              <el-form-item prop="stayExhibitionBadgeNum">
                <el-input v-model="badgeSetForm.constructionBadge.stayExhibitionBadgeNum" placeholder="" class="inputWidth" type="text">
                  <template slot="append">个证件/企业</template>
                </el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="3">
              <div class="placeholderDiv"></div>
            </el-col>
            <el-col :span="3" class="inputLabel">
              <div>留展人证(付费):</div>
            </el-col>
            <el-col :span="12">
              <kindo-table ref="leftBadgeTableData" :pagination="false" :pageIndex='false' :height="'385px'">
                <el-table-column label="开始面积" prop="startArea" min-width="80" align='center' show-overflow-tooltip></el-table-column>
                <el-table-column label="截止面积" prop="endArea" min-width="80" align='center'></el-table-column>
                <el-table-column label="指标数" prop="ruleValue" align="center" min-width="80">
                  <template slot-scope="scope">
                    <span v-if="scope.row.action==='save'">{{scope.row.ruleValue}}</span>
                    <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" size="mini" v-else v-model="scope.row.ruleValue"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="操作" align="center" min-width="80">
                  <template slot-scope="scope">
                    <el-button type="text" v-if="scope.row.action==='edit'" @click="editTable(scope,'save','leftBadgeTableData')" class="btnUnderline">保存</el-button>
                    <el-button type="text" v-else @click="editTable(scope,'edit','leftBadgeTableData')" class="btnUnderline">编辑</el-button>
                  </template>
                </el-table-column>
              </kindo-table>
            </el-col>
            <el-col :span="6">
              <div class="placeholderDiv"></div>
            </el-col>
          </el-row>
        </el-form>
      </kindo-box>
      <kindo-box class="footerBtn">
        <el-button type="primary" @click="saveBadge">规则保存</el-button>
        <el-button type="primary" @click="publishBadge">发布当届规则</el-button>
      </kindo-box>
    </kindo-box>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pageId: "onlineService/netBadge/netBadgeSet/badgeIndexCal/badgeIndexSet",
      baseTestUrl: 'http://10.28.124.108:9001',
      api: {
        getData: kindo.config.api.osUrl + '/api/settingBadgeIndex/getBadgeIndex',
        saveData: kindo.config.api.osUrl + '/api/settingBadgeIndex/saveBadgeIndex',
        publishData: kindo.config.api.osUrl + '/api/settingBadgeIndex/publishBadgeIndex'
      },
      loading: false,
      badgeSetForm: {
        //参展商证指标
        exhibitorBadge: {
          standardBoothNum: '', //标准展位
          standardBoothBadgeNum: '', //标准展位
          engineeringIndoorArea: '', //工程农机展区(室内)
          engineeringIndoorBadgeNum: '', //工程农机展区(室内)
          engineeringOutdoorArea: '', //工程农机展区(室外)
          engineeringOutdoorBadgeNum: '', //工程农机展区(室外)
          decorationExhibitionArea: '', //铁石装饰品及户外水疗设施展区
          decorationExhibitionBadgeNum: '', //铁石装饰品及户外水疗设施展区
          chemicalExhibitionArea: '', //化工产品展区
          chemicalExhibitionBadgeNum: '' //化工产品展区
        },
        //参展代表证指标
        exhibitorDelegateBadge: {
          centralBranchGroupDay: '', //央企分团
          centralBranchGroupPercentage: '', //央企分团
          otherGroupPercentage: '' //其他团
        },
        //交易团工作证
        tradeGroupWorkBadge: {
          centralGroupBadgeNum: '', //央企总团
          otherGroupBadgeNum: ''//其他团
        },
        //商会工作证
        commerceWorkBadges: [
          {
            id: '1',  //主键id
            orgId: '1',  //商会名称
            orgName: '机电商会',  //商会名称
            ruleValue: '90', //指标数
            action: 'save'
          },
          {
            id: '2',  //主键id
            orgId: '2',  //商会名称
            orgName: '食品土畜商会',  //商会名称
            ruleValue: '40', //指标数
            action: 'save'
          },
          {
            id: '3',  //主键id
            orgId: '3',  //商会名称
            orgName: '纺织商会',  //商会名称
            ruleValue: '70', //指标数
            action: 'save'
          }
        ],
        //交易团筹/撤展证
        tradeGroupBadge: {
          prepareExhibitionBadgePercentage: '',  //交易团筹展证
          cancelExhibitionBadgePercentage: ''  //交易团筹展证
        },
        //施工单位筹/撤展证
        constructionBadge: {
          prepareExhibitionBadgeArea: '', //筹展证
          prepareExhibitionBadgeNum: '', //筹展证
          cancelExhibitionBadgeArea: '', //撤展证
          cancelExhibitionBadgeNum: '', //撤展证
          stayExhibitionBadgeNum: '', //留展负责人证
          freeStayExhibitionBadge: []
        }
      },
      leftBadgeTableData: [
        {
          id: '1',
          startArea: 0,
          endArea: 50,
          ruleValue: '',
          action: 'save'
        },
        {
          id: '2',
          startArea: 51,
          endArea: 100,
          ruleValue: '2',
          action: 'save'
        },
        {
          id: '3',
          startArea: 101,
          endArea: 200,
          ruleValue: '',
          action: 'save'
        },
        {
          id: '4',
          startArea: 201,
          endArea: 300,
          ruleValue: '',
          action: 'save'
        },
        {
          id: '5',
          startArea: 301,
          endArea: 400,
          ruleValue: '',
          action: 'save'
        },
        {
          id: '6',
          startArea: 400,
          endArea: '~',
          ruleValue: '',
          action: 'save'
        }
      ],
      //参展商证
      exhibitorBadgeRules: {
        standardBoothNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        standardBoothBadgeNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        engineeringIndoorArea: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        engineeringIndoorBadgeNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        engineeringOutdoorArea: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        engineeringOutdoorBadgeNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        decorationExhibitionArea: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        decorationExhibitionBadgeNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        chemicalExhibitionArea: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        chemicalExhibitionBadgeNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ]
      },
      //参展代表证（出口展区）
      exhibitorDelegateBadgeRules: {
        centralBranchGroupDay: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        centralBranchGroupPercentage: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        otherGroupPercentage: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ]
      },
      //交易团工作证
      tradeGroupWorkBadgeRules: {
        centralGroupBadgeNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        otherGroupBadgeNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ]
      },
      //交易团筹/撤展证
      tradeGroupBadgeRules: {
        prepareExhibitionBadgePercentage: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        cancelExhibitionBadgePercentage: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ]
      },
      //施工单位筹/撤展证
      constructionBadgeRules: {
        prepareExhibitionBadgeArea: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        prepareExhibitionBadgeNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        cancelExhibitionBadgeArea: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        cancelExhibitionBadgeNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ],
        stayExhibitionBadgeNum: [
          { required: true, message: '请输入指标参数', trigger: 'blur' },
          { pattern: /^[1-9]{1}\d{0,3}$/, message: '指标参数应为0-4位的正整数', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    buildData() {
      let flag = true;
      const formNames = ['exhibitorBadge', 'exhibitorDelegateBadge', 'tradeGroupWorkBadge', 'tradeGroupBadge', 'constructionBadge'];
      for (let i = 0; i < formNames.length; i++) {
        flag = this.validateFormData(formNames[i]);
        // console.log('flag:', flag);
        if (!flag) {
          break;
        }
      }
      if (!flag) {
        this.$message({
          showClose: true,
          message: '数据未填写完整',
          type: 'warning'
        });
        return;
      }
      flag = this.validateTableData('commerceWorkBadges');
      if (!flag) {
        this.$message({
          showClose: true,
          message: '商会工作证指标未填写完整',
          type: 'warning'
        });
        return flag;
      }
      flag = this.validateTableData('leftBadgeTableData');
      if (!flag) {
        this.$message({
          showClose: true,
          message: '留展人证指标数未填写完整',
          type: 'warning'
        });
        return flag;
      }
      const data = this.badgeSetForm;
      const freeStayExhibitionBadge = [];
      this.$refs.leftBadgeTableData.internalData.forEach(i => {
        freeStayExhibitionBadge.push(i.ruleValue);
      });
      data.constructionBadge.freeStayExhibitionBadge = freeStayExhibitionBadge;
      return data;
    },
    /**
     * 校验表格数据完整性
     * @param {string} table 需要校验的表格名
     * @returns {Boolean} 校验结果
     */
    validateTableData(table) {
      const reg = /^[1-9]{1}\d{0,3}$/;
      const internalData = this.$refs[table].internalData;
      return internalData.every(t => t.ruleValue) && internalData.every(i => reg.test(i.ruleValue));
    },
    validateFormData(formName) {
      let reFlag = true;
      this.$refs[formName].validate(valid => {
        // console.log(this.$refs[formName]);
        // console.log('valid:', valid);
        reFlag = valid;
      });
      return reFlag;
    },
    saveBadge() {
      const tableData = this.buildData();
      if (!tableData) {
        return;
      }
      //console.log(this.$refs.leftBadgeTableData.internalData);
      //console.log('badgeSetForm:', this.badgeSetForm);
      //console.log('tableData:', tableData);
      // const url = this.baseTestUrl + '/api/settingBadgeIndex/saveBadgeIndex';
      const url = this.api.saveData;
      //console.log('url:', url);
      this.$http.postJson(url, tableData)
        .then(res => {
          //console.log(res);
          if (res.sign) {
            kindo.util.alert('操作成功', '提示', 'success');
          } else {
            kindo.util.alert('操作失败', '提示', 'error');
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    publishBadge() {
      kindo.util.confirm('确认发布吗?', '提示', "warning", async () => {
        const req = this.buildData();
        if (!req) {
          return;
        }
        // const url = this.baseTestUrl + '/api/settingBadgeIndex/publishBadgeIndex';
        const url = this.api.publishData;
        //console.log(url);
        this.$http.postJson(url, req)
          .then(res => {
            //console.log(res);
            if (res.sign) {
              kindo.util.alert('操作成功', '提示', 'success');
            } else {
              kindo.util.alert('操作失败', '提示', 'error');
            }
          })
          .catch(err => {
            console.error(err);
          });
      });

    },
    editTable(scope, type, table) {
      const row = this.$refs[table].internalData.find(l => l.id === scope.row.id);
      const reg = /^[1-9]{1}\d{0,3}$/;
      if (!reg.test(row.ruleValue)) {
        kindo.util.alert('指标参数应为0-4位的正整数', '提示', 'error');
        return;
      }
      row.action = type;
    },
    addInitAction(data) {
      const reData = data.slice();
      reData.forEach(d => {
        d.action = 'save';
      });
      return reData;
    }
  },
  mounted() {
    // document.getElementsByClassName('el-loading-spinner')[0].style.top = '20%';
    // const url = this.baseTestUrl + '/api/settingBadgeIndex/getBadgeIndex';
    const url = this.api.getData;
    this.$http.get(url)
      .then(res => {
        //console.log(res);
        //构建留展人证表格数据
        this.leftBadgeTableData.forEach((l, index) => {
          l.ruleValue = res.constructionBadge.freeStayExhibitionBadge[index];
        });
        this.$refs.leftBadgeTableData.internalData = this.leftBadgeTableData;
        //构建商会工作证表格数据
        const commerceWorkBadgesAction = this.addInitAction(res.commerceWorkBadges);
        this.$refs.commerceWorkBadges.internalData = commerceWorkBadgesAction;
        //删除返回结果集的商会工作证数据
        delete res.commerceWorkBadges;
        //初始化整个页面的数据
        this.badgeSetForm = Object.assign({}, res, { commerceWorkBadges: commerceWorkBadgesAction });
        this.loading = false;
      })
      .catch(err => {
        console.error(err);
        this.loading = false;
      });
  },
  created() {
    this.loading = true;
  }
};
</script>

<style lang="less" scoped>
.badgeIndexSetBox {
  .placeholderDiv {
    height: 1px;
  }
  .inputLabel {
    text-align: right;
    padding: 5px 2px 0 0;
  }
  .inputWidth {
    width: 280px;
  }
  .inputWidth2 {
    width: 576px;
  }
  .inputTips {
    padding: 5px 2px 0 0;
  }
  .footerBtn {
    text-align: center;
    button {
      width: 150px;
    }
  }
  .btnUnderline {
    text-decoration: underline;
  }
}
</style>
