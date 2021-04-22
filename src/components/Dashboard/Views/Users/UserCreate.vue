<template>
  <div>

    <div class="row">
      <div class="col-md-12">
        <client-form
          :data='data'
          event='saveClient'
        />
      </div>
    </div>

  </div>
</template>
<script>
  import ClientForm from "components/UIComponents/Forms/ClientForm.vue";
  import {mapActions} from "vuex";

  export default {
    components: {
      ClientForm
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
      this.$on("saveClient", () => {
      
          this.createUser(this.data)
            .then(res => {
              this.$notify({
                group: "foo",
                title: "Sucesso",
                text: "Operação realizada com sucesso!",
                position: "top center",
                type: "success"
              });
              this.data = {};
            })
            .catch(res => {
              this.$notify({
                group: "foo",
                title: res.msg, // "Criação.",
                text: res.info, //"Usuário criado com sucesso!",
                position: "top center",
                type: "error"
              });
            });
       
      });
    },

    mounted() {
      this.data = !this.$route.params.user ? {} : this.$route.params.user;
    },
    methods: {
      ...mapActions(["createUser"]),


    }
  };
</script>
<style lang="scss" scoped>

</style>