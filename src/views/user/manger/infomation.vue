
<template>
  <div class="q-pa-md">
      <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
        <img src="@/assets/img/infomation.svg" style="width:100%" />
      </div>

    <div class="row items-start q-gutter-md">
      <q-card flat bordered class="col" style="
      border: 0.01rem solid #355B75;
      margin-top:2rem;
      ">
        <q-item>
          <q-item-section avatar>
            <q-avatar>
              <img src="https://cdn.quasar.dev/img/boy-avatar.png">
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>黄学博</q-item-label>
            <q-item-label caption>教师</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-responsive :ratio="1">
          <q-card-section class="border-radius-inherit flex flex-center">
 <div style="width:100%;margin-top: -190px;">
      <q-item clickable v-ripple style="
      border-radius: 3px;
      border: 0.01rem solid #355B75;
      margin-left: 1rem;
      width: 91.5%;
      ">
        <div class="text-h7" style="margin-left:0rem;margin-top: 0.3rem;">
        <q-icon name="add" size="20px" class="q-ml-xs"/>
        <span>学校</span> <span  style="margin-left:8rem;" >行唐一中</span>
        <q-icon
          name="keyboard_arrow_right"
          size="24px"
          class="q-ml-xs"
          style="margin-top: 0px;left: 0px;color: #355B75;"
          />
      </div>  
      </q-item>
    <div class="space" style="height:5px;"></div>
    <q-item clickable v-ripple style="
      border-radius: 3px;
      border: 0.01rem solid #355B75;
      margin-left: 1rem;
      width: 91.5%;
      ">
        <div class="text-h7" style="margin-left:0rem;margin-top: 0.3rem;">
        <q-icon name="add" size="20px" class="q-ml-xs"/>
        <span>姓名</span> <span  style="margin-left:8rem;" >黄学博</span>
        <q-icon
          name="keyboard_arrow_right"
          size="24px"
          class="q-ml-xs"
          style="margin-top: 0px;left: 0px;color: #355B75;width: 50px"
          />
      </div>  
      </q-item>
    <div class="space" style="height:5px;"></div>

      <q-item clickable v-ripple style="
      border-radius: 3px;
      border: 0.01rem solid #355B75;
      margin-left: 1rem;
      width: 91.5%;
      ">
        <div class="text-h7" style="margin-left:0rem;margin-top: 0.3rem;">
        <q-icon name="add" size="20px" class="q-ml-xs"/>
        <span>身份</span> <span  style="margin-left:8rem;width: 10px" >教师</span>
        <q-icon
          name="keyboard_arrow_right"
          size="24px"
          class="q-ml-xs"
          style="margin-top: 0px;left: 0px;color: #355B75;width: 60px"
          />
      </div>  
      </q-item>
    </div> 
          </q-card-section>
        </q-responsive>
      </q-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isShow: true, //通过 v-show 控制显示'获取按钮'还是'倒计时'
        count: 0, //倒计时 计数器
        msg: "", //如果msg为空是蓝色，点击之后变灰色
      };
    },
    created(){
      this.verification()
    },
    methods: {
      verification() {
        this.isShow = false;
        this.count = 300; //赋值3秒
        var times = setInterval(() => {
          this.count--; //递减
          if (this.count <= 0) {
            // <=0 变成获取按钮
            this.isShow = true;
            clearInterval(times);
          }
        }, 1000); //1000毫秒后执行
      },
    },
  };
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