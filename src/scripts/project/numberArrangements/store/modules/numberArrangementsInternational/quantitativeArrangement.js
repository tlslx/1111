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
    // ????????????????????????????????????????????????
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
    // ????????????????????????????????????????????????
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
    //???????????????????????????????????????????????????
    getApplicationList({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getapplicationList(obj).then(res => {
          for (let key in res.records) {
            if (res.records[key].subClusterCheckStatus === '0') {
              res.records[key].subClusterCheckStatus = '?????????';
            } else if (res.records[key].subClusterCheckStatus === '1') {
              res.records[key].subClusterCheckStatus = '??????';
            } else if (res.records[key].subClusterCheckStatus === '2') {
              res.records[key].subClusterCheckStatus = '?????????';
            } else if (res.records[key].subClusterCheckStatus === '3') {
              res.records[key].subClusterCheckStatus = '?????????';
            }
            if (res.records[key].boothType === '01') {
              res.records[key].boothType = '?????????';
            } else if (res.records[key].boothType === '02') {
              res.records[key].boothType = '??????';
            } 
            if (res.records[key].clusterCheckStatus === '0') {
              res.records[key].clusterCheckStatus = '?????????';
            } else if (res.records[key].clusterCheckStatus === '1') {
              res.records[key].clusterCheckStatus = '??????';
            } else if ((res.records[key].clusterCheckStatus === '2')) {
              res.records[key].clusterCheckStatus = '?????????';
            } else if (res.records[key].clusterCheckStatus === '3') {
              res.records[key].clusterCheckStatus = '?????????';
            }
          }
          commit('APPLICATIONLIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //??????????????????
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
                res[key] = '???';
              } else if (res[key] === true) {
                res[key] = '???';
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
              newobj.name = '??????????????????:';
              if (newArry[key].type === '02') {
                newobj.type = '???';
              } else if (newArry[key].type === '01') {
                newobj.type = '???';
              }
              twoArry.push(newobj);
            } else if (newArry[key].name === 'plantArea') {
              newobj.name = '???????????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'listedPlace') {
              newobj.name = '???????????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'companyName') {
              newobj.name = '??????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'companyNameEn') {
              newobj.name = '??????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'enterpriseAbbreviation') {
              newobj.name = '??????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'mainProductKeywordCh') {
              newobj.name = '?????????????????????????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'stockCode') {
              newobj.name = '????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'mainProductKeywordEn') {
              newobj.name = '????????????????????????????????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'companyPpl') {
              newobj.name = '?????????????????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'incorporationYear') {
              newobj.name = '?????????????????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'businessLicenceNo') {
              newobj.name = '??????????????????/????????????????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'registeredCapital') {
              newobj.name = '????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'tradeForm') {
              newobj.name = '????????????:';
              // newobj.type = newArry[key].type;
              newobj.typeones = newArry[key].type;
              newobj.type = '';
              twoArry.push(newobj);
            } else if (newArry[key].name === 'employeesCount') {
              newobj.name = '????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'companyLogoId') {
              imgDate.nametwo = '??????Logo:';
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
              checkStatus.nametwo = '?????????????????????:';
              if (newArry[key].type === '0') {
                checkStatus.typetwo = '?????????';
              } else if (newArry[key].type === '1') {
                checkStatus.typetwo = '??????';
              } else if (newArry[key].type === '2') {
                checkStatus.typetwo = '?????????';
              }
            } else if (newArry[key].name === 'subClusterCheckStatus') {
              checkStatus.name = '???????????????????????????:';
              if (newArry[key].type === '0') {
                checkStatus.type = '?????????';
              } else if (newArry[key].type === '1') {
                checkStatus.type = '??????';
              } else if (newArry[key].type === '2') {
                checkStatus.type = '?????????';
              }
            } else if (newArry[key].name === 'productionEmployeesCount') {
              newobj.name = '??????????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'developEmployeesCount') {
              newobj.name = '??????????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'companyImageId') {
              imgDate.name = '???????????????:';
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
              newobj.name = '????????????????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'qualityEmployeesCount') {
              newobj.name = '??????????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'firstExhibitionDate') {
              newobj.name = '????????????????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'brand') {
              newobj.name = '??????????????????:';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            // } else if (newArry[key].name === '') {
            //   newobj.name = '?????????logo??????';
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
              newobj.name = '?????????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'provincialAwardsCount') {
              newobj.name = '??????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'registeredTrademarkCount') {
              newobj.name = '??????????????????????????????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'inventionPatentsCount') {
              newobj.name = '???????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'internationallytCertificationCount') {
              newobj.name = '??????/??????????????????????????????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'utilityPatentsCount') {
              newobj.name = '?????????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'industryCertificationCount') {
              newobj.name = '?????????????????????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'patentsDesignCount') {
              newobj.name = '?????????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'productCertificationQuantity') {
              newobj.name = '?????????????????????????????????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'province' || newArry[key].name === 'city') {
              if (newArry[key].name === 'province') {
                newpro = newArry[key].type;
              } else if (newArry[key].name === 'city') {
                if (newpro != null) {
                  newobj.name = '??????/??????:';
                  newobj.type = newpro + ',' + newArry[key].type;
                  twoArry.push(newobj);
                } else {
                  newobj.name = '??????/??????:';
                  newobj.type = newArry[key].type;
                  newobj.iscity = true;
                  twoArry.push(newobj);
                }
              }
            } else if (newArry[key].name === 'dedicatedEmail') {
              newobj.name = '?????????????????????????????????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'businessContactsCh') {
              newobj.name = '????????????????????????????????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'website') {
              newobj.name = '?????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'businessContactsEn') {
              newobj.name = '????????????????????????????????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'hideContactInfo') {
              newobj.name = '?????????????????????????????????????????????????????????';
              // newobj.type = newArry[key].type;
              if (newArry[key].type === '01') {
                newobj.type = '???';
              } else {
                newobj.type = '???';
              }
              twoArry.push(newobj);
            } else if (newArry[key].name === 'businessContactsPosition') {
              newobj.name = '??????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'delegationName') {
              newobj.name = '???????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'telephone') {
              newobj.name = '??????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === '') {
              newobj.name = '?????????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'phone') {
              newobj.name = '??????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'adressCh') {
              newobj.name = '???????????????????????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'fax') {
              newobj.name = '?????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'adressEn') {
              newobj.name = '???????????????????????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'businessContactsEmail') {
              newobj.name = '????????????????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'postalCode') {
              newobj.name = '????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'participationGoal') {
              newobj.name = '????????????????????????: ';
              // newobj.type = newArry[key].type;
              newobj.typeonef = newArry[key].type;
              newobj.type = '';
              twoArry.push(newobj);
            } else if (newArry[key].name === 'mainCustomersType') {
              newobj.name = '???????????????????????????????????????';
              newobj.typeone = newArry[key].type;
              newobj.type = '';
              twoArry.push(newobj);
            } else if (newArry[key].name === 'nternalTradeStatus') {
              newobj.name = '?????????????????????: ';
              // newobj.type = newArry[key].type;
              if (newArry[key].type === '01') {
                newobj.type = '???';
              } else {
                newobj.type = '???';
              }
              twoArry.push(newobj);
            } else if (newArry[key].name === '') {
              newobj.name = '????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'firstThreeCustomersCountry') {
              newobj.name = '??????????????????????????????????????????????????????';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === '') {
              newobj.name = '????????????: ';
              newobj.type = newArry[key].type;
              twoArry.push(newobj);
            } else if (newArry[key].name === 'mainTargetMarket') {
              newobj.name = '?????????????????????????????????';
              newobj.typeonet = newArry[key].type;
              newobj.type = '';
              twoArry.push(newobj);
            } else if (newArry[key].name === 'cantonCode') {
              newobj.name = '??????????????????';
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
    //???????????????????????????????????????
    getBatchtime({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbatchtime(obj).then(res => {
          // for (let key in res) {
          //   if (res[key].publishBatch === "publishBatchOne") {
          //     res[key].label = '?????????' + res[key].publishDate;
          //   } else if (res[key].publishBatch === "publishBatchTwo") {
          //     res[key].label = '?????????????????????' + res[key].publishDate;
          //   } else if (res[key].publishBatch === "publishBatchThree") {
          //     res[key].label = '?????????????????????' + res[key].publishDate;
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
    //???????????????????????????????????????????????????????????????
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
    //????????????????????????
    getExportOperating({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getexportOperating(obj).then(res => {
          for (let key in res) {
            res[key].imgfile = [];
            if (res[key].subClusterCheckStatus === '0') {
              res[key].subClusterCheckStatus = '?????????';
            } else if (res[key].subClusterCheckStatus === '1') {
              res[key].subClusterCheckStatus = '??????';
            } else {
              res[key].subClusterCheckStatus = '?????????';
            }
            if (res[key].clusterCheckStatus === '0') {
              res[key].clusterCheckStatus = '?????????';
            } else if (res[key].clusterCheckStatus === '1') {
              res[key].clusterCheckStatus = '??????';
            } else {
              res[key].clusterCheckStatus = '?????????';
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
    //??????????????????????????????
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
    //????????????????????????
    getEnterpriseapplication({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getenterpriseapplication(obj).then(res => {
          for (let key in res) {
            res[key].operating = true;
            if (res[key].matching === '1') {
              res[key].matching = '???';
            } else {
              res[key].matching = '???';
            }
            if (res[key].exhibitionType === 'CENTER_CHANNEL_BOOTH') {
              res[key].exhibitionType = '????????????';
            } else if (res[key].exhibitionType === 'STANDARD_BOOTH') {
              res[key].exhibitionType = '??????';
            } else if (res[key].exhibitionType === 'SPECIAL_BOOTH') {
              res[key].exhibitionType = '??????';
            } else if (res[key].exhibitionType === 'UNIFICATION_BOOTH') {
              res[key].exhibitionType = '????????????';
            }
            if (res[key].boothType === '01') {
              res[key].boothType = '?????????';
            } else if (res[key].boothType === '02') {
              res[key].boothType = '??????';
            }
            if (res[key].isContacted === '1') {
              res[key].isContacted = '???';
            } else {
              res[key].isContacted = '???';
            }
            if (res[key].subClusterCheckStatus === '0') {
              res[key].subClusterCheckStatus = '?????????';
            } else if (res[key].subClusterCheckStatus === '1') {
              res[key].subClusterCheckStatus = '??????';
            } else {
              res[key].subClusterCheckStatus = '?????????';
            }
            if (res[key].clusterCheckStatus === '0') {
              res[key].clusterCheckStatus = '?????????';
            } else if (res[key].clusterCheckStatus === '1') {
              res[key].clusterCheckStatus = '??????';
            } else {
              res[key].clusterCheckStatus = '?????????';
            }
          }
          commit('ENTERPRISEAPPLICATION', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //????????????????????????(????????????)
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
    //????????????????????????(????????????)
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
    ////????????????????????????
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
    //????????????????????????
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
              res.records[key].forbid = '?????????';
            } else if (res.records[key].forbid === '1') {
              res.records[key].forbid = '???';
              // res.records[key].newforbid = '??????';
            } else if (res.records[key].forbid === '2') {
              res.records[key].forbid = '???';
              // res.records[key].newforbid = '?????????';
            }
            if (res.records[key].subClusterCheckStatus === '0') {
              res.records[key].subClusterCheckStatus = '?????????';
            } else if (res.records[key].subClusterCheckStatus === '1') {
              res.records[key].subClusterCheckStatus = '??????';
            } else if (res.records[key].subClusterCheckStatus === '2') {
              res.records[key].subClusterCheckStatus = '?????????';
            }
            if (res.records[key].clusterCheckStatus === '0') {
              res.records[key].clusterCheckStatus = '?????????';
            } else if (res.records[key].clusterCheckStatus === '1') {
              res.records[key].clusterCheckStatus = '??????';
            } else if (res.records[key].clusterCheckStatus === '2') {
              res.records[key].clusterCheckStatus = '?????????';
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
    //????????????????????????
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
    ///??????????????????????????????
    getJointventure({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getjointventure(obj).then(res => {
          for (let key in res) {
            res[key].operating = true;
            if (res[key].subClusterCheckStatus === '0') {
              res[key].subClusterCheckStatus = '?????????';
            } else if (res[key].subClusterCheckStatus === '1') {
              res[key].subClusterCheckStatus = '??????';
            } else if (res[key].subClusterCheckStatus === '2') {
              res[key].subClusterCheckStatus = '?????????';
            }
            if (res[key].clusterCheckStatus === '0') {
              res[key].clusterCheckStatus = '?????????';
            } else if (res[key].clusterCheckStatus === '1') {
              res[key].clusterCheckStatus = '??????';
            } else if (res[key].clusterCheckStatus === '2') {
              res[key].clusterCheckStatus = '?????????';
            }
          }
          commit('JOINTVENTURELIST', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //??????????????????
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
    // ?????????????????????
    getBusinessreview({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getbusinessreview(obj).then(res => {
          for (let key in res.records) {
            res.records[key].operating = true;
            if (res.records[key].boothType === '01') {
              res.records[key].boothType = '?????????';
            } else if (res.records[key].boothType === '02') {
              res.records[key].boothType = '??????';
            }
            if (res.records[key].categoryA === '0') {
              res.records[key].categoryA = '?????????';
            } else if (res.records[key].categoryA === '1') {
              res.records[key].categoryA = '??????';
            } else if (res.records[key].categoryA === '2') {
              res.records[key].categoryA = '?????????';
            }
            if (res.records[key].exhibitionType === 'CENTER_CHANNEL_BOOTH') {
              res.records[key].exhibitionType = '????????????';
            } else if (res.records[key].exhibitionType === 'STANDARD_BOOTH') {
              res.records[key].exhibitionType = '??????';
            } else if (res.records[key].exhibitionType === 'SPECIAL_BOOTH') {
              res.records[key].exhibitionType = '??????';
            } else if (res.records[key].exhibitionType === 'UNIFICATION_BOOTH') {
              res.records[key].exhibitionType = '????????????';
            }
            if (res.records[key].categoryB === '0') {
              res.records[key].categoryB = '?????????';
            } else if (res.records[key].categoryB === '1') {
              res.records[key].categoryB = '??????';
            } else if (res.records[key].categoryB === '2') {
              res.records[key].categoryB = '?????????';
            }
            if (res.records[key].categoryC === '0') {
              res.records[key].categoryC = '?????????';
            } else if (res.records[key].categoryC === '1') {
              res.records[key].categoryC = '??????';
            } else if (res.records[key].categoryC === '2') {
              res.records[key].categoryC = '?????????';
            }
            if (res.records[key].categoryD === '0') {
              res.records[key].categoryD = '?????????';
            } else if (res.records[key].categoryD === '1') {
              res.records[key].categoryD = '??????';
            } else if (res.records[key].categoryD === '2') {
              res.records[key].categoryD = '?????????';
            }
            if (res.records[key].categoryE === '0') {
              res.records[key].categoryE = '?????????';
            } else if (res.records[key].categoryE === '1') {
              res.records[key].categoryE = '??????';
            } else if (res.records[key].categoryE === '2') {
              res.records[key].categoryE = '?????????';
            }
            if (res.records[key].overallRatingStatus === '0') {
              res.records[key].overallRatingStatus = '?????????';
            } else if (res.records[key].overallRatingStatus === '1') {
              res.records[key].overallRatingStatus = '????????????';
            } else if (res.records[key].overallRatingStatus === '2') {
              res.records[key].overallRatingStatus = '???????????????';
            }
            if (res.records[key].noticeStatus === '0') {
              res.records[key].noticeStatus = '?????????';
            } else if (res.records[key].noticeStatus === '1') {
              res.records[key].noticeStatus = '?????????';
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
    //?????????????????????(a?????????)
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
    //?????????????????????(b?????????)
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
    //?????????????????????(C?????????)
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
    //?????????????????????(D?????????)
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
    //?????????????????????(E?????????)
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
    //?????????????????????(????????????)
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
    //?????????????????????(??????????????????)
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
    //??????????????????
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
    //?????????????????????
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
    //????????????????????????
    getCustomCode({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getcustomCode(obj).then(res => {
          for (let key in res.customCodeList) {
            res.customCodeList[key].operating = true;
            res.customCodeList[key].imgfile = [];
            if (res.customCodeList[key].relationship === 'ENTERPRISE') {
              res.customCodeList[key].relationship = '?????????';
            } else if (res.customCodeList[key].relationship === 'SUBSIDARYCOMPANY') {
              res.customCodeList[key].relationship = '???????????????';
            } else if (res.customCodeList[key].relationship === 'HOLDCOMPANY') {
              res.customCodeList[key].relationship = '???????????????';
            }
            if (res.customCodeList[key].subClusterCheckStatus === '0') {
              res.customCodeList[key].subClusterCheckStatus = '?????????';
            } else if (res.customCodeList[key].subClusterCheckStatus === '1') {
              res.customCodeList[key].subClusterCheckStatus = '??????';
            } else if (res.customCodeList[key].subClusterCheckStatus === '2') {
              res.customCodeList[key].subClusterCheckStatus = '?????????';
            }
            if (res.customCodeList[key].clusterCheckStatus === '0') {
              res.customCodeList[key].clusterCheckStatus = '?????????';
            } else if (res.customCodeList[key].clusterCheckStatus === '1') {
              res.customCodeList[key].clusterCheckStatus = '??????';
            } else if (res.customCodeList[key].clusterCheckStatus === '2') {
              res.customCodeList[key].clusterCheckStatus = '?????????';
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
    //??????????????????
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
    //??????????????????
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
    //??????????????????
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
    //??????????????????
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
    //?????????????????????????????????
    getAmountasult({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getamountasult(obj).then(res => {
          if (res.examineStatus === '0') {
            res.examineStatus = '?????????';
              //?????????
          } else if (res.examineStatus === '1') {
            res.examineStatus = '???';
            //????????????
          } else if (res.examineStatus === '2') {
            res.examineStatus = '???';
          }
          commit('AMOUNTSULT', res);
          resolve(res);
        }).catch(e => {
          reject(e);
        });
      });
    },
    //?????????????????????
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
    //??????????????????????????????
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
    //??????????????????????????????
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
    //???????????????????????????(??????????????????)
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
    //???????????????????????????(??????????????????)
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
    //????????????????????????????????????  ????????? ?????? ?????? 19/5/19  ????????? ????????? ????????? ????????????????????? ??? ????????????????????????
    getCompanyresult({ commit }, obj) {
      return new Promise((resolve, reject) => {
        quantitativeArrangementApi.getcompanyresult(obj).then(res => {
          for (let key in res) {
            if (key === 'clusterCheckStatus') {
              if (res[key] === '0') {
                res[key] = '?????????';
              } else if (res[key] === '1') {
                res[key] = '????????????????????????';
              } else if (res[key] === '2') {
                res[key] = '?????????????????????';
              }
            }
            if (key === 'subClusterCheckStatus') {
              if (res[key] === '0') {
                res[key] = '?????????';
              } else if (res[key] === '1') {
                res[key] = '????????????????????????';
              } else if (res[key] === '2') {
                res[key] = '?????????????????????';
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
    // ????????????   ??????  ????????? 5/20
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
    // ???????????????????????????   ??????  ????????? 5/20
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
    // ????????????????????????????????????   ??????  ????????? 5/22
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
    // ????????????  jcrao   ?????????  5/22
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
