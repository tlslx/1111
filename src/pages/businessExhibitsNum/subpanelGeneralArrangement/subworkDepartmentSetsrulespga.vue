<template>
  <el-tabs v-model="activeName" class="item-Num">
    <el-tab-pane label="设置规则" name="first">
      <el-card style="padding-bottom: 24px">
        <!-- 表单 -->
        <el-form :inline="true" :model="formData" size="small">
          <el-form-item label="交易团">
            <el-select v-model="formData.delegationId" clearable>
              <el-option
                v-for="(item, index) in localstora.delegation"
                :key="index"
                :label="item.deptName"
                :value="item.deptId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展区">
            <el-select v-model="formData.exhibitionAreaCode" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.exhibitionAreaName"
                :value="item.exhibitionAreaCode"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="floatRight">
            <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
            <el-button class="formStyle" type="primary">导入贫困县数据</el-button>
          </el-form-item>
        </el-form>
        <!-- 表格 -->
        <el-form :model="editform" :rules="editRule" ref="refedit" size="small" label-width="0px">
          <el-table :data="tableData" style="width: 100%" border>
            <el-table-column align="center" min-width="120" label="交易团范围" prop="delegationList">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <!-- <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule"> -->
                    <el-form-item prop="delegationList">
                      <el-select v-model="editform.delegationList" multiple clearable>
                        <el-option
                          v-for="(item, index) in localstora.delegation"
                          :key="index"
                          :label="item.deptName"
                          :value="item.deptId"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  <!-- </el-form> -->
                </div>
                <span v-else>{{scope.row.delegationList}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="120" label="展区类别范围" prop="exhibitionAreaList">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <!-- <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule"> -->
                    <el-form-item prop="exhibitionAreaList">
                      <el-select v-model="editform.exhibitionAreaList" multiple clearable>
                        <el-option
                          v-for="(item, index) in localstora.exhibitionArea"
                          :key="index"
                          :label="item.exhibitionAreaName"
                          :value="item.exhibitionAreaCode"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  <!-- </el-form> -->
                </div>
                <span v-else>{{scope.row.exhibitionAreaList}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="120" label="特装展位数量范围" prop="specialNumberRange">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <!-- <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule"> -->
                    <el-form-item required>
                      <el-col :span="11">
                        <el-form-item prop="specialNumberRangeA">
                          <el-input type="number" v-model.trim.number="editform.specialNumberRangeA" maxlength="5"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-form-item prop="specialNumberRangeB">
                          <el-input type="number" v-model.trim.number="editform.specialNumberRangeB" maxlength="5"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  <!-- </el-form> -->
                </div>
                <span v-else>{{scope.row.specialNumberRange}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="120" label="特装截至录入时间" prop="specialDeadline">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <!-- <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule"> -->
                    <el-form-item prop="specialDeadline">
                      <el-date-picker v-model="editform.specialDeadline" type="date" placeholder="选择日期" clearable></el-date-picker>
                    </el-form-item>
                  <!-- </el-form> -->
                </div>
                <span v-else>{{scope.row.specialDeadline}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="120" label="标摊展位数量范围" prop="standardNumberRange">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <!-- <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule"> -->
                    <el-form-item required>
                      <el-col :span="11">
                        <el-form-item prop="standardNumberRangeA">
                          <el-input type="number" v-model.trim.number="editform.standardNumberRangeA" maxlength="5"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-form-item prop="standardNumberRangeB">
                          <el-input type="number" v-model.trim.number="editform.standardNumberRangeB" maxlength="5"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  <!-- </el-form> -->
                </div>
                <span v-else>{{scope.row.standardNumberRange}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="120" label="标摊截至录入时间" prop="standardDeadline">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <!-- <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule"> -->
                    <el-form-item prop="standardDeadline">
                      <el-date-picker v-model="editform.standardDeadline" type="date" placeholder="选择日期" clearable></el-date-picker>
                    </el-form-item>
                  <!-- </el-form> -->
                </div>
                <span v-else>{{scope.row.standardDeadline}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="120" label="统一布展展位数量范围" prop="unificationNumberRange">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <!-- <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule"> -->
                    <el-form-item required>
                      <el-col :span="11">
                        <el-form-item prop="unificationNumberRangeA">
                          <el-input type="number" v-model.trim.number="editform.unificationNumberRangeA" maxlength="5"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-form-item prop="unificationNumberRangeB">
                          <el-input type="number" v-model.trim.number="editform.unificationNumberRangeB" maxlength="5"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  <!-- </el-form> -->
                </div>
                <span v-else>{{scope.row.unificationNumberRange}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="120" label="统一布展截至录入时间" prop="unificationDeadline">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <!-- <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule"> -->
                    <el-form-item prop="unificationDeadline">
                      <el-date-picker v-model="editform.unificationDeadline" type="date" placeholder="选择日期" clearable></el-date-picker>
                    </el-form-item>
                  <!-- </el-form> -->
                </div>
                <span v-else>{{scope.row.unificationDeadline}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="120" label="中央通道展位数量范围" prop="centerChannelNumberRange">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <!-- <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule"> -->
                    <el-form-item required>
                      <el-col :span="11">
                        <el-form-item prop="centerChannelNumberRangeA">
                          <el-input type="number" v-model.trim.number="editform.centerChannelNumberRangeA" maxlength="5"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-form-item prop="centerChannelNumberRangeB">
                          <el-input type="number" v-model.trim.number="editform.centerChannelNumberRangeB" maxlength="5"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                  <!-- </el-form> -->
                </div>
                <span v-else>{{scope.row.centerChannelNumberRange}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="120" label="中央通道截至录入时间" prop="centerChannelDeadline">
              <template slot-scope="scope">
                <div v-if="scope.row.edit">
                  <!-- <el-form :model="editform" ref="refedit" label-width="0px" :rules="editRule"> -->
                    <el-form-item prop="centerChannelDeadline">
                      <el-date-picker v-model="editform.centerChannelDeadline" type="date" placeholder="选择日期" clearable></el-date-picker>
                    </el-form-item>
                  <!-- </el-form> -->
                </div>
                <span v-else>{{scope.row.centerChannelDeadline}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" min-width="160" fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  type="text"
                  v-if="!scope.row.edit"
                  @click="onEdit(scope.row, scope.$index)"
                >编辑</el-button>
                <el-button type="text" v-else @click="onServe(scope.row, scope.$index, 'refedit')">保存</el-button>
                <el-button type="text" @click="onDele(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
        <!-- 一堆按钮 -->
        <div class="paginationTop floatLeft">
          <el-button type="primary" class="formStyle" size="small" :disabled="disable" @click="isExhibit = true">新增</el-button>
        </div>
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
        <!-- 新增 -->
        <el-dialog title="新增" :visible.sync="isExhibit" v-if="isExhibit" width="950px">
          <el-form :model="addForm" :rules="rules" :inline="true" size="small" ref="ruleForm" label-width="170px">
            <el-form-item label="交易团范围" prop="delegationList">
              <el-select v-model="addForm.delegationList" multiple clearable class="wid">
                <el-option
                  v-for="(item, index) in localstora.delegation"
                  :key="index"
                  :label="item.deptName"
                  :value="item.deptId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="展区类别范围" prop="exhibitionAreaList">
              <el-select v-model="addForm.exhibitionAreaList" multiple clearable class="wid">
                <el-option
                  v-for="(item, index) in localstora.exhibitionArea"
                  :key="index"
                  :label="item.exhibitionAreaName"
                  :value="item.exhibitionAreaCode"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="特装展位数量范围" required>
              <div class="wid">
                <el-col :span="11">
                  <el-form-item prop="specialNumberRangeA">
                    <el-input v-model.trim.number="addForm.specialNumberRangeA" maxlength="5"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="specialNumberRangeB">
                    <el-input v-model.trim.number="addForm.specialNumberRangeB" maxlength="5"></el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-form-item>
            <el-form-item label="特装截至录入时间" prop="specialDeadline">
              <el-date-picker v-model="addForm.specialDeadline" type="date" :picker-options="pickOptions" placeholder="选择日期" class="wid"></el-date-picker>
            </el-form-item>
            <el-form-item label="标摊展位数量范围" required>
              <div class="wid">
                <el-col :span="11">
                  <el-form-item prop="standardNumberRangeA">
                    <el-input v-model.trim.number="addForm.standardNumberRangeA" maxlength="5"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="standardNumberRangeB">
                    <el-input v-model.trim.number="addForm.standardNumberRangeB" maxlength="5"></el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-form-item>
            <el-form-item label="标摊截至录入时间" prop="standardDeadline">
              <el-date-picker v-model="addForm.standardDeadline" type="date" :picker-options="pickOptions" placeholder="选择日期" class="wid"></el-date-picker>
            </el-form-item>
            <el-form-item label="统一布展展位数量范围" required>
              <div class="wid">
                <el-col :span="11">
                  <el-form-item prop="unificationNumberRangeA">
                    <el-input v-model.trim.number="addForm.unificationNumberRangeA" maxlength="5"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="unificationNumberRangeB">
                    <el-input v-model.trim.number="addForm.unificationNumberRangeB" maxlength="5"></el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-form-item>
            <el-form-item label="统一布展截至录入时间" prop="unificationDeadline">
              <el-date-picker v-model="addForm.unificationDeadline" type="date" :picker-options="pickOptions" placeholder="选择日期" class="wid"></el-date-picker>
            </el-form-item>
            <el-form-item label="中央通道展位数量范围" required>
              <div class="wid">
                <el-col :span="11">
                  <el-form-item prop="centerChannelNumberRangeA">
                    <el-input v-model.trim.number="addForm.centerChannelNumberRangeA" maxlength="5"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line" :span="2">-</el-col>
                <el-col :span="11">
                  <el-form-item prop="centerChannelNumberRangeB">
                    <el-input v-model.trim.number="addForm.centerChannelNumberRangeB" maxlength="5"></el-input>
                  </el-form-item>
                </el-col>
              </div>
            </el-form-item>
            <el-form-item label="中央通道截至录入时间" prop="centerChannelDeadline">
              <el-date-picker v-model="addForm.centerChannelDeadline" type="date" :picker-options="pickOptions" placeholder="选择日期" class="wid"></el-date-picker>
            </el-form-item>
            <div class="divp">
              <el-button type="primary" @click="handSeave('ruleForm')">保存</el-button>
              <el-button @click="handcancel">取消</el-button>
            </div>
          </el-form>
        </el-dialog>
      </el-card>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    let tynum = (rule, value, callback) => {
      if (!value && value !== 0) {
        return callback(new Error("该字段为必填项"));
      } else if (!Number.isInteger(value - 0)) {
        return callback(new Error("请输入合法字符"));
      } else if (value < 0) {
        return callback(new Error("必须大于等于0"));
      } else {
        return callback();
      }
    };
    return {
      obj: {
        current: 1,
        size: 10
      },
      formData: {
        delegationId: "",
        exhibitionAreaCode: ""
      },
      tableData: [],
      isExhibit: false,
      addForm: {
        delegationList: [],
        exhibitionAreaList: [],
        specialNumberRangeA: "",
        specialNumberRangeB: "",
        specialDeadline: "",
        standardNumberRangeA: "",
        standardNumberRangeB: "",
        standardDeadline: "",
        unificationNumberRangeA: "",
        unificationNumberRangeB: "",
        unificationDeadline: "",
        centerChannelNumberRangeA: "",
        centerChannelNumberRangeB: "",
        centerChannelDeadline: ""
      },
      // 编辑数据
      editform: {
        configId: "",
        delegationList: [],
        exhibitionAreaList: [],
        specialNumberRangeA: "",
        specialNumberRangeB: "",
        specialDeadline: "",
        standardNumberRangeA: "",
        standardNumberRangeB: "",
        standardDeadline: "",
        unificationNumberRangeA: "",
        unificationNumberRangeB: "",
        unificationDeadline: "",
        centerChannelNumberRangeA: "",
        centerChannelNumberRangeB: "",
        centerChannelDeadline: ""
      },
      // 编辑表单规则
      editRule: {
        specialNumberRangeA: [{ validator: tynum, required: true, trigger: "blur" }],
        specialNumberRangeB: [{ validator: tynum, required: true, trigger: "blur" }],
        specialDeadline: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        standardNumberRangeA: [{ validator: tynum, required: true, trigger: "change" }],
        standardNumberRangeB: [{ validator: tynum, required: true, trigger: "change" }],
        standardDeadline: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        unificationNumberRangeA: [{ validator: tynum, required: true, trigger: "change" }],
        unificationNumberRangeB: [{ validator: tynum, required: true, trigger: "change" }],
        unificationDeadline: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        centerChannelNumberRangeA: [{ validator: tynum, required: true, trigger: "change" }],
        centerChannelNumberRangeB: [{ validator: tynum, required: true, trigger: "change" }],
        centerChannelDeadline: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        delegationList: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        exhibitionAreaList: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      // 新增表单验证
      rules: {
        specialNumberRangeA: [{ validator: tynum, required: true, trigger: "change" }],
        specialNumberRangeB: [{ validator: tynum, required: true, trigger: "change" }],
        specialDeadline: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        standardNumberRangeA: [{ validator: tynum, required: true, trigger: "change" }],
        standardNumberRangeB: [{ validator: tynum, required: true, trigger: "change" }],
        standardDeadline: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        unificationNumberRangeA: [{ validator: tynum, required: true, trigger: "change" }],
        unificationNumberRangeB: [{ validator: tynum, required: true, trigger: "change" }],
        unificationDeadline: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        centerChannelNumberRangeA: [{ validator: tynum, required: true, trigger: "change" }],
        centerChannelNumberRangeB: [{ validator: tynum, required: true, trigger: "change" }],
        centerChannelDeadline: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        delegationList: [{ required: true, message: "该字段为必填项", trigger: "blur" }],
        exhibitionAreaList: [{ required: true, message: "该字段为必填项", trigger: "blur" }]
      },
      disable: false,
      addData: {
        ordinaryDeadlineConfig: {},
        ordinaryDeadlineConfigAreaList: [],
        ordinaryDeadlineConfigDelegationList: [],
        ordinaryDeadlineConfigTypeList: []
      },
      paginationData: {
        pageSizes: [5, 10, 15, 20, 30, 50, 100],
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      pickOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      lastIndexPage: "",
      localstora: {
        exhibitionArea: [],
        delegation: []
      },
      activeName: "first"
    };
  },
  mounted() {
    // 获取字典
    // this.localstora = JSON.parse(localStorage.getItem("dictData"));
    // this.localstora = this.dictionaryData;
    this.getListPage(this.obj);
    // 展区
    this.getexhibitionArea({ exhibitionSession: this.getCes }).then(res => {
      this.localstora.exhibitionArea = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.localstora.delegation = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
  },
  computed: {
    ...mapGetters("dictData", ["dictionaryData"])
  },
  methods: {
    ...mapActions("subpanelGeneralArrangement", [
      "getlistDeadlineConfig", // 查询工作部设置的规则
      "adddeadlineConfig", // 工作部设置规则
      "updatedeadlineConfig", // 工作部编辑规则
      "deletedeadlineConfig" // 工作部删除规则
    ]),
    ...mapActions("nainformation", [
      "getexhibitionArea", // 展区
      "getdelegationDepartment" // 交易团
    ]),
    // 获取页面数据
    getListPage(Url) {
      this.getlistDeadlineConfig(Url)
        .then(res => {
          this.fullLoading = false;
          this.tableData = [];
          let getTable = JSON.parse(JSON.stringify(res.records));
          this.paginationData.total = res.total;
          this.paginationData.currentPage = res.current;
          this.paginationData.pageSize = res.size;
          for (let i = 0; i < getTable.length; i++) {
            getTable[i]["edit"] = false;
          }
          this.tableData = getTable;
          if (getTable.length > 0) {
            this.disable = true;
          } else {
            this.disable = false;
          }
        })
        .catch(e => {});
    },
    // 查询
    onSearch() {
      this.obj = {
        current: "1",
        size: "10"
      };
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
    // 编辑
    onEdit(val, valId) {
      if (this.lastIndexPage === "" || this.lastIndexPage === valId) {
        this.editform.configId = val.configId;
        let delg = (val.delegationList.replace(/(^\"*)|(\"*$)/g, "")).split(',');
        let exhb = (val.exhibitionAreaList.replace(/(^\"*)|(\"*$)/g, "")).split(',');
        // this.editform.delegationList = delg.split(',');
        let tempd = [];
        let temp = [];
        for (let i = 0; i < this.localstora.exhibitionArea.length; i++) {
          for (let key in exhb) {
            if (exhb[key] === this.localstora.exhibitionArea[i].exhibitionAreaName) {
              temp.push(this.localstora.exhibitionArea[i].exhibitionAreaCode);
            }
          }
        }
        // 数组去重
        for (let i = 0; i < temp.length; i++) {
          if (this.editform.exhibitionAreaList.indexOf(temp[i]) === -1) {
            this.editform.exhibitionAreaList.unshift(temp[i]);
          }
        }
        for (let i = 0; i < this.localstora.delegation.length; i++) {
          for (let key in delg) {
            if (delg[key] === this.localstora.delegation[i].deptName) {
              tempd.push(this.localstora.delegation[i].deptId);
            }
          }
        }
        // 数组去重
        for (let i = 0; i < tempd.length; i++) {
          if (this.editform.delegationList.indexOf(tempd[i]) === -1) {
            this.editform.delegationList.unshift(tempd[i]);
          }
        }
        // let hasd = {};
        // this.editform.exhibitionAreaList = this.editform.exhibitionAreaList.reduce(function(item, next) {
        //   hasd[next.exhibitionAreaCode] ? '' : hasd[next.exhibitionAreaCode] = true && item.push(next);
        //   return item;
        // }, []);
        let aedit = val.specialNumberRange.split('-');
        this.editform.specialNumberRangeA = aedit[0];
        this.editform.specialNumberRangeB = aedit[1];
        let bedit = val.standardNumberRange.split('-');
        this.editform.standardNumberRangeA = bedit[0];
        this.editform.standardNumberRangeB = bedit[1];
        let cedit = val.unificationNumberRange.split('-');
        this.editform.unificationNumberRangeA = cedit[0];
        this.editform.unificationNumberRangeB = cedit[1];
        let dedit = val.centerChannelNumberRange.split('-');
        this.editform.centerChannelNumberRangeA = dedit[0];
        this.editform.centerChannelNumberRangeB = dedit[1];
        this.tableData[valId]["edit"] = true;
        this.lastIndexPage = valId;
      } else {
        this.$confirm("是否放弃本次修改")
          .then(() => {
            for (let i = 0; i < this.tableData.length; i++) {
              this.tableData[i]["edit"] = false;
            }
            this.tableData[valId]["edit"] = true;
            this.lastIndexPage = valId;
          })
          .catch(() => {
            this.$message.info("已取消本次操作");
          });
      }
    },
    // 编辑 保存
    onServe(val, valId, datae) {
      this.lastIndexPage = "";
      this.editform.specialDeadline = JSON.stringify(this.editform.specialDeadline).substring(1, 11);
      this.editform.standardDeadline = JSON.stringify(this.editform.standardDeadline).substring(1, 11);
      this.editform.unificationDeadline = JSON.stringify(this.editform.unificationDeadline).substring(1, 11);
      this.editform.centerChannelDeadline = JSON.stringify(this.editform.centerChannelDeadline).substring(1, 11);
      let seav = {
        ordinaryDeadlineConfig: {
          configId: this.editform.configId
        },
        ordinaryDeadlineConfigAreaList: [],
        ordinaryDeadlineConfigDelegationList: [],
        ordinaryDeadlineConfigTypeList: [
          {
            // 特装
            type: "SPECIAL_BOOTH",
            deadline: this.editform.specialDeadline,
            numberRange: this.editform.specialNumberRangeA + "-" + this.editform.specialNumberRangeB
          },
          {
            // 标摊
            type: "STANDARD_BOOTH",
            deadline: this.editform.standardDeadline,
            numberRange: this.editform.standardNumberRangeA + "-" + this.editform.standardNumberRangeB
          },
          {
            // 统一布展
            type: "UNIFICATION_BOOTH",
            deadline: this.editform.unificationDeadline,
            numberRange: this.editform.unificationNumberRangeA + "-" + this.editform.unificationNumberRangeB
          },
          {
            // 中央通道
            type: "CENTER_CHANNEL_BOOTH",
            deadline: this.editform.centerChannelDeadline,
            numberRange: this.editform.centerChannelNumberRangeA + "-" + this.editform.centerChannelNumberRangeB
          }
        ]
      };
      for (let key in this.editform.delegationList) {
        let addDele = {
          delegationId: this.editform.delegationList[key],
          delegationName: ""
          // delegationCode: this.editform.delegationList[key]
        };
        for (let i in this.localstora.delegation) {
          if (addDele.delegationId === this.localstora.delegation[i].deptId) {
            addDele.delegationName = this.localstora.delegation[i].deptName;
            addDele.delegationCode = this.localstora.delegation[i].deptCode;
          }
        }
        seav.ordinaryDeadlineConfigDelegationList.push(addDele);
      }
      // 数组去重
      let hash = {};
      seav.ordinaryDeadlineConfigDelegationList = seav.ordinaryDeadlineConfigDelegationList.reduce(function(item, next) {
        hash[next.delegationId] ? '' : hash[next.delegationId] = true && item.push(next);
        return item;
      }, []);
      for (let key in this.editform.exhibitionAreaList) {
        let addArea = {
          exhibitionAreaCode: this.editform.exhibitionAreaList[key],
          exhibitionArea: ""
        };
        for (let i in this.localstora.exhibitionArea) {
          if (addArea.exhibitionAreaCode === this.localstora.exhibitionArea[i].exhibitionAreaCode) {
            addArea.exhibitionArea = this.localstora.exhibitionArea[i].exhibitionAreaName;
          }
        }
        seav.ordinaryDeadlineConfigAreaList.push(addArea);
      }
      // 数组去重
      let hasd = {};
      seav.ordinaryDeadlineConfigAreaList = seav.ordinaryDeadlineConfigAreaList.reduce(function(item, next) {
        hasd[next.exhibitionAreaCode] ? '' : hasd[next.exhibitionAreaCode] = true && item.push(next);
        return item;
      }, []);
      if ((this.editform.specialNumberRangeA > this.editform.specialNumberRangeB) || (this.editform.standardNumberRangeA > this.editform.standardNumberRangeB) || (this.editform.unificationNumberRangeA > this.editform.unificationNumberRangeB) || (this.editform.centerChannelNumberRangeA > this.editform.centerChannelNumberRangeB)) {
        this.$message({
          type: "error",
          message: "数值不符合规则"
        });
      } else {
        this.$refs[datae].validate((vald) => {
          if (vald) {
            this.updatedeadlineConfig(seav)
              .then(res => {
                this.tableData[valId]["edit"] = false;
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
                this.getListPage(this.obj); // 调用初始加载页面方法
              })
              .catch(e => {});
          } else {
            return false;
          }
        });
      }
    },
    // 删除
    onDele(val) {
      let intId = {
        configId: val.configId
      };
      this.$confirm("是否确认删除", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletedeadlineConfig(intId)
            .then(res => {
              this.$message({
                message: "删除成功！",
                type: "success"
              });
              this.getListPage(this.obj);
            })
            .catch(e => {});
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    // 新增 保存
    handSeave(fname) {
      for (let key in this.addForm.delegationList) {
        let addDele = {
          delegationId: this.addForm.delegationList[key],
          delegationName: ""
          // delegationCode: this.addForm.delegationList[key]
        };
        for (let i in this.localstora.delegation) {
          if (addDele.delegationId === this.localstora.delegation[i].deptId) {
            addDele.delegationName = this.localstora.delegation[i].deptName;
            addDele.delegationCode = this.localstora.delegation[i].deptCode;
          }
        }
        this.addData.ordinaryDeadlineConfigDelegationList.push(addDele);
      }
      // 数组去重
      let hash = {};
      this.addData.ordinaryDeadlineConfigDelegationList = this.addData.ordinaryDeadlineConfigDelegationList.reduce(function(item, next) {
        hash[next.delegationId] ? '' : hash[next.delegationId] = true && item.push(next);
        return item;
      }, []);
      for (let key in this.addForm.exhibitionAreaList) {
        let addArea = {
          exhibitionArea: "",
          exhibitionAreaCode: this.addForm.exhibitionAreaList[key]
        };
        for (let i in this.localstora.exhibitionArea) {
          if (addArea.exhibitionAreaCode === this.localstora.exhibitionArea[i].exhibitionAreaCode) {
            addArea.exhibitionArea = this.localstora.exhibitionArea[i].exhibitionAreaName;
          }
        }
        this.addData.ordinaryDeadlineConfigAreaList.push(addArea);
      }
      // 数组去重
      let hasd = {};
      this.addData.ordinaryDeadlineConfigAreaList = this.addData.ordinaryDeadlineConfigAreaList.reduce(function(item, next) {
        hasd[next.exhibitionAreaCode] ? '' : hasd[next.exhibitionAreaCode] = true && item.push(next);
        return item;
      }, []);
      let sped = JSON.stringify(this.addForm.specialDeadline).substring(1, 11);
      this.addForm.standardDeadline = JSON.stringify(this.addForm.standardDeadline).substring(1, 11);
      this.addForm.unificationDeadline = JSON.stringify(this.addForm.unificationDeadline).substring(1, 11);
      this.addForm.centerChannelDeadline = JSON.stringify(this.addForm.centerChannelDeadline).substring(1, 11);
      this.addData.ordinaryDeadlineConfigTypeList = [
        {
          // 特装
          type: "SPECIAL_BOOTH",
          deadline: sped,
          numberRange: this.addForm.specialNumberRangeA + "-" + this.addForm.specialNumberRangeB
        },
        {
          // 标摊
          type: "STANDARD_BOOTH",
          deadline: this.addForm.standardDeadline,
          numberRange: this.addForm.standardNumberRangeA + "-" + this.addForm.standardNumberRangeB
        },
        {
          // 统一布展
          type: "UNIFICATION_BOOTH",
          deadline: this.addForm.unificationDeadline,
          numberRange: this.addForm.unificationNumberRangeA + "-" + this.addForm.unificationNumberRangeB
        },
        {
          // 中央通道
          type: "CENTER_CHANNEL_BOOTH",
          deadline: this.addForm.centerChannelDeadline,
          numberRange: this.addForm.centerChannelNumberRangeA + "-" + this.addForm.centerChannelNumberRangeB
        }
      ];
      this.$refs[fname].validate((valid) => {
        if (valid) {
          if (this.addForm.specialNumberRangeA > this.addForm.specialNumberRangeB) {
            this.$message({
              type: "error",
              message: "特装展位数量范围数值不符合规则"
            });
          } else if (this.addForm.standardNumberRangeA > this.addForm.standardNumberRangeB) {
            this.$message({
              type: "error",
              message: "标摊展位数量范围数值不符合规则"
            });
          } else if (this.addForm.unificationNumberRangeA > this.addForm.unificationNumberRangeB) {
            this.$message({
              type: "error",
              message: "统一布展展位数量范围数值不符合规则"
            });
          } else if (this.addForm.centerChannelNumberRangeA > this.addForm.centerChannelNumberRangeB) {
            this.$message({
              type: "error",
              message: "中央通道展位数量范围数值不符合规则"
            });
          } else {
            this.adddeadlineConfig(this.addData).then(res => {
              this.isExhibit = false;
              this.$message({
                message: "保存成功",
                type: "success"
              });
              this.addForm = {
                delegationList: [],
                exhibitionAreaList: [],
                specialNumberRange: "",
                specialDeadline: "",
                standardNumberRange: "",
                standardDeadline: "",
                unificationNumberRange: "",
                unificationDeadline: "",
                centerChannelNumberRange: "",
                centerChannelDeadline: ""
              };
              this.addData = {
                ordinaryDeadlineConfig: {},
                ordinaryDeadlineConfigAreaList: [],
                ordinaryDeadlineConfigDelegationList: [],
                ordinaryDeadlineConfigTypeList: []
              };
              this.getListPage(this.obj); // 调用初始加载页面方法
            }).catch(e => {});
          }
        } else {
          return false;
        }
      });
    },
    // 新增 取消
    handcancel() {
      this.isExhibit = false;
      this.addForm = {
        delegationList: [],
        exhibitionAreaList: [],
        specialNumberRange: "",
        specialDeadline: "",
        standardNumberRange: "",
        standardDeadline: "",
        unificationNumberRange: "",
        unificationDeadline: "",
        centerChannelNumberRange: "",
        centerChannelDeadline: ""
      };
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
.floatLeft {
  float: left;
}
.cont {
  text-align: center;
  margin-top: 20px;
}
.wid {
  width: 250px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
.item-Num >>> input::-webkit-outer-spin-button,
.item-Num >>> input::-webkit-inner-spin-button {
-webkit-appearance: none!important;
}
.item-Num >>> input[type="number"]{
-moz-appearance: textfield!important;
}
</style>
