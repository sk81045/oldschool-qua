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
        <div class="text-h6" style="margin-left:9rem; height: 2rem;">申请记录</div>
      </q-card-section>
    <!-- <router-link to='/teacher/vacation/add' > -->
      <q-item clickable v-ripple style="
      border-radius: 3px;
      border: 0.01rem solid #355B75;
      margin-left: 1rem;
      width: 91.5%;
      color: #26a69a;"
      @click="confirm=true">
        <div class="text-h7" style="margin-left:6rem;margin-top: 0.3rem;">
        <q-icon name="add" size="20px" class="q-ml-xs"/>
        创建新的申请</div>
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
          <q-item-section>
            <q-item-label class="text-h6" lines="1" v-if="item.attribute == 2">出差 {{item.days}}  天</q-item-label>
            <q-item-label class="text-h6" lines="1" v-else>请假 {{item.days}}  天</q-item-label>
            <q-item-label class="text-h7" lines="1">{{item.stime}} 至 {{item.etime}}</q-item-label>
            <div style='overflow:hidden;text-overflow: ellipsis;color: rgb(92 88 89);'>
              {{item.reason}}
            </div>
            <q-item-label class="text-h7" style="color: #355B75; width: 7rem;margin-top: 0.5rem;">审批人 {{strTo(item.approver)}}</q-item-label>
            <q-item-label class="text-h7" lines="1" style="color: #355B75;">提交时间 {{item.created_at}}</q-item-label>
            <q-item-label class="text-h7" lines="1" style="color: #355B75;">原因：</q-item-label>
              <div style='overflow:auto;text-overflow: ellipsis; height: 3rem;width: 11rem;'>
                {{item.describe}}
              </div>
          </q-item-section>
          <q-item-section side v-if="item.state == 2">
            <q-item-label class="text-h6" style="color: #355B75; width: 6rem">
              <q-icon
              name="check"
              size="14px"
              class="q-ml-xs"
            />已批准</q-item-label>
          </q-item-section>
            <q-item-section side v-else-if="item.state == 3">
            <q-item-label class="text-h6" style="color: #c10015; width: 6rem">
              <q-icon
              name="close"
              size="14px"
              class="q-ml-xs"
            />未批准</q-item-label>
          </q-item-section>
          <q-item-section side v-else>
            <q-item-label class="text-h6" style="color: #00b4ff; width: 6rem">
            处理中</q-item-label>
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

    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">选择</div>
        </q-card-section>
        <q-card-section class="row items-center">
          <q-radio v-model="apply" val="vacation" label="请假申请" />
          <q-radio v-model="apply" val="trip" label="出差申请" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" v-close-popup @click="create()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </base-content>
</template>

<script>
import BaseContent from '@/components/BaseContent/BaseContent'
import { getList } from '@/api/teacher/Vacation'
export default {
  components: { BaseContent },
  data () {
    return {
      msg: 'vacation',
      confirm:false,
      apply:"vacation",
      query:{
        spend:true,
        recharge:true,
        date: '2022/01',
        proxyDate: '2022/01',
      },
      list:[],
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch() {
      getList().then(res => {
        this.list = res.data.response
      }).catch(error => {
        console.log(error)
      })
    }, 
    updateProxy () {
      this.proxyDate = this.date
    },
    create () {
      if(this.apply == "vacation"){
        this.$router.push('/teacher/vacation/add')
      }else{
        this.$router.push('/teacher/trip/add')
      }
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
