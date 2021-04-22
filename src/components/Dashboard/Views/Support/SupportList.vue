<template>
  <div>

    <!-- //FILTRO -->
    <div
      class="row"
      v-if="!list"
    >
      <div
        class="col-md-12"
        style="flex-wrap: wrap; margin-bottom: 20px"
      >
        <div class="text-right">
          <btn-rounded
            class="text-right"
            :label="filter ? 'LIMPAR' : 'FILTRO'"
            event="showFilter"
            :active-color="filter ? 'danger' : 'primary'"
          />
        </div>

      </div>

      <div
        v-if="filter"
      >
        <div
          class="row"
          style="padding: 20px"
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
          style="padding: 20px"
          text-center
        >
          <div class="col-md-6">
            <fg-input
              type="text"
              label="Busca"
              placeholder="Nome, Telefone, Email..."
              v-model="filterOptions.term"
            />
          </div>
        </div>

        <div
          class="row"
          style="margin-bottom: 20px"
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
            :title="table.title"
            :sub-title="table.subTitle"
            :data="list || supportList"
            :columns="table.columns"
            :headers="table.headers"
            :buttons="table.buttons"
          />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import ComponentTable from "components/UIComponents/Lists/ComponentTable.vue";
  import {mapActions, mapState, mapGetters} from "vuex";
  import moment from 'moment';
  const headers = ["Data", "Usuário", "E-Mail", "Mensagem", "Lido?"];
  const tableColumns = [
    {
      columnName: "createdAt",
      logic: function (data, columnData) {
        if (!data) {
          return ''
        }
        return moment.utc(data).utcOffset(-180).format('D/M/YYYY H:mm:ss');
      }
    },
    "User.nickname", 
    "User.email", 
    "msg",
  ];
  const buttons = [{
    event: "DoneSupport",
    icon: "",
    class:"",
    texto:"Não Lido",
    textoPositivo: "Lido",
    column: "isAttended"
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

    computed: {
      ...mapState({
        supportList: ({support}) => support.list
      }),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      })
    },

    methods: {
      ...mapActions(["getSupportList", "updateSupport"]),
    
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
        if (!this.list) {
          return this.getSupportList(this.filterOptions);
        }
       
        return Promise.resolve({
          
        })
      }
    },

    created() {
      this.cleanFilter();
     
  
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

      this.$on("DoneSupport", item => {
        if(item.isAttended == false){
          item.isAttended = true

          this.updateSupport(item)
            .then(res => {
              this.$notify({
                group: "foo",
                title: "Criação.",
                text: "Chamado concluída",
                position: "top center",
                type: "success"
              });
              this.data = {};
            })
            .catch(res => {
              console.log(res);
            }); 
         }
      });
    
    },

    data() {
      return {
        page: 1,
        table: {
          title: "Suportes",
          subTitle: "Lista de suporte cadastrados",
          headers: [...headers],
          columns: [...tableColumns],
          buttons: [...buttons]
        },
        filter: false,
        filterOptions: {
          term: undefined,
          intervalStart: undefined,
          intervalEnd: undefined,
        },
        
      };
    },

  };
</script>

<style lang="scss" scoped>

</style>