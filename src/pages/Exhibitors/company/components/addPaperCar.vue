<style lang="less" scoped>

</style>

<template>
  <div>
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
          <el-form-item label="馆号">
            <el-input style="width: 90%" v-model="form.guanhao" clearable></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :getter="10">
        <el-col :span="12">
          <el-form-item label="单位:" size="small">
            <el-input style="width: 90%" :value="form.unit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号:" size="small">
            <el-input type="number" v-model="phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :getter="10">
        <el-col :span="12">
          <el-form-item label="驾驶人姓名:" size="small">
            <el-input style="width: 90%" :value="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证件号码:" size="small">
            <el-input style="width: 90%" :value="form.idNo" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :getter="10">
        <el-col :span="12">
          <el-form-item label="车辆类型:" size="small">
            <el-select style="width: 90%" v-model="form.carsType" placeholder="请选择">
              <el-option v-for="(item, index) in carsType" :key="index"
                :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="吨位/座位:" size="small">
            <el-input style="width: 90%" :value="form.idNo" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :getter="10">
        <el-col :span="12">
          <el-form-item label="车牌颜色:" size="small">
            <el-select style="width: 90%" v-model="form.licaencePlate" placeholder="请选择">
              <el-option v-for="(item, index) in licencePlateColor" :key="index"
                :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="车牌号:" size="small">
            <el-input style="width: 90%" v-model="carNum" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- 上传 -->
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
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      badgeArray: [],
      carsType: [],
      licencePlateColor: [],
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
      SMJlist: []
    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"])
  },
  methods: {
    ...mapActions("commonStore", ["getExhibitionNum"]),
    UploadError() {
      this.$message({
        type: "error",
        $message: "上传失败"
      });
    },
    XSUploadSuccess() {

    },
    JZUploadSuccess() {

    },
    ZJZUploadSuccess() {

    },
    SMJUploadSuccess() {

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
              this.form.exhibitionSessioin = this.currentExhibition;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.form.exhibitionSessioin = this.currentExhibition;
          break;
        }
      }
    } else {
      this.form.exhibitionSessioin = this.currentExhibition;
    }
  }
};
</script>
