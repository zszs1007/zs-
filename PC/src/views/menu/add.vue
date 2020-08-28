<template>
  <div>
    <el-dialog :before-close="reset" :title="isShow.isAdd?'添加菜单':'编辑菜单'" :visible.sync="isShow.dialogShow" center>
      <el-form :model="form" :rules="rules" ref="ruleForm">
        <el-form-item prop="title" label="菜单名称" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select v-model="form.pid" placeholder="请选择上级菜单">
            <el-option value disabled>请选择上级菜单</el-option>
            <el-option label="顶级菜单" :value="0">顶级菜单</el-option>
            <el-option
              v-for="item in  get_MenuLists"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单名称" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1">目录</el-radio>
          <el-radio v-model="form.type" :label="2">菜单</el-radio>
        </el-form-item>
        <el-form-item v-if="form.type==1" label="菜单地址" :label-width="formLabelWidth">
          <el-input v-model="form.url" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="form.type==2" label="菜单图标" :label-width="formLabelWidth">
          <el-input v-model="form.icon" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
            active-color="	#4199F1"
            inactive-color="#ccc"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click=" reset">取 消</el-button>
        <el-button type="primary" @click="btn('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions,mapGetters} from "vuex";
import {
  getMenuAdd,
  getMenuInfo,
  getMenuedit
} from "../../util/axios";
export default {
  props: ["isShow"],
  data() {
    return {
        editID: 0, //编辑删除用的  
      formLabelWidth: "120px", //lable宽度
      form: {
        title: "",
        pid: 0,
        type: 1, //类型1目录2菜单
        url: "",
        status: 1,
        icon: "",
      }, //取消弹框
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "canget" }],
      },
    };
  },
    computed: {
    ...mapGetters(["get_MenuLists"]),
  },
  methods:{
        ...mapActions(['getmenuListAction']),
          //  编辑
 update(id) {
      this.isAdd = false;
      this.editID = id;
      getMenuInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.form = res.list;
        }
      });
    },
        //关闭清空表单
     reset() {
      this.form = {
        title: "",
        pid: 0,
        type: 1,
        url: "",
        status: 1,
        icon: "",
      };
      this.$emit('closeDialong',false)
    },
      btn(formName) {
      //  console.log(this.form)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加
          if (this.isShow.isAdd) {
            getMenuAdd(this.form).then((res) => {
              this.$message.success(res.msg);
              this.reset();
              this.getmenuListAction();
            });
          } else {
            //编辑
            this.form.id = this.editID;
            getMenuedit(this.form).then((res) => {
              this.$message.success(res.msg);
              this.reset();
              this.getmenuListAction();
           
            });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  }
};
</script>

<style lang="" scoped>
</style>
