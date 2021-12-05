<!--分页组件-->
<template>
  <div>
    <el-pagination
        background
        :style="pageInfo.style"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="[5, 10, 15, 20, 30, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "Pagination",
    props: {
      pageInfo: {
        type: Object
      }
    },
    data() {
      return {

      };
    },
    methods: {
      handleSizeChange(val) {
        this.$emit('handle-size-change', val);
      },
      handleCurrentChange(val) {
        this.$emit('handle-current-change', val);
      }
    }
  };
</script>

<style scoped>

</style>
