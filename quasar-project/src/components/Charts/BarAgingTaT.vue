<template>
  <div class="aging-chart">
    <apexchart
      type="bar"
      height="350"
      :options="chartOptions"
      :series="chartSeries"
      class="q-mt-xs q-ma-sm"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'BarAgingTat',

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
    chartSeries() {
      return [
        {
          name: 'AGING TAT',
          data: this.data.map(item => {
            return item.agingTAT === ''
              ? 0
              : Number(item.agingTAT)
          })
        }
      ]
    },

    chartCategories() {
      return this.data.map(item => item.month)
    },

    chartColors() {
      return [
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560',
        '#775DD0',
        '#546E7A',
        '#26a69a',
        '#3F51B5',
        '#008FFB',
        '#00E396',
        '#FEB019',
        '#FF4560'
      ]
    },

    chartOptions() {
      return {
        chart: {
          height: 350,
          type: 'bar',
          toolbar: {
            show: true
          }
        },

        colors: this.chartColors,

        plotOptions: {
          bar: {
            columnWidth: '45%',
            distributed: true,
            borderRadius: 4
          }
        },

        dataLabels: {
          enabled: true,

          formatter: function (value) {
            return value > 0 ? value : ''
          }
        },

        legend: {
          show: false
        },

        yaxis: {
          title: {
            text: 'AGING TAT'
          },

          min: 0
        },

        xaxis: {
          categories: this.chartCategories,

          labels: {
            style: {
              colors: this.chartColors,
              fontSize: '12px',
              fontWeight: 600
            }
          },

          title: {
            text: 'MONTHS'
          },
        },

        tooltip: {
          y: {
            formatter: function (value) {
              return value > 0
                ? value + ' day' + (value > 1 ? 's' : '')
                : 'No data'
            }
          }
        },
      }
    }
  }
}
</script>

<style scoped>
.aging-chart {
  width: 100%;
  min-width: 0;
}

.closure-chart :deep(.apexcharts-xaxis-label) {
  font-weight: bold;
}
</style>
