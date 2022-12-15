
<template>
  <div class="q-pa-md">
      <div class="md-example-child md-example-child-notice-bar md-example-child-notice-bar-6">
        <img src="@/assets/img/infomation.svg" style="width:100%" />
      </div>
    <div class="row items-start q-gutter-md">
      <q-card flat bordered class="col" style="
      border: 0.00rem solid #355B75;
      margin-top:2rem;" v-show="teacherVierw">
        <q-item class="text-h6">
          <q-item-section avatar>
            <q-avatar>
              <img src="@/assets/img/null头像.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{teachers.name}}</q-item-label>
            <q-item-label caption>{{identidyer}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-responsive :ratio="1">
    <q-list bordered style="border: 0px">
      <q-item clickable v-ripple class="text-h6"> 
        <q-item-section avatar>
        <q-item-section>学校</q-item-section>
        </q-item-section>
        <q-item-section>{{school.wxname}}</q-item-section>
      </q-item>
   <q-separator />
      <q-item clickable v-ripple class="text-h6">
        <q-item-section avatar>
        <q-item-section>部门</q-item-section>
        </q-item-section>
        <q-item-section>{{teachers.dept.department}}</q-item-section>
      </q-item>
      <q-separator />   
      <q-separator />
    </q-list>
        </q-responsive>
      </q-card>
      <q-card flat bordered class="col" style="
      border: 0.0rem solid #355B75;
      margin-top:2rem;"  v-show="parentVierw">
        <q-item class="text-h6">
          <q-item-section avatar>
            <q-avatar>
              <img src="@/assets/img/null头像.png">
            </q-avatar>
          </q-item-section>
          <q-item-section>
            <q-item-label>{{parents.name}}家长</q-item-label>
           <q-item-label caption>{{identidyer}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-responsive :ratio="1">
    <q-list bordered style="border: 0px">
      <q-item clickable v-ripple class="text-h6"> 
        <q-item-section avatar>
        <q-item-section>学校</q-item-section>
        </q-item-section>
        <q-item-section>{{school.wxname}}</q-item-section>
      </q-item>
   <q-separator />
      <q-item clickable v-ripple class="text-h6">
        <q-item-section avatar>
        <q-item-section>年级</q-item-section>
        </q-item-section>
        <q-item-section>{{parents.classs.grades.grade}}</q-item-section>
      </q-item>
      <q-separator />   
      <q-item clickable v-ripple class="text-h6">
        <q-item-section avatar>
        <q-item-section>班级</q-item-section>
        </q-item-section>
        <q-item-section>{{parents.classs.class}}</q-item-section>
      </q-item>

      <q-separator />
    </q-list>
        </q-responsive>
      </q-card>

    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        identidyer:'',
        teachers:{
          dept:{
            department:''
          }
        },
        parents:{
          classs:{
            class:'',
            grades:{
              grade:''
            }
          }
        },
        school: JSON.parse(sessionStorage.getItem('school_about')),
        teacherVierw: false, 
        parentVierw: false, 
      };
    },
    created(){
      let users = JSON.parse(sessionStorage.getItem('user_role'))
      if(users.identidyer == '教师'){
        this.identidyer = '教师'
        this.teachers = users.identity
        this.teacherVierw = true
      }
      if(users.identidyer == '学生家长'){
        this.identidyer = '学生家长'
        this.parents = users.identity
        this.parentVierw = true
      }
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