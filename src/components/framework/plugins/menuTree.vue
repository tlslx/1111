<template>
    <div>
        <template v-for="menu in this.menuData">
            <el-submenu v-if="!menu.hidden && menu.children"
              :index="menu.name+menu.id" 
              :key="menu.name+menu.id" style="background-color: transparent;">
                <template slot="title">
                    <i :class="menu.iconCls"></i>
                    <span slot="title">{{menu.name}}</span>
                </template>
                <el-menu-tree @menu-click="menuClick" 
                  :menu-data="menu.children"></el-menu-tree>
            </el-submenu>
            <el-menu-item v-else-if="!menu.hidden" 
              :index="menu.name+menu.id"
              :key="menu.name+menu.id"
              :path="menu.path"
              :name="menu.name"
              :subUrl="menu.subUrl"
              @click="menuClick">
                <i :class="menu.iconCls"></i>
                <span slot="title">{{menu.name}}</span>
            </el-menu-item>
        </template>
    </div>
</template>

<script>
export default {
  props: ["menuData"],
  name: "ElMenuTree",
  methods: {
    menuClick(e) {
      this.$emit("menu-click", e);
    }
  }
};
</script>
