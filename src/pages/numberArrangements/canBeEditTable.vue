<!--表格组件-->
<style scoped>
  .can-be-edit-table-container
  .btn {
    color: #7bc69d;
    font-weight: bold;
  }
</style>
<template>
  <div>
    <el-table
      class="can-be-edit-table-container"
      :data="editTableData"
      stripe
      border
      style="width: 100%">
      <template v-for="(item, index) in tableTrData">
        <template v-if="item.type === 'btn'">
          <template v-if="item.show">
            <el-table-column
                :key="index"
                :prop="item.prop"
                :label="item.label"
                :width="item.type === 'btn' ? '60' : ''"
                align="center">
              <template slot-scope="scope">
                <template v-if="item.event">
                  <i v-if="scope.row.iconType === 'icon'" :class="getNurseIcon(item, scope.row)" @click="dealWithEvent(item.prop, scope.$index, scope.row)"></i>
                  <span v-if="scope.row.iconType === 'text'" :style="item.style" @click="dealWithEvent(item.prop, scope.$index, scope.row)">{{ item.label }}</span>
                </template>
                <template v-else>
                  <i class="iconfont" :class="item.iconName"></i>
                </template>
              </template>
            </el-table-column>
          </template>
        </template>
        <template v-else-if="item.type !== 'btn'">
          <el-table-column :key="index"
             :min-width="item.minWidth !== '' ? item.minWidth : ''"
             :prop="item.prop"
             :label="item.label"
             align="center">
            <template slot-scope="scope">
              <template v-if="item.type === 'select'">
                <template v-if="item.userDefined">
                  <el-select v-if="scope.row.isEdit" size="mini" v-model="scope.row[item.prop]" placeholder="全部类型" >
                    <el-option
                        v-for="(userDefinedItem, userDefinedIndex) in dictionaryData"
                        :key="userDefinedIndex"
                        :label="userDefinedItem.label"
                        :value="userDefinedItem.value">
                    </el-option>
                  </el-select>
                  <span v-else>{{ scope.row[item.prop] }}</span>
                </template>
                <template v-else>
                  <el-select v-if="scope.row.isEdit" size="mini" v-model="scope.row[item.prop]" placeholder="全部类型">
                    <el-option
                        v-for="(dicItem, dicIndex) in dictionaryData[item.prop]"
                        :key="dicIndex"
                        :label="dicItem.dicItemName"
                        :value="dicItem.dicItemCode">
                    </el-option>
                  </el-select>
                  <span v-else>{{ getDictionaryValue(dictionaryData[item.prop], scope.row[item.prop]) }}</span>
                </template>
              </template>
              <template v-if="item.type === 'input'">
                <template v-if="scope.row.isEdit">
                  <el-input size="mini" :disabled="item.disabled" v-model="scope.row[item.prop]" type="text" :placeholder="item.label"></el-input>
                </template>
                <template v-else>{{ scope.row[item.prop] }}</template>
              </template>
              <template v-if="item.type === 'string'">
                {{ scope.row[item.prop] }}
              </template>
            </template>
          </el-table-column>
        </template>
      </template>
    </el-table>
  </div>
</template>
<script>
  export default {
    name: "canBeEditTable",
    components: {
    },
    props: ['tableData', 'tableTrData', 'dictionaryData'],
    data() {
      return {
        editTableData: []
      };
    },
    created() {
      this.copyTableData(this.tableData);
    },
    computed: {
    },
    methods: {
      getDictionaryValue(dicArray, dicCode) {
        let dicValue = '';
        if (dicArray) {
          for (let i = 0; i < dicArray.length; i++) {
            if (dicCode === dicArray[i].dicItemCode) {
              dicValue = dicArray[i].dicItemName;
            }
          }
        }
        return dicValue;
      },
      getNurseIcon(item, row) {
        if (item.prop === 'edit') {
          if (row.iconName === '') {
            return item.iconName;
          } else {
            return row.iconName;
          }
        } else {
          return item.iconName;
        }
      },
      dealWithEvent(prop, rowIndex, row) {
        switch (prop) {
          case 'edit':
            if (row.iconName === 'el-icon-check btn') {
              this.changeData(rowIndex, row);
            } else {
              this.changeStatus(rowIndex);
            }
            break;
          case 'del':
            this.$emit('del-table-data', row.id);
            break;
          default:
            break;
        }
      },
      changeData(index, row) {
        this.$emit('edit-table-data', row);
        let temp = Object.assign({}, this.editTableData[index]);
        temp.isEdit = false;
        this.$set(this.editTableData, index, temp);
      },
      changeStatus(index) {
        let temp = Object.assign({}, this.editTableData[index]);
        temp.isEdit = true;
        temp.iconType = 'icon';
        temp.iconName = 'el-icon-check btn';
        this.$set(this.editTableData, index, temp);
      },
      copyTableData(newVal) {
        if (newVal) {
          let temp = newVal.slice();
          temp.forEach((value, index, array) => {
            temp[index].isEdit = false;
            temp[index].iconType = 'text';
            temp[index].iconName = '';
          });
          this.editTableData = temp;
        }
      }
    },
    watch: {
      tableData(newVal, oldVal) {
        this.copyTableData(newVal);
      }
    }
  };
</script>
