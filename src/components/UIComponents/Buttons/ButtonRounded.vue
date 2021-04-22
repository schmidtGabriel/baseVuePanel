<template>
  <button
    class="btn btn-wd border-input btn-rounded"
    :class="[{' btn-fill':fill}, getColor()]"
    v-on:click="execute(event, params)"
    v-bind:disabled="disabled"
  >
    {{label}}
  </button>
</template>
<script>
  export default {
    inheritAttrs: false,
    methods: {
      execute(event, data) {
        if (!event) return null;
        this.$parent.$emit(event, data);
      },
      getColor() {
        return `btn-${this.activeColor}`;
      }
    },
    props: {
      params: {
        validator: value => value,
        default: null
      },
      disabled: {
        type: Boolean,
        default: false
      },
      event: String,
      label: String,
      fill: {
        type: Boolean,
        default: true
      },
      activeColor: {
        type: String,
        default: "primary",
        validator: value => {
          let acceptedValues = [
            "primary",
            "info",
            "success",
            "warning",
            "danger",
            ""
          ];
          return acceptedValues.indexOf(value) !== -1;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
</style>  
