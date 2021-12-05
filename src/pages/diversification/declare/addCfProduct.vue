/**
* @file 产品基本资料
* @author:wanglifeng
* @date:2019/1/15
*/
<template>

  <el-tabs v-model="activeName" class="tabs">
    <el-tab-pane :disabled="tabsNo < 1" label="产品基本资料" name="first">
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
        <el-form-item class="item" label="产品所属类别：" prop="productCategoryId" size="small">
          <el-select v-model="ruleForm.productCategoryId" placeholder="请选择">
            <el-option v-for="(item, index) in categoryOption" :label="item.productCategoryNameCn" :value="item.productCategoryId" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="item" label="产品型号：" prop="productModel" size="small">
          <el-input v-model.trim="ruleForm.productModel" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="产品名称（中文）：" prop="productNameCn" size="small">
          <el-input v-model.trim="ruleForm.productNameCn" clearable></el-input>
          <el-button class="tip5" @click="chooseProductName" size="small" disabled>选择</el-button>
        </el-form-item>

        <el-form-item class="item" label="产品名称（英文）：" prop="productNameEn" size="small">
          <el-input v-model.trim="ruleForm.productNameEn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="市场通用名（中文）：" prop="genericNameCn" size="small">
          <el-input v-model.trim="ruleForm.genericNameCn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="市场通用名（英文）：" prop="genericNameEn" size="small">
          <el-input v-model.trim="ruleForm.genericNameEn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="上市日期：" prop="marketDate" size="small">
          <el-date-picker
            v-model="ruleForm.marketDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="产品设计主体：" label-width="120" prop="designSubject" size="small">
          <el-radio-group v-model="ruleForm.designSubject">
            <el-radio :label="0">内部研发团队</el-radio>
            <el-radio :label="1">外部设计机构</el-radio>
            <el-radio :label="2">前二者结合</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="item" label="设计费/研发成本（美元）：" size="small">
          <el-input v-model.number="ruleForm.designFee" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="已投放市场区域（中文）：" prop="marketAreaCn" size="small">
          <el-input v-model.trim="ruleForm.marketAreaCn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="国际市场出口价（美元）：" size="small">
          <el-input v-model.number="ruleForm.exportFee" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="已投放市场区域（英文）：" prop="marketAreaEn" size="small">
          <el-input v-model.trim="ruleForm.marketAreaEn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="产品实用新型专利号：" size="small">
          <el-input v-model.trim="ruleForm.utilitionPatent" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="产品外观设计专利号：" size="small">
          <el-input v-model.trim="ruleForm.designPatent" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="产品发明专利号：" size="small">
          <el-input v-model.trim="ruleForm.inventionPatent" clearable></el-input>
        </el-form-item>

        <el-form-item label="产品获奖奖项：" size="small">
          <el-checkbox-group v-model="ruleForm.designAwards">
            <el-checkbox label="1">IF奖</el-checkbox>
            <el-checkbox label="2">红点奖</el-checkbox>
            <el-checkbox label="3">GMARK奖</el-checkbox>
            <el-checkbox label="4">IDEA奖</el-checkbox>
            <!--<el-checkbox label="5">Gooddesign奖</el-checkbox>-->
            <el-checkbox label="6">红星奖</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item class="item" label="其他国际设计奖（中文）：" size="small">
          <el-input v-model="ruleForm.designAwardCn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="其他国际设计奖（英文）：" size="small">
          <el-input v-model="ruleForm.designAwardEn" clearable></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm1('ruleForm')">保存</el-button>
          <el-button class="btn2" @click="goBack('tab1')">返回</el-button>
        </el-form-item>
        <!-- 选择产品名称弹窗 -->
        <el-dialog title="产品选择" :visible.sync="dialogChooseProductName" width="">
          <el-form :inline="true" :model="dialogChooseProduct" class="demo-form-inline">
            <el-row>
              <el-col :span="9">
                <el-form-item label="产品名称">
                  <el-input v-model.trim="dialogChooseProduct.productName" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="产品编号">
                  <el-input v-model.trim="dialogChooseProduct.productId" size="mini"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item>
                  <!--<el-button type="primary" @click="onSubmit">查询</el-button>-->
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="gridData">
            <el-table-column property="date" label="序号" type="index" width="60"></el-table-column>
            <el-table-column property="date" label="产品名称" width="150"></el-table-column>
            <el-table-column property="name" label="产品编号" width="200"></el-table-column>
            <el-table-column property="address" label="操作">
              <template slot-scope="scope">
                <el-button @click="handleClick(scope.row)" type="text" size="mini">加入</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogChooseProductName = false" size="small">关 闭</el-button>
          </div>
        </el-dialog>

      </el-form>
    </el-tab-pane>

    <el-tab-pane :disabled="tabsNo < 2" label="产品形象图" name="second">
      <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="200px" class="demo-ruleForm">

        <el-row>
          <span style="color: #ff0000;position: absolute;left: 78px;top: 8px;">*</span>
          <el-form-item label="产品形象图片：" size="small">
            <el-upload
              :multiple="false"
              :action="uploadApi"
              :headers="header"
              :limit="1"
              accept=".jpg,.jpeg,.png,.bmp"
              :data="postdata"
              :class="{ disabled: addShowIconFirst}"
              class="uploadImage"
              list-type="picture-card"
              :auto-upload="true"
              :before-upload="beforeUploadImageFirst"
              :on-change="handleImageChangeFirst"
              :on-success="uploadImageSuccessFirst"
              :on-preview="handleImagePreviewFirst"
              :on-error="uploadImageErrorFirst"
              :on-remove="handleImageRemoveFirst"
              :file-list="fileImageListFirst"
              ref="imguploadFirst">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-upload
              :multiple="false"
              :headers="header"
              :action="uploadApi"
              :limit="1"
              accept=".jpg,.jpeg,.png,.bmp"
              :data="postdata"
              :class="{ disabled: addShowIconSecond }"
              class="uploadImage"
              list-type="picture-card"
              :auto-upload="true"
              :before-upload="beforeUploadImageSecond"
              :on-change="handleImageChangeSecond"
              :on-success="uploadImageSuccessSecond"
              :on-preview="handleImagePreviewSecond"
              :on-error="uploadImageErrorSecond"
              :on-remove="handleImageRemoveSecond"
              :file-list="fileImageListSecond"
              ref="imguploadSecond">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-upload
              :multiple="false"
              :headers="header"
              :action="uploadApi"
              :limit="1"
              accept=".jpg,.jpeg,.png,.bmp"
              :data="postdata"
              :class="{ disabled: addShowIconThird}"
              list-type="picture-card"
              class="uploadImage"
              :auto-upload="true"
              :before-upload="beforeUploadImageThird"
              :on-change="handleImageChangeThird"
              :on-success="uploadImageSuccessThird"
              :on-preview="handleImagePreviewThird"
              :on-error="uploadImageErrorThird"
              :on-remove="handleImageRemoveThird"
              :file-list="fileImageListThird"
              ref="imguploadThird">
              <i class="el-icon-plus"></i>
            </el-upload>
            <p style="display: block;">数量3张、jpg、jpeg、png格式，每张大小2M以内,默认第一张为主图;</p>
            <el-dialog :visible.sync="dialogImageVisible" width="60%" show-close>
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item class="item-block" label="图片1说明（中文）：" size="small" prop="images[0].descriptionCn" :rules="rules.descriptionCn">
            <el-input class="item-textarea" v-model.trim="ruleForm2.images[0].descriptionCn" type="textarea" clearable maxlength="100"></el-input>
            <span class="tip">
              <span class="color-red">图片1为主照片，要求：</span>
              <br>
              <span>1、从产品的正面拍摄，聚焦于产品本身；</span>
              <br>
              <span>2、背景为白色或浅灰色调，或模糊处理；</span>
              <br>
              <span>3、请附图片说明（中英文各不超过100个字/单词）；</span>
            </span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="item-block" label="图片1说明（英文）：" size="small" prop="images[0].descriptionEn" :rules="rules.descriptionEn">
            <el-input class="item-textarea" v-model.trim="ruleForm2.images[0].descriptionEn" type="textarea" clearable maxlength="100"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item class="item-block" label="图片2说明（中文）：" size="small" prop="images[1].descriptionCn" :rules="[{ required: true, message: '请输入图片2的中文描述', trigger: 'blur' }]">
            <el-input class="item-textarea" v-model.trim="ruleForm2.images[1].descriptionCn" type="textarea" clearable maxlength="100"></el-input>
            <span class="tip tip2">
              <span class="color-red">图片2 要求：</span>
              <br>
              <span>描述产品用途的图片，并附说明（中英文各不超过100个字/单词）；</span>
            </span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="item-block" label="图片2说明（英文）：" size="small" prop="images[1].descriptionEn" :rules="[{ required: true, message: '请输入图片2的英文描述', trigger: 'blur' }]">
            <el-input class="item-textarea" v-model.trim="ruleForm2.images[1].descriptionEn" type="textarea" clearable maxlength="100"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item class="item-block" label="图片3说明（中文）：" size="small" prop="images[2].descriptionCn" :rules="[{ required: true, message: '请输入图片3的中文描述', trigger: 'blur' }]">
            <el-input class="item-textarea" v-model.trim="ruleForm2.images[2].descriptionCn" type="textarea" clearable maxlength="100"></el-input>
            <span class="tip tip3">
              <span class="color-red">图片3 要求：</span>
              <br>
              <span>描述产品设计创新点的图片，并附说明（中英文各不超过100个字/单词）；</span>
            </span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="item-block" label="图片3说明（英文）：" size="small" prop="images[2].descriptionEn" :rules="[{ required: true, message: '请输入图片3的英文描述', trigger: 'blur' }]">
            <el-input class="item-textarea" v-model.trim="ruleForm2.images[2].descriptionEn" type="textarea" clearable maxlength="100"></el-input>
          </el-form-item>
        </el-row>

        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm2('ruleForm2')">保存</el-button>
          <el-button class="btn2" @click="goBack('tab2')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>

    <el-tab-pane :disabled="tabsNo < 3" label="产品技术规格" name="third">
      <el-form :model="ruleForm3" inline="true" :rules="rules" ref="ruleForm3" label-width="200px" class="demo-form3">
        <el-row>
          <el-form-item style="display: inline-block; width: 310px;" label="产品尺寸（厘米）：" prop="standardLong" size="small">
            <el-input class="item-size" v-model="ruleForm3.standardLong" placeholder="长" clearable></el-input>
          </el-form-item>
          <el-form-item style="display: inline-block; width: 105px;" prop="standardWidth" size="small">
            <el-input class="item-size" v-model="ruleForm3.standardWidth" placeholder="宽" clearable></el-input>
          </el-form-item>
          <el-form-item style="display: inline-block; width: 105px;" prop="standardHight" size="small">
            <el-input class="item-size" v-model="ruleForm3.standardHight" placeholder="高" clearable></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="item-block" label="产品重量（千克）：" prop="standardWeight" size="small" style="width: 500px">
            <el-input v-model="ruleForm3.standardWeight" clearable></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="item-block" label="材质（中文）：" prop="materialCn" size="small" style="width: 500px">
            <el-input v-model.trim="ruleForm3.materialCn" clearable></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="item-block" label="材质（英文）：" prop="materialEn" size="small" style="width: 500px">
            <el-input v-model.trim="ruleForm3.materialEn" clearable></el-input>
          </el-form-item>
        </el-row>

        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm3('ruleForm3')">保存</el-button>
          <el-button class="btn2" @click="goBack('tab3')">返回</el-button>
        </el-form-item>

      </el-form>
    </el-tab-pane>

    <el-tab-pane :disabled="tabsNo < 4" label="设计师信息" name="fourth">
      <el-form :model="ruleForm4" :inline="true" :rules="rules" ref="ruleForm4" label-width="180px" class="demo-ruleForm">

        <div v-for="(item,index) in ruleForm4.designerList" :key="index">
          <el-row>
            <el-col :span="10">
              <el-form-item label="设计师名称（中文）：" size="small" :prop="`designerList.${index}.designerNameCn`" :rules="index==0?rules.designerNameCn:''">
                <el-input v-model.trim="item.designerNameCn" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="设计师名称（英文）：" size="small" :prop="`designerList.${index}.designerNameEn`" :rules="index==0?rules.designerNameEn:''">
                <el-input v-model.trim="item.designerNameEn" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-button v-if="index==0" type="danger" size="mini" @click="addDesigner">添加</el-button>
              <el-button v-else type="danger" size="mini" @click="deleteDesigner(index)">删除</el-button>
              <el-button v-if="index==0" type="warning" size="mini" @click="chooseDesigner">选择</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="职务（中文）" size="small" :prop="`designerList.${index}.positionCn`" :rules="index==0?rules.positionCn:''">
                <el-input v-model.trim="item.positionCn" clearable></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="职务（英文）" size="small" :prop="`designerList.${index}.positionEn`" :rules="index==0?rules.positionEn:''">
                <el-input v-model.trim="item.positionEn" clearable></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </div>

        <el-row>
          <el-form-item class="el-form-item-btn">
            <el-button class="btn1" @click="submitForm4('ruleForm4')">保存</el-button>
            <el-button class="btn2" @click="goBack('tab4')">返回</el-button>
          </el-form-item>
        </el-row>

        <el-dialog title="设计师信息" :visible.sync="dialogTableVisible" width="750px">
          <el-form :inline="true" :model="ruleForm" label-width="50px" class="demo-ruleForm">
            <el-row>
              <el-col :span="9">
                <el-form-item label="姓名:" size="mini">
                  <el-input v-model.trim="searchForm.designerNameCn" placeholder="请输入" clearable style="width: 140px;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="职务:" size="mini">
                  <el-input v-model.trim="searchForm.positionCn" placeholder="请输入" clearable style="width: 140px;"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item size="mini">
                  <el-button type="primary" @click="searchDesigner()">查询</el-button>
                  <el-button type="primary" @click="resetSearchForm()">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="designerData" @selection-change="changeFun">
            <el-table-column type="selection" label="日期" width="80"></el-table-column>
            <el-table-column property="designerNameCn" label="姓名" width="200"></el-table-column>
            <el-table-column property="positionCn" label="职务"></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="addDesignerList" size="small">确 定</el-button>
          </div>
        </el-dialog>
      </el-form>
    </el-tab-pane>

    <el-tab-pane :disabled="tabsNo < 5" label="产品佐证材料" name="five">
      <el-form :model="ruleForm5" :rules="rules" ref="ruleForm5" label-width="200px" class="demo-ruleForm">
        <el-row>
          <el-form-item class="" label="产品材料：" size="small">
            <el-upload
              class="upload-demo item-inline-block"
              :action="uploadApi"
              :headers="header"
              :data="postdata2"
              :limit="5"
              :before-upload="beforeUpload2"
              :on-success="uploadSuccess2"
              :on-remove="handleDelete2"
              :on-exceed="exceed2"
              accept=".jpg,.jpeg,.png,.gif,.pdf,.JPG,.JPEG,.GIF,.PDF"
              :file-list="fileList2"
              :auto-upload="true">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <div slot="tip" class="el-upload__tip item-inline-block">包括获奖证书、专利证书、质量认证材料等，gif、jpg、png、pdf等格式，单个文件5M以内</div>
            </el-upload>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="视频资料：" size="small">
            <el-input v-model.trim="ruleForm5.videoPath" placeholder="http://" clearable style="width: 300px"></el-input>
            <span class="tip tip4">云盘视频网址及播放地址</span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="el-form-item-btn">
            <el-button class="btn3" @click="submitForm('ruleForm')">提交</el-button>
            <el-button class="btn1" @click="submitForm5('ruleForm5')">保存</el-button>
            <el-button class="btn2" @click="goBack('tab5')">返回</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
