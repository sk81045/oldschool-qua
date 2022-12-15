<template>
  <base-content>
 <div class="q-pa-md" loading>
    <div class="row">
    <q-card class="cta-popular" style=" height: 12rem;" >
      <q-card-section>
        <div class="text-h5" style="line-height: 15px;">{{user.school.wxname}}-{{user.student.name}}</div>
      </q-card-section>
      <q-separator inset style="height: 2px;
    background: #355B75;"/>
      <q-card-section>
          <img src="@/assets/img/芯片.png"/>
      </q-card-section>
      <q-card-section style="margin-top: -0.9rem;">
      <div class="text-h4" style="margin-left: 5.1rem;"><span style="font-size: 1rem;">学号 </span>{{user.student.studentid}}</div>
      </q-card-section>
      <q-card-section style="margin-top: -0.9rem; height: 0px;
    margin-left: 10.5rem;">
      <div class="text-h6"><span style="font-size: 1rem;">当前余额 </span>¥ {{ removeZero(balance)}} </div>
      </q-card-section>
<!--       <q-card-section style="margin-top: 0.9rem;
        margin-top: -2.1rem;
        margin-right: 13.1rem;">
        <q-btn unelevated label="充值"  style="background: #355B75; color: #FFF;" v-show="false"/>
      </q-card-section> -->
    </q-card>

    <q-card class="my-card" style="
    width: 100%; 
    color: #355B75;
    height: 0px;
    ">
      <q-card-section>
      <div class="q-gutter-sm" style="
      margin-top: -15px;
      float: right;">
      <q-checkbox keep-color size="xs" v-model="query.spend" label="消费" color="cyan" @input="fetch()"/>
      <q-checkbox keep-color size="xs" v-model="query.recharge" label="充值或减款" color="cyan"  @input="fetch()"/>
    </div>
<div class="q-pa-md" style="margin-top: -15px;" @click="hiddenDay=true">
     <q-item-label class="text-h7" style="margin-left: -1rem;color: #00bcd4" ><u>{{ query.date }} 消费记录</u></q-item-label>
  </div>
    </q-card-section>
    <q-separator inset style="margin-top: -1.5rem;height: 1px; background: #355B75;"/>
    <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
    <div style="max-width: 90%;" v-for="(item,index) in list" :key="index">
        <q-item clickable v-ripple style="
        margin-left: 0.3rem;
        ">
          <q-item-section style="
            margin-left: 2rem;
            ">
            <q-item-label class="text-h6">{{item.MacType}}</q-item-label>
            <q-item-label caption lines="1" style="color: #355B75;">余额 ¥{{ removeZero(item.AfterPay)}} </q-item-label>
            <q-item-label caption lines="1">{{item.PayTime}}</q-item-label>
          </q-item-section>
          <q-item-section side>
        <q-item-label class="text-h6" style="color: #0C7967;" v-if="item.MacType=='增款'">+¥ {{ removeZero(item.PayMoney) }}</q-item-label>
        <q-item-label class="text-h6" style="color: #355B75;" v-else>-¥ {{ removeZero(item.PayMoney) }}</q-item-label>
          </q-item-section>
        </q-item>
    </div>
  <div class="low">
    <div class="space" style="height:50px;"></div>
    <img src="@/assets/img/nodata.svg" style="width: 50%;margin-left: 6rem;" v-show="nodata"/>
    <img src="@/assets/img/nomore.svg" style="width:100%" />
  </div>
  <div class="space" style="height:90px;"></div>
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
import BaseContent from '@/components/BaseContent/BaseContent'
import { thumbStyleOfMenu } from '@/components/BaseContent/ThumbStyle'
import { record } from '@/api/student/Sellfood'
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
      balance:'0.0000',
      user:{
        school:{},
        student:{},
      },
      days: { from: '2022-10-01', to: '2022-10-05' },
      list:[],
      nodata:true,
      loading:false,
      hiddenDay:false
    }
  },
  created(){
    let currentDay = new Date();
    let yesterDay = new Date();
    yesterDay.setDate(currentDay.getDate() - 5);
    this.dateValue  =[yesterDay.toJSON().slice(0,10),currentDay.toJSON().slice(0,10)];

    console.log("var days = new Date().getDate()；",this.dateValue)
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
  margin-top: 0.5rem;
}
.cta-popular p{
  position: absolute;
  margin-left: 4rem;
  margin-top: -1rem;
  font-size: 0.5rem;
}
</style>
