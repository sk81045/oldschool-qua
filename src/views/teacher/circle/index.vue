<template>
  <base-content>
    <div class="q-pa-md">
      <div class="row">
<!--         <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
          <img :src="require('@/assets/img/tree.svg')" style="width:100%" />
        </div> -->
        <div class="con" style="
    width: 100%;
    height:700px; 
/*    margin-top: -19rem;*/
    /*color: #355B75;*/
    /*border-radius: 10px;*/
    /*box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
          <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
            <q-card-section>
              <q-btn-group outline>
                <q-btn outline color="primary" label="发布班级圈" icon="camera" @click="$router.push('/teacher/circle/add')" />
              </q-btn-group>
            </q-card-section>
            <div class="cricle" v-for="(item,index) in list" :key="index">
              <!-- <q-separator /> -->
              <q-item clickable v-ripple>
                <q-item-section side>
                  <q-avatar rounded size="48px">
                     <img src="@/assets/img/null头像.png">
                  </q-avatar>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{item.user.name}}</q-item-label>
                  <q-item-label caption>教师</q-item-label>
                </q-item-section>
                <q-item-section side>
                  {{item.created_at}}
                </q-item-section>
              </q-item>
              <q-banner rounded style="margin-top: 0rem;">
                <div class="text-h6" >
                  {{item.context}}
                </div>
                <div class="space" style="height:10px;"></div>
                <div class="q-col-gutter-md row items-start">
                  <div class="col-3" v-for="(items,index) in item.img" :key="index">
                    <q-img :src=getImgUrl(items.path) :ratio="1"  
                    @click="imgviews(getImgUrl(items.path))"/>
                  </div>
                </div>
                  <div class="space" style="height:20px;"></div>
                <template v-slot:action>
                  <q-btn flat :label="'('+item.like+')赞'" :icon="item.icon" @click="like(index)" />
                  <q-btn flat label="删除" @click="Delete(item.id)" v-if="item.id != 1"/>
                </template>
              </q-banner>
              <!-- <div class="space" style="height:10px;"></div> -->
            </div>
          </q-scroll-area>
        </div>
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
