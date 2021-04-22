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
            :data="list || newsList"
            :columns="table.columns"
            :headers="table.headers"
            :control="table.control"
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
  const headers = ["Titulo", "Descrição", "Destaque", "Data Cadastrado"];
  const tableColumns = [ 
    "title", "description", 
    {
      columnName: "isFeatured",
      logic: function (data) {
        let className = 'text-danger';
        let val = 'Não destaque';
        if (data) {
          className = 'text-success';
          val = 'Destaque';
        }
        let prefix = `<span class="${className}" style="font-size:large">&bullet;</span>`;

        return `${prefix} ${val}`
      }
    },
    {
      columnName: "createdAt",
      logic: function (data, columnData) {
        if (!data) {
          return ''
        }
        return moment.utc(data).utcOffset(0).format('DD/MM/YYYY HH:mm:ss');
      }
    },
    
  ];
  const control = [{
    event: "deleteNews",
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
          title: "Notícias",
          subTitle: "Lista de noticias cadastradas",
          headers: [...headers],
          columns: [...tableColumns],
          control: [...control]
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
        newsList: ({news}) => news.list
      }),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      })
    },

    methods: {
      ...mapActions(["getNewsList", "deleteNews"]),
    
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
        this.getNewsList(this.filterOptions);
        
       
        return Promise.resolve({
          
        })
      }
    },

    created() {
      this.cleanFilter();
      
      this.$on("novo", () => {
        this.$router.push({
          name: "Notícia - Criar",
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
          name: "Notícia - Editar",
          params: {id: item}
        });
      });
     

      this.$on("deleteNews", item => {
         this.$modal.show('dialog', {
        title: 'Deletar Notícia',
        text: 'Tem certeza que deseja deletar?',
        buttons: [
          {
            title: 'Sim',
            handler: () => { 
                this.deleteNews(item)
                .then(res => {
                  this.$notify({
                        group: "foo",
                        title: "Sucesso",
                        text: res.msg,
                        position: "top center",
                        type: "success"
                      });
                const index = this.newsList.indexOf(item, 0);
                  if (index > -1) {
                      this.newsList.splice(index, 1);
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