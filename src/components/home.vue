<template>
  <el-container class="home-container">
    <!-- 头部区 -->
    <el-header>
      <div>
        <img src="../assets/light.jpg" alt />
        <span>灯控管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="200px">
        <!-- 侧边栏菜单区 -->
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" router>
          <el-menu-item index="/switch">
            <i class="el-icon-switch-button"></i>
            <span slot="title">开关控制</span>
          </el-menu-item>
          <el-menu-item index="info">
            <i class="el-icon-monitor"></i>
            <span slot="title">信息查询</span>
          </el-menu-item>
          <el-menu-item index="home">
            <i class="el-icon-menu"></i>
            <span slot="title" class="index2">
              <a
                style="text-decoration: none;color: white"
                href="http://localhost:8761/"
                target="_blank"
              >服务注册中心</a>
            </span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      param: {
        token: ''
      }
    }
  },
  methods: {
    logout() {
      this.param.token = window.sessionStorage.getItem('token')
      var that = this
      this.$http
        .post('http://localhost:8030/user/logout', this.param)
        .then(function(response) {
          var data = response.data
          if (data.code === '200') {
            window.sessionStorage.clear()
            that.$message.success('退出成功')
            that.$router.push('/login')
          } else {
            that.$message.error('退出失败')
          }
        })
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #ffffff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
    img {
      height: 40px;
      width: 40px;
      border-radius: 50%;
      padding: 10px;
    }
  }
}

.el-aside {
  background-color: #333744;
}

.el-main {
  background-color: #eaedf1;
}
</style>
