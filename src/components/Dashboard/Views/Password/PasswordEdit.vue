<template>
  <div>
    
   <password-form
              :data='data'
              event="savePass"
            />
    
      
   
  

     <div class="text-right">
      <btn-rounded
        label="SALVAR"
        event="savePass"
      />
    </div>
   

  </div>
</template>
<script>
  import {mapActions} from "vuex";
  import PasswordForm from "src/components/UIComponents/Forms/PasswordForm.vue";

  export default {
    components: {
      PasswordForm
    },
    /**
     * Chart data used to render stats, charts. Should be replaced with server data
     */
   
    data() {
      return {
        data: {},
      };
    },
    created() {
      this.$on("savePass", () => {
        if (this.data.password != "" && this.data.oldPassword != "" && this.data.confirmPass != "") {
            if (this.data.password == this.data.confirmPass) {
          this.updatePassword(this.data)
            .then(() => {
              this.$notify({
                group: "foo",
                title: "Criação.",
                text: "Senha alterada com sucesso!",
                position: "top center",
                type: "success"
              });
              this.data = {};
              this.logout()
            })
            .catch(res => {
              console.log(res);
            });
            }else{
              alert("Confirme sua nova senha.")
            }
        } else {
          alert("Campos não preenchidos")
        }
      });
    },

    mounted() {
    },
    methods: {
      ...mapActions(["updatePassword", "Logout"]),

      logout() {
        this.Logout()
        location.reload(true)
      }

    }
  };
</script>
<style lang="scss" scoped>

</style>