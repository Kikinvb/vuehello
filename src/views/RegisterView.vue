<template>
  <div style="height:100vh; background-color: #0f9876; display:flex; align-items: center; justify-content: center">
    <div style="width: 50%; display: flex; background-color: white; border-radius: 5px; overflow: hidden">
      <div style="flex: 1">
        <img src="@/assets/register.png" style="width: 100%"/>
      </div>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center">
        <el-form style="width: 80%" :model="user" :rules="rules" ref="registerRef">
          <div style="font-size: 20px; font-weight: bold; text-align: center;margin-bottom: 20px">欢迎注册后台管理系统</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="user.username"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" show-password placeholder="请输入密码" v-model="user.password"/>
          </el-form-item>
          <el-form-item prop="confirmpass">
            <el-input prefix-icon="el-icon-lock" show-password placeholder="请确认密码" v-model="user.confirmpass"/>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="register">注册</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">已有账号吗？请<span style="color: #0f9876; cursor: pointer" @click="$router.push('/login')">登录</span></div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "register",

  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入确认密码'));
      } else if(value != this.user.password){
        callback(new Error('两次密码不一致'));
      } else {
        callback()
      }
    }
    return {
      user: {
        username:'',
        password:'',
        confirmpass:''
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        confirmpass: [
          { validator: validatePass, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    getCode(code){
      // console.log(code)
      this.code = code.toLowerCase()
    },
    register() {
      this.$refs["registerRef"].validate((valid) => {
        if (valid) {
          // 验证成功，才进行登录操作
          // console.log(this.code)
          // 发出注册请求
          this.$request.post('/register', this.user).then(res=>{
            // console.log(res)
            // console.log('注册接口返回值:', res);  // 添加这行
            if(res.code=='200'){
              // 注册成功
              this.$router.push('/login')
              this.$message.success("注册成功")
            }else {
              this.$message.error("注册失败")
            }
          })
        }
      });

    }
  }
}
</script>

<style scoped>

</style>