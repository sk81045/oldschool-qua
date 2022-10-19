<template>
    <base-content>
        <div class="row base-card-shadow" style="margin: 8px;background-color: white">
          <div class="col" style="border-right: 1px solid rgba(0,0,0,0.12)">
              <div class="flex justify-between align-center items-center" style="font-size: 1.32rem;margin: 15px;">
                <span class="text-weight-bold">教师考勤列表</span>
                <q-btn outline color="primary" label="刷新"  @click="getList"/>
              </div>
              <q-separator/>
              <template>
<div class="q-pa-md">
    <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
 <q-tab-panel name="mails">
    <q-table
      color="primary"
      table-header-class="text-brown"
      flat
      bordered
      :data="list"
      :columns="columns"
      row-key="name"
      separator="cell"
      :loading="loading"
      :pagination.sync="pagination"
      @request="onRequest"
    >
      <template v-slot:top>
        <q-btn-group outline>
          <!-- <q-btn outline color="primary" label="导入教师" icon="person_add" :disable="loading"/> -->
          <q-btn outline color="primary" label="导出结果" icon="arrow_downward" :disable="loading"/>
        </q-btn-group>
        <q-space />
        <q-input borderless dense debounce="300" color="primary" label="按姓名查找" v-model="filter.name">
          <template v-slot:append>
           <a @click="getList()"><q-icon name="search" /></a>
          </template>
        </q-input>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="id" :props="props">
            {{ props.row.id }}
          </q-td>
          <q-td key="name" :props="props">
            {{ props.row.name }}
          </q-td>
          <q-td key="dept" :props="props">
            {{ strTo(props.row.dept) }}
          </q-td>
          <q-td key="phone" :props="props">
            {{ props.row.phone }}
          </q-td>
          <q-td key="id" :props="props">
            <q-img
                :src="strTo2(props.row.photo)"
                spinner-color="white"
                style="height: 40px; max-width: 50px"
            >
            <template v-slot:error>
        <div class="absolute-full flex flex-center  text-white">
         无
        </div>
      </template>
          </q-img>
          </q-td>
          <q-td key="name" :props="props">
            <!-- {{ props.row.name }} -->
            暂无
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-tab-panel>
</q-scroll-area>

  </div>
</template>
          </div>

        </div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="desktop_access_disabled" color="red" text-color="white" />
          <span class="q-ml-sm">确定删除? </span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" v-close-popup @click="Delete()" />
        </q-card-actions>
      </q-card>
    </q-dialog>
    </base-content>
</template>

<script>
import { getList,getDepartment,saveData,Update,Delete } from '../../api/Teacher'
import BaseContent from '../../components/BaseContent/BaseContent'
import { thumbStyleOfMenu } from '../../components/BaseContent/ThumbStyle'
// import UploaderAuto  from '../../components/Uploader/Uploader'
export default {
  components: { 
    BaseContent,
    // UploaderAuto
    },
  data () {
    return {
      thumbStyleOfMenu,
      loading: false,
      confirm: false,
      teacherId:'',
      list: [],
      filter:{
        department:true,
        name:'',
      },
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 0,
        rowsPerPage: 10,
        rowsNumber: 0 // 总共数据条数
      },
      columns: [
        {name: 'id',required: true,label: '卡号 ',align: 'left',field: row => row.id,format: val => `${val}`},
        { name: 'name', align: 'center', label: '姓名', field: 'name' },
        // { name: 'department', align: 'center', label: '部门', field: 'dept'},
        { name: 'dept', align: 'center', label: '职务', field: 'dept'},
        { name: 'photo', align: 'center', label: '照片', field: 'photo'},
        { name: 'attendance', align: 'center', label: '考勤状态', field: 'attendance'},
      ],
      formData:{
        sync: '',
      },
      photo:'',
      dept1:[],
      dept2:[],
      dept3:[],
      trueDept:[],
            // options: [ 'Facebook', 'Twitter', 'Apple', 'Oracle'],
      department1:[],
      department2:[],
      department3:[],
      dense: true,
      device: false
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
      params.page = this.pagination.page
      params.limit = this.pagination.rowsPerPage
      getList( params ).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.pagination.rowsNumber = res.data.result.total
          this.list = res.data.result.data
        }else{

        }
      }).catch(error => {
        console.log(error)
      })
    },

    getDepartment(type = 1) {
     
      let pid = ''
      switch(type) {
      case 1:
        console.log('select',type)
        pid = ''
        break;
      case 2:
       console.log('select',this.dept1)
        pid = this.dept1.value;
        break;
      default:
       console.log('select',type)
        pid = this.dept2.value;
      } 

      getDepartment({ query:{pid:pid} }).then(res => {
        if (res.data.code == 200) {
          this.loading = false
        switch(type) {
      case 1:
          this.department1 = res.data.result
        break;
      case 2:
          this.dept2 = []
          this.dept3 = []
          this.department2 = res.data.result
        break;
      default:
          this.dept3 = []
          this.department3 = res.data.result
      } 

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
    deviceSync(status) {
       console.log('close',status)
      this.formData.sync = true
      if(!status){
        this.formData.sync = false
      }
    },
    saveData() {
      this.loading = !this.loading
      this.loading = false
      let data = this.formData 
      data.dept = []
      data.dept[0] = this.dept1.value,
      data.dept[1] = this.dept2.value,
      data.dept[2] = this.dept3.value,
      data.base64 = this.$refs.UploaderAuto.base64img
      console.log('data',this.$refs.UploaderAuto.base64img)
      saveData( data ).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.getList()
          this.$q.notify({
              icon: 'insert_emoticon',
              message: '操作成功',
              color: 'green',
              position: 'top',
              timeout: 5000
          })
        }else{

        }
      }).catch(error => {
        console.log(error)
      })
    },
    update(id,params,type) {
      let data = {}
      data.id = id
      data.data = params
      data.type = type
      Update( data ).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.$q.notify({
              icon: 'insert_emoticon',
              message: '操作成功',
              color: 'green',
              position: 'top',
              timeout: 5000
          })
        }else{

        }
      }).catch(error => {
        console.log(error)
      })
    },
    Delete(id) {
      if(id){
        this.confirm = true
        this.teacherId = id
        return false
      }

      let data = {}
      data.id = this.teacherId
      Delete( data ).then(res => {
        if (res.data.code == 200) {
          this.loading = false
          this.getList()
          this.$q.notify({
              icon: 'insert_emoticon',
              message: '操作成功',
              color: 'green',
              position: 'top',
              timeout: 5000
          })
        }else{

        }
      }).catch(error => {
        console.log(error)
      })
    },
    onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) did not pass validation constraints`
      })
    },
    strTo(josn) {
      if(!josn){
        return "暂无"
      }else{
        return josn.department
      }
    },
    strTo2(photo) {
      if(!photo){
        return "暂无"
      }else{
        return photo.base64
      }
    },


  }
}
</script>
