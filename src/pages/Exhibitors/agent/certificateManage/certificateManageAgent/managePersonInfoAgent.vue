/*
* @file 证件管理-人证管理-管理人员信息(招展代理)
* @author: weiwei
* @date:2019/6/10
*/
<template>
  <div class="page-container">
    <!-- 页面内 -->
    <!-- <el-tabs v-model="pageActiveName">
      <el-tab-pane label="管理人员信息(招展代理)" name="one"> -->

        <el-form :inline="true" :model="queryForm">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="queryForm.name" clearable></el-input>
          </el-form-item>

          <el-form-item label="人员类型" prop="peopleType">
            <el-select  placeholder="请选择" v-model="queryForm.peopleType" clearable>
              <el-option v-for="item in peopleTypeSelectData" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="初审审核状态" prop="reviewStatusOne">
            <el-select  placeholder="请选择" v-model="queryForm.reviewStatusOne" clearable>
              <el-option  v-for="item in reviewStatusOneArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="复审审核状态" prop="reviewStatusTwo">
            <el-select  placeholder="请选择" v-model="queryForm.reviewStatusTwo" clearable :disabled="this.queryForm.reviewStatusOne !== 2">
              <el-option  v-for="item in reviewStatusOneArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleListQuery" size="mini">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleAddList" size="mini">新增</el-button>
          </el-form-item>
        </el-form>
        <!-- 新增dialog -->
        <el-dialog title="新增" :visible.sync="dialogAdd" width="70%" :show-close="false" @close="handleAddClose">
          <el-form :model="addListForm" label-width="114px">
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="姓名:" size="small" prop="name">
                <el-input style="width: 90%" v-model="addListForm.name"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="电子邮箱:" size="small" prop="mail">
                <el-input style="width: 90%" v-model="addListForm.mail"></el-input>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="性别:" size="small" prop="sex">
                <el-select style="width: 90%" v-model="addListForm.sex">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="身份证扫描件:" size="small" prop="idScan">
                <template slot-scope="scope">
                <el-upload ref="addSfz"
                  :action = "API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture" :file-list="sfzAddFileList"
                  :on-success = "sfzUploadSuccess" :on-error = "sfzUploadError" accept=".jpg,.JPG"
                  :limit='1'>
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">提示：身份证照片格式为JPG格式，不超过100kb。</div>
                </el-upload>
                </template>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="身份证件类型:" size="small" prop="idType">
                <el-select style="width: 90%" v-model="addListForm.idType">
                  <el-option v-for="item in personCardTypeArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="个人证件照:" size="small" prop="cardPic">
                <template slot-scope="scope">
                <el-upload ref="addZj"
                  :action = "API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture" :file-list="zjAddFileList"
                  :on-success = "zjUploadSuccess" :on-error = "zjUploadError" accept=".jpg,.JPG"
                  :limit='1'>
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">提示：证件照片格式为JPG格式，且小于100kb。
                    照片高宽比例为5:4，分辨率为200 * 250较好。</div>
                </el-upload>
                </template>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="身份证件号码:" size="small" prop="idNo">
                <el-input style="width: 90%" v-model="addListForm.idNo"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="人员类型:" size="small" prop="peopleType">
                <el-select style="width: 90%" v-model="addListForm.peopleType">
                  <el-option v-for="item in peopleTypeSelectData" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="有效期开始时间:" size="small" prop="idCardExpireStartTime">
                <el-date-picker v-model="addListForm.idCardExpireStartTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="国籍:" size="small" prop="countryRegionId">
                <el-select style="width: 90%" v-model="addListForm.countryRegionId">
                  <el-option v-for="item in getCountry" :key="item.countryRegionId" :label="item.crChName" :value="item.countryRegionId"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="有效期结束时间:" size="small" prop="idCardExpireEndTime">
                <el-date-picker v-model="addListForm.idCardExpireEndTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="职务:" size="small" prop="">
                <!-- <el-select style="width: 90%">
                  <el-option label="" value=""></el-option>
                </el-select> -->
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="联系电话:" size="small" prop="phone">
                <el-input style="width: 90%" v-model="addListForm.phone"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="备注:" size="small" prop="note">
                <el-input style="width: 90%" v-model="addListForm.note"></el-input>
              </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="handleSubmitAdd">保 存</el-button>
            <el-button @click="dialogAdd = false">取 消</el-button>
          </span>
        </el-dialog>

        <el-table :data="managePeopleInfoData.records" border>
          <el-table-column prop="name" label="姓名" align="center"></el-table-column>
          <el-table-column prop="sex" label="性别" align="center">
            <template slot-scope="scope">
              {{ scope.row.sex | sexFilters }}
            </template>
          </el-table-column>
          <el-table-column prop="idType" label="身份证件类型" align="center">
            <template slot-scope="scope">
              {{ scope.row.idType | personCardTypeFilters }}
            </template>
          </el-table-column>
          <el-table-column prop="idNo" label="身份证件号码" align="center"></el-table-column>
          <el-table-column prop="imgUrl" label="个人证件照" align="center">
            <!-- cardPic -->
            <template slot-scope="scope">
              <img :src="scope.row.imgUrl" alt="" style="height: 60px;">
            </template>
          </el-table-column>
          <el-table-column prop="peopleType" label="人员类型" align="center" :formatter="handleMethods">
            <!-- <template slot-scope="scope">
              {{ scope.row.peopleType | peopleTypeFilters }}
            </template> -->
          </el-table-column>
          <el-table-column prop="status" label="审核状态" align="center"></el-table-column>
          <el-table-column prop="operate" label="操作" align="center">
            <template slot-scope="scope">
              <el-button type="text">提交修改申请</el-button>
              <el-button type="text" @click="handleEditDialog(scope.row.ifoPersonId)">编辑</el-button>
              <el-button type="text" @click="handleDelete(scope.row.ifoPersonId)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-row type="flex" justify="end" class="pagination-contain">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page = pageInfoData.currentPage
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageInfoData.pageSize"
            layout="prev, pager, next, jumper"
            :total="managePeopleInfoData.total">
          </el-pagination>
        </el-row>

        <!-- 编辑dialog -->
        <el-dialog title="编辑" :visible.sync="dialogEdit" width="70%" :show-close="false" @close="handleEditClose">
          <el-form label-width="114px">
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="姓名:" size="small" prop="name">
                <el-input style="width: 90%" v-model="editListForm.name"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="电子邮箱:" size="small" prop="mail">
                <el-input style="width: 90%" v-model="editListForm.mail"></el-input>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="性别:" size="small" prop="sex">
                <el-select style="width: 90%" v-model="editListForm.sex">
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="身份证扫描件:" size="small" prop="idScan">
                <el-upload ref="editSfz"
                  :action = "API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture" accept=".jpg,.JPG"
                  :on-success = "sfzUploadSuccessEdit" :on-error = "sfzUploadErrorEdit" :file-list="this.sfzFileList"
                  :limit='1'>
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">提示：身份证照片格式为JPG格式，不超过100kb。</div>
                </el-upload>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="身份证件类型:" size="small" prop="idType">
                <el-select style="width: 90%" v-model="editListForm.idType">
                  <el-option v-for="item in personCardTypeArr" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="个人证件照:" size="small" prop="cardPic">
                <el-upload ref="editZj"
                  :action = "API_POT_URL + '/api/ifoPerson/uploadPeopleFile'" list-type="picture" accept=".jpg,.JPG"
                  :on-success = "zjUploadSuccessEdit" :on-error = "zjUploadErrorEdit" :file-list="this.zjFileList"
                  :limit='1'>
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">提示：证件照片格式为JPG格式，且小于100kb。
                    照片高宽比例为5:4，分辨率为200 * 250较好。</div>
                </el-upload>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="身份证件号码:" size="small" prop="idNo">
                <el-input style="width: 90%" v-model="editListForm.idNo"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="人员类型:" size="small" prop="peopleType">
                <el-select style="width: 90%" v-model="editListForm.peopleType">
                  <el-option v-for="item in peopleTypeSelectData" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="有效期开始时间:" size="small" prop="idCardExpireStartTime">
                <el-date-picker v-model="editListForm.idCardExpireStartTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="国籍:" size="small" prop="countryRegionId">
                <el-select style="width: 90%" v-model="editListForm.countryRegionId">
                  <el-option v-for="item in getCountry" :key="item.countryRegionId" :label="item.crChName" :value="item.countryRegionId"></el-option>
                </el-select>
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="有效期结束时间:" size="small" prop="idCardExpireEndTime">
                <el-date-picker v-model="editListForm.idCardExpireEndTime" type="date" placeholder="选择日期"></el-date-picker>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="职务:" size="small" prop="">
                <!-- <el-select style="width: 90%">
                  <el-option label="" value=""></el-option>
                </el-select> -->
              </el-form-item>
              </el-col>
            </el-row>
            <el-row :getter="10">
              <el-col :span="12">
              <el-form-item label="联系电话:" size="small" prop="phone">
                <el-input style="width: 90%" v-model="editListForm.phone"></el-input>
              </el-form-item>
              </el-col>
              <el-col :span="12">
              <el-form-item label="备注:" size="small" prop="note">
                <el-input style="width: 90%" v-model="addListForm.note"></el-input>
              </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="handleSubmitEdit">保 存</el-button>
            <el-button @click="dialogEdit = false">取 消</el-button>
          </span>
        </el-dialog>
        
      <!-- </el-tab-pane>
    </el-tabs> -->
  </div>
