<template>
  <div class="q-pa-md">
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
        }
      }
    }
  }
}
</script>
