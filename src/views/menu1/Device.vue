<template>
<div id="q-app">
  <div class="q-pa-md">
    <q-table
      title="table 自定义分页"
      :data="data"
      :columns="columns"
      row-key="name"
      selection="multiple"
      :selected.sync="selected"
      :loading="loading"
      :pagination.sync="pagination"
      @update:selected="getSelected"
      class="table"
    >      
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:bottom class="justify-end">
        <div class="q-pa-md flex flex-center">
          <span>
            {{ pagination.rowsPerPage }}条/页 共
            {{ pagination.rowsNumber }}
            条数据
          </span>
           <q-select outlined v-model="pagination.page" :options="pagination.options" label="Outlined" />
          <q-pagination
            v-model="pagination.page"
            :max="pages"
            :max-pages="5"
            ellipsess
            :direction-links="true"
            @input="changePagination"
          >
          </q-pagination>
          <span>跳至 </span>
          <q-input
            outlined
            v-model="toPage"
            class="pagination-input"
            @input="changeToPage"
            @keyup.enter.native="refreshTableData"
          ></q-input>
          <span> 页</span>
          
        </div>
      </template>
    </q-table>
  </div>
</div>
</template>

<script>
// import BaseContent from '../../components/BaseContent/BaseContent'
import { getDeviceLog } from '../../api/Device'
export default {
  name: 'TableDetail',
  // components: { BaseContent },
  data () {
    return {
      selected: [],
      loading: true,
      pages: 10, // 数据总页数
      toPage: '', // 跳转至
      pagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5,
        rowsNumber: 50, // 总共数据条数
        options:[10,20,30,40,50]
      },
      columns: [
        {
          name: 'desc',
          required: true,
          label: 'Dessert (100g serving)',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`
        },
        { name: 'calories', align: 'center', label: 'Calories', field: 'calories', sortable: true },
        { name: 'fat', label: 'Fat (g)', field: 'fat', sortable: true },
        { name: 'carbs', label: 'Carbs (g)', field: 'carbs' },
        { name: 'protein', label: 'Protein (g)', field: 'protein' },
        { name: 'sodium', label: 'Sodium (mg)', field: 'sodium' },
        { name: 'calcium', label: 'Calcium (%)', field: 'calcium', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) },
        { name: 'iron', label: 'Iron (%)', field: 'iron', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      data: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          sodium: 87,
          calcium: '14%',
          iron: '1%'
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          sodium: 129,
          calcium: '8%',
          iron: '1%'
        },
        {
          name: 'Eclair',
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          sodium: 337,
          calcium: '6%',
          iron: '7%'
        },
        {
          name: 'Cupcake',
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          sodium: 413,
          calcium: '3%',
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          sodium: 327,
          calcium: '7%',
          iron: '16%'
        }
      ]
    }
  },
  methods: {
    changePagination (val) {
      this.selected = []
      console.log(`changePagination: ${val}`)
      this.pagination.page = val
      this.loading = true
      this.getTableData()
    },
    changeToPage (val) {
      this.selected = []
      var r = /^\+?[1-9][0-9]*$/
      if (r.test(val) && parseInt(val) <= this.pages) {
        // 输入正整数 且 小于最大页数
        // console.log(`input toPage: ${val} 是一个正整数`)
      } else {
        this.toPage = ''
      }
    },
    getSelected (newSelected) {
      console.log(`获取selected： ${JSON.stringify(this.selected)}`)
      console.log(`getSelected获取newSelected： ${JSON.stringify(newSelected)}`)
      this.selected = newSelected
    },
    refreshTableData (){
      if (this.toPage !== '') {
        this.pagination.page = parseInt(this.toPage)
        this.loading = true
        this.getTableData()
      }
    },
    getTableData(){
    this.loading = true
     //此处应为接口请求数据
     setTimeout(() => {
       this.loading = false            
      }, 2000);
      
    }
    
  },
  mounted () {
    this.getTableData()
  }

}
</script>

.table {
  .table-th th {
    font-size: 14px !important;
    font-weight: 500 !important;
    line-height: 20px;
  }

  .q-checkbox__inner--truthy .q-checkbox__bg {
    background: #358AFF;
    border: 2px solid #358AFF;
  }

  .q-checkbox__inner--indet .q-checkbox__bg {
    background: #333;
    border: 2px solid #333;
  }

  .q-table__bottom {
    justify-content: flex-end;

  }

  .pagination-input {
    display: inline-block;
    width: 55px;
    margin: 0 3px;

    div {
      height: 32px;
    }
  }
}
