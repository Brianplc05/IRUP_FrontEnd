<template>
  <div id="q-app" style="position: relative; z-index: 1">
    <div style="height: 100%; width: 100%" class="q-pa-lg">
      <div
        class="row items-center justify-between q-mb-md bg-white q-pa-sm rounded-borders shadow-1"
        style="border-radius: 10px"
      >
        <div>
          <div class="text-primary text-weight-bold" style="font-size: 30px">
            DASHBOARD
          </div>
          <div style="font-size: 18px; color: #333333">
            Incident Report Details
          </div>
        </div>

        <div class="row items-center q-gutter-sm">
          <q-input
            v-model="searchContent"
            label="Search "
            dense
            outlined
            rounded
          >
            <template v-slot:append>
              <q-icon name="search" color="info" />
            </template>
          </q-input>
        </div>
      </div>

      <div style="display: flex; gap: 16px; background: #fff; padding: 16px; border-radius: 10px; border: 2px solid #e0e0e0;">
        <!-- Left Column -->
        <div style="flex: 2; border-radius: 10px; border: 2px solid #e0e0e0; padding: 8px;">
          <div style="text-align: center; font-weight: bold; font-size: 1.25rem; color: #1976d2; margin-bottom: 10px;">
            REPORTABLE INCIDENT
          </div>

          <BarGraph :options="chartOptions" :series="series"/>
        </div>

        <!-- Right Column -->
        <div style="flex: 1; border-radius: 10px; border: 2px solid #e0e0e0; padding: 8px;">
          <q-btn-dropdown
            color="primary"
            label="REPORTABLE INCIDENT"
            class="full-width text-h7"
          >
            <q-list>
              <q-item
                v-for="item in disCountRep"
                :key="item.subjectCode"
                clickable
                v-close-popup
                @click="getCountParticular(item.subjectCode)"
              >
                <q-item-section>
                  {{ item.subjectName }}
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>

          <div style="text-align: center; font-weight: bold; font-size: 1.1rem; color: #1976d2; text-transform: uppercase; margin: 10px 0;">
            {{ disCountPar?.[0]?.subjectName || 'PARTICULAR INCIDENT' }}
          </div>

          <PieGraph :data="disCountPar"/>
        </div>
      </div>

      <div style="display: flex; gap: 16px; background: #fff; padding: 16px; border-radius: 10px; border: 2px solid #e0e0e0; flex-wrap: wrap;" class="q-mt-md">
        <!-- First Chart -->
        <div style="flex: 1; min-width: 300px; border-radius: 10px; border: 2px solid #e0e0e0; padding: 8px;">
          <LineGraph
            :options="chartOptionsTAT"
            :series="seriesRepTAT"
            :height="400"
          />
        </div>

        <!-- Second Chart -->
        <div style="flex: 1; min-width: 300px; border-radius: 10px; border: 2px solid #e0e0e0; padding: 8px;">
          <LineGraph
            :options="chartOptionRCSUBTaT"
            :series="seriesRepRCSUBTaT"
            :height="400"
          />
        </div>

        <!-- Third Chart -->
        <div style="flex: 1; min-width: 300px; border-radius: 10px; border: 2px solid #e0e0e0; padding: 8px;">
          <LineGraph
            :options="chartOptionAveRC"
            :series="seriesAveRC"
            :height="400"
          />
        </div>
      </div>

      <q-card-section
        class="row q-mb-sm bg-white q-pa-md rounded-borders shadow-1 q-mt-md"
        style="border-radius: 10px"
      >
        <div
          v-if="loading"
          class="fixed-full flex flex-center column q-gutter-md"
          style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999"
        >
          <q-spinner-ball size="150px" color="primary" />
          <div class="text-subtitle1 text-primary">Please wait...</div>
        </div>

        <q-card-section class="bg-white column fit full-width">
          <q-table
            v-show="showTable"
            :rows="filteredDisAll"
            :columns="disColumns"
            row-key="IRNo"
            :pagination="{ rowsPerPage: 8 }"
            :loading="loading"
          >
            <template v-slot:body-cell-subject="props">
              <q-td :props="props" style="width: 20%">
                <span
                  v-if="!props.row.subjectSpecificExam"
                  class="text-uppercase text-bold text-center"
                >
                  {{ props.row.subjectName }}
                </span>
                <span
                  v-if="props.row.subjectSpecificExam"
                  class="text-uppercase text-bold text-center"
                >
                  {{ props.row.subjectName }} -
                  {{ props.row.subjectSpecificExam }}
                </span>
              </q-td>
            </template>
          </q-table>
        </q-card-section>
      </q-card-section>
    </div>
  </div>
  <img
    src="../assets/OMBRE-GRAY.jpg"
    style="
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
    "
  />
</template>

