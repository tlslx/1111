<template>
  <el-tabs v-model="activeName" v-loading.fullscreen="fullLoading">
    <el-tab-pane label="设置切块支持数" name="first">
      <!-- form表单 -->
      <el-form :inline="true" :model="formData" size="small">
        <el-form-item label="届数">
          <el-select v-model="formData.exhibitionSession" clearable>
            <el-option
              v-for="(item, index) in formOptionOne"
              :key="index"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="期数">
          <el-select v-model="formData.exhibitionPeriod" clearable>
            <el-option
              v-for="(item, index) in formOptionTwo"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <drop-down-list :selectName="delet" @delegation="dataDelegation"></drop-down-list>
        <el-form-item class="floatRight">
          <el-button class="formStyle floatLeft" type="primary" @click="onSearch">查询</el-button>
          <el-button class="formStyle floatLeft" type="danger">获取出口额数据</el-button>
          <el-button class="formStyle" type="primary" @click="handInput">导入切块支持数</el-button>
        </el-form-item>
      </el-form>
      <!-- table表格 -->
      <el-table :data="tableData" style="width: 100%" size="small" border>
        <el-table-column align="center" min-width="120" label="届数" prop="exhibitionSession"></el-table-column>
        <el-table-column align="center" min-width="120" label="期数" prop="exhibitionPeriod">
          <template slot-scope="scope">
            {{scope.row.exhibitionPeriod | expStatus}}
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="120" label="交易团" prop="delegationName"></el-table-column>
        <el-table-column align="center" min-width="120" label="保留展位数" prop="reserveNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="切块支持数" prop="supportNumber"></el-table-column>
        <el-table-column align="center" min-width="120" label="出口额数据" prop=""></el-table-column>
        <!-- <el-table-column
          v-for="(item, index) in tableDataMain"
          :key="index"
          :label="item.label"
          :prop="item.prop"
          align="center"
        ></el-table-column> -->
      </el-table>
      <!-- 清空按钮 -->
      <el-button class="paginationTop floatLeft formStyle paginLeft" size="small" type="primary" @click="clearTable">清空</el-button>
      <!-- 分页 -->
      <div class="floatRight paginationTop">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="paginationData.total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="paginationData.pageSizes"
          :current-page="paginationData.currentPage"
          :pager-count="paginationData.pagerCount"
          :page-size="paginationData.pageSize"
        ></el-pagination>
      </div>
      <!-- 导入 -->
      <el-dialog title="导入" :visible.sync="isUp" v-if="isUp">
        <el-form :model="fileForm" ref="fileForm" :rules="fileRule">
          <el-form-item label="文件选择：" prop="chooseFileName">
            <el-upload ref="upload" action="" accept=".xls, .xlsx" :http-request="uploadFileMethod" :on-change="handleChange" :auto-upload="false" :show-file-list="false">
              <el-input placeholder="请选择文件" v-model="fileForm.chooseFileName" readonly></el-input>
              <div slot="tip" class="el-upload__tip">只能上传 xls / xlsx 文件，且不超过10M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="模板下载：">
            <a href="javascript:;" @click="handleDownloadFile">模板文件点击下载</a>
          </el-form-item>
        </el-form>
        <div class="total-footer">
          <el-button type="primary" size="medium" @click="toUpload('fileForm')">导入</el-button>
          <el-button size="medium" @click="isUp = false;">取消</el-button>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import DropDownList from "@/components/project/common1/dropDownList.vue";
