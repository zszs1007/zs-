import http from './axios'

//封装接口
// 添加菜单
export function getMenuAdd(data){
    return http.post('/menuadd',data)
}

//菜单列表接口

export function getMenulist(params){
    return http.get('/menulist',{
        params
    })
}

//菜单获取（一条）
export function getMenuInfo(params){
    return http.get('/menuinfo',{
        params
    })
}
// 编辑
export function getMenuedit(data){
    return http.post('/menuedit',data)
}
// 删除
export function getMenuedelete(data){
    return http.post('/menudelete',data)
}

/* ----角色接口----- */
//添加角色
export function getRoleAdd(data){
    return http.post('/roleadd',data)
}
//角色列表接口
export function getRoleList(){
    return http.get('/rolelist')
}
//角色获取（一条）
export function getRoleInfo(params){
    return http.get('/roleinfo',{
        params
    })
}
//角色编辑事件
export function getRoleEdit(data){
    return http.post('/roleedit',data)
}
//角色删除事件
export function getRoleDel(data){
    return http.post('/roledelete',data)
}



/* ----管理员接口----- */
//添加管理员
export function getuseradd(data){
    return http.post('/useradd',data)
}
//管理员总数
export function getusercount(){
    return http.get('/usercount')
}
//管理员列表分页
export function getuserlist(params){
    return http.get('/userlist',{
        params
    })
}
//管理员获取一条
export function getuserinfo(params){
    return http.get('/userinfo',{
        params
    })
}
//管理员修改
export function getuseredit(data){
    return http.post('/useredit',data)
}
//管理员删除
export function getuserdelete(data){
    return http.post('/userdelete',data)
}

//管理员登录
export function getuserlogin(data){
    return http.post('/userlogin',data)
}




/* ----商品接口----- */
//添加商品
export function getCateAdd(data){
    return http.post('/cateadd',data)
}
//商品分类列表接口
export function getCateList(params){
    return http.get('/catelist',{
        params
    })
}
//商品分类获取（一条）
export function getCateInfo(params){
    return http.get('/cateinfo',{
        params
    })
}
//商品分类编辑事件
export function getCateEdit(data){
    return http.post('/cateedit',data)
}
//商品分类删除事件
export function getCateDel(data){
    return http.post('/catedelete',data)
}


//.商品规格添加** 
export function getspecsadd(){
    return http.post('/specsadd')
}
//.商品规格总数（用于计算分页）**
export function getspecscount(){
    return http.get('/specscount')
}

//.商品规格列表（分页）** 
export function getspecslist(params){
    return http.get('/specslist',{
        params
    })
}
//4.商品规格获取（一条）
export function getspecsinfo(params){
    return http.get('/specsinfo',{
        params
    })
}
//5.商品规格修改
export function getspecsedit(data){
    return http.post('/specsedit',data)
}
//5.商品规格删除
export function getspecsdelete(data){
    return http.post('/specsdelete',data)
}