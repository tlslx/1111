<template>
  <el-form :ref="name" :model="form" :rules="rules" data-url="/api/basicData/billConfig/getSingleById"
    update-url="/api/basicData/billConfig/updateById" add-url="/api/basicData/billConfig/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col :span="12">
            <el-form-item label="对账银行：" prop="bankName" label-width="34%">
              <el-input v-model="form.bankName" :disabled="isView" placeholder="请输入对账银行名称"></el-input>
            </el-form-item>
          </el-form-col>
          <el-form-col :span="12">
            <el-form-item label="银行代码：" prop="bankCode" label-width="34%">
              <el-select v-model="form.bankCode" placeholder="请选择银行代码">
                <el-option
                  v-for="item in bankCodeOptions"
                  :key="item.value"
                  :label="item.label"
                  :disabled="isView"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-col>
        </el-row>

        <el-row>
          <el-form-col :span="12">
            <el-form-item label="本地ftp路径：" prop="localPath" label-width="34%">
              <el-input v-model="form.localPath" :disabled="isView" placeholder="请输入本地ftp路径"></el-input>
            </el-form-item>  
          </el-form-col>
          <el-form-col :span="12">
            <el-form-item label="文件获取方式：" prop="sourceType" label-width="34%">
              <el-select v-model="form.sourceType" placeholder="请选择文件获取方式">
                <el-option
                  v-for="item in sourceTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :disabled="isView"
                  :value="item.value">
                </el-option>
              </el-select>              
            </el-form-item>  
          </el-form-col>        
        </el-row>    

        <el-row>
          <el-form-col :span="12">
            <el-form-item label="ftp所在操作系统：" prop="ftpOs" label-width="34%">
              <el-select v-model="form.ftpOs" placeholder="请选择ftp所在操作系统">
                <el-option
                  v-for="item in ftpOsOptions"
                  :key="item.value"
                  :label="item.label"
                  :disabled="isView"
                  :value="item.value">
                </el-option>
              </el-select>              
            </el-form-item>  
          </el-form-col>  
          <el-form-col :span="12">
            <el-form-item label="ftp ip地址：" prop="ftpIp" label-width="34%">
              <el-input v-model="form.ftpIp" :disabled="isView" placeholder="请输入ftp ip地址"></el-input>
            </el-form-item>  
          </el-form-col>      
        </el-row>    

        <el-row>
          <el-form-col :span="12">
            <el-form-item label="ftp目录：" prop="ftpFilePath" label-width="34%">
              <el-input v-model="form.ftpFilePath" :disabled="isView" placeholder="请输入ftp目录"></el-input>
            </el-form-item>  
          </el-form-col>
          <el-form-col :span="12">
            <el-form-item label="ftp端口：" prop="ftpPort" label-width="34%">
              <el-input v-model="form.ftpPort" :disabled="isView" placeholder="请输入ftp端口"></el-input>
            </el-form-item>  
          </el-form-col>
        </el-row>   

        <el-row>
          <el-form-col :span="12">
            <el-form-item label="ftp用户名：" prop="ftpUserName" label-width="34%">
              <el-input v-model="form.ftpUserName" :disabled="isView" placeholder="请输入ftp用户名"></el-input>
            </el-form-item>  
          </el-form-col>
          <el-form-col :span="12">
            <el-form-item label="ftp密码：" prop="ftpPassword" label-width="34%">
              <el-input v-model="form.ftpPassword" :disabled="isView" placeholder="请输入ftp密码"></el-input>
            </el-form-item>  
          </el-form-col>
        </el-row>    

        <el-row>
          <el-form-col :span="12">
            <el-form-item label="文件名称：" prop="filename" label-width="34%">
              <el-input v-model="form.filename" :disabled="isView" placeholder="请输入文件名称"></el-input>
            </el-form-item>  
          </el-form-col>
          <el-form-col :span="12">
            <el-form-item label="读取开始行：" prop="startRow" label-width="34%">
              <el-input v-model.number="form.startRow" :disabled="isView" placeholder="请输入从第几行开始读取文件"></el-input>
            </el-form-item>  
          </el-form-col>
        </el-row>    

        <el-row>
          <el-form-col :span="12">
            <el-form-item label="分隔符：" prop="splitChar" label-width="34%">
              <el-input v-model="form.splitChar" :disabled="isView" placeholder="请输入分隔符"></el-input>
            </el-form-item>
          </el-form-col>
          <el-form-col :span="12">
            <el-form-item label="是否需要转义：" prop="isEscape" label-width="34%">
              <el-select v-model="form.isEscape" placeholder="请选择是否需要转义">
                <el-option
                  v-for="item in isEscapeOptions"
                  :key="item.value"
                  :label="item.label"
                  :disabled="isView"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-form-col>
        </el-row>

        <el-row>
          <el-form-col :span="12">
            <el-form-item label="金额单位：" prop="amountUnit" label-width="34%">
              <el-select v-model="form.amountUnit" placeholder="请选择金额单位">
                <el-option
                  v-for="item in amountUnitOptions"
                  :key="item.value"
                  :label="item.label"
                  :disabled="isView"
                  :value="item.value">
                </el-option>
              </el-select>            
            </el-form-item>
          </el-form-col>
          <el-form-col :span="12">
            <el-form-item label="对账日期：" prop="dateFormat" label-width="34%">
                <el-date-picker
                  v-model="form.dateFormat"
                  type="date"
                  :disabled="isView"
                  value-format="yyyy-MM-dd"
                  format="yyyy-MM-dd"
                  placeholder="请选择对账日期"
                ></el-date-picker>
            </el-form-item>
          </el-form-col>
        </el-row>

        <el-row>
          <el-form-col :span="12">
            <el-form-item label="偏移时间：" prop="dateAddday" label-width="34%">
              <el-input v-model.number="form.dateAddday" :disabled="isView" placeholder="请输入偏移时间"></el-input>
            </el-form-item>  
          </el-form-col>
          <el-form-col :span="12">
            <el-form-item label="扎帐时间：" prop="swiftTime" label-width="34%">
              <el-input v-model="form.swiftTime" :disabled="isView" placeholder="请输入扎帐时间"></el-input>
            </el-form-item>  
          </el-form-col>
        </el-row>  

        <el-row>
          <el-form-col :span="12">
            <el-form-item label="调度时间：" prop="timeSchedule" label-width="34%">
              <el-input v-model="form.timeSchedule" :disabled="isView" placeholder="请输入调度时间"></el-input>
            </el-form-item>  
          </el-form-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
