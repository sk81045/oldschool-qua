<template>
  <base-content>
   <div class="q-pa-md">
    <div class="row">
    <q-card class="my-card" style="
    z-index:999;
    width: 100%; 
    color: #355B75;
    border-radius: 10px;
    box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
    <div class="q-gutter-y-md column"  style="max-width: 270px;margin-left: 4rem;">
      <q-card-section>
        <div class="text-h6" style="margin-left: 5rem;height:20px;">请假申请</div>
      </q-card-section>
      <q-input bottom-slots v-model="form.date" label="请假时间" type="text" counter maxlength="18" :rules="[ val => val && val.length > 0 || '请假时间不能为空']"  @focus="hiddenDays()">
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">请假时间</q-item-label>
        </template>
         <q-icon name="event" class="cursor-pointer">
        <template v-slot:hint>
          必填
        </template>
        </q-icon>
      </q-input>
      <q-dialog v-model="hiddenDay">
        <q-date v-model="days" range>
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="确定" color="primary" flat @click="chooseDate" v-close-popup />
          </div>
        </q-date>
      </q-dialog>
      <q-input v-model="form.text" bottom-slots label="请假事由" type="textarea">
          <template v-slot:before>
          <q-item-label style="color: #355B75; font-size: 1rem; margin-top: 1rem;width: 5rem;">请假事由</q-item-label>
        </template>
      </q-input>
      <template>
          <q-item-label class="text-h6" style="color: #355B75; font-size: 1rem;width: 6rem;">是否出校</q-item-label>
      </template>
    <div class="q-gutter-sm" style="margin-top: -39px;
    margin-left: 70px;">
      <q-radio v-model="form.out" val="1" label="出校" />
      <q-radio v-model="form.out" val="2" label="不出校" />
    </div>
      <template>
          <q-item-label class="text-h6" style="color: #355B75; font-size: 1rem;width: 6rem;">审批人</q-item-label>
      </template>
        <div class="q-gutter-sm" style="margin-top: -31px;
    margin-left: 75px;">
      <q-chip>
        <q-avatar> <img src="https://cdn.quasar.dev/img/boy-avatar.png"></q-avatar>
        {{approver}}
      </q-chip>
    </div>
          <div class="space" style="height:10px;"></div>
          <q-btn outline color="primary" type="submit" label="提 交" @click="Save()" :loading="loading"/>
    </div>
    <div class="space" style="height:50px;"></div>
</q-card>
</div>
</div>
  <q-dialog v-model="screen" persistent>
    <q-card>
        <q-card-section>
        <div class="text-h6">
        <q-icon name="report_problem"  class="text-red" style="font-size: 2rem;"/>
        </div>
        </q-card-section>
        <q-card-section class="text-h6">
          {{screenMsg}}
        </q-card-section>
        <q-card-actions align="right">
          <a href="/"><q-btn flat label="确定" color="primary" v-close-popup /></a>
        </q-card-actions>
      </q-card>
  </q-dialog>
  <div class="lo" style="width: 100%;height: 320px; position:fixed;bottom:0;">
  </div>
  </base-content>
</template>

<script>
import BaseContent from '@/components/BaseContent/BaseContent'
import { getApprover,saveData } from '@/api/student/Vacation'
export default {
  components: { BaseContent },
  data () {
    return {
      msg: '请假申请',
      loading:false,
      hiddenDay:false,
      screen:false,
      screenMsg:'',
      approver:"",
      form:{
        type:2,
        out:'1',
        date:'',
        approver:'',
      },
      days: { from: '2022/07/01', to: '2022/07/01' },
    }
  },
  created(){
    this.getApprover()
  },
  methods:{
    Save() {
      this.loadings()
      saveData(this.form).then(res => {
        if (res.data.code == 200) {
          this.$q.notify({
              icon: 'insert_emoticon',
              message: '提交成功',
              color: 'green',
              position: 'top',
              timeout: 1500
            })
        let times = setInterval(() => {
          this.$router.go(-1)
          clearInterval(times)
        }, 1500)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    loadings() {
      this.loading = !this.loading
      let times = setInterval(() => {
        this.loading = !this.loading
        clearInterval(times)
      }, 1500); //1000毫秒后执行
    },
    getApprover(){
      getApprover().then(res => {
        if (!res.data.response.classs) {  //部门为空
            this.screenMsg = '没有获取到您所在的班级,无法完成请假审批'
            this.screen = true
            return false
        }
        if(!res.data.response.classs.teacher){ //部门审批人为空
            this.screenMsg = '您所在的班级没有设置审批人(班主任),无法完成请假审批'
            this.screen = true
            return false
          }

        this.approver = res.data.response.classs.teacher.name
        this.form.approver = res.data.response.classs.teacher.id
      }).catch(error => {
        console.log(error)
      })
    },    
    chooseDate(){
      this.form.date = this.days.from +"-"+this.days.to
      console.log("form",this.form.date)
    },
    hiddenDays(){
      this.hiddenDay=true
    }
  }
}
</script>
<style type="text/css">
  .lo{
    background: url('../../../assets/img/education.svg') center bottom / contain no-repeat;
  }
</style>