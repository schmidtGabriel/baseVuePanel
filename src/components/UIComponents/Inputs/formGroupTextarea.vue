<template>
  <div class="form-group">
    <span :class="icon"></span>
    <label v-if="label" class="stronger">
      {{label}}
    </label>
    <label v-if="!label && fakelabel" class="stronger">
      &nbsp;
    </label>  

    <vue-editor
      class="background border-input"
      v-bind="$attrs"
      :value="value"
      @input="onTextChange"
      v-if="isHtml" />

     <vue-editor
      class="background border-input"
      v-bind="$attrs"
      :value="value"
      @input="onTextChange"
      v-if="!isHtml"
      :editorToolbar="customToolbar" />

<!-- @text-change="onTextChange" -->
<!-- @input="updateText" -->
<!-- @input="$emit('input', $event.target.value)" -->
<!-- @input="$emit('input', $this.value)" -->

    <!-- <textarea
      class="form-control border-input"
      v-bind="$attrs"
      :value="value"
      style="height: 150px"
      @input="$emit('input', $event.target.value)"
    /> -->
  </div>
</template>
<script>
import { VueEditor } from 'vue2-editor'

  export default {
    components:{
      VueEditor
    },
    inheritAttrs: false,
    props: {
      value: {
        type: String,
        required: false
      },
      label: String,
      icon: {
        type: String,
        default: ""
      },
      fakelabel: {
        type: Boolean,
        default: false
      },
      isHtml: {
        type: Boolean,
        default: true
      },
      
    },
    methods: {
      onTextChange() {
        if (this.isHtml) {
          this.$emit('input', this.$el.getElementsByClassName("ql-editor")[0].innerHTML)
        } else {
          this.$emit('input', this.$el.getElementsByClassName("ql-editor")[0].innerText)
        }
      }
    },
    data(){
      return {
        customToolbar: [[]]

      }
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

  .background{
    background-color: #fffcf5 !important;
    cursor: text !important;

  }
  
</style>
