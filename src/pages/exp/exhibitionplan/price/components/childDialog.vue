<template>
  <el-container>
    <!--页面对话框-->
    <el-dialog :visible.sync="visible" :close-on-press-escape="false" :close-on-click-modal="false" width="90%" :fullscreen="isFullScreen">
      <template slot="title">
        <span class="el-dialog__title">{{action==='add'? language.add :action==='edit'? language.edit :action==='clone'?language.copy : language.view}}{{language.boothPriceSetting}}</span>
        <i class="iconfont icon-zuidahua" @click="onChangeSize" />
      </template>
      <kindo-box>
        <el-form :model="child" :rules="rules" ref="child" inline :disabled="action === 'view'">
          <el-form-item :label="language.exhibitionNum" prop="exhibitionNum">
            <el-select v-model="child.exhibitionNum" :placeholder="action === 'view' ? '' : source.language.selectPlaceholder" class="inputclass" @change="selectExhibitionNum" :disabled="detailDisabled">
              <el-option v-for="item in source.exhibitionNum" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.exhibitionPeriodCode" prop="exhibitionPeriodNum">
            <el-select v-model="child.exhibitionPeriodNum" :placeholder="action === 'view' ? '' : source.language.selectPlaceholder" class="inputclass" @focus="selectExhibitionPeriodNum(child.exhibitionNum)" :disabled="detailDisabled">
              <el-option v-for="item in source.exhibitionPeriodNums" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="language.schemeName" prop="schemeName">
            <el-input v-model="child.schemeName" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box>
        <kindo-table :pagination="false" :cell-style="isCenter" ref="priceTableData" :row-style="rowStyle">
          <el-table-column prop="exhibitionType" :label="language.categoryCode" min-width="120" header-align="center" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionType,row.exhibitionType)}" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="exhibitionRegion" min-width="120" :label="language.exhibitionRegion" header-align="center" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionRegion,row.exhibitionRegion)}" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="exhibitionAreaCode" :label="language.exhibitionAreaName" min-width="120" header-align="center" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionAreaCodes,row.exhibitionAreaCode)}" show-overflow-tooltip>
          </el-table-column>
          <!-- 当届展位费单价 -->
          <el-table-column min-width="120" :label="language.priceBoothFee" header-align="center">
            <el-table-column min-width="100" header-align="center" prop="indoorPrice" :label="language.indoorExhibitionHall" show-overflow-tooltip>
            </el-table-column>
            <el-table-column min-width="100" header-align="center" prop="outdoorPrice" :label="language.outdoorExhibitionHall" show-overflow-tooltip>
            </el-table-column>
            <el-table-column min-width="120" header-align="center" prop="centralChannelPrice" :label="language.centralAreaZoneA" show-overflow-tooltip>
            </el-table-column>
          </el-table-column>

          <!-- 基准展位费单价 -->
          <el-table-column :label="language.benchmarkBoothFee" header-align="center">
            <el-table-column min-width="100" prop="baseIndoorPrice" :label="language.indoorExhibitionHall" show-overflow-tooltip>
            </el-table-column>
            <el-table-column min-width="100" prop="baseOutdoorPrice" :label="language.outdoorExhibitionHall" show-overflow-tooltip>
            </el-table-column>
            <el-table-column min-width="120" prop="baseCentralChannelPrice" :label="language.centralAreaZoneA" show-overflow-tooltip>
            </el-table-column>
          </el-table-column>
          <el-table-column min-width="100" prop="usedBasePrice" :label="language.isBenchmarkboothprice" header-align="center" show-overflow-tooltip :formatter="(row) => row.usedBasePrice === 'true' ? language.yes : language.no">
          </el-table-column>
          <el-table-column min-width="100" prop="needDeposit" :label="language.isNeedDeposit" header-align="center" show-overflow-tooltip :formatter="(row) => row.needDeposit === 'true' ? language.yes : language.no">
          </el-table-column>
          <el-table-column prop="boothType" min-width="160" :label="language.collectDepositType" header-align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <span v-text="getBoothType(scope.row.boothType)"></span>
            </template>
          </el-table-column>
          <el-table-column prop="depositRate" min-width="120" :label="language.depositRate" header-align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="depositPrice" min-width="120" :label="language.depositPrice" header-align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column min-width="160" prop="depositTime" :label="language.depositTime" :formatter="(row) => row.depositTime?kindo.util.formatDate(row.depositTime):''" header-align="center" show-overflow-tooltip>
          </el-table-column>
          <el-table-column min-width="80" prop="returnFines" :label="language.involvesFine" header-align="center" show-overflow-tooltip :formatter="(row) => row.returnFines === 'true' ? language.yes : language.no">
          </el-table-column>
          <el-table-column fixed="right" :label="language.operation" min-width="200" header-align="center">
            <template slot-scope="scope">
              <el-button v-if="action !== 'view'" type="text" @click="onTheme('edit',scope.$index, scope.row)">{{language.edit}}</el-button>
              <el-button type="text" @click="onTheme('view',scope.$index, scope.row)">{{language.view}}</el-button>
              <el-button v-if="action !== 'view'" type="text" @click="delDetailTheme(scope.$index, scope.row)">{{language.delete}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
        <div slot="control">
          <el-button v-if="action !== 'view'" icon="el-icon-plus" type="primary" @click="addDetailTheme">{{language.newPriceDetails}}</el-button>
        </div>
      </kindo-box>
      <div slot="footer" class="dialog-footer" v-if="action !== 'view'">
        <el-button @click="visible = false">{{language.cancel}}</el-button>
        <el-button type="primary" @click="onSubmit('child')">{{language.confirm}}</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="visible = false">{{language.return}}</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="visibleInfo" :close-on-click-modal="false" :close-on-press-escape="false" width="73%">
      <template slot="title">
        <span class="el-dialog__title">{{detailAction==='add'? language.add :detailAction==='edit'? language.edit : language.view}}{{language.boothPriceDetails}}</span>
      </template>
      <el-form :model="addmodel" :rules="addRules" ref="addmodel" :disabled="detailAction ==='view' || action === 'view'" label-width="170px" label-position="right" inline>

        <el-form-item :label="language.categoryCode" prop="exhibitionType">
          <el-select v-model="addmodel.exhibitionType" :placeholder="detailAction === 'view' ? '' : source.language.selectPlaceholder" @change="exhibitionTypeChange" class="normalclass" :disabled="!isAdd && action !== 'clone'">
            <el-option v-for="item in source.exhibitionTypeData" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="language.exhibitionRegion" prop="exhibitionRegion">
          <el-select v-model="addmodel.exhibitionRegion" :placeholder="detailAction === 'view' ? '' : source.language.selectPlaceholder" clearable class="normalclass">
            <el-option v-for="item in source.exhibitionRegion" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="language.exhibitionAreaName" prop="exhibitionAreaCode">
          <el-select v-model="addmodel.exhibitionAreaCode" :placeholder="detailAction === 'view' ? '' : source.language.selectPlaceholder" @focus="selectExhibitionType(addmodel.exhibitionType)" class="normalclass" :disabled="!isAdd && action !== 'clone'">
            <el-option v-for="item in source.exhibitionAreaCodeData" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="language.indoorBoothPrice" prop="indoorPrice">
          <el-input v-model="addmodel.indoorPrice" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="language.outdoorBoothPrice" prop="outdoorPrice">
          <el-input v-model="addmodel.outdoorPrice" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="language.centralChannelBoothPrice" prop="centralChannelPrice">
          <el-input v-model="addmodel.centralChannelPrice" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="language.indoorBoothBenchmarkPrice" prop="baseIndoorPrice">
          <el-input v-model="addmodel.baseIndoorPrice" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="language.outdoorBoothBenchmarkPrice" prop="baseOutdoorPrice">
          <el-input v-model="addmodel.baseOutdoorPrice" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="language.centralChannelBoothBenchmarkPrice" prop="baseCentralChannelPrice">
          <el-input v-model="addmodel.baseCentralChannelPrice" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="language.deposit" prop="needDeposit">
          <el-radio v-model="addmodel.needDeposit" label="true" @change="isNeedDeposit">{{language.yes}}</el-radio>
          <el-radio v-model="addmodel.needDeposit" label="false" @change="isNeedDeposit">{{language.no}}</el-radio>
        </el-form-item>

        <el-form-item :label="language.collectDepositType">
          <el-select v-model="addmodel.boothType" :placeholder="detailAction === 'view' ? '' : disabled ? '' : source.language.selectPlaceholder" :disabled="disabled" multiple clearable class="normalclass">
            <el-option v-for="item in source.boothType" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="language.depositRate" prop="depositRate">
          <el-input v-model="addmodel.depositRate" :disabled="disabled" class="normalclass">
          </el-input>
        </el-form-item>

        <el-form-item :label="language.depositPrice" prop="depositPrice">
          <el-input v-model="addmodel.depositPrice" :disabled="disabled" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="language.depositTime" v-if="!disabled">
          <el-date-picker type="datetime" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" format="yyyy-MM-dd HH:mm:ss" :picker-options="pickerOptions" v-model="addmodel.depositTime" :placeholder="detailAction === 'view' ? '' : source.language.selectPlaceholder" clearable class="normalclass">
          </el-date-picker>
        </el-form-item>
        <el-form-item :label="language.depositTime" v-else>
          <el-input v-model="addmodel.depositTime" :disabled="disabled" :placeholder="detailAction === 'view' ? '' : disabled ? '' : source.language.selectPlaceholder" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="language.isBenchmarkboothprice" prop="usedBasePrice">
          <el-radio v-model="addmodel.usedBasePrice" label="true">{{language.yes}}</el-radio>
          <el-radio v-model="addmodel.usedBasePrice" label="false">{{language.no}}</el-radio>
        </el-form-item>

        <el-form-item :label="language.involvesFine" prop="returnFines">
          <el-radio v-model="addmodel.returnFines" label="true">{{language.yes}}</el-radio>
          <el-radio v-model="addmodel.returnFines" label="false">{{language.no}}</el-radio>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" v-if="detailAction !=='view' ">
        <el-button @click="visibleInfo = false">{{language.cancel}}</el-button>
        <el-button type="primary" @click="onSaveDetail('addmodel')">{{language.confirm}}</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="visibleInfo = false">{{language.return}}</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import exhibitionPeriod from "@/components/project/mixins/exhibitionPeriods";
export default {
  name: "childDialog",
  mixins: [listPageBase, exhibitionPeriod],
  props: {
    apis: {
      type: Object,
      default: () => {
        return {};
      }
    },
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      addmodel: {
        depositTime: '',
        exhibitionAreaCode: '',
        boothType: [],
        returnFines: "true",
        usedBasePrice: "false",
        needDeposit: "true"
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      disabled: false,
      // isDiscountObj: false,
      source: {
        state: [
          // { id: '1', value: '0', label: '未选定' },
          // { id: '2', value: '1', label: '已选定' }
        ],
        exhibitionRegion: [], // 展馆区域
        boothType: []  // 展览类型
      },
      addRules: {
        exhibitionType: [],            // 展览大类
        exhibitionAreaCode: [],        // 展区名称
        exhibitionRegion: [],          // 展馆区域
        depositTime: [],               // 定金支付时限时间
        indoorPrice: [],               // 室内展位当届价格
        outdoorPrice: [],              // 室外展位当届价格
        centralChannelPrice: [],       // 中央通道展位基准价格
        baseIndoorPrice: [],           // 室内展位基准价格
        baseOutdoorPrice: [],          // 户外展位基准价格
        baseCentralChannelPrice: [],   // 中央通道展位基准价格
        depositPrice: [],              // 定金单价
        depositRate: [],               // 定金比列
        isUsedBasePrice: [],           // 是否使用基准展位价格
        isNeedDeposit: [],             // 是否需要支付定金
        isReturnFines: []              // 是否涉及罚款
      }
    };
  },
  async created() {
    this._child = Object.assign({}, this.child);
    this._addmodel = Object.assign({}, this.addmodel);
    this.source.boothType = await kindo.dictionary.get('depositBoothType');    // 收取定金展位类型
    this.source.exhibitionRegion = await kindo.dictionary.get('regionOfExhibition');  // 展览区域
    this.source.state = [
      { id: '1', value: '0', label: this.language.unSelected },
      { id: '2', value: '1', label: this.language.haveSelected }
    ];
    this.addRules.exhibitionType = this.addRules.isUsedBasePrice = this.addRules.isNeedDeposit = this.addRules.isReturnFines = this.addRules.exhibitionAreaCode = this.addRules.exhibitionRegion = [{ required: true, message: this.language.selectPlaceholder, trigger: "change" }];
    this.addRules.depositTime = [{ type: 'datetime', required: false, message: this.language.selectPlaceholder, trigger: 'change' }];
    this.addRules.indoorPrice = this.addRules.outdoorPrice = this.addRules.centralChannelPrice = this.addRules.baseIndoorPrice = this.addRules.baseOutdoorPrice = this.addRules.baseCentralChannelPrice = [{ required: true, message: this.language.inputPlaceholder, trigger: 'blur' },
    { pattern: /^\d{0,10}(\.\d{0,2})?$/, message: this.language.maxInteger10MaxDecimal2 }];
    this.addRules.depositPrice = [{ required: false, message: this.language.inputPlaceholder, trigger: 'blur' },
    { pattern: /^\d{0,10}(\.\d{0,2})?$/, message: this.language.maxInteger10MaxDecimal2 }];
    this.addRules.depositRate = [{ required: false, message: this.language.inputPlaceholder, trigger: 'blur' },
    { pattern: /^(100.00|100|[1-9]?\d(\.\d\d?)?)%$/, message: this.language.percentMaxDecimal2 }];
  },
  methods: {
    getAction() {
      if (this.action === 'add') {
        this.$nextTick(function () {
          this.child = Object.assign({}, this._child);
          this.$refs.child.resetFields();
          this.$refs.priceTableData.internalData = [];
          this.detailTableData = this.$refs.priceTableData.internalData;
        });
      } else {
        let schemeId = { json: { schemeId: this.rowdata.schemeId }};
        this.getExhibitionPeriodNum(this.api.getExhibitionNumAll, this.rowdata.exhibitionNum.toString());
        this.$nextTick(function () {
          this.getList(this.apis.getbyid, schemeId);
        });
      }
    },
    // 获取展位价格弹框表单、列表数据
    getList(url, id) {
      this.child = Object.assign({}, this._child);
      this.$refs.child.resetFields();
      this.$refs.priceTableData.internalData = [];
      this.$http.get(url, id).then(res => {
        this.$refs.priceTableData.internalData = res.expPrice;
        res.expPrice.forEach(el => {
          if (this.action === 'clone') {
            delete el.schemeId;
            delete el.pkVal;
            delete el.detailId;
          }
          if (el.depositRate || el.depositRate === 0) {
            el.depositRate = (Number(el.depositRate * 100).toFixed(2) + "%");
          }
          el.returnFines = el.returnFines.toString();
          el.usedBasePrice = el.usedBasePrice.toString();
          el.needDeposit = el.needDeposit.toString();
        });
        if (this.action === 'clone') {
          delete res.expScheme.schemeId;
          delete res.expScheme.state;
          this.child = Object.assign({}, this._child);
          this.$refs.child.resetFields();
          this.detailTableData = [];
        } else {
          this.child = res.expScheme;
          this.child.exhibitionPeriodNum = res.expScheme.exhibitionPeriodNum.toString();
          this.child.exhibitionNum = res.expScheme.exhibitionNum.toString();
          this.detailTableData = this.$refs.priceTableData.internalData;
        }
      }).catch(error => {
        this.$message({
          type: 'warning',
          message: error
        });
      });
    },
    // 收取定金展位类型 在列表中的回显
    getBoothType(rows) {
      if (rows) {
        let boothTypeName = '';
        rows.split(',').forEach(el => {
          boothTypeName += kindo.dictionary.getLabel(this.source.boothType, el) + "、";
        });
        return boothTypeName.substr(0, boothTypeName.lastIndexOf("、"));
      }
    },
    // 新增明细弹框按钮
    addDetailTheme() {
      this.$refs.child.validate(valid => {
        if (valid) {
          this.isAdd = true;  // 是为增加数据
          this.index = '';
          this.detailAction = 'add';
          this.visibleInfo = true;
          this.disabled = false;
          this.$nextTick(function () {
            this.addmodel = Object.assign({}, this._addmodel);
            this.$refs.addmodel.resetFields();
          });
        }
      });
    },
    // 保存展位价格明细
    onSaveDetail(formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          if (this.addmodel.needDeposit === "true") {
            if (!(this.addmodel.boothType.length && this.addmodel.depositTime && (this.addmodel.depositPrice || this.addmodel.depositRate))) {
              this.$message({
                type: 'warning',
                message: this.language.needDepositIsTrue
              });
              return;
            }
          }
          let _this = this;
          let istrue = false;
          if (_this.$refs.priceTableData.internalData.length !== 0) {
            _this.$refs.priceTableData.internalData.find((el, index) => {
              if (_this.addmodel.exhibitionRegion === el.exhibitionRegion && _this.addmodel.exhibitionAreaCode === el.exhibitionAreaCode && _this.addmodel.exhibitionType === el.exhibitionType && _this.index !== index) {
                _this.$message({
                  type: 'warning',
                  message: this.language.alreadyExist
                });
                istrue = true;
              }
            });
            if (istrue) {
              return;
            }
          }
          _this.visibleInfo = false;
          if (_this.addmodel.boothType.length) {
            _this.addmodel.boothType = _this.addmodel.boothType.join(',');
          } else {
            _this.addmodel.boothType = '';
          }
          let obj = Object.assign({}, _this.addmodel);
          if (_this.isAdd) {
            _this.$refs.priceTableData.internalData.push(obj);
          } else {
            _this.$refs.priceTableData.internalData.splice(_this.index, 1, obj);
          }
          this.detailTableData = this.$refs.priceTableData.internalData;
          if (this.action === 'clone') {
            this.isCloneData();
          }
        }
      });
    },
    // 新增 编辑提交
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.$refs.priceTableData.internalData.length === 0) {
            this.$message({
              type: 'warning',
              message: this.language.dataCannotBeEmpty
            });
            return;
          }
          // 复制数据的展区与所选的届别和展期下的数据明细不匹配
          if (this.notExist.length && this.action === 'clone') {
            // this.isCloneData();
            this.$message({
              type: 'warning',
              message: this.language.noMatch
            });
            return;
          }
          let uri = '';
          if (this.action === "add" || this.action === "clone") {
            uri = this.apis.add;
          } else {
            uri = this.apis.update;
          }
          this.queryParams = {};
          this.$refs.priceTableData.internalData.forEach(el => {
            if (el.depositRate) {
              el.depositRate = (el.depositRate.toString().replace("%", '') / 100);
            }
          });
          let params = { "expScheme": this.child, "expPrice": this.$refs.priceTableData.internalData };
          this.$http.postJson(uri, params).then(res => {
            this.$emit('reload');
            this.visible = false;
            this.$message({
              type: 'success',
              message: this.language.success
            });
          });
        } else {
          return false;
        }
      });
    },
    // 是否需要定金
    isNeedDeposit() {
      if (this.addmodel.needDeposit === "false") {
        this.addmodel.boothType = [];
        this.addmodel.depositRate = '';
        this.addmodel.depositPrice = '';
        this.addmodel.depositTime = '';
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    },
    // 展位价格详情弹框 修改、查看
    onTheme(theme, rowIndex, row) {
      setTimeout(() => {
        this.$refs.child.validate(valid => {
          if (valid) {
            this.addmodel.exhibitionAreaCode = '';
            this.detailAction = theme;
            this.visibleInfo = true;
            if (theme === 'edit') {
              this.isAdd = false;   // 是为编辑数据
              this.index = rowIndex;
            }
            this.$nextTick(function () {
              this.addmodel = Object.assign({}, row);
              this.isNeedDeposit();
              let exhibitionAreaList = [];
              let isExhibitionType = false;
              this.list.forEach(el => {
                if (this.addmodel.exhibitionType === el.exhibitionCategoryCode) {
                  isExhibitionType = true;
                  this.source.exhibitionAreaCodeData = el.children;
                  el.children.forEach(v => {
                    exhibitionAreaList.push(v.value);
                  });
                }
              });
              if (!isExhibitionType) {
                this.addmodel.exhibitionType = '';
              }
              if (!this.includes(exhibitionAreaList, this.addmodel.exhibitionAreaCode.split(','))) {
                this.addmodel.exhibitionAreaCode = '';
              }
              if (this.addmodel.boothType instanceof Array) {
                this.addmodel.boothType = [];
              } else {
                this.addmodel.boothType = this.addmodel.boothType.split(',');
              }
              if (!this.source.exhibitionTypeData.length) {
                this.addmodel.exhibitionType = '';
                this.addmodel.exhibitionAreaCode = '';
              }
              if (this.action === 'clone') {
                if (this.cloneData.length === 0) {
                  this.addmodel.exhibitionAreaCode = '';
                  this.addmodel.exhibitionType = '';
                }
                this.cloneData.forEach(el => {
                  if (this.addmodel.exhibitionAreaCode !== el) {
                    this.addmodel.exhibitionAreaCode = '';
                    this.addmodel.exhibitionType = '';
                  }
                });
              }
            });
          }
        });
      }, 1000);

    },
    // 价格明细删除
    delDetailTheme(rowIndex, row) {
      this.$refs.child.validate(valid => {
        if (valid) {
          this.$confirm(this.language.deleteConfirm, this.language.tips, {
            confirmButtonText: this.language.confirm,
            cancelButtonText: this.language.cancel,
            type: 'warning'
          }).then(() => {
            this.$refs.priceTableData.internalData.splice(rowIndex, 1);
            this.detailTableData = this.$refs.priceTableData.internalData;
          }).then(_ => {
            if (this.action === 'clone') {
              this.isCloneData();
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.language.undelete
            });
          });
        }
      });
    }
  },
  watch: {
    visible(val, oldVal) {
      if (val === true) {
        this.getAction();
      }
    }
  }
};
</script>
<style scoped>
.iconfont.icon-zuidahua {
  float: right;
  margin-right: 23px;
  margin-top: 3px;
}
</style>