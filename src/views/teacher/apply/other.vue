<template>
  <base-content>
    {{msg}}
  </base-content>
</template>

<script>
import BaseContent from '@/components/BaseContent/BaseContent'
export default {
  components: { BaseContent },
  data () {
    return {
      msg: '欢迎！menu3'
    }
  }
}
</script>
