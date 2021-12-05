<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick" v-loading="loadinga" element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading" element-loading-background="rgba(225, 225, 225)">
      <el-tab-pane label="发布公示公告" name="first">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="商协会">
            <el-input v-model.trim="formInline.coceralName" class="widths" maxlength="8" size="small"></el-input>
          </el-form-item>
          <el-form-item label="展区">
            <el-input v-model.trim="formInline.exhibitionAreaName" maxlength="8" class="widths" size="small"></el-input>
          </el-form-item>
          <el-form-item label="企业名称">
            <el-input v-model.trim="formInline.companyName" maxlength="8" class="widths" size="small"></el-input>
          </el-form-item>
          <el-form-item label="交易团">
            <el-input v-model.trim="formInline.dealClusterName" maxlength="8" class="widths" size="small"></el-input>
          </el-form-item>
          <el-form-item label="公示状态">
            <el-select v-model="formInline.publicityStatus" size="small" class="widths">
              <el-option label="全部" value=""></el-option>
              <el-option label="未公示" value="0"></el-option>
              <el-option label="已公示" value="1"></el-option>
            </el-select>
            <!-- <el-input v-model="formInline.dealClusterName" maxlength="24" class="widths"  size="small"></el-input> -->
          </el-form-item>
          <el-form-item class="but">
            <el-button type="primary" class="call" @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="tableData" ref="multipleTable" @select="handleSelectionChange" @select-all="handleSelectionDhange"
          @selection-change="handleCheckedChange" :row-key="getRowKey" style="width: 100%" max-height="800" border>
          <el-table-column type="selection" :selectable="checkBox" fixed width="55">
          </el-table-column>
          <el-table-column prop="region" align="center" label="地区" width="180">
          </el-table-column>
          <el-table-column prop="exhibitionAreaName" align="center" label="展区">
          </el-table-column>
          <el-table-column prop="dealClusterName" align="center" label="交易团">
          </el-table-column>
          <el-table-column prop="coceralName" align="center" label="商协会">
          </el-table-column>
          <el-table-column prop="companyName" align="center" label="品牌企业名称">
          </el-table-column>
          <el-table-column prop="provisionNumber" align="center" label="品牌企业展位数">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formData" :rules="rules" ref="formData">
                  <el-form-item prop="listA">
                    <el-input maxlength="8" v-model.trim="formData.listA"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{scope.row.provisionNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="publicityStatus" align="center" label="公示状态">
            <template slot-scope="scope">
              {{ scope.row.publicityStatus === '1' ? '已公示' : '未公示' }}
            </template>
          </el-table-column>
          </el-table-column>
          <el-table-column prop="address" align="center" label="操作">
            <template slot-scope="scope">
              <div v-if="!scope.row.edit">
                <el-button type="text" size="mini" @click="handeldeposit(scope.$index, scope.row.provisionNumber)">修改
                </el-button>
              </div>
              <div v-else>
                <el-button type="text" size="mini" @click="dandeldeposit(scope.row,'formData')">保存
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-button @click="publi" type="danger" style="padding: 10px 20px; margin-top: 20px">公示</el-button>
        <el-dialog title="发布" :visible.sync="dialogVisible" width="40%" @close="handelCure" center>
          <el-form :model="form">
            <el-form-item label="发布至: " :label-width="formLabelWidth">
              <el-checkbox-group v-model="form.publishWay">
                <el-checkbox label="1" style="margin-left: 27px">广交会官网</el-checkbox>
                <el-checkbox label="2" style="margin-left: 147px">内部管理系统</el-checkbox>
                <el-checkbox label="3" style="margin-left: 147px">易捷通系统</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="附件: " :label-width="formLabelWidth">
              <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview"
                :on-success="success" :file-list="fileList" :on-remove="handleRemove" :before-remove="beforeRemove"
                multiple :limit="3" :on-exceed="handleExceed">
                <el-button size="small" type="primary">点击上传</el-button>
                <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
              </el-upload>
              <!-- <el-button @click="upload" style="margin-left: 50px; padding: 8px 20px" type="primary">上传</el-button> -->
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" style="padding:8px 15px;" @click="handelSure">确 定</el-button>
            <el-button style="padding:8px 15px" @click="handelBure">取 消</el-button>
          </span>
        </el-dialog>
        <el-button @click="downl" type="primary" style="padding: 10px 20px; margin-top: 20px">下载</el-button>
        <el-form :inline="true" style="float: right;">
          <el-form-item>
            <el-pagination style="margin-top: 20px;" background layout="total, prev, pager, next, jumper" :total="paginationData.total"
              @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="paginationData.currentPage"
              :page-size="paginationData.pageSize">
            </el-pagination>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
  import { mapActions } from "vuex";
  export default {
    data() {
      let checkAge = (rule, value, callback) => {
        let regRule = /[^\d\$]/g;
        if (!value) {
          return callback(new Error("输入不能为空"));
        } else if (regRule.test(value)) {
          return callback(new Error("请输入正整数"));
        }
        callback();
      };
      return {
        formInline: {
          coceralName: "",
          exhibitionAreaName: "",
          exhibitionSession: "",
          companyName: "",
          dealClusterName: "",
          publicityStatus: ""
        },
        rules: {
          listA: [{ validator: checkAge, trigger: "blur" }]
        },
        formData: {
          listA: ""
        },
        fileList: [],

        isShow: true,
        loadinga: true,
        form: {
          publishWay: [],
          filename: []
        },
        fileId: "",
        lastCheckData: [], // 上次保存的值
        selectData: [], // 选中的数据索引
        checkList: [], // 临时选中的值
        dialogVisible: false,
        brandApplyId: [],
        lastIndex: "",
        getList: [],
        publicityStatus: [],
        formLabelWidth: "120px",
        paginationData: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        pageData: {
          current: 1,
          size: 10
        },
        add: [],
        activeName: "first",
        tableData: []
      };
    },
    created() {
      this.handelReceiv(this.pageData);
    },
    computed: {
      getRowKey(row) {
        // 获取row的key值
        return row.applyBoothNumber; // 这里举例获取姓名
      }
    },
    methods: {
      ...mapActions("foreignDepartment", [
        "getPublicNotices",
        "postPublicPotices",
        "postPublicSave",
        "getPublicUpload"
      ]),
      success(val) {
        this.fileId = val.fileId;
        this.form.filename = val.data.fileName;
      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除？`);
      },
      // 接受后台数据
      handelReceiv(val) {
        this.getPublicNotices(val)
          .then(res => {
            this.loadinga = false;
            this.paginationData.currentPage = res.current;
            this.paginationData.pageSize = res.size;
            this.paginationData.total = res.total;
            let skb = JSON.parse(JSON.stringify(res.records));
            for (let i = 0, len = skb.length; i < len; i++) {
              skb[i]["edit"] = false;
            }
            this.tableData = skb;
            let arr = [];
            if (this.selectData[this.paginationData.currentPage - 1]) {
              this.selectData[
                this.paginationData.currentPage - 1
              ].forEach((item, index) => {
                arr.push(this.tableData[item]);
              });
            }
            setTimeout(() => {
              this.toggleSelection(arr);
            }, 0);
          })
          .catch(e => { });
      },
      handleClick() { },
      // 查询
      onSubmit() {
        this.selectData = [];
        this.lastIndex = "";
        let obja = {
          coceralName: this.formInline.coceralName,
          exhibitionAreaName: this.formInline.exhibitionAreaName,
          exhibitionSession: this.formInline.exhibitionSession,
          companyName: this.formInline.companyName,
          dealClusterName: this.formInline.dealClusterName,
          publicityStatus: this.formInline.publicityStatus,
          current: 1,
          size: 10
        };
        this.handelReceiv(obja);
      },
      // 复选框禁用
      checkBox(row, index) {
        // console.log(row, index);
        let val = row.publicityStatus - 0;
        if (val === 0) {
          return 1;
        } else {
          return 0;
        }
      },
      // 分页
      handleCurrentChange(current) {
        let obja = {
          coceralName: this.formInline.coceralName,
          exhibitionAreaName: this.formInline.exhibitionAreaName,
          exhibitionSession: this.formInline.exhibitionSession,
          companyName: this.formInline.companyName,
          dealClusterName: this.formInline.dealClusterName,
          publicityStatus: this.formInline.publicityStatus,
          current: current,
          size: 10
        };
        this.handelReceiv(obja);
      },
      handleSelectionDhange() { },
      // 选中的数据索引获取
      handleSelectionChange(selection, row) {
        this.publicityStatus = row.publicityStatus;
        this.selectData[this.paginationData.currentPage - 1] = []; // 初始化
        this.tableData.forEach((item, index) => {
          for (let i = 0; i < selection.length; i++) {
            // 遍历已选的数据重新填充数组
            if (item.brandApplyId === selection[i].brandApplyId) {
              // 补充：注意这里的判断必须要保证判断的值是唯一的（不一定要拿获取的值进行比较，比如ID值），不然遍历的时候会都添加进去
              this.selectData[this.paginationData.currentPage - 1].push(index);
            }
          }
        });
      },
      // 判断是否选中
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      // 选中的数据获取
      handleCheckedChange(rows) {
        this.checkList = []; // 初始化，防止重复添加
        // this.publicityStatus = [];
        this.brandApplyId = [];
        if (rows) {
          rows.forEach(row => {
            // 遍历已选择的数据
            if (row) {
              this.checkList.push(row.publicityStatus);
              
              this.brandApplyId.push(row.brandApplyId);
            }
          });
        }
      },
      // 公示
      publi() {
        this.lastCheckData[this.paginationData.currentPage - 1] = this.checkList; // 保存当前页获取的值
        //降维 --- 二维数组降至一维数组
        this.getList = Array.prototype.concat.apply([], this.lastCheckData);
        // this.add = this.getList.join(",");
        if (this.getList.length === 0) {
          this.$message("请勾选");
        } else if (this.publicityStatus === "1") {
          this.$message("此数据已公示，请正确勾选");
        } else {
          this.dialogVisible = true;
        }

      },
      // 下载
      downl() { },
      // 确定
      handelSure() {
        let arr = {
          schemePublicityList: [],
          publishLog: {
            publishWay: this.form.publishWay.join(","),
            attachment: "1.txt"
          }
        };
        for (let i = 0, len = this.brandApplyId.length; i < len; i++) {
          let listb = {
            "brandApplyId": this.brandApplyId[i]
          };
          arr.schemePublicityList.push(listb);
        }
        if (this.form.publishWay.length === 0) {
          this.$message("请勾选");
        } else {
          this.postPublicPotices(arr)
            .then(res => {
              this.onSubmit();
              this.dialogVisible = false;
              this.form.publishWay = [];
            })
            .catch(e => { });
        }
      },
      // 上传
      upload() {
      },
      // 取消
      handelBure() {
        this.dialogVisible = false;
        this.form.publishWay = [];
      },
      // 关闭弹窗
      handelCure() {
        this.dialogVisible = false;
        this.form.publishWay = [];
      },
      // 修改
      handeldeposit(id, data) {
        this.isShow = false;
        // this.formData.listA = data;
        if (this.lastIndex === "" || this.lastIndex === id) {
          this.tableData[id]["edit"] = true;
          this.formData.listA = data;
          this.lastIndex = id;
        } else {
          this.$confirm("是否放弃本次修改")
            .then(() => {
              for (let i = 0; i < this.tableData.length; i++) {
                this.tableData[i]["edit"] = false;
                this.formData.listA = data;
              }
              this.tableData[id]["edit"] = true;
              this.lastIndex = id;
              // this.formData.listA = "";
            })
            .catch(() => {
              this.$message.info("已取消本次操作");
            });
        }
      },
      // 保存
      dandeldeposit(val, apo) {
        this.$refs[apo].validate(valid => {
          if (valid) {
            this.isShow = true;
            this.brandApplyId = val.brandApplyId;
            let obj = {
              brandApplyId: this.brandApplyId,
              roleId: 4,
              provisionNumber: this.formData.listA,
              editType: 2
            };
            this.postPublicSave(obj)
              .then(res => {
                this.lastIndex = "";
                this.formData.listA = "";
                // this.handelReceiv({
                //   current: 1,
                //   size: 10
                // });
                this.onSubmit();
                // this.handelReceiv();
              })
              .catch(e => { });
          } else {
            this.$message("请输入正整数");
            return false;
          }
        });
      },
      handleSizeChange() { }
    }
  };
</script>
<style scoped>
  .call {
    padding: 8px 23px;
  }

  .but {
    float: right;
    margin-right: 190px;
  }

  .widths {
    width: 120px;
  }

  .el-form-item>>>.el-form-item__content {
    margin-left: 0 !important;
  }

  .el-table>>>.cell {
    overflow: visible !important;
  }
</style>