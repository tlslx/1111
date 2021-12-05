<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="交易团设置一般性展位数量安排" name="first">
      <!-- 表单 -->
      <el-form :inline="true" :model="formData">
        <el-form-item label="企业名称">
          <el-input v-model="formData"></el-input>
        </el-form-item>
        <el-form-item label="商会">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展区">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否商会会员">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="广交会编码">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="布展类型">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分团">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否品牌企业">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="安排情况">
          <el-select v-model="formData" clearable>
            <el-option label value></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="floatRight">
          <el-button class="formStyle" type="primary" @click="onSearch">查询</el-button>
          <el-button class="formStyle" type="primary">导入</el-button>
        </el-form-item>
      </el-form>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column align="center" label="企业名称" prop></el-table-column>
        <el-table-column align="center" label="商会" prop></el-table-column>
        <el-table-column align="center" label="交易团/分团" prop></el-table-column>
        <el-table-column align="center" label="企业永久编码" prop></el-table-column>
        <el-table-column align="center" label="广交会编码" prop></el-table-column>
        <el-table-column align="center" label="展区" prop></el-table-column>
        <el-table-column align="center" label="展区代码" prop></el-table-column>
        <el-table-column align="center" label="特装展位数" prop></el-table-column>
        <el-table-column align="center" label="标摊展位数" prop></el-table-column>
        <el-table-column align="center" label="统一布展数" prop></el-table-column>
        <el-table-column align="center" label="中央通道数" prop></el-table-column>
        <el-table-column align="center" label="粘连申请数量" prop></el-table-column>
        <el-table-column align="center" label="产品类别" prop></el-table-column>
        <el-table-column align="center" label="所属贫困县" prop></el-table-column>
        <el-table-column align="center" label="是否商会会员" prop></el-table-column>
        <el-table-column align="center" label="是否品牌企业" prop></el-table-column>
        <el-table-column align="center" label="安排情况" prop></el-table-column>
        <el-table-column align="center" label="操作">
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
          <el-button type="text">设置粘连性</el-button>
          <el-button type="text">贫困地区</el-button>
        </el-table-column>
      </el-table>
      <!-- 一堆按钮 -->
      <div class="paginationTop floatLeft">
        <el-button type="primary" class="formStyle" @click="isExhibit = true">新增</el-button>
      </div>
      <!-- 分页 -->
      <div class="floatRight paginationTop">
        <el-pagination
          background
          layout="total, prev, pager, next, jumper"
          :total="paginationData.total"
          @current-change="handleCurrentChange"
          :current-page="paginationData.currentPage"
          :pager-count="paginationData.pagerCount"
          :page-size="paginationData.pageSize"
        ></el-pagination>
      </div>
      <!-- 新增 -->
      <el-dialog title="新增" :visible.sync="isExhibit" width="950px">
        <el-form :model="addForm" :rules="rules" :inline="true" ref="ruleForm" label-width="120px">
          <el-form-item label="企业名称">
            <el-select v-model="addForm" multiple filterable allow-create default-first-option clearable class="wid">
              <el-option label value></el-option>
            </el-select>
            <!-- <el-select v-model="addForm.exhibitionArea" clearable>
              <el-option
                v-for="(item, index) in localstora.exhibitionArea"
                :key="index"
                :label="item.text"
                :value="item.value"
              ></el-option>
            </el-select>-->
          </el-form-item>
          <el-form-item label="标摊展位数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="展区">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统一布展数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="特装展位数">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="中央通道数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <h3>填写粘连安排</h3>
          <el-form-item label="广交会编码">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="上届安排特装数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="企业中文名称">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="特装推荐数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="期数">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="标摊推荐数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="展区">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡车通道推荐数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="申请数量">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="安排总数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="是否统一布展">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请粘连展位数量">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="产品类别">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否商会会员">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属贫困县">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="商会意见">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="上届是否绿色特装">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="品牌粘连审核结果">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="统一布展推荐数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="粘连数量审核结果">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <h3>填写贫困地区特殊产品</h3>
          <el-form-item label="广交会编码">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="所属贫困县">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业中文名称">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="上届是否绿色特装">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="期数">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上届安排特装数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="展区">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="特装推荐数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="申请数量">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="标摊推荐数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="是否统一布展">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="卡车通道推荐数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="产品类别">
            <el-select v-model="addForm" clearable class="wid">
              <el-option label="" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="安排总数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <el-form-item label="统一布展推荐数">
            <el-input v-model="addForm"></el-input>
          </el-form-item>
          <div class="divp">
            <el-button type="primary" @click="isExhibit = false">保存</el-button>
            <el-button @click="isExhibit = false">取消</el-button>
          </div>
        </el-form>
      </el-dialog>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      tableData: [],
      isExhibit: false,
      addForm: {},
      paginationData: {
        currentPage: 1,
        pagerCount: 7,
        pageSize: 10,
        total: 0
      },
      activeName: "first"
    };
  },
  methods: {
    onSearch() {}
  }
};
</script>

<style scoped>
.floatRight {
  float: right;
  margin-right: 50px;
}
.formStyle {
  padding: 8px 30px;
}
.paginationTop {
  margin-top: 10px;
}
.floatLeft {
  float: left;
}
.cont {
  text-align: center;
  margin-top: 20px;
}
.wid {
  width: 300px;
}
.divp {
  text-align: center;
  padding: 20px 0;
}
</style>
