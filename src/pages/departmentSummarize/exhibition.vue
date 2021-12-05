<template>
  <div>
<!-- 
    <el-table :data="tableData" :default-sort = "{prop: 'price', order: 'descending'}">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="项目编号" prop="id" ></el-table-column>
      <el-table-column label="项目名称" prop="name"></el-table-column>
      <el-table-column label="到期时间">
        <template slot-scope="scope">
          {{scope.row.deadline | deadline}}
        </template>
      </el-table-column>
      <el-table-column label="赏金" prop="price" :sortable="true" :sort-method="sortByDate"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <a href="javascript:;">[删除]</a>
        </template>
      </el-table-column>
    </el-table> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // tableData: [
        //   {
        //     type: '平面设计',
        //     id: '477760',
        //     name: 'logo设计',
        //     price: 10000,
        //     deadline: 1540260459981,
        //     url: 'javascript:;'
        //   }, {
        //     type: '整站建设',
        //     id: '451534',
        //     name: '信息网站开发',
        //     price: 10000,
        //     deadline: 1544260459981,
        //     url: 'javascript:;'
        //   }, {
        //     type: 'IOS',
        //     id: '789412',
        //     name: '信息网站开发',
        //     price: 10000,
        //     deadline: 1543260459981,
        //     url: 'javascript:;'
        //   }, {
        //     type: 'UI设计',
        //     id: '564325',
        //     name: '信息网站开发',
        //     price: 10000,
        //     deadline: 1541260459981,
        //     url: 'javascript:;'
        //   }, {
        //     type: 'VI设计',
        //     id: '458252',
        //     name: 'VI优化设计',
        //     price: 10000,
        //     deadline: 1545260459981,
        //     url: 'javascript:;'
        //   }, {
        //     type: 'Android',
        //     id: '456782',
        //     name: 'Android开发',
        //     price: 10000,
        //     deadline: 1544860459981,
        //     url: 'javascript:;'
        //   }
        // ]
      };
    // },
    // filters: {
    //   deadline(value) {
    //     let now = new Date().getTime();
    //     if (value - now < 0) {
    //       return '已结束';
    //     } else {
    //       let date = new Date(value);
    //       let Y = date.getFullYear();
    //       let M = date.getMonth() + 1;
    //       let D = date.getDate();
    //       return `${Y}-${M}-${D}`;
    //     }
    //   }
    // },
    // methods: {
    //   sortByDate(obj1, obj2) {
    //     console.log(obj1, obj2, "888");
    //     let val1 = obj1.price;
    //     let val2 = obj2.price;
    //     return val1 - val2;
    //   }
    }
  };
</script>