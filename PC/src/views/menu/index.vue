<template>
  <div>
    <m-b></m-b>
    <!-- 点击添加事件 -->
    <el-row>
      <el-button type="primary" @click="Open" size="mini">添加</el-button>
    </el-row>
    <!-- 表格 -->
    <vlist @edit='edit'></vlist>

    <!-- 弹框  父子传值               子传父 -->
    <vadd :isShow="sonStatus" @closeDialong="closeDialong" ref="vDialog"></vadd>
  </div>
</template>

<script>
import vlist from "./list";
import vadd from "./add";
import { mapActions, mapGetters } from "vuex";
import {
  getMenuAdd,

} from "../../util/axios";
import mB from "../../components/mianbao";
export default {
  data() {
    return {
    
      sonStatus: {
        isAdd: true, //是否是添加
        dialogShow: false, //控制对话框隐藏 显示
      },
    };
  },
  components: {
    mB,
    vlist,
    vadd,
  },
  mounted() {
    // this.get_menulist();
  },
  methods: {
    // 添加事件
    Open() {
      this.sonStatus.isAdd = true;
      this.sonStatus.dialogShow = true;
    },

    //关闭事件
    closeDialong(e) {
      this.sonStatus.dialogShow = e;
    },
 
   //编辑
    edit(e) {
         console.log(e)
         this.sonStatus.isAdd=e.isAdd;
         this.sonStatus.dialogShow=true;
         this.editID=e.id
         this.$refs.vDialog.update(e.id)
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
              this.get_menulist();
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

<style lang="stylus" scoped>
.el-button {
  margin: 15px;
  border-radius: 6px;
}
</style>
