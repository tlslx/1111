import exhibitionPeriod from "@/components/project/mixins/exhibitionPeriods";
export const zonePlan = {
  mixins: [exhibitionPeriod],
  data() {
    return {
      api: {
        add: kindo.config.api.expUrl + "/api/exp/special/add",    // 预设 添加
        del: kindo.config.api.expUrl + "/api/exp/special/delete", // 预设 删除
        copy: kindo.config.api.expUrl + "/api/exp/special/copy",  // 预设 复制
        get: kindo.config.api.expUrl + "/api/exp/special/getListPage",
        getbyid: kindo.config.api.expUrl + "/api/exp/special/get",
        update: kindo.config.api.expUrl + "/api/exp/special/update",
        //已经关联企业的申请记录的集合 json格式
        recording: kindo.config.api.positionArrangeUrl + "/api/speciaAreaExternal/alreadylinked/getListAll",
        getSpecialDetailHistory: kindo.config.api.expUrl + "/api/exp/special/getSpecialDetailHistory",
        // 未关联数据
        unRecording: kindo.config.api.positionArrangeUrl + "/api/speciaAreaExternal/nolinked/getListAll",
        updateRecording: kindo.config.api.positionArrangeUrl + "/api/speciaAreaExternal/toProductTypes/updateBatch",    // 添加关联保存更新
        // 删除关联
        deleteRecording: kindo.config.api.positionArrangeUrl + "/api/speciaAreaExternal/toNull/updateBatch",
        isRepeat: kindo.config.api.expUrl + "/api/exp/special/isRepeat",   // 判断新增届别和展期时，是否重复
        queryOrg: kindo.config.api.comsUrl + "/api/sysDepartment/common/getListByIds"   // 查询单位机构名称
      },
      isAssociation: false,
      isAcction: true,
      oldNumArrangeOrg: [],        // 展位数量安排单位    用来储存上一次的数据
      oldPositionArrangeOrg: [],   // 展位位置安排单位    用来储存上一次的数据
      isRepeat: false,             // 判断新增和复制时的届别和展期是否重复
      includesUnit: false,         // 复制时展位数量安排单位是否是展区方案安排单位的子集
      includesExpUnit: false,      // 复制时展位位置安排单位是否是展区方案安排单位的子集
      schemeStatus: '',
      acctionData: '',             // 关联专区
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#5615c7',
        '#c71585',
        '#c7151b'
      ],
      unAssociationTableData: [],        // 添加未关联数据
      boothNumScaleTotal: 0,             // 根据届别、展期获取展区方案设置中展位数量总规模 （当前届别展期下专区方案明细的展位数量总规模之和等于展区方案设置中展位数量总规模）
      brandBoothNumTotal: 0,             // 根据届别、展期获取展区方案设置中品牌展位数量
      generalBoothNumTotal: 0,           // 根据届别、展期获取展区方案设置中一般性展位数量
      currentBoothNumScaleTotal: '',     // 当前还剩多少展位数量总规模
      currentBrandBoothNumTotal: '',     // 当前还剩多少品牌展位数量
      currentGeneralBoothNumTotal: '',   // 当前还剩多少一般性展位数量
      snapBoothNumScaleTotal: 0,         // 同届别展期下的同展区名称的 展位数量总规模  
      snapBrandBoothNumTotal: 0,         // 同届别展期下的同展区名称的 品牌展位数量
      snapGeneralBoothNumTotal: 0,       // 同届别展期下的同展区名称的 一般性展位数量
      schemeId: '',                      // 方案Id
      // 方案明细弹框表单
      addmodel: {
        specialAreaCode: '',             // 专区编码
        zhName: '',                      // 专区中文名称
        enName: '',                      // 专区英文名称
        exhibitionType: '',              // 展览大类
        exhibitionAreaCode: '',          // 展区
        numArrangeOrg: [],               // 展位数量安排单位
        positionArrangeOrg: [],          // 展位位置安排单位
        boothNumScale: null,             // 展位数量规模
        brandBoothNum: null,             // 品牌展位数量
        generalBoothNum: null,           // 一般性展位数量
        unifiedArrangeBuilder: '',       // 布展承建商
        seatArea: '',                    // 展位面积
        unifyArrangeSpecialArea: 'false',     // 是否统一布展专区
        inputValue: '',
        applicationWay: '',              // 申请途径
        remark: '',                      // 备注（申请途径）
        arrangeType: '',                 // 布展类型
        detailHistoryCodes: [],          // 历史展区     （设置，审核才有）    
        standardBoothScales: [],         // 标摊展位规格
        newTheme: "false",               // 是否新题材专区
        important: "false",              // 是否重点关注取
        allowSpecialDesign: "false",     // 是否允许企业申请特装展位
        specialAreaColor: '#ccc'         // 展区颜色
      },
      source: {
        schemeStatus: [],                
        applicationWay: [],              // 申请途径       
        arrangeType: [],                 // 布展类型
        detailHistoryCodes: [],          // 历史专区
        numArrangeOrg: [],               // 展位数量安排单位
        positionArrangeOrg: []           // 展位位置安排单位
      },
      addRules: {
        specialAreaCode: [],             // 专区编码
        zhName: [],                      // 专区中文名称
        enName: [],                      // 专区英文名称
        exhibitionType: [],              // 展览大类
        exhibitionAreaCode: [],          // 请选择展区
        numArrangeOrg: [],               // 请选择展位数量安排单位
        positionArrangeOrg: [],          // 请选择展位位置安排单位
        brandBoothNum: [],               // 请输入品牌展位数量
        boothNumScale: [],               // 请输入展位数量总规模
        generalBoothNum: [],             // 一般性展位数量
        unifiedArrangeBuilder: [],       // 布展承建商
        applicationWay: [],              // 请选择申请途径
        unifyArrangeSpecialArea: [],     // 请选择 是否统一布展专区
        arrangeType: [],                 // 布展类型
        newTheme: [],                    // 请选择是否新题材展区
        important: [],                   // 请选择是否重点关注专区
        allowSpecialDesign: [],          // 是否允许企业申请特装展位
        specialAreaColor: []             // 请选择展区颜色
      }
    };
  },
  created() {
    this.source.schemeStatus = [
      { id: "1", value: "1", label: this.source.language.preset },   // 已预设
      { id: "2", value: "2", label: this.source.language.setting },  // 已设置
      { id: "3", value: "3", label: this.source.language.audited }   // 已审核
    ];
    this.addRules.specialAreaCode = [
      { required: true, message: this.source.language.inputPlaceholder, trigger: "change" },
      { pattern: /^[0-9a-zA-Z_]+$/, message: this.source.language.inputValidator },
      { min: 1, max: 32, message: this.source.language.maxChar32, trigger: "change" }
    ];
    this.addRules.zhName = [
      { required: true, message: this.source.language.inputPlaceholder, trigger: "change" },
      { pattern: /^([\u4e00-\u9fa5,、，。！？~,.?!~/\\]){1,200}$/, message: this.source.language.inputChinese + '、' + this.source.language.maxChar200 }
    ];
    this.addRules.enName = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      { pattern: /^([a-zA-Z,~!@#$%^&*().\\/\-=']+(\s)?)+$/, message: this.source.language.inputEnglish + '、' + this.source.language.maxChar200 },
      { min: 1, max: 200, message: this.source.language.maxChar200, trigger: "change" }
    ];
    this.addRules.exhibitionType = this.addRules.exhibitionAreaCode = this.addRules.numArrangeOrg = this.addRules.positionArrangeOrg = this.addRules.unifyArrangeSpecialArea = this.addRules.applicationWay = this.addRules.newTheme = this.addRules.important = this.addRules.allowSpecialDesign = this.addRules.specialAreaColor = this.addRules.arrangeType = [
      { required: true, message: this.source.language.selectPlaceholder, trigger: "change" }
    ];
    this.addRules.unifiedArrangeBuilder = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      { min: 1, max: 100, message: this.source.language.maxChar100, trigger: "change" }
    ];
    this.addRules.boothNumScale = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      {
        validator: (rule, value, callback) => {
          if ((value || parseInt(value) === 0) && this.detailAction !== 'view') {
            if (/^(\d{1,4}|[1]\d{4}|20000)$/.test(value) === false) {
              return callback(new Error(this.source.language.lessThanTwentythousand));
            } else {
              return callback();
            }
          } else {
            return callback();
          }
        },
        trigger: "change"
      },
      {
        validator: (rule, value, callback) => {
          if (parseInt(value) >= 0 && this.detailAction !== 'view') {
            if (parseInt(value) > parseInt(this.currentBoothNumScaleTotal)) {
              return callback(new Error(this.source.language.boothsNotGreaterthan + this.currentBoothNumScaleTotal));
            } else {
              return callback();
            }
          } else {
            return callback();
          }
        },
        trigger: "change"
      },
      {
        validator: (rule, value, callback) => {
          if ((value || parseInt(value) === 0) && (this.addmodel.brandBoothNum || parseInt(this.addmodel.brandBoothNum) === 0) && this.detailAction !== 'view') { 
            if (Number(value) < Number(this.addmodel.brandBoothNum)) {
              return callback(new Error(this.source.language.notGreaterthan));
            } else {
              return callback();
            }
          } else {
            return callback();
          }
        },
        trigger: "change"
      }
    ];
    this.addRules.brandBoothNum = [ // 请输入品牌展位数量
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      {
        validator: (rule, value, callback) => {
          if ((value || parseInt(value) === 0) && this.detailAction !== 'view') {
            if (/^(10000|\d{1,4})$/.test(value) === false) {
              return callback(new Error(this.source.language.lessThanTenthousand));
            } else {
              return callback();
            }
          } else {
            return callback();
          }
        },
        trigger: "change"
      },
      {
        validator: (rule, value, callback) => {
          if (parseInt(value) >= 0 && this.detailAction !== 'view') {
            if (parseInt(value) > parseInt(this.currentBrandBoothNumTotal)) {
              return callback(new Error(this.source.language.brandNotGreaterthan + this.currentBrandBoothNumTotal));
            } else {
              return callback();
            }
          } else {
            return callback();
          }
        },
        trigger: "change"
      },
      {
        validator: (rule, value, callback) => {
          if ((value || parseInt(value) === 0) && (this.addmodel.boothNumScale || parseInt(this.addmodel.boothNumScale) === 0) && this.detailAction !== 'view') {
            if (Number(value) > Number(this.addmodel.boothNumScale)) {
              return callback(new Error(this.source.language.notGreaterthan));
            } else {
              return callback();
            }
          } else {
            return callback();
          }
        },
        trigger: "change"
      }
    ];
    this.addRules.generalBoothNum = [
      { required: false, message: this.source.language.inputPlaceholder, trigger: "change" },
      {
        validator: (rule, value, callback) => {
          if ((value || parseInt(value) === 0) && this.detailAction !== 'view') {
            if (/^(10000|\d{1,4})$/.test(value) === false) {
              return callback(new Error(this.source.language.lessThanTenthousand));
            } else {
              return callback();
            }
          } else {
            return callback();
          } 
        },
        trigger: "change"
      },
      {
        validator: (rule, value, callback) => {
          if ((value || parseInt(value) === 0) && this.detailAction !== 'view') {
            if (parseInt(value) > parseInt(this.currentGeneralBoothNumTotal)) {
              return callback(new Error(this.source.language.generalNotGreaterthan + this.currentGeneralBoothNumTotal));
            } else {
              return callback();
            }
          } else {
            return callback();
          }
        },
        trigger: "change"
      }
    ];
  },
  methods: {
    onQuery() {
      this.$refs.zonePlanTable.reloadData();
    },
    // 重置查询
    onResetQuery() {
      this.queryParams = Object.assign({}, this._queryParams);
      this.$nextTick(function () {
        this.$refs.zonePlanTable.reloadData();
      });
    },
    getAction() {
      if (this.action === 'add') {
        this.$nextTick(function () {
          this.child = Object.assign({}, this._child);
          this.$refs.child.resetFields();
          this.$refs.zonePlanDetailTable.internalData = [];
          this.detailTableData = this.$refs.zonePlanDetailTable.internalData;
        });
      } else if (this.action === 'clone') {
        this.schemeStatus = this.rowdata.schemeStatus;
        this.schemeId = this.rowdata.schemeId;
        this.$nextTick(function () {
          this.getList(this.api.copy, { id: this.schemeId });
        });
      } else {
        this.associationList ? this.isAssociation = true : this.isAssociation = false;
        this.schemeStatus = this.rowdata.schemeStatus;
        this.schemeId = this.rowdata.schemeId;
        this.getExhibitionPeriodNum(this.api.getExhibitionNumAll, this.rowdata.exhibitionNum.toString());
        this.$nextTick(function () {
          this.getList(this.api.getbyid, { id: this.schemeId });
        });
      }
    },
    // 新增明细弹框按钮
    addDetailTheme() {
      this.$refs.child.validate(valid => {
        if (valid) {
          // 所选届别和展期已存在
          if (this.isRepeat) {
            this.$message({
              type: 'warning',
              message: this.source.language.repeat
            });
            return;
          }
          this.isAdd = true;  // 是为增加数据
          this.index = '';
          this.detailAction = 'add';
          this.visibleInfo = true;
          this.$nextTick(function () {
            if (this.operational === '2' || this.operational === '3') {
              this.getDetailHistoryList(this.api.getSpecialDetailHistory, { schemeId: this.schemeId });
            }
            this.addmodel = Object.assign({}, this._addmodel);
            this.$refs.addmodel.resetFields();
            if (this.addmodel.unifyArrangeSpecialArea === "true") {
              this.source.arrangeExhibitionType = this.source.arrangeType.filter(item => item.value !== 'STANDARD_BOOTH' && item.value !== 'CENTER_CHANNEL_BOOTH');
            } else {
              this.source.arrangeExhibitionType = this.source.arrangeType.filter(item => item.value !== 'UNIFICATION_BOOTH' && item.value !== 'CENTER_CHANNEL_BOOTH');
            }
            this.addmodel.arrangeType = [];
            this.source.arrangeExhibitionType.forEach(el => {
              this.addmodel.arrangeType.push(el.value);
            });
          });
        }
      });
    },
    // 保存专区方案明细
    onSaveDetail(formName) {
      this.$refs[formName].validate(valide => {
        if (valide) {
          if (!this.$refs.themetable.internalData.length) {
            this.$message({
              type: 'warning',
              message: this.source.language.addArea
            });
            return;
          }
          let hasEditInfo = false;
          this.$refs.themetable.internalData.forEach((item, index) => {
            if (item.action) {
              hasEditInfo = true;
              return true;
            }
          });
          if (hasEditInfo) {
            // 请先处理未完成的数据
            kindo.util.alert(this.source.language.handlePreData, this.source.language.tips, "warning");
            return;
          }
          let istrue = false;
          if (this.$refs.zonePlanDetailTable.internalData.length !== 0) {
            this.$refs.zonePlanDetailTable.internalData.find((el, index) => {
              if (el.specialAreaCode === this.addmodel.specialAreaCode && this.index !== index) {
                this.$message({
                  type: 'warning',
                  message: this.source.language.zoneCodeAlreadyExists
                });
                istrue = true;
              }
            });
            if (istrue) {
              return;
            }
          }
         
          this.visibleInfo = false;
          if (!this.addmodel.detailHistoryCodes.length) {
            this.addmodel.detailHistoryCodes = '';
          } else {
            this.addmodel.detailHistoryCodes = this.addmodel.detailHistoryCodes.map(item => item).toString();
          }
          this.addmodel.arrangeType = this.addmodel.arrangeType.join(',');
          let numArrangeOrgs = [];
          this.addmodel.numArrangeOrg.forEach(el => {
            let isNumArrangeOrgRepeat = false;
            if (el === 'selectAll') {
              isNumArrangeOrgRepeat = true;
            }
            if (!isNumArrangeOrgRepeat) {
              numArrangeOrgs.unshift(el);
            }
          });
          let positionArrangeOrgs = [];
          this.addmodel.positionArrangeOrg.forEach(el => {
            let isPositionArrangeOrgRepeat = false;
            if (el === 'selectAll') {
              isPositionArrangeOrgRepeat = true;
            }
            if (!isPositionArrangeOrgRepeat) {
              positionArrangeOrgs.unshift(el);
            }
          });
          this.addmodel.numArrangeOrg = numArrangeOrgs.map(item => item).toString();
          this.addmodel.positionArrangeOrg = positionArrangeOrgs.map(item => item).toString();
          this.addmodel.standardBoothScales = this.$refs.themetable.internalData;
          let obj = Object.assign({}, this.addmodel);
          if (this.isAdd) {
            this.$refs.zonePlanDetailTable.internalData.push(obj);
          } else {
            this.$refs.zonePlanDetailTable.internalData.splice(this.index, 1, obj);
          }
          this.detailTableData = this.$refs.zonePlanDetailTable.internalData;
          if (this.action === 'clone') {
            this.isCloneData();
          }
        }
      });
    },
    // 新增 编辑提交
    onSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (this.$refs.zonePlanDetailTable.internalData.length === 0) {
            this.$message({
              type: 'warning',
              message: this.source.language.dataCannotBeEmpty
            });
            return;
          }
          if (this.isRepeat) {
            this.$message({
              type: 'warning',
              message: this.source.language.repeat
            });
            return;
          }
          // 复制数据的展区与所选的届别和展期下的数据明细不匹配
          if (this.notExist.length && this.action === 'clone') {
            // this.isCloneData();
            this.$message({
              type: 'warning',
              message: this.source.language.noMatch
            });
            return;
          }
          // 复制数据的安排单位与所选的届别和展期下的数据明细不匹配
          if (this.notUnit.length && this.action === 'clone') {
            // this.isCloneData();
            this.$message({
              type: 'warning',
              message: this.source.language.matchingUnit
            });
            return;
          }
         
          let url = '';
          this.queryParams = Object.assign({}, this._queryParams);
          let params = Object.assign({}, this.child);
          params.specialDetails = this.$refs.zonePlanDetailTable.internalData;
          if (this.action === "add" || this.action === "clone") {
            url = this.api.add;
            params.schemeStatus = '1';
          } else if (this.operational === '1') {
            url = this.api.update + '/1';
          } else if (this.operational === '2') {
            url = this.api.update + '/2';
          } else if (this.operational === '3') {
            url = this.api.update + '/3';
          }
          this.$http.postJson(url, params).then(res => {
            this.$emit('reload');
            this.$message({
              type: 'success',
              message: this.source.language.success
            });
            this.visible = false;
          }).catch(() => {
            return false;
          });
        } else {
          return false;
        }
      });
    },
    // 方案明细弹框 修改、查看
    onTheme(theme, rowIndex, row) {
      setTimeout(() => {
        this.$refs.child.validate(valid => {
          if (valid) {
            if (this.isRepeat) {
              this.$message({
                type: 'warning',
                message: this.source.language.repeat
              });
              return;
            }
            this.detailAction = theme;
            this.visibleInfo = true;
            if (theme === 'edit') {
              this.isAdd = false; // 是为编辑数据
              this.index = rowIndex;
            }
            this.currentBoothNumScaleTotal = '';
            this.currentBrandBoothNumTotal = '';
            this.currentGeneralBoothNumTotal = '';
            this.$nextTick(function () {
              // 动态判断布展类型内容
              this.addmodel = Object.assign({}, row);
              if (this.addmodel.unifyArrangeSpecialArea === "true") {
                this.source.arrangeExhibitionType = this.source.arrangeType.filter(item => item.value !== 'STANDARD_BOOTH' && item.value !== 'CENTER_CHANNEL_BOOTH');
              } else {
                this.source.arrangeExhibitionType = this.source.arrangeType.filter(item => item.value !== 'UNIFICATION_BOOTH' && item.value !== 'CENTER_CHANNEL_BOOTH');
              }
              this.addmodel.arrangeType = this.addmodel.arrangeType.split(',');
              this.calculateBoothNum();
              let exhibitionAreaList = [];
              let isExhibitionType = false;
              this.list.forEach(el => {
                if (this.addmodel.exhibitionType === el.exhibitionCategoryCode) {
                  isExhibitionType = true;
                  this.source.exhibitionAreaCodeData = el.children;
                  el.children.forEach(v => {
                    exhibitionAreaList.push(v.value);
                  });
                }   
              });
              this.$refs.themetable.internalData = this.addmodel.standardBoothScales;
              this.addmodel.unifyArrangeSpecialArea = this.addmodel.unifyArrangeSpecialArea.toString();
              this.addmodel.numArrangeOrg instanceof Array ? this.addmodel.numArrangeOrg = this.addmodel.numArrangeOrg : this.addmodel.numArrangeOrg = this.addmodel.numArrangeOrg.split(',');
              this.addmodel.positionArrangeOrg instanceof Array ? this.addmodel.positionArrangeOrg = this.addmodel.positionArrangeOrg : this.addmodel.positionArrangeOrg = this.addmodel.positionArrangeOrg.split(',');
              if (!this.addmodel.detailHistoryCodes || !this.addmodel.detailHistoryCodes.length) {
                this.addmodel.detailHistoryCodes = [];
              } else {
                this.addmodel.detailHistoryCodes = this.addmodel.detailHistoryCodes.split(',');
              }
              // 没有匹配的展览大类 展区时,对关联展区方案明细的数据清空
              if (!isExhibitionType || !this.includes(exhibitionAreaList, this.addmodel.exhibitionAreaCode.split(','))) {
                this.addmodel.exhibitionType = '';
                this.addmodel.exhibitionAreaCode = '';
                this.addmodel.numArrangeOrg = [];
                this.addmodel.positionArrangeOrg = [];
                this.addmodel.boothNumScale = null;
                this.addmodel.brandBoothNum = null;
                this.addmodel.generalBoothNum = null;
                this.addmodel.unifiedArrangeBuilder = '';
                this.addmodel.applicationWay = '';
                this.addmodel.unifyArrangeSpecialArea = 'false';
                this.addmodel.remark = '';  // 备注
                this.addmodel.standardBoothScales = [];
                this.$refs.themetable.internalData = this.addmodel.standardBoothScales;
                this.addmodel.newTheme = 'false';
                this.addmodel.important = 'false';
                this.addmodel.specialAreaColor = '#ccc';
              }
            });
          }
        });
      }, 1000);
    },
      // 方案明细删除
    deleteTheme(rowIndex, row) {
      this.$refs.child.validate(valid => {
        if (valid) {
            //确认删除吗？
          this.$confirm(this.source.language.deleteConfirm, this.source.language.tips, {
            confirmButtonText: this.source.language.confirm,
            cancelButtonText: this.source.language.cancel,
            type: 'warning'
          }).then(() => {
            this.$refs.zonePlanDetailTable.internalData.splice(rowIndex, 1);
            this.detailTableData = this.$refs.zonePlanDetailTable.internalData;
          }).then(_ => {
            if (this.action === 'clone') {
              this.isCloneData();
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: this.source.language.undelete
            });
          });
        }
      });
    },
    // 关联记录查看
    associationTheme(row) {
      this.visibleAssociation = true;
      this.isAssociation = true;
      this.acctionData = row;
      this.$nextTick(function () {
        this.isAcction = true;
        if (this.schemeStatus === '3' && this.operational === '2') {
          this.isAcction = false;
        }
        if ((this.schemeStatus === '2' || this.schemeStatus === '1') && this.operational === '3') {
          this.isAcction = false;
        }
        this.$http.get(this.api.recording, { exhibitionSession: this.child.exhibitionNum, exhibitionPeriod: this.child.exhibitionPeriodNum, productType: row.specialAreaCode }).then(response => {
          this.$refs.associationTable.internalData = response;
        });
      });
    },
    // 删除关联
    delAssociation(row) {
      this.$confirm(this.source.language.deleteConfirm, this.source.language.tips, {
        confirmButtonText: this.source.language.confirm,
        cancelButtonText: this.source.language.cancel,
        type: 'warning'
      }).then(() => {
        this.$http.put(this.api.deleteRecording + '?' + 'listdemandRecordId' + '=' + row.applyID).then(res => {
          this.associationTheme(this.acctionData);
          this.$message({
            type: 'success',
            message: this.source.language.deleteSussess
          });

        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: this.source.language.undelete
        });
      });
    },
    // 显示未关联信息 
    addAssociation() {
      this.visibleAssociationInfo = true;
      this.$nextTick(function () {
        let temp = [];
        this.source.detailHistoryCodes.forEach(el => {
          if (this.acctionData.specialAreaCode !== el.value) {
            temp.push(el.value);
          }
        });
        this.$http.get(this.api.unRecording, { exhibitionSession: this.child.exhibitionNum, exhibitionPeriod: this.child.exhibitionPeriodNum, productTypeLists: temp.join(',') }).then(res => {
          this.$refs.unAssociationTable.internalData = res;
        });
      });
    },
    // 将未关联信息保存到关联信息中
    saveAssociation() {
      if (!this.unAssociationTableData.length) {
        this.$message({
          type: 'warning',
          message: this.source.language.dataCannotBeEmpty
        });
        return;
      }
      let applyIDs = [];
      this.unAssociationTableData.forEach(el => {
        applyIDs.push(el.applyID);
      });
      this.$http.put(this.api.updateRecording + '?' + 'ListapplyIds' + '=' + applyIDs.join(',') + '&' + 'finalProductTypes' + '=' + this.acctionData.specialAreaCode).then(res => {
        if (res === true) {
          this.associationTheme(this.acctionData);
          this.$message({
            type: 'success',
            message: this.source.language.success
          });
          this.visibleAssociationInfo = false;
        } else {
          this.$message({
            type: 'warning',
            message: this.source.language.faild
          });
        }
      });
    },
    // 选择未关联的信息
    handleSelectionChange(val) {
      this.unAssociationTableData = val;
    },
    // 选择 展位数量安排单位 展位位置安排单位时，先确定展区名称是否在
    selectExhibitionAreaCode() {
      if (!this.addmodel.exhibitionAreaCode) {
        this.$message({
          type: 'warning',
          message: this.source.language.selectFirstExhibitionAreaCode
        });
        return;
      } 
    },
    // 是否全选展位数量安排单位
    selectAllNumArrangeOrg(val) {
      let allValues = [];
      //保留所有值
      for (let item of this.source.numArrangeOrg) {
        allValues.push(item.value);
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldNumArrangeOrg.length === 0 ? [] : this.oldNumArrangeOrg[1];
  
      // 若是全部选择
      if (val.includes(allValues[0])) {
        this.addmodel.numArrangeOrg = allValues;
      }
      // 取消全部选中  上次有 当前没有 表示取消全选
      if (oldVal.includes(allValues[0]) && !val.includes(allValues[0])) {
        this.addmodel.numArrangeOrg = [];
      } 
      // 点击非全部选中  需要排除全部选中 以及 当前点击的选项 
      // 新老数据都有全部选中 
      if (oldVal.includes(allValues[0]) && val.includes(allValues[0])) {
        const index = val.indexOf(allValues[0]);
        val.splice(index, 1); // 排除全选选项
        this.addmodel.numArrangeOrg = val;
      }
      //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes(allValues[0]) && !val.includes(allValues[0])) {
        if (val.length === allValues.length - 1) {
          this.addmodel.numArrangeOrg = [allValues[0]].concat(val);
        } 
      }
      //储存当前最后的结果 作为下次的老数据 
      this.oldNumArrangeOrg[1] = this.addmodel.numArrangeOrg;
    },
    // 是否全选展位位置安排单位
    selectAllPositionArrangeOrg(val) {
      let allValues = [];
      //保留所有值
      for (let item of this.source.positionArrangeOrg) {
        allValues.push(item.value);
      }
      // 用来储存上一次的值，可以进行对比
      const oldVal = this.oldPositionArrangeOrg.length === 0 ? [] : this.oldPositionArrangeOrg[1];
  
      // 若是全部选择
      if (val.includes(allValues[0])) {
        this.addmodel.positionArrangeOrg = allValues;
      }
      // 取消全部选中  上次有 当前没有 表示取消全选
      if (oldVal.includes(allValues[0]) && !val.includes(allValues[0])) {
        this.addmodel.positionArrangeOrg = [];
      } 
      // 点击非全部选中  需要排除全部选中 以及 当前点击的选项 
      // 新老数据都有全部选中 
      if (oldVal.includes(allValues[0]) && val.includes(allValues[0])) {
        const index = val.indexOf(allValues[0]);
        val.splice(index, 1); // 排除全选选项
        this.addmodel.positionArrangeOrg = val;
      }
      //全选未选 但是其他选项全部选上 则全选选上 上次和当前 都没有全选
      if (!oldVal.includes(allValues[0]) && !val.includes(allValues[0])) {
        if (val.length === allValues.length - 1) {
          this.addmodel.positionArrangeOrg = [allValues[0]].concat(val);
        } 
      }
      //储存当前最后的结果 作为下次的老数据 
      this.oldPositionArrangeOrg[1] = this.addmodel.positionArrangeOrg;
    },
    // 输入展位数量总规模时， 先确定展区名称 是否存在 存在时，输入的展位数量总规模应小于根据届别展期下获得的展区方案设置中的展位数量总规模
    inputBoothNumScale() {
      if (!this.addmodel.exhibitionAreaCode) {
        this.$message({
          type: 'warning',
          message: this.source.language.selectFirstExhibitionAreaCode
        });
        return;
      } 
      this.$message({
        type: 'warning',
        message: this.source.language.numberBooths + this.source.language.remainder + this.currentBoothNumScaleTotal
      });
    },
    // 输入的品牌展位数量应小于根据届别展期下获得的展区方案设置中的品牌展位数量
    inputBrandBoothNum() {
      if (!this.addmodel.exhibitionAreaCode) {
        this.$message({
          type: 'warning',
          message: this.source.language.selectFirstExhibitionAreaCode
        });
        return;
      } 
      this.$message({
        type: 'warning',
        message: this.source.language.brandBoothNum + this.source.language.remainder + this.currentBrandBoothNumTotal
      });
    },
    // 输入一般性展位数量时，提示还剩多少一般性展位数量
    inputGeneralBoothNum() {
      if (!this.addmodel.exhibitionAreaCode) {
        this.$message({
          type: 'warning',
          message: this.source.language.selectFirstExhibitionAreaCode
        });
        return;
      } 
      this.$message({
        type: 'warning',
        message: this.source.language.generalBoothNum + this.source.language.remainder + this.currentGeneralBoothNumTotal
      });
    },
    // 输入的展位数量总规模应小于根据届别展期下获得的展区方案设置中的展位数量总规模
    calculateBoothNum() {
      this.$http.get(this.api.getExhibitionType, { exhibitionNum: this.child.exhibitionNum.toString(), periodCode: this.child.exhibitionPeriodNum.toString() }).then(res => {
        this.resultData = res;
      }).then(_ => {
        this.source.numArrangeOrg = [];
        this.source.positionArrangeOrg = [];
        this.resultData.forEach(el => {
          if (this.addmodel.exhibitionAreaCode === el.exhibitionAreaCode && this.detailAction === 'edit') { 
            this.boothNumScaleTotal = el.boothNumScale;
            this.brandBoothNumTotal = el.brandBoothNum;
            this.generalBoothNumTotal = el.generalBoothNum;
          }
          this.$nextTick(function () {
            if (this.addmodel.exhibitionAreaCode === el.exhibitionAreaCode) {
              this.$http.post(this.api.queryOrg, { deptIds: el.numArrangeOrg.join(',') }).then(res => {
                this.source.numArrangeOrg = [{ id: '1', value: 'selectAll', label: this.source.language.selectAll }];
                res.records.forEach(v => {
                  this.source.numArrangeOrg.push({
                    id: v.deptId,
                    value: v.deptId,
                    label: v.deptName
                  });
                });
                let numArrangeOrgData = [];
                this.source.numArrangeOrg.forEach(item => {
                  numArrangeOrgData.push(item.value);
                });
                if (!this.includes(numArrangeOrgData, this.addmodel.numArrangeOrg)) {
                  this.addmodel.numArrangeOrg = numArrangeOrgData;
                }
              });
              this.$http.post(this.api.queryOrg, { deptIds: el.positionArrangeOrg.join(',') }).then(response => {
                this.source.positionArrangeOrg = [{ id: '1', value: 'selectAll', label: this.source.language.selectAll }];
                response.records.forEach(h => {
                  this.source.positionArrangeOrg.push({
                    id: h.deptId,
                    value: h.deptId,
                    label: h.deptName
                  });
                });
                let positionArrangeOrgData = [];
                this.source.positionArrangeOrg.forEach(item => {
                  positionArrangeOrgData.push(item.value);
                });
                if (!this.includes(positionArrangeOrgData, this.addmodel.positionArrangeOrg)) {
                  this.addmodel.positionArrangeOrg = positionArrangeOrgData;
                } 
              });
            }
          });
          
        });
        this.currentBoothNumScaleTotal = Number(this.boothNumScaleTotal);
        this.currentBrandBoothNumTotal = Number(this.brandBoothNumTotal);
        this.currentGeneralBoothNumTotal = Number(this.generalBoothNumTotal);
        if (!this.addmodel.exhibitionAreaCode) {
          this.currentBoothNumScaleTotal = 0;
          this.currentBrandBoothNumTotal = 0;
          this.currentGeneralBoothNumTotal = 0;
        }
        if (this.$refs.zonePlanDetailTable.internalData.length) {
          this.snapBoothNumScaleTotal = 0;
          this.snapBrandBoothNumTotal = 0;
          this.snapGeneralBoothNumTotal = 0;
          this.$refs.zonePlanDetailTable.internalData.forEach((item, index) => {
            if (this.addmodel.exhibitionAreaCode === item.exhibitionAreaCode) {
              this.snapBoothNumScaleTotal += Number(item.boothNumScale);
              this.snapBrandBoothNumTotal += Number(item.brandBoothNum);
              this.snapGeneralBoothNumTotal += Number(item.generalBoothNum);
            } 
          });
        } else {
          this.currentBoothNumScaleTotal = this.boothNumScaleTotal;
          this.currentBrandBoothNumTotal = this.brandBoothNumTotal;
          this.currentGeneralBoothNumTotal = this.generalBoothNumTotal;
        } 

      }).then(v => {
        if (this.$refs.zonePlanDetailTable.internalData.length) {
          this.$refs.zonePlanDetailTable.internalData.forEach((item, index) => { 
            if (this.addmodel.exhibitionAreaCode === item.exhibitionAreaCode && this.index === index) {
              this.currentBoothNumScaleTotal = Number(this.boothNumScaleTotal) - this.snapBoothNumScaleTotal + Number(this.$refs.zonePlanDetailTable.internalData[index].boothNumScale);
              this.currentBrandBoothNumTotal = Number(this.brandBoothNumTotal) - this.snapBrandBoothNumTotal + Number(this.$refs.zonePlanDetailTable.internalData[index].brandBoothNum);
              this.currentGeneralBoothNumTotal = Number(this.generalBoothNumTotal) - this.snapGeneralBoothNumTotal + Number(this.$refs.zonePlanDetailTable.internalData[index].generalBoothNum);
            } 
            if (this.addmodel.exhibitionAreaCode === item.exhibitionAreaCode && this.detailAction === 'add') {
              this.currentBoothNumScaleTotal = Number(this.boothNumScaleTotal) - this.snapBoothNumScaleTotal;
              this.currentBrandBoothNumTotal = Number(this.brandBoothNumTotal) - this.snapBrandBoothNumTotal;
              this.currentGeneralBoothNumTotal = Number(this.generalBoothNumTotal) - this.snapGeneralBoothNumTotal;
            }
          });
        } 
      });
    },
    // 获取专区方案弹框表单、列表数据
    getList(url, id) {
      this.child = Object.assign({}, this._child);
      this.$refs.child.resetFields();
      this.$refs.zonePlanDetailTable.internalData = [];
      if (this.operational === '2' || this.operational === '3') {
        this.getDetailHistoryList(this.api.getSpecialDetailHistory, { schemeId: this.schemeId });
      }
      this.$http.get(url, id).then(res => {
        res.specialDetails.forEach(el => {
          el.allowSpecialDesign = el.allowSpecialDesign.toString();
          el.important = el.important.toString();
          el.newTheme = el.newTheme.toString();
        });
        this.$refs.zonePlanDetailTable.internalData = res.specialDetails;
        if (this.action === "clone") {
          this.child = Object.assign({}, this._child);
          this.$refs.child.resetFields();
          this.detailTableData = [];
        } else {
          res.exhibitionPeriodNum = res.exhibitionPeriodNum.toString();
          res.exhibitionNum = res.exhibitionNum.toString();
          this.child = res;
          this.detailTableData = this.$refs.zonePlanDetailTable.internalData;
        }
      }).catch(error => {
        this.$message({
          type: 'warning',
          message: error
        });
      });

    },
    // 获取历史专区
    getDetailHistoryList(url, id) {
      let detailHistoryCodesList = [];
      this.$http.get(url, id).then(res => {
        res.records.forEach(el => {
          // if (kindo.cache.get('language') === 'zh') {
          //   detailHistoryCodesList.push({
          //     id: el.detailHistoryId,
          //     value: el.specialAreaCode,
          //     label: el.zhName
          //   });
          // } else {
          //   detailHistoryCodesList.push({
          //     id: el.detailHistoryId,
          //     value: el.specialAreaCode,
          //     label: el.enName
          //   });
          // }
          detailHistoryCodesList.push({
            id: el.detailHistoryId,
            value: el.specialAreaCode,
            label: el.zhName
          });
        });
        this.source.detailHistoryCodes = detailHistoryCodesList;
      });
    }
  },
  watch: {
    "addmodel.exhibitionAreaCode"(val) {
      if (this.operational) {
        this.calculateBoothNum();
      } 
      if (this.operational && val === '') {
        this.addmodel.numArrangeOrg = [];
        this.addmodel.positionArrangeOrg = [];
        this.addmodel.boothNumScale = null;
        this.addmodel.brandBoothNum = null;
        this.addmodel.generalBoothNum = null;
        this.addmodel.unifiedArrangeBuilder = '';
        this.addmodel.applicationWay = '';
        this.addmodel.unifyArrangeSpecialArea = 'false';
        this.addmodel.remark = '';  // 备注
        this.addmodel.standardBoothScales = [];
        this.$refs.themetable.internalData = this.addmodel.standardBoothScales;
        this.addmodel.newTheme = 'false';
        this.addmodel.important = 'false';
        this.addmodel.specialAreaColor = '#ccc';
      } 
      if (this.operational && val && (this.detailAction === 'add' || (this.action === 'clone' && this.detailAction === 'edit'))) {
        this.resultData.forEach(el => {
          if (this.addmodel.exhibitionAreaCode === el.exhibitionAreaCode) {
            this.boothNumScaleTotal = el.boothNumScale;
            this.brandBoothNumTotal = el.brandBoothNum;
            this.generalBoothNumTotal = el.generalBoothNum;
            this.addmodel.unifiedArrangeBuilder = el.arrangeExhibitionOrg;      // 布展承建商
            this.addmodel.applicationWay = el.applicationTypeCode;              // 申请途径
            this.addmodel.unifyArrangeSpecialArea = el.isUnifyArrangeExhibitionArea === '0' ? 'false' : 'true';
            this.addmodel.remark = el.remark;  // 备注
            this.addmodel.standardBoothScales = el.standardBoothScales;
            this.$refs.themetable.internalData = this.addmodel.standardBoothScales;
            this.addmodel.newTheme = el.isNewThemeArea === '0' ? 'false' : 'true';
            this.addmodel.important = el.isImportantArea === '0' ? 'false' : 'true';
            this.addmodel.specialAreaColor = el.exhibitionAreaColor;
          }
        });
      }
    },
    "addmodel.boothNumScale"(val) {
      if (parseInt(this.addmodel.boothNumScale) >= 0 && parseInt(this.addmodel.brandBoothNum) >= 0) {  
        this.addmodel.generalBoothNum = parseInt(this.addmodel.boothNumScale) - parseInt(this.addmodel.brandBoothNum);
      }
      if (Number(this.addmodel.generalBoothNum < 0)) {
        this.addmodel.generalBoothNum = 0;
      }
    },
    "addmodel.brandBoothNum"(val) {
      if (parseInt(val) >= 0 && parseInt(this.addmodel.boothNumScale) >= 0) {
        this.addmodel.generalBoothNum = parseInt(this.addmodel.boothNumScale) - parseInt(this.addmodel.brandBoothNum);
      }
      if (Number(this.addmodel.generalBoothNum < 0)) {
        this.addmodel.generalBoothNum = 0;
      }
    },
    "addmodel.generalBoothNum"(val) {
      if (parseInt(this.addmodel.boothNumScale) >= 0 && parseInt(this.addmodel.brandBoothNum) >= 0) {
        this.addmodel.generalBoothNum = parseInt(this.addmodel.boothNumScale) - parseInt(this.addmodel.brandBoothNum);
      }
      if (Number(this.addmodel.generalBoothNum < 0)) {
        this.addmodel.generalBoothNum = 0;
      }
    },
    "addmodel.unifyArrangeSpecialArea"(val) {
      if (val === "true") {
        this.source.arrangeExhibitionType = this.source.arrangeType.filter(item => item.value !== 'STANDARD_BOOTH' && item.value !== 'CENTER_CHANNEL_BOOTH');
      } else {
        this.source.arrangeExhibitionType = this.source.arrangeType.filter(item => item.value !== 'UNIFICATION_BOOTH' && item.value !== 'CENTER_CHANNEL_BOOTH');
      }
    },
    visible(val) {
      if (val === true) {
        this.getAction();
      }
    }
  },
  computed: {
    numArrangeOrg() {
      return this.source.numArrangeOrg;
    },
    positionArrangeOrg() {
      return this.source.positionArrangeOrg;
    }
  }
};

export default zonePlan;
