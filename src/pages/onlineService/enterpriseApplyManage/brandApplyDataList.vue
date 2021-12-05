 <style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.martop {
  margin-top: 10px;
}
.waringInfo {
  color: #d80c18;
}
/* .mimeograph{
    width: 120px;
    height: 40px;
    margin: 0 0 0 45%;
  } */
</style>
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="一般性展位" name="first">
      <div v-if="!containExhibitionPeriod" style="padding: 15px 0;font-size: 17px;font-weight: bold;color: #d80c18;">当前时间不在申请展位时间范围内</div>
      <el-form :model="queryForm" :inline="true">
        <el-form-item label="展区" prop="exhibitionArea" label-width="40px">
          <el-select v-model="queryForm.exhibitionArea" @change="handleExhibitionChange" class="select-width" clearable>
            <el-option v-for="(item, key) in exhibitionAreaOpts" :key="key" :value="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核情况">
          <el-select v-model="queryForm.checkStatus" clearable>
            <el-option v-for="item in checkStatusOpts" :key="item.value" :value="item.value" :label="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="mimeograph" @click="handleQuery">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table border :data="tablData">
        <el-table-column label="申请展区" prop="exhibitionAreaName" align="center">
          <!-- <template slot-scpoe="scope">
            {{ scope.row.exhibitionAreaName | exhibition }}
          </template> -->
        </el-table-column>
        <el-table-column label="展品专区" prop="productTypeName" align="center">
          <!-- <template slot-scpoe="scope">
                {{ appou }}
            </template> -->
        </el-table-column>
        <el-table-column label="布展类型" prop="exhibitionType" align="center">
          <template slot-scope="scope">
            {{ scope.row.exhibitionType | exhibiType }}
          </template>
        </el-table-column>
        <el-table-column label="申请数量" prop="boothNumber" align="center"></el-table-column>
        <el-table-column label="申请面积" prop="boothAcreage" align="center"></el-table-column>
        <el-table-column label="联营企业" prop="unionId" align="center"> </el-table-column>
        <el-table-column label="审核情况" prop="status" align="center">
          <template slot-scope="scope">
            {{ scope.row.status | checkSta }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button v-if="((scope.row.exhibitionArea !== 'NE01' && scope.row.exhibitionArea !== 'CG06') && containExhibitionPeriod) || ((scope.row.exhibitionArea === 'NE01' || scope.row.exhibitionArea === 'CG06') && cxContainExhibiPeriod)" type="text" size="small" :disabled="handeDbled(scope.row)" @click="handleEdit(scope.row)">编辑</el-button>
            <el-button v-if="((scope.row.exhibitionArea !== 'NE01' && scope.row.exhibitionArea !== 'CG06') && containExhibitionPeriod) || ((scope.row.exhibitionArea === 'NE01' || scope.row.exhibitionArea === 'CG06') && cxContainExhibiPeriod)" type="text" size="small" :disabled="handleDelDisabled(scope.row)" @click="deleteBrandData(scope.row)">删除</el-button>
            <el-button type="text" size="small" @click="toNext(scope.row)">打印</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="martop">
        <el-button type="primary" size="medium" class="mimeograph" @click="brandAdd">新增展位申请</el-button>
        <!-- v-if="containExhibitionPeriod"  -->
        <el-button v-show="isToNext" type="primary" size="medium" class="mimeograph" @click="toNext('next')">下一步</el-button>
        <br />
        <br />
        <span class="waringInfo">注意：请提交企业、展品资料及展位申请信息后，点击“打印”生成参展申请表，打印并加盖企业公章后，连同外贸经营者备案登记表及交易团要求提交的材料一并报所属交易团后，参展申请方正式生效</span>
        <!-- <el-button type="danger" size="medium" class="mimeograph" @click="toAddProduct">添加新展品</el-button> -->
        <br />
        <div class="floatRight">
          <el-pagination @current-change="handleCurrentChange" :current-page="getStand.current" :page-size="getStand.size" layout="total, prev, pager, next, jumper" :total="getStand.total">
          </el-pagination>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      appou: '',
      activeName: 'first',
      isToNext: false, // 判断是否出现下一步按钮
      containExhibitionPeriod: true, // 判断除新能源展区以外的展区是否在参展期内
      cxContainExhibiPeriod: true, // 判断新能源展区是否在参展期内
      productTypeOpts: [],
      optionList: [],
      fileid: '',
      exhibitionAreaOpts: [],
      exhibitionAreaTwpts: [],
      checkStatusOpts: [{ value: '0', label: '未审核' }, { value: '1', label: '审核通过' }, { value: '2', label: '审核不通过' }, { value: '3', label: '审核中' }],
      queryForm: {},
      tablData: [],
      pageData: {
        current: 1,
        size: 10,
        total: 0
      },
      companyInfo: [
        {
          key: 'companyId',
          label: '企业永久代码',
          value: ''
        },
        {
          key: 'companyName',
          label: '申请企业名称中文',
          value: ''
        },
        {
          key: 'companyNameEn',
          label: '申请企业名称英文',
          value: ''
        },
        {
          key: 'adressCh',
          label: '申请企业地址中文',
          value: ''
        },
        {
          key: 'adressEn',
          label: '申请企业地址英文',
          value: ''
        },
        {
          key: 'customsCode',
          label: '海关编码',
          value: ''
        },
        {
          key: 'legalPerson',
          label: '法定代表人',
          value: ''
        },
        {
          key: 'businessLicenceNo',
          label: '统一社会信用代码/营业执照号',
          value: ''
        },
        {
          key: 'importExportCode',
          label: '进出口企业代码',
          value: ''
        },
        {
          key: 'exportVolumeLast',
          label: '进出口企业代码',
          value: ''
        },
        {
          key: 'exhibitorContact',
          label: '参展联系人',
          value: ''
        },
        {
          key: 'exhibitorContactPhone',
          label: '参展联系人手机',
          value: ''
        },
        {
          key: 'postalCode',
          label: '邮政编码',
          value: ''
        },
        {
          key: 'businessContactsEmail',
          label: 'E-mail',
          value: ''
        }
      ]
    };
  },
  async created() {
    this.exhibitionAreaOpts = await kindo.dictionary.get('exhibitionArea'); // 展区
    // 前端将贫困展区删除
    let deleteIndex = 0;
    this.exhibitionAreaOpts.forEach((val, index) => {
      if (val.value === 'LD01') {
        deleteIndex = index;
        this.exhibitionAreaOpts.splice(deleteIndex, 1);
      }
    });
    let newener = {
      "companyId": this.$store.state.userInfo.companyId
    };
    this.optionList = await this.getGeneralAddi(encodeURI(JSON.stringify(newener)));
    // 获取届数
    this.getSessionInfo().then(res => {
      if (res.session) {
        this.dealWithLimitTime(res);
        let dateList = {
          companyId: this.$store.state.userInfo.companyId,
          current: "1",
          size: "10"
        };
        this.handeSuerDate(dateList);
      } else {
        // 未拿到届数不可以新增，编辑和删除展位
        this.containExhibitionPeriod = false;
        this.cxContainExhibiPeriod = false;
        let dateList = {
          companyId: this.$store.state.userInfo.companyId,
          current: "1",
          size: "10"
        };
        this.handeSuerDate(dateList);
      }
    }).catch(e => {
      // 未拿到届数不可以新增，编辑和删除展位
      this.containExhibitionPeriod = false;
      this.cxContainExhibiPeriod = false;
      let dateList = {
        companyId: this.$store.state.userInfo.companyId,
        current: "1",
        size: "10"
      };
      this.handeSuerDate(dateList);
    });
    // let dateList = {
    //   companyId: this.$store.state.userInfo.companyId,
    //   current: "1",
    //   size: "10"
    // };
    // this.handeSuerDate(dateList);
  },
  mounted() {
    this.fileid = this.$router.history.current.query;
    this.productTypeOpts = this.osDictionaryData.productTypeOpts;
    // this.exhibitionAreaOpts = this.dictionaryData.exhibitionAreaOpts;
  },
  computed: {
    ...mapGetters("dictionary", ["osDictionaryData"]),
    ...mapGetters("companyInfomation", ["getStand", 'getAddit']),
    // 返回后台数据
    handeReturnDate() {
      return {
        exhibitionArea: this.queryForm.exhibitionArea,
        status: this.queryForm.checkStatus,
        companyId: this.$store.state.userInfo.companyId,
        current: this.pageData.current,
        size: this.pageData.size
      };
    }
  },
  filters: {
    exhibition(val) {
      switch (val) {
        case 'BM02':
          return '卫浴设备';
        case 'MA02':
          return '大型机械及设备';
        case 'CG06':
          return '宠物用品';
        case 'OF03':
          return '体育及旅游休闲用品';
        case 'EH05':
          return '电子消费品及信息产品';
        default:
          return '';
      }
    },
    exhibiType(val) {
      switch (val) {
        case 'SPECIAL_BOOTH':
          return '绿色特装';
        case 'STANDARD_BOOTH':
          return '标摊';
        case 'UNIFICATION_BOOTH':
          return '统一布展';
        case 'CENTER_CHANNEL_BOOTH':
          return '中央通道';
        default:
          return '';
      }
    },
    checkSta(val) {
      switch (val) {
        case '0':
          return '未审核';
        case '1':
          return '审核通过';
        case '2':
          return '审核不通过';
        case '3':
          return '审核中';
        default:
          return '';
      }
    }
  },
  methods: {
    ...mapActions('common', ['getSessionInfo', 'getRuleInfos', 'getProgressTimeInfo']),
    ...mapActions('file', ['delFileInfo']),
    ...mapActions("companyInfomation", ["getGeneralStand", "postGenDeletion", "getGeneralAddi", "getGeneralVenture"]),
    ...mapActions("onlineServiceHomePage", ["getReviewResultInfo"]),
    ...mapActions("enterExManagement", ["getAuditEnterProductInfo"]),
    ...mapActions('corpDataManagement', ['getBasicInfo']),
    // 处理限制情况
    async dealWithLimitTime(res) {
      // 获取参展时间段
      let progressParam = {
        exhibitionNum: res.session,
        subKey: 'TIM_COMMONLY_EXHIBITION_POSITION_APPLY_1'
      };
      await this.getProgressTimeInfo(progressParam).then(progressRes => {
        // 当前时间在参展时间段内可确认参展和编辑
        if (progressRes && progressRes.startTime && progressRes.endTime) {
          let startTime = new Date(progressRes.startTime).getTime();
          let endTime = new Date(progressRes.endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
          let nowTime = new Date().getTime();
          if (nowTime >= startTime && nowTime <= endTime) {
            this.containExhibitionPeriod = true;
          } else {
            // 获取参展时间段
            let ruleParam = {
              exhibitionNum: res.session,
              subKey: 'TIM_COMMONLY_EXHIBITION_POSITION_APPLY_1',
              orgId: this.$store.state.userInfo.companyId
            };
            this.getRuleInfos(ruleParam).then(resp => {
              // 当前时间在参展时间段内可新增，编辑和删除展位
              if (resp && resp[0] && resp[0].startTime && resp[0].endTime) {
                let ruleStartTime = new Date(resp[0].startTime).getTime();
                let ruleEndTime = new Date(resp[0].endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
                let ruleNowTime = new Date().getTime();
                if (ruleNowTime >= ruleStartTime && nowTime <= ruleEndTime) {
                  this.containExhibitionPeriod = true;
                } else {
                  this.containExhibitionPeriod = false;
                }
              } else {
                // 未拿到参展时间段也暂时可以新增，编辑和删除展位
                this.containExhibitionPeriod = false;
              }
            }).catch(e => {
              // 未拿到参展时间段也暂时可以新增，编辑和删除展位
              this.containExhibitionPeriod = true;
            });
          }
        } else {
          // 未拿到参展时间段也暂时可以新增，编辑和删除展位
          this.containExhibitionPeriod = true;
        }
      }).catch(e => {
        // 未拿到参展时间段也暂时可以新增，编辑和删除展位
        this.containExhibitionPeriod = true;
      });
      // 获取参展时间段
      let xtProgressParam = {
        exhibitionNum: res.session,
        subKey: 'TIM_NEW_COMMONLY_EXHIBITION_POSITION_APPLY'
      };
      await this.getProgressTimeInfo(xtProgressParam).then(progressRes => {
        // 当前时间在参展时间段内可确认参展和编辑
        if (progressRes && progressRes.startTime && progressRes.endTime) {
          let startTime = new Date(progressRes.startTime).getTime();
          let endTime = new Date(progressRes.endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
          let nowTime = new Date().getTime();
          if (nowTime >= startTime && nowTime <= endTime) {
            this.cxContainExhibiPeriod = true;
          } else {
            // 获取参展时间段
            let ruleParam = {
              exhibitionNum: res.session,
              subKey: 'TIM_NEW_COMMONLY_EXHIBITION_POSITION_APPLY',
              orgId: this.$store.state.userInfo.companyId
            };
            this.getRuleInfos(ruleParam).then(resp => {
              // 当前时间在参展时间段内可新增，编辑和删除展位
              if (resp && resp[0] && resp[0].startTime && resp[0].endTime) {
                let ruleStartTime = new Date(resp[0].startTime).getTime();
                let ruleEndTime = new Date(resp[0].endTime).getTime() + 24 * 60 * 60 * 1000 - 1;
                let ruleNowTime = new Date().getTime();
                if (ruleNowTime >= ruleStartTime && nowTime <= ruleEndTime) {
                  this.cxContainExhibiPeriod = true;
                } else {
                  this.cxContainExhibiPeriod = false;
                }
              } else {
                // 未拿到参展时间段也暂时可以新增，编辑和删除展位
                this.cxContainExhibiPeriod = false;
              }
            }).catch(e => {
              // 未拿到参展时间段也暂时可以新增，编辑和删除展位
              this.cxContainExhibiPeriod = true;
            });
          }
        } else {
          // 未拿到参展时间段也暂时可以新增，编辑和删除展位
          this.cxContainExhibiPeriod = true;
        }
      }).catch(e => {
        // 未拿到参展时间段也暂时可以新增，编辑和删除展位
        this.cxContainExhibiPeriod = true;
      });
    },
    // 接收后台数据
    handeSuerDate(val) {
      let values = encodeURI(JSON.stringify(val));
      this.getGeneralStand(values).then(res => {
        // 如果当前无数据则隐藏下一步按钮
        if (res.records.length === 0) {
          this.isToNext = false;
        } else {
          this.isToNext = true;
        }
        // for (let key in res.records) {
        //   for (let i in this.exhibitionAreaOpts) {
        //     if (res.records[key].exhibitionArea === this.exhibitionAreaOpts[i].value) {
        //       res.records[key].exhibitionArea = this.exhibitionAreaOpts[i].label;
        //     }
        //   }
        // }
        for (let key in res.records) {
          let newArry = [];
          if (res.records[key].companyUnionList && res.records[key].companyUnionList.length > 0) {
            for (let i in res.records[key].companyUnionList) {
              for (let isval in this.optionList) {
                if (this.optionList[isval].associateId === res.records[key].companyUnionList[i].unionId) {
                  newArry.push(this.optionList[isval].nameCh);
                  res.records[key].unionId = newArry.join('/');
                }
              }
            }
          } else if (res.records[key].companyUnionList.length === 0) {
            res.records[key].unionId = '无联营企业';
          }
        }
        this.tablData = res.records;
      }).catch(e => {
      });
    },
    // 按条件跳转
    toNext(val) {
      this.getReviewResultInfo(this.$store.state.userInfo.companyId).then(res => {
        if (res.reviewResult === '资料未更新') {
          this.$confirm('您的企业资料尚未提交，请前往“我的企业”提交”', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$router.push({
              path: '/basEntInf'
            });
          }).catch(() => {
          });
        } else if (res.reviewResult !== '资料未更新' && val !== 'next') {
          // 判断一般性展位打印按钮
          let ExhibitJson = {
            companyId: this.$store.state.userInfo.companyId,
            exhibitTypeOne: val.exhibitionArea,
            showStatus: 1
          };
          this.getGeneralVenture(ExhibitJson).then(resT => {
            // this.getAuditEnterProductInfo(searchParams).then(resT => {
            if (resT.length < 3) {
              this.$confirm('“本展区的“现场展示展品”小于3个，请前往“我的展品”添加”', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$router.push({
                  path: '/enterExManagement'
                });
              }).catch(() => {
              });
            } else {
              let companyInfoIsCompleted = true;
              // 获取企业信息，若打印表中关于企业信息的部分未完善请用户完善，做打印限制
              this.getBasicInfo(this.$store.state.userInfo.companyId).then(companyInfoRes => {
                if (companyInfoRes) {
                  for (let i = 0; i < this.companyInfo.length; i++) {
                    for (let key in companyInfoRes) {
                      if (key === this.companyInfo[i].key) {
                        this.companyInfo[i].value = companyInfoRes[key];
                        if (this.companyInfo[i].value === '' || !this.companyInfo[i].value) {
                          this.$message({
                            showClose: true,
                            message: this.companyInfo[i].label + '为空，请完善企业资料信息',
                            type: 'error'
                          });
                          companyInfoIsCompleted = false;
                          setTimeout(() => {
                            this.$router.push({ path: '/basEntInf' });
                          }, 500);
                          return;
                        }
                      }
                    }
                  }
                  if (companyInfoIsCompleted) {
                    this.mimeograp(val.demandRecordId);
                  }
                }
              }).catch(e => {
                this.$message({
                  showClose: true,
                  message: '获取企业信息失败',
                  type: 'error'
                });
              });
            }
          });
        } else {
          this.getBasicInfo(this.$store.state.userInfo.companyId).then(resT => {
            if (resT && resT.isConfirmExhibit === '1') {
              this.$alert('请打印《展位申请表》，加盖公章后交给交易团备案，等待审核。<br/>参展易捷通系统仅为广交会展位申请平台，企业是否获得广交会展位，以本地区或本系统交易团安排方案的正式文件通知为准。<br/>交易团获得安排展位后，请根据展位号选择相应联营企业及登记展位负责人。', '提示', {
                dangerouslyUseHTMLString: true
              });
            } else {
              this.$confirm('您的展品未确认，请前往“我的展品”确认', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$router.push({
                  path: '/enterExManagement'
                });
              }).catch(() => {
              });
            }
          });
        }
      });
    },
    // 限制编辑
    handeDbled(row) {
      // 审核状态为未审核或者审核中或者一般性展位申请不在期限内的禁用或者新能源展位申请不在期限内的禁用
      if (row.status === '1'
        || row.status === '3'
        || ((row.exhibitionArea !== 'NE01' && row.exhibitionArea !== 'CG06') && !this.containExhibitionPeriod)
        || ((row.exhibitionArea === 'NE01' || row.exhibitionArea === 'CG06') && !this.cxContainExhibiPeriod)) {
        return true;
      } else {
        return false;
      }
    },
    // 限制删除
    handleDelDisabled(row) {
      // 审核状态为未审核或者审核中或者一般性展位申请不在期限内的禁用或者新能源展位申请不在期限内的禁用
      if (row.status === '1'
        || row.status === '3'
        || ((row.exhibitionArea !== 'NE01' && row.exhibitionArea !== 'CG06') && !this.containExhibitionPeriod)
        || ((row.exhibitionArea === 'NE01' || row.exhibitionArea === 'CG06') && !this.cxContainExhibiPeriod)) {
        return true;
      } else {
        return false;
      }
    },
    // 编辑
    handleEdit(data) {
      this.$router.push({
        path: '/main_exhibits_apply',
        query: {
          data,
          id: 1
        }
      });
    },
    // 删除
    deleteBrandData(data) {
      let _this = this;
      let listDelet = {
        demandRecordId: data.demandRecordId
      };
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.postGenDeletion(listDelet).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
          });
          _this.createQuery();
        }).catch(e => {
          this.$message({
            showClose: true,
            message: e,
            type: 'error'
          });
        }).catch();
        let fileidst = { fileId: this.fileid };
        this.delFileInfo(fileidst);
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });

      // this.createQuery();

    },
    // 新增
    brandAdd() {
      this.$router.push({
        path: '/main_exhibits_apply',
        query: {
          id: 2
        }
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageData.current = val;
      this.createQuery();
    },
    // 查询
    handleQuery() {
      this.pageData.current = 1;
      this.createQuery();
    },
    // 初始化
    createQuery() {
      this.handeSuerDate(this.handeReturnDate);
    },
    // 展区更换
    handleExhibitionChange(val) {
      this.queryForm.productType = '';
      this.queryForm.productIdOne = '';
      this.queryForm.productIdTwo = '';
    },
    // 打印
    // mimeograp(addoped) {
    //   this.$router.push({
    //     path: '/main_exhibits_apply',
    //     query: {
    //       id: 3,
    //       addoped
    //     }
    //   });
    // }

    // 打印
    mimeograp(val) {
      this.$router.push({
        path: '/brandApplyDataPrint',
        query: {
          demandRecordId: val,
          isShow: false
        }
      });
    }
  }
};
</script>
