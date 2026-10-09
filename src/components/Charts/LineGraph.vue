<template>
  <div>
    <apexchart
      type="line"
      :height="height"
      :options="options"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "LineGraph",

  components: {
    apexchart: VueApexCharts,
  },

  props: {
    options: {
      type: Object,
      required: true,
    },

    series: {
      type: Array,
      required: true,
    },

    height: {
      type: Number,
      default: 350,
    },
  },
};
</script>
