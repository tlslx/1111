/**
 * @file 选择模板
 */

<style lang='less' scoped>
.el-header {
  border-bottom: 1px solid #ddd;
}
.el-header > span {
  font-size: 16px;
  font-weight: 700;
  color: #333;
  height: 58px;
  line-height: 58px;
  display: block;
  float: left;
  border-bottom: 2px solid #2b579a;
}
.templateAll {
  width: 820px;
  font-family: "宋体";
  /* margin-left: 50px; */
  background: #fff;
  box-sizing: border-box;
  padding: 50px 50px 100px 50px;
  border: 1px solid #ddd;
}
.templateAll span {
  padding: 0 20px;
  font-weight: 500;
  /* text-decoration: underline; */
  border-bottom: 1px solid #333;
}
.tempTil {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 50px;
}
.tempLF {
  float: left;
}
.tempRT {
  float: right;
}
.tempTextNormal {
  font-size: 20px;
  line-height: 38px;
}
.tempTextRight {
  font-size: 20px;
  text-align: right;
}
.tempTextCS {
  font-size: 18px;
  line-height: 27px;
}
.tempTextBT {
  font-size: 18px;
  line-height: 27px;
}
.el-form {
  .el-form-item {
    .el-input {
      width: 100%
    }
  }
}
</style>

