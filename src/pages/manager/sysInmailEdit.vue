<template>
  <el-form :ref="name" :model="form" :sub-data="subData"  data-url="/api/sysInmail/getSingleById" update-url="/api/sysInmail/updateById"
    add-url="/api/sysInmail/add">
    <el-tabs v-model="activeTab">
      <el-tab-pane label="基本信息" name="baseInfo">
        <el-row>
          <el-form-col label="ID：" prop="inmailId" :span="24">
            <el-input v-model="form.inmailId" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="标题：" prop="title" :span="24">
            <el-input v-model="form.title" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="内容：" prop="content" :span="24">
            <el-input v-model="form.content" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="发布日期：" prop="postTime" :span="8">
            <el-date-picker v-model="form.postTime" :disabled="isView" type="date" formate="date" placeholder="选择发布日期"></el-date-picker>
          </el-form-col>
          <el-form-col label="生效日期：" prop="startTime" :span="8">
            <el-date-picker v-model="form.startTime" :disabled="isView" type="date" formate="date" placeholder="选择生效日期"></el-date-picker>
          </el-form-col>
          <el-form-col label="失效效期：" prop="endTime" :span="8">
            <el-date-picker v-model="form.endTime" :disabled="isView" type="date" formate="date" placeholder="选择失效日期"></el-date-picker>
          </el-form-col>
          <el-form-col label="分类：" prop="inmailClassifier" :span="8">
            <el-input v-model="form.inmailClassifier" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="链接：" prop="operatelink" :span="8">
            <el-input v-model="form.operatelink" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="来源：" prop="source" :span="8">
            <el-select v-model="form.source" placeholder="请选择来源" :disabled="false">
              <el-option v-for="item in source" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-form-col>

          <el-form-col label="状态：" prop="status" :span="8">
            <el-select v-model="form.status" placeholder="请选择" :disabled="false">
              <el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-form-col>
          <el-form-col label="创建者：" prop="creatorName" :span="8">
            <el-input v-model="form.creatorName" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="创建时间：" prop="createDate" :span="8">
            <el-input v-model="form.createDate" :disabled="isView"></el-input>
          </el-form-col>
          <el-form-col label="修改时间：" prop="modify_date" :span="8">
            <el-input v-model="form.modifyDate" :disabled="isView"></el-input>
          </el-form-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="收信人" name="acceptorInfo">
        <el-user-picker
              :disabled="isView" 
              :multiple="true" 
              select-mode="button" @change="selected" >选择接收人</el-user-picker>
        <br />
        <el-datagrid ref="detailtable" :height="300" 
          style="margin-bottom:12px;" 
          v-model="form.records" 
          row-key="inmailRecordId"
          :data="form.records"
          :query-params="queryParams"
          :default-row-data="defaultRowData"
          :editable="!isView"
          :show-checkbox="false">
          <el-table-column prop="receiverId" label="收信人" width="180" sortable="custom"></el-table-column>
          <el-table-column prop="receiverName" label="收信人" width="180" sortable="custom"></el-table-column>
          <el-table-column prop="status" label="状态" width="200" sortable="custom">
             <template slot-scope="scope">{{ getInmailStatus(scope.row.status) }} </template>
          </el-table-column>
          <el-table-column prop="receive_time" label="阅读时间" width="200" sortable="custom"></el-table-column>
        </el-datagrid>
      </el-tab-pane>
    </el-tabs>
  </el-form>
</template>

<script>
  import dialogPageBase from '@/components/framework/mixins/dialogPageBase';
  export default {
    mixins: [dialogPageBase],
    data() {
      return {
        activeTab: 'baseInfo',
        defaultRowData: { inmailId: this.params.id, source: "1", status: "0" },
        status: [
          {
            value: '0',
            label: '未发布'
          },
          {
            value: '1',
            label: '已发布'
          },
          {
            value: '2',
            label: '已删除'
          }
        ],
        source: [
          {
            value: '0',
            label: '内部消息'
          },
          {
            value: '1',
            label: '外部消息'
          }
        ],
        form: {
          content: '',
          createDate: '',
          creatorId: '',
          creatorName: '',
          postTime: '',
          startTime: '',
          endTime: '',
          inmailClassifier: '',
          inmailId: '',
          modifierId: '',
          modifierName: '',
          modifyDate: '',
          operatelink: '',
          source: '0',
          status: '0',
          title: '',
          type: '',
          records: []
        },
        subData: [
          {
            name: "SysInmailRecord",
            data: []
          }
        ],
        carNoSelector: {}
      };
    },
    methods: {
      pageLoad() {},
      selected(value, text, data) {
        let i = 0;
        let _index = -1;
        
        // console.info(value);
        // 查询列表中是否已经存在该用户，有的话忽略，没有则增加
        for (i = 0; i < value.length; i++) {
          // eslint-disable-next-line
          _index = this.form.records.findIndex(function (x) {
            return x.receiverId === value[i];
          });
          // 列表中不存在该用户
          if (_index === -1) {
            let rowItem = {
              inmailId: this.form.inmailId,
              receiverId: '',
              title: this.form.title,
              type: 1,
              inmailClassifier: this.form.inmailClassifier,
              startTime: this.form.startTime,
              endTime: this.form.endTime,
              receiverName: '',
              source: 1,
              status: 0,
              operType: 'ADD'
            };
            rowItem.receiverId = value[i];
            rowItem.receiverName = text[i];
            this.form.records.push(rowItem);
          }
        }
          
      },
      getInmailStatus(_status) {
        switch (_status) {
          case "0":
            return "未读";
          case "1":
            return "已读";
          case "2":
            return "已删";
          default:
            return "其它";
        }
      }
    },
    computed: {
      queryParams() {
        // 查询参数只能放在Computed，不能放到mathods里面，不然会经常刷新列表
        return [{ Name: "inmailId", FindType: "EQ", Values: [this.params.id] }];
      }
    }
  };

</script>
