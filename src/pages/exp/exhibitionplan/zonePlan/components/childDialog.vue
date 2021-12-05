<template>
  <el-container>
    <el-dialog :visible.sync="visible" width="90%" :fullscreen="isFullScreen" :close-on-click-modal="false" :close-on-press-escape="false">
      <template slot="title">
        <span class="el-dialog__title">{{action==='add'? source.language.add :action==='edit'?source.language.edit :action==='clone'? source.language.copy : source.language.view}}{{source.language.zonePlan}}</span>
        <i class="iconfont icon-zuidahua" @click="onChangeSize" />
      </template>
      <kindo-box>
        <el-form ref="child" :model="child" inline :rules="rules" :disabled="action === 'view' || operational === '2' || operational === '3' " label-width="90px">
          <el-form-item :label="source.language.exhibitionNum" prop="exhibitionNum">
            <el-select v-model="child.exhibitionNum" :placeholder="action === 'view' || operational === '2' || operational === '3' || detailDisabled ? '' : source.language.selectPlaceholder" class="inputclass" @change="selectExhibitionNum" :disabled="detailDisabled">
              <el-option v-for="item in source.exhibitionNum" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.exhibitionPeriodCode" prop="exhibitionPeriodNum">
            <el-select v-model="child.exhibitionPeriodNum" :placeholder="action === 'view' || operational === '2' || operational === '3' || detailDisabled ? '' : source.language.selectPlaceholder" class="inputclass" @focus="selectExhibitionPeriodNum(child.exhibitionNum)" :disabled="detailDisabled">
              <el-option v-for="item in source.exhibitionPeriodNums" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.schemeName" prop="schemeName">
            <el-input v-model.trim="child.schemeName" class="inputclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
          <el-form-item :label="source.language.schemeStatus" prop="schemeStatus" v-if="action === 'view'">
            <el-select v-model="child.schemeStatus" class="inputclass" :placeholder="action === 'view' || operational === '2' || operational === '3'? '' : source.language.selectPlaceholder">
              <el-option v-for="item in source.schemeStatus" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </kindo-box>
      <kindo-box>
        <kindo-table :cell-style="isCenter" width=90% :pagination="false" ref="zonePlanDetailTable" :row-style="rowStyle">
          <el-table-column prop="zhName" min-width="160" :label="source.language.zoneName" header-align="center" show-overflow-tooltip></el-table-column>
          <el-table-column prop="exhibitionType" :label="source.language.categoryCode" min-width="120" header-align="center" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionType,row.exhibitionType)}" show-overflow-tooltip></el-table-column>
          <el-table-column prop="exhibitionAreaCode" :label="source.language.exhibitionAreaName" min-width="120" header-align="center" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionAreaCodes,row.exhibitionAreaCode)}" show-overflow-tooltip></el-table-column>
          <el-table-column prop="boothNumScale" :label="source.language.boothNumScale1" min-width="100" header-align="center" show-overflow-tooltip></el-table-column>
          <el-table-column min-width="120" :label="source.language.zoneAreaLayout" header-align="center" show-overflow-tooltip>
            <el-table-column min-width="130" header-align="center" prop="brandBoothNum" :label="source.language.brandBoothNum" show-overflow-tooltip></el-table-column>
            <el-table-column min-width="150" header-align="center" prop="generalBoothNum" :label="source.language.generalBoothNum" show-overflow-tooltip></el-table-column>
          </el-table-column>
          <el-table-column min-width="120" prop="unifiedArrangeBuilder" :label="source.language.arrangeExhibitionOrg" header-align="center" show-overflow-tooltip></el-table-column>
          <el-table-column min-width="120" prop="applicationWay" :label="source.language.applicationWay" header-align="center" :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.applicationWay,row.applicationWay)}" show-overflow-tooltip></el-table-column>
          <el-table-column min-width="120" prop="detailHistoryCodes" :label="source.language.detailHistoryCodes" header-align="center" v-if="operational =='2'||operational =='3'" show-overflow-tooltip :formatter="(row, column, value) => value.split(',').map(item => kindo.dictionary.getLabel(source.detailHistoryCodes, item)).toString()"></el-table-column>
          <el-table-column min-width="100" prop="newTheme" :label="source.language.isNewTheme" header-align="center" show-overflow-tooltip :formatter="(row) => row.newTheme === 'true' ? source.language.yes : source.language.no">
          </el-table-column>
          <el-table-column min-width="100" prop="specialAreaColor" :label="source.language.specialAreaColor" header-align="center" show-overflow-tooltip>
            <template slot-scope="scope">
              <i class="arrcolor" :style="{ background: scope.row.specialAreaColor}"></i>
            </template>
          </el-table-column>
          <el-table-column fixed="right" :label="source.language.operation" min-width="200" header-align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="onTheme('edit',scope.$index, scope.row)" v-show="action !== 'view'">{{source.language.edit}}</el-button>
              <el-button type="text" @click="onTheme('view',scope.$index, scope.row)" v-show="action !== 'clone'">
                {{source.language.view}}</el-button>
              <el-button type="text" @click="deleteTheme(scope.$index, scope.row)" v-show="action !== 'view'">{{source.language.delete}}</el-button>
              <el-button type="text" @click="associationTheme(scope.row)" v-if="isAssociation && (operational =='2' || operational =='3')">{{source.language.viewAssociation}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
        <div slot="control">
          <el-button icon="el-icon-plus" type="primary" @click="addDetailTheme" v-if="action !== 'view'">{{source.language.newProgramDetails}}</el-button>
        </div>
      </kindo-box>
      <div slot="footer" class="dialog-footer" v-if="action !== 'view'">
        <el-button @click="visible=false">{{source.language.cancel}}</el-button> 
        <el-button @click="onSubmit('child')" type="primary">{{source.language.confirm}}</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="visible = false" type="info">{{source.language.return}}</el-button>
      </div>
    </el-dialog>
    <!-- 专区方案明细 -->
    <el-dialog :visible.sync="visibleInfo" width="73%" :close-on-click-modal="false" :close-on-press-escape="false">
      <template slot="title">
        <span class="el-dialog__title">{{detailAction==='add'? source.language.add : detailAction==='edit'? source.language.edit : source.language.view}}{{source.language.zonePlandetails}}</span>
      </template>
      <el-form :model="addmodel" :rules="addRules" ref="addmodel" label-width="170px" :disabled="detailAction =='view'" label-position="right" inline>
        <el-form-item :label="source.language.zoneCode" prop="specialAreaCode">
          <el-input v-model="addmodel.specialAreaCode" :disabled="!isAdd" class="normalclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.zoneChineseName" prop="zhName">
          <el-input v-model="addmodel.zhName" class="normalclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.zoneEnglishName" prop="enName">
          <el-input v-model="addmodel.enName" class="normalclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.categoryCode" prop="exhibitionType">
          <el-select v-model="addmodel.exhibitionType" class="normalclass" :placeholder="detailAction === 'view' || (!isAdd && action !== 'clone') ? '' : source.language.selectPlaceholder" @change="exhibitionTypeChange" :disabled="!isAdd && action !== 'clone'">
            <el-option v-for="item in source.exhibitionTypeData" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.exhibitionAreaName" prop="exhibitionAreaCode">
          <el-select v-model="addmodel.exhibitionAreaCode" class="normalclass" :placeholder="detailAction === 'view' || (!isAdd && action !== 'clone') ? '' : source.language.selectPlaceholder" @focus="selectExhibitionType(addmodel.exhibitionType)" :disabled="!isAdd && action !== 'clone'">
            <el-option v-for="item in source.exhibitionAreaCodeData" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.numArrangeOrg" prop="numArrangeOrg">
          <!-- <el-expview-picker v-model="addmodel.numArrangeOrg"></el-expview-picker> -->
          <el-select v-model="addmodel.numArrangeOrg" class="normalclass" :placeholder="detailAction === 'view' ? '' : source.language.selectPlaceholder" @focus="selectExhibitionAreaCode" multiple  @change="selectAllNumArrangeOrg" collapse-tags>
            <el-option v-for="item in source.numArrangeOrg" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.positionArrangeOrg" prop="positionArrangeOrg">
          <!-- <el-expview-picker v-model="addmodel.positionArrangeOrg" :multiple="true" :colltags="true" :showcheckbox="true" :getchild="true" :disabled="detailAction ==='view'"></el-expview-picker> -->
           <el-select v-model="addmodel.positionArrangeOrg" class="normalclass" :placeholder="detailAction === 'view' ? '' : source.language.selectPlaceholder" @focus="selectExhibitionAreaCode" multiple  @change="selectAllPositionArrangeOrg" collapse-tags>
            <el-option v-for="item in source.positionArrangeOrg" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.boothNumScale1" prop="boothNumScale">
          <!-- <el-input-number v-model.trim.number="addmodel.boothNumScale" :min="0" :max="20000" controls-position="right" class="normalclass" label="" @focus="inputBoothNumScale"></el-input-number> -->
          <el-input v-model="addmodel.boothNumScale" class="normalclass" @blur="(ev)=>ev.target.value = ev.target.value.trim()" @focus="inputBoothNumScale"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.brandBoothNum" prop="brandBoothNum">
           <!-- <el-input-number v-model.trim.number="addmodel.brandBoothNum" :min="0" :max="10000" controls-position="right" class="normalclass" label="" @focus="inputBrandBoothNum"></el-input-number> -->
          <el-input v-model="addmodel.brandBoothNum" class="normalclass" @focus="inputBrandBoothNum" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.generalBoothNum" prop="generalBoothNum">
          <!-- <el-input-number v-model.trim.number="addmodel.generalBoothNum" disabled :min="0" :max="10000" controls-position="right" class="normalclass" label=""></el-input-number> -->
           <el-input v-model="addmodel.generalBoothNum" class="normalclass" @focus="inputGeneralBoothNum" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.isUnifyArrangeSpecialArea" prop="unifyArrangeSpecialArea">
          <div class="normalclass">
            <el-radio v-model="addmodel.unifyArrangeSpecialArea" label="false" @change="seatAreaChange">{{source.language.no}}</el-radio>
            <el-radio v-model="addmodel.unifyArrangeSpecialArea" label="true" @change="seatAreaChange">{{source.language.yes}}</el-radio>
          </div>
        </el-form-item>

         <el-form-item :label="source.language.arrangeExhibitionTypeCode" prop='arrangeType'>
          <el-select v-model="addmodel.arrangeType" :placeholder="detailAction === 'view' ? '' : source.language.selectPlaceholder" multiple class="normalclass">
            <el-option v-for="item in source.arrangeExhibitionType" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

         <el-form-item :label="source.language.arrangeExhibitionOrg" prop='unifiedArrangeBuilder'>
          <el-input v-model="addmodel.unifiedArrangeBuilder" @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.applicationWay" prop="applicationWay">
          <el-select v-model="addmodel.applicationWay" class="normalclass" :placeholder="detailAction === 'view' ? '' : source.language.selectPlaceholder">
            <el-option v-for="item in source.applicationWay" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

         <el-form-item :label="source.language.detailHistoryCodes" v-if="operational === '2' || operational === '3'">
          <el-select v-model="addmodel.detailHistoryCodes" class="normalclass" :placeholder="detailAction === 'view' ? '' : source.language.selectPlaceholder" multiple clearable>
            <el-option v-for="item in source.detailHistoryCodes" :key="item.id" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="source.language.remark">
          <el-input type="textarea" :rows="2" :placeholder="detailAction === 'view' ? '' : source.language.inputPlaceholder" v-model="addmodel.remark" class="normalclass"></el-input>
        </el-form-item>

        <el-form-item :label="source.language.isNewTheme" prop="newTheme">
          <el-radio v-model="addmodel.newTheme" label="true">{{source.language.yes}}</el-radio>
          <el-radio v-model="addmodel.newTheme" label="false">{{source.language.no}}</el-radio>
        </el-form-item>

        <el-form-item :label="source.language.isImportant" prop="important">
          <el-radio v-model="addmodel.important" label="true">{{source.language.yes}}</el-radio>
          <el-radio v-model="addmodel.important" label="false">{{source.language.no}}</el-radio>
        </el-form-item>

        <el-form-item :label="source.language.isAllow" prop="allowSpecialDesign" label-width="190px">
          <el-radio v-model="addmodel.allowSpecialDesign" label="true">{{source.language.yes}}</el-radio>
          <el-radio v-model="addmodel.allowSpecialDesign" label="false">{{source.language.no}}</el-radio>
        </el-form-item>

        <el-form-item :label="source.language.selectedExhibitionAreaColor" prop="specialAreaColor">
          <el-color-picker :predefine="predefineColors" v-model="addmodel.specialAreaColor"></el-color-picker>
         <!-- <div class='areaColor'><colorPicker v-model="addmodel.specialAreaColor" class='classPlace' /></div> -->
        </el-form-item>
          <kindo-box>
            <kindo-table ref="themetable" :pagination="false" :cell-style="isCenter">
              <el-table-column :label="source.language.areaLength + '(mm)'" prop="length" min-width="150" show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.action !== 'edit'" v-text="scope.row.length"></span>
                  <el-input-number v-model.trim.number="scope.row.length" :min="0" controls-position="right" :max="999999" v-else @change="areaChange(scope.row,$event)"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="source.language.areaWidth + '(mm)'" prop="width" min-width="150" show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.action !== 'edit'" v-text="scope.row.width"></span>
                  <el-input-number v-model.trim.number="scope.row.width" :min="0" controls-position="right" :max="999999" v-else @change="areaChange(scope.row,$event)"></el-input-number>
                </template>
              </el-table-column>
              <el-table-column :label="source.language.areaCount + '(mm^2)'" prop="area" min-width="150" show-overflow-tooltip header-align="center">
                <template slot-scope="scope">
                  <span v-text="scope.row.area"></span>
                </template>
              </el-table-column>
              <el-table-column :label="source.language.operation" min-width="160" align="center" fixed='right'>
                <template slot-scope="scope">
                  <div v-if="scope.row.action === 'edit'">
                    <el-button type="text" @click="saveTheme(scope.row, scope.$index)">{{source.language.save}}</el-button>
                    <el-button type="text" @click="delTheme(scope.row)">{{source.language.delete}}</el-button>
                  </div>
                  <div v-else>
                    <el-button type="text" @click="editTheme(scope.row)">{{source.language.edit1}}</el-button>
                    <el-button type="text" @click="delTheme(scope.row)">{{source.language.delete}}</el-button>
                  </div>
                </template>
              </el-table-column>
            </kindo-table>
            <div slot="control">
              <el-button type="primary" @click="addArea">{{source.language.addArea}}</el-button>
            </div>
          </kindo-box>

      </el-form>
      <div slot="footer" class="dialog-footer" v-if="detailAction !== 'view'">
        <el-button @click="visibleInfo = false">{{source.language.cancel}}</el-button>
        <el-button @click="onSaveDetail('addmodel')" type="primary">{{source.language.confirm}}</el-button>
      </div>
      <div slot="footer" class="dialog-footer" v-else>
        <el-button @click="visibleInfo = false" type="info">{{source.language.return}}</el-button>
      </div>
    </el-dialog>

    <!-- 查看关联信息 -->
    <el-dialog :visible.sync="visibleAssociation" :close-on-click-modal="false" width="80%" v-if="operational === '2' || operational === '3'">
      <template slot="title">
        <span class="el-dialog__title">{{source.language.viewAssociatedRecords}}</span>
      </template>
      <kindo-box>
        <kindo-table :cell-style="isCenter" :pagination="false" ref="associationTable" :height="450">
          <el-table-column prop="companyName" :label="source.language.applyForCompanyName" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>
          <el-table-column prop="productType" :label="source.language.applicationAreaCode" header-align="center" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="applyTime" :label="source.language.applyTime" header-align="center" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="checkStatusName" :label="source.language.applicationStatus" header-align="center" min-width="120" show-overflow-tooltip></el-table-column>
          <el-table-column fixed="right" :label="source.language.operation" min-width="60" header-align="center" v-if="isAcction">
            <template slot-scope="scope">
              <el-button type="text" @click="delAssociation(scope.row)" :disabled="scope.row.productType == acctionData.specialAreaCode">{{source.language.delete}}</el-button>
            </template>
          </el-table-column>
        </kindo-table>
        <div slot="control">
            <el-button icon="el-icon-plus" @click="addAssociation" v-if="isAcction" type="primary" size="samll">{{source.language.addAssociation}}</el-button>
          </div>
      </kindo-box>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleAssociation = false" type="primary">{{source.language.return}}</el-button>
      </div>
    </el-dialog>

    <!-- 添加未关联记录 -->
    <el-dialog :visible.sync="visibleAssociationInfo" :close-on-click-modal="false" width="80%" :close-on-press-escape="false" v-if="operational === '2' || operational === '3'">
      <template slot="title">
        <span class="el-dialog__title">{{source.language.unrelatedRecord}}</span>
      </template>
      <kindo-box>
        <kindo-table :cell-style="isCenter" :pagination="false" ref="unAssociationTable" @selection-change="handleSelectionChange" :height="450">
          <el-table-column width="50" type="selection" header-align="center">
          </el-table-column>
          <el-table-column prop="companyName" :label="source.language.applyForCompanyName" header-align="center" min-width="160" show-overflow-tooltip>
          </el-table-column>
          <!-- <el-table-column prop="productType" :label="source.language.applicationAreaName" header-align="center" min-width="160" show-overflow-tooltip :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.detailHistoryCodes,row.productType)}"></el-table-column> -->
          <el-table-column prop="productType" :label="source.language.applicationAreaCode" header-align="center" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="applyTime" :label="source.language.applyTime" header-align="center" min-width="160" show-overflow-tooltip></el-table-column>
          <el-table-column prop="checkStatusName" :label="source.language.applicationStatus" header-align="center" min-width="120" show-overflow-tooltip>
          </el-table-column>
        </kindo-table>
      </kindo-box>
      <div slot="footer" class="dialog-footer">
        <el-button @click="visibleAssociationInfo = false">{{source.language.cancel}}</el-button>
        <el-button @click="saveAssociation">{{source.language.confirm}}</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>
