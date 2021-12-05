<template>
  <div>
    <!--方案组新增弹框-->
    <el-dialog
      :title="language.schemegroupadd"
      :close-on-click-modal="false"
      top="15px"
      :visible.sync="childVisible"
      width="80%"
    >
      <kindo-box>
        <el-form :model="child" :rules="childRules" ref="child" v-loading="isLoading">
          <el-row>
            <el-col :span="12">
              <el-form-item :label="language.schemegroupname" prop="schemeGroupName" :label-width="formLabelWidth">
                <el-input v-model="child.schemeGroupName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="language.expnum" prop="exhibitionNum" :label-width="formLabelWidth">
                <el-select v-model="child.exhibitionNum" :placeholder="language.select"
                @change="selectExhibitionNum">
                  <el-option v-for="item in source.exhibitionNum" :key="item.id" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="m-t">
            <el-col :span="12">
              <el-form-item :label="language.expcode" prop="exhibitionPeriodCode" :label-width="formLabelWidth">
                <el-select v-model="child.exhibitionPeriodCode" :placeholder="language.selectexpcode" @focus="selectExhibitionPeriodNum(child.exhibitionNum)" >
                <el-option v-for="item in source.exhibitionPeriodNums" :key="item.id" :label="item.label" :value="item.value"></el-option>
              </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="language.boothscale" prop="boothsNumber" :label-width="formLabelWidth">
                <el-input v-model="child.boothsNumber"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row class="m-t">
            <el-col :span="12">
              <el-form-item :label="language.selectexphall" prop="schemeGroupHallList" :label-width="formLabelWidth">
                <el-tree ref="tree" :data="treedata" class="el-datagrid-picker-tree" :render-content="renderContent" highlightCurrent show-checkbox :props="defaultProps" node-key="id" :default-checked-keys="ckeys" @check-change="onTreeNodeClick"></el-tree>
                <!-- <el-exphall-tree-picker
                  :multiple="true"
                  :showcheckbox="true"
                  :getchild="true"
                  v-model="child.schemeGroupHallList"
                ></el-exphall-tree-picker> -->
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </kindo-box>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="child.action!=='view'" type="primary" @click="diagsave">
          <i class="glyphicon glyphicon-floppy-disk"></i>{{language.confirm}}
        </el-button>
        <el-button @click="childVisible = false">
          <i class="glyphicon glyphicon-remove"></i>{{language.cancel}}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableMixIn from "@/utils/helper/tableMixIn";
