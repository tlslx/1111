export default {
  // 这是用来进行json传参查询时候使用的方式
  nameOne(params) {
    let objOne = {
      "customQueryParams": [
      ],
      "pageIndex": 1,
      "pageSize": 10  
    };
    let key = Object.keys(this.formData);
    objOne = {
      "customQueryParams": [
        {
          "name": key[i],
          "findType": "LIKE",
          "joinType": "And",
          "dataType": "Default",
          "values": [
            this.formData[key[i]]
          ],
          "description": ""
        }
      ],
      "pageIndex": 1,
      "pageSize": 10  
    };
    for (let i = 0; i < key.length; i++) {
      if (this.formData[key[i]] !== "") {
        let aFist = {
          "name": key[i],
          "findType": "LIKE",
          "joinType": "And",
          "dataType": "Default",
          "values": [
            this.formData[key[i]]
          ],
          "description": ""
        };
        objOne.customQueryParams.push(aFist);
      } else { 
       // console.log(1);
      }
    }
  },
  // 这个是一般情况下查询传参所用的方法
  nameTwo() {
    this.obj = {
      'dealClusterId': "1",
      'current': "1",
      'size': "10"
    };
    let key = Object.keys(this.formData);
    for (let i = 0; i < key.length; i++) {
      let aFirst = key[i];
      let bSecend = this.formData[key[i]];
      if (bSecend !== "") {
        this.obj[aFirst] = bSecend;
      }
      this.getListPage(this.obj);
    }
  },
  // 这个是在给了查询接口时 所用的方法
  search() {
    this.getlistDealCondition()
      .then(res => {
        for (let i = 1; i < 4; i++) {
          let aFirst = {};
          let bSec = {};
          let cThrid = {};
          let dFourd = {};
          aFirst["label"] = res.associatioCodeList["00" + i][0].delegationName;
          aFirst["value"] = res.associatioCodeList["00" + i][0].delegationCode;
          bSec["label"] = res.associatioCodeList["00" + i][0].exhibitionAreaName;
          bSec["value"] = res.associatioCodeList["00" + i][0].exhibitionArea;
          cThrid["label"] = res.associatioCodeList["00" + i][0].associatioName;
          cThrid["value"] = res.associatioCodeList["00" + i][0].associatioCode;
          dFourd["label"] = res.associatioCodeList["00" + i][0].exhibitionSession + "届";
          dFourd["value"] = res.associatioCodeList["00" + i][0].exhibitionSession;
          this.formOptionOne.push(aFirst);
          this.formOptionTwo.push(bSec);
          this.formOptionThree.push(cThrid);
          this.formOptionFour.push(dFourd);
        }
      })
      .catch(e => {});
  },
  // 这里的是获取本地字典 永久缓存的数据
  methods() {
    let localstora = JSON.parse(localStorage.getItem("dictData"));
    localstora;
  },
  // 删除
  del() {
    this.$confirm("确认删除？", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    })
      .then(() => {
        this.deleteordinaryExchangeIntent(this.intId)
          .then(res => {
            this.$message({
              message: "删除成功！",
              type: "success"
            });
            this.getListPage(this.obj);
          })
          .catch(e => {});
      })
      .catch(() => {
        this.$message({
          type: "info",
          message: "已取消删除"
        });
      });
  },
  // 过滤器
  filters: {
    checkState(value) {
      if (value === "1") {
        return "审核通过";
      } else if (value === "0") {
        return "审核不通过";
      } else {
        return "未审核";
      }
    }
  },
  // 是否禁用复选框事件
  selecta(row, index) {
    //
    if (row.examineStatus === "1" || row.examineStatus === "2") {
      return false;
    } else {
      // 数组 对象去重
      let hash = {};
      res["delegation"] = deled.reduce(function(item, next) {
        hash[next.value] ? '' : hash[next.value] = true && item.push(next);
        return item;
      }, []);
      return true;
    }
  }
};

