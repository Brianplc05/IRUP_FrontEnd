<template>
  <div id="q-app" style="position: relative; z-index: 1">
    <div style="height: 100%; width: 100%" class="q-pa-lg">

      <!-- HEADER -->
      <div
        class="row items-center justify-between q-mb-md bg-white q-pa-sm rounded-borders shadow-1"
        style="border-radius: 10px"
      >
        <div>
          <div class="text-primary text-weight-bold" style="font-size: 30px">
            INCIDENT REPORT DETAILS
          </div>
          <div style="font-size: 18px; color: #333333">
            Comprehensive information and documentation regarding the reported incident.
          </div>
        </div>
      </div>

      <!-- MAIN CARD -->
      <q-card-section
        class="row q-mb-sm bg-white q-pa-md rounded-borders shadow-1"
        style="border-radius: 10px"
      >
        <q-card-section class="column fit full-width">

          <!-- FILTERS -->
          <div class="row items-center justify-between q-mb-md">
            <div>

              <!-- FILTER AREA -->
              <q-btn-dropdown
                rounded
                label="FILTER AREA"
                style="width: 25ch"
                class="bg-info text-white q-mr-sm"
              >
                <q-list>
                  <q-item
                    v-for="option in disAllDiv"
                    :key="option.divisionCode"
                    clickable
                    @click="selectArea(option)"
                  >
                    <q-item-section>{{ option.division }}</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

              <!-- FILTER STATUS -->
              <q-btn-dropdown
                rounded
                label="FILTER STATUS"
                style="width: 25ch"
                class="bg-info text-white"
              >
                <q-list>
                  <q-item
                    v-for="option in qaStats"
                    :key="option.value"
                    clickable
                    @click="selectStatus(option)"
                  >
                    <q-item-section>{{ option.label }}</q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>

            </div>

            <!-- SEARCH -->
            <q-input
              v-model="searchQuery"
              label="SEARCH"
              dense
              outlined
              rounded
            >
              <template v-slot:append>
                <q-icon name="search" color="info" />
              </template>
            </q-input>
          </div>

          <!-- TABLE CARD -->
          <q-card-section
            class="bg-white q-pa-sm rounded-borders shadow-1 q-mb-md"
            style="border-radius: 10px"
          >

            <div class="q-pb-md q-pt-md q-pl-sm">
              <div class="text-weight-bold" style="font-size: 18px;">
                Total Incident Report : <q-badge class="q-pa-sm text-bold" outline color="primary" style="font-size: 18px;"> {{ totalReport }} </q-badge>
              </div>
            </div>

            <div class="q-table-scroll-wrapper">
              <!-- LOADING -->
              <div
                v-if="loading"
                class="fixed-full flex flex-center column q-gutter-md"
                style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999"
              >
                <q-spinner-ball size="150px" color="primary" />
                <div class="text-subtitle1 text-primary">Please wait...</div>
              </div>

              <AuditTables
                v-show="showTable"
                :items="filteredDisAll"
                :columns="disColumns"
                :rows-per-page-options="[10]"
                :loading="loading"
                flat
                bordered
                class="my-custom-scroll"
              />
            </div>

          </q-card-section>
        </q-card-section>
      </q-card-section>
    </div>
  </div>

  <!-- BACKGROUND -->
  <img
    src="../assets/OMBRE-GRAY.jpg"
    style="position: absolute; top:0; left:0; width:100%; height:100%; z-index:0;"
  />
</template>

<script>
import AuditTables from "../components/AuditTable.vue"
import { mapGetters } from "vuex";

