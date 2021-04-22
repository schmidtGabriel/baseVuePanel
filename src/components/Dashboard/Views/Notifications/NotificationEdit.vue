<template>
   
     <div class="row">
  <div
            class="col-md-12 text-right"
          >
            <btn-rounded
              label="VOLTAR"
              event="goBack"
            />
          </div>
        
      <div class="col-md-12">

        <div>
          <button
            class="btn btn-rounded btn-fill"
            :class="[{' btn-success': !localReadonly}, {' btn-warning': localReadonly}]"
            style="padding-left: 10px; padding-right: 10px"
            v-on:click="unlock()"
          >
            <i
              :class="[{'ti-unlock': !localReadonly}, {'ti-lock': localReadonly}]"
            ></i>
          </button>
        </div>


          
    
   
      
  
</div>
      </div>
   
</template>
<script>

  import formConfirmButton from "src/components/UIComponents/Inputs/formConfirmButton.vue";
  import {mapActions, mapGetters, mapState} from "vuex";
  import Notifications from 'vue-notification'
  import ComponentTable from "components/UIComponents/Lists/ComponentTable.vue";
  import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'
  import moment from 'moment';

  Vue.use(Notifications);

  Vue.use(Viewer);
  const controlAdditional = [{
    event: "deleteAdditional",
    icon: "ti-close",
    class:""
  }]
  const headersAdicional = [ "Titulo", "Descrição", "Tipo", "Criado","Status"];
  const tableColumnsAdicional = ["title", "detail", "descriptionType" ,
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
      }];
      const headersItem = [ "Titulo", "Valor", "Quantidade", "Criado","Status"];
  const tableColumnsItem= ["description", "formattedValue", "amount" ,
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
      }];
  
  export default {
    components: {
      formConfirmButton,
      ComponentTable,
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    computed: {
      ...mapState({
      }),
    },
    watch: {
      '$route': 'initData'
    },
    methods: {
      ...mapActions([
        "updateProduct",
        "deleteAdditional",
        "getStore"
      ]),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      }),
      initData() {
       this.product = !this.$route.params.product ? {} : this.$route.params.product ;
      this.store = !this.$route.params.store ? {} : this.$route.params.store ;
       this.verifyID()
      },

      unlock() {
        if (this.sidebarFlag() === 'ADMIN') {
          this.localReadonly = !this.localReadonly
        } else {
          this.localReadonly = true;
        }
      },

      formatDollar(num) {

        var p = (num / 100).toFixed(2).split(".");
        return "R$" + p[0].split("").reverse().reduce(function (acc, num, i, orig) {
          return num == "-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
        }, "") + "," + p[1];
      },
      verifyID(){
        if(this.product == undefined){
            this.$router.push({
          name: "Lojas - Lista",
        });
        }
      },

    },

    data() {
      return {
        localReadonly: false,
        store: null,
        product: null,
        readonly: true,

        table: {
          titleAdicional: "Adicionais",
          subTitleAdicional: "Lista de Adicionais cadastradas",
          headersAdicional: [...headersAdicional],
          columnsAdicional: [...tableColumnsAdicional],
          controlAdditional: [...controlAdditional]

        },
      };
    },

    created() {
      this.initData();
      
      this.localReadonly = this.readonly;

      this.$on("selectAdditional", item => {
        this.$router.push({
          name: "Adicionais - Editar",
          params: {adicional: item, product: this.product, store: this.store}
        });
           });
         this.$on("goBack", item => {
        this.$router.push({
          name: "Lojas - Editar",
          params: {store: this.store}
        });
     
      });
       this.$on("createAdditional", item => {
        this.$router.push({
          name: "Adicionais - Criar",
          params: {product: this.product, store: this.store}
        });
      });
       this.$on("deleteAdditional", item => {
         if(item.ProductAdditionalItems.length == 0){
           this.deleteAdditional(item)
              .then(res => {
                this.$notify({
                  group: "foo",
                  title: "Sucesso",
                  text: "Adicional apagado com sucesso!",
                  position: "top center",
                  type: "success"
                });
              const index = this.product.ProductAdditionals.indexOf(item, 0);
                if (index > -1) {
                    this.product.ProductAdditionals.splice(index, 1);
                }
              }).catch(res => {});
        }else{
            this.$notify({
                  group: "foo",
                  title: "Atenção",
                  text: "Você deve apagar os items desse adicional para continuar.",
                  position: "top center",
                  type: "warning"
                });
        }
       
      });
      
      
       this.$on("saveProduct", res => {
        this.product.StoreId = this.store.id
        this.updateProduct(this.product)
          .then(res => {
            this.$notify({
              group: "foo",
              title: "Sucesso",
              text: "Produto salvo com sucesso!",
              position: "top center",
              type: "success"
            });
              this.readonly = true;
               this.getStore(this.store.id)
          .then(res => {
            this.store = res.data;
          })
          .catch(res => {
          });

          })
          .catch(res => {
          });
      });
      
    }

  };


</script>
<style lang="scss" scoped>
  .card-image {
    border: solid 1px white;
    padding: 15px;
    background-color: #f0f0f0;
  }

  .rotateimg90 {
    -webkit-transform: rotate(90deg);
    -moz-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    -o-transform: rotate(90deg);
    transform: rotate(90deg);
  }

  .rotateimg180 {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .rotateimg270 {
    -webkit-transform: rotate(270deg);
    -moz-transform: rotate(270deg);
    -ms-transform: rotate(270deg);
    -o-transform: rotate(270deg);
    transform: rotate(270deg);
  }

  .images {
    cursor: pointer;
  }
</style>