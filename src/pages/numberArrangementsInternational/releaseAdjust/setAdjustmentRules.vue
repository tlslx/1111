<template>
  <!-- <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="设置规则" name="first"> -->
      <!-- 表单 -->
  <el-form :model="formData" label-width="300px" :rules="formRules" ref="formRef" size="small" label-position="right" class="mtop">
    <el-form-item label="允许参与调整的交易团 ：" prop="delegationCodeList">
      <el-select
        class="widthInp"
        v-model="formData.delegationCodeList"
        multiple
        placeholder="请选择参与调整的交易团"
        :disabled="disab"
      >
        <el-option
          v-for="(item, inde) in localstora.delegation"
          :key="inde"
          :label="item.deptName"
          :value="item.deptId"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="可用于调换的展区 ：" prop="exhibitionAreaCodeList">
      <el-select
        class="widthInp"
        v-model="formData.exhibitionAreaCodeList"
        multiple
        placeholder="请选择参与调换的展区"
        :disabled="disab"
      >
        <el-option
          v-for="(itemex, index) in localstora.exhibitionArea"
          :key="index"
          :label="itemex.exhibitionAreaName"
          :value="itemex.exhibitionAreaCode"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="是否允许跨展期调整 ：" prop="isAcross">
      <el-select v-model="formData.isAcross" class="widthInp" :disabled="disab" clearable>
        <el-option label="是" value="1"></el-option>
        <el-option label="否" value="0"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="调整类型 ：" prop="adjustType">
      <el-checkbox-group v-model="formData.adjustType" :disabled="disab" clearable>
        <el-checkbox label="1">等量调换</el-checkbox>
        <el-checkbox label="2">不等量调换</el-checkbox>
        <el-checkbox label="3">还原调整</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="允许调整的展位性质 ：" prop="exhibitionType">
      <el-checkbox-group v-model="formData.exhibitionType" :disabled="disab" clearable>
        <el-checkbox label="1">标摊</el-checkbox>
        <el-checkbox label="2">特装</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="展位类别 ：" prop="boothType">
      <el-checkbox-group v-model="formData.boothType" :disabled="disab" clearable>
        <el-checkbox label="1">一般性展位</el-checkbox>
        <el-checkbox label="2">中央通道展位</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="展位数量 ：" prop="boothNumber">
      <el-input v-model.trim="formData.boothNumber" :disabled="disab" maxlength="10" placeholder="请输入" class="widthInp"></el-input>
    </el-form-item>
    <el-form-item label="允许调整的期限 ：" prop="demandDeadline">
      <el-date-picker v-model="formData.demandDeadline" :disabled="disab" type="date" placeholder="选择日期" class="widthInp"></el-date-picker>
    </el-form-item>
    <el-form-item label=" ">
      <el-button type="primary" class="formStyle" :disabled="disab" @click="handelSeave('formRef')">保存</el-button>
      <el-button class="formStyle" @click="handEdit">修改</el-button>
    </el-form-item>
  </el-form>
    <!-- </el-tab-pane>
  </el-tabs> -->
