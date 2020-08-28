<template>
  <div>
    <el-table
      :data="get_MenuLists"
      border
      style="width: 95%"
      row-key="id"
      :tree-props="{children: 'children'}"
    >
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
      <!-- 编辑和删除 -->
      <el-table-column fixed="right" label="操作">
        <template slot-scope="item">
          <el-button
            type="primary"
            @click="edit(item.row.id)"
            size="small"
            icon="el-icon-edit"
            circle
          ></el-button>
          <el-button
            type="danger"
            @click="del(item.row.id)"
            size="small"
            icon="el-icon-delete"
            circle
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getMenulist, getMenuedelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["get_MenuLists"]),
  },
  mounted() {
    // this.get_menulist();
    this.getmenuListAction();
  },
  methods: {
    ...mapActions(["getmenuListAction"]),
    //获取当前数据的ID
    edit(id) {
      this.$emit("edit", {
        isAdd: false,
        id,
      });
    },
    del(id) {
      //删除
      this.$confirm("确定要删除该信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          getMenuedelete({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              this.getmenuListAction();
            } else {
              this.$message.error(res.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style lang="" scoped>
</style>
