<template>
  <el-container>
    <!--页面对话框-->
    <el-dialog :visible.sync="childVisible" :close-on-press-escape="false" :close-on-click-modal="false" width="70%">
      <template slot="title">
        <span class="el-dialog__title">{{action==='add'? source.language.add : action==='view'? source.language.view: source.language.review}}</span>
      </template>
      <el-form :model="child" ref="child" label-width="130px" label-position="right" inline :disabled="action === 'view'" :rules="rules">
        <el-form-item :label="source.language.year" prop="year">
          <el-date-picker v-model="child.year" type="year" :placeholder="source.language.selectPlaceholder +source.language.year" value-format="yyyy" format="yyyy" class="normalclass" disabled>
          </el-date-picker>
        </el-form-item>

        <el-form-item :label="source.language.commodityCode" prop="code">
          <el-input v-model="child.code" @blur="codeChange" class="normalclass" disabled></el-input>
        </el-form-item>

        <el-form-item :label="source.language.productName" prop="codeDesc">
          <el-input v-model="child.codeDesc" @change="codeDescChange" class="normalclass" disabled></el-input>
        </el-form-item>

        <!-- <el-form-item :label="source.language.catalogClassification" prop="assortType">
          <el-select v-model="child.assortType" :placeholder="source.language.selectPlaceholder" class="normalclass" clearable disabled>
            <el-option v-for="item in source.assortType" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.category" prop="revisionType">
          <el-select v-model="child.revisionType" :placeholder="source.language.selectPlaceholder" class="normalclass" clearable disabled>
            <el-option v-for="item in source.revisionType" :key="item.id" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item> -->

        <el-form-item :label="source.language.changeDescription" prop="changeDescription">
          <el-input v-model="child.changeDescription" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="normalclass" disabled></el-input>
        </el-form-item>

        <!-- <el-form-item :label="source.language.originalCode">
          <el-input v-model="child.originCode" @blur="(ev)=>ev.target.value = ev.target.value.trim()" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.originalName">
          <el-input v-model="child.origintName" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
        </el-form-item> -->

        <el-form-item :label="source.language.extension" prop="proposedExtension">
          <el-select v-model="child.proposedExtension" :placeholder="action === 'view'? '': source.language.selectPlaceholder" class="normalclass" disabled>
            <el-option v-for="item in source.proposedExtension" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.exhibitionArea" prop="areaCode" v-if="action !== 'view'">
          <el-tooltip class="item" effect="light" :content="contentAreaCode" placement="bottom" :disabled="isTooltip">
            <el-select v-model="child.areaCode" :placeholder="action === 'view'? '': source.language.selectPlaceholder" class="normalclass">
              <el-option v-for="item in source.areaCodes" :disabled="item.disabled" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-tooltip>
        </el-form-item>

        <el-form-item :label="source.language.reason" prop="revisionDesc">
          <el-input type="textarea" :rows="4" placeholder="" v-model="child.revisionDesc" style="width: 200px" disabled></el-input>
        </el-form-item>

        <el-form-item :label="source.language.instructions" prop="remark" v-if="action !== 'view'">
          <el-input type="textarea" :rows="4" :placeholder="action==='view'? '': source.language.inputPlaceholder" v-model="child.remark" style="width: 200px"></el-input>
        </el-form-item>
      </el-form>
      <kindo-table :cell-style="isCenter" ref="areaCodeTable" :pagination="false" v-if="action === 'view'">
        <el-table-column prop="areaCode" :label="source.language.exhibitionArea" header-align="center" min-width="140" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.areaCode,row.areaCode)}">
        </el-table-column>
        <el-table-column prop="remark" :label="source.language.instructions" header-align="center" min-width="140">
        </el-table-column>
      </kindo-table>
      <div slot="footer" class="dialog-footer" v-if="action !=='view'">
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
    }
  },
  data() {
    return {
      childVisible: false,
      isTooltip: true,        // 查看展区时，对展区内容展开提示
      contentAreaCode: '',
      child: {
        year: null,
        code: '',
        codeDesc: '',
        assortType: '',
        revisionType: '',
        changeDescription: '',
        // originCode: '',
        // originName: '',
        areaCode: '',
        proposedExtension: '',
        remark: ''
      },
      action: '',
      rowData: {},
      rules: {
        year: [],
        code: [],
        codeDesc: [],
        assortType: [],
        revisionType: [],
        changeDescription: [],
        // originCode: [],
        // originName: [],
        proposedExtension: [],
        areaCode: [],
        remark: []
      },
      source: {
        // 建议展区
        areaCodes: []
      }
    };
  },
  async created() {
    this._child = Object.assign({}, this.child);
    // this.rules.year = [
    //   { required: true, message: this.source.language.inputPlaceholder, trigger: "change" }
    // ];
    // this.rules.code = [
    //   { required: true, message: this.source.language.inputPlaceholder, trigger: "change" },
    //   { pattern: /^\d{1,8}$/, message: this.source.language.notMoreThan8 }
    // ];
    // this.rules.codeDesc = [
    //   { required: true, message: this.source.language.inputPlaceholder, trigger: "change" },
    //   { pattern: /^\S.*\S$/, message: this.source.language.noSpaces },
    //   { min: 1, max: 200, message: this.source.language.max200, trigger: "change" }
    // ];
    // this.rules.assortType = this.rules.revisionType = this.rules.changeDescription = [
    //   { required: false, message: this.source.language.inputPlaceholder, trigger: "change" }
    // ];
    // this.rules.proposedExtension = this.rules.areaCode = [
    //   { required: false, message: this.source.language.selectPlaceholder, trigger: "change" }
    // ];
    // this.rules.areaCode = [
    //   { required: false, message: this.source.language.selectPlaceholder, trigger: "change" }
    // ];
    this.rules.remark = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      { min: 1, max: 200, message: this.source.language.max200, trigger: "change" }
    ];
  },
  methods: {
    getChild() {
      this.child = Object.assign({}, this._child);
      this.$http.get(this.api.getById, { id: this.rowData.id }).then(res => {
        this.source.areaCodes = [];
        res.araeCode = '';
        this.child = Object.assign({}, res);
        if (this.child.code && this.child.code.length < 8) {
          this.child.assortType = '0';
        }
        if (res.proposedExtension) {
          this.child.proposedExtension = res.proposedExtension.toString();
        }
      }).then(_ => {
        if (this.action === 'view' && this.child.seaTariffNumberAreas.length) {
          this.$refs.areaCodeTable.internalData = this.child.seaTariffNumberAreas;
        }
        // 非商协会用户 从字典读取展区
        if (this.action === 'add' && this.$store.getters.userInfo.org.deptType !== '5') {
          this.source.areaCodes = [];
          this.source.areaCode.forEach(el => {
            let isRepeat = false;
            if (this.child.seaTariffNumberAreas) {
              this.child.seaTariffNumberAreas.forEach(item => {
                if (item.areaCode === el.value) {
                  isRepeat = true;
                }
              });
            }
            if (!isRepeat) {
              this.source.areaCodes.unshift({ id: el.id, value: el.value, label: el.label });
            }
          });
          if (this.child.seaTariffNumberAreas) {
            this.child.seaTariffNumberAreas.forEach((item, index) => {
              this.source.areaCodes.unshift({ id: index + new Date().getTime() + Math.random(), value: item.areaCode, label: item.areaName, disabled: true });
            });
          }
        }
        // 商协会用户 获取可管理的展区
        if (this.action === 'add' && this.$store.getters.userInfo.org.deptType === '5') {
          this.$http.get(this.api.getAuthAreas).then(data => {
            data.forEach((el, index) => {
              let isRepeat = false;
              if (this.child.seaTariffNumberAreas) {
                this.child.seaTariffNumberAreas.forEach(item => {
                  if (item.areaCode === el.exhibitionAreaCode) {
                    isRepeat = true;
                  }
                });
              }
              if (!isRepeat) {
                this.source.areaCodes.unshift({ id: index + new Date().getTime() + Math.random(), value: el.exhibitionAreaCode, label: el.exhibitionAreaName });
              }
            });
            if (this.child.seaTariffNumberAreas) {
              this.child.seaTariffNumberAreas.forEach((item, index) => {
                this.source.areaCodes.unshift({ id: index + (9999 * 5) + Math.random(), value: item.areaCode, label: item.areaName, disabled: true });
              });
            }
          });
        }
      });
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
          if (!this.source.areaCodes.length || !this.child.areaCode) {
            this.$message({
              type: 'warning',
              message: this.source.language.noNewExhibitionArea
            });
            this.count = 0;
            this.isCount = false;
            return;
          }
          if (this.child.areaCode && !this.child.remark) {
            this.$message({
              type: 'warning',
              message: this.source.language.isNewExhibitionArea
            });
            this.count = 0;
            this.isCount = false;
            return;
          }

          let params = Object.assign({}, this.child);
          params.seaTariffNumberAreas = [];
          params.seaTariffNumberAreas.push({ areaCode: this.child.areaCode, areaName: kindo.dictionary.getLabel(this.source.areaCodes, this.child.areaCode), remark: this.child.remark, seaTariffIdEffective: this.rowData.id });
          this.$http.postJson(this.api.add, params).then(res => {
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
    "child.code"(v) {
      this.$refs.child.validateField('code', error => {
        if (!error) {
          if (this.child.code && this.child.code.length < 8) {
            this.child.assortType = '0';
          }
        }
      });
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
<style scoped>
</style>