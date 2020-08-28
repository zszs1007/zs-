<template>
  <div>
    <el-table :data="get_specsList" border>
      <el-table-column prop="id" label="规格编号" width="180"></el-table-column>
    <el-table-column prop="specsname" label="规格名称" width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属规格" width="180"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="item">
          <el-tag v-if="item.row.status ==1" type="success">正常</el-tag>
          <el-tag v-else type="danger">禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="item">
          <el-button
            type="primary"
            @click="update(item.row.id)"
            icon="el-icon-edit"
            circle
            size="small"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="del(item.row.id)"
            circle
            size="small"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="total"
    :page-size="pageInfo.size" @current-change="getChange"></el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
//调用接口
import { getspecsDel,getspecscount, getspecsdelete} from "../../util/axios";
export default {
  data() {
    return {
      total:0,
      pageInfo: {
        size: 2,
        page: 1,
      },
       changePage: 1,
    };
  },
  mounted() {
    //页面一加载
    this.getCount()
    this.getSpecsListAction(this.pageInfo);
  },
  computed: {

    ...mapGetters(["get_specsList"]),
  },
  methods: {
    ...mapActions(["getSpecsListAction"]),
    //点击编辑按钮传id
    update(id) {
      this.$emit("update", {
        id,
        isAdd: false,
        changePage:this.changePage

      });
    },
    //删除数据
    del(id) {
      this.$confirm("确定要删除该数据吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //调取删除接口
          getspecsdelete({ id }).then((res) => {
            if (res.code === 200) {
              this.$message({
                type: "success",
                message: res.msg,
              });
              //重新调取列表接口
             this.getCount();
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
    //获取总条数
    getCount(){
      console.log('被调用')
      getspecscount().then(res=>{
        if(res.code==200){
          console.log(res,"总条数")
          this.total = res.list[0].total
          this.getSpecsListAction(this.pageInfo)
        }
      })
    },
    getChange(n){
        console.log(n,"当前页面")
           this.pageInfo.page=n
           this.changePage = n
           this.getSpecsListAction(this.pageInfo)
    }
  },
};
</script>

<style  lang="" scoped>
</style>
