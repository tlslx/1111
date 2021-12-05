/**
 * @file 接单员列表
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="接单员列表" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="展区">
          <el-select v-model="queryForm.area" clearable>
            <el-option label="A区" value="1"></el-option>
            <el-option label="B区" value="2"></el-option>
            <el-option label="C区" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展厅">
          <el-select v-model="queryForm.hall" clearable>
            <el-option label="1.1" value="1"></el-option>
            <el-option label="1.2" value="2"></el-option>
            <el-option label="1.3" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="部门">
          <el-select v-model="queryForm.deptName" clearable>
            <el-option label="李飞" value="1"></el-option>
            <el-option label="李伟明" value="2"></el-option>
            <el-option label="陈玉霞" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="openCope">复制展览接单员</el-button>
          <el-dialog title="复制展览接单员" :visible.sync="OpenCopeExhibitionReceiver">
            <el-form :model="queryForm" :inline="true" class="search-form-inline">
              <el-form-item label="展览名称：" prop="exhName">
                <el-input v-model="queryForm.exhName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="OpenChooseExhibition = true">选择展览名称</el-button>
                <el-dialog title="展览信息" :visible.sync="OpenChooseExhibition">
                  <el-form label-position="right" label-width="1px">
                    <el-form-item label="展览名称：" prop="exhName">
                      <el-input v-model="queryForm.exhName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item class="el-form-item-btn">
                      <el-button class="btn1" @click="handleQuery">查询</el-button>
                    </el-form-item>
                  </el-form>
                  <el-table ref="multipleTable" border :data="listWorkOrder" v-loading="loading">
                    <el-table-column label="" width="65">
                      <template slot-scope="scope">
                        <el-radio :label="scope.$index" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column label="展览开始时间" prop="workOrder.numberPeriods" align="center"></el-table-column>
                    <el-table-column label="展览通称" prop="workOrder.workOrderNumber" align="center"></el-table-column>
                    <el-table-column label="中文名称" prop="workOrder.workType" align="center"></el-table-column>
                  </el-table>
                  <el-form :model="form" label-position="right" label-width="1px">
                    <el-form-item class="el-form-item-btn">
                      <el-button class="btn1" @click="choose">选择</el-button>
                      <el-button class="btn2" @click="OpenChooseExhibition = false">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="copeNewExh">复制到新的展览对象</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="OpenChooseExhibition = false">返回</el-button>
              </el-form-item>
            </el-form>
            <el-table border :data="listByExh.records" v-loading="loading">
              <el-table-column label="序号" prop="sequenceNum" align="center"></el-table-column>
              <el-table-column label="科室班组编码" prop="deptId" align="center"></el-table-column>
              <el-table-column label="科室班组名称" prop="deptName" align="center"></el-table-column>
              <el-table-column label="接单员" prop="acceptorName" align="center"></el-table-column>
              <el-table-column label="负责的展厅" prop="hallStr" align="center"></el-table-column>
              <el-table-column label="操作" prop="operate" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteListByExh(scope.row)">删除</el-button>
                  <el-button type="text" @click="modifyListByExhr(scope.row)">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
          <el-dialog title="复制到新的展览对象" :visible.sync="OpenCopeNewExhibitionReceiver">
            <el-form :model="queryForm" :inline="true" class="search-form-inline">
              <el-form-item label="展览名称：" prop="exhName">
                <el-input v-model="queryForm.exhName" placeholder="请输入"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="OpenChooseExhibition = true">选择展览名称</el-button>
                <el-dialog title="展览信息" :visible.sync="OpenChooseExhibition">
                  <el-form label-position="right" label-width="1px">
                    <el-form-item label="展览名称：" prop="exhName">
                      <el-input v-model="queryForm.exhName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item class="el-form-item-btn">
                      <el-button class="btn1" @click="handleQuery">查询</el-button>
                    </el-form-item>
                  </el-form>
                  <el-table ref="multipleTable" border :data="listWorkOrder" v-loading="loading">
                    <el-table-column label="" width="65">
                      <template slot-scope="scope">
                        <el-radio :label="scope.$index" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column label="展览开始时间" prop="workOrder.numberPeriods" align="center"></el-table-column>
                    <el-table-column label="展览通称" prop="workOrder.workOrderNumber" align="center"></el-table-column>
                    <el-table-column label="中文名称" prop="workOrder.workType" align="center"></el-table-column>
                  </el-table>
                  <el-form :model="form" label-position="right" label-width="1px">
                    <el-form-item class="el-form-item-btn">
                      <el-button class="btn1" @click="choose">选择</el-button>
                      <el-button class="btn2" @click="OpenChooseExhibition = false">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="handleQuery">复制到该展览对象</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="handleQuery">保存</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="OpenCopeNewExhibitionReceiver = false">返回</el-button>
              </el-form-item>
            </el-form>
            <el-table border :data="listByExh.records" v-loading="loading">
              <el-table-column label="序号" prop="sequenceNum" align="center"></el-table-column>
              <el-table-column label="科室班组编码" prop="deptId" align="center"></el-table-column>
              <el-table-column label="科室班组名称" prop="deptName" align="center"></el-table-column>
              <el-table-column label="接单员" prop="acceptorName" align="center"></el-table-column>
              <el-table-column label="负责的展厅" prop="hallStr" align="center"></el-table-column>
              <el-table-column label="操作" prop="operate" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteListByExh(scope.row)">删除</el-button>
                  <el-button type="text" @click="modifyListByExhr(scope.row)">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
        </el-form-item>
        <el-form-item>
          <el-button type="warning" @click="openAdd">添加展览接单员</el-button>
          <el-dialog title="接单员设置" :visible.sync="OpenAddExhibitionReceiver">
            <el-form :model="queryForm" :inline="true" class="search-form-inline">
              <el-form-item label="展览名称">
                <el-input v-model="queryForm.exhName" placeholder="张"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="handleQuery">选择展览名称</el-button>
                <el-dialog title="展览信息" :visible.sync="OpenChooseExhibition">
                  <el-form label-position="right" label-width="1px">
                    <el-form-item label="展览名称：" prop="exhName">
                      <el-input v-model="queryForm.exhName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item class="el-form-item-btn">
                      <el-button class="btn1" @click="handleQuery">查询</el-button>
                    </el-form-item>
                  </el-form>
                  <el-table ref="multipleTable" border :data="listWorkOrder" v-loading="loading">
                    <el-table-column label="" width="65">
                      <template slot-scope="scope">
                        <el-radio :label="scope.$index" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
                      </template>
                    </el-table-column>
                    <el-table-column label="展览开始时间" prop="workOrder.numberPeriods" align="center"></el-table-column>
                    <el-table-column label="展览通称" prop="workOrder.workOrderNumber" align="center"></el-table-column>
                    <el-table-column label="中文名称" prop="workOrder.workType" align="center"></el-table-column>
                  </el-table>
                  <el-form :model="form" label-position="right" label-width="1px">
                    <el-form-item class="el-form-item-btn">
                      <el-button class="btn1" @click="choose">选择</el-button>
                      <el-button class="btn2" @click="OpenChooseExhibition = false">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="open">新增</el-button>
                <el-dialog title="接单员信息" :visible.sync="OpenExhibitionReceiver">
                  <el-form :model="queryForm" :inline="true" class="search-form-inline">
                    <el-form-item label="接单员：">
                      <div style="width:100%;">
                        <el-input class="small-select-width" v-model="queryForm.unitMeasurement" placeholder="请输入"></el-input>
                        <el-button slot="reference" type="text" @click="isShow = !isShow">选择接单员</el-button>
                        <el-dialog title="选择接单员" :visible.sync="OpenChooseExhibition">
                          <el-form :model="form" label-position="right" label-width="1px">
                            <el-form-item label="科室班组：" prop="exhName">
                              <el-input v-model="queryForm.exhName" placeholder="请输入"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名：" prop="exhName">
                              <el-input v-model="queryForm.exhName" placeholder="请输入"></el-input>
                            </el-form-item>
                          </el-form>
                          <el-table ref="multipleTable" border :data="listWorkOrder" v-loading="loading">
                            <el-table-column label="" width="65">
                              <template slot-scope="scope">
                                <el-radio :label="scope.$index" v-model="templateRadio" @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp</el-radio>
                              </template>
                            </el-table-column>
                            <el-table-column label="科室班组" prop="workOrder.numberPeriods" align="center"></el-table-column>
                            <el-table-column label="姓名" prop="workOrder.workOrderNumber" align="center"></el-table-column>
                          </el-table>
                          <el-form :model="form" label-position="right" label-width="1px">
                            <el-form-item class="el-form-item-btn">
                              <el-button class="btn1" @click="choose">选择</el-button>
                              <el-button class="btn2" @click="OpenChooseExhibition = false">取消</el-button>
                            </el-form-item>
                          </el-form>
                        </el-dialog>
                      </div>
                    </el-form-item>
                    <el-form-item label="所属科室班组：">
                      <el-input v-model="queryForm.unitMeasurement" placeholder="请输入"></el-input>
                    </el-form-item>
                  </el-form>
                  <div>
                    <div slot="header" class="clearfix">
                      <span>● 手机号码设置</span>
                    </div>
                    <div>
                      <el-upload class="upload-demo" :action="uploadUrl" :on-preview="handlePreview" :on-remove="handleRemove" :file-list="description" list-type="picture">
                        <el-button size="small" type="primary">增加</el-button>
                      </el-upload>
                      <el-table ref="multipleTable" border :data="listWorkOrder" v-loading="loading" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="65"></el-table-column>
                        <el-table-column type="selection" label="接收短信" prop="name" align="center"></el-table-column>
                        <el-table-column type="input" label="手机号码" prop="operate" align="center"></el-table-column>
                        <el-table-column type="input" label="姓名" prop="operate" align="center"></el-table-column>
                        <el-table-column label="操作" prop="operate" align="center">
                          <template slot-scope="scope">
                            <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <div>
                    <div slot="header" class="clearfix">
                      <span>● 具体负责的展厅</span>
                    </div>
                    <div>
                      <el-table ref="multipleTable" border :data="listWorkOrder" v-loading="loading" @selection-change="handleSelectionChange">
                        <el-table-column type="selection" width="65"></el-table-column>
                        <el-table-column label="展厅" prop="name" align="center"></el-table-column>
                      </el-table>
                    </div>
                  </div>
                  <el-form :inline="true">
                    <el-form-item>
                      <el-button type="warning" @click="handleQuery">保存</el-button>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="warning" @click="close">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-dialog>
              </el-form-item>
              <el-form-item>
                <el-button type="warning" @click="closeAdd">返回</el-button>
              </el-form-item>
            </el-form>
            <el-table border :data="listByExh.records" v-loading="loading">
              <el-table-column label="序号" prop="sequenceNum" align="center"></el-table-column>
              <el-table-column label="科室班组编码" prop="deptId" align="center"></el-table-column>
              <el-table-column label="科室班组名称" prop="deptName" align="center"></el-table-column>
              <el-table-column label="接单员" prop="acceptorName" align="center"></el-table-column>
              <el-table-column label="负责的展厅" prop="hallStr" align="center"></el-table-column>
              <el-table-column label="操作" prop="operate" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
                  <el-button type="text" @click="modifyUser(scope.row)">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-dialog>
        </el-form-item>
      </el-form>
      <el-table border :data="listByCondition" v-loading="loading">
        <el-table-column label="展区" prop="area" align="center"></el-table-column>
        <el-table-column label="展厅" prop="hall" align="center"></el-table-column>
        <el-table-column label="展览名称" prop="exhName" align="center"></el-table-column>
        <el-table-column label="部门" prop="deptName" align="center"></el-table-column>
        <el-table-column label="接单员" prop="acceptorName" align="center"></el-table-column>
        <el-table-column label="手机号" prop="mobile" align="center"></el-table-column>
        <el-table-column label="操作" prop="operate" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="deleteUser(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      loading: '',
      activeName: 'first',
      isShow: false,
      isShowTwo: false,
      OpenExhibitionReceiver: false,
      OpenAddExhibitionReceiver: false,
      OpenCopeExhibitionReceiver: false,
      OpenCopeNewExhibitionReceiver: false,
      OpenChooseExhibition: false,
      areas: [],
      halls: [],
      deptNames: [],
      multipleSelection: [],
      syntheticMaterialName: '',
      exhibitionNumber: '',
      syntheticMaterialSpecifications: '',
      queryForm: {
        area: '', // 展区
        hall: '', // 展厅
        deptName: '', // 部门
        exhName: ''
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  created() {
    let _this = this;
    this.selectListByCondition(this.receiverByConditionQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
    this.selectListByExh(this.receiveByExhrQuery).then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
    this.selectList().then(response => {
      _this.loading = false;
    }).catch(e => {
      _this.loading = false;
    });
  },
  computed: {
    ...mapGetters('receiver', ['listByCondition', 'listByExh', 'list']),
    ...mapGetters('dictionary', ['dictionaryData']),
    receiverByConditionQuery() {
      return {
        area: this.queryForm.area,
        hall: this.queryForm.hall,
        deptName: this.queryForm.deptName,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    receiveByExhrQuery() {
      return {
        exhName: this.queryForm.exhName,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    }
  },
  // async beforeCreate() {
  //   this.deptNames = await kindo.dictionary.get('deptNames');
  //   this.areas = await kindo.dictionary.get('areas');
  //   this.halls = await kindo.dictionary.get('halls');
  // },
  methods: {
    ...mapActions('receiver', ['selectListByCondition', 'selectListByExh', 'selectList']),
    copeNewExh() {
      this.OpenCopeExhibitionReceiver = false;
      this.OpenCopeNewExhibitionReceiver = true;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 选择展览名称
    choose() {
      if (this.form.workOrderNumber) {
        this.OpenChooseExhibition = false;
      }
    },
    checkDetail(row) {
      console.log(row.acceptorRowId, "222");
      this.$router.push({
        path: '/detailStockAlert',
        query: {
          id: row.acceptorRowId
        }
      });
    },
    modifyUser(row) {
      console.log(row.acceptorRowId, "222");
      this.$router.push({
        path: '/modifySheme',
        query: {
          id: row.acceptorRowId
        }
      });
    },
    open() {
      this.OpenExhibitionReceiver = true;
    },
    close() {
      this.OpenExhibitionReceiver = false;
    },
    openAdd() {
      this.OpenAddExhibitionReceiver = true;
    },
    closeAdd() {
      this.OpenAddExhibitionReceiver = false;
    },
    openCope() {
      this.OpenCopeExhibitionReceiver = true;
    },
    closeCope() {
      this.OpenCopeExhibitionReceiver = false;
    },
    handleAdd() {
      this.$router.push("/addexhibitionTool");
    },
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    createdQuery() {
      this.loading = true;
      this.selectListByCondition(this.receiverByConditionQuery).then(() => {
        this.loading = false;
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.pagination-footer {
  margin-top: 20px;
}
.small-select-width {
  width: 200px;
}
</style>












