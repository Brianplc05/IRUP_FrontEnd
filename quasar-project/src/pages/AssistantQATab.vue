<template>
  <div id="q-app" style="position: relative; z-index: 1">
    <div style="height: 100%; width: 100%" class="q-pa-lg">
      <div
        class="row items-center justify-between q-mb-md bg-white q-pa-sm rounded-borders shadow-1"
        style="border-radius: 10px"
      >
        <div>
          <div class="text-primary text-weight-bold" style="font-size: 30px">
            ASSISTANT QUALITY ASSURANCE (AQA) MODULE
          </div>
          <div style="font-size: 18px; color: #333333">
            Incident Report Details
          </div>
        </div>

        <div class="row items-center q-gutter-sm">
          <q-input
            v-model="searchContent"
            label="SEARCH "
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
        class="row bg-warning q-pa-md rounded-borders shadow-1"
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

        <q-card-section class="column fit full-width">
          <q-card-section
            class="bg-white q-pa-sm rounded-borders shadow-1"
            style="border-radius: 10px"
          >
            <AssistantQATable
              v-show="showTable"
              :rows="filteredDisAll"
              :columns="disColumns"
              row-key="IRNo"
              :loading="loading"
              :getAssistantQAs="getAssistantQAs"
              virtual-scroll
              hide-pagination
              :rows-per-page-options="[0]"
            />
          </q-card-section>
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
import AssistantQATab from "../components/AssistantQATable.vue";

export default {
  data() {
    return {
      loading: true,
      showTable: false,
      selectedStatus: null,
      searchContent: "",
      disAllAssistantQA: [],

      disColumns: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
        { name: "IRNo", label: "IR NUMBER", align: "left", field: "iRNo" },
        {
          name: "departmentNumber",
          label: "INCIDENT RESPONDER (DEPARTMENT)",
          align: "left",
          field: "department_Description",
        },
        {
          name: "division",
          label: "DIVISION",
          align: "left",
          field: "Division",
        },
      ],
    };
  },

  computed: {
    ...mapGetters({
      getAssistantQA: "ApplyStore/getAssistantQA",
      getGoogleUser: "ApplyStore/getGoogleUser",
      loggedInUser: "ApplyStore/getUser",
      getQA: "ApplyStore/getQA",
    }),

    filteredDisAll() {
      const { disAllAssistantQA, searchContent } = this;
      let filteredData = [...disAllAssistantQA];
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
      this.disAllAssistantQA;
      this.loading = false;
    }, 2000);
  },

  created() {
    this.getAssistantQAs();
  },

  components: {
    AssistantQATable: AssistantQATab,
  },

  methods: {
    async getAssistantQAs() {
      try {
        await this.$store.dispatch("ApplyStore/disAssistantQA");
        this.disAllAssistantQA = this.getAssistantQA;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async selectStatus(option) {
      this.selectedStatus = option;
    },
  },
};
</script>

<style>
/* ///////////////////////////////////////QAHEADER////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.my-card {
  height: 500px;
  width: 100%;
  margin-bottom: 25px;
}
.filtertab {
  background-color: #0f4d91;
  font-weight: bold;
  border: 0.1em solid #f3f4f7;
  box-shadow: 0 4px 8px rgba(243, 238, 238, 0.1);
  font-style: Arial Black;
}
.IRQHText {
  font-weight: bold;
  font-style: roboto;
  font-family: Arial Black;
  display: flex;
  color: #ffc619;
  font-size: 35px;
  justify-content: center;
}

.spinner {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-top: 100px;
  margin-left: 45%;
}
/* ///////////////////////////////////////TABLE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.q-table-scroll-wrapper {
  max-height: 480px; /* Set your desired height for the scrollable area */
  overflow-y: auto; /* Enable vertical scrolling */
  overflow-x: hidden; /* Disable horizontal scrolling */
  border: 1px solid #ccc; /* Optional border for the scrollable area */
  border-radius: 5px;
}

/* Customizing the scrollbar */
.q-table-scroll-wrapper::-webkit-scrollbar {
  width: 10px; /* Width of the scrollbar */
}

