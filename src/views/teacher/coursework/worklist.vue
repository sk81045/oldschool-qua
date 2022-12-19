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
        label=""
        hint="作业内容"
        style="width: 100%;"/>
    </div>
                <div class="q-col-gutter-md row items-start">
                  <div class="col-12" v-for="(items,index) in photos" :key="index">
                    <q-img :src=getImgUrl(items.path) :ratio="1"  
                    @click="imgviews(getImgUrl(items.path))"/>
                  </div>
                </div>
    <div class="space" style="height:20px;"></div>
</template>
        </q-scroll-area>
    <q-card-section style="margin-left: 8rem;">
<!--       <q-btn-group outline>
        <q-btn outline color="primary" label="提交" icon="done_outline"  @click="add"/>
      </q-btn-group> -->
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
// import { getList } from '@/api/student/Manager'
import { Worklist } from '@/api/teacher/CourseWork'
export default {
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      form:{
        title:'',
        content:''
      },
      query:{
        id:''
      },
      photos:[],
      classs:'',
      classid:'',
    }
  },
  created(){
    this.query.id = this.$route.query.id
    this.fetch()
  },
  methods:{
    fetch() {
      Worklist({query:this.query}).then(res => {
        if (res.data.code == 200) {
          this.form.content = res.data.response.course_work_results.results
          this.form.title = res.data.response.title
          this.photos = res.data.response.photo
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
      Add(this.form).then(res => {
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
