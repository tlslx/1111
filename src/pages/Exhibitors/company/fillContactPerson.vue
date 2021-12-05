<style scoped>
.wids{
  width:230px;
}
</style>
<template>
  <el-tabs v-model="activeName" class="businessReview">
    <el-tab-pane label="填写联系人" name="first"></el-tab-pane>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="联系人">
        <el-input class="wids" v-model="formInline.licenseNo"></el-input>
      </el-form-item>
      <el-form-item label="部门">
        <!-- <el-select v-model="formInline.region" placeholder="请选择" :clearable='true'> -->
        <el-input class="wids" v-model="formInline.region"></el-input>
          <!-- <el-option v-for="(item, index) in dataList" :key="index" :label="item.label" :value="item.value"></el-option> -->
          <!-- <el-option label="区域二" value="beijing"></el-option> -->
        <!-- </el-select> -->
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
        <el-button type="primary" @click="increase">新增</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="新增联系人" :visible.sync="dialogFormVisible">
      <el-form :label-position="labelPosition" :label-width="formLabelWidth" :model="form" :rules="rulesDate" ref="form">
        <el-form-item label="联系人：" >
          <el-input v-model="form.name" class="wids"></el-input>
        </el-form-item>
        <el-form-item label="职务：" >
          <el-input v-model="form.job" class="wids"></el-input>
        </el-form-item>
        <el-form-item label="手机：" >
          <el-input v-model="form.phone" class="wids"></el-input>
        </el-form-item>
        <el-form-item label="传真：" >
          <el-input v-model="form.fax" class="wids"></el-input>
        </el-form-item>
        <el-form-item label="部门：" >
          <el-input v-model="form.department" class="wids"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱：" >
          <el-input v-model="form.mail" class="wids"></el-input>
        </el-form-item>
        <el-form-item label="固话：" >
          <el-input v-model="form.fixed" class="wids"></el-input>
        </el-form-item>
        <!-- <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="takeAway(form)">取 消</el-button>
        <el-button type="primary" @click="determine(form)">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="tableData" style="width: 100%"> 
      <el-table-column prop="name" label="联系人" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
              <el-form-item prop="recommendCentralchannel">
                <el-input v-model.trim="editform.name"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span v-else>{{scope.row.name}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="job" label="职务" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
              <el-form-item prop="recommendCentralchannel">
                <el-input v-model.trim="editform.job"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span v-else>{{scope.row.job}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="手机" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
              <el-form-item prop="recommendCentralchannel">
                <el-input v-model.trim="editform.phone"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span v-else>{{scope.row.phone}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fax" label="传真" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
              <el-form-item prop="recommendCentralchannel">
                <el-input v-model.trim="editform.fax"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span v-else>{{scope.row.fax}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="department" label="部门" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
              <el-form-item prop="recommendCentralchannel">
                <el-input v-model.trim="editform.department"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span v-else>{{scope.row.department}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="mail" label="电子邮箱" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
              <el-form-item prop="recommendCentralchannel">
                <el-input v-model.trim="editform.mail"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span v-else>{{scope.row.mail}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="fixed" label="固话" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.edit">
            <el-form :model="editform" :rules="editrule" ref="editref" label-width="0px">
              <el-form-item prop="recommendCentralchannel">
                <el-input v-model.trim.number="editform.fixed" maxlength="11"></el-input>
              </el-form-item>
            </el-form>
          </div>
          <span v-else>{{scope.row.fixed}}</span>
        </template>
      </el-table-column>
      <el-table-column  label="操作" align="center">
        <template slot-scope="scope">
          <div class="bm bm-pc">
            <el-button type="text" v-if="!scope.row.edit" @click="compile(scope.row, scope.$index)" >编辑</el-button>
            <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'editref')">保存</el-button>
            <!-- :disabled="scope.row.examineStatus === '1'" -->
            <el-button  type="text" size="small" @click="remove(scope.row)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfoData.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageInfoData.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfoData.total">
    </el-pagination>
 </el-tabs>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      rulesDate: {},
      labelPosition: 'right',
      form: {
        ifoExhibitionAgentId: '',
        name: '',
        job: '',
        phone: '',
        fax: '',
        department: '',
        mail: '',
        fixed: ''
      },
      editrule: {},
      editform: {
        fixed: '',
        mail: '',
        name: '',
        job: '',
        phone: '',
        fax: '',
        department: ''
      },
      formLabelWidth: '150px',
      dialogFormVisible: false,
      activeName: 'first',
      pageInfoData: {
        currentPage: 1,
        pageSize: 10,
        total: 1
      },
      tableData: [
      ],
      obj: {
        current: 1,
        size: 10
      },
      formInline: {
        licenseNo: '',
        region: ''
      },
      dataList: [
        {
          value: '选项1',
          label: '黄金糕'
        }, 
        {
          value: '选项2',
          label: '双皮奶'
        }, 
        {
          value: '选项3',
          label: '蚵仔煎'
        }, 
        {
          value: '选项4',
          label: '龙须面'
        }, 
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      id: '',
      lastIndex: '',
      lastSalesList: []
    };
  },
  created() {
    this.id = localStorage.getItem('exhibitionAgentId');
    this.obj.exhibitionAgentId = this.id;
    this.handelGetProxyContactList(this.obj);
  },
  methods: {
    ...mapActions("managemeAgentnt", [
      "postDeleteProxyContact",    // 删除代理联系人
      "postAgentContactPerson",    // 新增招展代理联系人
      "getProxyContactList",       // 获取代理联系人列表 
      "postSaveProxyContact"       // 保存代理联系人
    ]),
    // 初始化数据
    handelGetProxyContactList(obj) {
      this.getProxyContactList(obj).then(res => {
        // console.log(res, 're99s');
        this.pageInfoData.currentPage = res.current;
        this.pageInfoData.pageSize = res.size;
        this.pageInfoData.total = res.total;
        let list = JSON.parse(JSON.stringify(res.records));
        list.forEach((el, index) => {
          list[index]['edit'] = false;
        });
        this.tableData = list;
      });
    },
    // 操作页面分页
    handleSizeChange(val) {
      this.obj.size = val;
      this.handelGetProxyContactList(this.obj);
    },
    // 分页按钮
    handleCurrentChange(val) {
      this.obj.current = val;
      this.handelGetProxyContactList(this.obj);
    },
    // 查询
    onSubmit() {
      this.obj.name = this.formInline.licenseNo;
      this.obj.department = this.formInline.region;
      this.handelGetProxyContactList(this.obj);
    },
    // 新增
    increase() {
      this.dialogFormVisible = true;
    },
    // 取消
    takeAway(formName) {
      this.dialogFormVisible = false;
      this.$refs['form'].resetFields();
    },
    // 确定
    determine(formName) {
      this.form.ifoExhibitionAgentId = this.id;
      this.postAgentContactPerson(this.form).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.handelGetProxyContactList(this.obj);
        this.dialogFormVisible = false;
        this.$refs['form'].resetFields();
      });
    },
    // 编辑
    compile(data, index) {
      if (this.lastIndex === "" || this.lastIndex === index) {
        // this.lastSalesList = JSON.parse(JSON.stringify(this.tableData));
        this.editform.fixed = data.fixed;
        this.editform.ifoExhibitionAgentContactId = data.ifoExhibitionAgentContactId;
        this.editform.mail = data.mail;
        this.editform.name = data.name;
        this.editform.job = data.job;
        this.editform.phone = data.phone;
        this.editform.fax = data.fax;
        this.editform.department = data.department;
        this.tableData[index]['edit'] = true;
        this.lastIndex = index;
      } else if (index !== this.lastIndex) {
        this.$confirm('是否放弃本次编辑？', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.tableData = JSON.parse(JSON.stringify(this.lastSalesList));
          
          for (let i = 0; i < this.tableData.length; i++) {
            this.tableData[i]['edit'] = false;
          }
          this.editform.fixed = data.fixed;
          this.editform.ifoExhibitionAgentContactId = data.ifoExhibitionAgentContactId;
          this.editform.mail = data.mail;
          this.editform.name = data.name;
          this.editform.job = data.job;
          this.editform.phone = data.phone;
          this.editform.fax = data.fax;
          this.editform.department = data.department;
          this.tableData[index]['edit'] = true;
          this.lastIndex = index;
        }).catch(() => {
          this.$message.info('已取消此操作!');
        });
      }
    },
    // 保存
    onServe(data, index) {
      this.lastIndex = '';
      this.postSaveProxyContact(this.editform).then(res => {
        this.$message({
          message: "保存成功",
          type: "success"
        });
        this.handelGetProxyContactList(this.obj);
        this.tableData[index]["edit"] = false;
      });
    },
    // 删除
    remove(data) {
      let obj = {
        contactId: data.ifoExhibitionAgentContactId
      };
      this.postDeleteProxyContact(obj).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        });
        this.handelGetProxyContactList(this.obj);
      });
    }
  }
};
</script>
