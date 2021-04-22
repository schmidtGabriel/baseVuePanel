<template>
  <div v-if="data">
    <form  autocomplete="off">

      <div class="row">
            <div class="col-md-5" v-if="data.id">
            <client-card
                :data="data"
            />
          </div>

      <div :class="data.id?'col-md-7':'col-md-12'">
          <div class="col-md-6">
          <fg-input class="clean" type="email" label="E-mail" placeholder="carlos.andrade@gmail.com" v-model="data.email"
            v-bind:readonly="readonly" />
        </div>
        <div class="col-md-6">
          <fg-input class="clean" type="text" label="Nome Completo" placeholder="Carlos" v-model="data.name"
            v-bind:readonly="readonly" />
        </div>

        <div class="col-md-6">
          <fg-input class="clean" type="text" label="Instagram" placeholder="" 
            v-model="data.instagram" v-bind:readonly="readonly" />
        </div>

         <div class="col-md-6">
          <fg-input class="clean" type="text" label="Registro Siape" placeholder="" 
            v-model="data.siapeRegistration" v-bind:readonly="readonly" />
        </div>

        
        <div class="col-md-6">
          <fg-input class="clean" type="text" label="RG" placeholder="" 
            v-model="data.rg" v-bind:readonly="readonly" v-mask="'#######'" />
        </div>

         <div class="col-md-6">
          <fg-input class="clean" type="text" label="CPF" placeholder="" 
            v-model="data.cpf" v-bind:readonly="readonly"  v-mask="'###.###.###-##'"/>

        </div>

        
        <div class="col-md-6">
          <fg-input class="clean" type="text" label="Data de Nascimento" placeholder="  /  /    " v-mask="'##/##/####'"
            v-model="data.birthday" v-bind:readonly="readonly" />
        </div>

        <div class="col-md-6">
          <fg-input class="clean" type="text" label="Telefone" placeholder="(  )      -     " v-mask="'(##) #####-####'"
            v-model="data.formattedPhone" v-bind:readonly="readonly" />
        </div>

    
         <div class="col-md-3">
            <fg-select
              :options="civilstateList"
              v-model="data.CivilStateId"
              :selected="data.CivilStateId"
              label="Estado Civil"
            />
          </div>

           <div class="col-md-3">
            <fg-select
              :options="sexList"
              v-model="data.SexId"
              :selected="data.SexId"
              label="Sexo"
            />
          </div>

           <div class="col-md-3">
            <fg-select
              :options="nationalityList"
              v-model="data.NationalityId"
              :selected="data.NationalityId"
              label="Nacionalidade"
            />
          </div>

            <div class="col-md-3">
            <fg-select
              :options="organList"
              v-model="data.OrganId"
              :selected="data.OrganId"
              label="Orgão"
            />
          </div>


        <div class="col-md-6">
          <label class="stronger" style="margin: 0px !important"> Ativo? </label> <br>
            <button
                class="btn btn-rounded btn-fill btn-wd"
                :class="data.isActive?'btn-success':'btn-danger'"
                style="margin-top: 5px !important"
                v-on:click="checkIsActive(data.isActive)"
              >
              <font v-if="data.isActive"> Ativo </font>
              <font v-if="!data.isActive"> Não Ativo </font>

              </button>
        </div>
          

            <div class="col-md-6">
            <fg-select
              :options="situationList"
              v-model="data.situation"
              :selected="data.situation"
              label="Situação"
            />
          </div>

        <h5 class="input-group-title" v-if="edit && !readonly">
          Alterar Senha
        </h5>
        <div class="col-md-6" v-if="!readonly">
          <fg-input type="password" label="Senha" placeholder="Senha" v-model="data.password" />
        </div>
        <div class="col-md-6" v-if="!readonly">
          <fg-input type="password" label="Confirmar Senha" placeholder="Senha" v-model="data.confirmPassword" />
        </div>

      </div>
      </div>

    <div class="row">
         <div class="col-md-12">
        <client-address-form
          :data='data'
        />
      </div>
    </div>

  <div class="text-right">
      <btn-rounded
        v-if="!readonly"
        label="SALVAR"
        event="execute"
      />
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
  import ClientAddressForm from "components/UIComponents/Forms/ClientAddressForm.vue";
  import ClientCard from 'components/UIComponents/Cards/ClientCard.vue'

  export default {
    name: "user-form",
    components: {
      ClientAddressForm,
      ClientCard
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
        civilstateList: ({
          civilstate
        }) => civilstate.list.map((obj) => {
          return {
            name: obj.name,
            value: obj.id
          }
        }),
        sexList: ({
          sex
        }) => sex.list.map((obj) => {
          return {
            name: obj.name,
            value: obj.id
          }
        }),
        nationalityList: ({
          nationality
        }) => nationality.list.map((obj) => {
          return {
            name: obj.name,
            value: obj.id
          }
        }),
        organList: ({
          organ
        }) => organ.list.map((obj) => {
          return {
            name: obj.name,
            value: obj.id
          }
        }),
      })
    },

    methods: {
      ...mapActions(["getCivilStateList", "getSexList", "getNationalityList", "getOrganList"]),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      }),
    
      getInvitedByURL(invited) {
        if (!invited) return '';
        let path = window.location.pathname === '/' ? '' : window.location.pathname;
        return `${path}/?#/admin/usuarios/editar/${invited.sharingCode}`;
      },
      formatDate(date) {
        return moment.utc(date).utcOffset(0).format('DD/MM/YYYY HH:mm:ss')
      },

      checkIsActive(situation){
        this.data.isActive = !situation
      },

        initData(){
          if(this.data.situation == undefined){
            this.data.situation = 1
          }
          this.getCivilStateList().then(res=>{
            this.getSexList().then(res=>{
              this.getNationalityList().then(res=>{
                this.getOrganList()
              })
            })
          })
        },


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
        let er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;

        if (!er.exec(this.data.email)) {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo E-mail inválido",
                position: "top center",
                type: "warn"
              });
        }

         if (!this.data.email || this.data.email == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo E-mail é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

        if(!this.data.name || this.data.name == ""){
           return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Nome é obrigatório",
                position: "top center",
                type: "warn"
              });
        }
         if(!this.data.siapeRegistration || this.data.siapeRegistration == ""){
           return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Registro siape é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

         if(!this.data.rg || this.data.rg == ""){
           return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo RG siape é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

         if(!this.data.cpf || this.data.cpf == ""){
           return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo CPF siape é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

   if (!this.data.formattedPhone || this.data.formattedPhone == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Telefone é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

         if (!this.data.birthday || this.data.birthday == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Data de Nascimento é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

          if (!this.data.CivilStateId || this.data.CivilStateId == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Estado Civil é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

         if (!this.data.SexId || this.data.SexId == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Sexo é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

         if (!this.data.NationalityId || this.data.NationalityId == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Nacionalidade é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

         if (!this.data.OrganId || this.data.OrganId == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Orgão é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

  

        if(this.data.id == "" || this.data.id == undefined){

          if (!this.data.password || this.data.password == "") {
              return this.$notify({
                  group: "foo",
                  title: "Atenção",
                  text: "Campo Senha é obrigatório",
                  position: "top center",
                  type: "warn"
                });
          }

          if (this.data.password != this.data.confirmPassword) {
              return this.$notify({
                  group: "foo",
                  title: "Atenção",
                  text: "As Senhas não conferem",
                  position: "top center",
                  type: "warn"
                });
          }

        }

 
        //SexId
        //CivilStateId
        //OrganId
        //NationalityId
        //




// VALIDADE ADDRESS

        if (!this.data.address_cep || this.data.address_cep == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Cep é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

        if (!this.data.address_street || this.data.address_street == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Rua é obrigatório",
                position: "top center",
                type: "warn"
              });
        }


         if (!this.data.address_number || this.data.address_number  == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Número do endereço é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

        if (!this.data.address_district || this.data.address_district == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Bairro é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

        if (!this.data.address_city || this.data.address_city == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Cidade é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

        if (!this.data.address_abbreviation || this.data.address_abbreviation == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Estado é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

          if (!this.data.address_complement || this.data.address_complement  == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Complemento é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

        this.$parent.$emit(this.event, this.data);

        }
      });

    },
    data() {
      return {
        localReadonly: false,
        situationList: [
          {
          "name": "Indefinido",
          "value": -1
          },
           {
          "name": "Ativo",
          "value": 0
          },
           {
          "name": "Aposentado",
          "value": 1
          },
           {
          "name": "Pensionista",
          "value": 2
          },
        ]
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
