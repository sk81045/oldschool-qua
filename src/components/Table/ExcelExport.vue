<template>
  <div class="export-demo">
    <!-- 点击导出 -->
    <excel-export :bookType="bookType" :filename="filename" :sheet="sheet" :on-error="onError">
                <q-btn-group outline>
                  <q-btn outline color="primary" label="导出记录" icon="arrow_downward" @click="exportLog" :disable="loading"/>
                </q-btn-group>
    </excel-export>



  </div>
</template>

<script>
  import {ExcelExport} from 'pikaz-excel-js'

  export default {
        components: {
            ExcelExport,
        },
        data () {
          return {
            sheet:[
              {
                title:"无",
                tHeader:["编号","姓名","到校时间","状态"],
                keys:["id","name","showTime","已到校"],
                table:[{litchi:"甜",lemon:"酸"},{litchi:"甜",lemon:"酸"}],
                sheetName:"无"
              }
            ]
          }
        }
      }
</script>