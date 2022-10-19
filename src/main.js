import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './quasar'
// 前端根据角色处理路由
// import router from './router/permission'
// 后端返回动态路由
import router from './router/permissionWithDynamicRouter'

// 系统全局配置
import './config'

// 全局 axios 工具类 fetchData
import './axios/FetchData'

// 第三方组件
import animated from 'animate.css'
import jsonView from 'vue-json-views'

// markdown
import './components/Markdown/Markdown'

// ECharts
import './components/ECharts/EChartsConfig'

Vue.config.productionTip = false
Vue.use(animated)
Vue.use(jsonView)

// 前往 public 文件夹的路径
Vue.prototype.$PUBLIC_PATH = process.env.BASE_URL

const loading = false
Vue.prototype.Loadings = function (loading){
      this.loading = !this.loading
      let times = setInterval(() => {
        this.loading = !this.loading
        clearInterval(times)
      }, 2000); //1000毫秒后执行
}
Vue.prototype.Notify = function (msg,color = 'green'){
        this.$q.notify({
          icon: 'insert_emoticon',
          message: msg,
          color: color,
          position: 'top',
          timeout: 1500
        })
}


const vue = new Vue({
  router,
  store,
  loading,
  render: h => h(App)
}).$mount('#app')

// handleBaiduStatistics()

export default vue

/**
 * 处理百度统计
 */
function handleBaiduStatistics () {
  return false
  // eslint-disable-next-line no-use-before-define
  var _hmt = _hmt || []
  window._hmt = _hmt; // 将_hmt挂载到window下
  (function () {
    var hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?a58d33108bfd0357ba78d883f1149708'
    var s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()
}


