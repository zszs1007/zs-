<template>
  <div>
    <m-b></m-b>
    <div>
       <el-button type="primary" @click="openDialog" size="mini" >添加</el-button>
    </div>
    <!-- table 表格渲染 -->
    <el-role  @update='update'></el-role>
    <!-- 弹框的渲染 -->
    <v-add ref='vAdd' :isShow="sonStatus" @closeDialog="closeDialog"></v-add>
  </div>
</template>

<script>
import MB from "../../components/mianbao";
import elRole from "./list";
import vAdd from "./add";
export default {
  data() {
    return {
      sonStatus: {
        isAdd: true, //是否是添加
        dialogShow: false, //控制对话框的显示隐藏
      },
    };
  },
  components: {
   MB,
    elRole,
    vAdd,
  },
  methods: {
    //打开弹框
    openDialog() {
      this.sonStatus.isAdd = true;
      this.sonStatus.dialogShow = true;
    },
    //关闭弹框
    //关闭弹框事件
    closeDialog(e) {
      this.sonStatus.dialogShow = e;
    },
    //update事件
    update(e){
        this.sonStatus.isAdd = e.isAdd
        this.sonStatus.dialogShow = true
        this.$refs.vAdd.update(e.id)
    }
  },
};
</script>

<style lang="stylus" scoped>
.el-button {
  margin: 15px;
  border-radius: 6px;
}
</style>
