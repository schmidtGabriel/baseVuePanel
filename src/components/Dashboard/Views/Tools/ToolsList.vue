<template>
  <div>

 <div class="row"> 
       
   
           <div
          class="col-md-3 col-xs-6"
          v-for="index in this.$sidebar"
        >
             <stats-card>
            <div
              class="numbers"
              slot="content"
            >
              <div class="value" >
                <div v-bind:style="{ backgroundColor: index.color}" style="padding: 10px 0; border-radius: 100px;color: white">
                    <div class="title" text-center> {{index.description}} </div>

                </div>
               
              </div>
            </div>
          </stats-card>
        </div>
 </div>
  </div>
</template>
<script>
import StatsCard from "components/UIComponents/Cards/StatsCard.vue";
import formConfirmButton from "src/components/UIComponents/Inputs/formConfirmButton.vue";
import { mapActions, mapGetters, mapState } from "vuex";
import Notifications from "vue-notification";
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";  
import moment from 'moment';


Vue.use(Notifications);
Vue.use(Viewer);
 

export default {
  components: {
    StatsCard,
    formConfirmButton,
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
    props: {
      
    },
  computed: {
    ...mapState({
    })
  },
  watch: {
    $route: "initData"
  },
  methods: {
    ...mapActions(["updateSettings", "getMe"]),
    ...mapGetters({
      sidebarFlag: "sidebarFlag"
    }),
    initData() {
     // this.data = this.$route.params.id;
      
        
    },

    unlock() {
      if (this.sidebarFlag() === "ADMIN") {
        this.localReadonly = !this.localReadonly;
      } else {
        this.localReadonly = true;
      }
    },

  
  },

  data() {
    return {
      localReadonly: false,
      data: null,
      readonly: true,
      config: {
        "priceEstablishment": 0,
        "priceProvider": 0,
        "priceSpotlight": 0,
        "formattedEstablishment": "R$ 0,00",
        "formattedProvider": "R$ 0,00",
        "formattedSpotlight": "R$ 0,00",
        "isPaymentTicket": false,
        "isPaymentCredit": true,
        "isPaymentDebit": false
      }
    };
  },

  created() {
    this.initData();
    this.localReadonly = this.readonly;

    // this.getMe().then(res => {
    //   if(res.user != null){
    //   this.config = res.user.config
    //   }
    // });

    this.$on("save", () =>  {
      
      this.updateSettings(this.config)
        .then(res => {
          this.$notify({
            group: "foo",
            title: "Sucesso",
            text: "Configurações salva com sucesso!",
            position: "top center",
            type: "success"
          });
          this.localReadonly = true;

        })
        .catch(res => {
           this.$notify({
            group: "foo",
            title: "Error",
            text: "Erro na hora de salvar",
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