<template>
  <div>
    <m-b></m-b>
    <!-- 点击添加事件 -->
    <el-row>
      <el-button type="primary" size="mini">添加</el-button>
    </el-row>
    <el-table :data="tableData" border style="width: 95%">
      <el-table-column prop="id" label="菜单编号" width="100"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="pid" label="上级菜单" width="100"></el-table-column>
      <el-table-column prop="icon" label="菜单图标"></el-table-column>
      <el-table-column prop="url" label="菜单地址"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
               <!-- itrm.row 是每一条数据的数据 -->
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <el-row>
          <el-button type="primary" icon="el-icon-edit" size="small" circle></el-button>
          <el-button type="danger" icon="el-icon-delete" size="small" circle></el-button>
        </el-row>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import mB from "../components/mianbao";
export default {
  data() {
    return {
      tableData: [
        {
          id: 1, //菜单编号
          title: "管理", //菜单名称
          pid: 112, //上级菜单
          icon: "", //菜单图标
          url: "", //菜单地址
          status: 1, //状态1正常2禁用
        },
        {
          id: 2, 
          title: "管理", 
          pid: 112, 
          icon: "", 
          url: "", 
          status: 2, 
        },
      ],

    };
  },
  components: {
    mB,
  },
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin: 15px;
  border-radius: 6px;
}
</style>