</template>
<script>
import { mapActions } from "vuex";
import { $date } from "@/scripts/project/utils";
export default {
  data() {
    let tynum = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error("该字段为必填项"));
      } else if (!Number.isInteger(value - 0)) {
        return callback(new Error("请输入合法字符"));
      } else if (value < 0) {
        return callback(new Error("必须大于等于0"));
      } else {
        return callback();
      }
    };
    return {
      obj: {
        ordinaryAdjustDemand: {
          isAcross: "0",
          adjustType: "1,2,3",
          exhibitionType: "1,2",
          boothType: "1,2",
          boothNumber: "20",
          demandDeadline: "2019-12-21"
        },
        delegationCodeList: [
          {
            delegationId: "南京"
          },
          {
            delegationId: "盐城"
          }
        ],
        exhibitionAreaCodeList: [
          {
            exhibitionAreaCode: "厨具"
          },
          {
            exhibitionAreaCode: "卫浴"
          }
        ]
      },
      disab: false, // 默认不禁用
      objarea: {
        adjustDemandId: "907EA510B3F74086B7B9670C2660BE98"
      },
      objdeleg: {
        adjustDemandId: "907EA510B3F74086B7B9670C2660BE98"
      },
      xyz: "",
      formData: {
        delegationCodeList: [],
        exhibitionAreaCodeList: [],
        isAcross: "",
        adjustType: [],
        exhibitionType: [],
        boothType: [],
        boothNumber: "",
        demandDeadline: ""
      },
      formRules: {
        delegationCodeList: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        exhibitionAreaCodeList: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        isAcross: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        adjustType: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        exhibitionType: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        boothType: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        boothNumber: [{ validator: tynum, required: true, trigger: "blur" }],
        demandDeadline: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      fullLoading: false,
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      activeName: "first"
    };
  },
  mounted() {
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    this.getListPage();
    // 展区
    this.getexhibitionArea().then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  computed: {
    addup() {
      this.obj = {
        ordinaryAdjustDemand: {
          isAcross: "",
          adjustType: "",
          exhibitionType: "",
          boothType: "",
          boothNumber: "",
          demandDeadline: ""
        },
        delegationCodeList: [],
        exhibitionAreaCodeList: []
      };
      for (let i = 0; i < this.formData.delegationCodeList.length; i++) {
        let delecode = {
          delegationCode: "",
          delegationId: "",
          delegationName: ""
        };
        for (let j = 0; j < this.localstora.delegation.length; j++) {
          delecode.delegationId = this.formData.delegationCodeList[i];
          if (delecode.delegationId === this.localstora.delegation[j].deptId) {
            delecode.delegationName = this.localstora.delegation[j].deptName;
            delecode.delegationCode = this.localstora.delegation[j].deptCode;
            this.obj.delegationCodeList.push(delecode);
          }
        }
      }
      for (let i = 0; i < this.obj.delegationCodeList.length; i++) {
        if (this.obj.delegationCodeList[i].delegationId == null) {
          this.obj.delegationCodeList = this.obj.delegationCodeList.splice(i, 1);
        }
      }
      for (let j = 0; j < this.formData.exhibitionAreaCodeList.length; j++) {
        let exhicod = {
          exhibitionAreaCode: "",
          exhibitionAreaName: ""
        };
        for (let k = 0; k < this.localstora.exhibitionArea.length; k++) {
          exhicod.exhibitionAreaCode = this.formData.exhibitionAreaCodeList[j];
          if (exhicod.exhibitionAreaCode === this.localstora.exhibitionArea[k].exhibitionAreaCode) {
            exhicod.exhibitionAreaName = this.localstora.exhibitionArea[k].exhibitionAreaName;
            this.obj.exhibitionAreaCodeList.push(exhicod);
          }
        }
      }
      for (let i = 0; i < this.obj.exhibitionAreaCodeList.length; i++) {
        if (this.obj.exhibitionAreaCodeList[i].exhibitionAreaCode == null) {
          this.obj.exhibitionAreaCodeList = this.obj.exhibitionAreaCodeList.splice(i, 1);
        }
      }
      this.obj.ordinaryAdjustDemand.isAcross = this.formData.isAcross;
      for (let i = 0; i < this.formData.adjustType.length; i++) {
        this.obj.ordinaryAdjustDemand.adjustType += "," + this.formData.adjustType[i];
      }
      this.obj.ordinaryAdjustDemand.adjustType = this.obj.ordinaryAdjustDemand.adjustType.substr(
        1
      );
      for (let i = 0; i < this.formData.exhibitionType.length; i++) {
        this.obj.ordinaryAdjustDemand.exhibitionType += "," + this.formData.exhibitionType[i];
      }
      this.obj.ordinaryAdjustDemand.exhibitionType = this.obj.ordinaryAdjustDemand.exhibitionType.substr(
        1
      );
      for (let i = 0; i < this.formData.boothType.length; i++) {
        this.obj.ordinaryAdjustDemand.boothType += "," + this.formData.boothType[i];
      }
      this.obj.ordinaryAdjustDemand.boothType = this.obj.ordinaryAdjustDemand.boothType.substr(
        1
      );
      this.obj.ordinaryAdjustDemand.boothNumber = this.formData.boothNumber;
      this.obj.ordinaryAdjustDemand.demandDeadline = $date.format(this.formData.demandDeadline, "yyyy-MM-dd");
      return this.obj;
    }
    // ...mapGetters("releaseAdjust", [
    //   "getlistDelegat", // 查询工作部设置的规则相关的交易团
    //   "getlistArea", // 查询工作部设置的规则相关的展区
    //   "getlistAdjust" // 查询工作部设置的规则
    //   // "addAdjust" // 设置规则
    // ])
  },
  methods: {
    ...mapActions("releaseAdjust", [
      "getlistAdjustDemand", // 查询工作部设置的规则
      "getlistAreaCode", // 查询工作部设置的规则相关的展区
      "getlistDelegation", // 查询工作部设置的规则相关的交易团
      "addadjustDemand", // 设置规则
      "updateadjustDemand" // 修改规则
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getexhibitionInfoByCode", // 专区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据 ok
    getListPage() {
      this.getlistAdjustDemand()
        .then(res => {
          if (res.records.length !== 0) {
            this.xyz = res.records[0].adjustDemandId;
            this.disab = true;
          } else {
            this.disab = false;
          }
          this.formData.isAcross = res.records[0].isAcross;
          this.formData.boothNumber = res.records[0].boothNumber;
          this.formData.demandDeadline = res.records[0].demandDeadline;
          this.formData.adjustType = res.records[0].adjustType.split(",");
          this.formData.exhibitionType = res.records[0].exhibitionType.split(",");
          this.formData.boothType = res.records[0].boothType.split(",");
          let id = { adjustDemandId: res.records[0].adjustDemandId };
          this.getlistAreaCode(id).then(resarea => {
            for (let j = 0; j < resarea.records.length; j++) {
              this.formData.exhibitionAreaCodeList.push(resarea.records[j].exhibitionAreaCode);
            }
          }).catch(e => {});
          this.getlistDelegation(id).then(resde => {
            for (let j = 0; j < resde.records.length; j++) {
              this.formData.delegationCodeList.push(resde.records[j].delegationId);
            }
          }).catch(e => {});
        })
        .catch(e => {});
    },
    // 保存 ok
    handelSeave(datae) {
      if (this.xyz === "") {
        this.$refs[datae].validate((vald) => {
          let pushaa = JSON.parse(JSON.stringify(this.addup));
          if (vald) {
            this.$confirm("确认保存？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.addadjustDemand(pushaa)
                  .then(res => {
                    this.disab = true;
                    this.$message({
                      message: "保存成功！",
                      type: "success"
                    });
                    this.formData.delegationCodeList = [];
                    this.formData.exhibitionAreaCodeList = [];
                    this.getListPage();
                  })
                  .catch(e => {});
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消保存"
                });
              });
          }
        });
      } else {
        this.$refs[datae].validate((vald) => {
          if (vald) {
            this.addup.ordinaryAdjustDemand["adjustDemandId"] = this.xyz;
            let pushaa = JSON.parse(JSON.stringify(this.addup));
            this.$confirm("确认保存？", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning"
            })
              .then(() => {
                this.updateadjustDemand(pushaa)
                  .then(res => {
                    this.$message({
                      message: "修改成功！",
                      type: "success"
                    });
                    this.formData.delegationCodeList = [];
                    this.formData.exhibitionAreaCodeList = [];
                    this.getListPage();
                  })
                  .catch(e => {});
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消保存"
                });
              });
          }
        });
      }
    },
    // 修改 ok
    handEdit() {
      this.$confirm("确认修改？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.disab = false;
          // this.updateadjustDemand(this.addup)
          //   .then(res => {
          //     this.$message({
          //       message: "修改成功！",
          //       type: "success"
          //     });
          //   })
          //   .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    }
  }
};
</script>
<style scoped>
.widthInp {
  width: 350px;
}
.mtop {
  margin-top: 50px;
}
.formStyle {
  padding: 8px 30px;
}
</style>

