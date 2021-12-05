/**
 * @file 审核公司资料明细
 */
 <style scoped>
 .date {
   margin-left: 5px;
   margin-right: 5px;
 }
 .table_div {
  width:100%;
  border: 1px solid black;
 }
 table {
   width: 100%;
   border: 1px solid black;

 }
.table  td {
   height: 15px;
   line-height: 15px;
   font-size: 12px;
 }
 .thead{
   height: 50px;
   text-align: center;
   line-height: 50px;
 }

 </style>

<template>
  <div class="table_div">
    <table  border="1" cellpadding="0" cellspacing="0" class="table">
  <thead>
    <tr>
      <td colspan='6' class="thead" ><h1>第{{printList.exhibitionNum}}届广交会第{{printList.exhibitionSession}}期现场检查嫌疑违规展位处理意见</h1></td>
    </tr>
  </thead>
      <tr>
        <td>送交时间</td>
        <td colspan='4'>{{printList.deliveryTime}}</td>
      </tr>
      <tr>
        <td>检查情况</td>
        <td colspan='4'>{{printList.deliveryStatus}}</td>
      </tr>
      <tr>
        <td>楣板标明参展单位</td>
        <td colspan='4'>{{printList.companyName}}</td>
      </tr>
      <tr>
        <td>展区</td>
        <td>{{printList.exhibitionAreaCode}}</td>
        <td>所属交易团</td>
        <td colspan='2'>{{printList.businessDelegationText}}</td>
      </tr>
      <tr>
        <td>展馆展厅号</td>
        <td colspan='4'>{{printList.hallNo}}</td>
      </tr>
      <tr>
        <td>展位号</td>
        <td>{{printList.boothNo}}</td>
        <td>展位数量</td>
        <td colspan='2'>{{printList.boothNumber}}</td>
      </tr>
      <tr>
        <td :rowspan="num">政工办认定及处理意见</td>
        <td colspan='5'>是否为所属交易团主动报告或主动查处：{{printList.activeInvestigation}}</td>
      </tr>
       <tr>
        <td colspan='5'>如上栏选“否”，请填写实际使用企业认定情况（选“是”无需填写）
         <br/>
         能否认定实际使用企业： {{printList.enterpriseChecked}}
        </td>
      </tr>
      <tr>
        <td colspan='5'>如有实际使用企业，请填下表（如超过3家，请填入附表并签名）</td>
      </tr>
      <tr>
        <td>企业名称</td>
        <td>实际使用展位号</td>
        <td>实际使用展位数</td>
        <td>证明材料</td>
      </tr>
      <tr colspan='5' v-if="printList.companies.length < 4" v-for="(item,index) in printList.companies" :key="index">
        <td>{{item.companyName}}</td>
        <td>{{item.boothNo}}</td>
        <td>{{item.exhibitionNum}}</td>
        <td>{{item.profFname}}</td>
      </tr>
      <tr>
        <td colspan='4'>主任：</td>
      </tr>
      <tr>
          <td colspan='5'></td>
      </tr>
      <tr>
        <td rowspan="20">业务办领导审批意见</td>
        <td colspan='4'>主任：</td>
      </tr>
       <tr>
        <td colspan='4'>常务副主任：</td>
      </tr>
       <tr>
        <td colspan='4'>副主任：</td>
      </tr>
      <tr>
        <td colspan='4'></td>
      </tr>
    </table>

 <div style="margin-top: 30px;"  v-if="printList.companies.length > 3">
  <table  border="1" cellpadding="0" cellspacing="0" class="table">
  <thead>
    <tr>
      <td colspan='6' class="thead" ><h1>第{{printList.exhibitionNum}}届广交会第{{printList.exhibitionSession}}期现场检查嫌疑违规展位处理意见</h1></td>
    </tr>
  </thead>
      <tr>
        <td>送交时间</td>
        <td colspan='4'>{{printList.deliveryTime}}</td>
      </tr>
     <tr>
        <td>楣板标明参展单位</td>
        <td colspan='4'>{{printList.companyId}}</td>
      </tr>
      <tr>
        <td>企业名称</td>
        <td>实际使用展位号</td>
        <td>实际使用展位数</td>
        <td>证明材料</td>
      </tr>
      <tr v-for="(item,index) in printList.companies" :key="index">
        <td>{{item.companyName}}</td>
        <td>{{item.boothNo}}</td>
        <td>{{item.exhibitionNum}}</td>
        <td>{{item.profFname}}</td>
      </tr>
    </table>
    <div>政工办主任(签名)：</div>
    <div>日期：</div>
   </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      printList: {},
      num: null
    };
  },
  created() {

    let data = this.$route.query.data;
    this.printList = JSON.parse(data);
    if (this.printList.activeInvestigation === 1) {
      this.printList.activeInvestigation = '是';
    } else {
      this.printList.activeInvestigation = '否';
    }
    if (this.printList.enterpriseChecked === 1) {
      this.printList.enterpriseChecked = '是';
    } else {
      this.printList.enterpriseChecked = '否';
    }
    if (this.printList.companies.length < 4) {
      this.num = 5 + Number(this.printList.companies.length);
    } else {
      this.num = 5;
    }
  },
  mounted() {
    setTimeout(() => {
      window.print();
    }, 2000);
  }
};
</script>



