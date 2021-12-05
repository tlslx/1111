<template>
  <el-container>
    <!--页面对话框-->
    <el-dialog :visible.sync="childVisible" :close-on-press-escape="false" :close-on-click-modal="false" width="65%">
      <template slot="title">
        <span class="el-dialog__title">{{action==='add'? source.language.add : action==='view'? source.language.view: source.language.edit}}</span>
      </template>
      <el-form :model="child" ref="child" label-width="130px" label-position="right" inline :disabled="action === 'view'" :rules="rules">
        <el-form-item :label="source.language.year" prop="year">
          <el-date-picker v-model="child.year" type="year" :placeholder="source.language.selectPlaceholder +source.language.year" value-format="yyyy" format="yyyy" class="normalclass" disabled>
          </el-date-picker>
        </el-form-item>

        <el-form-item :label="source.language.commodityCode" prop="code">
          <el-input v-model="child.code" @blur="codeChange" class="normalclass" :disabled="action !== 'add'"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.productName" prop="codeDesc">
          <el-input v-model="child.codeDesc" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.catalogClassification" prop="assortType">
          <el-select v-model="child.assortType" :placeholder="child.code.length < 8 ? '': source.language.selectPlaceholder" class="normalclass" :disabled="child.code.length < 8">
            <el-option v-for="item in source.assortType" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.category" prop="revisionType">
          <el-select v-model="child.revisionType" :placeholder="source.language.selectPlaceholder" class="normalclass">
            <el-option v-for="item in source.revisionTypes" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.changeDescription" prop="changeDescription">
          <el-input v-model="child.changeDescription" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.extension" prop="proposedExtension">
          <el-select v-model="child.proposedExtension" :placeholder="action === 'view'? '': source.language.selectPlaceholder" class="normalclass">
            <el-option v-for="item in source.proposedExtension" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.exhibitionArea" prop="areaCode">
          <el-tooltip class="item" effect="light" :content="contentAreaCode" placement="bottom" :disabled="isTooltip">
            <el-select v-model="child.areaCode" :placeholder="action === 'view'? '': child.assortType ==='0'? '' : source.language.selectPlaceholder" class="selectclass" multiple collapse-tags :disabled="child.assortType ==='0'">
              <el-option v-for="item in source.areaCode" :disabled="item.disabled" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>

        <el-form-item :label="source.language.reason" prop="revisionDesc">
          <el-input type="textarea" :rows="4" placeholder="" v-model="child.revisionDesc" style="width: 200px"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer" v-if="action !== 'view'">
        <el-button @click="childVisible = false">{{source.language.cancel}}</el-button>
        <el-button type="primary" @click="onSubmit('child')" :disabled="isCount">{{source.language.confirm}}</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="childVisible = false">{{source.language.return}}</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import seaTariffNumber from '@/components/project/mixins/seaTariffNumber';
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: "childDialog",
  mixins: [seaTariffNumber, listPageBase],
  props: {
    api: {
      type: Object,
      default: () => {
        return {};
      }
    },
    tabIndex: {
      type: String,
      default: () => {
        return '0';
      }
    },
    year: {
      type: String,
      default: () => {
        return '';
      }
    }
  },
  data() {
    return {
      childVisible: false,
      isTooltip: true,        // 展区多选时，对多选的展区内容展开提示
      contentAreaCode: '',
      result: {},
      child: {
        year: null,
        code: '',
        codeDesc: '',
        assortType: '',
        revisionType: '',
        changeDescription: '',
        areaCode: [],
        proposedExtension: '',
        revisionDesc: ''
      },
      areaCodeData: [],   // 接收编辑时原来的展区，用来判断编辑时，展区是否有变动
      action: '',
      rowData: {},
      rules: {
        year: [],
        code: [],
        codeDesc: [],
        assortType: [],
        revisionType: [],
        changeDescription: [],
        proposedExtension: [],
        areaCode: [],
        revisionDesc: []
      },
      source: {
        revisionTypes: []
      }
    };
  },
  async created() {
    this._child = Object.assign({}, this.child);
    // 调整类别
    this.source.revisionTypes = [
      { id: "1", value: "0", label: this.source.language.noChange },        // 无变动
      { id: "2", value: "1", label: this.source.language.editProductName }, // 修改商品名称
      { id: "3", value: "2", label: this.source.language.add }             // 新增
      // { id: "4", value: "3", label: this.source.language.delete }           // 删除
    ];
    this.rules.year = [
      { required: true, message: this.source.language.inputPlaceholder, trigger: "change" }
    ];
    this.rules.code = [
      { required: true, message: this.source.language.inputPlaceholder, trigger: "change" },
      { pattern: /^\d{1,8}$/, message: this.source.language.notMoreThan8 }
    ];
    this.rules.codeDesc = [
      { required: true, message: this.source.language.inputPlaceholder, trigger: "change" },
      { min: 1, max: 200, message: this.source.language.max200, trigger: "change" }
    ];
    this.rules.assortType = this.rules.revisionType = this.rules.changeDescription = [
      { required: true, message: this.source.language.inputPlaceholder, trigger: "change" }
    ];
    this.rules.proposedExtension = this.rules.areaCode = [
      { required: true, message: this.source.language.selectPlaceholder, trigger: "change" }
    ];
    this.rules.areaCode = [
      { required: false, message: this.source.language.selectPlaceholder, trigger: "change" }
    ];
    this.rules.changeDescription = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      { min: 1, max: 200, message: this.source.language.max200, trigger: "change" }
    ];
    this.rules.revisionDesc = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      { min: 1, max: 200, message: this.source.language.max200, trigger: "change" }
    ];
  },
  methods: {
    getChild() {
      this.isTooltip = true;
      this.$nextTick(function () {
        this.child = Object.assign({}, this._child);
        this.$refs.child.resetFields();
      });
      if (this.action === 'add') {
        this.$nextTick(function () {
          this.child.year = this.year;
        });
      } else {
        this.$http.get(this.api.getById, { id: this.rowData.id }).then(res => {
          res.areaCode = [];
          this.child = Object.assign({}, res);
          this.areaCodeData = res.seaTariffNumberAreas;
          if (res.proposedExtension) {
            this.child.proposedExtension = res.proposedExtension.toString();
          }
          if (res.seaTariffNumberAreas.length) {
            res.seaTariffNumberAreas.forEach(el => {
              this.child.areaCode.unshift(el.areaCode);
            });
          }
        });
      }
    },
    // 新增 编辑
    onSubmit(formName) {
      this.count++;
      if (this.count > 1) {
        this.isCount = true;
        return;
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.child.assortType !== '0' && !this.child.areaCode.length) {
            this.$message({
              type: 'warning',
              message: this.source.language.isRequired
            });
            this.count = 0;
            this.isCount = false;
            return;
          }

          let url = '';
          let params = Object.assign({}, this.child);
          params.seaTariffNumberAreas = [];
          params.proposedExtensionStr = kindo.dictionary.getLabel(this.source.proposedExtension, this.child.proposedExtension);
          if (this.action === 'add') {
            url = this.api.addEffective;
            this.child.areaCode.forEach(el => {
              params.seaTariffNumberAreas.push({ areaCode: el, areaName: kindo.dictionary.getLabel(this.source.areaCode, el) });
            });
          } else {
            url = this.api.updateEffective;
            if (this.areaCodeData.length) {
              this.areaCodeData.forEach(el => {
                let isRepeat = false;
                this.child.areaCode.forEach(item => {
                  if (item === el.areaCode) {
                    isRepeat = true;
                  }
                });
                if (isRepeat) {
                  params.seaTariffNumberAreas.unshift({ id: el.id, areaCode: el.areaCode, areaName: el.areaName });
                }
              });
            }

            this.child.areaCode.forEach(el => {
              let isRepeats = false;
              if (this.areaCodeData.length) {
                this.areaCodeData.forEach(item => {
                  if (el === item.areaCode) {
                    isRepeats = true;
                  }
                });
              }
              if (!isRepeats) {
                params.seaTariffNumberAreas.push({ areaCode: el, areaName: kindo.dictionary.getLabel(this.source.areaCode, el) });
              }
            });
          }

          this.$http.postJson(url, params).then(res => {
            this.$emit('reload');
            this.$message({
              type: 'success',
              message: this.source.language.successful
            });
            this.childVisible = false;
          }).catch(() => {
            this.count = 0;
            this.isCount = false;
            return false;
          });
        } else {
          this.count = 0;
          this.isCount = false;
          return false;
        }
      });
    }
  },
  watch: {
    "child.year"(v) {
      this.child.year = kindo.util.formatDate(v, "yyyy");
    },
    "child.code"(v) {
      this.$refs.child.validateField('code', error => {
        if (!error) {
          if (this.child.code.length < 8) {
            this.child.assortType = '0';
          }
        }
      });
    },
    "child.assortType"(v) {
      if (v === '0') {
        this.child.areaCode = [];
      }
    },
    'child.areaCode'(v) {
      if (this.child.areaCode.length > 0) {
        this.isTooltip = false;
        let areaCodeName = [];
        this.child.areaCode.forEach(el => {
          areaCodeName.unshift(kindo.dictionary.getLabel(this.source.areaCode, el));
        });
        this.contentAreaCode = areaCodeName.join('、');
      } else {
        this.isTooltip = true;
        this.contentAreaCode = '';
      }
    },
    childVisible(v) {
      if (v === true) {
        this.count = 0;
        this.isCount = false;
        this.getChild();
      }
    }
  }
};
</script>
<style>
.selectclass {
  width: 200px !important;
}
.selectclass > div > span > :nth-child(1) > .el-select__tags-text {
  display: inline-block !important;
  width: 80px !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: initial;
}
</style>