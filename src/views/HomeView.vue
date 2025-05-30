<template>
  <div>
    <el-container>
      <!--   侧边栏   -->
      <el-aside :width="asideWidth" style="min-height: 100vh;background-color: #001529">
        <div style="height: 60px; display: flex; color: white;justify-content: center;align-items: center">
          <img src="@/assets/logo1.png" alt="logo1" style="height: 40px; width: 40px" />
          <span class="logo-title" v-show="!isCollapse">2024</span>
        </div>

        <el-menu :default-active="$route.path" :collapse="isCollapse" :collapse-transition="false" router text-color="rgba(255,255,255,0.65)"  active-text-color="#fff" style="border: none;background-color: #001529" >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-menu-item index="/user">
            <i class="el-icon-house"></i>
            <span slot="title">用户系统首页</span>
          </el-menu-item>
          <el-menu-item index="/admin">
            <i class="el-icon-house"></i>
            <span slot="title">管理员系统首页</span>
          </el-menu-item>
          <el-submenu index="info-management">
            <template slot="title" >
              <i class="el-icon-menu"></i>
              <span>信息管理</span>
            </template>
            <el-menu-item index="/info-management/user-info">用户信息</el-menu-item>
            <el-menu-item index="/info-management/admin-info">管理员信息</el-menu-item>
            <el-menu-item index="/info-management/system-info">系统信息</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <!--   头部区域   -->
        <el-header>
          <i :class="collapseIcon" style="font-size: 26px;" @click="handleCollapse"></i>
          <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-left: 20px">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/user' }">用户管理</el-breadcrumb-item>
          </el-breadcrumb>

          <div style="flex: 1;width: 0;display: flex;align-items: center;justify-content: flex-end">
            <i class="el-icon-quanping" style="font-size: 26px" @click="handleFull"></i>
            <el-dropdown placement="bottom">
              <div style="display: flex; align-items: center;cursor: default">
                <img src="@/assets/logo1.png" alt="logo1" style="height: 40px; width: 40px;margin: 0 5px" />
                <span>管理员</span>
              </div>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
                <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>

        </el-header>

        <!--    主体区域    -->
        <el-main>
          <div style="box-shadow: 0 0 10px rgba(0, 0, 0, .1); padding: 10px 20px; border-radius: 5px; margin-bottom: 10px">
            早
          </div>

          <div style="display: flex">
            <el-card style="width: 30%; margin-right: 10px">
              <div slot="header" class="clearfix">
                <span>案例</span>
              </div>
              <div>
                <div style="margin-top: 20px">
                  <div style="margin: 10px 0"><strong>主题色</strong></div>
                  <el-button type="primary">按钮</el-button>
                  <el-button type="success">按钮</el-button>
                  <el-button type="warning">按钮</el-button>
                  <el-button type="danger">按钮</el-button>
                  <el-button type="info">按钮</el-button>
                </div>
              </div>
            </el-card>
            <el-card style="width: 70%">
              <div slot="header" class="clearfix">
                                <span>
                                  渲染用户数据
                                </span>
              </div>
              <div>
                <el-table :data="users" style="width: 100%">
                  <el-table-column label="ID" prop="id"></el-table-column>
                  <el-table-column label="用户名" prop="username" width="150px"></el-table-column>
                  <el-table-column label="姓名" prop="name" width="150px"></el-table-column>
                  <el-table-column label="地址" prop="address" width="200px"></el-table-column>
                  <el-table-column label="上传头像" width="120px">
                    <template v-slot="scope">
                      <el-upload
                          :show-file-list="false"
                          :headers="{token:user.token}"
                          :on-success="(response, file, fileList)=>handleAvatarUpload(scope.row, response, file, fileList)"
                          action="http://localhost:8081/file/upload">
                        <el-button size="small" type="primary">点击上传</el-button>
                      </el-upload>
                    </template>
                  </el-table-column>
                  <el-table-column label="用户头像" width="120px">
                    <template v-slot="scope">
                      <el-image v-if="scope.row.avatar" :src="scope.row.avatar" style="width: 50px; height: 50px"></el-image>
                      <el-button v-if="scope.row.avatar" size="mini" @click="avatardownload(scope.row.avatar)">下载</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </el-card>
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: 'HomeView',
  data(){
    return {
      isCollapse: false,
      loading: false,
      asideWidth: '200px',
      collapseIcon: 'el-icon-s-fold',
      users: [],
      user: JSON.parse(localStorage.getItem("my-user") || "{}")
    }
  },
  mounted() {
    this.$request.get('/user/selectAll').then(res=>{
      if (res.code==='200') {
        // console.log(res)
        this.users = res.data
      }

    })
  },
  methods:{
    // 头像下载
    avatardownload(url){
      window.open(url)
    },
    handleAvatarUpload(row, response, file, fileList){
      console.log(row, response, file, fileList)

      // 保存到数据库中
      row.avatar = response.data

      this.$request.put('/user/update', row).then(res=>{
        if (res.code==='200') {
          this.$message.success("上传成功")
        } else {
          this.$message.error(res.msg)
        }
      })

    },
    logout(){
      // 清除my-user
      localStorage.removeItem('my-user')

      // 跳转到登录页
      router.push('/login')
    },
    handleFull(){
      document.documentElement.requestFullscreen()
    },
    handleCollapse(){
      this.isCollapse = !this.isCollapse
      this.asideWidth = this.isCollapse ? '64px' : '200px'
      this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    }
  }
}
</script>

<style>
.el-menu--inline{
  background-color: #000c17 !important;
}

.el-menu--inline .el-menu-item {
  background-color: #000c17 !important;
  padding-left: 49px !important;
}

.el-menu-item:hover .el-submenu__title:hover {
  color: #fff !important;
}

.el-submenu__title:hover i {
  color: #fff !important;
}

.el-menu-item.is-active {
  background-color: #1890ff !important;
  border-radius: 5px !important;
  width: calc(100% - 8px);
  margin-left: 4px;
}

.el-menu-item.is-active i, .el-menu-item.is-active .el-tooltip {
  margin-left: -4px ;
}

.el-menu-item i {
  font-size: 18px;
  margin-right: 10px;
  vertical-align: middle;
}

.el-menu-item {
  height: 40px !important;
  line-height: 40px !important;
}

.el-submenu__title{
  height: 40px !important;
  line-height: 40px !important;
}

.el-submenu .el-menu-item{
  min-width: 0 !important;
}

.el-menu--inline .el-menu-item.is-active {
  padding: 45px !important;
}

.el-aside{
  transition: width .3s;
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
}

.logo-title{
  margin-left: 5px;
  font-size: 20px;
  transition: all .3s;
}

.el-header{
  display: flex;
  align-items: center;
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);

}

.el-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.el-dropdown div {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
}

.el-dropdown-menu {
  background-color: #001529 !important;
  color: white !important;
}

.el-dropdown-menu .el-dropdown-item {
  color: white !important;
}
</style>