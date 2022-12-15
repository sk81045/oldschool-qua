<template>
  <base-content>
    <div class="q-pa-md">
      <div class="row">
        <q-card class="my-card" style="
    width: 100%;
    box-shadow: 0px 0px 0rem 0rem #c0c6cf;">
          <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
            <q-card-section>
              <q-btn-group outline>
                <q-btn outline color="primary" :label="SchoolAbout.wxname+' '+classs+'班'" icon="people_alt" />
              </q-btn-group>
            </q-card-section>
<template>
    <div class="q-col-gutter-md row items-start">
      <q-input bottom-slots v-model="form.title" label="标题" type="text" counter maxlength="18" :rules="[ val => val && val.length > 0 || '标题不能为空']" >
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">标题</q-item-label>
        </template>
         <q-icon name="control_point" class="cursor-pointer">
        <template v-slot:hint>
          必填
        </template>
        </q-icon>
      </q-input>

      <q-input
        v-model="form.content"
        filled
        clearable
        type="textarea"
        color="blue"
        label="在此输入评语"
        hint="编辑学生评语"
        style="width: 100%;"/>
    </div>
    <div class="space" style="height:20px;"></div>

    <div class="q-gutter-sm">
    <span style="font-size: 0.7rem;color: rgba(0,0,0,0.54); margin-left: 1rem;">学生列表</span>
    <q-separator /> 
    <q-checkbox v-for="(item,index) in list" :key="index"  v-model="item.check" :label="item.name"  />
    </div>
</template>
        </q-scroll-area>
    <q-card-section style="margin-left: 8rem;">
      <q-btn-group outline>
        <q-btn outline color="primary" label="提交" icon="done_outline"  @click="add"/>
      </q-btn-group>
    </q-card-section>
        </q-card>
      </div>
    </div>
  </base-content>
</template>


<script>
import Vue from 'vue'  
import BaseContent from '@/components/BaseContent/BaseContent'
import { thumbStyleOfMenu } from '@/components/BaseContent/ThumbStyle'
import { getList,Evaluation } from '@/api/student/Manager'
export default {
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      form:{
        title:'',
        content:''
      },
      list:[
      ],
      classs:'',
      classid:'',
    }
  },
  created(){
    this.fetch()
  },
  methods:{
    fetch() {
      getList().then(res => {
        if (res.data.code == 200) {
          this.list = res.data.response.students
          this.classs = res.data.response.class
          if(this.classs.length == 0){
            this.Notify('没有班级信息','orange')
          }
          this.classid = res.data.response.id
        }
      }).catch(error => {
        console.log(error)
      })
    }, 
    add() {
      this.form.list = []
      for(let i = 0;i < this.list.length; i++){
        if(this.list[i].check != true){
          continue
        }
        this.form.list[i] = this.list[i]
      }
      if(this.form.list.length == 0){
        this.Notify('没有选择学生','orange')
        return false
      }
     console.log("this.form.",this.form)
      Evaluation(this.form).then(res => {
        if (res.data.code == 200) {
           this.Notify('提交成功','green')
        }
      }).catch(error => {
        console.log(error)
      })
    }, 
  }
}
</script>
