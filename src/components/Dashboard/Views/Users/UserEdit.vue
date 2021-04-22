<template>
  <div>
    <div class="row margin-half-top">
        <div class="col-md-12">
          <div class="">
            <div class="card-header">
              <btn-rounded
                label="DADOS CADASTRAIS"
                event="showView"
                params="profile"
                :fill="activeView === 'profile'"
              />
              <!-- <btn-rounded
                label="ENDEREÇO"
                event="showView"
                params="endereco"
                :fill="activeView === 'endereco'"
              /> -->

  
            
            </div>
          </div>
        </div>
      </div>


    <div v-if="activeView === 'profile'">

     <div class="row">

          <div class="col-md-12">
            <div class="col-md-1">
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
             <div class="col-md-11"  v-if="!localReadonly">
              <button
                class="btn btn-rounded btn-fill btn-wd"
                :class="[{' btn-success': isAdmin}, {' btn-error': !isAdmin}]"
                style="padding-left: 10px; padding-right: 10px"
                v-on:click="Checkadmin()"
              >
                <font v-if="!isAdmin"> Não Admin </font>
              <font v-if="isAdmin"> Admin </font>
              </button>

              <!-- <button
                class="btn btn-rounded btn-fill"
                :class="[{' btn-success': isActive}, {' btn-error': !isActive}]"
                style="padding-left: 10px; padding-right: 10px"
                v-on:click="Checkactive()"
              >
              <font v-if="!isActive"> Usuário Desativado </font>
              <font v-if="isActive"> Usuário Ativo </font>
              
              </button> -->

               <button
                class="btn btn-rounded btn-fill btn-warning btn-wd"
                style="padding-left: 10px; padding-right: 10px"
                v-on:click="reset()"
                v-if="isActive"
              >
              <font > Esqueceu a Senha</font>
              
              </button>
      

            </div>
           
            
            <div class="col-md-12">
          
            <client-form
              :data='data'
              :readonly="localReadonly"
              :edit= true
              event="saveClient"
            />
            </div>
<!-- 
          <div
            class="col-md-12 text-right"
            v-if="!localReadonly"
          >
            <btn-rounded
              label="SALVAR"
              event="saveClient"
            />
          </div> -->
        </div>
      </div>

    </div>

 <div v-if="activeView === 'endereco'">
      <div class="row">
     <div class="col-md-12">
 <div class="card">
          <component-table
            eventName="selectAddress"
            :title="tableAddress.title"
            :sub-title="tableAddress.subTitle"
            :data="data.Addresses"
            :control="tableAddress.control"
            :columns="tableAddress.columns"
            :headers="tableAddress.headers"
          />
        </div>

            <address-form
              :data='address'
              event="saveAddress"
            />
          </div>

        </div>
  </div>

 <!-- <div v-if="activeView === 'carteira'">
      <h2>Saldo  - <b> {{data.formattedBalanceCentavos}} </b></h2>
      <h4 v-if="data.availableTransferCentavos">Valor Disponível para saque  - <b> {{data.formattedAvailableTransferCentavos}} </b></h4>
      <h4 v-if="data.formattedLockedTransfer" >Valor bloqueado  - <b> {{data.formattedLockedTransfer}} </b></h4>

      <div class="col-md-3">
          <fg-input
            class="clean"
            type="text"
            label="Valor"
            placeholder="Valor"
            v-on:input="format"
            v-model="send.formattedbalanceCentavos"
           

          />
        </div>
          <div class="col-md-6">
          <fg-input class="clean" type="text" label="Descrição" placeholder="..." v-model="send.description"
            />
        </div> 
        <div class="col-md-6">
           <btn-rounded
              label="ADICIONAR"
              event="addCash"
              activeColor="success"

            />
             <btn-rounded
              label="REMOVER"
              event="removeCash"
              activeColor="danger"
            />
          </div> 
    <div class="col-md-12" v-if="balance.length > 0">
       <div class="card">
          <component-table
            eventName="selectItem"
            :title="tableBalance.title"
            :sub-title="tableBalance.subTitle"
            :data="balance[0].UserBalances"
            :columns="tableBalance.columns"
            :headers="tableBalance.headers"
          />
        </div>
    </div>
 </div> -->



  </div>
</template>
<script>
import ClientCard from 'src/components/UIComponents/Cards/ClientCard.vue'
import ClientForm from "src/components/UIComponents/Forms/ClientForm.vue";
import formConfirmButton from "src/components/UIComponents/Inputs/formConfirmButton.vue";
import ComponentTable from "components/UIComponents/Lists/ComponentTable.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import AddressForm from "src/components/UIComponents/Forms/AddressForm";
import Notifications from "vue-notification";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
  import moment from 'moment';

