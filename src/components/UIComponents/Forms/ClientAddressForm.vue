<template>
  <div>
    <form  autocomplete="off">
      <!-- ///responsável -->
      <div class="">
        <!-- EDIT USER -->
        <h4 class="input-group-title">
          Endereço
        </h4>
      </div>

      <div class="row">
        <!-- <div class="col-md-6">
           <fg-select
            label="Identificador"
            :options="TipoAddress"
            v-model="data.name"
            :selected="data.name"
            :readonly="readonly"
          />
        </div> -->
  <div class="col-md-6">
          <fg-input
            class="clean"
            type="text"
            label="CEP"
            placeholder="12345-120"
            v-model="data.address_cep"
            v-mask="'#####-###'"
            v-bind:readonly="readonly"
            :keyUP="updateCep()"
          />
        </div>
        <div class="col-md-6">
          <fg-input
            class="clean"
            type="text"
            label="Rua"
            placeholder="Rua Carlos Andrade"
            v-model="data.address_street"
            v-bind:readonly="readonly"
          />
        </div>


        <div class="col-md-6">
          <fg-input
            class="clean"
            type="text"
            label="Número"
            placeholder="1245"
            v-model="data.address_number"
            v-bind:readonly="readonly"
          />
        </div>


        <div class="col-md-6">
          <fg-input
            class="clean"
            type="text"
            label="Bairro"
            placeholder="Dom Pedro"
            v-model="data.address_district"
            v-bind:readonly="readonly"
          />
        </div>


        <div class="col-md-6">
          <fg-input
            class="clean"
            type="text"
            label="Cidade"
            placeholder="Vila Velha"
            v-model="data.address_city"
            v-bind:readonly="readonly"
          />
        </div>


        <div class="col-md-6">
           <fg-select
            label="Estado"
            :options="StateList"
            v-model="data.address_abbreviation"
            :selected="data.address_abbreviation"
            :readonly="readonly"
            :change="onChange()"
          />
        </div>


        <div class="col-md-6">
          <fg-input
            class="clean"
            type="text"
            label="Complemento"
            placeholder="Apt, Ponto de referencia, etc..."
            v-model="data.address_complement"
            v-bind:readonly="readonly"


          />
        </div>

          <!-- <div
            class="col-md-12 text-right"
          >
            <btn-rounded
              v-if="!readonly"
              label="SALVAR"
              event="execute"
            />
          </div> -->
      </div>
    </form>
  </div>
</template>
<script>
  import {mapState, mapActions} from "vuex";

  export default {
    name: "address-form",

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
      }
    },

    computed: {
      ...mapState({
        // operatorList: ({operator}) => operator.list.map((obj) => {
        //   return {name: obj.name, value: obj.id}
        // })
      })

    },

    methods: {
      ...mapActions(["getCep"]),
      updateCep(){
    
        if (this.data.address_cep != undefined) {
        if(this.oldCep != this.data.address_cep){
        if(this.data.address_cep.length >= 9){
          //chamada pra pegar o cep
          this.getCep(this.data.address_cep).then(res=>{
              this.data.address_street = res.street
              this.data.address_district = res.district
              this.data.address_city = res.city
              this.data.address_abbreviation = res.state
              this.oldCep = this.data.address_cep

            })
        }
        }
        }
      },

      onChange(){
        for(var i = 0; i < this.StateList.length; i++){
          if(this.data.address_abbreviation == this.StateList[i].value){
            this.data.address_state = this.StateList[i].name
          }
        }
      }
    },

    created() {
      this.oldCep = this.data.address_cep;


      this.$on("execute", () => {

        if(this.event){
          
    if (!this.data.cep || this.data.cep == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Cep é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

        if (!this.data.street || this.data.street == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Rua é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

  

        if (!this.data.district || this.data.district == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Bairro é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

        if (!this.data.city || this.data.city == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Cidade é obrigatório",
                position: "top center",
                type: "warn"
              });
        }

        if (!this.data.abbreviation || this.data.abbreviation == "") {
             return this.$notify({
                group: "foo",
                title: "Atenção",
                text: "Campo Estado é obrigatório",
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
        oldCep: '',
        TipoAddress: [
          {
            name: "Casa",
            value: 0
          },
          {
            name: "Trabalho",
            value: 1
          }
        ],
        StateList: [
           {
            value: "AC", name: "Acre"
          },
           {
            value: "AL", name: "Alagoas"
          },
           {
            value: "AP", name: "Amapá"
          },
           {
            value: "AM", name: "Amazonas"
          },
           {
            value: "BA", name: "Bahia"
          },
           {
            value: "CE", name: "Ceará"
          },
           {
            value: "DF", name: "Distrito Federal"
          },
          {
            value: "ES", name: "Espirito Santo"
          },
           {
            value: "GO", name: "Goiás"
          },
           {
            value: "MA", name: "Maranhão"
          },
           {
            value: "MT", name: "Mato Grosso"
          },
           {
            value: "MS", name: "Mato Grosso do Sul"
          },
           {
            value: "MG", name: "Minas Gerais"
          },
           {
            value: "PA", name: "Pará"
          },
           {
            value: "PB", name: "Paraíba"
          },
           {
            value: "PR", name: "Paraná"
          },
           {
            value: "PE", name: "Pernambuco"
          },
           {
            value: "PI", name: "Piauí"
          },
           {
            value: "RJ", name: "Rio de Janeiro"
          },
           {
            value: "RN", name: "Rio Grande do Norte"
          },
           {
            value: "RS", name: "Rio Grande do Sul"
          },
           {
            value: "RO", name: "Rondônia"
          },
           {
            value: "RR", name: "Roraima"
          },
           {
            value: "SC", name: "Santa Catarina"
          },
          {
            value: "SP", name: "São Paulo"
          },
          {
            value: "SE", name: "Sergipe"
          },
          {
            value: "TO", name: "Tocantins"
          }
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
