<template>
  <div>
    <div class="form-group">
      <div class="row">
        <div class="col-md-6 col-sn-3">
          <btn-block
            v-if="!confirm"
            event="eventClick"
            :label="label"
            :active-color="activeColor"
            :params="params"
            :disabled="disabled"
            :fill="fill"
          />
          <p
            v-if="confirm"
            class="stronger"
          >
            {{msg}}
          </p>
        </div>
      </div>
      <div class="row">
        <div
          class="col-md-6 col-sn-3"
          v-if="confirm"
        >
          <btn-block
            label="CANCELAR"
            event="eventClick"
            active-color="warning"
          />

          <btn-block
            label="CONFIRMAR"
            event="confirm"
            active-color="success"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    inheritAttrs: false,
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
      },
      msg: {
        type: String,
        default: ""
      }
    },
    methods: {
      clear() {
        this.confirm = false;
      }
    },
    data() {
      return {
        confirm: false
      }
    },
    created() {
      this.$on("eventClick", () => {
        this.confirm = !this.confirm;
      });
      this.$on("confirm", () => {
        if (!this.event) return null;
        this.confirm = false;
        this.$parent.$emit(this.event, this.params);
      })
    }
  }

</script>
<style>
  .stronger {
    font-weight: bold;
    color: black;
    margin: 15px 0 0 0 !important;
  }
</style>
