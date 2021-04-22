<template>
  <div>

    <!-- //FILTRO -->
    <div class="row" v-if="!list">
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

      <div v-if="filter">
        <div class="row" style="padding-bottom: 5px" text-center>
          <div class="col-md-3">
            <fg-select :options="sendArray" v-model="filterOptions.isSend" :selected="filterOptions.isSend" label="Status" />
          </div>
          <div class="col-md-3">
            <fg-input type="date" label="Data de criação Inicial" :max="filterOptions.intervalEnd" v-model="filterOptions.intervalStart" />
          </div>

          <div class="col-md-3">
            <fg-input type="date" label="Data de criação Final" :min="filterOptions.intervalStart" v-model="filterOptions.intervalEnd" />
          </div>

        </div>

        <div class="row" style="padding-bottom: 5px" text-center>
          <div class="col-md-6">
            <fg-input type="text" label="Busca" placeholder="Nome, Telefone, Email..." v-model="filterOptions.term" />
          </div>
          <div class="col-md-6">
            <fg-input type="text" label="Busca por Remetente" placeholder="Id do remetente..." v-model="filterOptions.UserIdSend" />
          </div>
        </div>

        <div class="row" style="margin-bottom: 10px">
          <div class="col-md-12" style="flex-wrap: wrap;">
            <div class="text-right">
              <btn-rounded class="text-right" label="FILTRAR" event="activeFilter" active-color="success" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- FILTRO// -->

    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <component-table eventName="showLog" :title="table.title" :sub-title="table.subTitle" :data="list || notificationList"
            :columns="table.columns" :headers="table.headers"  />
        </div>
      </div>
    </div>
<v-dialog />

  </div>
</template>

<script>
  import ComponentTable from "components/UIComponents/Lists/ComponentTable.vue";
  import {
    mapActions,
    mapState,
    mapGetters
  } from "vuex";
  import moment from 'moment';
  import VModal from 'vue-js-modal'
  import Vue from 'vue'

  Vue.use(VModal, { dialog: true })
  const headers = ["Título", "Mensagem", "Usuário Remetente","Data"  ,"Status"];
  const tableColumns = [
    "title", "body", "UserSend.name",
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
      columnName: "isSend",
      logic: function (data) {
        let className = 'text-danger';
        let val = 'Erro';
        if (data) {
          className = 'text-success';
          val = 'Enviada';
        }
        let prefix = `<span class="${className}" style="font-size:large">&bullet;</span>`;

        return `${prefix} ${val}`
      }
    }
  ];


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
        notificationList: ({
          notification
        }) => notification.list
      }),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      })
    },

    methods: {
      ...mapActions(["getNotificationsList"]),

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
          return this.getNotificationsList(this.filterOptions);
        }

        return Promise.resolve({})
      }
    },

    created() {
     this.cleanFilter();
      this.$on("novo", () => {
        this.$router.push("/admin/notificacoes/criar");

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

      this.$on("showLog", item => {
          this.$modal.show('dialog', {
            title: 'LOG',
            text: "<div style='overflow-x:scroll;hidden;width:auto;height:200px'>"+
                  //"<div style='width:400px;height:250px'>"+
                  item.log+//"</div>"+
                  "</div>",
            buttons: [
              {
                title: 'ok',
                handler: () => {
                this.$modal.hide('dialog')

              }
              },
            ]
          })
          .catch(res => {});
      });
 },

    data() {
      return {
        page: 1,
        table: {
          title: "Notificações",
          subTitle: "Lista de notificações enviadas",
          headers: [...headers],
          columns: [...tableColumns],
        },
        filter: false,
        filterOptions: {
          term: undefined,
          intervalStart: undefined,
          intervalEnd: undefined,
          id: undefined,
          UserIdSend: undefined,
          isSend: undefined
        },
        sendArray: [{
            name: "Enviados",
            value: true
          },
          {
            name: "Não Enviados",
            value: false
          },
        ]


      };
    },

  }; 
  </script>

<style lang="scss" scoped>
</style>