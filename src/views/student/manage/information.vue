<template>
    <base-content>
    <div class="q-pa-md">
    <div class="row">
    <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
        <img :src="require('@/assets/img/tree.svg')" style="width:100%" />
     </div>
    <q-card class="my-card"  style="
    width: 100%;
    height: 500px; 
    margin-top: -10rem;
    color: #355B75;
    border-radius: 10px;
    box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
      <q-card-section>
        <q-btn-group outline>
          <q-btn outline color="primary" label="编辑信息" icon="edit" :disable="loading" @click="edit()"/>
          <q-btn outline color="primary" label="更新照片" icon="camera" :disable="loading" @click="$router.push('/photo/add?name='+info.name+'&uid='+info.id)"/>
          <q-btn outline color="primary" label="添加荣誉" icon="edit" :disable="loading" @click="honor()"/>
          <q-btn outline color="primary" label="删除此人" icon="priority_high" :disable="deleteby()"/>
        </q-btn-group>
      </q-card-section>
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
        margin-top: 10px;
        margin-left: 9rem;
        border-radius: 10px;
        box-shadow: 0px 0px 0.1rem 0rem #355B75;">
        <img v-if="info.photo" :src="info.photo.base64">
        <img v-else src="@/assets/img/null头像.png">
        </q-avatar>
        <div class="space" style="height:2px;"></div>
      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="one">
        <q-item clickable v-ripple style="
        border-radius: 3px;
        border: 0.01rem solid #355B75;
        margin-left: 0.5rem;
        width: 95%;
        margin-top: 10px;
        ">
          <q-item-section>
            <div class="space" style="height:10px;"></div>
            <q-item-label class="text-h6" style="height: 2rem;">姓名</q-item-label>
            <q-item-label class="text-h6">学号</q-item-label>
            <q-item-label class="text-h7">年级</q-item-label>
            <q-item-label class="text-h7">班级</q-item-label>
            <q-item-label class="text-h7">班主任</q-item-label>
            <q-item-label class="text-h7">入学时间</q-item-label>
          </q-item-section>
          <q-item-section side>
            <div class="space" style="height:10px;"></div>
            <q-item-label lines="1" class="text-h6" style="height: 2rem; color: #355B75; ">{{info.name}}</q-item-label>
            <q-item-label lines="1" class="text-h6" style="height: 2rem; color: #355B75; ">{{info.studentid}}</q-item-label>
            <q-item-label lines="1" class="text-h7" style="color: #355B75; ">{{info.classs.grades.grade}}</q-item-label>
            <q-item-label lines="1" class="text-h7" style="color: #355B75; ">{{info.classs.class}}</q-item-label>
            <q-item-label lines="1" class="text-h7" style="color: #355B75; ">{{ strTo(info.classs.teacher) }}</q-item-label>
            <!-- <q-item-label lines="1" class="text-h7" style="color: #355B75; ">行唐一中</q-item-label> -->
            <q-item-label lines="1" class="text-h7" style="color: #355B75; ">{{info.regtime}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-card-section>
        <div class="text-h6" style="margin-left: 8rem;height:10px;">家长信息</div>
        </q-card-section>
        <q-item clickable v-ripple style="
        border-radius: 3px;
        border: 0.01rem solid #355B75;
        margin-left: 0.5rem;
        width: 95%;
        margin-top: 10px;
        ">
        <q-item-section v-if="info.parents.length > 0">
          <q-item-label v-for="(item,index) in info.parents" v-bind:key="item.id" class="text-h6">家长{{index+1}}   <span style="margin-left: 7rem;">{{item.phone}}</span></q-item-label>
        </q-item-section>
          <q-item-section v-else>
            暂无
        </q-item-section>
        </q-item>
        </q-tab-panel>
        <q-tab-panel name="two">
    <q-card-section>
        <div class="text-h6" style="margin-left: 8rem;height:10px;">荣誉信息</div>
    </q-card-section>
    <q-item clickable v-ripple style="
        border-radius: 3px;
        border: 0.01rem solid #355B75;
        margin-left: 0.5rem;
        width: 95%;
        margin-top: 10px;
        ">
        <span>暂时无内容...</span>
        </q-item>
    <div class="space" style="height:100px;"></div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
</div>
</div>
<!------------- dialog ---------------->
  <q-dialog
      v-model="dialog"
      persistent
      :maximized="maximizedToggle"
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
      <q-card class="my-card2" style="
      margin-top: 10px;
      width: 90%;
      color: rgb(53, 91, 117);
      border-radius: 10px;
      border: 0.01rem solid #355B75;
      margin-left: 20px;">
    <div class="q-gutter-y-md column"  style="max-width: 270px;margin-left: 4rem;">
      <q-card-section>
        <div class="text-h6" style="color: #355B75;margin-left: 4rem;height:10px;">编辑学生信息</div>
      </q-card-section>
      <q-input bottom-slots v-model="form.name" label="学生姓名" counter :dense="dense" :rules="[ val => val && val.length > 0 || '姓名不能为空']">
        <template v-slot:before>
        <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">学生姓名</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>
      <q-input bottom-slots v-model="form.studentid" label="学生学号" disable type="number" counter maxlength="8" :rules="[ val => val && val.length > 0 || '教师编号不能为空']" :dense="dense">
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">学号</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>
      <q-select v-model="form.grade" :options="gradeOptions" label="年级" @input="getClass()">
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">学生年级</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-select>
     <q-select v-model="form.class" :options="classOptions" label="班级" >
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">学生班级</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-select>       
      <div class="space" style="height:10px;"></div>
      <q-btn outline color="primary" type="submit" label="提 交" @click="Update()" :loading="loading"/>
    </div>
          <div class="space" style="height:50px;"></div>
      </q-card>
      </q-card>
    </q-dialog>
<!------------- dialog ---------------->
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
          loading:this.loading,
          notify:this.notify,
          dialog: false,
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
