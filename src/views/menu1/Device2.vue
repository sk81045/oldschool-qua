<template>
   <base-content>
  <div class="q-pa-md" >
        <q-tabs
        v-model="tab"
        dense
        active-color="amber"
        align="left"
        class="bg-primary text-white shadow-2"
        :breakpoint="100"
        >
          <q-tab name="mails" label="进门记录"  @click="onTabChange('in')"/>
          <q-tab name="alarms" label="出门记录"  @click="onTabChange('out')"/>
        </q-tabs>
        <div class="height" style="height:10px;"></div>
   <q-tab-panels v-model="tab" animated>
 <q-tab-panel name="mails">
    <q-table
      title=""
      :data="data"
      :columns="columns"
      row-key="name"
      separator="cell"
      :loading="loading"
      :pagination.sync="pagination"
      @request="onRequest"
    >
  <template v-slot:top>
        <q-btn class="q-ml-sm" color="primary"  label="导出记录" @click="exportLog" />
        <q-space />
<!--         <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input> -->
      </template>
      <template v-slot:body="props">

        <q-tr :props="props">
          <q-td key="data_idNo" :props="props">
            {{ props.row.data_idNo }}
          </q-td>
          <q-td key="data_name" :props="props">
            <q-badge color="green">
              {{ props.row.data_name }}
            </q-badge>
          </q-td>
          <q-td key="temperature" :props="props">
              {{ props.row.temperature }}
          </q-td>
          <q-td key="deviceKey" :props="props">
              {{ props.row.deviceKey }}
          </q-td>
          <q-td key="showTime" :props="props">
              {{ props.row.showTime }}
          </q-td>
          <q-td key="photoUrl" :props="props">
          <q-img 
            @click="showImg(props.row.photoUrl)"
            :src="props.row.photoUrl"
            spinner-color="white"
            style="height: 40px; max-width: 20px"/> 
          </q-td>
          <q-td key="type" :props="props">
              <!-- {{ props.row.type }} -->
              教师
          </q-td>
          <q-td key="recMode" :props="props">
              <!-- {{ props.row.recMode }} -->
              人脸验证
          </q-td>
<!--           <q-td key="id"  >
          <q-btn color="primary" size="xs" label="删除"  @click="Delete(props.row.id)" />
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
          </q-tab-panel>
          <q-tab-panel name="alarms">
    <q-table
      title=""
      :data="data"
      :columns="columns"
      row-key="name"
      separator="cell"
      :loading="loading"
      :pagination.sync="pagination"
      @request="onRequest"
    >
  <template v-slot:top>
        <!-- <p>测试</p> -->
        <!-- <q-btn color="primary" :disable="loading" label="Add row" @click="addRow" /> -->
        <q-btn class="q-ml-sm" color="primary"  label="导出记录" @click="exportLog" />
        <q-space />
<!--         <q-input borderless dense debounce="300" color="primary" v-model="filter">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input> -->
      </template>
      <template v-slot:body="props">

        <q-tr :props="props">
          <q-td key="data_idNo" :props="props">
            {{ props.row.data_idNo }}
          </q-td>
          <q-td key="data_name" :props="props">
            <q-badge color="green">
              {{ props.row.data_name }}
            </q-badge>
          </q-td>
          <q-td key="temperature" :props="props">
              {{ props.row.temperature }}
          </q-td>
          <q-td key="deviceKey" :props="props">
              {{ props.row.deviceKey }}
          </q-td>
          <q-td key="showTime" :props="props">
              {{ props.row.showTime }}
          </q-td>
          <q-td key="photoUrl" :props="props">
          <q-img 
            @click="showImg(props.row.photoUrl)"
            :src="props.row.photoUrl"
            spinner-color="white"
            style="height: 40px; max-width: 20px"/> 
          </q-td>
          <q-td key="type" :props="props">
              <!-- {{ props.row.type }} -->
              教师
          </q-td>
          <q-td key="recMode" :props="props">
              <!-- {{ props.row.recMode }} -->
              人脸验证
          </q-td>
     <!--      <q-td key="id"  >
          <q-btn color="primary" size="xs" label="删除"  @click="Delete(props.row.id)" />
          </q-td> -->
        </q-tr>
      </template>
    </q-table>
    </q-tab-panel>
    </q-tab-panels>
 <q-dialog v-model="icon">
      <q-card style="width: 500px">
        <q-card-section class="row items-center q-pb-none">
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
          <q-card-section>
            <q-img
            :src="imgUrl"
            spinner-color="white"
            style="height: 600px; max-width: 450px"
            />
          </q-card-section>
      </q-card>
    </q-dialog>
  </div>
      </base-content>
