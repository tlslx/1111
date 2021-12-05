<style lang="less" scoped>

</style>

<template>
  <div>
    <el-row>
      <el-col :span="8" style="text-align:left">
        <div>
          <el-select v-model="inputForm.exAreaId" :clearable="true" style="width:80%" placeholder="展区"
            @change="changeboothChild(inputForm.exAreaId, 1)">
            <el-option v-for="(item, index) in boothArrayNew" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8" style="text-align:center;padding:0 5px">
        <div>
          <el-select v-model="inputForm.fstCatalogId" :clearable="true" style="width:80%" placeholder="一级目录"
            @change="changeboothChild(inputForm.fstCatalogId, 2)">
            <el-option v-for="(item, index) in fstCatalogArray" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </div>
      </el-col>
      <el-col :span="8" style="text-align:right">
        <div>
          <el-select v-model="inputForm.secCatalogId" :clearable="true" style="width:80%" placeholder="二级目录"
            @change="revealForm">
            <el-option v-for="(item, index) in secCatalogArray" :key="index"
              :value="item.value" :label="item.label"></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: {
    editData: {
      type: Object,
      default: function() {
        return {
          exAreaId: "",
          fstCatalogId: "",
          secCatalogId: ""
        };
      }
    }
  },
  //   isSmallAble: {
  //     type: Boolean,
  //     required: false
  //   },
  //   labelWidth: {
  //     type: String,
  //     required: false
  //   }
  data() {
    return {
      inputForm: {
        exAreaId: "",
        fstCatalogId: "",
        secCatalogId: ""
      },
      //第一目录数据
      boothArrayNew: [],
      //数据下拉
      fstCatalogArray: [],
      secCatalogArray: []
    };
  },
  watch: {
    'editData.exAreaId': {
      handler: function(newV, oldV) {
        this.inputForm.exAreaId = this.editData.exAreaId;
        this.changeboothChild(this.editData.exAreaId, 1);
      },
      deep: true,
      immediate: true
    },
    'editData.fstCatalogId': {
      handler: function(newV, oldV) {
        this.inputForm.fstCatalogId = this.editData.fstCatalogId;
        this.changeboothChild(this.editData.fstCatalogId, 2);
      },
      deep: true,
      immediate: true
    },
    'editData.secCatalogId': {
      handler: function(newV, oldV) {
        this.inputForm.secCatalogId = this.editData.secCatalogId;
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapGetters('commonStore', ['boothArray'])
  },
  methods: {
    ...mapActions('commonStore', ['getExhibitionPlace', 'getBoothChild', 'getBoothList']),
    ...mapActions('agents', ['getBoothList']),
    //新增中展区1、2级菜单的变化
    changeboothChild(parentId, level) {
      if (level === 1) {
        this.inputForm.fstCatalogId = "";
        this.inputForm.secCatalogId = "";
        this.fstCatalogArray.splice(0, this.fstCatalogArray.length);
        this.secCatalogArray.splice(0, this.secCatalogArray.length);

      } else if (level === 2) {
        this.inputForm.secCatalogId = "";
        this.secCatalogArray.splice(0, this.secCatalogArray.length);
      }
      let params = {
        level,
        parentId
      };
      this.getBoothChild(params).then(res => {
        if (res && res.length > 0) {
          if (level === 1) {
            for (let item of res) {
              this.fstCatalogArray.push({
                label: item.chName,
                value: item.catalogId
              });
            }
          } else if (level === 2) {
            for (let item of res) {
              this.secCatalogArray.push({
                label: item.chName,
                value: item.catalogId
              });
            }
          }
        }
      });
      this.$emit("change-child", Object.assign({}, this.inputForm));
    },
    revealForm() {
      this.$emit("change-child", Object.assign({}, this.inputForm));
    }
  },
  async created() {
    this.getBoothList().then(res => {
      if (res && res.length) {
        this.boothArrayNew.splice(0, this.boothArrayNew.length);
        for (let item of res) {
          this.boothArrayNew.push({
            value: item.catalogId,
            label: item.chName
          });
        }
      }
    });
    // this.boothArrayNew = await kindo.dictionary.get('ifoExhibitionArea');
    // let { exAreaId, fstCatalogId, secCatalogId } = this.editData;
    // this.inputForm = {
    //   exAreaId,
    //   fstCatalogId,
    //   secCatalogId
    // };
  },
  mounted() {
    this.inputForm = {
      exAreaId: this.editData.exAreaId,
      fstCatalogId: this.editData.fstCatalogId,
      secCatalogId: this.editData.secCatalogId
    };
  }
};
</script>
