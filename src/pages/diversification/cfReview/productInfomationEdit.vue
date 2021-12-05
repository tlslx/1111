/**
* @file 产品基本资料
* @author:wanglifeng
* @date:2019/1/15
*/
<template>
  <el-tabs v-model="activeName" class="tabs" @tab-click="tabChangeClick">
    <!--:disabled="tabsNo < 1"-->
    <el-tab-pane  label="企业信息" name="first">
      <el-form :model="companyBaseForm" :rules="rules" ref="companyBaseForm"
               label-position="right" label-width="190px" class="demo-ruleForm">
        <section>
          <div class="line"><span class="title-left">企业基本信息</span></div>
          <el-form-item label="企业名称（中文）:" prop="companyNameCn" class="item" size="small">
            <el-input v-model="companyBaseForm.companyNameCn"></el-input>
          </el-form-item>
          <el-form-item label="企业名称（英文）:" prop="companyNameEn" class="item" size="small">
            <el-input v-model="companyBaseForm.companyNameEn"></el-input>
          </el-form-item>

          <el-form-item label="所属区域:" prop="cityCode" class="item" size="small">
            <el-select v-model="companyBaseForm.provinceCode" placeholder="请选择" style="width: 49%;" @change="provinceChange">
              <el-option v-for="(item, index) in provinceDatas" :key="index" :label="item.itemText" :value="item.dataDictItemId"></el-option>
            </el-select>
            <el-select v-model="companyBaseForm.cityCode" placeholder="请选择" style="width: 49%;">
              <el-option v-for="(item, index) in cityDatas" :key="index" :label="item.itemText" :value="item.dataDictItemId"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="企业类型:" prop="typeId" class="item" size="small">
            <el-select v-model="companyBaseForm.typeId" placeholder="请选择">
              <el-option v-for="(item, index) in categoryOption"  :label="item.itemText" :value="item.itemCode" :key="index"></el-option>
            </el-select>
          </el-form-item>


          <el-form-item label="所属交易团:" class="item" size="small">
            <el-select v-model="companyBaseForm.tradingGroup" placeholder="请选择">
              <el-option v-for="(item, index) in internationalaOption" :label="item.itemText" :value="item.dataDictItemId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业内部研发团队人数:" class="item" size="small">
            <el-input v-model="companyBaseForm.researchNumber"></el-input>
          </el-form-item>

          <div v-for="(item, index) in companyBaseForm.contactList.slice(0,2)" :key="index">
            <el-form-item :label="showContactCnIndex(index)" :prop="`contactList.${index}.contactNameCn`" :rules="index==0?rules.contactNameCn:rules.contactNameCn2" class="item" size="small">
              <el-input v-model="item.contactNameCn"></el-input>
            </el-form-item>
            <el-form-item :label="showContactEnIndex(index)" :prop="`contactList.${index}.contactNameEn`" :rules="index==0?rules.contactNameEn:rules.contactNameEn2" class="item" size="small">
              <el-input v-model="item.contactNameEn"></el-input>
            </el-form-item>
            <el-form-item label="性别:" class="item" size="small">
              <el-radio v-model="item.gender" label="0">男</el-radio>
              <el-radio v-model="item.gender" label="1">女</el-radio>
            </el-form-item>
            <el-form-item label="邮箱:" class="item" :prop="`contactList.${index}.email`" :rules="index==0?rules.email:rules.email2" size="small">
              <el-input v-model="item.email"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" class="item" size="small" :prop="`contactList.${index}.tel`" :rules="rules.tel2">
              <el-input v-model="item.areaCode" placeholder="请输入内容" style="width: 25%;display: inline-block"></el-input><span style="width: 4%;">-</span>
              <el-input v-model.number="item.tel" placeholder="请输入内容" style="width: 70%;display: inline-block"></el-input>
            </el-form-item>
            <el-form-item label="手机:" :prop="`contactList.${index}.mobile`" :rules="index==0?rules.mobile:rules.mobile2" class="item" size="small">
              <el-input v-model="item.mobile"></el-input>
            </el-form-item>

            <el-form-item label="联系地址:" :prop="`contactList.${index}.address`" :rules="index==0?rules.address:''" class="item2" size="small">
              <el-input v-model="item.address"></el-input>
            </el-form-item>
          </div>
        </section>

        <section>
          <div class="line"><span class="title-left">获奖信息</span></div>

          <el-form-item label="IF奖（个）:" class="item" size="small" prop="award.ifAward">
            <el-input v-model="companyBaseForm.award.ifAward"></el-input>
          </el-form-item>
          <el-form-item label="红点奖（个）:" class="item" size="small" prop="award.reddoAward">
            <el-input v-model="companyBaseForm.award.reddoAward"></el-input>
          </el-form-item>
          <el-form-item label="G-MARK奖（个）:" class="item" size="small" prop="award.gmarkAward">
            <el-input v-model="companyBaseForm.award.gmarkAward"></el-input>
          </el-form-item>
          <el-form-item label="IDEA奖（个）:" class="item" size="small" prop="award.ideaAward">
            <el-input v-model="companyBaseForm.award.ideaAward"></el-input>
          </el-form-item>
          <el-form-item label="中国创新设计红星奖（个）:" class="item" size="small" prop="award.redstarAward">
            <el-input v-model="companyBaseForm.award.redstarAward"></el-input>
          </el-form-item>
          <el-row>
            <el-form-item label="其他国际设计奖（中文）:" class="item" size="small" prop="award.otherAwardCn">
              <el-input type="textarea" v-model="companyBaseForm.award.otherAwardCn"></el-input>
            </el-form-item>
            <el-form-item label="其他国际设计奖（英文）:" class="item" size="small" prop="award.otherAwardEn">
              <el-input type="textarea" v-model="companyBaseForm.award.otherAwardEn"></el-input>
            </el-form-item>
          </el-row>
        </section>

        <section>
          <div class="line"><span class="title-left">其他信息</span></div>

          <el-form-item label="所拥有的品牌（中文）:" class="item" size="small" prop="brandCn">
            <el-input v-model="companyBaseForm.brandCn"></el-input>
          </el-form-item>

          <el-form-item label="所拥有的品牌（英文）:" class="item" size="small" prop="brandEn">
            <el-input v-model="companyBaseForm.brandEn"></el-input>
          </el-form-item>

          <el-form-item label="外观设计专业数量（个）:" class="item" size="small" prop="designPatentNumber">
            <el-input v-model="companyBaseForm.designPatentNumber"></el-input>
          </el-form-item>
          <el-form-item label="实用新型专利数量（个）:" class="item" size="small" prop="utilitionPatentNumber">
            <el-input v-model="companyBaseForm.utilitionPatentNumber"></el-input>
          </el-form-item>

          <el-form-item label="发明专利数量（个）:" class="item" size="small" prop="inventionPatentNumber">
            <el-input v-model="companyBaseForm.inventionPatentNumber"></el-input>
          </el-form-item>
        </section>

        <el-form-item>
          <el-button type="primary" class="btn1" @click="submitCompanyBaseForm('companyBaseForm')">保存</el-button>
          <el-button class="btn2" @click="goBack('tab1')">返回</el-button>
        </el-form-item>
      </el-form>

      <!-- 选择产品名称弹窗 -->
      <el-dialog title="产品选择" :visible.sync="dialogChooseProductName">
        <el-form :inline="true" :model="dialogChooseProduct" class="demo-form-inline">
          <el-form-item label="产品名称">
            <el-input v-model="dialogChooseProduct.productName" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="产品编号">
            <el-input v-model="dialogChooseProduct.productId" size="mini"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="gridData">
          <el-table-column property="date" label="序号" type="index" width="60"></el-table-column>
          <el-table-column property="date" label="产品名称" width="150"></el-table-column>
          <el-table-column property="name" label="产品编号" width="200"></el-table-column>
          <el-table-column property="address" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleAddClick(scope.row)" type="text" size="mini">加入</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogChooseProductName = false" size="small">关 闭</el-button>
        </div>
      </el-dialog>

    </el-tab-pane>

    <el-tab-pane  label="产品基本资料" name="second">
      <el-form :model="ruleForm1" :inline="true" :rules="rules" ref="ruleForm1" label-width="200px" class="demo-ruleForm">
        <el-form-item class="item" label="产品所属类别：" prop="productCategoryId" size="small">
          <el-select v-model="ruleForm1.productCategoryId" placeholder="请选择">
            <el-option v-for="(item, index) in productCategorys" :label="item.productCategoryNameCn" :value="item.productCategoryId" :key="index">{{item.productCategoryNameCn}}</el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="item" label="产品型号：" prop="productModel" size="small">
          <el-input v-model.trim="ruleForm1.productModel" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="产品名称（中文）：" prop="productNameCn" size="small">
          <el-input v-model.trim="ruleForm1.productNameCn" clearable></el-input>
          <el-button class="tip5" @click="chooseProductName" size="small" disabled>选择</el-button>
        </el-form-item>

        <el-form-item class="item" label="产品名称（英文）：" prop="productNameEn" size="small">
          <el-input v-model.trim="ruleForm1.productNameEn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="市场通用名（中文）：" prop="genericNameCn" size="small">
          <el-input v-model.trim="ruleForm1.genericNameCn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="市场通用名（英文）：" prop="genericNameEn" size="small">
          <el-input v-model.trim="ruleForm1.genericNameEn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="上市日期：" prop="marketDate" size="small">
          <el-date-picker
            v-model="ruleForm1.marketDate"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>

        <el-form-item class="item" label="产品设计主体：" label-width="130" prop="designSubject" size="small">
          <el-radio-group v-model="ruleForm1.designSubject">
            <el-radio :label="0">内部研发团队</el-radio>
            <el-radio :label="1">外部设计机构</el-radio>
            <el-radio :label="2">前二者结合</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item class="item" label="设计费/研发成本（美元）：" size="small">
          <el-input v-model.number="ruleForm1.designFee" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="已投放市场区域（中文）：" prop="marketAreaCn" size="small">
          <el-input v-model.trim="ruleForm1.marketAreaCn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="国际市场出口价（美元）：" size="small">
          <el-input v-model.number="ruleForm1.exportFee" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="已投放市场区域（英文）：" prop="marketAreaEn" size="small">
          <el-input v-model.trim="ruleForm1.marketAreaEn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="产品实用新型专利号：" size="small">
          <el-input v-model.trim="ruleForm1.utilitionPatent" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="产品外观设计专利号：" size="small">
          <el-input v-model.trim="ruleForm1.designPatent" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="产品发明专利号：" size="small">
          <el-input v-model.trim="ruleForm1.inventionPatent" clearable></el-input>
        </el-form-item>

        <el-form-item label="产品获奖奖项：" size="small">
          <el-checkbox-group v-model="ruleForm1.designAwards">
            <el-checkbox label="1">IF奖</el-checkbox>
            <el-checkbox label="2">红点奖</el-checkbox>
            <el-checkbox label="3">GMARK奖</el-checkbox>
            <el-checkbox label="4">IDEA奖</el-checkbox>
            <el-checkbox label="5">Gooddesign奖</el-checkbox>
            <el-checkbox label="6">红星奖</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item class="item" label="其他国际设计奖（中文）：" size="small">
          <el-input v-model="ruleForm1.designAwardCn" clearable></el-input>
        </el-form-item>

        <el-form-item class="item" label="其他国际设计奖（英文）：" size="small">
          <el-input v-model="ruleForm1.designAwardEn" clearable></el-input>
        </el-form-item>
        <el-form-item class="el-form-item-btn">
          <el-button class="btn1" @click="submitForm1('ruleForm1')">保存</el-button>
          <el-button class="btn2" @click="goBack('tab2')">返回</el-button>
        </el-form-item>
        <!-- 选择产品名称弹窗 -->
        <el-dialog title="产品选择" :visible.sync="dialogChooseProductName">
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
    <el-tab-pane  label="产品形象图" name="third">
      <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="200px" class="demo-ruleForm">

        <el-row>
          <span style="color: #ff0000;position: absolute;left: 78px;top: 8px;">*</span>
          <el-form-item label="产品形象图片：" prop="image" size="small" class="image-form">
            <el-upload
              :multiple="false"
              :action="uploadApi"
              :headers="header"
              :limit="1"
              accept=".jpg,.jpeg,.png,.bmp"
              :data="uploadImgData"
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
              :action="uploadApi"
              :headers="header"
              :limit="1"
              accept=".jpg,.jpeg,.png,.bmp"
              :data="uploadImgData"
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
              :action="uploadApi"
              :headers="header"
              :limit="1"
              accept=".jpg,.jpeg,.png,.bmp"
              :data="uploadImgData"
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
            <span style="display: block;">数量3张、jpg、jpeg、png格式，每张大小2M以内,默认第一张为主图;</span>
            <el-dialog :visible.sync="dialogImageVisible" width="70%">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item class="item-block" label="图片1说明（中文）：" size="small" prop="images[0].descriptionCn" :rules="[{ required: true, message: '请输入图片1的中文描述', trigger: 'blur' }]">
            <el-input class="item-textarea" v-model.trim="ruleForm2.images[0].descriptionCn" type="textarea" clearable maxlength="100"></el-input>
            <span class="tip">
              <span class="color-red">图片1为主照片，要求：</span>
              <br>
              <span>1、从产品的正面拍摄，聚焦于产品本身;</span>
              <br>
              <span>2、背景为白色或浅灰色调，或模糊处理;</span>
              <br>
              <span>3、请附图片说明（中英文各不超过100个字/单词）;</span>
            </span>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="item-block" label="图片1说明（英文）：" size="small" prop="images[0].descriptionEn" :rules="[{ required: true, message: '请输入图片1的英文描述', trigger: 'blur' }]">
            <el-input class="item-textarea" v-model.trim="ruleForm2.images[0].descriptionEn" type="textarea" clearable maxlength="100"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item class="item-block" label="图片2说明（中文）：" size="small" prop="images[1].descriptionCn" :rules="[{ required: true, message: '请输入图片2的中文描述', trigger: 'blur' }]">
            <el-input class="item-textarea" v-model.trim="ruleForm2.images[1].descriptionCn" type="textarea" clearable maxlength="100"></el-input>
            <span class="tip tip2">
              <span class="color-red">图片2 要求：</span>
              <br>
              <span>描述产品用途的图片，并附说明（中英文各不超过100个字/单词）;</span>
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
              <span>描述产品设计创新点的图片，并附说明（中英文各不超过100个字/单词）;</span>
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
          <el-button class="btn2" @click="goBack('tab3')">返回</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <!--:disabled="tabsNo < 4"-->
    <el-tab-pane  label="产品技术规格" name="fourth">
      <el-form :model="ruleForm3" :rules="rules" ref="ruleForm3" label-width="200px" class="demo-form3">
        <el-row>
          <!--class="item-block"-->
          <el-col :span="8">
            <el-form-item   label="产品尺寸（厘米）：" prop="standardLong" size="small">
              <el-input class="item-size" v-model.number="ruleForm3.standardLong" clearable></el-input>长&nbsp;&nbsp;
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item  label-width="0" prop="standardWidth" size="small">
              <el-input class="item-size" v-model.number="ruleForm3.standardWidth" clearable></el-input>宽&nbsp;&nbsp;
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item  label-width="0" prop="standardHight" size="small">
              <el-input class="item-size" v-model.number="ruleForm3.standardHight" clearable></el-input>高&nbsp;&nbsp;
            </el-form-item>
          </el-col>
          <el-col :span="10"></el-col>
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
          <el-button class="btn2" @click="goBack('tab4')">返回</el-button>
        </el-form-item>

      </el-form>
    </el-tab-pane>

    <el-tab-pane label="设计师信息" name="five">
      <el-form :model="ruleForm4" :inline="true" :rules="rules" ref="ruleForm4" label-width="200px" class="demo-ruleForm">

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
            <el-button class="btn2" @click="goBack('tab5')">返回</el-button>
          </el-form-item>
        </el-row>

        <el-dialog title="设计师信息" :visible.sync="dialogTableVisible" width="640px" >
          <el-form :inline="true" :model="searchForm" label-width="50px" class="demo-ruleForm">
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
                  <el-button type="primary" @click="searchDesigners()">查询</el-button>
                  <el-button type="primary" @click="resetSearchForm()">重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <el-table :data="designerData" @selection-change="designMutilchange">
            <el-table-column type="selection" label="日期" width="80"></el-table-column>
            <el-table-column property="designerNameCn" label="姓名" width="200" align="center"></el-table-column>
            <el-table-column property="positionCn" label="职务" width="200" align="center"></el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
            <el-button type="primary" @click="addDesignerList" size="small">确 定</el-button>
          </div>
        </el-dialog>
      </el-form>
    </el-tab-pane>

    <el-tab-pane  label="产品佐证材料" name="six">
      <el-form :model="ruleForm5" :rules="rules" ref="ruleForm5" label-width="200px" class="demo-ruleForm">
        <el-row>
          <el-form-item class="" label="产品材料：" size="small">
            <el-upload
              class="upload-demo item-inline-block"
              ref="upload"
              :headers="header"
              :limit="5"
              :action="uploadApi"
              accept=".jpg,.jpeg,.png,.gif,.pdf"
              :before-upload="beforeUploadMaterial"
              :file-list="fileMaterialList"
              :data="uploadMateriData"
              :on-exceed="onMaterialExceed"
              :on-change="handleMaterialChange"
              :on-success="uploadMaterialSuccess"
              :on-error="uploadMaterialError"
              :on-preview="handleMaterialPreview"
              :on-remove="handleMaterialRemove"
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
            <el-button class="btn3" @click="submitAllForm('ruleForm')">提交</el-button>
            <el-button class="btn1" @click="submitForm5('ruleForm5')">保存</el-button>
            <el-button class="btn2" @click="goBack('tab6')">返回</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-tab-pane>

  </el-tabs>
