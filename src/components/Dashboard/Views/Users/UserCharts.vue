<template>
    <!--Charts-->
    <div class="row">

        <div class="row"
             
        >
        <div class="col-md-6 col-xs-12" v-if="userGraph.general.data">
            <div class="col-md-12 col-xs-12">
                <chart-card
                        :chart-data="userGraph.general.dataPercent"
                        chart-type="Pie"
                >
                    <h4 class="title" slot="title">Estátistica de usuários.</h4>
                    <span slot="subTitle"> Medição em relação ao plano.</span>
                    <span slot="footer">Total Usuários: {{userGraph.general.data.total}}</span>
                            <div slot="legend">
                    <i class="fa fa-circle " v-bind:style="{ color: preferencesChart.colors[0] }"></i>
                    Usuários Free - {{userGraph.general.dataPercent.series[0]}}%
                    <br>
                    <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[1] }"></i>
                    Usuários Pro-Mensal - {{userGraph.general.dataPercent.series[1]}}%
                    <br>
                    <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[2]}"></i>
                    Usuários Pro-Anual - {{userGraph.general.dataPercent.series[2]}}%
                    <br>
                </div>
                </chart-card>
            </div>
            <div class="col-md-12 col-xs-12">
                <stats-card>
                    <div class="numbers" slot="content">
                        <div class="title">Número de usuários cadastrados</div>
                        <div class="value"> {{userGraph.general.data.total}} usuários</div>
                    </div>
                </stats-card>
            </div>
            <div class="col-md-12 col-xs-12">
                <stats-card>
                    <div class="numbers" slot="content">
                        <div class="title">Número de usuários FREE</div>
                        <div class="value"> {{userGraph.general.data.free}} usuários</div>
                    </div>
                </stats-card>
            </div>
            <div class="col-md-12 col-xs-12">
                <stats-card>
                    <div class="numbers" slot="content">
                        <div class="title">Número de usuários ProMensal</div>
                        <div class="value"> {{userGraph.general.data.proMonth}} usuários</div>
                    </div>
                </stats-card>
            </div>
            <div class="col-md-12 col-xs-12">
                <stats-card>
                    <div class="numbers" slot="content">
                        <div class="title">Número de usuários ProAnual</div>
                        <div class="value"> {{userGraph.general.data.proYear}} usuários</div>
                    </div>
                </stats-card>
            </div>
        </div>

               <div class="col-md-6 col-xs-12"  v-if="userGraph.generalDetail.data">
        <chart-card
          v-if="userGraph.generalDetail.data"
          :chart-data="userGraph.generalDetail.dataPercent"
          chart-type="Pie"
        >
          <h4 class="title" slot="title">Estátistica de usuários.</h4>
          <span slot="subTitle"> Medição em relação ao plano.</span>
          <span slot="footer">Total Usuários: {{userGraph.generalDetail.data.total}}</span>
           <div slot="legend">
            <i class="fa fa-circle " v-bind:style="{ color: preferencesChart.colors[0] }"></i>
            Usuários Free - {{userGraph.generalDetail.dataPercent.series[0]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[1] }"></i>
            Usuários Free Consumido - {{userGraph.generalDetail.dataPercent.series[1]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[2]}"></i>
            Usuários Ex Pro Anual Consumidor - {{userGraph.generalDetail.dataPercent.series[2]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[3]}"></i>
            Usuários Ex Pro Mensal - {{userGraph.generalDetail.dataPercent.series[3]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[4]}"></i>
            UsuáriosEx Pro Mensal Consumidor - {{userGraph.generalDetail.dataPercent.series[4]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[5]}"></i>
            Usuários Ex Pro Mensal Consumidor - {{userGraph.generalDetail.dataPercent.series[5]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[6]}"></i>
            Usuários Pro Anual - {{userGraph.generalDetail.dataPercent.series[6]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[7]}"></i>
            Usuários Pro Anual Consumidor - {{userGraph.generalDetail.dataPercent.series[7]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[8]}"></i>
            Usuários Pro Anual Inativo - {{userGraph.generalDetail.dataPercent.series[8]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[9]}"></i>
            Usuários Pro Anual Inativo Consumidor - {{userGraph.generalDetail.dataPercent.series[9]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[10]}"></i>
            Usuários Pro Mensal - {{userGraph.generalDetail.dataPercent.series[10]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[11]}"></i>
            Usuários Pro Mensal Consumidor - {{userGraph.generalDetail.dataPercent.series[11]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[12]}"></i>
            Usuários Pro Mensal Inativo - {{userGraph.generalDetail.dataPercent.series[12]}}%
            <br>
            <i class="fa fa-circle" v-bind:style="{ color: preferencesChart.colors[13]}"></i>
            Usuários Pro Mensal Inativo Consumidor - {{userGraph.generalDetail.dataPercent.series[13]}}%
            <br>
          </div>
        </chart-card>
      </div>
        </div>
        <!--<div class="col-xs-12"
             v-if="userGraph.year.data"
        >
            <chart-card
                    :chart-data="userGraph.year.data"
                    :chart-options="activityChart.options"
                    chart-type="Bar">
                <h4 class="title" slot="title">Crescimento dos Planos - {{userGraph.year.yearSelected}}</h4>
                <span slot="subTitle"> Crescimento dos usuários entre os planos.</span>
                <div slot="legend">
                    <i class="fa fa-circle" v-bind:style="{ color: activityChart.colors[0]}"></i> Usuários Total
                    <i class="fa fa-circle" v-bind:style="{ color: activityChart.colors[1]}"></i> Usuários Free
                    <i class="fa fa-circle" v-bind:style="{ color: activityChart.colors[2]}"></i> Usuários Pro-Mensal
                    <i class="fa fa-circle" v-bind:style="{ color: activityChart.colors[3]}"></i> Usuários Pro-Anual
                </div>
            </chart-card>
        </div>-->

    </div>
</template>
<script>
    import ChartCard from "components/UIComponents/Cards/ChartCard.vue";
    import StatsCard from "components/UIComponents/Cards/StatsCard.vue";
    import {mapActions, mapState} from "vuex";

    export default {
        components: {
            StatsCard,
            ChartCard
        },
        computed: {
            ...mapState({
                userGraph: ({graph}) => graph.user,
                userGraphDetail: ({graph}) => graph.userDetail,

            })
        },
        methods: {
            ...mapActions([
                "getGraphUserGeneral",
                "getGraphUserGeneralDetail",
                "getGraphUserYear",
            ]),
        },
        data() {
            return {
                activityChart: {
                    data: {

                        "labels": [
                            "Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
                        ],
                        "series": [
                            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                            [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                        ]
                    },
                    options: {
                        seriesBarDistance: 15,
                        axisX: {
                            showGrid: false
                        },
                        height: "245px",
                    },
                    colors: ["#808080", "#6cb3c7", "#dab901", "#69DA47"]

                },
                preferencesChart: {
                    data: {
                        labels: ["62%", "32%", "6%"],
                        series: [62, 32, 6]
                    },
                    options: {},
                    colors: ["#808080", "#6cb3c7", "#dab901", "#bf9bd9", "#e86863", "#15c90c", "#84057c", "#52c8b2", "#f3d180", "#7ceddc", "#e43a30", "#6e65d8", "#d51125", "#248174"]

                },
                /*qntUserData: {
                    proYear: 0,
                    proMonth: 0,
                    free: 0,
                    total: 0
                }*/
            };
        },
        mounted() {
            this.getGraphUserGeneral();
            this.getGraphUserYear();
        }
    };
</script>
<style lang="scss" scoped>

</style>