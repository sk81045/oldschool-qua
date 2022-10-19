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
        <div class="text-h6" style="margin-left: 5rem;height:10px;">添加学生</div>
      </q-card-section>
      <q-input bottom-slots v-model="form.name" label="学生姓名" counter :dense="dense" :rules="[ val => val && val.length > 0 || '姓名不能为空']">
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">学生姓名</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>
      <q-input bottom-slots v-model="form.studentid" label="学生学号" type="number" counter maxlength="8" :rules="[ val => val && val.length > 0 || '教师编号不能为空']" :dense="dense">
        <template v-slot:before>
            <q-item-label style="color: #355B75; font-size: 1rem;margin-top: 1.3rem;width: 5rem;">学号</q-item-label>
        </template>
        <template v-slot:hint>
          必填
        </template>
      </q-input>
      <template>
          <q-item-label class="text-h6" style="color: #355B75; font-size: 1rem;width: 6rem;">是否走读</q-item-label>
      </template>
    <div class="q-gutter-sm" style="margin-top: -39px;
    margin-left: 70px;">
      <q-radio v-model="form.out" val="1" label="否" />
      <q-radio v-model="form.out" val="2" label="是" />
    </div>
    <template>
          <q-item-label class="text-h6" style="color: #355B75; font-size: 1rem;width: 6rem;">采集照片</q-item-label>
      </template>
    <div class="q-gutter-sm" style="margin-top: -39px;
    margin-left: 70px;">
      <q-checkbox v-model="form.collection" label="是否采集照片?" />
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
          错误: 没有获取到班级信息,请先创建班级.
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
import { saveData } from '@/api/student/Manager'
export default {
  components: { BaseContent },
  data () {
    return {
      msg: '请假申请',
      screen:false,
      dense: true,
      loading: false,
      form:{
        classid:'',
        out:'1',
        collection: true,
      },
    }
  },
  created() {
      if(!this.$route.query.classid){
        this.screen = true
      }
      this.form.classid = this.$route.query.classid
  },
  methods:{
    Save() {
      this.loadings()
      saveData(this.form).then(res => {
        if (res.data.code == 200) {
          if(this.form.collection == true){
            this.$router.push('/photo/add?uid='+res.data.uid+'&name='+res.data.name)
          }
          this.$q.notify({
              icon: 'insert_emoticon',
              message: '操作成功',
              color: 'green',
              position: 'top',
              timeout: 1500
            })
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
      }, 1000); //1000毫秒后执行
    }
  }
}
</script>
<style type="text/css">
  .lo{
    background: url('../../../assets/img/education.svg') center bottom / contain no-repeat;
  }
</style>