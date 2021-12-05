/**
* @file 广交会-创建会议论坛
* @author:zhangwenjian
* @date:2019/2/26
*/
<template>
  <div class="container">
    <p class="top_line"><span class="title">{{pageTitle}}</span></p>
    <el-form :model="mettingForumForm" ref="mettingForumForm" label-position="right" label-width="110px" class="demo-ruleForm" :rules="rules">
      <el-row>
        <el-col :span="10">
          <el-form-item label="会议主题:" size="small" class="item" prop="meetingTitle">
            <el-input type="text" maxlength="50" v-model.trim="mettingForumForm.meetingTitle" placeholder="请输入会议主题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="期数:" size="small" class="item" prop="exhibitionPeriod">
            <el-select v-model="mettingForumForm.exhibitionPeriod" placeholder="请选择期数"  style="width: 100%;">
              <el-option label="第一期" value="第一期"></el-option>
              <el-option label="第二期" value="第二期"></el-option>
              <el-option label="第三期" value="第三期"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item class="item" label="开始时间:" prop="meetingStartTime" size="small">
            <el-date-picker
              v-model="mettingForumForm.meetingStartTime"
              type="datetime"
              placeholder="选择开始时间"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              :picker-options="startTimePicOptions"
              default-time="07:00:00">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item class="item" label="结束时间:" prop="meetingEndTime" size="small">
            <el-date-picker
              v-model="mettingForumForm.meetingEndTime"
              type="datetime"
              format="yyyy-MM-dd HH:mm"
              value-format="yyyy-MM-dd HH:mm"
              placeholder="选择结束时间"
              :picker-options="endTimePicOptions"
              default-time="23:00:00"
            >
            </el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="活动:" size="small" class="item" prop="activity">
            <el-input type="text" maxlength="50" v-model.trim="mettingForumForm.activity" placeholder="请输入活动"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="会议地点:" size="small" style="display:inline-block;width: 205px;" prop="area">
            <el-select v-model="mettingForumForm.area" placeholder="区域" style="width: 90px">
              <el-option label="A区" value="A区"></el-option>
              <el-option label="B区" value="B区"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  size="small" label-width="0" style="display:inline-block;width: 95px;" prop="floor">
            <el-select v-model="mettingForumForm.floor" placeholder="楼层" style="width: 90px">
              <el-option label="一层" value="一层"></el-option>
              <el-option label="二层" value="二层"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item  size="small" label-width="0" style="display:inline-block;width: 95px;" prop="room">
            <el-select v-model="mettingForumForm.room" placeholder="编号" style="width: 90px">
              <el-option label="红梅302" value="红梅302"></el-option>
              <el-option label="百花302" value="百花302"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-form-item label="类别:" size="small" class="item" prop="forumCategoryId">
            <el-select  v-model="mettingForumForm.forumCategoryId" placeholder="请选择类别" >
              <el-option v-for="(category,index) in categoryList" :key="index" :label="category.forumCategoryName" :value="category.forumCategoryId"></el-option>
            </el-select>
          </el-form-item></el-col>
        <el-col :span="6">
          <el-form-item class="item" label-width="110px" label="是否免费:" size="small" prop="isFree">
            <el-radio-group v-model="mettingForumForm.isFree" style="width: 170px">
              <el-radio :label="'1'" style="width: 80px;">免费</el-radio>
              <el-radio :label="'0'" style="width: 80px;">收费</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label-width="0" size="small" ref="isFree" prop="forumCost" style="width: 100px">
            <el-input maxlength="10" v-if="mettingForumForm.isFree === '0'" v-model="mettingForumForm.forumCost" aria-placeholder="请输入费用" style="width: 80px"></el-input><span  v-if="mettingForumForm.isFree === '0'"> 元</span>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="人数限制:" size="small" class="item" prop="numberLimit">
            <el-input maxlength="10" v-model.number="mettingForumForm.numberLimit" placeholder="请输入人数限制"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="14">
          <el-form-item label="标签:" size="small" class="item" prop="forumLabelId">
            <el-select v-model="mettingForumForm.forumLabelId" placeholder="请选择标签"  style="width: 100%;">
              <el-option v-for="(label,index) in labelList" :key="index" :label="label.forumLabelName" :value="label.forumLabelId"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <div style="display: flex;padding: 5px 0" :key="index" v-for="(infoCsForumGuest,index) in mettingForumForm.infoCsForumGuestRelationLkList">
            <el-row v-if="index === 0">
              <el-form-item label="出席嘉宾:" size="small" class="item" :prop="`infoCsForumGuestRelationLkList.${index}.forumRole`"  :rules="rules.forumRole">
                <el-input v-model.trim="infoCsForumGuest.forumRole" placeholder="请输入嘉宾角色" style="width: 140px"></el-input>
                <span class="spanbtn"  @click="openSelectDialog(index)">选择</span>
                <span class="spanbtn1"  v-if="index === 0" @click="addGuest()">+添加</span>
                <span class="spanbtn1"  v-else @click="deleteGuest(index)">- 删除</span>
              </el-form-item>
            </el-row>
            <el-row v-else>
              <div style="margin-left: 110px">
                <el-form-item  label-width="0" size="small"  :prop="`infoCsForumGuestRelationLkList.${index}.forumRole`" :rules="rules.forumRole">
                  <el-input v-model.trim="infoCsForumGuest.forumRole" placeholder="请输入嘉宾角色"  style="width: 140px;"></el-input>
                  <span class="spanbtn"  @click="openSelectDialog(index)">选择</span>
                  <span class="spanbtn1"  v-if="index === 0" @click="addGuest()">+添加</span>
                  <span class="spanbtn1"  v-else @click="deleteGuest(index)">- 删除</span>
                </el-form-item>
              </div>
            </el-row>
          </div>
        </el-col>
        <el-col :span="14">
          <el-row>
            <el-col>
              <el-form-item label="归属单位:" size="small" class="item" prop="ascriptionUnitId">
                <el-select v-model="mettingForumForm.ascriptionUnitId" placeholder="请选择归属单位"  style="width: 100%;">
                  <el-option v-for="(vestUnit,index) in vestUnitList" :key="index" :label="vestUnit.ascriptionUnitName" :value="vestUnit.ascriptionUnitId"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-form-item label="是否开放:" size="small" class="item" prop="isOpen">
              <el-select v-model="mettingForumForm.isOpen" placeholder="是否开放"  style="width: 100%;">
                <el-option label="开放" value="1"></el-option>
                <el-option label="不开放" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-row>
        </el-col>
      </el-row>

      <el-form-item label="会议内容:" size="small" style="width: 80%" prop="meetingContent">
        <el-input  maxlength="1000" v-model.trim="mettingForumForm.meetingContent" placeholder="请输入会议内容" type="textarea"></el-input>
      </el-form-item>

      <el-form-item size="small">
        <el-button type="primary" @click="saveForumClick()">保存</el-button>
        <el-button type="primary" @click="toForumList()">取消</el-button>
      </el-form-item>
    </el-form>

    <!--选择嘉宾名单-->
    <el-dialog title="选择嘉宾名单" :close-on-click-modal="false"  width="880px" :visible.sync="guestListDialog" >
      <el-form :inline="true" :model="searchForm" class="demo-form-inline">
        <el-form-item label="姓名" size="mini" label-width="70px">
          <el-input style="width: 150px" v-model.trim="searchForm.guestName" placeholder="请输入企业名称"></el-input>
        </el-form-item>
        <el-form-item label="所属机构名称" size="mini" label-width="120px">
          <el-input style="width: 150px" v-model.trim="searchForm.orgName" placeholder="请输入产品名称">></el-input>
        </el-form-item>
        <el-form-item size="mini">
          <el-button type="primary" @click="getGuestList('1')">查询</el-button>
          <el-button type="primary" @click="resetGuestForm()">重置</el-button>
          <el-button type="primary" @click="openAddGuestDialog()">添加</el-button>
        </el-form-item>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="guestListData"
        border
        @select-all="handleTabSelectAll"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="80">
        </el-table-column>

        <el-table-column
          prop="guestName"
          label="姓名"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orgName"
          label="所属机构名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="guestPhone"
          label="手机"
          align="center">
        </el-table-column>
      </el-table>
      <el-pagination
        background
        class="pagination"
        @size-change="selectForumSizeChange"
        @current-change="selectForumCurrentChange"
        :current-page.sync="searchForm.current"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="searchForm.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="guestListTotal"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
      <div class="dialog-footer">
        <el-button type="primary" @click="closeSelectDialog()">确 认</el-button>
        <el-button @click="guestListDialog = false">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="新增嘉宾" :visible.sync="addGuestDilaog" :close-on-click-modal="false" width="700px" label-width="190px">
      <el-form :model="addGuestForm" label-position="right"  :inline="true" style="text-align: center" :rules="addGuestRules" ref="addGuestForm">
        <el-form-item label="嘉宾姓名:" label-width="90px" size="mini" class="dialog_item" prop="guestName">
          <el-input type="text" maxlength="50" v-model.trim="addGuestForm.guestName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="所属机构:" label-width="90px" size="mini" class="dialog_item" prop="orgName">
          <el-input type="text" maxlength="50" v-model.trim="addGuestForm.orgName" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="职位:" label-width="90px" size="mini" class="dialog_item">
          <el-input type="text" maxlength="32" v-model.trim="addGuestForm.guestPosition" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="手机:" label-width="90px" size="mini" class="dialog_item" prop="guestPhone">
          <el-input type="text" maxlength="11" v-model.trim="addGuestForm.guestPhone" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" label-width="120px" size="mini" style="display: block;width:48%" prop="guestEmail">
          <el-input type="text" maxlength="50" v-model.trim="addGuestForm.guestEmail" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="嘉宾助手:" label-width="90px" size="mini" class="dialog_item">
          <el-input type="text" maxlength="50" v-model.trim="addGuestForm.contactName" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="助手职位:" label-width="90px" size="mini" class="dialog_item">
          <el-input type="text" maxlength="50" v-model.trim="addGuestForm.contactPosition" placeholder="请输入内容" ></el-input>
        </el-form-item>
        <el-form-item label="助手手机:" label-width="90px" size="mini" class="dialog_item" prop="contactPhone">
          <el-input type="text" maxlength="11" v-model.trim="addGuestForm.contactPhone" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="助手邮箱:" label-width="90px" size="mini" class="dialog_item" prop="contactEmail">
          <el-input type="text" maxlength="50" v-model.trim="addGuestForm.contactEmail" placeholder="请输入内容"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="text-align: center" >
        <el-button type="primary" @click="confirmPutGuestData()">确 定</el-button>
        <el-button @click="cancelPutGuestData()">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "addMettingForum",
    data() {
      const validateMobile = (rule, value, callback) => {
        let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
        if (!MOBILE.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          return callback();
        }
      };
      const validateSpecial = (rule, value, callback) => {
        let regEn = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        let regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;

        if (value == null || value === '') {
          return callback();
        }
        if (regEn.test(value) || regCn.test(value)) {
          return callback(new Error("输入不能包含特殊字符!"));
        } else {
          return callback();
        }
      };
      const checkFee = (rule, value, callback) => {
        let reg = /^\d+(\.\d+)?$/;
        let match = reg.test(value);
        if (value == null || value === '') {
          return callback();
        }
        if (!match) {
          return callback(new Error('请输入数字类型!'));
        }
        let decimal = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/;
        let matchDecimal = decimal.test(value);
        if (!matchDecimal) {
          return callback(new Error('只能保留两位小数!'));
        }
        let data = (value + '').split('.')[0];
        if (data.length > 10) {
          return callback(new Error('输入的数字过大!'));
        }
        return callback();
      };
      const validateNumber = (rule, value, callback) => {
        let MOBILE = /^[0-9]\d*$/;
        if (!MOBILE.test(value)) {
          return callback(new Error("请输入大于0的整数"));
        } else {
          return callback();
        }
      };
      const validateMobileNoMust = (rule, value, callback) => {
        let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
        if (value == null || value === '') {
          return callback();
        }
        if (!MOBILE.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          return callback();
        }
      };
      return {
        source: {
          language: []
        },
        guestListDialog: false,
        addGuestDilaog: false,

        guestListTotal: 0,
        guestListData: [],
        multipleTable: [],
        hasSelectedIds: [],
        echoIds: [],
        initRoleList: [],

        seletGuestIds: [],
        currentSelectIndex: 0,
        pageTitle: '创建会议论坛',
        mettingForumForm: {
          forumId: '',
          area: '',
          room: '',
          floor: '',
          exhibitionPeriod: '',
          forumCategoryId: '',
          forumLabelId: '',
          ascriptionUnitId: '',
          meetingTitle: '',
          meetingStartTime: '',
          meetingEndTime: '',
          meetingAddress: '',
          numberLimit: '',
          activity: '',
          isFree: '0',
          forumCost: "",
          meetingContent: '',
          isOpen: '',
          infoCsForumGuestRelationLkList: [
            {
              forumId: '',
              guestId: '',
              guestRelationId: '',
              forumRole: ''
            }
          ]
        },
        mettingForumData: {
          forumId: '',
          exhibitionPeriod: '',
          forumCategoryId: '',
          forumLabelId: '',
          ascriptionUnitId: '',
          meetingTitle: '',
          meetingStartTime: '',
          meetingEndTime: '',
          meetingAddress: '',
          numberLimit: '',
          activity: '',
          isFree: '0',
          isOpen: '',
          forumCost: "",
          meetingContent: '',
          infoCsForumGuestRelationLkList: []
        },
        searchForm: {
          current: 1,
          size: 10,
          guestName: '',
          orgName: ''
        },
        addGuestForm: {
          guestId: '',
          guestName: '',
          orgName: '',
          guestPosition: '',
          guestPhone: '',
          guestEmail: '',
          contactName: '',
          contactPosition: '',
          contactPhone: '',
          contactEmail: ''
        },
        categoryList: [],
        labelList: [],
        vestUnitList: [],
        currentDate: new Date(),
        endTimeDefault: '',
        startTimePicOptions: {
          disabledDate: time => {
            if (this.mettingForumForm.meetingEndTime) {
              return time.getTime() > new Date(this.mettingForumForm.meetingEndTime).getTime() || time.getTime() < Date.now() - 8.64e7;
            }
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        endTimePicOptions: {
          disabledDate: time => {
            if (this.mettingForumForm.meetingStartTime) {
              // this.endTimeDefault = this.currentDate;
              // let currentTime = new Date(this.mettingForumForm.meetingStartTime);
              // this.endTimeDefault.setDate(currentTime.getDay() - 1);
              // this.endTimeDefault.setHours(currentTime.getHours());
              return time.getTime() < new Date(this.mettingForumForm.meetingStartTime).getTime() - 3600 * 1000 * 24;
            } else {
              return time.getTime() < Date.now() - 8.64e7;
            }
          }
        },
        rules: {
          exhibitionPeriod: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          forumCategoryId: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          forumLabelId: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          ascriptionUnitId: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          meetingTitle: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          meetingContent: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          meetingStartTime: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          meetingEndTime: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          meetingAddress: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          numberLimit: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { validator: validateNumber, trigger: 'blur' }
          ],
          activity: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'blur' }
          ],
          isFree: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          isOpen: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          area: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          room: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          floor: [
            { required: true, message: '内容不能为空', trigger: 'blur' }
          ],
          forumCost: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { validator: checkFee, trigger: 'blur' }
          ],
          forumRole: [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'blur' }
          ]
        },
        addGuestRules: {
          // 添加嘉宾的表单校验
          guestName: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'blur' }
          ],
          contactPosition: [
            { validator: validateSpecial, trigger: 'blur' }
          ],
          contactName: [
            { validator: validateSpecial, trigger: 'blur' }
          ],
          guestPosition: [
            { validator: validateSpecial, trigger: 'blur' }
          ],
          orgName: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateSpecial, trigger: 'blur' }
          ],
          guestPhone: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { validator: validateMobile, trigger: 'blur' }
          ],
          contactPhone: [
            { validator: validateMobileNoMust, trigger: 'blur' }
          ],
          guestEmail: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          contactEmail: [
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ]
        },
        baseApi: process.env.API_FF_URL
      };
    },
    async created() {
      this.source.language = await kindo.util.getLanguage('MettingForumLang');
    },
    mounted() {
      this.mettingForumForm.forumId = this.$route.query.forumId;
      // 如果存在forumId就拉取信息
      if (this.mettingForumForm.forumId) {
        this.getForumDetailById(this.mettingForumForm.forumId);
        this.pageTitle = "更新会议论坛";
      } else {
        this.pageTitle = "创建会议论坛";
      }
      this.mettingForumForm.meetingEndTime = '';
      this.mettingForumForm.meetingStartTime = '';
      this.getCategoryList();
      this.getLabelList();
      this.getVestUnitList();
    },
    methods: {
      /*
        分页及表格信息处理
      */
      selectForumSizeChange(pageSize) {
        this.searchForm.size = pageSize;
        this.getGuestList();
      },
      selectForumCurrentChange(currentPage) {
        this.searchForm.current = currentPage;
        this.getGuestList();
      },
      handleTabSelectAll(val) {
        this.pushSelectIds(val);
      },
      handleSelectionChange(val) {
        this.pushSelectIds(val);
      },
      pushSelectIds(val) {
        this.seletGuestIds = [];
        for (let i = 0, length = val.length; i < length; i++) {
          this.seletGuestIds.push(val[i].guestId);
        }
      },
      resetGuestForm() {
        this.searchForm.guestName = '';
        this.searchForm.orgName = '';
        this.searchForm.current = 1;
      },
      openSelectDialog(index) {
        this.guestListDialog = true;
        this.currentSelectIndex = index;
        let guestId = this.mettingForumForm.infoCsForumGuestRelationLkList[this.currentSelectIndex].guestId;
        if (guestId.length > 0) {
          // 进行数据的回显
          this.echoIds = guestId.split(',');
          this.seletGuestIds = this.echoIds;
        }
        this.getGuestList();
      },
      closeSelectDialog() {
        this.guestListDialog = false;
        this.echoIds = [];
        // 进行遍历循环
        this.mettingForumForm.infoCsForumGuestRelationLkList[this.currentSelectIndex].guestId = this.seletGuestIds.join();
      },
      // 会议论坛保存按钮
      saveForumClick() {
        this.$refs["mettingForumForm"].validate((valid) => {
          if (valid) {
            if (this.mettingForumForm.forumId) {
              this.updateForumRequest();
            } else {
              this.saveForumRequest();
            }
          }
        });
      },
      /*
        动态添加嘉宾列表
      */
      addGuest() {
        let forumGuest = {
          forumId: '',
          guestId: '',
          forumRole: ''
        };
        this.mettingForumForm.infoCsForumGuestRelationLkList.push(forumGuest);
      },
      deleteGuest(index) {
        this.mettingForumForm.infoCsForumGuestRelationLkList.splice(index, 1);
      },
      /*
        数据获取
       */
      // 获取类别列表
      getCategoryList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumTypeSet').then(res => {
          this.categoryList = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取标签列表
      getLabelList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumLabelSet').then(res => {
          this.labelList = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取归属单位列表
      getVestUnitList() {
        this.$http.get(this.baseApi + '/api/customservice/forum/listAscriptionUnitSet').then(res => {
          this.vestUnitList = res;
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 获取嘉宾信息列表
      getGuestList(flag) {
        if (flag === '1') {
          this.searchForm.current = 1;
        }
        this.$http.get(this.baseApi + '/api/customservice/forum/listForumGuests', this.searchForm).then(res => {
          this.guestListData = res.records;
          this.guestListTotal = res.total;
          // // 进行已选择的id回显处理 multipleTable
          let filterData = [];
          for (let item in this.echoIds) {
            for (let i = 0; i < this.guestListData.length; i++) {
              if (this.guestListData[i].guestId === this.echoIds[item]) {
                filterData.push(this.guestListData[i]);
                break;
              }
            }
          }
          // 需要等列表渲染完毕再进行选项触发
          let _this = this;
          setTimeout(function () {
            for (let guest in filterData) {
              _this.$refs.multipleTable.toggleRowSelection(filterData[guest], true);
            }
          }, 400);

        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 通过forumId获取论坛详情
      getForumDetailById(forumId) {
        this.$http.get(this.baseApi + '/api/customservice/forum/getForum', { forumId: forumId }).then(res => {
          this.mettingForumForm.exhibitionPeriod = res.exhibitionPeriod;
          this.mettingForumForm.forumCategoryId = res.forumCategoryId;
          this.mettingForumForm.forumLabelId = res.forumLabelId;
          if (res.meetingAddress) {
            this.mettingForumForm.area = res.meetingAddress.split('-')[0];
            this.mettingForumForm.floor = res.meetingAddress.split('-')[1];
            this.mettingForumForm.room = res.meetingAddress.split('-')[2];
          }
          this.mettingForumForm.ascriptionUnitId = res.ascriptionUnitId;
          this.mettingForumForm.meetingTitle = res.meetingTitle;
          this.mettingForumForm.meetingStartTime = res.meetingStartTime;
          this.mettingForumForm.meetingEndTime = res.meetingEndTime;
          this.mettingForumForm.meetingAddress = res.meetingAddress;
          this.mettingForumForm.numberLimit = res.numberLimit;
          this.mettingForumForm.forumCost = res.forumCost;
          this.mettingForumForm.isOpen = res.isOpen + '';
          this.mettingForumForm.isFree = res.isFree + '';
          if (res.forumCost == null) {
            this.mettingForumForm.forumCost = 0;
          } else {
            this.mettingForumForm.forumCost = res.forumCost;
          }
          this.mettingForumForm.meetingContent = res.meetingContent;
          this.mettingForumForm.activity = res.activity;


          if (res.infoCsGuestList.length > 0) {
            this.mettingForumForm.infoCsForumGuestRelationLkList = [];
            let roleList = [];
            for (let i = 0, length = res.infoCsGuestList.length; i < length; i++) {
              let forumRoles = [];
              forumRoles = res.infoCsGuestList[i].forumRole.split(',');
              for (let j = 0, lengthj = forumRoles.length; j < lengthj; j++) {
                let params = {
                  forumId: res.forumId,
                  guestId: res.infoCsGuestList[i].guestId,
                  guestRelationId: res.infoCsGuestList[i].guestRelationId,
                  forumRole: ''
                };
                params.forumRole = forumRoles[j];
                roleList.push(params);
              }
            }
            // 存储修改之前的数据
            this.initRoleList = res.infoCsGuestList;

            let guestInfo = {};
            let letinfoCsGuestList = roleList.reduce((cur, next) => {
              guestInfo[next.forumRole] ? "" : guestInfo[next.forumRole] = true && cur.push(next);
              return cur;
            }, []);

            for (let i = 0, length = letinfoCsGuestList.length; i < length; i++) {
              let guestIds = [];
              let params = {
                forumId: res.forumId,
                guestId: '',
                forumRole: letinfoCsGuestList[i].forumRole
              };
              for (let j = 0, lengthj = roleList.length; j < lengthj; j++) {
                if (roleList[j].forumRole === letinfoCsGuestList[i].forumRole) {
                  guestIds.push(roleList[j].guestId);
                }
              }
              params.guestId = guestIds.join();
              this.mettingForumForm.infoCsForumGuestRelationLkList.push(params);
            }
          }
        }).catch(error => {
          this.$message.error(error);
        });
      },
      exchangeFormData() {
        this.mettingForumData.infoCsForumGuestRelationLkList = [];
        this.mettingForumData.exhibitionPeriod = this.mettingForumForm.exhibitionPeriod;
        this.mettingForumData.forumId = this.mettingForumForm.forumId;
        this.mettingForumData.forumCategoryId = this.mettingForumForm.forumCategoryId;
        this.mettingForumData.forumLabelId = this.mettingForumForm.forumLabelId;
        this.mettingForumData.ascriptionUnitId = this.mettingForumForm.ascriptionUnitId;
        this.mettingForumData.meetingTitle = this.mettingForumForm.meetingTitle;
        this.mettingForumData.meetingStartTime = this.mettingForumForm.meetingStartTime;
        this.mettingForumData.meetingEndTime = this.mettingForumForm.meetingEndTime;
        this.mettingForumData.meetingAddress = this.mettingForumForm.meetingAddress;
        this.mettingForumData.numberLimit = this.mettingForumForm.numberLimit;
        this.mettingForumData.forumCost = this.mettingForumForm.forumCost;
        this.mettingForumData.activity = this.mettingForumForm.activity;
        this.mettingForumData.isFree = this.mettingForumForm.isFree;
        this.mettingForumData.isOpen = this.mettingForumForm.isOpen + '';
        this.mettingForumData.meetingContent = this.mettingForumForm.meetingContent;

        for (let i = 0, length = this.mettingForumForm.infoCsForumGuestRelationLkList.length; i < length; i++) {
          let data = this.mettingForumForm.infoCsForumGuestRelationLkList[i];
          if (data.forumRole != null && data.forumRole !== '' && data.guestId.length > 0) {
            let guestIds = data.guestId.split(',');
            for (let j = 0, lengthj = guestIds.length; j < lengthj; j++) {
              let params = {
                forumId: this.mettingForumData.forumId,
                guestId: guestIds[j],
                forumRole: data.forumRole
              };
              this.mettingForumData.infoCsForumGuestRelationLkList.push(params);
            }
          }
        }

        // // 进行guestRelationId关联刷选
        // let tempLinkList = this.mettingForumData.infoCsForumGuestRelationLkList;
        // for (let i = 0, length = this.initRoleList.length; i < length; i++) {
        //   for (let j = 0, lengthj = tempLinkList.length; j < lengthj; j++) {
        //     if (this.initRoleList[i].guestId === tempLinkList[j].guestId) {
        //       this.mettingForumData.infoCsForumGuestRelationLkList[j].guestRelationId = this.initRoleList[i].guestRelationId;
        //     }
        //   }
        // }
        // console.log(this.mettingForumData.infoCsForumGuestRelationLkList);
      },
      /*
        表单提交
       */
      openAddGuestDialog() {
        this.addGuestDilaog = true;
        if (this.$refs.addGuestForm !== undefined) {
          this.$refs.addGuestForm.resetFields();
        }
      },
      confirmPutGuestData() {
        this.$refs["addGuestForm"].validate((valid) => {
          if (valid) {
            this.$http.postJson(this.baseApi + '/api/customservice/forum/saveForumGuest', this.addGuestForm).then(res => {
              this.$message.success("新增成功!");
              this.addGuestDilaog = false;
              this.guestListDialog = true;
              this.getGuestList();
            }).catch(error => {
              this.$message.error(error);
            });
          } else {
            this.$message.error("存在必填项未填");
          }
        });
      },
      cancelPutGuestData() {
        this.addGuestDilaog = false;
        this.guestListDialog = true;
      },
      // 创建会议论坛
      saveForumRequest() {
        this.mettingForumForm.meetingAddress = this.mettingForumForm.area + '-' + this.mettingForumForm.floor + '-' + this.mettingForumForm.room;
        let linkList = this.mettingForumForm.infoCsForumGuestRelationLkList;
        for (let i = 0, length = linkList.length; i < length; i++) {
          if (linkList[i].guestId === '' || linkList[i].guestId == null) {
            this.$message.error('角色' + linkList[i].forumRole + '没有选择关联的嘉宾!');
            return;
          }
        }
        if (new Date(this.mettingForumForm.meetingStartTime).getTime() > new Date(this.mettingForumForm.meetingEndTime).getTime()) {
          this.$message.error("会议开始时间不能大于会议结束时间!");
          return;
        }
        this.exchangeFormData();
        if (this.mettingForumData.isFree === '1') {
          this.mettingForumData.forumCost = 0;
        }
        this.$http.postJson(this.baseApi + '/api/customservice/forum/saveForum', this.mettingForumData).then(res => {
          this.$message.success("保存成功");
          this.toForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 更新会议论坛
      updateForumRequest() {
        this.mettingForumForm.meetingAddress = this.mettingForumForm.area + '-' + this.mettingForumForm.floor + '-' + this.mettingForumForm.room;
        this.exchangeFormData();
        if (this.mettingForumData.isFree === '1') {
          this.mettingForumData.forumCost = 0;
        }
        this.$http.postJson(this.baseApi + '/api/customservice/forum/updateForum', this.mettingForumData).then(res => {
          this.$message.success("更新成功");
          this.toForumList();
        }).catch(error => {
          this.$message.error(error);
        });
      },
      // 跳转到会议论坛列表
      toForumList() {
        this.$router.push({ path: '/mettingForumList' });
      },
      checkFee(rule, value, callback) {
        let reg = /^\d+(\.\d+)?$/;
        let match = reg.test(value);
        if (value == null || value === '') {
          return callback();
        }
        if (!match) {
          return callback(new Error('请输入数字类型!'));
        }
        let decimal = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{1,2}$)/;
        let matchDecimal = decimal.test(value);
        if (!matchDecimal) {
          return callback(new Error('只能保留两位小数!'));
        }
        let data = (value + '').split('.')[0];
        if (data.length > 10) {
          return callback(new Error('输入的数字过大!'));
        }
        return callback();
      }
    },
    watch: {
      "mettingForumForm.isFree": function(val, oldVal) {
        if (val === '0') {
          // console.log("0");
          this.rules.forumCost = [
            { required: true, message: '内容不能为空', trigger: 'blur' },
            { validator: this.checkFee, trigger: 'blur' }
          ];
        } else {
          this.rules.forumCost = [];
          this.$refs.isFree.clearValidate();
        }
      }
    }
  };
</script>

<style scoped>
  .item {
    display: inline-block;
    width: 400px;
  }
  .spanbtn{
    display: inline-block;
    width:60px;
    height:30px;
    border-radius: 2px;
    text-align: center;
    background-color: #2b579a;
    margin-left: 5px;
    color: white;
    cursor:pointer;
  }

  .spanbtn1{
    display: inline-block;
    width:60px;
    height:30px;
    border-radius: 2px;
    text-align: center;
    background-color: #e6a23c;
    margin-left: 5px;
    color: white;
    cursor:pointer;
  }

  .container{
    margin: 10px;
  }
  .top_line{
    border-bottom: 1px solid #cdcdcd;
    margin-left: 20px;
  }
  .top_line .title {
    font-size: 18px;
    font-weight: 600;
    border-bottom: 2px solid #8a8a8a;
  }
  .pagination{
    margin: 10px auto;
    text-align: center;
  }
  .dialog-footer{
    text-align: center;
  }
  .demo-ruleForm{
    margin-left: 40px;
  }
</style>
<style>
  .el-dialog__body{
    padding: 20px 0;
    border-top: 1px solid #cccccc;
  }
  .table{
    margin:0 20px;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 42px;
  }
  .el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
  }
  .el-radio{
    margin-right: 10px;
  }
  .el-form-item{
    margin-right: 0;
  }
</style>
