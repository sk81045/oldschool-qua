<template>
  <base-content>
    <div class="q-pa-md">
    <div class="row">
    <q-card class="my-card" style="
    width: 100%;
    box-shadow: 0px 0px 0rem 0rem #c0c6cf;">
    <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
          <q-card-section>
    <q-card-section>
        <q-btn-group outline>
          <q-btn outline color="primary" label="上传成绩" icon="call_made" :disable="loading" />
          <q-btn outline color="primary" label="下载模板" icon="arrow_downward" :disable="loading" @click="download()"/>
          <q-btn outline color="primary" label="删除" icon="priority_high"/>
        </q-btn-group>
      </q-card-section>
    </q-card-section>
<template>
    <div class="q-col-gutter-md row items-start">
      <q-input bottom-slots v-model="form.title" label="考试科目" type="text" counter maxlength="18" :rules="[ val => val && val.length > 0 || '考试科目不能为空']"  disable>
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">标题</q-item-label>
        </template>
         <q-icon name="control_point" class="cursor-pointer">
        <template v-slot:hint>
          必填
        </template>
        </q-icon>
      </q-input>
    </div>
    <div class="space" style="height:20px;"></div>

    <div class="q-gutter-sm" style="font-size: 1.2rem;">
    <span style="font-size: 0.7rem;color: rgba(0,0,0,0.54); margin-left: 1rem;">科目列表</span>
    <q-separator /> 
    <q-checkbox v-for="(item,index) in form.subject" :key="index"  v-model="item.check" :label="item.title"  />
    </div>
</template>
        </q-scroll-area>
        </q-card>
      </div>
    </div>
  </base-content>
</template>

<script>
import Vue from 'vue'  
import BaseContent from '@/components/BaseContent/BaseContent'
import { thumbStyleOfMenu } from '@/components/BaseContent/ThumbStyle'
import { List,Add } from '@/api/teacher/Effort'
export default {
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      form:{
        title:'',
        subject:[]
      },
      query:{
        id:''
      },
      class:'',
      loading:false
    }
  },
  created(){
    let users = JSON.parse(sessionStorage.getItem('user_role'))
    console.log('users',users.identity.classs.id)
    this.class = users.identity.classs.id
    this.query.id = this.$route.query.id
    this.fetch()
  },
  methods:{
    fetch() {
      List({query:this.query}).then(res => {
        if (res.data.code == 200) {
          this.form =  res.data.response[0]
        }
      }).catch(error => {
        console.log(error)
      })
    }, 
    download() {
      window.location.href = this.rootApi()+"outside/effort/export?class="+this.class+'&name='+this.form.title
    },
    add() {
      this.form.subject = []
      for(let i = 0;i < this.subject.length; i++){
        if(this.subject[i].check != true){
          delete this.subject[i]
          continue
        }else{
          this.form.subject[i] = this.subject[i]
        }
        
      }
      if(!this.form.title){
        this.Notify('请填写标题','orange')
        return false
      }
      if(this.form.subject.length == 0){
        this.Notify('没有选择科目','orange')
        return false
      }

      Add(this.form).then(res => {
        if (res.data.code == 200) {
           this.Notify('提交成功','green')
           this.$router.go(-1)
        }
      }).catch(error => {
        console.log(error)
      })
    }, 
  }
}
</script>
