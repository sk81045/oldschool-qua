<template>
  <base-content>
 <div class="q-pa-md">
      <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
        <img :src="require('../../assets/img/start.svg')" style="width:100%" />
    </div>
  <div class="row" v-show="isteacher">
     <q-card class="cta-popular" style="z-index:999;margin-top: -15rem;width: 100%; box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
    <div class="q-gutter-y-md column"  style="max-width: 270px;margin-left: 4rem;">
      <q-card-section>
        <div class="text-h6" style="margin-left: 5rem;height:10px;">教师注册</div>
      </q-card-section>
      <q-input bottom-slots v-model="form.name" label="教师姓名" counter :dense="dense" :rules="[ val => val && val.length > 0 || '姓名不能为空']">
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">教师姓名</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>
      <q-input bottom-slots v-model="form.pid" label="教师编号" type="number" counter maxlength="8" :rules="[ val => val && val.length > 0 || '教师编号不能为空']" :dense="dense">
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">教师编号</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>
      <q-input bottom-slots v-model="form.phone" label="手机号码" type="number" counter maxlength="11" 
      :rules="[ val => val && val.length > 0 || '手机号码不能为空' , 
                val => val && val.length < 12 || '手机号码格式错误',]" 
      :dense="dense">
        <template v-slot:before>
          <q-item-label style="color: #355B75; font-size: 1rem; margin-top: 1.3rem;width: 5rem;">手机号码</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>
      <template>
          <q-item-label class="text-h6" style="color: #355B75; font-size: 1rem;width: 6rem;">职务</q-item-label>
      </template>
    <div class="q-gutter-sm" style="margin-top: -39px;
    margin-left: 70px;">
      <q-radio v-model="form.relation" val="1" label="班主任" />
      <q-radio v-model="form.relation" val="2" label="其他" />
    </div>
          <div class="space" style="height:10px;"></div>
          <q-btn outline color="primary" type="submit" label="提 交" @click="Save()" :loading="loading"/>
    </div>
    <div class="space" style="height:50px;"></div>
</q-card>
  </div>

  <div class="row" v-show="noteacher">
     <q-card class="cta-popular" style="z-index:999;margin-top: -15rem;width: 100%; box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
    <div class="q-gutter-y-md column"  style="max-width: 270px;margin-left: 4rem;">
      <q-card-section>
        <div class="text-h6" style="margin-left: 5rem;height: 10px;">家长注册</div>
      </q-card-section>
            <!-- <q-separator inset style="height: 2px; background: #355B75;"/> -->
      <q-input bottom-slots v-model="form.name" label="学生姓名" counter  
      :rules="[ val => val && val.length > 0 || '学生姓名不能为空']" :dense="dense">
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">学生姓名</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>
      <q-input bottom-slots v-model="form.pid" label="学生编号" type="number" counter maxlength="8"
      :rules="[ val => val && val.length > 0 || '学生编号不能为空']" :dense="dense">
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">学生编号</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>
      <q-input bottom-slots v-model="form.phone" label="手机号码" type="number" counter maxlength="11"
      :rules="[ val => val && val.length > 0 || '手机号码不能为空', 
                val => val && val.length < 12 || '手机号码格式错误',]" 
       :dense="dense">
        <template v-slot:before>
          <q-item-label style="color: #355B75; font-size: 1rem; margin-top: 1.3rem;width: 5rem;">手机号码</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>
              <template>
            <q-item-label class="text-h6" style="color: #355B75; font-size: 1rem;width: 6rem;">学生关系</q-item-label>
        </template>
    <div class="q-gutter-sm" style="margin-top: -39px;
    margin-left: 70px;">
      <q-radio v-model="form.relation" val="1" label="父亲" />
      <q-radio v-model="form.relation" val="2" label="母亲" />
      <q-radio v-model="form.relation" val="3" label="其他" />
    </div>
          <div class="space" style="height:10px;"></div>
          <q-btn outline color="primary" label="提 交" @click="Save()" :loading="loading"/>
    </div>
    <div class="space" style="height:50px;"></div>
</q-card>
  </div>
<q-dialog v-model="confirm" persistent>
      <q-card style="font-size: 1.2rem;">
        <q-card-section class="row items-center">
      <q-card-section>
        <div class="text-h5" style="line-height: 15px;">选择一个身份完成注册</div>
      </q-card-section>
        <q-list>
      <q-item tag="label" v-ripple>
        <q-item-section avatar>
          <q-radio v-model="identity" val="1" />
        </q-item-section>
        <q-item-section>
          <q-item-label>教师</q-item-label>
          <q-item-label caption>请确认您的手机号已经录入平台.</q-item-label>
        </q-item-section>
      </q-item>

      <q-item tag="label" v-ripple>
        <q-item-section avatar top>
          <q-radio v-model="identity" val="2" />
        </q-item-section>
        <q-item-section>
          <q-item-label>学生家长</q-item-label>
          <q-item-label caption>家长注册需知道学生的姓名、学号、通过手机验证码完成注册.</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="确定" color="primary" @click="Identity() " v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="verify" persistent>
      <q-card style="font-size: 1.2rem;">
        <q-card-section class="row items-center">
      <q-card-section>
        <div class="text-h6" style="line-height: 15px;">请输入手机验证码完成注册</div>
      </q-card-section>
        <q-list>
      <q-input bottom-slots v-model="form.verificationCode" label="收到的5位验证码" counter type="number" maxlength="5"
      :rules="[ val => val && val.length > 0 || '验证码不能为空']" :dense="dense">
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-left: 1rem;margin-top: 1.3rem;width:4rem;">验证码</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>

    </q-list>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label='"重新发送("+count+")"' color="primary" @click="Restsave()" :disable='restsave'/>
          <q-btn flat label="确定" color="primary" @click="Register() "/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  <div class="lo" style="width: 100%;height: 320px; position:fixed;bottom:0;">
  </div>
