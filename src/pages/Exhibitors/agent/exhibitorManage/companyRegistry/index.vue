<style lang="less">
  @import "../../../../../theme/project/css/flex.less";
  #company-registry {
    .searchBtn{
      margin-left: 30px;
      width: 100px; /* width: 80px; */
    }
    .submitBtn{
      margin-top: 30px;
      margin-left: 120px;
      width: 100px;
    }
    .submitBtnT{
      margin-top: 30px;
      margin-left: 30px;
      width: 100px;
    }
    .inline-item{
      display: inline-block;
      width: 50%;
      margin-left: 3%;
      margin-right: 60%;
      margin-top: 15px;
    }
    .p-indent{
      text-indent:2em;
    }
    .total{
      font-family: 'Arial Negreta', 'Arial';
      font-weight: 700;
      text-align: center;
      font-size: 18px;
      line-height: 28px;
    }
    .sub-style{
      margin-left: 120px;
      padding-bottom: 10px;
    }
    .remarke{
      margin-left: 40px;
      color: red;
    }
    .showCase{
      color: rgb(22, 155, 213);
      cursor:pointer;
    }
    .li-style{
      list-style:none;
      cursor:pointer;
    }
    .name-select{
      border: 1px solid rgba(228, 228, 228, 1);

    }
    .formProduct {
      .el-checkbox {
        margin-bottom: 10px;
        .el-checkbox__input {
          vertical-align: top;
        }
        .el-checkbox__label {
          white-space: normal;
          word-break: break-all;
        }
      }
    }
  }
</style>

