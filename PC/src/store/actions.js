//引入数据接口
import {getMenulist,getRoleList,getuserlist,getCateList,getspecslist} from "../util/axios"

export default{
    //封装获取菜单列表

    getmenuListAction({commit}){
        getMenulist({
            istree:1
         })
             .then(res=>{   
             if(res.code===200){
              commit("REQ_menulist",res.list)
             }
           })
    },
    //角色
    getRoleListAction({commit}){
        getRoleList()
        .then(res=>{
          if(res.code===200){
            commit('REQ_ROLELIST',res.list)
          }
        })
      },
      //管理员
    getUserListAction({commit},pageInfo){
      getuserlist(pageInfo)
        .then(res=>{
          if(res.code===200){
            commit('REQ_USERLIST',res.list)
          
          }
        })
      },


      // 商城分类
    getCateListAction({commit}){
      getCateList({
        istree:1
      })
        .then(res=>{
          if(res.code===200){
            commit('REQ_CATELIST',res.list)
          
          }
        })
      },
    getSpecsListAction({commit}){
      getspecslist()
        .then(res=>{
          if(res.code===200){
            commit('REQ_SPECSLIST',res.list)
          
          }
        })
      },
}