</div>
  </base-content>
</template>
<script>
import BaseContent from '../../components/BaseContent/BaseContent'
import { Login,getSchool,Register,Check } from '../../api/UserApi'
export default {
  name: 'Logon',
  components: { BaseContent },
  data () {
    return {
      school: '',
      text: '',
      form: {
        sid:'',
        pid:'',
        phone:'',
        name:'',
        relation:"1",
        verificationCode:'',
        type:''
      },
      dense: true,
      loading: false,
      confirm:false,
      verify:false,
      identity:'1',
      isteacher: false,
      noteacher:false,
      count:0,
      origin:{},
      verificationCode:'',
      time: '',
      restsave:true
    }
  },
  // components: { LottieWebCimo },
  created() {
    this.School()
    this.logon()
  },
  methods: {
    logon () {
      let data = {}
      data.sid = this.$route.query.sid
      data.openid = this.$route.query.openid
      this.origin = data
      if(!data.sid || !data.openid){
          this.$q.notify({
            icon: 'announcement',
            message: "登录信息过期或URL参数错误,请重新通过微信登录",
            color: 'red',
            position: 'top',
            timeout: 5000
          })
          this.$router.push('/NoFound404')
          return false
      }
      this.form.sid = this.$route.query.sid
      this.loading = !this.loading
      Login(data).then(res => {
        console.log('开始登录',res)
        if (res.data.code == 200) {
          sessionStorage.setItem('access_token', res.data.token)
          sessionStorage.setItem('user_role',  JSON.stringify(res.data.user))
          sessionStorage.setItem('school_about',  JSON.stringify(res.data.school))
          var token = sessionStorage.getItem('access_token')
            if(this.$route.query.router){
              this.$router.push('/'+this.$route.query.router)
            }else{
              this.$router.push('/')
            }
  
            this.$q.notify({
              icon: 'insert_emoticon',
              message: 'hi，来自'+res.data.school.wxname+'的'+res.data.user.identity.name+res.data.user.identidyer+' 欢迎回来',
              color: 'green',
              position: 'top',
              timeout: 10000
            })
            clearTimeout()
            this.loading = !this.loading
        }else{
          console.log("register")
          this.confirm = true //注册入口
          this.loading = !this.loading
          this.$q.notify({
            icon: 'announcement',
            message: res.data.message,
            color: 'amber',
            position: 'top',
            timeout: 1500
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
    Restsave() {
      clearInterval(this.time);
      this.Save()
    },
    Save() {
      // this.loading = !this.loading
      let p = this.form.phone
      if(p.length != 11) {
          this.$q.notify({
            icon: 'announcement',
            message:'请输入正确的手机号',
            color: 'red',
            position: 'top',
            timeout: 1500
          })
        return false
      }
      Check(this.form).then(res => {
        if (res.data.code == 200) {
          this.verify = true
          this.Verification()
          this.verificationCode = res.data.verificationCode
          this.restsave = true
        }else{
          this.loading = !this.loading
          this.$q.notify({
            icon: 'announcement',
            message: res.data.message,
            color: 'amber',
            position: 'top',
            timeout: 1500
          })

      let times = setInterval(() => {
        this.loading = !this.loading
        clearInterval(times)
        }, 1000); //1000毫秒后执行

        }
      }).catch(error => {
        console.log(error)
      })
    },

    Register() {
      // this.form.openid = 'test'
       this.form.openid = this.origin.openid
      if(this.verificationCode == this.form.verificationCode){  //校验验证码 最好改成后端验证
        this.verify = false
        clearInterval(this.time);
      }else{
          this.$q.notify({
            icon: 'announcement',
            message: '请输入正确的验证码',
            color: 'amber',
            position: 'top',
            timeout: 1500
          })
        return false
      }

      Register(this.form).then(res => {
        if (res.data.code == 200) {
          // this.loading = !this.loading
            this.$q.notify({
              icon: 'insert_emoticon',
              message: '已完成注册',
              color: 'green',
              position: 'top',
              timeout: 1500
            })
            this.logon()
        }else{
          // this.loading = !this.loading
          this.$q.notify({
            icon: 'announcement',
            message: res.data.message,
            color: 'red',
            position: 'top',
            timeout: 1500
          })
        }
      }).catch(error => {
        console.log(error)
      })
    },
   Verification() {
      this.count = 300; 
      this.time = setInterval(() => {
        this.count--; //递减
        if (this.count <= 0) {
          this.restsave = false
          clearInterval(this.time);
        }
      }, 1000); //1000毫秒后执行
    },

    Identity() {
      if(this.identity == '1'){
         this.form.type = 1 
        this.isteacher = true
        this.noteacher = false
      }else{
        this.isteacher = false
        this.noteacher = true
        this.form.type = 2
      }
    },
    School () {
      getSchool().then(res => {
         console.log(res)
         this.school = res.data.school.name
      }).catch(error => {
        console.log(error)
      })
    },

    handleFinish (e) {
      this.isLottieF = e
    }
  }
}
</script>

<style scoped>
  .lo{
      background: url('../../assets/img/education.svg') center bottom / contain no-repeat;
  }
  .items-center img{
     width: 120%;
  }

  .welcome img{
     width: 100%;
  }
</style>
