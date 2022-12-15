<template>
  <base-content>
    <div class="q-pa-md">
      <div class="row">
            <q-card-section>
              <q-btn-group outline>
                <q-btn outline color="primary" label="创建科目" icon="note_add" @click="$router.push('/effort/add')" />
              </q-btn-group>
            </q-card-section>
        <q-card class="my-card" style="
    width: 100%;
    height:0px; 
    /*margin-top: -10rem;*/
    color: #355B75;
    border-radius: 10px;
    box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
          <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
    <q-list v-for="(item,index) in 10" :key="index">
      <q-item >
        <q-item-section avatar>
              <q-icon name="brightness_auto" size="xl" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>10月14日</q-item-label>
          <q-item-label class="text-h6">2022第二学期 10月考试</q-item-label>
        </q-item-section>

        <q-item-section side >
          <q-item-label class="text-h6" >上传成绩</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced inset />
    </q-list>
          </q-scroll-area>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="imgview">
      <q-img
        :src="imgUrl"
        basic
      >
      </q-img>
    </q-dialog>
  </base-content>
</template>
<script>
import Vue from 'vue'  
import BaseContent from '@/components/BaseContent/BaseContent'
import { thumbStyleOfMenu } from '@/components/BaseContent/ThumbStyle'
import { List } from '@/api/teacher/Effort'
export default {
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      query:{},
      list:[],
    }
  },
  created(){
    // this.fetch()
  },
  methods:{
    fetch() {
      List({query:this.query}).then(res => {
        this.list = res.data.response
        console.log("this.list",this.list)

      }).catch(error => {
        console.log(error)
      })
    }, 

    Delete(id) {
      Delete({ id: id}).then(res => {
        if(res.data.code == 200){
          this.fetch()
          this.Notify('操作成功','green')
        }
      }).catch(error => {
        console.log(error)
      }) 
    },

  }
}
</script>
