<style scoped>
.wids{
  width:200px;
}
.widsad {
  width: 230px;
}
.f {
  display: flex;
  justify-content: space-between
}
.a {
  position:absolute;
  top: 0px;
  right: 0px;
  /* float: right; */
  z-index: 999;
}
</style>
<template>
  <div >
    <div class="a">
      <el-button  type="primary" @click="abolish">返回</el-button>
    </div>
    <el-tabs v-model="activeName" class="businessReview">
      <el-tab-pane label="填写基本信息" name="first">

        <div style="display:flex;width:100%;height:100%;flex-direction: column;justify-content: center">
          <div style="display:flex">
            <div style="flex:1">
              <el-form :label-position="labelPosition" label-width="120px" :model="formLabel">
                <el-form-item label="代理用户名：">
                  <el-input class="wids" v-model="formLabel.agentAccount"></el-input>
                </el-form-item>
                <el-form-item label="代理中文名称：">
                  <el-input class="wids" v-model="formLabel.agentCh"></el-input>
                </el-form-item>
                <el-form-item label="代理英文名称：">
                  <el-input class="wids" v-model="formLabel.agentEn"></el-input>
                </el-form-item>
                <el-form-item label="国家/地区：">
                  <el-select class="wids" v-model="formLabel.countryRegionId" placeholder="请选择">
                    <el-option v-for="(item, index) in country" :key="index" :label="item.label" :value="item.value"></el-option>
                    <!-- <el-option label="区域二" value="beijing"></el-option> -->
                  </el-select>
                </el-form-item>
                <el-form-item label="城市：">
                  <el-input class="wids" v-model="formLabel.city"></el-input>
                  <!-- <el-select class="wids" v-model="formLabel.city" placeholder="请选择">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                  </el-select> -->
                </el-form-item>
                <el-form-item label="地址：">
                  <el-input class="wids" v-model="formLabel.address"></el-input>
                </el-form-item>
                <el-form-item label="邮政编码：">
                  <el-input class="wids" v-model="formLabel.postalCode"></el-input>
                </el-form-item>
                <el-form-item label="网址：">
                  <el-input class="wids" v-model="formLabel.url"></el-input>
                </el-form-item>
                <el-form-item label="招展区域：">
                  <el-select class="wids" v-model="formLabel.agentArea" placeholder="请选择">
                    <el-option v-for="(item, index) in ExhibiArea" :key="index" :label="item.label" :value="item.value"></el-option>
                    <!-- <el-option label="区域二" value="beijing"></el-option> -->
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <div style="flex:1">
              <el-form :label-position="labelPosition" label-width="130px" :model="formLabelAlign">
                <el-form-item label="机构性质：">
                  <el-select class="wids" v-model="formLabelAlign.orgType" placeholder="请选择">
                    <el-option v-for="(item, index) in orgTypeList" :key="index" :label="item.label" :value="item.value"></el-option>
                    <!-- <el-option label="区域二" value="beijing"></el-option> -->
                  </el-select>
                </el-form-item>
                <el-form-item label="代理名称简称">
                  <el-input class="wids" v-model="formLabelAlign.agentShort"></el-input>
                </el-form-item>
                <el-form-item label="营业执照号：">
                  <el-input class="wids" v-model="formLabelAlign.licenseNo"></el-input>
                </el-form-item>
                <el-form-item label="税号：">
                  <el-input class="wids" v-model="formLabelAlign.taxNo"></el-input>
                </el-form-item>
                <el-form-item label="代理简介：">
                  <el-input class="wids" v-model="formLabelAlign.agentIntroduce"></el-input>
                </el-form-item>
                <el-form-item label="是否启用：">
                <el-select class="wids" v-model="formLabelAlign.isEnabled"  placeholder="请选择">
                    <el-option label="是" value="1"></el-option>
                    <el-option label="否" value="0"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="启用起止届数：">
                  <el-input style="width:100px;"  v-model="formLabelAlign.startTime">
                  </el-input>
                  <span>至</span>
                  <el-input style="width:100px;" v-model="formLabelAlign.endTime">
                  </el-input>
                </el-form-item>
                <el-form-item label="对应区域管理员：">
                  <el-input class="wids" v-model="formLabelAlign.areaManager"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div style="display:flex;justify-content: center">
            <el-button type="primary" @click="preserve">保存</el-button>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="填写其它信息" name="second">
        <fillRnformat-list></fillRnformat-list>
      </el-tab-pane>
      <el-tab-pane label="填写联系人" name="third">
        <fillPerson-list ></fillPerson-list>
      </el-tab-pane>
      <!-- <el-tab-pane label="取消" style="color:primary" @click="abolish" name="thirdsd"> -->
      <!-- </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import fillRnformat from "./fillRnformation";
