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
        <div class="text-h6" style="margin-left:6rem; height: 2rem;">学生请假审批列表</div>
      </q-card-section>
      <q-tabs
        v-model="query.approveState"
        narrow-indicator
        dense
        align="justify"
        @click=fetch()
      >
        <q-tab style="color: #355B75;" name="0" label="未处理" />
        <q-tab style="color: #355B75;" name="1" label="已处理" />
      </q-tabs>


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
            <q-item-label class="text-h6" lines="1">{{strTo(item.student)}} 请假 {{item.days}}  天</q-item-label>
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
            <q-item-label class="text-h6" style="color: #355B75; width: 5rem">
              <q-icon
              name="check"
              size="14px"
              class="q-ml-xs"
            />已批准</q-item-label>
          </q-item-section>
            <q-item-section side v-else-if="item.state == 3">
            <q-item-label class="text-h6" style="color: #c10015; width: 5rem">
              <q-icon
              name="close"
              size="14px"
              class="q-ml-xs"
            />未批准</q-item-label>
          </q-item-section>
          <q-item-section side v-else-if="item.state == 1">
            <q-item-label class="text-h6" style="color: #00b4ff; width: 6rem" @click=detail(index)>
            处理中</q-item-label>
          </q-item-section>
            <q-item-section side v-else>
            <q-item-label class="text-h6" style="color: #00b4ff; width: 6rem" @click=detail(index)>
            去处理</q-item-label>
            <q-icon
              name="keyboard_arrow_right"
              size="24px"
              class="q-ml-xs"
              style="margin-top: -24px;left: 0px;color: #00b4ff;"
            />
          </q-item-section>
        </q-item>
    <div class="space" style="height:10px;"></div>
    </div>
  </div>
  <img src="@/assets/img/nodata.svg" style="width: 50%;margin: auto;" v-show="nodata"/>
  <img src="@/assets/img/nomore.svg" style="width:100%" />
    </q-card>
</div>
</div>
  <q-dialog v-model="detailvw">
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-h6">{{this.details.student.name}}-申请请假 {{this.details.days}} 天</div>
          <div class="text-h6">{{this.details.stime}} 至 {{this.details.etime}}</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
          <p style="font-size:1.2rem">{{this.details.describe}}。</p>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <q-btn flat label="拒绝" color="primary" v-close-popup @click=approver(details.id,3) />
          <q-btn flat label="批准" color="primary" v-close-popup @click=approver(details.id,2) />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="space" style="height:100px;"></div>
  </base-content>
</template>

<script>
import BaseContent from '@/components/BaseContent/BaseContent'
import { StudentApproveList,StudentApproveAction } from '@/api/teacher/Vacation'
export default {
  components: { BaseContent },
  data () {
    return {
      detailvw:false,
      msg: 'vacation',
      query:{
        approveState:'0',
        type:'2',
      },
      details:{
        student:{},
      },
      list:[],
      nodata:false
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch() {
      StudentApproveList({query:this.query}).then(res => {
        this.list = res.data.response
        if(!this.list.length){
          this.nodata = true
        }else{
          this.nodata = false
        }
        
      }).catch(error => {
        console.log(error)
      })
    }, 
    detail(key){
      this.details = this.list[key]
      console.log('key',this.list[key])
      this.detailvw = true
    },
    approver(id,act){
      StudentApproveAction({id:id,act:act}).then(res => {
      console.log('StudentApproveAction ok')
      this.fetch()
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
