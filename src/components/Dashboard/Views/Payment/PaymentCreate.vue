<template>
  <div>

    <div class="row">
      <div class="col-md-12">
        <payment-form
          :data='data'
        />
      </div>
    </div>

    <div class="text-right">
      <btn-rounded
        label="SALVAR"
        event="save"
      />
    </div>

  </div>
</template>
<script>
  import PaymentForm from "components/UIComponents/Forms/PaymentForm.vue";
  import {mapActions} from "vuex";

  export default {
    components: {
      PaymentForm
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
    data() {
      return {
        data: {}
      };
    },
    created() {
      this.$on("save", () => {
            this.data.discount = 0;
        if (this.data.description != '') {
          this.createPayment(this.data)
            .then(res => {
              this.$notify({
                group: "foo",
                title: "Criação.",
                text: "Novo método de pagamento criado com sucesso!",
                position: "top center",
                type: "success"
              });
              this.data = {};
            })
            .catch(res => {
              console.log(res);
            });
        } else {
          alert("Descrição inválida")
        }
      });
    },

    mounted() {
      this.data = !this.$route.params.model ? {} : this.$route.params.model;
    },
    methods: {
      ...mapActions(["createPayment"]),

    }
  };
</script>
<style lang="scss" scoped>

</style>