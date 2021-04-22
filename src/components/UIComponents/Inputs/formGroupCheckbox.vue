<template>
  <div class="">
    <input
      type="checkbox"
      v-bind="$attrs"
      :value="value"
    ><label>{{label}}</label>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    props: {
      value: [String, Number],
      check: {
        type: Boolean,
        default: false
      },
      label: String,
      icon: {
        type: String,
        default: ""
      },
      fakelabel: {
        type: Boolean,
        default: false
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>
