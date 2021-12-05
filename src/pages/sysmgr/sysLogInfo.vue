<template>
  <el-page ref="businessLog">
    <template slot="header">
      <!--页面对话框-->
      <el-dialog title="业务日志详情" width="60%" :visible.sync="isShowDetailDialog">
        <div class="dialogBox">
          <el-row class="dialogRow">
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">日志ID：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.operatorId}}</div>
            </el-col>
          </el-row>
          <el-row class="dialogRow">
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">用户访问的IP：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.ip}}</div>
            </el-col>
            <!-- <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">接口名称：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.apiName}}</div>
            </el-col> -->
          </el-row>
          <el-row class="dialogRow">
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">请求的url：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.url}}</div>
            </el-col>
            <!-- <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">接口名称：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.apiName}}</div>
            </el-col> -->
          </el-row>
          <el-row class="dialogRow">
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">模块名称：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.module}}</div>
            </el-col>
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">操作结果：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.success?'已成功':'失败'}}</div>
            </el-col>
          </el-row>
          <el-row class="dialogRow">
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">用户名称：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.operator}}</div>
            </el-col>
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">所属机构：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.departmentName}}</div>
            </el-col>
          </el-row>
          <el-row class="dialogRow">
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">登录账号：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.operatorAccount}}</div>
            </el-col>
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">角色身份：</div>
            </el-col>
            <el-col :span="6">
              <div :title="detailData.roleName">{{detailData.roleName !== null ? detailData.roleName.length > 50 ? detailData.roleName.substring(0,50) + "..." : detailData.roleName : ""}}</div>
            </el-col>
          </el-row>
          <el-row class="dialogRow">
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">操作时间：</div>
            </el-col>
            <el-col :span="6">
              <div>{{detailData.date}}</div>
            </el-col>
            <el-col :span="4" class="textAlignRight">
              <div class="dialogLabelSpan">操作内容：</div>
            </el-col>
            <el-col :span="6">
              <i class="el-icon-circle-plus operateIcon" @click="toggleOperateContent"></i>
            </el-col>
          </el-row>
          <el-row v-if='isShowOperateContent'>
            <el-col :span="24">
              <el-input type="textarea" :rows="2" v-model="detailData.content" disabled>
              </el-input>
            </el-col>
          </el-row>
        </div>
      </el-dialog>
      <!--按钮栏-->
      <kindo-box title="业务日志" icon="fa-search">
        <el-form :model="forms" label-position="right" label-width="100px" inline @submit.native.prevent @keyup.enter.native="onQuery" :rules="logInfoRules" ref='logInfoForm'>
          <el-form-item label="操作时间：" prop="operateDate">
            <el-date-picker v-model="operateDate" placeholder="" type="datetimerange" start-placeholder="开始日期" end-placeholder="结束日期" value-format='yyyy-MM-dd HH:mm:ss'></el-date-picker>
          </el-form-item>
          <el-form-item label="用户名称：" prop="operator">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.operator" placeholder="请输入用户名称" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="IP：" prop="ip">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.ip" placeholder="请输入ip" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item label="模块名称：" prop="exhibitionAreaName">
            <el-select v-model="forms.module" placeholder="请选择模块名称" clearable filterable>
              <el-option v-for="(item,index) in moduleOptions" :key="index" :value="item.value" :disabled="item.disable">{{item.value}}</el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="操作类型：" prop="name">
            <el-input @blur="(ev)=>ev.target.value = ev.target.value.trim()" v-model="forms.name" placeholder="请输入操作类型" class="inputclass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button icon="el-icon-search" type="primary" @click="onQuery">查询</el-button>
            <el-button @click="onResetQuery">重置</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <template slot="body">
      <!--数据区域-->
      <el-page-data>
        <!--左侧字典树-->
        <kindo-box>
          <kindo-table ref="table" :cell-style="isCenter" :url="api.getData" :queryParam="form">
            <el-table-column label="用户名称" min-width="200" prop="operator" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="operatorAccount" label="登录账号" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="ip" label="访问IP" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="date" label="操作时间" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="module" label="模块名称" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column prop="name" label="操作类型" min-width="200" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="180" align="center" fixed='right'>
              <template slot-scope="scope">
                <el-button v-if="right('view')" type="text" title="查看" @click="showDetail(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    return {
      api: {
        getData: kindo.config.api.comsUrl + '/api/operateLog/query',
        queryModule: kindo.config.api.comsUrl + '/api/operateLog/queryModule',
        // queryName: 'http://10.28.124.246:9016/api/operateLog/queryName'
        queryName: kindo.config.api.comsUrl + '/api/operateLog/queryName'
      },
      operateDate: '',
      activeName: 'businessLog',
      forms: {
        operator: '',
        module: '',
        startDate: '',
        endDate: '',
        ip: '',
        name: ''
        // menuName: '',
        // apiName: '',
        // keyWord: '',
        // keyContent: ''
      },
      logInfoRules: {
        // ip: [{ pattern: /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/, message: 'ip地址格式不合法', trigger: "blur" }]
      },
      keyWordOption: ['1', '2'],
      moduleOptions: [],
      // actionOptions: [],
      tableData: [],
      loading: false,
      isShowDetailDialog: false,
      isShowOperateContent: false,
      detailData: {
        apiName: '',
        success: true, //操作成功标识
        ip: '', //访问者ip
        url: '',  //访问url
        module: '', //操作模块
        name: '', //操作名称
        description: '',  //操作描述
        content: '', //操作内容
        operator: '', //操作人
        date: '', //操作时间
        operatorId: '', //操作人编号
        operatorAccount: '', //操作人账号号
        departmentId: '', //组织机构编号
        departmentName: '', //组织机构名称
        roleId: '', //角色编号
        roleName: '', //角色名称
        requestParams: '',  //请求参数
        system: ''  //操作系统
      },
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
        pageSizes: [10, 15, 20, 50]
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

  created() {
    //请求模块名
    this.$http.get(this.api.queryModule)
      .then(res => {
        if (res.length > 0) {
          res.forEach(r => {
            this.moduleOptions.push({
              value: r,
              disable: false
            });
          });
        }
      })
      .catch(err => {
        // console.log(err);
      });
    //请求操作类型
    // this.$http.get(this.api.queryName)
    //   .then(res => {
    //     if (res.length > 0) {
    //       res.forEach(r => {
    //         this.actionOptions.push({
    //           value: r,
    //           disable: false
    //         });
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     // console.log(err);
    //   });
    this._forms = Object.assign({}, this.forms);
    // this.serchLog();
  },

  mounted() {
    this.$nextTick(function () {
      this.onResetQuery();
    });
  },

  methods: {
    onQuery() {
      this.$refs.logInfoForm.validate(valid => {
        if (valid) {
          this.$refs.table.loadData();
        }
      });
    },
    onResetQuery() {
      this.forms = Object.assign({}, this._forms);
      this.forms.startDate = '';
      this.forms.endDate = '';
      this.operateDate = '';
      this.$nextTick(function () {
        this.$refs.table.reloadData();
      });
    },
    isCenter({ row, column, rowIndex, columnIndex }) {
      return "text-align: center";
    },
    serchLog() {
      const json = {
        condition: {
          module: this.form.module,
          startDate: '',
          endDate: '',
          operator: this.form.operator
        },
        current: this.pagination.currentPage,
        size: this.pagination.pageSize
      };
      if (this.form.operateDate.length > 0) {
        json.condition.startDate = this.form.operateDate[0];
        json.condition.endDate = this.form.operateDate[1];
      }
      this.loading = true;
      this.$http.get(this.api.getData, { json })
        .then(res => {
          this.tableData = res.records;
          this.pagination.total = res.total;
          this.loading = false;
        })
        .catch(err => {
          // console.log(err);
          this.loading = false;
        });
    },
    showDetail(row) {
      // console.log(row);
      this.isShowDetailDialog = true;
      this.detailData = row;
    },
    toggleOperateContent() {
      this.isShowOperateContent = !this.isShowOperateContent;
    },
    handleSizeChange(val) {
      this.pagination.pageSize = val;
      this.serchLog();
    },
    handleCurrentChange(val) {
      this.pagination.currentPage = val;
      this.serchLog();
    }
  },
  watch: {
    "operateDate"(v) {
      if (v) {
        this.forms.startDate = v[0];
        this.forms.endDate = v[1];
      } else {
        this.operateDate = [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.dialogBox {
  margin-top: 10px;
  height: 400px;

  .dialogRow {
    margin-bottom: 20px;
    .textAlignRight {
      text-align: right;
    }
    .el-col {
      & > div {
        min-height: 1px;
      }
    }
  }
  .dialogLabelSpan {
    margin-right: 10px;
    color: #ccc;
  }
  .operateIcon {
    color: #2b579a;
    cursor: pointer;
  }
}
</style>

