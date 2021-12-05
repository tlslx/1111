import { quantitativeArrangementApi } from '../../../apis';
export default {
  namespaced: true,
  state: {
    setupTime: [],
    querytimeList: {},
    applicationList: [],
    enterpriseList: {},
    businessList: [],
    batchList: [],
    quaList: [],
    exportList: [],
    auditList: [],
    enterpriseApplication: [],
    productsList: [],
    suppleList: [],
    auditenterList: [],
    exhibitsList: [],
    productcheckList: [],
    jointventureList: [],
    auditjointList: [],
    categoryAList: [],
    categoryAListB: [],
    categoryAListC: [],
    categoryAListD: [],
    categoryAListE: [],
    categoryAListALL: [],
    informList: [],
    photoUrl: '',
    setcantonList: [],
    customCodeList: {},
    customcheckList: [],
    customRemove: [],
    customAddList: [],
    amountcheckList: [],
    amountsult: {},
    checkcantonCodeList: {},
    allproductList: {},
    exhibitionDateList: [],
    provinceDateList: {},
    companyproductExplain: [],
    companyResult: [],
    checkCifj: [],
    getTim: [],
    publishTcc: []
  },
  getters: {
    setupTime: state => state.setupTime,
    querytimeList: state => state.querytimeList,
    applicationList: state => state.applicationList,
    enterpriseList: state => state.enterpriseList,
    businessList: state => state.businessList,
    batchList: state => state.batchList,
    quaList: state => state.quaList,
    exportList: state => state.exportList,
    auditList: state => state.auditList,
    enterpriseApplication: state => state.enterpriseApplication,
    productsList: state => state.productsList,
    suppleList: state => state.suppleList,
    auditenterList: state => state.auditenterList,
    exhibitsList: state => state.exhibitsList,
    productcheckList: state => state.productcheckList,
    jointventureList: state => state.jointventureList,
    auditjointList: state => state.auditjointList,
    categoryAList: state => state.categoryAList,
    categoryAListB: state => state.categoryAListB,
    categoryAListC: state => state.categoryAListC,
    categoryAListD: state => state.categoryAListD,
    categoryAListE: state => state.categoryAListE,
    categoryAListALL: state => state.categoryAListALL,
    informList: state => state.informList,
    photoUrl: state => state.photoUrl,
    setcantonList: state => state.setcantonList,
    customCodeList: state => state.customCodeList,
    customcheckList: state => state.customcheckList,
    customRemove: state => state.customRemove,
    customAddList: state => state.customAddList,
    amountcheckList: state => state.amountcheckList,
    amountsult: state => state.amountsult,
    checkcantonCodeList: state => state.checkcantonCodeList,
    allproductList: state => state.allproductList,
    exhibitionDateList: state => state.exhibitionDateList,
    provinceDateList: state => state.provinceDateList,
    companyproductExplain: state => state.companyproductExplain,
    companyResult: state => state.companyResult,
    checkCifj: state => state.checkCifj,
    getTim: state => state.getTim,
    publishTcc: state => state.publishTcc
  },
  mutations: {
    SETUPTIME(state, payload) {
      state.setupTime = payload;
    },
    QUERYTIME(state, payload) {
      state.querytimeList = payload;
    },
    APPLICATIONLIST(state, payload) {
      state.applicationList = payload;
    },
    ENTERPRISELIST(state, payload) {
      state.enterpriseList = payload;
    },
    BUSINESSLIST(state, payload) {
      state.businessList = payload;
    },
    BATCHLIST(state, payload) {
      state.batchList = payload;
    },
    QUALIST(state, payload) {
      state.quaList = payload;
    },
    EXPORTLIST(state, payload) {
      state.exportList = payload;
    },
    AUDITLIST(state, payload) {
      state.auditList = payload;
    },
    ENTERPRISEAPPLICATION(state, payload) {
      state.enterpriseApplication = payload;
    },
    PRODUCTSLIST(state, payload) {
      state.productsList = payload;
    },
    SUPPLELIST(state, payload) {
      state.suppleList = payload;
    },
    AUDITENTERLIST(state, payload) {
      state.auditenterList = payload;
    },
    EXHIBITSLIST(state, payload) {
      state.exhibitsList = payload;
    },
    PRODUCTCKECKLIST(state, payload) {
      state.productcheckList = payload;
    },
    JOINTVENTURELIST(state, payload) {
      state.jointventureList = payload;
    },
    AUDITJOINTLIST(state, payload) {
      state.auditjointList = payload;
    },
    CATEGRORYALIST(state, payload) {
      state.categoryAList = payload;
    },
    CATEGRORYALISTB(state, payload) {
      state.categoryAListB = payload;
    },
    CATEGRORYALISTC(state, payload) {
      state.categoryAListC = payload;
    },
    CATEGRORYALISTD(state, payload) {
      state.categoryAListD = payload;
    },
    CATEGRORYALISTE(state, payload) {
      state.categoryAListE = payload;
    },
    CATEGRORYALISTALL(state, payload) {
      state.categoryAListALL = payload;
    },
    INFORMLIST(state, payload) {
      state.informList = payload;
    },
    PHOTOURL(state, payload) {
      state.photoUrl = payload;
    },
    SETCANTONLIST(state, payload) {
      state.setcantonList = payload;
    },
    CUSTOMCODELIST(state, payload) {
      state.customCodeList = payload;
    },
    CUSTOMCHECKLIST(state, payload) {
      state.customcheckList = payload;
    },
    CUSTOMREMOVELIST(state, payload) {
      state.customRemove = payload;
    },
    CUSTOMADDLIST(state, payload) {
      state.customAddList = payload;
    },
    AMOUNTCHECKLIST(state, payload) {
      state.amountcheckList = payload;
    },
    AMOUNTSULT(state, payload) {
      state.amountsult = payload;
    },
    CHECKCANTONCODELIST(state, payload) {
      state.checkcantonCodeList = payload;
    },
    ALLPRODUCTLIST(state, payload) {
      state.allproductList = payload;
    },
    EXHIBITIONDATELIST(state, payload) {
      state.exhibitionDateList = payload;
    },
    PROVINCEDATELIST(state, payload) {
      state.provinceDateList = payload;
    },
    COMPANYPRODUCTEXPLAIN(state, payload) {
      state.companyproductExplain = payload;
    },
    COMPANYRESULT(state, payload) {
      state.companyResult = payload;
    },
    CHECK_CIFJ(state, payload) {
      state.checkCifj = payload;
    },
    GET_TIM(state, payload) {
      state.getTim = payload;
    },
    PUBLISH_TCC(state, payload) {
      state.publishTcc = payload;
    }
  },
  actions: {
    // 设置保存企业审核结果公布批次时间
    getSetuptime({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getsetuptime(obj).then(res => {
          commit('SETUPTIME', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 查询设置企业审核结果公布批次时间
    getQuerytime({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getquerytime(obj).then(res => {
          commit('QUERYTIME', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //交易团审核企业申请列表（汇总查询）
    getApplicationList({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getapplicationList(obj).then(res => {
          for (let key in res.records) {
            if (res.records[key].subClusterCheckStatus === '0') {
              res.records[key].subClusterCheckStatus = '未审核';
            } else if (res.records[key].subClusterCheckStatus === '1') {
              res.records[key].subClusterCheckStatus = '通过';
            } else if (res.records[key].subClusterCheckStatus === '2') {
              res.records[key].subClusterCheckStatus = '不通过';
            } else if (res.records[key].subClusterCheckStatus === '3') {
              res.records[key].subClusterCheckStatus = '审核中';
            }
            if (res.records[key].boothType === '01') {
              res.records[key].boothType = '一般性';
            } else if (res.records[key].boothType === '02') {
              res.records[key].boothType = '品牌';
            } 
            if (res.records[key].clusterCheckStatus === '0') {
              res.records[key].clusterCheckStatus = '未审核';
            } else if (res.records[key].clusterCheckStatus === '1') {
              res.records[key].clusterCheckStatus = '通过';
            } else if ((res.records[key].clusterCheckStatus === '2')) {
              res.records[key].clusterCheckStatus = '不通过';
            } else if (res.records[key].clusterCheckStatus === '3') {
              res.records[key].clusterCheckStatus = '审核中';
            }
          }
          commit('APPLICATIONLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //查看企业资料
    getEnterpriseinformation({ dispatch, commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getenterpriseinformation(obj).then(res => {
          let newArry = [
          ];
          let twoArry = [];
          let newRes = [];
          let imgDate = {};
          let checkStatus = {};
          let newpro = '';
          for (let key in res) {
            if (key === 'forbidJoin') {
              if (res[key] === false) {
                res[key] = '否';
              } else if (res[key] === true) {
                res[key] = '是';
              }
            }
            let newobj = {};
            newobj.name = key;
            newobj.type = res[key];
            newArry.push(newobj);
          }
          for (let key in newArry) {
            let newobj = {};
            if (newArry[key].name === 'listedStatus') {
              newobj.name = '是否上市公司:';
              if (newArry[key].type === '02') {
                newobj.type = '否';
              } else if (newArry[key].type === '01') {
                newobj.type = '是';
              }
              twoArry.push(newobj);
            } else if (newArry[key].name === 'plantArea') {
              newobj.name = '厂房面积：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'listedPlace') {
              newobj.name = '上市地点：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'companyName') {
              newobj.name = '企业中文名称: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'companyNameEn') {
              newobj.name = '企业英文名称: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'enterpriseAbbreviation') {
              newobj.name = '企业公司简称: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'mainProductKeywordCh') {
              newobj.name = '主营产品关键字（中文）:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'stockCode') {
              newobj.name = '股票代码:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'mainProductKeywordEn') {
              newobj.name = '主营产品关键字（英文）：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'companyPpl') {
              newobj.name = '公司名称分词：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'incorporationYear') {
              newobj.name = '公司成立年份：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'businessLicenceNo') {
              newobj.name = '纳税人识别号/统一社会信用代码:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'registeredCapital') {
              newobj.name = '注册资本:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'tradeForm') {
              newobj.name = '贸易形式:';
              // newobj.type = newArry[key].type;
              newobj.typeones = newArry[key].type;
              newobj.type = '';
              twoArry.push(newobj);
            } else if (newArry[key].name === 'employeesCount') {
              newobj.name = '员工数量:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'companyLogoId') {
              imgDate.nametwo = '公司Logo:';
              if (newArry[key].type && newArry[key].type !== '') {
                let imgUrlList = newArry[key].type.split(',');
                for (let i in imgUrlList) {
                  imgDate.typetwo = process.env.API_NA_URL + "/api/file/get?fileId=" + imgUrlList[i];
                }
              } else {
                imgDate.typetwo = newArry[key].type;
              }
              imgDate.isimg = true;
              // newobj.type = newArry[key].type;
            } else if (newArry[key].name === 'clusterCheckStatus') {
              checkStatus.nametwo = '交易团审核结果:';
              if (newArry[key].type === '0') {
                checkStatus.typetwo = '未审核';
              } else if (newArry[key].type === '1') {
                checkStatus.typetwo = '通过';
              } else if (newArry[key].type === '2') {
                checkStatus.typetwo = '不通过';
              }
            } else if (newArry[key].name === 'subClusterCheckStatus') {
              checkStatus.name = '交易团分团审核结果:';
              if (newArry[key].type === '0') {
                checkStatus.type = '未审核';
              } else if (newArry[key].type === '1') {
                checkStatus.type = '通过';
              } else if (newArry[key].type === '2') {
                checkStatus.type = '不通过';
              }
            } else if (newArry[key].name === 'productionEmployeesCount') {
              newobj.name = '生产部门人数:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'developEmployeesCount') {
              newobj.name = '研发部门人数:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'companyImageId') {
              imgDate.name = '公司形象图:';
              // newobj.type = newArry[key].type;
              if (newArry[key].type && newArry[key].type !== '') {
                let imgUrlList = newArry[key].type.split(',');
                for (let i in imgUrlList) {
                  imgDate.type = process.env.API_NA_URL + "/api/file/get?fileId=" + imgUrlList[i];
                }
              } else {
                imgDate.type = newArry[key].type;
              }
              imgDate.isimg = true;
            } else if (newArry[key].name === 'companyProfileCh') {
              newobj.name = '公司简介（中文）:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'qualityEmployeesCount') {
              newobj.name = '质检部门人数:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'firstExhibitionDate') {
              newobj.name = '企业首次参展时间:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'brand') {
              newobj.name = '品牌中文名称:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            // } else if (newArry[key].name === '') {
            //   newobj.name = '商标（logo）：';
            //   // newobj.type = newArry[key].type;
            //   if (newArry[key].type) {
            //     let imgUrlList = newArry[key].type.split(',');
            //     for (let i in imgUrlList) {
            //       newobj.type = process.env.API_NA_URL + "/api/file/get?fileId=" + imgUrlList[i];
            //     }
            //   }
            //   twoArry.push(newobj);
            //
            } else if (newArry[key].name === 'nationalAwardsCount') {
              newobj.name = '国家级奖励数量: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'provincialAwardsCount') {
              newobj.name = '省级奖励数量: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'registeredTrademarkCount') {
              newobj.name = '海外注册商标的国家及地区数量: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'inventionPatentsCount') {
              newobj.name = '发明专利数: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'internationallytCertificationCount') {
              newobj.name = '国际/行业通行的管理体系认证的数量: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'utilityPatentsCount') {
              newobj.name = '实用新型专利数: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'industryCertificationCount') {
              newobj.name = '面向企业的行业认证数量: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'patentsDesignCount') {
              newobj.name = '外观设计专利数: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'productCertificationQuantity') {
              newobj.name = '面向产品或生产线的行业认证数量: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'province' || newArry[key].name === 'city') {
              if (newArry[key].name === 'province') {
                newpro = newArry[key].type;
              } else if (newArry[key].name === 'city') {
                if (newpro != null) {
                  newobj.name = '省份/城市:';
                  newobj.type = newpro + ',' + newArry[key].type;
                  twoArry.push(newobj);
                } else {
                  newobj.name = '省份/城市:';
                  newobj.type = newArry[key].type;
                  newobj.iscity = true;
                  twoArry.push(newobj);
                }
              }
            } else if (newArry[key].name === 'dedicatedEmail') {
              newobj.name = '广交会参展业务专用联系电子邮件: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'businessContactsCh') {
              newobj.name = '业务联系人姓名（中文）：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'website') {
              newobj.name = '网址：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'businessContactsEn') {
              newobj.name = '业务联系人姓名（英文）：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'hideContactInfo') {
              newobj.name = '是否在“展商展品查询”中隐藏联系方式：';
              // newobj.type = newArry[key].type;
              if (newArry[key].type === '01') {
                newobj.type = '是';
              } else {
                newobj.type = '否';
              }
              twoArry.push(newobj);
            } else if (newArry[key].name === 'businessContactsPosition') {
              newobj.name = '职位: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'delegationName') {
              newobj.name = '所属交易团: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'telephone') {
              newobj.name = '电话: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === '') {
              newobj.name = '交易团联系方式: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'phone') {
              newobj.name = '手机: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'adressCh') {
              newobj.name = '企业地址（中文）：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'fax') {
              newobj.name = '传真：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'adressEn') {
              newobj.name = '企业地址（英文）：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'businessContactsEmail') {
              newobj.name = '业务联系电子邮件: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'postalCode') {
              newobj.name = '邮政编码: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'participationGoal') {
              newobj.name = '参展目的（多选）: ';
              // newobj.type = newArry[key].type;
              newobj.typeonef = newArry[key].type;
              newobj.type = '';
              twoArry.push(newobj);
            } else if (newArry[key].name === 'mainCustomersType') {
              newobj.name = '主要目标客户类型（多选）：';
              newobj.typeone = newArry[key].type;
              newobj.type = '';
              twoArry.push(newobj);
            } else if (newArry[key].name === 'nternalTradeStatus') {
              newobj.name = '是否有内贸业务: ';
              // newobj.type = newArry[key].type;
              if (newArry[key].type === '01') {
                newobj.type = '是';
              } else {
                newobj.type = '否';
              }
              twoArry.push(newobj);
            } else if (newArry[key].name === '') {
              newobj.name = '参展产品: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'firstThreeCustomersCountry') {
              newobj.name = '上年度出口额前三位客户的国别或地区：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === '') {
              newobj.name = '申请展位: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'mainTargetMarket') {
              newobj.name = '主要目标市场（多选）：';
              newobj.typeonet = newArry[key].type;
              newobj.type = '';
              twoArry.push(newobj);
            } else if (newArry[key].name === 'cantonCode') {
              newobj.name = '广交会编码：';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            }
          }
          for (let key in twoArry) {
            if ((key - 0) % 2 === 0) {
              twoArry[key].name = twoArry[key].name;
              twoArry[key].type = twoArry[key].type;
            } else {
              twoArry[key].nametwo = twoArry[key].name;
              twoArry[key].typetwo = twoArry[key].type;
            }
            if (twoArry[key].name && twoArry[key].nametwo) {
              delete twoArry[key].name;
              delete twoArry[key].type;
            }
          }
          for (let key in twoArry) {
            if (twoArry[key].name) {
              twoArry[key] = Object.assign(twoArry[key], twoArry[key - 0 + 1]);
              newRes.push(twoArry[key]);
            }
          }

          newRes.push(imgDate);
          newRes.push(checkStatus);
          commit('ENTERPRISELIST', res);
          resolve(newRes);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //获取审核结果的公布批次时间
    getBatchtime({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbatchtime(obj).then(res => {
          // for (let key in res) {
          //   if (res[key].publishBatch === "publishBatchOne") {
          //     res[key].label = '第一批' + res[key].publishDate;
          //   } else if (res[key].publishBatch === "publishBatchTwo") {
          //     res[key].label = '第二批公布时间' + res[key].publishDate;
          //   } else if (res[key].publishBatch === "publishBatchThree") {
          //     res[key].label = '第三批公布时间' + res[key].publishDate;
          //   } else if (res[key].publishBatch === "") {
          //     res[key].label = res[key].publishBatchName;
          //   }
          // }
          commit('BATCHLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业资质审核（交易团和交易团分团分别审核）
    getQualificationaudit({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getqualificationaudit(obj).then(res => {
          commit('QUALIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业进出口经营权
    getExportOperating({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getexportOperating(obj).then(res => {
          for (let key in res) {
            res[key].imgfile = [];
            if (res[key].subClusterCheckStatus === '0') {
              res[key].subClusterCheckStatus = '未审核';
            } else if (res[key].subClusterCheckStatus === '1') {
              res[key].subClusterCheckStatus = '通过';
            } else {
              res[key].subClusterCheckStatus = '不通过';
            }
            if (res[key].clusterCheckStatus === '0') {
              res[key].clusterCheckStatus = '未审核';
            } else if (res[key].clusterCheckStatus === '1') {
              res[key].clusterCheckStatus = '通过';
            } else {
              res[key].clusterCheckStatus = '不通过';
            }
            if (res[key].attachment) {
              let imgUrlList = res[key].attachment.split(',');
              for (let i in imgUrlList) {
                let imgfile = process.env.API_NA_URL + "/api/file/get?fileId=" + imgUrlList[i];
                res[key].imgfile.push(imgfile);
              }
            }
          }
          commit('EXPORTLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业进出口经营权审核
    getBusinessaudit({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbusinessaudit(obj).then(res => {
          commit('AUDITLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业展位申请列表
    getEnterpriseapplication({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getenterpriseapplication(obj).then(res => {
          for (let key in res) {
            res[key].operating = true;
            if (res[key].matching === '1') {
              res[key].matching = '是';
            } else {
              res[key].matching = '否';
            }
            if (res[key].exhibitionType === 'CENTER_CHANNEL_BOOTH') {
              res[key].exhibitionType = '中央通道';
            } else if (res[key].exhibitionType === 'STANDARD_BOOTH') {
              res[key].exhibitionType = '标摊';
            } else if (res[key].exhibitionType === 'SPECIAL_BOOTH') {
              res[key].exhibitionType = '特装';
            } else if (res[key].exhibitionType === 'UNIFICATION_BOOTH') {
              res[key].exhibitionType = '统一布展';
            }
            if (res[key].boothType === '01') {
              res[key].boothType = '一般性';
            } else if (res[key].boothType === '02') {
              res[key].boothType = '品牌';
            }
            if (res[key].isContacted === '1') {
              res[key].isContacted = '是';
            } else {
              res[key].isContacted = '否';
            }
            if (res[key].subClusterCheckStatus === '0') {
              res[key].subClusterCheckStatus = '未审核';
            } else if (res[key].subClusterCheckStatus === '1') {
              res[key].subClusterCheckStatus = '通过';
            } else {
              res[key].subClusterCheckStatus = '不通过';
            }
            if (res[key].clusterCheckStatus === '0') {
              res[key].clusterCheckStatus = '未审核';
            } else if (res[key].clusterCheckStatus === '1') {
              res[key].clusterCheckStatus = '通过';
            } else {
              res[key].clusterCheckStatus = '不通过';
            }
          }
          commit('ENTERPRISEAPPLICATION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业展位申请列表(主要产品)
    getEnterpriseProducts({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getenterpriseProducts(obj).then(res => {
          commit('PRODUCTSLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业展位申请列表(追加申请)
    getSupplementaryapplication({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getsupplementaryapplication(obj).then(res => {
          commit('SUPPLELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    ////审核企业展位申请
    getAuditenterpriseBooth({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getauditenterpriseBooth(obj).then(res => {
          commit('AUDITENTERLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业展品信息列表
    getExhibitsinformation({ dispatch, commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getexhibitsinformation(obj).then(res => {
          // res.push({ productImageId: null });
          // let res = [{
          //   productImageId: '5cb96a1bdc0e820001880741'
          // }];
          for (let key in res.records) {
            res.records[key].imgfile = [];
            res.records[key].operating = true;
            if (res.records[key].forbid === '0') {
              res.records[key].forbid = '未审核';
            } else if (res.records[key].forbid === '1') {
              res.records[key].forbid = '否';
              // res.records[key].newforbid = '通过';
            } else if (res.records[key].forbid === '2') {
              res.records[key].forbid = '是';
              // res.records[key].newforbid = '不通过';
            }
            if (res.records[key].subClusterCheckStatus === '0') {
              res.records[key].subClusterCheckStatus = '未审核';
            } else if (res.records[key].subClusterCheckStatus === '1') {
              res.records[key].subClusterCheckStatus = '通过';
            } else if (res.records[key].subClusterCheckStatus === '2') {
              res.records[key].subClusterCheckStatus = '不通过';
            }
            if (res.records[key].clusterCheckStatus === '0') {
              res.records[key].clusterCheckStatus = '未审核';
            } else if (res.records[key].clusterCheckStatus === '1') {
              res.records[key].clusterCheckStatus = '通过';
            } else if (res.records[key].clusterCheckStatus === '2') {
              res.records[key].clusterCheckStatus = '不通过';
            }
            res.records[key].productType = res.records[key].exhibitTypeOneName + '|' + res.records[key].exhibitTypeTwoName + '|' + res.records[key].exhibitTypeThreeName;
            if (res.records[key].exhibitImageId) {
              let imgUrlList = res.records[key].exhibitImageId.split(',');
              for (let i in imgUrlList) {
                let imgfile = process.env.API_NA_URL + "/api/file/get?fileId=" + imgUrlList[i];
                res.records[key].imgfile.push(imgfile);
              }
            }
          }
          commit('EXHIBITSLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //审核企业展品信息
    getProductcheck({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getproductcheck(obj).then(res => {
          commit('PRODUCTCKECKLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    ///查询企业联营企业列表
    getJointventure({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getjointventure(obj).then(res => {
          for (let key in res) {
            res[key].operating = true;
            if (res[key].subClusterCheckStatus === '0') {
              res[key].subClusterCheckStatus = '未审核';
            } else if (res[key].subClusterCheckStatus === '1') {
              res[key].subClusterCheckStatus = '通过';
            } else if (res[key].subClusterCheckStatus === '2') {
              res[key].subClusterCheckStatus = '不通过';
            }
            if (res[key].clusterCheckStatus === '0') {
              res[key].clusterCheckStatus = '未审核';
            } else if (res[key].clusterCheckStatus === '1') {
              res[key].clusterCheckStatus = '通过';
            } else if (res[key].clusterCheckStatus === '2') {
              res[key].clusterCheckStatus = '不通过';
            }
          }
          commit('JOINTVENTURELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //审核联营企业
    getAuditjoint({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getauditjoint(obj).then(res => {
          commit('AUDITJOINTLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 商协会复核查询
    getBusinessreview({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbusinessreview(obj).then(res => {
          for (let key in res.records) {
            res.records[key].operating = true;
            if (res.records[key].boothType === '01') {
              res.records[key].boothType = '一般性';
            } else if (res.records[key].boothType === '02') {
              res.records[key].boothType = '品牌';
            }
            if (res.records[key].categoryA === '0') {
              res.records[key].categoryA = '未审核';
            } else if (res.records[key].categoryA === '1') {
              res.records[key].categoryA = '合格';
            } else if (res.records[key].categoryA === '2') {
              res.records[key].categoryA = '不合格';
            }
            if (res.records[key].exhibitionType === 'CENTER_CHANNEL_BOOTH') {
              res.records[key].exhibitionType = '中央通道';
            } else if (res.records[key].exhibitionType === 'STANDARD_BOOTH') {
              res.records[key].exhibitionType = '标摊';
            } else if (res.records[key].exhibitionType === 'SPECIAL_BOOTH') {
              res.records[key].exhibitionType = '特装';
            } else if (res.records[key].exhibitionType === 'UNIFICATION_BOOTH') {
              res.records[key].exhibitionType = '统一布展';
            }
            if (res.records[key].categoryB === '0') {
              res.records[key].categoryB = '未审核';
            } else if (res.records[key].categoryB === '1') {
              res.records[key].categoryB = '合格';
            } else if (res.records[key].categoryB === '2') {
              res.records[key].categoryB = '不合格';
            }
            if (res.records[key].categoryC === '0') {
              res.records[key].categoryC = '未审核';
            } else if (res.records[key].categoryC === '1') {
              res.records[key].categoryC = '合格';
            } else if (res.records[key].categoryC === '2') {
              res.records[key].categoryC = '不合格';
            }
            if (res.records[key].categoryD === '0') {
              res.records[key].categoryD = '未审核';
            } else if (res.records[key].categoryD === '1') {
              res.records[key].categoryD = '合格';
            } else if (res.records[key].categoryD === '2') {
              res.records[key].categoryD = '不合格';
            }
            if (res.records[key].categoryE === '0') {
              res.records[key].categoryE = '未审核';
            } else if (res.records[key].categoryE === '1') {
              res.records[key].categoryE = '合格';
            } else if (res.records[key].categoryE === '2') {
              res.records[key].categoryE = '不合格';
            }
            if (res.records[key].overallRatingStatus === '0') {
              res.records[key].overallRatingStatus = '未审核';
            } else if (res.records[key].overallRatingStatus === '1') {
              res.records[key].overallRatingStatus = '审核通过';
            } else if (res.records[key].overallRatingStatus === '2') {
              res.records[key].overallRatingStatus = '审核不通过';
            }
            if (res.records[key].noticeStatus === '0') {
              res.records[key].noticeStatus = '未通知';
            } else if (res.records[key].noticeStatus === '1') {
              res.records[key].noticeStatus = '已通知';
            }
            if (res.records[key].productLong.length > 0 || res.records[key].productWidth.length > 0 || res.records[key].productHeight.length > 0) {
              res.records[key].newDate = res.records[key].productLong + '*' + res.records[key].productWidth + '*' + res.records[key].productHeight;
            }
          }
          commit('BUSINESSLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //商协会复核查询(a类地址)
    getBusinesscategoryA({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbusinesscategoryA(obj).then(res => {
          commit('CATEGRORYALIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //商协会复核查询(b类地址)
    getBusinesscategoryB({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbusinesscategoryB(obj).then(res => {
          commit('CATEGRORYALISTB', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //商协会复核查询(C类地址)
    getBusinesscategoryC({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbusinesscategoryC(obj).then(res => {
          commit('CATEGRORYALISTC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //商协会复核查询(D类地址)
    getBusinesscategoryD({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbusinesscategoryD(obj).then(res => {
          commit('CATEGRORYALISTD', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //商协会复核查询(E类地址)
    getBusinesscategoryE({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbusinesscategoryE(obj).then(res => {
          commit('CATEGRORYALISTE', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //商协会复核查询(总体审核)
    getBusinesscategoryALL({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbusinesscategoryALL(obj).then(res => {
          commit('CATEGRORYALISTALL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //商协会通知企业(通知企业按钮)
    getInformEnterprises({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getinformEnterprises(obj).then(res => {
          commit('INFORMLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //获取图片地址
    getPhotourl({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getphotourl(obj).then(res => {
          commit('PHOTOURL', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //修改广交会编码
    getSetCantonCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getsetCantonCode(obj).then(res => {
          commit('SETCANTONLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业海关编码列表
    getCustomCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getcustomCode(obj).then(res => {
          for (let key in res.customCodeList) {
            res.customCodeList[key].operating = true;
            res.customCodeList[key].imgfile = [];
            if (res.customCodeList[key].relationship === 'ENTERPRISE') {
              res.customCodeList[key].relationship = '本企业';
            } else if (res.customCodeList[key].relationship === 'SUBSIDARYCOMPANY') {
              res.customCodeList[key].relationship = '全资子公司';
            } else if (res.customCodeList[key].relationship === 'HOLDCOMPANY') {
              res.customCodeList[key].relationship = '控股子公司';
            }
            if (res.customCodeList[key].subClusterCheckStatus === '0') {
              res.customCodeList[key].subClusterCheckStatus = '未审核';
            } else if (res.customCodeList[key].subClusterCheckStatus === '1') {
              res.customCodeList[key].subClusterCheckStatus = '通过';
            } else if (res.customCodeList[key].subClusterCheckStatus === '2') {
              res.customCodeList[key].subClusterCheckStatus = '不通过';
            }
            if (res.customCodeList[key].clusterCheckStatus === '0') {
              res.customCodeList[key].clusterCheckStatus = '未审核';
            } else if (res.customCodeList[key].clusterCheckStatus === '1') {
              res.customCodeList[key].clusterCheckStatus = '通过';
            } else if (res.customCodeList[key].clusterCheckStatus === '2') {
              res.customCodeList[key].clusterCheckStatus = '不通过';
            }
            if (res.customCodeList[key].attachment) {
              let imgUrlList = res.customCodeList[key].attachment.split(',');
              for (let i in imgUrlList) {
                let imgfile = process.env.API_NA_URL + "/api/file/get?fileId=" + imgUrlList[i];
                res.customCodeList[key].imgfile.push(imgfile);
              }
            }
          }
          commit('CUSTOMCODELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //审核海关编码
    getCustomcheck({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getcustomcheck(obj).then(res => {
          commit('CUSTOMCHECKLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //海关编码删除
    getCustomRemove({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getcustomRemove(obj).then(res => {
          commit('CUSTOMREMOVELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //海关编码新增
    getCustomadd({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getcustomadd(obj).then(res => {
          commit('CUSTOMADDLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //海关编码新增
    getAmountcheck({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getamountcheck(obj).then(res => {
          commit('AMOUNTCHECKLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //海关编码出口额是否达标
    getAmountasult({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getamountasult(obj).then(res => {
          if (res.examineStatus === '0') {
            res.examineStatus = '未审核';
              //未审核
          } else if (res.examineStatus === '1') {
            res.examineStatus = '是';
            //审核通过
          } else if (res.examineStatus === '2') {
            res.examineStatus = '否';
          }
          commit('AMOUNTSULT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //广交会编码判重
    getCheckCantonCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getcheckCantonCode(obj).then(res => {
          commit('CHECKCANTONCODELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业展品信息批量审核
    getAllproduct({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getallproduct(obj).then(res => {
          commit('ALLPRODUCTLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业展品信息批量审核
    getExhibitionDate({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getexhibitionDate(obj).then(res => {
          commit('EXHIBITIONDATELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //交易团审核企业信息(列表城市信息)
    getProvinceDate({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getprovinceDate(obj).then(res => {
          commit('PROVINCEDATELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //交易团审核企业信息(列表城市信息)
    getCompanyProductExplain({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getcompanyProductExplain(obj).then(res => {
          commit('COMPANYPRODUCTEXPLAIN', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //企业展品信息文字审核结果  修改人 李康 时间 19/5/19  将通过 不通过 修改为 含禁止参展展品 和 不含禁止参展展品
    getCompanyresult({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getcompanyresult(obj).then(res => {
          for (let key in res) {
            if (key === 'clusterCheckStatus') {
              if (res[key] === '0') {
                res[key] = '未审核';
              } else if (res[key] === '1') {
                res[key] = '不含禁止参展展品';
              } else if (res[key] === '2') {
                res[key] = '含禁止参展展品';
              }
            }
            if (key === 'subClusterCheckStatus') {
              if (res[key] === '0') {
                res[key] = '未审核';
              } else if (res[key] === '1') {
                res[key] = '不含禁止参展展品';
              } else if (res[key] === '2') {
                res[key] = '含禁止参展展品';
              }
            }
          }
          commit('COMPANYRESULT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核接口   李康  添加于 5/20
    checkcompanyInfoForbidJoin({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.checkCompanyInfoForbidJoin(obj).then(res => {
          commit('CHECK_CIFJ', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 公布批次时间的接口   李康  添加于 5/20
    gettime({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getTime(obj).then(res => {
          commit('GET_TIM', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 设置企业资料公布批次时间   李康  添加于 5/22
    publishtimeCheckCompany({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.publishTimeCheckCompany(obj).then(res => {
          commit('PUBLISH_TCC', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    // 审核通过  jcrao   添加于  5/22
    postCompanyCheckPass({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.postCompanyCheckPassData(obj).then(res => {
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    }
  }
};