Vue.use(Notifications);
Vue.use(Viewer);

 const headersAddress = ["Rua","Numero", "Complemento","Bairro","Cidade", "Estado", "CEP", "Deletar"];
  const tableColumnsAddress = ["street", "number", "complement","district", "city", "abbreviation", "cep" ];
  const controlAddress = [{
    event: "deleteAddress",
    class:"ti-trash btn btn-danger btn-sm",
  }]   

  
  

export default {
  components: {
    ClientForm,
    formConfirmButton,
    ClientCard,
    AddressForm,
    ComponentTable
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  computed: {
    ...mapState({
      user: ({ user }) => user.selected
    })
  },
  watch: {
    $route: "initData"
  },
  methods: {
    ...mapActions(["updateUser", "getUser","authReset", "createAddress", "deleteAddress", "updateAddress"]),
    ...mapGetters({
      sidebarFlag: "sidebarFlag"
    }),
    initData() {
      this.activeView = "profile";
      this.data = this.$route.params.id;
      this.verifyID();
    
     
     
    },

    unlock() {
      if (this.sidebarFlag() === "ADMIN") {
        this.localReadonly = !this.localReadonly;
      } else {
        this.localReadonly = true;
      }
    },

    reset(){
    this.authReset(this.data)
        .then(res => {
          this.$notify({
            group: "foo",
            title: "Sucesso",
            text: "Email com nova senha enviada para usuário!",
            position: "top center",
            type: "success"
          });
        
        })
        .catch(res => {});

    },
    formatDollar(num) {
      var p = (num / 100).toFixed(2).split(".");
      return (
        "R$" +
        p[0]
          .split("")
          .reverse()
          .reduce(function(acc, num, i, orig) {
            return num == "-" ? acc : num + (i && !(i % 3) ? "." : "") + acc;
          }, "") +
        "," +
        p[1]
      );
    },  
    Checkadmin() {
      this.data.isAdmin = !this.data.isAdmin;

      this.updateUser({"id": this.data.id, "isAdmin": this.data.isAdmin}).then(res=>{
      if (this.data.isAdmin) {
        this.isAdmin = true;
      } else {
        this.isAdmin = false;
      }
      })
    },
    Checkactive() {
        this.data.isActive = !this.data.isActive;

      this.updateUser({"id": this.data.id, "isActive": this.data.isActive}).then(res=>{
        if (this.data.isActive) {
        this.isActive = true;
      } else {
        this.isActive = false;
      }
      })

    },
    verifyID(){
        if(this.data == undefined){
            this.$router.push({
          name: "Usuários - Lista",
        });
        }else{
        this.isAdmin = this.data.isAdmin;
        this.isActive = this.data.isActive;
        }
    },

  },

  data() {
    return {
      localReadonly: false,
      isAdmin: false,
      isActive: false,
      data: null,
      address: {},
      readonly: true,
      activeView: 'profile',
       tableAddress: {
          title: "Endereços",
          subTitle: "Lista de endereços do usuário cadastrados",
          headers: [...headersAddress],
          columns: [...tableColumnsAddress],
          control: [...controlAddress]
        },
    };
  },

  created() {
    this.initData();
    this.localReadonly = this.readonly;

 this.$on("selectAddress", item => {
      this.address = item;
    });

    this.$on("showView", view => {
      this.activeView = view;
    });


    this.$on("saveClient", () => {
      
      this.updateUser(this.data)
        .then(res => {
          this.$notify({
            group: "foo",
            title: "Sucesso",
            text: res.msg,
            position: "top center",
            type: "success"
          });
          this.localReadonly = true;
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
    });

     this.$on("saveAddress", () => {
       if(this.address.id){
      //  this.address.state = this.chooseState(this.address.abbreviation)

        this.updateAddress(this.address)
        .then(res => {
          this.$notify({
            group: "foo",
            title: "Sucesso",
            text: res.msg,
            position: "top center",
            type: "success"
          });
          this.address = {};
          
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
       }else{
         this.address.UserId = this.data.id;
        //  this.address.state = this.chooseState(this.address.abbreviation)

      this.createAddress(this.address)
        .then(res => {
          this.$notify({
            group: "foo",
            title: "Sucesso",
            text: "Operação realizada com sucesso!",
            position: "top center",
            type: "success"
          });
          this.data.Addresses.push(this.address)
          this.address = {};
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
       }
    });
  
this.$on("deleteAddress", item => {
  this.deleteAddress(item)
        .then(res => {
          this.$notify({
            group: "foo",
            title: "Sucesso",
            text: res.msg,
            position: "top center",
            type: "success"
          });
         const index = this.data.Addresses.indexOf(item, 0);
          if (index > -1) {
              this.data.Addresses.splice(index, 1);
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