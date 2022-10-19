<template>
  <base-content>
 <div class="q-pa-md">
    <div class="row">
    <q-card class="my-card" style="
    width: 110%; 
    color: #355B75;
    border-radius: 10px;
    /*top: -80px;*/
    box-shadow: 0px 0px 0.5rem 0rem #c0c6cf;
    ">
      <q-card-section>
        <div class="text-h6" style="margin-left:9rem; height: 2rem;">内部审批</div>
      </q-card-section>
 <div class="q-pa-md flex justify-center">
    <div class="space" style="height:10px;"></div>
    <div style="max-width: 90%;"  v-for="(item,index) in list" :key="index">
        <q-item clickable v-ripple style="
        border-radius: 3px;
        border: 0.01rem solid #355B75;
        /*margin-left: -1.9rem;*/
        width: 100%;"
        @click="toCourse(item.path)"
        >
          <q-item-section>
            <img :src="require('@/assets/img/'+item.icon) " style="width:20%;margin-left: 1rem;"/>
            <q-item-label class="text-h6" lines="1">{{item.title}}</q-item-label>
          </q-item-section>
          <q-item-section side >
          <q-item-label class="text-h6" style="color: #355B75; width: 5rem">
            申请</q-item-label>
            <q-icon
              name="keyboard_arrow_right"
              size="24px"
              class="q-ml-xs"
              style="margin-top: -24px;left: 10px;color: #355B75;"
            />
          </q-item-section>
        </q-item>
    <div class="space" style="height:10px;"></div>
    </div>
  </div>
    <div class="line" style="height:20px; color: #bdbdbd;">
      <q-separator inset style="margin: 0px 0px -8px 20px;width: 30%;height: 0.03rem; background: #bdbdbd;"/>
            <q-item-label style="margin-left: 10rem;">没有更多了</q-item-label>
      <q-separator inset style="margin: -7px 0px 0px 246px;width: 32%;height: 0.03rem; background: #bdbdbd;"/>
    </div>
    </q-card>
</div>
</div>
    <div class="space" style="height:100px;"></div>
  </base-content>
</template>

<script>
import BaseContent from '@/components/BaseContent/BaseContent'
import { getProject } from '@/api/teacher/Apply'
import { toCourse } from '@/utils/Helpers'
export default {
  components: { BaseContent },
  data () {
    return {
      msg: 'vacation',
      query:{
        spend:true,
        recharge:true,
        date: '2022/01',
        proxyDate: '2022/01',
      },
      toCourse:toCourse,
      list:[],
    }
  },
  created(){
    let orign = this.$store.getters.getRoutes[0].children
    orign.forEach((item) => {
        if(this.$route.path.slice(1) == item.path){
            this.fetch(item.id)
        }
    })
  },
  methods:{
    fetch(routeID) {
      getProject({id:routeID}).then(res => {
        if(!res.data.response.length){
          this.Notify('没有需要审批的项目','orange')
          return false
        }
        this.list = res.data.response
         console.log("orign",this.list )
      }).catch(error => {
        console.log(error)
      })
    }, 
    updateProxy () {
      this.proxyDate = this.date
    },
    create () {
        console.log('create.....')
    },
    strTo(josn) {
      if(!josn){
        return "暂无"
      }else{
        return josn.name
      }
    },
  }
}
</script>
<style type="text/css">
  .cta-popular {
    width:100%;
    /*margin-left: 0.6rem;*/
    /*margin: 0.2rem 3px 3px 0.35rem;*/
    border-radius: 30px;
    text-align: center;
    /*font-size: 1.5rem;*/
    font-weight: 400;
    line-height: 3rem;
    background: linear-gradient(315deg, #81d4fa 0%, #00e5ff 110%);
    /*box-shadow: 0px 1px 0.1rem 0.1rem #355B75;*/
    border: 0.2rem solid #355B75;
    /*border: 0.05rem solid #838487;*/
    color: #355B75;
}
.cta-popular img{
  width: 12%;
  position: absolute;
  margin-left: -8rem;
  /*margin-top: 0.5rem;*/
}
.cta-popular p{
  position: absolute;
  margin-left: 4rem;
  margin-top: -1rem;
  font-size: 0.5rem;
}
</style>
