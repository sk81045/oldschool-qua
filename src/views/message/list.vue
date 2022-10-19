<template>
<base-content>
 <div class="q-pa-md">
    <div class="row">
    <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
        <img :src="getImgUrl(school.headerpic)" style="width:100%" />
    </div>
    <message-list>
    </message-list>
</div>
</div>
</base-content>
</template>
<script>
import { getList } from '@/api/Message'
import BaseContent from '../../components/BaseContent/BaseContent'
import MessageList from '../../components/Message/Messagelist'
import { thumbStyleOfMenu } from '../../components/BaseContent/ThumbStyle'
export default {
  components: { BaseContent,MessageList },
  data() {
    return {
      thumbStyleOfMenu,
      query:{},
      school:{},
      message:[],
      detailvw:false,
      details:'',
    }
  },
  created() {
    this.school = JSON.parse(sessionStorage.getItem('school_about'))
  },
  methods: {
    getImgUrl (img) {
        return require('@/assets/img/' + img)  
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