<template>
  <div class="card">
    <div class="header">
      <slot name="title"/>
      <p class="category">
        <slot name="subTitle"/>
      </p>
    </div>
    <div class="content">
      <div :id="chartId" class="ct-chart"></div>
      <div class="footer">
        <div class="chart-legend">
          <slot name="legend"/>
        </div>
        <hr>
        <div class="stats">
          <slot name="footer"/>
        </div>
        <div class="pull-right">
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: "chart-card",
  props: {
    footerText: {
      type: String,
      default: ""
    },
    headerTitle: {
      type: String,
      default: "Chart title"
    },
    chartType: {
      type: String,
      default: "Line" // Line | Pie | Bar
    },
    chartOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    responsiveOptions: {
      type: Array,
      default: () => {
        return [];
      }
    },
    chartData: {
      type: Object,
      default: () => {
        return {
          labels: [],
          series: []
        };
      }
    }
  },
  data() {
    return {
      chartId: "no-id",
      chart: null,
      $Chartist: null,

    };
  },
  watch: {
 chartData(newData) {
  this.chart.update(newData)
 }
  },
  methods: {
    /***
     * Initializes the chart by merging the chart options sent via props and the default chart options
     */
    initChart() {
      var chartIdQuery = `#${this.chartId}`
      setTimeout(() => {
          this.$Chartist[this.chartType](chartIdQuery, this.chartData, this.chartOptions)
        }, 2000)        
        if (this.chartType === 'Line') {
          this.animateLineChart()
        }
        if (this.chartType === 'Bar') {
          this.animateBarChart()
        }
    },
    /***
     * Assigns a random id to the chart
     */
    updateChartId() {
      let currentTime = new Date().getTime().toString();
      let randomInt = this.getRandomInt(0, currentTime);
      this.chartId = `div_${randomInt}`;
    },
    getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
     animateLineChart () {
        let seq = 0
        let durations = 500
        let delays = 80

        this.chart.on('draw', (data) => {

          if (data.type === 'line' || data.type === 'area') {
            data.element.animate({
              d: {
                begin: 600,
                dur: 700,
                from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                to: data.path.clone().stringify(),
                easing: this.$Chartist.Svg.Easing.easeOutQuint
              }
            })
          } else if (data.type === 'point') {
            seq++
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            })
          }
        })
        seq = 0
      },
      animateBarChart () {
        let seq = 0
        let durations = 500
        let delays = 80
        this.chart.on('draw', (data) => {
          if (data.type === 'bar') {
            seq++
            data.element.animate({
              opacity: {
                begin: seq * delays,
                dur: durations,
                from: 0,
                to: 1,
                easing: 'ease'
              }
            })
          }
        })
      }

  },
  mounted() {
    
   if (!this.id) {
        this.updateChartId()
      } else {
        this.chartId = this.id
      }
      this.$nextTick(this.initChart)
  }
};
</script>
<style lang="scss">
.ct-series-a
  {
    .ct-slice-pie {
      fill: #aa0002 !important;
    }
    .ct-bar {
      stroke: #aa0002 !important;
    }
    .ct-line {
      stroke: #aa0002 !important;
    } 
    .ct-point {
      stroke: #aa0002 !important;
    }
}

.ct-series-b {
    .ct-slice-pie {
      fill: #0063BA !important;
    }
    .ct-bar {
      stroke: #0063BA !important;
    }.ct-line {
      stroke: #0063BA !important;
    }
    .ct-point {
      stroke: #0063BA !important;
    }
}
 
.ct-series-c {
    .ct-slice-pie {
      fill: #dab901 !important;
    }
    .ct-bar {
      stroke: #dab901 !important;
    }
    .ct-line {
      stroke: #dab901 !important;
    }
    .ct-point {
      stroke: #dab901 !important;
    }
}
.ct-chart-pie{
      .ct-label {
          fill: rgba(255, 255, 255, 1);
          color: rgba(255, 255, 255, 1);
          font-size: 0.9em;
          line-height: 1;
      }
}
</style>
