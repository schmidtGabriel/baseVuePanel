<template>

  <div class="home ">
    <!--Stats cards-->
     <div class="row" v-if="dashboard"> 
       
   
           <div
          class="col-md-3 col-xs-6"
          v-for="index in dashboard.data.amount.first"
        >
             <stats-card>
            <div
              class="numbers"
              slot="content"
            >
              <div class="title" text-center>  {{index.description}}</div>
              <div
                class="value"
              >
                <div v-bind:style="{ backgroundColor: index.color}" style="padding: 10px 0; border-radius: 100px;color: white">
                  {{index.amount}}
                </div>
               
              </div>
            </div>
          </stats-card>
        </div>
         <div
          class="col-md-3 col-xs-6"
          v-for="index in dashboard.data.amount.second"
        >
             <stats-card>
            <div
              class="numbers"
              slot="content"
            >
              <div class="title" text-center>  {{index.description}}</div>
              <div
                class="value"
              >
                <div v-bind:style="{ backgroundColor: index.color}" style="padding: 10px 0; border-radius: 100px;color: white">
                  {{index.amount}}
                </div>
               
              </div>
            </div>
          </stats-card>
        </div>
          <div
          class="col-md-3 col-xs-6"
          v-for="index in dashboard.data.amount.third"
        >
             <stats-card>
            <div
              class="numbers"
              slot="content"
            >
              <div class="title" text-center>  {{index.description}}</div>
              <div
                class="value"
              >
                <div v-bind:style="{ backgroundColor: index.color}" style="padding: 10px 0; border-radius: 100px;color: white">
                  {{index.amount}}
                </div>
               
              </div>
            </div>
          </stats-card>
        </div>

         <div
          class="col-md-3 col-xs-6"
          v-for="index in dashboard.data.amount.fourth"
        >
             <stats-card>
            <div
              class="numbers"
              slot="content"
            >
              <div class="title" text-center>  {{index.description}}</div>
              <div
                class="value"
              >
                <div v-bind:style="{ backgroundColor: index.color}" style="padding: 10px 0; border-radius: 100px;color: white">
                  {{index.amount}}
                </div>
               
              </div>
            </div>
          </stats-card>
        </div>
         
           <div class="col-md-12 col-xs-12" 
              >
                <chart-card
                  v-if="this.Solds"
                  :chart-options="preferencesChart.options"
                  :chart-data="this.Solds"
                  chart-type="Line"
                >
                  <h4 class="title" slot="title">Demanda de Serviços </h4>
                  <span slot="subTitle"> Solicitações X Dias</span>
                  <div slot="legend">
                    <i class="fa fa-circle " v-bind:style="{ color: preferencesChart.colors[0] }"></i> Total de Solicitações
                    <i class="fa fa-circle " v-bind:style="{ color: preferencesChart.colors[1] }"></i> Agendamento Cancelado
                    <i class="fa fa-circle " v-bind:style="{ color: preferencesChart.colors[2] }"></i> Agendamento Confirmado

                  </div>
                </chart-card>
              </div>
      
<div class="col-md-6 col-xs-12" 
              >
          <chart-card
            v-if="this.AllUsers"
            :chart-data="this.AllUsers"
            chart-type="Pie"
          >
            <h4
              class="title"
              slot="title"
            >Consumo dos usuários</h4>
            <span slot="subTitle"> Serviços X Vendas </span>
           
            <div slot="legend"  v-if="FlagUsers == true">
              <i
                class="fa fa-circle "
                v-bind:style="{ color: preferencesChart.colors[0] }"
              ></i>
              {{this.AllUsers.labels[0]}} - {{this.AllUsers.series[0]}}
              <br>
              <i
                class="fa fa-circle"
                v-bind:style="{ color: preferencesChart.colors[1] }"
              ></i>
              {{this.AllUsers.labels[1]}} - {{this.AllUsers.series[1]}}
              <br>
            </div>
          </chart-card>
        </div>
           
 <div class="col-md-6">
      
          <div class="card">
          <component-table
            eventName="selectItem"
            :title="table.title"
            :sub-title="table.subTitle"
            :data="list || dashboard.data.specialty"
            :columns="table.columns"
            :headers="table.headers"
            :buttons="table.buttons"
          />
        
        </div>
      </div>
     
        </div> 
  </div>
