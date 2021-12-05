<template>
  <!-- <el-tabs v-model="activeName"> -->
    <!-- <el-tab-pane label="新增展品" name="first"> -->
      <div>
        <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="demo-ruleForm">
          <el-form-item label="展品类别：" prop="name">
            <el-select v-model="ruleForm.region" prop="region" placeholder="请选择" style="width: 150px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="ruleForm.region" prop="region" placeholder="请选择" style="width: 150px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
            <el-select v-model="ruleForm.region" prop="region" placeholder="请选择" style="width: 150px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展品所在展位号：">
            <el-select v-model="ruleForm.region" prop="region" placeholder="请选择" style="width: 400px;">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="展品名称（中文）：" prop="type">
            <el-input style="width: 400px;" placeholder="请输入展品中文名称"></el-input>
          </el-form-item>
          <el-form-item label="展品名称（英文）：" prop="type">
            <el-input style="width: 400px;" placeholder="请输入展品英文名称"></el-input>
          </el-form-item>
          <el-form-item label="展品关键字（中文）：" prop="type">
            <el-input style="width: 150px;" placeholder="请输入"></el-input>
            <el-input style="width: 150px;" placeholder="请输入"></el-input>
            <el-input style="width: 150px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="展品关键字（英文）：" prop="type">
            <el-input style="width: 150px;" placeholder="请输入"></el-input>
            <el-input style="width: 150px;" placeholder="请输入"></el-input>
            <el-input style="width: 150px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="展品型号（中文）：" prop="type">
            <el-input style="width: 400px;" placeholder="请输入展品中文型号"></el-input>
          </el-form-item>
          <el-form-item label="展品型号（英文）：" prop="type">
            <el-input style="width: 400px;" placeholder="请输入展品英文型号"></el-input>
          </el-form-item>
          <el-form-item label="展品材质（中文）：" prop="type">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="展品材质（英文）：" prop="type">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="展品尺寸（中文）：" prop="type">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
            <span style="color: #f00;"><sup>示例：80*20*90mm</sup></span>
          </el-form-item>
          <el-form-item label="展品特征：">
            <el-checkbox v-model="checked">本公司主打产品</el-checkbox>
            <el-checkbox v-model="checked">本公司新产品（近一年内研发产品）</el-checkbox>
            <br>
            <el-checkbox v-model="checked">智能产品</el-checkbox>
            <el-checkbox v-model="checked">绿色环保</el-checkbox>
            <el-checkbox v-model="checked">自主知识产权</el-checkbox>
          </el-form-item>
          <el-form-item label="特征描述（中文）：" prop="desc">
            <el-input style="width: 400px;" type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="特征描述（英文）：" prop="desc">
            <el-input style="width: 400px;" type="textarea" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="展品图片：" prop="resource">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </el-form-item>
          <el-form-item label="是否对图片保密：">
            <el-radio v-model="radio" label="1">是</el-radio>
          </el-form-item>
          <el-form-item label="是否愿意参加2019年CF奖评选：" prop="desc">
            <el-radio v-model="radio" label="11">是</el-radio>
            <el-radio v-model="radio" label="22">否</el-radio>
          </el-form-item>
          <el-form-item label="是否为刀具展品：">
            <el-radio v-model="radio" label="11">是 <span style="text-decoration: underline; color: #f00;">广交会刀具展样品报备登记表</span></el-radio>
          </el-form-item>
          <el-form-item label="规格（中文）：" prop="desc">
            <el-input style="width: 400px;" placeholder="请输入" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="规格（英文）：" prop="desc">
            <el-input style="width: 400px;" placeholder="请输入" v-model="ruleForm.desc"></el-input>
          </el-form-item>
          <el-form-item label="数量：" prop="desc">
            <el-select v-model="ruleForm.region" prop="region" placeholder="请选择" style="width: 400px;">
              <el-option label="区域一" value="shanghai">10</el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <p style="color: #f00;"><span style="font-size: 20px;">></span>填写更多选项可获得排名靠前</p>
          </el-form-item>
          <el-form-item label="本项展现的品牌（中文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="本项展现的品牌（英文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产地（中文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="产地（英文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="展品颜色（中文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
            <span style="color: #f00;">固定单一颜色</span>
          </el-form-item>
          <el-form-item label="展品颜色（英文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
            <span style="color: #f00;">固定单一颜色</span>
          </el-form-item>
          <el-form-item label="展品颜色（中文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
            <span style="color: #f00;">多色可选</span>
          </el-form-item>
          <el-form-item label="展品颜色（英文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
            <span style="color: #f00;">多色可选</span>
          </el-form-item>
          <el-form-item label="展品颜色（中文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
            <span style="color: #f00;">可定制颜色</span>
          </el-form-item>
          <el-form-item label="展品颜色（英文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
            <span style="color: #f00;">可定制颜色</span>
          </el-form-item>
          <el-form-item label="包装（中文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="包装（英文）：">
            <el-input style="width: 400px;" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="本项展品的行业认证：">
            <el-checkbox v-model="checked">CCC</el-checkbox>
            <el-checkbox v-model="checked">CB</el-checkbox>
            <el-checkbox v-model="checked">CCEE</el-checkbox>
            <el-checkbox v-model="checked">CCL</el-checkbox>
            <el-checkbox v-model="checked">CE</el-checkbox>
            <el-checkbox v-model="checked">CECC</el-checkbox>
            <el-checkbox v-model="checked">CNAS</el-checkbox>
            <br>
            <el-checkbox v-model="checked">COS</el-checkbox>
            <el-checkbox v-model="checked">CQC</el-checkbox>
            <el-checkbox v-model="checked">CSA</el-checkbox>
            <el-checkbox v-model="checked">ENC</el-checkbox>
            <el-checkbox v-model="checked">ETL</el-checkbox>
            <el-checkbox v-model="checked">FCC</el-checkbox>
            <el-checkbox v-model="checked">FDA</el-checkbox>
            <br>
            <el-checkbox v-model="checked">GS</el-checkbox>
            <el-checkbox v-model="checked">HALAL</el-checkbox>
            <el-checkbox v-model="checked">ADMF</el-checkbox>
            <el-checkbox v-model="checked">KCSHER</el-checkbox>
            <el-checkbox v-model="checked">MREII</el-checkbox>
            <el-checkbox v-model="checked">PCT</el-checkbox>
            <el-checkbox v-model="checked">PMD</el-checkbox>
            <br>
            <el-checkbox v-model="checked">PSE</el-checkbox>
            <el-checkbox v-model="checked">AA</el-checkbox>
            <el-checkbox v-model="checked">SASO</el-checkbox>
            <el-checkbox v-model="checked">TGR</el-checkbox>
            <el-checkbox v-model="checked">TUT</el-checkbox>
            <el-checkbox v-model="checked">TCO</el-checkbox>
            <el-checkbox v-model="checked">UL</el-checkbox>
            <br>
            <el-checkbox v-model="checked">UPC</el-checkbox>
            <el-checkbox v-model="checked">USP</el-checkbox>
            <el-checkbox v-model="checked">UATERMARK</el-checkbox>
            <el-checkbox v-model="checked">VHO</el-checkbox>
            <el-checkbox v-model="checked">PL</el-checkbox>
            <el-checkbox v-model="checked">其他（请填写）</el-checkbox>
          </el-form-item>
          <el-form-item label="付款方式：">
            <el-checkbox v-model="checked">L/C</el-checkbox>
            <el-checkbox v-model="checked">I/T</el-checkbox>
            <el-checkbox v-model="checked">N/T</el-checkbox>
            <el-checkbox v-model="checked">D/T</el-checkbox>
            <el-checkbox v-model="checked">D/A</el-checkbox>
            <el-checkbox v-model="checked">OTHR</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="submitForm">确定</el-button>
            <el-button @click="resetForm">取消</el-button>
          </el-form-item>
        </el-form>
        <!-- 弹出框 -->
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <p style="text-align: center;">您的申请已提交成功！</p>
          <p slot="footer" style="text-align: center;">
            <el-button type="primary" @click="onSure">确 认</el-button>
            <el-button @click="dialogVisible = false">取 消</el-button>
          </p>
        </el-dialog>
      </div>
    <!-- </el-tab-pane> -->
  <!-- </el-tabs> -->
</template>
<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      checked: false,
      value5: "",
      fileList: [{ name: '', url: '' }],
      radio: "1",
      ruleForm: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
        type: [
          { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请填写活动形式', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    onSure() {
      this.dialogVisible = false;
      this.$emit('onTrue', true);
    },
    submitForm() {
      this.dialogVisible = true;
    },
    resetForm() {
      this.$emit('onCancel', true);
    },
    add() {
    },
    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
    }
  }
};
</script>
<style>
/* a{
  text-decoration: underline;
} */
</style>