.q-table-scroll-wrapper::-webkit-scrollbar-track {
  background: #f4f4f4; /* Background of the scrollbar track */
}

.q-table-scroll-wrapper::-webkit-scrollbar-thumb {
  background: #0f4d91; /* Scrollbar color */
  border-radius: 10px; /* Rounded corners for the scrollbar */
}

.q-table-scroll-wrapper::-webkit-scrollbar-thumb:hover {
  background: #083d73; /* Darker blue on hover */
}

/* Retain the table styles */
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

/* ///////////////////////////////////////IRDETAILS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.custom-item-section {
  border: 1px solid #ffffff; /* Border style */
  border-radius: 1px; /* Border radius */
  padding: 5px; /* Optional padding */
}
.AQADialog {
  background-color: #ffffff;
  max-height: 100%; /* You can adjust the units based on your preference, 'vw' for viewport width */
  border: 0.2em solid #f3f4f7;
}
.AQAIR {
  height: 80px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.AQAText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.AQAlist {
  height: 15%;
  width: 100%;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}

.AQADesContent {
  border: 0.1em solid #cacaca;
  margin-top: 5px;
}
.AQADesign {
  width: 70%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.AQADes {
  padding: 8px;
  margin-top: 5px;
  font-size: 15px;
  border: 0.1em solid #ffffff;
}
.AQADesign2 {
  width: 25%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.AQAFileDes {
  padding: 8px;
  margin-top: 5px;
  font-size: 15px;
  border: 0.1em solid #003566;
}
.AQATextlist {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}
.AQATitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.AQAFixDesign {
  width: 99.5%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.AQADes1 {
  padding: 8px;
  margin: 5px;
  font-size: 15px;
  border: 0.1em solid #ffffff;
}
.AQAIRND {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}
/* ///////////////////////////////////////CHANGE DIVISION CODE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.DivisionHD {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.DivisionText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}

/* ///////////////////////////////////////CHANGE SUBJECT CODE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.AQACHANGE {
  height: 150px;
  width: 450px;
}

.footer-actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white; /* or any color to match the card */
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #d5d7da;
}

/* ///////////////////////////////////////LOADING////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.non-transparent-dialog {
  background-color: white; /* Change to the desired background color */
}

.centered-card {
  width: 450px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  color: #dfe8f0;
  align-items: center;
}

.please-wait {
  margin-top: 10px;
  font-style: roboto;
  font-weight: bold;
  font-size: 20px;
  color: #ffc619;
  display: flex;
}

/* ////////////////////////////////////////////////////////////////////DIALOG LOADING/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.non-transparent-dialog {
  background-color: white; /* Change to the desired background color */
}

.centered-card {
  width: 450px;
  height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}

.spinner-container {
  display: flex;
  flex-direction: column;
  color: #dfe8f0;
  align-items: center;
}

.please-wait {
  margin-top: 10px;
  font-style: roboto;
  font-weight: bold;
  font-size: 20px;
  color: #ffc619;
  display: flex;
}
/* ////////////////////////////////////////////////////////////////////REPORTABLE & RISK////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
.RERDialog {
  background-color: #ffffff;
}
.AAstIR {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.AAstText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.filtertab {
  background-color: #0f4d91;
  font-weight: bold;
  border: 0.1em solid #f3f4f7;
  box-shadow: 0 4px 8px rgba(243, 238, 238, 0.1);
  font-style: Arial Black;
}
/* .q-tab--active {
  background-color: #ffc412 !important;
  font-size: 18px;
} */
.RiskText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #003566;
  font-size: 25px;
  justify-content: center;
}

.footer-actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white; /* or any color to match the card */
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #d5d7da;
}

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

.QAModuleDiag {
  background-image: url("../assets/BGCORE.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f4f7fc;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}

.contentFormQAModule {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1400px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contentActionFormModule {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1600px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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

.QADes {
  font-size: 15px;
  border: 0.1em solid #ffffff;
}

.QAFileDes {
  padding: 8px;
  margin-top: 5px;
  font-size: 15px;
  border: 0.1em solid #003566;
  background-color: #e3f2fd;
}
</style>
