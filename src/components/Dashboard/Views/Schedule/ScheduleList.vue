<template>
  <div>
<!-- //FILTRO -->
    <div
      class="row"
      v-if="!list"
    >
      <div
        class="col-md-12 text-right"
        style="flex-wrap: wrap; margin-bottom: 10px"
      >

           <btn-rounded
            class="text-right"
            :label="'NOVO'"
            event="novo"
            :active-color="'success'"
          />

          <btn-rounded
            class="text-right"
            :label="filter ? 'LIMPAR' : 'FILTRO'"
            event="showFilter"
            :active-color="filter ? 'danger' : 'primary'"
          />
        </div>

      <div
        v-if="filter"
      >
        <div
          class="row"
          style="padding: 5px"
          text-center
        >
        <div class="col-md-3">
            <fg-select
              :options="statusList"
              v-model="filterOptions.status"
              :selected="filterOptions.status"
              label="Status do Agendamento"
            />
          </div>
          
          <div class="col-md-3">
            <fg-input
              type="date"
              label="Data de criação Inicial"
              :max="filterOptions.intervalEnd"
              v-model="filterOptions.intervalStart"
            />
          </div>

          <div class="col-md-3">
            <fg-input
              type="date"
              label="Data de criação Final"
              :min="filterOptions.intervalStart"
              v-model="filterOptions.intervalEnd"
            />
          </div>

        </div>

        <div
          class="row"
          style="padding: 5px"
          text-center
        >
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Busca"
              placeholder="Nome, Email..."
              v-model="filterOptions.term"
            />
          </div>
        </div>

        <div
          class="row"
          style="margin-bottom: 10px"
        >
          <div class="col-md-12" style="flex-wrap: wrap;">
            <div class="text-right">
              <btn-rounded
                class="text-right"
                label="FILTRAR"
                event="activeFilter"
                active-color="success"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FILTRO// -->
    
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <component-table
            v-if="sidebarFlag == 'ADMIN'"
            eventName="selectItem"
            :title="table.title"
            :sub-title="table.subTitle"
            :data="list || scheduleList"
            :columns="table.columns"
            :headers="table.headers"
            :buttons="table.buttons"
            :control="table.control"
          />
           <component-table
            v-if="sidebarFlag != 'ADMIN'"
            eventName="selectItem"
            :title="table.title"
            :sub-title="table.subTitle"
            :data="list || scheduleList"
            :columns="table.columns"
            :headers="table.headers"
            :control="table.control"
          />
        </div>
      </div>
    </div>
<v-dialog />
 <!-- <modal name="bar" :adaptive="true" height="auto" >
    <div style="padding: 16px">
      <h5> Altere a situação do agendamento </h5>
  
        <div class="text-center">
         
          <button class="btn btn-rounded btn-fill"
          :class="itemAux.isAttended==false?'btn-danger':''"
          style="padding-left: 20px; padding-right: 20px; margin-right: 10px"
          v-on:click="alterarStatus(false)"> Cancelado </button>

          <button class="btn btn-rounded btn-fill"
          :class="itemAux.isAttended==true?'btn-success':''"
          style="padding-left: 20px; padding-right: 20px; margin-right: 10px"
          v-on:click="alterarStatus(true)"> Confirmado </button>
        </div>     
    </div>
  </modal> -->
  </div>
</template>

