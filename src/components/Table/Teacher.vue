<template>
  <div class="q-pa-md q-gutter-sm">
 <q-tab-panel name="mails">
    <q-table
      separator="cell"
      color="primary"
      :data="list"
      :columns="columns"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
      :loading="loading"
      :pagination.sync="pagination"
      @request="onRequest"
    >
      <template v-slot:top>
        <q-space />
        <q-input borderless dense debounce="300" color="primary" label="按姓名查找" v-model="filter.name">
          <template v-slot:append>
           <a @click="getList()"><q-icon name="search" /></a>
          </template>
        </q-input>
      </template>
    </q-table>
<!--   <div class="q-mt-md">
      Selected: {{ JSON.stringify(selected) }}
    </div> -->
  </q-tab-panel>
<!-- </q-scroll-area> -->
  </div>
</template>
<script>

import { getList } from '../../api/Teacher'
import { thumbStyleOfMenu } from '../../components/BaseContent/ThumbStyle'
export default {
  name: 'TableTeacher',
  data () {
    return {  
      list:[],  
      selected: [],
      filter:{
        // department: '',
        name:'',
      },  
      columns: [
        { name: 'name', align: 'center', label: '姓名', field: 'name' },
        { name: 'phone', align: 'center', label: '手机号码', field: 'phone'},
        { name: 'photo', align: 'center', label: '照片', field: 'fat'},
        { name: 'wechatSync', align: 'center', label: '微信同步', field: 'wechat_sync'},
      ],
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
      params.query = this.filter
      params.page = this.pagination.page
      params.limit = this.pagination.rowsPerPage
      getList(params).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          console.log(res.data)
          this.list = res.data.result.data
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
    getSelectedString () {
    }
  }
}
</script>