export default {
  components: { AuditTables },

  data() {
    return {
      disAllDetails: [],
      disAllDiv: [],
      selectedArea: null,
      selectedStatus: null,
      searchQuery: "",
      loading: true,
      showTable: false,

      disColumns: [
        { name: "viewIR", label: "INCIDENT REPORT DETAILS", align: "left" },
        { name: "IRNo", label: "IR NUMBER", align: "left", field: "iRNo" },
        { name: "departmentNumber", label: "INCIDENT RESPONDER (DEPARTMENT)", align: "left", field: "department_Description" },
        { name: "subject", label: "SUBJECT OF THE INCIDENT", align: "left", field: "subjectName" },
        {
          name: "topic",
          label: "TOPIC",
          align: "left",
          field: "subjectTopic",
        },
        {
          name: "divisionCode",
          label: "AREA",
          align: "left",
          field: "divisionCode"
        }
      ],

      areaValue: [
        { label: "ACADEME", value: "ACD-01" },
        { label: "HOSPITAL", value: "HST-02" },
        { label: "ADMIN", value: "ADM-03" },
      ],

      qaStats: [
        { label: "OPEN", value: true },
        { label: "CLOSED", value: false },
      ],
    }
  },

  computed: {
    ...mapGetters({
      getForm: "ApplyStore/getForm",
      division: "ApplyStore/division",
      qaStats: "ApplyStore/getQaStats"
    }),

    filteredDisAll() {
      const { disAllDetails, selectedStatus,  selectedArea, searchQuery } = this;

      let filteredData = [...disAllDetails];

      if (selectedStatus && typeof selectedStatus === "object") {
        const { value: statusValue } = selectedStatus;
        filteredData = filteredData.filter(
          (item) => item.qAStatus === statusValue
        );
      }

      if (selectedArea && typeof selectedArea === "object") {
        const { divisionCode: areaValue } = selectedArea;
        filteredData = filteredData.filter( (item) => item.divisionCode === areaValue );
      }

      if (searchQuery && typeof searchQuery === "string") {
        const query = searchQuery.toLowerCase();
        filteredData = filteredData.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }

      return filteredData;
    },

    totalReport() {
      return this.filteredDisAll.length;
    }
  },

  mounted() {
    // 🔹 Initial delay (3 seconds)
    setTimeout(() => {
      this.showTable = true;
      this.disAllDetails;
      this.loading = false;
    }, 3000);

    // 🔹 Auto fetch every 60 seconds
    this.interval = setInterval(() => {
      this.getForm();
    }, 60000);
  },


  created() {
    this.getInc();
    this.getDivision();
  },

  methods: {
    async getInc() {
      try {
        await this.$store.dispatch("ApplyStore/disTab");
        this.disAllDetails = this.getForm;
      } catch (error) {
        console.error("Error loading incidents:", error);
      }
    },

    async getDivision() {
      try {
        await this.$store.dispatch("ApplyStore/disFilterDivision");
        this.disAllDiv = this.division;
      } catch (error) {
        console.error("Error loading division:", error);
      }
    },

    search() {},

    selectStatus(option) {
      this.selectedStatus = option;
    },

    selectArea(option) {
      this.selectedArea = option;
    },
  }
}
</script>

<style>
.q-table td,
.q-table th {
  padding: 8px;
  border: 0.5px solid #ccc;
  text-align: center;
  max-width: 300px; /* Set a maximum width for cells */
  word-wrap: break-word; /* Enable word wrapping */
  white-space: normal; /* Allow the text to wrap to the next line */
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

/* ///////////////////////////////////////HRIR///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.custom-item-section {
  border: 1px solid #ccc; /* Border style */
  border-radius: 1px; /* Border radius */
  padding: 5px; /* Optional padding */
}
.HRVDia {
  background-image: url("../assets/BGCORE.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f7fc;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}

.formseparatorYellow {
  background-color: #ffc619;
  height: 2px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.formseparatorBlue {
  background-color: #6b7c93;
  height: 2px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.formseparatorWhite {
  background-color: #fff;
  height: 2px;
  margin-top: 15px;
  margin-bottom: 15px;
}

.contentFormHR {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1100px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.HRFixDesign {
  width: 99.5%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}

.HRDes1 {
  font-size: 15px;
  border: 0.1em solid #ffffff;
}

.HRDes {
  font-size: 15px;
  border: 0.1em solid #ffffff;
}

.HRFileDes {
  padding: 8px;
  margin-top: 5px;
  font-size: 15px;
  border: 0.1em solid #003566;
  background-color: #e3f2fd;
}

</style>
