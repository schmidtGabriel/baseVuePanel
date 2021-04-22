<template>
  <div v-if="data">
    <form  autocomplete="off">

      <div class="row">
        <div class="col-md-12">
          <fg-textarea
            class="clean"
            type="text"
            label="Mensagem"
            placeholder=""
            v-model="data.msg"
            v-bind:readonly="readonly"
            :isHtml="false"

          />
        </div>

        <div class="col-md-12" v-if="data.id">
                <button
                class="btn btn-rounded btn-fill btn-wd"
                :class="[{' btn-success': data.isAttended}, {' ': !data.isAttended}]"
                style="padding-left: 10px; padding-right: 10px"
                v-on:click="checkIsAttended(true)"
              >
              <font> Atendida </font>
              
              </button>
              <button
                class="btn btn-rounded btn-fill btn-wd"
                :class="[{' btn-danger': !data.isAttended}, {' ': data.isAttended}]"
                style="padding-left: 10px; padding-right: 10px"
                v-on:click="checkIsAttended(false)"
              >
              <font> Não Atendida </font>
              
              </button>
        </div>
      

        <div class="text-right">
      <btn-rounded
        v-if="!readonly"
        label="SALVAR"
        event="execute"
      />
    </div>

  </div>


    </form>
  </div>
</template>

<script>
  import {
    mapActions,
    mapState,
    mapGetters
  } from "vuex";
  import moment from 'moment';

  export default {
    name: "complaint-form",
    components: {
    
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
      edit: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      ...mapState({
       
      })
    },

    methods: {
      ...mapActions([""]),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      }),
  
      formatDate(date) {
        return moment.utc(date).utcOffset(0).format('DD/MM/YYYY HH:mm:ss')
      },

      checkIsAttended(IsAttended){
        this.data.isAttended = IsAttended
      }

  
    },

    created() {

      this.$on("execute", () => {

        if(this.event){

        if(!this.data.msg || this.data.msg == ""){
           return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Mensagem é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

      

        this.$parent.$emit(this.event, this.data);

        }
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
