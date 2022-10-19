<template>
 <div class="m-list">
    <q-card class="my-card" style="
    width: 100%; 
    color: #355B75;
    border-radius: 10px;
    top: -180px;
    box-shadow: 0px 0px 0.5rem 0rem #c0c6cf;"
    v-if="message.length > 0" >
      <q-expansion-item
      default-opened
      class="shadow-1 overflow-hidden"
      style="border-radius: 10px;    font-size: 1rem;"
      icon="email"
      label="消息通知"
    >
 <div class="q-pa-md flex justify-center">
    <div style="max-width: 90%;"  v-for="(item,index) in message" :key="index">
        <q-item clickable v-ripple style="
        border-radius: 3px;
        border: 0.01rem solid #355B75;
        margin-left: -1rem;
        width: 110%;"
        @click="Details(index)">
          <q-item-section>
            <q-item-label class="text-h6"> {{item.title}}</q-item-label>
            <q-item-label caption lines="1">教务处</q-item-label>
            <div style='overflow:hidden;text-overflow: ellipsis; height: 2rem;width: 11rem;'>
            {{item.msg}}
            </div>
          </q-item-section>
          <q-item-section side>
            <q-item-label caption lines="1" style="color: #355B75; ">2022-09-01 09:55</q-item-label>
            <q-icon name="chat_bubble"  style="color: #355B75;top: 1rem;"/>
          </q-item-section>
        </q-item>
    <div class="space" style="height:10px;"></div>
    </div>
  </div>
      <div class="line" style="height:10px; color: #bdbdbd;">
      </div>
            <div class="line" style="height:20px; color: #bdbdbd;">
      <q-separator inset style="margin: 0px 0px -8px 20px;width: 30%;height: 0.03rem; background: #bdbdbd;"/>
            <q-item-label style="margin-left: 10rem;">没有更多了</q-item-label>
      <q-separator inset style="margin: -7px 0px 0px 246px;width: 32%;height: 0.03rem; background: #bdbdbd;"/>
    </div>
    </q-expansion-item>
    </q-card>

    <q-card class="my-card" style="
    width: 100%; 
    color: #355B75;
    border-radius: 10px;
    top: -180px;
    box-shadow: 0px 0px 0.5rem 0rem #c0c6cf;"
    v-else>
    <q-expansion-item
      default-opened
      class="shadow-1 overflow-hidden"
      style="border-radius: 10px; font-size: 1rem;"
      icon="email"
      label="消息通知"
    >
      <q-card>
        <q-card-section>
          <img src="@/assets/img/4042.svg" style="width:100%" />
        </q-card-section>
      </q-card>
      <div class="line" style="height:10px; color: #bdbdbd;">
      </div>
            <div class="line" style="height:20px; color: #bdbdbd;">
      <q-separator inset style="margin: 0px 0px -8px 20px;width: 30%;height: 0.03rem; background: #bdbdbd;"/>
            <q-item-label style="margin-left: 10rem;">没有更多了</q-item-label>
      <q-separator inset style="margin: -7px 0px 0px 246px;width: 32%;height: 0.03rem; background: #bdbdbd;"/>
    </div>
    </q-expansion-item>
</q-card>
          <q-inner-loading :showing="visible">
        <q-spinner-gears size="50px" color="primary" />
      </q-inner-loading>
  <q-dialog v-model="detailvw">
      <q-card style="width: 100%;">
        <q-card-section>
          <div class="text-h6">{{this.details.title}}</div>
          <div class="text-h7">{{this.details.created_at}}</div>
        </q-card-section>
        <q-separator />
        <q-card-section style="max-height: 50vh" class="scroll">
          <p style="font-size:1.2rem">{{this.details.msg}}</p>
        </q-card-section>
        <!-- <q-separator /> -->
        <q-card-actions align="right">
          <q-btn flat label="关闭" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
</div>
</template>
<script>
import { getList } from '@/api/Message'
import { thumbStyleOfMenu } from '../../components/BaseContent/ThumbStyle'
export default {
  name: 'MessageList',
  data() {
    return {
      thumbStyleOfMenu,
      query:{},
      school:{},
      message:[],
      message2:[1],
      detailvw:false,
      details:'',
      counter: 0,
      visible: false,
    }
  },
  created() {
    this.showTextLoading()
    this.getList()
  },
  methods: {
    getList() {
      getList(this.query).then(res => {
        if (res.data.code == 200) {
          this.message = res.data.result
            console.log("list message",this.message.length)
        }
      }).catch(error => {
        console.log(error)
      })
    },
    Details(id) {
      this.detailvw = true
      this.details = this.message[id]
    },
    showTextLoading () {
      this.visible = true
      setTimeout(() => {
        this.visible = false
      }, 1000)
    }

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