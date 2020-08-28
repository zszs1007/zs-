<template>
  <div>
    <el-container>
      <!-- 头部 -->
      <el-header>管理系统</el-header>
      <el-container>
        
        <!-- 导航 -->
           <el-aside width="200px">
          <navs></navs>
             </el-aside>

             <!-- 二级路由 -->
        <el-main>
          <router-view></router-view>
           </el-main>
      </el-container>
    </el-container>
   
  </div>
</template>

<script>
import navs from'../components/nav'
export default {
  data() {
    return {};
  },
  components:{
     navs
  }
};
</script>

<style  lang="stylus" scoped>
@import '../stylus/index.styl';

.el-header {
  text-align center
  line-height 60px
  font-weight 700
  color $twoBgColor
  letter-spacing 40px
  height 60px
  font-size 30px
  background: $thirdColor;
}


</style>