</template>

<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import tableMixIn from "@/utils/helper/tableMixIn";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      API_POT_URL: process.env.API_POT_URL,
      mixins: [tableMixIn, listPageBase],
      // activeName: 'first',
      pageActiveName: 'one',
      dialogAdd: false,
      dialogEdit: false,
      queryForm: {
        name: '',
        peopleType: '',
        reviewStatusOne: '',
        reviewStatusTwo: ''
      },
      reviewStatusOneArr: [
        { value: 0, label: '未审核' }, { value: 1, label: '不通过' }, { value: 2, label: '审核通过' }
      ],
      // reviewStatusTwoArr: [
      //   { value: 0, label: '未审核' }, { value: 1, label: '不通过' }, { value: 2, label: '审核通过' }
      // ],
      pageInfoData: { currentPage: 1, pageSize: 10 },
      // sfzUploadData: {
      //   type: 0, ifoPersonId: ''
      // },
      // zjUploadData: {
      //   type: 1, ifoPersonId: ''
      // },
      // zjDataList: [],
      // sfzDataList: [],
      // sfzUploadDataEdit: {
      //   type: 0, ifoPersonId: ''
      // },
      // zjUploadDataEdit: {
      //   type: 1, ifoPersonId: ''
      // },
      requireParams: {
        type: "0",
        // orgId: "aaa",
        orgType: "0"
      },
      addListForm: {
        name: '', mail: '', sex: '', idType: '', idNo: '', peopleType: '', idCardExpireStartTime: '',
        countryRegionId: '', idCardExpireEndTime: '', phone: '', note: '', ifoPersonId: "", idScan: null, cardPic: null
      },
      editListForm: {
        name: '', mail: '', sex: '', idType: '', idNo: '', peopleType: '', idCardExpireStartTime: '',
        countryRegionId: '', idCardExpireEndTime: '', phone: '', note: '', ifoPersonId: "", idScan: null, cardPic: null
      },
      detailsParams: {
        "customQueryParams": [
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "ifo_person_id",
            "values": [
              ""
            ]
          }
        ]
      },
      zjAddFileList: [], // 证件照列表编辑
      sfzAddFileList: [], // 身份证列表编辑
      zjFileList: [], // 证件照列表编辑
      sfzFileList: [], // 身份证列表编辑
      // sexArray: [{ value: '1', label: '男' }, { value: '0', label: '女' }] // 性别字典
      personCardTypeArr: [], // 证件类型字典
      ifoPeopleTypeArr: []
    };
  },
  computed: {
    ...mapGetters('certificateManage', ['managePeopleInfoData', 'peopleInfoDetailsData', 'peopleTypeSelectData']),
    ...mapGetters('regist', ['getCountry']),
    // personCardTypeArr() {
    //   let val = kindo.dictionary.get('ifoPersonCardType');
    //   if (val) {
    //     return val;
    //   } else {
    //     return [];
    //   }
    // },
    params() {
      let paramsData = {
        "customQueryParams": [
          // {
          //   "findType": "EQ",
          //   "joinType": "And",
          //   "name": "org_id",
          //   "values": [
          //     "aaa"
          //   ]
          // },
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "ifo_person.org_type",
            "values": [
              "1"
            ]
          }
        ],
        "orderModelField": [
          {
            "asc": false,
            "orderByField": "ifo_person.create_date"
          }
        ],
        "pageIndex": this.pageInfoData.currentPage,
        "pageSize": this.pageInfoData.pageSize
      };
      if (this.queryForm.name) {
        paramsData.customQueryParams.push({
          "findType": "LIKE",
          "joinType": "And",
          "name": "name",
          "values": [
            this.queryForm.name
          ]
        });
      }
      if (this.queryForm.peopleType) {
        paramsData.customQueryParams.push({
          "findType": "EQ",
          "joinType": "And",
          "name": "people_type",
          "values": [
            this.queryForm.peopleType
          ]
        });
      }
      if (this.queryForm.reviewStatusOne) {
        paramsData.customQueryParams.push({
          "findType": "EQ",
          "joinType": "And",
          "name": "review_status_one",
          "values": [
            this.queryForm.reviewStatusOne
          ]
        });
      }
      if (this.queryForm.reviewStatusTwo) {
        paramsData.customQueryParams.push({
          "findType": "EQ",
          "joinType": "And",
          "name": "review_status_two",
          "values": [
            this.queryForm.reviewStatusTwo
          ]
        });
      }
      return paramsData;
    },
    addParams() {
      let obj = Object.assign({}, this.addListForm, this.requireParams);
      return obj;
    },
    editParams() {
      let obj = Object.assign({}, this.editListForm, this.requireParams);
      return obj;
    }
  },
  filters: {
    peopleTypeFilters: value => {
      if (!value) {
        return '0';
      }
      let ifoPeopleType = kindo.dictionary.get('ifoPeopleType');
      for (let i = 0; i < ifoPeopleType.length; i++) {
        let item = ifoPeopleType[i];
        if (value.toString() === item.value.toString()) {
          return item.label;
        }
      }
    },
    sexFilters: value => {
      if (!value) {
        return '0';
      }
      let sexArray = [{ value: '1', label: '男' }, { value: '0', label: '女' }];
      for (let i = 0; i < sexArray.length; i++) {
        let item = sexArray[i];
        if (value.toString() === item.value.toString()) {
          return item.label;
        }
      }
    },
    personCardTypeFilters: value => {
      if (!value) {
        return '0';
      }
      let ifoPersonCardType = kindo.dictionary.get('ifoPersonCardType');
      for (let i = 0; i < ifoPersonCardType.length; i++) {
        let item = ifoPersonCardType[i];
        if (value.toString() === item.value.toString()) {
          return item.label;
        }
      }
    }
  },
  methods: {
    ...mapActions('certificateManage', ['getManagePeopleInfoList', 'postUpdateOrAddPeople', 'getPeopleInfoDetails',
      'postDeletePeopleInfo', 'getPeopleTypeSelect']),
    ...mapActions('regist', ['getAllCountryInfo']),
    handleMethods(row, column, cellValue, index) {
      for (let i = 0; i < this.ifoPeopleTypeArr.length; i++) {
        const ele = this.ifoPeopleTypeArr[i];
        if (ele.value === cellValue) {
          return ele.label;
        }
      }
    },
    handleListQuery() {
      this.getManagePeopleInfoList(this.params);
    },
    handleSizeChange(val) {
      this.pageInfoData.pageSize = val;
      this.getManagePeopleInfoList(this.params);
    },
    handleCurrentChange(val) {
      this.pageInfoData.currentPage = val;
      this.getManagePeopleInfoList(this.params);
    },
    handleAddList() { // 新增弹框
      this.dialogAdd = true;
      this.personCardTypeArr = kindo.dictionary.get('ifoPersonCardType');
    },
    handleSubmitAdd() { // 提交新增弹框
      this.postUpdateOrAddPeople(this.addParams).then(res => {
        for (let key in this.addListForm) {
          this.addListForm[key] = '';
        }
        // this.zjDataList = [];
        // this.sfzDataList = [];
        // this.sfzUploadData.ifoPersonId = "";
        // this.zjUploadData.ifoPersonId = "";
        this.$message.success('新增成功');
        this.dialogAdd = false;
        this.getManagePeopleInfoList(this.params); // 刷新列表
      }).catch(e => {
        this.$message.error('新增失败');
      });
    },
    handleAddClose() {
      this.zjAddFileList = []; // 证件照列表编辑
      this.sfzAddFileList = []; // 身份证列表编辑
    },
    handleEditDialog(id) { // 编辑弹框
      this.detailsParams.customQueryParams[0].values[0] = id;
      this.personCardTypeArr = kindo.dictionary.get('ifoPersonCardType');
      // 修改上传传参
      // this.sfzUploadDataEdit.ifoPeopleId = id;
      // this.zjUploadDataEdit.ifoPeopleId = id;
      this.getPeopleInfoDetails(this.detailsParams).then(res => {
        this.editListForm.name = this.peopleInfoDetailsData.name;
        this.editListForm.mail = this.peopleInfoDetailsData.mail;
        this.editListForm.sex = this.peopleInfoDetailsData.sex;
        this.editListForm.idType = this.peopleInfoDetailsData.idType;
        this.editListForm.idNo = this.peopleInfoDetailsData.idNo;
        this.editListForm.peopleType = this.peopleInfoDetailsData.peopleType;
        this.editListForm.idCardExpireStartTime = this.peopleInfoDetailsData.idCardExpireStartTime;
        this.editListForm.countryRegionId = this.peopleInfoDetailsData.countryRegionId;
        this.editListForm.idCardExpireEndTime = this.peopleInfoDetailsData.idCardExpireEndTime;
        this.editListForm.phone = this.peopleInfoDetailsData.phone;
        this.editListForm.note = this.peopleInfoDetailsData.note;
        this.editListForm.ifoPersonId = this.peopleInfoDetailsData.ifoPersonId;
        this.zjFileList = this.peopleInfoDetailsData.zjFileList;
        this.sfzFileList = this.peopleInfoDetailsData.sfzFileList;
        this.editListForm.cardPic = this.peopleInfoDetailsData.cardPic;
        this.editListForm.idScan = this.peopleInfoDetailsData.idScan;
      });
      this.dialogEdit = true;
    },
    handleEditClose() { // 编辑关闭
      this.zjFileList = [];
      this.sfzFileList = [];
    },
    handleSubmitEdit() { // 编辑
      this.postUpdateOrAddPeople(this.editParams).then(res => {
        // this.sfzUploadDataEdit.ifoPersonId = res;
        // this.zjUploadDataEdit.ifoPersonId = res;

        // this.$refs.editSfz.submit(); // 上传图片
        // this.$refs.editZj.submit();
        for (let key in this.editListForm) {
          this.editListForm[key] = '';
        }
        this.$message.success('编辑成功');
        this.dialogEdit = false;
        this.getManagePeopleInfoList(this.params); // 刷新列表
      }).catch(res => {
        this.$message.error('编辑失败');
      });
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除此条数据, 是否继续?', '提示', {
        confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning'
      }).then(() => {
        this.postDeletePeopleInfo(id).then(res => {
          this.$message.success('删除成功');
          this.getManagePeopleInfoList(this.params); // 刷新列表
        });
      }).catch(() => {
        this.$message.error('删除失败');
      });
    },
    // 新增
    // sfzIfoPersonId(id) { // 身份证改id
    //   this.sfzUploadData.ifoPersonId = id;
    // },
    sfzUploadSuccess(res, file, fileList) { // 身份证
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('新增图片成功');
        this.addListForm.idScan = res.data;
      }
    },
    sfzUploadError(res) { // 身份证
      this.$message.error(res.message);
    },

    // zjIfoPersonId(id) { // 证件改id
    //   this.zjUploadData.ifoPersonId = id;
    // },
    zjUploadSuccess(res, file, fileList) { // 证件照
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('新增图片成功');
        this.addListForm.cardPic = res.data;
      }
    },
    zjUploadError(res) {
      this.$message.error(res.message);
    },

    // 编辑
    // sfzIfoPersonId(id) { // 身份证改id
    //   this.sfzUploadData.ifoPersonId = id;
    // },
    sfzUploadSuccessEdit(res) { // 身份证
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('编辑图片成功');
        this.editListForm.idScan = res.data;
      }
    },
    sfzUploadErrorEdit(res) { // 身份证
      this.$message.error(res.message);
    },

    // zjIfoPersonId(id) { // 证件改id
    //   this.zjUploadData.ifoPersonId = id;
    // },
    zjUploadSuccessEdit(res) { // 证件照
      if (res.flag === "0") {
        this.$message.error(res.message);
      }
      if (res.flag === "1") {
        this.$message.success('编辑图片成功');
        this.editListForm.cardPic = res.data;
      }
    },
    zjUploadErrorEdit(res) { // 证件照
      this.$message.error(res.message);
    }
  },
  async created() {
    // this.getPeopleTypeSelect(); // 人员类型下拉框
    // this.getAllCountryInfo(); // 获取国籍
    // this.getManagePeopleInfoList(this.params);
    this.personCardTypeArr = await kindo.dictionary.get('ifoPersonCardType');
    this.ifoPeopleTypeArr = await kindo.dictionary.get('ifoPeopleType');
    // kindo.dictionary.get('ifoPersonCardType').then(res => {
    //   console.log(res, 'res');
    //   this.personCardTypeArr = res;
    // });

    Promise.all([this.getPeopleTypeSelect(), this.getAllCountryInfo()]).then(() => {
      this.getManagePeopleInfoList(this.params);
    });

  }
};
</script>
<style lang='less' scoped>
// .page-container {
//   /deep/ .el-dialog {
//     /deep/ .el-upload__tip {
//       margin-top: 0px;
//       position: absolute;
//       right: 0;
//       top: 0;
//       width: 200px;
//       line-height: 16px;
//     }
//   }
// }
</style>
