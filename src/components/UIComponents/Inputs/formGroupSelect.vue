<template>
  <div>

    <div
      v-if="readonly"
    >
      <fg-input
        class="clean"
        type="text"
        :label="label"
        :fakelabel="fakelabel"
        :value="getSelectedName()"
        v-bind:readonly="readonly"
      />
    </div>

    <div
      v-if="!readonly"
    >
      <div class="form-group">
        <label v-if="label" class="stronger">
          {{label}}
        </label>
        <label v-if="!label && fakelabel" class="stronger">
          &nbsp;
        </label>
        <select
          class="form-control border-input"
          v-bind="$attrs"
          @input="$emit('input', $event.target.value)"
        >
          <option
           v-bind:value="getValue({name: 'Selecione', value: ''})"
            v-html="'Selecione'"
            v-bind:selected="getValue({name: 'Selecione', value: ''}) == selected"
          >
          </option>
          <option
            v-for="opt in options"
            v-bind:value="getValue(opt)"
            v-html="opt.name"
            v-bind:selected="getValue(opt) == selected"
          >
          </option>
        </select>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
    props: {
      options: Array,
      label: String,
      selected: String | Number | Boolean ,
      fakelabel: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      getValue(opt) {
        return opt.value;
      },
      getSelectedName(){
        if(!this.selected) return "";
        let i = this.options.length;
        while (i--) {
          if(this.options[i].value === this.selected){
            return this.options[i].name;
          }
        }
      }
    },
  }

</script>
<style>
</style>
