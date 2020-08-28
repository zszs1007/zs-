<template>
  <div>

    <!-- 导航 -->

    
    <!-- el-menu的属性
                default-active 默认选中 取决于子标签的index
                background-color    背景色
                active-text-color 点击的文本颜色
    -->
    <el-row>
      <el-col :span="24">
        <el-menu
          :default-active="active"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="	#FF4500"
          unique-opened
          router
        >
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu :index="item.id.toString()" v-for="item in  get_MenuLists" :key="item.id">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item  v-for="items in item.children" :key="items.id" :index="items.url">{{items.title}}</el-menu-item>
           
          </el-submenu>
          <!-- <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-s-goods"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item index="/shop">商品管理</el-menu-item>
          </el-submenu> -->
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
import {getMenulist} from '../util/axios'
export default {
  data() {
    return {
      active: "/home",
      // listnav:[],
    };
  },
  computed:{
        ...mapGetters(['get_MenuLists'])
    
  },
  mounted() {
    this.active = this.$route.path;
    // console.log(this.active);
    this.getmenuListAction()

  },
  methods:{
     ...mapActions(['getmenuListAction'])
  }
  
};
</script>

<style lang="stylus" scoped>
@import '../stylus/index.styl';

.el-menu {
  min-height: 500px;
}
</style>