<script>
import PieGraph from "src/components/Charts/PieGraph.vue";
// import RepGraph from "src/components/Charts/RepPieGraph.vue";
import BarGraph from "src/components/Charts/BarGraph.vue";
import LineGraph from "src/components/Charts/LineGraph.vue";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      loading: true,
      showTable: false,
      selectedStatus: null,
      searchContent: "",
      disAllDash: [],
      disColumns: [
        { name: "IRNo", label: "IRNUMBER", align: "left", field: "iRNo" },
        {
          name: "departmentNumber",
          label: "INCIDENT RESPONDER (DEPARTMENT)",
          align: "left",
          field: "department_Description",
        },
        {
          name: "subject",
          label: "SUBJECT OF THE INCIDENT",
          align: "left",
          field: "subjectName",
        },
      ],
      disCountRep: [],
      barLoading: false,
      selectedSubject: null,

      disCountPar: [],
      disCountRepTaT: [],
      disRCATaT: [],
      disActionTaT: [],
      disAveRCA: [],
      disAveAction: []
    };
  },

  computed: {
    ...mapGetters({
      getDash: "ApplyStore/getDash",
      getCountRep: "ApplyStore/getCountRep",
      getCountPar: "ApplyStore/getCountPar",
      getCountRepTaT: "ApplyStore/getCountRepTaT",
      getCountRCATaT: "ApplyStore/getCountRCATaT",
      getCountActionTaT: "ApplyStore/getCountActionTaT",
      getCountAveRCA: "ApplyStore/getCountAveRCA",
      getCountAveAction: "ApplyStore/getCountAveAction",
    }),

    filteredDisAll() {
      const { disAllDash, searchContent } = this;
      let filteredData = [...disAllDash];
      if (searchContent && typeof searchContent === "string") {
        const query = searchContent.toLowerCase();
        filteredData = filteredData.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }
      return filteredData;
    },

    chartOptions() {
      if (!this.disCountRep.length) return {}

      return {
        chart: {
          id: "incident-report-column",
          type: "bar",
          toolbar: { show: false },
          animations: {
            enabled: false // 🔥 para iwas lag
          }
        },

        plotOptions: {
          bar: {
            horizontal: false, // COLUMN MODE
            columnWidth: "50%",
            borderRadius: 6,
            dataLabels: {
              position: "top"
            }
          }
        },

        dataLabels: {
          enabled: true,
          offsetY: -5,
          style: {
            fontSize: "12px",
            colors: ["#333"]
          },
          formatter: val => val
        },

        xaxis: {
          categories: this.disCountRep.map(item => item.subjectName),
          title: {
            text: "Incident Category"
          },
          labels: {
            rotate: -55,
            trim: true,
            hideOverlappingLabels: true,
            style: {
              fontSize: "12px"
            }
          }
        },

        yaxis: {
          title: {
            text: "Total Reports"
          },
          min: 0,
          forceNiceScale: true,
          labels: {
            formatter: val => Math.floor(val)
          }
        },

        tooltip: {
          y: {
            formatter: val => `${val} report(s)`
          }
        },

        colors: ["#1976D2"],

        grid: {
          borderColor: "#f1f1f1",
          strokeDashArray: 4,
          padding: {
            left: 10,
            right: 10,
            bottom: 10
          }
        },

        responsive: [
          {
            breakpoint: 768,
            options: {
              plotOptions: {
                bar: {
                  columnWidth: "65%"
                }
              },
              xaxis: {
                labels: {
                  rotate: -90
                }
              },
              dataLabels: {
                style: {
                  fontSize: "10px"
                }
              }
            }
          }
        ]
      }
    },

    series() {
      if (!this.disCountRep.length) return []

      return [
        {
          name: "Total Reports",
          data: this.disCountRep.map(item => item.totalCount)
        }
      ]
    },

    months() {
      return [
        "January","February","March","April","May","June",
        "July","August","September","October","November","December"
      ];
    },

    chartOptionsTAT() {
      if (!this.disCountRepTaT.length) return {};

      return {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },

        dataLabels: {
          enabled: false,
        },

        stroke: {
          curve: "straight",
        },

        title: {
          text: "Reporting TAT by Month",
          align: "left",
        },

        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5,
          },
        },

        xaxis: {
          categories: this.months
        },

        yaxis: {
          title: {
            text: "Days",
          },
        },
      };
    },

    seriesRepTAT() {
      if (!this.disCountRepTaT.length) return [];

      return [
        {
          name: "Avg TAT (Days)",
          data: this.disCountRepTaT.map((item) => item.avgTAT_Days),
        },
      ];
    },

    chartOptionRCSUBTaT() {
      if (!this.disRCATaT.length && !this.disActionTaT.length) return {};

      return {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },

        dataLabels: {
          enabled: false
        },

        stroke: {
          curve: "straight",
          width: 3
        },

        colors: ["#1976D2", "#ffc412"],

        title: {
          text: "RCA / Corrective Action TAT by Month",
          align: "left"
        },

        legend: {
          position: "top"
        },

        markers: {
          size: 5
        },

        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5
          }
        },

        xaxis: {
          categories: this.months
        },

        yaxis: {
          title: {
            text: "Days"
          }
        }
      };
    },

    seriesRepRCSUBTaT() {
      if (!this.disRCATaT.length && !this.disActionTaT.length) return [];

      return [
        {
          name: "RCA TAT",
          data: this.disRCATaT.map(item => item.avg_TAT_Days)
        },
        {
          name: "Corrective Action TAT",
          data: this.disActionTaT.map(item => item.avg_TAT_Days)
        }
      ];
    },

    chartOptionAveRC() {
      if (!this.disAveRCA.length && !this.disAveAction.length) return {};

      return {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },

        dataLabels: {
          enabled: false
        },

        stroke: {
          curve: "straight",
          width: 3
        },

        colors: ["#1976D2", "#ffc412"],

        title: {
          text: "Incident Report Resolution TAT",
          align: "left"
        },

        legend: {
          position: "top"
        },

        markers: {
          size: 5
        },

        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"],
            opacity: 0.5
          }
        },

        xaxis: {
          categories: this.months
        },

        yaxis: {
          title: {
            text: "Days"
          }
        }
      };
    },

    seriesAveRC() {
      if (!this.disAveRCA.length && !this.disAveAction.length) return {};

      return [
        {
          name: "RCA Resolution  TAT",
          data: this.disAveRCA.map(item => item.averageImplementationDays)
        },
        {
          name: "Corrective Action Resolution TAT",
          data: this.disAveAction.map(item => item.averageImplementationDays)
        }
      ];
    },
  },

  components: {PieGraph, LineGraph, BarGraph},

  mounted() {
    setTimeout(() => {
      this.showTable = true;
      this.disAllDash;
      this.loading = false;
    }, 2000); // Simulating 2 seconds of loading time
  },

  created() {
    this.getDashboards();
    this.getCountReportable();
    this.getCountReporttat();
    this.getRCATaT();
    this.getACTIONTaT();
    this.getAveRCA();
    this.getAveACTION();
  },

  methods: {
    async getDashboards() {
      try {
        await this.$store.dispatch("ApplyStore/disDashboard");
        this.disAllDash = this.getDash;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    search() {},

    async selectStatus(option) {
      this.selectedStatus = option;
    },

    async getCountReportable(){
      try {
        await this.$store.dispatch("ApplyStore/displayCountReport");
        this.disCountRep = this.getCountRep;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getCountParticular(code){
      try{
        const data = {
          SubjectCode: code
        }
        const response = await this.$store.dispatch("ApplyStore/displayCountParticular",data);
        this.disCountPar = this.getCountPar;
      } catch (error) {
          console.error("Error inserting data:", error);
      }
    },

    async getCountReporttat(){
      try {
        await this.$store.dispatch("ApplyStore/displayCountReportTAT");
        this.disCountRepTaT = this.getCountRepTaT;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getRCATaT(){
      try {
        await this.$store.dispatch("ApplyStore/displayCountRCATAT");
        this.disRCATaT = this.getCountRCATaT;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getACTIONTaT(){
      try {
        await this.$store.dispatch("ApplyStore/displayCountACTIONTAT");
        this.disActionTaT = this.getCountActionTaT;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getAveRCA(){
      try {
        await this.$store.dispatch("ApplyStore/displayAverageRCA");
        this.disAveRCA = this.getCountAveRCA;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getAveACTION(){
      try {
        await this.$store.dispatch("ApplyStore/displayAverageAction");
        this.disAveAction = this.getCountAveAction;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    }
  },
};
</script>

<style>
/* ///////////////////////////////////////QAHEADER////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.my-card {
  border: 2px solid #f1f1f1;
  border-radius: 20px;
  background-color: #fff;
}

/* .filtertab {
  background-color: #0f4d91;
  font-weight: bold;
  border: 0.1em solid #f3f4f7;
  box-shadow: 0 4px 8px rgba(243, 238, 238, 0.1);
  font-style: Arial Black;
} */
/* .IRQHText {
  font-weight: bold;
  font-style: roboto;
  font-family: Arial Black;
  display: flex;
  color: #ffc619;
  font-size: 35px;
  justify-content: center;
} */

/* ///////////////////////////////////////TABLE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.table-with-border {
  border-bottom: 2em solid hsl(220, 22%, 81%);
  border-collapse: collapse;
  margin-top: 25px;
}
.q-table-container {
  border-radius: 5px;
  overflow: hidden;
}
.q-table td,
.q-table th {
  padding: 8px;
  border: 0.5px solid #ccc;
  text-align: center;
}
.q-table th {
  background-color: #0f4d91;
  color: #fff;
}
.q-table tbody tr:nth-child(odd) {
  background-color: #f4f4f4;
  padding: 8px;
}
.q-table button {
  height: 30px; /* Set your desired height */
  width: 80px; /* Set your desired width */
  border-radius: 5px;
  margin: 0;
  padding: 0;
}
</style>
