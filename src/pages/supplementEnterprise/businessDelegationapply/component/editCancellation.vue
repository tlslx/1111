<style lang="less" scoped>
.editCancellation {
  height: 100%;
  /deep/.el-form-item {
    margin-bottom: 22px;
  }
}
/deep/.el-dialog {
  width: 70%;
}
</style>
<template>
  <div class="editCancellation">
    <el-button style="margin-bottom: 10px;" type="primary" @click="addSubmit()">新增</el-button>
    <el-dialog append-to-body title="新增" class="addCancellation" :visible.sync="btnDialogVisible">
      <addCancellation @closeModal="customsModal" :companyId='demandRecordId.companyId'></addCancellation>
    </el-dialog>
    <canBeEdit-table
      :loading="loading"
      :tableTrData="reviewTrDate"
      :tableData="fatDate"
      :selection="selection"
      :isSelectable="isSelectable"
      :selectTable='selectTable'
      @change-multiple-selection="selectAll"
      @deal-with-operate="dealWithChangeStatusEvent"
    ></canBeEdit-table>
    <div style="margin: 10px 0; text-align: center;">
      <el-button type="primary" @click="onSubmit()">确认</el-button>
      <el-button @click="closeModel">返回</el-button>
    </div>
  </div>
</template>
<script>
import canBeEditTable from "@/components/project/common/canBeEditTable.vue";
import { mapActions, mapGetters } from "vuex";
import addCancellation from "./addCancellation";
export default {
  components: {
    "canBeEdit-table": canBeEditTable,
    addCancellation
  },
  props: ["demandRecordId"],
  data() {
    return {
      loading: false,
      selection: true,
      btnDialogVisible: false,
      NoticeDate: [],
      fatDate: [],
      selectTable: [],
      // 表头数据
      reviewTrDate: [
        {
          prop: "nameCh",
          label: "企业名称(中文)",
          type: "input",
          userDefined: true
        },
        {
          prop: "nameEn",
          label: "企业名称(英文)",
          type: "input",
          userDefined: true
        },
        {
          prop: "addressCh",
          label: "地址(中文)",
          type: "input",
          userDefined: true
        },
        {
          prop: "addressEn",
          label: "地址(英文)",
          type: "input",
          userDefined: true
        },
        {
          type: "btn",
          show: true,
          unChangeStatus: true,
          operating: true,
          label: "操作",
          operator: {
            type: "text",
            textArray: [
              {
                prop: "remove",
                label: "撤销",
                style:
                  "cursor: pointer;text-decoration: underline;color: #0099ff;margin-right: 10px;"
              }
            ]
          }
        }
      ]
    };
  },
  mounted() {},
  watch: {
    demandRecordId: {
      handler(val, newval) {
        this.getDate();
      },
      deep: true,
      immediate: true
    },
    fatDate: {
      handler(val, newval) {
        if (val.length !== 0) {
          this.selectTable = [];
          for (let key in val) {
            if (val[key].confirmFlag === "SELECTED") {
              this.selectTable.push(val[key]);
            }
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters("supplementEnterprise", [
      "perservationList" // 5.	交易团保存追加联营企业并提交申请
    ])
  },
  methods: {
    ...mapActions("supplementEnterprise", [
      "getPreservationApplicationventures", // 5.	交易团保存追加联营企业并提交申请
      "getPreservationApplicationRemove", //撤销联营企业
      "getApplicationJointventure"
    ]),
    // 初始化值
    getDate() {
      this.loading = true;
      this.getApplicationJointventure(this.demandRecordId).then((res) => {
        this.fatDate = res;
        this.loading = false;
      });
    },
    // 确定按钮
    onSubmit() {
      let newDate = [];
      for (let key in this.NoticeDate) {
        newDate.push(this.NoticeDate[key].associateId);
      }
      let temp = {
        demandRecordId: this.demandRecordId.demandRecordId,
        unionIds: newDate.join(",")
      };
      this.getPreservationApplicationventures(temp).then(res => {
        this.$message({
          type: "success",
          message: "操作成功!"
        });
        this.closeModel();
      });
    },
    // 处理操作按钮事件
    dealWithChangeStatusEvent(scope, operateItem, operate) {
      if (operate.prop === "remove") {
        scope.row.isEdit = false;
        scope.row.operateType = "icon";
        let temp = {
          demandRecordId: this.demandRecordId.demandRecordId,
          unionId: scope.row.associateId
        };
        this.getPreservationApplicationRemove(temp).then(res => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.getDate();
        });
      }
    },
    // 关闭新增弹框
    closeModel() {
      this.$emit("closeModal", false);
    },
    // 全选按钮
    isSelectable(row, index) {
      if (row.confirmFlag === "SELECTED") {
        return false;
      } else {
        return true;
      }
    },
    selectAll(val) {
      this.NoticeDate = val;
    },
    // 新增按钮
    addSubmit() {
      this.btnDialogVisible = true;
    },
    customsModal(val) {
      this.btnDialogVisible = val;
      this.getDate();
    }
  }
};
</script>
