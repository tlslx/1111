<style lang="less" scoped>
@import "../../../../theme/project/css/flex.less";
</style>

<template>
  <div id="add-papers">
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
        <el-form-item label="开始时间:" size="small">
          <el-date-picker
            v-model="form.effectStartDate"
            type="date"
            placeholder="选择日期"
            value-format="timestamp">
          </el-date-picker>
          <!-- <el-date-picker value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="form.effectStartDate" type="date" placeholder="选择日期"></el-date-picker> -->
        </el-form-item>
        </el-col>
      </el-row>
      <el-row :getter="10">
        <el-col :span="12">
          <el-form-item label="届数">
            <el-input style="width: 90%" v-model="form.exhibitionSessioin" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="结束时间:" size="small">
            <el-date-picker
              v-model="form.effectEndDate"
              type="date"
              placeholder="选择日期"
              value-format="timestamp">
            </el-date-picker>
            <!-- <el-date-picker value-format="yyyy-MM-dd" format="yyyy-MM-dd" v-model="form.effectEndDate" type="date" placeholder="选择日期"></el-date-picker> -->
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

      <hr style="padding: 0 20px;color:#e6e6fa" />
      <!-- 带出的数据 -->
      <el-row :getter="10">
        <el-col :span="12">
        <el-form-item label="人员:" size="small">
          <el-input style="width: 90%" @focus="showPeopleHandle" :value="showPeople.name"></el-input>
        </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证明类型:" size="small">
            <el-select style="width: 90%" :value="showPeople.idType" disabled>
              <el-option v-for="(item, index) in personCardTypeArr" :key="index"
                :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :getter="10">
        <el-col :span="12">
          <el-form-item label="招展代理:" size="small">
            <el-input style="width: 90%"  :value="showPeople.agentNameCh" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="身份证件号码:" size="small">
            <el-input style="width: 90%" :value="showPeople.idNo" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :getter="10">
        <el-col :span="12">
          <el-form-item label="企业名称:" size="small">
            <el-input style="width: 90%" :value="showPeople.companyNameCh" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效期开始时间:" size="small">
            <el-date-picker :value="showPeople.idCardExpireStartTime" type="date" placeholder="选择日期" disabled></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :getter="10">
        <el-col :span="12">
          <el-form-item label="企业英文名称:" size="small">
            <!-- v-model="form.enterpriceNameEn" -->
            <el-input style="width: 90%" :value="showPeople.companyNameEn" disabled></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="有效期结束时间:" size="small">
            <el-date-picker :value="showPeople.idCardExpireEndTime" type="date" placeholder="选择日期" disabled></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :getter="10">
        <el-col :span="12">
          <el-form-item label="广交会编码:" size="small">
            <el-input style="width: 90%" :value="showPeople.cantonCode" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-form-item label="证件照:" size="small">
          <el-upload ref="addZj"
            disabled
            :action="API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture"
            :on-success="zjUploadSuccess" :on-error="zjUploadError" accept=".jpg,.JPG"  :file-list="this.sfzAddFileList"
            :limit='1'>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">提示：证件照片格式为JPG格式，且小于100kb。
              照片高宽比例为5:4，分辨率为200 * 250较好。</div>
          </el-upload>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item label="扫描件:" size="small">
          <el-upload ref="addSfz"
            disabled
            :action="API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture"
            :on-success = "sfzUploadSuccess" :on-error="sfzUploadError" accept=".jpg,.JPG" :file-list="this.zjAddFileList"
            :limit='1'>
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">提示：身份证照片格式为JPG格式，不超过100kb。</div>
          </el-upload>
        </el-form-item>
      </el-row>
    </el-form>

    <div class="bm bm-pe" style="padding: 10px 0">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button type="danger" @click="affirmForm">保  存</el-button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: [
    "peopleObj"
  ],
  data() {
    return {
      API_POT_URL: process.env.API_POT_URL,
      personCardTypeArr: [],
      badgeArray: [],
      sfzAddFileList: [],
      zjAddFileList: [],
      form: {
        badgeTypeCode: "",
        badgeTypeName: "",
        exhibitionSessioin: "",
        exhibitionPeriod: "",
        effectStartDate: "",
        effectEndDate: "",
        // 带出来的
        uesrId: "",
        idcardNo: "",
        enterpriceName: "",
        enterpriceNameEn: "",
        idcardTypeCode: "",
        bagePhotoUrl: "", //证件照
        idcardFrontUrl: "" //扫描件
      }
    };
  },
  computed: {
    ...mapGetters('certificateManage', ['getPeopleInfoDetails']),
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"]),
    showPeople() {
      let obj = this.peopleObj;
      if (obj.idScan) {
        this.sfzAddFileList = [
        { name: '身份证扫描件', url: obj.idScan ? process.env.API_POT_URL + '/api/ifoFile/getImg?fileId=' + obj.idScan : '' }];  
      } else {
        this.sfzAddFileList = [];
      }
      if (obj.cardPic) {
        this.zjAddFileList = [
        { name: '个人证件照', url: obj.cardPic ? process.env.API_POT_URL + '/api/ifoFile/getImg?fileId=' + obj.cardPic : '' }];  
      } else {
        this.zjAddFileList = [];
      }
      // console.log(this.sfzAddFileList);
      // console.log(this.zjAddFileList);
      
      return obj;
    }
  },
  methods: {
    ...mapActions("commonStore", ["getExhibitionNum"]),
    showPeopleHandle() {
      this.$emit("show-people", true);
    },
    changeName(param) {
      for (let item of this.badgeArray) {
        if (param === item.value) {
          this.form.badgeTypeName = item.label;
          break;
        }
      }
    },
    cancelDialog() {
      this.$emit("cancel-dialog", false);
    },
    affirmForm() {
      //处理数据
      let {
        // agentNameCh,
        cardPic,
        companyNameCh,
        companyNameEn,
        // idCardExpireEndTime,
        // idCardExpireStartTime,
        idNo,
        idScan,
        idType,
        ifoPersonId
      } = this.showPeople;

      this.form.uesrId = ifoPersonId || "";
      this.form.idcardNo = idNo || "";
      this.form.enterpriceName = companyNameCh || "";
      this.form.enterpriceNameEn = companyNameEn || "";
      this.form.bagePhotoUrl = idScan || "";
      this.form.idcardFrontUrl = cardPic || "";
      this.form.idcardTypeCode = idType || "";
      
      this.$emit("affirm-form", this.form);
    },
    sfzUploadSuccess(res, file, fileList) { // 身份证
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('新增图片成功');
        this.addListForm.idScan = res.data;
      }
    },
    sfzUploadError(res) { // 身份证
      this.$message.error(res.message);
    },
    zjUploadSuccess(res, file, fileList) { // 证件照
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('新增图片成功');
        this.addListForm.cardPic = res.data;
      }
    },
    zjUploadError(res) {
      this.$message.error(res.message);
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
              this.form.exhibitionNum = this.currentExhibition;
              break;
            }
          }
        }
      });
    } else if (!this.currentExhibition) {
      for (let item of this.exhibitionNum) {
        if (item.current) {
          this.$store.commit("commonStore/EXHIBITION_CURRENT", item.value);
          this.form.exhibitionNum = this.currentExhibition;
          break;
        }
      }
    } else {
      this.form.exhibitionNum = this.currentExhibition;
    }

    this.personCardTypeArr = await kindo.dictionary.get('ifoPersonCardType');
    this.badgeArray = await kindo.dictionary.get('badgeType');
    // console.log(this.personCardTypeArr);
    
  }
};
</script>