<template>
  <el-container>
    <el-header>
      <span>选择模板</span>
      <el-button
        @click="goBack"
        style="float: right; margin-top: 15px;"
      >返回</el-button>
    </el-header>
    <el-main>
      <el-form inline :rules="rules"
        ref="templateForm"
        :model="templateForm"
        label-width="160px">
          <el-form-item label="处罚通知管理名称" prop="name">
            <el-input
              v-model="templateForm.name"></el-input>
          </el-form-item>
          <el-form-item label="选择模板" prop="lsModelId">
            <el-select
              v-model="templateForm.lsModelId"
              placeholder="请选择">
              <el-option
                v-for="item in templateSelect"
                :key="item.modelId"
                :label="item.modelName"
                :value="item.modelId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="限制展位类型" prop="ifflaunt">
           <el-select v-model="templateForm.ifflaunt" placeholder="请选择">
             <el-option v-for="item in ifflauntCode" :key="item.code" :label="item.label" :value="item.code"></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="打印时间" prop="ppTime">
            <el-date-picker
              v-model="templateForm.ppTime"
              type="date"
              placeholder="选择日期"
              format="yyyy/MM/dd"
              @change="pTime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="印发时间" prop="pnTime">
            <el-date-picker
              v-model="templateForm.pnTime"
              type="date"
              placeholder="选择日期"
              format="yyyy/MM/dd"
              @change="nTime">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="选择事件类别" prop="ruleCode">
            <el-select v-model="templateForm.ruleCode" placeholder="请选择">
              <el-option v-for="item in selectDictByCodesData"
                :key="item.code" :label="item.label" :value="item.code"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="最大安排数" prop="maxnum">
            <el-input v-model="templateForm.maxnum" maxlength="8" style="width:200px"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="margin-left:15px" @click="tempSubmit">确定</el-button>
          </el-form-item>
      </el-form>
      <!-- word模板 -->
      <template>
        <!-- 模板1-一般性+检查组查处+企业举报-附件3 -->
        <div
          :class="templateClass"
          v-if="templateShow.temp1"
        >
          <p :class="tempTextRight">会业字〔2018〕 号</p>
          <P :class="tempTil">关于对<span>{{templateForm.companyName}}</span>公司违规行为的处理决定</P>
          <p :class="tempTextNormal">　　经第<span>{{templateForm.exhibitionNum}}</span>届广交会展位使用联合检查组现场检查认定，<span>{{templateForm.companyName}}</span>公司（广交会编码<span>{{templateForm.cantonCode}}</span>，展位号<span>{{templateForm.boothNo}}</span>）违规使用展位。现根据《广交会出口展展位使用管理规定》及《关于加强广交会展位使用管理工作的通知》（商贸促函〔2013〕173号）作出以下处理决定：</p>
          <p :class="tempTextNormal">　　一、取消<span>{{templateForm.companyName}}</span>公司从下届起连续4届在违规所属展区（<span>{{templateForm.exhibitionArea}}</span>展区）的参展资格；</p>
          <p :class="tempTextNormal">　　二、相应扣减<span>{{templateForm.businessDelegationName}}</span>交易团的一般性展位基数；</p>
          <p :class="tempTextNormal">　　三、取消<span>{{templateForm.businessDelegationName}}</span>交易团获得当届组展表彰对象的资格；</p>
          <p :class="tempTextNormal">　　四、处理结果在《广交会通讯》上通报。</p>
          <p
            :class="tempTextNormal"
            style="color:#ff0000;"
          >　　大会将对上述展位实际使用者<span>{{templateForm.companyName}}</span>公司的广交会参展资格进行评估，并按《关于加强广交会展位使用管理工作的通知》有关规定进行安排。</p>
          <br><br><br><br><br>
          <p :class="tempTextRight">大会业务办</p>
          <p :class="tempTextRight"><span>{{pYear}}</span>年<span>{{pMonth}}</span>月<span>{{pDay}}</span>日</p>
          <hr>
          <p :class="tempTextCS">抄送：大会领导，秘书处、业务办、政工办、保卫办、新闻中心，广交会工作部，存档。</p>
          <hr>
          <div>
            <p :class="[tempLF, tempTextBT]">中国进出口商品交易会业务办公室</p>
            <p :class="[tempRT, tempTextBT]"><span>{{nYear}}</span>年<span>{{nMonth}}</span>月<span>{{nDay}}</span>日印发</p>
          </div>
        </div>
        <!-- 模板2-品牌-附件5 -->
        <div
          :class="templateClass"
          v-if="templateShow.temp2"
        >
          <p :class="tempTextRight">会业字〔2013〕 号</p>
          <P :class="tempTil">关于对<span>{{templateForm.companyName}}</span>公司违规行为的处理决定</P>
          <p :class="tempTextNormal">　　经第<span>{{templateForm.exhibitionNum}}</span>届广交会展位使用联合检查组现场检查认定，<span>{{templateForm.companyName}}</span>公司（广交会编码<span>{{templateForm.cantonCode}}</span>，展位号<span>{{templateForm.boothNo}}</span>）违规空置展位。现根据《广交会出口展展位使用管理规定》作出以下处理决定：</p>
          <p :class="tempTextNormal">　　一、收回<span>{{templateForm.companyName}}</span>公司空置展位所在展区（<span>{{templateForm.exhibitionArea}}</span>展区）的品牌展位（共<span>{{templateForm.boothNum}}</span>个），直至下次品牌重新评审为止；</p>
          <p :class="tempTextNormal">　　二、取消<span>{{templateForm.businessDelegationName}}</span>交易团获得当届组展表彰对象的资格；</p>
          <p :class="tempTextNormal">　　三、空置展位的展位费全额收取，不予退回。</p>
          <br><br><br><br><br>
          <p :class="tempTextRight">大会业务办</p>
          <p :class="tempTextRight"><span>{{pYear}}</span>年<span>{{pMonth}}</span>月<span>{{pDay}}</span>日</p>
          <hr>
          <p :class="tempTextCS">抄送：大会领导，秘书处、业务办、政工办、保卫办、新闻中心，广交会工作部，存档。</p>
          <hr>
          <div>
            <p :class="[tempLF, tempTextBT]">中国进出口商品交易会业务办公室</p>
            <p :class="[tempRT, tempTextBT]"><span>{{nYear}}</span>年<span>{{nMonth}}</span>月<span>{{nDay}}</span>日印发</p>
          </div>
        </div>
        <!-- 模板3-一般性+检查组查出-附件6 -->
        <div
          :class="templateClass"
          v-if="templateShow.temp3"
        >
          <p :class="tempTextRight">会业字〔2013〕 号</p>
          <P :class="tempTil">关于对<span>{{templateForm.companyName}}</span>公司违规行为的处理决定</P>
          <p :class="tempTextNormal">　　经第<span>{{templateForm.exhibitionNum}}</span>届广交会现场服务监督检查组及大会业务办认定，<span>{{templateForm.companyName}}</span>公司（广交会编码<span>{{templateForm.cantonCode}}</span>，展位号<span>{{templateForm.boothNo}}</span>）在<span>{{templateForm.exhibitionArea}}</span>展区违规空置展位。现根据《广交会出口展展位使用管理规定》作出以下处理决定：</p>
          <p :class="tempTextNormal">　　一、取消<span>{{templateForm.companyName}}</span>从下届起连续2届广交会的参展资格；</p>
          <p :class="tempTextNormal">　　二、相应扣减<span>{{templateForm.businessDelegationName}}</span>交易团的一般性展位基数；</p>
          <p :class="tempTextNormal">　　三、取消<span>{{templateForm.businessDelegationName}}</span>交易团获得当届组展表彰对象的资格；</p>
          <p :class="tempTextNormal">　　四、空置展位的展位费全额收取，不予退回。</p>
          <br><br><br><br><br>
          <p :class="tempTextRight">大会业务办</p>
          <p :class="tempTextRight"><span>{{pYear}}</span>年<span>{{pMonth}}</span>月<span>{{pDay}}</span>日</p>
          <hr>
          <p :class="tempTextCS">抄送：大会领导，秘书处、业务办、政工办、保卫办、新闻中心，广交会工作部，存档。</p>
          <hr>
          <div>
            <p :class="[tempLF, tempTextBT]">中国进出口商品交易会业务办公室</p>
            <p :class="[tempRT, tempTextBT]"><span>{{nYear}}</span>年<span>{{nMonth}}</span>月<span>{{nDay}}</span>日印发</p>
          </div>
        </div>
        <!-- 模板4 -新能源宠物用品 附件8-->
        <div
          :class="templateClass"
          v-if="templateShow.temp4"
        >
          <p :class="tempTextRight">会业字〔2018〕 号</p>
          <P :class="tempTil">关于对<span>{{templateForm.companyName}}</span>公司违规行为的处理决定</P>
          <p :class="tempTextNormal">　　经第<span>{{templateForm.exhibitionNum}}</span>届广交会展位使用联合检查组现场检查认定，<span>{{templateForm.companyName}}</span>公司（广交会编码<span>{{templateForm.cantonCode}}</span>，展位号<span>{{templateForm.boothNo}}</span>）违规使用展位。现根据《广交会出口展展位使用管理规定》作出以下处理决定：</p>
          <p :class="tempTextNormal">　　一、取消<span>{{templateForm.companyName}}</span>公司从下届起连续4届在违规所属展区（<span>{{templateForm.exhibitionArea}}</span>展区）的参展资格；</p>
          <p :class="tempTextNormal">　　二、处理结果在《广交会通讯》上通报。</p>
          <br><br><br><br><br>
          <p :class="tempTextRight">大会业务办</p>
          <p :class="tempTextRight"><span>{{pYear}}</span>年<span>{{pMonth}}</span>月<span>{{pDay}}</span>日</p>
          <hr>
          <p :class="tempTextCS">抄送：大会领导，秘书处、业务办、政工办、保卫办、新闻中心，广交会工作部，存档。</p>
          <hr>
          <div>
            <p :class="[tempLF, tempTextBT]">中国进出口商品交易会业务办公室</p>
            <p :class="[tempRT, tempTextBT]"><span>{{nYear}}</span>年<span>{{nMonth}}</span>月<span>{{nDay}}</span>日印发</p>
          </div>
        </div>
        <!-- 模板5-中央通道+贫困+检查组查出+企业举报- 附件9-->
        <div
          :class="templateClass"
          v-if="templateShow.temp5"
        >
          <p :class="tempTextRight">会业字〔2018〕 号</p>
          <P :class="tempTil">关于对<span>{{templateForm.companyName}}</span>公司违规行为的处理决定</P>
          <p :class="tempTextNormal">　　经第<span>{{templateForm.exhibitionNum}}</span>届广交会展位使用联合检查组现场检查认定，<span>{{templateForm.companyName}}</span>公司（广交会编码<span>{{templateForm.cantonCode}}</span>，展位号<span>{{templateForm.boothNo}}</span>）违规使用展位。现根据《广交会出口展展位使用管理规定》及《关于加强广交会展位使用管理工作的通知》（商贸促函〔2013〕173号）作出以下处理决定：</p>
          <p :class="tempTextNormal">　　一、取消<span>{{templateForm.companyName}}</span>公司从下届起连续4届在违规所属展区（<span>{{templateForm.exhibitionArea}}</span>展区）的参展资格；</p>
          <p :class="tempTextNormal">　　二、相应扣减<span>{{templateForm.businessDelegationName}}</span>交易团中央通道展位数；</p>
          <p :class="tempTextNormal">　　三、取消<span>{{templateForm.businessDelegationName}}</span>交易团获得当届组展表彰对象的资格；</p>
          <p :class="tempTextNormal">　　四、处理结果在《广交会通讯》上通报。</p>
          <p
            :class="tempTextNormal"
            style="color:#ff0000;"
          >　　大会将对上述展位实际使用者<span>{{templateForm.companyName}}</span>公司的广交会参展资格进行评估，并按《关于加强广交会展位使用管理工作的通知》有关规定进行安排。</p>
          <br><br><br><br><br>
          <p :class="tempTextRight">大会业务办</p>
          <p :class="tempTextRight"><span>{{pYear}}</span>年<span>{{pMonth}}</span>月<span>{{pDay}}</span>日</p>
          <hr>
          <p :class="tempTextCS">抄送：大会领导，秘书处、业务办、政工办、保卫办、新闻中心，广交会工作部，存档。</p>
          <hr>
          <div>
            <p :class="[tempLF, tempTextBT]">中国进出口商品交易会业务办公室</p>
            <p :class="[tempRT, tempTextBT]"><span>{{nYear}}</span>年<span>{{nMonth}}</span>月<span>{{nDay}}</span>日印发</p>
          </div>
        </div>
        <!-- 模板6 -贫困+检查组查出+企业举报- 附件10-->
        <div
          :class="templateClass"
          v-if="templateShow.temp6"
        >
          <p :class="tempTextRight">会业字〔2018〕 号</p>
          <P :class="tempTil">关于对<span>{{templateForm.companyName}}</span>公司违规行为的处理决定</P>
          <p :class="tempTextNormal">　　经第<span>{{templateForm.exhibitionNum}}</span>届广交会展位使用联合检查组现场检查认定，<span>{{templateForm.companyName}}</span>公司（广交会编码<span>{{templateForm.cantonCode}}</span>，展位号<span>{{templateForm.boothNo}}</span>）违规使用展位。现根据《广交会出口展展位使用管理规定》及《关于加强广交会展位使用管理工作的通知》（商贸促函〔2013〕173号）作出以下处理决定：</p>
          <p :class="tempTextNormal">　　一、取消<span>{{templateForm.companyName}}</span>公司从下届起连续4届在违规所属展区（<span>{{templateForm.exhibitionArea}}</span>展区）的参展资格；</p>
          <p :class="tempTextNormal">　　二、相应扣减<span>{{templateForm.businessDelegationName}}</span>交易团（<span>{{templateForm.exhibitionArea}}</span>）展区展位数；</p>
          <p :class="tempTextNormal">　　三、取消<span>{{templateForm.businessDelegationName}}</span>交易团获得当届组展表彰对象的资格；</p>
          <p :class="tempTextNormal">　　四、处理结果在《广交会通讯》上通报。</p>
          <br><br><br><br><br>
          <p :class="tempTextRight">大会业务办</p>
          <p :class="tempTextRight"><span>{{pYear}}</span>年<span>{{pMonth}}</span>月<span>{{pDay}}</span>日</p>
          <hr>
          <p :class="tempTextCS">抄送：大会领导，秘书处、业务办、政工办、保卫办、新闻中心，广交会工作部，存档。</p>
          <hr>
          <div>
            <p :class="[tempLF, tempTextBT]">中国进出口商品交易会业务办公室</p>
            <p :class="[tempRT, tempTextBT]"><span>{{nYear}}</span>年<span>{{nMonth}}</span>月<span>{{nDay}}</span>日印发</p>
          </div>
        </div>
        <!-- 模板7 -品牌+交易团自查-附件2-->
        <div
          :class="templateClass"
          v-if="templateShow.temp7"
        >
          <p :class="tempTextRight">会业字〔2014〕 号</p>
          <P :class="tempTil">关于对<span>{{templateForm.companyName}}</span>公司违规行为的处理决定</P>
          <p :class="tempTextNormal">　　经交易团自查，并经第<span>{{templateForm.exhibitionNum}}</span>届广交会展位使用联合检查组现场检查认定，<span>{{templateForm.companyName}}</span>公司（广交会编码<span>{{templateForm.cantonCode}}</span>，展位号<span>{{templateForm.boothNo}}</span>）违规使用展位。现根据《广交会出口展展位使用管理规定》作出以下处理决定：</p>
          <p :class="tempTextNormal">　　一、取消<span>{{templateForm.companyName}}</span>公司从下届起连续15届在违规所属展区（<span>{{templateForm.exhibitionArea}}</span>展区）品牌展位的参展资格，并取消其相应届数内在违规所属展区品牌展位的评选资格；</p>
          <p :class="tempTextNormal">　　二、处理结果在《广交会通讯》上通报。</p>
          <br><br><br><br><br>
          <p :class="tempTextRight">大会业务办</p>
          <p :class="tempTextRight"><span>{{pYear}}</span>年<span>{{pMonth}}</span>月<span>{{pDay}}</span>日</p>
          <hr>
          <p :class="tempTextCS">抄送：大会领导，秘书处、业务办、政工办、保卫办、新闻中心，广交会工作部，存档。</p>
          <hr>
          <div>
            <p :class="[tempLF, tempTextBT]">中国进出口商品交易会业务办公室</p>
            <p :class="[tempRT, tempTextBT]"><span>{{nYear}}</span>年<span>{{nMonth}}</span>月<span>{{nDay}}</span>日印发</p>
          </div>
        </div>
        <!-- 模板8 -一般性+交易团自查-附件4 -->
        <div
          :class="templateClass"
          v-if="templateShow.temp8"
        >
          <p :class="tempTextRight">会业字〔2018〕 号</p>
          <P :class="tempTil">关于对<span>{{templateForm.companyName}}</span>公司违规行为的处理决定</P>
          <p :class="tempTextNormal"><span>{{templateForm.businessDelegationName}}</span>交易团:</p>
          <p :class="tempTextNormal">　　经你团主动报告，并经第<span>{{templateForm.exhibitionNum}}</span>届广交会展位使用联合检查组现场检查认定，<span>{{templateForm.companyName}}</span>公司（广交会编码<span>{{templateForm.cantonCode}}</span>，展位号<span>{{templateForm.boothNo}}</span>）违规使用展位。现根据《广交会出口展展位使用管理规定》作出以下处理决定：</p>
          <p :class="tempTextNormal">　　一、取消<span>{{templateForm.companyName}}</span>公司从下届起连续4届在违规所属展区（<span>{{templateForm.exhibitionArea}}</span>展区）品牌展位的参展资格，并取消其相应届数内在违规所属展区品牌展位的评选资格；</p>
          <p :class="tempTextNormal">　　二、取消你团获得当届组展表彰对象的资格。</p>
          <br><br><br><br><br>
          <p :class="tempTextRight">大会业务办</p>
          <p :class="tempTextRight"><span>{{pYear}}</span>年<span>{{pMonth}}</span>月<span>{{pDay}}</span>日</p>
          <hr>
          <p :class="tempTextCS">抄送：大会领导，秘书处、业务办、政工办、保卫办、新闻中心，广交会工作部，存档。</p>
          <hr>
          <div>
            <p :class="[tempLF, tempTextBT]">中国进出口商品交易会业务办公室</p>
            <p :class="[tempRT, tempTextBT]"><span>{{nYear}}</span>年<span>{{nMonth}}</span>月<span>{{nDay}}</span>日印发</p>
          </div>
        </div>
        <!-- 模板9- 品牌+检查组查出-附件1-->
        <div
          :class="templateClass"
          v-if="templateShow.temp9"
        >
          <p :class="tempTextRight">会业字〔2018〕 号</p>
          <P :class="tempTil">关于对<span>{{templateForm.companyName}}</span>公司违规行为的处理决定</P>
          <p :class="tempTextNormal">　　经第<span>{{templateForm.exhibitionNum}}</span>届广交会展位使用联合检查组现场检查认定，<span>{{templateForm.companyName}}</span>公司（广交会编码<span>{{templateForm.cantonCode}}</span>，展位号<span>{{templateForm.boothNo}}</span>）违规使用展位。现根据《广交会出口展展位使用管理规定》作出以下处理决定：</p>
          <p :class="tempTextNormal">　　一、取消<span>{{templateForm.companyName}}</span>公司从下届起连续15届在违规所属展区（<span>{{templateForm.exhibitionArea}}</span>展区）品牌展位的参展资格，并取消其相应届数内在违规所属展区品牌展位的评选资格；</p>
          <p :class="tempTextNormal">　　二、处理结果在《广交会通讯》上通报。</p>
          <br><br><br><br><br>
          <p :class="tempTextRight">大会业务办</p>
          <p :class="tempTextRight"><span>{{pYear}}</span>年<span>{{pMonth}}</span>月<span>{{pDay}}</span>日</p>
          <hr>
          <p :class="tempTextCS">抄送：大会领导，秘书处、业务办、政工办、保卫办、新闻中心，广交会工作部，存档。</p>
          <hr>
          <div>
            <p :class="[tempLF, tempTextBT]">中国进出口商品交易会业务办公室</p>
            <p :class="[tempRT, tempTextBT]"><span>{{nYear}}</span>年<span>{{nMonth}}</span>月<span>{{nDay}}</span>日印发</p>
          </div>
        </div>
        <!-- 模板10 检查组查出-附件7-->
        <div
          :class="templateClass"
          v-if="templateShow.temp10"
        >
          <p :class="tempTextRight">会业字〔2014〕 号</p>
          <P :class="tempTil">关于对<span>{{templateForm.companyName}}</span>公司违规行为的处理决定</P>
          <p :class="tempTextNormal">　　经第<span>{{templateForm.exhibitionNum}}</span>届广交会展位使用联合检查组现场检查认定，<span>{{templateForm.companyName}}</span>公司（广交会编码<span>{{templateForm.cantonCode}}</span>，展位号<span>{{templateForm.boothNo}}</span>）违规使用展位。现根据《广交会出口展展位使用管理规定》作出以下处理决定：</p>
          <p :class="tempTextNormal">　　一、取消<span>{{templateForm.companyName}}</span>公司从下届起连续15届在违规所属展区（<span>{{templateForm.exhibitionArea}}</span>展区）品牌展位的参展资格，并取消其相应届数内在违规所属出口展区品牌展位的评选资格；</p>
          <p :class="tempTextNormal">　　二、取消<span>{{templateForm.companyName}}</span>公司从下届起连续4届在违规所属展区（<span>{{templateForm.exhibitionArea}}</span>展区）的参展资格；</p>
          <p :class="tempTextNormal">　　三、相应扣减<span>{{templateForm.businessDelegationName}}</span>交易团的一般性展位基数；</p>
          <p :class="tempTextNormal">　　四、取消<span>{{templateForm.businessDelegationName}}</span>交易团获得当届组展表彰对象的资格；</p>
          <p :class="tempTextNormal">　　五、处理结果在《广交会通讯》上通报。</p>
          <br><br><br><br><br>
          <p :class="tempTextRight">大会业务办</p>
          <p :class="tempTextRight"><span>{{pYear}}</span>年<span>{{pMonth}}</span>月<span>{{pDay}}</span>日</p>
          <hr>
          <p :class="tempTextCS">抄送：大会领导，秘书处、业务办、政工办、保卫办、新闻中心，广交会工作部，存档。</p>
          <hr>
          <div>
            <p :class="[tempLF, tempTextBT]">中国进出口商品交易会业务办公室</p>
            <p :class="[tempRT, tempTextBT]"><span>{{nYear}}</span>年<span>{{nMonth}}</span>月<span>{{nDay}}</span>日印发</p>
          </div>
        </div>
      </template>
    </el-main>
  </el-container>
