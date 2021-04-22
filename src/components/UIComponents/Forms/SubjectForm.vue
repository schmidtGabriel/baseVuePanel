<template>
  <div v-if="data">
    <form  autocomplete="off">

      <div class="row">
        <div class="col-md-12">
          <fg-input class="clean" type="text" label="Nome" placeholder="Nome" v-model="data.name"
            v-bind:readonly="readonly" />
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
    name: "subject-form",
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

      // execute() {
      //   console.log("x")
      //   if (this.event) {
          

      //     this.$parent.$emit(this.event, this.data);
      //   }
      // },
    },

    created() {

      this.$on("execute", () => {

        if(this.event){

        if(!this.data.name || this.data.name == ""){
           return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Nome é obrigatório",
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
