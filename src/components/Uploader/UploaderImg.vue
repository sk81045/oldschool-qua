<template>
  <div class="vue-uploader">
    <div class="file-list">
      <section v-for="(file, index) of files" :key="file.id" class="file-item draggable-item">
        <img :src="file.src" alt="" ondragstart="return false;">
        <!-- <p class="file-name">{{file.name}}</p> -->
        <span class="file-remove" @click="remove(index)">+</span>
      </section>
      <section v-if="status == 'ready'" class="file-item">
        <div @click="add" class="add">
          <span>+</span>
        </div>
      </section>
    </div>

<!--     <section v-if="files.length != 0" class="upload-func">
      <div class="progress-bar">
        <section v-if="uploading" :width="(percent * 100) + '%'">{{(percent * 100) + '%'}}</section>
      </div>
      <div class="operation-box">
        <button v-if="status == 'ready'" @click="submit">上传</button>
        <button v-if="status == 'finished'" @click="finished">完成</button>
      </div>
    </section> -->
    <input type="file" accept="image/*" @change="fileChanged" ref="file" multiple="multiple">
  </div>
</template>
<script>
  import { Upload } from '@/api/affairs/Circle'
  export default {
    name: 'UploaderImg',
    props: {
      src: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        status: 'ready',
        files: [],
        uploading: false,
        percent: 0,
        num:10,
      }
    },
    methods: {
      add() {
        this.$refs.file.click() //调用file的click事件  用ref绑定之后，不需要在获取dom节点了，直接使用$refs调用就行。
      },
      submit(pid,type='Circle') {
        if (this.files.length === 0) {
          console.warn('no file!');
          return
        }
  //限制最多上传十张
       if (this.files.length >this.num) {
         this.$message.warning('最多只能上传10张！')
         return
       }

        //当点击上传按钮时，将会遍历所有选中的文件，并添加到自定义的FormData中
        const formData = new FormData()
        formData.append('pid', pid)
        formData.append('type', type)
        this.files.forEach((item) => {
          formData.append(item.name, item.file)
        })
        this.Uploader(formData)
        return false

        const xhr = new XMLHttpRequest()
        xhr.upload.addEventListener('progress', this.uploadProgress, false)
        xhr.open('POST', this.src, true)
        this.uploading = true

        xhr.send(formData)
        xhr.onload = () => {
          this.uploading = false
          if (xhr.status === 200 || xhr.status === 304) {
            this.status = 'finished'
            console.log('upload success!')
          } else {
            console.log(`error：error code ${xhr.status}`)
          }
        }
      },

    Uploader(data){
       console.log('formData!',data)
      Upload(data).then(res => {
      }).catch(error => {
        console.log(error)
      })
    },

      finished() {
        this.files = []
        this.status = 'ready'
      },
      remove(index) {
        this.files.splice(index, 1) //从哪个位置删除1个元素
      },
      fileChanged() {
        const list = this.$refs.file.files
        for (let i = 0; i < list.length; i++) {
          if (!this.isContain(list[i])) {
            const item = {
              name: list[i].name,
              size: list[i].size,
              file: list[i]
            }
            this.html5Reader(list[i], item)
            this.files.push(item)
          }
        }
        this.$refs.file.value = ''
      },
      // 将图片文件转成BASE64格式
      html5Reader(file, item) {
        const reader = new FileReader()
        reader.onload = (e) => {
          this.$set(item, 'src', e.target.result)
        }
        reader.readAsDataURL(file)
      },
      isContain(file) {
        return this.files.find((item) => item.name === file.name && item.size === file.size)
      },
      uploadProgress(evt) {
        const component = this
        if (evt.lengthComputable) {
          const percentComplete = Math.round((evt.loaded * 100) / evt.total)
          component.percent = percentComplete / 100
        } else {
          console.warn('upload progress unable to compute')
        }
      }
    }
  }
</script>
<style>
  .vue-uploader {
    /*border: 1px solid #e5e5e5;*/
  }

  .vue-uploader .file-list {
    padding: 10px 0px;
  }

  .vue-uploader .file-list:after {
    content: '';
    display: block;
    clear: both;
    visibility: hidden;
    line-height: 0;
    height: 0;
    font-size: 0;
  }

  .vue-uploader .file-list .file-item {
    float: left;
    position: relative;
    width: 100px;
    text-align: center;
  }

  .vue-uploader .file-list .file-item img {
    width: 80px;
    height: 80px;
    border: 1px solid #ececec;
  }

  .vue-uploader .file-list .file-item .file-remove {
    position: absolute;
    right: 12px;
    display: none;
    top: 4px;
    width: 14px;
    height: 14px;
    color: white;
    cursor: pointer;
    line-height: 12px;
    border-radius: 100%;
    transform: rotate(45deg);
    background: rgba(0, 0, 0, 0.5);
  }

  .vue-uploader .file-list .file-item:hover .file-remove {
    display: inline;
  }

  .vue-uploader .file-list .file-item .file-name {
    margin: 0;
    height: 40px;
    word-break: break-all;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .vue-uploader .add {
    width: 80px;
    height: 80px;
    margin-left: 10px;
    float: left;
    text-align: center;
    line-height: 80px;
    border: 1px dashed #ececec;
    font-size: 30px;
    cursor: pointer;
  }

  .vue-uploader .upload-func {
    display: flex;
    padding: 10px;
    margin: 0px;
    background: #f8f8f8;
    border-top: 1px solid #ececec;
  }

  .vue-uploader .upload-func .progress-bar {
    flex-grow: 1;
  }

  .vue-uploader .upload-func .progress-bar section {
    margin-top: 5px;
    background: #00b4aa;
    border-radius: 3px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    transition: all .5s ease;
  }

  .vue-uploader .upload-func .operation-box {
    flex-grow: 0;
    padding-left: 10px;
  }

  .vue-uploader .upload-func .operation-box button {
    padding: 4px 12px;
    color: #fff;
    background: #007ACC;
    border: none;
    border-radius: 2px;
    cursor: pointer;
  }

  .vue-uploader>input[type="file"] {
    display: none;
  }
</style>