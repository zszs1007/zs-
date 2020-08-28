import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/login',
      component:()=>import('../pages/login'),
  
    },
    {
      path: '/index',
      component:()=>import('../pages/index'),
      children:[
        {
          path:'/home',
          component:()=>import("../views/home")
          },
          {
            path:'/admin',
            component:()=>import("../views/user/index"),
            meta:{
             
              name:'管理员管理'
            }
          },       
          {
            path:'/menu',
            component:()=>import("../views/menu/index"),
            meta:{
              name:'菜单列表'
            }
          },
          {
            path:'/roles',
            component:()=>import("../views/roles/index"),
            meta:{
              name:'角色管理'
            }
          },
          {
            path:'/shop',
            component:()=>import("../views/shop"),
             meta:{
              name:'商品管理'
            }
          },
          {
            path:'/sort',
            component:()=>import("../views/sort"),
             meta:{
              name:'商品分类'
            }
          },
          {
            path:'/specs',
            component:()=>import("../views/specs"),
             meta:{
              name:'商品规格'
            }
          },
          {
            path:'',
            redirect: "/home"
          },
      ]
    },
    {
      path: '*',
      redirect: "/login"
    }
  ]
})
