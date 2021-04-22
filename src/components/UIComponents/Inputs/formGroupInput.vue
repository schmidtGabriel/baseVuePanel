<template>
  <div class="form-group">
    <span :class="icon"></span>
    <label v-if="label" class="stronger">
      {{label}}
    </label>
    <label v-if="!label && fakelabel" class="stronger">
      &nbsp;
    </label>
    <input
      class="form-control border-input"
      v-bind="$attrs"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-on:keyup="presskeyUP(value)"

    >
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    props: {
      value: [String, Number],
      label: String,
      icon: {
        type: String,
        default: ""
      },
      fakelabel: {
        type: Boolean,
        default: false
      },
       keyUP: {
        type: String,
        default: ''
      }
    },
    methods: {
      presskeyUP(data) {
        if (this.keyUP) {
          this.$parent.$emit(this.keyUP, data);
        }
      },

    }

    
  };
</script>
<style lang="scss">
  label.stronger {
    font-weight: 200 !important;
    color: #777777 !important;
    opacity: 0.7;

  }

  .clean input.form-control[readonly], textarea.form-control[readonly] {
    background-color: #fffcf5 !important;
    cursor: text !important;
    color: #66615b !important;
  }
</style>
