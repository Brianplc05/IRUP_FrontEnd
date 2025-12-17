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

      <q-card-section
        class="row q-mb-sm bg-white q-pa-md rounded-borders shadow-1"
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
    };
  },

  computed: {
    ...mapGetters({ getDash: "ApplyStore/getDash" }),

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
  },

  mounted() {
    setTimeout(() => {
      this.showTable = true;
      this.disAllDash;
      this.loading = false;
    }, 2000); // Simulating 2 seconds of loading time
  },

  created() {
    this.getDashboards();
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
