<template>
  <div>

    <div class="row">
      <div class="col-md-12">
        <common-question-form
          :data='data'
          event="save"
        />
      </div>
    </div>


  </div>
</template>
<script>
  import CommonQuestionForm from "components/UIComponents/Forms/CommonQuestionForm.vue";
  import {mapActions} from "vuex";

  export default {
    components: {
      CommonQuestionForm
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

          this.createCommonQuestion(this.data)
            .then(res => {
               this.$notify({
                group: "foo",
                title: "Sucesso",
                text: res.msg,
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
      this.data = !this.$route.params.model ? {} : this.$route.params.model;
    },
    methods: {
      ...mapActions(["createCommonQuestion"]),

    }
  };
</script>
<style lang="scss" scoped>

</style>