<template>
  <div id="company-registry">
    <el-tabs v-model="activeName" @tab-click="firstTabClick">
      <!-- 验证信息 -->
      <el-tab-pane label="1.验证信息" name="first">
        <el-form label-width="160px"
        :model="form"
        ref="form"
        :rules="searchRules">
          <el-form-item label="企业英文名称:" prop="enNames">
            <el-col :span="5">
              <el-input v-model="form.enNames" ></el-input>
              <div class="name-select" v-if="visible">
                <ul style="padding-left: 10px;">
                  <template v-for="item in enNames">
                    <li :key="item" class="li-style" @click="giveName(item)">{{ item }}</li>
                  </template>
                </ul>
              </div>
            </el-col>
            <el-col :span="5">
              <el-button type="danger" class="searchBtn" @click="research">查询</el-button>
            </el-col>
          </el-form-item>
          <div class="sub-style">
            <el-button type="danger" class="submitBtn" @click="confirmRepValidate('form')">验证</el-button>
            <el-button type="info" class="submitBtn" style="margin-left: 50px" @click="resetForm('form')">取消</el-button>
          </div>
        </el-form>
      </el-tab-pane>
      <!-- 填写基本信息 paneDisabled-->
      <el-tab-pane label="2.填写基本信息" name="second" :disabled="false">
        <span class="remarke">*号为必填项※号为必填项</span>
        <el-form label-width="160px"
        :rules="formRules"
        :model="registForm"
        ref="registForm">
          <el-form-item label="企业英文名称：" class="inline-item" prop="companyNameEn" size="small" >
            <el-input v-model="registForm.companyNameEn" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="企业中文名称：" class="inline-item" size="small" prop="companyNameCh">
            <el-input v-model="registForm.companyNameCh"></el-input>
          </el-form-item>
          <el-form-item label="企业简称：" class="inline-item" size="small" prop="enterpriseAbbreviation" >
            <el-input v-model="registForm.enterpriseAbbreviation"></el-input>
          </el-form-item>
          <el-form-item label="所在国家区域：" class="inline-item" size="small" prop="countryRegionId">
            <el-select v-model="registForm.countryRegionId" placeholder="请选择">
              <el-option
                v-for="item in countries"
                :key="item.countryRegionId"
                :label="item.crChName"
                :value="item.countryRegionId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品：" class="inline-item" size="small" prop="product" >
            <el-input v-model="registForm.product"></el-input>
          </el-form-item>
          <el-form-item label="联系人：" class="inline-item" size="small" prop="contact" >
            <el-input v-model="registForm.contact"></el-input>
          </el-form-item>
          <el-form-item label="职务：" class="inline-item" size="small" prop="job" >
            <el-input v-model="registForm.job"></el-input>
          </el-form-item>
          <el-form-item label="邮箱：" class="inline-item" size="small" prop="mail" >
            <el-input v-model="registForm.mail"></el-input>
          </el-form-item>
          <el-form-item label="电话：" class="inline-item" size="small" prop="telephone" >
            <el-input v-model="registForm.telephone"></el-input>
          </el-form-item>
          <el-form-item label="企业类型：" class="inline-item" size="small" prop="companyType" >
            <el-select v-model="registForm.companyType" placeholder="请选择">
              <el-option
                v-for="item in companyTypeOptionsData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="" class="inline-item" size="small" prop="companyTypeElse" >
            <el-input v-model="registForm.companyTypeElse"></el-input>
          </el-form-item>
          <el-form-item label="所属行业：" class="inline-item" size="small" prop="industry" >
            <el-select v-model="registForm.industry" placeholder="请选择">
              <el-option
                v-for="item in industryTypeOptionsData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业网址：" class="inline-item" size="small" prop="companyNetAddress" >
            <el-input v-model="registForm.companyNetAddress"></el-input>
          </el-form-item>
          <el-form-item label="意向申请展位数量：" class="inline-item" size="small" prop="intentionBoothNum">
            <el-input v-model.number="registForm.intentionBoothNum"></el-input>
          </el-form-item>
          <el-form-item label="意向申请届数：" class="inline-item" size="small" prop="intentionExhSes">
            <el-select v-model="registForm.intentionExhSes" placeholder="请选择">
              <el-option
                v-for="item in exhibitListAllData"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="招展代理" class="inline-item" size="small" prop="exhibitionAgentId" >
            <el-select v-model="registForm.exhibitionAgentId" placeholder="请选择">
              <el-option
                v-for="item in exhibitionAgents"
                :key="item.exhibitionAgentId"
                :label="item.agentCh"
                :value="item.exhibitionAgentId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div class="sub-style">
          <div>
          <el-checkbox style="margin-right: 10px;" name="checkBox"></el-checkbox>本司已阅读并同意<a class="showCase" @click="dialogProduct=true">《境外参展商隐私政策》</a>
          </div>
          <el-button type="danger" class="submitBtnT" @click="submitForm('registForm')">提交</el-button>
          <el-button type="info" class="submitBtnT" style="margin-left: 50px" @click="cancelSubmit">取消</el-button>
        </div>
      </el-tab-pane>
      <!-- 隐私条件 -->
      <el-dialog title="隐私提款" :visible.sync="dialogProduct" class="formProduct">
        <p class="total">境外参展商隐私政策</p>
        <p>最新更新日期：2018年X月X日</p>
        <p>中国对外贸易中心、中国对外贸易中心（集团）（以下统称为“外贸中心”或“我们”）尊重您的个人隐私。本隐私政策旨在释明我们是谁，我们如何收集、分享和使用您的个人信息，以及您如何维护您的合法权益。</p>
        <p>本隐私政策适用于外贸中心通过旗下官方网站www.cftc.org.cn、www.cantonfair.org.cn（以下统称为“网站”）收集的个人信息以及您使用我们的服务（包括但不限于我们的网站、APP、公众号等）时我们所收集的个人信息，比如您向我们申请中国进出口商品交易会（简称“广交会”）的各项服务时。</p>
        <p>如果您对我们使用您的个人信息有任何疑问或顾虑，请通过本隐私政策底部所示联系方式与我们联系。</p>
        <p>外贸中心的业务是什么？</p>
        <p>中国对外贸易中心是商务部直属事业单位，主要负责承办中国进出口商品交易会（又称广交会）；在中国广州及上海同时拥有国内两个超大型现代化展馆，即位于广州市海珠区琶洲岛的广交会展馆和位于上海市虹桥商务区核心区西部的国家会展中心（上海）。中国对外贸易中心以其六十多年的专业办展经验、卓越的业绩、专业的服务在中国会展业中占有举足轻重的地位。</p>
        <p>中国对外贸易中心下设企业集团、即中国对外贸易中心（集团），主要业务是主办各类大型专业展览；经营广州及上海两大展馆；通过旗下子公司及控股/参股公司经营电子商务、广告、进出口贸易、旅游、酒店、餐饮、物业等业务。</p>
        <p>有关外贸中心的更多信息，请参阅我们网站www.cftc.org.cn的“中心简介”的部分。</p>
        <p>外贸中心收集的个人信息以及原因</p>
        <p>我们可能收集您的个人信息，这些个人信息会大致分为以下几类：</p>
        <p class="p-indent">您自愿提供的信息</p>
        <p>为了使用我们的服务，我们会请您自愿地提供如下个人信息：</p>
        <p class="p-indent">联系方式诸如您的姓名、地址、电话号码、电子邮件地址、传真号码、性别等；以及</p>
        <p class="p-indent">业务需要的公司相关证照、个人证件图片、个人照片、个人身份证件信息等；以及</p>
        <p class="p-indent">有助于提供及改进服务的信息，包括所在公司名称、公司类型、公司规模、个人职务、采购需求等；以及</p>
        <p class="p-indent">通过问卷调查、意见征集或其他营销调查活动收集到的个人信息；以及</p>
        <p class="p-indent">提供给客户服务代表用于调查或解决问题的个人信息</p>
        <p>我们使用这些个人信息来为您参加广交会提供便利，为您提供外贸中心主办的其他展览会的信息及服务，并向您提供关于我们的信息。我们向您收集的个人信息及其原因将在我们向您收集您的个人信息时向您明示。</p>
        <p class="p-indent">我们自动收集的信息</p>
        <p>当您访问我们的网站，我们可能会自动地从您的设备中收集您的特定信息。在一些国家，包括欧盟成员国在内，这些信息会被视为在适用的数据保护法下的个人信息。 我们自动收集的信息将包含比如您的IP地址、设备型号、唯一设备识别号、浏览器型号、地理位置的信息，以及其他的技术信息。我们也可能收集有关您的设备如何与我们的网站交互的信息，包括您访问的网页和点击的链接。 </p>
        <p>收集这些信息使得我们可以更好地理解访问我们网站的客人、他们来自何处，以及他们对我们网站上的何种内容感兴趣。我们将这些信息用于内部分析的目的，以提升我们服务的水平</p>
        <p>这些信息中的一部分可能使用cookie和类似的追踪技术收集，如本政策所提及的Cookies及类似的追踪技术。</p>
        <p class="p-indent">我们从第三方处获得的信息</p>
        <p>我们可能会不时地从第三方来源收到有关您的个人信息，但这只发生在：我们确认这些第三方已经获得您的同意，或者第三方依法被许可或被要求向我们披露您的个人信息。</p>
        <p>我们从第三方处收集的信息涵盖了专业展览机构和其他展会协助方提供的信息。我们将这些从第三方处收集的信息用于为您提供服务，以及用于保证我们所掌握的您的相关记录的准确性。</p>
        <p>一般而言，您的个人信息将可能用于电子邮件服务、直邮邀请以及电话外呼等服务，或本隐私政策中所描述的目的，或我们在收集您的个人信息时向您解释的目的。然而，如果当地适用的数据保护法允许，我们也可能将您的个人信息用于与我们告知您的目的所不同的其他目的（例如：为了公共利益目的、科学或历史研究之目的或者统计目的等）</p>
        <p>外贸中心与谁分享我的个人信息？</p>
        <p>我们可能会将您的个人信息披露给以下类别的主体：</p>
        <p>外贸中心，第三方服务提供商以及为我们提供数据处理服务的合作方（例如：为网站服务提供技术支持的专业机构），或按本隐私政策所描述的目的，或我们在收集您的个人信息时通知您的用途，以其他方式处理个人信息的合作方。</p>
        <p class="p-indent">我们认为基于以下原因披露您的个人信息是必要的：</p>
        <p>（1）为适用法律；</p>
        <p>（2）实施、建立、维护我们的合法权利；</p>
        <p>（3）保护您或其他人的切身利益，向任何主管的执法机构、监管机构、政府机构、法院或其他第三方披露；</p>
        <p>（4）为实现组展方商业目的或为了充分履行所有与参展条款相关目的而将其资料和信息转交于第三方。</p>
        <p class="p-indent">在征得您的同意后向其他任何人披露</p>
        <p>处理个人信息的法律依据（仅限欧盟地区的访客和用户）</p>
        <p>如果您是欧盟地区的访客或用户，我们上述收集或使用个人信息的法律依据将取决于相关的个人信息以及我们收集个人信息时的具体语境。</p>
        <p>然而，我们通常只会在下列情况下收集您的个人信息：</p>
        <p>（1）我们履行与您合同时所需的您的个人信息；</p>
        <p>（2）处理过程符合我们的合法利益且您在此之上没有其他在先权利；</p>
        <p>（3） 我们已经征得您的同意。</p>
        <p>在某些情况下，我们也可能有义务去收集您的个人信息，或者可能需要这些个人信息来保护您或其他人的切身利益。 </p>
        <p>如果我们以合规之目的或以履行与您之间的合同为目的，要求您提供个人信息，我们将在相关时间内明确说明并告知您是否在强制要求下提供个人信息（以及如果您不提供个人信息可能导致的后果）。</p>
        <p>如果我们因我们自身的合法利益（或任何第三方的合法利益）而收集或使用您的个人信息，此利益通常是为了：运营我们的展会以及我们在必要时与您沟通以向您提供我们的服务，以及为实现我们合法的商业利益，例如：回复您的问题、改进我们的服务或检查、防范违法行为之目的。此外我们可能还有其他的合法利益。</p>
        <p>如果您对我们收集和使用个人信息的法律依据有任何疑义或需要进一步的信息，请按“如何联系我们”标题下的详细的联系方式与我们联系。</p>
        <p>Cookies及类似的追踪技术 </p>
        <p>我们使用cookies和类似的追踪技术（统称为“Cookies”）来收集和使用您的个人信息，包括：为您提供您感兴趣的广告。关于我们使用的Cookie类型、为什么使用Cookies以及如何控制Cookies的更多信息，请参阅我们的Cookies政策介绍。</p>
        <p>外贸中心如何保障我的个人信息安全 </p>
        <p>我们使用适合的技术手段和组织措施来保障我们所收集的您的个人信息。我们采取的措施旨在为您提供与处理您的个人信息产生的风险相匹配的安全保障级别。 </p>
        <p>数据存储 </p>
        <p>我们基于持续合法的经营需求（如向您提供您所需的服务或遵守适用的法律要求），我们会存储从您处收集的个人信息。</p>
        <p>如果我们不因持续合法的经营需求来处理您的个人信息，我们将删除或将其匿名化，如果不能采取这类措施（比如，因您的个人信息已存储在备份存档中），则我们将安全地存储您的个人信息并在能够删除此类信息前避免对其做进一步的处理。</p>
        <p>您的数据保护权利</p>
        <p>如果您是欧盟地区的居民，您享有以下数据保护的权利：</p>
        <p class="p-indent">如果您有意访问、纠正、更新或要求删除您的个人信息，您可以随时通过“如何联系我们”标题下所提供的详细联系方式来联系我们。</p>
        <p class="p-indent">此外，您有权拒绝我们处理您的个人信息，有权要求我们限制处理您的个人信息或请求携带您的个人数据。再次说明，您可以通过“如何联系我们”标题下所提供的详细联系方式来联系我们，以行使这些权利。</p>
        <p class="p-indent">您随时有权选择退订我们发予您的展览资讯及服务信息。您可以通过点击我们发予您的电子邮件中的 “退订” 的链接来行使此权利。如果您欲选择退订其他营销信息，请使用“如何联系我们”下的详细联系方式来联系我们。</p>
        <p class="p-indent">您随时有权选择退订我们发予您的展览资讯及服务信息。您可以通过点击我们发予您的电子邮件中的 “退订” 的链接来行使此权利。如果您欲选择退订其他营销信息，请使用“如何联系我们”下的详细联系方式来联系我们。</p>
        <p>我们会根据适用的数据保护法律来回应我们所收到的要求行使数据保护权的主体的所有请求。</p>
        <p>本隐私政策的更新</p>
        <p>我们可能适时地更新本隐私政策以适应法律、技术或商业的发展。我们更新本隐私政策时，我们将以适当的方式通知您。若适用的数据保护法律要求我们在实质修订隐私政策时征得您的同意，我们将遵守法律的规定。您可以在本隐私政策的顶部的“最新更新“的日期处查看本隐私政策的最新更新日期。</p>
        <p>如何联系我们</p>
        <p>如果您对我们使用您的个人信息有任何疑问或疑虑，请使用以下详细信息联系我们：</p>
        <p>境内 4000-888-999</p>
        <p>境外 (8620)28-888-999</p>
        <p>E-mail:info@cantonfair.org.cn</p>
        <p>您个人信息的数据控制者是中国对外贸易中心（集团）。</p>
        <div style="height:50px"></div>
        <p>尊敬的用户：</p>
        <p>我们真诚地为弹窗可能造成的不便道歉。为提供更好的服务，我们将收集您的相关信息，请您自愿勾选以下项目，如勾选，表示您同意我方对您的信息进行相应处理：</p>
        <el-checkbox v-model="userCheckAll">全选</el-checkbox>
        <el-checkbox-group v-model="itemCheckedArr" @change="handleCheckedItemChange">
          <div class="bm bm-ver">
            <el-checkbox v-for="uesrMsg in userMsgArr" :key="uesrMsg.label"
              :label="uesrMsg.label">
            </el-checkbox>
          </div>
        </el-checkbox-group>
      </el-dialog>
    </el-tabs>
  </div>