</template>
<script>
  import StatsCard from "components/UIComponents/Cards/StatsCard.vue";
  import ChartCard from "components/UIComponents/Cards/ChartCard.vue";
  import ComponentTable from "components/UIComponents/Lists/ComponentTable.vue";

  import {mapActions, mapState, mapGetters} from "vuex";
  const headers = ["Modelo","Quantidade"];
  const tableColumns = [
    "description", "amount"];

  export default {
    components: {
      StatsCard,
      ChartCard,
      ComponentTable
    },
    created() {
    this.initData();
                  
    },
       props: {
      selected: {
        type: Object,
        default: () => {
          return null;
        }
      },
       list: {
        type: Array,
        default: () => {
          return null;
        }
      }
    },
    computed: {
      ...mapState({
        dashboard: ({dashboard}) => dashboard.selected

      }),
        ...mapGetters({
        sidebarFlag: 'sidebarFlag'
      }),
      
    },
   
    methods: {
     
      ...mapActions(["getDashboardList"]),
    
      goTo(page) {
        this.$router.push("/admin/" + page);
      },


    mountPieChart(dash){
      for(var i=0; i < dash.length; i++){
        var x = dash[i].description

      this.AllUsers.labels[i] = String(x).replace("Usuários", "");
      this.AllUsers.series[i] = parseInt(dash[i].amount)
      }
      this.FlagUsers = true;
     
     
    },
     mountLineChart(dash){
      this.Solds.labels = []
      this.Solds.series[0] = [];
      this.Solds.series[1] = [];
      this.Solds.series[2] = [];

      for(var i=0; i < dash.total.length; i++){
        this.Solds.labels.push(dash.total[i].day)
        this.Solds.series[0].push(parseInt(dash.total[i].amount)); //total

        var amountCanceled = 0; //Cancelado
        for(var j=0; j < dash.canceled.length; j++){
          if (dash.total[i].day == dash.canceled[j].day) {
            amountCanceled = parseInt(dash.canceled[j].amount);
          }
        }
        this.Solds.series[1].push(amountCanceled);

        var amountConfirmed= 0; //Confirmado
        for(var j=0; j < dash.confirmed.length; j++){
          if (dash.total[i].day == dash.confirmed[j].day) {
            amountConfirmed = parseInt(dash.confirmed[j].amount);
          }
        }
        this.Solds.series[2].push(amountConfirmed);
      }
      

    },



      initData() {
        this.getDashboardList().then(res => {
          this.mountPieChart(res.user);
          this.mountLineChart(res.daily);

          for(var i=0;i<res.amount.length;i++){
            if(res.amount[i].description.indexOf("Upgrade") > -1){
              this.Upgrades.push(res.amount[i])   
            }
            if(res.amount[i].description.indexOf("Agendamentos") > -1 || res.amount[i].description.indexOf("Cancelamentos") > -1){
              this.Agendamentos.push(res.amount[i])
            }
            if(res.amount[i].description.indexOf("Soliticações") > -1){
              this.Solicitacoes.push(res.amount[i])
            }
            if(res.amount[i].description.indexOf("Administradores") > -1 || res.amount[i].description.indexOf("Usuários") > -1){
              this.Users.push(res.amount[i])
            }
          }

        }).catch(res=> {
             return this.$notify({
                group: "foo",
                title: res.msg,
                text: res.info,
                position: "top center",
                type: "error"
              });
        })
      },

   

    },

    data() {
      return {
        Users: [],
        Solicitacoes: [],
        Agendamentos: [],
        Upgrades: [],
         table: {
          title: "Modelo de veículos em alta",
          subTitle: "Veículos mais demandados",
          headers: [...headers],
          columns: [...tableColumns],
        },
        AllUsers: {
          labels: [],
          series: [],
        },
        FlagUsers : null,
        Solds: {
          labels: [],
          series: []
        },
        QntUser : null,
        QntCostumer : null,
        preferencesChart: {
        data: {
            labels: ["62%", "32%", "6%"],
            series: [62, 32, 6]
          },
          options: {},
          colors: ["#aa0002", "#0063BA", "#dab901"],
          colorsLine: ["#0063BA", "#dab901", "#aa0002"],
		},
		
      }
    }
}
</script>
<style lang="scss">
  .home {
    
  }
</style>