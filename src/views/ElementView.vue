<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <div style="width: 100%; height: 100px; background-color: blue"></div>
      </el-col>
      <el-col :span="8">
        <div style="width: 100%; height: 100px; background-color: red"></div>
      </el-col>
      <el-col :span="8">
        <div style="width: 100%; height: 100px; background-color: green"></div>
      </el-col>
    </el-row>

    <div>
      <button>确定</button>
      <el-button>Element默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="info">主要按钮</el-button>
      <el-button type="success">主要按钮</el-button>
      <el-button type="danger">主要按钮</el-button>
      <el-button type="warning">主要按钮</el-button>

      <el-button plain>Element默认按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="info" plain>主要按钮</el-button>
      <el-button type="success" plain>主要按钮</el-button>
      <el-button type="danger" plain>主要按钮</el-button>
      <el-button type="warning" plain>主要按钮</el-button>

      <el-button plain round>Element默认按钮</el-button>
      <el-button type="primary" plain round>主要按钮</el-button>
      <el-button type="info" plain round>主要按钮</el-button>
      <el-button type="success" plain round>主要按钮</el-button>
      <el-button type="danger" plain round>主要按钮</el-button>
      <el-button type="warning" plain round>主要按钮</el-button>

      <el-button circle>字</el-button>
      <el-button circle icon="el-icon-edit" type="primary"></el-button>
      <el-button circle icon="el-icon-delete" type="danger"></el-button>

      <h3>输入框</h3>
      <el-row>
        <el-col>
          <el-input style="width: 200px" v-model="inputval" placeholder="请输入姓名"></el-input>
          <el-input type="textarea" style="width: 200px" v-model="textareaval" placeholder="请输入姓名"></el-input>
          <el-input show-password style="width: 200px" v-model="password" placeholder="请输入密码"></el-input>
          <el-input style="width: 200px" v-model="searchvalue" placeholder="请输入查询内容" prefix-icon="el-icon-search"></el-input>
          <el-input style="width: 200px" v-model="username" placeholder="请输入用户名" suffix-icon="el-icon-user" clearable></el-input>
        </el-col>
      </el-row>

      <el-row class="demo-autocomplete">
        <el-col :span="24">
          <div class="sub-title">激活即列出输入建议</div>
          <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
          ></el-autocomplete>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-select v-model="fruit" @change="FruitChange">
            <el-option value="香蕉">香蕉</el-option>
            <el-option value="苹果">苹果</el-option>
            <el-option value="芒果">芒果</el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row>
        <el-col>
          <el-select v-model="user" @change="UserChange" filterable>
            <el-option v-for="item in users" :key="item.id" :value="item.id" :label="item.label"></el-option>
          </el-select>
        </el-col>
      </el-row>

      <el-row>
        <el-radio-group v-model="gender" @change="genderChange">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-row>

      <h3>多选示例</h3>
      <el-row>
        <el-checkbox-group v-model="checkList" @change="checklistChange">
          <el-checkbox label="篮球"></el-checkbox>
          <el-checkbox label="足球"></el-checkbox>
          <el-checkbox label="乒乓球"></el-checkbox>
        </el-checkbox-group>
      </el-row>

      <h3>日期控件的使用</h3>
      <el-row>
        <el-date-picker type="date" v-model="selectdate" value-format="yyyy-MM-dd" @change="dateChange"></el-date-picker>
        <el-date-picker type="datetime" v-model="selectdatetime" value-format="yyyy-MM-dd HH:mm:ss" @change="dateTimeChange"></el-date-picker>
        <el-date-picker type="daterange"
                        v-model="daterange"
                        start-placeholder="请选择开始日期"
                        end-placeholder="请选择结束日期"
                        value-format="yyyy-MM-dd HH:mm:ss" @change="dateRangeChange"></el-date-picker>
      </el-row>

      <h3>表格的使用</h3>
      <el-row>
        <el-table
            :data="tableData"
            style="width: 100%">
          <el-table-column
              prop="date"
              label="日期"
              width="180">
          </el-table-column>
          <el-table-column
              prop="name"
              label="姓名"
              width="180">
          </el-table-column>
          <el-table-column
              prop="address"
              label="地址">
          </el-table-column>
          <el-table-column lable="操作" v-slot="scope">
            <template>
              <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Element",
  data() {
    return {
      inputval: '',
      textareaval:'',
      password:'',
      searchvalue:'',
      username:'',
      state1: '',
      restaurants: [
        { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
        { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
        { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
        { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
        { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
        { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
        { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
        { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
        { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" }
      ],
      fruit: '',
      user:'',
      users: [
        { label: '张三', id: '134123412341'},
        { label: '李四', id: '134146733341'},
        { label: '王五', id: '134123468799'},
      ],
      gender: '',
      checkList: [],
      selectdate:'',
      selectdatetime:'',
      daterange:'',
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {
    createFilter(queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
      };
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    handleSelect(item) {
      console.log(item)
    },
    FruitChange(item){
      console.log(item)
    },
    UserChange(item) {
      console.log(item)
    },
    genderChange() {
      console.log(this.gender)
    },
    checklistChange() {
      console.log(this.checkList)
    },
    dateChange() {
      console.log(this.selectdate)
    },
    dateTimeChange() {
      console.log(this.selectdatetime)
    },
    dateRangeChange() {
      console.log(this.daterange)
    },
    edit(row) {
      console.log(row)

      // alert(row.address)

      // this.$message.success(row.address)
      // this.$message.warning(row.address)
      // this.$message.error(row.address)
      // this.$message.info(row.address)

      // this.$notify.success(row.address)

      this.$confirm('这是提示文本', '提示', {
        type: 'warning'
      }).then(res=>{
        this.$message.success("你点击了OK")
      }).catch(res=>{
        this.$message.warning("你点击了取消")
      })
    }
  }
}
</script>

<style scoped>

</style>