</template>

<script>
import listPageBase from "@/components/framework/mixins/listPageBase";
import tableMixIn from "@/utils/helper/tableMixIn";
import { mapGetters, mapActions } from "vuex";
export default {
  mixins: [tableMixIn, listPageBase],
  data() {
    let checkLength = (rule, value, callback) => {
      let errors = [];
      if (value.length > rule.length) {
        errors.push(new Error("长度超过限制" + rule.length));
      }
      callback(errors);
    };
    return {
      activeName: "first",
      paneDisabled: true,
      dialogProduct: false,
      visible: false,
      enNames: [],
      countries: [],
      exhibitionAgents: [],
      value: '',
      form: {
        enNames: ""
      },
      registForm: {
        companyNameEn: "",
        companyNameCh: "",
        enterpriseAbbreviation: "",
        countryRegionId: "",
        companyType: "",
        companyTypeElse: "",
        industry: "",
        exhibitionAgentId: "",
        intentionBoothNum: "",
        intentionExhSes: "",
        companyNetAddress: "",
        contact: "",
        depart: "",
        job: "",
        mail: "",
        product: "",
        telephone: ""
      },
      // 验证信息验证
      searchRules: {
        enNames: [{ required: true, message: "企业英文名称不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^[a-zA-Z0-9]+\s?[\.·\-()a-zA-Z0-9]*[a-zA-Z0-9]+$/;
              if (!regRule.test(value) && value !== "") {
                errors.push(new Error("请输入字母、数字、括号、字符间支持一个空格"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
          { length: "50", validator: checkLength }
        ]
      },
      // 基本信息验证
      formRules: {
        companyNameEn: [{ required: true, message: "企业英文名称不能为空", trigger: "blur" }],
        companyNameCh: [{ required: true, message: "企业中文名称不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let regRule = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
              let regRuleT = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
              if (regRuleT.test(value) || regRule.test(value)) {
                return callback(new Error("不能输入特殊字符"));
              } else {
                return callback();
              }

            },
            trigger: "blur"
          },
          { length: "50", validator: checkLength }
        ],
        enterpriseAbbreviation: [{ required: true, message: "企业简称不能为空", trigger: "blur" },
        { length: "32", validator: checkLength }],
        countryRegionId: [{ required: true, message: "所在国家区域不能为空", trigger: "blur" }],
        product: [{ required: true, message: "产品不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        contact: [{ required: true, message: "联系人不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        job: [{ required: true, message: "职务不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        mail: [{ required: true, message: "邮箱不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("请输入正确的邮箱格式"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
        { length: "255", validator: checkLength }],
        telephone: [{ required: true, message: "电话不能为空", trigger: "blur" },
          {
            validator: (rule, value, callback) => {
              let errors = [];
              let regRule = /^([0-9]{0,255})$/;
              if (!regRule.test(value)) {
                errors.push(new Error("只能输入数字"));
              }
              callback(errors);
            },
            trigger: "blur"
          },
        { length: "255", validator: checkLength }],
        companyType: [{ required: true, message: "企业类型不能为空", trigger: "blur" },
        { length: "32", validator: checkLength }],
        industry: [{ required: true, message: "所属行业不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        companyNetAddress: [{ required: true, message: "企业网址不能为空", trigger: "blur" },
        { length: "255", validator: checkLength }],
        intentionBoothNum: [{ required: true, message: "意向申请展位数量不能为空", trigger: "blur" },
        { type: 'number', message: '意向申请展位数量必须为数字值' }, { length: "32", validator: checkLength }],
        intentionExhSes: [{ required: true, message: "意向申请届数不能为空", trigger: "blur" },
        { length: "100", validator: checkLength }],
        exhibitionAgentId: [{ required: true, message: "招展代理不能为空", trigger: "blur" },
        { length: "32", validator: checkLength }]
      },
      //条款勾选
      userCheckAll: false,
      itemCheckedArr: [],
      userMsgArr: [
        {
          label: "姓名（我们将严格保密，用于数据统计。）",
          value: 1
        },
        {
          label: "国籍/省份（我们将严格保密，用于数据统计。）",
          value: 2
        },
        {
          label: "公司（我们将严格保密，用于数据统计。）",
          value: 3
        },
        {
          label: "公司网址（我们将严格保密，用于资质审核。）",
          value: 4
        },
        {
          label: "邮箱地址（我们将可能通过电子邮件为您提供资讯，包括中国进出口商品交易会（广交会）或中国对外贸易中心（集团）主办的有关展览的信息和服务。）",
          value: 5
        },
        {
          label: "电话/手机（我们将可能通过电话外呼的方式为您提供资讯，包括中国进出口商品交易会（广交会）或中国对外贸易中心（集团）主办的有关展览的信息和服务。）",
          value: 6
        },
        {
          label: "意向采购类别/主要参展产品类别（我们将严格保密，用于为您提供精准服务及数据统计。）",
          value: 7
        }
      ]
    };
  },
  computed: {
    ...mapGetters('regist', ['getListAll', 'companyTypeOptionsData', 'industryTypeOptionsData', 'exhibitListAllData']),  // 用户新增
    confirmRepParams() { // 验证企业是否已经注册参数
      let param = {
        "customQueryParams": [
          {
            "findType": "EQ",
            "joinType": "And",
            "name": "companyNameEn",
            "values": [
              this.form.enNames
            ]
          }
        ]
      };
      return param;
    }
  },
  watch: {
    userCheckAll: function(newVal, oldVal) {
      if (newVal) {
        // console.log(11);
        
        this.itemCheckedArr.splice(0, this.itemCheckedArr.length);
        for (let item of this.userMsgArr) {
          this.itemCheckedArr.push(item.label);
        }
      } else {
        // console.log(22);
        
        this.itemCheckedArr.splice(0, this.itemCheckedArr.length);
      }
    }
  },
  methods: {
    ...mapActions('regist', ['getListAllInfo', 'getConfirmIsRepeatInfo', 'getAllCountryInfo',
      'addInfo', 'getAllAgentsInfo', 'getCompanyTypeOptions', 'getIndustryTypeOptions', 'getExhibitListAll']),
    // 查询企业名称
    research() {
      let param = {
        current: 1,
        isAsc: true,
        name: this.form.enNames,
        orderByField: "create_date",
        size: 5
      };
      this.visible = true;
      this.getListAllInfo(param).then(res => {
        this.enNames = res;
      });
    },
    // 给查询输入框赋值
    giveName(item) {
      this.form.enNames = item;
      this.visible = false;
    },
    // 清空表单信息
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    firstTabClick() { // 切换为pane2 禁用
      if (this.activeName === 'first') {
        this.paneDisabled = true;
      }
    },
    // 验证企业是否已经注册 内置fn
    confirmRep() {
      // let param = {
      //   "customQueryParams": [
      //     {
      //       "findType": "EQ",
      //       "joinType": "And",
      //       "name": "companyNameEn",
      //       "values": [
      //         this.form.enNames
      //       ]
      //     }
      //   ]
      // };
      this.getConfirmIsRepeatInfo(this.confirmRepParams).then(res => {
        if (res === "1") {
          this.$confirm('企业未注册，请填写注册信息', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.getAllCountryInfo().then(resS => {
              this.countries = resS;
            });
            this.getAllAgentsInfo().then(resT => {
              this.exhibitionAgents = resT;
            });
            this.activeName = "second";
            this.paneDisabled = false;
            this.registForm.companyNameEn = this.form.enNames;
          }).catch(() => {

          });
        } else if (res === "0") {
          this.$confirm('企业已注册，请登录', '提示', {
            confirmButtonText: '登陆',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let url = location.href;
            let loginUrl = process.env.SSO_BASE_URL;
            let IASID = process.env.IASID;
            parent.location.href = loginUrl + "/logout?type=0&IASID=" + IASID + "&ReturnUrl=" + encodeURI(url);
          }).catch(() => {

          });
        } else {
          this.$message.error('返回体有误');
        }
      }).catch(e => {
        this.$message.error('请求失败');
      });
    },
    confirmRepValidate(formName) { // 验证企业是否已经注册
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.confirmRep();
        } else {
          this.$message.error("请将表单填写完整");
        }
      });
    },
    // 注册提交
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let checkBox = document.getElementsByName("checkBox");
          if (checkBox[0].checked === true) {
            this.addInfo(this.registForm).then(res => {
              // if (res.flag === "1") {

              // }
              this.$message({
                message: '注册成功', type: 'success'
              });
              for (let key in this.registForm) { // 置空
                this.registForm[key] = '';
              }
              this.activeName = "first";
            }).catch(e => {
              this.$message.error(e.message);
            });
          } else {
            this.$message.error("请先阅读并同意《境外参展商隐私政策》");
          }
        } else {
          this.$message.error("请将表单填写完整");
        }
      });
    },
    // 取消提交
    cancelSubmit() {
      this.$message({
        message: '已取消注册', type: 'info'
      });
      for (let key in this.registForm) { // 置空
        this.registForm[key] = '';
      }
      this.activeName = "first";
    },
    // 隐藏用户条款勾选条件---methods
    handleCheckedItemChange(value) {
      let checkedCount = value.length;
      this.userCheckAll = checkedCount === this.userMsgArr.length;
    }
  }
};
</script>
