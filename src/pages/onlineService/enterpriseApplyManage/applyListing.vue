/**
 * @file 品牌展位申请
 */
<style scoped>
  .apply-container {
    width: 80%;
    margin: auto;
  }
  .apply-introduce-container {
    padding: 5px 10px;
    font-weight: bold;
    background-color: #ffffdf;
  }
  p {
    margin: 5px;
  }
  .el-table >>> .el-checkbox__input.is-checked + .el-checkbox__label {
    color: #666;
  }
  .el-table >>> .el-checkbox__inner:hover {
    border-color: #666;
  }
  .el-table >>> .el-checkbox__inner {
    border-color: #666;
  }
  .el-table >>> .el-checkbox {
    color: #666;
  }
  .el-table >>> .el-checkbox + .el-checkbox {
    margin-left: 0;
  }
  .redTip {
    color: #cc6666;
  }
  .blueTip {
    color: #0033cc;
  }
  .linefeed {
    word-break: normal;
  }
  .apply-listing-footer {
    text-align: center;
    margin-top: 40px;
  }
  .center{
    text-align: center;
  }
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展位申请" name="first">
      <div class="apply-container">
        <!-- 介绍 -->
        <div class="apply-introduce-container">
          <p class="redTip">为便于您的申请顺利进行，请先按一下顺序准备好申报材料并勾选，然后点击“下一步”继续您的申请。</p>
          <p class="redTip">注：其中2、3、6项中的文件需上传，请同时准备彩色扫描件（jpg或pdf格式，大小不超过500k）。</p>
          <p class="blueTip">申报材料总体要求</p>
          <p>（一）所有申报材料上的企业名称应与申请企业或所涉母子关系企业名称完全一致。各项证书的所有人应为该审核企业或所涉母子关系企业（含法定代表人）。否则将被视为无关材料：</p>
          <p>（二）所有申报材料上的内容、产品及标准均应与企业申请的展区行业相关，所涉产品应在所申请展区规定的参展商品目录范围内，否则将被视为无关材料：</p>
          <p>（三）所有申报材料的有效期须能覆盖品牌展位企业申请截止日期：仍在注册或申报相关资质、商标、认证等过程中的或已过期的申报材料均被视为无关材料。</p>
          <p class="redTip">此页面勾选项目仅用于协助整理书面申报材料、所有用于评审的资质在下页申请表中仍需勾选。</p>
        </div>
        <!-- 表格 -->
        <div>
          <!-- 原来的 -->
          <el-table :data="brandApplyArr" border v-loading="loading">
            <el-table-column prop="explainId" label="序号"></el-table-column>
            <el-table-column label="项目" prop="projectContent"></el-table-column>
            <el-table-column label="申报材料">
              <template slot-scope="scope">
                <div v-if="scope.row.explainSetDetails.length !== 0">
                  <p
                    class="linefeed"
                    v-for="(item, index) in scope.row.explainSetDetails"
                    :key="index">
                    <el-checkbox
                      v-model="item.isChecked"
                      :true-label="1"
                      :false-label="0"
                      :label="item.materialName"
                      @change="getCheckId(item.explainDetailId)"
                      :disabled="item.isRequireBoolean">
                    </el-checkbox>
                  </p>
                </div>
              </template>
              <template slot-scope="scope">
                <div v-if="scope.row.explainSetDetails.length !== 0">
                  <p
                    class="linefeed"
                    v-for="(item, index) in scope.row.explainSetDetails"
                    :key="index">
                  <!-- :disabled="item.isRequireBoolean" -->
                    <el-checkbox
                      v-model="item.isChecked"
                      :true-label="1"
                      :false-label="0"
                      :label="item.materialName"
                      @change="getCheckId(item.explainDetailId)">
                    </el-checkbox>
                  </p>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="注意事项">
              <template slot-scope="scope">
                <div>
                  <p class="linefeed">{{scope.row.matter}}</p>
                  <br>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="apply-listing-footer">
            <el-button type="primary" size="medium" @click="handleWithConfirm()">确定</el-button>
            <el-button type="info" size="medium" @click="cancel()">取消</el-button>
          </div>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      loading: "",
      activeName: "first",
      brandApplyArr: [],
      explainDetailIdList: [] // 选中的申请材料id，
    };
  },
  computed: {
    ...mapGetters("companyInfomation", ["brandApplyList"])
  },
  mounted() {
  },
  created() {
    this.loading = true;
    this.postBrandApply()
      .then(res => {
        this.loading = false;
        this.brandApplyArr = JSON.parse(JSON.stringify(res));
        for (let i = 0; i < this.brandApplyArr.length; i++) {
          if (this.brandApplyArr[i].explainSetDetails.length > 0) {
            for (
              let t = 0;
              t < this.brandApplyArr[i].explainSetDetails.length;
              t++
            ) {
              let arr = this.brandApplyArr[i].explainSetDetails[t];
              // if (arr.isRequire === 0) {
              //   arr.isRequireBoolean = false;
              // } else {
              //   arr.isRequireBoolean = true;
              // }
              if (arr.isChecked === 1) {
                this.explainDetailIdList.push(arr.explainDetailId);
              }
            }
          }
        }
      })
      .catch(e => {
        this.loading = false;
      });
  },
  methods: {
    ...mapActions("companyInfomation", [
      "postBrandApply",
      "postSubmitBrandApply"
    ]),
    // 勾选申请材料获取id
    getCheckId(val) {
      let index = this.explainDetailIdList.indexOf(val);
      if (index === -1) {
        this.explainDetailIdList.push(val);
      } else {
        this.explainDetailIdList.splice(index, 1);
      }
    },
    // 确定
    handleWithConfirm() {
      this.loading = true;
      this.postSubmitBrandApply(this.explainDetailIdList)
        .then(res => {
          this.loading = false;
          this.$message.success("保存成功");
          this.$router.push({ path: "/brandApplicationForm", params: { id: res }});
        })
        .catch(e => {
          this.loading = false;
        });
    },
    // 取消
    cancel() {
      this.$router.push({ path: "/brandAppliactionTable" });
    },
    //静态页面合并函数
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      // return [
      //   {
      //     rowspan: 2,
      //     colspan: 2
      //   }
      // ];
      return {
        rowspan: 2,
        colspan: 1
      };
    }
  }
};
</script>



