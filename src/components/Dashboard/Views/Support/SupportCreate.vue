<template>
  <div>

    <div class="row">
      <div class="col-md-12">
        <service-form
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
  import SupportForm from "components/UIComponents/Forms/SupportForm.vue";
  import {mapActions} from "vuex";

  export default {
    components: {
      SupportForm
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

        if (this.data.name != '') {
          this.createService(this.data)
            .then(res => {
              this.$notify({
                group: "foo",
                title: "Criação.",
                text: "Novo serviço criado com sucesso!",
                position: "top center",
                type: "success"
              });
              this.data = {};
            })
            .catch(res => {
              console.log(res);
            });
        } else {
          alert("Nome inválido")
        }
      });
    },

    mounted() {
      this.data = !this.$route.params.model ? {} : this.$route.params.model;
    },
    methods: {
      ...mapActions(["createService"]),

    }
  };
</script>
<style lang="scss" scoped>

</style>