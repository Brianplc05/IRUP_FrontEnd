<template>
  <div class="q-pa-md" style="width: 100%; height: 400px">
    <apexchart
      ref="chart"
      type="pie"
      height="100%"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "PieGraph",

  components: {
    apexchart: VueApexCharts
  },

  props: {
    data: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    series() {
      if (!this.data || this.data.length === 0) {
        return [1]; // placeholder
      }
      return this.data.map(i => i.totalCount || 0);
    },

    chartOptions() {
      return {
        chart: {
          type: "pie",
          redrawOnParentResize: true,
          redrawOnWindowResize: true
        },

        labels: this.data && this.data.length
          ? this.data.map(i => i.subjectName)
          : ["No Data Yet"],

        legend: {
          position: "bottom",
          fontSize: "13px",
          itemMargin: {
            vertical: 6
          },
          formatter: (seriesName, opts) => {
            const value = opts.w.globals.series[opts.seriesIndex];
            return `${seriesName} - ${value}`;
          }
        },

        plotOptions: {
          pie: {
            customScale: 1.3, // 🔥 palaki pie
            offsetX: 0,
            offsetY: 0
          }
        },

        colors: [
          "#1800ad", "#cf1018", "#ffd600", "#00b44b",
          "#ff0057", "#ff9100", "#00ffbf", "#beff00",
          "#5c32af", "#ff00c7", "#07d9ff", "#000000",
          "#582308", "#49ada4", "#c51162", "#00B0FF",
          "#1B5E20", "#c98d26", "#fd9ef8", "#15392f",
          "#ff0000", "#f2ff00", "#2bff00", "#00ffff",
          "#a88fff", "#ff7a00", "#60002b", "#ffbf00"
        ],

        dataLabels: {
          enabled: true,
          style: {
            colors: ["#fff"]
          },
          formatter: (val) => `${val.toFixed(1)}%`
        },

        stroke: {
          colors: ["#fff"],
          width: 2
        },

        tooltip: {
          y: {
            formatter: val => `${val}`
          }
        },

        responsive: [
          {
            breakpoint: 1024,
            options: {
              legend: {
                position: "bottom"
              },
              plotOptions: {
                pie: {
                  customScale: 1.2
                }
              }
            }
          },
          {
            breakpoint: 768,
            options: {
              legend: {
                position: "bottom",
                fontSize: "12px"
              },
              plotOptions: {
                pie: {
                  customScale: 1.1
                }
              }
            }
          }
        ]
      };
    }
  },

  mounted() {
    this.fixChartSize();
  },

  methods: {
    fixChartSize() {
      this.$nextTick(() => {
        setTimeout(() => {
          window.dispatchEvent(new Event("resize"));

          if (this.$refs.chart) {
            this.$refs.chart.updateOptions({}, false, true);
          }
        }, 300);
      });
    }
  }
};
</script>
