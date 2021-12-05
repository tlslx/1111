export default {
  data () {
    return {
      listDatas: [],
      isAdd: false,
      dialogTitle: '新增',
      totalDatas: 0,
      addDialog: false,
      addUrl: '',
      updateUrl: '',
      deleteUrl: '',
      listUrl: '',
      detailUrl: '',
      forbiddenUrl: '',
      selectIds: [],
      baseApi: process.env.API_FF_URL
    };
  },

  methods: {
    /*
        搜索重置事件处理
      */
    searchListData(form = {}) {
      this.$http.get(this.baseApi + this.listUrl, form).then(res => {
        this.listDatas = res.records;
        this.totalDatas = res.total;
      }).catch(error => {
        this.$message.error(error);
      });
    },
    resetSearchForm() {

    },
    /*
      列表选择处理函数
     */
    handleTabSelectAll(val) {

    },
    handleSelectionChange(val) {

    },
    /*
      新增修改弹框及数据处理
     */
    openAddDialog() {

    },
    openUpdateDialog() {

    },
    /*
      禁用删除弹框及数据处理
     */
    handleforbidden() {

    },
    handleDelete() {

    },
    /*
      列表及详情数据获取
     */
    getDetailDataById() {

    },
    // 消息提示
    showDialogTips(tipMessage) {
      return this.$confirm(tipMessage, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      });
    }
  }
};
