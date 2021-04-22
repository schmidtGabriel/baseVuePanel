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
            eventName="selectItem"
            :title="table.title"
            :sub-title="table.subTitle"
            :data="list || complaintList"
            :columns="table.columns"
            :headers="table.headers"
            :control="table.control"
            :buttonStatus="table.buttonStatus" 
          
          />
        </div>
      </div>
    </div>
<v-dialog />
 <modal name="bar" :adaptive="true" height="auto" >
    <div style="padding: 16px">
      <h5> Essa denúncia foi atendida?</h5>
  
        <div class="text-center">
         
          <button class="btn btn-rounded btn-fill btn-wd"
          :class="'btn-danger'"
          style="padding-left: 20px; padding-right: 20px; margin-right: 10px"
          v-on:click="alterarStatus(false)">  Não </button>

          <button class="btn btn-rounded btn-fill btn-wd"
          :class="'btn-success'"
          style="padding-left: 20px; padding-right: 20px; margin-right: 10px"
          v-on:click="alterarStatus(true)"> Sim </button>
        </div>     
    </div>
  </modal>
  </div>
</template>

<script>
  import ComponentTable from "components/UIComponents/Lists/ComponentTable.vue";
  import {mapActions, mapState, mapGetters} from "vuex";
  import moment from 'moment';
  const headers = ["Mensagem","Data Cadastrado", "Atendido"];
  const tableColumns = [ 
    "msg", 
    {
      columnName: "createdAt",
      logic: function (data, columnData) {
        if (!data) {
          return ''
        }
        return moment.utc(data).utcOffset(0).format('DD/MM/YYYY HH:mm:ss');
      }
    }
  ];
  const control = [{
    event: "deleteComplaint",
    class:"ti-trash btn btn-danger btn-sm",
  }]  
    const buttonStatus = [{
  event: "changeStatus",
  column: 'isAttended'
  }]

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
        itemAux: {},
        table: {
          title: "Denúncias",
          subTitle: "Lista de denúncias cadastradas",
          headers: [...headers],
          columns: [...tableColumns],
          control: [...control],
          buttonStatus: [...buttonStatus]
        },
        filter: false,
        filterOptions: {
          term: undefined,
          intervalStart: undefined,
          intervalEnd: undefined,
 
        },
      };
    },

    computed: {
      ...mapState({
        complaintList: ({complaint}) => complaint.list
      }),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      })
    },

    methods: {
      ...mapActions(["getComplaintList", "deleteComplaint", "updateComplaint"]),
    
      setPage: function (page) {
        this.page = page;
      },
      
     cleanFilter() {
        for (let idx in this.filterOptions) {
          this.filterOptions[idx] = undefined;
        }
        // this.filterOptions.intervalStart = moment().startOf('month').format('YYYY-MM-DD');
        // this.filterOptions.intervalEnd = moment().endOf('month').format('YYYY-MM-DD');
        this.initData();
      },


      initData() {
        this.getComplaintList(this.filterOptions);
        
       
        return Promise.resolve({
          
        })
      },

      alterarStatus(status){
        this.itemAux.isAttended = status
        this.updateComplaint(this.itemAux).then(res=>{
        this.getComplaintList(this.filterOptions)

        })
      }
    },

    created() {
      this.cleanFilter();
      
       this.$on("changeStatus", item => {
         if(item.isAttended == true){
           return this.$notify({
            group: "foo",
            title: "Atenção",
            text: "Essa denúncia já foi atendida.",
            position: "top center",
            type: "warn",
          });
         }else{
          this.itemAux = item
           this.$modal.show('bar')
         }
    
      });

      this.$on("novo", () => {
        this.$router.push({
          name: "Denúncia - Criar",
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
          name: "Denúncia - Editar",
          params: {id: item}
        });
      });
     

      this.$on("deleteComplaint", item => {
         this.$modal.show('dialog', {
        title: 'Deletar Denúncia',
        text: 'Tem certeza que deseja deletar?',
        buttons: [
          {
            title: 'Sim',
            handler: () => { 
                this.deleteComplaint(item)
                .then(res => {
                  this.$notify({
                        group: "foo",
                        title: "Sucesso",
                        text: res.msg,
                        position: "top center",
                        type: "success"
                      });
                const index = this.complaintList.indexOf(item, 0);
                  if (index > -1) {
                      this.complaintList.splice(index, 1);
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