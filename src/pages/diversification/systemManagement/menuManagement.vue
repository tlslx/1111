/**
* @file 菜单管理
* @author:wanglifeng
* @date:2019/1/19
*/
<template>
  <div class="menuMangement">
    <p><span class="title">菜单管理</span></p>
    <hr>

    <el-row class="btn-row">
      <el-button type="primary" @click="dialogProduct = true">新增</el-button>
      <el-button type="primary" @click="handleImports">删除</el-button>
    </el-row>
    <template>
      <div id="table2">
        <el-table
          :data="tableData5"
          stripe
          style="width: 100%">
          <!--<el-table-column-->
            <!--type="selection"-->
            <!--width="55">-->
          <!--</el-table-column>-->
          <el-table-column type="expand" width="90">
            <template slot-scope="props">
              <el-table
                :data="props.row.child"
                :show-header=false>

                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="菜单名称"
                  align="center">
                  <template slot-scope="oscope">{{oscope.row.name1}}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="编号"
                  align="center">
                  <template slot-scope="oscope">{{oscope.row.name2}}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="资源类型"
                  align="center">
                  <template slot-scope="oscope">{{oscope.row.name2}}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="资源访问地址"
                  align="center">
                  <template slot-scope="oscope">{{oscope.row.name2}}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="资源排序"
                  align="center">
                  <template slot-scope="oscope">{{oscope.row.name2}}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="权限编码"
                  align="center">
                  <template slot-scope="oscope">{{oscope.row.name2}}</template>
                </el-table-column>
                <el-table-column
                  :show-overflow-tooltip="true"
                  label="操作"
                  width="220"
                  align="center">
                  <template slot-scope="scope">
                    <!--<el-button type="text" @click.stop="forbidden">禁用</el-button>-->
                    <el-button type="text" @click.stop="handleEdit">修改</el-button>
                    <el-button type="text" @click.stop="handleDelete">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <el-table-column
            label="菜单名称"
            prop="address"
            align="left">
          </el-table-column>
          <el-table-column
            label="编号"
            align="center">
          </el-table-column>
          <el-table-column
            label="资源类型"
            align="center">
          </el-table-column>
          <el-table-column
            label="资源访问地址"
            align="center">
          </el-table-column>
          <el-table-column
            label="资源排序"
            align="center">
          </el-table-column>
          <el-table-column
            label="权限编码"
            align="center">
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="250">
          </el-table-column>
        </el-table>
      </div>
    </template>

    <!--新增(展区信息)-->
    <el-dialog title="新增菜单信息" :visible.sync="dialogProduct" class="addMenuInfo">
      <el-form :model="addMenuInfo" label-width="150px">
        <el-form-item label="资料类型">
          <el-select v-model="addMenuInfo.resourceType" placeholder="请选择资源类型">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单">
          <el-select v-model="addMenuInfo.menu" placeholder="请选择菜单">
            <el-option
              v-for="item in classOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源模块中文名称">
          <el-input v-model="addMenuInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源模块英文名称">
          <el-input v-model="addMenuInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="权限编码">
          <el-input v-model="addMenuInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源排序">
          <el-input v-model="addMenuInfo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="资源访问地址">
          <el-input v-model="addMenuInfo.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer">
        <el-button type="primary" @click="dialogProduct = false">确 定</el-button>
        <el-button @click="dialogProduct = false">取 消</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  export default {
    name: "productCategories",
    data() {
      return {
        tableData5: [
          {
            id: "1",
            name: "商品1",
            address: "云南",
            type: 3,
            child: [
              {
                name1: '一行商品1',
                name2: '一行商品2'
              },
              {
                name1: '一行商品3',
                name2: '一行商品4'
              }
            ]
          },
          {
            id: "2",
            name: "商品2",
            address: "西藏",
            type: 2,
            child: [
              {
                name1: '二行商品5',
                name2: '二行商品6'
              },
              {
                name1: '二行商品7',
                name2: '二行商品8'
              }
            ]
          },
          {
            id: "3",
            name: "商品3",
            address: "黑龙江",
            type: 4,
            child: [
              {
                name1: '三行商品9',
                name2: '三行商品10'
              },
              {
                name1: '三行商品11',
                name2: '三行商品12'
              }
            ]
          },
          {
            id: "4",
            name: "商品4",
            address: "海南",
            type: 1,
            child: [
              {
                name1: '四行商品13',
                name2: '四行商品14'
              }
            ]
          },
          {
            id: "5",
            name: "商品5",
            address: "重庆",
            type: 0,
            child: []
          }
        ],
        ruleForm: {
          activeNo: '',
          multipleSelection: ''
        },
        classOptions: [],
        statusOptions: [],
        dialogProduct: false, // 产品列表弹窗
        dialogAwardSetting: false, // 奖项设置弹窗
        formLabelWidth: '120px',
        addMenuInfo: {
          menu: '',
          resourceType: '',
          name: '',
          status: '',
          area: ''
        }
      };
    },
    methods: {
      submitForm() {

      },
      forbidden() {

      },
      // 修改
      handleEdit() {

      },
      // 删除
      handleDelete() {

      },
      // 新增
      handleAdd() {
        this.dialogProduct = true;
      },
      // 一键导入
      handleImports() {

      },
      // 表格多选框选中事件
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    }
  };
</script>
<style scoped>
  .title{
    font-size: 18px;
    font-weight: 600;
    margin-left: 20px;
  }
  .btn-row{
    margin-top: 10px;
  }
  .dialog-footer{
    text-align: center;
    margin: 15px 0;
    padding-bottom: 10px;
  }



  /*.demo-table-expand {*/
    /*font-size: 0;*/
  /*}*/
  /*.demo-table-expand label {*/
    /*width: 90px;*/
    /*color: #99a9bf;*/
  /*}*/
  /*.demo-table-expand .el-form-item {*/
    /*margin-right: 0;*/
    /*margin-bottom: 0;*/
    /*width: 50%;*/
  /*}*/
</style>
<style>
.menuMangement .el-table__expanded-cell[class*=cell]{
  padding: 0;
}
</style>

