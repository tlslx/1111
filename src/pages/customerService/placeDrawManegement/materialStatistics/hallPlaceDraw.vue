/**
 * @file 展厅展位施工图
 */
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane label="展厅展位施工图" name="first">
      <el-form :model="queryForm" :inline="true" class="search-form-inline">
        <el-form-item label="届数">
          <el-select v-model="queryForm.sessionNum" clearable>
            <el-option v-for="item in sessionNums" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展期">
          <el-select v-model="queryForm.issueNum" clearable>
            <el-option v-for="item in issueNums" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展厅">
          <el-select v-model="queryForm.area" collapse-tags multiple placeholder="可多选">
            <el-option v-for="item in areas" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间">
          <el-date-picker v-model="queryForm.time" type="datetime" placeholder="请选择"> </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="isShow = !isShow" >打开展厅图</el-button>
        </el-form-item>
        </el-form>
        <el-form :inline="true" v-if="isShow">
        <el-form-item label="未改装展位是否显示展具">
          <el-select :disabled="true" v-model="ruleForm.isOverlapping" clearable>
            <el-option label="不显示展具" value="bu"></el-option>
            <el-option label="显示默认展具" value="shi"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="已改装展位是否显示展具">
          <el-select :disabled="true" v-model="ruleForm.isTool" clearable>
            <el-option label="只显示当前展具" value="zhi"></el-option>
            <el-option label="一并显示展具" value="yibi"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="展具改装">
          <el-select v-model="ruleForm.toolNum" clearable>
            <el-option v-for="item in toolNums" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="座椅分布">
          <el-select v-model="ruleForm.issueTool" clearable>
            <el-option v-for="item in issueTools" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="电改装">
          <el-select v-model="ruleForm.eleNum" clearable>
            <el-option v-for="item in eleNums" :key="item.value" :value="item.value" :label="item.label"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <el-img :src="imgUrl"></el-img>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="print">打印</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="allPrint">全部打印</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="cutPrint">分割打印</el-button>
        </el-form-item>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
  export default {
    data() {
      return {
        loading: '',
        activeName: 'first',
        sessionNums: [], // 展期字典
        issueNums: [], // 展期字典
        areas: [], // 展厅字典
        // imgUrl: "",
        isShow: false,
        toolNums: [],
        issueTools: [],
        eleNums: [],
        queryForm: {
          sessionNum: '', // 期数
          issueNum: '', // 届数
          area: '', // 展厅
          time: ''
        },
        ruleForm: {
          isOverlapping: '', 
          isTool: '',
          toolNum: '',
          issueTool: '',
          eleNum: ''
        }
      };
    },
    computed: {
    },
    methods: {
      print() {
      
      },
      allPrint() {

      },
      cutPrint() {

      }
    }
  };
</script>