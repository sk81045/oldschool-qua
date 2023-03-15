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
          <q-item-label>欢迎,来自{{user.school.wxname}}的{{user.name}}老师</q-item-label>
          <q-item-label>您的ic卡号是 {{user.teacherid}}</q-item-label>
          <q-item-label style="
          margin-top: 1.5rem;
          font-size: 2rem;
          color: #355B75;"><a style="font-size: 1.3rem;">余额 </a> ¥{{ removeZero(balance)}}</q-item-label>
          <q-item-label style="color: #006d21;">(今日已消费 ¥{{todaypay}} 元)</q-item-label>
        </q-item-section>
        <q-btn push color="white" text-color="primary" label="筛选消费记录" style="margin-top: 1rem;" @click="hiddenDay=true"/>
    </q-card>     
  <q-card class="my-card" style="
    width: 100%;
    height:0px; 
    /*margin-top: -10rem;*/
    color: #355B75;
    border-radius: 10px;
    box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
  <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
    <q-list v-for="(item,index) in list" :key="index">
      <q-item style="color: #355B75;">
        <q-item-section>
          <q-item-label class="text-h6">{{item.MacType}}</q-item-label>
          <q-item-label  style="font-size: 0.8rem;">{{item.PayTime}}</q-item-label>
          <q-item-label  style="font-size: 0.8rem;">余额 ¥{{ removeZero(item.AfterPay)}}</q-item-label>
        </q-item-section>
        <q-item-section side top v-if="item.MacType=='增款'"  style="color: #0C7967;">
          <q-icon name="local_atm" />
          <q-item-label class="text-h6">+¥{{ removeZero(item.PayMoney) }}</q-item-label>
        </q-item-section>
        <q-item-section side top  v-else>
          <q-icon name="restaurant_menu" />
          <q-item-label class="text-h6">-¥{{ removeZero(item.PayMoney) }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator spaced inset />
    </q-list>
  <div class="low">
    <div class="space" style="height:10px;"></div>
    <img src="@/assets/img/nodata.svg" style="width: 50%;margin-left: 6rem;" v-show="nodata"/>
    <!-- <img src="@/assets/img/nomore.svg" style="width:100%" /> -->
  </div>
  <div class="space" style="height:10px;"></div>
          </q-scroll-area>
        </q-card>
      </div>
    </div>
      <q-dialog v-model="hiddenDay">
        <q-date v-model="days" mask="YYYY-MM-DD" range>
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="确定" color="primary" flat @click="chooseDate" v-close-popup />
          </div>
        </q-date>
      </q-dialog>
  </base-content>
</template>
<script>
import Vue from 'vue'  
import BaseContent from '@/components/BaseContent/BaseContent'
import { thumbStyleOfMenu } from '@/components/BaseContent/ThumbStyle'
import { record } from '@/api/teacher/ic/record'
export default {
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      query:{
        spend:true,
        recharge:true,
        date:'',
      },
      user:{
        school:{},
        student:{},
      },
      balance:'0.0000',
      todaypay:'0.0000',
      days: { from: '2022-10-01', to: '2022-10-05' },
      list:[],
      hiddenDay:false,
      nodata:true,
    }
  },
  created(){
    let currentDay = new Date();
    let yesterDay = new Date();
    yesterDay.setDate(currentDay.getDate() - 5);
    this.dateValue  =[yesterDay.toJSON().slice(0,10),currentDay.toJSON().slice(0,10)];
    this.days.from = this.dateValue[0]
    this.days.to = this.dateValue[1]
    this.query.date =  this.days.from +"至"+this.days.to,
    this.fetch()
  },
  methods:{
    fetch() {
      this.showLoading()
      record({query:this.query}).then(res => {
        this.user = res.data.user
         this.list = res.data.result
        if(res.data.result.length == 0){
          this.nodata = true
        }else{
          this.nodata = false
          this.balance = res.data.balance
          this.todaypay = res.data.todaypay
        }
      }).catch(error => {
        console.log(error)
      })
    }, 
    chooseDate(){
      this.query.date = this.days.from +"至"+this.days.to
      this.fetch()
      console.log("this.days",this.days)
    },
    removeZero(str) {
      str = str.substring(0, str.length - 2);
      return  str
    },
  }
}
</script>
