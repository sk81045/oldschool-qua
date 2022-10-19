import Vue from 'vue'
export function toCourse (url) {
        this.$router.push(url)
}

export function notify(msg){
        console.log("ss",msg)

        // this.$q.notify({
        //   icon: 'insert_emoticon',
        //   message: msg,
        //   color: 'orange',
        //   position: 'top',
        //   timeout: 1500
        // })
}

const loading = false
Vue.prototype.Loadings = function (loading){
      this.loading = !this.loading
      let times = setInterval(() => {
        this.loading = !this.loading
        clearInterval(times)
      }, 1000); //1000毫秒后执行
}