<script>
  import ComponentTable from "components/UIComponents/Lists/ComponentTable.vue";
  import {mapActions, mapState, mapGetters} from "vuex";
  import moment from 'moment';
  const headers = ["Area","Data Cadastrado", "Status", "Aprovar"];
  const tableColumns = [ 
    "Area.name", 
    {
      columnName: "createdAt",
      logic: function (data, columnData) {
        if (!data) {
          return ''
        }
        return moment.utc(data).utcOffset(0).format('DD/MM/YYYY HH:mm:ss');
      }
    },{
      columnName: "status",
      logic: function (data) {
         var className = 'text-warning';
         var  val = 'Pendente';

        if (data == -1) {
          className = 'text-danger';
          val = 'Cancelada';
        }else if(data == 0){
          className = 'text-warning';
          val = 'Pendente';
        }
        else if(data == 1){
          className = 'text-success';
          val = 'Confirmada';
        }
        let prefix = `<span class="${className}" style="font-size:large">&bullet;</span>`;

        return `${prefix} ${val}`
      }
    },
  ];
  const control = [{
    event: "deleteSchedule",
    class:"ti-trash btn btn-danger btn-sm",
  }]  
  const buttons = [
    {
    event: "approveSchedule",
    // class:"ti-trash btn btn-danger btn-sm",
    icon: "/static/img/confirm.png",
    column: "status"
  },
  {
    event: "rejectSchedule",
    // class:"ti-trash btn btn-danger btn-sm",
    icon: "/static/img/cancel.png",
    column: "status"

  }
  ]  
  

  export default {
    components: {
      ComponentTable
    },

    props: {
      list: {
        type: Array,
        default: () => {
          return null;
        }
      }
    },

     data() {
      return {
        page: 1,
        table: {
          title: "Agendamento",
          subTitle: "Lista de agendamento cadastradas",
          headers: [...headers],
          columns: [...tableColumns],
          control: [...control],
          buttons: [...buttons]
        },
        filter: false,
        filterOptions: {
          term: undefined,
          intervalStart: undefined,
          intervalEnd: undefined,
          status: undefined
 
        },
        statusList: [
          {
            name: "Cancelado",
            value: -1
          },
          {
            name: "Pendente",
            value: 0
          },
          {
            name: "Confirmado",
            value: 1
          },
        ]
      };
    },

    computed: {
      ...mapState({
        scheduleList: ({schedule}) => schedule.list
      }),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      })
    },

    methods: {
      ...mapActions(["getScheduleList", "deleteSchedule", "approveSchedule", "rejectSchedule"]),
    
      setPage: function (page) {
        this.page = page;
      },
      
     cleanFilter() {
        for (let idx in this.filterOptions) {
          this.filterOptions[idx] = undefined;
        }

        this.filterOptions.status = 0
        // this.filterOptions.intervalStart = moment().startOf('month').format('YYYY-MM-DD');
        // this.filterOptions.intervalEnd = moment().endOf('month').format('YYYY-MM-DD');
        this.initData();
      },


      initData() {
        this.getScheduleList(this.filterOptions);
        
       
        return Promise.resolve({
          
        })
      }
    },

    created() {
      this.cleanFilter();
      
      this.$on("novo", () => {
        this.$router.push({
          name: "Agendamento - Criar",
        });
      });
      this.$on("showFilter", () => {
        if (this.filter) this.cleanFilter();
        this.filter = !this.filter;
      });
      this.$on("activeFilter", () => {
        if (!!this.filterOptions.term && this.filterOptions.term.length < 3) {
          return this.$notify({
            group: "foo",
            title: "Busca invalida",
            text: "Minímo de 3 caracteres",
            position: "top center",
            type: "error",
          });
        }
        this.initData();
        // this.filter = !this.filter;
      });


      this.$on("selectItem", item => {
        this.$router.push({
          name: "Agendamento - Editar",
          params: {id: item}
        });
      });
     
      this.$on("approveSchedule", item => {
        var send = {
          id: item.id
        }
        this.approveSchedule(send).then(res=>{
           this.$notify({
              group: "foo",
              title: "Sucesso",
              text: res.msg,
              position: "top center",
              type: "success"
            });
        this.getScheduleList(this.filterOptions);

        }).catch(res=>{
           this.$notify({
              group: "foo",
              title: res.msg,
              text: res.info,
              position: "top center",
              type: "error"
            });
        })
      });
     
      this.$on("rejectSchedule", item => {
        var send = {
          id: item.id
        }
        this.rejectSchedule(send).then(res=>{
          this.$notify({
              group: "foo",
              title: "Sucesso",
              text: res.msg,
              position: "top center",
              type: "success"
            });
        this.getScheduleList(this.filterOptions);

        }).catch(res=>{
            this.$notify({
              group: "foo",
              title: res.msg,
              text: res.info,
              position: "top center",
              type: "error"
            });
        })
      });

      this.$on("deleteSchedule", item => {
         this.$modal.show('dialog', {
        title: 'Deletar Agendamento',
        text: 'Tem certeza que deseja deletar?',
        buttons: [
          {
            title: 'Sim',
            handler: () => { 
                this.deleteSchedule(item)
                .then(res => {
                  this.$notify({
                        group: "foo",
                        title: "Sucesso",
                        text: res.msg,
                        position: "top center",
                        type: "success"
                      });
                const index = this.scheduleList.indexOf(item, 0);
                  if (index > -1) {
                      this.scheduleList.splice(index, 1);
                  }


                })
                .catch(res => {
                  this.$notify({
                        group: "foo",
                        title: res.msg,
                        text: res.info,
                        position: "top center",
                        type: "error"
                      });
                });

                this.$modal.hide('dialog')

        	}
          },
          {
            title: 'Não',       // Button title
            handler: () => {

              this.$modal.hide('dialog')
            } // Button click handler
          }
         
         ]
         })
     
      });
    
    },

   

  };
</script>

<style lang="scss" scoped>

</style>