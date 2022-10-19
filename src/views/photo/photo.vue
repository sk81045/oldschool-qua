<!-- 调用相机，拍照并获取图片功能 -->
<template>
    <base-content>
    <div class="q-pa-md">
    <div class="row">
    <q-card class="my-card" style="
    z-index:999;
    width: 100%;
    height: 600px; 
    color: #355B75;
    border-radius: 10px;
    box-shadow: 0px 0px 2rem 0rem #c0c6cf;">
      <q-card-section>
      <div class="space" style="height:10px;"></div>
        <div class="text-h6" style="margin-left: 8rem;height:20px;">照片采集-{{form.name}}</div>
      </q-card-section>
      <q-img
        :src="form.imgUrl"
        style="border-radius: inherit;margin: 3rem;height: 280px; max-width: 300px"
      ></q-img>
    <div class="content">
        <div class="face">
            <input type="file" name="file" class="upload" @change="uploadImg" accept="image/*" capture="camera">
            <span class="span-txt" style="">照片采集</span>
        </div>
      <q-card-section>
      <q-btn  outline color="primary" type="submit" label="提 交" @click="Saveago()" style="width: 100%;margin: 30px 0px 0px 0px;"/>
    </q-card-section>
    </div>
  </q-card>
</div>
</div>
    <q-dialog v-model="confirm" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="wallpaper" color="primary" text-color="white" />
          <span class="q-ml-sm">确定上传照片?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="取消" color="primary" v-close-popup />
          <q-btn flat label="确定" color="primary" v-close-popup @click="Save()"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
</base-content>
</template>

<script>
import BaseContent from '@/components/BaseContent/BaseContent'
import { savePhoto } from '@/api/student/Manager'
export default {
    components: { BaseContent },
    data() {
        return {
          confirm:false,
          form:{
            name:'',
            uid:'',
            imgUrl: 'https://cdn.quasar.dev/img/image-src.png'
          },
        }
    },
    created() {
      this.form.name = this.$route.query.name
      this.form.uid = this.$route.query.uid
    },
    methods: {
      uploadImg(e) {
            let file = e.target.files[0];
            let url = "";
            let that = this;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                url = this.result.substring(this.result.indexOf(",") + 1);
                that.form.imgUrl = "data:image/png;base64," + url;
            };
      },
      Saveago(){
        this.confirm = true
      },
      Save() {
        savePhoto(this.form).then(res => {
        if (res.data.code == 200) {
          // this.$router.push('/student/manage')
          this.$router.back(-1)
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
    //选择文件事件
   SelectImg(e) {
    console.log("e",e)
        var files = e.files;
        console.log(files[0]);
        if (files.length == 0) {
            return;
        }
        var form = new FormData();
        // 可以增加表单数据
        form.append("Filedata", files[0]);                           // 文件对象
        var file = files[0];
        $.ajax({
            url: ' ',//后台上图接口
            type: "POST",
            data: form,
            dataType: 'json',
            processData: false,  //tell jQuery not to process the data
            contentType: false,  //tell jQuery not to set contentType
            success: function (res) {
                if (res.status == 1) {                
                    $("#headImg").prop("src", res.path);
                } else {                 
                }
            }
        });
    },

      galleryImgs() {
        alert(22
          )
     plus.gallery.pick(function(e) {
      let name = e.substr(e.lastIndexOf('/') + 1);
      compressImage(e,name);
     }, function(e) {
     }, {
      filter: "image"
     });
    },
    },
}
</script>

<style lang="scss" scoped>
.content {
    height: 100%;
    overflow: hidden;
}
.face {
    height: .86rem;
    margin-top: 20px;
    position: relative;
    .upload {
        width: calc(100% - 40px);
        height: 43px;
        line-height: 43px;
        opacity: 0;
        position: absolute;
        z-index: 22;
        left: 0;
        margin: auto;
        right: 0;
    }
    .span-txt {
        font-family: PingFangSC-Medium;
        font-size: 1rem;
        color: #ffffff;
        position: absolute;
        left: 0;
        margin: auto;
        right: 0;
        background: #3f51b5;
        width: calc(100% - 40px);
        height: 43px;
        line-height: 43px;
        border-radius: 4px;
        text-align: center;
    }
}
.myimg {
    margin: 8.5rem;
    width: 10rem;
    height: auto;
}
</style>
