<template>
  <base-content>
    <div class="q-pa-md">
      <div class="row">
        <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
          <img :src="require('@/assets/img/atta.png')" style="width:105%" />
        </div>
     <q-card class="my-card" style="
    width: 100%;
    height:0px; 
    text-align: center; 
    margin-top: -15rem;
    color: rgb(3 36 46 / 54%);
    border-radius: 10px;
    box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
        <q-item-section>
          <q-item-label>您好, 来自彤旭小学的张小明家长</q-item-label>
          <q-item-label>您的学号是 8866250</q-item-label>
          <q-item-label style="
          margin-top: 1.5rem;
          font-size: 2rem;
          color: #355B75;"><a style="font-size: 1.3rem;">余额 </a> ¥330.3</q-item-label>
          <q-item-label style="color: #006d21;">(今日已消费 ¥23 元)</q-item-label>
        </q-item-section>
        <q-btn push color="white" text-color="primary" label="筛选消费记录" style="margin-top: 1rem;"/>
    </q-card>     
  <q-card class="my-card" style="
    width: 100%;
    height:0px; 
    /*margin-top: -10rem;*/
    color: #355B75;
    border-radius: 10px;
    box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
  <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
    <q-list>
      <q-item >
        <q-item-section>
          <q-item-label>10月14日</q-item-label>
          <q-item-label class="text-h6">上午 07:34-11:32</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-icon name="check" color="primary" />
          <q-item-label class="text-h6">正常</q-item-label>
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
import { getList,Like,Delete } from '@/api/affairs/Circle'
export default {
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      query:{},
      list:[],
      likeIcon:'favorite_border',
      imgview:false,
      imgUrl:'',
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch() {
      getList({query:this.query}).then(res => {
        this.list = res.data.response
        console.log("this.list",this.list)

      }).catch(error => {
        console.log(error)
      })
    }, 
    like(index) {
      if(this.list[index].likelog == true){
          return false
      }
      Like({ id: this.list[index].id }).then(res => {
        if(res.data.code == 200){
          this.list[index].like = this.list[index].like+1 
          this.list[index].icon = 'favorite'
          this.list[index].likelog = true
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
    imgviews(url) {
      this.imgUrl = url
      this.imgview = true
    },
    getImgUrl (img) {
        return Vue.prototype.$rootURL + img  
    },
  }
}
</script>
