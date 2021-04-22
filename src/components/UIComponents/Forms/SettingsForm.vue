  <template>
  <div>
    <form  autocomplete="off">
      <!-- ///responsável -->
      
       
       


       <div class="row">

         <!-- <div
          class="col-md-6"
          v-if="data.id"
        >
          <form-group-image
            :url="url+'user/app/car/image/'+data.id"
            :value="data.ImageURL"
            img-type="square"
          />
        </div> -->
         <div
          class="col-md-12"></div>
        <div class="col-md-4">
          <fg-input
            class="clean"
            type="text"
            label="Preço Mensalidade Estabelecimento"
            placeholder="$$$"
            v-on:input="format"
            v-model="data.formattedEstablishment"
            v-bind:readonly="readonly"

          />
        </div>
       <div class="col-md-4">
          <fg-input
            class="clean"
            type="text"
            label="Preço Mensalidade Prestador"
            placeholder="$$$"
            v-on:input="format2"
            v-model="data.formattedProvider"
            v-bind:readonly="readonly"

          />
        </div>
        <div class="col-md-4">
          <fg-input
            class="clean"
            type="text"
            label="Preço para Destaque no APP"
            placeholder="$$$"
            v-on:input="format3"
            v-model="data.formattedSpotlight"
            v-bind:readonly="readonly"

          />
        </div>
       <div class="col-md-4">
           <fg-select
            label="Aceita Pagamento em Boleto"
            :options="conditionList"
            v-model="data.isPaymentTicket"
            :selected="data.isPaymentTicket"
            :readonly="readonly"
          />
        </div>

         <div class="col-md-4">
           <fg-select
            label="Aceita Pagamento em Cartão de Crédito"
            :options="conditionList"
            v-model="data.isPaymentCredit"
            :selected="data.isPaymentCredit"
            :readonly="readonly"
          />
        </div>

         <div class="col-md-4">
           <fg-select
            label="Aceita Pagamento em Cartão de Débito"
            :options="conditionList"
            v-model="data.isPaymentDebit"
            :selected="data.isPaymentDebit"
            :readonly="readonly"
          />
        </div>
        
      <div class="col-md-6">
          <fg-textarea
            class="clean"
            type="text"
            label="Cobrança rejeitada"
            placeholder=""
            v-model="data.chargingRejected"
            v-bind:readonly="readonly"

          />
        </div>

        <div class="col-md-6">
          <fg-textarea
            class="clean"
            type="text"
            label="Primeira notificação"
            placeholder=""
            v-model="data.firstNotification"
            v-bind:readonly="readonly"

          />
        </div>


        <div class="col-md-6">
          <fg-textarea
            class="clean"
            type="text"
            label="Segunda notificação"
            placeholder=""
            v-model="data.secondNotification"
            v-bind:readonly="readonly"

          />
        </div>

        <div class="col-md-6">
          <fg-textarea
            class="clean"
            type="text"
            label="Terceira notificação"
            placeholder=""
            v-model="data.thirdNotification"
            v-bind:readonly="readonly"

          />
        </div>


      </div>
    </form>

 
  </div>
</template>
<script>
  import {mapActions, mapState, mapGetters} from "vuex";
  import moment from 'moment';
  import formGroupImage from 'src/components/UIComponents/Inputs/formGroupImage.vue';


  export default {
    name: "service-form",
     components: {
       formGroupImage
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
      url: {
        type: String,
        default: "https://api.iddoc.com.br/"
      }

    },

    computed: {
       ...mapState({
        // modelList: ({model}) => model.list.map((obj) => {
        //   return {name: obj.name+"-"+obj.Brand.name+", "+obj.Transmission.name, value: obj.id}
        // }),

      })
    },

    methods: {
      ...mapActions([]),
      ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      }),
      unlock() {
        if (this.sidebarFlag() === 'ADMIN') {
          this.localReadonly = !this.localReadonly
        } else {
          this.localReadonly = true;
        }
      },
       format: function (sValue) {
        this.data.formattedEstablishment = parseInt(("" + sValue).onlyNumber()).int2Money();
        this.data.priceEstablishment = this
          .data
          .formattedEstablishment
          .replace("R$", "")
          .replace(",", "")
          .replace(".", "")
          .replace(" ", "");
        this.$nextTick(() => {
        });
       
      
      },
      format2: function (sValue) {
         
       this.data.formattedProvider = parseInt(("" + sValue).onlyNumber()).int2Money();
        this.data.priceProvider = this
          .data
          .formattedProvider
          .replace("R$", "")
          .replace(",", "")
          .replace(".", "")
          .replace(" ", "");
        this.$nextTick(() => {
        });
       
      
      },
       format3: function (sValue) {
         
        this.data.formattedSpotlight = parseInt(("" + sValue).onlyNumber()).int2Money();
        this.data.priceSpotlight = this
          .data
          .formattedSpotlight
          .replace("R$", "")
          .replace(",", "")
          .replace(".", "")
          .replace(" ", "");
        this.$nextTick(() => {
        });
       
      
      },
      
      initData(){

      }
    
    },

    created() {
      this.initData();

        this.$on("execute", () => {
        this.$parent.$emit(this.event, this.data);
      });

    },
    data() {
      return {
        localReadonly: false,
        conditionList: [
          {name: "Sim", value: true},
          {name: "Não", value: false}
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
