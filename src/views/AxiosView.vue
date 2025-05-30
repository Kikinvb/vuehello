<template>
  <div>
    <el-table :data="users" style="width: 100%">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="用户名" prop="username" width="100"></el-table-column>
      <el-table-column label="姓名" prop="name"></el-table-column>
      <el-table-column label="Email" prop="email" width="200"></el-table-column>
      <el-table-column label="地址" prop="address" width="180"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  name: "axiosview",
  data(){
    return {
      users:[]
    }
  },
  mounted() {
    /*axios.get('http://localhost:8099/user/selectAll').then(res=>{
        console.log(res)
        this.users = res.data.data
    });*/
    request.get('/user/selectAll').then(res=>{
      // console.log(res)
      this.users=res.data
    })
  }
}
</script>

<style scoped>

</style>