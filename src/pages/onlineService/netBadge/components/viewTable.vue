<template>
  <kindo-box>
    <div class="viewTable">
      <table>
        <tbody>
          <tr>
            <td><strong>广交会（交易团）编码</strong></td>
            <td>{{viewData.enterpriceCode}}</td>
            <td></td>
            <td></td>
            <td rowspan="4">
              <div><img :src="api.getFile + viewData.badgePhotoUrl" alt="头像照片" class="badgePhotoUrlImg"></div>
            </td>
          </tr>
          <tr>
            <td><strong>姓名</strong></td>
            <td>{{viewType==='first'?viewData.userName:viewData.applyUserName}}</td>
            <td><strong>性别</strong></td>
            <td>{{viewType==='first'?(viewData.sexTypeCode==='1'?'男':viewData.sexTypeCode==='2'?'女':''):(viewData.sex==='1'?'男':viewData.sex==='2'?'女':'')}}</td>
          </tr>
          <tr>
            <td><strong>证件类型</strong></td>
            <td>{{ viewData.idcardTypeCodeZh}}</td>
            <td><strong>证件号码</strong></td>
            <td>{{viewData.idcardNo}}</td>
          </tr>
          <tr>
            <td><strong>电话</strong></td>
            <td>{{viewData.cellPhone}}</td>
            <td><strong>E-Mail</strong></td>
            <td>{{viewData.email}}</td>
          </tr>
          <tr>
            <td colspan="3" class="badgeImg">
              <div><img :src="api.getFile + viewData.idcardFrontPhotoUrl" alt="身份证照片" class="imgDiv"></div>
            </td>
            <td colspan="2" class="badgeImg">
              <div><img :src="api.getFile + viewData.busiCardFileId" alt="工作证件照片" class="imgDiv"></div>
            </td>
          </tr>
          <tr>
            <td><strong>备注</strong></td>
            <td colspan="4" class="tipsTd">{{viewData.remark}}</td>
          </tr>
          <tr>
            <td><strong>注意</strong></td>
            <td colspan="4" class="tipsTd">
              <p>1.每人只限在一期内登记申请一个证件，上面申请表单中带*号为必填项，请正确输入所需资料；</p>
              <p>2.个人相片、身份证图片及工作证图片必须采用JPG格式图片，暂不受理其他格式图片，请将图片处理成JPG格式再进行上传；图片大小必须 100kb,个人相片的高宽比（高度/宽度）必须在1.2-1.3之间。</p>
              <p>3.图片扫描请按1:1比例扫描。</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Todo 办证申请修改申请信息展示 -->
    <!-- <kindo-box v-if='isShowViewApplyTable'>
    </kindo-box> -->
  </kindo-box>
</template>

<script>
export default {
  name: 'viewTable',
  props: {
    viewData: Object,
    viewType: { type: String, default: 'first' }
  },
  data() {
    return {
      api: {
        getFile: kindo.config.api.comsUrl + "/api/fs/view/"
      }
    };
  }

};
</script>

<style lang="less" scoped>
.viewTable {
  table {
    border-collapse: collapse;
    td {
      border: 1px solid #ccc;
      text-align: center;
    }
    .tipsTd {
      text-align: left;
    }
    .badgeImg {
      height: 300px;
    }
    .badgePhotoUrlImg {
      width: 200px;
      height: 250px;
    }
    .imgDiv {
      width: 250px;
      height: 150px;
    }
  }
}
</style>


