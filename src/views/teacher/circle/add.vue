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
          <div class="q-gutter-y-md column">
            <q-card-section>
              <div class="text-h6" style="margin-left: 8rem;height:10px;">发布班级圈</div>
            </q-card-section>
          <div class="space" style="height:10px;"></div>


<div class="q-col-gutter-md row items-start">
      <q-input
        v-model="form.context"
        filled
        clearable
        type="textarea"
        color="blue"
        label="在此输入文字"
        hint="发布班级圈"
      style="width: 90%;margin-left: 1rem;"/>
<!--        <UploaderImg :src="'http://kick.yoozhi.cn/api/outside/img/uploader'" ref="child" ></UploaderImg> -->
      <UploaderImg  ref="child"></UploaderImg>
    </div>
            <div class="space" style="height:70px;"></div>
               <q-btn-group outline style="margin-left: 10rem;">
                <q-btn outline color="primary" label="提交" icon="camera" @click="Save()"/>
              </q-btn-group>
          </div>
          <div class="space" style="height:50px;"></div>
        </q-card>
      </div>
    </div>
    <q-dialog v-model="screen" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">
            <q-icon name="report_problem" class="text-red" style="font-size: 2rem;" />
          </div>
        </q-card-section>
        <q-card-section class="text-h6">
          错误: 没有获取到班级信息,请先创建班级.
        </q-card-section>
        <q-card-actions align="right">
          <a href="/">
            <q-btn flat label="确定" color="primary" v-close-popup /></a>
        </q-card-actions>
      </q-card>
    </q-dialog>
    <div class="lo" style="width: 100%;height: 320px; position:fixed;bottom:0;">
    </div>
  </base-content>
</template>
<script>
import BaseContent from '@/components/BaseContent/BaseContent'
import UploaderImg from '@/components/Uploader/UploaderImg'
import { Add } from '@/api/affairs/Circle'
export default {
  components: { BaseContent , UploaderImg},
  data () {
    return {
      screen:false,
      dense: true,
      loading: false,
      form:{
        context:'',
      },
    }
  },
  methods:{
    Save() {
      this.loadings()
      if(!this.form.context.length){
        this.Notify('班级圈内容不能为空','orange')
        return false
      }
      Add(this.form).then(res => {
        if (res.data.code == 200) {
          this.$refs.child.submit(res.data.pid);
          this.$q.notify({
              icon: 'insert_emoticon',
              message: '操作成功',
              color: 'green',
              position: 'top',
              timeout: 1500
            })
            this.$router.back(-1)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    upimg(){
        console.log("upimg")

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
.lo {
  background: url('../../../assets/img/education.svg') center bottom / contain no-repeat;
}

</style>
