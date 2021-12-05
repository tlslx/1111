<template>
  <el-container>
    <el-header>
      <headline label="在线安排" />
    </el-header>
    <el-main class="p-b-n">
      <table cellspacing="0" cellpadding="0" border="0" class="operate">
        <tr>
          <td rowspan="2">
            <img width="50" src="@/../static/img/stallplan/plan01.png" alt="图标">
            <div>在线安排</div>
          </td>
          <td rowspan="2">
            <img width="33" src="@/../static/img/stallplan/plan03.png" alt="图标">
            <div>检查安排进度</div>
          </td>
          <td>
            <img width="25" src="@/../static/img/stallplan/plan04.png" alt="图标">
            <div>对比</div>
          </td>
          <td>
            <img width="26" src="@/../static/img/stallplan/plan05.png" alt="图标">
            <div>导出</div>
          </td>
          <td rowspan="2">
            <img width="35" src="@/../static/img/stallplan/plan07.png" alt="图标">
            <div>检查专区展位<br/>企业安排情况</div>
          </td>
          <td>
            <img width="32" src="@/../static/img/stallplan/plan08.png" alt="图标">
            <div>在展位图上显示</div>
          </td>
          <td>
            <img width="40" src="@/../static/img/stallplan/plan09.png" alt="图标">
            <div>生成列表</div>
          </td>
          <td rowspan="2">
            <img width="48" src="@/../static/img/stallplan/plan10.png" alt="图标">
            <div>呈现企业主营<br/>产品分布</div>
          </td>
          <td rowspan="2">
            <img width="44" src="@/../static/img/stallplan/plan11.png" alt="图标">
            <div>呈现二级展品分布</div>
          </td>
          <td rowspan="2">
            <img width="44" src="@/../static/img/stallplan/plan12.png" alt="图标">
            <div>呈现交易团展位分布</div>
          </td>
          <td rowspan="2">
            <img width="44" src="@/../static/img/stallplan/plan13.png" alt="图标">
            <div>选择位置展示类型</div>
          </td>
        </tr>
        <tr>
          <td colspan="2">对比方案差异</td>
          <td colspan="2">显示品牌企业主副通道安排</td>
        </tr>
      </table>
      <div class="canvas-box" ref="canvasBox">
        <canvas ref="stall"></canvas>
      </div>
    </el-main>
  </el-container>
</template>

<script>
// const fabric = () => import('fabric');
import canvasBackground from '@/../static/img/stallplan/stall.png';
export default {
  name: 'gear',
  components: {
    'headline': () => import('../../components/headline')
  },
  mounted () {
    let width = this.$refs.canvasBox.clientWidth;
    let height = this.$refs.canvasBox.clientHeight;
    this.canvas = new fabric.Canvas(this.$refs.stall, { width, height });
    // 设置背景图
    this.canvas.setBackgroundImage(canvasBackground, this.canvas.requestRenderAll.bind(this.canvas), {
      top: 2,
      left: 24
    });
    window.addEventListener('resize', () => {
      this.canvas
        .set({
          width: this.$refs.canvasBox.clientWidth,
          height: this.$refs.canvasBox.clientHeight
        })
        .requestRenderAll();
    }, false);
  }
};
</script>

<style scoped>
.p-b-n {
  padding-bottom: 0px;
}
.operate {
  width: 100%;
  border-left: 1px solid #797979;
  border-top: 1px solid #797979;
}
.operate td {
  padding: 8px;
  font-size: 12px;
  text-align: center;
  border-right: 1px solid #797979;
  border-bottom: 1px solid #797979;
}
.canvas-box {
  height: 650px;
  border: 1px solid #797979;
  border-top: none;
}
</style>