export default {
  components: {
    "drop-down-list": DropDownList
  },
  data() {
    return {
      obj: {
        // orderModelField: [
        //   {
        //     orderByField: "",
        //     asc: false
        //   }
        // ],
        // customQueryParams: [],
        // pageIndex: 1,
        // pageSize: 10
        current: 1,
        size: 10
      },
      isUp: false,
      fileForm: {
        chooseFileName: ''
      },
      fileRule: {
        chooseFileName: [{ required: true, message: '请选择需上传的文件', trigger: 'change' }]
      },
      fullLoading: true, //控制加载
      dic: [], // 字典
      // 下拉框数据届数
      formOptionOne: [],
      // 下拉框数据期数
      formOptionTwo: [],
      // 下拉框数据交易团
      formOptionThree: [],
      // 表单
      formData: {
        exhibitionSession: "", // 展届
        exhibitionPeriod: "", // 展期
        delegationId: "" // 交易团
      },
      // 表格控制
      tableDataMain: [
        { label: "届数", prop: "exhibitionSession" },
        { label: "期数", prop: "exhibitionPeriod" },
        { label: "交易团", prop: "delegationName" },
        { label: "保留展位数", prop: "reserveNumber" },
        { label: "切块支持数", prop: "supportNumber" },
        { label: "出口额数据", prop: "" }
      ],
      // 表格
      tableData: [],
      delet: { name: "交易团" },
      // 分页
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      activeName: "first"
    };
  },
  filters: {
    expStatus(val) {
      if (val === "1") {
        return "第一期";
      } else if (val === "2") {
        return "第二期";
      } else if (val === "3") {
        return "第三期";
      }
    }
  },
  async created () {
    this.formOptionTwo = await kindo.dictionary.get("exhibitionPeriodNum"); //展期
    this.formOptionThree = this.dictionaryData.delegation;
  },
  mounted() {
    this.getsysExhibitions().then(res => {
      let resData = JSON.parse(JSON.stringify(res));
      for (let i = 0; i < resData.data.length; i++) {
        this.formOptionOne.push(resData.data[i].exhibitionNum - 0);
      }
      let rul = (a, b) => a - b;
      this.formOptionOne = this.formOptionOne.sort(rul);
    });
    this.getListPage(this.obj);
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("baseAccounting", [
      "getlistOrdinary", // 查询切块支持数
      "deleteordinaryBase", // 清空切块支持数
      "addimportSupportNumber" // 导入切块支持数
    ]),
    ...mapActions("nainformation", [
      "getsysExhibitions" // 获取所有展届信息
    ]),
    // 获取页面数据
    getListPage(Url) {
      // let getUrl = encodeURI(JSON.stringify(Url));
      this.getlistOrdinary(Url)
        .then(res => {
          this.fullLoading = false;
          let resData = JSON.parse(JSON.stringify(res));
          this.tableData = resData.records;
          this.paginationData.total = resData.total;
          this.paginationData.currentPage = resData.current;
          this.paginationData.pageSize = resData.size;
          // for (let i = 0; i < this.tableData.length; i++) {
          //   let option = {
          //     label: this.tableData[i].exhibitionSession + "届",
          //     value: this.tableData[i].exhibitionSession
          //   };
          //   this.formOptionOne.push(option);
          // }
          // // 数组去重
          // let hash = {};
          // this.formOptionOne = this.formOptionOne.reduce(function(item, next) {
          //   hash[next.value] ? '' : hash[next.value] = true && item.push(next);
          //   return item;
          // }, []);
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        // orderModelField: [
        //   {
        //     orderByField: "",
        //     asc: false
        //   }
        // ],
        // customQueryParams: [],
        // pageIndex: 1,
        // pageSize: 10
        current: 1,
        size: 10
      };
      // let key = Object.keys(this.formData);
      // for (let i = 0; i < key.length; i++) {
      //   if (this.formData[key[i]] !== "") {
      //     let aFist = {
      //       name: key[i],
      //       findType: "EQ",
      //       joinType: "And",
      //       dataType: "Default",
      //       values: [this.formData[key[i]]],
      //       description: ""
      //     };
      //     this.obj.customQueryParams.push(aFist);
      //   }
      // }
      let key = Object.keys(this.formData);
      for (let i = 0; i < key.length; i++) {
        let aFirst = key[i];
        let bSecend = this.formData[key[i]];
        if (bSecend !== "") {
          this.obj[aFirst] = bSecend;
        }
      }
      this.getListPage(this.obj);
    },
    // 打开导入弹框
    handInput() {
      this.fileForm.chooseFileName = '';
      this.isUp = true;
    },
    // 模板下载
    handleDownloadFile() {
      window.open(`${process.env.API_NA_URL}/api/ordinaryBaseCount/importSupportNumber/download?token=${localStorage.getItem("USER_TOKEN")}`, '_blank');
    },
    // 文件改变
    handleChange(file, fileList) {
      this.fileForm.chooseFileName = file.name;
      let testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);				
      const extension = testmsg === 'xls';
      const extension2 = testmsg === 'xlsx';
      const isLt2M = file.size / 1024 / 1024 < 10;    //这里做文件大小限制
      if (!extension && !extension2) {
        this.$message({
          message: '上传文件只能是 xls、xlsx格式!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
        this.fileForm.chooseFileName = '';
      }
      if (!isLt2M) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        });
        fileList.splice(0, fileList.length);
        this.fileForm.chooseFileName = '';
      }
    },
    // 导入切块支持数
    uploadFileMethod(param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      let fullScreenloading = this.$loading({ fullscreen: true });
      this.addimportSupportNumber(formData).then(res => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
        this.$message({
          type: "success",
          message: "导入成功"
        });
        this.isUp = false;
        this.getListPage(this.obj);
      }).catch(e => {
        this.$nextTick(() => { 
          fullScreenloading.close();
        });
      });
    },
    // 文件上传
    toUpload(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$refs.upload.submit();
        }
      });
    },
    // 获取组件数据
    dataDelegation(code, name) {
      this.formData.delegationId = code;
    },
    // 清空
    clearTable() {
      this.$confirm('是否确认清空所有数据?', '清空', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteordinaryBase()
        .then(res => {
          this.$message({
            type: 'success',
            message: '确认清空成功!'
          });
          this.getListPage(this.obj);
        })
        .catch(e => {});
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消确认'
        });          
      });
    },
    // 分条/页
    handleSizeChange(val) {
      this.obj.size = val;
      this.getListPage(this.obj);
    },
    // 分页
    handleCurrentChange(val) {
      this.obj.current = val;
      this.getListPage(this.obj);
    }
  }
};
</script>
<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.paginLeft {
  margin-left: 30px;
}
.impfloat {
  margin-left: 10px;
  display: inline-block;
}
.floatLeft {
  float: left;
}
.total-footer{
  text-align: center;
  padding: 20px 0;
}
</style>