import exhibitionPeriod from "@/components/project/mixins/exhibitionPeriods";
export default {
  name: "childdialog",
  mixins: [tableMixIn, exhibitionPeriod],
  props: {
    childApi: {
      type: Object,
      default: () => {
        return {};
      }
    },
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      editexp: 1, // 默认展期统计数
      action: "",
      formLabelWidth: '180px',
      isLoading: false,
      rowdata: {},
      iconCls: "glyphicon glyphicon-folder-close",
      treedata: [],
      ckeys: [],
      newTree: [],
      defaultProps: {
        children: 'child',
        label: 'label'
      },
      // 弹出框
      child: {
        schemeGroupName: "",
        exhibitionNum: "",
        exhibitionPeriodCode: "",
        boothsNumber: "",
        schemeGroupHallList: []
      },
      source: {
        explist: []
      },
      childRules: {
        schemeGroupName: [{ required: true, message: this.language.input + this.language.schemegroupname, trigger: "blur" },
        { min: 1, max: 255, message: this.language.input + this.language.maxChar255, trigger: "blur" }],
        exhibitionNum: [{ required: true, message: this.language.select + this.language.expnum, trigger: "change" }],
        exhibitionPeriodCode: [{ required: true, message: this.language.select + this.language.expcode, trigger: "change" }],
        boothsNumber: [{ required: true, message: this.language.input + this.language.boothscale, trigger: "blur" }, 
        { pattern: /^[1-9][0-9]{0,10}$/, message: this.language.input + this.language.rulePositive }],
        schemeGroupHallList: [{ required: true, message: this.language.select + this.language.exphall, trigger: "change" }]
      },
      childVisible: false,
      addVisible: false
    };
  },
  async created() {
    this._child = Object.assign({}, this.child);
    this._addmodel = Object.assign({}, this.addmodel);
    // 读取数据字典
    this.source.explist = await kindo.dictionary.get("exhibitionPeriodNum");
  },

  mounted() {
    this.$nextTick(function() {});
  },
  methods: {
    // 加载树菜单
    onTree() {
      this.$http
      .get(this.childApi.gethall)
      .then(res => {
        if (res.records) {
          this.treedata = res.records;
        }
      });
    },
    renderContent(h, { node, data, store }) {
      if (!String.isNullOrEmpty(this.iconCls)) {
        return (
          <span class='el-tree-node__label'>
            <i class={"el-tree-node__label-icon " + this.iconCls} />
            {data["label"]}
          </span>
        );
      } else {
        return (
          <span class='el-tree-node__label'>{data["label"]}</span>
        );
      }
    },
    // 勾选树菜单
    onTreeNodeClick(data, node, component) {
      if (!data.child) {
        let dictIds = data["id"];
        if (node) {
          if (this.child.schemeGroupHallList.indexOf(dictIds) === -1) {
            this.child.schemeGroupHallList.push(dictIds);
          }
        } else if (node === false) {
          if (this.child.schemeGroupHallList.length > 0) {
            let index = this.child.schemeGroupHallList.indexOf(dictIds);
            // console.log(index);
            if (index > -1) {
              this.child.schemeGroupHallList.splice(index, 1); 
            }
          }
        }
      } else if (node) {
        if (component) {
          return;
        }
        data.child.forEach(item => { 
          let dictId = item["id"];
          if (this.child.schemeGroupHallList.indexOf(dictId) === -1) {
            this.child.schemeGroupHallList.push(dictId);
          }
        });
      } else if (node === false) {
        if (component) {
          return;
        }
        if (this.child.schemeGroupHallList.length > 0) {
          data.child.forEach(item => {
            let dictId = item["id"];
            let index = this.child.schemeGroupHallList.indexOf(dictId);
            if (index > -1) {
              this.child.schemeGroupHallList.splice(index, 1); 
            }
          });
        }
      }
    },
    // 保存提交数据
    getadd() {
      this.child = Object.assign({}, this._child);
      this.child.action = "add";
      this.onTree();
    },
    diagsave() {
      this.$refs.child.validate(valid => {
        if (valid) {
          let url = "";
          if (this.child.action === "add" || this.child.action === "clone") {
            url = this.childApi.add;
          } else if (this.child.action === "edit") {
            url = this.childApi.update;
          }
          let tmpSchemeGroupHallList = [];
          if (this.child.schemeGroupHallList.length > 0) {
            this.child.schemeGroupHallList.forEach(element => {
              let item = { "exhibitionHallCode": element };
              tmpSchemeGroupHallList.push(item);
            });
          }
          let jsonData = {
            schemeGroupName: this.child.schemeGroupName,
            exhibitionNum: parseInt(this.child.exhibitionNum),
            exhibitionPeriodCode: this.child.exhibitionPeriodCode,
            boothsNumber: this.child.boothsNumber,
            schemeGroupHallList: tmpSchemeGroupHallList
          };
          this.isLoading = true;
          this.$http.postJson(url, jsonData).then(res => {
            this.isLoading = false;
            this.childVisible = false;
            this.$emit("reload");
            if (res !== undefined && res['sign'] === "2") {
              jsonData['schemeGroupId'] = res['schemeGroupId'];
              this.$emit("childByValue", jsonData);
            }
            kindo.util.alert(this.source.language.saveSuccess, "success");
          }).catch(error => {
            this.isLoading = false;
            this.$message.error(error);
          });
          // console.log(JSON.stringify(jsonData));
        }
      });
    }
  },
  watch: {
    "action"(value) {
      switch (value) {
        case "add":
          return this.getadd();
        case "delete":
          return this.deleteList(
            this.rowdata,
            "schemeGroupId",
            "child",
            this.childApi.delete
          );
        default:
          return "";
      }
    },
    "child.exhibitionNum"(value) {
      this.child.exhibitionPeriodCode = "";
    }
  }
};
</script>

<style lang="scss" scoped>
  .inpWidth {
    width: 140px;
  }

  .m-t {
    margin-top: 10px;
  }
  .iconfont.icon-zuidahua {
    float: right;
    margin-right: 23px;
    margin-top: 3px;
  }
  .sysdict-data-tree {
    width: 96%;
    border: 1px solid #ebeff5;
    padding: 2%;
    max-height: 590px;
    overflow: auto;
    margin-top: 0px;
  }
</style>
