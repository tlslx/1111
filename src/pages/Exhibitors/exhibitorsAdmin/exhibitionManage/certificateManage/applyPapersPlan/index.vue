<style lang="less" scoped>
@import "../../../../../../theme/project/css/flex.less";
</style>

<template>
  <el-tabs value="perpetual">
    <el-tab-pane label="各环节进图" name="perpetual">
      <div class="bm bm-pj">
        <el-form :inline="true" :model="ruleForm" style="margin-top: 20px">
          <el-form-item label="届数:">
            <el-select v-model="ruleForm.exhibitionNum" placeholder="请选择">
              <el-option v-for="(item, index) in exhibitionNum" :key="index"
                :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期数" prop="name">
            <el-select style="width: 90%" v-model="ruleForm.exhibitionPeriod" placeholder="请选择">
              <el-option label="1" :value="1"></el-option>
              <el-option label="3" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="showType">
              <el-radio-button label="pie">饼图</el-radio-button>
              <el-radio-button label="bar">柱状图</el-radio-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <component :is="componentName"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import piePic from "./pieShowPic";
import barPic from "./barShowPic";
export default {
  components: {
    "pie-pic": piePic,
    "bar-pic": barPic
  },
  data() {
    return {
      ruleForm: {
        exhibitionNum: "",
        exhibitionPeriod: 1
      },
      showType: "pie",

      pieLeft: {},
      pieRight: {},

      barLeft: {},
      barRight: {}
    };
  },
  computed: {
    ...mapGetters('commonStore', ['exhibitionNum', "currentExhibition"]),
    componentName() {
      let componentLabel = this.showType;
      if (componentLabel === "pie") {
        return "pie-pic";
      } else if (componentLabel === "bar") {
        return "bar-pic";
      } else {
        return "pie-pic";
      }
    }
  },
  methods: {
    ...mapActions("commonStore", ["getExhibitionNum", "getExhibitionPlace"])
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
