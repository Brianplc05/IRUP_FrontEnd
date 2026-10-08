<template>
  <div class="stacked-graph">
    <apexchart
      type="bar"
      height="350"
      width="100%"
      :options="options"
      :series="series"
      class="q-mt-xs q-ma-sm"
    />
  </div>
</template>

<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'StackedGraph',

  components: {
    apexchart: VueApexCharts,
  },

  props: {
    options: {
      type: Object,
      default: () => ({}),
    },

    series: {
      type: Array,
      default: () => [],
    },
  },
}
</script>

<style scoped>
.stacked-graph {
  width: 100%;
  min-width: 0;
}
</style>
