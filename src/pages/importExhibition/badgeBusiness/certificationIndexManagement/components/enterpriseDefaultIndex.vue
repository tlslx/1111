<template>
  <kindo-box ref="entDefaultIndex">
    <!--修改默认指标弹窗-->
    <el-dialog :title="language.modifyDefaultIndex" :close-on-click-modal="false" :visible.sync="defaultIndexDialogVisible" width="50%">
      <kindo-box>
        <el-form :model="entDefaultIndexForm" ref="entDefaultIndexForm" :rules="entDefaultIndexFormRules" label-position="right" label-width="120px">
          <el-form-item :label="language.indexName">
            <el-select v-model="entDefaultIndexForm.levelName" :placeholder="language.pleaseChoose" class="badgeinput" :disabled="true">
              <el-option v-for="item in source.gearOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.period">
            <el-select v-model="entDefaultIndexForm.period" :placeholder="language.pleaseChoose" :disabled="true" class="badgeinput">
              <el-option v-for="item in source.periodOptions" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!--进口采购商-->
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item :label="language.buyerType" class="formitemclass">
                <el-input v-model="entDefaultIndexForm.importBuyer" class="inputclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-row>
                <el-col>
                  <el-form-item :label="language.specialInvitationA" prop="importerGuestCustomerOne" class="formitemclass">
                    <el-input v-model="entDefaultIndexForm.importerGuestCustomerOne" class="inputclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item :label="language.importantA" prop="importerGuestCustomerTwo" class="formitemclass">
                    <el-input v-model="entDefaultIndexForm.importerGuestCustomerTwo" class="inputclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item :label="language.ordinaryA" prop="importerGuestCustomerThree" class="formitemclass">
                    <el-input v-model="entDefaultIndexForm.importerGuestCustomerThree" class="inputclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <!--内贸采购商-->
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item class="formitemclass">
                <el-input v-model="entDefaultIndexForm.domesticTradeBuyer" class="inputclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-row>
                <el-col>
                  <el-form-item :label="language.specialInvitationA" prop="internalGuestCustomerOne" class="formitemclass">
                    <el-input v-model="entDefaultIndexForm.internalGuestCustomerOne" class="inputclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item :label="language.importantA" prop="internalGuestCustomerTwo" class="formitemclass">
                    <el-input v-model="entDefaultIndexForm.internalGuestCustomerTwo" class="inputclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item :label="language.ordinaryA" prop="internalGuestCustomerThree" class="formitemclass">
                    <el-input v-model="entDefaultIndexForm.internalGuestCustomerThree" class="inputclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <!--全部-->
          <el-row :gutter="20">
            <el-col :span="10">
              <el-form-item class="formitemclass">
                <el-input v-model="entDefaultIndexForm.all" class="inputclass" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-row>
                <el-col>
                  <el-form-item :label="language.specialInvitationA" prop="allGuestCustomerOne" class="formitemclass">
                    <el-input v-model="entDefaultIndexForm.allGuestCustomerOne" class="inputclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item :label="language.importantA" prop="allGuestCustomerTwo" class="formitemclass">
                    <el-input v-model="entDefaultIndexForm.allGuestCustomerTwo" class="inputclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col>
                  <el-form-item :label="language.ordinaryA" prop="allGuestCustomerThree" class="formitemclass">
                    <el-input v-model="entDefaultIndexForm.allGuestCustomerThree" class="inputclass"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-form-item>
            <el-button @click="onCancel">{{language.cancel}}</el-button>
            <el-button v-if="right('submit')" type="primary" @click="onSubmit" :disabled="isSubmitDisabled">{{language.confirm}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </el-dialog>

    <!--表数据-->
    <el-row>
      <el-col :span="2">
        <div class="table-header">{{language.firstPeriodDefaultIndex}}</div>
      </el-col>
    </el-row>
    <kindo-table ref="firstDefaultIndexTable" :url="api.get" :queryParam="firstForm" :pagination="false">
      <el-table-column prop="levelName" :label="language.feeLevel" min-width="100" :formatter="levelNameFormat"></el-table-column>
      <el-table-column :label="language.importPurchaser" show-overflow-tooltip min-width="250">
        <el-table-column prop="importerGuestCustomerOne" :label="language.specialInvitationB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="importerGuestCustomerTwo" :label="language.importantB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="importerGuestCustomerThree" :label="language.ordinaryB" show-overflow-tooltip min-width="100"></el-table-column>
      </el-table-column>
      <el-table-column :label="language.domesticBuyers" show-overflow-tooltip min-width="250">
        <el-table-column prop="internalGuestCustomerOne" :label="language.specialInvitationB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="internalGuestCustomerTwo" :label="language.importantB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="internalGuestCustomerThree" :label="language.ordinaryB" show-overflow-tooltip min-width="100"></el-table-column>
      </el-table-column>
      <el-table-column :label="language.allType" show-overflow-tooltip min-width="250">
        <el-table-column prop="allGuestCustomerOne" :label="language.specialInvitationB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="allGuestCustomerTwo" :label="language.importantB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="allGuestCustomerThree" :label="language.ordinaryB" show-overflow-tooltip min-width="100"></el-table-column>
      </el-table-column>
      <el-table-column :label="language.operation" min-width="150" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="right('edit')" type="text" @click="onEdit(scope.row)">{{language.modify}}</el-button>
        </template>
      </el-table-column>
    </kindo-table>

    <el-row>
      <el-col :span="2">
        <div class="table-header">{{language.secondPeriodDefaultIndex}}</div>
      </el-col>
    </el-row>
    <kindo-table ref="secondDefaultIndexTable" :url="api.get" :queryParam="secondForm" :pagination="false">
      <el-table-column prop="levelName" :label="language.feeLevel" min-width="100" :formatter="levelNameFormat"></el-table-column>
      <el-table-column :label="language.importPurchaser" show-overflow-tooltip min-width="250">
        <el-table-column prop="importerGuestCustomerOne" :label="language.specialInvitationB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="importerGuestCustomerTwo" :label="language.importantB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="importerGuestCustomerThree" :label="language.ordinaryB" show-overflow-tooltip min-width="100"></el-table-column>
      </el-table-column>
      <el-table-column :label="language.domesticBuyers" show-overflow-tooltip min-width="250">
        <el-table-column prop="internalGuestCustomerOne" :label="language.specialInvitationB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="internalGuestCustomerTwo" :label="language.importantB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="internalGuestCustomerThree" :label="language.ordinaryB" show-overflow-tooltip min-width="100"></el-table-column>
      </el-table-column>
      <el-table-column :label="language.allType" show-overflow-tooltip min-width="250">
        <el-table-column prop="allGuestCustomerOne" :label="language.specialInvitationB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="allGuestCustomerTwo" :label="language.importantB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="allGuestCustomerThree" :label="language.ordinaryB" show-overflow-tooltip min-width="100"></el-table-column>
      </el-table-column>
      <el-table-column :label="language.operation" min-width="150" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="right('edit')" type="text" @click="onEdit(scope.row)">{{language.modify}}</el-button>
        </template>
      </el-table-column>
    </kindo-table>

    <el-row>
      <el-col :span="2">
        <div class="table-header">{{language.thirdPeriodDefaultIndex}}</div>
      </el-col>
    </el-row>
    <kindo-table ref="thirdDefaultIndexTable" :url="api.get" :queryParam="thirdForm" :pagination="false">
      <el-table-column prop="levelName" :label="language.feeLevel" min-width="100" :formatter="levelNameFormat"></el-table-column>
      <el-table-column :label="language.importPurchaser" show-overflow-tooltip min-width="250">
        <el-table-column prop="importerGuestCustomerOne" :label="language.specialInvitationB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="importerGuestCustomerTwo" :label="language.importantB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="importerGuestCustomerThree" :label="language.ordinaryB" show-overflow-tooltip min-width="100"></el-table-column>
      </el-table-column>
      <el-table-column :label="language.domesticBuyers" show-overflow-tooltip min-width="250">
        <el-table-column prop="internalGuestCustomerOne" :label="language.specialInvitationB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="internalGuestCustomerTwo" :label="language.importantB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="internalGuestCustomerThree" :label="language.ordinaryB" show-overflow-tooltip min-width="100"></el-table-column>
      </el-table-column>
      <el-table-column :label="language.allType" show-overflow-tooltip min-width="250">
        <el-table-column prop="allGuestCustomerOne" :label="language.specialInvitationB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="allGuestCustomerTwo" :label="language.importantB" show-overflow-tooltip min-width="100"></el-table-column>
        <el-table-column prop="allGuestCustomerThree" :label="language.ordinaryB" show-overflow-tooltip min-width="100"></el-table-column>
      </el-table-column>
      <el-table-column :label="language.operation" min-width="150" align="center" fixed="right">
        <template slot-scope="scope">
          <el-button v-if="right('edit')" type="text" @click="onEdit(scope.row)">{{language.modify}}</el-button>
        </template>
      </el-table-column>
    </kindo-table>
  </kindo-box>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "entDefaultIndex",
  mixins: [listPageBase],
  props: {
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      pageId: "entDefaultIndex",
      api: {
        get: kindo.config.api.importExbUrl + "/api/infoIfiEnterpriseDefaultQuota/getListPage",
        update: kindo.config.api.importExbUrl + "/api/infoIfiCustomerInvitationType/modifyDefaultQuota"
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
      entDefaultIndexForm: {},
      source: {
        language: {},
        periodOptions: [],
        gearOptions: []
      },
      entDefaultIndexFormRules: {},
      defaultIndexDialogVisible: false,
      isSubmitDisabled: false // 提交按钮禁用
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
    var validateFixedInteger = (rule, value, callback) => {
      if (kindo.validate.fixedInteger(value) || value === "") {
        return callback();
      } else {
        return callback(new Error(this.source.language.validateFixedInteger));
      }
    };
    // 读取国际化
    this.source.language = kindo.util.getLanguage('badgeBusinessLang');
    this.entDefaultIndexFormRules = {
      importerGuestCustomerOne: [
        { required: true, message: this.source.language.enterIndexNumber, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      importerGuestCustomerTwo: [
        { required: true, message: this.source.language.enterIndexNumber, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      importerGuestCustomerThree: [
        { required: true, message: this.source.language.enterIndexNumber, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      internalGuestCustomerOne: [
        { required: true, message: this.source.language.enterIndexNumber, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      internalGuestCustomerTwo: [
        { required: true, message: this.source.language.enterIndexNumber, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      internalGuestCustomerThree: [
        { required: true, message: this.source.language.enterIndexNumber, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      allGuestCustomerOne: [
        { required: true, message: this.source.language.enterIndexNumber, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      allGuestCustomerTwo: [
        { required: true, message: this.source.language.enterIndexNumber, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
      ],
      allGuestCustomerThree: [
        { required: true, message: this.source.language.enterIndexNumber, trigger: "blur" },
        { validator: validateFixedInteger, trigger: 'blur' }
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
    this.source.gearOptions = [{
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
      this.$refs.firstDefaultIndexTable.internalHeight = 300;
      this.$refs.secondDefaultIndexTable.internalHeight = 300;
      this.$refs.thirdDefaultIndexTable.internalHeight = 300;
    });
  },
  methods: {
    //档位过滤显示
    levelNameFormat(row) {
      let priceLabel = row.levelName;
      for (let i = 0; i < this.source.gearOptions.length; i++) {
        if (this.source.gearOptions[i].value === row.levelName) {
          priceLabel = this.source.gearOptions[i].label;
        }
      }
      return priceLabel;
    },
    onQuery() {
      this.$refs.firstDefaultIndexTable.loadData();
      this.$refs.secondDefaultIndexTable.loadData();
      this.$refs.thirdDefaultIndexTable.loadData();
    },
    onEdit(row) {
      this.defaultIndexDialogVisible = true;
      this.isSubmitDisabled = false;
      this.entDefaultIndexForm = {
        id: row.id,
        importBuyer: "进口采购商",
        domesticTradeBuyer: "内贸采购商",
        all: "全部",
        levelName: row.levelName,
        period: row.period,
        buyerTypeCodeImporter: row.buyerTypeCodeImporter,
        importerGuestCustomerOne: row.importerGuestCustomerOne,
        importerGuestCustomerTwo: row.importerGuestCustomerTwo,
        importerGuestCustomerThree: row.importerGuestCustomerThree,
        buyerTypeCodeInternal: row.buyerTypeCodeInternal,
        internalGuestCustomerOne: row.internalGuestCustomerOne,
        internalGuestCustomerTwo: row.internalGuestCustomerTwo,
        internalGuestCustomerThree: row.internalGuestCustomerThree,
        buyerTypeCodeAll: row.buyerTypeCodeAll,
        allGuestCustomerOne: row.allGuestCustomerOne,
        allGuestCustomerTwo: row.allGuestCustomerTwo,
        allGuestCustomerThree: row.allGuestCustomerThree
      };
      this.$nextTick(function () {
        this.$refs.entDefaultIndexForm.clearValidate();
      });
    },
    onSubmit() {
      let indexFormList = [];
      indexFormList.push({
        id: this.entDefaultIndexForm.id,
        period: this.entDefaultIndexForm.period,
        levelName: this.entDefaultIndexForm.levelName,
        buyerTypeCode: this.entDefaultIndexForm.buyerTypeCodeImporter,
        guestCustomer: this.entDefaultIndexForm.importerGuestCustomerOne,
        importantCustomer: this.entDefaultIndexForm.importerGuestCustomerTwo,
        ordinaryCustomer: this.entDefaultIndexForm.importerGuestCustomerThree
      });
      indexFormList.push({
        id: this.entDefaultIndexForm.id,
        period: this.entDefaultIndexForm.period,
        levelName: this.entDefaultIndexForm.levelName,
        buyerTypeCode: this.entDefaultIndexForm.buyerTypeCodeInternal,
        guestCustomer: this.entDefaultIndexForm.internalGuestCustomerOne,
        importantCustomer: this.entDefaultIndexForm.internalGuestCustomerTwo,
        ordinaryCustomer: this.entDefaultIndexForm.internalGuestCustomerThree
      });
      indexFormList.push({
        id: this.entDefaultIndexForm.id,
        period: this.entDefaultIndexForm.period,
        levelName: this.entDefaultIndexForm.levelName,
        buyerTypeCode: this.entDefaultIndexForm.buyerTypeCodeAll,
        guestCustomer: this.entDefaultIndexForm.allGuestCustomerOne,
        importantCustomer: this.entDefaultIndexForm.allGuestCustomerTwo,
        ordinaryCustomer: this.entDefaultIndexForm.allGuestCustomerThree
      });

      this.$refs.entDefaultIndexForm.validate(valid => {
        if (valid) {
          this.isSubmitDisabled = true;
          this.$http.postJson(this.api.update, indexFormList).then(res => {
            this.isSubmitDisabled = false;
            this.defaultIndexDialogVisible = false;
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
      this.defaultIndexDialogVisible = false;
    }
  }
};
</script>
<style scoped>
.badgeinput {
  width: 418px;
}
.table-header {
  margin-bottom: 10px;
  margin-top: 10px;
}
.formitemclass {
  margin-bottom: 20px;
}
</style>
