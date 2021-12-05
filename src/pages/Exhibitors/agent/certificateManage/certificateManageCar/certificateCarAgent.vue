<style lang="less" scoped>
@import "../../../../../theme/project/css/flex.less";
</style>

<template>
  <el-tabs value="default">
    <el-tab-pane label="证件类型(车证)" name="default">
      <el-row>
        <div class="bm">
          <el-button type="danger" @click="carSplit = true">小客车证拆分</el-button>
          <el-button type="danger" @click="carMerge = true">小客车证合并</el-button>
        </div>
      </el-row>
      <el-table :data="tableTopData">
        <el-table-column v-for='(item, index) in tableTopHead' :key="index"
          :prop="item.prop" :label="item.label" align="center"></el-table-column>
      </el-table>
      <el-row type="flex" justify="end" class="pagination-contain">
        <el-pagination
          @size-change="handleSizeChangeTop"
          @current-change="handleCurrentChangeTop"
          :current-page='ruleTop.cuurent'
          :page-sizes="[10, 20, 30, 40]"
          :page-size="ruleTop.size"
          layout="prev, pager, next, jumper"
          :total="totalTop">
        </el-pagination>
      </el-row>

      <!-- bottomForm -->
      <el-form :inline="true" :model="ruleForm" style="margin-top: 20px">
        <el-form-item label="届数">
          <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
            <el-option v-for="(item, index) in exhibitionNum" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数">
          <el-select v-model="ruleForm.exhibitionSession" placeholder="请选择">
            <el-option label="1" :value="1"></el-option>
            <el-option label="3" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="证件类型" >
          <el-select  placeholder="请选择" v-model="ruleForm.idType" clearable>
            <el-option  v-for="item in personCardTypeArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select  placeholder="请选择" v-model="ruleForm.ApproveState" clearable>
            <el-option  v-for="item in reApproveArray" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input v-model="ruleForm.companyName"></el-input>
        </el-form-item>

        <el-row>
          <div class="bm bm-pe">
            <el-button type="primary" @click="getTableTop(ruleForm)" size="mini">查询</el-button>
            <el-button type="primary" size="mini" @click="addflag=true">新增</el-button>
          </div>
        </el-row>
      </el-form>
      <el-table :data="tableBottomData">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column v-for='(item, index) in tableBottomHead' :key="index"
          :prop="item.prop" :label="item.label"></el-table-column>
      </el-table>
      <div class="bm bm-pj">
        <el-button type="primary">打印回执单</el-button>
        <el-pagination
          @size-change="handleSizeBtmChange"
          @current-change="handleCurrentBtmChange"
          :current-page="ruleForm.current"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="ruleForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalBtm">
        </el-pagination>
      </div>
      
      <!-- 拆分dialog -->
      <el-dialog
        title="拆分"
        width="50%"
        :visible.sync="carSplit"
        :show-close="false">
        <el-form :model="dialogForm">
          <el-form-item label="一期">
            <el-input v-model="dialogForm.oneperiods"></el-input>
          </el-form-item>
          <el-form-item label="三期">
            <el-input v-model="dialogForm.oneperiods"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="carSplit = false">取 消</el-button>
          <el-button type="primary" @click="carSplit = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 合并dialog -->
      <el-dialog
        title="合并"
        width="50%"
        :visible.sync="carMerge"
        :show-close="false">
        <span>确认是否合并</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="carMerge = false">取 消</el-button>
          <el-button type="primary" @click="carMerge = false">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 新增dialog -->
      <el-dialog
        title="新增证件"
        width="80%"
        :visible.sync="addflag"
        :show-close="false">
        <el-form :model="form" label-width="114px">
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="证件类型">
                <el-select style="width: 90%" placeholder="请选择" v-model="form.badgeTypeCode" clearable @change="changeName">
                  <el-option  v-for="(item, index) in badgeArray" :key="index" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="进馆开始日期:" size="small">
                <el-date-picker
                  v-model="form.effectStartDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="届数">
                <el-select style="width: 90%" v-model="form.exhibitionSessioin" placeholder="请选择">
                  <el-option v-for="(item, index) in exhibitionNum" :key="index"
                    :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="进馆结束日期:" size="small">
                <el-date-picker
                  v-model="form.effectEndDate"
                  type="date"
                  placeholder="选择日期"
                  value-format="timestamp">
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="期数">
                <el-select style="width: 90%" v-model="form.exhibitionPeriod" placeholder="请选择">
                  <el-option label="1" :value="1"></el-option>
                  <el-option label="3" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
            </el-col>
          </el-row>
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="单位:" size="small">
                <el-input style="width: 90%" :value="form.unit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车牌号:" size="small">
                <el-input type="number" v-model="phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="姓名:" size="small">
                <el-input style="width: 90%" :value="form.unit"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="停车地点:" size="small">
                <el-select style="width: 90%" v-model="form.exhibitionSessioin" placeholder="请选择">
                  <el-option v-for="(item, index) in exhibitionNum" :key="index"
                    :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="手机号:" size="small">
                <el-input type="number" v-model="phone"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="通行区域:" size="small">
                <el-input type="number" v-model="phone"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :getter="10">
            <el-col :span="12">
              <el-form-item label="身份证件号码:" size="small">
                <el-input style="width: 90%" :value="form.idNo" disabled></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="车型(座):" size="small">
                <el-select style="width: 90%" v-model="form.exhibitionSessioin" placeholder="请选择">
                  <el-option v-for="(item, index) in exhibitionNum" :key="index"
                    :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="车辆行驶证扫描件:" size="small">
                <el-upload ref="addXS"
                  disabled
                  :action="API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture"
                  :on-success="XSUploadSuccess" :on-error="UploadError" accept=".jpg,.JPG"  :file-list="this.XSlist"
                  :limit='1'>
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="驾驶证扫描件:" size="small">
                <el-upload ref="addJZ"
                  disabled
                  :action="API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture"
                  :on-success="JZUploadSuccess" :on-error="UploadError" accept=".jpg,.JPG"  :file-list="this.JZlist"
                  :limit='1'>
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="证件照:" size="small">
                <el-upload ref="addZJZ"
                  disabled
                  :action="API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture"
                  :on-success="ZJZUploadSuccess" :on-error="UploadError" accept=".jpg,.JPG"  :file-list="this.ZJZlist"
                  :limit='1'>
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="扫描件:" size="small">
                <el-upload ref="addSMJ"
                  disabled
                  :action="API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture"
                  :on-success = "SMJUploadSuccess" :on-error="UploadError" accept=".jpg,.JPG" :file-list="this.SMJlist"
                  :limit='1'>
                  <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>

        </el-form>
      </el-dialog>
        
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters } from "vuex";
import addPapersCar from "../../../company/components/addPaperCar";
export default {
  components: {
    "add-papersCar": addPapersCar
  },
  data() {
    return {
      carMerge: false,
      carSplit: false,
      addflag: false,
      // top的表格
      ruleTop: {
        current: 1,
        size: 10
      },
      totalTop: 0,
      tableTopData: [
        {
          type: "参展类型",
          exhibitionNum: "全期",
          combination: "总额度",
          applyCombination: "已申请额度",
          residueCombination: "3"
        }
      ],
      tableTopHead: [
        {
          prop: "badgeTypeName",
          label: "证件类型"
        },
        {
          prop: "exhibitionPeriod",
          label: "期数"
        },
        {
          prop: "combination",
          label: "总额度"
        },
        {
          prop: "applyCombination",
          label: "已申请额度"
        },
        {
          prop: "residueCombination",
          label: "剩余额度"
        }
      ],
      // bottom的表格
      ruleForm: {
        exhibitionNum: "",
        exhibitionSession: 1,
        idType: "",
        ApproveState: "",
        companyName: "",
        current: 1,
        size: 10
      },
      tableBottomData: [],
      tableBottomHead: [
        {
          prop: "type",
          label: "申请单编号"
        },
        {
          prop: "badgeTypeName",
          label: "证件类型"
        },
        {
          prop: "combination",
          label: "单位"
        },
        {
          prop: "name",
          label: "姓名"
        },
        {
          prop: "residueCombination",
          label: "手机"
        },
        {
          prop: "residueCombination",
          label: "身份证号"
        },
        // {
        //   prop: "applyCombination",
        //   label: "驾驶人姓名"
        // },
        {
          prop: "residueCombination",
          label: "证件照"
        },
        {
          prop: "residueCombination",
          label: "驾驶证扫描件"
        },
        {
          prop: "residueCombination",
          label: "身份证复印件"
        },
        {
          prop: "residueCombination",
          label: "车型(座)"
        },
        {
          prop: "residueCombination",
          label: "车牌号"
        },
        // {
        //   prop: "residueCombination",
        //   label: "撤展证类型"
        // },
        // {
        //   prop: "residueCombination",
        //   label: "馆号"
        // },
        // {
        //   prop: "residueCombination",
        //   label: "车辆类型"
        // },
        // {
        //   prop: "residueCombination",
        //   label: "吨位/座号"
        // },
        // {
        //   prop: "residueCombination",
        //   label: "车牌颜色"
        // },
        {
          prop: "exhibitionSessioin",
          label: "届数"
        },
        {
          prop: "exhibitionPeriod",
          label: "期数"
        },
        {
          prop: "residueCombination",
          label: "进馆开始日期"
        },
        {
          prop: "residueCombination",
          label: "停车地点"
        },
        {
          prop: "residueCombination",
          label: "通行区域"
        },
        {
          prop: "residueCombination",
          label: "车辆行驶证扫描件"
        },
        {
          prop: "residueCombination",
          label: "状态"
        },
        {
          prop: "invalidDesc",
          label: "不通过原因"
        }
      ],
      //新增dialog
      badgeArray: [],
      form: {
        badgeTypeCode: "",
        effectStartDate: "",
        exhibitionSessioin: "",
        effectEndDate: "",
        exhibitionPeriod: "",
        guanhao: "",
        unit: "",
        phone: "",
        name: "",
        idNo: "",
        licaencePlate: "",
        carNum: ""
      },
      XSlist: [],
      JZlist: [],
      ZJZlist: [],
      SMJlist: [],
      //模态框
      dialogForm: {
        oneperiods: "",
        threeperiods: ""
      }
    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"])
  },
  methods: {
    //获取top列表
    getTableTop(param) {
      return "todo";
    },
    handleSizeChangeTop(param) {
      this.ruleTop.size = param;
      this.getTableTop(this.ruleTop);
    },
    handleCurrentChangeTop(param) {
      this.ruleTop.current = param;
      this.getTableTop(this.ruleTop);
    },
    //获取bottom列表
    getBtmTableDataList(param) {
      return "todo";
    },
    handleSizeBtmChange(val) {
      this.ruleForm.size = val;
      this.getBtmTableDataList(this.ruleForm);
    },
    handleCurrentBtmChange(val) {
      this.ruleForm.current = val;
      this.getBtmTableDataList(this.ruleForm);
    }
  },
  async created() {
    if (!this.exhibitionNum) {
      await this.getExhibitionNum().then(res => {
        if (res) {
          let array = [];
          for (let item of res) {
            array.push({
              label: item.exhibitionNum,
              value: item.exhibitionNum,
              current: item.current
            });
          }
          this.$store.commit('commonStore/EXHIBITION_NUM', array);
          for (let item of this.exhibitionNum) {
            if (item.current) {
              this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
              this.ruleForm.exhibitionNum = this.currentExhibition;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.ruleForm.exhibitionNum = this.currentExhibition;
          break;
        }
      }
    } else {
      this.ruleForm.exhibitionNum = this.currentExhibition;
    }
  }
};
</script>