// import http from "@/scripts/framework/http";
export default {
  name: "addCfProduct",
  data() {
    // 验证0和正整数
    const checkNumber = (rule, value, callback) => {
      if (!/^[+]{0,1}(\d+)$/i.test(value)) { //正整数正则
        return callback(new Error("请输入数字"));
      } else {
        return callback();
      }
    };
    const checkdecimal = (rule, value, callback) => {
      let decimal = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/;
      let match = decimal.test(value);
      if (!match) {
        return callback(new Error('请输入数字，且只能保留小数点后2位!'));
      } else {
        return callback();
      }
    };
    // const checkEn = (rule, value, callback) => {
    //   if (!/^[a-zA-Z]*$/i.test(value)) { //英文正则
    //     return callback(new Error("请输入英文"));
    //   }
    //   return callback();
    // };
    // const checkCn = (rule, value, callback) => {
    //   let reg = /^[\u4e00-\u9fa5]+$/; //中文正则
    //   if (!reg.test(value)) {
    //     return callback(new Error("请输入中文"));
    //   }
    //   return callback();
    // };
    // const checkEn2 = (rule, value, callback) => {
    //   if (!/^[a-zA-Z]|[a-zA-Z\s][a-zA-Z]|[\\pP]/i.test(value)) { //英文正则
    //     return callback(new Error("请输入英文"));
    //   }
    //   return callback();
    // };
    // const checkCn2 = (rule, value, callback) => {
    //   let reg = /^[\u4e00-\u9fa5]|[\（\）\《\》\——\；\，\。\“\”\<\>\！]/; //中文正则
    //   if (!reg.test(value)) {
    //     return callback(new Error("请输入中文"));
    //   }
    //   return callback();
    // };
    return {
      header: {
        Token: this.$store.state.token
      },
      tabsNo: 1,
      activeName: 'first',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e6;
        }
      },
      addShowIconFirst: false,  // 是否显示形象图片上传的按钮
      addShowIconSecond: false,  // 是否显示形象图片上传的按钮
      addShowIconThird: false,  // 是否显示形象图片上传的按钮
      fileImageListFirst: [],
      fileImageListSecond: [],
      fileImageListThird: [],
      fileImagesFirst: [],
      fileImagesSecond: [],
      fileImagesThird: [],
      postdata: { code: 1 },
      postdata2: { code: 2 },
      multipleSelection: '',
      awardProductId: '',
      uploadApi: '',
      edit: false, // true时，为修改；false时，为新增
      ruleForm: {
        productCategoryId: '',
        productModel: '',
        productNameCn: '',
        productNameEn: '',
        genericNameCn: '',
        genericNameEn: '',
        marketDate: '',
        designSubject: 1,
        designFee: '',
        marketAreaCn: '',
        exportFee: '',
        marketAreaEn: '',
        utilitionPatent: '',
        inventionPatent: '',
        designAwards: [],
        // designAwards: '',
        designAwardCn: '',
        designAwardEn: '',
        designPatent: ''
      },
      addShowIcon: false, // 上传图片超过3张，隐藏上传图片的按钮
      ruleForm2: {
        images: [
          {
            descriptionCn: '',
            descriptionEn: '',
            imagePath: ''
          },
          {
            descriptionCn: '',
            descriptionEn: '',
            imagePath: ''
          },
          {
            descriptionCn: '',
            descriptionEn: '',
            imagePath: ''
          }
        ],
        awardProductId: ''
      },
      ruleForm3: {
        // 产品技术规格
        standardLong: '',
        standardWidth: '',
        standardHight: '',
        standardWeight: '',
        materialCn: '',
        materialEn: ''
      },
      ruleForm4: {
        // 设计师列表
        designerList: [
          {
            awardProductId: '',
            designerNameCn: '',
            designerNameEn: '',
            positionCn: '',
            positionEn: ''
          }
        ]
      },
      ruleForm5: {
        awardProductId: '',
        videoPath: '',
        attachments: []
      },
      searchForm: {
        designerNameCn: '',
        positionCn: ''
      },
      dialogImageUrl: '',
      categoryOption: [], // 产品类别
      dialogChooseProductName: false, // 选择产品名称
      dialogImageVisible: false, // 添加产品形象图
      dialogTableVisible: false, // 设计师 dialog 显示隐藏
      gridData: [], // dialog 里面的表格数据
      designerData: [], // 设计师dialog 里面的表格数据
      dialogChooseProduct: {
        productName: '',
        productId: ''
      },
      // fileList: [],
      fileList2: [],
      rules: {
        // tab1
        productCategoryId: [
          { required: true, message: '请选择产品类别', trigger: 'change' }
        ],
        productModel: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        productNameCn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkCn, trigger: 'blur' }
        ],
        productNameEn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkEn, trigger: 'blur' }
        ],
        genericNameCn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkCn, trigger: 'blur' }
        ],
        genericNameEn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkEn, trigger: 'blur' }
        ],
        marketDate: [
          { required: true, message: '不能为空', trigger: 'blur' }
        ],
        designSubject: [
          { required: true, message: '不能为空', trigger: 'change' }
        ],
        marketAreaCn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkCn, trigger: 'blur' }
        ],
        marketAreaEn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkEn, trigger: 'blur' }
        ],
        //tab2
        descriptionCn: [
          { required: true, message: '不能为空,请输入中文描述', trigger: 'blur' }
          // ,
          // { required: true, validator: checkCn2, trigger: 'blur' }
        ],
        descriptionEn: [
          { required: true, message: '不能为空,请输入英文描述', trigger: 'blur' }
          // ,
          // { required: true, validator: checkEn2, trigger: 'blur' }
        ],
        // tab3
        standardLong: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { required: true, validator: checkNumber, trigger: 'blur' }
        ],
        standardWidth: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { required: true, validator: checkNumber, trigger: 'blur' }
        ],
        standardHight: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { required: true, validator: checkNumber, trigger: 'blur' }
        ],
        standardWeight: [
          { required: true, message: '不能为空', trigger: 'blur' },
          { validator: checkdecimal, trigger: 'blur' }
        ],
        materialCn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkCn, trigger: 'blur' }
        ],
        materialEn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkEn, trigger: 'blur' }
        ],
      //  设计师
        designerNameCn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkCn, trigger: 'blur' }
        ],
        designerNameEn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkEn, trigger: 'blur' }
        ],
        positionCn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkCn, trigger: 'blur' }
        ],
        positionEn: [
          { required: true, message: '不能为空', trigger: 'blur' }
          // ,
          // { required: true, validator: checkEn, trigger: 'blur' }
        ]
      },
      // baseApi: 'http://192.168.1.111:9014'
      baseApi: process.env.API_CF_URL
    };
  },
  methods: {
    /*
       * 图片及文件上传回调方法
       */
    // 形象图片1---上传前回调
    beforeUploadImageFirst(file) {
      return this.imageUploadFileType(file);
    },
    // 形象图片1---上传成功回调
    uploadImageSuccessFirst(res, file) {
      if (res.data == null) {
        this.$refs.imguploadFirst.clearFiles();
      } else {
        let image = {
          url: res.data,
          name: file.name
        };
        this.fileImagesFirst.push(image);
      }
    },
    // 形象图片1---上传失败
    uploadImageErrorFirst() {
      this.$message.error("图片上传失败");
    },
    // 形象图片1---有图片上传或者删除
    handleImageChangeFirst(file, fileList) {
      if (fileList.length >= 1) {
        this.addShowIconFirst = true;
      } else {
        this.addShowIconFirst = false;
      }
    },
    // 形象图片1---图片预览
    handleImagePreviewFirst(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },
    // 形象图片1---移除
    handleImageRemoveFirst(file, fileList) {
      this.fileImagesFirst = [];
      // 需要对this.fileImages进行操作
      if (fileList.length >= 1) {
        this.addShowIconFirst = true;
      } else {
        this.addShowIconFirst = false;
      }
    },

    // 形象图片2---上传前回调
    beforeUploadImageSecond(file) {
      return this.imageUploadFileType(file);
    },
    // 形象图片2---上传成功回调
    uploadImageSuccessSecond(res, file) {
      if (res.data == null) {
        this.$refs.imguploadSecond.clearFiles();
      } else {
        let image = {
          url: res.data,
          name: file.name
        };
        this.fileImagesSecond.push(image);
      }
    },
    // 形象图片2---上传失败
    uploadImageErrorSecond() {
      this.$message.error("图片上传失败");
    },
    // 形象图片2---有图片上传或者删除
    handleImageChangeSecond(file, fileList) {
      if (fileList.length >= 1) {
        this.addShowIconSecond = true;
      } else {
        this.addShowIconSecond = false;
      }
    },
    // 形象图片2---图片预览
    handleImagePreviewSecond(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },
    // 形象图片2---移除
    handleImageRemoveSecond(file, fileList) {
      this.fileImagesSecond.forEach((item, index) => {
        if (file.url.indexOf(item) !== -1) {
          this.fileImagesSecond.splice(index, 1);
        }
      });
      this.fileImagesSecond = [];
      // 需要对this.fileImages进行操作
      if (fileList.length >= 1) {
        this.addShowIconSecond = true;
      } else {
        this.addShowIconSecond = false;
      }
    },

    // 形象图片3---上传前回调
    beforeUploadImageThird(file) {
      return this.imageUploadFileType(file);
    },
    // 形象图片3---上传成功回调
    uploadImageSuccessThird(res, file) {
      if (res.data == null) {
        this.$refs.imguploadThird.clearFiles();
      } else {
        let image = {
          url: res.data,
          name: file.name
        };
        this.fileImagesThird.push(image);
      }
    },
    // 形象图片3---上传失败
    uploadImageErrorThird() {
      this.$message.error("图片上传失败");
    },
    // 形象图片3---有图片上传或者删除
    handleImageChangeThird(file, fileList) {
      if (fileList.length >= 1) {
        this.addShowIconThird = true;
      } else {
        this.addShowIconThird = false;
      }
    },
    // 形象图片3---图片预览
    handleImagePreviewThird(file) {
      this.dialogImageUrl = file.url;
      this.dialogImageVisible = true;
    },
    // 形象图片3---移除
    handleImageRemoveThird(file, fileList) {
      this.fileImagesThird.forEach((item, index) => {
        if (file.url.indexOf(item) !== -1) {
          this.fileImagesThird.splice(index, 1);
        }
      });
      this.fileImagesThird = [];
      // 需要对this.fileImages进行操作
      if (fileList.length >= 1) {
        this.addShowIconThird = true;
      } else {
        this.addShowIconThird = false;
      }
    },
    imageUploadFileType(file) {
      // 进行图片大小验证
      let testFileType = /^image\/(jpeg|png|jpg)$/.test(file.type);
      if (!testFileType) {
        this.$message.warning("上传的文件格式错误!");
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.warning("上传文件大小不能超过 2MB!");
        return false;
      }
      return true;
    },
    showSmallImg(imagePath) {
      return this.baseApi + "/api/customservice/cf/viewImage/" + imagePath;
    },
    // 佐证材料
    beforeUpload2(file) {
      let testFileType = /^image\/(jpeg|png|jpg)$/.test(file.type);
      let testPdf = file.type === "application/pdf";
      if (!testPdf && !testFileType) {
        this.$message.warning("文件格式上传错误!");
        return false;
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        this.$message.warning("上传文件大小不能超过 5MB!");
        return false;
      }
      return true;
    },
    exceed2(fileList) {
      //  上传的文件超过5个
      this.$message({
        message: '佐证材料不能超过5个',
        type: 'error'
      });
    },
    uploadSuccess2(response, file, fileList) {
      this.ruleForm5.attachments.push({ fileName: file.name, filePath: response.data });
    },
    handleDelete2(file, fileList) {
      let newData = [];
      this.ruleForm5.attachments.forEach((item, index) => {
        if (file.filePath !== item.filePath) {
          newData.push(item);
        }
      });
      this.ruleForm5.attachments = newData;
    },
    // 获取产品类别
    getProductCategory() {
      // 获取产品类别
      this.$http.get(this.baseApi + '/api/customservice/cf/getRecommend').then(data => {
        this.categoryOption = data;
      }).catch(err => {
      });
    },
    //  获取产品资料详情
    getProductDetail() {
      let params = {
        awardProductId: this.awardProductId
      };
      this.$http.get(this.baseApi + '/api/customservice/cf/getCfProduct', params).then(res => {
        // 第一个tab 赋值
        for (let name in this.ruleForm) {
          this.ruleForm[name] = res.productBase[name];
        }
        this.awardProductId = res.productBase.awardProductId;
        if (res.productBase.designAwards) {
          this.ruleForm.designAwards = res.productBase.designAwards.split('');
        } else {
          this.ruleForm.designAwards = [];
        }
        // 单选框的值只能是number类型
        this.ruleForm.designSubject = Number(res.productBase.designSubject);

        // 给第二个tab 赋值
        if (res.productImages.length !== 0) {
          this.fileImagesFirst = [];
          this.fileImageListFirst = [];
          this.fileImagesSecond = [];
          this.fileImageListSecond = [];
          this.fileImagesThird = [];
          this.fileImageListThird = [];
          res.productImages.forEach((item, index) => {
            this.ruleForm2.images[index].descriptionCn = item.descriptionCn;
            this.ruleForm2.images[index].descriptionEn = item.descriptionEn;
            this.ruleForm2.images[index].imagePath = item.imagePath;
            this.ruleForm2.awardProductId = item.awardProductId;
            if (index === 0) {
              this.fileImagesFirst.push({ name: '图片1', url: item.imagePath });
              this.fileImageListFirst.push({ name: '图片1', url: this.showSmallImg(item.imagePath) });
            }
            if (index === 1) {
              this.fileImagesSecond.push({ name: '图片2', url: item.imagePath });
              this.fileImageListSecond.push({ name: '图片2', url: this.showSmallImg(item.imagePath) });
            }
            if (index === 2) {
              this.fileImagesThird.push({ name: '图片3', url: item.imagePath });
              this.fileImageListThird.push({ name: '图片3', url: this.showSmallImg(item.imagePath) });
            }
          });

          if (this.fileImageListFirst.length >= 1) {
            this.addShowIconFirst = true;
          } else {
            this.addShowIconFirst = false;
          }
          if (this.fileImageListSecond.length >= 1) {
            this.addShowIconSecond = true;
          } else {
            this.addShowIconSecond = false;
          }
          if (this.fileImageListThird.length >= 1) {
            this.addShowIconThird = true;
          } else {
            this.addShowIconThird = false;
          }

        } else {
          this.ruleForm2.awardProductId = this.awardProductId;
        }
        // tab3--ruleForm3
        if (res.productStandard) {
          for (let name in this.ruleForm3) {
            this.ruleForm3[name] = res.productStandard[name];
          }
        }
        // tab4--ruleForm4
        if (res.designers && res.designers.length !== 0) {
          this.ruleForm4.designerList = res.designers;
        }
        // tab5--ruleForm5
        if (res.productAttachments) {
          for (let i = 0; i < res.productAttachments.length; i++) {
            if (res.productAttachments[i].noteType === '04') {
              this.ruleForm5.videoPath = res.productAttachments[i].filePath;
            } else if (res.productAttachments[i].noteType === '03') {
              this.fileList2.push({ name: res.productAttachments[i].fileName, filePath: res.productAttachments[i].filePath });
              this.ruleForm5.attachments.push({ fileName: res.productAttachments[i].fileName, filePath: res.productAttachments[i].filePath });
            }
          }
        }
      }).catch(err => {
      });
    },

    getListDesigner() {
      //获取设计师
      this.$http.get(this.baseApi + '/api/customservice/cf/listDesigner').then(res => {
        this.designerData = res.records;
      }).catch(err => {
      });
    },
    chooseDesigner() {
      this.dialogTableVisible = true;
      this.getListDesigner();
    },
    // 选择产品名称弹窗里的加入
    handleClick(tab, event) {
    },
  //  选择产品名称
    chooseProductName() {
      this.dialogChooseProductName = true;
      this.getProductDetail();
    },
  //  添加设计师
    addDesigner() {
      let designer = {
        // designerId: '',
        designerNameCn: '',
        designerNameEn: '',
        positionCn: '',
        positionEn: ''
      };
      this.ruleForm4.designerList.push(designer);
    },
    deleteDesigner(index) {
      this.ruleForm4.designerList.splice(index, 1);
    },
    // 搜索设计师
    searchDesigner() {
      let params = {
        designerNameCn: this.searchForm.designerNameCn,
        positionCn: this.searchForm.positionCn
      };
      this.$http.get(this.baseApi + '/api/customservice/cf/listDesigner', params).then(res => {
        this.designerData = res.records;
      }).catch(err => {
      });
    },
    // 重置
    resetSearchForm() {
      this.searchForm.designerNameCn = '';
      this.searchForm.positionCn = '';
    },
    // 设计师弹窗复选框状态改变
    changeFun(val) {
      this.multipleSelection = val;
    },
    addDesignerList() {
      let newList = [];
      this.multipleSelection.forEach(item => {
        newList.push({
          designerId: item.designerId,
          designerNameCn: item.designerNameCn,
          designerNameEn: item.designerNameEn,
          positionCn: item.positionCn,
          positionEn: item.positionEn
        });
      });
      let oldList = [];
      this.ruleForm4.designerList.forEach((item, index) => {
        if (item.designerNameCn !== '' || item.designerNameEn !== '' || item.positionCn !== '' || item.positionEn !== '') {
          oldList.push(item);
        }
      });
      this.ruleForm4.designerList = oldList.concat(newList);
      this.dialogTableVisible = false;
    },
    // 产品基本资料的保存
    submitForm1(formName) {
      // this.$refs[formName].validate((valid) => {
        // if (valid) {
      let data = {};
      for (let name in this.ruleForm) {
        data[name] = this.ruleForm[name];
      }
      data.designAwards = this.ruleForm.designAwards.join('');
      data.awardProductId = this.awardProductId;
      this.$http.postJson(this.baseApi + '/api/customservice/cf/saveCfProductBase', data).then(res => {
        if (!this.edit) {
          this.awardProductId = res;
          this.tabsNo = 2;
        }
        this.activeName = 'second';
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      }).catch(err => {
      });
        // } else {
        //   return false;
        // }
      // });
    },
    // 产品形象图的保存
    submitForm2(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      if (!this.edit) {
        this.ruleForm2.awardProductId = this.awardProductId;
      }
      this.ruleForm2.images[0].imagePath = '';
      this.ruleForm2.images[1].imagePath = '';
      this.ruleForm2.images[2].imagePath = '';
      if (this.fileImagesFirst.length > 0) {
        this.ruleForm2.images[0].imagePath = this.fileImagesFirst[0].url;
      } else {
        this.ruleForm2.images[0].imagePath = "";
      }
      if (this.fileImagesSecond.length > 0) {
        this.ruleForm2.images[1].imagePath = this.fileImagesSecond[0].url;
      } else {
        this.ruleForm2.images[1].imagePath = "";
      }
      if (this.fileImagesThird.length > 0) {
        this.ruleForm2.images[2].imagePath = this.fileImagesThird[0].url;
      } else {
        this.ruleForm2.images[2].imagePath = "";
      }
      //保存产品形象图片
      this.$http.postJson(this.baseApi + '/api/customservice/cf/saveCfProductImage?awardProductId=' + this.ruleForm2.awardProductId, this.ruleForm2.images).then(data => {
        if (this.edit) {
          // this.fileList.push({ name: '图片' + index, url: this.showSmallImg(item) });
        } else {
          this.tabsNo = 3;
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.activeName = 'third';
      }).catch(err => {
      });
      //   } else {
      //     return false;
      //   }
      // });
    },
    // 产品技术规格的保存
    submitForm3(formName) {
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      this.ruleForm3.awardProductId = this.awardProductId;
      // 保存产品技术规格
      this.$http.postJson(this.baseApi + '/api/customservice/cf/saveCfProductStandard', this.ruleForm3).then(data => {
        this.activeName = 'fourth';
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        if (!this.edit) {
          this.tabsNo = 4;
        }
      }).catch(err => {
      });
      //   } else {
      //     return false;
      //   }
      // });
    },
    // 设计师信息的保存
    submitForm4(formName) {
      // this.$refs[formName][0].validate((valid) => {
      //   if (valid) {
      let oldList = [];
      this.ruleForm4.designerList.forEach((item, index) => {
        if (item.designerNameCn !== '' || item.designerNameEn !== '' || item.positionCn !== '' || item.positionEn !== '') {
          oldList.push(item);
        }
      });
      let data = [];
      data = oldList;
      data[0].awardProductId = this.awardProductId;
      this.$http.postJson(this.baseApi + '/api/customservice/cf/batchInsertDesigner', data).then(res => {
        this.activeName = 'five';
        if (!this.edit) {
          this.tabsNo = 5;
        }
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      }).catch(err => {
      });
      //   } else {
      //     return false;
      //   }
      // });
    },
    // 产品佐证材料的保存
    submitForm5() {
      this.ruleForm5.awardProductId = this.awardProductId;
    //保存产品佐证材料
      this.$http.postJson(this.baseApi + '/api/customservice/cf/saveSupportingMaterial?awardProductId=' + this.ruleForm5.awardProductId + '&videoPath=' + this.ruleForm5.videoPath, this.ruleForm5.attachments).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
      }).catch(err => {
      });
    },
    // 产品申报
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$refs.ruleForm2.validate((valid2) => {
            if (valid2) {
              this.$refs.ruleForm3.validate((valid3) => {
                if (valid3) {
                  this.$refs.ruleForm4.validate((valid4) => {
                    if (valid4) {
                      this.$http.postJson(this.baseApi + '/api/customservice/cf/declareCfProductInfo?awardProductId=' + this.awardProductId + '&videoPath=' + this.ruleForm5.videoPath, this.ruleForm5.attachments).then(res => {
                        this.$message({
                          message: '提交成功',
                          type: 'success'
                        });
                        this.$router.push({
                          path: '/productList'
                        });
                      }).catch(err => {
                      });
                    } else {
                      this.$message({
                        message: '设计师信息有必填项为空',
                        type: 'error'
                      });
                      this.activeName = 'fourth';
                      return false;
                    }
                  });
                } else {
                  this.$message({
                    message: '产品技术规格有必填项为空',
                    type: 'error'
                  });
                  this.activeName = 'third';
                  return false;
                }
              });
            } else {
              this.$message({
                message: '产品形象图有必填项为空',
                type: 'error'
              });
              this.activeName = 'second';
              return false;
            }
          });
        } else {
          this.$message({
            message: '产品基本资料有必填项为空',
            type: 'error'
          });
          this.activeName = 'first';
          return false;
        }
      });
    },
    goBack(index) {
      if (index === 'tab1' || this.edit) {
        this.$confirm('是否返回产品列表?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.$router.push({
            path: '/productList'
          });
        }).catch(() => {

        });
      } else if (index === 'tab2') {
        this.activeName = 'first';
      } else if (index === 'tab3') {
        this.activeName = 'second';
      } else if (index === 'tab4') {
        this.activeName = 'third';
      } else if (index === 'tab5') {
        this.activeName = 'fourth';
      }
    }
  },
  mounted() {
    this.uploadApi = this.baseApi + '/api/customservice/cf/uploadFile';
    this.getProductCategory();
    //修改
    this.awardProductId = this.$route.query.awardProductId;
    if (this.awardProductId) {
      this.edit = true;
      this.tabsNo = 5;
      this.getProductDetail();
    }
  }
};
</script>

