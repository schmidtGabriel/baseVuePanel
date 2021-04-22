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
          style="padding: 20px"
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
          style="padding: 20px"
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
            eventName="selectItem"
            :title="table.title"
            :sub-title="table.subTitle"
            :data="list || userlist"
            :columns="table.columns"
            :headers="table.headers"
          />
        </div>
      </div>
    </div>
<v-dialog />

  </div>
</template>

<script>
  import ComponentTable from "components/UIComponents/Lists/ComponentTable.vue";
  import {mapActions, mapState, mapGetters} from "vuex";
  import moment from 'moment';
  const headers = ["Nome","Email", "Data Cadastro", "Status"];
  const tableColumns = [
    "name", "email",
    {
      columnName: "createdAt",
      logic: function (data, columnData) {
        if (!data) {
          return ''
        }
        return moment.utc(data).utcOffset(0).format('DD/MM/YYYY HH:mm:ss');
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

     data() {
      return {
        page: 1,
        table: {
          title: "Usuários",
          subTitle: "Lista de usuários cadastrados",
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
        adminList: [
          {
            value: true,
            name: "Admin"
          },
          {
            value: false,
            name: "não Admin"
          }
        ],
        activeList:[
          {
            value: true,
            name: "Ativo"
          },
          {
            value: false,
            name: "não Ativo"
          }
        ],
       
      };
    },

    computed: {
      ...mapState({
        userlist: ({user}) => user.list
      }),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      })
    },

    methods: {
      ...mapActions(["getUserList"]),
    
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
        if(this.$route.params){
        this.filterOptions.isAdmin = this.$route.params.isAdmin;
        }

        if (!this.list) {
          return this.getUserList(this.filterOptions);
        }
       
        return Promise.resolve({})
      }
    },

    created() {
      this.cleanFilter();
      this.$on("novo", () => {
        this.$router.push("/admin/usuarios/criar");

      });
      this.$on("selectItem", item => {
        this.$router.push({
          name: "Usuários - Editar",
          params: {id: item}
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
    },

   

  };
</script>

<style lang="scss" scoped>

</style>