import fillPerson from "./fillContactPerson";
export default {
  components: {
    "fillRnformat-list": fillRnformat,
    "fillPerson-list": fillPerson
  },
  data() {
    return {
      labelPosition: 'right',
      activeName: 'first',
      formLabelAlign: {
        "startTime": "",       // 启用开始届数 
        "endTime": "",         //启用结束届数
        "isEnabled": "1",      // 是否激活
        "agentIntroduce": "",  // 代理简介
        "licenseNo": "",       // 营业执照号
        "taxNo": "",           // 税号
        "orgType": "",         // 代理机构类型
        "agentShort": '',      // 代理名称简称
        "areaManager": ""      //对应区域管理员
      },
      formLabel: {
        "agentAccount": "", // 代理用户名
        "agentCh": "",      // 代理中文名称
        "agentEn": "",      // 代理英文名称
        "city": "",         // 城市
        "address": "",      // 地址
        "postalCode": "",   // 邮编
        "url": "",          // 网址
        "agentArea": '',    // 招展区域
        "countryRegionId": ''   // 国家/地区
      },
      id: '',
      ExhibiArea: [],
      orgTypeList: [],
      country: []
    };
  },
  async created() {
    let arrery = await kindo.dictionary.get('ifoAgentArea');    // 招展区域
    let arreedList = await kindo.dictionary.get('ifoOrgNature');    // 机构性质
    this.orgTypeList = [];
    this.ExhibiArea = [];
    this.country = [];
    arreedList.forEach(el => {
      let obj = {
        label: el.label,
        value: el.id
      };
      this.orgTypeList.push(obj);
    });
    arrery.forEach(el => {
      let obj = {
        label: el.label,
        value: el.id
      };
      this.ExhibiArea.push(obj);
    });
    this.getsearchCountries().then(res => {
      let obj = {};
      res.forEach(el => {
        obj = {
          label: el.crChName,
          value: el.countryRegionId
        };
        this.country.push(obj);
      });
    });
    this.id = this.$route.query.exhibitionAgentId;
    this.getAdministratorExhibi({ agentId: this.id }).then(res => {
      this.formLabelAlign.isEnabled = res.isEnabled.toString(); // 是否激活
      this.formLabelAlign.startTime = res.startTime;            // 启用开始届数
      this.formLabelAlign.endTime = res.endTime;                // 启用结束届数
      this.formLabelAlign.agentIntroduce = res.agentIntroduce;  // 代理简介
      this.formLabelAlign.licenseNo = res.licenseNo;            // 营业执照号
      this.formLabelAlign.taxNo = res.taxNo;                    // 税号
      this.formLabelAlign.orgType = res.orgType;               // 代理机构类型
      this.formLabelAlign.agentShort = res.agentShort;          // 代理名称简称
      this.formLabelAlign.areaManager = res.areaManager;        //对应区域管理员
      this.formLabel.agentAccount = res.agentAccount;          // 代理用户名
      this.formLabel.agentCh = res.agentCh;                     // 代理中文名称
      this.formLabel.agentEn = res.agentEn;                     // 代理英文名称
      this.formLabel.city = res.city;                           // 城市
      this.formLabel.address = res.address;                     // 地址
      this.formLabel.postalCode = res.postalCode;               // 邮编
      this.formLabel.url = res.url;                             // 网址
      this.formLabel.agentArea = res.agentArea;                 // 招展区域
      this.formLabel.countryRegionId = res.countryRegionId;     // 国家/地区
    });
  },
  methods: {
    ...mapActions("managemeAgentnt", [
      "getAdministratorExhibi",   // 获取所有招展代理下拉
      "getsearchCountries",       // 查询国家（编辑新增
      "postExhibitRnformat"       // 提交
    ]),
    // 保存
    preserve() {
      let obj = {
        isEnabled: this.formLabelAlign.isEnabled,             // 是否激活
        startTime: this.formLabelAlign.startTime,            // 启用开始届数
        endTime: this.formLabelAlign.endTime,                // 启用结束届数
        agentIntroduce: this.formLabelAlign.agentIntroduce,  // 代理简介
        licenseNo: this.formLabelAlign.licenseNo,            // 营业执照号
        taxNo: this.formLabelAlign.taxNo,                    // 税号
        orgType: this.formLabelAlign.orgType,                // 代理机构类型
        agentShort: this.formLabelAlign.agentShort,          // 代理名称简称
        areaManager: this.formLabelAlign.areaManager,        //对应区域管理员
        agentAccount: this.formLabel.agentAccount,           // 代理用户名
        agentCh: this.formLabel.agentCh,                     // 代理中文名称
        agentEn: this.formLabel.agentEn,                     // 代理英文名称
        city: this.formLabel.city,                           // 城市
        address: this.formLabel.address,                     // 地址
        postalCode: this.formLabel.postalCode,               // 邮编
        url: this.formLabel.url,                             // 网址
        agentArea: this.formLabel.agentArea,                 // 招展区域
        countryRegionId: this.formLabel.countryRegionId     // 国家/地区
      };
      this.postExhibitRnformat(obj).then(res => {
        this.$router.go(-1);
      });
    },
    // 取消
    abolish() {
      this.$router.go(-1);
    }
  }
};
</script>


