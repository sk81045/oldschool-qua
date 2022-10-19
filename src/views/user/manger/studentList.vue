<template>
   <base-content>
  <div class="q-pa-md" >

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
          <q-td key="msg" :props="props">
            {{ props.row.msg }}
          </q-td>
          <q-td key="time" :props="props">
            <q-badge color="green">
              {{ props.row.time }}
            </q-badge>
          </q-td>
<!--           <q-td key="id"  >
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
  import BaseContent from '@/components/BaseContent/BaseContent'
  import { getList } from '@/api/Message'
export default {
  name: 'Device',
  components: { BaseContent },
  data () {
    return {
      loading: false,
      tab: 'mails',
      icon: false,
      imgUrl: '',
      columns: [
        {name: 'msg',required: true,label: '短信内容',align: 'left',field: row => row.msg,format: val => `${val}`, sortable: true},        
        { name: 'time', align: 'center', label: '发送时间', field: row => row.time },
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
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      const params = {}
      params.query = this.query
      params.page = this.pagination.page
      params.limit = this.pagination.rowsPerPage
      getList( params ).then(res => {
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
        this.getList()
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
      this.getList()
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