<template>
  <q-btn flat no-caps no-wrap class="q-ml-xs" v-if="$q.screen.gt.xs">
    <q-toolbar-title shrink class="text-weight-bold">
      {{title}}- {{school}}
    </q-toolbar-title>
  </q-btn>
</template>

<script>
import Vue from 'vue'
import { getSchool } from '../../api/UserApi'
export default {
  name: 'ToolbarTitle',
  data () {
    return {
      title: Vue.prototype.$title,
      school:'',
    }
  },
  created() {
    this.School()
  },
  methods: {
    School () {
      getSchool().then(res => {
         console.log(res)
         this.school = res.data.school.name
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
