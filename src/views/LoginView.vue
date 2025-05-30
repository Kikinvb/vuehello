<template>
  <div style="height:100vh; background-color: #0f9876; display:flex; align-items: center; justify-content: center">
    <div style="width: 50%; display: flex; background-color: white; border-radius: 5px; overflow: hidden">
      <div style="flex: 1">
        <img src="@/assets/login.png" style="width: 100%"/>
      </div>
      <div style="flex: 1; display: flex; align-items: center; justify-content: center">
        <el-form style="width: 80%" :model="user" :rules="rules" ref="loginRef">
          <div style="font-size: 20px; font-weight: bold; text-align: center;margin-bottom: 20px">欢迎登录后台管理系统</div>
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="user.username"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" show-password placeholder="请输入密码" v-model="user.password"/>
          </el-form-item>
          <el-form-item prop="code">
            <div style="display: flex">
              <div style="flex: 1">
                <el-input prefix-icon="el-icon-circle-check" placeholder="请输入验证码" v-model="user.code"/>
              </div>
              <div style="flex: 1;height: 41px">
                <ValidCode @update:value="getCode"></ValidCode>
              </div>
            </div>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
          </el-form-item>
          <div style="display: flex">
            <div style="flex: 1">还没有账号吗？请<span style="color: #0f9876; cursor: pointer" @click="$router.push('/register')">注册</span></div>
            <div style="color: #0f9876; cursor: pointer;flex: 1; text-align: right">忘记密码</div>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import ValidCode from "@/components/ValidCode";

export default {
  name: "login",
  components: {
    ValidCode
  },
  data() {
    const validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else if(value.toLowerCase() != this.code){
        callback(new Error('验证码输入错误'));
      } else {
        callback()
      }
    }
    return {
      // 生成的验证码
      code: '',
      user: {
        username:'',
        password:'',
        code:''     // 用户输入的验证码
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ],
      }
    }
  },
  methods: {
    getCode(code){
      // console.log(code)
      this.code = code.toLowerCase()
    },
    login() {
      this.$refs["loginRef"].validate((valid) => {
        if (valid) {
          // 验证成功，才进行登录操作
          // console.log(this.code)
          // 发出登录请求
          this.$request.post('/login', this.user).then(res=>{
            // console.log(res)
            if(res.code=='200'){
              // 登录成功
              this.$router.push('/')
              this.$message.success("登录成功")
              localStorage.setItem("my-user", JSON.stringify(res.data))
            }else {
              this.$message.error("登录失败")
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