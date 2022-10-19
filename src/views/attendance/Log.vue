<template>
    <base-content>
        <div class="row base-card-shadow" style="margin: 8px;background-color: white">
          <div class="col" style="border-right: 1px solid rgba(0,0,0,0.12)">
              <div class="flex justify-between align-center items-center" style="font-size: 1.32rem;margin: 15px;">
                <span class="text-weight-bold">已到校 {{alreadyTotal}} 人</span>
                  <q-input rounded outlined dense  label="按姓名查找" v-model="filter.name">
                  <template>
                  <a @click="getList()"><q-icon name="search" style="font-size: 30px;line-height: 40px;"/></a></template>
                  </q-input>
                <q-btn-group outline>
                  <q-btn outline color="primary" label="导出记录" icon="arrow_downward" @click="exportLog" :disable="loading" />
                  <q-btn outline color="primary" label="刷新"  @click="getList"/>
                  <q-btn outline icon="access_time"  :label="filter.proxyTime" color="primary">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-time v-model="filter.proxyTime">
                  <div class="row items-center justify-end q-gutter-sm">
                    <q-btn label="取消" color="primary" flat v-close-popup />
                    <q-btn label="确定" color="primary" flat @click="getList()" v-close-popup />
                  </div>
                  </q-time>
                  </q-popup-proxy>
                  </q-btn>
                </q-btn-group>
              </div>
              <q-separator/>
              <template>
<div class="q-pa-md">
    <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
  <q-select outlined  v-model="filter.dept" :options="department" @input="getDepartment(1)" label="选择部门" hint="选择部门" :dense="dense"/>
 <q-tab-panel name="mails">
    <q-table
      color="primary"
      table-header-class="text-brown"
      flat
      bordered
      :data="Alreadylist"
      :columns="columns"
      row-key="name"
      separator="cell"
      :loading="loading"
      :pagination.sync="pagination"
      @request="onRequest"
    >
 
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="time" :props="props">
            {{ props.row.devicelogs[props.row.devicelogs.length-1]['showTime'] }}
          </q-td>
          <q-td key="photo" :props="props">
            <q-img
                :src="props.row.devicelogs[props.row.devicelogs.length-1]['photoUrl']"
                spinner-color="white"
                style="height: 40px; max-width: 50px"
            >
            </q-img>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-tab-panel>
</q-scroll-area>
  </div>
</template>
          </div>
            <div class="col-md-6 col-sm-4 col-xs-12">
            <div class="flex justify-between align-center items-center" style="font-size: 1.32rem;margin: 15px;height: 40px">
              <span class="text-weight-bold">未到校 {{Lateslist.length}} 人</span>
            </div>
            <q-separator/>
        <div class="flex justify-between align-center items-center" style="font-size: 1rem;margin: 8px;height: 0px">
            </div>
    <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
 <q-tab-panel name="mails">
    <q-table
      color="primary"
      card-class="bg-red-2 text-brown"
      table-header-class="text-brown"
      flat
      bordered
      :data="Lateslist"
      :columns="columns"
      row-key="name"
      separator="cell"
      :loading="loading"
      :pagination.sync="pagination2"
      @request="onRequest2"
    >
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="time" :props="props">
           暂无
          </q-td>
          <q-td key="photo" :props="props">
            暂无
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-tab-panel>
</q-scroll-area>
          </div>
        </div>
    </base-content>
</template>

<script>
import { getList, getDepartment} from '../../api/Attendance'
import BaseContent from '../../components/BaseContent/BaseContent'
import ExcelExport from '../../components/Table/ExcelExport'
import { thumbStyleOfMenu } from '../../components/BaseContent/ThumbStyle'
import Vue from 'vue'
export default {
  components: { 
    BaseContent,
    // ExcelExport
    },
  data () {
    return {
      thumbStyleOfMenu,
      loading: false,
      confirm: false,
      Alreadylist: [],
      Lateslist: [],
      alreadyTotal:0,
      latesTotal:0,
      department:[],
      filter:{
        export:'',
        name:'',
        proxyTime: '08:30',
        dept:[],
      },
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 0,
        rowsPerPage: 10,
        rowsNumber: 0 // 总共数据条数
      },
      pagination2: {
        sortBy: 'desc',
        descending: false,
        page: 0,
        rowsPerPage: 10,
        rowsNumber: 0 // 总共数据条数
      },
      columns: [
        {name: 'id',required: true,label: '卡号 ',align: 'left',field: row => row.id,format: val => `${val}`},
        { name: 'name', align: 'center', label: '姓名'},
        // { name: 'department', align: 'center', label: '部门', field: 'dept'},
        { name: 'time', align: 'center', label: '打卡时间' },
        { name: 'photo', align: 'center', label: '照片'},
      ],
      dense: true
    }
  },
  mounted() {
    this.getList()
    this.getDepartment()
  },
  methods: {
    getList() {
      this.loading = true
      const params = {}
      params.query = this.filter
      // params.page = this.pagination.page
      // params.limit = this.pagination.rowsPerPage
      getList( params ).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          console.log('res.data.result.already',res.data.result)
          // this.pagination.rowsNumber = res.data.result.total
          this.Alreadylist = res.data.result.already
          this.Lateslist = res.data.result.lates
          this.alreadyTotal = res.data.result.already.length
        }else{

        }
      }).catch(error => {
        console.log(error)
      })
    },

    exportLog() {
      this.filter.export = true
      let params = new URLSearchParams()
      params.append('query',JSON.stringify(this.filter))
      let href = Vue.prototype.$baseURL+'outside/attendance/export?'+params
      window.open(href, "_blank");
    },

    getDepartment(type = '') {
      console.log('filter',this.filter)
      if(type){
        this.getList()
        return false
      }
      let pid = ''
      getDepartment({ query:{pid:pid} }).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.department = res.data.result
        }else{

        }
      }).catch(error => {
        console.log(error)
      })
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
      this.getList()
    },

      onRequest2 (props) {
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
      this.getList()
    },
  }
}
</script>