<script>
import listPageBase from '@/components/framework/mixins/listPageBase';
import zonePlan from '@/components/project/mixins/zonePlans';
export default {
  name: "zonePlanPreset",
  mixins: [listPageBase, zonePlan],
  props: {
    operational: {
      type: String,
      default: () => {
        return '';
      }
    }
  },
  data() {
    return {
      visibleAssociation: false,  // 查看关联信息弹框
      visibleAssociationInfo: false,  // 添加未关联记录弹框
      associationList: '',
      source: {
        arrangeExhibitionType: []  // 布展类型
      }
    };
  },
  async created() {
    this._child = Object.assign({}, this.child);
    this._addmodel = Object.assign({}, this.addmodel);
    this.source.applicationWay = await kindo.dictionary.get('waysOfApplication');  // 申请途径
    this.source.arrangeType = await kindo.dictionary.get('exhibitionType');  // 布展类型
  },
  methods: {
    seatAreaChange(v) {
      this.addmodel.arrangeType = [];
      this.source.arrangeExhibitionType.forEach(el => {
        this.addmodel.arrangeType.push(el.value);
      });  
    },
    areaChange(row, vlist) {
      const inChecKeys = this.$refs.themetable.internalData.findIndex(
        temp => temp === row
      );
      if (inChecKeys !== -1) {
        row.area = row.length * row.width;
        this.$refs.themetable.internalData.splice(inChecKeys, 1, row);
      }
    },
    saveTheme(row, rowIndex) {
      const param = Object.assign({}, row);
      if (!param.length) {
        // 请输入长
        kindo.util.alert(this.source.language.inputPlaceholder + this.source.language.areaLength, this.source.language.tips, "warning");
        return;
      }
      if (!param.width) {
        // 请输入宽
        kindo.util.alert(this.source.language.inputPlaceholder + this.source.language.areaWidth, this.source.language.tips, "warning");
        return;
      }
      // 判断保存的每一条数据中长宽是不能同时重复
      let isRepeat = false;
      if (this.$refs.themetable.internalData.length) {
        this.$refs.themetable.internalData.forEach((el, index) => {
          if (param.length === el.length && param.width === el.width && index !== rowIndex) {
            isRepeat = true;
          } 
        });
      }
      if (isRepeat) {
        kindo.util.alert(this.source.language.isAlreadyExist, this.source.language.tips, "warning");
        return;
      }
      const inChecKeys = this.$refs.themetable.internalData.findIndex(
        temp => temp === row
      );
      if (inChecKeys !== -1) {
        row.action = "";
        this.$refs.themetable.internalData.splice(inChecKeys, 1, row);
      }
    },
    editTheme(row) {
      const inChecKeys = this.$refs.themetable.internalData.findIndex(
        temp => temp === row
      );
      if (inChecKeys !== -1) {
        row.action = "edit";
        this.$refs.themetable.internalData.splice(inChecKeys, 1, row);
      }
    },
    delTheme(row) {
      const inChecKeys = this.$refs.themetable.internalData.findIndex(
        temp => temp === row
      );
      if (inChecKeys !== -1) {
        this.$refs.themetable.internalData.splice(inChecKeys, 1);
      }
    },
    addArea() {
      let hasEditInfo = false;
      this.$refs.themetable.internalData.forEach((item, index) => {
        if (item.action) {
          hasEditInfo = true;
          return true;
        }
      });
      if (hasEditInfo) {
        // 请先处理未完成的数据
        kindo.util.alert(this.source.language.handlePreData, this.source.language.tips, "warning");
        return;
      }
      const model = {
        action: "edit",
        length: 0,
        width: 0,
        area: 0
      };
      this.$refs.themetable.internalData.push(model);
    }
    // rowStyle({ row, rowIndex }) {
    //   this.$refs.zonePlanDetailTable.internalStripe = false;
    //   if (row.pkVal === 'noMatch') {
    //     return 'background:#E6A23C';
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
.el-page {
  .iconfont.icon-zuidahua {
    float: right;
    margin-right: 23px;
    margin-top: 3px;
  }
  .textclass {
    width: 400px;
  }
  .arrcolor {
    width: 22px;
    border: 1px solid #ccc;
    height: 22px;
    display: block;
    margin: 0 auto;
    border-radius: 150px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .areaColor {
    width: 15px;
    height: 15px;
    border: 1px solid #ccc;
    margin-top: 12px;
  }
  .classPlace {
    position: absolute;
    top: 13px;
    left: 1px; 
  }
  .kindo-table .el-table .warningRow {
    background: rgba(0, 158, 250, 0.219) !important;
  }
  /deep/ div.el-message-box__content {
    height: 300px !important;
    overflow: scroll !important;
  }
}
</style>