<template>
  <div class="vue-uploader">
    <input type="file" accept="xls/*" @change="fileChanged" ref="file" multiple="multiple">
    <q-dialog v-model="confirm" persistent>
      <q-card style="font-size: 1rem;">
        <q-card-section class="row items-center">
          <q-avatar icon="folder" />
        </q-card-section>
   <q-card-section class="row items-center">
          <span v-for="(file) of files" :key="file.id" class="file-item draggable-item">
          <p class="file-name">文件名:{{file.name}}</p>
          <!-- <span class="file-remove" @click="remove(index)">+</span> -->
           <span class="q-ml-sm">确定上传吗?</span>
          </span>
   </q-card-section>
        <q-card-actions align="right" >
          <q-btn flat label="取消" color="primary" v-close-popup @click="cancel()" style="font-size: 1rem;"/>
          <q-btn flat label="确定" color="primary" v-close-popup @click="Uploading()" style="font-size: 1rem;"/>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
  import { Upload } from '@/api/teacher/Effort'
  export default {
    name: 'UploaderXls',
    data() {
      return {
        confirm:false,
        status: 'ready',
        files: [],
        fileData:[],
        uploading: false,
        percent: 0,
        num:10,
      }
    },
    methods: {
      add() {
        this.$refs.file.click() //调用file的click事件  用ref绑定之后，不需要在获取dom节点了，直接使用$refs调用就行。
      },
      submit(pid) {
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
        this.files.forEach((item) => {
          formData.append(item.name, item.file)
        })
        this.fileData = formData
        this.confirm = true
      },
      Uploading(){
        this.$emit('upload',{ data:this.fileData, files:this.files })
        this.finished()
        return false
      },
      finished() {
        this.files = []
        this.status = 'ready'
      },
      remove(index) {
        this.files.splice(index, 1) //从哪个位置删除1个元素
      },
      cancel(){
        this.files = []
      },
      fileChanged() {
        console.log("fileChanged")
        const list = this.$refs.file.files
        for (let i = 0; i < list.length; i++) {
          if (!this.isContain(list[i])) {
            const item = {
              name: list[i].name,
              size: list[i].size,
              file: list[i]
            }
            this.files.push(item)
          }
        }
        this.$refs.file.value = ''
        this.submit()
      },
      isContain(file) {
        return this.files.find((item) => item.name === file.name && item.size === file.size)
      },
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
/*
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
  }*/

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