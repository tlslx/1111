<template>
  <div>
    <el-dialog class="add-dialog" :visible.sync="childVisible" width=60% :close-on-click-modal="false" :close-on-press-escape="false">
      <template slot="title">
        <span class="el-dialog__title">{{action==='add'? language.add :action==='edit'? language.edit : language.view}}{{language.exhibitionVenueManagement}}</span>
      </template>
      <el-form :rules="rules" :model="child" ref="child" label-position="right" inline label-width="130px">
        <el-form-item :label="language.hall" prop="pavilionCode">
          <el-select v-model="child.pavilionCode" :placeholder="language.selectPlaceholder" :disabled="isDisabled" @change="selectPavilionCode" class="normalclass">
            <el-option v-for="item in source.pavilionCode" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>

        </el-form-item>
        <el-form-item :label="language.exphall" prop="exhibitionHallCode">
          <el-input v-model="child.exhibitionHallCode" :disabled="isSpecial" class="normalclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" maxlength="20"></el-input>
        </el-form-item>

        <el-form-item :label="language.floor" prop="floorNum">
          <el-select v-model="child.floorNum" :placeholder="language.selectPlaceholder" :disabled="isDisabled" @focus="selectFloorNum" @change="selectFloor" class="normalclass">
            <el-option v-for="item in source.floorNum" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="language.exhibitionRegion" prop="pavilienRegion">
          <el-select v-model="child.pavilienRegion" :placeholder="language.selectPlaceholder" class="normalclass">
            <el-option v-for="item in source.pavilienRegion" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="language.exhibitionHallType" prop="exhibitionHallType">
          <el-select v-model="child.exhibitionHallType" :placeholder="language.selectPlaceholder" class="normalclass" @focus='selectExhibitionHallType'>
            <el-option v-for="item in source.exhibitionHallTypeData" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="language.area" prop="area">
          <el-input v-model="child.area" class="normalclass">
             <template slot="append">m^2</template>
          </el-input>
        </el-form-item>

        <el-form-item :label="language.long" prop="length">
          <el-input v-model="child.length" class="normalclass">
            <template slot="append"><span class="inputw">m</span></template>
          </el-input>
        </el-form-item>

        <el-form-item :label="language.height" prop="height">
          <el-input v-model="child.height" class="normalclass">
            <template slot="append"><span class="inputw">m</span></template>
          </el-input>
        </el-form-item>

        <el-form-item :label="language.wide" prop="width">
          <el-input v-model="child.width" class="normalclass">
            <template slot="append"><span class="inputw">m</span></template>
          </el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="childVisible = false">{{language.cancel}}</el-button>
        <el-button type="primary" @click="onSubmit('child')">{{language.confirm}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
export default {
  name: 'childDialog',
  mixins: [listPageBase],
  props: {
    api: {
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
      childVisible: false,
      isDisabled: false,  // 修改时置灰
      isSpecial: false,
      action: '',
      rowData: {},
      child: {
        pavilionCode: '',         // 展馆编码
        exhibitionHallCode: '',   // 展厅编号
        floorNum: '',             // 楼层
        pavilienRegion: '',       // 展馆区域
        exhibitionHallType: '',   // 展厅类型
        area: null,
        length: null,
        height: null,
        width: null
      },
      source: {
        exhibitionHallType: [],
        exhibitionHallTypeData: [],  // 展厅类型
        pavilionCode: [],
        pavilienRegion: [],
        floorNum: []
      },
      rules: {
        pavilionCode: [],         // 请选择展馆名称
        exhibitionHallCode: [],   // 展厅
        floorNum: [],             // 请选择楼层
        pavilienRegion: [],       // 请选择展览区域
        exhibitionHallType: [],   // 请选择展览属性
        area: [],
        length: [],
        height: [],
        width: []
      }
    };
  },
  async created() {
    this._child = Object.assign({}, this.child);
    this.source._floorNum = JSON.parse(JSON.stringify(this.source.floorNum));
    this.source.exhibitionHallType = await kindo.dictionary.get('typeOfExhibitionHall');
    this.source.pavilionCode = await kindo.dictionary.get('numberOfPavilion');
    this.source.pavilienRegion = await kindo.dictionary.get('regionOfExhibition');
    this.rules.exhibitionHallCode = [
      { required: true, message: this.language.inputPlaceholder, trigger: 'change' }
    ];
    this.rules.pavilionCode = this.rules.floorNum = this.rules.pavilienRegion = this.rules.exhibitionHallType = [
      { required: true, message: this.language.selectPlaceholder, trigger: 'change' }
    ];
    this.rules.area = this.rules.length = this.rules.height = this.rules.width = [
      { required: false, message: this.language.inputPlaceholder, trigger: 'blur' },
      { pattern: /^([0-9]+(\.[0-9]{1,3})?)$/, message: this.language.nonNegativeNumberMaxNorm }
    ];
  },
  methods: {
    getChild() {
      if (this.action === 'add') {
        this.isDisabled = false;
        this.isSpecial = true;
        this.$nextTick(function () {
          this.child = Object.assign({}, this._child);
          this.$refs.child.resetFields();
        });
      } else {
        this.child = Object.assign({}, this.rowData);
        
      }
    },
    // 新增 编辑
    onSubmit(formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          let uri = this.action === 'add' ? this.api.add : this.api.update;
          this.$http.postJson(uri, this.child).then(res => {
            this.childVisible = false;
            this.$emit('reload');
            this.$message({
              type: 'success',
              message: this.language.success
            });
          }).catch(error => {
            return false;
            // this.$message({
            //   type: 'warning',
            //   message: error
            // });
          });
        }
      });
    },
    // 根据选择的展馆，获取级联下的楼层 
    async selectPavilionCode(val) {
      this.child.floorNum = '';
      this.source.floorNum = await kindo.dictionary.getItem(this.source.pavilionCode, val);
    },
    // 选择楼层时，先确定展馆是否存在
    selectFloorNum() {
      if (!this.child.pavilionCode) {
        this.source.floorNum = JSON.parse(JSON.stringify(this.source._floorNum));
        this.$message({
          type: 'warning',
          message: this.language.selectFirstHall
        });
        return;
      }
    },
    // 当选择楼层发生改变时，清空 展厅类型
    selectFloor() {
      this.child.exhibitionHallType = '';
    },
    // 选择展厅类型时，先确定楼层是否存在
    selectExhibitionHallType() {
      if (!this.child.floorNum) {
        this.source.exhibitionHallTypeData = [];
        this.$message({
          type: 'warning',
          message: this.language.selectFirstFloor
        });
        return;
      }
    }
  },
  watch: {
    "child.floorNum"(val) {
      if (val) {
        let floorNumber = parseInt(this.child.floorNum.split('.')[1]);
        if (floorNumber > 0) {
          if (this.child.floorNum === '1.1' && this.child.pavilionCode === '1') {
            this.source.exhibitionHallTypeData = [];
            this.source.exhibitionHallType.forEach(item => {
              if (item.value !== '2') {
                this.source.exhibitionHallTypeData.push(item);
              }
            });
          } else {
            this.source.exhibitionHallTypeData = [];
            this.source.exhibitionHallType.forEach(item => {
              if (item.value !== '2' && item.value !== '4') {
                this.source.exhibitionHallTypeData.push(item);
              }
            });
          }
        } else {
          this.source.exhibitionHallTypeData = [];
          this.source.exhibitionHallType.forEach(item => {
            if (item.value === '2') {
              this.source.exhibitionHallTypeData.push(item);
            }
          });
        }
      } else {
        this.child.exhibitionHallType = '';
        this.source.exhibitionHallTypeData = [];
      }
    },
    "child.exhibitionHallType"(val) {
      if (val === '3') {
        this.child.exhibitionHallCode = this.child.floorNum + 'Y';
        this.isDisabled = false;
        this.isSpecial = true;
      } else if (val === '4') {
        this.isDisabled = true;
        this.isSpecial = false;
        this.child.exhibitionHallCode = this.child.exhibitionHallCode;
      } else {
        this.child.exhibitionHallCode = this.child.floorNum;
        this.isDisabled = false;
        this.isSpecial = true;
      }
    },
    childVisible(val, oldVal) {
      if (val === true) {
        this.getChild();
      }
    }
  }
};
</script>

<style lang='scss' scoped>
  .inputw {
    display: inline-block;
    width: 27px!important;
    text-align: center!important;
  }
</style>