import dialogPageBase from '@/components/framework/mixins/dialogPageBase';
export default {
  mixins: [dialogPageBase],
  data () {
    return {
      activeTab: 'baseInfo',
      form: { amountUnit: '', bankCode: '', bankName: '', dateAddday: '', dateFormat: '', filename: '', ftpFilePath: '', ftpIp: '', ftpOs: '', ftpPassword: '', ftpPort: '', ftpUserName: '', id: '', isEscape: '', localPath: '', sourceType: '', splitChar: '', startRow: '', swiftTime: '', timeSchedule: '' },
      bankCodeOptions: [
        { value: "ccb", label: "ccb" },
        { value: "icbc", label: "icbc" }
      ],
      sourceTypeOptions: [
        { value: 1, label: "在本地文件中获取" },
        { value: 2, label: "去ftp目录下读取" }
      ],
      isEscapeOptions: [{ value: 1, label: "是" }, { value: 2, label: "否" }],
      amountUnitOptions: [{ value: "1", label: "元" }, { value: "2", label: "分" }],
      ftpOsOptions: [{ value: "1", label: "linux" }, { value: "2", label: "windows" }],
      rules: {
        bankName: [
          { required: true, message: '请输入对账银行名称', trigger: 'blur' },
          { max: 50, message: "不能超过 50 个字符", trigger: "blur" }
        ],
        bankCode: [
          { required: true, message: '请选择银行代码', trigger: 'blur' }
        ],
        localPath: [
          { max: 200, message: "不能超过 200 个字符", trigger: "blur" }
        ],
        sourceType: [
          { required: true, message: '请选择文件获取方式', trigger: 'blur' }
        ],
        ftpOs: [
          { required: true, message: '请选择FTP所在操作系统', trigger: 'blur' }
        ],
        ftpIp: [
          { max: 30, message: "不能超过 30 个字符", trigger: "blur" }
        ],
        ftpFilePath: [
          { max: 30, message: "不能超过 30 个字符", trigger: "blur" }
        ],
        ftpPort: [
          { max: 30, message: "不能超过 30 个字符", trigger: "blur" }
        ],
        ftpUserName: [
          { max: 20, message: "不能超过 20 个字符", trigger: "blur" }
        ],
        ftpPassword: [
          { max: 20, message: "不能超过 20 个字符", trigger: "blur" }
        ],
        filename: [
          { max: 30, message: "不能超过 30 个字符", trigger: "blur" }
        ],
        startRow: [
          { type: 'number', message: '读取开始行必须为数字值' }
        ],
        splitChar: [
          { max: 2, message: "不能超过 2 个字符", trigger: "blur" }
        ],
        isEscape: [
          { required: true, message: '请选择是否需要转义', trigger: 'blur' }
        ],
        amountUnit: [
          { required: true, message: '请选择金额单位', trigger: 'blur' }
        ],
        dateFormat: [
          { required: true, message: '请选择对账日期', trigger: 'blur' }
        ],
        dateAddday: [
          { type: 'number', message: '读取开始行必须为数字值' }
        ],
        swiftTime: [
          { max: 10, message: "不能超过 10 个字符", trigger: "blur" }
        ],
        timeSchedule: [
          { max: 20, message: "不能超过 20 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    pageLoad () {
    }
  }
};
</script>
