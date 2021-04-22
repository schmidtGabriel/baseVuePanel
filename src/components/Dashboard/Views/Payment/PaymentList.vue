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
              :options="adminList"
              v-model="filterOptions.isAdmin"
              :selected="filterOptions.isAdmin"
              label="Tipo de Usuário"
            />
          </div>
         <div class="col-md-3">
            <fg-select
              :options="activeList"
              v-model="filterOptions.isActive"
              :selected="filterOptions.isActive"
              label="Status Usuário"
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
            eventName="selectItem"
            :title="table.title"
            :sub-title="table.subTitle"
            :data="list || paymentList"
            :columns="table.columns"
            :headers="table.headers"
            :control="table.control"
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
  const headers = ["/","Nome","Data Cadastrado", "Status", "Deletar"];
  const tableColumns = [
    {
      columnName: "ImageURL",
      logic: function (data, columnData) {
        if (!data) {
          return '';
        }
        return '<img src='+data+' style="width:32px; height: 32px">';
      }
    }, 
    "description", 
    {
      columnName: "createdAt",
      logic: function (data, columnData) {
        if (!data) {
          return ''
        }
        return moment.utc(data).utcOffset(-180).format('D/M/YYYY H:mm:ss');
      }
    },
     {
      columnName: "isActive",
      logic: function (data) {
        let className = 'text-danger';
        let val = 'Suspenso';
        if (data) {
          className = 'text-success';
          val = 'Ativo';
        }
        let prefix = `<span class="${className}" style="font-size:large">&bullet;</span>`;

        return `${prefix} ${val}`
      }
    }
  ];
  const control = [{
    event: "deletePayment",
    class:"ti-trash btn btn-danger btn-sm",
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
        paymentList: ({payment}) => payment.list
      }),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      })
    },

    methods: {
      ...mapActions(["getPaymentList", "deletePayment"]),
    
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
        this.getPaymentList();
        
       
        return Promise.resolve({
          
        })
      }
    },

    created() {
      this.cleanFilter();
      
      this.$on("novo", () => {
        this.$router.push("/admin/pagamentos/criar");

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
          name: "Pagamentos - Editar",
          params: {id: item}
        });
      });
     

      this.$on("deletePayment", item => {
      this.deletePayment(item)
        .then(res => {
          this.$notify({
            group: "foo",
            title: "Sucesso",
            text: "Serviço apagado com sucesso!",
            position: "top center",
            type: "success"
          });
         const index = this.paymentList.indexOf(item, 0);
          if (index > -1) {
              this.paymentList.splice(index, 1);
          }
        })
        .catch(res => {});
    });
    },

    data() {
      return {
        page: 1,
        table: {
          title: "Formas de Pagamento",
          subTitle: "Lista de formas de pagamento cadastrados",
          headers: [...headers],
          columns: [...tableColumns],
          control: [...control]
        },
        filter: false,
        filterOptions: {
          isAdmin: undefined,
          idActive: undefined,
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