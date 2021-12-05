/**
* @file 产品已发布列表
* @author:wanglifeng
* @date:2019/1/17
*/
<template>
  <el-tabs v-model="activeName" @tab-click="">
    <el-tab-pane label="产品已发布列表" name="first">
      <el-form :inline="true" :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
        <el-table-column
          type="selection"
          width="80">
        </el-table-column>
        <el-form-item label="活动编号:" size="mini">
          <el-select v-model="ruleForm.activityCode" placeholder="请选择">
            <el-option v-for="(item,index) in activityCodes" :label="item.activityCode" :key="index"
                       :value="item.activityCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业名称:" size="mini">
          <el-input v-model.trim="ruleForm.companyNameCn" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="产品编号:" size="mini">
          <el-input v-model.trim="ruleForm.productNo" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="产品名称:" size="mini">
          <el-input v-model="ruleForm.productNameCn" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="发布阶段:" size="mini">
          <el-select v-model="ruleForm.publicStage" placeholder="请选择">
            <el-option label="初评" value="0"></el-option>
            <el-option label="终评" value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="发布状态:" size="mini">
          <el-select v-model="ruleForm.publicStatus" placeholder="请选择">
            <el-option label="已发布" value="1"></el-option>
            <el-option label="已撤销" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item size="mini">
          <el-button type="primary" @click="searchReleasedList()">查询</el-button>
          <el-button type="primary" @click="resetReleasedSearch()">重置</el-button>
        </el-form-item>
      </el-form>
      <template>
        <el-row class="btn-row">
          <el-button class="handle_btn" type="primary" :disabled="cancelBtn" @click="handleMultiCancel()">撤销</el-button>
          <el-button class="handle_btn" type="primary" :disabled="publishBtn" @click="handleMultiRelease()">发布</el-button>
          <el-button class="handle_btn" type="primary" @click="handleExportRelease()">导出</el-button>
        </el-row>
        <!--表格数据显示-->
        <el-table
          ref="multipleTable"
          :data="publishProductList"
          border
          style="width: 100%;"
          @select-all="handleTabSelectAll"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="companyNameCn"
            label="企业名称"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productNameCn"
            label="产品名称(中文)"
            align="center">
          </el-table-column>
          <el-table-column
            prop="productNo"
            label="产品编号"
            align="center">
          </el-table-column>
          <el-table-column
            label="产品类别"
            align="center">
            <template slot-scope="scope">
              <span v-for="(item,index) in productCategorys" :key="index">
                <span v-if="item.productCategoryId === scope.row.productCategoryId">{{item.productCategoryNameCn}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="activityNumber"
            label="发布阶段"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.stage=='0'">初评</span>
              <span v-else-if="scope.row.stage== '1'">终评</span>
              <span v-else>待审核</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==='1'">已发布</span>
              <span v-else>已撤销</span>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            fixed="right"
            width="200">
            <template slot-scope="scope">
              <el-button @click="handleSingleCancel(scope.row, scope.index)" type="text" size="mini" :disabled="scope.row.status==='0'">撤销</el-button>
              <el-button @click="handleSingleRelease(scope.row, scope.index)" type="text" size="mini" :disabled="scope.row.status==='1'">发布</el-button>
              <el-button @click="handleSetMasterPic(scope.row, scope.index)" type="text" size="mini">设置主图</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="paging"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="ruleForm.current"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="ruleForm.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalDatas"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
      </template>
      <!--产品信息弹窗-->
      <el-dialog title="产品信息" :visible.sync="dialogProduct" class="formProduct">
        <div style="padding: 20px">
          <el-form :model="productMasterPic" class="demo-form-inline">
            <el-form-item label-width="0">
              <!-- 单选 -->
              <el-radio-group v-model="productImgRadio">
                <el-col :span="8" v-for="(img,index) in productMainImages" :key="index" class="img_radio">
                 <div style="text-align: center;">
                   <img
                     :src="showSmallImg(img.imagePath)"
                     alt="" class="smallimg" @click="changeImageTab(index)">
                   <el-radio :label="index" >
                     <p style="text-align: center">设置为主图</p>
                   </el-radio>
                 </div>
                </el-col>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="描述（中文）:" size="mini">
              <el-input v-model="productMasterPic.descriptionCn" type="textarea" placeholder="请输入中文描述"></el-input>
            </el-form-item>
            <el-form-item label="描述（英文）:" size="mini">
              <el-input v-model="productMasterPic.descriptionEn" type="textarea" placeholder="请输入英文描述"></el-input>
            </el-form-item>

          </el-form>
          <div class="dialog-footer">
            <el-button type="primary" @click="setMasterPic()">确 认</el-button>
            <el-button @click="dialogProduct = false">取 消</el-button>
          </div>
        </div>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
  import http from "@/scripts/framework/http";

  export default {
    name: "productReleasedList",
    data() {
      return {
        totalDatas: 0,

        activeName: 'first',
        multipleSelection: '',
        cancelBtn: true,
        publishBtn: true,
        productImgRadio: 0,
        productImages: [],
        productMainImages: [],
        awardProductId: '',
        dialogProduct: false,
        productMasterPic: {
          productImageId: '',
          descriptionCn: '',
          descriptionEn: ''
        },
        activityCodes: [],
        productCategorys: [],
        publishProductList: [],
        publishIds: [],
        publishCancelIds: [],
        noPublishIds: [],
        ruleForm: {
          activityCode: '',
          productNo: '',
          companyNameCn: '',
          productNameCn: '',
          publicStatus: '',
          publicStage: '',
          current: 1,
          size: 10
        },
        baseApi: process.env.API_CF_URL
      };
    },
    mounted() {
      this.getActivityList();
    },
    methods: {
      // 图片地址拼接
      showSmallImg(imagePath) {
        return this.baseApi + "/api/customservice/cf/viewImage/" + imagePath;
      },
      /*
       *   数据获取
       */
      // 获取活动列表
      getActivityList() {
        http.get(this.baseApi + '/api/customservice/cf/getCfActivityCode').then(res => {
          this.activityCodes = res.records;
          this.ruleForm.activityCode = this.activityCodes[0].activityCode;
          this.getProductCategoryInfo(this.activityCodes[0].activityCode);
          this.getProductPublishList();
        }).catch(error => {

        });
      },
      // 获取所有的产品分类信息
      getProductCategoryInfo(activityCode) {
        http.get(this.baseApi + '/api/customservice/cf/listProductCategory', {
          activityCode: activityCode
        }).then(res => {
          this.productCategorys = res.records;
        }).catch(error => {

        });
      },
      // 获取已产品发布列表
      getProductPublishList() {
        http.get(this.baseApi + '/api/customservice/cf/getPublicRecordList', this.ruleForm).then(res => {
          this.publishProductList = res.records;
          this.totalDatas = res.total;
          this.ruleForm.current = res.current;
        }).catch(error => {
        });
      },
      // 获取产品资料详情
      getProductDetailInfo() {
        http.get(this.baseApi + '/api/customservice/cf/getCfProduct', {
          awardProductId: this.awardProductId
        }).then(res => {
          if (res.productImages instanceof undefined) {
            this.productImages = [];
          } else {
            this.productImages = res.productImages;
          }
        }).catch(error => {
        });
      },
      // 获取产品形象图片
      getProductImgList() {
        http.get(this.baseApi + '/api/customservice/cf/getImageByProductId', {
          awardProductId: this.awardProductId
        }).then(res => {
          this.productMainImages = res.records;
          if (this.productMainImages.length > 0) {
            for (let i = 0, length = this.productMainImages.length; i < length; i++) {
              if (this.productMainImages[i].isMaster === 1) {
                this.productImgRadio = i;
              }
            }
            this.productMasterPic.descriptionCn = this.productMainImages[this.productImgRadio].descriptionCn;
            this.productMasterPic.descriptionEn = this.productMainImages[this.productImgRadio].descriptionEn;
          }
        }).catch(error => {
        });
      },
      // 产品发布请求
      productPublish(publishIds) {
        http.post(this.baseApi + '/api/customservice/cf/reAddPublicRecord', { publicRecordIds: publishIds }).then(res => {
          this.$message.success("产品发布成功");
          this.getProductPublishList();
        }).catch(error => {
          this.$message.error("产品发布失败:" + error);
        });
      },
      // 产品发布撤销
      productPublishCancel(publishCancelIds) {
        http.post(this.baseApi + '/api/customservice/cf/cancelPublicRecord', { publicRecordIds: publishCancelIds }).then(res => {
          this.$message.success("撤销成功");
          this.getProductPublishList();
        }).catch(error => {
          this.$message.error("撤销失败:" + error);
        });
      },
      // 主图设置数据请求
      setMasterPic() {
        this.productMasterPic.productImageId = this.productMainImages[this.productImgRadio].productImageId;
        http.postJson(this.baseApi + '/api/customservice/cf/setMasterImage', this.productMasterPic).then(res => {
          this.$message.success("主图设置成功");
          this.dialogProduct = false;
        }).catch(error => {
          this.$message.error("主图设置失败");
        });
      },
      /*
       * 点击事件处理
       */
      // 表格选择框
      handleSelectionChange(val) {
        this.publishIds = [];
        this.noPublishIds = [];
        this.publishCancelIds = [];
        this.multipleSelection = val;
        // 对表格进行数据处理,获取对应的id分别存放到publishIds,publishCancelIds
        if (val.length > 0) {
          let length = val.length;
          for (let i = 0; i < length; i++) {
            // 0表示未发布，未发布的不能撤销，发布的不可以重新发布
            if (val[i].status === '0') {
              this.noPublishIds.push(val[i].publicRecordId);
            } else {
              this.publishCancelIds.push(val[i].publicRecordId);
            }
          }
          if (this.publishCancelIds.length === 0) {
            this.cancelBtn = true;
          } else {
            this.cancelBtn = false;
          }
          if (this.noPublishIds.length === 0) {
            this.publishBtn = true;
          } else {
            this.publishBtn = false;
          }


        } else {
          // true表示按钮被禁用
          this.cancelBtn = true;
          this.publishBtn = true;
        }
      },
      // 全选按钮操作
      handleTabSelectAll(val) {
        this.publishIds = [];
        this.noPublishIds = [];
        this.publishCancelIds = [];
        this.multipleSelection = val;
        // 对表格进行数据处理,获取对应的id分别存放到publishIds,publishCancelIds
        if (val.length > 0) {
          let length = val.length;
          for (let i = 0; i < length; i++) {
            // 0表示未发布，未发布的不能撤销，发布的可以重新发布
            if (val[i].status === '0') {
              this.noPublishIds.push(val[i].publicRecordId);
            } else {
              this.publishCancelIds.push(val[i].publicRecordId);
            }
          }
          if (this.publishCancelIds.length === 0) {
            this.cancelBtn = true;
          } else {
            this.cancelBtn = false;
          }

          if (this.noPublishIds === 0) {
            this.publishBtn = true;
          } else {
            this.publishBtn = false;
          }
        } else {
          // true表示按钮被禁用
          this.cancelBtn = true;
          this.publishBtn = true;
        }
      },
      // 进行图片切换
      changeImageTab(index) {
        this.productImgRadio = index;
      },
      // 设置主图
      handleSetMasterPic(row, index) {
        this.awardProductId = row.awardProductId;
        this.dialogProduct = true;
        this.getProductImgList();
      },
      // 单个发布
      handleSingleRelease(row, index) {
        this.productPublish(row.publicRecordId);
      },
      // 单个撤销
      handleSingleCancel(row, index) {
        this.showDialogTips("确认撤销发布吗?").then(() => {
          this.productPublishCancel(row.publicRecordId);
        }).catch(() => { });
      },
      // 多个发布
      handleMultiRelease() {
        if (this.publishCancelIds.length > 0) {
          this.$message.error("所选产品中包含已发布的产品，请重新选择!");
        } else {
          this.productPublish(this.noPublishIds.join());
        }
      },
      // 多个撤销
      handleMultiCancel() {
        if (this.noPublishIds.length > 0) {
          this.$message.error("所选产品中包含已撤销发布的产品，请重新选择!");
        } else {
          this.showDialogTips("确认撤销发布吗?").then(() => {
            this.productPublishCancel(this.publishCancelIds.join());
          }).catch(() => { });
        }
      },
      // 导出产品已发布列表
      handleExportRelease() {
        this.excelDownload('/api/customservice/cf/downPubilcProductExcel', this.ruleForm);
      },
      excelDownload(url, formData) {
        // let publishApi = "http://139.9.71.183:9014";
        let excelUrl = this.baseApi + url + '?';
        for (let item in formData) {
          excelUrl = excelUrl + item + "=" + formData[item] + "&";
        }
        excelUrl = excelUrl.substring(0, excelUrl.length - 1);
        window.open(excelUrl);
      },
      // 表单搜索查询
      searchReleasedList() {
        this.getProductPublishList();
      },
      // 重置已发布列表搜索表单
      resetReleasedSearch() {
        this.resetFormData(this.ruleForm);
      },
      // 分页每页的页数选择
      handleSizeChange(val) {
        this.ruleForm.size = val;
      },
      // 页码切换
      handleCurrentChange(val) {
        this.ruleForm.current = val;
        this.getProductPublishList();
      },
      // 重置搜索表单
      resetFormData(resetObj) {
        for (let item in resetObj) {
          if (item === "activityCode") {
            resetObj[item] = this.activityCodes[0].activityCode;
          } else if (item === "current") {
            resetObj[item] = resetObj[item];
          } else if (item === "size") {
            resetObj[item] = resetObj[item];
          } else {
            resetObj[item] = '';
          }
        }
      },
      // 消息提示
      showDialogTips(tipMessage) {
        return this.$confirm(tipMessage, '操作提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        });
      }
    },
    watch: {
      productImgRadio(val, oldVal) {
        this.productMasterPic.descriptionCn = this.productMainImages[val].descriptionCn;
        this.productMasterPic.descriptionEn = this.productMainImages[val].descriptionEn;
      }
    }
  };
</script>

<style scoped>
  .btn-row{
    margin: 0  30px;
  }

  .btn-row .handle_btn{
    padding: 10px 40px;
  }

  .dialog-footer{
    text-align: center;
    margin: 20px 0;
    padding-bottom: 10px;
  }
  .smallimg{
    height: 120px;
    width: 120px;
    margin: 5px 5px;
  }
  .paging{
    margin: 10px auto;
    text-align: center;
  }
  .img_radio{
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
