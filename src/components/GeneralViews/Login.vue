<template>

  <div class="box-login">
 
    <div class="col-md-8 col-md-offset-2 image" style="" align-center>
      <img src="static/img/logo-login.png" alt="" style="display: block; margin-left: auto; margin-right: auto; margin-bottom: 20px; max-width: 30%; width: 50%; border-radius: 7px ">

    </div>
    <div class="col-md-4 col-md-offset-4 col-sm-12 col-xs-12" style="text-align: center">
      <div class="card" style="">
        <div class="content" v-if="!recuperar">

          <p class="text-center">Acesse sua conta</p>

          <form name="$ctrl.form">
            <fg-input
              icon="ti-email"
              label="E-mail"
              type="text"
              v-model="model.email"
            />

            <fg-input
              icon="ti-lock"
              label="Senha"
              type="password"
              v-model="model.password"
            />
          
            <div class="text-center">
              <btn-block
                label="ENTRAR"
                event="LoginAuth"
              />
            </div>
          </form>

          <p class="text-center margin-half-top">
            <a v-on:click="recuperarPass()" class="link"><i class="ti-reload"></i> Recuperar senha</a>
          </p>
       
       
        </div>
      <div class="content" v-if="recuperar">

          <p class="text-center">Recupere sua senha</p>

          <form name="$ctrl.form">
            <fg-input
              icon="ti-email"
              label="E-mail"
              type="text"
              v-model="model2.email"
            />

           
            <div class="text-center">
              <btn-block
                label="RECUPERAR"
                event="RecuperarAuth"
              />
            </div>
          </form>

       
        </div>
      </div>
    </div>
        

    <notifications group="foo" />
   
  </div>


</template>

<script>
  import {mapActions, mapState, mapGetters} from "vuex";
 import 'viewerjs/dist/viewer.css'
  import Viewer from 'v-viewer'
  import Vue from 'vue'


  export default {
    name: "login",
    methods: {
      ...mapActions(["authCheck", "isLogin", "authReset"]),

      recuperarPass(){
        if(!this.recuperar){
        this.recuperar = true;
        }else{
        this.recuperar = false;
        }
      }
    },
    created() {
      this.isLogin()
        .then(res => {
          this.$router.push("/admin");
        })
        .catch(res => {
        });

      this.$on("LoginAuth", () => {
         let er = /^[a-zA-Z0-9][a-zA-Z0-9\._-]+@([a-zA-Z0-9\._-]+\.)[a-zA-Z-0-9]{2}/;

        // this.model.email='pedrocosta@artmark.com.br'
        // this.model.password= '957210'

        if(this.model.email == ""){
          return  this.$notify({
              group: "foo",
              title: "Ops",
              text: "Preencha o e-mail.",
              position: "top center",
              type: "warn",
            });
        }

        if(this.model.password == ""){
          return  this.$notify({
              group: "foo",
              title: "Ops",
              text: "Preencha a senha.",
              position: "top center",
              type: "warn",
            });
        }


        if (!er.exec(this.model.email)) {
            return  this.$notify({
              group: "foo",
              title: "Ops",
              text: "E-mail inválido.",
              position: "top center",
              type: "warn",
            });
        }

        this.authCheck(this.model)
          .then(res => {
           
            this.$router.push("/admin");
             
          })
          .catch(res => {
           
            this.$notify({
              group: "foo",
              title: "Ops",
              text: res.msg,
              position: "top center",
              type: "error",
            });
           

          });
      });

        this.$on("RecuperarAuth", () => {
        this.authReset(this.model2)
          .then(res => {
             this.$notify({
              group: "foo",
              title: "Sucesso.",
              text: "Enviamos um email com a nova senha.",
              position: "top center",
              type: "success",
              duration: 6000,
            });
            this.recuperarPass()
          })
          .catch(res => {
           
            this.$notify({
              group: "foo",
              title: "Erro.",
              text: "Erro ao resetar senha",
              position: "top center",
              type: "error",
              duration: 6000,
            });
            // console.log(res.body.$error.msg)
            //alert(res.body.$error.msg);
            

          });
      });
    },
    data() {
      return {
        model: {
          email: "",
          password: ""
        },
         model2: {
          email: "",
        },
        recuperar : false,
      };
    }
  };
</script>

<style scoped lang="scss">
  .box-login {
    height: 700px;
    margin: 100px 50px;
  }
.link{
    color: #3EA0F9;
    cursor: pointer;
  }
  .image {
    max-height: 100%;
    max-width: 100%;
  }

  .content {
    border-radius: 7px;
    background-color: #eeeeee;
  }

  .login-box-container {
    max-width: 600px;
    max-height: 500px;
    width: 100%;
    margin: 70px auto;
    padding: 0px;

    .card {
      width: 100%;
      height: 100%;

      .content {
        width: 100%;
        height: 100%;
        padding: 30px;
      }
    }
  }

  .logo {
    text-align: center;
    display: block;
    max-width: 100%;
    height: auto;
    padding: 20px 20px 60px 20px;
  }

  img {
    max-width: 150px;
  }

  .login-panel {
    background-color: white;
  }

  .or span {
    background-color: white;
  }

  .logged-in-alert {
    margin: 100px 20px;
  }

  .logged-in-alert-text {
    line-height: 20px;
  }

  .login-color {
    background-color: #696969 !important;
  }
</style>
