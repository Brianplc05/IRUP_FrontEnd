<template>
  <div class="chart-wrapper">
    <apexchart
      v-if="Array.isArray(series) && series.length"
      :type="type"
      :height="height"
      :options="options"
      :series="series"
    />

    <div
      v-else
      class="flex flex-center"
      :style="{ height: height + 'px' }"
    >
      <q-spinner-ball size="60px" color="primary" />
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts"

export default {
  name: "BarGraph",

  components: {
    apexchart: VueApexCharts
  },

  props: {
    type: {
      type: String,
      default: "bar"
    },
    height: {
      type: [String, Number],
      default: 350
    },
    options: {
      type: Object,
      required: true
    },
    series: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    widthStyle () {
      return typeof this.width === "number"
        ? this.width + "px"
        : this.width
    }
  }
}
</script>

<style scoped>
.chart-wrapper {
  width: 100%; /* 🔥 fill the column */
}
</style>
