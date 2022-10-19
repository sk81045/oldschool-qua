<template>
<q-uploader 
ref="files" 
label="上传照片"
 multiple
:factory="uploadFactory"
:hide-upload-btn = "true"
:auto-upload = "true"
style="max-width: 300px"
 />
</template>
<script>

export default {
	name: 'UploaderAuto',
  	data () {
    	return {  
      		url:'', 
          photo : '',
          base64img:[],
      	}
    },
  	methods: {
      onRejected (rejectedEntries) {
      this.$q.notify({
        type: 'negative',
        message: `${rejectedEntries.length} file(s) 上传失败`
      })
    },
    uploadFactory(file){
      var Base = this.encodeToBase64(file)
      // encodeToBase64(this.$refs.files.files)
      Base.then((res)=>{
      // console.log('Base',res[0])
       this.base64img = res
      })
    },

    async encodeToBase64(files) {
      var attach = [];
      var reader = [];

      // loop through each of the files in q-uploader
      for (let i = 0; i < files.length; i++) {
        attach[i] = await this.singleFileToBase64(i, files, reader)
      }
      // returns an array of all the files in base64 format
        return attach;
    },

    singleFileToBase64(i, files, reader) {
    reader[i] = new FileReader();   
    // read the file into a base64 format 
    reader[i].readAsDataURL(files[i]);

    return new Promise((resolve, reject) => {
        reader[i].onerror = () => {
            reader[i].abort();
            reject("Insert error message here")
        };

        // return the base 64 string
        reader[i].onload = function () {
            resolve(reader[i].result);
        };
    })
    },

  	}
}
</script>