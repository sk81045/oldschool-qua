<template>
   <div>
    <lottie-web-cimo style="height: 80vh" path="https://assets6.lottiefiles.com/datafiles/OzG1c5GtuAvq10U/data.json"/>
     <div class="row justify-center">
     <q-btn
       icon="arrow_back"
       class="bg-logon-card-input"
       text-color="white"
       unelevated
       label=""
       style="font-size: large;width: 200px"
       @click="back"
     >返 回
     </q-btn>
     </div>
   </div>
</template>

<script>
import LottieWebCimo from '../LottieWebCimo/LottieWebCimo'

export default {
  name: 'NoFound404',
  components: { LottieWebCimo },
  created(){
  this.$q.notify({
            icon: 'announcement',
            message:'错误，请通过微信公众号重新登录',
            color: 'red',
            position: 'top',
            timeout: 10000
  })
  },
  methods: {
    back () {
      window.history.back(-1)
    }
  }
}
</script>
<style lang="css">
  .bg-logon-card-input{
    background:  linear-gradient(to right, #36d1dc 1%, #5b86e5 99%);
    transition: all 0.3s ease-in-out;
    background-size: 200% auto;
  }

  .bg-logon-card-input:hover{
    background-position: right center;
    box-shadow: 0 12px 20px -11px #5b86e5;
  }
</style>
