<template>
  <el-page ref="flatmanage">
    <template slot="header">
      <!--页面对话框-->
      <!--按钮栏-->
      <kindo-box :title="source.language.audit" icon="fa-search">
        <el-form :model="forms" :rules="formRules" ref="forms" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery">
          <el-form-item :label="source.language.graphName" prop="graphName">
            <el-input v-if="forms.graphId===''" @blur="(ev)=>ev.target.value = ev.target.value.trim()" :maxlength="20" v-model="forms.graphName" class="inputclass"></el-input>
            <span v-else>{{forms.graphName}}</span>
          </el-form-item>
          <el-form-item :label="source.language.expnum" prop="exhibitionNum">
            <el-select v-if="forms.graphId===''" v-model="forms.exhibitionNum" :placeholder="source.language.selectPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.expnum" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span v-else>{{forms.exhibitionNum}}</span>
          </el-form-item>
          <el-form-item :label="source.language.expcode" prop="exhibitionPeriodCode">
            <el-select v-if="forms.graphId===''" v-model="forms.exhibitionPeriodCode" :placeholder="source.language.selectPlaceholder" class="inputclass" :clearable="true" :editable="true">
              <el-option v-for="item in source.explist" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
            <span v-else>{{forms.exhibitionPeriodCode}}</span>
          </el-form-item>
          <el-form-item>
            <el-button v-if="forms.graphId===''&&right('auto')" type="primary" @click="onQuery">{{source.language.auto}}</el-button>
            <el-button @click="onReturn">{{source.language.return}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <!--平面图-->
        <mapSvg ref="mapSvg" :api="config.api" :onexport="right('export')" :onsave="right('save')" :ondelete="right('delete')" :language="source.language" @reload="onChild" :imgurl="imgurl" :costom="true" title="平面图绘制" />
      </el-page-data>
    </template>
  </el-page>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import listPageBase from "@/components/framework/mixins/listPageBase";
import mapSvg from "@/components/project/plugins/mapSvg.vue";
import config from './components';
export default {
  name: "flatmarking",
  mixins: [tableMixIn, listPageBase],
  components: {
    mapSvg
  },
  data() {
    return {
      pageId: "flatmarking",
      config,
      action: "",
      imgurl: 'static/img/map.svg',
      forms: {
        graphName: "",
        exhibitionNum: "",
        exhibitionPeriodCode: "",
        graphId: ""
      },
      formRules: {
        graphName: "",
        exhibitionNum: "",
        exhibitionPeriodCode: ""
      },
      source: {
        explist: [],
        expnum: [],
        language: {
          common: {}
        }
      }
    };
  },
  computed: {
    form: function () {
      return {
        queryParams: this.forms
      };
    }
  },
  async created() {
    this._forms = Object.assign({}, this.forms);
    // 读取国际化
    // this.source.areas = await kindo.dictionary.get('areaOfExhibits'); // 展区
    this.source.language = kindo.util.getLanguage('FlatMapLang');
    this.source.language.common = kindo.util.getLanguage('CommonLang');
    this.source.explist = await kindo.dictionary.get('exhibitionPeriodNum'); // 展期
    this.formRules.graphName = [
      { required: true, message: this.source.language.common.input, trigger: "blur" }
    ];
    this.formRules.exhibitionNum = [
      { required: true, message: this.source.language.common.select, trigger: "change" }
    ];
    this.formRules.exhibitionPeriodCode = [
      { required: true, message: this.source.language.common.select, trigger: "change" }
    ];
    this.getall();
  },

  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },

  methods: {
    onQuery() {
      this.$refs.forms.validate(valid => {
        if (valid) {
          this.$refs.mapSvg.action = '';
          this.$nextTick(function () {
            this.$refs.mapSvg.rowdata = this.forms;
            this.$refs.mapSvg.action = "auto";
          });
        }
      });
    },
    onChild() {
      // this.reload();
    },
    onReturn() {
      this.$router.push({
        path: '/flatmanage'
      });
    },
    // 重置条件为空查询
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.$nextTick(function () {
        if (this.$route.query.graphId) {
          this.forms.graphId = this.$route.query.graphId;
          this.forms.graphName = this.$route.query.graphName;
          this.forms.exhibitionNum = this.$route.query.exhibitionNum;
          this.forms.exhibitionPeriodCode = this.$route.query.exhibitionPeriodCode;
        }
        this.$refs.mapSvg.rowdata = this.forms;
        this.$refs.mapSvg.action = "auto";
      });
    },
    getall() {
      this.source.expnum = [];
      this.$http.get(this.config.api.getall).then(res => {
        if (res.length) {
          res.forEach((item, index) => {
            let params = {
              id: item.exhibitionId.toString(),
              label: item.exhibitionNum.toString(),
              value: item.exhibitionNum.toString()
            };
            this.source.expnum.push(params);
          });
        }
      });
    },
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    }
  },
  watch: {
  }
};
</script>
<style lang="scss" scoped>
  .sysdict-data-tree {
    width: 96%;
    border: 1px solid #ebeff5;
    padding: 2%;
    max-height: 590px;
    overflow: auto;
    margin-top: 0px;
  }
</style>