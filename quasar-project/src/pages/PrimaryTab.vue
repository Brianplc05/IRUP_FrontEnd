<template>
  <div id="q-app" style="position: relative; z-index: 1">
    <div style="height: 100%; width: 100%" class="q-pa-lg">

      <q-card
        class="dashboard-header"
        style="border: 2px solid #e0e0e0;"
      >
        <q-card-section class="row items-center no-wrap">
          <div class="row items-center no-wrap">
            <div class="icon-wrapper">
              <q-icon
                name="list_alt"
                size="35px"
                color="primary"
              />
            </div>

            <div class="q-ml-md text-left">
              <div class="text-h5 text-weight-medium text-primary text-uppercase">
                PRIMARY DEPARTMENT MODULE
              </div>

              <div class="text-grey-7 q-mt-xs">
                Welcome to the Incident Reporting & Unified Platform (IRUP) Primary Department!
              </div>

              <div class="accent-line q-mt-sm"></div>
            </div>
          </div>
        </q-card-section>
      </q-card>

      <q-card
        class="dashboard-header q-mt-md q-pa-sm"
        flat
        bordered
      >
        <q-card-section
          v-if="acloading"
          class="fixed-full flex flex-center column q-gutter-md"
          style="background-color: rgba(255, 255, 255, 0.7); z-index: 9999"
        >
          <q-spinner-ball size="150px" color="primary" />
          <div class="text-subtitle1 text-primary">Please wait...</div>
        </q-card-section>

        <q-card-section style="border: 2px solid #e0e0e0;">
          <q-toolbar class="bg-grey-1" style="border: 2px solid #f0f2f5; border-radius: 10px;">
            <q-tabs
              v-model="Primarytab"
              shrink
              stretch
              class="bg-grey-1 text-dark q-pa-xs"
              active-color="black"
              indicator-color="transparent"
            >
              <q-tab
                name="actions"
                stack
                :class="['tab-equal', getTabClass('actions')]"
                style="width: 450px"
              >
                <template v-slot:default>
                  <div class="column items-center q-mr-md">
                    <div>Very Low & Low Risk Incident Reports</div>
                    <div style="font-size: 12px;" class="text-primary">( Corrective Action Required ) </div>
                  </div>
                  <q-badge color="primary" class="q-ml-xl" floating>
                    {{ actionItemsCount }}
                  </q-badge>
                </template>
              </q-tab>

              <q-tab
                name="rca"
                stack
                :class="['tab-equal', getTabClass('rca')]"
                style="width: 450px"
              >
                <template v-slot:default>
                  <div class="column items-center q-pa-sm q-mr-md">
                    <div>Moderate, High & Very High Risk Incident Reports</div>
                    <div style="font-size: 12px;" class="text-primary">( RCA & Corrective Action Required ) </div>
                  </div>

                  <q-badge color="primary" class="q-ml-xl" floating>
                    {{ rcaItemsCount }}
                  </q-badge>
                </template>
              </q-tab>
            </q-tabs>
          </q-toolbar>

          <q-tab-panels v-model="Primarytab" animated class="tab-panels-bordered" style="border: 2px solid #f0f2f5;">
            <q-tab-panel name="actions">
              <q-card-section
                class="row items-center justify-end q-gutter-sm"
              >
                <!-- SEARCH -->
                <q-input
                  v-model="searchQueryAction"
                  label="SEARCH"
                  dense
                  outlined
                  class="search-input"
                >
                  <template v-slot:append>
                    <q-icon name="search" color="info" />
                  </template>
                </q-input>

                <!-- FILTER -->
                <q-btn-dropdown
                  color="secondary"
                  label="Filter Risk Score"
                  split
                  class="filter-btn"
                >
                  <q-list>
                    <q-item
                      v-for="option in actionFilter"
                      :key="option.value"
                      clickable
                      v-close-popup
                      @click="selectAction(option)"
                    >
                      <q-item-section>
                        {{ option.label }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

              </q-card-section>

              <ActionPrimaryTab
                v-show="showACTable"
                :items="filteredPrimaryACT"
                :columns="disACTColumns"
                :acloading="acloading"
                :getPrimaryDeptACT="getPrimaryDeptACT"
                :rows-per-page-options="[5]"
                flat
                bordered
              />
            </q-tab-panel>

            <q-tab-panel name="rca" >
              <q-card-section
                class="row items-center justify-end q-gutter-sm"
              >
                <!-- SEARCH -->
                <q-input
                  v-model="searchQueryRCA"
                  label="SEARCH"
                  dense
                  outlined
                  class="search-input"
                >
                  <template v-slot:append>
                    <q-icon name="search" color="info" />
                  </template>
                </q-input>

                <!-- FILTER -->
                <q-btn-dropdown
                  color="secondary"
                  label="Filter Risk Score"
                  split
                  class="filter-btn"
                >
                  <q-list>
                    <q-item v-for="option in rcaFilter" :key="option.value" clickable @click="selectRCA(option)">
                      <q-item-section>{{ option.label }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>

              </q-card-section>

              <RCAPrimaryTab
                :items="filteredPrimaryRCA"
                :columns="disRCAColumns"
                :getPrimaryDeptRCA="getPrimaryDeptRCA"
                :rows-per-page-options="[5]"
                flat
                bordered
              />
            </q-tab-panel>
          </q-tab-panels>
        </q-card-section>
      </q-card>

    </div>
  </div>

  <img
    src="../assets/BGCORE.png"
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
import RCAPrimaryTable from "src/components/RCAPrimary.vue";
import ActionPrimaryTable from "src/components/ActionPrimary.vue";

export default {
  data() {
    return {
      acloading: true,
      showACTable: false,
      Primarytab: "actions",
      searchQueryAction: "",
      selectedAction: null,
      searchQueryRCA: "",
      selectedRCA: null,
      disAllPrimaryDeptRCA: [],
      disRCAColumns: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
        { name: "IRNo", label: "IR NUMBER", align: "left", field: "iRNo" },
        {
          name: "subject",
          label: "SUBJECT OF THE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        {
          name: "topic",
          label: "TOPIC",
          align: "left",
          field: "subjectTopic",
        },
        { name: "riskGrading", label: "RISK GRADING", align: "left", field: "id" },
        { name: "rcaform", label: "RCA FORM", align: "left", field: "id" },
        {
          name: "rcadetails",
          label: "ROOT CAUSE ANALYSIS (RCA) DETAILS STATUS",
          align: "left",
          field: "id",
        },
      ],
      actionFilter: [
        { label: "VERY LOW RISK", value: 1 },
        { label: "LOW RISK", value: 2 },
      ],

      disAllPrimaryDeptACT: [],
      disACTColumns: [
        {
          name: "viewIR",
          label: "INCIDENT REPORT DETAILS",
          align: "left",
          field: "id",
        },
        { name: "IRNo", label: "IR NUMBER", align: "left", field: "iRNo" },
        {
          name: "subject",
          label: "SUBJECT OF THE INCIDENT",
          align: "left",
          field: "subjectName",
        },
        {
          name: "topic",
          label: "TOPIC",
          align: "left",
          field: "subjectTopic",
        },
        { name: "riskGrading", label: "RISK GRADING", align: "left", field: "id" },
        {
          name: "actionitem",
          label: "ACTION ITEM FORM",
          align: "left",
          field: "id",
        },
        {
          name: "actiondetails",
          label: "ACTION ITEM COMPLETIONS DETAILS STATUS",
          align: "left",
          field: "id",
        },
      ],

      rcaFilter: [
        { label: "MODERATE RISK", value: 3 },
        { label: "HIGH RISK", value: 4 },
        { label: "VERY HIGH RISK", value: 5 },
      ],
    };
  },

  computed: {
    ...mapGetters({
      getPrimary: "ApplyStore/getPrimary",
    }),

    actionItemsCount() {
      const count = this.disAllPrimaryDeptACT.filter(
        (item) => item.qAStatus
      ).length;
      return count;
    },

    rcaItemsCount() {
      const count = this.disAllPrimaryDeptRCA.filter(
        (item) => item.qAStatus
      ).length;
      return count;
    },

    filteredPrimaryACT() {
      const { disAllPrimaryDeptACT, selectedAction, searchQueryAction } = this;
      let filteredData = [...disAllPrimaryDeptACT];

      if (selectedAction && typeof selectedAction === "object"){
        const { value: actionValue } = selectedAction;
        filteredData = filteredData.filter(
        (item) => item.riskGrading === actionValue)
      }

      if (searchQueryAction && typeof searchQueryAction === "string") {
        const query = searchQueryAction.toLowerCase();
        filteredData = filteredData.filter((item) =>
          Object.values(item).some(
            (val) =>
              typeof val === "string" && val.toLowerCase().includes(query)
          )
        );
      }
      return filteredData;
    },

    filteredPrimaryRCA() {
      const { disAllPrimaryDeptRCA, selectedRCA, searchQueryRCA } = this;
      let filteredData = [...disAllPrimaryDeptRCA];

      if (selectedRCA && typeof selectedRCA === "object"){
        const { value: rcaValue } = selectedRCA;
        filteredData = filteredData.filter(
        (item) => item.riskGrading === rcaValue)
      }

      if (searchQueryRCA && typeof searchQueryRCA === "string") {
        const query = searchQueryRCA.toLowerCase();
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
    // 🔹 Initial delay (3 seconds)
    setTimeout(() => {
      this.showACTable = true;
      this.disAllPrimaryDeptACT;
      this.disAllPrimaryDeptRCA;
      this.acloading = false;
    }, 3000);

    // 🔹 Auto fetch every 60 seconds
    this.interval = setInterval(() => {
      this.getPrimaryDeptACT();
      this.getPrimaryDeptRCA();
    }, 60000);
  },

  created() {
    this.getPrimaryDeptACT();
    this.getPrimaryDeptRCA();
  },

  components: {
    RCAPrimaryTab: RCAPrimaryTable,
    ActionPrimaryTab: ActionPrimaryTable,
  },

  methods: {

    async selectAction(option) {
      this.selectedAction = option;
    },

    async selectRCA(option) {
      this.selectedRCA = option;
    },

    async getPrimaryDeptACT() {
      try {
        await this.$store.dispatch("ApplyStore/disPrimaryACT");
        this.disAllPrimaryDeptACT = this.getPrimary;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    async getPrimaryDeptRCA() {
      try {
        await this.$store.dispatch("ApplyStore/disPrimaryRCA");
        this.disAllPrimaryDeptRCA = this.getPrimary;
      } catch (error) {
        console.error("Error inserting data:", error);
      }
    },

    getTabClass(tabName) {
      return this.Primarytab === tabName ? `${tabName}-active` : "";
    },
  },
};
</script>

<style>

/* //////////////////// HEADER //////////////////// */

.dashboard-header {
  width: 100%;
  border-radius: 8px;
  background: #ffffff;
  text-align: left;
}

.icon-wrapper {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(2, 64, 137, 0.08);
}

.accent-line {
  width: 60px;
  height: 3px;
  background: #024089;
  border-radius: 2px;
}

.filter-btn {
  width: 250px;
  border-radius: 10px;
}

.search-input {
  width: 600px;
  border-radius: 10px;
}

/* ///////////////////////////////////////TABLE////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.my-card {
  height: 500px;
  width: 100%;
  margin-bottom: 25px;
}
.IRPrimarytab {
  font-weight: bold;
  font-style: roboto;
  font-family: Arial Black;
  color: #ffc619;
  font-size: 25px;
  width: 30%;
  margin-right: 10px;
  background-color: #083d73;
}

/* /////////////////////////////////////// TABLE /////////////////////////////////////// */

.table-with-border {
  border-bottom: 2em solid hsl(220, 22%, 81%);
  border-collapse: collapse;
  margin-top: 25px;
}

.q-table-container {
  border-radius: 5px;
  overflow: hidden;
}

/* TABLE HEADER */
.q-table th {
  background-color: #0f4d91;
  color: #fff;
  padding: 8px;
  text-align: center;
  border-bottom: 1px solid #ccc;
}

/* TABLE BODY */
.q-table td {
  padding: 8px;
  text-align: center;

  /* Horizontal line */
  border-bottom: 1px solid #ccc;
}

/* Remove unnecessary vertical borders */
.q-table td,
.q-table th {
  border-left: none;
  border-right: none;
}

/* Alternating rows */
.q-table tbody tr:nth-child(odd) {
  background-color: #f4f4f4;
}

/* Optional: hover effect */
.q-table tbody tr:hover {
  background-color: #eeeeee;
}

.q-table button {
  height: 30px;
  width: 80px;
  border-radius: 5px;
  margin: 0;
  padding: 0;
}

/* ///////////////////////////////////////IRDETAILS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QADialog {
  background-color: #2f5d80;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}

.contentFormQA {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1200px;
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

/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.custom-item-section {
  border: 1px solid #ffffff; /* Border style */
  border-radius: 1px; /* Border radius */
}
/* .QADialog {
  background-color: #ffffff;
  max-height: 100%;
  border: 0.2em solid #f3f4f7;
} */
.QADesign {
  width: 70%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.QADesign2 {
  width: 25%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.QAFixDesign {
  width: 99.5%;
  margin: 5px;
  font-size: 15px;
  background-color: #ffffff;
}
.QAIRND {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 20px;
  justify-content: center;
}
.QAIR {
  height: 85px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}

.QADes {
  padding: 8px;
  margin-top: 5px;
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
.QADes1 {
  padding: 8px;
  margin: 5px;
  font-size: 15px;
  border: 0.1em solid #ffffff;
}
.QAText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 30px;
  justify-content: center;
}
.QATitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.QACTTitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #f3f4f7;
  background-color: #f3f4f7;
}

.QAlist {
  height: 30%;
  width: 100%;
  margin-top: 15px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.QATextlist {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 22px;
  justify-content: center;
}
.QACTTextlist {
  font-weight: bold;
  display: flex;
  color: #003566;
  font-size: 22px;
  justify-content: center;
}

.QAaaTitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}

/* ///////////////////////////////////////ACTION ITEM DETAILS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QCRTG {
  background-color: #ffffff;
  height: 460px; /* You can adjust the units based on your preference, 'vw' for viewport width */
  border: 0.2em solid #f3f4f7;
}
.QARTG {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QARTGText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
}
.QARTGTestlist {
  font-weight: bold;
  display: flex;
  color: #003566;
  font-size: 20px;
  justify-content: center;
  margin-left: 10px;
}
.QARTGLay {
  height: 35px;
  width: 100%;
  margin-top: 10px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.acfooter-actions {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white; /* or any color to match the card */
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #d5d7da;
}

/* ///////////////////////////////////////ACTION ITEMS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.QAACT {
  background-color: #ffffff;
  border: 0.2em solid #f3f4f7;
}
.QAACTHead {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QAACText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}

.QAACTABLE {
  background-color: #f3f4f7;
  border-top-left-radius: 60px; /* Border radius */
  border-left: 2em solid #003566;
  padding: 20px; /* Optional padding */
  font-size: 5px;
  font-style: Arial Black;
  width: 50%;
}
.QAACTabtext {
  font-size: 15px;
}

.QAACStatus {
  height: 75px;
  border: 0.2em solid #f3f4f7;
  background-color: #003566;
  border: 0.6em solid #d5d7da;
}
.QAACSText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.QAaaTitlelist {
  height: 40%;
  width: 100%;
  padding: 8px;
  border: 0.1em solid #cacaca;
  background-color: #003566;
}
.QATextlist {
  font-weight: bold;
  display: flex;
  color: #ffc619;
  font-size: 22px;
  justify-content: center;
}

.buttonCancelDesign {
  color: #166ecc;
  background-color: rgba(22, 110, 204, 0.1);
  font-size: 15px;
  font-weight: bold;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  width: 130px;
  border: 2px solid #166ecc;
}

.buttonSaveDesign {
  border-color: #ffc412;
  font-size: 15px;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  width: 130px;
  border: 2px solid #ffc412;
}

.buttonSaveDraftDesign {
  border-color: #166ecc;
  font-size: 15px;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  width: 130px;
  border: 2px solid #166ecc;
}

.borderDesign {
  margin-top: 15px;
}
/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

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

.actions-active {
  background-color: #ffc619; /* mint green */
  font-weight: bold;
  color: black;
  border-radius: 10px;
}

.rca-active {
  background-color: #ffc619; /* mint green */
  font-weight: bold;
  color: black;
  border-radius: 10px;
}

.tab-panels-bordered {
  background-color: #ffffff;
  border-radius: 20px;
  margin-top: 10px;
}

/* /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */


.buttonCancelDesign {
  color: #166ecc;
  background-color: rgba(22, 110, 204, 0.1);
  font-size: 15px;
  font-weight: bold;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  width: 130px;
  border: 2px solid #166ecc;
}

.buttonSaveDesign {
  border-color: #ffc412;
  font-size: 15px;
  margin: 5px;
  box-shadow: #000000;
  border-radius: 20px;
  font-weight: bold;
  width: 130px;
  border: 2px solid #ffc412;
}

.QADialogAction {
  background-color: #2f5d80;
  padding-top: 20px;
  padding-bottom: 40px;
  min-height: 100vh;
}
.contentFormAction {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1200px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contentFormRCA {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1500px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.contentFormRCApproved {
  border: 2px solid #f0f2f5;
  margin-left: auto;
  margin-right: auto;
  border-radius: 25px;
  padding: 20px;
  background-color: #ffffff;
  width: 1800px;
  height: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}


.sepBanFootIncident {
  background-color: #6b7c93;
  height: 2px;
  margin-top: 10px;
  margin-bottom: 15px;
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

.fishboneDesign {
  border: 2px solid #ccc;
  border-radius: 20px;
}

/* ///////////////////////////////////////ACCOMPLISHMENT STATUS////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */

.PrimaryAccomStatus {
  height: 260px;
  width: 500px;
}

/* ......................................SAVE CONTENT ..................................... */
.IRCON {
  background-color: #ffffff;
  height: 220px;
  width: 450px;
}

.IRCONText {
  font-weight: bold;
  font-style: roboto;
  display: flex;
  color: #ffc619;
  font-size: 25px;
  justify-content: center;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.downbtn {
  padding: 5px;
  width: 15%;
  color: #003566;
  font-weight: bold;
}
.no-scroll-dialog .q-dialog__inner {
  overflow: hidden !important;
}

.no-scroll-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden !important;
}

.q-card-section {
  flex: 1;
  overflow: auto;
}


</style>