</template>

<script>
  import http from "@/scripts/framework/http";
  export default {
    name: "productInfomationEdit",
    data() {
      const validateMobile = (rule, value, callback) => {
        let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
        if (value === "") {
          return callback(new Error("请输入手机号"));
        } else if (!MOBILE.test(value)) {
          return callback(new Error("请输入正确的手机号码"));
        } else {
          return callback();
        }
      };
      const validateMobile2 = (rule, value, callback) => {
        let MOBILE = /^([1][3-9])+\d{9}$|^([9][28])+\d{9}$/;
        if (value !== "") {
          if (!MOBILE.test(value)) {
            return callback(new Error("请输入正确的手机号码"));
          } else {
            return callback();
          }
        } else {
          return callback();
        }
      };
      // 验证0和正整数 可以为空
      const checkNumber2 = (rule, value, callback) => {
        if (value !== "") {
          if (!/^[+]{0,1}(\d+)$/i.test(value)) { //正整数正则
            return callback(new Error("请输入数字"));
          } else {
            return callback();
          }
        } else {
          return callback();
        }
      };
      // 验证小数
      const checkdecimal = (rule, value, callback) => {
        let decimal = /(^[1-9]{1}[0-9]*$)|(^[0-9]*\.[0-9]{2}$)/;
        let match = decimal.test(value);
        if (!match) {
          return callback(new Error('请输入数字,且只能保留小数点后2位!'));
        } else {
          return callback();
        }
      };
      return {
        baseApi: process.env.API_CF_URL,
        baseApi2: process.env.API_DICT_URL,
        uploadImgData: {
          code: 1
        },
        uploadMateriData: {
          code: 2
        },
        productCategorys: [],
        showmargin: false,
        addShowIconFirst: false,  // 是否显示形象图片上传的按钮
        addShowIconSecond: false,  // 是否显示形象图片上传的按钮
        addShowIconThird: false,  // 是否显示形象图片上传的按钮
        reviewDialog: false,
        reviewForm: {
          auditStatus: '1',
          nodeId: '',
          auditContent: ''
        },
        tabsNo: 6,
        activeName: 'first',
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          }
        },
        provinceDatas: [], // 省份列表
        cityDatas: [], // 城市列表
        internationalaOption: [],
        header: {
          Token: this.$store.state.token
        },
        multipleSelection: '',
        awardProductId: '',
        uploadApi: '',
        cfCompanyId: '',
        companyBaseForm: {
          companyNameCn: '',
          companyNameEn: '',
          tradingGroup: '', // 交易团
          cfCompanyId: '',
          researchNumber: '', // 研发人数
          provinceCode: '',
          cityCode: '',
          typeId: '', // 企业类型ID
          contactList: [
            {
              contactNameCn: '', // 联系人中文
              contactNameEn: '', // 联系人英文
              email: '', // 邮箱
              gender: '0', // 性别
              areaCode: '', // 区号
              tel: '',
              telephone: '', // 电话
              mobile: '', // 手机
              address: '' // 地址
            },
            {
              contactNameCn: '', // 联系人中文
              contactNameEn: '',
              email: '',
              gender: '0',
              areaCode: '',
              tel: '',
              telephone: '',
              mobile: '',
              address: ''
            }
          ],
          // 获奖信息
          award: {
            ifAward: '',
            reddoAward: '', // 红点奖
            gmarkAward: '',
            ideaAward: '',
            redstarAward: '', // 红星奖
            otherAwardCn: '',
            otherAwardEn: ''
          },
          // 其他信息
          brandCn: '', // 品牌
          brandEn: '',
          designPatentNumber: '',
          utilitionPatentNumber: '',
          inventionPatentNumber: '' // 发明专利数量
        },
        ruleForm1: {
          awardProductId: '',
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
        ruleForm2: {
          images: [
            {
              imagePath: '',
              descriptionCn: '',
              descriptionEn: ''
            },
            {
              imagePath: '',
              descriptionCn: '',
              descriptionEn: ''
            },
            {
              imagePath: '',
              descriptionCn: '',
              descriptionEn: ''
            }
          ]
        },
        ruleForm3: {
          // 产品技术规格
          productStandardId: '',
          awardProductId: '',
          standardLong: 0,
          standardWidth: 0,
          standardHight: 0,
          standardWeight: 0,
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
        fileImageListFirst: [],
        fileImageListSecond: [],
        fileImageListThird: [],
        fileImagesFirst: [],
        fileImagesSecond: [],
        fileImagesThird: [],
        fileMaterialList: [],
        rules: {
          // 产品基本资料
          productCategoryId: [
            { required: true, message: '请选择产品类别', trigger: 'change' }
          ],
          productModel: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          productNameCn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkCn, trigger: 'blur' }
          ],
          productNameEn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkEn, trigger: 'blur' }
          ],
          genericNameCn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkCn, trigger: 'blur' }
          ],
          genericNameEn: [
            { required: true, message: '不能为空', trigger: 'blur' }
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
            // { required: true, validator: checkCn, trigger: 'blur' }
          ],
          marketAreaEn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkEn, trigger: 'blur' }
          ],
          // 产品形象
          descriptionCn: [
            { required: true, message: '不能为空', trigger: 'blur' }
          ],
          descriptionEn: [
            { required: true, message: '不能为空11', trigger: 'blur' }
          ],
          image: [
            { required: false, message: '请上传应用图标', trigger: 'change' }
          ],
          // 产品技术规格
          standardLong: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { type: "number", message: '必须填写数字', trigger: 'blur' }
          ],
          standardWeight: [
            { required: true, message: '不能为空', trigger: 'blur' },
            // { type: "number", message: '必须填写数字', trigger: 'blur' },
            { validator: checkdecimal, trigger: 'blur' }
          ],
          standardWidth: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { type: "number", message: '必须填写数字', trigger: 'blur' }
          ],
          standardHight: [
            { required: true, message: '不能为空', trigger: 'blur' },
            { type: "number", message: '必须填写数字', trigger: 'blur' }
          ],
          materialCn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkCn, trigger: 'blur' }
          ],
          materialEn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkEn, trigger: 'blur' }
          ],
          //  设计师信息
          designerNameCn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkCn, trigger: 'blur' }
          ],
          designerNameEn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkEn, trigger: 'blur' }
          ],
          positionCn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkCn, trigger: 'blur' }
          ],
          positionEn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkEn, trigger: 'blur' }
          ],
          // 企业信息
          companyNameCn: [
            { required: true, message: '企业名称不能为空', trigger: 'blur' },
            { min: 2, max: 25, message: '企业名称中文2-25个字符！', trigger: 'blur' }
            // { required: true, validator: checkCn, trigger: 'blur' }
          ],
          companyNameEn: [
            { required: true, message: '企业名称不能为空', trigger: 'blur' },
            { min: 2, max: 50, message: '企业名称英文不得超过50个字！', trigger: 'blur' }
            // { required: true, validator: checkEn, trigger: 'blur' }
          ],
          typeId: [
            { required: true, message: '不能为空', trigger: 'change' }
          ],
          contactNameCn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkCn, trigger: 'blur' }
          ],
          contactNameCn2: [
            // { required: false, validator: checkCn2, trigger: 'blur' }
          ],
          contactNameEn: [
            { required: true, message: '不能为空', trigger: 'blur' }
            // { required: true, validator: checkEn, trigger: 'blur' }
          ],
          contactNameEn2: [
            // { required: false, validator: checkEn2, trigger: 'blur' }
          ],
          cityCode: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          email: [
            { required: true, message: '请输入邮箱地址', trigger: 'blur' },
            { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          email2: [
            { required: false, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
          ],
          mobile: [
            { required: true, validator: validateMobile, trigger: 'blur' }
          ],
          mobile2: [
            { required: false, validator: validateMobile2, trigger: 'blur' }
          ],
          tel: [
            { required: false, validator: checkNumber2, message: '请输入正确的号码', trigger: 'blur' }
          ],
          tel2: [
            { required: false, validator: checkNumber2, message: '请输入正确的号码', trigger: 'blur' }
          ],
          address: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ],
          award: {
            ifAward: [
              { required: false, validator: checkNumber2, trigger: 'blur' }
            ],
            reddoAward: [
              { required: false, validator: checkNumber2, trigger: 'blur' }
            ],
            gmarkAward: [
              { required: false, validator: checkNumber2, trigger: 'blur' }
            ],
            ideaAward: [
              { required: false, validator: checkNumber2, trigger: 'blur' }
            ],
            redstarAward: [
              { required: false, validator: checkNumber2, trigger: 'blur' }
            ],
            otherAwardCn: [
              // { required: false, validator: checkCn2, trigger: 'blur' }
            ],
            otherAwardEn: [
              // { required: false, validator: checkEn2, trigger: 'blur' }
            ]
          },
          brandCn: [
            // { required: false, validator: checkCn2, trigger: 'blur' }
          ],
          brandEn: [
            // { required: false, validator: checkEn2, trigger: 'blur' }
          ],
          designPatentNumber: [{ required: false, validator: checkNumber2, trigger: 'blur' }],
          utilitionPatentNumber: [{ required: false, validator: checkNumber2, trigger: 'blur' }],
          inventionPatentNumber: [{ required: false, validator: checkNumber2, trigger: 'blur' }]
        }
      };
    },
    mounted() {
      //修改
      this.awardProductId = this.$route.query.awardProductId;
      this.uploadApi = this.baseApi + '/api/customservice/cf/uploadFile';
      this.getCompanyArea();
      this.getProductCategory();
      this.getTradeGroup();
      this.cfCompanyId = this.$route.query.cfCompanyId;
      if (this.cfCompanyId) {
        this.getCompanyDetailInfo(this.cfCompanyId);
      }
      if (this.awardProductId) {
        this.getProductDetail();
      }
    },
    methods: {
      /*
       * 表单及图片显示处理方法
       */
      showContactCnIndex(index) {
        return "联系人" + (index + 1) + "（中文）:";
      },
      showContactEnIndex(index) {
        return "联系人" + (index + 1) + "（英文）:";
      },

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
        // this.$refs.imgupload.handleImageRemove(file);
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
      // 佐证材料---上传前格式及文件大小验证
      beforeUploadMaterial(file) {
        let testFileType = /^image\/(jpeg|png|jpg)$/.test(file.type);
        let testPdf = file.type === "application/pdf";
        if (!testPdf && !testFileType) {
          this.$message.warning("文件格式上传错误!");
          return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
          this.$message.warning("上传文件大小不能超过 5MB!");
          return false;
        }
        return true;
      },
      // 佐证材料---上传成功回调
      uploadMaterialSuccess(res, file) {
        // if () {
        //   this.$refs.imguplodFirst.clearFiles()
        // }
        let successfile = {
          fileName: file.name,
          filePath: res.data
        };
        // this.fileMaterialList.push(successfile);
        this.ruleForm5.attachments.push(successfile);
      },
      // 佐证材料---上传失败
      uploadMaterialError() {
        this.$message.error("材料上传失败");
      },
      // 佐证材料---上传文件数量超过5个
      onMaterialExceed() {
        this.$message.error("佐证材料不能超过5个");
      },
      // 佐证资料---有图片上传或者删除
      handleMaterialChange(file, fileList) {

      },
      // 佐证材料---文件移除
      handleMaterialRemove(file, fileList) {
        // this.ruleForm5.attachments.forEach((item, index) => {
        //   if (file.url.indexOf(item) !== -1) {
        //     this.ruleForm5.attachments.splice(index, 1);
        //   }
        // });
        let newData = [];
        this.ruleForm5.attachments.forEach((item, index) => {
          if (file.filePath === item.filePath) {
            // this.ruleForm5.attachments.splice(index, 1);
          } else {
            newData.push(item);
          }
        });
        this.ruleForm5.attachments = newData;
        // this.fileMaterialList = newData;
      },
      // 佐证材料，文件预览
      handleMaterialPreview(file) {

      },

      /*
       * dialog展示及tab切换
       */
      chooseDesigner() {
        this.dialogTableVisible = true;
        this.searchDesigners();
      },
      // (产品基本资料)选择产品名称弹窗里的加入
      handleAddClick(scope, index) {
      },
      // 导航栏切换
      tabChangeClick(tab, event) {
      },
      // 选择产品名称
      chooseProductName() {
        this.dialogChooseProductName = true;
        this.getProductDetail();
      },
      // 添加设计师
      addDesigner() {
        let designer = {
          designerNameCn: '',
          designerNameEn: '',
          positionCn: '',
          positionEn: ''
        };
        this.ruleForm4.designerList.push(designer);
      },
      // 删除设计师
      deleteDesigner(index) {
        this.ruleForm4.designerList.splice(index, 1);
      },
      // 设计师弹窗复选框状态改变
      designMutilchange(val) {
        this.multipleSelection = val;
      },
      // 设计师选择框---点击确认之后进行设计师列表添加
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
          if (item.designerNameCn === '' && item.designerNameEn === '' && item.positionCn === '' && item.positionEn === '') {
            // oldList.push();
          } else {
            oldList.push(item);
          }
        });
        this.ruleForm4.designerList = oldList.concat(newList);
        this.dialogTableVisible = false;
      },
      // 重置设计师搜索表单
      resetSearchForm() {
        this.searchForm.designerNameCn = '';
        this.searchForm.positionCn = '';
      },
      showSmallImg(imagePath) {
        return this.baseApi + "/api/customservice/cf/viewImage/" + imagePath;
      },
      /*
       * 页面数据获取
       */
      // 获取所有产品类别
      getProductCategory() {
        http.get(this.baseApi + '/api/customservice/cf/getRecommend').then(data => {
          this.productCategorys = data;
        }).catch(err => {
        });
      },
      // 企业资料详情查询
      getCompanyDetailInfo(cfCompanyId) {
        http.get(this.baseApi + '/api/customservice/cf/getCfCompanyInfo', {
          cfCompanyId: cfCompanyId
        }).then(res => {
          // 企业信息回填
          this.companyBaseForm.cfCompanyId = this.cfCompanyId;
          this.pageEchoDisplayByData(this.companyBaseForm, res);
          if (res.contactList) {
            // 区号及电话组装,010-12314123
            for (let i = 0; i < this.companyBaseForm.contactList.length; i++) {
              if (this.companyBaseForm.contactList[i].telephone.split('-').length === 2) {
                this.companyBaseForm.contactList[i].areaCode = this.companyBaseForm.contactList[i].telephone.split('-')[0];
                this.companyBaseForm.contactList[i].tel = this.companyBaseForm.contactList[i].telephone.split('-')[1];
              } else {
                this.companyBaseForm.contactList[i].areaCode = '';
                this.companyBaseForm.contactList[i].tel = this.companyBaseForm.contactList[i].telephone.split('-')[0];
              }
            }
          }
        }).catch(error => {
        });
      },
      // 获取产品详细信息
      getProductDetail() {
        this.getProductCategory();
        let params = {
          awardProductId: this.awardProductId
        };
        //  获取产品资料详情
        http.get(this.baseApi + '/api/customservice/cf/getCfProduct', params).then(res => {
          // 第一个tab 赋值
          for (let name in this.ruleForm1) {
            this.ruleForm1[name] = res.productBase[name];
          }
          this.awardProductId = res.productBase.awardProductId;
          if (res.productBase.designAwards) {
            this.ruleForm1.designAwards = res.productBase.designAwards.split('');
          } else {
            this.ruleForm1.designAwards = [];
          }

          this.ruleForm1.designSubject = Number(res.productBase.designSubject);

          if (res.productImages != null && res.productImages.length > 0) {
            // this.ruleForm2.images = res.productImages;
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
              // this.ruleForm2.files.push({ name: '图片' + index, url: this.showSmallImg(item.imagePath) });
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

            let image = {
              descriptionCn: '',
              descriptionEn: '',
              imagePath: ''
            };
            //当图片信息不足3个时，添加赋予初始值
            for (let i = 0; i < (3 - this.ruleForm2.images.length); i++) {
              this.ruleForm2.images.push(image);
            }
          }
          // tab3--ruleForm3
          if (res.productStandard) {
            // 需要将部分需要进行数字验证的字符串转换为数字类型
            this.ruleForm3.standardLong = res.productStandard.standardLong ? parseInt(res.productStandard.standardLong) : res.productStandard.standardLong;
            this.ruleForm3.standardWidth = res.productStandard.standardWidth ? parseInt(res.productStandard.standardWidth) : res.productStandard.standardWidth;
            this.ruleForm3.standardHight = res.productStandard.standardHight ? parseInt(res.productStandard.standardHight) : res.productStandard.standardHight;
            this.ruleForm3.standardWeight = res.productStandard.standardWeight ? parseInt(res.productStandard.standardWeight) : res.productStandard.standardWeight;
            this.ruleForm3.materialCn = res.productStandard.materialCn;
            this.ruleForm3.materialEn = res.productStandard.materialEn;
            this.ruleForm3.productStandardId = res.productStandard.productStandardId;
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
                let successfile = {
                  fileName: res.productAttachments[i].fileName,
                  filePath: res.productAttachments[i].filePath
                };
                this.ruleForm5.attachments.push(successfile);
                this.fileMaterialList.push({ name: res.productAttachments[i].fileName, filePath: res.productAttachments[i].filePath });
              }
            }
          }
        }).catch(err => {
        });
      },
      // 设计师列表信息获取
      searchDesigners() {
        let params = {};
        params = this.searchForm;
        http.get(this.baseApi + '/api/customservice/cf/listDesigner', params).then(res => {
          this.designerData = res.records;
        }).catch(err => {

        });
      },
      // 获取所属交易团
      getTradeGroup() {
        this.$http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=tradingGroup').then(data => {
          this.internationalaOption = data.records;
        }).catch(err => {
        });
      },
      // 企业地区字典信息获取
      getCompanyArea() {
        http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=province').then(data => {
          this.provinceDatas = data.records;
          setTimeout(() => {
            this.provinceChange();
          }, 500);
        }).catch(error => {
        });
        // 获取企业类别
        http.get(this.baseApi2 + '/api/sysDataDictItem/findDicItemList?dictCode=companyAttribute').then(data => {
          this.categoryOption = data.records;
        }).catch(err => {
        });
      },
      // 通过省份获取城市信息
      provinceChange() {
        // this.companyBaseForm.cityCode = '';
        http.get(this.baseApi2 + '/api/sysDataDictItem/getChildDicItemList?dataDictItemId=' + this.companyBaseForm.provinceCode).then(data => {
          this.cityDatas = data.records;
          let first = false;
          this.cityDatas.forEach((item, index) => {
            if (item.dataDictItemId === this.companyBaseForm.cityCode) {
              first = true;
            }
          });
          if (!first) {
            this.companyBaseForm.cityCode = this.cityDatas[0].dataDictItemId;
          }
        }).catch(error => {
        });
      },

      /*
       * 页面表单数据提交
       */
      // 企业信息保存
      submitCompanyBaseForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            for (let i = 0; i < this.companyBaseForm.contactList.length; i++) {
              this.companyBaseForm.contactList[i].telephone = this.companyBaseForm.contactList[i].areaCode + '-' + this.companyBaseForm.contactList[i].tel;
            }
            const data = this.companyBaseForm;
            http.postJson(this.baseApi + '/api/customservice/cf/saveCompanyInfo', data).then(res => {
              this.$message.success("企业信息保存成功");
              // this.$router.push({
              //   path: '/cfReviewList'
              // });
              this.activeName = 'second';
              this.tabsNo = 2;
            }).catch(error => {
              this.$message.error(error);
            });
          } else {
            this.$message.success("必填项不能为空");
            return false;
          }
        });
      },
      // 产品基本资料的保存
      submitForm1(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // if (this.ruleForm1.designAwards instanceof Array) {
            //
            // }
            let obj = this.ruleForm1.designAwards.join('');
            this.ruleForm1.designAwards = obj;
            this.ruleForm1.awardProductId = this.awardProductId;
            http.postJson(this.baseApi + '/api/customservice/cf/saveCfProductBase?source=1', this.ruleForm1).then(data => {
              this.activeName = 'third';
              this.tabsNo = 3;
              this.$message.success("保存成功");
              this.getProductDetail();
            }).catch(err => {
            });
          } else {
            this.$message.error("");
            return false;
          }
        });
      },
      // 产品形象图的保存
      submitForm2(formName) {
        // this.$refs[formName].validate((valid) => {
        //   if (valid) {
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
        // 保存产品形象图片
        http.postJson(this.baseApi + '/api/customservice/cf/saveCfProductImage?source=1&awardProductId=' + this.awardProductId, this.ruleForm2.images).then(data => {
          this.activeName = 'fourth';
          this.tabsNo = 4;
          this.$message({
            message: '保存成功',
            type: 'success'
          });
        }).catch(err => {
        });
      },
      // 产品技术规格的保存
      submitForm3(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm3.awardProductId = this.awardProductId;
            // 保存产品技术规格
            http.postJson(this.baseApi + '/api/customservice/cf/saveCfProductStandard?source=1', this.ruleForm3).then(data => {
              this.activeName = 'five';
              this.tabsNo = 5;
              this.$message({
                message: '保存成功',
                type: 'success'
              });
            }).catch(err => {
            });
          } else {
            return false;
          }
        });
      },
      // 设计师信息的保存
      submitForm4(formName) {
        // this.$refs[formName].validate((valid) => {
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

        http.postJson(this.baseApi + '/api/customservice/cf/batchInsertDesigner', data).then(res => {
          this.activeName = 'six';
          this.tabsNo = 6;
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
      // 产品佐证材料的保存
      submitForm5(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = 'source=1&awardProductId=' + this.awardProductId + '&videoPath=' + this.ruleForm5.videoPath;
            if (this.ruleForm5.attachments.length > 5) {
              this.ruleForm5.attachments = this.ruleForm5.attachments.slice(this.ruleForm5.attachments.length - 5, this.ruleForm5.attachments.length);
            }
            //保存产品佐证材料
            http.postJson(this.baseApi + '/api/customservice/cf/saveSupportingMaterial?' + params, this.ruleForm5.attachments).then(data => {
              this.$message.success("佐证材料保存成功");
            }).catch(err => {
              this.$message.error(err);
            });
          } else {
            return false;
          }
        });
      },
      // 产品申报
      submitAllForm() {
        this.$refs.ruleForm1.validate((valid1) => {
          if (valid1) {
            this.$refs.ruleForm2.validate((valid2) => {
              if (valid2) {
                this.$refs.ruleForm3.validate((valid3) => {
                  if (valid3) {
                    this.$refs.ruleForm4.validate((valid4) => {
                      if (valid4) {
                        let params = '?awardProductId=' + this.awardProductId + '&videoPath=' + this.ruleForm5.videoPath;
                        http.postJson(this.baseApi + '/api/customservice/cf/declareCfProductInfo' + params, this.ruleForm5.attachments).then(res => {
                          this.$message({
                            message: '提交成功',
                            type: 'success'
                          });
                          this.$router.push({
                            path: '/cfReviewList'
                          });
                        }).catch(err => {
                        });
                      } else {
                        this.$message.error("设计师信息有必填项为空或格式错误");
                        this.activeName = 'five';
                        return false;
                      }
                    });
                  } else {
                    this.$message.error("产品技术规格有必填项为空或格式错误");
                    this.activeName = 'fourth';
                    return false;
                  }
                });
              } else {
                this.$message.error("产品形象图有必填项为空或格式错误");
                this.activeName = 'third';
                return false;
              }
            });
          } else {
            this.$message.error("产品基本资料有必填项为空或格式错误");
            this.activeName = 'second';
            return false;
          }
        });
      },
      goBack(index) {
        this.showDialogTips("是否回到资质审核列表?").then(() => {
          this.$router.push({
            path: '/cfReviewList'
          });
        }).catch(() => {});

        // if (index === 'tab1') {
        //   this.$router.push({
        //     path: '/cfReviewList'
        //   });
        // } else if (index === 'tab2') {
        //   this.activeName = 'first';
        // } else if (index === 'tab3') {
        //   this.activeName = 'second';
        // } else if (index === 'tab4') {
        //   this.activeName = 'third';
        // } else if (index === 'tab5') {
        //   this.activeName = 'fourth';
        // } else if (index === 'tab6') {
        //   this.activeName = 'five';
        // }
      },
      // 表单数据回显
      pageEchoDisplayByData(formData, requestData) {
        for (let item in formData) {
          if (formData[item] instanceof Array) {
            if (item === 'contactList') {
              for (let i = 0; i < 2; i++) {
                this.pageEchoDisplayByData(formData[item][i], requestData[item][i]);
              }
            } else {
              for (let i = 0; i < requestData[item].length; i++) {
                this.pageEchoDisplayByData(formData[item][i], requestData[item][i]);
              }
            }
          } else if (formData[item] instanceof Object) {
            this.pageEchoDisplayByData(formData[item], requestData[item]);
          } else if (item === 'designAwards') {
            if (requestData[item] == null) {
              formData[item] = [];
            } else {
              formData[item] = requestData[item].split('');
            }
          } else if (requestData[item] != null) {
            formData[item] = requestData[item];
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
    width: 78px;
  }
  .item {
    display: inline-block;
    width: 47%;
  }
  .item2 {
    width: 96%;
  }
  .title-left{
    display: inline-block;
    margin-left: 50px;
    margin-bottom: 20px;
    height: 20px;
    background-color: #ffffff;
    font-size: 16px;
    font-weight: 600;
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