</template>
<script>
  import Vue from 'vue'
  import BaseContent from '../../components/BaseContent/BaseContent'
  import { getDeviceLog } from '../../api/Device'
export default {
  name: 'Device',
  components: { BaseContent },
  data () {
    return {
      loading: false,
      tab: 'mails',
      icon: false,
      imgUrl: 'http://uniubi-device.oss-cn-hangzhou.aliyuncs.com/device/spot/photo/84E0F429083B08FB/2022-03-18/4ADC6B29B0C44335AC99026E7B59F4E0_20220318161913_rgb.jpg',
      columns: [
        {name: 'data_idNo',required: true,label: '人员编号',align: 'left',field: row => row.data_idNo,format: val => `${val}`, sortable: true},        
        { name: 'data_name', align: 'center', label: '人员姓名', field: row => row.data_name },
        { name: 'temperature', align: 'center', label: '体温 (℃)', field: row => row.temperature, sortable: true },
        { name: 'deviceKey', align: 'center',label: '设备序列号 ', field:row => row.deviceKey,  },
        { name: 'showTime', align: 'center',label: '进入时间', field:row => row.showTime },
        { name: 'photoUrl', align: 'center',label: '抓拍照片', field:row => row.photoUrl},
        { name: 'type', align: 'center',label: '人员类型', field: 'type', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'recMode', align: 'center',label: '识别模式', field: 'recMode', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
         // {name: 'data_idNo',required: true,label: '操作',align: 'left'},  
      ],
      data: [],
      query:{
        type: 'in'
      },
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 0,
        rowsPerPage: 10,
        rowsNumber: 0 // 总共数据条数
      },
    }
  },
  mounted() {
    this.getDeviceLog()
  },
  methods: {
    getDeviceLog() {
      this.loading = true
      const params = {}
      params.query = this.query
      params.page = this.pagination.page
      params.limit = this.pagination.rowsPerPage
      getDeviceLog( params ).then(res => {
        if (res.data.code == 200) {
           this.loading = false
          this.pagination.rowsNumber = res.data.result.total
          this.data = res.data.result.data
        }else{

        }
      }).catch(error => {
        console.log(error)
      })
    },
    onTabChange (num) {
        this.query.type = num
        this.getDeviceLog()
        if(num == 'out'){
          this.columns[4].label = "出门时间"
        }else{
          this.columns[4].label = "进入时间"
        }
    },
    onRequest (props) {
      console.log(props)
      const { page, rowsPerPage, rowsNumber } = props.pagination
      // console.log(`获取page： ${page}  ${rowsPerPage}`)
      this.pagination.page = page
      if (rowsPerPage === 0) {
        // rowsPerPage 为0，表示一页显示全部数据
        this.pagination.rowsPerPage = rowsNumber
      } else {
        this.pagination.rowsPerPage = rowsPerPage
      }
      this.getDeviceLog()
    },

    exportLog() {  //导出记录
      let params = {}
      params.query = this.query
      params.page = this.pagination.page
      params.limit = this.pagination.rowsPerPage

      let nums = '' //分页参数
      let querys = '' //查询参数
      for( let i in params){
        if(typeof params[i] == 'object'){
          querys+="&"+i+"="+JSON.stringify(params[i])
        // console.log(JSON.stringify(params[i]));
        }else{
          nums+="&"+i+"="+params[i]
        }
      }
      window.open( Vue.prototype.$baseURL+'outside/log/export?'+querys+nums, '_blank');
    },

    showImg(url) {
      this.icon = true
      this.imgUrl = url
      console.log(url)
    },

    Delete(id) {
      alert(id)
    },

  },
}
</script>