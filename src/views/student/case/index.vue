<template>
    <base-content>
    <div class="q-pa-md">
    <div class="row">
    <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
        <img :src="require('@/assets/img/start.svg')" style="width:100%" />
     </div>
    <q-card class="my-card"  style="
    width: 100%;
    height: 500px; 
    margin-top: -15rem;
    color: #355B75;
    border-radius: 10px;
    box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
      <q-tabs
        v-model="tab"
        narrow-indicator
        dense
        align="justify"
        class="text-primary"
      >
        <q-tab label="基本信息" name="one" />
        <q-tab label="荣誉信息" name="two" />
      </q-tabs>
      <q-separator />

        <q-avatar size="100px" font-size="52px" style="
        margin-top: 20px;
        margin-left: 9rem;
        border-radius: 10px;
        box-shadow: 0px 0px 0.1rem 0rem #355B75;">
        <img v-if="info.photo" :src="rootURL()+info.photo.path">
        <img v-else src="@/assets/img/null头像.png">
        </q-avatar>
        <div class="space" style="height:2px;"></div>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
      <q-list bordered style="border: 0px">
      <q-item clickable v-ripple class="text-h6"> 
        <q-item-section avatar>
        <q-item-section>姓名</q-item-section>
        </q-item-section>
        <q-item-section>{{info.name}}</q-item-section>
      </q-item>
   <q-separator />
    <q-item clickable v-ripple class="text-h6">
        <q-item-section avatar>
        <q-item-section>学校</q-item-section>
        </q-item-section>
        <q-item-section>{{school.wxname}}</q-item-section>
      </q-item>
    <q-separator />   
      <q-item clickable v-ripple class="text-h6">
        <q-item-section avatar>
        <q-item-section>学号</q-item-section>
        </q-item-section>
        <q-item-section>{{info.studentid}}</q-item-section>
      </q-item>
    <q-separator />   
    
    <q-item clickable v-ripple class="text-h6">
        <q-item-section avatar>
        <q-item-section>年级</q-item-section>
        </q-item-section>
<!--         <q-item-section>{{info.classs.grades.grade}}</q-item-section> -->
      </q-item>
    <q-separator /> 
    <q-item clickable v-ripple class="text-h6">
        <q-item-section avatar>
        <q-item-section>班级</q-item-section>
        </q-item-section>
        <q-item-section>{{info.classs.class}}</q-item-section>
      </q-item>
    <q-separator />     
     <q-item clickable v-ripple class="text-h6">
        <q-item-section avatar>
        <q-item-section>班主任</q-item-section>
        </q-item-section>
        <q-item-section>{{ strTo(info.classs.teacher) }}</q-item-section>
      </q-item>
      <q-separator />  
      <q-item clickable v-ripple class="text-h6"  v-for="(item,index) in info.parents" v-bind:key="item.id">
        <q-item-section avatar>
        <q-item-section>家长{{index+1}}</q-item-section>
        </q-item-section>
        <q-item-section>{{item.phone}}</q-item-section>
      </q-item>
    <q-separator />  
    </q-list>

        </q-tab-panel>
        <q-tab-panel name="two">
    <q-card-section>
        <div class="text-h6" style="margin-left: 8rem;height:50px;">荣誉信息</div>
    </q-card-section>
        <img src="@/assets/img/nodata.svg" style="width: 50%;margin-left: 6rem;" />
        <!-- <img src="@/assets/img/nomore.svg" style="width:100%" /> -->
    <div class="space" style="height:100px;"></div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
</div>
</div>
 <div class="space" style="height:200px;"></div>
</base-content>
</template>

<script>
import BaseContent from '@/components/BaseContent/BaseContent'
import { Infomation, getGrade, getClass, Update} from '@/api/student/Manager'
export default {
    components: { BaseContent },
    data() {
        return {
          dense:false,
          tab: 'one',
          school:JSON.parse(sessionStorage.getItem('school_about')),
          loading:this.loading,
          notify:this.notify,
          maximizedToggle: true,
          form:{
            uid:'',
            grade:{
              label:'',
              value:'',
            },
            class:{
              label:'',
              value:'',
            },
          },
          info:{
            photo:''
          },
          gradeOptions: [],
          classOptions: [],
      }
    },
    created() {
      this.form.uid = this.$route.query.uid
      if(!this.$route.query.uid){
          let user = JSON.parse(sessionStorage.getItem('user_role'))
          this.form.uid = user.identity.id
        }else{
          this.form.uid = this.$route.query.uid  
      }

      this.fetch()
      this.getGrade()
    },

    methods: {
      fetch() {
        Infomation(this.form).then(res => {
        if (res.data.code == 200) {
            this.info = res.data.response
            this.form.grade.label = res.data.response.classs.grades.grade
            this.form.grade.value = res.data.response.classs.grades.id
            this.form.class.label = res.data.response.classs.class
            this.form.class.value = res.data.response.classs.id
        }
      }).catch(error => {
        console.log(error)
      })
      },
      edit() {
        this.dialog = true
        this.form.name = this.info.name
        this.form.studentid = this.info.studentid
      },
      getGrade() {
        getGrade().then(res => {
          if (res.data.code == 200) {
            this.gradeOptions = res.data.response
          }
        }).catch(error => {
          console.log(error)
        })
      },
      getClass() {
        console.log("getClass",this.form)
        this.form.class = ''
        getClass({ gid: this.form.grade.value }).then(res => {
          if (res.data.code == 200) {
            this.classOptions = res.data.response
          }
        }).catch(error => {
          console.log(error)
        })
      },
      Update(){
        console.log("Update",this.form)
        this.Loadings()
        if(!this.form.grade){
          this.Notify('请选择年级','orange')
          return false
        }
        if(!this.form.class){
          this.Notify('请选择班级','orange')
          return false
        }

        Update({ data: this.form }).then(res => {
          if (res.data.code == 200) {
              this.dialog = false
              this.Notify('操作成功!')
              this.fetch()
          }
        }).catch(error => {
          console.log(error)
        })
      },
      honor() {
      },
      deleteby() {
      },
      strTo(josn) {
      if(!josn){
        return "暂无"
      }else{
        return josn.name
      }
    },
    },
}
</script>
<style>
  .cta-popular {
    width:100%;
    /*border-radius: 30px;*/
    text-align: center;
    font-weight: 400;
    line-height: 3rem;
    background: linear-gradient(315deg, #81d4fa 0%, #00e5ff 110%);
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
