<template>
  <base-content>
    <div class="q-pa-md">
      <div class="row">
            <q-card-section>
              <q-btn-group outline>
                <q-btn outline color="primary" label="班级" icon="note_add"/>
              </q-btn-group>
            </q-card-section>
        <q-card class="my-card" style="
    width: 100%;
    height:0px; 
    /*margin-top: -10rem;*/
    color: #355B75;
    border-radius: 10px;
    box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
              <img src="@/assets/img/nodata.svg" style="width: 100%;margin: auto;" v-show="nodata"/>
    <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
    <q-list v-for="(item,index) in list" :key="index">
      <q-item >
        <q-item-section avatar>
              <q-icon name="brightness_auto" size="xl" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-h6">{{item.effort.title}}</q-item-label>
          <q-item v-for="(res,k) in strToJson(item.results)" :key="k" style="min-height: 20px;">
        <q-item-section>
          <q-item-label >{{k}}</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-item-label >{{res}}</q-item-label>
        </q-item-section>
      </q-item>
        </q-item-section>

      </q-item>
      <q-separator spaced inset />
    </q-list>
          </q-scroll-area>
        </q-card>
      </div>
    </div>
  </base-content>
</template>
<script>
import Vue from 'vue'  
import BaseContent from '@/components/BaseContent/BaseContent'
import { thumbStyleOfMenu } from '@/components/BaseContent/ThumbStyle'
import { List } from '@/api/student/Effort'
export default {
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      list:[],
      query:{
        id:''
      },
      nodata:false
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch() {
      List({query:this.query}).then(res => {
        this.list = res.data.response
        if(this.list.length == 0){
          this.nodata = true
        }
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
    skip(url) {
      this.$router.push(url)
    },
    strToJson(str){ 
      let js = JSON.parse(str) 
      return js
    }
  }
}
</script>
