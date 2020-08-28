<template>
  <div>
    <m-b></m-b>
    <!-- 点击添加事件 -->
    <el-row>
      <el-button type="primary" @click="Open" size="mini">添加</el-button>
    </el-row>
    <el-table :data="get_MenuLists" border style="width: 95%"  row-key="id" :tree-props="{children: 'children'}">
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
    <!-- 弹框 -->
    <el-dialog :before-close="reset" :title="isAdd?'添加菜单':'编辑菜单'" :visible.sync="dialogShow" center>
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
        <el-form-item v-if="form.type==2"  label="菜单图标" :label-width="formLabelWidth">
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
import {mapActions,mapGetters} from "vuex"
import {
  getMenuAdd,
  getMenulist,
  getMenuInfo,
  getMenuedit,
  getMenuedelete,
} from "../util/axios/";
import mB from "../components/mianbao";
export default {
  data() {
    return {
      editID: 0,
      isAdd: true,
      // tableData: [],
      dialogShow: false,
      formLabelWidth: "120px", //lable宽度
      form: {
        title: "",
        pid: 0,
        type: 1, //类型1目录2菜单
        url: "",
        status: 1,
        icon: "",
      },
      //取消弹框
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "canget" }],
      },
    };
  },
   computed:{
        ...mapGetters(['get_MenuLists'])
  },
  components: {
    mB,
  },
  mounted() {
    // this.get_menulist();
    this.getmenuListAction();
  },
  methods: {
    // 添加事件
    Open() {
      this.isAdd = true;
      this.dialogShow = true;
    },
  
    //  确定事件
    btn(formName) {
      //  console.log(this.form)

      this.$refs[formName].validate((valid) => {
        if (valid) {
          //添加
          if (this.isAdd) {
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
      this.dialogShow = false;
    },

    // get_menulist() {
    //   getMenulist().then((res) => {
    //     if (res.code === 200) {
    //       this.tableData = res.list;
    //     }
    //   });
    // },
      ...mapActions(['getmenuListAction']),
       edit(id) {
      //  编辑
      this.editID = id;
      this.isAdd = false;
      getMenuInfo({ id }).then((res) => {
        if (res.code === 200) {
          this.dialogShow = true;
          this.form = res.list;
        }
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
          getMenuedelete({id}).then((res) => {
            if(res.code===200){
               this.$message({
              type: "success",
              message: res.msg,
            });
              this.get_menulist();
            }else{
              this.$message.error(res.msg)
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
