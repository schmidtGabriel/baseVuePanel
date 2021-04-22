<template>
  <div class="form-group">
    <div>
      <img :class="imgType" v-bind:src="lValue" v-viewer/>
    </div>
    <div
      class="choose_file"
      v-if="!ready"
    >
      <span class="ti-camera"></span>
      <input class="choose_file" ref="image" type="file" @change="onFileChange">
    </div>
    <div
      v-if="ready"
    >
      <div class="choose_file">
        <span class="ti-save" style="color: green" v-on:click="save()"></span>
      </div>
      <div class="choose_file">
        <span class="ti-back-left" style="color: red" v-on:click="reset()"></span>
      </div>
    </div>
   
  </div>
</template>
<script>
  import {getCookie} from 'src/utils/authService';

  export default {
    inheritAttrs: false,
    methods: {
      onFileChange() {
        const files = this.$refs.image.files;
        this.formD = new FormData();
        this.formD.append('file', files[0]);
        this.ready = true;

        let reader = new FileReader();
        reader.onload = (e) => {
          this.lValue = e.target.result;
        };

        reader.readAsDataURL(files[0]);

      },
      save() {
        let request = new XMLHttpRequest();
        request.open("POST", this.url);
        request.setRequestHeader('security-token', getCookie('token').replace(/(^")|("$)/g, ''));
        request.send(this.formD);
        this.ready = false;
      },
      reset() {
        this.lValue = this.value;
        this.ready = false;
      }
    },
    props: {
      url: String,
      value: String,
      imgType: {
        type: String,
        default: "square",
        validator: value => {
          let acceptedValues = [
            "landscape",
            "square"
          ];
          return acceptedValues.indexOf(value) !== -1;
        }
      },
    },
    data() {
      return {
        lValue: "",
        formD: null,
        ready: false
      }
    },
    created() {
      this.lValue = this.value;
    }
  };
</script>
<style lang="scss">
  label.stronger {
    font-weight: 200 !important;
    color: #777777 !important;
    opacity: 0.7;

  }

  .square {
    height: 150px;
    width: 150px;
  }

  .landscape {
    height: 150px;
    width: 350px;
  }

  .clean input.form-control[readonly], textarea.form-control[readonly] {
    background-color: #fffcf5 !important;
    cursor: text !important;
    color: #66615b !important;
  }

  .choose_file {
    position: relative;
    display: inline-block;
    margin-top: 2px;
    width: 24px;
    height: 24px;
    font-size: 24px;
  }

  .choose_file span {
    color: black;
    font-weight: bolder;
  }

  .choose_file input[type="file"] {
    -webkit-appearance: none;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    width: 32px;
    height: 32px;
  }
</style>
