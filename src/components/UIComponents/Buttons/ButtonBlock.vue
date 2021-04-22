<template>
  <button
    class="btn btn-radio border-input"
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
            "danger"
          ];
          return acceptedValues.indexOf(value) !== -1;
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .btn-primary.btn-fill {
    color: #ffffff;
    background-color: #3EA0F9;
    opacity: 0.8;
    border: none;
    cursor: pointer;
  }

  .btn-primary.btn-fill:hover {
    color: #ffffff;
    background-color: #2796f7;
    opacity: 1;
    box-shadow: 4px 2px 92px -31px rgba(0, 0, 0, 0.75);
  }

  .btn-primary.btn-fill:focus {
    color: #ffffff;
    background-color: #2796f7;
    opacity: 1;
    box-shadow: 4px 2px 92px -31px rgba(0, 0, 0, 0.75);
  }

</style>  