</template>

<script>
import http from "@/scripts/framework/http";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    var newReg1 = (rule, value, callback) => {
      let num = /^[0-9]*[1-9][0-9]*$/;
      if (!num.test(value)) {
        return callback(new Error("只能输入正整数"));
      } else {
        return callback();
      }
    };
    return {
      form: {},
      templateClass: 'templateAll',
      tempTil: 'tempTil',
      tempLF: 'tempLF',
      tempRT: 'tempRT',
      tempTextNormal: 'tempTextNormal',
      tempTextRight: 'tempTextRight',
      tempTextCS: 'tempTextCS',
      tempTextBT: 'tempTextBT',
      templateForm: {
        cantonCode: '',
        maxnum: '',          // 最大安排数
        ifflaunt: '',        // 限制展位类型
        name: '',            //处罚通知管理名称
        modelFileId: '',     //模板id
        modelFileName: '',   //模板名称
        // ppTime: '',          //打印时间
        // pnTime: '',          //印发时间
        companyName: '',        //公司名称
        exhibitionNum: '',      //展届
        gjhCode: '',            //广交会编码
        boothNo: '',            //展位号
        boothNum: '',           //展位数
        exhibitionArea: '',      //展区
        poId: '',             //处理意见ID
        ruleCode: '' // 事件类别
      },
      //表单验证
      rules: {
        name: [
          { required: true, message: '处罚通知管理名称不能为空', trigger: 'blur' }
        ],
        lsModelId: [
          { required: true, message: '请选择模板', trigger: 'change' }
        ],
        ifflaunt: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        ppTime: [
          { required: true, message: '请输入打印时间', trigger: 'blur' }
        ],
        pnTime: [
          { required: true, message: '请输入印发时间', trigger: 'blur' }
        ],
        ruleCode: [
          { required: true, message: '请选择事件类别', trigger: 'blur' }
        ],
        maxnum: [
          { required: true, message: '请输入最大安排数', trigger: 'blur' },
          { validator: newReg1, trigger: 'blur' }
        ]
      },
      templateData: {},        //接收的数据
      templateSelect: [],      //模板列表
      ifflauntCode: [],        // 展位类型
      templateShow: {
        temp1: false,
        temp2: false,
        temp3: false,
        temp4: false,
        temp5: false,
        temp6: false,
        temp7: false,
        temp8: false,
        temp9: false,
        temp10: false
      },
      // lsModelId: '',  //临时模板Id
      pYear: '',  //年
      pMonth: '', //月
      pDay: '',   //日
      nYear: '',  //年
      nMonth: '', //月
      nDay: '',   //日
      baseApi: process.env.API_SN_URL,
      sessionValue: '' // 暂存展览届数
    };
  },
  created() {
    this.getSelectDictByCodes(); // 获取事件类别
    this.BoothType();
    this.templateData = this.$route.query;
    this.templateForm.companyName = this.templateData.row.companyName;
    this.templateForm.exhibitionNum = this.templateData.row.exhibitionNum;
    this.templateForm.gjhCode = this.templateData.row.companyId;
    this.templateForm.businessDelegationName = this.templateData.row.businessDelegationText;
    this.templateForm.boothNo = this.templateData.row.boothNo;
    this.templateForm.exhibitionArea = this.templateData.row.exhibitionAreaCode;
    this.templateForm.poId = this.templateData.row.opinionId;
    this.templateForm.cantonCode = this.templateData.row.cantonCode;
    this.sessionValue = this.$route.query.sessionValue; // 暂存展览届数
  },
  computed: {
    ...mapGetters('rulesOfRewardsPunish', ['selectDictByCodesData']),
    lsModelId() {
      return this.templateForm.lsModelId;
    }
  },
  watch: {
    lsModelId(value) {
      switch (value) {
        case "05":
          return this.templateShowHide("temp1");
        case "07":
          return this.templateShowHide("temp2");
        case "08":
          return this.templateShowHide("temp3");
        case "10":
          return this.templateShowHide("temp4");
        case "12":
          return this.templateShowHide("temp5");
        case "11":
          return this.templateShowHide("temp6");
        case "04":
          return this.templateShowHide("temp7");
        case "06":
          return this.templateShowHide("temp8");
        case "03":
          return this.templateShowHide("temp9");
        case "09":
          return this.templateShowHide("temp10");
        default: '';
      }
    }
  },
  methods: {
    ...mapActions('rulesOfRewardsPunish', ['getSelectDictByCodes']),
    // 限制展位类型
    BoothType() {
       // 获取所有限制展位类型
      http.get(this.baseApi + "/api/sysDataDictItem/findDicItemListBySupportLimitBoothType").then(res => {
        res.records.forEach(element => {
          this.ifflauntCode.push({
            code: element.itemCode,
            label: element.itemText
          });
        });
      }).catch(error => { });

    },
    //获取模板
    getTemplates() {
      let params = '';
      http.get(this.baseApi + "/api/punishNotificaton/model/list", params).then(data => {
        this.templateSelect = data;

      }).catch(error => { });
    },
    pTime() {
      let thisDate = new Date(this.templateForm.ppTime);
      this.pYear = thisDate.getFullYear();
      this.pMonth = thisDate.getMonth() + 1;
      this.pDay = thisDate.getDate();
    },
    nTime() {
      let thisDate = new Date(this.templateForm.pnTime);
      this.nYear = thisDate.getFullYear();
      this.nMonth = thisDate.getMonth() + 1;
      this.nDay = thisDate.getDate();
    },
    //选择模板
    // selectTemp() {
    //   if (this.lsModelId === "05") {  //模板1
    //     this.templateShowHide("temp1");
    //   } else if (this.lsModelId === "07") { //模板2
    //     this.templateShowHide("temp2");
    //   } else if (this.lsModelId === "08") { //模板3
    //     this.templateShowHide("temp3");
    //   } else if (this.lsModelId === "10") { //模板4
    //     this.templateShowHide("temp4");
    //   } else if (this.lsModelId === "12") { //模板5
    //     this.templateShowHide("temp5");
    //   } else if (this.lsModelId === "11") { //模板6
    //     this.templateShowHide("temp6");
    //   } else if (this.lsModelId === "04") { //模板7
    //     this.templateShowHide("temp7");
    //   } else if (this.lsModelId === "06") { //模板8
    //     this.templateShowHide("temp8");
    //   } else if (this.lsModelId === "03") { //模板9
    //     this.templateShowHide("temp9");
    //   } else if (this.lsModelId === "09") { //模板10
    //     this.templateShowHide("temp10");
    //   }
    // },
    templateShowHide(temp) {
      let dataArr = this.templateShow;
      $.each(this.templateShow, function (n, value) {
        dataArr[n] = false;
      });
      this.templateShow[temp] = true;
    },
    //获取模板名称
    getModelName(fileId) {
      let name = '';
      for (let index = 0; index < this.templateSelect.length; index++) {
        const element = this.templateSelect[index];
        if (element.fileId === fileId) {
          name = element.modelName;
        }
      }
      return name;
    },
    //提交
    tempSubmit() {
      let num = /^[0-9]*[1-9][0-9]*$/;
      if (this.templateForm.name === '') {
        this.$message({
          message: '处罚通知管理名称不能为空！',
          type: 'warning'
        });
      } else if (this.templateForm.lsModelId === '') {
        this.$message({
          message: '请选择模板！',
          type: 'warning'
        });
      } else if (this.templateForm.ifflaunt === '') {
        this.$message({
          message: '请选择限制展位类型！',
          type: 'warning'
        });
      } else if (this.templateForm.ppTime === undefined) {
        this.$message({
          message: '请选择打印时间！',
          type: 'warning'
        });
      } else if (this.templateForm.pnTime === undefined) {
        this.$message({
          message: '请选择印发时间！',
          type: 'warning'
        });
      } else if (this.templateForm.maxnum === '') {
        this.$message({
          message: '请输入最大安排数！',
          type: 'warning'
        });
      } else if (!num.test(this.templateForm.maxnum)) {
        this.$message({
          message: '请输入正整数！',
          type: 'warning'
        });
      } else {
        //获取fileId
        this.templateForm.modelFileId = this.getFileId(this.templateSelect, this.templateForm.lsModelId);
        //获取模板名称
        this.templateForm.modelFileName = this.getModelName(this.templateForm.modelFileId);
        let params = JSON.stringify(this.templateForm);
        http.put(this.baseApi + "/api/punishNotificaton", params).then(data => {
          this.$message.success('添加处罚通知成功！');
          setTimeout(() => {
            this.$router.push({ path: '/opinionNoticManage', query: { sessionValue: this.sessionValue }});
          }, 1000);
        }).catch(error => { });

      }
    },
    goBack() {
      // localStorage.setItem("exhNum", this.templateForm.exhibitionNum);
      this.$router.go(-1);
    },
    //通过modelId获取fileId
    getFileId(array, modelId) {
      let thisId = '';
      for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (modelId === element.modelId) {
          thisId = element.fileId;
        }
      }
      return thisId;
    }

  },
  mounted() {
    this.getTemplates();
  }
};
</script>

