<template>
  <base-content>
    <div class="q-pa-md">
      <div class="row">
        <q-card class="my-card" style="
    width: 100%;
    box-shadow: 0px 0px 0rem 0rem #c0c6cf;">
          <q-scroll-area ref="scrollArea" style="height: calc(95vh - 124px);" :thumb-style="thumbStyleOfMenu">
            <q-card-section>
              <q-btn-group outline>
                <q-btn outline color="primary" :label="SchoolAbout.wxname+' '+user.name+'同学'" icon="stars" />
              </q-btn-group>
            </q-card-section>

<template>
  <div class="q-px-lg q-pb-md">
    <q-timeline color="primary">
      <q-timeline-entry
        title="学生评价"
        subtitle="22年10月01日"
      >
        <div>
          1、正直勇敢，性情刚烈，常常为一些小事和同学争个面红耳赤，但你心胸开阔，又绝不会为一些小事而耿耿与怀。你积极进取，学习刻苦，每周都有自己的目标与计划，因此你的成绩会不断进步。你对事尽责，老师交给你的任务总是那么放心，学期快结束时，你的思想有所松懈，锐气不足，相信一定回引起你的高度重视的。新的学期一定要打造一个全新的自我。
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        title="第一学期"
        subtitle="22年08月01日"
      >
        <div>
          该生思想上积极要求上进，尊敬师长，乐于助人，学习自主性强，成绩优良，富有挑战竞争意识及创新能力，工作负责认真，有良好的领导组织及沟通协作精神，兴趣爱好广泛，心理素质好，是一名全面发展的优秀大学生。
        </div>
      </q-timeline-entry>


      <q-timeline-entry
        title="年度总结"
        subtitle="21年12月01日"
        avatar="https://cdn.quasar.dev/img/avatar2.jpg"
      >
        <div>
         默默的思索，静静的聆听，勤恳的你每步都走得很踏实，老师早已悄悄的喜欢上这份可贵的含蓄，但老师更希望能看到你的锋芒，大胆的展示风采，你会发现原来自己也可以笑得如此灿烂。
        </div>
      </q-timeline-entry>
    </q-timeline>
  </div>
</template>

          </q-scroll-area>
        </q-card>
      </div>
    </div>
  </base-content>
</template>


<script>
import Vue from 'vue'  
import BaseContent from '@/components/BaseContent/BaseContent'
import { thumbStyleOfMenu } from '@/components/BaseContent/ThumbStyle'
import { getList } from '@/api/student/Circle'
export default {
  components: { BaseContent },
  data () {
    return {
      thumbStyleOfMenu,
      user:'',
      query:{},
      list:[],
      likeIcon:'favorite_border',
      imgview:false,
      imgUrl:'',
    }
  },
  created(){

    let user = JSON.parse(sessionStorage.getItem('user_role'))
    this.user = user.identity
    console.log('this.Class',this.SchoolAbout)
    // this.fetch()
  },
  methods:{
    fetch() {
      getList({query:this.query}).then(res => {
        this.list = res.data.response
        console.log("this.list",this.list)

      }).catch(error => {
        console.log(error)
      })
    }, 

  }
}
</script>
