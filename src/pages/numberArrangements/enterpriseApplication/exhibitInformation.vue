<template>
  <el-tabs v-model="activeName" @tab-click="handleClick">
    <el-tab-pane label="当届展品" name="first" v-if="isTrue">
      <exhibit-information-one @onChild="onChild"></exhibit-information-one>
    </el-tab-pane>
    <el-tab-pane label="历届展品" name="second" v-if="isTrue">
      <exhibit-information-two @onChildTwo="onChildTwo"></exhibit-information-two>
    </el-tab-pane>
    <el-tab-pane label="新增展品" name="first" v-if="!isTrue">
      <exhibit-information-add @onTrue="onTrue" @onCancel="onCancel"></exhibit-information-add>
    </el-tab-pane>
  </el-tabs>
</template>
<script>
import ExhibitInformationOne from "./exhibitInformationOne";
import ExhibitInformationTwo from "./exhibitInformationTwo";
import ExhibitInformationAdd from "./exhibitInformationAdd";
export default {
  components: {
    exhibitInformationOne: ExhibitInformationOne,
    exhibitInformationTwo: ExhibitInformationTwo,
    exhibitInformationAdd: ExhibitInformationAdd
  },
  data() {
    return {
      isTrue: true,
      activeName: 'first'
    };
  },
  methods: {
    onChild(val) {
      this.isTrue = val;
    },
    onChildTwo(data) {
      this.activeName = "first";
      this.isTrue = data;
    },
    onTrue(valuer) {
      this.isTrue = valuer;
    },
    onCancel(valer) {
      this.isTrue = valer;
    },
    handleClick(tab, event) {
    }
  }
};
</script>
