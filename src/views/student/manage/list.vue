<template>
  <base-content>
 <div class="q-pa-md">
    <div class="row">
    <q-card class="my-card" style="
    width: 110%; 
    color: #355B75;
    border-radius: 10px;
    box-shadow: 0px 0px 1rem 0rem #c0c6cf;
    ">
      <q-card-section>
        <div class="text-h6" style="margin-left:4rem; height: 2rem;">{{classs}}的学生列表({{list.length}}人)</div>
      </q-card-section>
      <q-item clickable v-ripple style="
      border-radius: 3px;
      border: 0.01rem solid #355B75;
      margin-left: 2rem;
      width: 81.5%;
      color: #26a69a;"
      @click="skip('/student/manage/add')">
        <div class="text-h7" style="margin-left:6rem;margin-top: 0.3rem;">
        <q-icon name="add" size="20px" class="q-ml-xs"/>
        添加学生</div>
      </q-item>

 <div class="q-pa-md flex justify-center">
    <div class="space" style="height:10px;"></div>
    <div style="max-width: 90%;"  v-for="(item,index) in list" :key="index">
        <q-item clickable v-ripple style="
        border-radius: 3px;
        border: 0.01rem solid #355B75;
        margin-left: -1.9rem;
        width: 120%;
        ">
          <q-item-section style="width: 4rem;">
            <q-avatar square v-if="item.photo">
            <img :src="rootURL()+item.photo.path">
            </q-avatar>
            <q-avatar square v-else>
            <img src="@/assets/img/null头像.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-h6" lines="1">{{item.name}}</q-item-label>
            <div style='overflow:hidden;text-overflow: ellipsis;color: rgb(92 88 89);'>
              {{item.reason}}
            </div>
            <q-item-label class="text-h7" style="color: #355B75; width: 5rem;margin-top: 0.5rem;">性别 {{item.sex}}</q-item-label>
            <q-item-label class="text-h7" lines="1" style="color: #355B75; width: 7rem;">学号 {{item.studentid}}</q-item-label>
          </q-item-section>
            <q-item-section side>
            <a @click="Details(item.id)"><q-item-label class="text-h6" style="color: #355B75;width: 3rem;
    margin-left: 50px;">详情</q-item-label></a>
          </q-item-section>
        </q-item>
    <div class="space" style="height:10px;"></div>
    </div>
  </div>
  <!-- <img src="@/assets/img/nodata.svg" style="width: 50%;margin: auto;" v-show="nodata"/> -->
  <img src="@/assets/img/nomore.svg" style="width:100%" />
    </q-card>
</div>
</div>
    <div class="space" style="height:100px;"></div>
      <q-dialog v-model="screen" persistent>
    <q-card>
        <q-card-section>
        <div class="text-h6" style="color:#F50057">
        <q-toolbar-title>
        <q-icon name="report_problem"  style="font-size: 1.5rem;"/> 错误</q-toolbar-title>
        </div>
        </q-card-section>
        <q-card-section class="text-h7">
         没有获取到班级信息,请先创建班级.
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="确定" color="primary" @click="$router.go(-1)" v-close-popup/>
        </q-card-actions>
      </q-card>
  </q-dialog>
  </base-content>
</template>
<script>
import BaseContent from '@/components/BaseContent/BaseContent'
import { getList } from '@/api/student/Manager'
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
      screen:false,
      classs:'',
      classid:'',
      list:[],
    }
  },
  mounted() {
    this.getList()
  },
  methods:{
    getList () {
      getList().then(res => {
        if (res.data.code == 200) {
          if(!res.data.response){
            this.screen = true
          }
          this.list = res.data.response.students
          this.classs = res.data.response.class
          this.classid = res.data.response.id
        }
      }).catch(error => {
        console.log(error)
      })
    },
    Details (uid) {
      this.$router.push('/student/manage/info?uid='+uid)
    },
    skip (url) {
      console.log('skip.....',url)
      this.$router.push(url+'?classid='+this.classid)
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
