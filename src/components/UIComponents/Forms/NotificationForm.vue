<template>
  <div>
    <form  autocomplete="off">
      <!-- ///responsável -->
      <div class="">
        <!-- EDIT USER -->

        <div class="row">
          <!-- 
          <div class="col-md-3" v-if="data.id" >
          <form-group-image
            :url="url+'store/payment/icon/'+data.id"
            :value="data.ImageURL"
            img-type="square" />
        </div> -->

          <div class="col-md-6">
            <fg-input class="clean" type="text" label="Titulo" placeholder="Titulo" v-model="data.title"
              v-bind:readonly="readonly" />
          </div>
          <div class="col-md-6">
            <fg-input class="clean" type="text" label="Mensagem" placeholder="Mensagem" v-model="data.body"
              v-bind:readonly="readonly" />
          </div>
        </div>
      </div>
    </form>


  </div>
</template>
<script>
  import {
    NAMES
  } from '../../../config';
  import {
    mapActions,
    mapState,
    mapGetters
  } from "vuex";
  import moment from 'moment';
  import formGroupImage from 'src/components/UIComponents/Inputs/formGroupImage.vue';


  export default {
    name: "notification-form",
    components: {
      formGroupImage
    },

    props: {
      data: {
        type: Object,
      },
      readonly: {
        type: Boolean,
        default: false
      },
      event: {
        type: String,
        default: ''
      },
      url: {
        type: String,
        default: NAMES.fullUrl
      }
    },

    computed: {
      ...mapState({
        operatorList: ({
          operator
        }) => operator.list.map((obj) => {
          return {
            name: obj.name,
            value: obj.id
          }
        })
      })
    },

    methods: {
      ...mapActions([""]),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      }),
      unlock() {
        if (this.sidebarFlag() === 'ADMIN') {
          this.localReadonly = !this.localReadonly
        } else {
          this.localReadonly = true;
        }
      },

      formatDate(date) {
        return moment.utc(date).utcOffset(0).format('DD/MM/YYYY HH:mm:ss')
      }
    },

    created() {
      this.$on("execute", () => {
        this.$parent.$emit(this.event, this.data);
      });

    },
    data() {
      return {
        localReadonly: false,
      };
    },

  };
</script>
<style scoped lang="scss">
  label.stronger {
    font-weight: bold;
    color: black;
  }

  .stronger {
    font-weight: bold;
    color: black;
    margin: 15px 0 0 0 !important;
  }

  p.subject {
    color: #9c9c9c;
  }
</style>
