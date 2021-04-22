<template>
  <div v-if="data">
    <form  autocomplete="off">

      <div class="row">
        <div class="col-md-6">
            <fg-select
              :options="areaList"
              v-model="data.AreaId"
              :selected="data.AreaId"
              label="Area do agendamento"
            />
          </div>

      <div class="col-md-4">
          <fg-input class="clean" type="date" label="Dia" placeholder="Dia" v-model="data.date"
            v-bind:readonly="readonly" />
        </div>

         <div class="col-md-2">
          <fg-input class="clean" type="time" label="Horário" placeholder="Horário" v-model="data.time"
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
        areaList: ({area}) => area.list.map((obj) => {
          return {name: obj.name, value: obj.id}
        }),
      })
    },

    methods: {
      ...mapActions(["getAreaList"]),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      }),
  
      formatDate(date) {
        return moment.utc(date).utcOffset(0).format('DD/MM/YYYY HH:mm:ss')
      },

      initData(){

        if(this.data != undefined){
        if(this.data.dateSchedule){
          var date = this.data.dateSchedule.split(" ");
          this.data.time = date[1]
          var d = date[0].split("-")
          this.data.date = d[2]+"-"+d[1]+"-"+d[0]
        }
        }

        this.getAreaList()
      }

      // execute() {
      //   console.log("x")
      //   if (this.event) {
          

      //     this.$parent.$emit(this.event, this.data);
      //   }
      // },
    },

    created() {
      this.initData()


      this.$on("execute", () => {

        if(this.event){

        if(this.data.date == undefined || this.data.date == ""){
          return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Dia é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

         if(this.data.time == undefined || this.data.time == ""){
          return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Horário é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

        if(this.data.AreaId == undefined || this.data.AreaId == ""){
           return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Area é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

          var d = this.data.date.split("-")
          this.data.dateSchedule = d[2]+"-"+d[1]+"-"+d[0]+" "+ this.data.time

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
