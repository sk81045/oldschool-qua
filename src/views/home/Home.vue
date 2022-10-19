<template>
<base-content>
 <div class="q-pa-md">
    <div class="row">
      <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
        <img :src="getImgUrl(school.headerpic)" style="width:100%" />
      </div>
    <q-card class="my-card" style="
    width: 100%; 
    color: #355B75;
    border-radius: 10px;
    top: -170px;
    box-shadow: 0px 0px 0.5rem 0rem #c0c6cf;
    ">
      <q-card-section>
        <div class="text-h6" style="margin-left:9rem; height: 2rem;">应用列表</div>
      </q-card-section>

    <div class="md-example-item" v-for="(item,index) in menus" :key="index" @click="toCourse(item.path)" >
    <span>
    <!-- <router-link :to='item.path' > -->
        <img :src="getImgUrl(item.meta.icon)"/>
           <!-- <mu-icon :value="ch.meta.icon"></mu-icon> -->
        <p style="color: #355B75;font-size: 0.93rem;">{{ item.meta.title }}</p>
    <!-- </router-link> -->
    </span>
   </div>
    <div class="space" style="height:10px;"></div>
    </q-card>
    <div class="m-li" style="margin-top: 1rem;">
      <message-list>
      </message-list> 
    </div>
</div>
</div>
</base-content>
</template>
<script>
import { getMenu } from '@/api/api'
import BaseContent from '../../components/BaseContent/BaseContent'
import MessageList from '../../components/Message/Messagelist'
import { thumbStyleOfMenu } from '../../components/BaseContent/ThumbStyle'
export default {
  name: 'icon-demo',
  components: { BaseContent,MessageList },
  data() {
    return {
      thumbStyleOfMenu,
      menus:[],
      school:{}
    }
  },
  created() {
    this.school = JSON.parse(sessionStorage.getItem('school_about'))
    this.getMenu()
  },
  mounted() {
    window.triggerSwiper3 = () => {
      this.goto()
    }
  },
  methods: {
    getMenu() {
      let orign = this.$store.getters.getRoutes[0].children
      for (let i in orign) {
        if(orign[i].meta.isHidden == false){
          this.menus[i] = orign[i]
        }
      }
      this.menus =  this.menus.filter(d=>d); 
    },
    schoolAbout() {

    },
    toCourse(url) {
        this.$router.push(url)
    },
    getImgUrl (img) {
        return require('@/assets/img/' + img)  
    },
    setValue(id, value) {
      document.querySelector(id) && (document.querySelector(id).innerHTML = value)
    },
    beforeChange(from, to) {
      this.setValue('#valueSwiper10', from)
      this.setValue('#valueSwiper11', to)
    },
    afterChange(from, to) {
      this.setValue('#valueSwiper12', from)
      this.setValue('#valueSwiper13', to)
    },
    goto() {
      this.$refs.swiper.goto(2)
    },
  },
}
</script>
<style>
.md-example-item {
  text-align:center;
  display:inline-block;
  /*margin: 20px;*/
      width: 25%;
  line-height: 20px;
}

.md-example-child-icon .md-example-item, .md-example-child-icon .md-example-item-s {
  height: 1.2rem;
}
.md-example-item img{
  height: 1.7rem; /* 向左漂移，将竖排变为横排 */
}
</style>