<style scoped>
.tabs{
  margin: 12px 10px;
}
.demo-form3{
  width: 900px;
  margin: 0 auto;
}
.item{
  width: 45%;
  text-align: center;
}
.el-form-item-btn {
  position: relative;
  left: 20%;
  margin: 40px 0;
}
.btn1 {
  background-color: #e04040;
  width: 120px;
  height: 40px;
  color: white;
  border-color: #e04040;
}
.btn2 {
  background-color: white;
  width: 120px;
  height: 40px;
}
.btn3{
  background-color: #ffb826;
  color: #ffffff;
  width: 120px;
  height: 40px;
}
.item-block{
  display: block;
  width: 100%;
}
.item-inline-block{
  display: inline-block;
}
.tip{
  display: inline-block;
  font-size: 12px;
  line-height: 16px;
  position: absolute;
  left: 410px;
  top: -5px;
}
.tip2{
  left: 410px;;
  top: 5px;
}
.tip3{
  left: 410px;
  top: 5px;
}
.tip4{
  font-size: 12px;
}
.tip5{
  position: absolute;
  right: -60px;
  top: 3px;
  background-color: #ea0909;
  color: #fff;
}
.color-red{
  color: #ff1a24;
}
.item-textarea{
  width: 400px;
}
.item-size{
  display: inline-block;
  width: 90px;
}
.uploadImage{
  display: inline-block;
  vertical-align: text-top;
}
</style>
<style>
.disabled .el-upload--picture-card {
  display: none;
}
</style>
