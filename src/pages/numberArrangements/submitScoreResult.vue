<template>
  <el-tabs v-model="activeName" :inline="true">
    <el-tab-pane label="提交企业评分结果" name="first">
      <el-form :model="queryForm" size="small" :inline="true">
        <el-form-item label="企业名称">
          <el-select v-model="queryForm.companyCode" clearable>
            <el-option v-for="(item, key) in companyOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交易团">
          <el-select v-model="queryForm.dealClusterId" clearable>
            <el-option v-for="(item, index) in delegationOpts" :key="index" :value="item.deptCode" :label="item.deptName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-input placeholder="请输入" v-model="queryForm.cantonFairCode" clearable></el-input>
        </el-form-item>
        <el-form-item label="申请展区">
          <el-select v-model="queryForm.exhibitionArea" clearable>
            <el-option v-for="(item, index) in exhibitionAreaOpts" :key="index" :value="item.exhibitionAreaCode" :label="item.exhibitionAreaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否达标">
          <el-select v-model="queryForm.isStandard" clearable>
            <el-option v-for="(item, key) in normalBooleanOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否使用母子公司资质" label-width="160px">
          <el-select v-model="queryForm.isMotherChildAptitude" clearable>
            <el-option v-for="(item, key) in normalBooleanOpts" :key="key" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryBtn">
          <el-button type="primary" size="medium" @click="handleQuery">查询</el-button>
          <!-- <el-button type="primary" size="medium">上传</el-button> -->
          <el-upload
            class="floatlaf"
            action=""
            :limit="1"
            :http-request="uploadFileMethod">
            <el-button class="formStyle" type="primary" size="medium">上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <el-table class="review-info-table" :data="scoreResultList" v-loading="loading" border>
        <el-table-column align="center" label="企业名称" prop="companyName"></el-table-column>
        <el-table-column align="center" label="广交会编码" prop="cantonFairCode"></el-table-column>
        <el-table-column align="center" label="交易团" prop="dealClusterName"></el-table-column>
        <el-table-column align="center" label="申请展区" prop="exhibitionAreaName"></el-table-column>
        <el-table-column align="center" label="申请品牌展位数" prop="applyBoothNumber"></el-table-column>
        <el-table-column align="center" label="总分" prop="coceralTotalGrade"></el-table-column>
        <el-table-column align="center" label="是否符合品牌展位申请条件" prop="boothApplyCondition">
          <template slot-scope="scope">
            <div v-if="scope.row.edit">
              <el-form :model="formEdit" ref="boothApplyCondition" :rules="rules">
                <el-form-item class="item-Num" prop="boothApplyCondition">
                  <el-select v-model="formEdit.boothApplyCondition">
                    <el-option v-for="(item, key) in normalBooleanOpts" :key="key" :value="item.value" :label="item.label"></el-option>
                  </el-select>
                </el-form-item>
              </el-form>
            </div>
            <span v-else>{{ scope.row.boothApplyCondition === '0' ? '否' : (scope.row.boothApplyCondition === '1' ? '是' : '') }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="出口额">
          <el-table-column align="center" label="占所属大类出口额比例(%)" prop="exportRatio"></el-table-column>
          <el-table-column align="center" label="商协会评分" prop="coceralExportScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="coceralExportScore" :rules="rules">
                  <el-form-item class="item-Num" prop="coceralExportScore">
                    <el-input v-model="formEdit.coceralExportScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.coceralExportScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="行业自律">
          <el-table-column align="center" label="评分" prop="selfDisciplineScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="selfDisciplineScore" :rules="rules">
                  <el-form-item class="item-Num" prop="selfDisciplineScore">
                    <el-input v-model="formEdit.selfDisciplineScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.selfDisciplineScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="品牌建设">
          <el-table-column align="center" label="是否进入外贸转型升级基地" prop="isUpgrade">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="isUpgrade" :rules="rules">
                  <el-form-item class="item-Num" prop="isUpgrade">
                    <el-select v-model="formEdit.isUpgrade">
                      <el-option v-for="(item, key) in normalBooleanOpts" :key="key" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.isUpgrade === 0 ? '否' : (scope.row.isUpgrade === 1 ? '是' : '') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="建设国际营销服务体系数量" prop="systemNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="systemNumber" :rules="rules">
                  <el-form-item class="item-Num" prop="systemNumber">
                    <el-input v-model="formEdit.systemNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.systemNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="是否参加境外品牌展" prop="isJoinOutside">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="isJoinOutside" :rules="rules">
                  <el-form-item class="item-Num" prop="isJoinOutside">
                    <el-select v-model="formEdit.isJoinOutside">
                      <el-option v-for="(item, key) in normalBooleanOpts" :key="key" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.isJoinOutside === 0 ? '否' : (scope.row.isJoinOutside === 1 ? '是' : '') }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="得分" prop="brandBuildScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="brandBuildScore" :rules="rules">
                  <el-form-item class="item-Num" prop="brandBuildScore">
                    <el-input v-model="formEdit.brandBuildScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.brandBuildScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="专利与版权">
          <el-table-column align="center" label="发明专利数" prop="inventPatent">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="inventPatent" :rules="rules">
                  <el-form-item class="item-Num" prop="inventPatent">
                    <el-input v-model="formEdit.inventPatent" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.inventPatent }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="实用新型专利数" prop="practicalPatent">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="practicalPatent" :rules="rules">
                  <el-form-item class="item-Num" prop="practicalPatent">
                    <el-input v-model="formEdit.practicalPatent" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.practicalPatent }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="外观专利数" prop="appearancePatent">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="appearancePatent" :rules="rules">
                  <el-form-item class="item-Num" prop="appearancePatent">
                    <el-input v-model="formEdit.appearancePatent" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.appearancePatent }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="版权数" prop="copyrightNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="copyrightNumber" :rules="rules">
                  <el-form-item class="item-Num" prop="copyrightNumber">
                    <el-input v-model="formEdit.copyrightNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.copyrightNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="得分" prop="patentsScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="patentsScore" :rules="rules">
                  <el-form-item class="item-Num" prop="patentsScore">
                    <el-input v-model="formEdit.patentsScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.patentsScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="国家级高新技术企业">
          <el-table-column align="center" label="称号数" prop="newHighNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="newHighNumber" :rules="rules">
                  <el-form-item class="item-Num" prop="newHighNumber">
                    <el-input v-model="formEdit.newHighNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.newHighNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="得分" prop="newHighScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="newHighScore" :rules="rules">
                  <el-form-item class="item-Num" prop="newHighScore">
                    <el-input v-model="formEdit.newHighScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.newHighScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="国家或行业标准">
          <el-table-column align="center" label="数量" prop="standardNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="standardNumber" :rules="rules">
                  <el-form-item class="item-Num" prop="standardNumber">
                    <el-input v-model="formEdit.standardNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.standardNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="得分" prop="standardScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="standardScore" :rules="rules">
                  <el-form-item class="item-Num" prop="standardScore">
                    <el-input v-model="formEdit.standardScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.standardScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="质量/环境管理体系认证">
          <el-table-column align="center" label="数量" prop="qualityNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="qualityNumber" :rules="rules">
                  <el-form-item class="item-Num" prop="qualityNumber">
                    <el-input v-model="formEdit.qualityNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.qualityNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="得分" prop="qualityScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="qualityScore" :rules="rules">
                  <el-form-item class="item-Num" prop="qualityScore">
                    <el-input v-model="formEdit.qualityScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.qualityScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="面向企业的行业认证">
          <el-table-column align="center" label="数量" prop="industryNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="industryNumber" :rules="rules">
                  <el-form-item class="item-Num" prop="industryNumber">
                    <el-input v-model="formEdit.industryNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.industryNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="得分" prop="industryScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="industryScore" :rules="rules">
                  <el-form-item class="item-Num" prop="industryScore">
                    <el-input v-model="formEdit.industryScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.industryScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="面向产品/生产线的行业认证">
          <el-table-column align="center" label="数量" prop="productionNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="productionNumber" :rules="rules">
                  <el-form-item class="item-Num" prop="productionNumber">
                    <el-input v-model="formEdit.productionNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.productionNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="得分" prop="productionScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="productionScore" :rules="rules">
                  <el-form-item class="item-Num" prop="productionScore">
                    <el-input v-model="formEdit.productionScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.productionScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="境内商标">
          <el-table-column align="center" label="数量" prop="territoryNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="territoryNumber" :rules="rules">
                  <el-form-item class="item-Num" prop="territoryNumber">
                    <el-input v-model="formEdit.territoryNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.territoryNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="得分" prop="territoryScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="territoryScore" :rules="rules">
                  <el-form-item class="item-Num" prop="territoryScore">
                    <el-input v-model="formEdit.territoryScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.territoryScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="境外商标">
          <el-table-column align="center" label="数量" prop="beyondNumber">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="beyondNumber" :rules="rules">
                  <el-form-item class="item-Num" prop="beyondNumber">
                    <el-input v-model="formEdit.beyondNumber" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.beyondNumber }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="得分" prop="beyondScore">
            <template slot-scope="scope">
              <div v-if="scope.row.edit">
                <el-form :model="formEdit" ref="beyondScore" :rules="rules">
                  <el-form-item class="item-Num" prop="beyondScore">
                    <el-input v-model="formEdit.beyondScore" maxlength="2"></el-input>
                  </el-form-item>
                </el-form>
              </div>
              <span v-else>{{ scope.row.beyondScore }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" label="广交会表现" prop="telephone"></el-table-column>
        <el-table-column align="center" label="是否使用母子公司资质" prop="isMotherChildAptitude">
          <template slot-scope="scope">
            {{ scope.row.isMotherChildAptitude === '0' ? '否' : (scope.row.isMotherChildAptitude === '1' ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="是否达标" prop="isStandard">
          <template slot-scope="scope">
            {{ scope.row.isStandard === 0 ? '否' : (scope.row.isStandard === 1 ? '是' : '') }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" fixed="right" width="120px">
          <template slot-scope="scope">
            <el-button type="text" @click="handleEditScore(scope.$index, scope.row)">编辑</el-button>
            <el-button type="text" @click="handleSaveScore(scope.$index, ['boothApplyCondition', 'coceralExportScore', 'selfDisciplineScore', 
            'isUpgrade', 'systemNumber', 'isJoinOutside', 'brandBuildScore', 'inventPatent', 'practicalPatent', 'appearancePatent', 
            'copyrightNumber', 'patentsScore', 'newHighNumber', 'newHighScore', 'standardNumber', 'standardScore', 'qualityNumber', 'qualityScore', 
            'industryNumber', 'industryScore', 'productionNumber', 'productionScore', 'territoryNumber', 'territoryScore', 'beyondNumber', 
            'beyondScore'])" :disabled="!scope.row.edit">保存</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button class="utils-button" type="primary" size="medium" @click="handDownload">下载模板</el-button>
      <el-form class="pagination-container" :inline="true">
        <el-form-item>
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="evaluationResultData.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize">
          </el-pagination>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import listPageBase from "@/components/framework/mixins/listPageBase";
export default {
  mixins: [listPageBase],
  data() {
    var needInt = (rule, value, callback) => {
      const reg = /[^\d\$]/g;
      if (value === '') {
        return callback(new Error('请输入>=0的整数'));
      } else if (reg.test(value)) {
        return callback(new Error('请输入>=0的整数'));
      } else {
        return callback();
      }
    };
    return {
      activeName: 'first',
      loading: '',
      lastIndex: '',
      scoreResultList: [],
      exhibitionAreaOpts: [],
      normalBooleanOpts: [{ value: '0', label: '否' }, { value: '1', label: '是' }],
      companyOpts: [],
      delegationOpts: [],
      queryForm: {
        exhibitionArea: '', // 展区id
        coceralId: this.$store.getters.userInfo.org.deptCode,
        cantonFairCode: '', // 广交会编码
        companyCode: '', // 企业id
        isStandard: '', // 是否达标
        isMotherChildAptitude: '', // 是否使用母子公司资质
        dealClusterId: '' // 交易团id
      },
      // 编辑时的参数
      formEdit: {
        brandApplyId: '', // 申请id
        boothApplyCondition: '', // 是否符合品牌展位申请条件
        coceralExportScore: 0, // 出口额-商协会评分
        selfDisciplineScore: 0, // 行业自律-评分
        isUpgrade: '', // 品牌建设-是否进入外贸转型升级基地
        systemNumber: 0, // -建设国际营销服务体系数量
        isJoinOutside: '', // -是否参加境外品牌展
        brandBuildScore: 0, // -得分
        inventPatent: 0, // 专利与版权-发明专利数
        practicalPatent: 0, // -实用新型专利数
        appearancePatent: 0, // -外观专利数
        copyrightNumber: 0, // -版权数
        patentsScore: 0, // -得分
        newHighNumber: 0, // 国家级高新技术企业-称号数
        newHighScore: 0, // -得分
        standardNumber: 0, // 国家或行业标准-数量
        standardScore: 0, // -得分
        qualityNumber: 0, // 质量/环境管理体系认证-数量
        qualityScore: 0, // -得分
        industryNumber: 0, // 面向企业的行业认证-数量
        industryScore: 0, // -得分
        productionNumber: 0, // 面向产品/生产线的行业认证-数量
        productionScore: 0, // -得分
        territoryNumber: 0, // 境内商标-数量
        territoryScore: 0, // -得分
        beyondNumber: 0, // 境外商标-数量
        beyondScore: 0 // -得分
      },
      rules: {
        boothApplyCondition: [{ required: true, trigger: 'change' }],
        coceralExportScore: [{ required: true, validator: needInt, trigger: 'blur' }],
        selfDisciplineScore: [{ required: true, validator: needInt, trigger: 'blur' }],
        isUpgrade: [{ required: true, trigger: 'change' }],
        systemNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        isJoinOutside: [{ required: true, trigger: 'change' }],
        brandBuildScore: [{ required: true, validator: needInt, trigger: 'blur' }],
        inventPatent: [{ required: true, validator: needInt, trigger: 'blur' }],
        practicalPatent: [{ required: true, validator: needInt, trigger: 'blur' }],
        appearancePatent: [{ required: true, validator: needInt, trigger: 'blur' }],
        copyrightNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        patentsScore: [{ required: true, validator: needInt, trigger: 'blur' }],
        newHighNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        newHighScore: [{ required: true, validator: needInt, trigger: 'blur' }],
        standardNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        standardScore: [{ required: true, validator: needInt, trigger: 'blur' }],
        qualityNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        qualityScore: [{ required: true, validator: needInt, trigger: 'blur' }],
        industryNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        industryScore: [{ required: true, validator: needInt, trigger: 'blur' }],
        productionNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        productionScore: [{ required: true, validator: needInt, trigger: 'blur' }],
        territoryNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        territoryScore: [{ required: true, validator: needInt, trigger: 'blur' }],
        beyondNumber: [{ required: true, validator: needInt, trigger: 'blur' }],
        beyondScore: [{ required: true, validator: needInt, trigger: 'blur' }]
      },
      pageInfo: { currentPage: 1, pageSize: 10 }
    };
  },
  computed: {
    ...mapGetters('checkRecommendCompany', ['evaluationResultData']),
    formQuery() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea, 
        coceralId: this.queryForm.coceralId,
        cantonFairCode: this.queryForm.cantonFairCode,
        companyCode: this.queryForm.companyCode, 
        dealClusterId: this.queryForm.dealClusterId,
        isStandard: this.queryForm.isStandard,
        isMotherChildAptitude: this.queryForm.isMotherChildAptitude,
        current: this.pageInfo.currentPage,
        size: this.pageInfo.pageSize
      };
    },
    uploadScore() {
      return {
        brandApplyId: this.formEdit.brandApplyId, // 申请id
        boothApplyCondition: this.formEdit.boothApplyCondition, // 是否符合品牌展位申请条件
        coceralExportScore: this.formEdit.coceralExportScore - 0, // 出口额-商协会评分
        selfDisciplineScore: this.formEdit.selfDisciplineScore - 0, // 行业自律-评分
        isUpgrade: this.formEdit.isUpgrade, // 品牌建设-是否进入外贸转型升级基地
        systemNumber: this.formEdit.systemNumber - 0, // -建设国际营销服务体系数量
        isJoinOutside: this.formEdit.isJoinOutside, // -是否参加境外品牌展
        brandBuildScore: this.formEdit.brandBuildScore - 0, // -得分
        inventPatent: this.formEdit.inventPatent - 0, // 专利与版权-发明专利数
        practicalPatent: this.formEdit.practicalPatent - 0, // -实用新型专利数
        appearancePatent: this.formEdit.appearancePatent - 0, // -外观专利数
        copyrightNumber: this.formEdit.copyrightNumber - 0, // -版权数
        patentsScore: this.formEdit.patentsScore - 0, // -得分
        newHighNumber: this.formEdit.newHighNumber - 0, // 国家级高新技术企业-称号数
        newHighScore: this.formEdit.newHighScore - 0, // -得分
        standardNumber: this.formEdit.standardNumber - 0, // 国家或行业标准-数量
        standardScore: this.formEdit.standardScore - 0, // -得分
        qualityNumber: this.formEdit.qualityNumber - 0, // 质量/环境管理体系认证-数量
        qualityScore: this.formEdit.qualityScore - 0, // -得分
        industryNumber: this.formEdit.industryNumber - 0, // 面向企业的行业认证-数量
        industryScore: this.formEdit.industryScore - 0, // -得分
        productionNumber: this.formEdit.productionNumber - 0, // 面向产品/生产线的行业认证-数量
        productionScore: this.formEdit.productionScore - 0, // -得分
        territoryNumber: this.formEdit.territoryNumber - 0, // 境内商标-数量
        territoryScore: this.formEdit.territoryScore - 0, // -得分
        beyondNumber: this.formEdit.beyondNumber - 0, // 境外商标-数量
        beyondScore: this.formEdit.beyondScore - 0 // -得分
      };
    }
  },
  created() {
    // 展区
    this.getexhibitionArea().then(res => {
      this.exhibitionAreaOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    // 交易团
    this.getdelegationDepartment().then(res => {
      this.delegationOpts = JSON.parse(JSON.stringify(res));
    }).catch(e => {});
    this.loading = true;
    this.getSubmitEvaluationResultQuery().then(res => {
      this.companyOpts = res.companyOpts;
      this.createdQuery();
    }).catch(e => {
      this.loading = false;
    });
  },
  methods: {
    ...mapActions('checkRecommendCompany', ['getSubmitEvaluationResultQuery', 'getSubmitEvaluationResult', 'postSubmitScoreResult',
      "uploadconfirmCompanyResult" // 上传
    ]),
    ...mapActions('nainformation', ['getexhibitionArea', 'getdelegationDepartment']),
    // 编辑参数赋值封装
    editData(index, row) {
      this.formEdit = {
        brandApplyId: row.brandApplyId, // 申请id
        boothApplyCondition: row.boothApplyCondition ? row.boothApplyCondition : '0', // 是否符合品牌展位申请条件
        coceralExportScore: row.coceralExportScore ? row.coceralExportScore - 0 : 0, // 出口额-商协会评分
        selfDisciplineScore: row.selfDisciplineScore ? row.selfDisciplineScore - 0 : 0, // 行业自律-评分
        isUpgrade: row.isUpgrade ? row.isUpgrade : '0', // 品牌建设-是否进入外贸转型升级基地
        systemNumber: row.systemNumber ? row.systemNumber - 0 : 0, // -建设国际营销服务体系数量
        isJoinOutside: row.isJoinOutside ? row.isJoinOutside : '0', // -是否参加境外品牌展
        brandBuildScore: row.brandBuildScore ? row.brandBuildScore - 0 : 0, // -得分
        inventPatent: row.inventPatent ? row.inventPatent - 0 : 0, // 专利与版权-发明专利数
        practicalPatent: row.practicalPatent ? row.practicalPatent - 0 : 0, // -实用新型专利数
        appearancePatent: row.appearancePatent ? row.appearancePatent - 0 : 0, // -外观专利数
        copyrightNumber: row.copyrightNumber ? row.copyrightNumber - 0 : 0, // -版权数
        patentsScore: row.patentsScore ? row.patentsScore - 0 : 0, // -得分
        newHighNumber: row.newHighNumber ? row.newHighNumber - 0 : 0, // 国家级高新技术企业-称号数
        newHighScore: row.newHighScore ? row.newHighScore - 0 : 0, // -得分
        standardNumber: row.standardNumber ? row.standardNumber - 0 : 0, // 国家或行业标准-数量
        standardScore: row.standardScore ? row.standardScore - 0 : 0, // -得分
        qualityNumber: row.qualityNumber ? row.qualityNumber - 0 : 0, // 质量/环境管理体系认证-数量
        qualityScore: row.qualityScore ? row.qualityScore - 0 : 0, // -得分
        industryNumber: row.industryNumber ? row.industryNumber - 0 : 0, // 面向企业的行业认证-数量
        industryScore: row.industryScore ? row.industryScore - 0 : 0, // -得分
        productionNumber: row.productionNumber ? row.productionNumber - 0 : 0, // 面向产品/生产线的行业认证-数量
        productionScore: row.productionScore ? row.productionScore - 0 : 0, // -得分
        territoryNumber: row.territoryNumber ? row.territoryNumber - 0 : 0, // 境内商标-数量
        territoryScore: row.territoryScore ? row.territoryScore - 0 : 0, // -得分
        beyondNumber: row.beyondNumber ? row.beyondNumber - 0 : 0, // 境外商标-数量
        beyondScore: row.beyondScore ? row.beyondScore - 0 : 0 // -得分
      };
      this.scoreResultList[index]['edit'] = true;
      this.lastIndex = index;
    },
    // 评分编辑
    handleEditScore(index, row) {
      if (this.lastIndex === '' || index === this.lastIndex) {
        this.editData(index, row);
      } else if (index !== this.lastIndex) {
        this.$confirm('是否放弃保存此次打分？', '注意', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.scoreResultList.length; i++) {
            this.scoreResultList[i]['edit'] = false;
          }
          this.editData(index, row);
        }).catch(() => {
          this.$message.info('已取消此操作!');
        });
      }
    },
    // 评分保存
    handleSaveScore(index, formNameList) {
      let validArr = [];
      let flag = '';
      for (let i = 0; i < formNameList.length; i++) {
        this.$refs[formNameList[i]].validate(valid => {
          validArr.push(valid);
        });
      }
      for (let f = 0; f < validArr.length; f++) {
        if (validArr[f]) {
          flag = true;
        } else {
          flag = false;
          break;
        }
      }
      if (flag) {
        this.loading = true;
        this.postSubmitScoreResult(this.uploadScore).then(res => {
          this.scoreResultList[index]['edit'] = false; 
          this.$message.success('保存成功');
          this.createdQuery();
        }).catch(e => {
          this.loading = false;
        });
      } else {
        this.$message.error('请确认打分正确');
      }
    },
    // 查询
    handleQuery() {
      this.pageInfo.currentPage = 1;
      this.createdQuery();
    },
    // 导入（上传）
    uploadFileMethod(param) {
      let fileObject = param.file;
      let formData = new FormData();
      formData.append("file", fileObject);
      this.uploadconfirmCompanyResult(formData).then(res => {
        this.$message({
          type: "success",
          message: "导入成功"
        });
      }).catch(e => {});
    },
    // 下载
    handDownload() {
      // // // // let url = "exhibitionArea=" + this.queryForm.exhibitionArea + "&boothType=" + this.queryForm.boothType + "&exhibitionPeriod=" + this.queryForm.exhibitionPeriod + "&exhibitionAreaCode=" + this.queryForm.exhibitionAreaCode;
      // url = url.replace(/undefined/g, "");
      window.open(process.env.API_NA_URL + "/api/businessAssociation/confirmCompanyResult/download?token=" + localStorage.getItem("USER_TOKEN"), "_parent");
    },
    // 操作页面
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val;
      this.createdQuery();
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1;
      this.pageInfo.pageSize = val;
      this.createdQuery();
    },
    //查询封装
    createdQuery() {
      this.loading = true;
      this.getSubmitEvaluationResult(this.formQuery).then(res => {
        this.loading = false;
        let reviewInfoData = JSON.parse(JSON.stringify(res.records));
        for (let i = 0; i < reviewInfoData.length; i++) {
          reviewInfoData[i].edit = false;
        }
        this.scoreResultList = reviewInfoData;
        this.lastIndex = '';
      }).catch(e => {
        this.loading = false;
      });
    }
  }
};
</script>
<style scoped>
.queryBtn, .pagination-container{
  float: right;
}
.utils-button, .pagination-container{
  margin-top: 20px;
} 
.item-Num  >>> .el-form-item__content{
  margin-left: 0 !important;
}
.el-table >>> .cell{
  overflow: visible !important;
}
.floatlaf {
  margin: 0 10px;
  float: left;
}
</style>
