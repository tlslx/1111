<template>
  <el-page ref="badgeCostRules">
    <template slot="header">
      <!--新增费用规则弹框-->
      <el-dialog :title="costRuleFormId + source.language.costRule" :close-on-click-modal="false" :visible.sync="costRuleDialogVisible" width="52%">
        <kindo-box>
          <el-form :model="costRuleForm" ref="costRuleForm" :rules="costFormRules" label-position="right" label-width="120px">
            <el-form-item :label="source.language.gearName" prop="priceName">
              <el-select v-model="costRuleForm.priceName" :placeholder="source.language.pleaseChoose" class="costinput" :disabled="!isAddCostRule">
                <el-option v-for="item in source.levelNameOptions" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <!--新增-->
            <el-row :gutter="20" v-if="isAddCostRule">
              <el-col :span="9">
                <el-form-item :label="source.language.phaseOne">
                </el-form-item>
              </el-col>
              <el-col :span="15">
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.oneDay" prop="firstPhaseOneDay" class="formitemclass">
                      <el-input v-model="costRuleForm.firstPhaseOneDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.twoDays" prop="firstPhaseTwoDay" class="formitemclass">
                      <el-input v-model="costRuleForm.firstPhaseTwoDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.threeDays" prop="firstPhaseThreeDay" class="formitemclass">
                      <el-input v-model="costRuleForm.firstPhaseThreeDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.fourDays" prop="firstPhaseFourDay" class="formitemclass">
                      <el-input v-model="costRuleForm.firstPhaseFourDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.wholePeriod" prop="firstPhaseAllDay" class="formitemclass">
                      <el-input v-model="costRuleForm.firstPhaseAllDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.earlyBirdDiscountRate" prop="firstPhaseDiscountRate" class="formitemclass">
                      <el-input v-model="costRuleForm.firstPhaseDiscountRate" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-form-item v-if="isAddCostRule">
              <el-row>
                <el-col>
                  <el-form-item :label="source.language.qualificationContent" prop="firstPhaseQualificationContent" label-width="92px" class="formitemclass">
                    <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}" v-model="costRuleForm.firstPhaseQualificationContent" class="textareaclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>

            <el-row :gutter="20" v-if="isAddCostRule">
              <el-col :span="9">
                <el-form-item :label="source.language.phaseTwo">
                </el-form-item>
              </el-col>
              <el-col :span="15">
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.oneDay" prop="secondPhaseOneDay" class="formitemclass">
                      <el-input v-model="costRuleForm.secondPhaseOneDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.twoDays" prop="secondPhaseTwoDay" class="formitemclass">
                      <el-input v-model="costRuleForm.secondPhaseTwoDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.threeDays" prop="secondPhaseThreeDay" class="formitemclass">
                      <el-input v-model="costRuleForm.secondPhaseThreeDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.fourDays" prop="secondPhaseFourDay" class="formitemclass">
                      <el-input v-model="costRuleForm.secondPhaseFourDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.wholePeriod" prop="secondPhaseAllDay" class="formitemclass">
                      <el-input v-model="costRuleForm.secondPhaseAllDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.earlyBirdDiscountRate" prop="secondPhaseDiscountRate" class="formitemclass">
                      <el-input v-model="costRuleForm.secondPhaseDiscountRate" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-form-item v-if="isAddCostRule">
              <el-row>
                <el-col>
                  <el-form-item :label="source.language.qualificationContent" prop="secondPhaseQualificationContent" label-width="92px" class="formitemclass">
                    <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}" v-model="costRuleForm.secondPhaseQualificationContent" class="textareaclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>

            <el-row :gutter="20" v-if="isAddCostRule">
              <el-col :span="9">
                <el-form-item :label="source.language.phaseThree">
                </el-form-item>
              </el-col>
              <el-col :span="15">
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.oneDay" prop="thirdPhaseOneDay" class="formitemclass">
                      <el-input v-model="costRuleForm.thirdPhaseOneDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.twoDays" prop="thirdPhaseTwoDay" class="formitemclass">
                      <el-input v-model="costRuleForm.thirdPhaseTwoDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.threeDays" prop="thirdPhaseThreeDay" class="formitemclass">
                      <el-input v-model="costRuleForm.thirdPhaseThreeDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.fourDays" prop="thirdPhaseFourDay" class="formitemclass">
                      <el-input v-model="costRuleForm.thirdPhaseFourDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.wholePeriod" prop="thirdPhaseAllDay" class="formitemclass">
                      <el-input v-model="costRuleForm.thirdPhaseAllDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.earlyBirdDiscountRate" prop="thirdPhaseDiscountRate" class="formitemclass">
                      <el-input v-model="costRuleForm.thirdPhaseDiscountRate" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-form-item v-if="isAddCostRule">
              <el-row>
                <el-col>
                  <el-form-item :label="source.language.qualificationContent" prop="thirdPhaseQualificationContent" label-width="92px" class="formitemclass">
                    <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}" v-model="costRuleForm.thirdPhaseQualificationContent" class="textareaclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>

            <!--修改-->
            <el-row :gutter="20" v-if="!isAddCostRule">
              <el-col :span="9">
                <el-form-item :label="source.language.amount" prop="period">
                  <el-select v-model="costRuleForm.period" :placeholder="source.language.pleaseChoose" class="inputclass" :disabled="!isAddCostRule">
                    <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="15">
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.oneDay" prop="badgeOneDay" class="formitemclass">
                      <el-input v-model="costRuleForm.badgeOneDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.twoDays" prop="badgeTwoDay" class="formitemclass">
                      <el-input v-model="costRuleForm.badgeTwoDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.threeDays" prop="badgeThreeDay" class="formitemclass">
                      <el-input v-model="costRuleForm.badgeThreeDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.fourDays" prop="badgeFourDay" class="formitemclass">
                      <el-input v-model="costRuleForm.badgeFourDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.wholePeriod" prop="badgeAllDay" class="formitemclass">
                      <el-input v-model="costRuleForm.badgeAllDay" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col>
                    <el-form-item :label="source.language.earlyBirdDiscountRate" prop="discountRate" class="formitemclass">
                      <el-input v-model="costRuleForm.discountRate" class="inputclass"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-form-item v-if="!isAddCostRule">
              <el-row>
                <el-col>
                  <el-form-item :label="source.language.qualificationContent" prop="qualificationContent" label-width="92px" class="formitemclass">
                    <el-input type="textarea" :autosize="{ minRows: 1, maxRows: 3}" v-model="costRuleForm.qualificationContent" class="textareaclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item>
              <el-button @click="onCancel">{{source.language.cancel}}</el-button>
              <el-button v-if="right('submit')" type="primary" @click="onSubmit" :disabled="isSubmitDisabled">{{source.language.confirm}}</el-button>
            </el-form-item>
          </el-form>
        </kindo-box>
      </el-dialog>
      <!--按钮栏-->
      <kindo-box :title="source.language.badgeCostRules">
        <el-form :model="badgeCostForm" inline ref="Form" label-position="right" label-width="105px">
          <el-form-item label-width="1px">
            <el-button v-if="right('add')" icon="el-icon-plus" type="primary" @click="onAdd">{{source.language.newCostRule}}</el-button>
          </el-form-item>
          <el-form-item :label="source.language.gearPosition">
            <el-select v-model="badgeCostForm.priceName" clearable :placeholder="source.language.pleaseChoose" class="inputclass">
              <el-option v-for="item in source.priceNameOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="1px">
            <el-button v-if="right('delete')" type="primary" icon="el-icon-delete" @click="onDel">{{source.language.deleteRule}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <kindo-box>
        <el-row>
          <el-col>
            <div class="table-header">{{source.language.firstPeriodBadgeAmount}}</div>
          </el-col>
        </el-row>
        <kindo-table ref="badgeFirstPeriodTable" :url="api.get" :queryParam="firstForm" :pagination="false">
          <el-table-column prop="priceName" :label="source.language.feeLevel" show-overflow-tooltip min-width="100" :formatter="priceNameFormat"></el-table-column>
          <el-table-column prop="badgeOneDay" :label="source.language.oneDayTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeTwoDay" :label="source.language.twoDaysTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeThreeDay" :label="source.language.threeDaysTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeFourDay" :label="source.language.fourDaysTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeAllDay" :label="source.language.wholePeriodTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="discountRate" :label="source.language.earlyBirdDiscountRateTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="qualificationContent" :label="source.language.qualificationContentTable" show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column :label="source.language.operation" min-width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="right('edit')" type="text" :title="source.language.modify" @click="onEdit(scope.row)">{{source.language.modify}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>

      <kindo-box>
        <el-row>
          <el-col>
            <div class="table-header">{{source.language.secondPeriodBadgeAmount}}</div>
          </el-col>
        </el-row>
        <kindo-table ref="badgeSecondPeriodTable" :url="api.get" :queryParam="secondForm" :pagination="false">
          <el-table-column prop="priceName" :label="source.language.feeLevel" show-overflow-tooltip min-width="100" :formatter="priceNameFormat"></el-table-column>
          <el-table-column prop="badgeOneDay" :label="source.language.oneDayTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeTwoDay" :label="source.language.twoDaysTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeThreeDay" :label="source.language.threeDaysTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeFourDay" :label="source.language.fourDaysTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeAllDay" :label="source.language.wholePeriodTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="discountRate" :label="source.language.earlyBirdDiscountRateTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="qualificationContent" :label="source.language.qualificationContentTable" show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column :label="source.language.operation" min-width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="right('edit')" type="text" :title="source.language.modify" @click="onEdit(scope.row)">{{source.language.modify}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>

      <kindo-box>
        <el-row>
          <el-col>
            <div class="table-header">{{source.language.thirdPeriodBadgeAmount}}</div>
          </el-col>
        </el-row>
        <kindo-table ref="badgeThirdPeriodTable" :url="api.get" :queryParam="thirdForm" :pagination="false">
          <el-table-column prop="priceName" :label="source.language.feeLevel" show-overflow-tooltip min-width="100" :formatter="priceNameFormat"></el-table-column>
          <el-table-column prop="badgeOneDay" :label="source.language.oneDayTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeTwoDay" :label="source.language.twoDaysTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeThreeDay" :label="source.language.threeDaysTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeFourDay" :label="source.language.fourDaysTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="badgeAllDay" :label="source.language.wholePeriodTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="discountRate" :label="source.language.earlyBirdDiscountRateTable" show-overflow-tooltip min-width="100"></el-table-column>
          <el-table-column prop="qualificationContent" :label="source.language.qualificationContentTable" show-overflow-tooltip min-width="200"></el-table-column>
          <el-table-column :label="source.language.operation" min-width="150" align="center" fixed="right">
            <template slot-scope="scope">
              <el-button v-if="right('edit')" type="text" :title="source.language.modify" @click="onEdit(scope.row)">{{source.language.modify}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
      </kindo-box>
    </template>
  </el-page>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "badgeCostRules",
  mixins: [listPageBase],
  data() {
    return {
      // pageId: "badgeCostRules",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiCertificateFeeInformation/getListPage",
        getPriceName: kindo.config.api.importExbUrl + "/api/infoIfiCertificateFeeInformation/getPriceName",
        insert: kindo.config.api.importExbUrl + "/api/infoIfiCertificateFeeInformation/addFeeInformation",
        update: kindo.config.api.importExbUrl + "/api/infoIfiCertificateFeeInformation/modifyFeeInformation",
        delete: kindo.config.api.importExbUrl + "/api/infoIfiCertificateFeeInformation/deleteFeeInformation"
      },
      firstForms: {
        period: "1"
      },
      secondForms: {
        period: "2"
      },
      thirdForms: {
        period: "3"
      },
      badgeCostForm: {},
      source: {
        language: {},
        priceNameOptions: [],
        periodOptions: [],
        levelNameOptions: []
      },
      isAddCostRule: true,
      costRuleDialogVisible: false,
      costRuleForm: {}, //新增费用规则表单
      costRuleFormId: "",
      costFormRules: {},
      isSubmitDisabled: false //提交按钮禁用
    };
  },
  computed: {
    firstForm: function () {
      return {
        queryParams: this.firstForms
      };
    },
    secondForm: function () {
      return {
        queryParams: this.secondForms
      };
    },
    thirdForm: function () {
      return {
        queryParams: this.thirdForms
      };
    }
  },
  async created() {
    var validateearlyBirdDiscountRate = (rule, value, callback) => {
      if (kindo.validate.earlyBirdDiscountRate(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateearlyBirdDiscountRate));
      }
    };
    var validateFixedInteger = (rule, value, callback) => {
      if (kindo.validate.fixedInteger(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateFixedInteger));
      }
    };
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    this.costFormRules = {
      priceName: [
        { required: true, message: this.source.language.selectGear, trigger: "change" }
      ],
      firstPhaseOneDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      firstPhaseTwoDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      firstPhaseThreeDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      firstPhaseFourDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      firstPhaseAllDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      firstPhaseDiscountRate: [
        { required: true, message: this.source.language.enterDiscountRate, trigger: "blur" },
        { validator: validateearlyBirdDiscountRate, trigger: 'blur' }
      ],
      firstPhaseQualificationContent: [
        { required: true, message: this.source.language.enterQualificationContent, trigger: "blur" },
        { max: 500, message: this.source.language.badgeCostLength, trigger: "blur" }
      ],
      secondPhaseOneDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      secondPhaseTwoDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      secondPhaseThreeDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      secondPhaseFourDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      secondPhaseAllDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      secondPhaseDiscountRate: [
        { required: true, message: this.source.language.enterDiscountRate, trigger: "blur" },
        { validator: validateearlyBirdDiscountRate, trigger: 'blur' }
      ],
      secondPhaseQualificationContent: [
        { required: true, message: this.source.language.enterQualificationContent, trigger: "blur" },
        { max: 500, message: this.source.language.badgeCostLength, trigger: "blur" }
      ],
      thirdPhaseOneDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      thirdPhaseTwoDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      thirdPhaseThreeDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      thirdPhaseFourDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      thirdPhaseAllDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      thirdPhaseDiscountRate: [
        { required: true, message: this.source.language.enterDiscountRate, trigger: "blur" },
        { validator: validateearlyBirdDiscountRate, trigger: 'blur' }
      ],
      thirdPhaseQualificationContent: [
        { required: true, message: this.source.language.enterQualificationContent, trigger: "blur" },
        { max: 500, message: this.source.language.badgeCostLength, trigger: "blur" }
      ],
      badgeOneDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      badgeTwoDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      badgeThreeDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      badgeFourDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      badgeAllDay: [
        { required: true, message: this.source.language.enterAmount, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      discountRate: [
        { required: true, message: this.source.language.enterDiscountRate, trigger: "blur" },
        { validator: validateearlyBirdDiscountRate, trigger: 'blur' }
      ],
      qualificationContent: [
        { required: true, message: this.source.language.enterQualificationContent, trigger: "blur" },
        { max: 500, message: this.source.language.badgeCostLength, trigger: "blur" }
      ]
    };

    this.source.periodOptions = [{
      label: this.source.language.phaseOneTable,
      value: "1"
    }, {
      label: this.source.language.phaseTwoTable,
      value: "2"
    }, {
      label: this.source.language.phaseThreeTable,
      value: "3"
    }];
    this.source.levelNameOptions = [{
      label: this.source.language.firstGear,
      value: "1"
    }, {
      label: this.source.language.secondGear,
      value: "2"
    }, {
      label: this.source.language.thirdGear,
      value: "3"
    }, {
      label: this.source.language.fourthGear,
      value: "4"
    }, {
      label: this.source.language.fifthGear,
      value: "5"
    }];

  },
  mounted() {
    this.$nextTick(function () {
      this.onQuery();
      this.$refs.badgeFirstPeriodTable.internalHeight = 320;
      this.$refs.badgeSecondPeriodTable.internalHeight = 320;
      this.$refs.badgeThirdPeriodTable.internalHeight = 320;
    });
  },
  methods: {
    //档位过滤显示
    priceNameFormat(row) {
      let priceLabel = row.priceName;
      for (let i = 0; i < this.source.levelNameOptions.length; i++) {
        if (this.source.levelNameOptions[i].value === row.priceName) {
          priceLabel = this.source.levelNameOptions[i].label;
        }
      }
      return priceLabel;
    },
    onQuery() {
      this.getPriceName();
      this.$refs.badgeFirstPeriodTable.loadData();
      this.$refs.badgeSecondPeriodTable.loadData();
      this.$refs.badgeThirdPeriodTable.loadData();
    },
    getPriceName() {
      let params = {
        json: {
          customQueryParams: {},
          page: {
            current: 1,
            size: 10
          }
        }
      };
      this.source.priceNameOptions = [];
      this.$http.get(this.api.getPriceName, params)
        .then(res => {
          let priceNameData = res.records;
          priceNameData.forEach(item => {
            this.source.levelNameOptions.forEach(priceItem => {
              if (priceItem.value === item.priceName) {
                this.source.priceNameOptions.push({
                  label: priceItem.label,
                  value: priceItem.value
                });
              }
            });
          });
        });
    },
    onAdd() {
      this.costRuleFormId = this.source.language.add;
      this.isAddCostRule = true;
      this.costRuleDialogVisible = true;
      this.isSubmitDisabled = false;
      this.costRuleForm = {
        priceName: "",
        period: "",
        firstPhaseOneDay: 0,
        firstPhaseTwoDay: 0,
        firstPhaseThreeDay: 0,
        firstPhaseFourDay: 0,
        firstPhaseAllDay: 0,
        firstPhaseDiscountRate: "",
        secondPhaseOneDay: 0,
        secondPhaseTwoDay: 0,
        secondPhaseThreeDay: 0,
        secondPhaseFourDay: 0,
        secondPhaseAllDay: 0,
        secondPhaseDiscountRate: "",
        thirdPhaseOneDay: 0,
        thirdPhaseTwoDay: 0,
        thirdPhaseThreeDay: 0,
        thirdPhaseFourDay: 0,
        thirdPhaseAllDay: 0,
        thirdPhaseDiscountRate: ""
      };
      this.$nextTick(function () {
        this.$refs.costRuleForm.clearValidate();
      });
    },
    onDel() {
      let params = {
        priceName: this.badgeCostForm.priceName
      };
      if (!this.badgeCostForm.priceName) {
        this.$message({
          type: 'warning',
          message: this.source.language.deleteGearTipsA
        });
        return;
      }
      this.$confirm(this.source.language.deleteGearTipsB, this.source.language.prompt, {
        confirmButtonText: this.source.language.confirm,
        cancelButtonText: this.source.language.cancel,
        type: 'warning',
        center: true
      }).then(() => {
        this.$http.postJson(this.api.delete, params)
          .then(res => {
            this.onQuery();
            this.$message({
              type: 'success',
              message: this.source.language.deleteSuccess
            });
          });
      });
    },
    onEdit(row) {
      this.costRuleFormId = this.source.language.modify;
      this.isAddCostRule = false;
      this.costRuleDialogVisible = true;
      this.isSubmitDisabled = false;
      this.costRuleForm = {
        id: row.id,
        priceName: row.priceName,
        period: row.period,
        badgeOneDay: row.badgeOneDay,
        badgeTwoDay: row.badgeTwoDay,
        badgeThreeDay: row.badgeThreeDay,
        badgeFourDay: row.badgeFourDay,
        badgeAllDay: row.badgeAllDay,
        discountRate: row.discountRate,
        qualificationContent: row.qualificationContent
      };
      this.$nextTick(function () {
        this.$refs.costRuleForm.clearValidate();
      });
    },
    onSubmit() {
      let feeInformation = [];
      let editCostForm = {};
      if (this.costRuleFormId === "新增" || this.costRuleFormId === "add") {
        feeInformation.push({
          priceName: this.costRuleForm.priceName,
          period: "1",
          badgeOneDay: this.costRuleForm.firstPhaseOneDay,
          badgeTwoDay: this.costRuleForm.firstPhaseTwoDay,
          badgeThreeDay: this.costRuleForm.firstPhaseThreeDay,
          badgeFourDay: this.costRuleForm.firstPhaseFourDay,
          badgeAllDay: this.costRuleForm.firstPhaseAllDay,
          discountRate: this.costRuleForm.firstPhaseDiscountRate,
          qualificationContent: this.costRuleForm.firstPhaseQualificationContent
        });
        feeInformation.push({
          priceName: this.costRuleForm.priceName,
          period: "2",
          badgeOneDay: this.costRuleForm.secondPhaseOneDay,
          badgeTwoDay: this.costRuleForm.secondPhaseTwoDay,
          badgeThreeDay: this.costRuleForm.secondPhaseThreeDay,
          badgeFourDay: this.costRuleForm.secondPhaseFourDay,
          badgeAllDay: this.costRuleForm.secondPhaseAllDay,
          discountRate: this.costRuleForm.secondPhaseDiscountRate,
          qualificationContent: this.costRuleForm.secondPhaseQualificationContent
        });
        feeInformation.push({
          priceName: this.costRuleForm.priceName,
          period: "3",
          badgeOneDay: this.costRuleForm.thirdPhaseOneDay,
          badgeTwoDay: this.costRuleForm.thirdPhaseTwoDay,
          badgeThreeDay: this.costRuleForm.thirdPhaseThreeDay,
          badgeFourDay: this.costRuleForm.thirdPhaseFourDay,
          badgeAllDay: this.costRuleForm.thirdPhaseAllDay,
          discountRate: this.costRuleForm.thirdPhaseDiscountRate,
          qualificationContent: this.costRuleForm.thirdPhaseQualificationContent
        });
      } else {
        editCostForm = {
          id: this.costRuleForm.id,
          priceName: this.costRuleForm.priceName,
          period: this.costRuleForm.period,
          badgeOneDay: this.costRuleForm.badgeOneDay,
          badgeTwoDay: this.costRuleForm.badgeTwoDay,
          badgeThreeDay: this.costRuleForm.badgeThreeDay,
          badgeFourDay: this.costRuleForm.badgeFourDay,
          badgeAllDay: this.costRuleForm.badgeAllDay,
          discountRate: this.costRuleForm.discountRate,
          qualificationContent: this.costRuleForm.qualificationContent
        };
      }
      let params = (this.costRuleFormId === "新增" || this.costRuleFormId === "add") ? feeInformation : editCostForm;
      let uri = (this.costRuleFormId === "新增" || this.costRuleFormId === "add") ? this.api.insert : this.api.update;
      this.$refs.costRuleForm.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(uri, params)
            .then(res => {
              this.isSubmitDisabled = false;
              this.costRuleDialogVisible = false;
              this.onQuery();
            }, err => {
              this.isSubmitDisabled = false;
              this.$message.error(err);
            });
        } else {
          return false;
        }
      });
    },
    onCancel() {
      this.costRuleDialogVisible = false;
    }
  }
};
</script>
<style scoped>
.costinput {
  width: 402px;
}
.table-header {
  margin-bottom: 10px;
}
.formitemclass {
  margin-bottom: 20px;
}
.textareaclass {
  width: 310px;
}
</style>
