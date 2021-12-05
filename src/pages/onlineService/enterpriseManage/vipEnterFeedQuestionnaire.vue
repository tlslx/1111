/**
 * @file VIP企业反馈调查问卷
*/
<style scoped>
.el-btn-left{
  float: left;
}
.el-btn-right{
  float: right;
}
.el-btn-primary{
  width: 100px;
}
.caption{
  width: 98%;
  padding: 1%;
  background: #eee;
}
.content{
  width: 80%;
  padding: 1%;
  margin: 0 auto;
}
.mail-btn{
  width: 40%;
  margin: 0 auto;
}
</style>
<style>
.el-btn-left .el-input__inner,
.el-btn-right .el-input__inner{
  height: 32px !important;
}
</style>
<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <!-- 收件箱 -->
    <el-tab-pane label="收件箱" name="first">
      <div v-if="!isDetail">
        <div class="el-btn-left">
          <el-button type="primary" class="el-btn-primary">删除</el-button>
          <el-button type="primary" class="el-btn-primary">回复</el-button>
          <el-button type="primary">全部标记为已读</el-button>
          <el-select v-model="inboxSeclect" placeholder="标记为" style="width:150px;">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </div>
        <div class="el-btn-right">
          发件人:
          <el-input v-model="input" placeholder="请输入内容" style="width:150px;"></el-input>
          <el-button type="danger" class="el-btn-primary">搜索</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData1" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection"  width="55"></el-table-column>
          <el-table-column width="55">
            <template slot-scope="scope">
              <i class="el-icon-message"></i>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="发件人"></el-table-column>
          <el-table-column prop="name" label="标题">
            <template slot-scope="scope">
              <p @click="toDetail(scope.row)">{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="时间"></el-table-column>
          <el-table-column prop="address" label="已被标记"></el-table-column>
        </el-table>
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange">
        </pagination>
      </div>
      <div v-else>
        <el-form label-width="100px" class="caption">
          <el-form-item>{{ mailDetail.name }}
            <span style="float:right;">{{ mailDetail.date }}</span>
          </el-form-item>
          <el-form-item label="发件人：">{{ mailDetail.name }}</el-form-item>
          <el-form-item label="收件人：">{{ mailDetail.name }}</el-form-item>
        </el-form>
        <div class="content">{{ mailDetail.address }}</div>
        <div class="mail-btn">
          <el-button type="primary" class="el-btn-primary" @click="reply">回复</el-button>
          <el-button class="el-btn-primary" @click="cancel">取消</el-button>
        </div>
      </div>
    </el-tab-pane>
    <!-- 发件箱 -->
    <el-tab-pane label="发件箱" name="second">
      <div v-if="!isDetail">
        <div class="el-btn-left">
          <el-button type="primary" class="el-btn-primary">删除</el-button>
          <el-button type="primary" class="el-btn-primary">回复</el-button>
        </div>
        <el-table ref="multipleTable" :data="tableData2" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection"  width="55"></el-table-column>
          <el-table-column prop="name" label="收件人"></el-table-column>
          <el-table-column prop="name" label="标题">
            <template slot-scope="scope">
              <p @click="toDetail(scope.row)">{{ scope.row.name }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="时间"></el-table-column>
          <el-table-column prop="address" label="已被标记"></el-table-column>
        </el-table>
        <pagination class="page-bar" :pageInfo="pageInfo" @handle-size-change="handleSizeChange"
          @handle-current-change="handleCurrentChange">
        </pagination>
      </div>
      <div v-else>
        <el-form label-width="100px" class="caption">
          <el-form-item>{{ mailDetail.name }}
            <span style="float:right;">{{ mailDetail.date }}</span>
          </el-form-item>
          <el-form-item label="发件人：">{{ mailDetail.name }}</el-form-item>
          <el-form-item label="收件人：">{{ mailDetail.name }}</el-form-item>
        </el-form>
        <div class="content">{{ mailDetail.address }}</div>
        <div class="mail-btn">
          <el-button type="primary" class="el-btn-primary" @click="reply">回复</el-button>
          <el-button class="el-btn-primary" @click="cancel">取消</el-button>
        </div>
      </div>
    </el-tab-pane>
    <!-- 通知 -->
    <el-tab-pane label="通知" name="third">
      <div v-if="!isDetail">
        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column type="index" label="序号" width="55"></el-table-column>
          <el-table-column prop="name" label="标题"></el-table-column>
          <el-table-column prop="address" label="发送时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button @click="toDetail(scope.row)" type="text" size="small">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-else>
        <el-form label-width="100px" class="caption">
          <el-form-item>{{ mailDetail.name }}
            <span style="float:right;">{{ mailDetail.date }}</span>
          </el-form-item>
          <el-form-item label="发件人：">{{ mailDetail.name }}</el-form-item>
          <el-form-item label="收件人：">{{ mailDetail.name }}</el-form-item>
        </el-form>
        <div class="content">{{ mailDetail.address }}</div>
        <div class="mail-btn">
          <el-button type="primary" class="el-btn-primary" @click="reply">回复</el-button>
          <el-button class="el-btn-primary" @click="cancel">取消</el-button>
        </div>
      </div>
    </el-tab-pane>
    <!-- 写站内信 -->
    <el-tab-pane label="写站内信" name="fourth">
      <el-form ref="form" :model="form" label-width="120px">
        <el-form-item label="收件方：">
          <el-select v-model="form.addressee" multiple placeholder="请选择">
            <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主题：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card"
          :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
      </el-form-item>
        <el-form-item label="上传附件：">
          <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-change="handleChange">
            <el-button size="small" type="primary">点击上传附件</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">发送</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
import pagination from "@/components/project/onlineService/common/pagination.vue";
export default {
  components: {
    'pagination': pagination
  },
  data() {
    return {
      isDetail: false,
      mailDetail: {},
      //tab默认
      activeName: 'first',
      //分页
      pageInfo: {
        "currentPage": 1,
        "pageSize": 5,
        "total": 0,
        "style": "padding: 10px 0;text-align: right;"
      },
      //标记选项
      options: [
        {
          value: '选项1',
          label: '已读'
        },
        {
          value: '选项2',
          label: '未读'
        }
      ],
      option: [
        {
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }
      ],
      value5: [],
      //标记选项 默认
      inboxSeclect: '',
      //搜索输入
      input: '',
      //收件箱表格数据
      tableData1: [
        {
          date: '2016-05-03',
          name: '王虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      //发件箱表格数据
      tableData2: [
        {
          date: '2016-05-03',
          name: '王小',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      //通知表格数据
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      //已勾选数组存储
      multipleSelection: [],
      //变单内容
      form: {
        name: '',
        region: '',
        desc: '',
        addressee: ''
      },
      //上传图片
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  methods: {
    // tab切换事件
    handleClick(tab, event) {},
    //table 勾选事件
    handleSelectionChange(val) {
      // this.multipleSelection = val;
    },
    //点击进入详情页
    toDetail(row) {
      this.mailDetail = row;
      this.isDetail = true;
    },
    //分页事件
    handleSizeChange() {},
    handleCurrentChange() {},
    //写站内信 表单提交
    onSubmit() {},
    //上传附件
    handleChange(file, fileList) {
      this.fileList3 = fileList.slice(-3);
    },
    //上传图片---删除
    handleRemove(file, fileList) {},
    //上传图片---预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    reply() {
      this.activeName = "fourth";
    },
    cancel() {
      this.isDetail = false;
    }

  }
};
</script>
