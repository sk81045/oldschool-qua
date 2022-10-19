<template>
  <base-content>
 <div class="q-pa-md">
    <div class="row">
    <q-card class="cta-popular" >
      <q-card-section>
        <div class="text-h5" style="line-height: 15px;">行唐一中-李某</div>
      </q-card-section>
      <q-separator inset style="height: 2px;
    background: #355B75;"/>
      <q-card-section>
          <img src="../../assets/img/芯片.png"/>
      </q-card-section>
      <q-card-section style="margin-top: -0.9rem;">
      <div class="text-h4" style="margin-left: 5.1rem;">1200555</div>
      </q-card-section>
      <q-card-section style="margin-top: -0.9rem; height: 0px;
    margin-left: 10.5rem;">
      <div class="text-h6">余额 ¥266.66 </div>
      </q-card-section>
      <q-card-section style="margin-top: 0.9rem;
        margin-top: -2.1rem;
        margin-right: 13.1rem;">
        <q-btn unelevated label="充值"  style="background: #355B75; color: #FFF;" />
      </q-card-section>
    </q-card>

    <q-card class="my-card" style="
    width: 100%; 
    color: #355B75;
    border-radius: 10px;
    top: 10px;
    box-shadow: 0px 0px 0.5rem 0rem #c0c6cf;
    height: 0px;
    ">
      <q-card-section>
        <div class="text-h6" style="margin-left:7.5rem; height: 2rem;">消费记录</div>
      <div class="q-gutter-sm" style="
      margin-top: -41px;
      float: right;">
      <q-checkbox keep-color size="xs" v-model="query.spend" label="消费" color="cyan" @input="fetch()"/>
      <q-checkbox keep-color size="xs" v-model="query.recharge" label="充值" color="cyan"  @input="fetch()"/>
    </div>
<div class="q-pa-md" style="margin-top: -2.75rem;">
     <q-item-label class="text-h6" style="color: #00bcd4" ><u>{{ query.date }}月</u></q-item-label>
      <q-popup-proxy @before-show="updateProxy" transition-show="scale" transition-hide="scale">
        <q-date v-model="query.date" mask="YYYY/MM">
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="取消" color="primary" flat v-close-popup />
            <q-btn label="确定" color="primary" flat @click="save" v-close-popup />
          </div>
        </q-date>
      </q-popup-proxy>
  </div>
      </q-card-section>

      <q-separator inset style="height: 1px;
    background: #355B75;"/>
    <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
    <div style="max-width: 90%;" v-for="(item,index) in list" :key="index">
        <q-item clickable v-ripple style="
        margin-left: 0.3rem;
        ">
          <q-item-section style="
            margin-left: 2rem;
            ">
            <q-item-label class="text-h6">{{item.type}}</q-item-label>
            <q-item-label caption lines="1" style="color: #355B75;">余额 ¥{{item.account}} </q-item-label>
            <q-item-label caption lines="1">{{item.created_at}}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-item-label   class="text-h6" style="color: #355B75;">{{item.price}}</q-item-label>
          </q-item-section>
        </q-item>
    </div>

        <div class="space" style="height:20px;"></div>
        <div class="line" style="height:30px; color: #bdbdbd;">
      <q-separator inset style="margin: 0px 0px -8px 20px;width: 30%;height: 0.03rem; background: #bdbdbd;"/>
            <q-item-label style="margin-left: 10rem;">没有更多了</q-item-label>
      <q-separator inset style="margin: -7px 0px 0px 246px;width: 32%;height: 0.03rem; background: #bdbdbd;"/>
    </div>
            </q-scroll-area>
    </q-card>
</div>
</div>
    <div class="space" style="height:100px;"></div>
  </base-content>
</template>

<script>
import BaseContent from '../../components/BaseContent/BaseContent'
import { thumbStyleOfMenu } from '@/components/BaseContent/ThumbStyle'
import { getList } from '@/api/student/Record'
export default {
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      query:{
        spend:true,
        recharge:true,
        date: '2022/01',
        proxyDate: '2022/01',
      },
      list:[
      {'type':'大食堂','price':'- ¥15.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'大食堂','price':'- ¥8.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'大食堂','price':'- ¥1.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'浴室','price':'- ¥15.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'电话','price':'- ¥2.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥20.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥100.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥100.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'电话','price':'- ¥15.00','account':'266.00','created_at':'22-09-08 09:55'},      {'type':'电话','price':'- ¥2.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥20.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥100.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥100.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'电话','price':'- ¥15.00','account':'266.00','created_at':'22-09-08 09:55'},      {'type':'电话','price':'- ¥2.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥20.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥100.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥100.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'电话','price':'- ¥15.00','account':'266.00','created_at':'22-09-08 09:55'},      {'type':'电话','price':'- ¥2.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥20.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥100.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'充值','price':'+ ¥100.00','account':'266.00','created_at':'22-09-08 09:55'},
      {'type':'电话','price':'- ¥15.00','account':'266.00','created_at':'22-09-08 09:55'},
      ],
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch() {
      getList({query:this.query}).then(res => {
        if(res.data.code == 200){
          this.list = res.data.response
        }
        console.log("this.list",this.list)

      }).catch(error => {
        console.log(error)
      })
    }, 
    updateProxy () {
      this.proxyDate = this.date
    },
    save () {
      this.date = this.proxyDate
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
