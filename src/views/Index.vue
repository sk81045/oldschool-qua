<template>
  <q-layout :view="viewStyle" class="full-height">
    <!-- 内容路由 -->
    <q-page-container class="app-main full-height">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :max="Max_keepAlive" :include="keepAliveList">
          <router-view :key="$route.fullPath"/>
        </keep-alive>
      </transition>
    </q-page-container>
    <div class="footer" style="max-width: 600px; background-color: #fcfcff;">
      <q-tabs
        v-model="tab"
        indicator-color="transparent"
        active-color="blue"
        class="hkk"
      >
        <q-tab name="mails"   icon="arrow_back" label="返回" @click="skipRoute()"/>
        <q-tab name="alarms" icon="apps" label="主页" @click="toCourse('/')"/>
        <q-tab name="movies" icon="account_box" label="个人信息" @click="toCourse('/user/infomation')"/>
      </q-tabs>
    </div>
  </q-layout>
</template>
<script>
export default {
  name: 'index',
  components: {
  },
  data () {
    return {
      tab: 'alarms',
      viewStyle: this.$SildeBar,
      leftDrawerOpen: false,
      Max_keepAlive: this.$Max_KeepAlive,
      keepAliveList: this.$store.getters.getKeepAliveList
    }
  },
  methods: {
    toCourse(url) {
        this.$router.push(url)
    },
    skipRoute () {  
        this.$router.go(-1)
    }
  },
  computed: {
    // 获取缓存列表
    getKeepAliveList () {
      return this.$store.getters.getKeepAliveList
    },
    key () {
      return this.$route.fullPath
    }
  },
  watch: {
    getKeepAliveList (n, o) {
      this.keepAliveList = n
    }
  }
}
</script>
<style lang="stylus">
  .footer {
      position: fixed;
      bottom: 0;
      width: 100%;
  }
  .md-tab-bar-item.is-active {
    color: #237cd3;
  }
</style>
<style type="text/css">
  .absolute-bottom {
    height: 0.3rem;
  }
</style>