<template>
  <div>
    <apexchart
      type="pie"
      height="350"
      :options="chartOptions"
      :series="series"
    />
  </div>
</template>

<script>
import VueApexCharts from "vue3-apexcharts"

export default {
  name: "PieGraph",

  components:{
    apexchart: VueApexCharts
  },

  props:{
    data:{
      type:Array,
      default:() => []
    }
  },

  computed:{
    series(){
      if(!this.data || this.data.length === 0){
        return [1]   // placeholder
      }

      return this.data.map(i => i.totalChildren || 0)
    },

    chartOptions(){
      return{
        chart:{
          type:"pie"
        },
        labels: this.data && this.data.length
          ? this.data.map(i => i.subjectSpecificExam)
          : ["No Data Yet"],
        legend:{
          position:"bottom"
        },
        colors: [
          "#5c32af", "#ff00c7", "#07d9ff", "#000000",
          "#1B5E20", "#c98d26", "#fd9ef8", "#15392f",
          "#ff0000", "#f2ff00", "#2bff00", "#00ffff",
          "#1800ad", "#cf1018", "#ffd600", "#00b44b",
          "#ff0057", "#ff9100", "#00ffbf", "#beff00",
          "#582308", "#49ada4", "#c51162", "#00B0FF",
          "#a88fff", "#ff7a00", "#60002b", "#ffbf00"
        ],
      }
    }
  }
}
</script>
