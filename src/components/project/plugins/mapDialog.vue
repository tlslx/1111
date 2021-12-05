<template>
  <div>
    <!--展位信息修改-->
    <el-dialog title="展位信息修改" :close-on-click-modal="false" top="15px" :visible.sync="mapVisible" width="30%">
      <el-form :model="child" label-position="right" ref="child" :rules="rules" label-width="80px">
        <el-form-item label="展厅编号" prop="code">
          <el-select v-model="child.code" :disabled="disabled" class="inputclass" :clearable="true" :editable="true">
            <el-option v-for="item in source.expcode" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="disedit" label="展区名称" prop="name">
          <el-select v-model="child.name" class="inputclass" :clearable="true" :editable="true" @change="selectChange">
            <el-option v-for="item in source.expname" :key="item.value" :label="item.label" :value="item.label">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="disedit" label="文字颜色" prop="color">
          <el-radio-group v-model="child.color" size="mini">
            <el-radio-button label="#000">黑色</el-radio-button>
            <el-radio-button label="#ffffff">白色</el-radio-button>
            <el-radio-button label="#FFD700">黄色</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="disedit&&discolor" label="展区颜色" prop="areaColor">
          <el-color-picker @change="colorChange" :predefine="predefineColors" v-model="child.areaColor"></el-color-picker>
        </el-form-item>
      </el-form>
      
      <div slot="footer" class="dialog-footer">
        <el-button @click="mapVisible = false">取消</el-button>
        <el-button type="primary" v-if='disubmit' @click="onSubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'mapDialog',
  props: {
    api: {
      type: Object,
      default: () => {
        return {};
      }
    },
    language: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data () {
    return {
      action: "",
      hastype: "",
      rowdata: {},
      child: {
        code: "",
        name: "",
        ename: "",
        color: "#000",
        areaColor: ""
      },
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#5615c7',
        '#c71585',
        '#c7151b'
      ],
      disabled: false,
      disedit: true,
      discolor: true,
      disubmit: true,
      source: {
        expcode: [],
        expname: []
      },
      rules: {
        name: [
          { required: true, message: ' ', trigger: 'blur' }
        ],
        code: [
          { required: true, message: ' ', trigger: 'blur' }
        ]
      },
      mapVisible: false
    };
  },
  async created () {
    if (this.api.get) {
      this.loadinfo();
      this.source.expname = await kindo.dictionary.get('exhibitionArea'); // 展区
    }
  },

  mounted() {
    this.$nextTick(function () {
    });
  },
  methods: {
    // 展位信息修改
    getadd() {
      this.child.code = this.rowdata.code;
      this.child.name = this.rowdata.name;
      if (this.rowdata.exhibition.color && this.rowdata.exhibition.type === '3') {
        this.child.color = this.rowdata.exhibition.color;
        this.discolor = false;
      } else {
        this.child.areaColor = this.rowdata.exhibition.color;
        this.discolor = true;
      }
      if (this.rowdata.exhibition) {
        this.hastype = this.rowdata.exhibition.type;
        if (this.hastype === '1' || this.child.code !== '') {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      } else {
        this.hastype = '3';
        this.disabled = false;
      }
    },
    // 底图数据修改
    getedit() {
      this.disedit = false;
      this.disubmit = true;
      this.child.code = this.rowdata.code;
      this.child.name = this.rowdata.name;
      // if (this.rowdata.exhibition.color && this.rowdata.exhibition.type === '3') {
      //   this.child.color = this.rowdata.exhibition.color;
      // }
      if (this.rowdata.exhibition) {
        this.hastype = this.rowdata.exhibition.type;
        if (this.hastype === '1' || this.child.code !== '') {
          this.disabled = true;
          this.disubmit = false;
        } else {
          this.disabled = false;
        }
      } else {
        this.hastype = '3';
        this.disabled = false;
      }
    },
    loadinfo() {
      let params = {
        json: {
          customQueryParams: {},
          page: {
            current: 1,
            size: 1000
          }
        }
      };
      this.$http.get(this.api.getexpCode, params).then(res => {
        let newarry = [];
        res.records.map(item => {
          let infos = {
            label: item.exhibitionHallCode,
            value: item.exhibitionHallCode
          };
          newarry.push(infos);
        });
        this.source.expcode = newarry;
      });
    },
    selectChange(val) {
      if (val) {
        this.source.expname.map(item => {
          if (item.label === val) {
            this.child.ename = item.ename;
          }
        });
      }
    },
    colorChange(v) {
      let _this = this;
      if (v) {
        _this.child.areaColor = v;
      } else {
        _this.child.areaColor = '#ffffff';
      }
      // const checkedList = _this.canvas.getExhibitionByPropName('checked', true);
      // const checkAllList = _this.canvas.getObjects();
      // if (!checkedList || !checkedList.length) {
      //   kindo.util.alert('请先选中展区', '提示', 'warning');
      //   return false;
      // }
      // checkedList.forEach(stand => {
      //   let value = {
      //     name: stand.name,
      //     color: _this.areaColor
      //   };
      //   _this.canvas.planExhibition(1, value, checkAllList);
      // });
    },
    // 保存提交数据
    onSubmit() {
      this.$refs.child.validate((valid) => {
        if (valid) {
          this.mapVisible = false;
          if (this.action === 'edit') {
            this.child.name = this.child.code;
          }
          this.$emit('loaddata', this.child);
          kindo.util.alert('提交成功', 'success');
        }
      });
    }
  },
  watch: {
    "action"(value) {
      switch (value) {
        case "add":
          return this.getadd();
        case "edit":
          return this.getedit();
        default:
          return "";
      }
    }
  }
};
</script>

<style scoped>
  .maincenter{
    text-align: center;
  }
</style>
