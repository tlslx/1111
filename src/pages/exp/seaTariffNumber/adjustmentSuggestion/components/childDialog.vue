<template>
  <el-container>
    <!--页面对话框-->
    <el-dialog :visible.sync="childVisible" :close-on-press-escape="false" :close-on-click-modal="false" width="70%">
      <template slot="title">
        <span class="el-dialog__title">{{action==='add'? source.language.add : action==='view'? source.language.view: source.language.edit}}</span>
      </template>
      <el-form :model="child" ref="child" label-width="130px" inline label-position="right" :rules="rules" :disabled="action === 'view'">
        <el-form-item :label="source.language.year" prop="year">
          <el-date-picker v-model="child.year" type="year" :placeholder="source.language.selectPlaceholder +  source.language.year" value-format="yyyy" format="yyyy" class="normalclass" :disabled="action==='edit'" :editable="false" :clearable='false'>
          </el-date-picker>
        </el-form-item>

        <el-form-item :label="source.language.commodityCode" prop="code">
          <el-input v-model="child.code" @blur="codeChange" class="normalclass" :disabled="action==='edit'"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.productName" prop="codeDesc">
          <el-input v-model="child.codeDesc" @change="codeDescChange" class="normalclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.catalogClassification" prop="assortType">
          <el-select v-model="child.assortType" :placeholder="source.language.selectPlaceholder" clearable class="normalclass" :disabled="isAssortType">
            <el-option v-for="item in source.assortType" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.category" prop="revisionType">
          <el-select v-model="child.revisionType" clearable class="normalclass" :placeholder="''" disabled>
            <el-option v-for="item in source.revisionType" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.changeDescription" prop="changeDescription">
          <el-input v-model="child.changeDescription" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.originalCode" prop="originCode">
          <el-input v-model="child.originCode" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.originalName" prop="originName">
          <el-input v-model="child.originName" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.extension" prop="proposedExtension">
          <el-select v-model="child.proposedExtension" :placeholder="child.assortType === '0'?'' : source.language.selectPlaceholder" class="normalclass">
            <el-option v-for="item in source.proposedExtension" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.exhibitionArea" prop="areaCode">
          <el-tooltip class="item" effect="light" :content="contentAreaCode" placement="bottom" :disabled="isTooltip">
            <el-select v-model="child.areaCode" :placeholder="(action === 'view' || child.assortType === '0')?'' : source.language.selectPlaceholder" class="selectclass" :disabled="child.assortType === '0'" multiple collapse-tags>
              <el-option v-for="item in source.areaCode" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-tooltip>

        </el-form-item>

        <el-form-item :label="source.language.instructions" prop="revisionDesc">
          <el-input type="textarea" :rows="4" :placeholder="action==='view'? '': source.language.inputPlaceholder" v-model="child.revisionDesc" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" v-if="action !== 'view'">
        <el-button @click="childVisible = false">{{source.language.cancel}}</el-button>
        <el-button type="primary" @click="onSave('child')" :disabled="isCount">{{source.language.confirm}}</el-button>
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
    year: {
      type: String,
      default: () => {
        return null;
      }
    }
  },
  data() {
    return {
      childVisible: false,
      isAssortType: false,
      isTooltip: true,        // 展区多选时，对多选的展区内容展开提示
      contentAreaCode: '',
      action: '',
      child: {
        year: null,
        code: null,
        codeDesc: null,
        assortType: null,
        revisionType: null,
        changeDescription: null,
        originCode: null,
        originName: null,
        proposedExtension: null,
        areaCode: [],
        revisionDesc: null
      },
      recordCodeDesc: '', // 记录根据编码查询的编码名称
      areaCodeData: [],   // 接收编辑时原来的展区，用来判断编辑时，展区是否有变动
      rowData: {},
      rules: {
        year: [],
        code: [],
        codeDesc: [],
        assortType: [],
        revisionType: [],
        changeDescription: [],
        originCode: [],
        originName: [],
        proposedExtension: [],
        areaCode: [],
        revisionDesc: []
      }
    };
  },
  async created() {
    this._child = Object.assign({}, this.child);
    this.rules.year = [
      { required: true, message: this.source.language.inputPlaceholder, trigger: "change" }
    ];
    this.rules.code = [
      { required: true, message: this.source.language.inputPlaceholder, trigger: "change" },
      { pattern: /^\d{1,8}$/, message: this.source.language.notMoreThan8 }
    ];
    this.rules.originCode = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      { pattern: /^\d{1,8}$/, message: this.source.language.notMoreThan8 }
    ];
    this.rules.codeDesc = [
      { required: true, message: this.source.language.inputPlaceholder, trigger: "change" },
      // { pattern: /^\S.*\S$/, message: this.source.language.noSpaces },
      { min: 1, max: 200, message: this.source.language.max200, trigger: "change" }
      // { pattern: /^([\u4e00-\u9fa5,、，。 ;；:！？~,.?!~/\\]){1,200}$/, message: '200个字符以内' }
    ];
    this.rules.originName = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      // { pattern: /^\S.*\S$/, message: this.source.language.noSpaces },
      { min: 1, max: 200, message: this.source.language.max200, trigger: "change" }
    ];
    this.rules.assortType = this.rules.revisionType = this.rules.changeDescription = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      { min: 1, max: 200, message: this.source.language.max200, trigger: "change" }
    ];
    this.rules.proposedExtension = [
      { required: true, message: this.source.language.selectPlaceholder, trigger: "change" }
    ];
    this.rules.areaCode = [
      { required: false, message: this.source.language.selectPlaceholder, trigger: "change" }
    ];
    this.rules.revisionDesc = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      { min: 1, max: 200, message: this.source.language.max200, trigger: "change" }
    ];
  },
  methods: {
    getChild() {
      if (this.action === 'edit' || this.action === 'view') {
        this.$nextTick(function () {
          this.$http.get(this.api.getById, { id: this.rowData.seaTariffNumber.id }).then(res => {
            res.areaCode = [];
            this.child = Object.assign({}, res);
            this.areaCodeData = res.seaTariffNumberAreas;
            if (this.child.code.length < 8) {
              this.isAssortType = true;
              this.child.assortType = '0';
            } else {
              this.isAssortType = false;
            }
            if (res.proposedExtension) {
              this.child.proposedExtension = res.proposedExtension.toString();
            }
            if (res.seaTariffNumberAreas.length) {
              res.seaTariffNumberAreas.forEach(el => {
                this.child.areaCode.unshift(el.areaCode);
              });
            }
          });
        });
      } else {
        this.$nextTick(function () {
          this.child = Object.assign({}, this._child);
          this.$refs.child.resetFields();
          this.child.year = this.year;
        });
      }
    },
    // 新增 编辑
    onSave(formName) {
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
            url = this.api.add;
            this.child.areaCode.forEach(el => {
              params.seaTariffNumberAreas.push({ areaCode: el, areaName: kindo.dictionary.getLabel(this.source.areaCode, el) });
            });
          } else {
            url = this.api.edit;
            if (this.areaCodeData.length) {
              this.areaCodeData.forEach(el => {
                let isRepeat = false;
                this.child.areaCode.forEach(item => {
                  if (el.areaCode === item) {
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
            this.$emit('reload', this.child.year);
            this.$message({
              type: 'success',
              message: this.source.language.successful
            });
            this.childVisible = false;
          }).catch(_ => {
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
      if (v) {
        this.$refs.child.validateField('code', error => {
          if (!error) {
            if (this.child.code.length < 8) {
              this.isAssortType = true;
              this.child.assortType = '0';
            } else {
              this.isAssortType = false;
            }
          }
        });
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
    'childVisible'(value) {
      if (value === true) {
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