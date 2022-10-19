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
        <div class="text-h6" style="margin-left: 5rem;height:20px;">出差申请</div>
      </q-card-section>
      <q-input bottom-slots v-model="form.date" label="出差时间" type="text" counter maxlength="18" :rules="[ val => val && val.length > 0 || '请假时间不能为空']"  @focus="hiddenDays()">
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
      <q-input v-model="form.reason" bottom-slots label="出差原因" type="textarea">
          <template v-slot:before>
          <q-item-label style="color: #355B75; font-size: 1rem; margin-top: 1rem;width: 5rem;">出差原因</q-item-label>
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
        <q-avatar> <img src="@/assets/img/null头像.png"></q-avatar>
        {{approver}}
      </q-chip>
       <q-btn outline color="primary" type="submit"  size="sm" label="选择" @click="chooseAv(true,'选择审批人')" :loading="loading" style="left: 2rem;"/>
    </div>
      <template>
          <q-item-label class="text-h6" style="color: #355B75; font-size: 1rem;width: 6rem;">抄送人</q-item-label>
      </template>
        <div class="q-gutter-sm" style="margin-top: -31px;
    margin-left: 75px;">
      <q-chip>
        <q-avatar> <img src="@/assets/img/null头像.png"></q-avatar>
        {{copyer}}
      </q-chip>
      <q-btn outline color="primary" type="submit"  size="sm" label="选择" @click="chooseAv(true,'选择审抄送人')" :loading="loading" style="left: 2rem;"/>
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
        <div class="text-h6" style="color:#F50057">
        <q-toolbar-title>
        <q-icon name="report_problem"  style="font-size: 1.5rem;"/> 错误</q-toolbar-title>
        </div>
        </q-card-section>
        <q-card-section class="text-h7">
         没有获取到您的部门信息,无法完成请假审批
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="确定" color="primary" v-close-popup @click="$router.go(-1)"/>
        </q-card-actions>
      </q-card>
  </q-dialog>
  <div class="lo" style="width: 100%;height: 320px; position:fixed;bottom:0;">
  </div>
  <!------------- dialog ---------------->
  <q-dialog
      v-model="selected"
      persistent
      :maximized=true
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="text-white">
        <q-bar style="color: #FFF;background-color: #355B75;">
          <q-space />
          <q-btn dense flat icon="close"  label="点击关闭" v-close-popup>
            <q-tooltip content-class="bg-white text-primary"></q-tooltip>
          </q-btn>
        </q-bar>
      <q-card class="selected" style="
      margin-top: 10px;
      width: 90%;
      color: rgb(53, 91, 117);
      border-radius: 10px;
      border: 0.01rem solid #355B75;
      margin-left: 20px;">
    <div class="q-gutter-y-md column"  style="max-width: 270px;margin-left: 4rem;">
      <q-card-section>
        <div class="text-h6" style="color: #355B75;margin-left: 4rem;height:10px;">{{title}}</div>
      </q-card-section>
      <div class="q-gutter-sm" style="margin: -40px;
        margin-top: 10px;">
      <span v-for="(item,index) in approverList" :key="index" style="margin: 0.2rem;font-size: 1rem;">
        <q-radio dense v-model="radio" :val="index" :label="item.name" />
      </span>
     </div>
      <div class="space" style="height:30px;"></div>
      <q-btn outline color="primary" type="submit" label="确 定" @click="chooseAv(false)" :loading="loading"/>
    </div>
      <div class="space" style="height:50px;"></div>
      </q-card>
      </q-card>
    </q-dialog>
<!------------- dialog ---------------->
  </base-content>
</template>

<script>
import BaseContent from '@/components/BaseContent/BaseContent'
import { getApprover,VacationAdd } from '@/api/teacher/Vacation'
export default {
  components: { BaseContent },
  data () {
    return {
      msg: '请假申请',
      loading:false,
      hiddenDay:false,
      screen:false,
      selected:false,
      approver:"",
      copyer:"",
      title:"",
      radio:'',
      approverList:[],
      form:{
        type:1,
        attribute:2,
        out:'1',
        date:'',
        reason:'',
        approver:'',
        copyer:'',
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
      if(!this.form.date){
        this.Notify('请填写请假时间','orange')
        return false
      }
      if(!this.form.reason){
        this.Notify('请填写请假原因','orange')
         return false
      }
      if(!this.form.approver){
        this.Notify('审批人不能为空','orange')
        return false
      }
      if(!this.form.copyer){
        this.Notify('抄送人不能为空','orange')
        return false
      }
      VacationAdd(this.form).then(res => {
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
        if (!res.data.response.dept) {
          this.screen = true
          return false
        }
        this.approver = res.data.response.dept.approver.name
        this.form.approver = res.data.response.dept.approver.id
        this.approverList = res.data.list
      }).catch(error => {
        console.log(error)
      })
    },    
    chooseDate(){
      this.form.date = this.days.from +"-"+this.days.to
      console.log("form",this.form.date)
    },
    chooseAv(bool,type){
      this.selected = bool
      if(bool == true){
        this.title = type
        console.log("this.title",this.title)
        return false
      }
        console.log("this.title",this.title)

      if(this.title == "选择审批人"){
          var teacher = this.approverList[this.radio]
          this.form.approver = teacher.id
          this.approver = teacher.name
          console.log("teacher",teacher)
        }else{
          var teacher2 = this.approverList[this.radio]
          this.form.copyer = teacher2.id
          this.copyer = teacher2.name
          console.log("teacher2",this.form.approver)
      }
    },
    hiddenDays(){
      this.hiddenDay=true
    }
  }
}
</script>
<style type="text/css">
  .lo{
    background: url('../../../../assets/img/education.svg') center bottom / contain no-repeat;
  }
</style>