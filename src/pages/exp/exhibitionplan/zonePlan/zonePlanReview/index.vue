<template>
  <el-page ref="zonePlanReview">
    <template slot="header">
      <child-dialog @reload="onResetQuery" ref="childDialog" :operational="operational" :language="source.language"/>
      <!-- 列表查询 -->
      <kindo-box :title="source.language.zonePlanReview" icon="fa-search">
        <el-form inline label-width="90px" :model="queryParams" ref="queryParams" @submit.native.prevent
          @keyup.enter.native="onQuery" :rules="queryRules">
          <!-- <el-form-item :label="source.language.exhibitionNum" prop="exhibitionNum">
             <el-input v-model="queryParams.exhibitionNum" :placeholder="source.language.inputPlaceholder" class="inputclass" clearable @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item> -->
          <el-form-item :label="source.language.exhibitionNum">
            <el-select v-model="queryParams.exhibitionNum" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.exhibitionNum" :key="item.id" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.exhibitionPeriodCode">
            <el-select v-model="queryParams.exhibitionPeriodNum" :placeholder="source.language.selectPlaceholder" class="inputclass" clearable>
              <el-option v-for="item in source.exhibitionPeriodNum" :key="item.id" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="source.language.schemeName">
            <el-input v-model="queryParams.schemeName" :placeholder="source.language.inputPlaceholder" class="inputclass" clearable @blur="(ev)=>ev.target.value = ev.target.value.trim()"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onQuery" icon="el-icon-search">{{source.language.query}}</el-button>
            <el-button type="info" plain @click="onResetQuery" >{{source.language.reset}}</el-button>
          </el-form-item>
        </el-form>
      </kindo-box>
    </template>
    <!-- 数据区域 -->
    <template slot="body">
      <el-page-data>
        <kindo-box>
          <kindo-table :cell-style="isCenter" ref="zonePlanTable" :queryParam="form" :url="api.get">
            <el-table-column prop="exhibitionNum" :label="source.language.exhibitionNum" header-align="center" min-width="120" show-overflow-tooltip></el-table-column>
            <el-table-column prop="exhibitionPeriodNum" :label="source.language.exhibitionPeriodCode" header-align="center" min-width="120"
             :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.exhibitionPeriodNum,row.exhibitionPeriodNum)}" show-overflow-tooltip></el-table-column>
            <el-table-column prop="schemeName" :label="source.language.schemeName" header-align="center" show-overflow-tooltip  min-width="160"></el-table-column>
            <el-table-column prop="creatorName" :label="source.language.creatorName" header-align="center" show-overflow-tooltip min-width="160"></el-table-column>
            <el-table-column prop="createDate" :label="source.language.createDate" header-align="center" min-width="160" show-overflow-tooltip></el-table-column>
            <el-table-column prop="schemeStatus" :label="source.language.status" header-align="center"
            :formatter="(row,colums)=>{return kindo.dictionary.getLabel(source.schemeStatus,row.schemeStatus)}" show-overflow-tooltip min-width="120">
            </el-table-column>
            <el-table-column :label="source.language.operation" fixed="right" min-width="200" align="center">
              <template slot-scope="scope">
                <el-button v-if="right('edit')" type="text" @click="onAction('edit',scope.row)" v-show="scope.row.schemeStatus !== '1'">{{source.language.edit}}</el-button>
                <el-button v-if="right('view')" type="text" @click="onAction('view',scope.row)">
                  {{source.language.view}}</el-button>
                <el-button v-if="right('viewAction')" type="text" @click="onAction('view',scope.row,'associationList')">{{source.language.viewAssociation}}</el-button>
              </template>
            </el-table-column>
          </kindo-table>
        </kindo-box>
      </el-page-data>
    </template>
  </el-page>
</template>
<script>
  import listPageBase from '@/components/framework/mixins/listPageBase';
  import zonePlan from '@/components/project/mixins/zonePlans';
  export default {
    name: "zonePlanReview",
    mixins: [listPageBase, zonePlan],
    components: {
      'childDialog': () => import('../components/childDialog')
    },
    data() {
      return {
        pageId: 'zonePlanReview',
        operational: '3'
      };
    },
    mounted() {
      this.$nextTick(function () {
        this.onQuery();
      });
    },
    methods: {
    }
  };
</script>
<style lang="scss" scoped>
</style>