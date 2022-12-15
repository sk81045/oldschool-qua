<template>
  <base-content>
    <div class="q-pa-md">
      <div class="row">
        <q-card class="my-card" style="
    width: 100%;
    /*height:700px; */
/*    margin-top: -19rem;*/
    color: #355B75;
    border-radius: 10px;
    box-shadow: 0px 0px 0rem 0rem #c0c6cf;">
          <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
            <q-card-section>
              <q-btn-group outline>
                <q-btn outline color="primary" :label="SchoolAbout.wxname+' '+Class+'班'" icon="camera" />
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
                    <q-img :src=getImgUrl(items.path) :ratio="1"  @click="imgviews(getImgUrl(items.path))" />
                  </div>
                </div>
                  <div class="space" style="height:20px;"></div>
                <template v-slot:action>
                  <q-btn flat :label="'('+item.like+')赞'" :icon="item.icon" @click="like(index)" />
                </template>
              </q-banner>
              <!-- <div class="space" style="height:10px;"></div> -->
            </div>
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
import { getList,Like } from '@/api/student/Circle'
export default {
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      Class:'',
      query:{},
      list:[],
      likeIcon:'favorite_border',
      imgview:false,
      imgUrl:'',
    }
  },
  created(){

    let user = JSON.parse(sessionStorage.getItem('user_role'))
    this.Class = user.identity.classs.class
    console.log('this.Class',this.SchoolAbout)
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
    imgviews(url) {
      this.imgUrl = url
      this.imgview = true
    },
    getImgUrl (img) {
        return 'http://kick.yoozhi.cn/' + img  
    },
  }
}
</script>
