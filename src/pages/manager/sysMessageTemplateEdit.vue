<template>
  <div>
    <el-dialog title="模板语言选择" :visible.sync="selectLanguageDialogVisible" width="525px" :append-to-body="true">
      <span>
        <el-transfer v-model="templateLanguages" :props="{key: 'value', label: 'text'}" :data="languageOptions" :titles="['语种', '模板语种']"
          @change="onSelctLanguage" style="height:300px">
        </el-transfer>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="selectLanguageDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="selectLanguageDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-form :ref="name" :model="form" :sub-data="subData" 
      data-url="/api/sysMessageTemplate/getSingleById" 
      update-url="/api/sysMessageTemplate/updateById"
      add-url="/api/sysMessageTemplate/add" 
      :beforeSubmit="onBeforeSumbit">
      <el-row>
        <el-form-col label="模板名称：" prop="templateName" :span="10">
          <el-input v-model="form.templateName" :disabled="isView"></el-input>
        </el-form-col>
        <el-form-col label="模板编码：" prop="templateCode" :span="8">
          <el-input v-model="form.templateCode" :disabled="isView"></el-input>
        </el-form-col>
        <el-form-col label="所属系统：" prop="templateSys" :span="6">
          <el-dropdown-list v-model="form.templateSys" 
            url="/api/sysSystemInfo/getListAll" 
            text-field="systemName"
            value-field="systemId" 
            :params="{OrderModelField: [{OrderByField: 'orderNo',asc: true}]}" 
            :allow-create="false"
            :filterable="true" 
            :clearable="true" 
            :disabled="isView" 
            @change="onChangeTemlateSys">
          </el-dropdown-list>
        </el-form-col>
        <el-form-col label="类型：" prop="templateType" :span="10">
          <el-select v-model="templateType" multiple 
            :disabled="isView" 
            placeholder="请至少选择一种类型" 
            @change="onTemplateTypeChange">
            <el-option v-for="item in templateTypeOptions" 
              :key="item.value" 
              :label="item.label" 
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-col>
        <el-form-col label="当前语种：" prop="languageType" :span="8">
          <el-select v-model="curLanguage" placeholder="请选择一种语言" 
            :disabled="isView" 
            @change="onTemplateLanguageChange" 
            @visible-change="onReadyToChangeLanguage"
            style="width: calc(100% - 48px)">
            <el-option v-for="item in templateLanguageOptions" 
              :key="item.value" 
              :label="item.text" 
              :value="item.value">
            </el-option>
          </el-select>
          <el-button class="icon-button" 
            @click="onSelectOtherLanguage" 
            style="padding: 4px 4px;" 
            icon="el-icon-edit-outline"
            size="mini"></el-button>
        </el-form-col>
        <el-form-col label="是否有效：" prop="isValid" :span="6">
          <el-switch v-model="form.isValid" active-value="1" 
            inactive-value="0" :disabled="isView"></el-switch>
        </el-form-col>
        <el-form-col label="模板内容：" :span="24">
          <el-tabs v-model="activeTab">
            <el-tab-pane label="电子邮件" name="EMAIL" :disabled="content.emailDisabled">
              <el-input v-model="content.emailTitle" 
                :disabled="isView" placeholder="请输入邮件标题......" 
                style="padding-bottom:10px;width:calc(100% - 200px)"></el-input>
              <el-dropdown-list v-model="content.emailConfig" 
                url="/api/sysMessageServiceConfig/getListPage"
                text-field="configName" value-field="id"
                :params="{CustomQueryParams:[{Name:'configType',FindType:'EQ',Values:['EMAIL']}]}"
                :allow-create="false" 
                :filterable="false"
                :clearable="false" 
                :disabled="isView"
                placeholder="请选择服务配置"
                style="padding-bottom:10px;width:180px"
                @change="onServiceConfigChange('EMAIL')">
            </el-dropdown-list>
              <tiny-editor id="email" ref="emaileditor" v-model="content.emailContent" 
                v-if="!isView"></tiny-editor>
                <div style="background-color: #f5f7fa;border-color: #E4E7ED;color: #C0C4CC;cursor: not-allowed;" class="content" v-if="isView" v-html="content.emailContent"></div>
            </el-tab-pane>
            <el-tab-pane label="短信" name="SMS" :disabled="content.smsDisabled">
              <el-dropdown-list v-model="content.smsConfig" 
                  url="/api/sysMessageServiceConfig/getListPage"
                  :params="{CustomQueryParams:[{Name:'configType',FindType:'EQ',Values:['SMS']}]}"
                  value-field="id"
                  text-field="configName" 
                  :allow-create="false" 
                  :filterable="false"
                  :clearable="false" 
                  :disabled="isView"
                  placeholder="请选择服务配置"
                  style="padding-bottom:10px;"
                  @change="onServiceConfigChange('SMS')">
              </el-dropdown-list>
              <el-input type="textarea" :rows="8" v-model="content.smsContent" :disabled="isView" 
                placeholder="请输入短信内容......"
                style="line-height: 2;font-size: x-large;"></el-input>
            </el-tab-pane>
            <el-tab-pane label="站内信" name="INMAIL" :disabled="content.inmailDisabled">
              <el-input v-model="content.inmailTitle" :disabled="isView" 
                placeholder="请输入站内信标题......" 
                style="padding-bottom:10px;width:99.8%"></el-input>
              <tiny-editor id="inmail" ref="inmaileditor" 
                v-model="content.inmailContent"></tiny-editor>
            </el-tab-pane>
          </el-tabs>
        </el-form-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import dialogPageBase from '@/components/framework/mixins/dialogPageBase';
  import tinyEditor from "@/components/framework/plugins/tinyEditor";
  export default {
    mixins: [dialogPageBase],
    data() {
      return {
        // 确定数据已json格式提交
        submitType: "json",
        // 选择语种对话框
        selectLanguageDialogVisible: false,
        // 激活的Tab
        activeTab: 'EMAIL',
        // 当前语种
        curLanguage: 'CH',
        // 模板类型项目
        templateTypeOptions: [
          {
            value: 'EMAIL',
            label: '邮件'
          },
          {
            value: 'SMS',
            label: '短信'
          },
          {
            value: 'INMAIL',
            label: '站内信'
          }
        ],
        // 字典中的语种
        languageOptions: this.$store.getters.dataDictionary["languageType"] || [],
        // 选择的语种
        templateLanguages: ['CH'],
        // 模板对应的语种
        templateLanguageOptions: [{
          value: 'CH',
          text: '中文'
        }],
        content: {
          emailTitle: '',
          emailContent: '',
          emailDisabled: true,
          emailConfig: '',
          smsContent: '',
          smsDisabled: true,
          smsConfig: '',
          inmailTitle: '',
          inmailContent: '',
          inmailDisabled: true,
          inmailConfig: ''
        },
        form: {
          createDate: '',
          creatorId: '',
          creatorName: '',
          id: '',
          isValid: 0,
          modifierId: '',
          modifierName: '',
          modifyDate: '',
          serviceId: '',
          serviceName: '',
          templateCode: '',
          templateName: '',
          templateSys: '',
          templateSysName: '',
          templateType: '',
          languages: '',
          contents: []
        },
        templateType: []
      };
    },
    computed: {
      queryParams() {
        // 指定子表与主表关联的字段
        return [{
          'Name': 'id',
          'FindType': 'EQ',
          'Values': [this.params.id]
        }];
      }
    },
    methods: {
      pageLoad() {
        this.iniFormData();
        this.iniLanguage();
        this.onTemplateTypeChange();
      },
      iniFormData() {
        // 将主表的模板类型拆分为数组
        if (this.form.templateType.length > 1) {
          this.templateType = this.form.templateType.split(",");
        } else {
          this.templateType = [];
        }
        // 将contents中数据转为OperType转为EDIT
        this.form.contents.map(item => {
          item.operType = "EDIT";
        });
      },
      beforeClose() {
        this.setCurContentToFormContents();
        return true;
      },
      validator(row) {},
      afterRowSave(row) {},
      onChangeTemlateSys(itemValue, itemText) {
        this.form.templateSysName = itemText;
      },
      onServiceConfigChange(templateType) {
        // debugger;
        // 当切换配置的时候，所有语种的相关配置都同时切换
        let _this = this;
        switch (templateType) {
          case 'EMAIL':
            this.form.contents.map(item => {
              item.templateType === 'EMAIL' 
              && (item.configId = _this.content.emailConfig);
            });
            break;
          case 'SMS':
            this.form.contents.map(item => {
              item.templateType === 'SMS' 
              && (item.configId = _this.content.smsConfig);
            });
            break;
          case 'INMAIL':
            this.form.contents.map(item => {
              item.templateType === 'INMAIL' 
              && (item.configId = _this.content.inmailConfig);
            });
            break;
          default:
            break;
        }
      },
      // 保存前处理数据
      onBeforeSumbit() {
        this.setCurContentToFormContents();
        // 设置模板类型
        this.form.templateType = this.templateType.join(",");
        // 设置模板语种
        let _temp = [];
        this.templateLanguageOptions.map(item => {
          _temp.push(item.value);
        });
        this.form.languages = _temp.join(",");
        return true;
      },
      // 切换模板类型
      onTemplateTypeChange() {
        
        this.content.emailDisabled = true;
        this.content.smsDisabled = true;
        this.content.inmailDisabled = true;
        this.templateType.map(item => {
          item === "EMAIL" && (this.content.emailDisabled = false);
          item === "SMS" && (this.content.smsDisabled = false);
          item === "INMAIL" && (this.content.inmailDisabled = false);
        });
        if (this.content.emailDisabled === false) {
          this.activeTab = "EMAIL";
        } else if (this.content.smsDisabled === false) {
          this.activeTab = "SMS";
        } else if (this.content.inmailDisabled === false) {
          this.activeTab = "INMAIL";
        } else {
          this.activeTab = "NONE";
        }
        this.iniContents();
        this.getFormContentsToCurContent();
      },
      // 当准备切换模板语种的时候
      onReadyToChangeLanguage(readyChange) {
        readyChange && (this.setCurContentToFormContents());
      },
      // 为模板选择其它语种时
      onSelectOtherLanguage() {
        this.setCurContentToFormContents();
        this.selectLanguageDialogVisible = true;
      },
      // 切换模板语种时，
      onTemplateLanguageChange() {
        this.getFormContentsToCurContent();
      },
      // 将当前的数据保存的对应的contents中
      setCurContentToFormContents() {
        
        let _this = this;
        let _tempContent = "undefined";
        // 保存EMAIL模板的内容
        if (_this.content.emailDisabled === false) {
          _tempContent = _this.form.contents.find(function (x) {
            return x.language === _this.curLanguage && x.templateType === "EMAIL";
          });
          if (typeof (_tempContent) !== "undefined") {
            _tempContent.content = _this.content.emailContent;
            _tempContent.title = _this.content.emailTitle;
            _tempContent.configId = _this.content.emailConfig;
          }
        }
        // 保存SMS模板的内容
        if (_this.content.smsDisabled === false) {
          _tempContent = _this.form.contents.find(function (x) {
            return x.language === _this.curLanguage && x.templateType === "SMS";
          });
          if (typeof (_tempContent) !== "undefined") {
            _tempContent.content = _this.content.smsContent;
            _tempContent.title = _this.content.smsTitle;
            _tempContent.configId = _this.content.smsConfig;
          }
        }
        // 保存INMAIL模板的内容
        if (_this.content.inmailDisabled === false) {
          _tempContent = _this.form.contents.find(function (x) {
            return x.language === _this.curLanguage && x.templateType === "INMAIL";
          });
          if (typeof (_tempContent) !== "undefined") {
            _tempContent.content = _this.content.inmailContent;
            _tempContent.title = _this.content.inmailTitle;
            _tempContent.configId = _this.content.inmailConfig;
          }
        }
      },
      // 将contents中的数据取出来放到当前的contens中
      getFormContentsToCurContent() {
        
        let _this = this;
        let _tempContent = "undefined";
        // 获取EMAIL模板的内容
        _tempContent = _this.form.contents.find(function (x) {
          return x.language === _this.curLanguage && x.templateType === "EMAIL";
        });
        if (typeof (_tempContent) !== "undefined") {
          _this.content.emailContent = _tempContent.content;
          _this.content.emailTitle = _tempContent.title;
          _this.content.emailConfig = _tempContent.configId;
        }
        // 获取SMS模板的内容
        _tempContent = _this.form.contents.find(function (x) {
          return x.language === _this.curLanguage && x.templateType === "SMS";
        });
        if (typeof (_tempContent) !== "undefined") {
          _this.content.smsContent = _tempContent.content;
          _this.content.smsTitle = _tempContent.title;
          _this.content.smsConfig = _tempContent.configId;
        }
        // 获取EMAIL模板的内容
        _tempContent = _this.form.contents.find(function (x) {
          return x.language === _this.curLanguage && x.templateType === "INMAIL";
        });
        if (typeof (_tempContent) !== "undefined") {
          _this.content.inmailContent = _tempContent.content;
          _this.content.inmailTitle = _tempContent.title;
          _this.content.inmailConfig = _tempContent.configId;
        }
      },
      // 选择语种
      onSelctLanguage() {
        this.convertLanguageToList();
        this.iniContents();
      },
      // 初始化内容，根据模板语种和模板类型，设置contents的数据
      iniContents() {
        
        let _this = this;
        let _index = -1;
        let _i = 0;
        // 采用DEL标记的方式，最终保存的时候再去除
        _this.form.contents.map(_item => {
          // 查找类型相同的数据
          _index = _this.templateType.findIndex(function (_x) {
            return _x === _item.templateType;
          });
          if (_index === -1) {
            _item.operType = "DEL";
          }
          // 查找语种相同的数据
          _index = _this.templateLanguages.findIndex(function (_x) {
            return _x === _this.form.contents[_i].language;
          });
          if (_index === -1) {
            _item.operType = "DEL";
          }
        });
        // 根据模板类型和语种生成所有数据
        _this.templateType.map(typeItem => {
          _this.templateLanguages.map(languageItem => {
            // 逐项判断contents中是否有对应数据
            _index = _this.form.contents.findIndex(function (x) {
              return x.language === languageItem && x.templateType === typeItem;
            });
            // 如果找不到则新增一条空的数据
            if (_index === -1) {
              let _tempContent = {
                id: "",
                configId: "",
                templateId: _this.form.id,
                title: "",
                content: "",
                isHtml: "",
                language: languageItem,
                templateType: typeItem,
                operType: "ADD"
              };
              _this.form.contents.push(_tempContent);
            }
            // 如果找到了，判断是否是DEL状态的，是的话就恢复为EDIT状态
            if (_index > -1 && _this.form.contents[_index].operType === "DEL") {
              _this.form.contents[_index].operType = "EDIT";
            }
          });
        });
      },
      // 初始化模板语种
      iniLanguage() {
        if (this.form.languages.length > 1) { /* 如果数据中有选择语种 */
          this.templateLanguages = this.form.languages.split(",");
          this.convertLanguageToList();
        } else { /* 如果没有选择语种，或是新增数据，设置默认中文 */
          this.templateLanguages = ["CH"];
        }
        // 设置中文为默认语种，不允许取消
        this.languageOptions.map(item => {
          item.value === "CH" && (item.disabled = true);
        });
      },
      // 转换对应语种到模板语种的下拉列表
      convertLanguageToList() {
        this.templateLanguageOptions = [];
        let _tempLanguage = "undefined";
        let _this = this;
        _this.templateLanguages.map(item => {
          _tempLanguage = _this.languageOptions.find(function (x) {
            return x.value === item;
          });
          if (typeof (_tempLanguage) !== "undefined") {
            _this.templateLanguageOptions.push(_tempLanguage);
          }
        });
      }
    },
    components: {
      tinyEditor
    }
  };

</script>

<style>
  .icon-button {
    font-size: medium;
  }

</style>
